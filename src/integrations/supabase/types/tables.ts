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

export type LeadsTable = {
  id: string
  created_at: string
  clienttype: string
  firstname: string
  lastname: string
  email: string
  phone: string
  monthlybill: string
  postalcode: string
  status: string
  notes?: string
  address?: string
  city?: string
  assignedto?: string
  purchasedby?: string[]
  quality_score?: number
  roof_surface?: number
  roof_type?: string
  electrical_installation?: string
  property_type?: string
  annual_consumption?: number
  verification_status?: string
  contact_attempts?: number
  last_contact_date?: string
  source?: string
  assigned_installer?: string
  exclusive_until?: string
  price?: number
}

export type InstallersTable = {
  id: string
  user_id: string
  company_name: string
  contact_name: string
  phone: string
  address: string
  postal_code: string
  service_area: string[]
  credits: number
  verified: boolean
  created_at?: string
}

export type ProfilesTable = {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  postal_code?: string
  client_type?: string
  monthly_bill?: string
  created_at: string
  role?: string
}

export type UsersTable = {
  id: string
  email: string
  created_at?: string
}

export type MessagesTable = {
  id: number
  created_at: string
}

export type LeadPurchasesTable = {
  id: string
  lead_id: string
  installer_id: string
  amount: number
  status: string
  purchased_at?: string
}