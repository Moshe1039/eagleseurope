# Eagle's Europe — agents' home

This folder lives inside the website's own repo now (`eagleseurope`, on `main`) so the daily
routine can work against the real site directly. **It is still not the website itself** — the
site is `../src`, `../server`, `../public`, etc., one level up. One narrow path is allowed to
push straight to `main` (a `src/countries.py` content edit, gated by a clean build + checker
approval — see `context/permissions.md`, "Publishing to production"). Nothing else touches the
live repo without a human doing it.

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

## The iron rule — and its one gated exception

An agent prepares, a human approves and sends. Full table: `context/permissions.md`. No agent
sends a customer/owner-facing message, sets a price or term, or touches site code outside
`src/countries.py`. The one exception: a `src/countries.py` content edit can publish straight to
`main` once the build-gate and checker both pass — see "Publishing to production" in
`context/permissions.md` for exactly what that requires and how it's flagged afterward.

## Where things live

- `context/business-summary.md` — the product, audience, pricing, structure, decision gate, and
  bottlenecks. Read this before any research or writing task.
- `context/rules.md` — what the checker enforces (claims, consent, research-grounding, data
  handling, legal/tax).
- `context/permissions.md` — the human-control table, and permission-mode guidance.
- `research/topic-map.md` — the researcher's output; the only valid source of topics for the
  content-writer.
- `drafts/pages/` — the writer's audit-trail record of what it added to `src/countries.py` and
  why (the real edit lands in `src/countries.py` directly, not here).
- `pipeline/leads.csv` — the lead/deal tracker. **The live site's own admin panel
  (`eagleseurope.com/admin`, CSV export at `/admin/leads.csv`) is the authoritative source** —
  this file is a manual mirror until an admin-credentialed sync is set up. Don't treat this file
  as ground truth over the site's own export if the two ever disagree.
- `reports/` — dated briefings from the morning-briefing skill.

## Permission mode

Start in "ask before edits." Only move to auto-accept for a specific skill once it's been
tested and trusted. Bypass-permissions mode is not used at this stage.
