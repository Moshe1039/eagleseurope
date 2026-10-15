// POST /admin/delete — permanently remove a lead (e.g. for a GDPR erasure request).
export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  const id = Number(form.get("id"));
  if (!Number.isInteger(id) || id < 1) return new Response("Invalid request", { status: 400 });
  await env.DB.prepare("DELETE FROM leads WHERE id = ?1").bind(id).run();
  return Response.redirect(new URL("/admin", request.url).toString(), 303);
}
