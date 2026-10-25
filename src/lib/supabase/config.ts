import "server-only";
export function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol !== "https:" &&
      !["localhost", "127.0.0.1"].includes(parsed.hostname)
    )
      return null;
    if (key.startsWith("sb_secret_")) return null;
    if (
      key.split(".").length === 3 &&
      JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString())
        .role !== "anon"
    )
      return null;
    return { url, key };
  } catch {
    return null;
  }
}
