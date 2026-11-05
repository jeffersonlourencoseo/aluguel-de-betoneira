// Confere o dist: titles/metas, JSON-LD, WhatsApp, hierarquia de titulos, imagens.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_CONFIG, whatsappUrl } from '../src/data/config.ts';

function walk(d) { return readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; }); }
const files = walk('dist');
const vercel = JSON.parse(readFileSync('vercel.json', 'utf-8'));
const redirSrc = new Set(vercel.redirects.map((r) => r.source));
// redirecionamentos: destino existe
for (const r of vercel.redirects) {
  const d = r.destination;
  if (d.includes(':')) continue;
  const ok = d === '/' || existsSync(join('dist', d, d.endsWith('/') ? 'index.html' : '')) || existsSync(join('dist', d));
  if (!ok) console.log('X redirect com destino inexistente:', r.source, '->', d);
}
// sitemap nao pode ter URL antiga
const smap = readFileSync('dist/sitemap-0.xml', 'utf-8');
for (const r of vercel.redirects) if (smap.includes('.br' + r.source + '</loc>')) console.log('X sitemap contem URL redirecionada:', r.source);
let problemas = 0;
const rows = [];
for (const f of files) {
  const h = readFileSync(f, 'utf-8');
  const title = h.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
  const dm = h.match(/<meta content=(?:"([^"]*)"|([^>\s]*)) name="?description"?/);
  const desc = (dm?.[1] ?? dm?.[2] ?? '').replace(/&amp;/g, '&');
  const ld = [...h.matchAll(/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/gs)].map((m) => m[1]);
  const msgs = [];
  if (title.length < 50 || title.length > 60) msgs.push(`title ${title.length}`);
  if (desc.length < 150 || desc.length > 160) msgs.push(`desc ${desc.length}`);
  if (ld.length !== 1) msgs.push(`jsonld=${ld.length}`);
  else {
    const j = JSON.parse(ld[0]);
    if (!j['@graph']) msgs.push('sem @graph');
    const types = j['@graph'].map((n) => n['@type']);
    const lb = types.filter((t) => t === 'LocalBusiness').length;
    if (lb !== 1) msgs.push(`LocalBusiness x${lb}`);
    if (/aggregateRating|"Review"|HowTo/.test(ld[0])) msgs.push('Review/HowTo no schema!');
    const faq = j['@graph'].find((n) => n['@type'] === 'FAQPage');
    if (faq) {
      const vis = h.replace(/<script[^>]*ld\+json[^>]*>.*?<\/script>/gs, '').replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
      for (const q of faq.mainEntity) {
        if (!vis.includes(q.name) || !vis.includes(q.acceptedAnswer.text)) { msgs.push('FAQ do schema nao visivel: ' + q.name.slice(0, 40)); }
      }
    }
    if (/aggregateRating|"Review"|HowTo|"Product"/.test(ld[0])) msgs.push('tipo proibido no schema');
    rows.push(`${f.replace(/^dist[\\/]/, '')}: ${types.join(',')}`);
  }
  // WhatsApp
  for (const m of h.matchAll(/<a\b[^>]*>/g)) {
    const tag = m[0];
    if (/wa\.me/.test(tag)) {
      if (!tag.includes(whatsappUrl.replace(/&/g, '&amp;')) && !tag.includes(whatsappUrl)) msgs.push('wa url diferente');
      if (!/data-evento="?clique_whatsapp/.test(tag) || !/data-local=/.test(tag)) msgs.push('wa sem data-evento/local');
    }
    if (/href="?tel:/.test(tag) && !/data-evento="?clique_telefone/.test(tag)) msgs.push('tel sem evento');
  }
  // headings
  const hs = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  let prev = 0;
  for (const n of hs) { if (prev && n > prev + 1) { msgs.push(`salto h${prev}>h${n}`); break; } prev = n; }
  if (hs.filter((n) => n === 1).length !== 1) msgs.push(`h1 x${hs.filter((n) => n === 1).length}`);
  // imagens
  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    if (!/width=/.test(m[0]) || !/height=/.test(m[0])) msgs.push('img sem w/h');
    if (!/alt=/.test(m[0])) msgs.push('img sem alt');
    if (/\.jpe?g/.test(m[0])) msgs.push('img jpg');
  }
  if (/fonts\.googleapis/.test(h)) msgs.push('google fonts');
  // links internos: existem no dist e nao passam por redirect
  for (const m of h.matchAll(/<a[^>]*?href=(?:"([^"]*)"|([^\s>]*))/g)) {
    const href = (m[1] ?? m[2] ?? '').split('#')[0].split('?')[0];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (redirSrc.has(href)) { msgs.push('link passa por 301: ' + href); continue; }
    const alvo = join('dist', href, href.endsWith('/') ? 'index.html' : '');
    const direto = join('dist', href);
    if (!existsSync(alvo) && !(existsSync(direto) && statSync(direto).isFile())) msgs.push('link quebrado: ' + href);
  }
  if (msgs.length) { problemas++; console.log('X', f, [...new Set(msgs)].join(' | ')); }
}
console.log(rows.join('\n'));
console.log(`\n${files.length} paginas, ${problemas} com problema`);
