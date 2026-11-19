import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
const ROOT = '/tmp/site', OUT = '/home/claude/tools-boss/shots', PORT = 8811; fs.mkdirSync(OUT, { recursive: true });
const type = p => p.endsWith('.html') ? 'text/html' : p.endsWith('.js') ? 'text/javascript' : p.endsWith('.png') ? 'image/png' : p.endsWith('.webp') ? 'image/webp' : p.endsWith('.woff2') ? 'font/woff2' : 'application/json';
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(ROOT, p); if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': type(p) }); r.end(fs.readFileSync(f)); }).listen(PORT);
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 400, height: 860 }, deviceScaleFactor: 2 });
let espn = 0;
await ctx.route(/espn\.com|corsproxy|allorigins|football-data|oddspapi/, r => { espn++; r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ events: [], items: [] }) }); });
await ctx.route(/fonts\.(googleapis|gstatic)|espncdn|flagcdn|jsdelivr|unpkg|cdnjs/, r => r.abort());
const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', e => errs.push(e.message));
await pg.goto(`http://localhost:${PORT}/mister-boss/`); await pg.waitForTimeout(500);
await pg.screenshot({ path: OUT + '/0-vazio.png' });
// fichas sintéticas: história decidida + seleções de hoje
await pg.evaluate(() => {
  const now = Date.now(), H = 3600e3; let s = 11; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const mk = (app, name, sport, segs, mks, bias) => {
    const legs = {};
    for (let i = 0; i < 160; i++) { const seg = segs[i % segs.length], m = mks[i % mks.length], p = 0.8 + rnd() * 0.15, d = new Date(now - (i + 2) * 6 * H).toISOString(); const won = rnd() < p + (bias[seg.lg + m] || 0); legs[app + i] = { id: app + i, g: 'g' + i, gl: 'Casa ' + i + ' – Fora ' + i, d, mk: 'x', mkn: m, sel: 'h', line: null, lb: 'Seleção ' + i, p: Math.round(p * 1000) / 1000, odd: null, est: true, seg, st: won ? 'won' : 'lost', t: now - i * H }; }
    for (let i = 0; i < 6; i++) { const seg = segs[i % segs.length], m = mks[i % mks.length]; legs[app + 'h' + i] = { id: app + 'h' + i, g: 'n' + i, gl: name.split(' ')[1] + ' A' + i + ' – B' + i, d: new Date(now + (3 + i * 2) * H).toISOString(), mk: 'x', mkn: m, sel: 'h', line: null, lb: m + ' · escolha ' + i, p: 0.86 + i * 0.015, odd: i === 0 ? 1.12 : null, est: i !== 0, seg, st: 'open', t: now }; }
    localStorage.setItem(app + '_boss', JSON.stringify({ v: 1, app, name, sport, t: now - 2 * H, legs }));
  };
  mk('to', 'Mister Tó', 'NBA', [{ lg: 'NBA' }], ['Vencedor', 'Handicap', 'Total de pontos'], { NBAHandicap: -0.12 });
  mk('vi', 'Mister Vi', 'Ténis', [{ lg: 'ATP', cat: 'Piso duro' }, { lg: 'WTA', cat: 'Terra batida' }], ['Total de jogos', 'Handicap de jogos'], { 'WTATotal de jogos': -0.15 });
  mk('gi', 'Mister Gi', 'NHL', [{ lg: 'NHL' }], ['Handicap (60 min)', 'Total de golos (60 min)'], {});
  mk('ko', 'Mister Ko', 'UFC', [{ lg: 'UFC', cat: 'Leve' }, { lg: 'UFC', cat: 'Pesado' }], ['Vencedor', 'Total de rondas'], { 'UFCVencedor': 0.04 });
  // Zé: diário
  const items = {}; for (let i = 0; i < 40; i++) items['ev' + i] = { key: 'ev' + i, home: 'Benfica' + i, away: 'Porto' + i, league: i % 2 ? 'Primeira Liga' : 'Premier League', kick: new Date(now - (i + 1) * 20 * H).toISOString(), t: now - i * H, mk: { '1X': 0.86, 'O1.5': 0.82, '1': 0.6 }, res: i % 5 === 0 ? '0-1' : '2-1' };
  for (let i = 0; i < 3; i++) items['evh' + i] = { key: 'evh' + i, home: 'Sporting', away: 'Braga' + i, league: 'Primeira Liga', kick: new Date(now + (5 + i) * H).toISOString(), t: now, mk: { '1X': 0.9 + i * 0.01, 'U3.5': 0.84 } };
  localStorage.setItem('ze_diary_v1', JSON.stringify({ v: 1, items }));
  compute(); render();
});
await pg.waitForTimeout(300);
console.log('estado', JSON.stringify(await pg.evaluate(() => ({ misters: Object.keys(STATE.F), hoje: STATE.D[0].k, cands: STATE.D[0].C.length, amanha: STATE.D[1].C.length, cortadas: STATE.D[0].C.filter(c => c.why).length, boletim: STATE.D[0].S.legs.map(c => c.mi + ' ' + hhmm(c.d) + ' ' + c.lb + ' ' + c.p + '→' + c.pb.toFixed(3)), promessa: STATE.D[0].S.p.toFixed(3), feedback: feedback(STATE.F).slice(0, 4).map(f => f.mk + ' ' + f.k + ' ' + (f.gap * 100).toFixed(0)) }))));
await pg.evaluate(() => { DAY = 1; go('inicio'); }); await pg.waitForTimeout(200); await pg.screenshot({ path: OUT + '/1c-amanha.png', fullPage: true }); await pg.evaluate(() => { DAY = -1; go('inicio'); }); await pg.waitForTimeout(200); await pg.screenshot({ path: OUT + '/1d-ontem.png', fullPage: true }); await pg.evaluate(() => { DAY = 0; ORD = 'pct'; });
for (const [v, f] of [['inicio', '1-inicio'], ['jogos', '2-selecoes'], ['stats', '3-stats'], ['misters', '5-misters'], ['mais', '6-mais']]) { await pg.evaluate(v => go(v), v); await pg.waitForTimeout(250); await pg.screenshot({ path: OUT + `/${f}.png`, fullPage: true }); }
await pg.evaluate(() => { SM = 'vi'; go('stats'); }); await pg.waitForTimeout(250); await pg.screenshot({ path: OUT + '/4-stats-vi.png', fullPage: true });
// atualizar tudo: abre os 5 Misters escondidos e manda-os atualizar
const t0 = Date.now(); await pg.evaluate(() => refreshAll()); await pg.waitForFunction(() => !BUSY, null, { timeout: 600000 });
console.log('atualizar tudo', ((Date.now() - t0) / 1000).toFixed(0) + 's', 'pedidos ESPN', espn, JSON.stringify(await pg.evaluate(() => Object.fromEntries(MISTERS.filter(m => m.run).map(m => [m.k, LS.get('run_' + m.k, null)])))));
console.log('relatório:\n' + await pg.evaluate(() => reportText()));
console.log('erros JS:', errs.length ? errs : 'nenhum');
await b.close(); srv.close();
