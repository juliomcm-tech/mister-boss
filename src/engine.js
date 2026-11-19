'use strict';
/* =====================================================================
   MISTER BOSS — o filtro final.
   Não tem modelo próprio de jogos: lê o trabalho de todos os Misters que
   vivem neste telemóvel (Tó, Vi, Gi, Lu, Ko e Zé), compara o que cada um
   promete com o que acontece, corta as zonas onde falham e monta o
   «Boletim do Boss» com o melhor do dia de todos os desportos.
   Não mexe em nenhum Mister: só lê o que eles guardam.
   ===================================================================== */
const APP_VER = '1.3.0';

/* ---------- utilitários ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const r2 = x => Math.round(x * 100) / 100;
const r3 = x => Math.round(x * 1000) / 1000;
const LS = {
  get(k, d) { try { const v = localStorage.getItem('boss_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('boss_' + k, JSON.stringify(v)); return true; } catch (e) { toast('⚠️ A memória do telemóvel está cheia'); return false; } }
};
const RAW = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
const pct = v => Math.round(v * 100) + '%';
const sPts = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v * 100)) + ' pts';
const odd2 = v => v ? Number(v).toFixed(2).replace('.', ',') : '—';
const num = x => { const v = parseFloat(String(x == null ? '' : x).replace(',', '.').replace(/[^\d.+-]/g, '')); return isFinite(v) ? v : null; };
function toast(msg, ms) { const t = $('#toast'); if (!t) return; t.innerHTML = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), ms || 2800); }
const hhmm = iso => new Date(iso).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
const dayLbl = iso => new Date(iso).toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit', month: '2-digit' }).replace('.', '');
const ymd = d => { const x = new Date(d); return x.getFullYear() + String(x.getMonth() + 1).padStart(2, '0') + String(x.getDate()).padStart(2, '0'); };
const DAY_CUT = 6;   // jogos entre as 00:00 e as 05:59 (NBA, NHL, NFL, UFC à noite) contam para o dia anterior
const dayOf = iso => ymd(new Date(iso).getTime() - DAY_CUT * 3600e3);
const dayKey = off => ymd(Date.now() - DAY_CUT * 3600e3 + (off || 0) * 864e5);
const dayName = off => off === 0 ? 'Hoje' : off === 1 ? 'Amanhã' : off === -1 ? 'Ontem' : '';
const dayDate = k => new Date(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8), 12).toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit', month: '2-digit' }).replace('.', '');
const ago = t => { if (!t) return 'nunca'; const m = Math.round((Date.now() - t) / 60000); return m < 60 ? `há ${m} min` : m < 48 * 60 ? `há ${Math.round(m / 60)} h` : `há ${Math.round(m / 1440)} dias`; };

/* ---------- os Misters (todos no mesmo site: juliomcm-tech.github.io/…) ---------- */
const MISTERS = [
  { k: 'ze', n: 'Mister Zé', s: 'Futebol', c: '#1f7a3f', ini: 'Zé', path: '../mister-ze/', run: false },
  { k: 'to', n: 'Mister Tó', s: 'Basquetebol · NBA', c: '#d9480f', ini: 'Tó', path: '../mister-to/', run: true },
  { k: 'vi', n: 'Mister Vi', s: 'Ténis · ATP/WTA', c: '#f08c00', ini: 'Vi', path: '../mister-vi/', run: true },
  { k: 'gi', n: 'Mister Gi', s: 'Hóquei · NHL', c: '#1c7ed6', ini: 'Gi', path: '../mister-gi/', run: true },
  { k: 'lu', n: 'Mister Lu', s: 'Futebol americano · NFL', c: '#343a40', ini: 'Lu', path: '../mister-lu/', run: true },
  { k: 'ko', n: 'Mister Ko', s: 'MMA · UFC', c: '#c92a2a', ini: 'Ko', path: '../mister-ko/', run: true }
];
const MI = Object.fromEntries(MISTERS.map(m => [m.k, m]));
let CFG = Object.assign({ target: 0.75, maxLegs: 5, perMister: 2, minLeg: 0.85, off: {} }, LS.get('cfg', {}));

/* ---------- Mister Zé: só lê o diário e o registo do boletim seguro (nada é alterado) ---------- */
const ZE_SAFE = ['1X', 'X2', '12', 'O1.5', 'U3.5', '1', '2'];
const ZE_COND = { '1': (i, j) => i > j, 'X': (i, j) => i === j, '2': (i, j) => i < j, '1X': (i, j) => i >= j, 'X2': (i, j) => i <= j, '12': (i, j) => i !== j, 'O1.5': (i, j) => i + j > 1.5, 'U3.5': (i, j) => i + j < 3.5, 'O2.5': (i, j) => i + j > 2.5 };
const zeLabel = (k, h, a) => ({ '1': h + ' ganha', '2': a + ' ganha', 'X': 'Empate', '1X': h + ' ou empate', 'X2': a + ' ou empate', '12': 'Não há empate', 'O1.5': 'Mais de 1,5 golos', 'U3.5': 'Menos de 3,5 golos' }[k] || k);
const zeFam = k => /^[12X]$/.test(k) ? 'Resultado (1X2)' : k.length === 2 ? 'Dupla hipótese' : 'Golos';
const zeRes = r => { const m = String(r || '').match(/(\d+)\s*[-–:]\s*(\d+)/); return m ? [+m[1], +m[2]] : null; };
function zeFeed() {
  const D = RAW('ze_diary_v1'), S = RAW('ze_safe_slip_v1');
  if (!D && !S) return null;
  const legs = {}; let tmax = 0;
  Object.values((D && D.items) || {}).forEach(it => {
    if (!it.mk || !it.kick || it.backfill) return;
    const res = zeRes(it.res); tmax = Math.max(tmax, it.t || 0);
    ZE_SAFE.forEach(k => {
      const p = it.mk[k]; if (!(p >= 0.80 && p <= 0.985)) return;
      const id = 'ze|' + it.key + '|' + k;
      legs[id] = { id, g: it.key, gl: it.home + ' – ' + it.away, d: it.kick, mk: k, mkn: zeFam(k), lb: zeLabel(k, it.home, it.away), p: r3(p), odd: null, est: true, seg: { lg: it.league || '—' }, st: res ? (ZE_COND[k](res[0], res[1]) ? 'won' : 'lost') : 'open', t: it.t || 0 };
    });
  });
  Object.values((S && S.legs) || {}).forEach(l => {   // o boletim seguro do próprio Zé (também conta para a história dele)
    const id = 'zes|' + l.ev + '|' + l.k; if (legs[id]) return;
    legs[id] = { id, g: 'ev' + l.ev, gl: (l.h || '') + ' – ' + (l.a || ''), d: new Date(l.d || 0).toISOString(), mk: l.k, mkn: zeFam(l.k), lb: zeLabel(l.k, l.h, l.a), p: l.p, odd: null, est: true, seg: { lg: l.lg || '—' }, st: l.w == null ? 'open' : l.w ? 'won' : 'lost', t: l.d || 0, safeZe: 1 };
    tmax = Math.max(tmax, l.d || 0);
  });
  return { app: 'ze', name: 'Mister Zé', sport: 'Futebol', t: tmax, legs };
}
/* ---------- ler as fichas + o arquivo do Boss ---------- */
function feeds() {
  const out = {};
  MISTERS.forEach(M => { const F = M.k === 'ze' ? zeFeed() : RAW(M.k + '_boss'); if (F && F.legs) out[M.k] = F; });
  return archive(out);
}
/* o Boss guarda no seu arquivo cada seleção já decidida (até 3000): assim as estatísticas não se perdem quando
   um Mister limpa a ficha dele, e ficam a crescer com o tempo */
function archive(F) {
  const H = LS.get('hist', {}); let ch = false;
  Object.entries(F).forEach(([mi, f]) => Object.values(f.legs).forEach(l => {
    if (l.st === 'open') return; const k = mi + '|' + l.id;
    if (!H[k]) { H[k] = { mi, id: l.id, p: l.p, st: l.st, mkn: l.mkn, seg: l.seg, d: l.d, val: l.val != null ? l.val : undefined, z: l.safeZe ? 1 : undefined }; ch = true; }
  }));
  const ks = Object.keys(H); if (ks.length > 3000) { ks.sort((a, b) => H[a].d < H[b].d ? -1 : 1).slice(0, ks.length - 3000).forEach(k => delete H[k]); ch = true; }
  if (ch) LS.set('hist', H);
  Object.values(H).forEach(h => {
    if (!MI[h.mi]) return;
    const f = F[h.mi] || (F[h.mi] = { app: h.mi, name: MI[h.mi].n, t: 0, legs: {}, arch: true });
    if (!f.legs[h.id]) f.legs[h.id] = { id: h.id, p: h.p, st: h.st, mkn: h.mkn, seg: h.seg, d: h.d, val: h.val, safeZe: h.z, lb: '', gl: '', arch: 1 };
  });
  return F;
}
const archCount = () => Object.keys(LS.get('hist', {})).length;
const segKey = s => !s ? '—' : [s.lg, s.cat].filter(Boolean).join(' · ');
const graded = l => l.st === 'won' || l.st === 'lost';

/* =====================================================================
   O FILTRO SOBRE O FILTRO
   Para cada Mister, cada tipo de aposta e cada liga/torneio/categoria:
   quantas seleções prometeu (soma das probabilidades) e quantas acertou.
   Fiabilidade = (acertos + 25) ÷ (prometido + 25): começa em 1 (confia no
   Mister) e só se afasta quando há resultados que cheguem.
   Usa o nível mais fino com 15+ seleções decididas; corta as zonas fracas
   (25+ decididas e a falhar 6+ pontos abaixo do que prometem).
   ===================================================================== */
const PRIOR = 25, MIN_LEVEL = 15, WEAK_N = 25, WEAK_GAP = 0.06;
function groupStats(F) {
  const G = {};
  const add = (key, l) => { const g = G[key] = G[key] || { n: 0, w: 0, P: 0 }; g.n++; g.P += l.p; if (l.st === 'won') g.w++; };
  Object.entries(F).forEach(([mk, f]) => Object.values(f.legs).forEach(l => {
    if (!graded(l)) return;
    add(mk, l); add(mk + '|' + l.mkn, l); add(mk + '|' + l.mkn + '|' + segKey(l.seg), l);
  }));
  return G;
}
function judge(G, mk, l) {
  const keys = [mk + '|' + l.mkn + '|' + segKey(l.seg), mk + '|' + l.mkn, mk];
  let used = null;
  for (const k of keys) { const g = G[k]; if (g && g.n >= MIN_LEVEL) { used = { k, g }; break; } }
  const g = used ? used.g : { n: 0, w: 0, P: 0 };
  const r = clamp((g.w + PRIOR) / (g.P + PRIOR), 0.8, 1.03);   // para cima, no máximo +3%: confiança a mais é o erro mais caro
  const fine = G[keys[0]];
  const weak = fine && fine.n >= WEAK_N && fine.w / fine.n < fine.P / fine.n - WEAK_GAP;
  return { r, n: g.n, lvl: used ? used.k.split('|').length : 0, weak, pb: Math.min(0.985, l.p * r) };
}
/* candidatos de um dia: seleções por decidir desse dia (que ainda não começaram) */
function dayCands(F, G, key) {
  const now = Date.now(), out = [];
  Object.entries(F).forEach(([mk, f]) => {
    if (CFG.off[mk]) return;
    Object.values(f.legs).forEach(l => {
      if (l.st !== 'open' || l.safeZe) return;
      const t0 = new Date(l.d).getTime(); if (!(t0 > now + 10 * 60e3) || dayOf(l.d) !== key) return;
      const J = judge(G, mk, l);
      out.push(Object.assign({}, l, J, { mi: mk, M: MI[mk], why: J.weak ? 'zona fraca: este Mister falha aqui mais do que promete' : J.pb < CFG.minLeg ? `abaixo de ${pct(CFG.minLeg)} depois do filtro` : null }));
    });
  });
  return out.sort((a, b) => b.pb - a.pb);
}
/* o boletim: 1 seleção por jogo, no máximo 2 por Mister, junta enquanto a promessa (com 1 ponto de folga por seleção) fica ≥ alvo */
function buildSlip(C) {
  const byGame = {}, per = {}, legs = []; let P = 1;
  C.filter(c => !c.why).forEach(c => {
    c.out = null;
    const gk = c.mi + '|' + c.g; if (byGame[gk]) { c.out = 'já há outra seleção deste jogo no boletim'; return; }
    if ((per[c.mi] || 0) >= CFG.perMister) { c.out = `já há ${CFG.perMister} do ${MI[c.mi].n} (para não depender só de um)`; return; }
    if (legs.length >= CFG.maxLegs) { c.out = `o boletim já tem ${CFG.maxLegs} seleções`; return; }
    const q = c.pb - 0.01; if (legs.length && P * q < CFG.target) { c.out = `juntá-la baixava a promessa para ${pct(P * q)} (mínimo ${pct(CFG.target)})`; return; }
    byGame[gk] = 1; per[c.mi] = (per[c.mi] || 0) + 1; legs.push(c); P *= q;
  });
  return { legs, p: legs.length ? P : 0 };
}
/* registo dos boletins do Boss (fica congelado quando começa o 1.º jogo) e das seleções que cortou */
let SLIPS = LS.get('slips', {}), CUTS = LS.get('cuts', {});
function snapshot(C, S, d) {
  const old = SLIPS[d], now = Date.now();
  const started = old && old.legs.some(l => new Date(l.d).getTime() <= now);
  if (!started && S.legs.length) SLIPS[d] = { t: now, p: r3(S.p), legs: S.legs.map(c => ({ mi: c.mi, id: c.id, lb: c.lb, gl: c.gl, d: c.d, p: c.p, pb: r3(c.pb), odd: c.odd, est: c.est })) };
  C.filter(c => c.why).forEach(c => { const k = c.mi + '|' + c.id; if (!CUTS[k]) CUTS[k] = { mi: c.mi, id: c.id, lb: c.lb, gl: c.gl, d: c.d, p: c.p, pb: r3(c.pb), why: c.why, t: now }; });
  const ks = Object.keys(CUTS); if (ks.length > 600) ks.sort((a, b) => CUTS[a].t - CUTS[b].t).slice(0, ks.length - 600).forEach(k => delete CUTS[k]);
  const ss = Object.keys(SLIPS).sort(); if (ss.length > 200) ss.slice(0, ss.length - 200).forEach(k => delete SLIPS[k]);
  LS.set('slips', SLIPS); LS.set('cuts', CUTS);
}
const legSt = (F, mk, id) => { const f = F[mk]; const l = f && f.legs[id]; return l ? l.st : 'open'; };
function slipResult(F, S) {
  let lost = false, pend = false, w = 0;
  S.legs.forEach(l => { const st = legSt(F, l.mi, l.id); l.st = st; if (st === 'lost') lost = true; else if (st === 'open') pend = true; else w++; });
  return { st: lost ? 'lost' : pend ? 'open' : 'won', w, n: S.legs.length };
}

/* ---------- tudo calculado de uma vez ---------- */
let STATE = null;
function compute() {
  const F = feeds(), G = groupStats(F), D = {};
  [0, 1].forEach(off => { const k = dayKey(off), C = dayCands(F, G, k), S = buildSlip(C); snapshot(C, S, k); D[off] = { k, C, S }; });
  STATE = { F, G, D, t: Date.now() };
  return STATE;
}

/* =====================================================================
   ATUALIZAR TUDO: abre cada Mister escondido, aqui dentro, e manda-o
   atualizar (como se carregasses no ↻ dele). Assim nem precisas de os ter
   instalados: o código deles vem do site e os dados ficam neste telemóvel.
   O Mister Zé não é tocado: o Boss só lê o que ele guardou.
   ===================================================================== */
let BUSY = false;
function runMister(M, onStep) {
  return new Promise(resolve => {
    const fr = document.createElement('iframe');
    fr.style.cssText = 'position:fixed;width:390px;height:700px;left:-2000px;top:0;opacity:0;pointer-events:none;border:0';
    fr.setAttribute('aria-hidden', 'true');
    let done = false, t0 = Date.now();
    const finish = (ok, msg) => { if (done) return; done = true; clearInterval(iv); setTimeout(() => fr.remove(), 300); resolve({ ok, msg }); };
    const iv = setInterval(async () => {
      if (Date.now() - t0 > 150000) return finish(false, 'demorou demais');
      let w; try { w = fr.contentWindow; if (!w || !w.document || w.document.readyState !== 'complete') return; } catch (e) { return finish(false, 'sem acesso'); }
      if (fr._started) return;
      let ready = false;
      try { ready = typeof w.refresh === 'function' && w.eval("typeof SEED === 'undefined' || !!SEED"); } catch (e) {}
      if (!ready) return;
      fr._started = true; onStep && onStep('a atualizar');
      try { await w.refresh(); try { w.bossFeed && w.bossFeed(); } catch (e) {} finish(true, 'ok'); } catch (e) { finish(false, e && e.message || 'falhou'); }
    }, 400);
    fr.onerror = () => finish(false, 'não abriu');
    fr.src = M.path + 'index.html?boss=1';
    document.body.appendChild(fr);
  });
}
async function refreshAll() {
  if (BUSY) return; BUSY = true; document.body.classList.add('busy');
  const btn = $('#btnRefresh'); if (btn) btn.classList.add('spin');
  const res = {};
  try {
    for (const M of MISTERS.filter(m => m.run && !CFG.off[m.k])) {
      setUpd(`⏳ ${M.n}: a abrir…`);
      const r = await runMister(M, s => setUpd(`⏳ ${M.n}: ${s}…`));
      res[M.k] = r; LS.set('run_' + M.k, { t: Date.now(), ok: r.ok, msg: r.msg });
    }
    LS.set('last', Date.now());
    compute();
    const ok = Object.values(res).filter(r => r.ok).length, n = Object.keys(res).length;
    toast(`Atualizado: ${ok} de ${n} Misters${ok < n ? ' (vê em «Misters» quais falharam)' : ''} · hoje ${STATE.D[0].C.length} seleções, amanhã ${STATE.D[1].C.length}`, 4500);
  } catch (e) { toast('❌ ' + esc(e.message || e)); }
  finally { BUSY = false; document.body.classList.remove('busy'); if (btn) btn.classList.remove('spin'); render(); }
}

/* ---------- estatísticas (para os ecrãs e para o feedback) ---------- */
function misterStats(F, mk) {
  const f = F[mk]; if (!f) return null;
  const L = Object.values(f.legs).filter(graded);
  const n = L.length, w = L.filter(l => l.st === 'won').length, P = L.reduce((s, l) => s + l.p, 0);
  const by = (fn) => { const o = {}; L.forEach(l => { const k = fn(l); const g = o[k] = o[k] || { n: 0, w: 0, P: 0 }; g.n++; g.P += l.p; if (l.st === 'won') g.w++; }); return o; };
  const bucket = l => l.p < 0.85 ? '80-85%' : l.p < 0.9 ? '85-90%' : l.p < 0.95 ? '90-95%' : '95%+';
  return { n, w, P, hit: n ? w / n : null, prom: n ? P / n : null, gap: n ? w / n - P / n : null, open: Object.values(f.legs).filter(l => l.st === 'open').length,
    mk: by(l => l.mkn), seg: by(l => segKey(l.seg)), mseg: by(l => l.mkn + ' · ' + segKey(l.seg)), bk: by(bucket), val: L.filter(l => l.val != null) };
}
function feedback(F) {
  const out = [];
  Object.keys(F).forEach(mk => {
    const S = misterStats(F, mk); if (!S || !S.n) return;
    Object.entries(S.mseg).forEach(([k, g]) => {
      if (g.n < 15) return;
      const gap = g.w / g.n - g.P / g.n;
      if (Math.abs(gap) < 0.04) return;
      out.push({ mk, k, n: g.n, hit: g.w / g.n, prom: g.P / g.n, gap, strong: g.n >= WEAK_N && gap < -WEAK_GAP });
    });
  });
  return out.sort((a, b) => a.gap - b.gap);
}
function bossStats(F) {
  const S = Object.values(SLIPS).map(s => Object.assign({ r: slipResult(F, s) }, s)).filter(s => s.r.st !== 'open');
  const legs = []; Object.values(SLIPS).forEach(s => s.legs.forEach(l => { const st = legSt(F, l.mi, l.id); if (st === 'won' || st === 'lost') legs.push({ pb: l.pb, w: st === 'won' }); }));
  const cuts = Object.values(CUTS).map(c => ({ c, st: legSt(F, c.mi, c.id) })).filter(x => x.st === 'won' || x.st === 'lost');
  return { slips: S.length, won: S.filter(s => s.r.st === 'won').length, prom: S.length ? S.reduce((a, s) => a + s.p, 0) / S.length : null,
    legs: legs.length, legW: legs.filter(l => l.w).length, legP: legs.length ? legs.reduce((a, l) => a + l.pb, 0) / legs.length : null,
    cuts: cuts.length, cutLost: cuts.filter(x => x.st === 'lost').length, cutP: cuts.length ? cuts.reduce((a, x) => a + x.c.p, 0) / cuts.length : null };
}
