# Hermes Research Roadmap

## Purpose

Before implementation, research the ecosystem so Hermes reuses reliable components where legally and technically appropriate instead of rebuilding everything.

## Research tracks

### A. Agent frameworks and orchestration

Evaluate suitable open-source frameworks for:

- agent orchestration
- workflows
- tool calling
- memory
- human-in-the-loop approvals
- scheduled jobs
- retries
- observability

Record license, activity, security, architecture fit, and commercial-use suitability.

### B. LLM providers

Compare current providers/models for:

- strategy
- research
- long-form writing
- structured extraction
- multimodal analysis
- coding/technical tasks
- cost
- latency
- reliability
- context window
- tool/function calling

Hermes should support provider abstraction and model routing.

### C. Image generation

Research APIs that support commercial production use, reliable API access, predictable pricing, quality, editing/variation, and suitable licensing/terms.

### D. Video generation

Research production-ready APIs for short-form and long-form marketing video, including generation time, pricing, quality, watermark/usage terms, and commercial rights.

### E. Voice/audio

Research text-to-speech, voiceover, transcription, and audio tools with suitable commercial terms.

### F. Social publishing

Research official APIs and approved publishing mechanisms for target platforms. Record restrictions, review requirements, rate limits, account requirements, and content policies.

### G. Research/search/data

Research web search, crawling where permitted, SEO data, trends, and public data tools. Avoid prohibited scraping and respect robots/terms where applicable.

### H. Analytics

Research analytics and product-data integrations needed for acquisition, activation, conversion, retention, revenue, and attribution.

### I. Email and messaging

Research compliant transactional/lifecycle communication tools. Mass communications remain Founder approval-controlled.

### J. Secrets/security

Research secure secret management, OAuth/token storage, audit logging, RBAC, encryption, backups, and server security.

## Decision categories

For every candidate component, classify:

- **REUSE** — use largely as-is
- **ADAPT** — fork/wrap/modify where license and maintenance allow
- **BUILD** — implement ourselves because no suitable component exists
- **REJECT** — unsuitable license, security, quality, maintenance, cost, or architecture

## Required research record

Each evaluated component should include:

- name
- official repository/site
- purpose
- license
- commercial-use status
- maintenance/activity
- stars/community only as supporting signals, not proof of quality
- security considerations
- dependencies
- API/SDK quality
- cost
- limitations
- integration complexity
- fit for Hermes
- recommendation
- date checked

No component is considered approved for production solely because it is popular on GitHub.
