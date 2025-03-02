"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"
import type { Recipe } from "@/lib/supabase"
import RecipeSearch from '@/components/RecipeSearch'

export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Recipe[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [mostrarAPISponacular, setMostrarAPISponacular] = useState(false)

  useEffect(() => {
    cargarRecetas()
  }, [])

  const cargarRecetas = async () => {
    try {
      setCargando(true)
      const response = await fetch("/api/recipes")

      if (!response.ok) {
        throw new Error("Error al cargar las recetas sin gluten")
      }

      const data = await response.json()
      setRecetas(data)
    } catch (error) {
      console.error("Error:", error)
      setError("No se pudieron cargar las recetas sin gluten")
    } finally {
      setCargando(false)
    }
  }

  const recetasFiltradas = recetas.filter(
    (receta) =>
      receta.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      receta.description.toLowerCase().includes(busqueda.toLowerCase()),
  )

  if (cargando) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Cargando recetas sin gluten...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recetas Sin Gluten</h1>

      {/* Toggle para cambiar entre tus recetas y la búsqueda en API */}
      <div className="mb-6 flex justify-center">
        <div className="bg-balck-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setMostrarAPISponacular(false)}
            className={`px-4 py-2 rounded-md ${!mostrarAPISponacular ? 'bg-black shadow-sm' : ''}`}
          >
            Mis Recetas
          </button>
          <button
            onClick={() => setMostrarAPISponacular(true)}
            className={`px-4 py-2 rounded-md ${mostrarAPISponacular ? 'bg-black shadow-sm' : ''}`}
          >
            Buscar Recetas Online
          </button>
        </div>
      </div>

      {mostrarAPISponacular ? (
        <RecipeSearch />
      ) : (
        <>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <div className="mb-8">
            <div className="relative max-w-md mx-auto md:mx-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar recetas sin gluten..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
              />
            </div>
          </div>

          {recetasFiltradas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No se encontraron recetas sin gluten</p>
              <Link href="/crear-receta" className="btn-primary">
                Crear nueva receta sin gluten
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recetasFiltradas.map((receta) => (
                <Link key={receta.id} href={`/recetas/${receta.id}`} className="recipe-card hover:scale-105">
                  <Image
                    src={receta.image_url || "/placeholder.svg?height=200&width=300&text=Receta"}
                    alt={receta.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{receta.title}</h2>
                    <p className="text-sm mb-4">{receta.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="bg-secondary px-2 py-1 rounded-full">⏱️ {receta.time}</span>
                      <span className="bg-secondary px-2 py-1 rounded-full">
                        {receta.difficulty === "Fácil" && "🟢"}
                        {receta.difficulty === "Media" && "🟠"}
                        {receta.difficulty === "Difícil" && "🔴"}
                        {" " + receta.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/crear-receta" className="btn-primary">
              Crear nueva receta sin gluten
            </Link>
          </div>
        </>
      )}
    </div>
  )
}