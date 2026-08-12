# Codex Build Specification — GATE HUB Core

## Objective

Turn the current `apps/gate-hub-prototype/` into a production-grade, non-coder Founder Control Center for GCC-MENTOR.

GATE HUB is the primary platform. Hermes is optional and must not be required for the core system to operate.

## Product behavior

The Founder must be able to manage the following from the web UI without editing source files or SSH for normal administration:

- services
- service purpose
- provider
- model
- credentials/secret references
- allowed callers
- allowed actions
- approval mode
- budget
- primary/fallback provider
- service status
- service health
- tasks/jobs
- approvals
- audit history

## Non-negotiable security rules

1. Never store raw API keys in Git.
2. Never return raw API keys to browser clients after creation.
3. Enforce permissions server-side.
4. Enforce approval rules server-side.
5. Enforce budgets server-side.
6. Log privileged actions.
7. Use least-privilege credentials.
8. Do not allow arbitrary remote command execution from the Founder UI.
9. All third-party services must be isolated behind explicit adapters/contracts.
10. Prototype mock credentials must never be reused in production.

## Recommended production architecture

```text
Browser
  |
  v
GATE HUB Web App
  |
  v
GATE HUB API
  |
  +--> Auth / RBAC
  +--> Service Registry
  +--> Provider / Model Registry
  +--> Secret Reference Layer
  +--> Approval Engine
  +--> Budget Engine
  +--> Audit Log
  +--> Job / Task Manager
  +--> Health Monitor
  +--> Service Gateway
             |
             +--> Research Engine
             +--> Content Engine
             +--> Social Engine
             +--> Analytics Engine
             +--> Creative Engine
```

## Service contract

Every managed engine must expose or be wrapped with a common contract containing:

- service ID
- service name
- version
- capabilities
- health
- execute endpoint or adapter
- configuration schema
- authentication method
- rate limits
- cost metadata

Long-running execution should use a job model:

- job ID
- service ID
- state
- created time
- started time
- completed time
- input reference
- output reference
- cost estimate
- actual cost when available
- retry count
- error reason
- cancellation status

## Initial production screens

1. Overview
2. Services
3. Providers & Models
4. Credentials
5. Permissions
6. Approvals
7. Budgets
8. Tasks
9. Activity / Audit
10. System Health
11. Settings

## Service form

Required fields:

- service name
- purpose
- category
- provider
- model (when applicable)
- credential reference
- allowed callers
- allowed actions
- approval mode
- budget
- primary/fallback configuration
- active/inactive

## Provider/model form

Required fields:

- provider name
- provider type
- model ID/name
- capabilities
- cost metadata
- rate limits
- credential reference
- active/inactive
- test connection

## Approval model

Approval request must contain:

- request ID
- action
- actor/service
- reason
- evidence
- expected benefit
- estimated cost
- risk
- reversibility
- requested scope
- expiry
- decision
- decision maker
- decision timestamp

## Founder UX

The default UI should use plain language.

Prefer:

- Automation: Off / Recommend / Draft / Execute / Autonomous
- Creativity: Low / Balanced / High
- Response length: Short / Medium / Long

Advanced technical configuration can exist behind an Advanced Mode.

## Initial implementation constraints

- Do not add an AI agent framework merely for the sake of having agents.
- Do not add Hermes in Phase 1.
- Do not hard-code one AI provider.
- Do not tightly couple the UI to any external engine.
- Do not merge copyleft code into the proprietary GATE HUB core without a documented legal decision.
- Keep external services independently replaceable.

## Test requirements

Before production:

- authentication tests
- permission tests
- approval tests
- budget-limit tests
- secret-masking tests
- service health tests
- job retry/cancel tests
- audit completeness tests
- provider failure/fallback tests
- end-to-end service execution test

## Definition of done for GATE HUB Core MVP

A Founder can log in, add a service, configure provider/model and credential reference, assign permissions, define a budget and approval mode, test the service, run a job, view the result, inspect cost/health/audit history, and pause the service — all from the UI.
