# Contribuindo com o Órbita

Obrigado pelo interesse! Contribuições são bem-vindas. 🚀

## Como rodar localmente

```bash
git clone https://github.com/caducosilva/orbita-devtools.git
cd orbita-devtools
npm install
npm run dev   # http://localhost:3000
```

## Adicionar uma nova ferramenta

1. Implemente a lógica em `src/lib/` (pura, sem React — facilita testar).
2. Crie o componente da ferramenta em `src/tools/<categoria>.tsx`.
3. Registre o componente no mapa em `src/tools/index.tsx`.
4. Adicione os metadados (slug, nome, descrição SEO, keywords, ícone) em `src/lib/tools-meta.ts`.
   A rota, o card, a busca e o sitemap são gerados automaticamente.

## Princípios

- **Privacidade:** processe tudo no cliente. Nada de enviar dados do usuário a servidores.
- **Acessibilidade e performance** acima de firulas.
- **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).

## Checagens antes do PR

```bash
npm run typecheck
npm run build
```
