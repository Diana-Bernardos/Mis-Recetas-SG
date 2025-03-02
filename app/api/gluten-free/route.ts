import { NextResponse } from "next/server";

// API key from Spoonacular
const API_KEY = process.env.SPOONACULAR_API_KEY;

export async function GET(request: Request) {
  try {
    // Obtener los parámetros de búsqueda de la URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Calcular el offset para la paginación
    const offset = (page - 1) * limit;
    
    // Construir la URL para la API de Spoonacular
    const apiUrl = new URL('https://api.spoonacular.com/recipes/complexSearch');
    
    // Agregar parámetros a la consulta
    apiUrl.searchParams.append('apiKey', API_KEY || '');
    apiUrl.searchParams.append('query', query);
    apiUrl.searchParams.append('intolerances', 'gluten');
    apiUrl.searchParams.append('number', limit.toString());
    apiUrl.searchParams.append('offset', offset.toString());
    apiUrl.searchParams.append('addRecipeInformation', 'true');
    apiUrl.searchParams.append('fillIngredients', 'true');
    
    // Hacer la petición a la API de Spoonacular
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transformar los datos para tener un formato más limpio (opcional)
    const recipes = data.results.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      sourceUrl: recipe.sourceUrl,
      summary: recipe.summary,
      ingredients: recipe.extendedIngredients?.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
      instructions: recipe.analyzedInstructions?.[0]?.steps?.map((step: any) => ({
        number: step.number,
        step: step.step,
      })),
    }));
    
    return NextResponse.json({
      results: recipes,
      totalResults: data.totalResults,
      page,
      limit,
    });
    
  } catch (error: any) {
    console.error("Error al obtener recetas sin gluten:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}