# PropertyQuest

A full-stack property management platform that allows users to list, search, and manage properties. Built with a modern cloud-native GitOps architecture on AWS.

---

## Repositories

The project is split across three repositories, each with a distinct responsibility:

| Repository | Purpose |
|---|---|
| `propertyquest-app` | Application source code, Dockerfiles, and CI/CD pipeline |
| `propertyquest-helm` | Helm charts for deploying the application to Kubernetes |
| `propertyquest-infra` | Terraform code for provisioning all AWS infrastructure |

---

## Tech Stack

### Application
- **Frontend** — Next.js 15 (React 18, TypeScript, Tailwind CSS)
- **Backend** — Node.js 20, Express, TypeScript
- **Database** — MySQL via AWS RDS
- **ORM** — Sequelize with migration-based schema management
- **Auth** — JWT, Passport.js (Google, Facebook, Apple OAuth)
- **Payments** — Flutterwave
- **File Storage** — Cloudinary
- **Email** — SendGrid / Nodemailer

### Infrastructure & DevOps
- **Cloud** — AWS
- **Container Registry** — Amazon ECR
- **Orchestration** — Amazon EKS (Kubernetes)
- **Infrastructure as Code** — Terraform (`propertyquest-infra`)
- **Package Manager (K8s)** — Helm (`propertyquest-helm`)
- **CI/CD** — GitHub Actions
- **GitOps** — ArgoCD
- **Secrets Management** — AWS Secrets Manager + Kubernetes External Secrets Operator (ESO)
- **Pod Identity** — EKS Pod Identity for secretless AWS authentication
- **Code Quality** — SonarQube
- **Security Scanning** — Trivy
- **Notifications** — Slack

---

## Architecture Overview

```
Developer Push
      │
      ▼
GitHub Actions (propertyquest-app)
      │
      ├── Pull Request → SonarQube scan + Trivy filesystem scan
      │
      └── Push to main
            │
            ├── Build & push Docker images → Amazon ECR
            ├── Run Sequelize DB migrations → AWS RDS (MySQL)
            └── Update image tags in Helm values → propertyquest-helm
                        │
                        ▼
                    ArgoCD detects Helm repo change
                        │
                        ▼
                    Deploys to Amazon EKS
                        │
                        ▼
                ESO syncs secrets from AWS Secrets Manager
                into Kubernetes Secrets via Pod Identity
```

---

## Secrets Management

All sensitive configuration is stored in **AWS Secrets Manager**. No secrets are stored in environment files, Kubernetes manifests, or Helm values.

The flow works as follows:

1. Terraform provisions the EKS cluster and configures **EKS Pod Identity** — this gives the ESO service account an IAM role with permission to read from Secrets Manager, without needing static credentials.
2. The **External Secrets Operator (ESO)** is deployed in the cluster and watches `ExternalSecret` resources.
3. ESO pulls the secret values from AWS Secrets Manager and creates/syncs native Kubernetes `Secret` objects.
4. Application pods mount these Kubernetes Secrets as environment variables.

Secrets managed this way include:
- Database credentials (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`)
- JWT secret
- Admin credentials
- OAuth client IDs and secrets
- Cloudinary credentials
- SendGrid / email credentials
- Flutterwave API keys
- Session secret

---

## Infrastructure (`propertyquest-infra`)

All AWS infrastructure is provisioned and managed via Terraform. This includes:

- **VPC** — subnets, route tables, internet/NAT gateways
- **Amazon EKS** — managed Kubernetes cluster with node groups
- **Amazon RDS** — MySQL instance (private subnet)
- **Amazon ECR** — container image repositories for backend and frontend
- **IAM Roles** — OIDC-based roles for GitHub Actions (OIDC) and EKS Pod Identity
- **AWS Secrets Manager** — secret storage
- **ESO IAM Role** — scoped read access to Secrets Manager via Pod Identity

To provision infrastructure:

```bash
cd propertyquest-infra
terraform init
terraform plan
terraform apply
```

---

## CI/CD Pipeline (`propertyquest-app`)

The GitHub Actions pipeline in `.github/workflows/ci.yml` has the following jobs:

### On Pull Request
| Job | What it does |
|---|---|
| `build-and-sonar` | Installs deps, builds backend + frontend, runs Trivy filesystem scans, runs SonarQube scan and enforces quality gate |

### On Push to `main`
| Job | What it does |
|---|---|
| `docker-build-push` | Builds backend and frontend Docker images, pushes to ECR with `SHA` tag and `latest` |
| `update-helm` | Checks out `propertyquest-helm`, updates image tags in `values.yaml`, commits and pushes — triggering ArgoCD |
| `slack-notification` | Sends pipeline result (all jobs) to a Slack channel — always runs regardless of job outcomes |

### Required GitHub Secrets & Variables

| Name | Type | Description |
|---|---|---|
| `SONAR_TOKEN` | Secret | SonarQube authentication token |
| `GITOPS_PAT` | Secret | GitHub PAT with write access to `propertyquest-helm` |
| `SLACK_WEBHOOK` | Secret | Slack incoming webhook URL |
| `AWS_REGION` | Variable | AWS region (e.g. `eu-west-1`) |
| `AWS_ROLE_ARN` | Variable | IAM role ARN for GitHub Actions OIDC |
| `SONAR_HOST_URL` | Variable | SonarQube server URL |
| `HELM_REPO_USER` | Variable | GitHub username/org owning the Helm repo |
| `HELM_REPO_NAME` | Variable | Helm repo name (defaults to `propertyquest-helm`) |

---

## Helm Charts (`propertyquest-helm`)

The Helm chart in `propertyquest-helm` defines all Kubernetes resources for the application:

- Backend `Deployment` and `Service`
- Frontend `Deployment` and `Service`
- `Ingress` for external traffic routing
- `ExternalSecret` resources for ESO to sync secrets from AWS Secrets Manager
- `ServiceAccount` with Pod Identity annotation

Image tags in `values.yaml` are automatically updated by the CI pipeline on every deployment.

---

## Local Development

### Prerequisites
- Node.js 20
- MySQL (or Docker)
- npm / yarn

### Backend

```bash
cd properQuestServer
cp .env.example .env        # fill in your local DB and secret values
npm install
npm run db:migrate          # run Sequelize migrations
npm run dev                 # starts with nodemon
```

### Frontend

```bash
cd PropertyQuestClient
cp .env.local.example .env.local    # fill in API URL etc.
npm install
npm run dev
```

### Useful Backend Scripts

| Script | Description |
|---|---|
| `npm run db:migrate` | Run pending Sequelize migrations |
| `npm run db:migrate:undo` | Undo last migration |
| `npm run db:reset` | Drop, recreate, and re-migrate the database |
| `npm run db:migration-file -- <name>` | Generate a new migration file |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

---

## Database Migrations

Schema changes are managed with **Sequelize CLI migrations** — never with `sync()` in production.

- Migration files live in `properQuestServer/src/migrations/`
- Sequelize config is in `properQuestServer/src/config/config.js`
- In production, migrations are run as a dedicated step in the CI/CD pipeline before the new image is deployed, ensuring the schema is updated before any pod restarts.

To create a new migration:

```bash
npm run db:migration-file -- add-my-new-column
```

---

## API

The backend exposes a REST API under `/api`. Swagger documentation is available at:

```
http://localhost:5000/api-docs
```

A health check endpoint is available at:

```
GET /status
```

---

## Project Structure

```
propertyquest-app/
├── properQuestServer/          # Express backend (TypeScript)
│   ├── src/
│   │   ├── api/                # Controllers, routes, middlewares
│   │   ├── config/             # DB, passport, sequelize config
│   │   ├── migrations/         # Sequelize migration files
│   │   ├── models/             # Sequelize models
│   │   └── utils/              # Helpers, logger, task queue
│   ├── Dockerfile
│   └── package.json
├── PropertyQuestClient/        # Next.js frontend (TypeScript)
│   ├── src/
│   │   ├── app/                # Next.js app router pages
│   │   ├── components/         # UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── store/              # Zustand state management
│   │   └── utils/              # Client utilities
│   ├── Dockerfile
│   └── package.json
└── .github/
    └── workflows/
        └── ci.yml              # GitHub Actions pipeline
```
