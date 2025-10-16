"use client";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function PinModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: (pin: string) => void }) {
  const [pin, setPin] = useState("");
  if (!open) return null;
  const valid = pin.length === 4;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-[--color-border] bg-[--color-card] p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#1d4ed8]" />
          <div>
            <h3 className="font-semibold">Confirm with PIN</h3>
            <p className="text-xs text-muted-foreground">Enter your 4‑digit wallet PIN to proceed</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              inputMode="numeric"
              maxLength={1}
              className="h-12 rounded-lg border border-[--color-border] bg-transparent text-center text-xl"
              value={pin[i] || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(-1);
                const next = pin.split("");
                next[i] = val;
                setPin(next.join(""));
              }}
            />
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          <button onClick={onClose} className="flex-1 rounded-lg border px-3 py-2">Cancel</button>
          <button
            disabled={!valid}
            onClick={() => valid && onConfirm(pin)}
            className="flex-1 rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-3 py-2 text-white disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
