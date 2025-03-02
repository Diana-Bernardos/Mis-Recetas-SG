"use client"

import Link from "next/link"
import { useState } from "react"
import { Book, ShoppingBag, Plus, Home, ChefHat } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span className="font-bold text-xl">Recetario Sin Gluten</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/80">
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
            <Link href="/recetas" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/80">
              <Book className="h-4 w-4" />
              <span>Recetas</span>
            </Link>
            <Link href="/lista-compra" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/80">
              <ShoppingBag className="h-4 w-4" />
              <span>Lista de Compra</span>
            </Link>
            <Link href="/crear-receta" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/80">
              <Plus className="h-4 w-4" />
              <span>Crear Receta</span>
            </Link>
            <Link href="/asistente" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/80">
              <ChefHat className="h-4 w-4" />
              <span>Asistente IA</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary/80 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="flex items-center gap-1 block px-3 py-2 rounded-md hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
            <Link
              href="/recetas"
              className="flex items-center gap-1 block px-3 py-2 rounded-md hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <Book className="h-4 w-4" />
              <span>Recetas</span>
            </Link>
            <Link
              href="/lista-compra"
              className="flex items-center gap-1 block px-3 py-2 rounded-md hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Lista de Compra</span>
            </Link>
            <Link
              href="/crear-receta"
              className="flex items-center gap-1 block px-3 py-2 rounded-md hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <Plus className="h-4 w-4" />
              <span>Crear Receta</span>
            </Link>
            <Link
              href="/asistente"
              className="flex items-center gap-1 block px-3 py-2 rounded-md hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <ChefHat className="h-4 w-4" />
              <span>Asistente IA</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

