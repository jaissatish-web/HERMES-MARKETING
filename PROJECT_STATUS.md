# GATE HUB — Project Status

**Last updated:** 2026-08-12
**Repository:** `jaissatish-web/HERMES-MARKETING`
**Product direction:** GATE HUB / GCC-MENTOR SaaS

## Current direction

The original Hermes autonomous-agent plan has been retired as the primary architecture. GATE HUB is now the product: a founder-friendly SaaS control center that orchestrates marketing, growth and revenue services through configurable providers, models and secure credentials.

GCC-MENTOR is the customer-facing career service for job seekers in India and the Middle East, especially people targeting GCC/Middle East employment. GATE HUB is the private founder operating/control center used to build, market and operate that SaaS.

## Current infrastructure

- GitHub: connected and used as the source of truth.
- Vercel: connected for deployment.
- Supabase: connected and used as the database/auth foundation.
- VPS: not required at this stage.
- Google OAuth: intentionally deferred. Current authentication is email/password through Supabase.

## Current product architecture

```text
Founder
  ↓
GATE HUB UI
  ↓
Supabase Auth + Database
  ↓
Provider Manager
  ↓
Secure Credential Vault
  ↓
Model Manager
  ↓
Service Manager
  ↓
Approval + Budget Controls
  ↓
Service Gateway
  ↓
Research / Content / Social / Image / Video / Analytics
  ↓
GCC-MENTOR growth + customer product
```

## Current build state

| Area | Status | Notes |
|---|---|---|
| Repository foundation | COMPLETE | GitHub is source of truth |
| Vercel deployment | WORKING | Deployment is connected to `main`; latest main commit has a successful Vercel check |
| Supabase connection | COMPLETE | GATE-HUB project is active and healthy |
| Email/password authentication | COMPLETE | Founder login is the current method |
| Google OAuth | DEFERRED | Add later; no Google client credentials required now |
| Founder dashboard UI | IN PROGRESS | Premium control-center direction established |
| Progress/Roadmap UI | IN PROGRESS | Must reflect real implementation status |
| Service Manager | IN PROGRESS | UI exists; provider/model/credential relationships still need full wiring |
| Provider Manager | IN PROGRESS | Founder page and real Supabase CRUD are implemented; production verification is still required |
| Credential Vault | IN PROGRESS | Secure server-side encryption path and metadata-only browser listing implemented; encryption secret still needs one-time Supabase configuration and live verification |
| Model Manager | NEXT | Provider-linked model configuration |
| Service ↔ Provider ↔ Model ↔ Credential wiring | NOT STARTED | Must follow the setup sequence |
| Approval controls | NOT STARTED | Founder approval / automatic / draft-only |
| Budget controls | NOT STARTED | Limits and usage tracking |
| Service Gateway | NOT STARTED | Common execution layer |
| Research engine | NOT STARTED | Later integration |
| Content engine | NOT STARTED | Later integration |
| Social publishing | NOT STARTED | Later integration |
| Image generation | NOT STARTED | Later integration |
| Video generation | NOT STARTED | Later integration |
| Analytics/revenue | NOT STARTED | Later integration |
| Full GCC-MENTOR SaaS | NOT STARTED | Final target |

## Immediate next milestone

**Finish Credential Vault production verification → Model Manager → connect Provider + Credential + Model to Service Manager.**

The non-coder setup experience should be wizard-like and simple:

1. Add provider — who supplies the AI/API?
2. Add credential — securely connect the provider.
3. Select/add model — which AI engine should be used?
4. Create service — what job should GATE HUB perform?
5. Set budget + approval mode.
6. Test connection.
7. Mark service ready.

## Credential security boundary

- API secrets are never stored in frontend code or `NEXT_PUBLIC_*` variables.
- Browser clients do not receive SELECT access to the credential table.
- The protected Supabase Edge Function authenticates the Founder/admin, encrypts the secret server-side with AES-GCM, and stores only ciphertext plus safe metadata.
- The normal Credential Vault listing exposes only connection metadata and the last four characters of the secret.
- The raw secret is not displayed again by the Vault UI.
- The encryption key must exist only as a Supabase Edge Function secret named `GATE_HUB_CREDENTIAL_ENCRYPTION_KEY`.
- Service records will reference credential IDs, never raw API keys.

## Security rules

- Never store API secrets in frontend code.
- Never expose service-role or secret keys through `NEXT_PUBLIC_*` variables.
- API credentials belong in the secure Credential Vault, not directly in service records.
- Do not add a fake/plaintext API-key field to the Service Manager just for appearance.
- Founder/admin access must be controlled; Google accounts should not automatically become administrators.

## UI/UX rules

GATE HUB should feel like a premium SaaS operating system, not a static template. Every module should use the same design system and be understandable to a non-coder. Technical concepts should have plain-language explanations.

Examples:

- Provider = the company that supplies the AI/API.
- Model = the specific AI engine.
- Credential = the secure connection to the provider.
- Service = the job/capability GATE HUB performs.
- Approval mode = whether GATE HUB asks the Founder before acting.

## Definition of done

A feature is **COMPLETE** only when:

1. The UI works.
2. The database relationship works.
3. Authentication/permissions are respected.
4. The production build passes.
5. Vercel deployment is successful.
6. The feature is tested in the live app.
7. The Progress/Roadmap status is updated.

Do not mark features complete merely because code was committed.
