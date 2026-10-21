---
topic_map_entry: Two Couples, One Villa: A Crete Retreat Where You Choose the Excursions
target_audience: B2C
edit_type: faq_entry
file_edited: ../src/countries.py
status: published
---

## What was added

A new FAQ tuple appended to Greece's `faq` list in `../src/countries.py` (Crete is a region
inside Greece's existing page, not a standalone route — per `context/business-summary.md`):

> **Q: Is a Crete villa worth it for just two couples?**
> A: Yes. Villa sizes in Crete range from an intimate home for two couples up to space for a
> full group, so a smaller group gets the same private chef, housekeeping, transfers and host,
> and chooses together how to spend the days: mountain villages, gorges, wineries or lagoons
> like Balos.

## Why this entry, and why this framing

The topic-map entry's research found the closest direct competitor signal to be a Grecotel
hotel package (the Caramel suite, marketed as "particularly well-suited to two couples or close
friends") — a hotel operator explicitly targeting the two-couple segment. That confirms real,
proven demand for this exact group shape, but it's a shared hotel suite, not a private villa
with a say over how the trip is shaped. No villa-based competitor result addressed that
two-couple segment with an all-inclusive, choose-your-own-days structure.

This entry answers the organizer's likely hesitation directly: "do we need six couples to make
this work?" The answer leans only on already-public facts already stated elsewhere on Greece's
page — a private chef, housekeeping, transfers and a host (already in the existing Crete FAQ
directly above this one), and villages/wineries/beaches already named in Greece's `intro` and
`regions` copy (Balos is already named in the Crete `regions` description at line 119). The
"choose together how to spend the days" phrasing mirrors Greece's own existing intro copy
("we find the villa that fits your group and plan days at sea and in the villages") rather than
introducing a new operational claim (e.g. a specific "pick 2 of 6" mechanic, which isn't stated
anywhere in the public copy yet and so isn't repeated here).

## What this is not

- Not a new page or route — Crete already has a region entry on Greece's page; this is a FAQ
  addition only.
- Not villa-specific content — no individual villa's photos, price, or description used, and no
  named competitor (Grecotel) appears in the live copy itself, only in this internal research
  record.
- Not a price — no number is stated anywhere.
- Not a duplicate of the existing Crete FAQ directly above it ("Can we book a villa in Crete
  with a private chef?") — that one confirms the service exists; this one answers a distinct
  objection (group size/minimum).

## Build check (writer)

Ran `npm install && npm run build` from the repo root after the edit — exits clean, no errors.
Diff touches only one new tuple appended to the Greece `faq` list in `src/countries.py`; nothing
else.

Topic-map entry status updated: `not started` → `drafted` (pending checker approval; will move
to `published` only if the checker approves and the push happens).

---

### Checker verdict (2026-10-21)

**Approved.**

Step 0: `git diff -- src/countries.py` confirms the only change is one new `(question, answer)`
tuple appended to Greece's existing `faq` list — no new top-level key, no change to `regions` or
`intro`, nothing touching `server/`, `wrangler.toml`, or `build.py`. Independently re-ran
`rm -rf node_modules && npm install && npm run build` from the repo root (not trusting the
writer's reported pass) — exits clean, "Built 12 pages + 404...". `git status` shows the same
mechanical rebuild pattern as the three prior approved publishes: `public/luxury-villas/
greece/index.html` plus `public/privacy.html`/`terms.html`/`sitemap.xml` lastmod-date bumps —
build output of the one `countries.py` change, not a separate manual edit, so it's within the
gate.

Checked against `context/rules.md`:
1. **Claims** — no banned absolute phrasing. The facts stated (private chef, housekeeping,
   transfers, host, named places Balos/mountain villages/gorges/wineries) are already published
   elsewhere on Greece's page (the existing Crete FAQ directly above this one, Greece's `intro`,
   and the Crete `regions` description) — no new unverifiable claim introduced.
2. **Villa consent** — no individual villa's images, price, or descriptive text used. The named
   competitor (Grecotel) referenced in this draft record's research section does not appear in
   the live copy.
3. **Research grounding** — traces directly to the topic-map entry "Two Couples, One Villa: A
   Crete Retreat Where You Choose the Excursions." Organic framing only. Answers a distinct
   objection (minimum group size) from the existing Crete FAQ above it (which confirms the
   service exists) — not a duplicate. Experience/destination-centered, not villa-feature-
   centered.
4. **Data handling** — no customer PII, no API keys/secrets anywhere in the diff.
5. **Legal/tax** — no tourism-law, VAT, or privacy-law claim made.

Housekeeping: a stray untracked `src/__pycache__/countries.cpython-311.pyc` was generated by
this session's own build run and deleted before committing — not part of this content change.
The pre-existing tracked `src/__pycache__/countries.cpython-313.pyc` is unchanged by this diff
(same flagged housekeeping item noted on 2026-10-20: it shouldn't be tracked in git at all, but
fixing that is a separate, human-reviewed change).

Cleared to commit as `[PUBLISHED TO PRODUCTION]` and push to `main`.
