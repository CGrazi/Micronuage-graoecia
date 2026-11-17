export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };
export type FooterLink = { label: string; url: string };

export type Site = {
  name: string;
  tagline: string;
  logo: string;
  language: string;
  contact: { email: string; phone: string; whatsapp: string; address: string };
  social: Record<string, string>;
  header: { ctaText: string; ctaUrl: string; sticky: boolean };
  navigation: NavItem[];
  footer: { tagline: string; variant: string; showSocial: boolean; bottomText: string; links: FooterLink[]; columns: { title: string; links: FooterLink[] }[] };
  seo: { title: string; description: string };
  ui: Record<"send" | "sending" | "sent" | "error" | "name" | "email" | "phone" | "message" | "select" | "field" | "yes" | "challenge" | "result", string>;
  micronuage: { apiBase: string; slug: string };
};

export const site: Site = {
  "name": "Grão & Cia",
  "tagline": "Cafés especiais torrados na casa, do grão à xícara.",
  "logo": "",
  "language": "pt-BR",
  "contact": {
    "email": "",
    "phone": "",
    "whatsapp": "5511900000000",
    "address": "Rua Exemplo, 123, Centro, São Paulo/SP"
  },
  "social": {
    "instagram": "",
    "facebook": "",
    "linkedin": "",
    "youtube": ""
  },
  "header": {
    "ctaText": "Ver catálogo",
    "ctaUrl": "/catalogo",
    "sticky": true
  },
  "navigation": [
    { "label": "Início", "href": "/" },
    { "label": "Catálogo", "href": "/catalogo" },
    { "label": "Sobre", "href": "/sobre" }
  ],
  "footer": {
    "tagline": "Grão & Cia — cafés especiais torrados com cuidado.",
    "variant": "centered",
    "showSocial": true,
    "bottomText": "",
    "links": [],
    "columns": [
      {
        "title": "Loja",
        "links": [
          { "label": "Catálogo", "url": "/catalogo" },
          { "label": "Finalizar pedido", "url": "/finalizar" }
        ]
      },
      {
        "title": "Sobre",
        "links": [
          { "label": "Nossa história", "url": "/sobre" }
        ]
      }
    ]
  },
  "seo": {
    "title": "Grão & Cia — Cafés Especiais Torrados",
    "description": "Cafés especiais torrados na casa. Grãos selecionados, torra artesanal e entrega para todo o Brasil."
  },
  "ui": {
    "send": "Enviar",
    "sending": "Enviando…",
    "sent": "Pedido enviado. Obrigado!",
    "error": "Não foi possível enviar. Tente de novo.",
    "name": "Nome",
    "email": "E-mail",
    "phone": "Telefone",
    "message": "Mensagem",
    "select": "Selecione",
    "field": "Campo",
    "yes": "Sim",
    "challenge": "Desafio",
    "result": "Resultado"
  },
  "micronuage": {
    "apiBase": "https://micronuage.com.br",
    "slug": "grao-cia"
  }
};
