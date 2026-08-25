# 🌐 University of Upper Hill — VPS Deployment Guide

This guide details how to host the backend microservices and polyglot databases (**PostgreSQL 15** + **MongoDB 6.0** + **API Gateway** + **Caddy SSL**) on a standalone Virtual Private Server (VPS / Cloud VM).

---

## 💻 Recommended VPS Specifications

- **OS**: Ubuntu 22.04 LTS / 24.04 LTS (or Debian 12)
- **RAM**: 2 GB minimum (4 GB recommended for production scale)
- **CPU**: 2 vCPUs
- **Disk**: 25 GB SSD/NVMe
- **Providers**: DigitalOcean, Hetzner, Linode, AWS EC2, Contabo, Vultr

---

## ⚡ Quick 1-Click Deployment (On your VPS terminal)

### Step 1: SSH into your VPS
```bash
ssh root@<YOUR_VPS_IP>
```

### Step 2: Clone the Repository
```bash
git clone https://github.com/wanjikudigitaldesignservices-cyber/university-upper-hill.git
cd university-upper-hill
```

### Step 3: Run the Auto-Provisioning Script
```bash
sudo bash deploy-vps.sh
```

The script will automatically:
1. Update system packages and install **Docker**, **Docker Compose**, **Git**, and **UFW Firewall**.
2. Configure firewall rules (opening ports `22`, `80`, `443`).
3. Generate cryptographically secure 256-bit secrets for PostgreSQL, MongoDB, and JWT authentication in `.env.production`.
4. Spin up all 9 containers (**Caddy Auto-SSL**, **PostgreSQL**, **MongoDB**, **API Gateway**, and all **7 Microservices**) with automatic restart policies.

---

## 🔒 Custom Domain & Automatic SSL Setup

If you have a domain name (e.g. `api.upperhill.ac.ke` or `api.yourdomain.com`):

1. **Point your domain's DNS A-record** to your `<YOUR_VPS_IP>`.
2. Open `.env.production` on the VPS:
   ```bash
   nano .env.production
   ```
3. Set your domain:
   ```env
   DOMAIN=api.yourdomain.com
   ```
4. Restart Caddy:
   ```bash
   docker compose -f docker-compose.prod.yml restart caddy
   ```
   *Caddy will automatically provision and renew a free Let's Encrypt / ZeroSSL TLS certificate!*

---

## 🩺 Monitoring & Maintenance Commands

### Check container statuses:
```bash
docker compose -f docker-compose.prod.yml ps
```

### Stream live logs across all microservices:
```bash
docker compose -f docker-compose.prod.yml logs -f
```

### Stream logs for a specific service (e.g., finance or hostel):
```bash
docker compose -f docker-compose.prod.yml logs -f finance-service
docker compose -f docker-compose.prod.yml logs -f hostel-service
```

### Run health checks:
```bash
node scripts/verify-microservices.js
```

### Restart all services:
```bash
docker compose -f docker-compose.prod.yml restart
```

### Pull latest updates from GitHub:
```bash
git pull origin master
docker compose -f docker-compose.prod.yml up -d --build
```
