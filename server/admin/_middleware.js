// Protects everything under /admin with a username and password (HTTP Basic Auth).
// Set ADMIN_USER and ADMIN_PASSWORD as encrypted variables in Cloudflare Pages → Settings → Variables and secrets.
// For stronger protection, also put /admin behind Cloudflare Access (Zero Trust, free for up to 50 users).

async function sha256(value) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return new Uint8Array(buf);
}

async function safeEqual(a, b) {
  // Compare hashes so the comparison time does not depend on where the strings differ.
  const [x, y] = await Promise.all([sha256(a), sha256(b)]);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Eagle\'s admin", charset="UTF-8"', "Cache-Control": "no-store" },
  });
}

export async function onRequest({ request, env, next }) {
  if (!env.ADMIN_USER || !env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 12) {
    return new Response("Admin is not configured. Set ADMIN_USER and ADMIN_PASSWORD (12+ characters).", { status: 503 });
  }
  const header = request.headers.get("Authorization") || "";
  if (!header.startsWith("Basic ")) return unauthorized();
  let user = "", pass = "";
  try {
    const decoded = atob(header.slice(6));
    const i = decoded.indexOf(":");
    user = decoded.slice(0, i);
    pass = decoded.slice(i + 1);
  } catch {
    return unauthorized();
  }
  const ok = (await safeEqual(user, env.ADMIN_USER)) & (await safeEqual(pass, env.ADMIN_PASSWORD));
  if (!ok) return unauthorized();

  // Block cross-site form posts to the admin.
  if (request.method !== "GET") {
    const origin = request.headers.get("Origin");
    if (!origin || origin !== new URL(request.url).origin) return new Response("Forbidden", { status: 403 });
  }

  const res = await next();
  const out = new Response(res.body, res);
  out.headers.set("Cache-Control", "no-store");
  out.headers.set("X-Robots-Tag", "noindex, nofollow");
  out.headers.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");
  return out;
}
