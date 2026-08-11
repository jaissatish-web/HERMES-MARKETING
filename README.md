# HERMES-MARKETING

## Hermes — Marketing + Growth + Revenue Operating System for GCC-MENTOR

This repository is the **source of truth** for the Hermes project.

Hermes is being designed as a **supervised autonomous CMO / growth and revenue system** for GCC-MENTOR. The Founder/CEO remains the final authority on major business decisions.

### How this repository is used

1. Capture approved founder decisions.
2. Document business, market, marketing, agent, workflow, dashboard, and technical requirements.
3. Record research findings and evidence.
4. Track experiments and outcomes.
5. Maintain the current system architecture and implementation plan.
6. Keep a decision history so future work can continue without relying on chat history.

## Source-of-truth rule

Before making significant Hermes decisions or implementation changes, read:

- `00-CONTEXT/HERMES-MASTER-CONTEXT.md`
- `00-CONTEXT/FOUNDER-DECISIONS.md`
- `00-CONTEXT/DECISION-LOG.md`
- the relevant topic documents

When a founder decision changes, update the repository documentation so the repository remains the authoritative project memory.

## Current strategic direction

- **North Star:** Maximum profitable growth
- **Business scope:** Marketing + growth + revenue
- **Target ecosystem:** GCC + India → GCC
- **Market prioritization:** Dynamic, evidence-based
- **Free product:** Free Career Toolkit
- **Monetization:** Premium services selected from evidence, platform capability, market demand, and conversion potential
- **Acquisition philosophy:** Mostly free/organic; paid acquisition only within founder-approved spending limits
- **Growth model:** Useful free product + lead generation + built-in referral/viral loops
- **Experimentation:** Dynamic based on traffic, data quality, risk, and upside
- **Positioning:** Research-driven
- **Competitive intelligence:** Dynamic based on competitive threat
- **Autonomy:** Supervised autonomous
- **Dashboard:** Simple founder dashboard + advanced control center
- **Governance:** Major decisions require founder approval
- **Uncertainty:** Hermes dynamically chooses whether to ask, wait, or run a low-risk experiment
- **Operating rhythm:** Daily operations + continuous alerts
- **Notifications:** Dynamic according to urgency

## Planned documentation areas

```text
00-CONTEXT/      Project memory, decisions, governance
01-BUSINESS/     Business model, north star, revenue
02-MARKET/       Demand, GCC/India research, competitors
03-MARKETING/    Organic growth and channel plans
04-AGENTS/       Hermes and specialist agent specifications
05-WORKFLOWS/    Daily, monitoring, approvals, experiments
06-DASHBOARD/    Founder and advanced control center
07-TECHNICAL/    Architecture, VPS, data, integrations, security
08-RESEARCH/     Open-source and license audits
```

## Important implementation principle

Do **not** deploy autonomous agents or connect production accounts merely because a capability exists. Each capability must have documented permissions, approval boundaries, auditability, rollback/disable controls, and a clear business purpose.
