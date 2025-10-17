export function kobo(amount: number) { return BigInt(Math.round(amount * 100)) }
export function naira(kobo: bigint) { return Number(kobo) / 100 }
export function genRef(prefix = 'BP') { return `${prefix}_${Date.now()}_${Math.floor(Math.random()*1e6)}` }
