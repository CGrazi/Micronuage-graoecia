import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { site } from "@/content/site";
import { submitLead } from "@/lib/micronuage";
import { payments } from "@micronuage/sdk";

const input = "h-12 w-full rounded-site border border-current/20 bg-transparent px-4 outline-none focus:border-primary";
const inputError = "h-12 w-full rounded-site border border-red-500 bg-transparent px-4 outline-none focus:border-red-600";

function formatPrice(cents: number): string {
  return "R$ " + (cents / 100).toFixed(2).replace(".", ",");
}

type FieldKey = "name" | "email" | "zip" | "address" | "city" | "state";

export default function FinalizarPage() {
  const { items, total, clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const checkoutResult = searchParams.get("checkout");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [stripeError, setStripeError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
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

  function setField(key: keyof typeof form, value: string) {
    setForm({ ...form, [key]: value });
    if (key in fieldErrors) setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  /** Campos obrigatórios: nome, e-mail, endereço, cidade, estado e CEP. */
  function validate(): Partial<Record<FieldKey, string>> {
    const errors: Partial<Record<FieldKey, string>> = {};
    if (!form.name.trim()) errors.name = "Informe seu nome completo.";
    if (!form.email.trim()) errors.email = "Informe seu e-mail.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Informe um e-mail válido.";
    if (!form.address.trim()) errors.address = "Informe o endereço de entrega.";
    if (!form.city.trim()) errors.city = "Informe a cidade.";
    if (!form.state.trim()) errors.state = "Informe o estado (UF).";
    if (!form.zip.trim()) errors.zip = "Informe o CEP.";
    return errors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.website) return;
    if (items.length === 0) return;

    const errors = validate();
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    setStripeError("");

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

      if (form.payment === "stripe") {
        clearCart();
        setStatus("sent");
        try {
          await payments.checkout({ amountCents: total, currency: "brl", returnPath: "/finalizar" });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Erro ao iniciar o pagamento.";
          setStripeError(msg);
        }
        return;
      }

      clearCart();
      setStatus("sent");
    } catch (err: unknown) {
      setStatus("error");
      setStripeError(err instanceof Error ? err.message : site.ui.error);
    }
  }

  if (items.length === 0 && status !== "sent") {
    return (
      <>
        <title>{"Finalizar pedido · Grão & Cia"}</title>
        <Section>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-heading text-3xl font-semibold">Finalizar pedido</h1>
            {checkoutResult === "success" && (
              <p className="mt-4 rounded-site border border-green-600/30 bg-green-50 p-4 text-green-800">
                Pagamento confirmado! Seu pedido foi recebido com sucesso.
              </p>
            )}
            {checkoutResult === "cancelled" && (
              <p className="mt-4 rounded-site border border-amber-600/30 bg-amber-50 p-4 text-amber-800">
                Pagamento cancelado. Você pode tentar novamente quando quiser.
              </p>
            )}
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
            {checkoutResult === "success" && (
              <p className="mt-4 rounded-site border border-green-600/30 bg-green-50 p-4 text-green-800">
                Pagamento confirmado! Obrigado pela compra.
              </p>
            )}
            {checkoutResult === "cancelled" && (
              <p className="mt-4 rounded-site border border-amber-600/30 bg-amber-50 p-4 text-amber-800">
                Pagamento cancelado. Seu pedido foi registrado, mas o pagamento não foi concluído.
              </p>
            )}
            {stripeError && (
              <p className="mt-4 rounded-site border border-red-600/30 bg-red-50 p-4 text-red-800">{stripeError}</p>
            )}
            <p className="mt-4 text-lg opacity-75">
              Obrigado, {form.name.split(" ")[0]}! Recebemos seu pedido e entraremos em contato pelo e-mail ou telefone informado para confirmar o pagamento e o envio.
            </p>
            <ButtonLink href="/catalogo" className="mt-8">Voltar ao catálogo</ButtonLink>
          </div>
        </Section>
      </>
    );
  }

  const errorText = (key: FieldKey) =>
    fieldErrors[key] ? <p className="mt-1 text-sm text-red-600">{fieldErrors[key]}</p> : null;

  return (
    <>
      <title>{"Finalizar pedido · Grão & Cia"}</title>
      <meta name="description" content="Finalize seu pedido de cafés especiais na Grão & Cia." />
      <Section>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Finalizar pedido</h1>

        {checkoutResult === "success" && (
          <p className="mt-4 rounded-site border border-green-600/30 bg-green-50 p-4 text-green-800">
            Pagamento confirmado! Obrigado pela compra.
          </p>
        )}
        {checkoutResult === "cancelled" && (
          <p className="mt-4 rounded-site border border-amber-600/30 bg-amber-50 p-4 text-amber-800">
            Pagamento cancelado. Você pode tentar novamente.
          </p>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Formulário */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />

            {status === "error" && Object.values(fieldErrors).some(Boolean) && (
              <p className="rounded-site border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-700">
                Confira os campos destacados abaixo para confirmar o pedido.
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">Nome completo *</label>
                <input id="name" className={fieldErrors.name ? inputError : input} autoComplete="name" value={form.name} onChange={(e) => setField("name", e.target.value)} />
                {errorText("name")}
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">E-mail *</label>
                <input id="email" type="email" className={fieldErrors.email ? inputError : input} autoComplete="email" value={form.email} onChange={(e) => setField("email", e.target.value)} />
                {errorText("email")}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">Telefone / WhatsApp</label>
                <input id="phone" type="tel" className={input} autoComplete="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
              </div>
              <div>
                <label htmlFor="zip" className="mb-1 block text-sm font-medium">CEP *</label>
                <input id="zip" className={fieldErrors.zip ? inputError : input} autoComplete="postal-code" value={form.zip} onChange={(e) => setField("zip", e.target.value)} />
                {errorText("zip")}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium">Endereço (rua e número) *</label>
              <input id="address" className={fieldErrors.address ? inputError : input} autoComplete="street-address" value={form.address} onChange={(e) => setField("address", e.target.value)} />
              {errorText("address")}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium">Cidade *</label>
                <input id="city" className={fieldErrors.city ? inputError : input} autoComplete="address-level2" value={form.city} onChange={(e) => setField("city", e.target.value)} />
                {errorText("city")}
              </div>
              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-medium">Estado *</label>
                <input id="state" className={fieldErrors.state ? inputError : input} placeholder="SP" autoComplete="address-level1" value={form.state} onChange={(e) => setField("state", e.target.value)} />
                {errorText("state")}
              </div>
            </div>

            <div>
              <label htmlFor="payment" className="mb-1 block text-sm font-medium">Forma de pagamento</label>
              <select id="payment" className={input} value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })}>
                <option value="pix">Pix</option>
                <option value="stripe">Pagar online agora (cartão, via Stripe)</option>
                <option value="boleto">Boleto bancário</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="mb-1 block text-sm font-medium">Observações</label>
              <textarea id="notes" rows={3} className={input + " h-auto py-3"} placeholder="Ex.: moer para V60, entregar no período da tarde…" value={form.notes} onChange={(e) => setField("notes", e.target.value)} />
            </div>

            <button type="submit" disabled={status === "sending"} className="h-12 w-full rounded-site bg-primary font-medium text-white hover:opacity-90 disabled:opacity-60">
              {status === "sending" ? "Enviando…" : "Confirmar pedido"}
            </button>
            {status === "error" && <p className="text-sm text-red-600">{stripeError || site.ui.error}</p>}
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
