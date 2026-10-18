---
name: exposure-pulse
description: Pulls real Cloudflare Workers traffic/error data for eagleseurope, combines it with the leads pipeline and a log of what the agents actually did (git history), and writes one combined status report. Use when the user asks "how's exposure doing," "what did the agents actually do," or wants a combined traffic+pipeline+activity update.
---

Produce a combined exposure/activity report. This answers three questions in one place: is
traffic happening, is the pipeline moving, and what did the agents actually produce.

## Steps

1. **Traffic.** Load `.env` (never print its contents) and query Cloudflare's GraphQL Analytics
   API for the last 7 days of Workers invocation data:

   ```
   POST https://api.cloudflare.com/client/v4/graphql
   Authorization: Bearer $CLOUDFLARE_API_TOKEN
   query: viewer { accounts(filter: {accountTag: $CLOUDFLARE_ACCOUNT_ID}) {
     workersInvocationsAdaptive(limit: 1000, filter: {
       scriptName: $CLOUDFLARE_WORKER_NAME, datetime_geq: <7 days ago>, datetime_leq: <now>
     }) { sum { requests errors subrequests } dimensions { datetime } } } }
   ```

   Sum total requests and errors across all returned rows. Note the most recent `datetime`
   present — if it's more than 48 hours old, say so explicitly rather than just reporting a
   stale total as if it were current.

2. **Pipeline.** Read `pipeline/leads.csv` and report the same breakdown the morning-briefing
   skill produces (counts by stage/source, decision-gate progress, stale leads). Don't
   reimplement differently — reuse the same logic/numbers.

3. **Actions taken.** Run `git log --oneline -20` in this repo and summarize what actually
   changed recently — which agent/commit touched what (`research/topic-map.md` updates from the
   researcher, new files in `drafts/pages/` from the writer, etc.). This is the actual audit
   trail of what the agents did; don't invent activity that isn't reflected in the commit
   history or the working tree.

4. Write the combined report to `reports/pulse-<YYYY-MM-DD>.md`:

```markdown
# Exposure pulse — <date>

## Traffic (last 7 days, Cloudflare)
Total requests: <n>, errors: <n>. Most recent activity: <datetime>.
<Flag explicitly if the most recent datapoint is >48h old, or if there's no data at all.>

## Pipeline
<same structure as the morning-briefing report>

## What the agents actually did
<bullet list derived from git log + current drafts/research state, not invented>
```

If Cloudflare data can't be fetched (missing `.env`, invalid token, API error), say exactly
that — don't report a zero as if it were a verified measurement.
