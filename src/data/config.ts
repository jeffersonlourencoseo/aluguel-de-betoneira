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
  url: 'https://alugueldebetoneira.com.br',
  ogImage: '/images/og-image.svg',

  // NAP (Name, Address, Phone) — CRITICO para SEO Local
  nap: {
    name: 'Aluguel de Betoneira',
    phone: '(11) 98765-4321',
    phoneRaw: '5511987654321',
    whatsapp: '5511987654321',
    email: 'contato@alugueldebetoneira.com.br',
    address: {
      street: 'Av. Paulista, 1000',
      neighborhood: 'Bela Vista',
      city: 'Sao Paulo',
      state: 'SP',
      zip: '01310-100',
      country: 'BR',
    },
  },

  // Geo-coordenadas (Google Maps)
  geo: {
    latitude: '-23.5505',
    longitude: '-46.6333',
  },

  // Horario de funcionamento
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '12:00' },
  ],

  // Redes sociais
  social: {
    whatsapp: 'https://wa.me/5511987654321',
    instagram: 'https://instagram.com/alugueldebetoneira',
  },

  // SEO
  keywords:
    'aluguel de betoneira, locacao de betoneira, betoneira para construcao civil, alugar betoneira 120L, alugar betoneira 150L, alugar betoneira 200L, aluguel de betoneira preco, locacao de equipamentos construcao civil',
  priceRange: '$$',
  areaServed: 'Regiao Metropolitana de Sao Paulo',

  // Fundacao
  founded: '2014',
} as const;

export type SiteConfig = typeof SITE_CONFIG;
