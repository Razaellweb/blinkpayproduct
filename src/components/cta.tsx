import React from 'react'
import Link from "next/link";

const CTA = () => {
  return (
    <div className="mt-24 w-[97%] mx-auto md:mx-0 md:w-full bg-white dark:bg-[#0E0E0E] py-10 border border-slate-200 dark:border-neutral-800 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 bg-gradient-to-r from-[#1d4ed8] via-[#0f766e] to-[#facc15]" />
      <div className="relative w-[86%] md:w-[90%] mx-auto flex items-center flex-wrap justify-between gap-6">
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl md:text-3xl xl:text-4xl text-center md:text-left font-semibold">
            Start moving money in a blink with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] via-[#0f766e] to-[#facc15]">BlinkPay</span>
          </h2>
          <p className="text-base pt-3.5 text-slate-700 dark:text-slate-300 text-center md:text-left">
            Open your free account to send and receive payments instantly, pay bills, and accept vendor payments without POS hardware.
          </p>
        </div>
        <div className="w-fit mx-auto md:mx-0">
          <Link href="#get-started" className='inline-flex items-center justify-center px-7 py-3 rounded-full text-white bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] text-base md:text-lg'>Get started</Link>
        </div>
      </div>
    </div>
  )
}

export default CTA