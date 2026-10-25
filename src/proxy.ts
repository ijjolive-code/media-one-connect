import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfig } from "@/lib/supabase/config";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const config = supabaseConfig();
  if (config) {
    const supabase = createServerClient(config.url, config.key, {
      cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.APP_COOKIE_SECURE === "true",
        path: "/",
      },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(items, cacheHeaders) {
          items.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          items.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          Object.entries(cacheHeaders).forEach(([key, value]) =>
            response.headers.set(key, value),
          );
        },
      },
    });
    await supabase.auth.getUser();
  }
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  return response;
}
export const config = { matcher: ["/staff/:path*"] };
