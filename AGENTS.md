# Grão & Cia — regras do projeto

Regras que toda mudança deste projeto mantém. A IA da Micronuage lê este arquivo a cada pedido e acrescenta as decisões que tomar.

- Os dados do negócio (nome, contatos, menu, rodapé) ficam em `src/content/site.ts`.
- Os produtos do catálogo ficam em `src/content/pages/Catalogo.ts` (tipo `Product`); a página inicial usa `src/content/pages/Index.ts`; a página Sobre usa `src/content/pages/Sobre.ts`.
- O carrinho de compras é um contexto React (`src/components/CartContext.tsx`), em memória (limpa ao recarregar). Não usa localStorage nem banco de dados.
- Formulários enviam com `submitLead()` de `src/lib/micronuage.ts` (as mensagens chegam na caixa de Leads da Micronuage); contas e dados salvos usam `@micronuage/sdk` e `data/model.json`.
- Cores, fontes e cantos vêm dos tokens de `src/index.css` (`@theme`): primária marrom-café #6F3A24, fundo creme #FDF6EE, acento caramelo #D4956A. Nenhum componente fixa uma cor fora dos tokens.
- Fontes: Fraunces (títulos) e DM Sans (corpo).
- Ícones são do `lucide-react`; nunca emoji no lugar de ícone.
- Cada página tem sua rota em `src/routes.ts`; `npm test` confere que o menu só leva a páginas que existem.
- Número de registro profissional, CNPJ, preços e números do negócio só entram quando o cliente informar. Os preços atuais são de exemplo.
- O site nunca fica sem foto: enquanto o cliente não envia as dele, usa fotos de exemplo do banco verificado da Micronuage (tema café); fotos feitas para o site saem quando o cliente pede.
- Conteúdo de exemplo para substituir: preços dos cafés, nomes e origens dos produtos, endereço, telefone, e-mail, depoimentos e horários.
