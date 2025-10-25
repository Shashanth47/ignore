# Nyaya Data Assets

This folder centralises legal corpora, embeddings, and reference datasets shared across services.

## Structure Guidelines

```
data/
├── corpus/          # Seed legal documents and sample datasets
├── embeddings/      # Generated embedding vectors for local testing
├── fixtures/        # JSON/YAML fixtures used in tests
└── README.md        # This file
```

Large or proprietary datasets should be stored in external object storage and referenced via configuration. Only include minimal seeds necessary for development and testing.
