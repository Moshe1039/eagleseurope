# Eagle's Europe — agents' home

This repo is the home for the Claude Code agents working toward Eagle's Europe's first paying
deal. **It is not the website.** The live site is eagleseurope.com, backed by a separate
`eagleseurope` GitHub repo (github.com/Moshe1039/eagleseurope) deployed on Cloudflare Workers —
this project never pushes to that repo directly; any proposed site change is made on a local
clone/branch and the human reviews and pushes it themselves.

Cloudflare account ID and worker name are in `.env.example` — copy to `.env` (gitignored) and
fill in a real, scoped-read-only API token to pull observability/analytics data. Never put the
token in CLAUDE.md, in chat, or in any committed file.

## Current phase

Active: `coordinator`, `checker`, `keyword-researcher`, `content-writer` — the organic-traffic
and research engine.

Paused: distributor/networks, site-improver, link/partnership (wait on there being pages to
promote and real traffic data) — and all deal-side agents: villa sourcing, offer & pricing,
terms & deal, customer research & calls (wait on real leads existing). The trigger to reopen
these: the first real form submission landing in `pipeline/leads.csv`, and progress on the
decision gate below. The morning-briefing skill flags this automatically — don't guess at it.

## The iron rule

An agent prepares, a human approves and sends. Full table: `context/permissions.md`. In short:
no agent sends a customer/owner-facing message, sets a price or term, or commits a site change
without a human doing that step.

## Where things live

- `context/business-summary.md` — the product, audience, pricing, structure, decision gate, and
  bottlenecks. Read this before any research or writing task.
- `context/rules.md` — what the checker enforces (claims, consent, research-grounding, data
  handling, legal/tax).
- `context/permissions.md` — the human-control table, and permission-mode guidance.
- `research/topic-map.md` — the researcher's output; the only valid source of topics for the
  content-writer.
- `drafts/pages/` — the writer's output, pending checker review and human approval.
- `pipeline/leads.csv` — the lead/deal tracker. **The live site's own admin panel
  (`eagleseurope.com/admin`, CSV export at `/admin/leads.csv`) is the authoritative source** —
  this file is a manual mirror until an admin-credentialed sync is set up. Don't treat this file
  as ground truth over the site's own export if the two ever disagree.
- `reports/` — dated briefings from the morning-briefing skill.

## Permission mode

Start in "ask before edits." Only move to auto-accept for a specific skill once it's been
tested and trusted. Bypass-permissions mode is not used at this stage.
