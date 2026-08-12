# GATE HUB Legal / Reuse Matrix

**Review date:** 2026-08-12

## Scope

This document records an engineering-level open-source reuse assessment for GATE HUB. It is **not legal advice** and does not replace counsel's review for a commercial product.

A permissive repository license does not automatically clear every dependency, model, dataset, plugin, trademark, or API term. Production approval requires checking the exact pinned version/commit and its dependency tree.

## Decision classes

- **GREEN — Fork/adapt allowed in principle:** permissive repository license fits commercial modification/distribution, subject to notices and dependency/model review.
- **YELLOW — Separate service / legal review:** technically useful but copyleft, attribution, model-license, or other obligations make direct incorporation into a proprietary core unattractive.
- **RED — Do not use as commercial core:** license/terms conflict with the intended SaaS architecture or the project has a material maintenance/compatibility problem.
- **BLUE — Reference only:** use ideas/architecture; do not copy code until a separate license review is completed.

## Current matrix

| Project | Capability | Current license/terms | Commercial reuse signal | GATE HUB decision |
|---|---|---|---|---|
| Appsmith | Admin/control panel | Apache-2.0 | Permissive; official repo describes admin panels/internal tools and current 2026 release | GREEN for fork/prototype, with notices/dependency review |
| Appwrite | Auth/database/storage/realtime/backend | BSD-3-Clause | Permissive; official repo confirms BSD-3-Clause | GREEN for core dependency or adapted backend |
| Flowise | Visual AI workflow | Apache-2.0 | Permissive repository license; self-hosting supported | GREEN for isolated workflow service |
| LangGraph | Stateful workflow runtime | MIT | Permissive; current active releases | GREEN for backend workflow component |
| OpenAI Agents SDK | Agent runtime | MIT | Permissive; can be added later if agent layer is needed | GREEN as optional runtime |
| Crawl4AI | Web extraction/research | Apache-2.0 + attribution requirement | Commercial use allowed, but current project documentation requires attribution | GREEN with attribution and web-use compliance |
| Mixpost | Social scheduling/publishing | MIT | Explicit MIT license; current release active in 2026 | GREEN / HIGH PRIORITY |
| Ghost | CMS/publishing | MIT; trademarks separate | Commercial code reuse is permitted by license; branding/trademark rules still apply | GREEN as separate content engine |
| PostHog | Product analytics | MIT for core excluding EE; third-party components retain original licenses | Suitable if only permitted components are deployed | GREEN / HIGH PRIORITY with component audit |
| InvokeAI | Image generation | Apache-2.0 repository | Favorable repository license, but models/checkpoints remain separately licensed | GREEN as engine; MODEL LICENSE REQUIRED |
| Postiz | Social scheduling | AGPL-3.0 | Commercial use can be possible, but copyleft/network obligations make proprietary-core embedding unattractive | YELLOW / SEPARATE SERVICE |
| ComfyUI | Image workflow engine | GPL-3.0 | Strong technical capability, but GPL obligations make proprietary-core incorporation risky | YELLOW / SEPARATE SERVICE or replace |
| n8n | Automation | Sustainable Use License / fair-code | License limits use to internal business purposes/non-commercial use unless separately licensed; does not fit a commercial customer-facing GATE HUB core | RED for core |
| Dify | AI application/workflow | Modified Apache-2.0 | Commercial use permitted generally, but multi-tenant use requires written authorization and frontend/logo conditions apply | RED for GATE HUB core unless commercial permission obtained |
| AutoGen | Agent runtime | MIT code / CC-BY docs | License itself is permissive, but official repo is maintenance mode and points users to successor technology | BLUE / REFERENCE ONLY |
| Autonomous-AI-Marketing-Operating-System | Marketing-agent reference | MIT | License is permissive; architecture is useful, but it is a strategy-generation reference rather than the full GATE HUB platform | BLUE / EXTRACT IDEAS |

## Key evidence used

### Appsmith

Official GitHub identifies Appsmith as a platform for admin panels, internal tools and dashboards, states Apache-2.0 licensing, and shows a current v2.0 release in May 2026. citeturn977988search5turn977988search4

### Appwrite

Official GitHub identifies Appwrite as cloud infrastructure including Auth, Databases, Storage, Functions, Messaging, Hosting and Realtime, and states BSD-3-Clause licensing. citeturn977988search2turn977988search7

### Flowise

Official repository states self-hosted deployment and Apache License 2.0 for its source code. citeturn104767search5

### LangGraph

Official repository is MIT licensed and continues to publish current releases; it is positioned as a resilient workflow/runtime layer. citeturn104767search7turn775915search2

### OpenAI Agents SDK

Official repository is MIT licensed and describes a framework for multi-agent workflows. citeturn775915search8turn775915search1

### Crawl4AI

The project license is Apache-2.0. Its current changelog explicitly says commercial use is allowed but requires clear attribution, and it documents robots.txt compliance support. citeturn104767search2turn104767search6

### Mixpost

The official repository states MIT licensing, self-hosted scheduling/publishing, and a latest 2.6.0 release dated March 16, 2026. citeturn775915search9

### Ghost

The official repository states MIT licensing and separately warns that Ghost and the Ghost logo are trademarks, subject to its trademark policy. citeturn104767search9

### PostHog

The official repository says the main code is MIT except the `ee/` directory, which has a separate license, and third-party components retain their original licenses. PostHog also maintains a `posthog-foss` repository for a fully FOSS-oriented build. citeturn977988search3turn977988search0

### Postiz

The current Postiz repository is AGPL-3.0. That does not automatically prohibit commercial use, but it creates copyleft obligations that make it unsuitable as an unexamined proprietary-core dependency. citeturn104767search4turn104767search12

### n8n

n8n's official license FAQ says its Sustainable Use License permits internal business use but restricts selling/hosting n8n as a product or service; the project explicitly describes itself as fair-code rather than OSI open source. citeturn775915search3

### Dify

Dify's current license is a modified Apache-2.0 with additional conditions. It expressly requires written authorization/commercial licensing for a multi-tenant environment using the Dify source, and imposes frontend/logo requirements. citeturn775915search0

## What “fork/copy” means for us

### We can normally fork/adapt GREEN projects

Subject to the exact version and dependency review, the following are candidates for real reuse:

- Appsmith
- Appwrite
- Flowise
- LangGraph
- OpenAI Agents SDK
- Crawl4AI
- Mixpost
- Ghost
- InvokeAI repository code
- PostHog FOSS/core components as appropriate

We must preserve required copyright/license notices and comply with any attribution/NOTICE requirements.

### We should NOT copy code directly from YELLOW projects into the proprietary core

Instead use one of:

1. deploy the project as an isolated service;
2. communicate over an API boundary;
3. obtain commercial/legal permission;
4. replace the project with a permissively licensed alternative;
5. implement our own clean-room-compatible service based only on public behavior/specification where appropriate.

### We should not make RED projects a foundation without a new license agreement

Current examples:

- n8n
- Dify

## Model and asset licensing rule

An application license is not the same as a model license.

For image/video/AI systems, we must separately verify:

- model/checkpoint license
- LoRA/add-on license
- training-data restrictions if stated
- generated-content terms from the provider
- commercial-use rights
- attribution requirements
- trademark/brand restrictions

This is particularly important for InvokeAI, ComfyUI and any other media engine.

## API and platform legal rule

Even if GATE HUB uses MIT/Apache/BSD software, the APIs it connects to remain subject to their own developer terms. This applies to:

- social networks
- search engines
- analytics providers
- LLM APIs
- image/video APIs
- email systems
- messaging systems

GATE HUB must use official APIs or otherwise permitted access, respect rate limits, and avoid prohibited scraping or account automation.

## Production approval checklist

Before any component is moved to production:

- [ ] Pin exact version/commit.
- [ ] Save license text in the attribution/legal inventory.
- [ ] Review dependency licenses.
- [ ] Review models/assets/licenses.
- [ ] Review third-party API terms.
- [ ] Review trademarks/branding.
- [ ] Review security advisories.
- [ ] Run dependency/security scan.
- [ ] Test backup/restore.
- [ ] Define isolation boundary.
- [ ] Define upgrade path.
- [ ] Record decision in the architecture log.

## Important limitation

This matrix is an engineering/compliance screening, not a legal opinion. Before commercial redistribution of substantial third-party code, obtain qualified legal review where the license, copyleft boundary, trademark, dependency, model, or SaaS-use question is material.
