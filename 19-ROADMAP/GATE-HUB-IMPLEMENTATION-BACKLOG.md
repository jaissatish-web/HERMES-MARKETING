# GATE HUB Implementation Backlog

**Status:** Active — Phase 1 implementation started

## Goal

Turn the current Founder Control Center prototype into a production-grade, secure, non-coder administration platform for GCC-MENTOR.

## Phase 0 — Prototype baseline

- [x] Establish GATE HUB direction
- [x] Document service-first architecture
- [x] Create Founder Control Center prototype
- [x] Create service registry UI
- [x] Create provider/model UI
- [x] Create permissions UI
- [x] Create approval UI
- [x] Create budget UI
- [x] Create audit/activity UI
- [x] Create system health UI
- [x] Add mock service creation flow
- [x] Persist prototype-created services in browser storage
- [x] Add defensive rendering for user-entered prototype fields

## Phase 1 — Production GATE HUB Core

### Application

- [ ] Choose final web stack after prototype review
- [ ] Authentication
- [ ] Founder account and roles
- [ ] RBAC / capability permissions
- [ ] Persistent database
- [ ] API layer
- [ ] Structured validation
- [ ] Error handling

### Service Registry

- [ ] Create service CRUD
- [ ] Service categories
- [ ] Purpose/description
- [ ] Capability list
- [ ] Provider/model association
- [ ] Credential reference
- [ ] Allowed callers
- [ ] Allowed actions
- [ ] Approval mode
- [ ] Budget
- [ ] Primary/fallback provider
- [ ] Health state

### Provider / Model Registry

- [ ] Provider CRUD
- [ ] Model CRUD
- [ ] Model capabilities
- [ ] Task routing metadata
- [ ] Cost metadata
- [ ] Limits/quotas
- [ ] Health/test connection

### Secure credentials

- [ ] Server-side secret storage
- [ ] Encryption at rest
- [ ] Masked browser display
- [ ] Rotation support
- [ ] Credential test without exposing secret
- [ ] No secrets in GitHub

### Approvals

- [ ] Approval request model
- [ ] Founder approval/reject/defer
- [ ] Evidence field
- [ ] Cost estimate
- [ ] Risk classification
- [ ] Action expiration
- [ ] Audit trail

### Budgets

- [ ] Global budget
- [ ] Provider budget
- [ ] Service budget
- [ ] Action threshold
- [ ] Current usage
- [ ] Forecast
- [ ] Automatic spend stop

### Audit

- [ ] User/action identity
- [ ] Timestamp
- [ ] Service
- [ ] Provider/model
- [ ] Action
- [ ] Approval
- [ ] Result
- [ ] Cost where available
- [ ] Failure/rollback record

## Phase 2 — Service Gateway

- [ ] Standard service contract
- [ ] Service authentication
- [ ] Request IDs
- [ ] Rate limits
- [ ] Timeouts
- [ ] Retry policy
- [ ] Cost accounting
- [ ] Request/response metadata
- [ ] Health endpoints
- [ ] Capability discovery

## Phase 3 — First engines

### Research

- [ ] Integrate approved research engine
- [ ] Source tracking
- [ ] robots/terms controls
- [ ] Rate limits
- [ ] Evidence output

### Content

- [ ] LLM provider registry integration
- [ ] Prompt/version management
- [ ] Draft generation
- [ ] Human review
- [ ] CMS integration

### Social

- [ ] Social engine integration
- [ ] Draft/schedule/publish modes
- [ ] Platform-level permissions
- [ ] Approval enforcement

### Analytics

- [ ] Product analytics integration
- [ ] Marketing analytics
- [ ] Unified metrics
- [ ] Funnel view
- [ ] Alerts

## Phase 4 — Creative

- [ ] Image service
- [ ] Model registry
- [ ] Prompt/version records
- [ ] Asset storage
- [ ] Video service
- [ ] Voice service
- [ ] Cost tracking

## Phase 5 — GCC-MENTOR integration

- [ ] User metrics
- [ ] Free toolkit metrics
- [ ] Conversion events
- [ ] Premium revenue
- [ ] Campaign attribution
- [ ] Referral events
- [ ] GCC market segmentation

## Acceptance criteria for production MVP

A non-technical Founder must be able to:

1. Add a service.
2. Define its purpose.
3. Select provider and model.
4. Add a secure credential.
5. Test the connection.
6. Set a budget.
7. Select allowed actions.
8. Select approval mode.
9. Run a task.
10. See the result.
11. See cost/usage where available.
12. Review audit history.
13. Pause the service.
14. Resume the service.
15. See whether the service is healthy.

No production task should require editing code or using SSH during normal operation.
