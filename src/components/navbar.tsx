"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // initialize theme state from document
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden xl:block">
        <section className="w-full bg-white/80 dark:bg-[#0E0E0E]/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 border border-slate-200 dark:border-neutral-800 rounded-full flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="left-0 flex gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#1d4ed8] via-[#0f766e] to-[#facc15]" />
            <h1 className="text-2xl font-semibold">blinkpay</h1>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm md:text-base px-4 py-2 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-neutral-900 ${pathname === link.href ? "bg-slate-100 dark:bg-neutral-900" : ""}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button aria-label="Toggle theme" onClick={toggleTheme} className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-900">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/auth/signup" className="px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black text-sm md:text-base">
              Get started
            </Link>
          </div>
        </section>
      </div>

      {/* Mobile & Tablet Navbar */}
      <div className="xl:hidden w-[97%] mx-auto bg-white/80 dark:bg-[#0E0E0E]/80 backdrop-blur border border-slate-200 dark:border-neutral-800 px-4 py-3 flex justify-between items-center rounded-full">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#1d4ed8] via-[#0f766e] to-[#facc15]" />
          <h1 className="text-lg font-semibold">blinkpay</h1>
        </div>

        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={toggleTheme} className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-900">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMenuOpen(true)} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/50 z-40" />
      )}

      {/* Sidebar Menu */}
      <div className={`fixed top-0 z-[1000] right-0 h-full w-72 bg-white dark:bg-[#0E0E0E] text-slate-900 dark:text-white px-6 py-6 transform transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-neutral-800 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close Button */}
        <button onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-200 text-2xl mb-6">
          <X className="w-6 h-6" />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`text-base cursor-pointer px-3 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-900 ${pathname === link.href ? "bg-slate-100 dark:bg-neutral-900" : ""}`}>
              {link.label}
            </Link>
          ))}
          <Link href="#get-started" onClick={() => setMenuOpen(false)} className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] text-white">
            Get started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
