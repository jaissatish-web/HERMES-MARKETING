# GATE HUB Fast Build Plan

## Objective

Build a working, non-coder-friendly GATE HUB as soon as possible without making Hermes a dependency.

## Guiding principle

**Use existing software where it removes commodity engineering work; build GATE HUB-specific control and GCC-MENTOR logic ourselves.**

## Phase 0 — Legal and repository preparation

- Pin approved repository versions/commits.
- Create an attribution/legal inventory.
- Record all third-party repositories and their licenses.
- Record all third-party dependencies.
- Record model/checkpoint licenses separately.
- Keep GATE HUB proprietary code separated from copyleft components unless the legal architecture explicitly allows the combination.

## Phase 1 — GATE HUB shell

Build:

- authentication
- Founder dashboard
- service registry
- provider/model registry
- credential references
- permission matrix
- approval center
- budget controls
- audit log
- system health

Prototype the UI quickly using Appsmith if that accelerates validation. Do not treat Appsmith as a permanent dependency until the required workflows are validated.

## Phase 2 — Core service gateway

Define a common service contract.

Example operations:

```text
research.search()
research.extract()
content.generate()
content.publish()
image.generate()
video.generate()
social.schedule()
social.publish()
analytics.query()
```

Every service should support:

- authentication
- capability discovery
- health check
- version
- job IDs
- errors
- cost metadata where available
- cancellation/retry where appropriate

## Phase 3 — First production engines

### Research Engine

Candidate: Crawl4AI as a separate service.

Add GATE HUB controls for:

- source allowlist/blocklist
- robots policy
- rate limits
- crawl budget
- evidence/source storage
- job history

### Social Engine

Candidate: Mixpost as a separate service.

Add GATE HUB controls for:

- platform connections
- post approval
- scheduling
- account permissions
- publishing limits
- failure handling

### Content Engine

Candidate: Ghost as publishing layer + configurable LLM provider.

GATE HUB owns:

- provider/model registry
- prompts
- content workflow
- approval
- publishing policy
- GCC-MENTOR content metadata

### Analytics Engine

Candidate: PostHog / appropriate FOSS components.

GATE HUB maps analytics to:

- acquisition
- activation
- conversion
- retention
- referral
- revenue

## Phase 4 — Creative

### Image

Candidate: InvokeAI as isolated service.

Need separate model-license inventory.

### Video

Select an API/service after a current 2026 audit of:

- API reliability
- generation quality
- cost
- commercial-use terms
- watermark policy
- storage
- generation latency

Do not lock the platform to one provider.

## Phase 5 — GATE HUB provider control

For every AI/service integration the Founder can configure:

- service name
- purpose
- provider
- model
- credential/API key reference
- allowed caller/service
- allowed actions
- budget
- approval level
- primary/fallback
- status

The actual secret is stored securely outside Git and displayed only as a masked value.

## Phase 6 — GCC-MENTOR-specific layer

Build ourselves:

- GCC market opportunity scoring
- GCC job-market intelligence data model
- content taxonomy
- campaign model
- free career toolkit integration
- premium offer experiments
- conversion funnel
- referral system
- GCC-specific SEO templates
- Founder reporting

## Phase 7 — Optional AI orchestration

Only after the direct service architecture works, evaluate whether Hermes adds enough value.

If added, Hermes must use the same service gateway as the Founder UI.

No external agent framework may bypass GATE HUB permissions, budgets, secrets, audit logs, or approvals.

## Phase 8 — Deployment

Possible deployment split:

- GATE HUB web UI: Vercel or equivalent
- API/control plane: managed container or VPS
- worker services: VPS/container platform
- media generation: GPU service or API provider
- database: managed Postgres/Appwrite/custom backend
- object storage: S3-compatible storage

Final hosting choices are made after load/security/cost testing.

## First working milestone

The first milestone is complete when a non-coder Founder can:

1. Open GATE HUB.
2. Add an AI provider.
3. Select a model.
4. Add the credential securely.
5. Assign that provider/model to a service.
6. Run a Research job.
7. Review the result.
8. Approve a content job.
9. Publish through the Social/Content Engine.
10. View the activity and cost log.
11. Pause the service.

This milestone does not require Hermes.

## Expansion rule

Every new feature must answer:

- Does existing software already solve most of it?
- Is the license safe for the intended deployment?
- Can we isolate it behind an API?
- Is the dependency worth the operational cost?
- Would building a small internal component be simpler?

Avoid adding an agent or external product merely because it is fashionable.
