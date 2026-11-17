/** Produtos do catálogo da Grão & Cia. Edite aqui: src/pages/Catalogo.tsx e src/pages/Produto.tsx leem esta lista. */

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
  category: string;
  weight: string;
  origin: string;
  roast: string;
  notes: string[];
};

export const products: Product[] = [
  {
    id: "bourbon-amarelo",
    name: "Bourbon Amarelo",
    description: "Grãos 100% arábica da variedade Bourbon Amarelo, colhidos no ponto ideal de maturação. Torra média que preserva a doçura natural e a acidez cítrica. Ideal para métodos coados como V60 e Chemex.",
    price: 4200,
    priceLabel: "R$ 42,00",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    category: "Grãos",
    weight: "250 g",
    origin: "Alta Mogiana, SP",
    roast: "Torra média",
    notes: ["Chocolate ao leite", "Caramelo", "Laranja"]
  },
  {
    id: "catuai-vermelho",
    name: "Catuaí Vermelho",
    description: "Variedade Catuaí Vermelho com torra clara, destacando notas florais e frutadas. Corpo leve e finalização limpa. Perfeito para quem gosta de cafés delicados e aromáticos.",
    price: 3800,
    priceLabel: "R$ 38,00",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
    category: "Grãos",
    weight: "250 g",
    origin: "Cerrado Mineiro, MG",
    roast: "Torra clara",
    notes: ["Jasmim", "Pêssego", "Mel"]
  },
  {
    id: "geisha-especial",
    name: "Geisha Especial",
    description: "Microlote da variedade Geisha, uma das mais premiadas do mundo. Torra clara que revela complexidade aromática excepcional. Produção limitada, torrado sob demanda.",
    price: 7200,
    priceLabel: "R$ 72,00",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    category: "Grãos",
    weight: "200 g",
    origin: "Serra do Caparaó, ES",
    roast: "Torra clara",
    notes: ["Bergamota", "Jasmim", "Manga"]
  },
  {
    id: "blend-da-casa",
    name: "Blend da Casa",
    description: "Nosso blend assinatura, combinando grãos de duas origens para um equilíbrio entre corpo, doçura e acidez. Versátil: vai bem no espresso, na moka e no coado do dia a dia.",
    price: 3400,
    priceLabel: "R$ 34,00",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
    category: "Grãos",
    weight: "250 g",
    origin: "Blend (Mogiana + Cerrado)",
    roast: "Torra média",
    notes: ["Chocolate", "Nozes", "Açúcar mascavo"]
  },
  {
    id: "espresso-intenso",
    name: "Espresso Intenso",
    description: "Torra escura para quem prefere um café encorpado e de sabor marcante. Crema densa e notas de cacau. Desenvolvido para máquinas de espresso e moka.",
    price: 3600,
    priceLabel: "R$ 36,00",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    category: "Grãos",
    weight: "250 g",
    origin: "Sul de Minas, MG",
    roast: "Torra escura",
    notes: ["Cacau", "Amêndoa tostada", "Melaço"]
  },
  {
    id: "descafeinado-swiss",
    name: "Descafeinado Swiss Water",
    description: "Café descafeinado pelo método Swiss Water, sem uso de solventes químicos. Mantém o sabor e os aromas do grão. Torra média, ideal para qualquer horário do dia.",
    price: 4800,
    priceLabel: "R$ 48,00",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    category: "Grãos",
    weight: "250 g",
    origin: "Mantiqueira de Minas, MG",
    roast: "Torra média",
    notes: ["Chocolate ao leite", "Avelã", "Caramelo"]
  },
  {
    id: "microlote-caparao",
    name: "Microlote Caparaó",
    description: "Lote exclusivo de uma família produtora na Serra do Caparaó. Processo natural de secagem lenta. Torra clara que destaca a complexidade e a doçura de frutas maduras.",
    price: 5600,
    priceLabel: "R$ 56,00",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    category: "Grãos",
    weight: "250 g",
    origin: "Serra do Caparaó, ES",
    roast: "Torra clara",
    notes: ["Frutas vermelhas", "Rapadura", "Floral"]
  },
  {
    id: "kit-degustacao",
    name: "Kit Degustação",
    description: "Quatro amostras de 100 g cada: Bourbon Amarelo, Catuaí Vermelho, Blend da Casa e Espresso Intenso. Ideal para explorar diferentes perfis de torra e origem.",
    price: 8900,
    priceLabel: "R$ 89,00",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
    category: "Kits",
    weight: "4 × 100 g",
    origin: "Diversas origens",
    roast: "Torras variadas",
    notes: ["Variedade de perfis", "Ideal para presente"]
  }
];

export const categories = ["Todos", "Grãos", "Kits"];
