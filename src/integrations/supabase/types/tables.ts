export type ComplaintsTable = {
  id: string
  created_at: string
  lead_id: string | null
  installer_id: string | null
  status: string
  description: string
  resolution: string | null
  resolved_at: string | null
}

export type TransactionsTable = {
  id: string
  created_at: string
  installer_id: string | null
  amount: number
  type: string
  status: string
  description: string | null
}