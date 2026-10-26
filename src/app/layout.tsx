import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/app-shell";
import "./globals.css";
const geomanist = localFont({
  src: "../fonts/geomanist-regular.woff",
  weight: "400",
  style: "normal",
  variable: "--font-body",
  display: "swap",
});
const chartwell = localFont({
  src: "../fonts/chartwell-bars-regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});
export const metadata: Metadata = {
  title: { default: "Media One Connect", template: "%s · Media One Connect" },
  description: "Your companion for exploring Media One Hotel and its venues.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#3C474F",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geomanist.variable} ${chartwell.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
