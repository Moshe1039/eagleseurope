# Human-control table

The iron rule: **an agent prepares, a human approves and sends.** This matters more than speed —
the product sells trust, and the people on the other end of it are real, senior people.

| Action | Who's allowed |
|---|---|
| Research, summaries, drafts, tables | Agent, alone |
| Change to the live site's code/repo | Agent proposes, human approves |
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
- Anything that would push or merge into the live `eagleseurope` site repo
- Any message to a customer or villa owner
- Any price, discount, or payment term
- Any contract signature or money movement

These stay human-only by construction (the agents in this project have no tool access to send
messages, touch the live site's remote, or move money), not by discipline alone — a scheduled
run literally cannot do them.
