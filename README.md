# GATE HUB

## GCC-MENTOR Control & Growth Platform

This repository is the source of truth for **GATE HUB**, the modular control platform being built for GCC-MENTOR.

GATE HUB is designed as a non-coder Founder control center for:

- AI/LLM providers and models
- API/service connections
- service registry
- credentials/secrets references
- permissions and approvals
- budgets and cost controls
- research
- SEO
- content
- image/video/creative
- social publishing
- analytics
- campaigns
- experiments
- deployments and service health
- audit logs

## Current direction

**GATE HUB first.**

The system is service-first and API-first. Every major capability should be independently deployable and replaceable.

## Founder operating principles

- North Star: maximum profitable growth.
- Target ecosystem: GCC + India → GCC.
- Acquisition: mostly free/organic.
- Free product: GCC-MENTOR Free Career Toolkit.
- Monetization: premium services selected from evidence and platform capabilities.
- Major business decisions require Founder approval.
- Provider/model/API configuration must be possible from the Admin Control Center.
- Runtime secrets must never be committed to Git.
- Every privileged action must be auditable.

## Current target stack

The research shortlist is documented in `08-RESEARCH/GATE-HUB-SOFTWARE-AUDIT-2026-08-12.md`.

Provisional candidates include:

- custom GATE HUB control UI for the final product
- PostgreSQL for durable application data
- Crawl4AI for controlled public-web research
- Mixpost for social publishing
- Ghost for owned publishing/content
- InvokeAI for self-hosted image generation
- PostHog for product analytics
- Flowise/LangGraph only where a concrete workflow need exists

These are candidates, not blanket approvals. Exact versions, dependencies, model licenses, API terms and deployment boundaries must be verified before production use.

## Current software

```text
apps/gate-hub-prototype/   Founder Control Center prototype
apps/gate-hub-core/        Core API, database schema, and container definition
```

## Repository structure

```text
01-BUSINESS/        Business/product direction
02-MARKET/          Market intelligence
03-MARKETING/       Marketing strategy
05-WORKFLOWS/       Business and technical workflows
06-ADMIN-CONTROL-CENTER/
07-TECHNICAL/       GATE HUB architecture and implementation status
08-RESEARCH/        Open-source and service audits
09-TOOLS-AND-INTEGRATIONS/
10-MARKETING-OPERATIONS/
11-CAMPAIGNS/
12-CONTENT-SYSTEM/
13-GROWTH-SYSTEM/
14-REVENUE/
15-ANALYTICS/
16-SECURITY-AND-GOVERNANCE/
17-DEPLOYMENT/
18-TESTING/
19-ROADMAP/
20-DECISIONS/
apps/gate-hub-core/
apps/gate-hub-prototype/
```

## Current implementation

The repository contains:

- Founder Control Center prototype
- GATE HUB Core HTTP API slice
- service/provider/model/approval/audit API contracts
- emergency pause/resume API
- PostgreSQL schema
- local Docker Compose definition
- implementation status and production gap tracking

See `07-TECHNICAL/IMPLEMENTATION-STATUS.md` for the exact state.

## Important legal rule

A public GitHub repository is not automatically safe to copy into a commercial SaaS. Before forking, copying, bundling or redistributing any third-party component, verify the exact license/version, dependencies, model/asset licenses, trademarks and API terms. See `08-RESEARCH/`.
