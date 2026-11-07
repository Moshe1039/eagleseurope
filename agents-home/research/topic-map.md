# Topic map

Owner: keyword-researcher agent. Refresh: monthly, or on request.

This file is the single source of truth for "is this topic worth writing about." The
content-writer only drafts pages for topics listed here, and the checker rejects any draft that
doesn't trace back to an entry below.

**Research note (2026-10-18):** eagleseurope.com was not reachable from this sandbox
(`WebFetch` returned `ENOTFOUND` — this container's network policy doesn't allow it). This pass
is grounded in `context/business-summary.md`'s product description plus WebSearch results on
real competitor pages and search behavior, not a direct look at the live site's current pages.
Re-check against the live site's actual content before the content-writer finalizes a draft, in
case a page already exists on a topic below.

Entries are ordered by priority — take the top `not started` entry next.

```
## <topic / page idea>

- Target audience: B2C | B2B
- Why this topic: <what search behavior or competitor gap justifies it>
- Suggested page type: landing page | area/experience guide
- Status: not started | drafted | published
```

---

## One Price, Six Experiences: A Multi-Couple Puglia Escape

**Correction (2026-10-18, same day):** this entry originally proposed a standalone landing page,
written before the researcher had confirmed the real site structure. Puglia already has its own
page — it's a region inside `/luxury-villas/italy/`, defined in `src/countries.py`. The
underlying research (organizer pain point, no-competitor-combines-this-angle gap) was still
real and used, just integrated correctly: as a new FAQ entry on Italy's existing page instead of
a new page. See the `[PUBLISHED TO PRODUCTION]` commit on `main` from today. The original draft
at `drafts/pages/puglia-multi-couple-escape.md` is kept for the record but superseded — don't
act on it as if it's still pending.

- Target audience: B2C
- Why this topic: Searches around "Puglia villa group" return almost exclusively per-villa
  rental listings (wanderlustchloe.com, agriturismo.net, wheretostay.com) quoting nightly rates
  and amenities, plus a thin layer of generic blog itineraries (Ostuni–Alberobello–Monopoli–
  Polignano a Mare loop). None of the ranking pages frame a single curated, all-inclusive group
  package with a fixed scope of experiences to choose from — every competitor result is selling
  a specific property or a generic sightseeing list, not a decision-simplifying package for a
  group of couples. This is the clearest whitespace of the four destinations: high query
  specificity ("group-friendly accommodations Puglia", "Puglia villa sleeps 18") shows real
  organizer intent, but the all-inclusive/pick-your-experiences angle is unaddressed.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing Italy page
- Status: **published** — as an Italy FAQ entry, not the standalone page originally planned
  (see correction note above and `src/countries.py`'s Italy `faq` list)

## Planning a Multi-Couple Tuscany Trip Without the Group-Chat Chaos

**Correction (2026-10-19):** per `context/business-summary.md`'s real site structure, Tuscany is
a region inside Italy's existing `/luxury-villas/italy/` page, not a standalone route — so this
shipped as a new FAQ entry on Italy's page (bedroom/cost-dispute angle, distinct from the
existing Puglia FAQ right above it, which covers "chasing everyone for money" rather than
bedroom allocation), not the landing page originally suggested below. See
`drafts/pages/tuscany-group-organizing-faq.md` for the full record.

- Target audience: B2C
- Why this topic: Competing results (villasofdistinction.com's "Couples/Groups" collection
  pages) explicitly acknowledge the organizer's pain point — avoiding disputes over bedrooms,
  splitting costs — but resolve it only by listing more villas at more price points, which
  pushes the decision burden back onto the one couple organizing the trip. The repeated
  framing of "cost-splitting" and "avoiding disputes" across multiple competitor snippets is a
  recurring pain signal strong enough to anchor a page that sells the *organizing experience*
  (one fixed price per person, no line-item haggling) rather than a villa spec sheet.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing Italy page
- Status: **published** — as an Italy FAQ entry (bedroom/cost-dispute angle), checker-approved
  2026-10-19, see `drafts/pages/tuscany-group-organizing-faq.md` and the
  `[PUBLISHED TO PRODUCTION]` commit on `main` from today.

## All-Inclusive, Without the Resort: An Algarve Villa Escape for Couples 40+

**Correction (2026-10-20):** per the real site structure in `context/business-summary.md`, the
Algarve is a region inside Portugal's existing `/luxury-villas/portugal/` page, not a standalone
route — so this shipped as a new FAQ entry on Portugal's page (same correction pattern as the
Puglia and Tuscany entries above), not the landing page originally suggested below. See
`drafts/pages/algarve-all-inclusive-not-a-resort-faq.md` for the full record.

- Target audience: B2C
- Why this topic: Search results split cleanly into two unconnected categories — adults-only
  all-inclusive *hotels* (TUI BLUE Falésia, Tivoli Alvor) and self-catering group *villas* with
  optional concierge add-ons (private chef, massage, yoga arranged on request, per
  villanovo.com and similar). One source states plainly that the Algarve historically has far
  fewer all-inclusive resorts than Spain, Turkey, or Egypt. No result combines "villa privacy
  for a group" with "all-inclusive, nothing to arrange yourself" — that gap maps directly onto
  this product's actual structure and is worth claiming before a competitor notices it.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing Portugal
  page
- Status: **published** — as a Portugal FAQ entry, checker-approved 2026-10-20, see
  `drafts/pages/algarve-all-inclusive-not-a-resort-faq.md` and the `[PUBLISHED TO PRODUCTION]`
  commit on `main` (`e633f75`) from that day. **Bookkeeping correction (2026-10-21):** this
  entry was left at `drafted` after it actually published on 2026-10-20 — the `[PUBLISHED TO
  PRODUCTION]` commit and that day's report both confirm it went live same-day. Fixed here so
  the next pass doesn't mistake this for still-pending.

## Two Couples, One Villa: A Crete Retreat Where You Choose the Excursions

- Target audience: B2C
- Why this topic: The closest direct comp found is a Grecotel hotel package (Caramel, a
  two-bedroom suite "particularly well-suited to two couples or close friends") — a hotel
  operator explicitly targeting the two-couple segment, which confirms real demand for that
  exact group shape, but it's a hotel room, not a private villa experience with a choice of
  outings. That's a specific, high-intent gap: the audience segment is proven to exist and be
  targetable, but no villa-based competitor is addressing it with an all-inclusive, pick-your-
  excursions package.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing Greece
  page (Crete is a region there, not a standalone route, per `context/business-summary.md`)
- Status: **published** — as a Greece FAQ entry, checker-approved 2026-10-21, see
  `drafts/pages/crete-two-couples-excursions-faq.md` and the `[PUBLISHED TO PRODUCTION]` commit
  on `main` from today.

## Puglia Experience Guide: Masserie Dinners, Olive Groves, and Salento Wine Tastings

**Correction (2026-10-23):** per `context/business-summary.md`'s real site structure, there is
no "area/experience guide" page type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as an enrichment of the existing Puglia region description on Italy's page (same
correction pattern as the four prior entries above), not a standalone guide page. See
`drafts/pages/puglia-experience-guide-region-enrichment.md` for the full record.

- Target audience: B2C
- Why this topic: Search results surface specific, recurring experience phrasing — "dinner
  under the stars in a masseria," "tasting of typical wines and cheeses," "a day among the
  centuries-old olive trees of Salento" — coming from travel-blog and agency sources, not from
  any single authoritative destination guide. The phrasing is specific enough to indicate real
  interest in these exact experiences (not generic "things to do in Puglia"), but it's currently
  scattered across low-authority sources rather than consolidated into one guide a group could
  use to decide what to pick.
- Suggested page type: ~~area/experience guide~~ — corrected to: enriched Puglia region
  description on the existing Italy page
- Status: **published** — checker-approved 2026-10-23, see
  `drafts/pages/puglia-experience-guide-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today.

## Tuscany Experience Guide: Chianti Wine, Cooking Classes, or Hilltop Towns

**Correction (2026-10-24):** per `context/business-summary.md`'s real site structure, there is
no "area/experience guide" page type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as an enrichment of the existing Tuscany region description on Italy's page (same
correction pattern as the Puglia experience-guide entry above). See
`drafts/pages/tuscany-experience-guide-region-enrichment.md` for the full record.

- Target audience: B2C
- Why this topic: This maps directly onto the product's own "pick 2 of 6 attractions"
  mechanic — competitor villa listings (Chianti-region properties like Colli, hilltop farmhouse
  stays like Casa Matteucci near Lucca) each sell a single location's amenities but never frame
  the region as a menu of experiences a group selects from. An experience-guide page structured
  around "choose two of these" directly rehearses the product's own decision flow before the
  visitor ever reaches the lead form, which no competitor page does.
- Suggested page type: ~~area/experience guide~~ — corrected to: enriched Tuscany region
  description on the existing Italy page
- Status: **published** — checker-approved 2026-10-24, see
  `drafts/pages/tuscany-experience-guide-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today.

## Algarve Beyond the Beach: Cliffs, Boat Trips, and Old Town Days for Group Villa Stays

**Correction (2026-10-25):** per `context/business-summary.md`'s real site structure, there is
no "area/experience guide" page type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as an enrichment of the existing Algarve region description on Portugal's page (same
correction pattern as the Puglia and Tuscany experience-guide entries above). See
`drafts/pages/algarve-beyond-the-beach-region-enrichment.md` for the full record.

- Target audience: B2C
- Why this topic: Competitor content here is almost entirely hotel- or beach-focused (cliff-top
  resorts, adults-only beach hotels); none of the group-villa results (groupaccommodation.com,
  Marriott Homes & Villas large-group listings) go beyond "the villa has a pool and sea views"
  into a structured guide of inland/cultural options (historic Tavira, boat trips, old-town
  days). For a 40+ group that isn't purely beach-and-pool, this is an underserved angle with
  no direct competitor guide found.
- Suggested page type: ~~area/experience guide~~ — corrected to: enriched Algarve region
  description on the existing Portugal page
- Status: **published** — checker-approved 2026-10-25, see
  `drafts/pages/algarve-beyond-the-beach-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today.

## Crete Experience Guide: Knossos, Elafonissi, and the Wine Villages of Archanes

**Correction (2026-10-26):** per `context/business-summary.md`'s real site structure, there is
no "area/experience guide" page type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as an enrichment of the existing Crete region description on Greece's page (same
correction pattern as the Puglia, Tuscany, and Algarve experience-guide entries above). See
`drafts/pages/crete-experience-guide-region-enrichment.md` for the full record.

- Target audience: B2C
- Why this topic: Named, specific attractions recur across multiple independent sources
  (Knossos for Minoan history, Elafonissi and Balos for beaches, Archanes-area wineries and
  olive-oil tastings) — this specificity is a stronger signal than generic "best beaches in
  Crete" phrasing, since visitors searching named sites are further along in planning. No
  result ties these specific named attractions together into one guide framed for a group
  deciding what to prioritize, despite each being individually well-covered.
- Suggested page type: ~~area/experience guide~~ — corrected to: enriched Crete region
  description on the existing Greece page
- Status: **published** — checker-approved 2026-10-26, see
  `drafts/pages/crete-experience-guide-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` (`60d29b6`) from that day. **Bookkeeping correction
  (2026-10-27):** this entry was left at `drafted — pending checker review` after it actually
  published on 2026-10-26 — the draft file's own `status: approved` front matter, the checker
  verdict recorded in it, and the `[PUBLISHED TO PRODUCTION]` commit all confirm it went live
  same-day. Fixed here so the next pass doesn't mistake this for still-pending (same recurring
  bookkeeping slip as the Algarve entry above on 2026-10-21).

## Private Villa Offsites in Europe for Israeli Tech Leadership Teams

**Correction (2026-10-27):** per `context/business-summary.md`'s real site structure, there is
no standalone "landing page" type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as a new FAQ entry on Switzerland's existing `/luxury-villas/switzerland/` page (same
correction pattern as every prior entry above, applied here to a B2B topic for the first time —
Switzerland was picked because its existing copy already sells the privacy/chef/host structure a
leadership-retreat buyer needs, without contradicting anything there). See
`drafts/pages/switzerland-leadership-offsite-faq.md` for the full record.

- Target audience: B2B
- Why this topic: Direct search for "Israeli tech company leadership retreat Europe villa"
  returned no matching reporting at all — the closest results were Far Out (Israeli corporate
  retreats, but domestic-only: desert, wineries, private farms inside Israel) and an unrelated
  non-Israeli company's Berlin retreat. Separately, a Hebrew-language source (ias.co.il) reports
  a documented shift of Israelis preferring private villas over hotels when staying in Europe.
  Those two signals together — real preference for villas abroad, zero existing content
  connecting that preference to corporate/leadership use — mark this as genuinely open ground
  rather than a contested keyword.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing
  Switzerland page
- Status: **published** — checker-approved 2026-10-27, see
  `drafts/pages/switzerland-leadership-offsite-faq.md` and the `[PUBLISHED TO PRODUCTION]`
  commit on `main` from today.

## Villa vs. Hotel for a Leadership Retreat: Privacy, One Price, No Shared Lobby

**Rejected (2026-10-28):** the 2026-10-27 report flagged this entry explicitly as needing a
human call before acting, because it overlaps heavily in theme with the B2B FAQ already
published on Switzerland's page that same day ("Can a company book...for a leadership team
offsite") — the report said so should ship as its own entry on a *different* country, or be
marked superseded, and asked for a human decision rather than deciding unilaterally. Today's
pass initially missed that flag, drafted this as a second Switzerland FAQ, got it through a
build-clean checker pass — then, before committing, re-read yesterday's report, recognized the
drafted FAQ substantially restates the existing one (both lean on "no shared hotel lobby" and
"one all-inclusive price"), and reverted the `src/countries.py` edit rather than publish
genuinely redundant content. Nothing was committed or pushed. See
`drafts/pages/switzerland-villa-vs-hotel-faq.md` for the full record, including the rejected
draft text, and today's report for the open question this still leaves for the human.

- Target audience: B2B
- Why this topic: A generic (non-Israeli, non-tech-specific) guide to "venues for a company
  offsite abroad" exists (groupaccommodation.com) and already argues villas/country estates
  suit retreats better than hotels — confirming the comparison angle has search demand — but it
  speaks to no specific audience and doesn't address pricing structure at all. Narrowing that
  same comparison to this product's actual terms (one all-inclusive price, no published rate
  card, full-group privacy) is a straightforward differentiation play against a format
  competitors have only covered generically.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry, but on which country is
  the open question (see rejection note above)
- Status: **not started** — human input needed on whether to use a different country's page, or
  mark this entry superseded by the existing Switzerland FAQ. Not re-attempted until that's
  answered. **Still unresolved as of 2026-10-29 (third day running) — see today's report.**
  Because this is the only `not started` entry and it's explicitly blocked pending a human call,
  today's pass treated the topic map as having no safe actionable entry and ran the
  keyword-researcher fallback (per the routine's step 2) to add fresh entries below rather than
  re-attempting this one a third time.

## Istria Beyond the Coast: Truffle Hunts in Motovun, Hilltop Grožnjan, and Malvazija Wine Tastings

- Target audience: B2C
- Why this topic: Istria truffle-hunting experiences (private hunts with trained dogs near
  Motovun and Buzet, e.g. Karlić Tartufi) and Malvazija wine tastings are sold everywhere as
  standalone day activities or tours, consistently paired with named hilltop towns (Motovun,
  Grožnjan) across travel-guide and tour-operator sources. Villa rental listings for the region
  separately note that "many guests plan trips around truffle hunts" as an add-on, but no result
  found bundles a private villa stay with these named experiences as one package — every
  competitor sells either the villa or the truffle/wine day, never both together. Croatia's
  existing page already covers the Dalmatian Coast, Hvar and Istria, but Istria's current region
  description (`src/countries.py`) is generic ("hill towns, truffles, olive oil and wine") with
  no named places — this is the same enrichment pattern already shipped for Puglia, Tuscany,
  Algarve and Crete, applied to Istria's un-enriched description.
- Suggested page type: enriched Istria region description on the existing Croatia page
- Status: **published** — checker-approved 2026-10-29, see
  `drafts/pages/istria-beyond-the-coast-region-enrichment.md` and the `[PUBLISHED TO PRODUCTION]`
  commit on `main` (`a487648`) from today.

## Mosel Valley: A Villa Base for Riverside Wine Villages Between Traben-Trarbach and Zell

- Target audience: B2C
- Why this topic: Search results split the same way as every prior enrichment gap — wine-tasting
  venues and guided tours (Villa Huesgen's Art Nouveau tastings, Visit Moselle's guided
  Via Mosel walks, Zell's gourmet weekend package) on one side, and general holiday-home listings
  (Villa for You, Micazu) with no tasting experience built in on the other. Nothing found
  combines a private group villa stay with a curated Mosel wine-village itinerary as one
  package. Germany's existing Mosel Valley region description (`src/countries.py`) only
  mentions "steep Riesling vineyards, half-timbered villages and river cruises" in general terms
  — the same gap the Puglia/Tuscany/Algarve/Crete enrichments closed elsewhere: named villages
  and a specific tasting experience are missing.
- Suggested page type: enriched Mosel Valley region description on the existing Germany page
- Status: **published** — checker-approved 2026-10-30, see
  `drafts/pages/mosel-valley-region-enrichment.md` and the `[PUBLISHED TO PRODUCTION]` commit
  on `main` (`bca66b4`) from today.

## Hvar: Lavender Fields in Velo Grablje and a Sailing Day to the Pakleni Islands

- Target audience: B2C
- Why this topic: Hvar's lavender season (Velo Grablje and Brusje, with a lavender festival at
  the end of June) and sailing day trips to the Pakleni Islands both recur as named, specific
  draws across independent sources, but villa-rental listings for Hvar (Marriott Homes & Villas,
  CV Villas, Holidu) describe the properties only — pools, bedroom counts, nightly rates — with
  no mention of these named experiences, and the lavender/sailing content lives on separate
  tour/guide sites. Croatia's existing Hvar region description (`src/countries.py`) currently
  says only "lavender fields, a lively harbour town and quiet bays" with no named places —
  enriching it with Velo Grablje, the lavender festival timing, and a named Pakleni Islands
  sailing day follows the same pattern already shipped for Puglia, Tuscany, Algarve and Crete.
- Suggested page type: enriched Hvar region description on the existing Croatia page
- Status: **published** — checker-approved 2026-10-31, see
  `drafts/pages/hvar-lavender-sailing-region-enrichment.md` and the `[PUBLISHED TO PRODUCTION]`
  commit on `main` from today.

## Mallorca Beyond the Beach: A Tramuntana Hike to a Santa Maria del Camí Wine Tasting

**Added (2026-11-01) by the keyword-researcher fallback pass** — the topic map's only
`not started` entry ("Villa vs. Hotel for a Leadership Retreat") is still blocked on a human
decision (see that entry below, unresolved six days running), so this pass added fresh entries
rather than re-attempting it a sixth time.

- Target audience: B2C
- Why this topic: WebSearch on Tramuntana hiking + wine tasting surfaces a consistent split —
  multiple operators (Wilderness Travel, VBT, Audley Travel, a Valldemossa-and-wine small-group
  tour, and Mallorca Wine Tours, based in Santa Maria del Camí and explicitly set up for larger
  groups) sell a guided hike on the old Tramuntana paths above Valldemossa paired with a family
  winery tasting, as a standalone day tour. None of them is a villa operator, and Spain's
  existing Mallorca region description (`src/countries.py`) only says "fincas in the Tramuntana
  mountains, coves on the east coast and the old town of Palma" with no named village, trail, or
  winery — the same generic-description gap already closed for Puglia, Tuscany, Algarve, Crete,
  Istria, Hvar and Mosel. Nothing found combines a private group villa stay with this specific
  hike-to-tasting day as one package.
- Suggested page type: enriched Mallorca region description on the existing Spain page
- Status: **published** — checker-approved 2026-11-01, see
  `drafts/pages/mallorca-tramuntana-wine-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today.

## Austria's Wachau Valley: A Private Day Between Dürnstein and Melk Abbey

**Added (2026-11-01) by the keyword-researcher fallback pass**, same reason as the Mallorca
entry above.

- Target audience: B2C
- Why this topic: WebSearch confirms Dürnstein and Melk Abbey are consistently sold together as
  a named Danube day trip from Vienna (Vienna Sightseeing, Headout, TheTourGuy, daytrip.com),
  often with a boat ride between the two and a wine-tasting stop at a Dürnstein tavern — but
  every result is a bus/van tour departing Vienna, not a stay based in the valley itself.
  Austria's existing Wachau Valley region description (`src/countries.py`) only says "terraced
  vineyards along the Danube, apricot orchards and Grüner Veltliner tastings" with no named
  towns — the same gap already closed for Mosel Valley on Germany's page (a very similar
  river-valley/wine-village structure). A group based in the valley itself, rather than day-
  tripping in from Vienna, is the differentiated angle no competitor result addresses.
- Suggested page type: enriched Wachau Valley region description on the existing Austria page
- Status: **published** — checker-approved 2026-11-02, see
  `drafts/pages/wachau-valley-region-enrichment.md` and the `[PUBLISHED TO PRODUCTION]` commit
  on `main` (`9794cba`) from today.

## Peloponnese Beyond the Villa: Mystras, the Mani, and the Diros Caves

**Added (2026-11-01) by the keyword-researcher fallback pass**, same reason as the two entries
above.

- Target audience: B2C
- Why this topic: WebSearch shows villa-rental operators (Simpson Travel, Marriott Homes &
  Villas) marketing the Peloponnese on property size and pool count, while separately naming
  Mystras, the Mani and the Diros Caves only as generic "day trip" mentions — no result ties a
  specific villa stay to a structured day between these three named sites. Greece's existing
  Peloponnese region description (`src/countries.py`) only says "quiet bays, olive groves and
  ancient sites" with no named places — the same generic-description gap already closed for
  Crete on this same country page. The Byzantine ruins at Mystras, the Mani's stone tower
  villages, and the Diros Caves boat tour are each independently well-covered but never
  consolidated into one guide for a group deciding what to prioritize.
- Suggested page type: enriched Peloponnese region description on the existing Greece page
- Status: **published** — checker-approved 2026-11-03, see
  `drafts/pages/peloponnese-beyond-the-villa-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` (`8484af4`) from today.

## Sardinia: A Villa Base for a Boat Day to the La Maddalena Archipelago

**Added (2026-11-04) by the keyword-researcher fallback pass** — the topic map's only
`not started` entry ("Villa vs. Hotel for a Leadership Retreat") is still blocked on a human
decision (see that entry above, unresolved eight days running), so this pass added fresh
entries rather than re-attempting it an eighth time.

- Target audience: B2C
- Why this topic: WebSearch shows a clean split — villa-rental listings for Sardinia (Villas of
  Distinction, A.M.A Selections, Posarelli, Italy-Villas, Landfolk) describe the property only
  (pool, bedrooms, sea view), while named boat-day operators (Civitatis, Musement, Freedome,
  Click&Boat) sell full-day trips from Palau/La Maddalena/Costa Smeralda out to the La Maddalena
  archipelago's Spargi, Santa Maria and Budelli islands, independently corroborated by travel
  guides (2luxury2, Voyagetips) as a top Costa Smeralda activity. No result combines a private
  villa stay with this named boat day as one package. Italy's existing Sardinia region
  description (`src/countries.py`) only says "some of Europe's clearest water, quiet coves and
  exclusive private resorts tucked into the macchia above the sea" with no named places — the
  same generic-description gap already closed for Tuscany, Puglia and others on this page.
- Suggested page type: enriched Sardinia region description on the existing Italy page
- Status: **published** — checker-approved 2026-11-04, see
  `drafts/pages/sardinia-la-maddalena-region-enrichment.md` and the `[PUBLISHED TO PRODUCTION]`
  commit on `main` from today.

## Dordogne: Canoeing to La Roque-Gageac and Sarlat's Market Day

**Added (2026-11-04) by the keyword-researcher fallback pass**, same reason as the Sardinia
entry above.

- Target audience: B2C
- Why this topic: WebSearch confirms two recurring named experiences sold as standalone day
  activities, never bundled with a stay — canoeing the Dordogne river between La Roque-Gageac
  and Domme/Carsac (named outfitters: Canoë Dordogne, Canoës Loisirs Dordogne, Canoë Randonnée
  Dordogne, independently listed on CheckYeti and Manawa) and Sarlat's market day plus winter
  truffle hunts (named guided tours: Ophorus's "Sarlat Market & Gourmet Food Tour", Magpie
  Travel; independently flagged by Lonely Planet and Rick Steves). Villa listings for the region
  (Clickstay, A.M.A Selections, Villaforyou, SimplyOwners) describe pool, garden and games-room
  amenities only, with no mention of either experience by name. France's existing Dordogne
  region description (`src/countries.py`) only says "châteaux above the river, quiet countryside,
  truffles and walnuts: a slower, greener France" with no named village or activity — the same
  gap already closed elsewhere on this page's sibling country pages.
- Suggested page type: enriched Dordogne region description on the existing France page
- Status: **published** — checker-approved 2026-11-05, see
  `drafts/pages/dordogne-canoeing-sarlat-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today.

## Costa Brava: A Camí de Ronda Walk Between the Medieval Villages

**Added (2026-11-04) by the keyword-researcher fallback pass**, same reason as the two entries
above.

- Target audience: B2C
- Why this topic: WebSearch found three named, independently-sourced experiences for Costa
  Brava, all sold only as standalone tours with no villa-stay combination found — the Camí de
  Ronda coastal path (guided day hikes, especially Palamós–Calella de Palafrugell–Cap Roig,
  covered independently by Spain.info and Timeout Girona), the Pals–Peratallada–Begur medieval-
  village circuit (fixed-itinerary tours from Musement and Lokalee), and the Cadaqués/Dalí
  triangle (Civitatis, Hellotickets, corroborated by Visit Costa Brava's own tourism site). Villa
  listings (Iberimo, Amarantelva, Oliver's Travels) describe pool, tennis court and sea-view
  proximity only, naming no village or path. Spain's existing Costa Brava region description
  (`src/countries.py`) only says "rocky coves, medieval villages and Catalan cooking, an easy
  distance from Barcelona" with no named place — the same gap already closed for Mallorca on
  this same country page. The Pals/Peratallada/Begur circuit fits the existing "medieval
  villages" phrasing most literally, so that's the recommended angle if only one is used.
- Suggested page type: enriched Costa Brava region description on the existing Spain page
- Status: **published** — checker-approved 2026-11-06, see
  `drafts/pages/costa-brava-cami-de-ronda-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today. Used the Pals/Peratallada/Begur circuit as primary
  angle per this entry's own recommendation, with the Camí de Ronda folded in as a second day;
  the Cadaqués/Dalí angle was left out to keep the addition to two sentences — it remains
  available for a future entry.

## Sicily: An Etna Wine Tasting Between Noto and Taormina

**Added (2026-11-07) by the keyword-researcher fallback pass** — the topic map's only
`not started` entry ("Villa vs. Hotel for a Leadership Retreat") is still blocked on a human
decision (see that entry above, unresolved twelve days running), so this pass added fresh
entries rather than re-attempting it a twelfth time.

- Target audience: B2C
- Why this topic: WebSearch shows the same split found for every prior enrichment gap —
  multi-day tour operators (Exodus's "Sicily: Vino & Volcanoes" and "Sicily Grand Tour",
  OnTheGo Tours' Taormina-to-Palermo itinerary) sell a guided Etna walk paired with a wine and
  cheese tasting, plus stops in Noto and Taormina, as a bus-based multi-day tour — never a
  private villa stay. Separately, luxury villa-rental listings for exactly this area (Villanovo,
  Scent of Sicily, Villas of Distinction, Marriott Homes & Villas) describe pool, bedroom count
  and sea/Etna views only, naming no vineyard, tasting or trail. Italy's existing Sicily region
  description (`src/countries.py`) only says "Baroque towns, Etna wines and a cuisine of its
  own. Staffed exclusive private resorts near Noto, Taormina and the west coast" — it already
  name-drops "Etna wines" but gives no named vineyard, guide or tasting, the same
  generic-mention gap already closed for Sardinia and other Italian regions on this same page.
  No result combines a private group villa stay with a named Etna tasting day as one package.
- Suggested page type: enriched Sicily region description on the existing Italy page
- Status: drafted — see `drafts/pages/sicily-etna-wine-tasting-region-enrichment.md`, build
  clean (`npm run build`, 12 pages), pending checker review

## Bordeaux: A Right Bank Day Between Saint-Émilion's Grand Cru Châteaux

**Added (2026-11-07) by the keyword-researcher fallback pass**, same reason as the Sicily entry
above.

- Target audience: B2C
- Why this topic: WebSearch confirms a clean split again — half- and full-day small-group tours
  from Bordeaux (Klook, The Tour Guy, Europe Express, Lokalee) sell a Saint-Émilion village walk
  paired with a Grand Cru Classé château tasting, departing by van from the city, never from a
  stay in the vineyards themselves. Villa-rental listings for the same area (Villanovo's
  "Villa dans les vignes" and "Villa Nalou," CV Villas) describe pool, bedroom count and
  vineyard views only, naming no château or tasting. France's existing Bordeaux wine country
  region description (`src/countries.py`) only says "Vineyard estates around Saint-Émilion and
  the Médoc, with private tastings arranged at the châteaux" — it already promises private
  tastings but names no specific château, village walk or right-bank itinerary, the same
  generic-mention gap already closed for Sicily's "Etna wines" line above and for Mosel/Wachau
  on other country pages. No result combines a private group villa stay in the vineyards with a
  named Saint-Émilion château day as one package.
- Suggested page type: enriched Bordeaux wine country region description on the existing France
  page
- Status: not started

## Douro Valley: A Private Boat Crossing Between Two Quintas

**Added (2026-11-07) by the keyword-researcher fallback pass**, same reason as the two entries
above.

- Target audience: B2C
- Why this topic: WebSearch shows the pattern once more — small-group and private day tours from
  Porto (Winedering, Musement, My Little Adventure) sell a two-quinta wine tasting plus a one-
  hour river boat ride and a regional lunch as a single bus/van day trip from the city, never
  from a stay based in the valley. Quinta-rental listings for the valley itself (CV Villas'
  "Quinta Matilde," Tripwix, Marriott Homes & Villas) describe pool, bedroom count and terraced
  views only, naming no specific second quinta or boat crossing. Portugal's existing Douro Valley
  region description (`src/countries.py`) only says "Terraced vineyards along the river, port and
  wine quintas, and boat trips through the valley" — it already mentions quintas and boat trips
  in general terms but names no specific pair of quintas or a structured day between them, the
  same generic-mention gap already closed for Bordeaux and Sicily above. No result combines a
  private group villa stay with a named two-quinta-and-boat day as one package.
- Suggested page type: enriched Douro Valley region description on the existing Portugal page
- Status: not started
