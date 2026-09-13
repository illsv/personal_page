---
title: "Airbnb and PMS booking synchronisation"
weight: 2
company: "boomnow"
period: "2024 – 2025"
summary: "Owned the architecture and implementation of the Airbnb integration for a hospitality platform: keeping bookings consistent between the product and external property-management systems."
context: "A hospitality operations platform where reservations arrive from Airbnb, third-party PMS platforms and other booking providers, and must be allocated across multiple units without double-booking."
problem: "Two systems each believe they own the booking. Synchronisation has to survive partial failures, late updates and multi-unit allocation, in a multi-tenant environment where a bug is visible to a guest standing at a door."
role: "DRI for the Airbnb integration architecture and implementation, and for the synchronisation workflows between the platform and external PMS systems."
decisions: "Designed booking synchronisation and multi-unit reservation allocation as explicit workflows rather than ad-hoc API calls, and invested in debugging tooling for multi-tenant environments so integration problems could be diagnosed without an engineer reproducing them."
engineering: "Booking synchronisation and reservation allocation workflows; integrations with third-party PMS platforms and external booking providers; developer tooling for inspecting and debugging tenant state; work on scaling the booking infrastructure for reservation-heavy workloads."
outcome: "Bookings from Airbnb and third-party PMS platforms flow into the platform and are allocated across units through one set of workflows, and integration problems can be diagnosed from tenant state without an engineer reproducing them."
technologies: "Ruby · Rails · PostgreSQL · Sidekiq · Airbnb API"
---
