"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from 'lucide-react'

type Mensaje = {
  id: number
  texto: string
  esUsuario: boolean
}

export default function AsistentePage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: 1,
      texto:
        "¡Hola! Soy tu asistente de cocina. Puedo ayudarte a encontrar recetas, sugerir ideas para comidas o responder preguntas sobre cocina. ¿En qué puedo ayudarte hoy?",
      esUsuario: false,
    },
  ])
  const [inputMensaje, setInputMensaje] = useState("")
  const [cargando, setCargando] = useState(false)

  const mensajesFinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mensajesFinRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const enviarMensaje = async () => {
    if (inputMensaje.trim() === "") return

    const nuevoMensaje: Mensaje = {
      id: mensajes.length + 1,
      texto: inputMensaje,
      esUsuario: true,
    }

    setMensajes([...mensajes, nuevoMensaje])
    setInputMensaje("")
    setCargando(true)

    try {
      // Llamada a la API de IA
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputMensaje }),
      })

      if (!response.ok) {
        throw new Error("Error al obtener respuesta del asistente")
      }

      const data = await response.json()

      const respuestaMensaje: Mensaje = {
        id: mensajes.length + 2,
        texto: data.response,
        esUsuario: false,
      }

      setMensajes((prevMensajes) => [...prevMensajes, respuestaMensaje])
    } catch (error) {
      console.error("Error:", error)

      // Mensaje de error
      const errorMensaje: Mensaje = {
        id: mensajes.length + 2,
        texto: "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
        esUsuario: false,
      }

      setMensajes((prevMensajes) => [...prevMensajes, errorMensaje])
    } finally {
      setCargando(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      enviarMensaje()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 ">
        <Bot className="h-8 w-8 " />
        Asistente de Cocina IA
      </h1>

      <div className="bg-secondary rounded-lg shadow-md overflow-hidden flex flex-col h-[70vh]">
        <div className="flex-grow overflow-y-auto p-4 text-gray-500">
          {mensajes.map((mensaje) => (
            <div key={mensaje.id} className={`mb-4 flex ${mensaje.esUsuario ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  mensaje.esUsuario ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 ">
                  {mensaje.esUsuario ? (
                    <>
                      <span className="font-medium ">Tú</span>
                      <User className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4" />
                      <span className="font-medium">Asistente</span>
                    </>
                  )}
                </div>
                <p className="whitespace-pre-wrap ">{mensaje.texto}</p>
              </div>
            </div>
          ))}

          {cargando && (
            <div className="mb-4 flex justify-start">
              <div className="bg-muted rounded-lg p-4 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>El asistente está escribiendo...</span>
              </div>
            </div>
          )}

          <div ref={mensajesFinRef} />
        </div>

        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <textarea
              value={inputMensaje}
              onChange={(e) => setInputMensaje(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary resize-none text-gray-500"
              rows={2}
            ></textarea>
            <button
              onClick={enviarMensaje}
              disabled={inputMensaje.trim() === "" || cargando}
              className="btn-primary self-end flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Enviar
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Asistente impulsado por Llama3.2:3b-instruct-q8_0</p>
        </div>
      </div>
    </div>
  )
}

