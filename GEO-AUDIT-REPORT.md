# GEO Audit — alugueldebetoneirarj.com.br

**Data da auditoria:** 30/06/2026  
**Consultor:** GEO-SEO Analysis Tool (Claude Code Skill)  
**Site auditado:** https://alugueldebetoneirarj.com.br  
**Domínio canônico:** https://www.alugueldebetoneirarj.com.br  
**Tipo de negócio:** Serviço Local — Locação de Betoneiras (Rio de Janeiro / Grande Rio)  
**Páginas no sitemap:** 17 URLs

---

## Resumo Executivo

A **Aluguel de Betoneira** possui uma base digital sólida para um serviço local: site rápido (Astro estático), schemas de `LocalBusiness` presentes, sitemap atualizado, CTAs de WhatsApp claros e uma calculadora de concreto que funciona como ativo de conteúdo. No entanto, o site ainda está **mal preparado para ser citado com confiança por motores de IA** por falta de sinais verificáveis de E-E-A-T, preços estruturados, avaliações marcadas e menções de marca fora do próprio site.

**GEO Score composto: 59/100**

A maior parte do ganho imediato virá de: (1) schemas de `FAQPage`, `Product`/`Offer` e `BlogPosting`; (2) publicação de faixas de preço; (3) criação de `llms.txt`; e (4) construção de páginas locais por região do Rio.

---

## Pontuação por Categoria

| Categoria | Peso | Nota | Peso × Nota |
|-----------|------|------|-------------|
| AI Citability & Visibility | 25% | 72/100 | 18,0 |
| Brand Authority Signals | 20% | 35/100 | 7,0 |
| Content Quality & E-E-A-T | 20% | 58/100 | 11,6 |
| Technical Foundations | 15% | 82/100 | 12,3 |
| Structured Data | 10% | 47/100 | 4,7 |
| Platform Optimization | 10% | 58/100 | 5,8 |
| **GEO Score** | **100%** | — | **59,4 → 59/100** |

Legenda:  
🟢 80-100 · 🔵 60-79 · 🟡 40-59 · 🟠 20-39 · 🔴 0-19

---

## 1. AI Citability & Visibility — 72/100 🔵

### Pontos fortes
- `robots.txt` aberto (`User-agent: * Allow: /`) e sitemap apontado corretamente.
- Sem bloqueios a `ChatGPT-User`, `PerplexityBot`, `Google-Extended` ou `Perplexity Sonar`.
- `LocalBusiness`, `WebSite`, `Organization` e `BreadcrumbList` JSON-LD na homepage.
- Páginas de equipamento por capacidade (120L, 150L, 200L, 400L), calculadora de concreto e artigos de blog direcionados a prompts de preço.
- Meta geo (`BR-RJ`, `geo.placename`, `ICBM`) e canonical consistente com `www`.

### Gaps críticos
- **Sem `llms.txt`:** retorna 404. É a principal oportunidade de enviar sinais diretos para LLMs.
- **Preços não estruturados:** `priceRange` é `"$$"`, sem `Offer` com `price` nos equipamentos.
- **`areaServed` genérico:** apenas `"Rio de Janeiro e Grande Rio"`, sem lista de cidades (`City`).
- **Sem `FAQPage`:** a homepage tem 4 FAQs reais, mas nenhuma schema `Question`/`Answer`.
- **Sem `Service` / `Product`:** páginas de equipamento não têm schema específico.

### Ações prioritárias
1. Criar `/llms.txt` com overview do negócio, catálogo de equipamentos, área de atendimento e diretrizes de citação.
2. Adicionar `FAQPage` na homepage.
3. Implementar `Product` + `Offer` em cada página de equipamento.
4. Estruturar `areaServed` com lista de cidades ou `GeoCircle`.

---

## 2. Brand Authority Signals — 35/100 🟠

### Pontos fortes
- Presença ativa no Instagram: `@alugueldebetoneira`.
- Nome de marca claro e repetido no site.

### Gaps críticos
- **Nenhuma menção detectada** em Reddit, YouTube, Wikipedia ou LinkedIn.
- Depoimentos na homepage são genéricos e sem fonte verificável.
- Sem links de autoridade local ou parcerias visíveis (Sinduscon, ABNT, CREA, associações).
- Google Business Profile não pôde ser verificado nesta sessão.

### Ações prioritárias
1. Criar perfil/otimizar **Google Business Profile** com NAP consistente e solicitar reviews.
2. Publicar **vídeos curtos no YouTube** (ex.: "como usar betoneira 400L", "entrega em 2h no RJ").
3. Participar de **comunidades de construção civil** (Reddit, grupos de Facebook) com respostas úteis assinadas pela marca.
4. Listar empresa em **diretórios locais** (Achei, GuiaMais, ListaTel) com menção e link.
5. Tornar depoimentos verificáveis (link para Google Reviews ou Reclame Aqui).

---

## 3. Content Quality & E-E-A-T — 58/100 🟡

| Dimensão | Nota |
|----------|------|
| Experience (Experiência) | 58/100 |
| Expertise (Especialidade) | 62/100 |
| Authoritativeness (Autoridade) | 50/100 |
| Trustworthiness (Confiança) | 60/100 |
| **Média** | **58/100** |

### Pontos fortes
- Páginas de serviço com especificações técnicas (capacidade, motor, peso, produção m³/dia).
- Calculadora de concreto é um ativo útil e citável.
- Blog cobre preços, locais próximos, aluguel mensal e capacidades.
- Sinais locais fortes: lista de cidades e bairros atendidos.
- FAQ responde perguntas comuns (prazo mínimo, entrega, pagamento, garantia).

### Gaps críticos
- **Autoria fraca:** todas as bylines são "Aluguel de Betoneira" (marca), sem `Person` com credenciais.
- **Depoimentos não verificáveis:** sem fonte externa, fotos ou detalhes de projeto.
- **Sem páginas locais dedicadas:** cidades são apenas listadas; não há `/aluguel-betoneira-niteroi/` etc.
- **Inconsistência:** artigo "Guia Completo de Preços 2026" contém seção com referência a "2024".
- **Sem citações externas:** normas NR-18 e cálculos não são linkados para fontes oficiais.

### Ações prioritárias
1. Criar página de autor com `Person` schema, foto e credenciais na construção civil.
2. Adicionar CNPJ/razão social e link para Google Reviews/Reclame Aqui.
3. Criar **hub de páginas locais** (Niterói, São Gonçalo, Duque de Caxias, Nova Iguaçu, Penha, Barra).
4. Corrigir referência "2024" no artigo de preços 2026 e adicionar data de "última atualização".
5. Incluir fontes externas oficiais em posts técnicos.

---

## 4. Technical Foundations — 82/100 🟢

### Pontos fortes
- Redirecionamento `non-www → www` via 308.
- `robots.txt`, sitemap, canonicals e meta robots corretos.
- Astro v4.16.19 com geração estática.
- Preload de imagem hero com `srcset` responsivo.
- GTM carregado via Partytown (web worker).
- HTTPS com HSTS, headers de segurança (`X-Frame-Options: DENY`, `X-Content-Type-Options`, `Permissions-Policy`).
- Cache de assets com `max-age=31536000, immutable`.
- TTFB ~145 ms no edge GRU.

### Riscos identificados
- **Trailing-slash duplicado:** `/servicos` e `/servicos/` retornam 200 (mesmo conteúdo). Deveria haver 301 para a versão canônica.
- **Sitemaps duplicados:** `/sitemap.xml` e `/sitemap-0.xml` são idênticos; `/sitemap-index.xml` existe mas não é referenciado.
- **NAP pouco visível no corpo da homepage:** endereço e telefone aparecem no schema e rodapé, mas não em texto de destaque.
- **BreadcrumbList raso:** apenas um item na homepage; internas sem breadcrumb schema.
- **Todos os `lastmod` iguais:** reduz sinal de frescor.

### Ações prioritárias
1. Forçar redirecionamento 301 de URLs sem trailing slash para a versão com `/` no `vercel.json`.
2. Consolidar sitemap: manter apenas `/sitemap.xml` e redirecionar `/sitemap-0.xml`.
3. Adicionar bloco NAP visível na homepage (`Av. Brasil, 11201 - Penha Circular, Rio de Janeiro - RJ, 21012-351`).
4. Implementar `BreadcrumbList` completo em páginas internas.
5. Atualizar `lastmod` real por página no build.

---

## 5. Structured Data — 47/100 🟡

### Schemas presentes
- `LocalBusiness` na homepage (bem estruturado).
- `Organization`, `WebSite` + `SearchAction`, `BreadcrumbList` (homepage, raso).

### Schemas ausentes (prioridade)
1. `FAQPage` na homepage — impacto imediato em rich results.
2. `Product` + `Offer` em `/servicos/betoneira-120l/` (e 150L, 200L, 400L).
3. `hasOfferCatalog` no `LocalBusiness` para ligar os equipamentos.
4. `BlogPosting` / `Article` nos posts do blog.
5. `AggregateRating` + `Review` nos depoimentos.
6. `ContactPage` e `AboutPage` em `/contato/` e `/sobre/`.
7. `BreadcrumbList` completo nas páginas internas.

### Pontos de atenção
- `telephone` no `LocalBusiness` está como `(21) 99775-1577`. Padronizar para E.164 (`+5521997751577`).
- `areaServed` genérico; melhorar para lista de `City`.
- `SearchAction` aponta para `/blog/?q={search_term_string}` — verificar se a busca funciona.

Templates JSON-LD prontos foram gerados no relatório detalhado do subagente e podem ser inseridos no código.

---

## 6. Platform Optimization — 58/100 🟡

| Plataforma | Nota |
|------------|------|
| Google AI Overviews / Search | 62/100 |
| ChatGPT / Bing Copilot | 58/100 |
| Perplexity | 52/100 |

### Google AI Overviews
Bom potencial por causa do `LocalBusiness` e geo tags. Faltam `AggregateRating`, preços estruturados e `areaServed` granular.

### ChatGPT / Bing Copilot
Proposta de valor clara, mas sem dados concretos (frota, número de clientes, preços). A calculadora é um diferencial citável.

### Perplexity
Artigos respondem perguntas de preço, mas falta autoridade: sem fontes externas, autores credenciados ou metodologia transparente.

### Ações prioritárias
1. Publicar faixas de preço visíveis (`a partir de R$ X/dia`).
2. Adicionar bloco de fatos rápidos na homepage (frota, tempo médio de entrega, obras atendidas).
3. Criar autor `Person` com credenciais e adicionar fontes externas nos artigos.
4. Otimizar Google Business Profile e vincular reviews.

---

## Plano de Ação Priorizado (30-60-90 dias)

### Semanas 1-2 — Quick Wins
| # | Ação | Impacto | Esforço |
|---|------|---------|---------|
| 1 | Criar `/llms.txt` e adicionar link no rodapé | Alto | Baixo |
| 2 | Adicionar `FAQPage` schema na homepage | Alto | Baixo |
| 3 | Marcar depoimentos com `AggregateRating` + `Review` | Médio | Baixo |
| 4 | Corrigir redirecionamento trailing slash no `vercel.json` | Médio | Baixo |
| 5 | Consolidar sitemap duplicado | Médio | Baixo |
| 6 | Corrigir referência "2024" no artigo de preços 2026 | Médio | Baixo |

### Semanas 3-6 — Ganhos Estruturais
| # | Ação | Impacto | Esforço |
|---|------|---------|---------|
| 7 | Implementar `Product` + `Offer` nas páginas de equipamento | Alto | Médio |
| 8 | Adicionar `hasOfferCatalog` ao `LocalBusiness` | Alto | Médio |
| 9 | Criar `BlogPosting` / `Article` schema para todos os posts | Médio | Médio |
| 10 | Adicionar `BreadcrumbList` completo nas internas | Médio | Baixo |
| 11 | Criar `ContactPage` e `AboutPage` schemas | Médio | Baixo |
| 12 | Publicar faixas de preço nos equipamentos e no schema | Alto | Médio |

### Semanas 7-12 — Autoridade & GEO avançado
| # | Ação | Impacto | Esforço |
|---|------|---------|---------|
| 13 | Criar hub de páginas locais por região do RJ | Alto | Alto |
| 14 | Criar página de autor `Person` com credenciais | Alto | Médio |
| 15 | Otimizar Google Business Profile e gerar reviews | Alto | Médio |
| 16 | Produzir vídeos no YouTube e posts em comunidades | Médio | Alto |
| 17 | Adicionar fontes externas (ABNT, Sinduscon, etc.) nos posts | Médio | Médio |
| 18 | Listar empresa em diretórios locais | Médio | Médio |

---

## Verificações Realizadas Nesta Sessão

| Verificação | Resultado | Evidência |
|-------------|-----------|-----------|
| Site responde (homepage) | ✅ 200 | `curl -I` retornou 308 → 200 em `www` |
| robots.txt | ✅ OK | `User-agent: * Allow: /` + sitemap |
| sitemap.xml | ✅ 17 URLs | Última modificação 2026-06-28 |
| non-www → www | ✅ 308 | Redirecionamento consistente |
| Trailing slash duplicado | ⚠️ Risco | `/servicos` e `/servicos/` ambos 200 |
| `llms.txt` | ❌ Não existe | Retornou 404 |
| Schemas na homepage | ✅ LocalBusiness, WebSite, Organization, BreadcrumbList | Extraídos do HTML |
| Headers de segurança | ✅ HSTS, X-Frame, X-Content-Type, Permissions-Policy | Verificado via `curl -I` |
| TTFB | ✅ ~145 ms | Edge GRU |
| Google Business Profile | ❌ Não verificado | Login não disponível |

---

## Disclaimer

- Este relatório é baseado em análise automatizada + subagentes paralelos em 30/06/2026.
- Schemas gerados devem ser validados no [Schema Markup Validator](https://validator.schema.org/) e no [Google Rich Results Test](https://search.google.com/test/rich-results) antes do deploy.
- Para validação final no Google Search, recomenda-se usar o Search Console e solicitar indexação das páginas alteradas.

---

*Gerado com GEO-SEO Analysis Tool — Claude Code Skill*
