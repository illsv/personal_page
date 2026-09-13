---
title: "From isolated AI features to a multi-agent platform"
date: 2026-09-13
weight: 1
summary: "How a multi-tenant Rails SaaS product moved from one-off AI interactions to a platform of bounded assistants with routing, shared tools and evaluation infrastructure — and what was traded to get there."
description: "A technical case study by Illia Losiev: architecting a production AI agent platform inside a multi-tenant Rails SaaS product — assistant boundaries, routing, reusable tools, conversation state and evaluation-driven quality."
project: "AI Agent Platform · EasyLlama"
technologies: "Ruby · Rails · PostgreSQL · Redis · Sidekiq · LLM APIs · RSpec"
teaserProblem: "AI features had started as isolated interactions. Every new capability meant re-solving routing, permissions, conversation state and quality — in a multi-tenant product where tenants must never see each other's data."
teaserDecision: "Bounded assistants on a shared platform: a routing layer, reusable tool abstractions where permissions are enforced, shared conversation state, and evaluation infrastructure so reliability is measured, not hoped for."
---

## Problem

The product's first AI features were isolated interactions: a prompt here, an assistant there, each wired directly to its screen. Customers wanted more — build a dashboard, query their data, generate a report, save it, export it — and every new request meant re-solving the same problems: which assistant handles this, what data it may touch, how the conversation carries context, and how anyone knows the answer is right.

## Constraints

A multi-tenant SaaS product, so permissions and tenant isolation are non-negotiable at every layer the model can reach. LLM behaviour is non-deterministic, while reports and analytics have to be reproducible. An existing Rails codebase and a product roadmap that could not pause while a platform was built underneath it.

## Options considered

<div class="options">
  <div class="option">
    <p class="mono">A — One assistant, one growing prompt</p>
    <p>Keep a single assistant and add capabilities by extending its prompt and tool list. Fastest at first; routing, permissions and quality all degrade as the surface grows.</p>
  </div>
  <div class="option">
    <p class="mono">B — Separate features per use case</p>
    <p>Build each AI feature as its own isolated integration. Simple in isolation, but no shared conversation state, no hand-off between features, and the same infrastructure rebuilt each time.</p>
  </div>
  <div class="option option--chosen">
    <p class="mono">C — Bounded assistants on a shared platform · chosen</p>
    <p>Explicit assistant boundaries, a routing layer between them, reusable tool abstractions, shared conversation state and evaluation infrastructure. More upfront design; every later capability gets cheaper.</p>
  </div>
</div>

## Decision

Option C. The recurring cost was never the model call — it was routing, permissions, state and quality, and those only get solved once if they live in a platform. Assistant boundaries keep each prompt small and testable; a routing layer decides which assistant owns a request; tools are the single place where data access and tenancy are enforced; and evaluation infrastructure makes reliability something the team measures rather than hopes for.

## Implementation

{{< arch-diagram >}}

**Assistant boundaries and routing.** System assistants, a report builder and analytics agents, each with a defined scope, and contextual hand-off between them so a conversation can move from a question to a saved report without starting over.

**Reusable tool abstractions.** Data querying, report generation, saved reports, CSV export and embedded widgets are tools any assistant can use — and the layer where permissions and tenant isolation are enforced.

**Conversation state and tracking.** Shared state across assistants, with tracking and export workflows built into the platform rather than each feature.

**Evaluation-driven quality.** Deterministic tool coverage, regression-focused RSpec suites and date/query helper validation, so a change to a prompt or a tool is caught before a customer sees it. Observability workflows to see what the assistants actually did.

## Trade-offs

More design and infrastructure up front than any single feature needed, and a stricter discipline for adding capabilities: through tools and assistants, not through prompt edits. Deterministic evaluation covers the tool layer well and the model's prose less well; that gap is managed with regression suites and observability rather than eliminated.

## Result

<div class="result">
  <div>
    <p class="mono">What changed</p>
    <p>Dashboard creation, data querying, report generation, saved reports, CSV exports, embedded widgets and cross-assistant hand-off, all delivered on shared infrastructure — and a change to a prompt or a tool is caught by the evaluation suites before a customer sees it.</p>
  </div>
  <div>
    <p class="mono">For the team</p>
    <p>Ambiguous AI and reporting requirements now become platform capabilities with a known shape — assistant, tools, evals — instead of one-off integrations, with LLM behaviour, security and permissions handled once.</p>
  </div>
</div>
