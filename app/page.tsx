import Link from "next/link"
import Image from "next/image"
import { Book, ShoppingBag, Plus, ChefHat } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Tu asistente de cocina personal</h1>
          <p className="text-lg mb-6">
            Guarda tus recetas favoritas, crea listas de compra y recibe recomendaciones personalizadas con nuestro
            asistente de IA.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/recetas" className="btn-primary">
              Ver recetas
            </Link>
            <Link href="/asistente" className="btn-secondary">
              Consultar asistente
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Recetario App"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <Book className="h-10 w-10 mb-4 text-accent" />
          <h2 className="text-xl font-bold mb-2">Recetas</h2>
          <p className="mb-4">Explora y guarda tus recetas favoritas en un solo lugar.</p>
          <Link href="/recetas" className="text-primary font-medium hover:underline">
            Ver recetas →
          </Link>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <ShoppingBag className="h-10 w-10 mb-4 text-accent" />
          <h2 className="text-xl font-bold mb-2">Lista de compra</h2>
          <p className="mb-4">Genera listas de compra automáticamente desde tus recetas.</p>
          <Link href="/lista-compra" className="text-primary font-medium hover:underline">
            Ver lista →
          </Link>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <Plus className="h-10 w-10 mb-4 text-accent" />
          <h2 className="text-xl font-bold mb-2">Crear recetas</h2>
          <p className="mb-4">Añade tus propias recetas y compártelas con la comunidad.</p>
          <Link href="/crear-receta" className="text-primary font-medium hover:underline">
            Crear receta →
          </Link>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <ChefHat className="h-10 w-10 mb-4 text-accent" />
          <h2 className="text-xl font-bold mb-2">Asistente IA</h2>
          <p className="mb-4">Recibe recomendaciones personalizadas con nuestro asistente.</p>
          <Link href="/asistente" className="text-primary font-medium hover:underline">
            Consultar →
          </Link>
        </div>
      </section>

      <section className="bg-muted p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Recetas destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="recipe-card">
              <Image
                src={`/placeholder.svg?height=200&width=300&text=Receta${i}`}
                alt={`Receta ${i}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Receta de ejemplo {i}</h3>
                <p className="text-sm mb-4">Una deliciosa receta que puedes preparar en menos de 30 minutos.</p>
                <Link href={`/recetas/${i}`} className="text-primary font-medium hover:underline">
                  Ver receta →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

