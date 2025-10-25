# Nyaya Backend

This directory will contain the Python FastAPI backend service for Nyaya.

## Planned Stack

- Python 3.11+
- FastAPI
- Poetry (dependency management)
- uvicorn (ASGI server)
- OpenAI SDK
- pgvector or FAISS

## Development

Future tickets will add the initial project scaffold. For now, reserve this folder for API routes, embedding logic, vector storage, and service layer code.

## Commands Reference

Once scaffolded:

```bash
# Install dependencies
poetry install

# Run development server
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run tests
poetry run pytest

# Format code
poetry run black .
poetry run ruff check .
```
