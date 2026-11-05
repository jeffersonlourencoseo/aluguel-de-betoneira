// Calcula o lastmod real de cada URL para o sitemap.
// Posts: updatedDate ou pubDate do frontmatter. Servicos e paginas fixas:
// data do ultimo commit do arquivo (git log); se o arquivo tem alteracao ainda nao
// commitada (ou nao ha git), usa a data de modificacao do arquivo.
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();

function gitDate(rel) {
  const abs = resolve(root, rel);
  if (!existsSync(abs)) return null;
  const mtime = statSync(abs).mtime;
  try {
    const dirty = execSync(`git status --porcelain -- "${rel}"`, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (dirty) return mtime;
    const out = execSync(`git log -1 --format=%cI -- "${rel}"`, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return out ? new Date(out) : mtime;
  } catch {
    return mtime;
  }
}

function frontmatterDate(rel) {
  const txt = readFileSync(resolve(root, rel), 'utf-8');
  const fm = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const upd = fm.match(/^updatedDate:\s*["']?([\d-]+)/m)?.[1];
  const pub = fm.match(/^pubDate:\s*["']?([\d-]+)/m)?.[1];
  const d = upd || pub;
  return d ? new Date(d + 'T12:00:00-03:00') : gitDate(rel);
}

const latest = (dates) => new Date(Math.max(...dates.filter(Boolean).map((d) => d.getTime())));
const list = (dir) => readdirSync(resolve(root, dir)).filter((f) => f.endsWith('.md')).map((f) => `${dir}/${f}`);

export function buildLastmodMap(siteUrl) {
  const map = {};
  const posts = list('src/content/blog');
  const servicos = list('src/content/servicos');
  const atuacoes = list('src/content/atuacao');
  const postDates = posts.map(frontmatterDate);
  const servDates = servicos.map(gitDate);

  for (const f of posts) map[`${siteUrl}/blog/${f.split('/').pop().replace(/\.md$/, '')}/`] = frontmatterDate(f);
  for (const f of servicos) map[`${siteUrl}/servicos/${f.split('/').pop().replace(/\.md$/, '')}/`] = gitDate(f);

  for (const f of atuacoes) map[`${siteUrl}/atuacao/${f.split('/').pop().replace(/\.md$/, '')}/`] = gitDate(f);

  map[`${siteUrl}/`] = latest([gitDate('src/pages/index.astro'), ...servDates]);
  map[`${siteUrl}/servicos/`] = latest([gitDate('src/pages/servicos/index.astro'), ...servDates]);
  map[`${siteUrl}/blog/`] = latest([gitDate('src/pages/blog/index.astro'), ...postDates]);
  map[`${siteUrl}/sobre/`] = gitDate('src/pages/sobre.astro');
  map[`${siteUrl}/contato/`] = gitDate('src/pages/contato.astro');
  map[`${siteUrl}/calculadora-de-concreto/`] = latest([gitDate('src/pages/calculadora-de-concreto.astro'), gitDate('public/js/calculadora-concreto.js')]);
  map[`${siteUrl}/privacidade/`] = gitDate('src/pages/privacidade.astro');
  map[`${siteUrl}/termos/`] = gitDate('src/pages/termos.astro');
  return map;
}
