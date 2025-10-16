"use client";

import { ArrowRight, ShieldCheck, ScanLine, Banknote, Smartphone, BarChart3, Send, QrCode } from "lucide-react";
import CTA from "@/components/cta";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-12 md:mt-20 mb-24">
      {/* Hero */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 dark:bg-[#121212] dark:text-slate-200 border border-slate-200 dark:border-neutral-800">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#1d4ed8]"></span>
            <span className="text-sm">Contactless. Sub‑second. Bank‑grade.</span>
          </div>
          <h1 className="text-4xl md:text-5xl xl:text-[4rem] font-semibold leading-[1.1] mt-5">
            Nigeria’s fastest contactless payments —
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] via-[#0f766e] to-[#facc15]">
              P2P, vendors, and bills, in a blink.
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mt-5 max-w-xl">
            BlinkPay is a digital payments platform built for Nigeria. Move money in sub‑seconds, pay vendors without POS hardware using QR or Spend Codes (offline‑ready), and settle bills seamlessly — all with bank‑grade security.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d4ed8] dark:focus:ring-offset-0">
              get started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#features" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-slate-300 dark:border-neutral-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-neutral-900">
              explore features
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <p className="text-2xl font-semibold"><span className="text-[#1d4ed8]">50k+</span></p>
              <p className="text-sm text-slate-500 dark:text-slate-400">users across NG</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">99.95%</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">platform uptime</p>
            </div>
            <div>
              <p className="text-2xl font-semibold"><span className="text-[#0f766e]">&lt; 1s</span></p>
              <p className="text-sm text-slate-500 dark:text-slate-400">average transfer time</p>
            </div>
          </div>
        </div>
        <div className="relative order-first md:order-none">
          <div className="aspect-[4/3] rounded-2xl border border-slate-200 dark:border-neutral-800 bg-gradient-to-br from-slate-50 to-white dark:from-neutral-900 dark:to-neutral-950 p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-4 flex flex-col justify-between shadow-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Send className="w-4 h-4 text-[#1d4ed8]" />
                  <span className="text-sm">P2P Transfer</span>
                </div>
                <p className="text-2xl font-semibold">₦12,500</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Success • 0.6s</p>
              </div>
              <div className="rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <QrCode className="w-4 h-4 text-[#0f766e]" />
                  <span className="text-sm">Vendor QR</span>
                </div>
                <div className="mt-4 h-28 rounded-lg bg-gradient-to-br from-[#1d4ed8]/15 via-[#0f766e]/15 to-[#facc15]/20" />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Offline‑ready Spend Code</p>
              </div>
              <div className="rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Banknote className="w-4 h-4 text-[#facc15]" />
                  <span className="text-sm">Bills & Airtime</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">MTN • DSTV • BRT • Schools</p>
              </div>
              <div className="rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-4 flex flex-col justify-between shadow-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#1d4ed8]" />
                  <span className="text-sm">Security</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">2FA • Biometrics • Anomaly detection</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">BVN/NIN KYC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">Everything you need to move money</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">Sub‑second transfers, QR/Spend Codes, bills, and business payouts — unified in one platform with real‑time dashboards.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Send, title: "Instant P2P & bank transfers", desc: "Move funds wallet‑to‑wallet and to banks in under a second." },
            { icon: ScanLine, title: "Pay vendors without POS", desc: "QR and one‑time Spend Codes work online or offline." },
            { icon: Banknote, title: "Bills & airtime", desc: "DSTV, GOtv, MTN, Glo, Airtel, 9mobile and more." },
            { icon: ShieldCheck, title: "Bank‑grade security", desc: "2FA, biometric options, anomaly detection, role‑based controls." },
            { icon: BarChart3, title: "Dashboards & analytics", desc: "Real‑time insights, treasury, and automated settlement." },
            { icon: Smartphone, title: "Web, Android, iOS", desc: "Seamless cross‑platform experience for everyone." },
          ].map((f, i) => (
            <article key={i} className="rounded-2xl border border-slate-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <f.icon className="w-5 h-5 text-[#1d4ed8]" />
                <h3 className="text-lg font-semibold">{f.title}</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="mt-16">
        <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 p-6 bg-gradient-to-br from-slate-50 to-white dark:from-neutral-900 dark:to-neutral-950">
          <p className="text-sm text-slate-600 dark:text-slate-300">Trusted by SMEs and vendors across Nigeria — integrated with leading banks and identity providers.</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm text-slate-500 dark:text-slate-400">
            {['Providus Bank','GTBank','Zenith','Fidelity','Access Bank','IdentityPass'].map((n) => (
              <div key={n} className="px-3 py-2 rounded-full border border-slate-200 dark:border-neutral-800 text-center">{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">Simple pricing</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Transparent, usage‑based fees. No hidden charges.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
            <h3 className="text-xl font-semibold">Personal</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">For individuals</p>
            <p className="text-3xl font-semibold mt-4">Free</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>• Wallet to wallet transfers</li>
              <li>• Bank transfers (fees apply)</li>
              <li>• Bill payments</li>
              <li>• QR/Spend Code payments</li>
            </ul>
            <Link href="/auth/signup" className="mt-6 inline-flex rounded-full px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-black">Get started</Link>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900 ring-2 ring-[#1d4ed8]/30">
            <h3 className="text-xl font-semibold">Business</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">For vendors & SMEs</p>
            <p className="text-3xl font-semibold mt-4">From 1%</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>• Vendor payouts</li>
              <li>• Multi‑branch & role‑based access</li>
              <li>• Dashboards & settlement</li>
              <li>• Priority support</li>
            </ul>
            <Link href="/auth/signup" className="mt-6 inline-flex rounded-full px-5 py-2.5 bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] text-white">Talk to sales</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">What customers say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {name:'Adaora', role:'Vendor, Lagos', text:'Scanning QR with my phone is faster than POS. Offline Spend Codes saved my sales during network glitches.'},
            {name:'Emeka', role:'Rider, Abuja', text:'Transfers hit in under a second. Paying bills in the app is smooth and reliable.'},
            {name:'Folake', role:'SME Owner, Ibadan', text:'Dashboard and payouts give me clear visibility. Fees are fair and predictable.'},
          ].map((t, i) => (
            <blockquote key={i} className="rounded-2xl border border-slate-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <img src={`https://randomuser.me/api/portraits/${i%2===0?'women':'men'}/${20+i}.jpg`} alt="user" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-4">“{t.text}”</p>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {[
            {q:'Is BlinkPay regulated?', a:'BlinkPay operates via licensed Banking‑as‑a‑Service partners and adheres to CBN guidelines with BVN/NIN tiered KYC.'},
            {q:'Do I need a POS terminal?', a:'No. Use QR or one‑time Spend Codes that can work offline. Any smartphone is enough.'},
            {q:'How fast are transfers?', a:'Average completion is under one second for wallet and supported bank transfers.'},
            {q:'Which bills can I pay?', a:'Airtime/data (MTN, Glo, Airtel, 9mobile), TV (DSTV, GOtv, Startimes), utilities, transit (BRT), and more.'},
            {q:'Does it work on iOS and Android?', a:'Yes. BlinkPay is available on web, Android, and iOS with a consistent experience.'},
          ].map((item, i) => (
            <details key={i} className="group border border-slate-200 dark:border-neutral-800 rounded-xl p-4 bg-white dark:bg-neutral-900">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-medium">{item.q}</span>
                <span className="text-slate-500 group-open:hidden">+</span>
                <span className="text-slate-500 hidden group-open:inline">−</span>
              </summary>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div id="get-started"><CTA /></div>

      {/* Contact */}
      <section id="contact" className="mt-20">
        <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Contact us</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Questions, partnerships, or enterprise? We’d love to hear from you.</p>
            <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p>Email: support@blinkpay.ng</p>
              <p>Office: Lagos, Nigeria</p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <form className="grid grid-cols-1 gap-3">
              <input type="text" placeholder="Full name" className="w-full rounded-lg border border-slate-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-2 text-sm" />
              <input type="email" placeholder="Email" className="w-full rounded-lg border border-slate-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-2 text-sm" />
              <textarea placeholder="Message" rows={4} className="w-full rounded-lg border border-slate-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-2 text-sm" />
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] hover:opacity-95">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
