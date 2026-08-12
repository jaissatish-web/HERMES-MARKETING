# GATE HUB Software Audit — 2026-08-12

## Executive conclusion

The fastest credible path for a non-coder Founder is **not** to build every subsystem from scratch and not to make Hermes the foundation.

Build a **GATE HUB control plane** and connect independent engines behind clear service/API boundaries. Reuse permissively licensed software where it is a strong fit. Adapt or build only the missing pieces.

## Candidate matrix

| Capability | Candidate | License / model | Current assessment | Decision |
|---|---|---|---|---|
| Admin/control UI | Appsmith | Apache-2.0 | Mature low-code admin/dashboard platform; integrates with databases and APIs; strong fit for fast control-panel prototyping | SHORTLIST |
| Backend/auth/data | Appwrite | BSD-3-Clause | Self-hosted backend with auth, DB, storage, functions, messaging, realtime; microservice architecture | SHORTLIST |
| Simple backend alternative | PocketBase | MIT | Very easy self-hosted backend/admin; still pre-1.0 so backward compatibility is not guaranteed | SHORTLIST / PROTOTYPE |
| AI workflow builder | Flowise | Apache-2.0 | Visual AI-agent/workflow builder; self-hosted; strong for rapid AI capability prototyping | SHORTLIST |
| Agent/workflow runtime | LangGraph | MIT | Strong stateful/resilient workflow foundation; can be used without LangChain | SHORTLIST |
| Agent framework | OpenAI Agents SDK | MIT | Useful if/when agent orchestration is required; provider strategy still needs architecture review | SHORTLIST |
| Agent framework | AutoGen | MIT for code + CC-BY docs | Official repo is now maintenance mode; successor is Microsoft Agent Framework | REFERENCE ONLY |
| Web research/crawling | Crawl4AI | Apache-2.0 with attribution requirements in current project docs | Strong fit for controlled web extraction; current docs mention robots.txt compliance and commercial use | SHORTLIST |
| Social publishing | Mixpost | MIT | Self-hosted social scheduling/publishing; active 2026 release; strong fit for social engine | SHORTLIST / HIGH PRIORITY |
| Social publishing alternative | Postiz | AGPL-3.0 | Powerful social scheduling with many integrations, but copyleft obligations make it less attractive for proprietary core integration | OPTIONAL / SEPARATE SERVICE |
| Image generation | InvokeAI | Apache-2.0 | Strong self-hosted creative engine; current repo actively maintained and supports visual generation/editing | SHORTLIST / HIGH PRIORITY |
| Image/workflow alternative | ComfyUI | GPL-3.0 | Extremely capable and modular; excellent engine but GPL obligations and model-license complexity require careful separation | OPTIONAL / SEPARATE SERVICE |
| Publishing/CMS | Ghost | MIT | Mature publishing/newsletter platform; strong fit for owned content engine; trademarks remain separate | SHORTLIST |
| Product analytics | PostHog | MIT core except EE components | Strong product analytics/experimentation capability; need to use appropriate open-source/FOSS components only | SHORTLIST |
| Backend/content alternative | Strapi | Open-source/self-hosted; license must be checked at exact version | Strong CMS/content API but not necessarily needed if Ghost or custom content service fits | SECONDARY |
| Agentic marketing OS | Autonomous-AI-Marketing-Operating-System | MIT | Useful reference implementation showing CEO/orchestrator + specialists + DAG + memory; not sufficient as complete GATE HUB foundation | REFERENCE / EXTRACT IDEAS |
| AI workflow platform | Dify | Modified Apache-2.0 | Powerful, but current license restricts multi-tenant use without producer authorization and imposes frontend/logo conditions | NOT CORE |
| Automation platform | n8n | Sustainable Use License / fair-code | Excellent automation capability, but current license restricts use to internal business purposes/non-commercial use unless separately licensed | NOT CORE FOR COMMERCIAL SAAS |
| Low-code internal tools | ToolJet | AGPL-3.0 | Useful for internal app concepts, but copyleft makes it less attractive as proprietary core | OPTIONAL / SEPARATE SERVICE |

## Important license findings

### n8n

n8n's current Sustainable Use License allows modification and internal business use, but restricts commercial use of the software as a service/product. It is therefore not a safe default for embedding as the core of a commercial GATE HUB SaaS without a separate license arrangement.

### Dify

Dify's current license is based on Apache-2.0 with additional conditions. In particular, operating a multi-tenant environment requires written authorization/commercial licensing from Dify, and frontend/logo conditions apply. This makes Dify unsuitable as the assumed core of a commercial multi-tenant GATE HUB.

### Postiz

Postiz is AGPL-3.0. AGPL does permit commercial use, but modifications/distribution and network interaction can create source-disclosure and copyleft obligations. Treat it as a separately deployed component unless legal review confirms the intended architecture.

### ComfyUI

ComfyUI is GPL-3.0. It is technically excellent, but integrating GPL code directly into a proprietary core requires careful legal architecture. We should prefer a separate service boundary or choose an Apache/MIT alternative where practical.

### Appsmith / Appwrite / Flowise / LangGraph / InvokeAI / Ghost / Mixpost

These are more attractive for our first-pass commercial architecture because their primary repositories use permissive licenses such as Apache-2.0, MIT, or BSD-3-Clause. We must still audit third-party dependencies, plugins, models, assets, and trademarks before distribution.

## Recommended GATE HUB stack (provisional)

### Control plane

**Custom GATE HUB UI + Appsmith prototype**.

Use Appsmith to prototype the non-coder dashboard quickly. If we decide the dashboard is a core customer-facing proprietary product, build the final control panel as our own web app while retaining lessons/components from the prototype.

### Backend platform

**Appwrite or a custom Postgres-backed backend**.

Appwrite is a strong candidate because it provides auth, databases, storage, functions, messaging, realtime, and APIs, reducing the number of separate services we must build initially.

PocketBase is excellent for a very fast prototype but should be treated as a prototype option until its pre-1.0 stability is acceptable for our production requirements.

### AI workflow / automation

**Flowise + direct APIs for prototyping**, with **LangGraph** considered for durable workflows where stateful orchestration is actually needed.

We should not make a heavy agent framework mandatory for every service.

### Research engine

**Crawl4AI** as a strong candidate for controlled public-web extraction, with explicit respect for robots.txt, source terms, rate limits, and target-site policies.

### Social engine

**Mixpost** is currently the strongest first candidate for a separate social publishing service because it is self-hosted, purpose-built for scheduling/publishing, and MIT licensed.

Postiz is technically attractive but should not be the default proprietary core because it is AGPL-3.0.

### Creative engine

**InvokeAI** is the preferred current open-source image-generation candidate because it is Apache-2.0 and supports professional image workflows.

ComfyUI is a strong secondary engine, but GPL-3.0 and model-license complexity make it better as an isolated service if used.

### Owned content engine

**Ghost** is a strong candidate for the blog/content publishing layer because the core is MIT licensed and mature.

### Product analytics

**PostHog** is a strong candidate for product analytics and experiments, provided we select only the appropriately licensed components and respect any EE boundaries.

## Architecture recommendation

```text
                    GATE HUB
                 CONTROL PLANE
                       |
        +--------------+--------------+
        |              |              |
     SERVICES       SETTINGS       GOVERNANCE
        |              |              |
        |         provider/model      |
        |         API keys             |
        |         prompts              |
        |         budgets              |
        |         permissions          |
        |         approvals            |
        |                              |
        +------------------------------+
                       |
               SERVICE / API GATEWAY
                       |
       +---------------+----------------+
       |               |                |
   Research        Content           Creative
   Engine          Engine            Engine
       |               |                |
   Crawl4AI       Ghost/LLM        InvokeAI
       |               |                |
       +---------------+----------------+
                       |
              Social Publishing
                       |
                    Mixpost
                       |
                    Analytics
                       |
                   PostHog
                       |
                  GCC-MENTOR
```

## What we should build ourselves

Build these as GATE HUB intellectual property because they are specific to our needs:

1. GATE HUB service registry.
2. Provider/model/API-key configuration UI.
3. Permissions and approval engine.
4. Cost/budget policy engine.
5. Unified service API gateway.
6. Deployment/service health dashboard.
7. Cross-service audit log.
8. GCC-MENTOR-specific marketing data model.
9. GCC market opportunity scoring.
10. Unified campaign model.
11. Unified content/campaign library.
12. GCC-specific SEO/content workflows.
13. GCC-MENTOR product analytics mapping.
14. Founder-facing recommendation layer.
15. Optional Hermes orchestration adapter later.

## What we should not build ourselves initially

Do not rebuild from zero:

- social media scheduling infrastructure;
- generic web crawling;
- generic CMS;
- generic authentication/storage if a suitable platform is selected;
- image generation model infrastructure;
- basic product analytics;
- generic AI workflow canvas;
- generic agent runtime.

## Critical legal rule

This document is a technology-selection assessment, not legal advice.

Before commercial deployment or redistribution, Codex/legal review must inspect:

- exact repository license at the pinned commit/version;
- every bundled dependency license;
- model and checkpoint licenses;
- datasets/assets;
- fonts/icons/media;
- trademarks and logos;
- third-party API terms;
- social platform developer terms;
- any enterprise-only directories/features.

A public repository is not automatically safe to copy into a proprietary SaaS.

## Final provisional recommendation

For the first build, prioritize:

**Appsmith prototype + Appwrite/custom backend + Crawl4AI + Mixpost + Ghost + InvokeAI + PostHog**, with direct LLM APIs and Flowise/LangGraph only where they solve a concrete workflow problem.

Keep each external product isolated as a replaceable service. Do not merge copyleft code into the proprietary GATE HUB core unless the license strategy is explicitly approved.
