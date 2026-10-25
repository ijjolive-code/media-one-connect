import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The private Codespaces proxy can forward Origin: localhost:3000 while
  // retaining its external x-forwarded-host. Trust only that observed origin,
  // only inside Codespaces; keep Next.js origin checks unchanged elsewhere.
  ...(process.env.CODESPACES === "true"
    ? {
        experimental: {
          serverActions: {
            allowedOrigins: ["localhost:3000"],
          },
        },
      }
    : {}),
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "same-origin" },
    ] }];
  },
};
export default nextConfig;
