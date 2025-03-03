import { NextResponse } from "next/server";

// API key from Spoonacular
const API_KEY = process.env.SPOONACULAR_API_KEY;

export async function GET(request: Request) {
  try {
    // Obtener el ID de la receta de la URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "ID de receta requerido" }, { status: 400 });
    }
    
    // Construir la URL para obtener detalles de la receta
    const apiUrl = new URL(`https://api.spoonacular.com/recipes/${id}/information`);
    
    // Agregar parámetros a la consulta
    apiUrl.searchParams.append('apiKey', API_KEY || '');
    apiUrl.searchParams.append('includeNutrition', 'false');
    
    // Hacer la petición a la API de Spoonacular
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }
    
    const recipeData = await response.json();
    
    // Transformar los datos para tener un formato más limpio
    const receta = {
      id: recipeData.id,
      title: recipeData.title,
      image: recipeData.image,
      readyInMinutes: recipeData.readyInMinutes,
      servings: recipeData.servings,
      sourceUrl: recipeData.sourceUrl,
      summary: recipeData.summary,
      ingredients: recipeData.extendedIngredients?.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
      instructions: recipeData.analyzedInstructions?.[0]?.steps?.map((step: any) => ({
        number: step.number,
        step: step.step,
      })),
    };
    
    return NextResponse.json(receta);
    
  } catch (error: any) {
    console.error("Error al obtener detalles de receta:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}