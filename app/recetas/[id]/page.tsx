"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ChefHat, Users, ShoppingBag, Loader2, Trash2, Edit } from "lucide-react"
import { useRouter } from "next/navigation"

type RecetaDetalle = {
  id: string
  title: string
  description: string
  time: string
  difficulty: string
  servings: number
  image_url: string | null
  ingredients: { id: string; name: string; quantity: string }[]
  steps: { id: string; order: number; description: string }[]
  isOwner: boolean
}

export default function RecetaDetalle({ params }: { params: { id: string } }) {
  const [receta, setReceta] = useState<RecetaDetalle | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [agregandoALista, setAgregandoALista] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const router = useRouter()

  useEffect(() => {
    cargarReceta()
  }, [])

  const cargarReceta = async () => {
    try {
      setCargando(true)
      const response = await fetch(`/api/recipes/${params.id}`)

      if (!response.ok) {
        throw new Error("Error al cargar la receta")
      }

      const data = await response.json()
      setReceta(data)
    } catch (error) {
      console.error("Error:", error)
      setError("No se pudo cargar la receta")
    } finally {
      setCargando(false)
    }
  }

  const agregarAListaCompra = async () => {
    try {
      setAgregandoALista(true)
      const response = await fetch(`/api/shopping-list/recipe/${params.id}`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Error al añadir ingredientes a la lista de compra")
      }

      alert("Ingredientes añadidos a la lista de compra")
    } catch (error) {
      console.error("Error:", error)
      alert("No se pudieron añadir los ingredientes a la lista de compra")
    } finally {
      setAgregandoALista(false)
    }
  }

  const eliminarReceta = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta receta? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      setEliminando(true)
      const response = await fetch(`/api/recipes/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Error al eliminar la receta")
      }

      router.push("/recetas")
    } catch (error) {
      console.error("Error:", error)
      alert("No se pudo eliminar la receta")
      setEliminando(false)
    }
  }

  if (cargando) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Cargando receta...</span>
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
        <Link href="/recetas" className="text-primary hover:underline">
          ← Volver a recetas
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/recetas" className="text-primary hover:underline">
          ← Volver a recetas
        </Link>

        {receta.isOwner && (
          <div className="flex gap-2">
            <Link href={`/recetas/editar/${params.id}`} className="btn-secondary flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Link>
            <button
              onClick={eliminarReceta}
              disabled={eliminando}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
            >
              {eliminando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Eliminar
            </button>
          </div>
        )}
      </div>

      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden mb-8">
        <Image
          src={receta.image_url || "/placeholder.svg?height=400&width=800&text=Receta"}
          alt={receta.title}
          width={800}
          height={400}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{receta.title}</h1>
          <p className="text-lg mb-6 text-gray-700">{receta.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
              <Clock className="h-4 w-4" />
              <span>{receta.time}</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
              <ChefHat className="h-4 w-4" />
              <span>{receta.difficulty}</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
              <Users className="h-4 w-4" />
              <span>{receta.servings} porciones</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-xl font-bold mb-4">Ingredientes</h2>
              <ul className="space-y-2">
                {receta.ingredients.map((ingrediente) => (
                  <li key={ingrediente.id} className="flex justify-between">
                    <span>{ingrediente.name}</span>
                    <span className="font-medium">{ingrediente.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  onClick={agregarAListaCompra}
                  disabled={agregandoALista}
                  className="btn-accent flex items-center gap-2"
                >
                  {agregandoALista ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
                  Añadir a la lista de compra
                </button>
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-xl font-bold mb-4">Preparación</h2>
              <ol className="space-y-4">
                {receta.steps
                  .sort((a, b) => a.order - b.order)
                  .map((paso, index) => (
                    <li key={paso.id} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {paso.order}
                      </div>
                      <div>{paso.description}</div>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

