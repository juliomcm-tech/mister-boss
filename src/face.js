/* ---------- a cara do Boss: o velho professor génio deste século — cabelo branco rebelde, óculos redondos,
   barba aparada, gola alta verde e casaco de tweed, auricular sem fios. Estilo BD/anime, num medalhão de vidro verde ---------- */
function bossFace(mood) {
  const id = 'bf' + Math.random().toString(36).slice(2, 7);
  const brow = mood === 'win' ? 'M44 47q9-8 19-3M69 44q10-5 18 3' : mood === 'sad' ? 'M44 45q9 3 19 7M69 52q10-4 18-7' : 'M44 47q9-5 19-1M69 46q10-4 18 1';
  const mouth = mood === 'win' ? '<path d="M55 78q9 8 18 0z" fill="#7a2f22" stroke="#5a3523" stroke-width="1.6" stroke-linejoin="round"/><path d="M57 78.5h14" stroke="#fff" stroke-width="2"/>' : mood === 'sad' ? '<path d="M56 82q8-5 16 0" stroke="#5a3523" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : '<path d="M56 79q8 4 16 0" stroke="#5a3523" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  return `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mister Boss">
  <defs>
    <radialGradient id="${id}b" cx="35%" cy="25%" r="80%"><stop offset="0" stop-color="#d9f2e2"/><stop offset=".55" stop-color="#45b073"/><stop offset="1" stop-color="#123f27"/></radialGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4d3b5"/><stop offset=".7" stop-color="#e2b08b"/><stop offset="1" stop-color="#c98f69"/></linearGradient>
    <linearGradient id="${id}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e6ebe8"/><stop offset="1" stop-color="#aeb7b2"/></linearGradient>
    <linearGradient id="${id}j" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a8f8c"/><stop offset="1" stop-color="#4e5451"/></linearGradient>
    <linearGradient id="${id}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8a55"/><stop offset="1" stop-color="#164f30"/></linearGradient>
    <clipPath id="${id}c"><circle cx="64" cy="64" r="58"/></clipPath>
  </defs>
  <circle cx="64" cy="64" r="60" fill="url(#${id}b)" stroke="#fff" stroke-width="4"/>
  <g clip-path="url(#${id}c)">
    <!-- casaco de tweed e gola alta -->
    <path d="M18 128c2-22 18-32 46-33 28 1 44 11 46 33z" fill="url(#${id}j)"/>
    <path d="M30 108l14-10 8 30M98 108l-14-10-8 30" stroke="#3b403d" stroke-width="2" fill="none" opacity=".6"/>
    <path d="M46 96c4 7 32 7 36 0l2 12c-6 8-34 8-40 0z" fill="url(#${id}t)"/>
    <path d="M47 101c6 4 28 4 34 0M47 106c6 4 28 4 34 0" stroke="#0f3a24" stroke-width="1.2" fill="none" opacity=".6"/>
    <path d="M55 88h18v10c-4 3-14 3-18 0z" fill="#d9a37f"/>
    <!-- cabelo de trás, rebelde -->
    <path d="M24 60c-8-6-6-18 2-22-4-10 6-22 16-20 4-10 20-12 26-4 10-6 26 0 26 12 10 2 16 14 10 22 8 6 4 20-4 22 2 8-6 14-12 12l-4-22c-14 4-46 4-56 0l-2 20c-8 0-14-8-12-14-6-2-8-8-4-12z" fill="url(#${id}h)" stroke="#fff" stroke-width="1.5"/>
    <path d="M22 54c-6-2-10 2-10 6M106 54c6-2 10 2 10 6M30 30c-6-6-12-4-14 0M98 28c6-6 12-4 14 0M58 16c0-6 6-10 12-8" stroke="#dfe5e1" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- orelhas e auricular -->
    <ellipse cx="36" cy="64" rx="5" ry="8" fill="#e2b08b"/><ellipse cx="92" cy="64" rx="5" ry="8" fill="#e2b08b"/>
    <path d="M90 66q5 0 5 4v4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="90.5" cy="65.5" r="2.4" fill="#fff" stroke="#1e8a4a" stroke-width="1"/>
    <!-- cara -->
    <path d="M38 56c0-17 11-27 26-27s26 10 26 27c0 21-11 36-26 36S38 77 38 56z" fill="url(#${id}s)" stroke="#b97f5a" stroke-width="1"/>
    <path d="M40 62q2 10 8 16M88 62q-2 10-8 16" stroke="#c98f69" stroke-width="1.4" fill="none" opacity=".5"/>
    <path d="M47 37c6-4 28-5 34 0" stroke="#c98f69" stroke-width="1.2" fill="none" opacity=".7"/>
    <path d="M49 33c5-3 25-3 30 0" stroke="#c98f69" stroke-width="1" fill="none" opacity=".55"/>
    <!-- franja branca a cair -->
    <path d="M42 46c4-14 14-19 24-19 8 0 16 4 20 12-6-3-12-4-18-2 2-4 0-6-3-7-1 5-6 8-12 8 1-3 0-5-2-6-3 6-6 10-9 14z" fill="url(#${id}h)" stroke="#fff" stroke-width="1"/>
    <!-- sobrancelhas fartas -->
    <path d="${brow}" stroke="#f1f4f2" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    <path d="${brow}" stroke="#b9c2bd" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".8"/>
    <!-- olhos -->
    <ellipse cx="54" cy="57" rx="4.6" ry="${mood === 'win' ? 3.4 : 4.2}" fill="#2a2420"/><ellipse cx="74" cy="57" rx="4.6" ry="${mood === 'win' ? 3.4 : 4.2}" fill="#2a2420"/>
    <circle cx="55.6" cy="55.6" r="1.5" fill="#fff"/><circle cx="75.6" cy="55.6" r="1.5" fill="#fff"/>
    <path d="M47 63q3 2 6 1M81 63q-3 2-6 1M45 60l-3 2M83 60l3 2" stroke="#c98f69" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <!-- óculos redondos -->
    <g fill="rgba(220,240,255,.18)" stroke="#2b2b2b" stroke-width="2.4"><circle cx="54" cy="58" r="9.5"/><circle cx="74" cy="58" r="9.5"/></g>
    <path d="M63.5 57q.5-2 1 0M44.5 56l-6-2M83.5 56l6-2" stroke="#2b2b2b" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M48 53l5-4M68 53l5-4" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>
    <!-- nariz -->
    <path d="M64 60q-4 9-2 11q3 2 6 0" stroke="#b97f5a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- barba aparada (só no queixo e maxilar), bigode e boca por cima -->
    <path d="M41 68c1 13 10 24 23 24s22-11 23-24c-2 6-5 9-8 10-1 6-8 10-15 10s-14-4-15-10c-3-1-6-4-8-10z" fill="url(#${id}h)" stroke="#d5dcd8" stroke-width="1"/>
    <path d="M47 80q3 6 8 8M81 80q-3 6-8 8M58 88q6 2 12 0" stroke="#c8d0cb" stroke-width="1" fill="none"/>
    ${mouth}
    <path d="M49 75c4-5 11-5 15-2 4-3 11-3 15 2-5 3-10 2-15 0-5 2-10 3-15 0z" fill="#f6f8f7" stroke="#cdd5d0" stroke-width="1"/>
  </g>
  ${mood === 'win' ? '<path d="M104 14l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#ffd34d" stroke="#fff" stroke-width="1.6"/>' : ''}
  ${mood === 'sad' ? '<path d="M100 36q-5 8 0 11 5-3 0-11z" fill="#bfe1ff" stroke="#fff" stroke-width="1"/>' : ''}
  ${mood === 'ok' ? '<g transform="translate(100 18)"><circle r="9" fill="#fff" stroke="#1e8a4a" stroke-width="1.6"/><path d="M-4 1l3 3 6-7" stroke="#1e8a4a" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>' : ''}
</svg>`;
}
