"use client"

import React, { useState, useEffect, createRef } from "react"
import { Loader2, ArrowLeft, Plus, Minus, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Ingredient {
  id: number
  name: string
  quantity: string
}

interface Step {
  id: number
  order: number
  description: string
}

interface Recipe {
  id: number
  title: string
  description: string
  time: string
  difficulty: string
  servings: number
  image_url: string
  ingredients: Ingredient[]
  steps: Step[]
}

export default function EditarRecetaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [receta, setReceta] = useState<Recipe | null>(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    const cargarReceta = async () => {
      try {
        setCargando(true)
        const response = await fetch(`/api/recipes/${params.id}`)
        
        if (!response.ok) {
          throw new Error("Error al cargar la receta")
        }
        
        const data = await response.json()
        setReceta(data)
        
        // Establecer la vista previa de la imagen si existe
        if (data.image_url && !data.image_url.includes('placeholder')) {
          setImagePreview(data.image_url)
        }
        
      } catch (error) {
        console.error("Error:", error)
        setError("No se pudo cargar la receta para editar")
      } finally {
        setCargando(false)
      }
    }
    
    cargarReceta()
  }, [params.id])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setReceta(prev => prev ? { ...prev, [name]: value } : null)
  }
  
  const handleIngredientChange = (index: number, field: string, value: string) => {
    if (!receta) return
    
    const nuevosIngredientes = [...receta.ingredients]
    nuevosIngredientes[index] = { 
      ...nuevosIngredientes[index], 
      [field]: value 
    }
    setReceta({ ...receta, ingredients: nuevosIngredientes })
  }
  
  const agregarIngrediente = () => {
    if (!receta) return
    
    setReceta({
      ...receta,
      ingredients: [...receta.ingredients, { id: 0, name: "", quantity: "" }],
    })
  }
  
  const eliminarIngrediente = (index: number) => {
    if (!receta) return
    
    const nuevosIngredientes = [...receta.ingredients]
    nuevosIngredientes.splice(index, 1)
    setReceta({ ...receta, ingredients: nuevosIngredientes })
  }
  
  const handleStepChange = (index: number, value: string) => {
    if (!receta) return
    
    const nuevosSteps = [...receta.steps]
    nuevosSteps[index] = { 
      ...nuevosSteps[index], 
      description: value 
    }
    setReceta({ ...receta, steps: nuevosSteps })
  }
  
  const agregarStep = () => {
    if (!receta) return
    
    // Encontrar el orden más alto
    const maxOrder = receta.steps.reduce((max, step) => Math.max(max, step.order), 0)
    
    setReceta({
      ...receta,
      steps: [...receta.steps, { id: 0, order: maxOrder + 1, description: "" }],
    })
  }
  
  const eliminarStep = (index: number) => {
    if (!receta) return
    
    const nuevosSteps = [...receta.steps]
    nuevosSteps.splice(index, 1)
    setReceta({ ...receta, steps: nuevosSteps })
  }
  
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      
      // Crear vista previa
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!receta) return
    
    // Validaciones básicas
    if (!receta.title.trim()) {
      setError("El título es obligatorio")
      return
    }
    
    if (receta.ingredients.some(ing => !ing.name.trim())) {
      setError("Todos los ingredientes deben tener un nombre")
      return
    }
    
    if (receta.steps.some(step => !step.description.trim())) {
      setError("Todos los pasos deben tener una descripción")
      return
    }
    
    try {
      setGuardando(true)
      setError("")
      
      // Crear FormData si hay imagen
      if (imageFile) {
        const formData = new FormData()
        formData.append("image", imageFile)
        formData.append("id", params.id)
        
        // Subir la imagen primero
        const imgResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        
        if (!imgResponse.ok) {
          throw new Error("Error al subir la imagen")
        }
        
        const imgData = await imgResponse.json()
        // Actualizar la URL de la imagen
        receta.image_url = imgData.url
      }
      
      // Actualizar la receta
      const response = await fetch(`/api/recipes/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: receta.title,
          description: receta.description,
          time: receta.time,
          difficulty: receta.difficulty,
          servings: receta.servings,
          image_url: receta.image_url,
          ingredients: receta.ingredients,
          steps: receta.steps.map((step, index) => ({
            ...step,
            order: index + 1, // Asegurar que el orden sea correcto
          })),
        }),
      })
      
      if (!response.ok) {
        throw new Error("Error al actualizar la receta")
      }
      
      // Redirigir a la página de detalle
      router.push(`/recetas/${params.id}`)
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "Error al guardar la receta")
    } finally {
      setGuardando(false)
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
  
  if (error && !receta) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link href="/recetas" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver a recetas
        </Link>
      </div>
    )
  }
  
  if (!receta) return null
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href={`/recetas/${params.id}`} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver a la receta
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Editar Receta Sin Gluten</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-secondary rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Título de la receta sin gluten</label>
            <input
              type="text"
              name="title"
              value={receta.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
              placeholder="Ej: Pasta de arroz con verduras"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-500">Imagen</label>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  name="image_url"
                  value={receta.image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
                  placeholder="URL de la imagen (o sube una)"
                />
                <button 
                  type="button" 
                  onClick={handleImageClick} 
                  className="btn-accent flex items-center gap-2 text-gray-500"
                >
                  <Upload className="h-4 w-4" />
                  Subir
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
              {imagePreview && (
                <div className="mt-2 relative w-full max-w-xs">
                  <img 
                    src={imagePreview} 
                    alt="Vista previa" 
                    className="h-40 w-full object-cover rounded-md border border-gray-300" 
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-500">Descripción</label>
            <textarea
              name="description"
              value={receta.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
              placeholder="Breve descripción de la receta sin gluten"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-500">Tiempo de preparación</label>
            <input
              type="text"
              name="time"
              value={receta.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
              placeholder="Ej: 30 min"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-500">Dificultad</label>
            <select
              name="difficulty"
              value={receta.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
            >
              <option value="Fácil">Fácil</option>
              <option value="Media">Media</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-500">Porciones</label>
            <input
              type="number"
              name="servings"
              value={receta.servings}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-500">Ingredientes sin gluten</h2>
            <button 
              type="button" 
              onClick={agregarIngrediente} 
              className="btn-primary flex items-center gap-2 text-gray-500"
            >
              <Plus className="h-4 w-4" />
              Añadir ingrediente
            </button>
          </div>
          
          {receta.ingredients.map((ingrediente, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={ingrediente.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
                placeholder="Nombre del ingrediente sin gluten"
              />
              <input
                type="text"
                value={ingrediente.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
                placeholder="Cantidad"
              />
              {receta.ingredients.length > 1 && (
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
            <h2 className="text-xl font-bold text-gray-500">Pasos</h2>
            <button 
              type="button" 
              onClick={agregarStep} 
              className="btn-primary flex items-center gap-2 text-gray-500"
            >
              <Plus className="h-4 w-4" />
              Añadir paso
            </button>
          </div>
          
          {receta.steps.sort((a, b) => a.order - b.order).map((paso, index) => (
            <div key={index} className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mt-2 text-gray-600">
                {index + 1}
              </div>
              <textarea
                value={paso.description}
                onChange={(e) => handleStepChange(index, e.target.value)}
                rows={2}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
                placeholder={`Paso ${index + 1}`}
              ></textarea>
              {receta.steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => eliminarStep(index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={guardando} 
            className="btn-primary py-2 px-4 rounded-md text-gray-500"
          >
            {guardando ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando...
              </span>
            ) : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  )
}