import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { site } from "@/content/site";
import { submitLead } from "@/lib/micronuage";

const input = "h-12 w-full rounded-site border border-current/20 bg-transparent px-4 outline-none focus:border-primary";

function formatPrice(cents: number): string {
  return "R$ " + (cents / 100).toFixed(2).replace(".", ",");
}

export default function FinalizarPage() {
  const { items, total, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "pix",
    notes: "",
    website: ""
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.website) return;
    setStatus("sending");

    const itemsSummary = items.map((i) => `${i.quantity}x ${i.product.name} (${i.product.priceLabel})`).join("; ");

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: `Pedido: ${itemsSummary}. Total: ${formatPrice(total)}. Entrega: ${form.address}, ${form.city}/${form.state}, CEP ${form.zip}. Pagamento: ${form.payment}. ${form.notes}`,
        fields: {
          "Itens": itemsSummary,
          "Total": formatPrice(total),
          "Endereço": `${form.address}, ${form.city}/${form.state}, CEP ${form.zip}`,
          "Pagamento": form.payment,
          "Observações": form.notes
        },
        source: "pedido"
      });
      clearCart();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (items.length === 0 && status !== "sent") {
    return (
      <>
        <title>{"Finalizar pedido · Grão & Cia"}</title>
        <Section>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-heading text-3xl font-semibold">Finalizar pedido</h1>
            <p className="mt-4 opacity-75">Seu carrinho está vazio. Adicione produtos antes de finalizar.</p>
            <ButtonLink href="/catalogo" className="mt-6">Ver catálogo</ButtonLink>
          </div>
        </Section>
      </>
    );
  }

  if (status === "sent") {
    return (
      <>
        <title>{"Pedido enviado · Grão & Cia"}</title>
        <Section>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-heading text-3xl font-semibold">Pedido enviado!</h1>
            <p className="mt-4 text-lg opacity-75">
              Obrigado, {form.name.split(" ")[0]}! Recebemos seu pedido e entraremos em contato pelo e-mail ou telefone informado para confirmar o pagamento e o envio.
            </p>
            <ButtonLink href="/catalogo" className="mt-8">Voltar ao catálogo</ButtonLink>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <title>{"Finalizar pedido · Grão & Cia"}</title>
      <meta name="description" content="Finalize seu pedido de cafés especiais na Grão & Cia." />
      <Section>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Finalizar pedido</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">Nome completo *</label>
                <input id="name" required className={input} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">E-mail *</label>
                <input id="email" required type="email" className={input} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">Telefone / WhatsApp</label>
                <input id="phone" type="tel" className={input} autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label htmlFor="zip" className="mb-1 block text-sm font-medium">CEP *</label>
                <input id="zip" required className={input} autoComplete="postal-code" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium">Endereço (rua e número) *</label>
              <input id="address" required className={input} autoComplete="street-address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium">Cidade *</label>
                <input id="city" required className={input} autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-medium">Estado *</label>
                <input id="state" required className={input} placeholder="SP" autoComplete="address-level1" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
              </div>
            </div>

            <div>
              <label htmlFor="payment" className="mb-1 block text-sm font-medium">Forma de pagamento *</label>
              <select id="payment" required className={input} value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })}>
                <option value="pix">Pix</option>
                <option value="cartao">Cartão de crédito (link de pagamento)</option>
                <option value="boleto">Boleto bancário</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="mb-1 block text-sm font-medium">Observações</label>
              <textarea id="notes" rows={3} className={input + " h-auto py-3"} placeholder="Ex.: moer para V60, entregar no período da tarde…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>

            <button type="submit" disabled={status === "sending"} className="h-12 w-full rounded-site bg-primary font-medium text-white hover:opacity-90 disabled:opacity-60">
              {status === "sending" ? "Enviando…" : "Confirmar pedido"}
            </button>
            {status === "error" && <p className="text-sm text-red-600">{site.ui.error}</p>}
          </form>

          {/* Resumo do pedido */}
          <aside className="h-fit rounded-site border border-current/10 p-6">
            <h2 className="font-heading text-lg font-semibold">Seu pedido</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.product.id} className="flex justify-between text-sm">
                  <span className="opacity-75">{item.quantity}× {item.product.name}</span>
                  <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-current/10 pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/carrinho" className="mt-4 block text-center text-sm text-primary hover:opacity-80">
              Editar carrinho
            </Link>
          </aside>
        </div>
      </Section>
    </>
  );
}
