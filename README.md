# Aluguel de Betoneira

Site estatico profissional para locacao de betoneiras, desenvolvido com Astro e Tailwind CSS. Otimizado para SEO Local e performance maxima.

## Tecnologias

- **Astro 4.15** — Framework estatico
- **Tailwind CSS 3.4** — Estilizacao utilitaria
- **TypeScript** — Tipagem estatica
- **Schema.org** — SEO estruturado

## Estrutura

```
src/
  components/      — Componentes Astro reutilizaveis
  content/         — Colecoes de blog e servicos (MD)
  data/            — Central de dados (config.ts)
  layouts/         — Layout base com SEO
  pages/           — Rotas do site
  styles/          — CSS global
public/
  favicon.*        — Favicon
  robots.txt       — Diretrizes para robos
  sitemap.xml      — Mapa do site
```

## Comandos

| Comando       | Descricao                     |
|---------------|-------------------------------|
| `npm install` | Instalar dependencias         |
| `npm run dev` | Servidor local (localhost:4321) |
| `npm run build` | Build de producao em `dist/`  |

## Deploy

1. Execute `npm run build`
2. Faca o deploy da pasta `dist/` em sua hospedagem (Vercel, Netlify, Cloudflare Pages, etc.)

## Dados da Empresa

Todas as informacoes centralizadas em `src/data/config.ts`:
- Nome, endereco, telefone (NAP)
- Coordenadas geograficas
- Horario de funcionamento
- Redes sociais

## SEO Implementado

- Schema.org (LocalBusiness, Organization, WebSite, BreadcrumbList)
- Open Graph e Twitter Cards
- Meta tags de geo-localizacao
- Sitemap.xml e robots.txt
- Canonical URLs
- Keywords estrategicas

---

Projeto versionado localmente e pronto para conectar a um repositorio remoto no GitHub.
