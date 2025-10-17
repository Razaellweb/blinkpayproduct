"use client"
import { useEffect, useMemo, useState } from 'react'
import { fetchInsights, fetchLedger, fetchWallet, LedgerItem } from './api'
import { toNairaFromKobo } from '@/lib/format'

export function useDashboardData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [walletBalance, setWalletBalance] = useState(0)
  const [ledger, setLedger] = useState<LedgerItem[]>([])
  const [insights, setInsights] = useState<{ key: string; value: number }[]>([])

  useEffect(() => {
    let mounted = true
    async function run() {
      try {
        setLoading(true)
        setError(null)
        const [w, l, ins] = await Promise.all([
          fetchWallet(),
          fetchLedger({ page: 1, pageSize: 50 }),
          fetchInsights().catch(() => []),
        ])
        if (!mounted) return
        setWalletBalance(toNairaFromKobo(w.balanceKobo))
        setLedger(l.items || [])
        setInsights(ins || [])
      } catch (e: any) {
        if (!mounted) return
        setError(e?.message || 'Failed to load dashboard')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => { mounted = false }
  }, [])

  const today = useMemo(() => {
    const start = new Date(); start.setHours(0,0,0,0)
    const end = new Date(); end.setHours(23,59,59,999)
    let inSum = 0, outSum = 0
    for (const t of ledger) {
      const ts = new Date(t.createdAt)
      if (ts >= start && ts <= end) {
        const amt = toNairaFromKobo(t.amountKobo)
        if (t.type === 'TRANSFER_IN' || t.type === 'TOPUP') inSum += amt
        else outSum += amt
      }
    }
    return { inSum, outSum }
  }, [ledger])

  const sparkIn = useMemo(() => {
    // last 12 amounts (incoming and outgoing mixed) for sparkline demo
    const arr = ledger.slice(0,12).map(t => Math.max(1, Math.round(toNairaFromKobo(t.amountKobo))))
    return arr.length ? arr.reverse() : [1]
  }, [ledger])

  const sparkOut = useMemo(() => {
    const arr = ledger.slice(0,12).map(t => Math.max(1, Math.round(toNairaFromKobo(t.amountKobo))))
    return arr.length ? arr : [1]
  }, [ledger])

  const bars = useMemo(() => {
    // simple distribution across types using recent txns
    const map: Record<string, number> = { TRANSFER_OUT:0, BILL_PAYMENT:0, SPEND_REDEEM:0, TRANSFER_IN:0, TOPUP:0 }
    ledger.slice(0,40).forEach(t => { map[t.type] = (map[t.type]||0) + toNairaFromKobo(t.amountKobo) })
    const values = Object.values(map)
    return values.length ? values.map(v => Math.round(v / 1000)) : [1,1,1,1,1]
  }, [ledger])

  const recent = useMemo(() => {
    return ledger.slice(0,8).map(t => ({
      id: t.id,
      type: t.type === 'BILL_PAYMENT' ? 'bill' : (t.type === 'SPEND_REDEEM' ? 'spend' : (t.type === 'TRANSFER_OUT' ? 'p2p' : 'p2p')),
      name: t.description || t.type.replace('_',' '),
      amount: Math.round(toNairaFromKobo(t.amountKobo)),
      status: t.status.toLowerCase() as 'success'|'pending'|'failed',
      time: new Date(t.createdAt).toLocaleString(),
      incoming: t.type === 'TRANSFER_IN' || t.type === 'TOPUP',
    }))
  }, [ledger])

  return {
    loading,
    error,
    walletBalance,
    todayIn: today.inSum,
    todayOut: today.outSum,
    sparkIn,
    sparkOut,
    bars,
    recent,
    insights,
  }
}
