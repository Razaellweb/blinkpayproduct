import { apiGet, apiPost, extractData } from '@/lib/api/client'

export type Wallet = { id: string; userId: string; balanceKobo: number | string | bigint; currency: string }
export type LedgerItem = { id: string; createdAt: string; type: 'TOPUP'|'TRANSFER_OUT'|'TRANSFER_IN'|'BILL_PAYMENT'|'SPEND_REDEEM'|'SPEND_GENERATE'|'REFUND'; status: 'PENDING'|'SUCCESS'|'FAILED'|'CANCELED'; amountKobo: number | string | bigint; description?: string | null }

export async function fetchWallet() {
  const res = await apiPost('/api/v1/wallet/init')
  const data = extractData<{ wallet: Wallet }>(res)
  return data.wallet
}

export async function fetchLedger(params: { page?: number; pageSize?: number } = {}) {
  const res = await apiGet('/api/v1/wallet/ledger', params as any)
  const data = extractData<{ items: LedgerItem[]; total: number; page: number; pageSize: number }>(res)
  return data
}

export async function fetchInsights() {
  const res = await apiGet('/api/v1/analytics/insights')
  const data = extractData<{ insights: { key: string; value: number }[] }>(res)
  return data.insights
}
