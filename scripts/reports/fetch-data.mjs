import { google } from 'googleapis';
import analyticsData from '@google-analytics/data';
const { BetaAnalyticsDataClient } = analyticsData;
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || '';
const GSC_SITE_URL = process.env.GSC_SITE_URL || 'https://alugueldebetoneirarj.com.br/';
const DAYS = Number(process.env.REPORT_DAYS || '28');
const KEY_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || resolve(ROOT, '.service-account.json');

if (!existsSync(KEY_PATH)) {
  console.error(`Chave de service account não encontrada: ${KEY_PATH}`);
  process.exit(1);
}

const key = JSON.parse(readFileSync(KEY_PATH, 'utf8'));

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getDateRange(days) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  return { start: formatDate(start), end: formatDate(end) };
}

const { start, end } = getDateRange(DAYS);

const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/analytics.readonly',
  ],
});

const searchconsole = google.webmasters({ version: 'v3', auth });

async function resolveGscSiteUrl() {
  try {
    const { data } = await searchconsole.sites.list();
    const entries = data.siteEntry || [];
    const match = entries.find((entry) =>
      entry.siteUrl.includes('alugueldebetoneirarj.com.br'),
    );
    if (match) return match.siteUrl;
  } catch (err) {
    console.warn('Não foi possível listar sites do GSC:', err.message);
  }
  return GSC_SITE_URL;
}

async function fetchGSC(siteUrl) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: start,
      endDate: end,
      dimensions: ['query'],
      rowLimit: 50,
      startRow: 0,
    },
  });

  return (res.data.rows || []).map((row) => ({
    query: row.keys[0],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: ((row.ctr || 0) * 100).toFixed(2),
    position: (row.position || 0).toFixed(1),
  }));
}

async function fetchGA4() {
  if (!GA4_PROPERTY_ID) {
    console.warn('GA4_PROPERTY_ID não configurado. Pulando Analytics.');
    return null;
  }

  const analytics = new BetaAnalyticsDataClient({ credentials: key });
  const [response] = await analytics.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    dateRanges: [{ startDate: start, endDate: end }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'averageSessionDuration' },
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 20,
  });

  return (response.rows || []).map((row) => ({
    page: row.dimensionValues[0].value,
    views: row.metricValues[0].value,
    sessions: row.metricValues[1].value,
    users: row.metricValues[2].value,
    avgSessionDurationSeconds: row.metricValues[3].value,
  }));
}

async function fetchTrafficSources() {
  if (!GA4_PROPERTY_ID) return null;

  const analytics = new BetaAnalyticsDataClient({ credentials: key });
  const [response] = await analytics.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    dateRanges: [{ startDate: start, endDate: end }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'screenPageViews' },
    ],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
  });

  return (response.rows || []).map((row) => ({
    channel: row.dimensionValues[0].value,
    sessions: row.metricValues[0].value,
    users: row.metricValues[1].value,
    views: row.metricValues[2].value,
  }));
}

function formatSeconds(seconds) {
  const s = Number(seconds);
  if (Number.isNaN(s)) return '0s';
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return m > 0 ? `${m}m ${r}s` : `${r}s`;
}

function buildReport(gsc, ga4, sources) {
  const totalClicks = gsc.reduce((sum, r) => sum + Number(r.clicks), 0);
  const totalImpressions = gsc.reduce((sum, r) => sum + Number(r.impressions), 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const avgPosition = gsc.length > 0
    ? (gsc.reduce((sum, r) => sum + Number(r.position), 0) / gsc.length).toFixed(1)
    : '0.0';

  let lines = [
    '# Relatório SEO - Aluguel de Betoneira',
    '',
    `Período: ${start} a ${end} (${DAYS} dias)`,
    '',
    '## Resumo Google Search Console',
    '',
    '| Métrica | Valor |',
    '|---------|-------|',
    `| Cliques totais | ${totalClicks} |`,
    `| Impressões totais | ${totalImpressions} |`,
    `| CTR médio | ${avgCtr}% |`,
    `| Posição média | ${avgPosition} |`,
    '',
    '## Top 20 palavras-chave',
    '',
    '| Palavra-chave | Cliques | Impressões | CTR | Posição |',
    '|---------------|---------|------------|-----|---------|',
  ];

  gsc.slice(0, 20).forEach((row) => {
    lines.push(`| ${row.query} | ${row.clicks} | ${row.impressions} | ${row.ctr}% | ${row.position} |`);
  });

  if (ga4) {
    const totalViews = ga4.reduce((sum, r) => sum + Number(r.views), 0);
    const totalSessions = ga4.reduce((sum, r) => sum + Number(r.sessions), 0);
    const totalUsers = ga4.reduce((sum, r) => sum + Number(r.users), 0);

    lines.push(
      '',
      '## Resumo Google Analytics 4',
      '',
      '| Métrica | Valor |',
      '|---------|-------|',
      `| Visualizações de página | ${totalViews} |`,
      `| Sessões | ${totalSessions} |`,
      `| Usuários ativos | ${totalUsers} |`,
      '',
      '## Top 15 páginas mais visitadas',
      '',
      '| Página | Visualizações | Sessões | Usuários | Tempo médio/sessão |',
      '|--------|---------------|---------|----------|---------------------|',
    );

    ga4.slice(0, 15).forEach((row) => {
      lines.push(`| ${row.page} | ${row.views} | ${row.sessions} | ${row.users} | ${formatSeconds(row.avgSessionDurationSeconds)} |`);
    });
  }

  if (sources) {
    lines.push(
      '',
      '## Origens do tráfego',
      '',
      '| Canal | Sessões | Usuários | Visualizações |',
      '|-------|---------|----------|---------------|',
    );

    sources.forEach((row) => {
      lines.push(`| ${row.channel} | ${row.sessions} | ${row.users} | ${row.views} |`);
    });
  }

  lines.push('', '---', '', '*Relatório gerado automaticamente via Google APIs*');

  return lines.join('\n');
}

async function main() {
  try {
    const siteUrl = await resolveGscSiteUrl();
    console.log(`Consultando GSC para: ${siteUrl}`);
    const [gsc, ga4, sources] = await Promise.all([
      fetchGSC(siteUrl),
      fetchGA4(),
      fetchTrafficSources(),
    ]);
    const report = buildReport(gsc, ga4, sources);
    const outputPath = resolve(ROOT, 'reports', `seo-report-${end}.md`);

    import('node:fs').then(({ mkdirSync, writeFileSync }) => {
      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, report, 'utf8');
      console.log(`Relatório salvo em: ${outputPath}`);
      console.log('\n' + report);
    });
  } catch (err) {
    console.error('Erro ao gerar relatório:', err.message);
    console.error(err);
    if (err.response?.data) {
      console.error(JSON.stringify(err.response.data, null, 2));
    }
    process.exit(1);
  }
}

main();
