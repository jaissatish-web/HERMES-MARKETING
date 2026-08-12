# GATE HUB — Master Roadmap

## North-star goal

Build a beautiful, founder-controlled GCC-MENTOR SaaS that manages marketing, growth and revenue operations through configurable AI/API services. The Founder should be able to understand and control the system without coding.

GCC-MENTOR is the customer-facing career service for job seekers in India and the Middle East, especially people targeting GCC/Middle East employment. GATE HUB is the private founder control center used to build, market and operate it.

## Phase 0 — Foundation

- [x] GitHub repository and source-of-truth workflow
- [x] Vercel deployment connection
- [x] Supabase project/database connection
- [x] Next.js application foundation

## Phase 1 — Access + Founder Control Center

- [x] Supabase email/password authentication
- [ ] Google OAuth (deferred until explicitly requested)
- [x] Founder dashboard shell
- [ ] Fully functional sidebar modules
- [x] Visual build-progress/roadmap concept

## Phase 2 — AI Stack Control (CURRENT)

### 2.1 Provider Manager — IN PROGRESS
- [x] Add provider UI and real Supabase insert
- [x] Edit provider
- [x] Enable/disable provider
- [x] Provider type/category
- [x] Plain-language provider description
- [x] Website/API reference field
- [x] Safe archive guard when a provider is linked to a service
- [x] Starter provider catalog seeded for common AI/search/image/video providers
- [ ] Production deployment verification
- [ ] Live application test

### 2.2 Secure Credential Vault — IN PROGRESS
- [x] Add credential UI
- [x] Provider association
- [x] Server-side encryption boundary
- [x] Browser cannot SELECT credential ciphertext
- [x] Metadata-only credential listing
- [x] Never expose full secret after save
- [ ] Configure encryption key as Supabase Edge Function secret
- [ ] Connection test against provider
- [ ] Connected/disconnected health status
- [ ] Production deployment verification
- [ ] Live application test

### 2.3 Model Manager
- [ ] Add model
- [ ] Associate model with provider
- [ ] Purpose/description
- [ ] Enable/disable model
- [ ] Default/backup model support

### 2.4 Service Manager
- [x] Service list UI foundation
- [x] Add Service UI foundation
- [ ] Provider selector backed by real Provider Manager
- [ ] Model selector filtered by provider
- [ ] Credential selector backed by Credential Vault
- [ ] Save complete service relationship
- [ ] Edit service
- [ ] Enable/disable service
- [ ] Budget configuration
- [ ] Approval configuration
- [ ] Test service

## Phase 3 — Governance

- [ ] Founder approval engine
- [ ] Automatic / Founder approval / Draft-only modes
- [ ] Budget limits
- [ ] Usage tracking
- [ ] Audit log
- [ ] Permission model
- [ ] Safety/confirmation rules for high-impact actions

## Phase 4 — Execution Layer

- [ ] Common service gateway
- [ ] Provider/model routing
- [ ] Credential injection only server-side
- [ ] Retry/fallback handling
- [ ] Usage/cost capture
- [ ] Job queue/status model

## Phase 5 — Marketing Engines

- [ ] Content research
- [ ] Competitor research
- [ ] SEO research
- [ ] Blog/content writing
- [ ] Social post generation
- [ ] Social scheduling/publishing
- [ ] Image generation
- [ ] Video generation
- [ ] Email/communication workflows

## Phase 6 — Growth + Revenue

- [ ] Acquisition tracking
- [ ] Conversion tracking
- [ ] Retention workflows
- [ ] Revenue dashboard
- [ ] Campaign performance
- [ ] Analytics integrations

## Phase 7 — GCC-MENTOR SaaS

- [ ] Customer/workspace model
- [ ] Multi-tenant permissions
- [ ] Onboarding wizard
- [ ] Subscription/billing architecture
- [ ] Usage limits
- [ ] Customer-facing dashboards
- [ ] Production security review
- [ ] Legal/licensing review for integrated/open-source components
- [ ] Production launch

## Current position

**CURRENT:** Phase 2 — AI Stack Control

**ACTIVE:** Secure Credential Vault implementation and Provider Manager production verification

**THEN:** Model Manager → Service Manager wiring → Governance → Execution Gateway.

## Progress rule

Update this file whenever a milestone materially changes. A checkbox is only marked complete after the feature is tested and the production deployment succeeds.
