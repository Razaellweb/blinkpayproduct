export function formatNaira(n: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n)
}

export function toNairaFromKobo(input: unknown): number {
  if (typeof input === 'bigint') return Number(input) / 100
  if (typeof input === 'number') return Math.round(input) / 100
  if (typeof input === 'string') {
    const asNum = Number(input)
    if (!Number.isNaN(asNum)) return asNum / 100
  }
  return 0
}
