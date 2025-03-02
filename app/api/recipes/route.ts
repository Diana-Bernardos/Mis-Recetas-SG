import { NextResponse } from "next/server"
import { query } from "@/lib/mysql"
import type { Recipe } from "@/lib/mysql"

// GET: Obtener todas las recetas sin gluten
export async function GET() {
  try {
    const recipes = (await query("SELECT * FROM recipes WHERE gluten_free = ? ORDER BY created_at DESC", [
      true,
    ])) as Recipe[]

    return NextResponse.json(recipes)
  } catch (error) {
    console.error("Error al obtener recetas sin gluten:", error)
    return NextResponse.json({ error: "Error al obtener recetas sin gluten" }, { status: 500 })
  }
}

// POST: Crear una nueva receta sin gluten
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar datos mínimos
    if (!body.title || !body.ingredients || !body.steps) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 })
    }

    // Insertar receta
    const result = (await query(
      "INSERT INTO recipes (title, description, time, difficulty, servings, image_url, gluten_free) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        body.title,
        body.description || "",
        body.time || "",
        body.difficulty || "Media",
        body.servings || 4,
        body.image_url || null,
        true,
      ],
    )) as any

    const recipeId = result.insertId

    // Insertar ingredientes
    for (const ingredient of body.ingredients) {
      await query("INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?, ?, ?)", [
        recipeId,
        ingredient.name,
        ingredient.quantity,
      ])
    }

    // Insertar pasos
    for (let i = 0; i < body.steps.length; i++) {
      await query("INSERT INTO steps (recipe_id, `order`, description) VALUES (?, ?, ?)", [
        recipeId,
        i + 1,
        body.steps[i],
      ])
    }

    return NextResponse.json(
      {
        id: recipeId,
        message: "Receta sin gluten creada con éxito",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al crear receta sin gluten:", error)
    return NextResponse.json({ error: "Error al crear receta sin gluten" }, { status: 500 })
  }
}

