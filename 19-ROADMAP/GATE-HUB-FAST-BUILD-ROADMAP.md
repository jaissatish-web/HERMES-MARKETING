# GATE HUB Fast-Build Roadmap

## Objective

Reach a usable, non-coder-controlled GATE HUB as quickly as possible without creating a fragile monolith.

## Phase 0 — Legal and technology gate

- Pin candidate versions.
- Record exact licenses.
- Inspect third-party dependencies.
- Separate permissive-license core from copyleft/unclear components.
- Check API terms and commercial-use conditions.
- Decide REUSE / ADAPT / FORK / BUILD / REJECT.

**Exit:** technology shortlist approved.

## Phase 1 — Control plane prototype

Build:

- Founder login
- Dashboard shell
- Service registry
- Provider/model registry
- API connection records
- masked credential inputs
- permission matrix
- approval inbox
- budget controls
- service health cards

**Goal:** Founder can see and configure services without touching code.

## Phase 2 — First service engines

Implement only three real engines first:

1. Research Engine
2. Content Engine
3. Social Publishing Engine

Each must work independently and through GATE HUB.

## Phase 3 — Analytics and experimentation

Add:

- product analytics
- campaign tracking
- content performance
- funnel metrics
- experiment records
- cost tracking
- audit logs

## Phase 4 — Creative

Add:

- image generation
- image editing/variation
- video generation integration
- thumbnail generation
- asset library

Use separate services where model licensing or GPU requirements make separation safer.

## Phase 5 — GCC-MENTOR growth workflows

Add standardized workflows:

```text
Market research
  -> opportunity score
  -> SEO brief
  -> content draft
  -> review
  -> publish
  -> measure
  -> learn
```

And:

```text
User problem
  -> free tool/content
  -> activation
  -> referral
  -> premium opportunity
  -> revenue
```

## Phase 6 — Deployment automation

Define per-service deployment templates.

Preferred approach:

- GitHub source
- pull request review
- CI checks
- container image
- environment-specific configuration
- managed/VPS deployment
- health checks
- rollback

## Phase 7 — Optional Hermes layer

Only after GATE HUB can run independently.

Hermes can be added as an orchestration/decision layer that calls existing services through the service gateway.

No engine should require Hermes.

## Success criteria

GATE HUB v1 is successful when a non-coder Founder can:

1. add a provider;
2. select a model;
3. store an API credential securely;
4. assign the service to an engine;
5. set permissions;
6. set a budget;
7. run the service manually;
8. approve/reject sensitive actions;
9. view status and logs;
10. deploy/update a service through a controlled process;
11. view the result;
12. operate GCC-MENTOR marketing workflows without SSH or code editing.
