// Diccionario de términos en inglés a español para cocina
const traducciones: Record<string, string> = {
    "flour": "harina",
    "water": "agua",
    "salt": "sal",
    "sugar": "azúcar",
    "olive oil": "aceite de oliva",
    "egg": "huevo",
    "eggs": "huevos",
    "milk": "leche",
    "butter": "mantequilla",
    "chicken": "pollo",
    "beef": "carne de res",
    "pork": "cerdo",
    "fish": "pescado",
    "potato": "papa",
    "potatoes": "papas",
    "tomato": "tomate",
    "tomatoes": "tomates",
    "onion": "cebolla",
    "onions": "cebollas",
    "garlic": "ajo",
    "rice": "arroz",
    "cheese": "queso",
    "minutes": "minutos",
    "hour": "hora",
    "hours": "horas",
    "cook": "cocinar",
    "bake": "hornear",
    "boil": "hervir",
    "fry": "freír",
    "stir": "remover",
    "mix": "mezclar",
    "add": "añadir",
    "cut": "cortar",
    "chop": "picar",
    "slice": "rebanar",
    "preheat": "precalentar",
    "oven": "horno",
    "gluten-free": "sin gluten",
    "gluten free": "sin gluten",
    "celiac": "celíaco",
    "recipe": "receta",
    "recipes": "recetas",
    "step": "paso",
    "steps": "pasos",
    "ingredient": "ingrediente",
    "ingredients": "ingredientes",
    "instruction": "instrucción",
    "instructions": "instrucciones",
    "serving": "porción",
    "servings": "porciones",
    "prepare": "preparar",
    "preparation": "preparación",
    "time": "tiempo",
    "ready in": "listo en",
    "dinner": "cena",
    "lunch": "almuerzo",
    "breakfast": "desayuno",
    "appetizer": "aperitivo",
    "dessert": "postre",
    "starter": "entrada",
    "main course": "plato principal",
    "side dish": "guarnición",
    "sauce": "salsa",
    "seasoning": "condimento",
    "spice": "especia",
    "spices": "especias",
    "herb": "hierba",
    "herbs": "hierbas",
    "vegetable": "verdura",
    "vegetables": "verduras",
    "fruit": "fruta",
    "fruits": "frutas",
    "meat": "carne",
    "pasta": "pasta",
    "bread": "pan",
    "oil": "aceite",
    "vinegar": "vinagre",
    "baking powder": "polvo de hornear",
    "baking soda": "bicarbonato de sodio",
    "flour": "harina",
    "wheat flour": "harina de trigo",
    "corn flour": "harina de maíz",
    "rice flour": "harina de arroz",
    "almond flour": "harina de almendra",
    "coconut flour": "harina de coco",
    "tapioca flour": "harina de tapioca",
    "quinoa flour": "harina de quinoa"
  };
  
  /**
   * Traduce términos comunes de cocina del inglés al español
   */
  export function traducirTexto(texto: string): string {
    if (!texto) return '';
    
    // Reemplazar términos en el texto
    let textoTraducido = texto;
    for (const [ingles, espanol] of Object.entries(traducciones)) {
      // Usa una expresión regular para coincidir con la palabra completa
      const regex = new RegExp(`\\b${ingles}\\b`, 'gi');
      textoTraducido = textoTraducido.replace(regex, espanol);
    }
    
    return textoTraducido;
  }