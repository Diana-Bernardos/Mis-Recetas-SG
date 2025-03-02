import { NextResponse } from "next/server"
import { query } from "@/lib/mysql"
import type { Recipe, Ingredient, Step } from "@/lib/mysql"

// GET: Obtener una receta específica con sus ingredientes y pasos
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const [recipe] = (await query("SELECT * FROM recipes WHERE id = ?", [params.id])) as Recipe[]

    if (!recipe) {
      return NextResponse.json({ error: "Receta no encontrada" }, { status: 404 })
    }

    // Obtener ingredientes
    const ingredients = (await query("SELECT * FROM ingredients WHERE recipe_id = ?", [params.id])) as Ingredient[]

    // Obtener pasos
    const steps = (await query("SELECT * FROM steps WHERE recipe_id = ? ORDER BY `order` ASC", [params.id])) as Step[]

    return NextResponse.json({
      ...recipe,
      ingredients,
      steps,
    })
  } catch (error) {
    console.error("Error al obtener receta:", error)
    return NextResponse.json({ error: "Error al obtener receta" }, { status: 500 })
  }
}

// PUT: Actualizar una receta
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Actualizar receta
    await query(
      "UPDATE recipes SET title = ?, description = ?, time = ?, difficulty = ?, servings = ?, image_url = ? WHERE id = ?",
      [body.title, body.description, body.time, body.difficulty, body.servings, body.image_url, params.id],
    )

    // Actualizar ingredientes (eliminar y volver a insertar)
    if (body.ingredients) {
      await query("DELETE FROM ingredients WHERE recipe_id = ?", [params.id])
      for (const ingredient of body.ingredients) {
        await query("INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?, ?, ?)", [
          params.id,
          ingredient.name,
          ingredient.quantity,
        ])
      }
    }

    // Actualizar pasos (eliminar y volver a insertar)
    if (body.steps) {
      await query("DELETE FROM steps WHERE recipe_id = ?", [params.id])
      for (let i = 0; i < body.steps.length; i++) {
        await query("INSERT INTO steps (recipe_id, `order`, description) VALUES (?, ?, ?)", [
          params.id,
          i + 1,
          body.steps[i],
        ])
      }
    }

    return NextResponse.json({ message: "Receta actualizada con éxito" })
  } catch (error) {
    console.error("Error al actualizar receta:", error)
    return NextResponse.json({ error: "Error al actualizar receta" }, { status: 500 })
  }
}

// DELETE: Eliminar una receta
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM ingredients WHERE recipe_id = ?", [params.id])
    await query("DELETE FROM steps WHERE recipe_id = ?", [params.id])
    await query("DELETE FROM recipes WHERE id = ?", [params.id])

    return NextResponse.json({ message: "Receta eliminada con éxito" })
  } catch (error) {
    console.error("Error al eliminar receta:", error)
    return NextResponse.json({ error: "Error al eliminar receta" }, { status: 500 })
  }
}

