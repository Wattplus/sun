import { ComplaintsTable, TransactionsTable } from './tables'

export type Database = {
  public: {
    Tables: {
      complaints: {
        Row: ComplaintsTable
        Insert: Omit<ComplaintsTable, 'id' | 'created_at'>
        Update: Partial<Omit<ComplaintsTable, 'id' | 'created_at'>>
      }
      transactions: {
        Row: TransactionsTable
        Insert: Omit<TransactionsTable, 'id' | 'created_at'>
        Update: Partial<Omit<TransactionsTable, 'id' | 'created_at'>>
      }
      messages: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          client_type: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          monthly_bill: string | null
          phone: string | null
          postal_code: string | null
          role: string | null
        }
        Insert: {
          client_type?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          monthly_bill?: string | null
          phone?: string | null
          postal_code?: string | null
          role?: string | null
        }
        Update: {
          client_type?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          monthly_bill?: string | null
          phone?: string | null
          postal_code?: string | null
          role?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          address: string | null
          annual_consumption: number | null
          assigned_installer: string | null
          assignedto: string | null
          city: string | null
          clienttype: string
          contact_attempts: number | null
          created_at: string
          electrical_installation: string | null
          email: string
          exclusive_until: string | null
          firstname: string
          id: string
          last_contact_date: string | null
          lastname: string
          monthlybill: string
          notes: string | null
          phone: string
          postalcode: string
          price: number | null
          property_type: string | null
          purchasedby: string[] | null
          quality_score: number | null
          roof_surface: number | null
          roof_type: string | null
          source: string | null
          status: string
          verification_status: string | null
        }
        Insert: {
          address?: string | null
          annual_consumption?: number | null
          assigned_installer?: string | null
          assignedto?: string | null
          city?: string | null
          clienttype: string
          contact_attempts?: number | null
          created_at?: string
          electrical_installation?: string | null
          email: string
          exclusive_until?: string | null
          firstname: string
          id?: string
          last_contact_date?: string | null
          lastname: string
          monthlybill: string
          notes?: string | null
          phone: string
          postalcode: string
          price?: number | null
          property_type?: string | null
          purchasedby?: string[] | null
          quality_score?: number | null
          roof_surface?: number | null
          roof_type?: string | null
          source?: string | null
          status: string
          verification_status?: string | null
        }
        Update: {
          address?: string | null
          annual_consumption?: number | null
          assigned_installer?: string | null
          assignedto?: string | null
          city?: string | null
          clienttype?: string
          contact_attempts?: number | null
          created_at?: string
          electrical_installation?: string | null
          email?: string
          exclusive_until?: string | null
          firstname?: string
          id?: string
          last_contact_date?: string | null
          lastname?: string
          monthlybill?: string
          notes?: string | null
          phone?: string
          postalcode?: string
          price?: number | null
          property_type?: string | null
          purchasedby?: string[] | null
          quality_score?: number | null
          roof_surface?: number | null
          roof_type?: string | null
          source?: string | null
          status?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_installer_fkey"
            columns: ["assigned_installer"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
        ]
      }
      installers: {
        Row: {
          address: string
          company_name: string
          contact_name: string
          created_at: string | null
          credits: number
          id: string
          phone: string
          postal_code: string
          service_area: string[]
          user_id: string
          verified: boolean
        }
        Insert: {
          address: string
          company_name: string
          contact_name: string
          created_at?: string | null
          credits?: number
          id?: string
          phone: string
          postal_code: string
          service_area: string[]
          user_id: string
          verified?: boolean
        }
        Update: {
          address?: string
          company_name?: string
          contact_name?: string
          created_at?: string | null
          credits?: number
          id?: string
          phone?: string
          postal_code?: string
          service_area?: string[]
          user_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "installers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_purchases: {
        Row: {
          amount: number
          id: string
          installer_id: string
          lead_id: string
          purchased_at: string | null
          status: string
        }
        Insert: {
          amount: number
          id?: string
          installer_id: string
          lead_id: string
          purchased_at?: string | null
          status: string
        }
        Update: {
          amount?: number
          id?: string
          installer_id?: string
          lead_id?: string
          purchased_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_purchases_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_purchases_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          installer_id: string | null
          status: string
          type: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          installer_id?: string | null
          status?: string
          type: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          installer_id?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
