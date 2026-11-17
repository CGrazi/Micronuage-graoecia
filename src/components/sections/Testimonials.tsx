import { Section, SectionHeading, type Tone } from "@/components/Section";

export function Testimonials({ id, tone, title, items = [] }: { id?: string; tone?: Tone; title?: string; items?: { quote?: string; author?: string; role?: string }[] }) {
  return (
    <Section id={id} tone={tone}>
      <SectionHeading title={title} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <figure key={i} className="rounded-site border border-current/10 p-7">
            <blockquote className="text-lg">“{item.quote}”</blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-semibold">{item.author}</span>
              {item.role && <span className="block opacity-70">{item.role}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
