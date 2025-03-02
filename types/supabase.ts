export type Database = {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: number
          title: string
          description: string | null
          time: string | null
          difficulty: string | null
          servings: number | null
          image_url: string | null
          created_at: string
          gluten_free: boolean
        }
        Insert: {
          title: string
          description?: string | null
          time?: string | null
          difficulty?: string | null
          servings?: number | null
          image_url?: string | null
          created_at?: string
          gluten_free: boolean
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          time?: string | null
          difficulty?: string | null
          servings?: number | null
          image_url?: string | null
          created_at?: string
          gluten_free?: boolean
        }
      }
      ingredients: {
        Row: {
          id: number
          recipe_id: number
          name: string
          quantity: string
        }
        Insert: {
          recipe_id: number
          name: string
          quantity: string
        }
        Update: {
          id?: number
          recipe_id?: number
          name?: string
          quantity?: string
        }
      }
      steps: {
        Row: {
          id: number
          recipe_id: number
          order: number
          description: string
        }
        Insert: {
          recipe_id: number
          order: number
          description: string
        }
        Update: {
          id?: number
          recipe_id?: number
          order?: number
          description?: string
        }
      }
      shopping_items: {
        Row: {
          id: number
          name: string
          quantity: string
          completed: boolean
          created_at: string
        }
        Insert: {
          name: string
          quantity: string
          completed: boolean
          created_at: string
        }
        Update: {
          id?: number
          name?: string
          quantity?: string
          completed?: boolean
          created_at?: string
        }
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

