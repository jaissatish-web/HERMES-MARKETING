# GATE HUB Core

Core control-plane API for the GATE HUB platform.

## Current capabilities

- health endpoint
- service registry API
- provider registry API
- model registry API
- approval request API
- global pause/resume control
- audit event API
- JSON request validation for core create operations
- container definition for Node 24

## Important current limitation

This first slice uses an in-memory runtime store. It is **not production persistence**. The next backend slice must replace the store with PostgreSQL, add authentication/RBAC, secure secret storage, rate limiting, request IDs, structured logging, and durable job handling.

## Run locally

```bash
npm start
```

Health:

```text
GET /health
```

Status:

```text
GET /api/v1/status
```

Create a service:

```bash
curl -X POST http://localhost:8787/api/v1/services \
  -H 'content-type: application/json' \
  -d '{"name":"Blog Writing","purpose":"SEO articles for GCC-MENTOR","category":"LLM / Text","approvalMode":"approval_required"}'
```

## Security rule

Never send real API keys to this API until the production secret-management layer is implemented. Credential fields are references only in this slice.
