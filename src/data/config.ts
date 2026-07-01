/**
 * CEREBRO DO SITE — Central de Dados da Empresa
 * Todas as informacoes de NAP, contato e configuracoes globais.
 * Altere aqui para refletir em TODO o site, SEO e Schema.org.
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Aluguel de Betoneira',
  tagline: 'Locacao de Betoneiras para Construcao Civil',
  description:
    'Aluguel de betoneira com entrega rapida e preco justo. Locacao de betoneiras 120L, 150L, 200L e 400L revisadas. Solicite orcamento gratis!',

  // URLs
  url: 'https://www.alugueldebetoneirarj.com.br',
  ogImage: '/images/og-image.jpg',

  // NAP (Name, Address, Phone) — CRITICO para SEO Local
  nap: {
    name: 'Aluguel de Betoneira',
    phone: '(21) 99775-1577',
    phoneRaw: '5521997751577',
    whatsapp: '5521997751577',
    email: 'contato@alugueldebetoneirarj.com.br',
    address: {
      street: 'Av. Brasil, 11201',
      neighborhood: 'Penha Circular',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zip: '21012-351',
      country: 'BR',
    },
  },

  // Geo-coordenadas (Google Maps) — Penha Circular, Rio de Janeiro
  geo: {
    latitude: '-22.8235',
    longitude: '-43.2848',
  },

  // Horario de funcionamento
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '12:00' },
  ],

  // Redes sociais
  social: {
    whatsapp: 'https://wa.me/5521997751577?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!',
  },

  // SEO
  keywords:
    'aluguel de betoneira, locacao de betoneira, betoneira para construcao civil, alugar betoneira 120L, alugar betoneira 150L, alugar betoneira 200L, aluguel de betoneira preco, locacao de equipamentos construcao civil',
  priceRange: '$$',
  areaServed: 'Rio de Janeiro',
  areaServedCities: ['Rio de Janeiro'],

  // Fundacao
  founded: '2014',
} as const;

export type SiteConfig = typeof SITE_CONFIG;
