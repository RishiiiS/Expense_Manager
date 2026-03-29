# MoneyTree Expense Manager

MoneyTree is a full-stack expense manager that helps users track transactions, set monthly targets, and view analytics and budgets.

## Monorepo layout

- `backend/`: Express API (PostgreSQL + Sequelize)
- `frontend/`: React app (Vite)

## Key features

- JWT authentication (register/login)
- Expense CRUD with categories
- Monthly budgets and saving targets
- Analytics endpoints and dashboard views

## Tech stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: PostgreSQL
- ORM: Sequelize

## Getting started (local)

### Prerequisites

- Node.js 18+ recommended
- PostgreSQL 14+ recommended

### Install dependencies

```bash
npm run install-all
```

### Backend environment variables

Create `backend/.env` (do not commit it). You can use either `DATABASE_URL` (recommended for managed hosts) or individual `DB_*` variables.

Minimum required:

- `JWT_SECRET`: secret used to sign tokens
- `ALLOWED_ORIGIN`: frontend origin (example: `http://localhost:5173`)

Database (option A: single URL):

- `DATABASE_URL`: PostgreSQL connection string

Database (option B: individual values):

- `DB_HOST`
- `DB_PORT` (defaults to `5432` if not set)
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

Optional:

- `DB_SSL=false` to disable SSL (useful for local Postgres that does not support SSL)
- `PORT` (defaults to `5001`)

### Frontend environment variables

Create `frontend/.env.local`:

- `VITE_API_URL=http://localhost:5001/api/v1`

### Run in development

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5001`

## Deployment notes (Render/Supabase)

### Render

- Prefer setting `DATABASE_URL` in the Render service environment.
- Ensure `ALLOWED_ORIGIN` matches your deployed frontend URL.

### Supabase

- Use Supabase direct connection settings when possible.
- If using the Supabase connection pooler, ensure `DB_HOST` and `DB_PORT` match the pooler endpoint, and SSL is enabled.

## Troubleshooting: Sequelize `ETIMEDOUT`

If you see `SequelizeConnectionError` with `ETIMEDOUT`, it almost always means the app cannot reach the database host/port from the running environment.

Checklist:

- Confirm the database is running and accepts connections from your host (Render/VPS/local).
- Verify `DB_HOST` and `DB_PORT` are correct for the connection type (direct vs pooler).
- If deploying to Render, verify `DATABASE_URL` is set and points to a reachable database.

