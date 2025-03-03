"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Trash2, Plus, Check, ShoppingBag, Loader2 } from "lucide-react"
import type { ShoppingItem } from "@/lib/mysql"

export default function ListaCompraPage() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [nuevoItem, setNuevoItem] = useState({ nombre: "", cantidad: "" })
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    cargarItems()
  }, [])

  const cargarItems = async () => {
    try {
      setCargando(true)
      const response = await fetch("/api/shopping-list")

      if (!response.ok) {
        throw new Error("Error al cargar la lista de compra")
      }

      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Error:", error)
      setError("No se pudo cargar la lista de compra")
    } finally {
      setCargando(false)
    }
  }

  const toggleCompletado = async (id: string) => {
    const item = items.find((item) => item.id === id)
    if (!item) return

    try {
      const response = await fetch(`/api/shopping-list/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          completed: !item.completed,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar el item")
      }

      setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
    } catch (error) {
      console.error("Error:", error)
      setError("No se pudo actualizar el item")
    }
  }

  const eliminarItem = async (id: string) => {
    try {
      const response = await fetch(`/api/shopping-list/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Error al eliminar el item")
      }

      setItems(items.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error:", error)
      setError("No se pudo eliminar el item")
    }
  }

  const agregarItem = async () => {
    if (nuevoItem.nombre.trim() === "") return

    try {
      const response = await fetch("/api/shopping-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nuevoItem.nombre,
          quantity: nuevoItem.cantidad || "1",
        }),
      })

      if (!response.ok) {
        throw new Error("Error al añadir el item")
      }

      const data = await response.json()
      setItems([...items, data])
      setNuevoItem({ nombre: "", cantidad: "" })
    } catch (error) {
      console.error("Error:", error)
      setError("No se pudo añadir el item")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      agregarItem()
    }
  }

  const itemsPendientes = items.filter((item) => !item.completed)
  const itemsCompletados = items.filter((item) => item.completed)

  if (cargando) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Cargando lista de compra...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-700">
        <ShoppingBag className="h-8 w-8" />
        Lista de Compra
      </h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-secondary rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Añadir producto..."
            value={nuevoItem.nombre}
            onChange={(e) => setNuevoItem({ ...nuevoItem, nombre: e.target.value })}
            onKeyPress={handleKeyPress}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
          />
          <input
            type="text"
            placeholder="Cantidad"
            value={nuevoItem.cantidad}
            onChange={(e) => setNuevoItem({ ...nuevoItem, cantidad: e.target.value })}
            onKeyPress={handleKeyPress}
            className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-600"
          />
          <button onClick={agregarItem} className="btn-primary flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            Añadir
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-500">Pendientes ({itemsPendientes.length})</h2>
          {itemsPendientes.length === 0 ? (
            <p className="text-gray-500 italic">No hay productos pendientes</p>
          ) : (
            <ul className="space-y-2">
              {itemsPendientes.map((item) => (
                <li key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-md text-gray-500">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCompletado(item.id)}
                      className="w-6 h-6 border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary/20"
                    >
                      {item.completed && <Check className="h-4 w-4 text-primary" />}
                    </button>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => eliminarItem(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {itemsCompletados.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Completados ({itemsCompletados.length})</h2>
            <ul className="space-y-2">
              {itemsCompletados.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-md text-gray-500 line-through"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCompletado(item.id)}
                      className="w-6 h-6 border-2 border-primary rounded-full flex items-center justify-center bg-primary/20"
                    >
                      <Check className="h-4 w-4 text-primary" />
                    </button>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => eliminarItem(item.id)} className="text-red-500/50 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

