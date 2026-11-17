import { useState } from "react";
import { Link } from "react-router-dom";
import { Section, SectionHeading } from "@/components/Section";
import { useCart } from "@/components/CartContext";
import { products, categories } from "@/content/pages/Catalogo";
import { cn } from "@/lib/utils";

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { addItem } = useCart();

  const filtered = activeCategory === "Todos" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <title>{"Catálogo · Grão & Cia"}</title>
      <meta name="description" content="Cafés especiais torrados na casa. Grãos, blends e kits para todos os gostos." />
      <Section>
        <SectionHeading eyebrow="Nossos cafés" title="Catálogo" intro="Grãos selecionados, torrados sob demanda. Escolha o seu." />

        {/* Filtro por categoria */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-site px-4 py-2 text-sm font-medium transition",
                activeCategory === cat ? "bg-primary text-white" : "border border-current/20 hover:bg-current/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grade de produtos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-site border border-current/10">
              <Link to={`/produto/${product.id}`}>
                <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover transition hover:scale-105" />
              </Link>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.roast} · {product.weight}</p>
                <h2 className="mt-1 font-heading text-lg font-semibold">
                  <Link to={`/produto/${product.id}`} className="hover:text-primary">{product.name}</Link>
                </h2>
                <p className="mt-1 text-sm opacity-75">{product.origin}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {product.notes.map((note) => (
                    <span key={note} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">{note}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">{product.priceLabel}</span>
                  <button
                    type="button"
                    onClick={() => addItem(product)}
                    className="rounded-site bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
