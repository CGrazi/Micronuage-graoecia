import { Link } from "react-router-dom";
import { ArrowRight, Coffee, Flame, Truck } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { heroImage, featuredProducts, aboutImage, processSteps } from "@/content/pages/Index";

export default function IndexPage() {
  const { addItem } = useCart();

  return (
    <>
      <title>{"Grão & Cia — Cafés Especiais Torrados"}</title>
      <meta name="description" content="Cafés especiais torrados na casa. Grãos selecionados, torra artesanal e entrega para todo o Brasil." />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={heroImage} alt="Xícaras de café sendo servidas" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="mx-auto max-w-6xl px-5 py-28 text-white sm:px-8 sm:py-36">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">Torra artesanal, do grão à xícara</p>
          <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Café especial torrado na casa, para o seu momento
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
            Grãos selecionados de produtores parceiros, torrados sob demanda e enviados frescos para todo o Brasil.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/catalogo" variant="light">Ver catálogo</ButtonLink>
            <ButtonLink href="/sobre" variant="outline" className="border-white/40 text-white hover:bg-white/10">Nossa história</ButtonLink>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-site bg-primary/10 text-primary"><Coffee className="h-5 w-5" /></span>
            <div>
              <h2 className="font-heading text-lg font-semibold">Grãos selecionados</h2>
              <p className="mt-1 text-sm opacity-75">Acima de 84 pontos SCA, de origens rastreáveis.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-site bg-primary/10 text-primary"><Flame className="h-5 w-5" /></span>
            <div>
              <h2 className="font-heading text-lg font-semibold">Torra sob demanda</h2>
              <p className="mt-1 text-sm opacity-75">Torramos quando o pedido chega. Frescor garantido.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-site bg-primary/10 text-primary"><Truck className="h-5 w-5" /></span>
            <div>
              <h2 className="font-heading text-lg font-semibold">Envio em 48h</h2>
              <p className="mt-1 text-sm opacity-75">Embalagem com válvula para preservar os aromas.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Produtos em destaque */}
      <Section tone="soft">
        <SectionHeading eyebrow="Destaques" title="Os mais pedidos" intro="Três cafés que nossos clientes não deixam faltar." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-site border border-current/10 bg-background">
              <Link to={`/produto/${product.id}`}>
                <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover transition hover:scale-105" />
              </Link>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.category} · {product.weight}</p>
                <h3 className="mt-1 font-heading text-lg font-semibold">
                  <Link to={`/produto/${product.id}`} className="hover:text-primary">{product.name}</Link>
                </h3>
                <p className="mt-1 text-sm opacity-75">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-primary">{product.priceLabel}</span>
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
        <div className="mt-10 text-center">
          <ButtonLink href="/catalogo" variant="outline">
            Ver catálogo completo <ArrowRight className="ml-2 inline h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>

      {/* Processo */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={aboutImage} alt="Interior da torrefação" className="aspect-[4/3] w-full rounded-site object-cover" />
          <div>
            <SectionHeading eyebrow="Nosso processo" title="Do produtor à sua xícara" align="left" />
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-heading font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm opacity-75">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
