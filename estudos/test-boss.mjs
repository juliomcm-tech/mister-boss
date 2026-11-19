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
// v1.4: jogar/congelar, partilha do congelado, dados velhos
console.log('v14', JSON.stringify(await pg.evaluate(async () => {
  const k = STATE.D[0].k, before = SLIPS[k].legs.map(l => l.id).join(',');
  playSlip(k, true); const lk = slipLocked(k);
  // mudar as probabilidades do Tó: o boletim congelado não pode mudar
  const f = JSON.parse(localStorage.getItem('to_boss')); Object.values(f.legs).forEach(l => { if (l.st === 'open') l.p = 0.97; }); localStorage.setItem('to_boss', JSON.stringify(f));
  compute(); const after = SLIPS[k].legs.map(l => l.id).join(','), live = STATE.D[0].S.legs.map(l => l.id).join(',');
  go('inicio'); const hasFrozen = document.body.innerText.includes('Congelado por ti');
  const sd = shareDd(); const shareSame = sd.S.legs.map(l => l.id).join(',') === before;
  go('jogos'); const outFrozen = document.body.innerText.includes('já está congelado');
  playSlip(k, false); compute(); const unfrozen = !slipLocked(k);
  // dados velhos: Gi há 20 h
  const g = JSON.parse(localStorage.getItem('gi_boss')); g.t = Date.now() - 20 * 3600e3; localStorage.setItem('gi_boss', JSON.stringify(g)); compute(); render();
  const giStale = STATE.D[0].C.filter(c => c.mi === 'gi').every(c => /mais de 18 h/.test(c.why || '')) && !STATE.D[0].S.legs.some(c => c.mi === 'gi');
  g.t = Date.now() - 2 * 3600e3; localStorage.setItem('gi_boss', JSON.stringify(g)); compute(); render();
  go('mais'); const space = document.body.innerText.includes('Espaço dos Misters');
  return { before, lk, after, live, kept: before === after, hasFrozen, shareSame, outFrozen, unfrozen, giStale, space, use: lsUse() };
})));
await pg.evaluate(() => go('mais')); await pg.waitForTimeout(200); await pg.screenshot({ path: OUT + '/6b-espaco.png', fullPage: true });
// v1.5: aprender
console.log('v15', JSON.stringify(await pg.evaluate(() => {
  const r0 = { cal: LEARN.cal, gap: LEARN.gap };
  // o Boss deu 90% a 120 seleções do Tó já decididas: acertaram ~?
  const f = JSON.parse(localStorage.getItem('to_boss')); let i = 0;
  Object.values(f.legs).filter(l => l.st !== 'open').forEach(l => { PASS['to|' + l.id] = { mi: 'to', id: l.id, d: l.d, pb0: 0.92, t: Date.now() - 1e6 }; i++; });
  // cortes «zona fraca» do Vi que afinal ganharam quase todos
  const v = JSON.parse(localStorage.getItem('vi_boss'));
  Object.values(v.legs).filter(l => l.st === 'won').slice(0, 60).forEach(l => { CUTS['vi|' + l.id] = { mi: 'vi', id: l.id, d: l.d, p: 0.85, why: 'zona fraca: x', t: Date.now() }; });
  compute(); render();
  const out = { antes: r0, depois: { cal: LEARN.cal, calN: LEARN.calN, calHit: LEARN.calHit, gap: LEARN.gap, cutN: LEARN.cutN, cutHit: LEARN.cutHit }, boletim: STATE.D[0].S.legs.map(c => c.mi + ' ' + c.p + '→' + c.pb.toFixed(3) + ' (cal ' + c.cal.toFixed(3) + ')'), promessa: STATE.D[0].S.p.toFixed(3) };
  SM = 'boss'; go('stats'); out.ui = document.body.innerText.includes('Como o Boss está a aprender');
  out.w = [ageW(new Date().toISOString()).toFixed(2), ageW(new Date(Date.now() - 60 * 864e5).toISOString()).toFixed(2), ageW(new Date(Date.now() - 180 * 864e5).toISOString()).toFixed(3)];
  return out;
})));
await pg.evaluate(() => { SM = 'boss'; go('stats'); }); await pg.waitForTimeout(200); await pg.screenshot({ path: OUT + '/3b-aprender.png', fullPage: true });
// atualizar tudo: abre os 5 Misters escondidos e manda-os atualizar
const t0 = Date.now(); await pg.evaluate(() => refreshAll()); await pg.waitForFunction(() => !BUSY, null, { timeout: 600000 });
console.log('atualizar tudo', ((Date.now() - t0) / 1000).toFixed(0) + 's', 'pedidos ESPN', espn, JSON.stringify(await pg.evaluate(() => Object.fromEntries(MISTERS.filter(m => m.run).map(m => [m.k, LS.get('run_' + m.k, null)])))));
console.log('relatório:\n' + await pg.evaluate(() => reportText()));
const png = await pg.evaluate(async () => { DAY = 0; const b = await slipImage(STATE.D[0]); const r = new FileReader(); return await new Promise(ok => { r.onload = () => ok(r.result); r.readAsDataURL(b); }); });
fs.writeFileSync(OUT + '/7-partilha.png', Buffer.from(png.split(',')[1], 'base64'));
console.log('erros JS:', errs.length ? errs : 'nenhum');
await b.close(); srv.close();
