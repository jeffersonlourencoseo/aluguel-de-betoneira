import { readFileSync, writeFileSync, existsSync, copyFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const sitemap0 = resolve(distDir, 'sitemap-0.xml');
const sitemapIndex = resolve(distDir, 'sitemap-index.xml');
const sitemapTarget = resolve(distDir, 'sitemap.xml');
const vercelSource = resolve(process.cwd(), 'vercel.json');
const vercelTarget = resolve(distDir, 'vercel.json');

if (!existsSync(distDir)) {
  console.error('[postbuild] dist/ directory not found; skipping postbuild.');
  process.exit(0);
}

// Astro sitemap with entryLimit >= page count generates only sitemap-index.xml + sitemap-0.xml.
// We consolidate to a single /sitemap.xml and redirect the others via vercel.json.
if (existsSync(sitemap0)) {
  const sitemapContent = readFileSync(sitemap0, 'utf-8');
  writeFileSync(sitemapTarget, sitemapContent, 'utf-8');
  const urlCount = sitemapContent.split('<url>').length - 1;
  console.log(`[postbuild] sitemap.xml created from sitemap-0.xml (${urlCount} URLs)`);

  // Remove the duplicate files so only /sitemap.xml is exposed
  try {
    unlinkSync(sitemap0);
    if (existsSync(sitemapIndex)) unlinkSync(sitemapIndex);
    console.log('[postbuild] removed duplicate sitemap-0.xml and sitemap-index.xml');
  } catch (err) {
    console.warn('[postbuild] could not remove duplicate sitemap files:', err.message);
  }
} else if (!existsSync(sitemapTarget)) {
  console.warn('[postbuild] sitemap-0.xml not found and no sitemap.xml exists; skipping sitemap consolidation');
}

// Copy vercel.json to dist/ so headers/routes are deployed correctly
if (existsSync(vercelSource)) {
  copyFileSync(vercelSource, vercelTarget);
  console.log('[postbuild] vercel.json copied to dist/');
} else {
  console.warn('[postbuild] vercel.json not found in project root');
}
