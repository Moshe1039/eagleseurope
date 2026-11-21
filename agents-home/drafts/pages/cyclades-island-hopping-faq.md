---
topic_map_entry: Cyclades: Island-Hopping Without Each Couple Booking Its Own Ferry
target_audience: B2C
edit_type: faq_entry
file_edited: ../src/countries.py
status: published
---

## What was added

A new FAQ tuple appended to Greece's `faq` list in `../src/countries.py` (the Cyclades are a
region inside Greece's existing page, not a standalone route — per
`context/business-summary.md`):

> **Q: If we island-hop in the Cyclades, does every couple need to book its own ferry?**
> A: No. Boat days between islands like Mykonos, Paros, Naxos and Antiparos are arranged for the
> whole group as one booking, at one time, so no one couple is left chasing the others to agree
> on a crossing.

## Why this entry, and why this framing

The topic-map entry's research found that every competitor result selling Cyclades
island-hopping (Greeka's Athens–Paros–Naxos guide, GetYourGuide's private Naxos-to-Paros boat
listing, Seajets' day-trip blog, TourRadar's tour listings) treats the inter-island crossing as
something the visitor arranges individually — a public ferry seat, a shared tour seat, or a
private boat booked alone. None addresses the real organizer pain point: getting every couple on
the same boat, at the same time, without one person chasing seven others. This is the same
decision-fatigue gap the existing Puglia/Tuscany FAQs close for cost-splitting and bedroom
allocation, applied here to group logistics instead of money.

The framing leans only on facts already public elsewhere on Greece's page: the Cyclades region
description already names "boat days between islands" (line 120), and Greece's own intro already
promises the exclusive private resort experience is arranged, not self-organized ("we find the
exclusive private resort that fits your group and plan days at sea and in the villages"). No new
operational claim is introduced — this FAQ just makes explicit, for the Cyclades specifically,
that the boat day is one group booking rather than several individual ones, which answers a
distinct objection (coordination overhead) from any existing Greece FAQ above it.

## What this is not

- Not a new page or route — the Cyclades already have a region entry on Greece's page; this is a
  FAQ addition only.
- Not villa-specific content — no individual villa/chalet's photos, price, or description used,
  and no named competitor (Greeka, GetYourGuide, Seajets, TourRadar) appears in the live copy
  itself, only in this internal research record.
- Not a price — no number is stated anywhere.
- Not a duplicate of the two existing Crete FAQs above it — those address "does the service
  exist" and "is it worth it for two couples"; this one addresses a distinct objection
  (coordinating logistics across couples), on a different region.

## Build check (writer)

Ran `npm install && npm run build` from the repo root after the edit — exits clean, no errors.
Diff touches only one new tuple appended to the Greece `faq` list in `src/countries.py`; nothing
else.

Topic-map entry status updated: `not started` → `drafted` (pending checker approval; will move
to `published` only if the checker approves and the push happens).

---

### Checker verdict (2026-11-21)

**Approved.**

Step 0: `git diff -- src/countries.py` confirms the only change is one new `(question, answer)`
tuple appended to Greece's existing `faq` list — no new top-level key, no change to `regions` or
`intro`, nothing touching `server/`, `wrangler.toml`, or `build.py`. Independently ran
`rm -rf node_modules && npm install && npm run build` from the repo root (not trusting the
writer's reported pass) — exits clean, "Built 12 pages + 404...". `git status` shows the same
mechanical rebuild pattern as every prior approved publish: `public/luxury-villas/greece/
index.html` plus the recurring today's-date timestamp bumps in `public/privacy.html`/
`terms.html`/`sitemap.xml` — build output of the one `countries.py` change, not a separate manual
edit, so it's within the gate.

Checked against `context/rules.md`:
1. **Claims** — no banned absolute phrasing. The only facts stated (islands already named in
   Greece's `regions`/`faq` copy, group booking vs. individual booking) are a logistics
   clarification, not a new unverifiable claim.
2. **Villa consent** — no individual villa's images, price, or descriptive text used. Named
   competitors referenced in this draft record's research section (Greeka, GetYourGuide,
   Seajets, TourRadar) do not appear in the live copy.
3. **Research grounding** — traces directly to the topic-map entry "Cyclades: Island-Hopping
   Without Each Couple Booking Its Own Ferry." Organic framing only, no paid-acquisition
   language. Answers a distinct objection (group-logistics coordination) from the two existing
   Crete FAQs above it — not a duplicate. Experience/destination-centered (island transport
   logistics), not villa-feature-centered.
4. **Data handling** — no customer PII, no API keys/secrets anywhere in the diff.
5. **Legal/tax** — no tourism-law, VAT, or privacy-law claim made.

Cleared to commit as `[PUBLISHED TO PRODUCTION]` and push to `main`.
