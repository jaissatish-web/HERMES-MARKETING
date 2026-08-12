# GATE HUB — Master Roadmap

## North-star goal

Build a beautiful, founder-controlled GCC-MENTOR SaaS that manages marketing, growth and revenue operations through configurable AI/API services. The Founder should be able to understand and control the system without coding.

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

### 2.1 Provider Manager — NEXT
- [ ] Add provider
- [ ] Edit provider
- [ ] Enable/disable provider
- [ ] Provider type/category
- [ ] Plain-language provider description

### 2.2 Secure Credential Vault
- [ ] Add credential
- [ ] Secure secret handling
- [ ] Provider association
- [ ] Connection test
- [ ] Connected/disconnected status
- [ ] Never expose full secret after save

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

**NEXT:** Provider Manager

**Then:** Credential Vault → Model Manager → Service Manager wiring → Governance → Execution Gateway.

## Progress rule

Update this file whenever a milestone materially changes. A checkbox is only marked complete after the feature is tested and the production deployment succeeds.
