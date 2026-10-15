// Small HTML helpers shared by the admin and the guest form.

export const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const BASE_CSS = `
*{box-sizing:border-box}
body{margin:0;font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;color:#22282A;background:#F7F4EF}
a{color:#7A6431}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
:focus-visible{outline:2px solid #7A6431;outline-offset:2px}
input,select,textarea,button{font:inherit}
input,select,textarea{min-height:44px;padding:8px 10px;border:1px solid #B9B0A0;background:#fff;color:#22282A;border-radius:0;width:100%}
textarea{min-height:80px}
label{display:block;font-size:14px;font-weight:500;margin-bottom:4px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border:1px solid #11181B;background:#11181B;color:#fff;text-decoration:none;cursor:pointer}
.btn.ghost{background:#fff;color:#22282A;border-color:#7A6431}
.btn.danger{background:#fff;color:#9B2C1E;border-color:#9B2C1E}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:16px}
.card{background:#fff;border:1px solid #D8D0C2;padding:20px;margin-bottom:20px}
.muted{color:#4A5154}
.note{background:#FFF7E0;border:1px solid #E2C46A;padding:14px 16px;margin-bottom:20px}
.err{color:#9B2C1E}
table{border-collapse:collapse;width:100%}
th,td{padding:10px 12px;border-bottom:1px solid #ECE6DA;text-align:left;vertical-align:top}
th{background:#EFEBE4;font-weight:500}
.wrap-table{overflow-x:auto;background:#fff;border:1px solid #D8D0C2}
fieldset{border:1px solid #D8D0C2;padding:16px;margin:0 0 16px;background:#fff}
legend{font-weight:600;padding:0 6px}
`;

export function htmlResponse(markup, status = 200, extraHeaders = {}) {
  return new Response(markup, { status, headers: { "Content-Type": "text/html; charset=utf-8", ...extraHeaders } });
}

export function adminPage(title, body, active = "") {
  const tab = (href, label, key) =>
    `<a href="${href}" ${active === key ? 'aria-current="page" style="color:#fff;text-decoration:underline"' : 'style="color:#B9C2C4"'}>${label}</a>`;
  return htmlResponse(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} – Eagle's admin</title><style>${BASE_CSS}
header{background:#11181B;color:#EFEBE4;padding:14px 24px;display:flex;gap:24px;align-items:center;flex-wrap:wrap}
header b{font-weight:600;margin-right:12px}
header a{display:inline-flex;align-items:center;min-height:44px}
main{padding:24px;max-width:1400px}
h1{font-size:24px;font-weight:600;margin:0 0 16px}
h2{font-size:19px;font-weight:600;margin:0 0 12px}
</style></head><body>
<header><b>Eagle's admin</b><nav aria-label="Admin">${tab("/admin", "Leads", "leads")} &nbsp; ${tab("/admin/trips", "Trips", "trips")}</nav></header>
<main>${body}</main></body></html>`);
}

export function guestPage(title, body) {
  return htmlResponse(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>${esc(title)} – Eagle's Europe</title><style>${BASE_CSS}
header{background:#11181B;color:#EFEBE4;padding:20px 24px}
header b{font:500 26px/1 Georgia,serif;letter-spacing:.04em}
main{padding:24px;max-width:860px;margin:0 auto}
h1{font:400 34px/1.15 Georgia,serif;margin:8px 0 12px}
</style></head><body><header><b>Eagle's</b> <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#C9B27A">Europe</span></header>
<main>${body}</main></body></html>`, 200, {
    "Cache-Control": "no-store",
    "Referrer-Policy": "same-origin",
    "X-Robots-Tag": "noindex, nofollow",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
  });
}
