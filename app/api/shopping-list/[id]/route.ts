import { NextResponse } from "next/server"
import { query } from "@/lib/mysql"

// PUT: Actualizar un item de la lista de compra
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    await query("UPDATE shopping_items SET name = ?, quantity = ?, completed = ? WHERE id = ?", [
      body.name,
      body.quantity,
      body.completed,
      params.id,
    ])

    const [updatedItem] = await query("SELECT * FROM shopping_items WHERE id = ?", [params.id])

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("Error al actualizar item:", error)
    return NextResponse.json({ error: "Error al actualizar item" }, { status: 500 })
  }
}

// DELETE: Eliminar un item de la lista de compra
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM shopping_items WHERE id = ?", [params.id])

    return NextResponse.json({ message: "Item eliminado con éxito" })
  } catch (error) {
    console.error("Error al eliminar item:", error)
    return NextResponse.json({ error: "Error al eliminar item" }, { status: 500 })
  }
}

