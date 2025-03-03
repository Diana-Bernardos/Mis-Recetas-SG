import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
}

export default function RecipeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const searchRecipes = async (reset = false) => {
    try {
      setLoading(true);
      const searchPage = reset ? 1 : page;
      
      if (reset) {
        setPage(1);
        setRecipes([]);
      }
      
      const response = await fetch(`/api/gluten-free?query=${encodeURIComponent(query)}&page=${searchPage}&limit=9`);
      
      if (!response.ok) {
        throw new Error('Error en la búsqueda de recetas');
      }
      
      const data = await response.json();
      
      setRecipes(prev => reset ? data.results : [...prev, ...data.results]);
      setTotalResults(data.totalResults);
      
      if (!reset) {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes(true);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="mb-8">
        <div className="relative max-w-md mx-auto md:mx-0">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar recetas sin gluten..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary text-gray-500"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="ml-2 btn-primary "
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Buscando...
                </span>
              ) : 'Buscar'}
            </button>
          </form>
        </div>
      </div>

      {recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-500">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card hover:scale-105 text-gray-500">
              <div className="w-full h-48 overflow-hidden text-gray-500">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover text-gray-500 "
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 ">{recipe.title}</h2>
                <div className="flex justify-between text-sm mb-4 ">
                  <span className="bg-secondary px-2 py-1 rounded-full">⏱️ {recipe.readyInMinutes} min</span>
                  <span className="bg-secondary px-2 py-1 rounded-full">👥 {recipe.servings} porciones</span>
                </div>
                <div 
                  className="text-sm mb-4 h-20 overflow-hidden text-gray-500" 
                  dangerouslySetInnerHTML={{ __html: recipe.summary.substring(0, 150) + '...' }} 
                />
                <button
                  className="btn-primary w-full text-gray-500"
                  onClick={() => router.push(`/recetas/${recipe.id}`)}
                >
                  Ver Receta Completa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {recipes.length > 0 && recipes.length < totalResults && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => searchRecipes(false)} 
            disabled={loading}
            className="btn-secondary "
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Cargando...
              </span>
            ) : 'Cargar más recetas'}
          </button>
        </div>
      )}

      {recipes.length === 0 && !loading && query && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron recetas para "{query}"</p>
        </div>
      )}
    </div>
  );
}