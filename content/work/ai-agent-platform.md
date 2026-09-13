---
title: "AI Agent Platform"
weight: 1
company: "EasyLlama"
period: "2025 – present"
summary: "Architected and own the production AI agent platform inside a multi-tenant Rails SaaS product — the assistants, routing, tooling, conversation state and evaluation infrastructure that turn LLM calls into dependable product workflows."
context: "A multi-tenant SaaS product whose customers needed to build dashboards, query their data and produce reports without waiting on engineering. AI features had started as isolated interactions; the product needed a platform."
problem: "Isolated AI interactions do not compose. Each new capability meant re-solving routing, permissions, conversation state and quality, and LLM behaviour was hard to trust in a product where tenants must never see each other's data."
role: "DRI and technical owner: architecture, implementation strategy and delivery across system assistants, the report builder, analytics agents, routing, tooling, conversation state, tracking and export workflows."
decisions: "Defined explicit assistant boundaries with routing between them instead of one ever-growing assistant. Built reusable tool abstractions so new capabilities plug into shared infrastructure. Treated evaluation as platform infrastructure, not a QA afterthought, and designed permissions and tenancy into the tool layer."
engineering: "Multi-agent platform supporting dashboard creation, data querying, report generation, saved reports, CSV exports, embedded widgets and contextual hand-off between assistants. Evaluation-driven quality through deterministic tool coverage, regression-focused RSpec suites, date/query helper validation and observability workflows."
outcome: "Customers build dashboards, query their data and produce, save and export reports through the assistants instead of waiting on engineering. New capabilities are added as tools on shared infrastructure, and regressions in agent behaviour are caught by the evaluation suites before release rather than by customers."
technologies: "Ruby · Rails · PostgreSQL · Redis · Sidekiq · LLM APIs"
caseStudy: "/case-studies/ai-agent-platform/"
---
