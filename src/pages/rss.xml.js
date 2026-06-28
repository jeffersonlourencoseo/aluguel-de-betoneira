import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../data/config';

export async function GET() {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${SITE_CONFIG.url}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/blog/${post.slug}/</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.description)}</description>
    </item>
  `
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)} - Blog</title>
    <link>${SITE_CONFIG.url}/</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
