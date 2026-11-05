// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { buildLastmodMap } from './scripts/lastmod.mjs';
import compress from '@playform/compress';
import remarkWhatsapp from './src/plugins/remark-whatsapp.mjs';

const siteUrl = 'https://www.alugueldebetoneirarj.com.br';

const lastmodMap = buildLastmodMap(siteUrl);

/** lastmod real por URL; sem changefreq/priority (o Google ignora). */
/** @param {import('@astrojs/sitemap').SitemapItem} item */
function serializeSitemap(item) {
  const d = lastmodMap[item.url];
  if (d) item.lastmod = d.toISOString();
  return item;
}

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkWhatsapp],
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: serializeSitemap,
      entryLimit: 50000,
    }),
    compress(),
  ],
});
