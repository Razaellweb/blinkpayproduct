import { Mail, Phone, MapPin } from "lucide-react";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0B0B0B] border-t border-slate-200 dark:border-neutral-800 mt-24">
      <div className="w-[98%] md:w-[90%] 2xl:w-[80%] mx-auto py-10">
        <div className="w-full flex flex-col items-center">
          <div className="flex gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#1d4ed8] via-[#0f766e] to-[#facc15]" />
            <h1 className="text-2xl font-semibold">blinkpay</h1>
          </div>

          <nav className="flex items-center gap-1 mt-6 flex-wrap justify-center">
            {[
              { href: "/", label: "Home" },
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#faq", label: "FAQ" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm md:text-base px-3 md:px-4 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-900">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="w-full h-px bg-slate-200 dark:bg-neutral-800 mt-6" />

          <div className="flex items-center gap-4 mt-6 flex-wrap justify-center text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2 text-sm md:text-base"><Mail className="w-4 h-4 text-[#1d4ed8]" /> support@blinkpay.ng</span>
            <span className="flex items-center gap-2 text-sm md:text-base"><Phone className="w-4 h-4 text-[#0f766e]" /> +234 800 000 0000</span>
            <span className="flex items-center gap-2 text-sm md:text-base"><MapPin className="w-4 h-4 text-[#facc15]" /> Lagos, Nigeria</span>
          </div>

          <div className="w-full h-px bg-slate-200 dark:bg-neutral-800 mt-6" />

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-slate-500 dark:text-slate-400">
            <p className="text-sm">© {new Date().getFullYear()} BlinkPay. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <span className="opacity-60">•</span>
              <Link href="#" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
