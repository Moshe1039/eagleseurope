// POST /admin/status — change a lead's status.
const STATUSES = ["new", "contacted", "proposal", "booked", "closed"];

export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  const id = Number(form.get("id"));
  const status = String(form.get("status") || "");
  if (!Number.isInteger(id) || id < 1 || !STATUSES.includes(status)) {
    return new Response("Invalid request", { status: 400 });
  }
  await env.DB.prepare("UPDATE leads SET status = ?1, updated_at = strftime('%Y-%m-%dT%H:%M:%SZ','now') WHERE id = ?2")
    .bind(status, id)
    .run();
  return Response.redirect(new URL("/admin", request.url).toString(), 303);
}
