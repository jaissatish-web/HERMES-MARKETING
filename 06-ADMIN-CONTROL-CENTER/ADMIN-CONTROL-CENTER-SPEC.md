# GATE HUB Admin Control Center Specification

**Status:** Active product requirement

## Goal

Provide a beautiful, non-technical control center from which the Founder can understand, configure, approve, pause, and audit the entire GATE HUB platform without editing code or using SSH for normal administration.

## Core principle

**Complex underneath. Simple for the Founder.**

The system must provide a simple Founder experience and an Advanced Control Center for deeper administration.

## Main areas

1. Home / Founder Dashboard
2. Approval Center
3. Service Manager
4. AI Model Manager
5. Prompt Manager
6. API & Integration Manager
7. Secret/API Key Vault
8. Tool Registry
9. Tasks & Workflows
10. Campaigns
11. Social Publishing
12. Creative Studio
13. Experiments
14. Analytics
15. Budgets & Cost Controls
16. Notifications
17. Audit Logs
18. Security & Permissions
19. System Health
20. Deployment & Service Operations

## Founder Dashboard

Show in plain language:

- active services
- service health
- users
- activation
- conversion
- retention
- revenue
- acquisition economics
- current campaigns
- approvals waiting
- important alerts
- API/model health
- current spending and remaining budget
- running jobs
- failed jobs

## Service Manager

For each engine/service show:

- purpose
- status
- version
- host/deployment
- provider/model
- available tools
- allowed actions
- budget
- rate limits
- approval requirements
- recent activity
- errors
- pause/resume control
- run/test control

## Service automation modes

Recommended baseline modes:

- Off
- Read / Inspect
- Recommend
- Draft
- Execute approved routine actions
- Execute within explicit limits

The system must support capability-level permissions rather than only service-wide permissions.

## AI Model Manager

Founder can manage:

- AI providers
- models
- API connection status
- model routing by service/task
- model availability
- cost limits
- usage
- latency/quality metadata
- fallback models
- connection testing

Providers and models must be configurable rather than hard-coded into individual services.

## Prompt Manager

Prompts must be configuration/version data, not buried in application code.

Capabilities:

- view/edit prompts
- version history
- create new version
- test prompt
- compare versions
- activate version
- rollback
- attach prompt to service/task/model
- document purpose and expected behavior

Production prompt changes must be auditable.

## API & Integration Manager

Manage external connections such as:

- LLM providers
- research/search services
- analytics
- SEO/search data
- social platforms
- email
- messaging
- image generation
- video generation
- voice generation
- design/media tools
- CMS/publishing systems

For each integration show:

- connection status
- provider
- capabilities
- permissions
- allowed services
- rate limits
- cost limits
- test connection
- disconnect/revoke
- audit history

New external platform connections require Founder approval.

## Secret/API Key Vault

Secrets must never be committed to GitHub.

The UI should show connection state and masked credentials, not raw secrets after storage. Secrets should be stored securely on the server/infrastructure with appropriate encryption and access controls.

## Tool Registry

Every external capability available to services should be represented as a registered tool with:

- name
- provider
- purpose
- version
- capability list
- allowed services
- allowed actions
- cost model
- action limits
- approval requirement
- status
- audit trail

## Cost controls

Provide:

- global monthly budget
- per-provider limits
- per-service limits
- per-tool limits
- per-action thresholds
- campaign budgets
- current usage
- forecasted usage
- remaining budget
- automatic spending stop

Paid advertising and other spending require Founder authorization according to the approved policy.

## Approval Center

Every high-impact action should present:

- proposed action
- reason
- expected benefit
- evidence
- estimated cost
- risk
- reversibility
- affected users/accounts
- recommended action

Founder actions:

- Approve
- Reject
- Modify
- Request more evidence
- Defer

## Social Publishing

Per platform support:

- disconnected / connected
- draft-only
- approval-required
- automatic within limits
- disabled
- account permissions
- posting limits
- content policy controls
- publishing history

Mass communications require approval.

## Creative Studio

Central queue for:

- images
- videos
- thumbnails
- social graphics
- voice/audio

Every generated asset should retain metadata linking it to the campaign, service, prompt/model, generation time, and approval state where appropriate.

## Experiments

Show:

- hypothesis
- target metric
- baseline
- variant
- traffic allocation
- cost
- results
- confidence/evidence quality
- conclusion
- next recommendation
- Founder decision

## Analytics

Combine marketing, product, conversion, retention, and revenue metrics. The platform should explain significant changes in plain language and link recommendations to evidence.

## Emergency controls

A global **Pause All Automated Activity** control is mandatory.

Also support granular pause controls for:

- individual services
- social publishing
- external communications
- paid advertising
- API spending
- individual integrations
- scheduled jobs

Emergency controls must be fast, visible, audited, and fail-safe.

## Notification controls

The platform routes notifications according to urgency while the dashboard remains the canonical history.

Founder can configure:

- severity thresholds
- channels
- quiet periods
- escalation rules
- critical events that always interrupt

## Audit log

Record:

- who/what acted
- timestamp
- action
- reason
- service/tool/provider/model
- prompt/version where relevant
- input/output metadata where safe
- approval
- result
- cost
- errors
- rollback/reversal

## Non-technical UX requirements

Avoid exposing implementation details in the default interface.

Use understandable labels such as:

- Creativity: Low / Balanced / High
- Response length: Short / Medium / Long
- Automation: Off / Recommend / Draft / Execute

Provide contextual **Explain this** help for advanced settings.

Technical settings can exist in Advanced Mode.

## Security requirements

- least-privilege access
- encrypted secrets
- no secrets in repository
- role-based permissions
- audit logs
- approval enforcement server-side
- rate limits
- spend limits
- kill switches
- session security
- secure OAuth/token handling
- backup and recovery

The UI must never be the only enforcement point. Critical permissions must be enforced by the backend/tool gateway.
