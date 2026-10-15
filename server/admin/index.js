// /admin — list of leads, with status updates, CSV export and deletion (GDPR right to erasure).

const STATUSES = ["new", "contacted", "proposal", "booked", "closed"];

const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function page(body) {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Leads – Eagle's admin</title>
<style>
body{margin:0;font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:#22282A;background:#F7F4EF}
header{background:#11181B;color:#EFEBE4;padding:18px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
h1{margin:0;font-size:20px;font-weight:500}
main{padding:24px}
a{color:#7A6431}
.bar{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:16px}
.bar a,.bar button{display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border:1px solid #7A6431;background:#fff;color:#22282A;text-decoration:none;font:inherit;cursor:pointer}
.bar a[aria-current="true"]{background:#11181B;color:#fff;border-color:#11181B}
.wrap{overflow-x:auto;background:#fff;border:1px solid #D8D0C2}
table{border-collapse:collapse;width:100%;min-width:1100px}
th,td{padding:10px 12px;border-bottom:1px solid #ECE6DA;text-align:left;vertical-align:top}
th{background:#EFEBE4;font-weight:500;position:sticky;top:0}
td.note{max-width:320px;white-space:pre-wrap}
select,button{font:inherit;min-height:36px}
form{display:inline}
.del{background:none;border:0;color:#9B2C1E;text-decoration:underline;cursor:pointer;padding:0 4px}
.muted{color:#4A5154}
</style></head><body>${body}</body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function onRequestGet({ request, env }) {
  if (!env.DB) return new Response("Database binding DB is missing.", { status: 503 });
  const url = new URL(request.url);
  const status = STATUSES.includes(url.searchParams.get("status")) ? url.searchParams.get("status") : null;

  const { results } = status
    ? await env.DB.prepare("SELECT * FROM leads WHERE status = ?1 ORDER BY created_at DESC LIMIT 1000").bind(status).all()
    : await env.DB.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 1000").all();
  const counts = await env.DB.prepare("SELECT status, COUNT(*) AS n FROM leads GROUP BY status").all();
  const countOf = Object.fromEntries((counts.results || []).map((r) => [r.status, r.n]));
  const total = Object.values(countOf).reduce((a, b) => a + b, 0);

  const filters = [`<a href="/admin" ${!status ? 'aria-current="true"' : ""}>All (${total})</a>`]
    .concat(STATUSES.map((s) => `<a href="/admin?status=${s}" ${status === s ? 'aria-current="true"' : ""}>${s} (${countOf[s] || 0})</a>`))
    .join("");

  const rows = (results || []).map((r) => `<tr>
  <td>${esc(r.created_at.replace("T", " ").replace("Z", ""))}</td>
  <td>${esc(r.name)}</td>
  <td><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></td>
  <td>${r.phone ? `<a href="tel:${esc(r.phone)}">${esc(r.phone)}</a>` : ""}</td>
  <td>${r.preference === "call" ? "Book a call" : "Information"}</td>
  <td>${esc(r.couples)}</td>
  <td>${esc(r.destination)}</td>
  <td>${esc(r.travel_when)}</td>
  <td class="note">${esc(r.note)}</td>
  <td>
    <form method="post" action="/admin/status">
      <input type="hidden" name="id" value="${r.id}">
      <label class="sr-only" for="s${r.id}">Status</label>
      <select id="s${r.id}" name="status">${STATUSES.map((s) => `<option ${s === r.status ? "selected" : ""}>${s}</option>`).join("")}</select>
      <button type="submit">Save</button>
    </form>
  </td>
  <td>
    <form method="post" action="/admin/delete">
      <input type="hidden" name="id" value="${r.id}">
      <button class="del" type="submit" aria-label="Delete lead ${esc(r.name)}">Delete</button>
    </form>
  </td>
</tr>`).join("");

  return page(`<header><h1>Eagle's – Leads</h1><span class="muted" style="color:#B9C2C4">${total} total</span></header>
<main>
  <nav class="bar" aria-label="Filter by status">${filters}<a href="/admin/leads.csv">Download CSV</a></nav>
  <div class="wrap"><table>
    <caption class="muted" style="text-align:left;padding:10px 12px">Newest first. Delete removes the lead permanently (use for erasure requests).</caption>
    <thead><tr><th scope="col">Received (UTC)</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Phone</th><th scope="col">Wants</th><th scope="col">Group</th><th scope="col">Destination</th><th scope="col">When</th><th scope="col">Note</th><th scope="col">Status</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead>
    <tbody>${rows || `<tr><td colspan="11">No leads yet.</td></tr>`}</tbody>
  </table></div>
</main>
<style>.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}</style>`);
}
