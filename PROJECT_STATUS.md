# GATE HUB — Project Status

**Last updated:** 2026-08-12
**Repository:** `jaissatish-web/HERMES-MARKETING`
**Product direction:** GATE HUB / GCC-MENTOR SaaS

## Product

GATE HUB is the private founder control center for building, marketing and operating GCC-MENTOR. GCC-MENTOR is the customer-facing career service for job seekers in India and the Middle East, especially people targeting GCC/Middle East employment.

## Infrastructure

- GitHub: source of truth
- Vercel: connected; current feature branch deployment is passing
- Supabase: active and healthy
- VPS: not required
- Authentication: Supabase email/password
- Google OAuth: deferred

## Current build state

| Area | Status |
|---|---|
| Repository foundation | COMPLETE |
| Vercel deployment connection | WORKING |
| Supabase connection | COMPLETE |
| Email/password authentication | COMPLETE |
| Founder dashboard | IN PROGRESS |
| Progress/Roadmap UI | IN PROGRESS |
| Provider Manager | IN PROGRESS — CRUD and starter catalog implemented; live verification pending |
| Secure Credential Vault | IN PROGRESS — encrypted server-side path implemented and Edge Function deployed; live credential test pending |
| Model Manager | IN PROGRESS — provider-linked CRUD UI and database foundation implemented; live verification pending |
| Service Manager | IN PROGRESS — foundation exists; provider/model/credential wiring next |
| Governance | NOT STARTED |
| Service Gateway | NOT STARTED |
| Marketing engines | NOT STARTED |
| Growth/revenue | NOT STARTED |
| Full GCC-MENTOR SaaS | NOT STARTED |

## Architecture

Founder → GATE HUB UI → Supabase Auth + Database → Provider Manager → Secure Credential Vault → Model Manager → Service Manager → Approval + Budget Controls → Service Gateway → Research / Content / Social / Image / Video / Analytics → GCC-MENTOR

## Credential security boundary

- API secrets are never stored in frontend code or `NEXT_PUBLIC_*` variables.
- Normal browser clients do not receive credential ciphertext.
- The protected Supabase Edge Function authenticates founder/admin users and encrypts the submitted secret server-side with AES-GCM.
- The normal credential listing exposes only safe metadata and the last four characters.
- The encryption key exists only as the Supabase Edge Function secret `GATE_HUB_CREDENTIAL_ENCRYPTION_KEY`.
- Services will reference credential IDs, never raw API keys.

## Provider catalog

Starter providers seeded include OpenAI, Anthropic, Google AI, DeepSeek, OpenRouter, Perplexity, Mistral, Groq, Cohere, Replicate, Together AI, Fireworks AI, xAI, Hugging Face, Runway, ElevenLabs, Stability AI, Cloudflare, Microsoft Azure OpenAI and Meta. Additional providers can be added from the UI.

## Non-coder setup flow

1. Add provider — who supplies the capability?
2. Add credential — securely connect it.
3. Add/select model — which AI engine?
4. Create service — what job should GATE HUB perform?
5. Set budget and approval mode.
6. Test the service.
7. Mark it ready.

## Definition of done

A feature is complete only after UI, database, permissions, production build, Vercel deployment, live testing and roadmap/status updates all pass.

## Immediate next milestone

Finish live verification of Credential Vault and Model Manager, then wire Provider + Model + Credential into Service Manager.
