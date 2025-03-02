import { createClient } from "@supabase/supabase-js"

// Tipos para nuestra base de datos
export type Recipe = {
  id: string
  title: string
  description: string
  time: string
  difficulty: string
  servings: number
  image_url: string | null
  created_at: string
  gluten_free: boolean
}

export type Ingredient = {
  id: string
  recipe_id: string
  name: string
  quantity: string
}

export type Step = {
  id: string
  recipe_id: string
  order: number
  description: string
}

export type ShoppingItem = {
  id: string
  name: string
  quantity: string
  completed: boolean
  created_at: string
}

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

