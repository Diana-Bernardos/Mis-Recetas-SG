import { NextResponse } from "next/server"
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

// POST: Subir una imagen
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get("image") as File
    
    if (!imageFile) {
      return NextResponse.json({ error: "No se encontró ninguna imagen" }, { status: 400 })
    }
    
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
    
    // Devolver la URL de la imagen
    const imageUrl = `/uploads/${fileName}`
    
    return NextResponse.json({ 
      url: imageUrl,
      message: "Imagen subida con éxito" 
    })
    
  } catch (error: any) {
    console.error("Error al subir imagen:", error)
    return NextResponse.json({ 
      error: error.message || "Error al subir la imagen"
    }, { status: 500 })
  }
}