import { products } from "@/content/pages/Catalogo";
import type { Product } from "@/content/pages/Catalogo";

/** Dados da página inicial da Grão & Cia. */

export const heroImage = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80";

const featuredIds = ["bourbon-amarelo", "blend-da-casa", "geisha-especial"];

export const featuredProducts: Product[] = featuredIds
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p));

export const aboutImage = "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80";

export const processSteps = [
  {
    title: "Seleção dos grãos",
    description: "Trabalhamos diretamente com produtores de regiões reconhecidas, escolhendo lotes com pontuação acima de 84 pontos SCA."
  },
  {
    title: "Torra artesanal",
    description: "Cada lote é torrado em pequenas quantidades, com perfil de torra desenvolvido para destacar as características únicas do grão."
  },
  {
    title: "Frescor garantido",
    description: "Tostamos sob demanda e enviamos em até 48 horas. O café chega na sua casa no pico de sabor."
  }
];
