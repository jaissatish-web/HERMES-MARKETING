# GATE HUB Technical Architecture

## Objective

Build a modular software platform that gives a non-coder Founder one control center for research, SEO, content, creative generation, publishing, analytics, campaigns, providers, models, APIs, budgets, permissions, and deployments.

Hermes is optional and must not be a runtime dependency.

## Design principles

1. Service-first.
2. API-first between major engines.
3. Replaceable providers.
4. Replaceable open-source components.
5. Centralized permissions.
6. Centralized secrets management.
7. Centralized cost controls.
8. Human approval for high-impact actions.
9. Every service independently deployable.
10. GitHub is the source of truth for code and configuration definitions; runtime secrets stay outside Git.

## Proposed layers

### Layer 1 — GATE HUB UI

Non-coder control panel for:

- services
- provider/model registry
- API connections
- prompts
- permissions
- budgets
- approvals
- campaigns
- tasks
- deployments
- health
- analytics
- audit logs

### Layer 2 — Control/API layer

Own platform services:

- auth
- RBAC
- service registry
- provider registry
- secret references
- permission engine
- approval engine
- budget engine
- audit logging
- job/task management
- service health
- deployment metadata

### Layer 3 — Service gateway

A common interface that lets GATE HUB and GCC-MENTOR call external/internal services consistently.

Conceptual examples:

```text
research.search()
research.extract()
seo.analyze()
content.generate()
content.publish()
image.generate()
video.generate()
social.schedule()
social.publish()
analytics.query()
experiment.start()
```

The exact API contracts will be defined after prototypes are tested.

### Layer 4 — Engines

Initial engine candidates:

- Research
- SEO
- Content
- Creative/Image
- Video
- Social Publishing
- Analytics
- Experiments
- GCC-MENTOR integration

### Layer 5 — Providers

Providers are configured, not hard-coded.

Each service can declare:

- service name
- purpose
- category
- provider
- model
- credential reference
- allowed agents/services
- allowed actions
- limits
- budget
- primary/fallback
- approval mode

## Provider/model registry

Example configuration:

```text
Service: Blog Writing
Purpose: SEO articles for GCC career topics
Provider: <selected provider>
Model: <selected model>
Credential: <secret reference>
Allowed callers: Content Engine
Budget: <limit>
Approval: Draft required
Status: Active
```

## Deployment model

GATE HUB does not require every service to run on one machine.

Use the cheapest reliable deployment model per workload:

- static/edge frontend where appropriate
- managed web service where appropriate
- VPS for long-running workers/self-hosted engines
- GPU service for local image/video inference when justified
- managed database where appropriate

Services should communicate over authenticated APIs.

## Recommended first implementation

1. GATE HUB admin UI prototype.
2. Appwrite or custom backend for identity/data/storage.
3. Service registry.
4. Provider/model registry.
5. Secret-reference system.
6. Permission/approval engine.
7. One working Research Engine.
8. One working Content Engine.
9. One working Social Engine.
10. Analytics.
11. GCC-MENTOR integration.

Only then expand into image/video and advanced workflows.

## Reliability model

Every service should expose:

- `/health`
- `/version`
- capability list
- authentication method
- rate-limit state
- dependency status
- job status
- error information

Every long-running job should have:

- job ID
- status
- timestamps
- input reference
- output reference
- cost estimate/actual where available
- retry policy
- failure reason
- cancel capability

## Observability

Central GATE HUB should aggregate:

- service health
- request count
- errors
- latency
- cost
- queue depth
- failed jobs
- provider failures
- publishing failures

## Data boundaries

Keep GATE HUB configuration separate from user PII where possible.

Use explicit service contracts for GCC-MENTOR data access.

Do not grant external engines broad database access when an API or scoped data view is sufficient.

## Security

- least privilege
- service-to-service authentication
- encrypted secrets
- no API keys in Git
- signed/audited privileged actions
- server-side enforcement of approval rules
- per-service scopes
- rate limits
- cost limits
- backups
- restore testing

## Hermes compatibility

If Hermes is added later, it should call the same service gateway as the Founder dashboard.

```text
Founder -> GATE HUB -> Service Gateway -> Engines
Hermes  -> Service Gateway -> Engines
GCC-MENTOR -> Service Gateway -> Engines
```

This keeps Hermes optional and prevents vendor/agent lock-in.
