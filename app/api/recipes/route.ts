import { NextResponse } from "next/server"
import { query } from "@/lib/mysql"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { v4 as uuidv4 } from "uuid"

// Función para asegurar que el directorio existe
async function ensureDirectoryExists(directory: string) {
  try {
    if (!existsSync(directory)) {
      await mkdir(directory, { recursive: true })
    }
    return true
  } catch (error) {
    console.error("Error al crear directorio:", error)
    return false
  }
}

// GET: Obtener todas las recetas
export async function GET() {
  try {
    const recipes = await query("SELECT * FROM recipes ORDER BY created_at DESC")
    return NextResponse.json(recipes)
  } catch (error) {
    console.error("Error al obtener recetas:", error)
    return NextResponse.json({ error: "Error al obtener recetas sin gluten" }, { status: 500 })
  }
}

// POST: Crear una nueva receta
export async function POST(request: Request) {
  try {
    // Procesar el FormData
    const formData = await request.formData()
    
    // Extraer datos del formulario
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const time = formData.get("time") as string
    const difficulty = formData.get("difficulty") as string
    const servings = formData.get("servings") as string
    const ingredientsJson = formData.get("ingredients") as string
    const stepsJson = formData.get("steps") as string
    const glutenFree = formData.get("gluten_free") === "true"
    
    // URL de imagen directa si se proporciona
    let imageUrl = formData.get("image_url") as string || "/placeholder.svg?height=200&width=300&text=Receta"
    
    // Procesar imagen si se sube un archivo
    const imageFile = formData.get("image") as File
    
    if (imageFile && imageFile.size > 0) {
      try {
        // Crear directorio para subidas si no existe
        const uploadDir = join(process.cwd(), "public/uploads")
        const dirExists = await ensureDirectoryExists(uploadDir)
        
        if (!dirExists) {
          throw new Error("No se pudo crear el directorio de subidas")
        }
        
        // Generar nombre de archivo único
        const extension = imageFile.name.split(".").pop() || "jpg"
        const fileName = `${uuidv4()}.${extension}`
        const filePath = join(uploadDir, fileName)
        
        // Convertir el archivo a buffer y guardarlo
        const arrayBuffer = await imageFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        await writeFile(filePath, buffer)
        
        // Actualizar la URL de la imagen
        imageUrl = `/uploads/${fileName}`
      } catch (error) {
        console.error("Error al guardar la imagen:", error)
        // Continuamos con la URL predeterminada si hay error
      }
    }
    
    // Convertir cadenas JSON a arrays
    const ingredients = JSON.parse(ingredientsJson || "[]")
    const steps = JSON.parse(stepsJson || "[]")
    
    // Insertar receta en la base de datos
    const result = await query(
      "INSERT INTO recipes (title, description, time, difficulty, servings, image_url, gluten_free) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, time, difficulty, servings, imageUrl, glutenFree ? 1 : 0]
    )
    
    // @ts-ignore - Obtener el ID insertado
    const recipeId = result.insertId
    
    // Insertar ingredientes
    for (const ingredient of ingredients) {
      await query("INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?, ?, ?)", [
        recipeId,
        ingredient.name,
        ingredient.quantity || "Cantidad no especificada"
      ])
    }
    
    // Insertar pasos
    for (let i = 0; i < steps.length; i++) {
      await query("INSERT INTO steps (recipe_id, `order`, description) VALUES (?, ?, ?)", [
        recipeId,
        i + 1,
        steps[i]
      ])
    }
    
    return NextResponse.json({ 
      message: "Receta creada con éxito", 
      id: recipeId,
      imageUrl 
    })
    
  } catch (error: any) {
    console.error("Error al crear receta:", error)
    return NextResponse.json({ 
      error: error.message || "Error al crear la receta"
    }, { status: 500 })
  }
}