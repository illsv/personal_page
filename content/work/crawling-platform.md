---
title: "High-load crawling and exchange-data platform"
weight: 4
company: "DigitalBridges"
period: "2016 – 2022"
summary: "Core architecture, large-scale web crawlers and crypto-exchange integrations for a data-heavy platform, over five years of growth and production hardening."
context: "A platform built on data gathered at scale from the web and from crypto exchange APIs, with search and query workloads that grew with the dataset."
problem: "Crawling at volume without being blocked, keeping exchange data consistent, and making search over a large dataset fast enough — while a legacy frontend and long-standing production issues slowed the team down."
role: "Full-stack engineer with a key role in the core application architecture; owned crawling, proxy rotation and the exchange integrations."
decisions: "Built proxy rotation as a system rather than a script; optimised the high-load search and query paths instead of scaling hardware; migrated the legacy jQuery frontend to Vue.js incrementally."
engineering: "Large-scale web crawlers, proxy rotation, crypto exchange API integrations, high-load search/query optimisation, the jQuery → Vue.js migration, and the resolution of long-standing production issues affecting stability and data consistency."
outcome: "A platform that stayed stable and consistent as the dataset and load grew over five years, with the long-standing production issues resolved and a frontend the team could keep evolving."
technologies: "Ruby · Rails · PostgreSQL · Redis · Vue.js · Web scraping"
---
