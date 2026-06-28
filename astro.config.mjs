// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import compress from '@playform/compress';
import partytown from '@astrojs/partytown';

const siteUrl = 'https://www.alugueldebetoneirarj.com.br';

const pageRules = {
  [siteUrl + '/']: { priority: 1.0, changefreq: ChangeFreqEnum.DAILY },
  [siteUrl + '/servicos/']: { priority: 0.85, changefreq: ChangeFreqEnum.WEEKLY },
  [siteUrl + '/blog/']: { priority: 0.85, changefreq: ChangeFreqEnum.WEEKLY },
};

/** @param {import('@astrojs/sitemap').SitemapItem} item */
function serializeSitemap(item) {
  const url = item.url;

  let changefreq = ChangeFreqEnum.MONTHLY;
  let priority = 0.6;

  if (pageRules[url]) {
    priority = pageRules[url].priority;
    changefreq = pageRules[url].changefreq;
  } else if (url.includes('/servicos/')) {
    priority = 0.9;
    changefreq = ChangeFreqEnum.WEEKLY;
  } else if (url.includes('/blog/')) {
    priority = 0.8;
    changefreq = ChangeFreqEnum.MONTHLY;
  }

  item.priority = priority;
  item.changefreq = changefreq;

  return item;
}

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      lastmod: new Date(),
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 0.7,
      serialize: serializeSitemap,
    }),
    compress(),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),
  ],
});
