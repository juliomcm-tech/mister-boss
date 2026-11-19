/* =====================================================================
   ÍCONES · ECRÃS
   ===================================================================== */
const ICP = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  chart: '<path d="M4 20V11M10 20V5M16 20v-7M2 20h20"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.6 6.5-5.6s5.7 2 6.5 5.6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.8 14.5c2.6.1 4.6 1.8 5.4 4.6"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.9-3.5M4 4v4h4M4 13a8 8 0 0 0 14.9 3.5M20 20v-4h-4"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  check: '<path d="M5 12l5 5 9-10"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  gear: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  save: '<path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6"/>', share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
  warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>', phone: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18.5h2"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>', open: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  gem: '<path d="M6 4h12l3 5-9 11L3 9zM3 9h18"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
};
const ic = (n, cls) => `<svg class="i ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICP[n] || ''}</svg>`;
const attr = (label, v, color, txt) => `<div class="at" style="--k:${color}"><div class="l"><span>${label}</span><span class="v">${txt}</span></div><div class="bar"><i style="width:${clamp(v, 0, 100).toFixed(1)}%"></i></div></div>`;
const catH = (icon, text, color, right) => `<div class="cat" style="--k:${color}">${ic(icon)}${text}${right ? `<span class="muted small" style="margin-left:auto;font-weight:400">${right}</span>` : ''}</div>`;
const pnH = (title, right) => `<div class="pn-h">${title}${right ? `<span class="r">${right}</span>` : ''}</div><div class="div"></div>`;
const mdot = (M, sz) => `<span class="mdot" style="background:${M.c};${sz ? `width:${sz}px;height:${sz}px;flex-basis:${sz}px` : ''}">${esc(M.ini)}</span>`;
const mchip = M => `<span class="chipm" style="background:${M.c}">${esc(M.ini)}</span>`;
const gapCls = g => g == null ? 'muted' : g >= -0.02 ? 'pos' : g >= -0.06 ? '' : 'neg';

%%FACE%%

const VIEWS = ['inicio', 'jogos', 'stats', 'misters', 'mais'];
let VIEW = (location.hash || '#inicio').slice(1); if (!VIEWS.includes(VIEW)) VIEW = 'inicio';
let MF = 'all', DAY = 0, ORD = LS.get('ord', 'hora');
const ordL = L => L.slice().sort(ORD === 'hora' ? ((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : b.pb - a.pb) : ((a, b) => (b.pb != null ? b.pb : b.p) - (a.pb != null ? a.pb : a.p)));
const ordSeg = () => `<div class="seg" style="margin:4px 0 8px">${[['hora', 'Por hora'], ['pct', 'Por %']].map(([k, t]) => `<button class="${ORD === k ? 'on' : ''}" onclick="ORD='${k}';LS.set('ord','${k}');render()">${ic(k === 'hora' ? 'clock' : 'chart')} ${t}</button>`).join('')}</div>`;
const dayTabs = () => `<div class="dates" style="margin-top:14px">${[-1, 0, 1].map(o => `<button class="${DAY === o ? 'on' : ''}" onclick="DAY=${o};render()"><b>${dayName(o)}</b><small>${dayDate(dayKey(o))}</small></button>`).join('')}</div>`;
const dayData = off => off === -1 ? null : STATE.D[off];
function go(v) { VIEW = v; history.replaceState(null, '', '#' + v); render(); window.scrollTo(0, 0); }
function setUpd(t) { const e = $('#upd'); if (e) e.textContent = t; }
function renderTop() {
  const S = STATE || compute(), on = Object.keys(S.F).length;
  $('#chips').innerHTML = MISTERS.map(M => { const f = S.F[M.k]; const old = staleF(f); return `<span class="st" style="${f && !f.arch ? '' : 'opacity:.45'}${old ? ';background:rgba(240,170,40,.35);border-color:#f0aa28' : ''}" onclick="go('misters')">${esc(M.ini)} ${f && !f.arch ? (old ? '⏳' : S.D[0].C.filter(c => c.mi === M.k && !c.why).length) : '—'}</span>`; }).join('');
  const last = LS.get('last', 0);
  setUpd(`${on} de ${MISTERS.length} Misters com dados · ${last ? 'atualizado ' + ago(last) : 'toca em ↻ para atualizar todos'}`);
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('on', b.dataset.v === VIEW));
}
function render() {
  if (!STATE) compute();
  renderTop();
  const v = $('#view');
  v.innerHTML = VIEW === 'inicio' ? viewInicio() : VIEW === 'jogos' ? viewSel() : VIEW === 'stats' ? viewStats() : VIEW === 'misters' ? viewMisters() : viewMais();
}

/* ---------- INÍCIO: o Boletim do Boss ---------- */
function legRow(c, opts) {
  const o = opts || {};
  return `<div class="leg ${c.why ? 'cut' : ''}" style="grid-template-columns:auto 1fr auto">${mdot(c.M || MI[c.mi], 34)}
    <div style="min-width:0"><div class="t">${esc(c.lb)}</div><div class="small" style="font-weight:600;color:var(--blue)">${ic('clock')} ${dayLbl(c.d)} · ${hhmm(c.d)}${new Date(c.d).getHours() < DAY_CUT ? ' 🌙 madrugada' : ''}</div><div class="g">${esc(c.gl)} · ${esc(c.mkn || '')}${c.seg ? ' · ' + esc(segKey(c.seg)) : ''}</div>
    <div class="p">${esc((c.M || MI[c.mi]).n.replace('Mister ', ''))} ${pct(c.p)}${c.pb != null && Math.abs(c.pb - c.p) >= 0.005 ? ` → <b>Boss ${pct(c.pb)}</b>` : c.pb != null ? ' · Boss confirma' : ''}${c.why ? ` · <span class="neg">cortada: ${esc(c.why)}</span>` : ''}</div></div>
    <div class="o" style="text-align:right">${c.odd && !c.est ? odd2(c.odd) : '<span class="muted small">odd<br>Betano</span>'}</div></div>`;
}
function pastSlip(k, live) {
  const Y = SLIPS[k]; if (!Y) return `<div class="pn small muted">O Boss não guardou boletim para ${dayDate(k)} (só guarda quando o ↻ é feito antes dos jogos).</div>`;
  const r = slipResult(STATE.F, Y);
  return `<div class="pn hl">${pnH(`${ic('shield')} Boletim do Boss · ${dayDate(k)}`, r.st === 'won' ? '<b class="pos">ganhou</b>' : r.st === 'lost' ? '<b class="neg">perdeu</b>' : 'em curso')}${Y.legs.map(l => `<div class="why"><span>${l.st === 'won' ? `<span class="pos">${ic('check')}</span>` : l.st === 'lost' ? `<span class="neg">${ic('x')}</span>` : '<span class="muted">…</span>'} ${mchip(MI[l.mi])} ${esc(l.lb)} <span class="muted small">${esc(l.gl)}</span></span><b class="muted">${pct(l.pb)}</b></div>`).join('')}<div class="small muted" style="margin-top:6px">Prometia ${pct(Y.p)} · ${r.w}/${r.n} seleções certas até agora${Y.played ? ' · <b class="pos">jogaste este</b>' : ''}</div>${live ? `<div class="small" style="margin-top:6px;color:var(--blue)">${ic('save')} Congelado${Y.played ? ' por ti' : ` (faltam menos de ${LOCK_MIN} min para o 1.º jogo)`}: já não muda.</div>` : ''}${live && Y.played && !Y.legs.some(l => new Date(l.d).getTime() <= Date.now()) ? `<button class="btn full" style="margin-top:8px" onclick="playSlip('${k}',false);render()">Afinal não joguei (descongelar)</button>` : ''}${live ? `<button class="btn go full" style="margin-top:8px" onclick="shareSlip()">${ic('share')} Partilhar o boletim</button>` : ''}</div>`;
}
function viewInicio() {
  const S = STATE, ns = Object.keys(S.F).length, last = LS.get('last', 0), B = bossStats(S.F);
  const Dd = dayData(DAY), slip = Dd ? Dd.S : { legs: [], p: 0 }, Yk = dayKey(-1), Y = SLIPS[Yk], Yr = Y ? slipResult(S.F, Y) : null;
  const nM = new Set(slip.legs.map(l => l.mi)).size;
  let h = dayTabs();
  h += `<div class="pn hero"><span class="tag">${dayName(DAY)} · ${dayDate(dayKey(DAY))}</span>
    <div class="big">${DAY === -1 ? (Y ? `${Yr.w}/${Yr.n} <b>certas</b>` : 'Mister <b>Boss</b>') : slip.legs.length ? `${slip.legs.length} <b>seleç${slip.legs.length === 1 ? 'ão' : 'ões'}</b>` : 'Mister <b>Boss</b>'}</div>
    <div class="sub">${!ns ? 'Ainda não vejo nenhum Mister neste telemóvel. Toca em ↻ e eu ponho-os a trabalhar.' : DAY === -1 ? (Y ? (Yr.st === 'won' ? 'O boletim de ontem ganhou.' : Yr.st === 'lost' ? 'O boletim de ontem perdeu.' : 'O boletim de ontem ainda tem jogos por decidir.') : 'Sem boletim guardado para ontem.') : slip.legs.length ? `O melhor de ${DAY === 0 ? 'hoje' : 'amanhã'} de ${nM} Mister${nM === 1 ? '' : 's'}, já filtrado. Promessa honesta: <b>${pct(slip.p)}</b>.` : `${DAY === 0 ? 'Hoje' : 'Amanhã'} nada passa no meu filtro${DAY === 1 ? ' (ainda: os Misters juntam mais jogos ao longo do dia)' : ''}. Às vezes o melhor boletim é não ter boletim.`}</div>
    <div class="face">${bossFace(Yr ? (Yr.st === 'won' ? 'win' : Yr.st === 'lost' ? 'sad' : 'ok') : 'ok')}</div>
    <div class="kpis" style="margin-top:14px"><div class="kpi"><small>ontem</small><b>${Yr ? (Yr.st === 'won' ? '<span class="pos">✓</span>' : Yr.st === 'lost' ? '<span class="neg">✗</span>' : '…') : '—'}</b></div>
      <div class="kpi"><small>boletins</small><b>${B.slips ? B.won + '/' + B.slips : '—'}</b></div><div class="kpi"><small>Misters</small><b>${ns}/${MISTERS.length}</b></div></div></div>`;
  h += installBanner();
  if (!ns) return h + `<div class="pn empty"><div class="face">${bossFace('ok')}</div><div class="pn-h" style="justify-content:center">Olá! Sou o Mister Boss.</div><div class="small muted" style="margin:6px 0 14px">Não analiso jogos: analiso <b>os Misters</b>. Junto o trabalho do Tó, Vi, Gi, Lu, Ko e Zé, vejo onde cada um acerta e onde falha, e fico com o melhor de cada dia.</div><button class="btn fill" onclick="refreshAll()">${ic('refresh')} Pôr os Misters a trabalhar</button><div class="small muted" style="margin-top:12px">Simulação: sem dinheiro real e sem ligação à Betano. +18 · Joga com responsabilidade.</div></div>`;
  if (DAY === -1) {
    h += pastSlip(Yk);
    const fb = feedback(S.F).slice(0, 3);
    if (fb.length) h += `<div class="pn">${pnH(`${ic('bulb')} O Boss reparou`, '')}${fb.map(fbRow).join('')}<button class="btn full" style="margin-top:8px" onclick="go('misters')">Ver o feedback completo</button></div>`;
    return h;
  }
  if (slipLocked(Dd.k)) h += pastSlip(Dd.k, true);
  else {
    h += `<div class="pn hl">${pnH(`${ic('shield')} Boletim do Boss · ${dayName(DAY).toLowerCase()}`, slip.legs.length ? `promete ${pct(slip.p)}` : '')}`;
    if (slip.legs.length) h += ordSeg() + ordL(slip.legs).map(c => legRow(c)).join('') + `<div class="small muted" style="margin-top:8px">Só jogos de ${DAY === 0 ? 'hoje' : 'amanhã'}. 🌙 = começa de madrugada (até às 6h), ainda conta como esta noite. Cada seleção traz a probabilidade do Mister e a do Boss. Mete as odds da Betano na app do Mister para registar.</div>
      <div class="small" style="margin-top:8px;color:var(--blue)">${ic('save')} Guardado automaticamente${SLIPS[Dd.k] ? ' às ' + hhmm(SLIPS[Dd.k].t) : ''}. Até ${LOCK_MIN} min antes do 1.º jogo ainda se pode afinar com novos dados; depois congela e é conferido sozinho.</div>
      <button class="btn full" style="margin-top:10px" onclick="playSlip('${Dd.k}',true);toast('Boletim marcado como jogado: já não muda');render()">${ic('check')} Joguei este boletim (congelar já)</button>
      <button class="btn go full" style="margin-top:8px" onclick="shareSlip()">${ic('share')} Partilhar o boletim</button>`;
    else h += `<div class="small muted">Nenhuma seleção de ${DAY === 0 ? 'hoje' : 'amanhã'} passa dos ${pct(CFG.minLeg)} depois do filtro, ou os Misters ainda não têm jogos para esse dia. ${last ? '' : 'Toca em ↻.'}</div>`;
    h += `</div>`;
  }
  const cut = Dd.C.filter(c => c.why);
  if (cut.length) h += `<div class="pn">${pnH(`${ic('filter')} O que o Boss cortou`, cut.length + '')}${ordL(cut).slice(0, 5).map(c => legRow(c)).join('')}${cut.length > 5 ? `<button class="btn full" onclick="go('jogos')">Ver todas</button>` : ''}</div>`;
  if (DAY === 0 && Y) h += pastSlip(Yk);
  const fb = feedback(S.F).slice(0, 3);
  if (fb.length) h += `<div class="pn">${pnH(`${ic('bulb')} O Boss reparou`, '')}${fb.map(fbRow).join('')}<button class="btn full" style="margin-top:8px" onclick="go('misters')">Ver o feedback completo</button></div>`;
  return h;
}
function slipText(Dd) {
  return `🧠 Boletim do Mister Boss · ${dayName(DAY)} ${dayDate(Dd.k)}\n` + ordL(Dd.S.legs).map((c, i) => `${i + 1}) ${dayLbl(c.d)} ${hhmm(c.d)} · ${c.lb} (${c.gl}) · ${c.M.n} ${pct(c.p)} → Boss ${pct(c.pb)}`).join('\n') + `\nPromessa: ${pct(Dd.S.p)} · simulação, sem dinheiro real · +18`;
}
/* imagem do boletim: vertical (1080 px), pronta para WhatsApp, Facebook e Instagram */
async function slipImage(Dd) {
  const legs = ordL(Dd.S.legs), W = 1080, cardH = 150, gapC = 20, top = 560;
  const H = Math.max(1080, top + legs.length * (cardH + gapC) + 230);
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d');
  try { await document.fonts.load('800 40px Outfit'); await document.fonts.ready; } catch (e) {}
  const F = (w, s) => `${w} ${s}px Outfit, system-ui, sans-serif`;
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); };
  const fit = (t, w, font) => { x.font = font; if (x.measureText(t).width <= w) return t; while (t.length > 3 && x.measureText(t + '…').width > w) t = t.slice(0, -1); return t + '…'; };
  const svgImg = async (svg, s) => { const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', `<svg width="${s}" height="${s}" `)); await img.decode(); return img; };
  // fundo: verde profundo, rede de pontos ligados e um foco de luz
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2f9a5d'); g.addColorStop(.45, '#15502f'); g.addColorStop(1, '#071d11');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  const glow = x.createRadialGradient(W * .7, 120, 10, W * .7, 120, 620); glow.addColorStop(0, 'rgba(255,255,255,.28)'); glow.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = glow; x.fillRect(0, 0, W, 800);
  let s = 5; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280; const P = []; for (let i = 0; i < 34; i++) P.push([rnd() * W, rnd() * 520]);
  x.strokeStyle = 'rgba(220,255,232,.12)'; x.lineWidth = 2; P.forEach((p, i) => P.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 190) { x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(q[0], q[1]); x.stroke(); } }));
  x.fillStyle = 'rgba(234,255,241,.35)'; P.forEach((p, i) => { x.beginPath(); x.arc(p[0], p[1], i % 6 ? 3.5 : 7, 0, 7); x.fill(); });
  // cabeçalho: o Boss em pequeno + marca + data
  try { x.save(); x.shadowColor = 'rgba(0,0,0,.35)'; x.shadowBlur = 24; x.shadowOffsetY = 8; x.drawImage(await svgImg(bossFace('win'), 128), 56, 44, 128, 128); x.restore(); } catch (e) {}
  x.fillStyle = '#fff'; x.font = F(300, 46); x.fillText('Mister', 202, 106); const mw = x.measureText('Mister ').width; x.font = F(800, 46); x.fillText('Boss', 202 + mw, 106);
  x.font = F(600, 22); x.fillStyle = 'rgba(255,255,255,.75)'; x.fillText('O  F I L T R O  F I N A L', 204, 142);
  const chip = `${dayName(DAY).toUpperCase()} · ${dayDate(Dd.k).toUpperCase()}`; x.font = F(700, 26); const cw = x.measureText(chip).width + 52;
  rr(W - 60 - cw, 78, cw, 58, 29); x.fillStyle = 'rgba(255,255,255,.16)'; x.fill(); x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 2; x.stroke();
  x.fillStyle = '#fff'; x.fillText(chip, W - 60 - cw + 26, 116);
  // título + mostrador da promessa
  const nSp = new Set(legs.map(c => c.mi)).size;
  x.fillStyle = '#fff'; x.font = F(800, 92); x.fillText('Boletim', 60, 318); x.fillText('do dia', 60, 412);
  x.font = F(500, 32); x.fillStyle = 'rgba(255,255,255,.88)'; x.fillText(`${legs.length} seleç${legs.length === 1 ? 'ão' : 'ões'} · ${nSp} Mister${nSp === 1 ? '' : 's'}`, 62, 470);
  const cx = W - 205, cy = 365, R = 118;
  x.lineCap = 'round'; x.lineWidth = 26; x.strokeStyle = 'rgba(255,255,255,.16)'; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.stroke();
  const ga = x.createLinearGradient(cx - R, cy - R, cx + R, cy + R); ga.addColorStop(0, '#ffe28a'); ga.addColorStop(1, '#ffb703');
  x.strokeStyle = ga; x.beginPath(); x.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Dd.S.p); x.stroke(); x.lineCap = 'butt';
  x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = F(800, 70); x.fillText(pct(Dd.S.p), cx, cy + 22); x.font = F(600, 24); x.fillStyle = 'rgba(255,255,255,.8)'; x.fillText('PROMESSA', cx, cy + 62); x.textAlign = 'left';
  // um cartão por seleção
  legs.forEach((c, i) => {
    const y = top + i * (cardH + gapC), M = c.M || MI[c.mi], pb = c.pb != null ? c.pb : c.p;
    x.save(); x.shadowColor = 'rgba(0,0,0,.25)'; x.shadowBlur = 26; x.shadowOffsetY = 10; rr(50, y, W - 100, cardH, 30); x.fillStyle = '#fbfdfb'; x.fill(); x.restore();
    x.save(); rr(50, y, W - 100, cardH, 30); x.clip(); x.fillStyle = M.c; x.fillRect(50, y, 14, cardH); x.restore();
    x.fillStyle = M.c; x.beginPath(); x.arc(130, y + cardH / 2, 40, 0, 7); x.fill(); x.fillStyle = '#fff'; x.font = F(800, 30); x.textAlign = 'center'; x.fillText(M.ini, 130, y + cardH / 2 + 11); x.textAlign = 'left';
    const tm = dayLbl(c.d) + ' · ' + hhmm(c.d) + (new Date(c.d).getHours() < DAY_CUT ? ' 🌙' : ''); x.font = F(700, 24); const tw = x.measureText(tm).width + 28;
    rr(196, y + 26, tw, 40, 20); x.fillStyle = '#164f30'; x.fill(); x.fillStyle = '#fff'; x.fillText(tm, 210, y + 54);
    x.fillStyle = '#647a6d'; x.font = F(600, 22); x.fillText(fit(M.s.toUpperCase(), 600 - tw, F(600, 22)), 196 + tw + 14, y + 54);
    x.fillStyle = '#10241a'; x.fillText(fit(c.lb, 560, F(700, 36)), 196, y + 103);
    x.fillStyle = '#7d9186'; x.fillText(fit(c.gl, 560, F(400, 24)), 196, y + 134);
    x.textAlign = 'right'; x.fillStyle = '#1e8a4a'; x.font = F(800, 56); x.fillText(pct(pb), W - 84, y + 86); x.textAlign = 'left';
    rr(W - 84 - 150, y + 106, 150, 12, 6); x.fillStyle = '#e3efe7'; x.fill(); rr(W - 84 - 150, y + 106, 150 * pb, 12, 6); x.fillStyle = '#2b8f55'; x.fill();
  });
  // rodapé
  const fy = H - 150; x.strokeStyle = 'rgba(255,215,110,.7)'; x.lineWidth = 3; x.beginPath(); x.moveTo(W / 2 - 90, fy); x.lineTo(W / 2 + 90, fy); x.stroke();
  x.textAlign = 'center'; x.fillStyle = '#fff'; x.font = F(600, 30); x.fillText('O melhor do dia de todos os Misters, já filtrado.', W / 2, fy + 52);
  x.fillStyle = 'rgba(255,255,255,.7)'; x.font = F(400, 24); x.fillText('Simulação, sem dinheiro real · +18 · Joga com responsabilidade', W / 2, fy + 94); x.textAlign = 'left';
  return new Promise(res => cv.toBlob(res, 'image/png'));
}
function shareDd() {
  const Dd = dayData(DAY); if (!Dd) return null;
  if (!slipLocked(Dd.k)) return Dd;
  const Y = SLIPS[Dd.k]; return { k: Dd.k, S: { p: Y.p, legs: Y.legs.map(l => Object.assign({ M: MI[l.mi] }, l)) } };
}
async function shareSlip() {
  const Dd = shareDd(); if (!Dd || !Dd.S.legs.length) return;
  toast('A preparar a imagem…');
  const txt = slipText(Dd);
  try {
    const blob = await slipImage(Dd), file = new File([blob], `boletim-boss-${Dd.k}.png`, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text: txt }); return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    toast('Imagem guardada nas transferências');
  } catch (e) {
    if (e && e.name === 'AbortError') return;
    try { await navigator.clipboard.writeText(txt); toast('Copiado como texto'); } catch (e2) { window.open('https://wa.me/?text=' + encodeURIComponent(txt), '_blank'); }
  }
}
/* ---------- SELEÇÕES: tudo o que os Misters propõem hoje ---------- */
function viewSel() {
  if (DAY === -1) DAY = 0;
  const Dd = dayData(DAY), C = Dd.C.filter(c => MF === 'all' || c.mi === MF), lk = slipLocked(Dd.k), inSlip = new Set((lk ? SLIPS[Dd.k].legs : Dd.S.legs).map(c => c.mi + '|' + c.id));
  if (lk) C.forEach(c => { if (!c.why && !inSlip.has(c.mi + '|' + c.id)) c.out = 'o boletim de hoje já está congelado'; });
  let h = `<div class="dates" style="margin-top:14px">${[0, 1].map(o => `<button class="${DAY === o ? 'on' : ''}" onclick="DAY=${o};render()"><b>${dayName(o)}</b><small>${dayDate(dayKey(o))} · ${STATE.D[o].C.length}</small></button>`).join('')}</div>
    <div class="dates" style="margin-top:6px"><button class="${MF === 'all' ? 'on' : ''}" onclick="MF='all';render()"><b>Todos</b><small>${Dd.C.length}</small></button>${MISTERS.map(M => `<button class="${MF === M.k ? 'on' : ''}" onclick="MF='${M.k}';render()"><b>${esc(M.ini)}</b><small>${Dd.C.filter(c => c.mi === M.k).length}</small></button>`).join('')}</div>`;
  if (!C.length) return h + `<div class="pn small muted">Sem seleções de 80%+ para ${DAY === 0 ? 'hoje' : 'amanhã'}${MF === 'all' ? '' : ' neste Mister'}. ${LS.get('last', 0) ? '' : 'Toca em ↻ para pôr os Misters a trabalhar.'}</div>`;
  const ok = ordL(C.filter(c => !c.why)), cut = ordL(C.filter(c => c.why));
  h += ordSeg();
  h += `<div class="pn">${pnH(`${ic('check')} Passam no filtro · ${dayName(DAY).toLowerCase()}`, ok.length + '')}${ok.map(c => legRow(c) + (inSlip.has(c.mi + '|' + c.id) ? `<div class="small pos" style="margin:-4px 0 8px 46px">${ic('check')} no Boletim do Boss</div>` : c.out ? `<div class="small muted" style="margin:-4px 0 8px 46px">fora do boletim: ${esc(c.out)}</div>` : '')).join('') || '<div class="small muted">Nenhuma.</div>'}</div>`;
  if (cut.length) h += `<div class="pn">${pnH(`${ic('filter')} Cortadas pelo Boss`, cut.length + '')}${cut.map(c => legRow(c)).join('')}</div>`;
  return h + `<div class="small muted" style="margin:6px 4px">«Boss X%» = a probabilidade do Mister corrigida pelo que ele acertou até hoje nesse tipo de aposta e nessa liga. 🌙 = começa de madrugada (até às 6h) e conta como a noite anterior.</div>`;
}
/* ---------- ESTATÍSTICAS ---------- */
function calTable(o, title) {
  const rows = Object.entries(o).filter(([, g]) => g.n >= 3).sort((a, b) => b[1].n - a[1].n);
  if (!rows.length) return '';
  return `<table class="tbl" style="margin-top:6px"><tr><th style="text-align:left">${title}</th><th>N</th><th>Prometia</th><th>Acertou</th><th>Dif.</th></tr>${rows.map(([k, g]) => { const gap = g.w / g.n - g.P / g.n; return `<tr><td style="text-align:left">${esc(k)}</td><td>${g.n}</td><td>${pct(g.P / g.n)}</td><td>${pct(g.w / g.n)}</td><td class="gap ${gapCls(gap)}">${sPts(gap)}</td></tr>`; }).join('')}</table>`;
}
let SM = 'boss';
function learnBlock() {
  const L = LEARN, calTxt = L.cal >= 0.995 && L.cal <= 1.005 ? 'sem correção' : (L.cal < 1 ? 'mais prudente ' : 'um pouco mais confiante ') + '×' + L.cal.toFixed(2).replace('.', ',');
  return `<div class="pn">${pnH(`${ic('bulb')} Como o Boss está a aprender`, '')}
    ${catH('clock', 'Memória fresca', 'var(--c-blue)')}<div class="small">Cada resultado vale metade a cada ${HALF} dias. Se um Mister entra em má fase (ou melhora), o Boss repara mais depressa.</div>
    ${catH('shield', 'Auto-afinação', 'var(--c-blue)', calTxt)}<div class="small">${L.calN ? `As seleções que passaram no filtro acertaram <b>${pct(L.calHit)}</b> quando o Boss lhes dava <b>${pct(L.calP)}</b> (${L.calN} decididas).` : 'Ainda nenhuma seleção do Boss decidida.'} ${L.calN < CAL_K ? `Com poucos resultados mexe pouco (precisa de uns ${CAL_K} para se mexer a sério).` : 'Se acertar menos do que promete, fica mais prudente sozinho; se acertar mais, alivia um pouco.'}</div>
    ${catH('filter', 'Rigor do corte', 'var(--c-blue)', `corta a ${Math.round(L.gap * 100)}+ pts`)}<div class="small">${L.cutN ? `As zonas fracas cortadas acertaram <b>${pct(L.cutHit)}</b> quando os Misters prometiam <b>${pct(L.cutP)}</b> (${L.cutN} decididas): ${L.cutHit < L.cutP ? 'o corte está a ajudar, por isso fica mais exigente.' : 'o corte não está a ajudar, por isso fica mais brando.'}` : 'Ainda não há zonas cortadas decididas.'} Começa em ${Math.round(WEAK_GAP * 100)} pts e anda entre 4 e 10.</div>
    <div class="small muted" style="margin-top:8px">O Boss aprende só com resultados verdadeiros e nunca mexe nos Misters: corrige a confiança que tem neles.</div></div>`;
}
function viewStats() {
  const S = STATE, B = bossStats(S.F);
  let h = `<div class="dates" style="margin-top:14px"><button class="${SM === 'boss' ? 'on' : ''}" onclick="SM='boss';render()"><b>Boss</b><small>filtro</small></button>${MISTERS.map(M => `<button class="${SM === M.k ? 'on' : ''}" onclick="SM='${M.k}';render()"><b>${esc(M.ini)}</b><small>${S.F[M.k] ? misterStats(S.F, M.k).n : 0}</small></button>`).join('')}</div>`;
  if (SM === 'boss') {
    h += `<div class="pn hl">${pnH(`${ic('shield')} Boletins do Boss`, B.slips ? B.slips + ' decididos' : '')}
      ${B.slips ? attr('Boletins inteiros certos', B.won / B.slips * 100, 'var(--c-blue)', `${B.won}/${B.slips} · prometia ${pct(B.prom)}`) : '<div class="small muted">Ainda nenhum boletim decidido. O Boss guarda o boletim de cada dia antes do 1.º jogo.</div>'}
      ${B.played ? attr('Boletins que jogaste certos', B.playedW / B.played * 100, 'var(--c-orange, #e08a1e)', `${B.playedW}/${B.played} · prometia ${pct(B.playedP)}`) : ''}
      ${B.legs ? attr('Seleções certas', B.legW / B.legs * 100, 'var(--c-green)', `${B.legW}/${B.legs} · prometia ${pct(B.legP)}`) : ''}
      <div class="why"><span>Arquivo do Boss (seleções decididas guardadas)</span><b>${archCount()}</b></div>
      <div class="why"><span>Boletins guardados</span><b>${Object.keys(SLIPS).length}</b></div></div>
      ${learnBlock()}
      <div class="pn">${pnH(`${ic('filter')} O filtro tinha razão?`, B.cuts ? B.cuts + ' cortes decididos' : '')}
      ${B.cuts ? `${attr('Cortadas que falharam mesmo', B.cutLost / B.cuts * 100, 'var(--c-red)', `${B.cutLost}/${B.cuts}`)}<div class="small muted">Os Misters davam-lhes ${pct(B.cutP)} em média; ${B.cutLost / B.cuts > 1 - B.cutP ? '<b class="pos">falharam mais do que isso: o corte ajudou.</b>' : 'falharam menos do que isso: por agora o corte não ajudou (precisa de mais resultados).'}</div>` : '<div class="small muted">Quando houver cortes decididos, mostro se o Boss tinha razão em cortá-los.</div>'}</div>`;
    h += `<div class="pn">${pnH(`${ic('users')} Cada Mister (seleções de 80%+)`, '')}${MISTERS.map(M => { const s = S.F[M.k] ? misterStats(S.F, M.k) : null; return `<div class="mrow" onclick="SM='${M.k}';render()">${mdot(M)}<div style="flex:1;min-width:0"><b>${esc(M.n)}</b><div class="small muted">${esc(M.s)}</div></div><div style="text-align:right">${s && s.n ? `<b>${pct(s.hit)}</b> <span class="small muted">de ${s.n}</span><div class="small gap ${gapCls(s.gap)}">prometia ${pct(s.prom)}</div>` : '<span class="small muted">sem dados</span>'}</div></div>`; }).join('')}</div>`;
    return h;
  }
  const M = MI[SM], s = S.F[SM] ? misterStats(S.F, SM) : null;
  h += `<div class="pn hl">${pnH(`${mdot(M, 30)} ${esc(M.n)}`, esc(M.s))}`;
  if (!s || !s.n) return h + `<div class="small muted">${S.F[SM] ? 'Ainda sem seleções decididas.' : 'Este Mister ainda não deixou dados neste telemóvel.'}</div></div>`;
  h += attr('Seleções de 80%+ certas', s.hit * 100, 'var(--c-blue)', `${s.w}/${s.n} · prometia ${pct(s.prom)}`) + `<div class="why"><span>Diferença (acertou − prometeu)</span><b class="gap ${gapCls(s.gap)}">${sPts(s.gap)}</b></div><div class="why"><span>Por decidir</span><b>${s.open}</b></div></div>`;
  h += `<div class="pn">${pnH(`${ic('target')} Quando diz X%, acontece…`, '')}${calTable(s.bk, 'Confiança')}</div>`;
  h += `<div class="pn">${pnH(`${ic('list')} Por tipo de aposta`, '')}${calTable(s.mk, 'Aposta')}</div>`;
  h += `<div class="pn">${pnH(`${ic('chart')} Por liga / torneio / categoria`, '')}${calTable(s.seg, 'Onde') || '<div class="small muted">Precisa de 3+ seleções por grupo.</div>'}</div>`;
  h += `<div class="pn">${pnH(`${ic('filter')} Tipo de aposta × onde`, '')}${calTable(s.mseg, 'Grupo') || '<div class="small muted">Precisa de 3+ seleções por grupo.</div>'}</div>`;
  if (s.val.length) { const w = s.val.filter(l => l.st === 'won').length; h += `<div class="pn">${pnH(`${ic('gem')} Apostas de valor`, '')}<div class="why"><span>Certas</span><b>${w}/${s.val.length}</b></div></div>`; }
  return h + `<div class="small muted" style="margin:6px 4px">Verde = acerta o que promete (ou mais). Vermelho = promete mais do que acerta. Com menos de ~30 seleções num grupo, a diferença ainda pode ser sorte.</div>`;
}
/* ---------- MISTERS: estado de cada um e o feedback do Boss ---------- */
const fbRow = f => `<div class="frow">${mchip(MI[f.mk])} <b>${esc(MI[f.mk].n)}</b> ${f.gap < 0 ? 'promete' : 'é prudente demais em'} <b>${esc(f.k)}</b>: diz ${pct(f.prom)}, acerta ${pct(f.hit)} <span class="gap ${gapCls(f.gap)}">(${sPts(f.gap)})</span> <span class="muted small">em ${f.n} seleções${f.strong ? ' · o Boss já corta esta zona' : f.gap < 0 ? ' · a vigiar' : ''}</span></div>`;
function viewMisters() {
  const S = STATE, fb = feedback(S.F);
  let h = `<div class="pn hl" style="margin-top:14px">${pnH(`${ic('users')} Os Misters neste telemóvel`, '')}` + MISTERS.map(M => {
    const f = S.F[M.k], st = f ? misterStats(S.F, M.k) : null, run = LS.get('run_' + M.k, null);
    return `<div class="mrow">${mdot(M)}<div style="flex:1;min-width:0"><b>${esc(M.n)}</b> <span class="small muted">${esc(M.s)}</span>
      <div class="small muted">${f ? `dados ${ago(f.t)} · ${st.open} por decidir · ${st.n} decididas` : 'ainda sem dados aqui'}${run && !run.ok ? ` · <span class="neg">última atualização falhou (${esc(run.msg)})</span>` : ''}${M.k === 'ze' ? ' · só leitura' : ''}</div></div>
      <a class="btn sm" href="${M.path}" target="_blank" rel="noopener">${ic('open')}</a></div>`;
  }).join('') + `<div class="small muted" style="margin-top:8px">O ↻ do Boss põe o Tó, o Vi, o Gi, o Lu e o Ko a atualizar (não precisas de os abrir). O Zé é só lido: abre-o e atualiza-o como sempre.</div></div>`;
  h += `<div class="pn">${pnH(`${ic('bulb')} Feedback do Boss`, fb.length ? fb.length + ' notas' : '')}${fb.length ? fb.map(fbRow).join('') : '<div class="small muted">Ainda não há resultados suficientes (15+ seleções decididas no mesmo tipo de aposta e liga) para dar feedback com confiança.</div>'}
    <button class="btn go full" style="margin-top:10px" onclick="copyReport()">${ic('copy')} Copiar relatório para afinar os Misters</button>
    <div class="small muted" style="margin-top:6px">Cola o relatório numa conversa com o Claude: com ele dá para corrigir o Mister certo no sítio certo. O Boss nunca mexe nos Misters sozinho.</div></div>`;
  return h;
}
function reportText() {
  const S = STATE, L = [`MISTER BOSS · relatório ${new Date().toLocaleString('pt-PT')} · v${APP_VER}`];
  MISTERS.forEach(M => { const s = S.F[M.k] ? misterStats(S.F, M.k) : null; L.push(`${M.n}: ${s && s.n ? `${s.w}/${s.n} certas (${pct(s.hit)}) · prometia ${pct(s.prom)} · ${sPts(s.gap)}` : 'sem dados'}`); if (s && s.n) Object.entries(s.mk).filter(([, g]) => g.n >= 5).forEach(([k, g]) => L.push(`  · ${k}: ${g.w}/${g.n} · prometia ${pct(g.P / g.n)}`)); });
  L.push('Zonas com diferença ≥4 pts (15+ seleções):'); feedback(S.F).forEach(f => L.push(`  · ${MI[f.mk].n} · ${f.k}: diz ${pct(f.prom)}, acerta ${pct(f.hit)} (${sPts(f.gap)}, n=${f.n})`));
  L.push(`Aprender: auto-afinação ×${LEARN.cal.toFixed(3)} (${LEARN.calN} decididas${LEARN.calN ? `, acertou ${pct(LEARN.calHit)} vs ${pct(LEARN.calP)}` : ''}) · corte a ${Math.round(LEARN.gap * 100)} pts (${LEARN.cutN} cortes decididos) · memória ${HALF} dias`);
  const B = bossStats(S.F); L.push(`Boss: boletins ${B.won}/${B.slips} · seleções ${B.legW}/${B.legs} · cortes decididos ${B.cuts} (falharam ${B.cutLost})`);
  return L.join('\n');
}
async function copyReport() { const t = reportText(); try { await navigator.clipboard.writeText(t); toast('Relatório copiado'); } catch (e) { openSheet('Relatório', `<textarea class="in" style="min-height:300px;font-size:.8rem">${esc(t)}</textarea>`); } }
/* ---------- MAIS ---------- */
function openSheet(title, html, short) { const b = $('#sheetBox'); b.className = 'box' + (short ? ' short' : ''); b.innerHTML = `<div class="sh"><h3>${title}</h3><button class="x" onclick="closeSheet()" aria-label="Fechar">${ic('x')}</button></div>${html}`; $('#sheet').classList.add('on'); b.scrollTop = 0; }
function closeSheet() { $('#sheet').classList.remove('on'); }
function spaceBlock() {
  const U = lsUse(), cap = 5 * 1024 * 1024, kb = n => n < 1024 * 1024 ? Math.round(n / 1024) + ' KB' : (n / 1048576).toFixed(1).replace('.', ',') + ' MB';
  const nm = { to: 'Tó', vi: 'Vi', gi: 'Gi', lu: 'Lu', ko: 'Ko', boss: 'Boss', ze: 'Zé' }, f = U.tot / cap;
  return `<div class="pn">${pnH(`${ic('save')} Espaço dos Misters neste telemóvel`, kb(U.tot) + ' de ~5 MB')}
    ${attr('Ocupado', Math.min(100, f * 100), f > 0.8 ? 'var(--c-red)' : 'var(--c-green)', pct(f))}
    ${Object.entries(U.by).sort((a, b) => b[1] - a[1]).map(([p, n]) => `<div class="why"><span>${esc(nm[p] || p)}</span><b class="muted">${kb(n)}</b></div>`).join('')}
    <div class="small muted" style="margin-top:6px">Todos os Misters do site partilham este espaço do navegador. ${f > 0.8 ? '<b class="neg">Está quase cheio: faz uma cópia de segurança.</b>' : 'Está tudo bem.'}</div></div>`;
}
function viewMais() {
  const T = [['info', 'Como pensa o Boss', 'openHow()'], ['gear', 'Definições', 'openCfg()'], ['save', 'Cópia de segurança', 'openBackup()'], ['copy', 'Relatório', 'copyReport()']];
  if (!isStandalone()) T.push(['phone', 'Instalar app', 'openInstall()']);
  return `<div class="tiles" style="margin-top:14px">${T.map(([i, l, f]) => `<div class="tile" onclick="${f}">${ic(i)}<b>${l}</b></div>`).join('')}</div>
   ${spaceBlock()}
   <div class="pn small muted" style="text-align:center">Mister Boss v${APP_VER} · lê os Misters deste telemóvel<br>Simulação: sem dinheiro real e sem ligação à Betano. +18 · Joga com responsabilidade.<br>© 2026 Júlio Melo</div>`;
}
function openHow() {
  openSheet('Como pensa o Boss', `<div class="pn" style="line-height:1.55">
   ${catH('users', '1. Junta os Misters', 'var(--c-blue)')}<p>Cada Mister, quando atualiza, deixa neste telemóvel uma ficha com as seleções do dia que passam dos 80% e confere as antigas com o seu próprio código. O Zé é lido no diário dele. O Boss não tem modelo de jogos: o trabalho é dos Misters.</p>
   ${catH('filter', '2. O filtro sobre o filtro', 'var(--c-blue)')}<p>Para cada Mister, cada tipo de aposta e cada liga ou torneio, o Boss soma o que foi prometido e o que aconteceu. A probabilidade do Mister é corrigida por essa história: <b>fiabilidade = (acertos + ${PRIOR}) ÷ (prometido + ${PRIOR})</b>. No início vale 1 (confia no Mister); só se mexe quando há resultados. Zonas com ${WEAK_N}+ seleções a falhar ${Math.round(WEAK_GAP * 100)}+ pontos abaixo do prometido são cortadas.</p>
   ${catH('shield', '3. O Boletim do Boss', 'var(--c-blue)')}<p>Uma seleção por jogo, no máximo ${CFG.perMister} por Mister, só acima de ${pct(CFG.minLeg)} depois do filtro, juntas enquanto a promessa (com 1 ponto de folga por seleção) fica acima de ${pct(CFG.target)}. Jogos de desportos diferentes não se influenciam, por isso a conta do boletim é honesta.</p>
   ${catH('clock', '4. Aprende sozinho', 'var(--c-blue)')}<p><b>Memória fresca:</b> cada resultado vale metade a cada ${HALF} dias. <b>Auto-afinação:</b> confere as suas próprias seleções de 85%+; se acertam menos do que prometia, fica mais prudente (entre ×0,90 e ×1,02). <b>Corte que se corrige:</b> se as zonas cortadas afinal acertam, corta menos; se falham, corta mais (entre 4 e 10 pts).</p>
   ${catH('bulb', '5. Feedback', 'var(--c-blue)')}<p>Onde um Mister promete mais do que acerta (ou é prudente demais), o Boss avisa. O relatório serve para afinar esse Mister. O Boss nunca muda nada sozinho.</p>
   ${catH('warn', 'Honestidade', 'var(--c-red)')}<p>O Boss não cria vantagem sobre a casa: torna o boletim mais fiável e tira as zonas fracas. Precisa de tempo: com 1-2 meses de atualizações diárias começa a ver padrões a sério.</p></div>`);
}
function openCfg() {
  const inp = (id, lbl, v, hint) => `<label class="f">${lbl}</label><input class="in" id="${id}" inputmode="decimal" value="${String(v).replace('.', ',')}">${hint ? `<div class="small muted">${hint}</div>` : ''}`;
  openSheet('Definições', `${inp('c_t', 'Promessa mínima do boletim (%)', Math.round(CFG.target * 100), 'Mais alto = menos seleções, mais seguro.')}
   ${inp('c_l', 'Probabilidade mínima de cada seleção (%)', Math.round(CFG.minLeg * 100))}${inp('c_n', 'Máximo de seleções', CFG.maxLegs)}${inp('c_p', 'Máximo por Mister', CFG.perMister)}
   <label class="f">Misters que entram</label>${MISTERS.map(M => `<label class="why" style="cursor:pointer"><span>${mchip(M)} ${esc(M.n)}</span><input type="checkbox" id="c_on_${M.k}" ${CFG.off[M.k] ? '' : 'checked'}></label>`).join('')}
   <button class="btn fill full" style="margin-top:14px" onclick="saveCfg()">Guardar</button>`);
}
function saveCfg() {
  const v = id => num($('#' + id).value);
  if (v('c_t') > 0) CFG.target = clamp(v('c_t'), 50, 95) / 100; if (v('c_l') > 0) CFG.minLeg = clamp(v('c_l'), 70, 97) / 100;
  if (v('c_n') > 0) CFG.maxLegs = clamp(Math.round(v('c_n')), 1, 8); if (v('c_p') > 0) CFG.perMister = clamp(Math.round(v('c_p')), 1, 5);
  MISTERS.forEach(M => { CFG.off[M.k] = !$('#c_on_' + M.k).checked; });
  LS.set('cfg', CFG); closeSheet(); compute(); render(); toast('Guardado');
}
function openBackup() {
  openSheet('Cópia de segurança', `<p class="small">Guarda os boletins e o registo do Boss num ficheiro. Os dados de cada Mister guardam-se na cópia de segurança de cada um.</p>
   <button class="btn fill full" onclick="exportAll()">${ic('download')} Exportar</button>
   <label class="f" style="margin-top:14px">Importar</label><input type="file" accept=".json" class="in" onchange="importAll(this)">`, true);
}
function exportAll() { const data = { cfg: CFG, slips: SLIPS, cuts: CUTS }; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify({ app: 'mister-boss', ver: APP_VER, t: Date.now(), data })], { type: 'application/json' })); a.download = 'mister-boss-copia-' + ymd(Date.now()) + '.json'; document.body.appendChild(a); a.click(); setTimeout(() => a.remove(), 1000); }
function importAll(inp) { const f = inp.files && inp.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const j = JSON.parse(r.result); if (j.app !== 'mister-boss') throw new Error('não é uma cópia do Mister Boss'); LS.set('cfg', j.data.cfg); LS.set('slips', j.data.slips); LS.set('cuts', j.data.cuts); toast('Importado'); setTimeout(() => location.reload(), 600); } catch (e) { toast(esc(e.message)); } }; r.readAsText(f); }
/* ---------- instalar ---------- */
let DEFER_INSTALL = null;
const isStandalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); DEFER_INSTALL = e; if (VIEW === 'inicio') render(); });
function installBanner() { if (isStandalone() || LS.get('instHide', 0)) return ''; return `<div class="pn inst"><span style="color:var(--blue)">${ic('phone')}</span><div class="t"><b>Instala o Mister Boss</b><small>Fica no ecrã do telemóvel, como uma app.</small></div><button class="btn fill sm" onclick="doInstall()">Instalar</button><button class="x" onclick="LS.set('instHide',1);render()" aria-label="Fechar">${ic('x')}</button></div>`; }
async function doInstall() { if (DEFER_INSTALL) { DEFER_INSTALL.prompt(); try { const r = await DEFER_INSTALL.userChoice; if (r && r.outcome === 'accepted') LS.set('instHide', 1); } catch (e) {} DEFER_INSTALL = null; render(); return; } openInstall(); }
function openInstall() { openSheet('Instalar como app', `<div class="pn"><b>Android (Chrome):</b> toca nos <b>⋮</b> e escolhe <b>«Instalar app»</b>.<br><br><b>iPhone:</b> no Safari, <b>Partilhar → «Adicionar ao ecrã principal»</b>. Atenção: no iPhone cada app instalada guarda os dados à parte; usa o Boss e os Misters no Safari para eles se verem.</div>`, true); }
/* ---------- arranque ---------- */
$('#topFace').innerHTML = bossFace('ok');
$('#btnRefresh').innerHTML = ic('refresh');
$('#btnRefresh').onclick = refreshAll;
document.querySelectorAll('[data-ic]').forEach(el => { el.outerHTML = ic(el.dataset.ic); });
window.addEventListener('hashchange', () => { const v = location.hash.slice(1); if (VIEWS.includes(v) && v !== VIEW) { VIEW = v; render(); } });
window.addEventListener('focus', () => { if (!BUSY) { compute(); render(); } });   // voltar de um Mister: lê outra vez
compute(); render();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
