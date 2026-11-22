---
topic_map_entry: Lake Constance: A Boat Crossing to Mainau Island and an Afternoon in Meersburg
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: pending_checker_review
---

# Lake Constance region-description enrichment

## What changed

Enriched the Germany page's existing Lake Constance region description in `src/countries.py`
(`COUNTRIES` → Germany → `regions`) by appending one sentence naming a specific day: a boat
crossing to the gardens of Mainau Island, followed by an afternoon at Meersburg Castle.

**Before:**
> A lake shared with Austria and Switzerland, with islands, gardens and lakeside exclusive
> private resorts.

**After:**
> A lake shared with Austria and Switzerland, with islands, gardens and lakeside exclusive
> private resorts. A group can fill its own day here too: a boat crossing to the gardens of
> Mainau Island, then an afternoon among the turrets of Meersburg Castle, Germany's oldest
> inhabited fortress, perched above the water.

## Why

See the topic-map entry "Lake Constance: A Boat Crossing to Mainau Island and an Afternoon in
Meersburg" in `research/topic-map.md` for the full research grounding: multiple independent
day-trip operators sell a named Mainau + Meersburg itinerary as a hotel-based bus/boat tour,
never from a villa stay, while villa listings for the Meersburg shore describe amenities only
and name neither site. This closes the same generic-description gap already addressed for the
Mosel Valley and Bavarian Alps elsewhere on this same Germany page.

## Checks

- No price stated anywhere (consistent with the no-price-on-site rule).
- No unverifiable absolute claims ("1,000+ villas," years-of-experience language) — "Germany's
  oldest inhabited fortress" is a widely corroborated descriptive fact about the castle itself,
  not a claim about Eagle's Europe.
- No villa owner's name, image, price or descriptive text used — this is a public landmark
  description, not sourced from any individual rental listing.
- Matches existing house voice (short, warm, specific) and the exact tuple-string formatting used
  by neighboring region entries on the same page (Mosel Valley, Bavarian Alps).
- Experience/destination-focused, not villa-amenity-focused.
