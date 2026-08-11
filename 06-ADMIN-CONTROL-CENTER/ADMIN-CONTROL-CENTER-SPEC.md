# Hermes Admin Control Center Specification

**Status:** Founder-approved product requirement

## Goal

Provide a beautiful, non-technical control center from which the Founder can understand, configure, approve, pause, and audit the entire Hermes marketing/growth/revenue system without editing code or using SSH for normal administration.

## Core principle

**Complex underneath. Simple for the Founder.**

The system must provide a simple Founder experience and an Advanced Control Center for deeper administration.

## Main areas

1. Home / Founder Dashboard
2. Approval Center
3. Hermes Strategy
4. Agent Manager
5. AI Model Manager
6. Prompt Manager
7. API & Integration Manager
8. Secret/API Key Vault
9. Tool Registry
10. Tasks & Workflows
11. Campaigns
12. Social Publishing
13. Creative Studio
14. Experiments
15. Analytics
16. Budgets & Cost Controls
17. Notifications
18. Audit Logs
19. Security & Permissions
20. System Health

## Founder Dashboard

Show in plain language:

- users
- activation
- conversion
- retention
- revenue
- acquisition economics
- current Hermes objective
- current strategy
- recommendations
- approvals waiting
- important alerts
- agent status
- AI/API health
- current spending and remaining budget

## Agent Manager

For each agent show:

- purpose
- status
- autonomy level
- assigned model
- available tools
- allowed actions
- budget
- rate limits
- approval requirements
- recent activity
- errors
- pause/resume control

## Autonomy levels

Recommended baseline levels:

- Level 0 — Off
- Level 1 — Read / Research
- Level 2 — Recommend
- Level 3 — Draft
- Level 4 — Execute approved routine actions
- Level 5 — Autonomous within explicit boundaries

The system must support capability-level permissions rather than only agent-wide permissions.

## AI Model Manager

Founder can manage:

- AI providers
- models
- API connection status
- model routing by task
- model availability
- cost limits
- usage
- latency/quality metadata
- fallback models
- testing

Do not hard-code Hermes to one AI provider.

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
- attach prompt to agent/task/model
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

For each integration show:

- connection status
- provider
- capabilities
- permissions
- allowed agents
- rate limits
- cost limits
- test connection
- disconnect/revoke
- audit history

New external platform connections always require Founder approval.

## Secret/API Key Vault

Secrets must never be committed to GitHub.

The UI should show connection state and masked credentials, not raw secrets after storage. Secrets should be stored securely on the server/infrastructure with appropriate encryption and access controls.

## Tool Registry

Every external capability available to agents should be represented as a registered tool with:

- name
- provider
- purpose
- version
- capability list
- allowed agents
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
- per-agent limits
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
- Ask Hermes for more evidence
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

Every generated asset should retain metadata linking it to the campaign, agent, prompt/model, generation time, and approval state where appropriate.

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
- Hermes conclusion
- next recommendation
- Founder decision

## Analytics

Combine marketing, product, conversion, retention, and revenue metrics. Hermes should explain significant changes in plain language and link recommendations to evidence.

## Emergency controls

A global **Pause All Autonomous Activity** control is mandatory.

Also support granular pause controls for:

- Hermes
- individual agents
- social publishing
- external communications
- paid advertising
- API spending
- individual integrations

Emergency controls must be fast, visible, audited, and fail-safe.

## Notification controls

Hermes chooses notification channel dynamically according to urgency, while the dashboard remains the canonical history.

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
- tool/provider
- model
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
- Automation: Off / Recommend / Draft / Execute / Autonomous

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
