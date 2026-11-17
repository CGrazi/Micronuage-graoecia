import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { products } from "@/content/pages/Catalogo";

export default function ProdutoPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <title>{"Produto não encontrado · Grão & Cia"}</title>
        <Section>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-heading text-3xl font-semibold">Produto não encontrado</h1>
            <p className="mt-4 opacity-75">O produto que você procura não existe ou saiu do catálogo.</p>
            <ButtonLink href="/catalogo" className="mt-8">Voltar ao catálogo</ButtonLink>
          </div>
        </Section>
      </>
    );
  }

  function handleAdd() {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <>
      <title>{`${product.name} · Grão & Cia`}</title>
      <meta name="description" content={product.description} />
      <Section>
        <Link to="/catalogo" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80">
          <ArrowLeft className="h-4 w-4" /> Voltar ao catálogo
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Imagem */}
          <div className="overflow-hidden rounded-site">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>

          {/* Detalhes */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{product.category} · {product.roast}</p>
            <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-lg opacity-80">{product.description}</p>

            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold">Origem:</dt>
                <dd className="opacity-75">{product.origin}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Peso:</dt>
                <dd className="opacity-75">{product.weight}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Torra:</dt>
                <dd className="opacity-75">{product.roast}</dd>
              </div>
            </dl>

            {/* Notas sensoriais */}
            <div className="mt-6">
              <p className="text-sm font-semibold">Notas sensoriais</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="rounded-full bg-muted px-3 py-1 text-sm">{note}</span>
                ))}
              </div>
            </div>

            {/* Preço e quantidade */}
            <div className="mt-8 border-t border-current/10 pt-6">
              <p className="text-2xl font-semibold text-primary">{product.priceLabel}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-site border border-current/20">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2.5 hover:bg-current/5" aria-label="Diminuir quantidade">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)} className="p-2.5 hover:bg-current/5" aria-label="Aumentar quantidade">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="inline-flex h-12 items-center gap-2 rounded-site bg-primary px-6 font-medium text-white hover:opacity-90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {added ? "Adicionado!" : "Adicionar ao carrinho"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-semibold">Você também pode gostar</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} to={`/produto/${p.id}`} className="group overflow-hidden rounded-site border border-current/10">
                  <img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                  <div className="p-4">
                    <h3 className="font-heading font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-primary">{p.priceLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
