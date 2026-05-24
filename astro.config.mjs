// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.alugueldebetoneirarj.com.br',
  integrations: [
    tailwind(),
    sitemap(),
    compress(),
    partytown(),
  ],
});
