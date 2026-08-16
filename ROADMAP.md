# GATE HUB — Master Roadmap

## North-star goal
Build a beautiful, founder-controlled GATE HUB for marketing, growth and revenue operations behind GCC-MENTOR, the career service for job seekers in India and the Middle East targeting GCC employment.

## Phase 0 — Foundation
- [x] GitHub source of truth
- [x] Vercel deployment
- [x] Supabase connection
- [x] Next.js foundation

## Phase 1 — Access + Founder Control Center
- [x] Email/password authentication
- [ ] Google OAuth (deferred)
- [x] Founder dashboard shell
- [ ] Fully functional sidebar modules
- [x] Progress/Roadmap concept

## Phase 2 — AI Stack Control (CURRENT)

### Provider Manager — IN PROGRESS
- [x] CRUD UI
- [x] Enable/disable
- [x] Provider type, purpose and website
- [x] Safe archive guard
- [x] Starter provider catalog
- [ ] Production/live verification

### Secure Credential Vault — IN PROGRESS
- [x] Credential UI
- [x] Provider association
- [x] Server-side AES-GCM encryption
- [x] Browser cannot read ciphertext
- [x] Metadata-only listing
- [x] Full secret never shown after save
- [x] Supabase Edge Function deployed with JWT verification
- [ ] Provider connection test
- [ ] Live credential-save verification
- [ ] Health status

### Model Manager — IN PROGRESS
- [x] Add model UI
- [x] Provider association
- [x] Purpose/capabilities
- [x] Enable/disable
- [x] Default/backup flags
- [ ] Production/live verification

### Service Manager — NEXT
- [x] UI foundation
- [ ] Provider selector
- [ ] Model selector filtered by provider
- [ ] Credential selector
- [ ] Complete relationship save/edit
- [ ] Enable/disable
- [ ] Budget
- [ ] Approval mode
- [ ] Test service

## Phase 3 — Governance
- [ ] Founder approval engine
- [ ] Automatic / approval / draft-only modes
- [ ] Budget limits
- [ ] Usage tracking
- [ ] Audit log
- [ ] Permission model

## Phase 4 — Execution Layer
- [ ] Service Gateway
- [ ] Provider/model routing
- [ ] Server-only credential injection
- [ ] Retry/fallback
- [ ] Usage/cost capture
- [ ] Job queue

## Phase 5 — Marketing Engines
- [ ] Research
- [ ] Competitor/SEO research
- [ ] Content/blog writing
- [ ] Social generation/publishing
- [ ] Image generation
- [ ] Video generation
- [ ] Email workflows

## Phase 6 — Growth + Revenue
- [ ] Acquisition
- [ ] Conversion
- [ ] Retention
- [ ] Revenue dashboard
- [ ] Campaign analytics

## Phase 7 — GCC-MENTOR SaaS
- [ ] Customer/workspace model
- [ ] Multi-tenant permissions
- [ ] Onboarding
- [ ] Billing
- [ ] Usage limits
- [ ] Customer dashboards
- [ ] Security/legal review
- [ ] Production launch

## Current position
**CURRENT:** Phase 2 — AI Stack Control

**ACTIVE:** Credential Vault + Model Manager; Provider Manager verification.

**NEXT:** Service Manager wiring → Governance → Service Gateway → Marketing → Growth → GCC-MENTOR SaaS.

## Progress rule
A checkbox becomes complete only after UI, database, permissions, production build, Vercel deployment and live testing all pass.
