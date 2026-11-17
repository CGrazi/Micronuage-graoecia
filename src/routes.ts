import type { ComponentType } from "react";
import IndexPage from "@/pages/Index";
import CatalogoPage from "@/pages/Catalogo";
import ProdutoPage from "@/pages/Produto";
import CarrinhoPage from "@/pages/Carrinho";
import FinalizarPage from "@/pages/Finalizar";
import SobrePage from "@/pages/Sobre";

/** Todas as páginas do site. O menu (src/content/site.ts) aponta para estes caminhos. */
export const routes: { path: string; name: string; Page: ComponentType }[] = [
  { path: "/", name: "Grão & Cia", Page: IndexPage },
  { path: "/catalogo", name: "Catálogo", Page: CatalogoPage },
  { path: "/produto/:id", name: "Produto", Page: ProdutoPage },
  { path: "/carrinho", name: "Carrinho", Page: CarrinhoPage },
  { path: "/finalizar", name: "Finalizar pedido", Page: FinalizarPage },
  { path: "/sobre", name: "Sobre", Page: SobrePage },
];
