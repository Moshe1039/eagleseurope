// Encryption for the most sensitive guest fields (passport number, date of birth).
// Uses AES-256-GCM with the key in the DATA_KEY secret (32 random bytes, base64).
// D1 is already encrypted at rest; this adds a second layer so a database export alone
// never exposes passport numbers.

const b64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

export function randomToken(bytes = 24) {
  const raw = crypto.getRandomValues(new Uint8Array(bytes));
  return b64(raw).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function newDataKey() {
  return b64(crypto.getRandomValues(new Uint8Array(32)));
}

export function hasKey(env) {
  try { return !!env.DATA_KEY && unb64(env.DATA_KEY).length === 32; } catch { return false; }
}

async function key(env) {
  return crypto.subtle.importKey("raw", unb64(env.DATA_KEY), "AES-GCM", false, ["encrypt", "decrypt"]);
}

export async function encrypt(env, plain) {
  if (!plain) return null;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await key(env), new TextEncoder().encode(plain));
  return `v1:${b64(iv)}:${b64(ct)}`;
}

export async function decrypt(env, value) {
  if (!value) return "";
  try {
    const [, iv, ct] = value.split(":");
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(iv) }, await key(env), unb64(ct));
    return new TextDecoder().decode(pt);
  } catch {
    return "[cannot decrypt]";
  }
}

export const mask = (s) => (s && s.length > 3 ? "•••" + s.slice(-3) : s ? "•••" : "");
