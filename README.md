# GATE HUB

## GCC-MENTOR Control & Growth Platform

This repository is the source of truth for **GATE HUB**, the modular control platform being built for GCC-MENTOR.

Hermes is **optional** and is not a runtime dependency of GATE HUB.

GATE HUB is designed first as a non-coder Founder control center for:

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

**GATE HUB first. Hermes later.**

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

The current research shortlist is documented in `08-RESEARCH/GATE-HUB-SOFTWARE-AUDIT-2026-08-12.md`.

Provisional candidates include:

- Appsmith for rapid admin-panel prototyping
- Appwrite or a custom Postgres backend for core platform services
- Crawl4AI for controlled public-web research
- Mixpost for social publishing
- Ghost for owned publishing/content
- InvokeAI for self-hosted image generation
- PostHog for product analytics
- Flowise/LangGraph only where a concrete AI workflow need exists

These are candidates, not blanket approvals. Exact versions, dependencies, model licenses, API terms and deployment boundaries must be verified before production use.

## Repository structure

```text
00-CONTEXT/         Project context and decisions
01-BUSINESS/        Business/product direction
02-MARKET/          Market intelligence
03-MARKETING/       Marketing strategy
04-AGENTS/          Optional Hermes/agent specifications
05-WORKFLOWS/       Business and technical workflows
06-ADMIN-CONTROL-CENTER/
07-TECHNICAL/       GATE HUB architecture
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
apps/gate-hub-prototype/
```

## First build milestone

The first working milestone is a **Founder Control Center prototype** that demonstrates:

1. service registry;
2. provider/model registry;
3. purpose and service descriptions;
4. masked credential fields;
5. agent/service permissions;
6. budgets;
7. approval mode;
8. service health;
9. tasks;
10. alerts;
11. audit activity.

The prototype uses mock data only. It must not contain real production credentials or automatically connect external accounts.

## Next implementation phases

### Phase 1 — GATE HUB Core

Build the real web application, authentication, database, service registry, provider/model registry, approval engine, budget controls, audit log and health system.

### Phase 2 — First engines

Research Engine → Content Engine → Social Engine → Analytics.

### Phase 3 — Creative

Image → Video → Voice.

### Phase 4 — GCC-MENTOR integration

Connect the product, free toolkit, campaigns, funnels and revenue metrics.

### Phase 5 — Optional Hermes

Hermes may later use the same service gateway as the Founder dashboard. GATE HUB remains fully functional without Hermes.

## Important legal rule

A public GitHub repository is not automatically safe to copy into a commercial SaaS. Before forking, copying, bundling or redistributing any third-party component, verify the exact license/version, dependencies, model/asset licenses, trademarks and API terms. See `08-RESEARCH/`.
