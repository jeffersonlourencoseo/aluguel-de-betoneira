import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const source = resolve(distDir, 'sitemap-0.xml');
const target = resolve(distDir, 'sitemap.xml');
const vercelSource = resolve(process.cwd(), 'vercel.json');
const vercelTarget = resolve(distDir, 'vercel.json');

if (!existsSync(distDir)) {
  console.error('[postbuild] dist/ directory not found; skipping postbuild.');
  process.exit(0);
}

// Copy sitemap-0.xml to sitemap.xml for Google/Bing submission
if (existsSync(source)) {
  const sitemapContent = readFileSync(source, 'utf-8');
  writeFileSync(target, sitemapContent, 'utf-8');
  const urlCount = sitemapContent.split('<url>').length - 1;
  console.log(`[postbuild] sitemap.xml created from sitemap-0.xml (${urlCount} URLs)`);
} else {
  console.warn('[postbuild] sitemap-0.xml not found; skipping sitemap.xml copy');
}

// Copy vercel.json to dist/ so headers/routes are deployed correctly
if (existsSync(vercelSource)) {
  copyFileSync(vercelSource, vercelTarget);
  console.log('[postbuild] vercel.json copied to dist/');
} else {
  console.warn('[postbuild] vercel.json not found in project root');
}
