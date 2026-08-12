# GATE HUB Architecture Pivot

**Date:** 2026-08-12

## Decision

The project is pivoting from a Hermes-first implementation to a **software-first GATE HUB architecture**.

Hermes is no longer a required foundation for the system.

The preferred architecture is:

**GATE HUB = control plane + admin UI + service registry + permissions + deployment/operations visibility**

with independent software engines that can:

- run by themselves;
- be used manually from GATE HUB;
- expose APIs;
- be connected to GCC-MENTOR;
- optionally be orchestrated later by Hermes or another automation layer.

## Why this is better for a non-coder Founder

- Each capability can be understood and controlled separately.
- Existing software can be reused instead of rebuilding everything.
- Good open-source projects can be forked/adapted where licensing permits.
- Services can be deployed independently.
- A broken component does not have to break the entire platform.
- Providers can be replaced without rewriting the whole system.
- The Founder can use a single dashboard instead of managing servers directly.

## Service-first architecture

```text
Founder
   |
   v
GATE HUB
   |
   +-- Service Registry
   +-- API/Model Registry
   +-- Permissions
   +-- Approval Controls
   +-- Secrets Management
   +-- Cost Controls
   +-- Deployments
   +-- Logs/Health
   |
   +-- Research Engine
   +-- SEO Engine
   +-- Content Engine
   +-- Creative Engine
   +-- Social Publishing Engine
   +-- Analytics Engine
   +-- Experiment Engine
   +-- GCC-MENTOR Connector
   |
   +-- Optional Hermes/automation layer later
```

## Build philosophy

For each capability:

1. Find existing software.
2. Verify license and commercial-use rights.
3. Inspect maintenance and security.
4. Test the software.
5. Decide REUSE / ADAPT / FORK / BUILD / REJECT.
6. Isolate it behind an API/service boundary.
7. Add it to GATE HUB.

## Important legal principle

A GitHub repository being public does **not** mean its code is free of conditions.

We must evaluate repository license, included third-party components, model licenses, assets, trademarks, API terms, and any enterprise-only directories/features before commercial use.

## Immediate architecture direction

Prefer permissive-license components for the core commercial platform where practical:

- MIT
- Apache-2.0
- BSD-3-Clause

Use copyleft/source-available components only with an explicit architecture and legal review that fits the intended deployment model.

## Hermes status

Hermes is deferred as an optional orchestration layer. The system must remain useful and operable without Hermes.
