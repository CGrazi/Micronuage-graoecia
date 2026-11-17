import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";

function formatPrice(cents: number): string {
  return "R$ " + (cents / 100).toFixed(2).replace(".", ",");
}

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <>
      <title>{"Carrinho · Grão & Cia"}</title>
      <meta name="description" content="Seu carrinho de compras na Grão & Cia." />
      <Section>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Carrinho</h1>

        {items.length === 0 ? (
          <div className="mt-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 opacity-30" />
            <p className="mt-4 text-lg opacity-75">Seu carrinho está vazio.</p>
            <ButtonLink href="/catalogo" className="mt-6">Ver catálogo</ButtonLink>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Itens */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 rounded-site border border-current/10 p-4">
                  <img src={item.product.image} alt={item.product.name} className="h-20 w-20 shrink-0 rounded-site object-cover" />
                  <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <Link to={`/produto/${item.product.id}`} className="font-heading font-semibold hover:text-primary">
                        {item.product.name}
                      </Link>
                      <p className="text-sm opacity-70">{item.product.weight} · {item.product.priceLabel}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-3 sm:mt-0">
                      <div className="flex items-center rounded-site border border-current/20">
                        <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-current/5" aria-label="Diminuir">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-current/5" aria-label="Aumentar">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="w-20 text-right text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                      <button type="button" onClick={() => removeItem(item.product.id)} className="p-1.5 text-red-500 hover:bg-red-50" aria-label={`Remover ${item.product.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <aside className="h-fit rounded-site border border-current/10 p-6">
              <h2 className="font-heading text-lg font-semibold">Resumo</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-75">Itens ({itemCount})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Frete</span>
                  <span className="opacity-50">Calculado no pedido</span>
                </div>
              </div>
              <div className="mt-4 border-t border-current/10 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <ButtonLink href="/finalizar" className="mt-6 w-full">Finalizar pedido</ButtonLink>
              <Link to="/catalogo" className="mt-3 block text-center text-sm text-primary hover:opacity-80">
                Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </Section>
    </>
  );
}
