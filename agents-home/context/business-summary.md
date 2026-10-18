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

## Destinations

Current regions: Tuscany, Puglia, Algarve, Crete. Research and content should be grounded in
these — don't propose or write about a region that isn't on this list without checking first.

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
- The **`eagleseurope`** GitHub repo on Cloudflare is the *website's* repo. It is a different
  repo from this one (the agents' home). Nothing in this project pushes to it directly — any
  proposed site change goes to the human for approval first.
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
