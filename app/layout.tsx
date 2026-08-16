import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: {
    default: profile.name.zh + " " + profile.name.en + " | Portfolio",
    template: "%s | " + profile.name.en,
  },
  description: profile.hero.introduction,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SmoothScrollProvider>
          <SiteHeader />
          {children}
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
