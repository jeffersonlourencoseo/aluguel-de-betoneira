// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.alugueldebetoneirarj.com.br',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const url = item.url;
        if (url === 'https://www.alugueldebetoneirarj.com.br/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (url.includes('/servicos/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (url === 'https://www.alugueldebetoneirarj.com.br/blog/' || url === 'https://www.alugueldebetoneirarj.com.br/servicos/') {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
    compress(),
    partytown(),
  ],
});
