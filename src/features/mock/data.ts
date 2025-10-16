export type Txn = {
  id: string;
  type: "p2p" | "bill" | "vendor" | "spend";
  name: string;
  amount: number;
  status: "success" | "pending" | "failed";
  time: string;
};

export const MOCK_DATA = (process.env.NEXT_PUBLIC_MOCK_DATA ?? "true") === "true";

export const balances = {
  wallet: 125000.5,
  todayIn: 245000,
  todayOut: 132500,
};

export const seriesDay = [12, 14, 18, 20, 16, 22, 28, 25, 30, 26, 32, 35];
export const seriesBars = [8, 12, 6, 14, 18, 10, 16, 22];

function generateId(len = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export const txns: Txn[] = Array.from({ length: 8 }).map((_, i) => ({
  id: generateId(8),
  type: (['p2p', 'bill', 'vendor', 'spend'] as const)[i % 4],
  name: ["Transfer • Ada", "DSTV", "Vendor • Tunde", "Spend Code"][i % 4]!,
  amount: [12500, 7800, 5400, 3500][i % 4]!,
  status: (['success','success','pending','failed'] as const)[i % 4],
  time: `${9 + i}:0${i % 6} AM`,
}));

export function formatNaira(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
}
