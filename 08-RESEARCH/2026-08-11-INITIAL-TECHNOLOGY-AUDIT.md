# Hermes Initial Technology Audit — 2026-08-11

## Executive recommendation

For GCC-MENTOR, do not build a custom multi-agent framework from zero.

Use a **modular architecture**:

- Hermes application/control plane: build ourselves because this is our differentiated Founder experience.
- Agent runtime/orchestration: start with a proven open-source framework and keep it behind our own abstraction.
- Automation/integration layer: use an existing workflow engine where appropriate rather than implementing every connector ourselves.
- Social publishing: strongly consider an existing self-hostable scheduler rather than building every social connector from scratch, subject to license/commercial review.
- AI providers: provider-neutral gateway with multiple supported providers.
- Prompts/skills/tools/permissions: store and manage as Hermes-owned configuration.

## Initial candidates reviewed

### 1. OpenAI Agents SDK — candidate: REUSE/ADAPT

The official Python SDK is MIT licensed. Its documented primitives include agents, tools, handoffs, guardrails, and built-in tracing. This is a strong fit for straightforward agent/tool orchestration and observability. It should not become a hard dependency on OpenAI models; Hermes needs a provider abstraction above the SDK.

Source: https://github.com/openai/openai-agents-python

Evidence checked: official GitHub repository/license/docs on 2026-08-11.

### 2. Google ADK — candidate: RESEARCH FURTHER / POSSIBLE REUSE

Google's ADK is Apache-2.0 licensed. The current Python project describes a workflow runtime supporting routing, fan-out/fan-in, loops, retries, state management, dynamic nodes, human-in-the-loop, and nested workflows. This overlaps strongly with Hermes requirements. However, Hermes should avoid making the architecture dependent on a single model vendor, so provider abstraction and interoperability must be tested before selection.

Source: https://github.com/google/adk-python

Evidence checked: official GitHub repository/license/docs on 2026-08-11.

### 3. LangGraph — candidate: RESEARCH FURTHER / POSSIBLE REUSE

LangGraph describes itself as a low-level orchestration framework for stateful, long-running agents. It is mature and actively maintained. It may be useful where Hermes needs durable stateful workflows, explicit control, retries, and human-in-the-loop behavior. We need a precise license review and architecture comparison before committing.

Source: https://github.com/langchain-ai/langgraph

Evidence checked: official GitHub repository on 2026-08-11.

### 4. CrewAI — candidate: RESEARCH FURTHER

CrewAI is MIT licensed and specifically targets role-based multi-agent collaboration. It is conceptually attractive for the Hermes specialist-agent model. However, we should compare its orchestration/control characteristics against LangGraph/ADK/OpenAI Agents SDK rather than selecting it simply because the mental model is easy to understand.

Source: https://github.com/crewAIInc/crewAI

Evidence checked: official GitHub README/license on 2026-08-11.

### 5. n8n — candidate: REUSE AS INTEGRATION/WORKFLOW LAYER, SUBJECT TO COMMERCIAL TERMS

n8n provides a free self-hosted Community edition and a large integration ecosystem. Its official documentation says the Community edition is free indefinitely. However, n8n's licensing model is not equivalent to a permissive MIT/Apache application library, so we must review the current Sustainable Use License/other applicable terms and our intended commercial architecture before embedding, white-labeling, or redistributing it. We can potentially use it as an internal workflow/integration service rather than copying its code.

Source: https://github.com/n8n-io/n8n

Evidence checked: official n8n documentation/GitHub on 2026-08-11.

### 6. Postiz — candidate: REUSE/INTEGRATE, LICENSE REVIEW REQUIRED

Postiz is a self-hostable social media scheduling system with many platform integrations and an API/n8n integration. The repository currently identifies AGPL-3.0 licensing. AGPL is commercially usable, but its copyleft obligations must be understood before modifying/distributing/embedding it into a proprietary SaaS. Our safest initial approach is to treat Postiz as a separately deployed service if we choose it, not copy its source into Hermes, until legal architecture review is complete.

Source: https://github.com/gitroomhq/postiz-app

Evidence checked: official repository/license/docs on 2026-08-11.

## Initial architecture decision

### Build ourselves

These are strategic/differentiating:

- Hermes CMO decision engine
- Founder dashboard
- Admin Control Center
- approval system
- autonomy/permission model
- tool registry
- model/provider routing layer
- prompt/skill management
- decision memory
- Founder decision history
- business-specific growth scoring
- GCC-MENTOR strategy layer
- unified audit trail
- cost/budget governance

### Prefer existing components

- agent runtime/orchestration
- durable workflow execution
- generic job queues
- social scheduling/publishing connectors
- OAuth helpers
- generic observability
- generic analytics infrastructure where appropriate

### Do not copy blindly

A project can be technically excellent but unsuitable for our SaaS because of license obligations, API terms, privacy, security, maintenance, or architecture. Popularity is not approval.

## Proposed technical direction

### Control plane

**Custom Hermes Admin Control Center**

This is the Founder-facing product and should be proprietary to GCC-MENTOR/Hermes.

### Agent plane

Start with a modular agent runtime. Shortlist:

1. OpenAI Agents SDK
2. Google ADK
3. LangGraph
4. CrewAI

Run a focused proof-of-concept against the same Hermes workflow before final selection.

### Integration plane

Use a workflow/integration system where it reduces connector work. n8n is a strong candidate, but licensing and commercial deployment architecture must be reviewed first.

### Social plane

Postiz is a strong candidate for an external/self-hosted social publishing service because it supports many platforms and exposes automation integrations. Treat its AGPL license as a deliberate architectural constraint, not something to ignore.

### Model plane

Create a Hermes-owned provider interface. Example logical tasks:

- strategy
- research
- writing
- structured extraction
- multimodal analysis
- coding/technical tasks
- image generation
- video generation
- speech/transcription

The selected provider/model can change without changing the agent business logic.

## Free-first operating principle

The marketing system should minimize recurring SaaS subscriptions.

Prefer:

- self-hosted open-source infrastructure where licensing permits
- free platform APIs/tiers where legitimate
- organic acquisition
- product-led growth
- SEO/content
- referrals
- community and partnership distribution

Pay only where the capability materially improves growth or reliability.

## Immediate next research

1. Complete detailed comparison of OpenAI Agents SDK vs Google ADK vs LangGraph vs CrewAI.
2. Verify current licenses and commercial implications for every selected component.
3. Research current LLM API pricing/capabilities for likely providers.
4. Research image generation APIs.
5. Research video generation APIs.
6. Research official social APIs and publishing restrictions for GCC-MENTOR's target channels.
7. Research SEO/search/research tooling with free or low-cost options.
8. Research analytics/product-data stack.
9. Research secure secret management and OAuth architecture.
10. Produce a final **REUSE / ADAPT / BUILD** architecture decision.

## Important limitation

This is an initial technical audit, not legal advice. Before commercial distribution of modified AGPL or other copyleft software, obtain appropriate legal review of the exact deployment and distribution model.
