// Simple heuristic-based fraud scorer as MVP
export function scoreTransaction({ amountKobo, txPerHour, isNewDevice }: { amountKobo: bigint; txPerHour: number; isNewDevice?: boolean }) {
  let score = 0
  if (amountKobo > BigInt(50000000)) score += 40 // >500k NGN
  if (txPerHour > 20) score += 30
  if (isNewDevice) score += 10
  return Math.min(100, score)
}
