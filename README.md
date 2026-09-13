# illsv.com

Personal engineering profile of Illia Losiev. Static site built with [Hugo](https://gohugo.io) — no JavaScript, self-hosted fonts, deployed to GitHub Pages on push to `main`.

## Run locally

```sh
brew install hugo
hugo server --buildDrafts     # http://localhost:1313
hugo --gc --minify            # production build into public/
```

## Where the content lives

| What | Where |
|---|---|
| Hero, About | `content/_index.md` (front matter) |
| Selected work entries | `content/work/*.md` — one file per project, fields in front matter, ordered by `weight` |
| Case studies | `content/case-studies/*.md` — Markdown with `## Problem … ## Result` headings; the lowest `weight` is featured on the home page |
| Blog posts | `content/blog/*.md` — hidden for now via the `cascade` block in `content/blog/_index.md`; remove it and re-add the Blog menu entry in `hugo.toml` to publish |
| Leadership, principles, services, technology, experience, projects | `data/*.yaml` |
| Site-wide settings (email, links, CV, portrait, OG image) | `hugo.toml` → `[params]` |
| Styles | `assets/css/main.css` |

Anything written in `[square brackets]` renders as a grey placeholder — search for `[` to find what still needs real content.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages. In the repository settings set **Pages → Source → GitHub Actions**, and add `illsv.com` as the custom domain (the `static/CNAME` file is already in place). DNS: `A` records for the apex to GitHub Pages' IPs and a `CNAME` for `www` → `illsv.github.io`.
