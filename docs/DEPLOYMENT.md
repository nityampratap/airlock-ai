# AIRLOCK AI — Deployment & Infrastructure Guide

## 1. Deployment Models

AIRLOCK AI supports three tier levels of deployment:

### Model A: Local Development & Pilot Mode (Currently Active)
- **Frontend:** Next.js 16 on port `3000`.
- **Backend:** FastAPI Uvicorn on port `8005`.
- **Storage:** SQLite with WAL mode (`backend/airlock_ai.db`).
- **Cryptographic Keys:** Local PEM files in `backend/keys/`.
- **Isolation Boundary:** Logical process namespaces and memory boundary simulation.

### Model B: Multi-Container Staging Cluster
- **Reverse Proxy:** NGINX or Traefik handling TLS termination and routing.
- **Frontend Container:** Docker container running `next start`.
- **API Engine Container:** Docker container running FastAPI with multiple Uvicorn workers.
- **Database:** Managed PostgreSQL (Amazon RDS, Google Cloud SQL, or Neon).
- **Cache/Queue:** Redis for asynchronous evaluation workloads.

### Model C: Enterprise Dedicated Airgapped Enclave (Future)
- **Broker Host:** Hardened Linux kernel with hardware-level memory encryption (AMD SEV-SNP / Intel SGX).
- **Execution Sandboxes:** Dedicated microVMs (AWS Firecracker / gVisor) with network egress strictly firewalled except for broker UNIX domain sockets.
- **Key Management:** FIPS 140-2 Level 3 Hardware Security Module (HSM) or AWS CloudHSM.

---

## 2. Docker Compose Configuration Example

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: airlock
      POSTGRES_PASSWORD: ${DB_PASSWORD:-airlock_secure_2026}
      POSTGRES_DB: airlock_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://airlock:${DB_PASSWORD:-airlock_secure_2026}@db:5432/airlock_db
      SECRET_KEY: ${SECRET_KEY}
    ports:
      - "8005:8005"
    depends_on:
      - db

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: http://backend:8005/api/v1
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 3. Secret Management & Key Rotation

1. **Ed25519 Root Private Key:**
   - Stored in `backend/keys/ed25519_private.pem`.
   - Never exposed over any API endpoint.
   - Rotated by generating a new sub-key and publishing updated public verification keys in `backend/keys/ed25519_public.pem`.
2. **Environment Variables:**
   - Use `.env` files for local dev.
   - For production, inject secrets via AWS Secrets Manager, HashiCorp Vault, or Kubernetes Secrets.
