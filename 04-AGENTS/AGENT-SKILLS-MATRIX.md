# Hermes Agent Skills Matrix

**Status:** Initial capability map — to be validated during implementation and open-source audit

## Purpose

Hermes should use a modular skill system. A skill is a reusable capability that an agent can invoke through a controlled tool interface.

Do not assume a skill should be built from scratch. Before implementation, research existing reliable open-source projects, APIs, and agent skills, then record reuse/adaptation decisions and license compatibility.

## Core Hermes skills

### 1. Strategic planning

- define objectives
- translate Founder goals into measurable targets
- prioritize opportunities
- create plans
- allocate agent work
- maintain strategy state

### 2. Market research

- web research
- demand discovery
- keyword/topic research
- competitor research
- customer/problem research
- market sizing signals
- evidence collection
- source quality assessment

### 3. Competitive intelligence

- monitor public competitor changes
- compare positioning
- compare offers/pricing
- detect product/content changes
- identify threats/opportunities
- maintain evidence and dates

### 4. SEO

- keyword discovery
- search-intent classification
- content-gap analysis
- technical SEO recommendations
- on-page optimization
- internal-link recommendations
- SEO content briefs
- Search Console analysis

### 5. Content strategy

- topic selection
- content calendar
- briefs
- article drafting
- updates/repurposing
- content quality checks
- factual/source checks
- brand consistency

### 6. Social content

- platform-specific content adaptation
- captions
- post drafting
- hashtags where useful
- publishing schedules
- engagement analysis
- content performance analysis

### 7. Creative/media

- image generation
- image editing/variation
- thumbnail generation
- video ideation
- video scripts
- video generation through approved providers
- voice/audio generation where useful
- asset metadata and approval tracking

### 8. Distribution

- publish/schedule through approved platform APIs
- platform-specific formatting
- campaign tagging
- publishing verification
- failure/retry handling

### 9. Growth / PLG

- funnel analysis
- activation optimization
- referral loops
- viral mechanics
- landing-page experiments
- onboarding experiments
- cohort analysis

### 10. Conversion optimization

- CTA analysis
- landing-page recommendations
- offer testing
- funnel diagnostics
- experiment design

### 11. Revenue strategy

- offer research
- willingness-to-pay signals
- conversion analysis
- pricing recommendations
- upsell/cross-sell ideas
- revenue forecasting
- unit economics

Pricing changes remain Founder approval actions.

### 12. Analytics

- data ingestion
- metric normalization
- dashboard metrics
- anomaly detection
- cohort analysis
- attribution analysis
- CAC/LTV calculations
- revenue analysis
- natural-language explanation

### 13. Experimentation

- hypothesis generation
- test design
- risk assessment
- traffic allocation recommendation
- measurement
- result analysis
- stopping/continuation recommendation

### 14. Lifecycle / retention

- onboarding analysis
- lifecycle segmentation
- re-engagement recommendations
- retention analysis
- churn signals
- messaging drafts

Mass communication remains approval-controlled.

### 15. Lead generation / CRM

- lead capture
- qualification
- segmentation
- lead scoring
- pipeline analysis
- follow-up recommendations

### 16. Reporting

- daily brief
- weekly growth report
- campaign reports
- experiment reports
- executive summaries
- alerts

### 17. Notification / alerting

- anomaly detection
- severity classification
- alert routing
- escalation
- notification preferences

### 18. Tool and model routing

- select appropriate model/tool
- estimate cost
- check permissions
- check quotas
- fallback routing
- record tool/model usage

### 19. Governance / approvals

- classify action risk
- determine whether approval is required
- create approval requests
- enforce policy
- record Founder decisions

### 20. Memory / knowledge management

- retrieve project context
- maintain structured decisions
- store research evidence
- link decisions to sources
- maintain strategy history

## Skills that require special safeguards

- paid advertising
- pricing changes
- mass communications
- social publishing
- external account connections
- sensitive/controversial content
- major product strategy
- financial actions

These must use the approval/permission layer.

## Suggested agent-to-skill mapping

| Agent | Primary skills |
|---|---|
| Hermes CMO | planning, research, competitive intelligence, growth, revenue, governance |
| Research Agent | market research, competitive intelligence, evidence |
| SEO Agent | SEO, research, content strategy, analytics |
| Content Agent | content strategy, writing, research, quality checks |
| Social Agent | social content, distribution, analytics |
| Creative Agent | image, video, voice, asset management |
| Growth Agent | PLG, conversion, experiments, analytics |
| Revenue Agent | revenue strategy, conversion, unit economics |
| Analytics Agent | analytics, anomaly detection, reporting |
| Lifecycle Agent | retention, lifecycle, lead/CRM |
| Distribution Agent | publishing, scheduling, verification |
| Governance Agent | permissions, approvals, policy enforcement |

## Skill architecture requirement

Skills should be:

- modular
- versioned
- testable
- permission-aware
- auditable
- provider-independent where practical
- replaceable without rewriting Hermes

Each skill should declare:

- purpose
- inputs
- outputs
- required tools
- required permissions
- cost characteristics
- risks
- approval level
- fallback behavior
- test cases
- owner/maintainer

## Research requirement

Before selecting or implementing each major skill, conduct an open-source/API audit covering:

- reliability
- maintenance activity
- security posture
- license
- commercial-use rights
- API terms
- data/privacy implications
- rate limits
- cost
- integration effort
- community adoption

The result belongs in `08-RESEARCH/` and must distinguish **reuse**, **adapt**, and **build** decisions.
