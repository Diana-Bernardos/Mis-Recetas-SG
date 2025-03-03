"use client"

import { useState, useEffect } from "react"
import { Loader2, Clock, Users, ArrowLeft, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { traducirTexto } from "@/lib/translator"
import { useRouter } from "next/navigation"

interface Ingredient {
  id: number
  name?: string
  quantity?: string
  amount?: number
  unit?: string
}

interface Step {
  id?: number
  order?: number
  number?: number
  description?: string
  step?: string
}

interface RecipeDetail {
  id: number
  title?: string
  description?: string
  time?: string
  difficulty?: string
  image?: string
  image_url?: string
  readyInMinutes?: number
  servings?: number
  sourceUrl?: string
  summary?: string
  ingredients: Ingredient[]
  steps?: Step[]
  instructions?: Step[]
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [receta, setReceta] = useState<RecipeDetail | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [esRecetaLocal, setEsRecetaLocal] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [eliminando, setEliminando] = useState(false)

  useEffect(() => {
    const cargarReceta = async () => {
      try {
        setCargando(true)
        
        // Primero intentamos obtener la receta de nuestra base de datos local
        const responseLocal = await fetch(`/api/recipes/${params.id}`)
        
        if (responseLocal.ok) {
          // Es una receta local
          const data = await responseLocal.json()
          setReceta(data)
          setEsRecetaLocal(true)
          return
        }
        
        // Si no se encuentra localmente, intentamos con Spoonacular
        const response = await fetch(`/api/gluten-free/recipe?id=${params.id}`)
        
        if (!response.ok) {
          throw new Error("Error al cargar los detalles de la receta")
        }
        
        const data = await response.json()
        
        // Traducir los pasos si están en inglés
        if (data.instructions && data.instructions.length > 0) {
          data.instructions = data.instructions.map((instruccion: Step) => ({
            ...instruccion,
            step: traducirTexto(instruccion.step || "")
          }))
        }
        
        // Traducir nombres de ingredientes si están en inglés
        if (data.ingredients && data.ingredients.length > 0) {
          data.ingredients = data.ingredients.map((ingrediente: Ingredient) => ({
            ...ingrediente,
            name: traducirTexto(ingrediente.name || "")
          }))
        }
        
        setReceta(data)
        setEsRecetaLocal(false)
      } catch (error) {
        console.error("Error:", error)
        setError("No se pudieron cargar los detalles de la receta")
      } finally {
        setCargando(false)
      }
    }
    
    cargarReceta()
  }, [params.id])

  const eliminarReceta = async () => {
    if (!esRecetaLocal) return
    
    try {
      setEliminando(true)
      const response = await fetch(`/api/recipes/${params.id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error("Error al eliminar la receta")
      }
      
      // Redirigir al listado de recetas
      router.push('/recetas')
      router.refresh()
    } catch (error) {
      console.error("Error al eliminar receta:", error)
      setError("No se pudo eliminar la receta")
      setMostrarConfirmacion(false)
    } finally {
      setEliminando(false)
    }
  }

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

  // Modal de confirmación
  const ConfirmacionEliminar = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4 text-red-600">
          <AlertTriangle className="h-6 w-6" />
          <h3 className="text-lg font-bold">Eliminar receta</h3>
        </div>
        <p className="mb-6 text-gray-500">
          ¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setMostrarConfirmacion(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-500"
            disabled={eliminando}
          >
            Cancelar
          </button>
          <button 
            onClick={eliminarReceta}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={eliminando}
          >
            {eliminando ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Eliminando...
              </span>
            ) : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )

  // Renderizar una receta local (desde MySQL)
  if (esRecetaLocal) {
    return (
      <div className="container mx-auto px-4 py-8">
        {mostrarConfirmacion && <ConfirmacionEliminar />}
        
        <div className="flex items-center justify-between mb-6">
          <Link href="/recetas" className="flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a recetas
          </Link>
          
          <button
            onClick={() => setMostrarConfirmacion(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar receta
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden mb-6">
              <Image
                src={receta.image_url || "/placeholder.svg?height=200&width=300&text=Receta"}
                alt={receta.title || "Receta sin gluten"}
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </div>
            
            <h1 className="text-3xl font-bold mb-2 text-gray-500">{receta.title}</h1>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="bg-secondary px-3 py-1 rounded-full flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span>{receta.time || "No especificado"}</span>
              </div>
              <div className="bg-secondary px-3 py-1 rounded-full flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-1 text-gray-500" />
                <span>{receta.servings || "No especificado"} porciones</span>
              </div>
              {receta.difficulty && (
                <div className="bg-secondary px-3 py-1 rounded-full text-gray-500">
                  {receta.difficulty === "Fácil" && "🟢"}
                  {receta.difficulty === "Media" && "🟠"}
                  {receta.difficulty === "Difícil" && "🔴"} 
                  {receta.difficulty}
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-500">Descripción</h2>
              <p className="prose max-w-none text-gray-500">{receta.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-500">Instrucciones</h2>
              {receta.steps && receta.steps.length > 0 ? (
                <ol className="space-y-4 ml-5 list-decimal text-gray-500">
                  {receta.steps.map((paso) => (
                    <li key={paso.id || paso.order} className="pl-2">
                      {paso.description}
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
              <h2 className="text-xl font-bold mb-4 text-gray-500">Ingredientes</h2>
              
              {receta.ingredients && receta.ingredients.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {receta.ingredients.map((ingrediente) => (
                    <li key={ingrediente.id} className="py-3 flex justify-between text-gray-500">
                      <span>{ingrediente.name}</span>
                      <span className="text-gray-500">{ingrediente.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay ingredientes disponibles para esta receta.</p>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  href={`/recetas/editar/${params.id}`}
                  className="btn-primary block w-full text-center text-gray-500"
                >
                  Editar receta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Renderizar una receta de Spoonacular
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/recetas" className="flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver a recetas
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden mb-6 ">
            <Image
              src={receta.image || "/placeholder.svg?height=200&width=300&text=Receta"}
              alt={receta.title || "Receta sin gluten"}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-2 ">{receta.title}</h1>
          
          <div className="flex items-center gap-6 mb-6 ">
            <div className="bg-secondary px-3 py-1 rounded-full flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{receta.readyInMinutes} minutos</span>
            </div>
            <div className="bg-secondary px-3 py-1 rounded-full flex items-center ">
              <Users className="h-4 w-4 mr-1 " />
              <span>{receta.servings}  porciones</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Descripción</h2>
            <div 
              className="prose max-w-none" 
              dangerouslySetInnerHTML={{ __html: traducirTexto(receta.summary || "") }}
            />
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 ">Instrucciones</h2>
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
                    <span className="text-gray-500">
                      {ingrediente.amount} {ingrediente.unit}
                    </span>
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
                  className="btn-primary block w-full text-center text-gray-500"
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