import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
}

export default function RecipeSearch() {
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
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto mb-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Buscador de Recetas Sin Gluten</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Buscar recetas (ej: pasta, pizza, tacos...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Buscar'}
          </Button>
        </form>
      </div>

      {recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="h-full flex flex-col">
              <CardHeader className="p-4">
                <div className="aspect-video relative overflow-hidden rounded-md mb-2">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                <CardDescription>
                  {recipe.readyInMinutes} min | {recipe.servings} porciones
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <div dangerouslySetInnerHTML={{ __html: recipe.summary.substring(0, 150) + '...' }} />
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`/receta/${recipe.id}`, '_blank')}
                >
                  Ver Receta Completa
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {recipes.length > 0 && recipes.length < totalResults && (
        <div className="mt-8 text-center">
          <Button 
            onClick={() => searchRecipes(false)} 
            disabled={loading}
            variant="outline"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Cargando...</>
            ) : (
              'Cargar más recetas'
            )}
          </Button>
        </div>
      )}

      {recipes.length === 0 && !loading && query && (
        <div className="text-center mt-8">
          <p className="text-muted-foreground">No se encontraron recetas para "{query}"</p>
        </div>
      )}
    </div>
  );
}