import { ComplaintsTable, TransactionsTable, LeadsTable, InstallersTable, ProfilesTable, UsersTable, MessagesTable, LeadPurchasesTable } from './tables'

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
        Relationships: [
          {
            foreignKeyName: "transactions_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          }
        ]
      }
      leads: {
        Row: LeadsTable
        Insert: Omit<LeadsTable, 'id' | 'created_at'>
        Update: Partial<Omit<LeadsTable, 'id' | 'created_at'>>
        Relationships: [
          {
            foreignKeyName: "leads_assigned_installer_fkey"
            columns: ["assigned_installer"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          }
        ]
      }
      installers: {
        Row: InstallersTable
        Insert: Omit<InstallersTable, 'id'>
        Update: Partial<Omit<InstallersTable, 'id'>>
        Relationships: [
          {
            foreignKeyName: "installers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: ProfilesTable
        Insert: Omit<ProfilesTable, 'created_at'>
        Update: Partial<Omit<ProfilesTable, 'created_at'>>
        Relationships: []
      }
      users: {
        Row: UsersTable
        Insert: Omit<UsersTable, 'id'>
        Update: Partial<Omit<UsersTable, 'id'>>
        Relationships: []
      }
      messages: {
        Row: MessagesTable
        Insert: Partial<MessagesTable>
        Update: Partial<MessagesTable>
        Relationships: []
      }
      lead_purchases: {
        Row: LeadPurchasesTable
        Insert: Omit<LeadPurchasesTable, 'id'>
        Update: Partial<Omit<LeadPurchasesTable, 'id'>>
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
          }
        ]
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']