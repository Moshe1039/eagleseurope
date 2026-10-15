// /admin — list of leads, with status updates, CSV export and deletion (GDPR right to erasure).

const STATUSES = ["new", "contacted", "proposal", "booked", "closed"];

import { esc, adminPage } from "../lib/html.js";

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
    <a href="/admin/trips?from_lead=${r.id}">Create trip</a>
    <form method="post" action="/admin/delete">
      <input type="hidden" name="id" value="${r.id}">
      <button class="del" type="submit" aria-label="Delete lead ${esc(r.name)}">Delete</button>
    </form>
  </td>
</tr>`).join("");

  return adminPage("Leads", `<h1>Leads <span class="muted" style="font-weight:400;font-size:16px">${total} total</span></h1>
  <nav class="bar" aria-label="Filter by status">${filters}<a href="/admin/leads.csv">Download CSV</a></nav>
  <div class="wrap" tabindex="0" role="region" aria-label="Leads table, scroll sideways on small screens" style="overflow-x:auto;background:#fff;border:1px solid #D8D0C2"><table>
    <caption class="muted" style="text-align:left;padding:10px 12px">Newest first. Delete removes the lead permanently (use for erasure requests).</caption>
    <thead><tr><th scope="col">Received (UTC)</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Phone</th><th scope="col">Wants</th><th scope="col">Group</th><th scope="col">Destination</th><th scope="col">When</th><th scope="col">Note</th><th scope="col">Status</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead>
    <tbody>${rows || `<tr><td colspan="11">No leads yet.</td></tr>`}</tbody>
  </table></div>
<style>.bar{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:16px}.bar a{display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border:1px solid #7A6431;background:#fff;color:#22282A;text-decoration:none}.bar a[aria-current="true"]{background:#11181B;color:#fff}td.note{max-width:320px;white-space:pre-wrap;background:none;border:0;border-bottom:1px solid #ECE6DA;padding:10px 12px;margin:0}table{min-width:1100px}select,button{min-height:36px;width:auto}form{display:inline}.del{background:none;border:0;color:#9B2C1E;text-decoration:underline;cursor:pointer;padding:0 4px}</style>`, "leads");
}
