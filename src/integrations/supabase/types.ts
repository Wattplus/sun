export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          postal_code: string
          purchased_at: string | null
          purchased_by: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          postal_code: string
          purchased_at?: string | null
          purchased_by?: string | null
          status?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          postal_code?: string
          purchased_at?: string | null
          purchased_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_purchased_by_fkey"
            columns: ["purchased_by"]
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
          status?: string
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
      leads: {
        Row: {
          address: string | null
          assignedto: string | null
          city: string | null
          clienttype: string
          created_at: string
          email: string
          firstname: string
          id: string
          lastname: string
          monthlybill: string
          notes: string | null
          phone: string
          postalcode: string
          purchasedby: string[] | null
          status: string
        }
        Insert: {
          address?: string | null
          assignedto?: string | null
          city?: string | null
          clienttype: string
          created_at?: string
          email: string
          firstname: string
          id?: string
          lastname: string
          monthlybill: string
          notes?: string | null
          phone: string
          postalcode: string
          purchasedby?: string[] | null
          status?: string
        }
        Update: {
          address?: string | null
          assignedto?: string | null
          city?: string | null
          clienttype?: string
          created_at?: string
          email?: string
          firstname?: string
          id?: string
          lastname?: string
          monthlybill?: string
          notes?: string | null
          phone?: string
          postalcode?: string
          purchasedby?: string[] | null
          status?: string
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_super_admin: {
        Args: {
          email: string
          password: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
