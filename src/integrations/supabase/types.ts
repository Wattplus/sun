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
      calculation_parameters: {
        Row: {
          active: boolean | null
          created_at: string
          description: string | null
          id: string
          parameter_name: string
          parameter_value: number
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          parameter_name: string
          parameter_value: number
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          parameter_name?: string
          parameter_value?: number
        }
        Relationships: []
      }
      complaints: {
        Row: {
          created_at: string
          description: string
          id: string
          installer_id: string | null
          lead_id: string | null
          resolution: string | null
          resolved_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          installer_id?: string | null
          lead_id?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          installer_id?: string | null
          lead_id?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
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
      installer_portfolios: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          installer_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          installer_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          installer_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "installer_portfolios_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
        ]
      }
      installers: {
        Row: {
          address: string
          certifications: Json | null
          city: string | null
          company_name: string
          contact_name: string
          conversion_rate: number | null
          created_at: string | null
          credits: number
          description: string | null
          email: string | null
          experience_years: number | null
          id: string
          installation_types: Json | null
          inverter_brands: string[] | null
          last_active: string | null
          maintenance_services: boolean | null
          panel_brands: string[] | null
          phone: string
          postal_code: string
          profile_views: number | null
          rating: number | null
          satisfied_clients: number | null
          service_area: string[]
          siret: string | null
          status: string | null
          subscription_end_date: string | null
          subscription_plan: string | null
          subscription_status: string | null
          total_reviews: number | null
          user_id: string
          verified: boolean
          visibility_settings: Json | null
          warranty_years: number | null
          website: string | null
        }
        Insert: {
          address: string
          certifications?: Json | null
          city?: string | null
          company_name: string
          contact_name: string
          conversion_rate?: number | null
          created_at?: string | null
          credits?: number
          description?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          installation_types?: Json | null
          inverter_brands?: string[] | null
          last_active?: string | null
          maintenance_services?: boolean | null
          panel_brands?: string[] | null
          phone: string
          postal_code: string
          profile_views?: number | null
          rating?: number | null
          satisfied_clients?: number | null
          service_area: string[]
          siret?: string | null
          status?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          total_reviews?: number | null
          user_id: string
          verified?: boolean
          visibility_settings?: Json | null
          warranty_years?: number | null
          website?: string | null
        }
        Update: {
          address?: string
          certifications?: Json | null
          city?: string | null
          company_name?: string
          contact_name?: string
          conversion_rate?: number | null
          created_at?: string | null
          credits?: number
          description?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          installation_types?: Json | null
          inverter_brands?: string[] | null
          last_active?: string | null
          maintenance_services?: boolean | null
          panel_brands?: string[] | null
          phone?: string
          postal_code?: string
          profile_views?: number | null
          rating?: number | null
          satisfied_clients?: number | null
          service_area?: string[]
          siret?: string | null
          status?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          total_reviews?: number | null
          user_id?: string
          verified?: boolean
          visibility_settings?: Json | null
          warranty_years?: number | null
          website?: string | null
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
      interventions: {
        Row: {
          client_id: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          installer_id: string
          start_date: string
          status: string
          title: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          installer_id: string
          start_date: string
          status?: string
          title: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          installer_id?: string
          start_date?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "interventions_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
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
          status?: string
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
      simulations: {
        Row: {
          annual_consumption: number | null
          created_at: string
          estimated_cost: number | null
          estimated_savings: number | null
          id: string
          installation_type: string | null
          monthly_bill: number
          notes: string | null
          postal_code: string
          roof_surface: number | null
          roof_type: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          annual_consumption?: number | null
          created_at?: string
          estimated_cost?: number | null
          estimated_savings?: number | null
          id?: string
          installation_type?: string | null
          monthly_bill: number
          notes?: string | null
          postal_code: string
          roof_surface?: number | null
          roof_type?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          annual_consumption?: number | null
          created_at?: string
          estimated_cost?: number | null
          estimated_savings?: number | null
          id?: string
          installation_type?: string | null
          monthly_bill?: number
          notes?: string | null
          postal_code?: string
          roof_surface?: number | null
          roof_type?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
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
      create_test_installer: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      deduct_credits: {
        Args: {
          amount: number
          user_id: string
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
