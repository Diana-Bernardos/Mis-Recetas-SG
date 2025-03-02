import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "El prompt es requerido" }, { status: 400 });
    }

    const systemPrompt = `Eres un asistente de cocina experto. Tu objetivo es ayudar a los usuarios con:
      - Recetas y técnicas culinarias
      - Sustituciones de ingredientes
      - Consejos para conservar alimentos
      - Planificación de comidas
      - Información nutricional
      
      Responde de manera concisa, práctica y amigable.`;

    // Usando el endpoint de completion en lugar de chat
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2:3b-instruct-q8_0",
        prompt: `${systemPrompt}\n\nUsuario: ${prompt}\n\nAsistente:`,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en la respuesta de Ollama:", errorText);
      return NextResponse.json({ error: "Error en el servicio de IA" }, { status: 500 });
    }

    try {
      const data = await response.json();
      return NextResponse.json({ 
        response: data.response || "No se pudo obtener respuesta" 
      });
    } catch (parseError) {
      console.error("Error al analizar la respuesta JSON:", parseError);
      const rawText = await response.text();
      console.log("Respuesta cruda:", rawText);
      return NextResponse.json({ 
        error: "Error al procesar la respuesta del modelo" 
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error("Error al generar respuesta de IA:", error);
    return NextResponse.json({ error: "Error al generar respuesta de IA" }, { status: 500 });
  }
}