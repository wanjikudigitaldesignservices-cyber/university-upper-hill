# 🎓 University of Upper Hill — Student Information & ERP System

[![Microservices](https://img.shields.io/badge/Architecture-Distributed%20Microservices-blue.svg)](https://github.com/wanjikudigitaldesignservices-cyber/university-upper-hill)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2015-336791.svg)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%206.0-47A248.svg)](https://www.mongodb.com/)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite%20%2B%20Tailwind-61DAFB.svg)](https://frontend-one-amber-f4fjiojcbz.vercel.app)
[![KDPA Certified](https://img.shields.io/badge/Compliance-KDPA%202019%20Zero--PII-16a34a.svg)](#)

A full-stack, distributed microservices university management platform for the **University of Upper Hill** (~15–20K students, 15 departments, examination peak traffic resilience).

---

## 🚀 Live Links
- **Production Web Application (Vercel)**: [https://frontend-one-amber-f4fjiojcbz.vercel.app](https://frontend-one-amber-f4fjiojcbz.vercel.app)
- **Source Code Repository (GitHub)**: [https://github.com/wanjikudigitaldesignservices-cyber/university-upper-hill](https://github.com/wanjikudigitaldesignservices-cyber/university-upper-hill)

---

## 🏛️ Polyglot Microservices Architecture

```
                                [ CLIENT / WEB ]
                                       │
                                       ▼
                   ┌───────────────────────────────────────┐
                   │   API GATEWAY (Express / Port 8080)   │
                   │   - JWT Termination & Rate Limiting   │
                   │   - Reverse Proxy & Prefix Rewrites   │
                   └───────────────────┬───────────────────┘
                                       │
         ┌──────────────┬──────────────┼──────────────┬──────────────┐
         ▼              ▼              ▼              ▼              ▼
   ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
   │   Auth    │  │ Academic  │  │  Hostel   │  │  Finance  │  │Admissions │
   │  Service  │  │  Service  │  │  Service  │  │  Service  │  │  Service  │
   │ (Port 3001)│ │ (Port 3002)│ │ (Port 3003)│ │ (Port 3004)│ │ (Port 3005)│
   └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
         │              │              │              │              │
         └──────────────┴───────┬──────┴──────────────┴──────────────┘
                                ▼
               ┌─────────────────────────────────┐
               │    POSTGRESQL 15 (Port 5432)    │
               │  - Schemas: auth, academic,     │
               │    hostel, finance, admissions  │
               │  - Concurrency Row Locking      │
               │  - 25+ Filter/Sort Indexes      │
               └─────────────────────────────────┘

         ┌───────────────────────────────────────────────────────────┐
         │                                                           │
         ▼                                                           ▼
   ┌───────────┐                                               ┌───────────┐
   │    CMS    │                                               │Notification│
   │  Service  │                                               │ & Audit   │
   │(Port 3006)│                                               │(Port 3007)│
   └─────┬─────┘                                               └─────┬─────┘
         │                                                           │
         └─────────────────────────────┬─────────────────────────────┘
                                       ▼
               ┌─────────────────────────────────┐
               │     MONGODB 6.0 (Port 27017)    │
               │  - Collections: news, pages,    │
               │    departmentinfos, notif_logs  │
               │  - Flexible Document Schema     │
               │  - High-Volume Event Logging    │
               └─────────────────────────────────┘
```

---

## 📦 Services Breakdown

| Service | Port | Database | Responsibilities |
|---|---|---|---|
| **api-gateway** | `8080` | - | Centralized ingress, JWT verification, IP/route rate-limiting, proxy routing. |
| **auth-service** | `3001` | PostgreSQL (`auth`) | User management, bcrypt (12 rounds), 15-min JWT access, HttpOnly refresh token rotation & theft detection. |
| **academic-service** | `3002` | PostgreSQL (`academic`) | Course catalog, unit enrollments, faculty grade entry, student academic directory. |
| **hostel-service** | `3003` | PostgreSQL (`hostel`) | Room blocks, occupancy state, **PostgreSQL `SELECT ... FOR UPDATE` row-level locks** for race-condition prevention, fee clearance gate. |
| **finance-service** | `3004` | PostgreSQL (`finance`) | Invoices, fee ledger, **Jiunge/Pesaflow M-Pesa STK push integration**, HMAC-SHA256 signature verification, idempotent settlement. |
| **admissions-service**| `3005` | PostgreSQL (`admissions`) | Verified student lookups, server-side PDF letter generation, cryptographic download tokens. |
| **cms-service** | `3006` | MongoDB (`uuh_cms`) | Public dynamic news, campus notices, department profiles, view counters, edge cache headers. |
| **notification-service**| `3007` | MongoDB (`uuh_notifications`) | Internal utility for Email (Nodemailer/SMTP) & SMS dispatch with persistent delivery audit logs. |

---

## 🛠️ Quick Local Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 18+

### 1. Clone & Start All Microservices
```bash
git clone https://github.com/wanjikudigitaldesignservices-cyber/university-upper-hill.git
cd university-upper-hill

# Start PostgreSQL, MongoDB, API Gateway, and all 7 services
docker compose up --build -d
```

### 2. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Verify System Health
```bash
node scripts/verify-microservices.js
```

---

## 🔐 Security & Compliance
- **KDPA 2019 (Kenya Data Protection Act)**: Consent on data ingestion, zero PII in error responses or console logs.
- **Zero Trust**: Each microservice authenticates and authorizes requests independently.
- **Idempotency**: All Jiunge payment webhooks are keyed on `jiunge_invoice_no` to prevent double-crediting.
- **Concurrency Safety**: Room bookings use database row-level locking to guarantee single-winner reservation under high concurrency.
