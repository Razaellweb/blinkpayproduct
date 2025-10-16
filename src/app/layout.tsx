import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import LayoutFrame from "@/components/LayoutFrame";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlinkPay — Nigeria’s fastest contactless payments",
  description:
    "BlinkPay enables sub‑second P2P transfers, vendor QR/Spend Code payments (offline‑ready), and seamless bills with bank‑grade security and real‑time dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-slate-900 dark:bg-[#0B0B0B] dark:text-white`}
      >
        {/* Theme init to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches; if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');} else {document.documentElement.classList.remove('dark');}}catch(e){}})();",
          }}
        />
        <LayoutFrame>{children}</LayoutFrame>
      </body>
    </html>
  );
}
