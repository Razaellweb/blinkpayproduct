"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function LayoutFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFrame = pathname?.startsWith("/dashboard") || pathname?.startsWith("/auth");
  if (hideFrame) return <>{children}</>;
  return (
    <>
      <div className="w-[98%] md:w-[90%] 2xl:w-[80%] mx-auto pt-6 md:pt-8">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
