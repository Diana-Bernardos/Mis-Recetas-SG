import { NextResponse } from "next/server"
import { query } from "@/lib/mysql"
import type { Ingredient } from "@/lib/mysql"

// POST: Añadir ingredientes de una receta a la lista de compra
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    // Obtener ingredientes de la receta
    const ingredients = (await query("SELECT * FROM ingredients WHERE recipe_id = ?", [params.id])) as Ingredient[]

    if (ingredients.length === 0) {
      return NextResponse.json({ error: "No hay ingredientes en esta receta" }, { status: 404 })
    }

    // Añadir cada ingrediente a la lista de compra
    const addedItems = []
    for (const ingredient of ingredients) {
      const result = (await query("INSERT INTO shopping_items (name, quantity, completed) VALUES (?, ?, ?)", [
        ingredient.name,
        ingredient.quantity,
        false,
      ])) as any

      const [newItem] = await query("SELECT * FROM shopping_items WHERE id = ?", [result.insertId])
      addedItems.push(newItem)
    }

    return NextResponse.json(
      {
        message: "Ingredientes añadidos a la lista de compra",
        items: addedItems,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al añadir ingredientes:", error)
    return NextResponse.json({ error: "Error al añadir ingredientes" }, { status: 500 })
  }
}

