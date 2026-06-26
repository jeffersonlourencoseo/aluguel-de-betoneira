import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const source = resolve(distDir, 'sitemap-0.xml');
const target = resolve(distDir, 'sitemap.xml');

if (existsSync(source)) {
  const sitemapContent = readFileSync(source, 'utf-8');
  writeFileSync(target, sitemapContent, 'utf-8');
  console.log(`[postbuild] sitemap.xml created from sitemap-0.xml (${sitemapContent.split('<url>').length - 1} URLs)`);
} else {
  console.warn('[postbuild] sitemap-0.xml not found; skipping sitemap.xml copy');
}
