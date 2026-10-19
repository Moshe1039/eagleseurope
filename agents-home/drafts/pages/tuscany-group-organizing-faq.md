---
topic_map_entry: Planning a Multi-Couple Tuscany Trip Without the Group-Chat Chaos
target_audience: B2C
edit_type: faq_entry
file_edited: ../src/countries.py
status: pending_checker_review
---

## What was added

A new FAQ tuple appended to Italy's `faq` list in `../src/countries.py` (Tuscany is a region
inside Italy's existing page, not a standalone route — per `context/business-summary.md`):

> **Q: How do we organise a multi-couple trip to Tuscany without arguing over who gets which
> bedroom?**
> A: Easily: every Eagle's villa is one all-inclusive price per person, not a price list per
> room, so there is no haggling over who pays more for the better bedroom. Each couple pays the
> same share, with a deposit to confirm and the balance due before arrival, so room assignment
> never turns into a negotiation.

## Why this entry, and why this framing

The topic-map entry's research (competitor pages like villasofdistinction.com's "Couples/Groups"
collections) found a recurring organizer pain point — disputes over bedrooms and cost-splitting —
that competitors only resolve by offering more villas at more price points, pushing the decision
burden back onto the organizing couple. The real, underlying driver of most "who gets which
bedroom" disputes in a group villa trip is cost: the bigger or en-suite room usually costs more,
so the fight is really about money. Eagle's per-person pricing (already an established, published
fact — see the Puglia FAQ right above this one, and `context/business-summary.md`) removes that
argument structurally: there's no price difference between rooms to negotiate over.

This is deliberately **not** a new claim about any operational service (e.g. "a host assigns
rooms for you") — only the already-true, already-public pricing structure (one price per person,
deposit + balance, each couple pays its own share) applied to a second, adjacent organizer pain
point (room disputes) that the existing Puglia FAQ didn't cover (that one addresses "chasing
everyone for money," not bedroom allocation). No new unverifiable claim was introduced.

## What this is not

- Not a new page or route — Tuscany already has a region entry on Italy's page; this is a FAQ
  addition only.
- Not villa-specific content — no individual villa's photos, price, or description used.
- Not a price — no number is stated anywhere, only payment structure, consistent with the
  already-approved Puglia FAQ directly above it in the same list.

## Build check (writer)

Ran `npm install && npm run build` from the repo root after the edit — exits clean, no errors.
Diff touches only the Italy `faq` list entry in `src/countries.py`; nothing else.

Topic-map entry status updated: `not started` → `drafted` (pending checker approval; will move to
`published` only if the checker approves and the push happens).

---

### Checker verdict (2026-10-19)

**Approved.**

Step 0: `git diff -- src/countries.py` confirms the only change is one new `(question, answer)`
tuple appended to Italy's existing `faq` list — no new top-level key, no change to `regions` or
`intro`, nothing touching `server/`, `wrangler.toml`, or `build.py`. Independently re-ran
`rm -rf node_modules && npm install && npm run build` from the repo root (not trusting the
writer's reported pass) — exits clean, "Built 12 pages + 404...". The full `git status` also
shows regenerated files under `public/` (the Italy page's HTML/FAQPage JSON-LD, plus
`privacy.html`/`terms.html`/`sitemap.xml` lastmod-date bumps from the same full rebuild) — this
matches the exact pattern of the prior approved Puglia FAQ publish (commit `f836b31`), which also
carried `public/luxury-villas/italy/index.html` and `public/privacy.html` in the same commit. It's
mechanical build output of the one `countries.py` change, not a separate manual edit, so it's
within the gate.

Checked against `context/rules.md`:
1. **Claims** — no banned absolute phrasing ("X+ villas," "X+ years"). The only facts stated
   (one all-inclusive price per person, deposit to confirm, balance due before arrival) are
   already public, already-published facts (see the Puglia FAQ directly above this one in the
   same list, and `context/business-summary.md`) — no new claim introduced.
2. **Villa consent** — no individual villa's images, price, or descriptive text used.
3. **Research grounding** — traces directly to the topic-map entry "Planning a Multi-Couple
   Tuscany Trip Without the Group-Chat Chaos." Organic framing only. Addresses a genuinely
   distinct organizer pain point (bedroom/cost disputes) from the existing Puglia FAQ (which
   covers "chasing everyone for money") — not a duplicate.
4. **Data handling** — no customer PII, no API keys/secrets anywhere in the diff.
5. **Legal/tax** — no tourism-law, VAT, or privacy-law claim made.

Cleared to commit as `[PUBLISHED TO PRODUCTION]` and push to `main`.
