import { Section, SectionHeading } from "@/components/Section";
import { Hours } from "@/components/sections/Hours";
import { aboutImage, values, hoursItems } from "@/content/pages/Sobre";
import { site } from "@/content/site";

export default function SobrePage() {
  return (
    <>
      <title>{"Sobre · Grão & Cia"}</title>
      <meta name="description" content="Conheça a história da Grão & Cia: cafés especiais torrados com cuidado, do grão à xícara." />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={aboutImage} alt="Torrefação de café" className="aspect-[4/3] w-full rounded-site object-cover" />
          <div>
            <SectionHeading eyebrow="Nossa história" title="Do grão à xícara, com cuidado" align="left" />
            <p className="mt-4 text-lg opacity-80">
              A Grão & Cia nasceu da paixão por café e da vontade de conectar quem produz a quem aprecia. Começamos torrando em casa para amigos e hoje enviamos cafés especiais para todo o Brasil.
            </p>
            <p className="mt-4 text-lg opacity-80">
              Trabalhamos diretamente com famílias produtoras de regiões reconhecidas, selecionando lotes com pontuação acima de 84 pontos SCA. Cada torra é desenvolvida para destacar o que aquele grão tem de único.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading title="O que nos guia" />
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map((value, i) => (
            <article key={i} className="rounded-site border border-current/10 bg-background p-7">
              <h3 className="font-heading text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 opacity-75">{value.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Hours
        id="horarios"
        title="Visite nossa torrefação"
        address={site.contact.address}
        phone={site.contact.phone || undefined}
        note="Torramos de terça a sexta. Encomendas de grãos com 24h de antecedência."
        items={hoursItems}
      />
    </>
  );
}
