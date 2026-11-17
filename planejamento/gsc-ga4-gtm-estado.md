# Estado do GSC, GA4 e GTM (conferido em 16/11/2026)

## Search Console (propriedade de domínio alugueldebetoneirarj.com.br)
- Sitemaps: sitemap.xml e sitemap-index.xml enviados, leitura com sucesso, 22 páginas descobertas.
- Cliques: 39 em ~3 meses, subindo nas últimas semanas.
- Indexação: 19 indexadas, 27 não indexadas. Todas as não indexadas são URLs ANTIGAS (últimos rastreios em jun/jul 2026):
  - 404 (7): /blog/betoneira-eletrica-vs-gasolina/, /blog/calcular-volume-concreto/, /blog/como-escolher-betoneira/, /blog/nr18-seguranca-betoneira/, /blog/manutencao-betoneira/, /busca?q={search_term_string}, /~partytown/ -> artigos removidos; 404 é o correto. Revalidação pedida em 16/11/2026.
  - Rastreada e não indexada (5): /blog/quanto-custa-alugar-betoneira/, /blog/aluguel-betoneira-400-litros-preco/, /blog/aluguel-betoneira-perto-de-mim/ (hoje com redirecionamento 308 para o guia de preço / home), /rss.xml, /blog/?q={search_term_string}. Revalidação pedida em 16/11/2026.
  - Redirecionamento (7) e canônica alternativa (2): normal (http -> https, sem www -> www, barra final).
  - Detectada e não indexada (6): validação já aprovada.
- Ação futura: conferir em ~2 semanas se as validações passaram. Páginas novas (Santa Cruz, Nova Iguaçu) devem ser enviadas por Inspeção de URL após publicar.

## GA4 (propriedade "Aluguel de Betoneira RJ", ID 538695865, stream 14934834241)
- ATENÇÃO: ao abrir o GA4, ele cai na propriedade de outro cliente (Samir Trindade). Trocar a propriedade pela busca "betoneira".
- Recebendo dados: 16 usuários, 92 eventos, 26 visualizações em 7 dias; 16 das 18 sessões são Google orgânico.
- Teste em tempo real em 16/11/2026: visita à home gerou page_view, session_start e user_engagement.
- Eventos principais (conversões): marcados em 16/11/2026 -> clique_whatsapp e clique_telefone. (Antes: só os 3 padrão do Google sem dados.)
- envio_formulario: tag existe no GTM mas o evento ainda não chegou (o site não tem formulário real na home; o contato vai pelo WhatsApp). Não marcado.

## GTM (contêiner GTM-TZBXS6HT, conta Aluguel de Betoneira RJ)
- Tags: GA4 - Etiqueta Google (G-9BR79QVSZ4, All Pages), GA4 - Evento clique_telefone, GA4 - Evento clique_whatsapp, GA4 - Evento envio_formulario (acionadores de evento personalizado).
- Alerta "Qualidade do contêiner: Urgente": (1) "a etiqueta deixou de enviar dados nas últimas 48h" - falso/intermitente, o tempo real do GA4 recebe dados; (2) "adicione outro administrador" - recomendação.
- Pendente de decisão do cliente/Jefferson: adicionar um 2º administrador no GTM.
