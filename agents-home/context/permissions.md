# Human-control table

The iron rule: **an agent prepares, a human approves and sends.** This matters more than speed —
the product sells trust, and the people on the other end of it are real, senior people.

| Action | Who's allowed |
|---|---|
| Research, summaries, drafts, tables | Agent, alone |
| Content-level edit to `src/countries.py` (FAQ entry, region/intro description) | Agent edits, checker approves + confirms a clean build, then it's committed and pushed to `main` immediately — see "Publishing to production" below. No other file or site area is covered by this. |
| Any other change to the live site's code/repo (`server/`, `wrangler.toml`, `build.py`, routing, anything structural) | Agent proposes, human approves — the fast path above does not extend here |
| Sending a message to a customer or villa owner | Human only — agent produces a draft, nothing more |
| Price, discount, or payment terms in any offer | Human only |
| Signing a contract or moving money | Human only, and only after a lawyer has reviewed the first contract |

## Permission mode in the editor

Start every session in **"ask before edits"** mode. Only move to auto-accept for a specific
skill once that skill's behavior has actually been tested and trusted. **Bypass-permissions
mode is not used at this stage** — this project isn't at the point where unattended full
autonomy is an acceptable risk.

## What can run unattended on a schedule, and what never can

The table above already draws the real line: nothing in it changes just because a task is
"routine" or scheduled. Concretely:

**Can run unattended, once its output pattern has been approved a few times:**
- keyword-researcher updating `research/topic-map.md`
- content-writer producing a new file in `drafts/pages/`
- checker reviewing a draft and writing its approve/reject notes
- coordinator updating `pipeline/leads.csv` bookkeeping and writing a dated report to `reports/`

These are all still "research, summaries, drafts, tables" from the table — a scheduled run of
one of these doesn't need a human to click "yes, go ahead" on each individual run once the
pattern is trusted, but a human still reads the output.

**Never auto-approved, no matter how many times it's run before:**
- Any push/merge to the live site repo that isn't the narrow `src/countries.py` path above
- Any message to a customer or villa owner
- Any price, discount, or payment term
- Any contract signature or money movement

These stay human-only by construction (the agents in this project have no tool access to send
messages, touch the live site's remote outside that one path, or move money), not by discipline
alone — a scheduled run literally cannot do them.

## Publishing to production — the one automated exception, and its gate

Per explicit instruction, a `src/countries.py` content edit (new FAQ entry, enriched region or
intro description) goes live on eagleseurope.com without a human clicking approve first. This
is the only place in this whole project where that's true, and it only works because of a
mechanical, non-negotiable gate — not trust in any single agent's judgment:

1. The writer makes the edit and runs `npm run build` itself — if it fails, it fixes or reverts
   before calling anything done.
2. The checker independently re-runs `npm run build` (never trusts a reported pass) and
   confirms the diff touches nothing but an existing country's `regions`/`faq`/`intro` entries.
3. Only if both pass does the commit happen — with the message prefixed
   `[PUBLISHED TO PRODUCTION]` — followed immediately by `git push origin main`.
4. The same day's `reports/pulse-*.md` entry repeats that flag with what was published, so
   scanning either the commit log or the day's report makes it immediately obvious something
   went live, with enough detail to revert fast (`git revert <sha>` + push) if it's wrong.

This is after-the-fact oversight, not before-the-fact approval — a deliberate trade for speed.
If this stops being the right trade (a bad publish happens, the pattern needs tightening), add
a human checkpoint back in here rather than quietly working around it.
