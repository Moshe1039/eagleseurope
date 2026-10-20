---
topic_map_entry: All-Inclusive, Without the Resort: An Algarve Villa Escape for Couples 40+
target_audience: B2C
edit_type: faq_entry
file_edited: ../src/countries.py
status: published
---

## What was added

A new FAQ tuple appended to Portugal's `faq` list in `../src/countries.py` (the Algarve is a
region inside Portugal's existing page, not a standalone route — per
`context/business-summary.md`, same pattern as the Puglia and Tuscany FAQ additions before it):

> **Q: Is there an all-inclusive option in the Algarve that isn't a resort hotel?**
> A: Yes. Every Eagle's villa in the Algarve comes with a private chef, housekeeping, private
> transfers and a host built into one all-inclusive price per person, so you get the privacy of
> your own villa with nothing left to arrange yourselves, rather than a self-catering villa
> where a chef or transfers are extras booked separately.

## Why this entry, and why this framing

The topic-map entry's research found search results split cleanly into two unconnected
categories for the Algarve: adults-only all-inclusive *hotels* (TUI BLUE Falésia, Tivoli Alvor)
on one side, and self-catering group *villas* with optional concierge add-ons (private chef,
massage, yoga arranged on request) on the other. One source noted the Algarve historically has
far fewer all-inclusive resorts than Spain, Turkey, or Egypt — reinforcing that "all-inclusive"
there usually means "hotel," not "villa." No competitor result combines villa privacy for a
group with a genuinely all-inclusive structure (nothing to arrange yourself) — that gap maps
directly onto this product's real structure: a private chef, housekeeping, transfers and a host
are already standard inclusions in every Eagle's villa, not optional add-ons.

This FAQ states only already-true, already-published facts about the existing product
(the private chef/housekeeping/transfers/host inclusions already stated in Portugal's own
`intro` copy two lines above the `faq` list, and the one-all-inclusive-price-per-person
structure already public via the Puglia/Tuscany FAQs on Italy's page). No new claim is
introduced — only a direct answer to the specific "is this a resort or a villa" confusion the
research surfaced, framed for the 40+ couples audience.

## What this is not

- Not a new page or route — the Algarve already has a region entry on Portugal's page; this is
  a FAQ addition only (the topic-map entry originally suggested "landing page"; corrected here
  to a FAQ entry, same correction already applied to the Puglia and Tuscany entries before it).
- Not villa-specific content — no individual villa's photos, price, or description used, and no
  named competitor hotel (TUI BLUE Falésia, Tivoli Alvor) referenced in the copy itself, only in
  this research record.
- Not a price — no number stated anywhere, only the payment/inclusions structure, consistent
  with every prior approved FAQ entry in this file.

## Build check (writer)

Ran `npm install && npm run build` from the repo root after the edit — exits clean, no errors.
Diff touches only the Portugal `faq` list entry in `src/countries.py`; nothing else.

Topic-map entry status updated: `not started` → `drafted` (pending checker approval; will move
to `published` only if the checker approves and the push happens).

---

### Checker verdict (2026-10-20)

**Approved.**

Step 0: `git diff -- src/countries.py` confirms the only change is one new `(question, answer)`
tuple appended to Portugal's existing `faq` list — no new top-level key, no change to `regions`
or `intro`, nothing touching `server/`, `wrangler.toml`, or `build.py`. Independently re-ran
`rm -rf node_modules && npm install && npm run build` from the repo root (not trusting the
writer's reported pass) — exits clean, "Built 12 pages + 404...". `public/luxury-villas/
portugal/index.html`, `public/privacy.html`, `public/terms.html`, and `public/sitemap.xml`
changed as mechanical build output of the same rebuild (lastmod-date bumps and the regenerated
Portugal FAQPage JSON-LD) — same pattern as the two prior approved publishes. A pre-existing
tracked `src/__pycache__/countries.cpython-313.pyc` and a stray untracked
`.cpython-311.pyc` from this session's own build run were found; the tracked one was restored
to its committed state and the untracked one deleted — neither is part of this change and
neither is included in the commit below. (Note for the human: the tracked pycache file
shouldn't be in the repo at all — pre-existing issue, out of scope for this content-only gate,
flagged in today's report.)

Checked against `context/rules.md`:
1. **Claims** — no banned absolute phrasing. The only facts stated (private chef, housekeeping,
   transfers, host included; one all-inclusive price per person) are already-public facts
   already stated in Portugal's own `intro` copy — no new claim introduced.
2. **Villa consent** — no individual villa's images, price, or descriptive text used.
3. **Research grounding** — traces directly to the topic-map entry "All-Inclusive, Without the
   Resort: An Algarve Villa Escape for Couples 40+." Organic framing only. Experience/structure-
   centered, not villa-amenity-centered.
4. **Data handling** — no customer PII, no API keys/secrets anywhere in the diff.
5. **Legal/tax** — no tourism-law, VAT, or privacy-law claim made.

Cleared to commit as `[PUBLISHED TO PRODUCTION]` and push to `main`.
