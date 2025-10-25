# Nyaya

> Legal research assistant powered by AI, providing semantic search and analysis over legal corpora.

## Project Overview

Nyaya is a monorepo application combining a modern frontend experience with a Python-based backend that leverages OpenAI embeddings and vector search to deliver intelligent legal research capabilities.

### Architecture

```
nyaya/
├── frontend/         # React + TypeScript web application
├── backend/          # FastAPI + Python backend service
├── data/             # Legal corpus seeds, embeddings, and static assets
├── scripts/          # Automation scripts for setup, seeding, and maintenance
├── .env.example      # Environment variable template
└── README.md         # This file
```

### Service Responsibilities

#### Frontend (`frontend/`)

- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsibilities**:
  - User authentication and session management
  - Document search interface with advanced filtering
  - Case law browsing and citation tracking
  - Semantic query builder
  - Results visualization and export
- **Local Development**: `npm install && npm run dev`
- **Default Port**: 5173

#### Backend (`backend/`)

- **Tech Stack**: Python 3.11+, FastAPI, uvicorn, Poetry
- **Responsibilities**:
  - OpenAI embeddings generation and management
  - Vector similarity search (pgvector/FAISS)
  - Legal document parsing and chunking
  - RESTful API endpoints for search and retrieval
  - Authentication middleware
- **Local Development**: `poetry install && poetry run uvicorn app.main:app --reload`
- **Default Port**: 8000

#### Data (`data/`)

- **Contents**:
  - Legal corpus seeds (case law, statutes, regulations)
  - Pre-generated embeddings cache
  - Static reference datasets (jurisdiction mappings, citation graphs)
  - Sample queries and test fixtures
- **Note**: Large corpus files should be stored in external object storage; this folder holds samples and seeds for local dev.

#### Scripts (`scripts/`)

- **Purpose**: Automation and DevOps utilities
- **Examples**:
  - `seed-corpus.py` – Ingest legal documents into the vector store
  - `generate-embeddings.sh` – Batch process embeddings
  - `reset-db.sh` – Drop and recreate local database
  - `check-health.sh` – Verify all services are running

## Getting Started

### Prerequisites

- **Node.js**: v18+ (for frontend)
- **Python**: 3.11+ (for backend)
- **Poetry**: Python dependency management (`pip install poetry`)
- **PostgreSQL**: 15+ with pgvector extension (optional, can use FAISS for local dev)
- **OpenAI API Key**: Required for embeddings

### Initial Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/nyaya.git
   cd nyaya
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key and other credentials
   ```

3. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```

4. **Install backend dependencies**:
   ```bash
   cd ../backend
   poetry install
   ```

5. **Seed the database** (optional, for local testing):
   ```bash
   cd ../scripts
   ./seed-corpus.sh
   ```

### Running Locally

You can run services individually or use a process manager like `concurrently` or `docker-compose`.

**Frontend**:
```bash
cd frontend
npm run dev
# Accessible at http://localhost:5173
```

**Backend**:
```bash
cd backend
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# Accessible at http://localhost:8000
# API docs at http://localhost:8000/docs
```

**All services** (if using docker-compose – to be added in future ticket):
```bash
docker-compose up
```

## Development Workflow

1. **Feature branches**: Create branches from `main` following `feature/`, `fix/`, or `chore/` prefixes
2. **Pre-commit hooks**: Run linters and formatters automatically (ESLint + Prettier for TS, Black + Ruff for Python)
3. **Pull requests**: All changes must pass CI checks (type checking, tests, linting)
4. **Code reviews**: At least one approval required before merge

### Testing

**Frontend**:
```bash
cd frontend
npm run test         # Run unit tests
npm run test:e2e     # Run Playwright/Cypress e2e tests
```

**Backend**:
```bash
cd backend
poetry run pytest                # Run all tests
poetry run pytest --cov=app      # With coverage
```

## Project Status

🚧 **In Active Development** – Scaffold complete, service implementations in progress.

### Upcoming Tickets

- **Frontend scaffold**: Initialize Vite + React + Tailwind project structure
- **Backend scaffold**: Initialize FastAPI + Poetry project structure
- **Data seed**: Add sample legal corpus and embedding generation script
- **Search API**: Implement semantic search endpoints
- **Frontend search UI**: Build search interface and results display

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) (to be added) for guidelines on submitting issues and pull requests.

## License

[To be determined]

## Support

For questions or issues, please open a GitHub issue or contact the maintainers.
