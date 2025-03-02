"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Minus, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CrearRecetaPage() {
  const router = useRouter()
  const [receta, setReceta] = useState({
    titulo: "",
    descripcion: "",
    tiempo: "",
    dificultad: "Media",
    porciones: 4,
    imagen: "",
    ingredientes: [{ nombre: "", cantidad: "" }],
    pasos: [""],
  })
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setReceta({ ...receta, [name]: value })
  }

  const handleIngredienteChange = (index: number, field: string, value: string) => {
    const nuevosIngredientes = [...receta.ingredientes]
    nuevosIngredientes[index] = { ...nuevosIngredientes[index], [field]: value }
    setReceta({ ...receta, ingredientes: nuevosIngredientes })
  }

  const agregarIngrediente = () => {
    setReceta({
      ...receta,
      ingredientes: [...receta.ingredientes, { nombre: "", cantidad: "" }],
    })
  }

  const eliminarIngrediente = (index: number) => {
    const nuevosIngredientes = [...receta.ingredientes]
    nuevosIngredientes.splice(index, 1)
    setReceta({ ...receta, ingredientes: nuevosIngredientes })
  }

  const handlePasoChange = (index: number, value: string) => {
    const nuevosPasos = [...receta.pasos]
    nuevosPasos[index] = value
    setReceta({ ...receta, pasos: nuevosPasos })
  }

  const agregarPaso = () => {
    setReceta({
      ...receta,
      pasos: [...receta.pasos, ""],
    })
  }

  const eliminarPaso = (index: number) => {
    const nuevosPasos = [...receta.pasos]
    nuevosPasos.splice(index, 1)
    setReceta({ ...receta, pasos: nuevosPasos })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar datos
    if (!receta.titulo.trim()) {
      setError("El título es obligatorio")
      return
    }

    if (receta.ingredientes.some((ing) => !ing.nombre.trim())) {
      setError("Todos los ingredientes deben tener un nombre")
      return
    }

    if (receta.pasos.some((paso) => !paso.trim())) {
      setError("Todos los pasos deben tener una descripción")
      return
    }

    try {
      setGuardando(true)
      setError("")

      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: receta.titulo,
          description: receta.descripcion,
          time: receta.tiempo,
          difficulty: receta.dificultad,
          servings: receta.porciones,
          image_url: receta.imagen || null,
          ingredients: receta.ingredientes.map((ing) => ({
            name: ing.nombre,
            quantity: ing.cantidad,
          })),
          steps: receta.pasos,
          gluten_free: true, // Aseguramos que todas las recetas sean sin gluten
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Error al guardar la receta sin gluten")
      }

      const data = await response.json()
      router.push(`/recetas/${data.id}`)
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "Error al guardar la receta sin gluten")
      setGuardando(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nueva Receta Sin Gluten</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-secondary rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título de la receta sin gluten</label>
            <input
              type="text"
              name="titulo"
              value={receta.titulo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Ej: Pasta de arroz con verduras"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Imagen</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="imagen"
                value={receta.imagen}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="URL de la imagen"
              />
              <button type="button" className="btn-accent flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Subir
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              name="descripcion"
              value={receta.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Breve descripción de la receta sin gluten"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tiempo de preparación</label>
            <input
              type="text"
              name="tiempo"
              value={receta.tiempo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Ej: 30 min"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Dificultad</label>
            <select
              name="dificultad"
              value={receta.dificultad}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="Fácil">Fácil</option>
              <option value="Media">Media</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Porciones</label>
            <input
              type="number"
              name="porciones"
              value={receta.porciones}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Ingredientes sin gluten</h2>
            <button type="button" onClick={agregarIngrediente} className="btn-primary flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Añadir ingrediente
            </button>
          </div>

          {receta.ingredientes.map((ingrediente, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={ingrediente.nombre}
                onChange={(e) => handleIngredienteChange(index, "nombre", e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Nombre del ingrediente sin gluten"
              />
              <input
                type="text"
                value={ingrediente.cantidad}
                onChange={(e) => handleIngredienteChange(index, "cantidad", e.target.value)}
                className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Cantidad"
              />
              {receta.ingredientes.length > 1 && (
                <button
                  type="button"
                  onClick={() => eliminarIngrediente(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Pasos</h2>
            <button type="button" onClick={agregarPaso} className="btn-primary flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Añadir paso
            </button>
          </div>

          {receta.pasos.map((paso, index) => (
            <div key={index} className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mt-2">
                {index + 1}
              </div>
              <textarea
                value={paso}
                onChange={(e) => handlePasoChange(index, e.target.value)}
                rows={2}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder={`Paso ${index + 1}`}
              ></textarea>
              {receta.pasos.length > 1 && (
                <button
                  type="button"
                  onClick={() => eliminarPaso(index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={guardando} className="btn-primary py-2 px-4 rounded-md">
            {guardando ? "Guardando..." : "Guardar receta sin gluten"}
          </button>
        </div>
      </form>
    </div>
  )
}

