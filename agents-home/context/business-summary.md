# Business summary — Eagle's Europe

Read this before doing any research, writing, or review work on this project.

## What this is

Eagle's Europe is a premium service layer over rented villas in Europe. The only goal right
now is **one paying deal**, not growth, not scale, not brand-building.

## Product

- One all-inclusive package. The customer picks 2 attractions out of 6.
- No price shown on the site.
- Price is roughly €3,534 per person — not a flat rate per villa, and not fixed to a number of
  couples or nights.
- Payment: 30% deposit, balance due 60 days before arrival. Each couple pays its own share.

## Destinations — the real site structure (correct this if it's ever wrong, don't guess)

The live site is organized by **country**, one page per country at `/luxury-villas/<slug>/`,
defined in `../src/countries.py` (relative to this file: the website repo root's `src/`
directory, a sibling of `agents-home/`). Each country page already contains several named
**regions** as a sub-section, each with its own short description, plus a short FAQ list per
country. This is a real content-level data structure (a Python list of dicts), not a rendering
template you can invent new routes inside.

**9 countries already live**, each already populated: Italy, France, Spain, Portugal, Greece,
Croatia, Switzerland, Austria, Germany. Tuscany and Puglia are regions inside Italy's page.
Algarve is a region inside Portugal's page. Crete is a region inside Greece's page. All four
already have baseline copy and at least one FAQ entry before any agent touches anything.

**What this means for research and content work:** there is no "write a new page about Puglia"
task — Puglia's page already exists, as part of Italy's. The real opportunities are (a) new FAQ
entries on an existing country's page that address a real, researched gap (an organizer pain
point, a specific high-intent query competitors don't answer), or (b) enriching an existing
region's description or a country's `intro` paragraphs with grounded specifics. Always inspect
`../src/countries.py` directly (`Read`/`Grep` the actual file — it's local, no network/WebFetch
needed and nothing to guess about) before proposing anything, to see exactly what already exists
per country so nothing gets duplicated.

## Audiences

- **B2C (primary):** couples and friends, 40+. Typically a group of several couples with one
  organizing couple who drives the decision.
- **B2B (secondary):** retreats for leadership teams at Israeli tech companies.

Content and research should be written for the B2C audience first unless a task explicitly
says B2B.

## Structure

Rented properties (not owned), freelancers doing the work, two partial partners, a budget of
roughly ₪200,000.

## Digital assets

- **eagleseurope.com** — live today, in English, with a working landing page and lead form.
  This is the real site visitors land on.
- The **`eagleseurope`** GitHub repo on Cloudflare is the *website's* repo, and `agents-home/`
  (this folder) now lives inside it, on `main`. **Pushing to `main` auto-deploys to production
  immediately** — there is no staging step. Per explicit instruction, approved content changes
  (new FAQ entries, region-copy enrichments) are committed and pushed straight to `main` once
  the mandatory build check passes and the checker approves — see `context/permissions.md` for
  the exact gate. This only applies to content-level data in `src/countries.py`; nothing here
  authorizes editing `server/`, `wrangler.toml`, routing, or any other code.
- Pilot target date: May 2027.

## What counts as "the first deal" — and what doesn't

A deal is: **one group that has paid a 30% deposit on a defined package, for a specific villa,
on specific dates.**

A quote sent, a good call, or a warm lead is **not** a deal. Don't report any of those as
progress toward the goal — report them as pipeline stages, nothing more.

## The decision gate (already agreed, don't relitigate it)

Out of 15 conversations with potential customers: at least 3 should ask for a quote, and at
least 1 should commit to a paid pilot. This is the ratio used to judge whether the funnel is
working. Agents run this math from `pipeline/leads.csv`; they don't redefine the gate.

## The two real bottlenecks

1. **Supply:** need at least 10 villa owners willing to be marketed directly (not agencies —
   agencies are competitors, not supply).
2. **Demand:** every argument about differentiation stays theoretical until there are real
   conversations with real prospects.

Nothing an agent produces replaces either of these. Content and traffic work exists to create
the conversations that resolve the demand bottleneck; it does not resolve the supply bottleneck
at all (that's the villa-sourcing agent, which is paused until there are leads to match supply
against).

## Known pre-launch gaps on the live site (from the eagleseurope repo's own checklist)

- No `/privacy`, `/terms`, `/legal-notice`, or `/accessibility` pages exist yet — despite the
  site collecting passport numbers and dates of birth for booked trips. This is a real
  compliance gap, not a hypothetical one; it needs a lawyer, per the legal/tax rule in
  `context/rules.md` — no agent should draft legal-policy text to fill this gap unsupervised.
  Finalizing these pages is a genuine blocker before pushing serious organic traffic.
- Site media (photos/video) is still sourced from Unsplash/Pexels/Mixkit with licenses not yet
  individually checked — relevant to the "no use without consent/rights" principle in
  `context/rules.md`, applied to stock media rather than villa-owner content.
- Footer/company details still contain placeholders.

Any agent inspecting the live site should be aware these exist, but fixing them is the
site-improver agent's job (currently paused) plus explicit human/legal sign-off — not something
the researcher or writer should attempt to patch in passing.

## Current phase

Only the organic-traffic and admin/QA agents are active: coordinator, checker,
keyword-audience-researcher, content-writer. Everything else — distribution, site technical
fixes, link-building, and all deal-side work (villa sourcing, offers, terms, customer calls) —
is paused. See `CLAUDE.md` for the exact trigger that reopens them.
