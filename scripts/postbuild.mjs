import { existsSync, copyFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const vercelSource = resolve(process.cwd(), 'vercel.json');
const vercelTarget = resolve(distDir, 'vercel.json');

if (!existsSync(distDir)) {
  console.error('[postbuild] dist/ nao encontrado; nada a fazer.');
  process.exit(0);
}

// O Astro gera sitemap-index.xml (indice valido) apontando para sitemap-0.xml. Sem redirects.
for (const f of ['sitemap-index.xml', 'sitemap-0.xml']) {
  if (!existsSync(resolve(distDir, f))) console.warn(`[postbuild] AVISO: ${f} nao foi gerado`);
}
const urls = readFileSync(resolve(distDir, 'sitemap-0.xml'), 'utf-8').split('<url>').length - 1;
console.log(`[postbuild] sitemap-index.xml + sitemap-0.xml ok (${urls} URLs)`);

// Copia vercel.json para dist/
if (existsSync(vercelSource)) {
  copyFileSync(vercelSource, vercelTarget);
  console.log('[postbuild] vercel.json copiado para dist/');
}
