import "server-only";
import { ProxyAgent } from "undici";
// Only provider HTTPS requests use the environment proxy. Local Supabase remains
// on its existing transport, and normal TLS verification remains enabled.
let agent: ProxyAgent | undefined;
export const providerTransport: typeof fetch = (input, options) => {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (!proxy) return fetch(input, options);
  agent ??= new ProxyAgent(proxy);
  const init = { ...options, dispatcher: agent };
  return fetch(input, init);
};
