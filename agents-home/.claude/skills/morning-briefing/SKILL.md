---
name: morning-briefing
description: Produces a status report on the Eagle's Europe deal pipeline from pipeline/leads.csv — counts by stage and source, stale leads, and progress against the decision gate. Use when the user asks for the briefing, a status update, or "where do we stand."
---

Produce a dated status report on the Eagle's Europe pipeline. This is invoked by the
coordinator, or directly by the user.

## Steps

1. Read `pipeline/leads.csv` in full.
2. Compute counts by `stage` (how many in each of: New Lead, Contacted, Quote Requested, Call
   Scheduled, Call Done, Offer Sent, Deposit Pending, Deal Closed, Lost).
3. Compute counts by `source`.
4. Compute total conversations (rows where contact has actually happened — `stage` is not
   "New Lead") and flag progress against the decision gate from
   `context/business-summary.md`: X of 15 conversations have requested a quote
   (`quote_requested` = true), Y of 15 have reached Deal Closed. State the ratio plainly — don't
   round up or editorialize about whether it's "good," just report it.
5. Flag any row where `last_updated` is more than 5 days old and `stage` is not Deal Closed or
   Lost — these are stale and need the human's attention.
6. Check whether this is the **first** row with `stage` other than "New Lead" ever recorded
   (i.e. the first real form response). If so, call this out explicitly as the trigger the
   coordinator should use to propose activating the next paused agent.
7. Write the report to `reports/briefing-<YYYY-MM-DD>.md` (today's date), with this structure:

```markdown
# Briefing — <date>

## Pipeline counts
<by stage, by source>

## Decision gate
<X of 15 requested a quote, Y of 15 closed>

## Needs attention
<stale leads, or "none">

## Trigger check
<first-form-response trigger fired? yes/no>
```

Keep the report factual and short — this is a status check, not a narrative. If
`pipeline/leads.csv` has no rows beyond the header, say exactly that rather than fabricating
placeholder numbers.
