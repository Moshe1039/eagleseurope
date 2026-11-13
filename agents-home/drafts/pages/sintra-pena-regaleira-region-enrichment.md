---
topic_map_entry: Sintra: A Private Day Between Pena Palace, Quinta da Regaleira and Cabo da Roca
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: approved
---

# Sintra region enrichment — Portugal page

## What changed

Enriched the `"Sintra"` region description inside Portugal's `regions` list in
`src/countries.py`. The description previously read:

> "Palaces and forested hills near Lisbon, with the Atlantic coast close by."

No named palace, garden or viewpoint — a visitor searching for Sintra specifics would find
nothing here to distinguish this page from a generic "near Lisbon" blurb.

New text adds one sentence naming a structured day: Pena Palace, Quinta da Regaleira's
initiation well and grottoes, and a stop at Cabo da Roca (continental Europe's westernmost
point), framed as something the group does together before returning to the villa for the
evening — matching the "A group can fill its own day" pattern already used for Algarve, Douro
Valley and most other enriched regions on this site.

## Why this topic (research grounding)

Traces to the "Sintra: A Private Day Between Pena Palace, Quinta da Regaleira and Cabo da Roca"
entry added to `research/topic-map.md` today (2026-11-13) by the keyword-researcher fallback
pass (the topic map's only `not started` entry, the B2B leadership-retreat one, is still blocked
on a human decision, unresolved sixteen days running).

WebSearch found a clean split: numerous tour operators (HelloTickets, Europe Express, Headout,
GuruWalk, Magpie, Lokalee) sell Pena Palace, Quinta da Regaleira and often Cabo da Roca as a
single full-day tour departing by van from a Lisbon hotel — never from a stay based in Sintra
itself. Luxury villa listings for Sintra (Marriott Homes & Villas' "Quinta da Serra," Villanovo's
"Villa Serata" and "Villa Azulejo") describe bedroom count, pool and palace *views* only — one
explicitly sells a view of Pena Palace and the Moorish Castle without ever naming a visit to
either. No result combines a private group villa stay in Sintra with a named day among these
three sites.

## Checks against `context/rules.md`

- **Claims:** No absolute/unprovable claims ("1,000+ villas," years-of-experience language).
  Pena Palace, Quinta da Regaleira and Cabo da Roca are public landmarks, named as destinations
  a group can visit — not a claim about Eagle's own history or inventory.
- **Villa consent:** No specific rental villa, owner, image or price referenced. The three named
  places are public tourist sites, not Eagle's own property or any individual owner's content.
- **Research grounding:** Maps directly to the topic-map entry above. Experience/destination-
  focused (palaces, gardens, a viewpoint), not a pitch about villa amenities. No paid-acquisition
  framing.
- **Data handling:** No PII, no API keys or secrets.
- **Legal/tax:** No legal or tax claim made.

## Build check

Ran `npm install && npm run build` from the repo root after the edit — clean, no errors.
