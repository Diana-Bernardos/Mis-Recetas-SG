import mysql from "mysql2/promise"

// Tipos para nuestra base de datos
export type Recipe = {
  id: number
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
  id: number
  recipe_id: number
  name: string
  quantity: string
}

export type Step = {
  id: number
  recipe_id: number
  order: number
  description: string
}

export type ShoppingItem = {
  id: number
  name: string
  quantity: string
  completed: boolean
  created_at: string
}

// Crear conexión a MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
})

export async function query(sql: string, params: any[] = []) {
  const [results] = await pool.execute(sql, params)
  return results
}

