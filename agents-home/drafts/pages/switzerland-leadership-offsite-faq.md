---
topic_map_entry: Private Villa Offsites in Europe for Israeli Tech Leadership Teams
target_audience: B2B
edit_type: faq_entry
file_edited: ../src/countries.py
status: approved
---

# Switzerland FAQ: leadership team offsite

Per `context/business-summary.md`'s real site structure, there is no standalone "landing page"
type — only `/` and `/luxury-villas/<country>/` exist — so the B2B angle in this topic-map entry
ships as a new FAQ entry on Switzerland's existing `/luxury-villas/switzerland/` page, rather
than the landing page originally suggested (same correction pattern as every region/experience
entry shipped over the last nine days, applied here to a B2B topic instead of a B2C one).

## Why Switzerland

None of the 9 live countries carries any B2B framing yet. Switzerland was picked over the other
eight because its existing copy already sells exactly what a leadership-retreat buyer needs —
privacy, a chef, a host, lake/mountain settings within easy flight reach of most of Europe — so
the new FAQ slots in without contradicting or duplicating anything already there. No other
country's existing copy was a closer fit.

## What changed

`src/countries.py`, Switzerland's `faq` list. Added one new tuple:

> **Q: Can a company book one of your villas for a leadership team offsite rather than a
> couples' holiday?**
> A: Yes. The villa, chef, host and transfers are booked privately for your group alone, with
> no other guests and no shared hotel lobby, so a leadership team has the same closed-door
> privacy a group of couples gets. The structure doesn't change for a corporate group: one
> all-inclusive price per person, arranged around your group rather than listed room by room.

## Why this topic

Per the topic-map entry: a direct search for "Israeli tech company leadership retreat Europe
villa" returned no matching content at all, while a separate Hebrew-language source documents a
real shift of Israelis preferring private villas over hotels when staying in Europe. Those two
signals together — real preference for villas abroad, zero existing content connecting that
preference to corporate/leadership use — mark this as a genuine, researched gap, not a
contested keyword guess.

## Checker verdict

**Approved**, 2026-10-27. Checked: (1) diff via `git diff src/countries.py` touches only the
new FAQ tuple appended to Switzerland's existing `faq` list — no other file, no new top-level
key. (2) Independently re-ran `npm install && npm run build` — exits clean, "Built 12 pages +
404, ...". (3) No banned/unverifiable claims; "one all-inclusive price per person" states
structure, not a number, consistent with `context/business-summary.md`. (4) No villa-specific
content — this is about privacy/structure, not a villa pitch, so owner-consent is not
applicable. (5) Maps directly to the `research/topic-map.md` "Private Villa Offsites..." entry;
organic framing only. (6) No customer PII or secrets. (7) No legal/tax claim.

## Checks

- No price anywhere — "one all-inclusive price per person" states the structure, not a number.
- No villa-specific amenity pitch — sells privacy/structure, not a villa's features.
- No unverifiable claim ("1,000+ villas," years-in-business language, etc.).
- Matches existing voice: short, warm, specific, not generic travel-blog language; mirrors the
  phrasing already used in Switzerland's own FAQ ("Yes. ... includes/comes with...").
- Maps to the `research/topic-map.md` entry "Private Villa Offsites in Europe for Israeli Tech
  Leadership Teams."
- No customer PII, no secrets.
- No legal/tax claim.
- Organic framing only — no claim implying paid acquisition/ads are in play.
