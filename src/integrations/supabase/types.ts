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
      activity_logs: {
        Row: {
          activity_type: string
          calories: number | null
          created_at: string
          date: string
          duration: number | null
          id: string
          meal_details: string | null
          notes: string | null
          steps: number | null
          user_id: string
        }
        Insert: {
          activity_type: string
          calories?: number | null
          created_at?: string
          date: string
          duration?: number | null
          id?: string
          meal_details?: string | null
          notes?: string | null
          steps?: number | null
          user_id: string
        }
        Update: {
          activity_type?: string
          calories?: number | null
          created_at?: string
          date?: string
          duration?: number | null
          id?: string
          meal_details?: string | null
          notes?: string | null
          steps?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_type: string
          created_at: string
          date_time: string
          id: string
          notes: string | null
          provider_id: string
          status: string
          user_id: string
        }
        Insert: {
          appointment_type: string
          created_at?: string
          date_time: string
          id?: string
          notes?: string | null
          provider_id: string
          status?: string
          user_id: string
        }
        Update: {
          appointment_type?: string
          created_at?: string
          date_time?: string
          id?: string
          notes?: string | null
          provider_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          language: string
          publish_date: string
          summary: string
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          language?: string
          publish_date?: string
          summary: string
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          language?: string
          publish_date?: string
          summary?: string
          title?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          anonymous: boolean
          content: string
          created_at: string
          id: string
          likes: number
          replies: number
          topic: string
          user_id: string
        }
        Insert: {
          anonymous?: boolean
          content: string
          created_at?: string
          id?: string
          likes?: number
          replies?: number
          topic: string
          user_id: string
        }
        Update: {
          anonymous?: boolean
          content?: string
          created_at?: string
          id?: string
          likes?: number
          replies?: number
          topic?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cycle_logs: {
        Row: {
          created_at: string
          end_date: string | null
          flow_intensity: string
          id: string
          notes: string | null
          start_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          flow_intensity: string
          id?: string
          notes?: string | null
          start_date: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          flow_intensity?: string
          id?: string
          notes?: string | null
          start_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cycle_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          data_sharing: boolean | null
          dob: string
          id: string
          life_stage: string
          location: string | null
          marketing_emails: boolean | null
          name: string
          research_participation: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_sharing?: boolean | null
          dob: string
          id: string
          life_stage: string
          location?: string | null
          marketing_emails?: boolean | null
          name: string
          research_participation?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_sharing?: boolean | null
          dob?: string
          id?: string
          life_stage?: string
          location?: string | null
          marketing_emails?: boolean | null
          name?: string
          research_participation?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          created_at: string
          id: string
          languages: string[] | null
          name: string
          rating: number | null
          specialty: string
          telehealth_link: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          languages?: string[] | null
          name: string
          rating?: number | null
          specialty: string
          telehealth_link?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          languages?: string[] | null
          name?: string
          rating?: number | null
          specialty?: string
          telehealth_link?: string | null
        }
        Relationships: []
      }
      symptom_logs: {
        Row: {
          created_at: string
          date: string
          id: string
          intensity: number
          notes: string | null
          symptom_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          intensity: number
          notes?: string | null
          symptom_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          intensity?: number
          notes?: string | null
          symptom_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "symptom_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
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
