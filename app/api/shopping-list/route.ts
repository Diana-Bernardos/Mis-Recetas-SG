import { NextResponse } from "next/server"
import { query } from "@/lib/mysql"
import type { ShoppingItem } from "@/lib/mysql"

// GET: Obtener la lista de compra
export async function GET() {
  try {
    const items = (await query("SELECT * FROM shopping_items ORDER BY created_at DESC")) as ShoppingItem[]

    return NextResponse.json(items)
  } catch (error) {
    console.error("Error al obtener lista de compra:", error)
    return NextResponse.json({ error: "Error al obtener lista de compra" }, { status: 500 })
  }
}

// POST: Añadir un item a la lista de compra
export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name) {
      return NextResponse.json({ error: "El nombre del producto es requerido" }, { status: 400 })
    }

    const result = (await query("INSERT INTO shopping_items (name, quantity, completed) VALUES (?, ?, ?)", [
      body.name,
      body.quantity || "1",
      false,
    ])) as any

    const [newItem] = (await query("SELECT * FROM shopping_items WHERE id = ?", [result.insertId])) as ShoppingItem[]

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error("Error al añadir item:", error)
    return NextResponse.json({ error: "Error al añadir item" }, { status: 500 })
  }
}

