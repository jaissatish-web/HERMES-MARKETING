import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GATE HUB — Founder Control Center",
  description: "GCC-MENTOR control and growth platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
