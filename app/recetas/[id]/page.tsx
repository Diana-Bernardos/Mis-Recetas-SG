"use client"

import { useState, useEffect } from "react"
import { Loader2, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { traducirTexto } from "@/lib/translator"

interface Ingredient {
  id: number
  name: string
  amount: number
  unit: string
}

interface Step {
  number: number
  step: string
}

interface RecipeDetail {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  sourceUrl: string
  summary: string
  ingredients: Ingredient[]
  instructions: Step[]
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const [receta, setReceta] = useState<RecipeDetail | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const cargarReceta = async () => {
      try {
        setCargando(true)
        const response = await fetch(`/api/gluten-free/recipe?id=${params.id}`)
        
        if (!response.ok) {
          throw new Error("Error al cargar los detalles de la receta")
        }
        
        const data = await response.json()
        
        // Traducir los pasos si están en inglés
        if (data.instructions && data.instructions.length > 0) {
          data.instructions = data.instructions.map((instruccion: Step) => ({
            ...instruccion,
            step: traducirTexto(instruccion.step)
          }))
        }
        
        // Traducir nombres de ingredientes si están en inglés
        if (data.ingredients && data.ingredients.length > 0) {
          data.ingredients = data.ingredients.map((ingrediente: Ingredient) => ({
            ...ingrediente,
            name: traducirTexto(ingrediente.name)
          }))
        }
        
        setReceta(data)
      } catch (error) {
        console.error("Error:", error)
        setError("No se pudieron cargar los detalles de la receta")
      } finally {
        setCargando(false)
      }
    }
    
    cargarReceta()
  }, [params.id])

  if (cargando) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Cargando detalles de la receta...</span>
        </div>
      </div>
    )
  }

  if (error || !receta) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || "No se encontró la receta"}
        </div>
        <Link href="/recetas" className="flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver a recetas
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/recetas" className="flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver a recetas
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden mb-6">
            <Image
              src={receta.image}
              alt={receta.title}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{receta.title}</h1>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-secondary px-3 py-1 rounded-full flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{receta.readyInMinutes} minutos</span>
            </div>
            <div className="bg-secondary px-3 py-1 rounded-full flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{receta.servings} porciones</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Descripción</h2>
            <div 
              className="prose max-w-none" 
              dangerouslySetInnerHTML={{ __html: traducirTexto(receta.summary) }}
            />
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Instrucciones</h2>
            {receta.instructions && receta.instructions.length > 0 ? (
              <ol className="space-y-4 ml-5 list-decimal">
                {receta.instructions.map((paso) => (
                  <li key={paso.number} className="pl-2">
                    {paso.step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500">No hay instrucciones disponibles para esta receta.</p>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-secondary rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Ingredientes</h2>
            
            {receta.ingredients && receta.ingredients.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {receta.ingredients.map((ingrediente) => (
                  <li key={ingrediente.id} className="py-3 flex justify-between">
                    <span>{ingrediente.name}</span>
                    <span className="text-gray-500">{ingrediente.amount} {ingrediente.unit}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay ingredientes disponibles para esta receta.</p>
            )}
            
            {receta.sourceUrl && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a 
                  href={receta.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary block w-full text-center"
                >
                  Ver receta original
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}