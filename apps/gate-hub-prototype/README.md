# GATE HUB Founder Control Center Prototype

This is a **static prototype** of the Founder Control Center.

It is intentionally dependency-free so it can be opened directly in a browser or deployed as static files to a simple web host.

## Prototype screens

- Overview
- Services
- Providers & Models
- Permissions
- Approvals
- Budgets
- Activity & Audit
- System Health

## Prototype behavior

The prototype demonstrates the intended user experience and interaction model using mock data.

The service registry form can add a mock service in the browser session. No real credentials are stored or transmitted.

## Security note

**Never enter real API keys into this prototype.**

The production GATE HUB must store secrets server-side through an encrypted secret-management mechanism and expose only masked status to the browser.

## Production path

Replace the static data layer with the GATE HUB backend and keep the same UI concepts:

```text
Browser
  -> GATE HUB API
      -> Auth/RBAC
      -> Service Registry
      -> Provider/Model Registry
      -> Secret Vault
      -> Approval Engine
      -> Budget Engine
      -> Audit Log
      -> Service Gateway
```
