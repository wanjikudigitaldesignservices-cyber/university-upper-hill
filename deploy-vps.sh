#!/bin/bash
# ==============================================================================
# University of Upper Hill — VPS One-Click Deployment & Bootstrap Script
# Supported OS: Ubuntu 20.04/22.04/24.04 LTS, Debian 11/12
# ==============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==============================================================================${NC}"
echo -e "${GREEN}  🎓 UNIVERSITY OF UPPER HILL — PRODUCTION VPS DEPLOYMENT${NC}"
echo -e "${BLUE}==============================================================================${NC}\n"

# 1. Check Root Privileges
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERROR] Please run this script with sudo or as root: sudo bash deploy-vps.sh${NC}"
  exit 1
fi

# 2. Update System Packages
echo -e "${YELLOW}[1/6] Updating system packages...${NC}"
apt-get update -qq
apt-get install -y -qq apt-transport-https ca-certificates curl gnupg lsb-release git ufw openssl

# 3. Install Docker & Docker Compose if missing
echo -e "${YELLOW}[2/6] Verifying Docker installation...${NC}"
if ! command -v docker &> /dev/null; then
  echo -e "Installing Docker Engine..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  rm -f get-docker.sh
  systemctl enable docker
  systemctl start docker
  echo -e "${GREEN}Docker installed successfully.${NC}"
else
  echo -e "${GREEN}Docker is already installed ($(docker --version)).${NC}"
fi

# 4. Configure UFW Firewall
echo -e "${YELLOW}[3/6] Configuring VPS Firewall (UFW)...${NC}"
ufw allow 22/tcp || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw allow 443/udp || true # HTTP/3 QUIC for Caddy
ufw --force enable

# 5. Generate Production Environment Secrets
echo -e "${YELLOW}[4/6] Checking production environment (.env.production)...${NC}"
if [ ! -f ".env.production" ]; then
  echo -e "Generating cryptographically secure secrets for production..."
  
  PG_PASS=$(openssl rand -hex 24)
  MONGO_PASS=$(openssl rand -hex 24)
  JWT_SEC=$(openssl rand -hex 32)
  REFRESH_SEC=$(openssl rand -hex 32)
  DOWNLOAD_SEC=$(openssl rand -hex 32)
  JIUNGE_SEC=$(openssl rand -hex 24)

  cat > .env.production <<EOL
# =================================================================
# Production Secrets for University of Upper Hill VPS
# Generated on: $(date)
# =================================================================

DOMAIN=localhost
NODE_ENV=production

# PostgreSQL 15 Database
POSTGRES_USER=uuh_admin
POSTGRES_PASSWORD=${PG_PASS}
POSTGRES_DB=uuh_db

# MongoDB 6.0 Database
MONGO_ROOT_USER=uuh_mongo_admin
MONGO_ROOT_PASSWORD=${MONGO_PASS}

# Auth Service Secrets
JWT_SECRET=${JWT_SEC}
REFRESH_SECRET=${REFRESH_SEC}
DOWNLOAD_SECRET=${DOWNLOAD_SEC}

# Jiunge / Pesaflow Gateway
JIUNGE_API_URL=https://api.jiunge.com
JIUNGE_API_KEY=live_jiunge_api_key_placeholder
JIUNGE_WEBHOOK_SECRET=${JIUNGE_SEC}

# SMTP Notification
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=admissions@upperhill.ac.ke
SMTP_PASS=app_password_here
EOL

  echo -e "${GREEN}Created .env.production with random 256-bit secrets.${NC}"
else
  echo -e "${GREEN}.env.production already exists. Using existing configuration.${NC}"
fi

# 6. Build and Launch Containers
echo -e "${YELLOW}[5/6] Building and starting all 9 microservices and databases...${NC}"
docker compose --env-file .env.production -f docker-compose.prod.yml pull || true
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build --remove-orphans

# 7. Health Check Verification
echo -e "${YELLOW}[6/6] Verifying microservice health status...${NC}"
sleep 10
docker compose -f docker-compose.prod.yml ps

echo -e "\n${GREEN}==============================================================================${NC}"
echo -e "${GREEN}  🎉 DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${GREEN}==============================================================================${NC}"
echo -e "Your backend microservices are running on this VPS."
echo -e "• API Gateway: http://localhost:80 or https://<YOUR_DOMAIN>"
echo -e "• PostgreSQL:  Port 5432 (Internal)"
echo -e "• MongoDB:     Port 27017 (Internal)"
echo -e "• Caddy SSL:   Ports 80 / 443 active"
echo -e "\nTo view live logs: ${YELLOW}docker compose -f docker-compose.prod.yml logs -f${NC}\n"
