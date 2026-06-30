# Relatório SEO — Google Search Central vs. Site Atual

**Site:** https://www.alugueldebetoneirarj.com.br  
**Data da análise:** 28/06/2026  
**Fonte:** Google Search Central (https://developers.google.com/search/docs?hl=pt-br)  
**Método:** Comparação direta entre diretrizes oficiais e inspeção do código + site ao vivo.

---

## 1. Requisitos Técnicos

| Diretriz do Google | Status no site | Evidência / O que falta |
|---|---|---|
| Indexação permitida | ✅ OK | `robots.txt`: `Allow: /` para todos os user-agents |
| Sitemap enviado | ✅ OK | `/sitemap.xml` com 16 URLs, `lastmod` atualizado |
| URLs canônicas | ✅ OK | `trailingSlash: 'always'` + canonical normalizado |
| URLs bem estruturadas | ✅ OK | URLs amigáveis: `/blog/slug/`, `/servicos/betoneira-150l/` |
| Links internos rastreáveis | ⚠️ Parcial | Menu, footer e cards linkam bem, mas links de tags `/blog?tag=...` levam a página sem filtro |
| Robots meta correta | ✅ OK | `index, follow, max-snippet:-1, max-image-preview:large` |
| JavaScript não bloqueia render | ✅ OK | Astro SSG, JS mínimo, Partytown para GTM |
| Mobile-first / responsivo | ✅ OK | Layout mobile-first, menu hambúrguer funcional |

### Ações recomendadas (técnico)
1. Corrigir links de tags do blog ou implementar filtro real.
2. Criar `vercel.json` com `Cache-Control` otimizado (hoje `max-age=0, must-revalidate`).
3. Criar página `404.astro` customizada.

---

## 2. Qualidade de Conteúdo (E-E-A-T)

| Diretriz do Google | Status no site | Evidência / O que falta |
|---|---|---|
| Conteúdo útil e centrado nas pessoas | ✅ OK | Artigos respondem intenção de busca com preços, comparações e CTAs |
| E-E-A-T (experiência, expertise, autoridade, confiança) | ⚠️ Médio | Autor é "Aluguel de Betoneira" (organização). Não há CNPJ, fotos reais de equipe, nem biografia do autor |
| Conteúdo original | ✅ OK | Textos próprios, não genéricos |
| Atualidade | ⚠️ Parcial | Título do artigo de preços corrigido para 2026. Reviews schema ainda precisam de dados reais |
| Evitar keyword stuffing | ✅ OK | Densidade de palavras-chave natural (0,6%–1,2%) |
| Evitar spam de datas | ✅ OK | `pubDate` real e alinhado com revisões de conteúdo |
| Imagens ilustrativas no corpo | ⚠️ Médio | Apenas 1 imagem hero por artigo; poucas imagens no meio do texto |

### Ações recomendadas (conteúdo)
1. Adicionar CNPJ, endereço comercial e número de licença/Alvará em `/sobre` e `/contato`.
2. Incluir fotos reais da equipe/base de operações.
3. Adicionar seção "Sobre o autor" ou "Quem escreve" nos artigos.
4. Inserir mais imagens ilustrativas no corpo dos artigos.
5. Coletar reviews reais de clientes para atualizar schema `Review`.

---

## 3. Experiência na Página (Core Web Vitals)

| Diretriz do Google | Status no site | Evidência / O que falta |
|---|---|---|
| LCP otimizado | ⚠️ Parcial | Hero image com preload e srcset; fontes do Google ainda externas |
| CLS controlado | ✅ OK | Imagens com width/height definidos |
| INP / interatividade | ⚠️ Não medido | PageSpeed Insights com quota excedida; precisa medir no Search Console |
| Mobile-first index | ✅ OK | Layout responsivo, viewport configurado |
| Intersticiais intrusivos | ✅ OK | Não há pop-ups intrusivos |
| Cache eficiente | ❌ Fraco | `Cache-Control: public, max-age=0, must-revalidate` |

### Ações recomendadas (performance)
1. Medir Core Web Vitals no Search Console e PageSpeed Insights.
2. Configurar `stale-while-revalidate` ou `max-age` maior no `vercel.json`.
3. Considerar self-host das fontes Google para reduzir LCP.
4. Testar CLS no menu mobile com DevTools.

---

## 4. Dados Estruturados (Schema.org)

| Schema recomendado | Status no site | Evidência |
|---|---|---|
| `LocalBusiness` | ✅ OK | NAP, geo, horários, área de atuação, `priceRange` |
| `Organization` | ✅ OK | Logo, sameAs (WhatsApp/Instagram), contactPoint |
| `WebSite` | ⚠️ Parcial | Presente, mas **falta `SearchAction`** para Sitelinks Searchbox |
| `BreadcrumbList` | ✅ OK | Dinâmico por página |
| `Article` | ✅ OK | Blog posts com author, publisher, datas, wordCount |
| `FAQPage` | ✅ OK | Artigos e páginas de serviços têm FAQ schema |
| `Service` | ✅ OK | Páginas de serviços têm schema próprio |
| `AggregateRating` + `Review` | ⚠️ Parcial | Presente, mas com reviews fictícios e datas genéricas |

### Ações recomendadas (dados estruturados)
1. Adicionar `SearchAction` no schema `WebSite`.
2. Substituir reviews fictícios por reviews reais do Google Business Profile.
3. Validar todos os schemas no Teste de Pesquisa Aprimorada do Google.

---

## 5. SEO Local

| Diretriz do Google | Status no site | Evidência / O que falta |
|---|---|---|
| NAP consistente | ✅ OK | Nome, telefone e endereço centralizados em `config.ts` |
| Schema `LocalBusiness` | ✅ OK | Implementado com geo-coordenadas e horários |
| Meta tags geo | ✅ OK | `geo.region`, `geo.placename`, `geo.position`, `ICBM` |
| Mencões geográficas no conteúdo | ✅ OK | Rio de Janeiro, Niterói, São Gonçalo, Baixada, etc. |
| Google Business Profile | ❌ Não existe | Site não possui GBP; sem link bidirecional |
| Citações locais (diretórios) | ❌ Não verificado | Precisa listar em CBJE, GuiaMais, Apontador etc. |
| Páginas de cidade | ❌ Não existe | Apenas seção na home; não há páginas `/aluguel-de-betoneira-rio-de-janeiro/` |

### Ações recomendadas (SEO local)
1. Criar Google Business Profile — **prioridade máxima para SEO local**.
2. Adicionar link do GBP no footer quando existir.
3. Criar 3–4 páginas de cidade principais.
4. Listar empresa nos principais diretórios locais.

---

## 6. Links e Descoberta

| Diretriz do Google | Status no site | Evidência / O que falta |
|---|---|---|
| Links internos | ✅ OK | Menu, footer, artigos relacionados, links entre serviços e blog |
| Sitemap no robots.txt | ✅ OK | `Sitemap: https://www.alugueldebetoneirarj.com.br/sitemap.xml` |
| Links externos com `rel` adequado | ✅ OK | WhatsApp/Instagram com `noopener noreferrer` |
| Backlinks / autoridade | ❌ Não verificado | Sem análise de perfil de backlinks |
| Search Console / Bing WMT | ❌ Não verificado | Não confirmado se estão configurados |

### Ações recomendadas (links/descoberta)
1. Confirmar se Search Console e Bing Webmaster Tools estão ativos.
2. Solicitar indexação manual dos novos artigos quando publicar.
3. Buscar backlinks em blogs/portais de construção civil.

---

## 7. Resumo Executivo

### Pontos fortes do site
- Arquitetura limpa com Astro SSG
- SEO técnico bem resolvido (sitemap, canonical, schemas, NAP)
- Conteúdo relevante e bem estruturado para nicho local
- Performance visual boa (imagens com srcset, lazy load)

### Maiores gaps em relação às diretrizes do Google
1. **Google Business Profile inexistente** — impacto alto no SEO local
2. **Cache headers fracos** — pode prejudicar Core Web Vitals
3. **Reviews schema fictícios** — risco de não ser aceito em rich results
4. **Falta de sinais E-E-A-T fortes** — CNPJ, fotos reais, autor identificável
5. **Falta de páginas de cidade** — perde buscas locais específicas
6. **Links de tags do blog quebrados** — UX e crawl prejudicados

### Plano de ação priorizado

| Prioridade | Ação | Impacto esperado |
|---|---|---|
| 🔴 Crítica | Criar Google Business Profile | SEO local / pack local |
| 🔴 Crítica | Configurar cache no `vercel.json` | Core Web Vitals |
| 🟡 Alta | Adicionar `SearchAction` no schema `WebSite` | Rich results |
| 🟡 Alta | Corrigir links de tags do blog | UX e crawl |
| 🟡 Alta | Adicionar CNPJ + endereço real | E-E-A-T / confiança |
| 🟢 Média | Criar páginas de cidade | Long-tail local |
| 🟢 Média | Coletar reviews reais | Rich snippets |
| 🟢 Média | Listar em diretórios locais | Citações NAP |
| 🔵 Baixa | Criar página 404 customizada | UX |
| 🔵 Baixa | Self-host de fontes | LCP |

---

*Relatório gerado com base nas diretrizes oficiais do Google Search Central e inspeção do site ao vivo em 28/06/2026.*
