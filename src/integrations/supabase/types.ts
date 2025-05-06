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
      account: {
        Row: {
          account_id: number
          balance: number | null
          customer_id: number
          status: string | null
          type: string
        }
        Insert: {
          account_id: number
          balance?: number | null
          customer_id: number
          status?: string | null
          type: string
        }
        Update: {
          account_id?: number
          balance?: number | null
          customer_id?: number
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["customer_id"]
          },
        ]
      }
      amc: {
        Row: {
          amc_id: number
          license_id: string
          name: string
        }
        Insert: {
          amc_id: number
          license_id: string
          name: string
        }
        Update: {
          amc_id?: number
          license_id?: string
          name?: string
        }
        Relationships: []
      }
      branch: {
        Row: {
          branch_id: number
          ifsc_code: string
          manager_id: number
          name: string
        }
        Insert: {
          branch_id: number
          ifsc_code: string
          manager_id: number
          name: string
        }
        Update: {
          branch_id?: number
          ifsc_code?: string
          manager_id?: number
          name?: string
        }
        Relationships: []
      }
      customer: {
        Row: {
          aadhar: number
          age: number | null
          customer_id: number
          dob: string
          mobile_number: number
          name: string
          pan: string
        }
        Insert: {
          aadhar: number
          age?: number | null
          customer_id: number
          dob: string
          mobile_number: number
          name: string
          pan: string
        }
        Update: {
          aadhar?: number
          age?: number | null
          customer_id?: number
          dob?: string
          mobile_number?: number
          name?: string
          pan?: string
        }
        Relationships: []
      }
      deposit: {
        Row: {
          deposit_id: number
          investment_id: number
          maturity_date: string
          rate: number
          tenure: number
        }
        Insert: {
          deposit_id: number
          investment_id: number
          maturity_date: string
          rate: number
          tenure: number
        }
        Update: {
          deposit_id?: number
          investment_id?: number
          maturity_date?: string
          rate?: number
          tenure?: number
        }
        Relationships: [
          {
            foreignKeyName: "deposit_investment_id_fkey"
            columns: ["investment_id"]
            isOneToOne: false
            referencedRelation: "investment"
            referencedColumns: ["investment_id"]
          },
        ]
      }
      fd: {
        Row: {
          deposit_id: number
          fd_id: number
          maturity_date: string
          maturity_deposit: number
          rate: number
        }
        Insert: {
          deposit_id: number
          fd_id: number
          maturity_date: string
          maturity_deposit: number
          rate: number
        }
        Update: {
          deposit_id?: number
          fd_id?: number
          maturity_date?: string
          maturity_deposit?: number
          rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "fd_deposit_id_fkey"
            columns: ["deposit_id"]
            isOneToOne: false
            referencedRelation: "deposit"
            referencedColumns: ["deposit_id"]
          },
        ]
      }
      investment: {
        Row: {
          amount: number
          customer_id: number
          end_date: string | null
          investment_id: number
          start_date: string
          type: string
        }
        Insert: {
          amount: number
          customer_id: number
          end_date?: string | null
          investment_id: number
          start_date: string
          type: string
        }
        Update: {
          amount?: number
          customer_id?: number
          end_date?: string | null
          investment_id?: number
          start_date?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["customer_id"]
          },
        ]
      }
      mutual_funds: {
        Row: {
          category: string
          fund_id: number
          risk_level: string
        }
        Insert: {
          category: string
          fund_id: number
          risk_level: string
        }
        Update: {
          category?: string
          fund_id?: number
          risk_level?: string
        }
        Relationships: []
      }
      nps: {
        Row: {
          account_id: number
          contribution: number
          customer_id: number
          fund_choice: string
          maturity_age: number
          nps_id: number
        }
        Insert: {
          account_id: number
          contribution: number
          customer_id: number
          fund_choice: string
          maturity_age: number
          nps_id: number
        }
        Update: {
          account_id?: number
          contribution?: number
          customer_id?: number
          fund_choice?: string
          maturity_age?: number
          nps_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "nps_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "nps_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["customer_id"]
          },
        ]
      }
      rd: {
        Row: {
          deposit_id: number
          maturity_date: string
          monthly_deposit: number
          rate: number
          rd_id: number
        }
        Insert: {
          deposit_id: number
          maturity_date: string
          monthly_deposit: number
          rate: number
          rd_id: number
        }
        Update: {
          deposit_id?: number
          maturity_date?: string
          monthly_deposit?: number
          rate?: number
          rd_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "rd_deposit_id_fkey"
            columns: ["deposit_id"]
            isOneToOne: false
            referencedRelation: "deposit"
            referencedColumns: ["deposit_id"]
          },
        ]
      }
      regulatory_body: {
        Row: {
          country: string
          name: string
          regulation: string
          regulatory_id: number
        }
        Insert: {
          country: string
          name: string
          regulation: string
          regulatory_id: number
        }
        Update: {
          country?: string
          name?: string
          regulation?: string
          regulatory_id?: number
        }
        Relationships: []
      }
      reit: {
        Row: {
          country: string
          dividend_yield: number
          regulation: string
          reit_id: number
          value: number
        }
        Insert: {
          country: string
          dividend_yield: number
          regulation: string
          reit_id: number
          value: number
        }
        Update: {
          country?: string
          dividend_yield?: number
          regulation?: string
          reit_id?: number
          value?: number
        }
        Relationships: []
      }
      sgb: {
        Row: {
          deadline: string
          issuer: string
          purchase_price: number
          quantity: number
          sgb_id: number
        }
        Insert: {
          deadline: string
          issuer: string
          purchase_price: number
          quantity: number
          sgb_id: number
        }
        Update: {
          deadline?: string
          issuer?: string
          purchase_price?: number
          quantity?: number
          sgb_id?: number
        }
        Relationships: []
      }
      stocks: {
        Row: {
          company_name: string
          current_price: number
          stock_exchange: string
          stock_id: number
        }
        Insert: {
          company_name: string
          current_price: number
          stock_exchange: string
          stock_id: number
        }
        Update: {
          company_name?: string
          current_price?: number
          stock_exchange?: string
          stock_id?: number
        }
        Relationships: []
      }
      tax_details: {
        Row: {
          deadline: string
          pan: string
          tax_bracket: string
        }
        Insert: {
          deadline: string
          pan: string
          tax_bracket: string
        }
        Update: {
          deadline?: string
          pan?: string
          tax_bracket?: string
        }
        Relationships: [
          {
            foreignKeyName: "tax_details_pan_fkey"
            columns: ["pan"]
            isOneToOne: true
            referencedRelation: "customer"
            referencedColumns: ["pan"]
          },
        ]
      }
      transaction: {
        Row: {
          account_id: number
          amount: number
          date: string
          transaction_id: number
          type: string
        }
        Insert: {
          account_id: number
          amount: number
          date: string
          transaction_id: number
          type: string
        }
        Update: {
          account_id?: number
          amount?: number
          date?: string
          transaction_id?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["account_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
