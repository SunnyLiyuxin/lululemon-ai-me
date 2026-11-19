/* ============================================================
   LULULEMON AI ME · Icons (line icons, 1.5px stroke)
   ============================================================ */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9.5 20v-6h5v6"/>',
  discover: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  avatar: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  wardrobe: '<path d="M4 8 12 3l8 5v12H4z"/><path d="M12 3v18"/><path d="M9 11h6"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21c0-4.2 3.4-6.5 7.5-6.5s7.5 2.3 7.5 6.5"/>',

  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  bell: '<path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"/><path d="M10.5 20a2 2 0 0 0 3 0"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5.5-5.5 2 2-5.5z"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  chevR: '<path d="M9 5l7 7-7 7"/>',
  chevD: '<path d="M5 9l7 7 7-7"/>',
  chevU: '<path d="M5 15l7-7 7 7"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',

  /* 运动图标 */
  yoga: '<circle cx="12" cy="4.5" r="2"/><path d="M12 7v4"/><path d="M6 11h12"/><path d="M12 11l-5 4M12 11l5 4"/><path d="M7 15v5M17 15v5"/>',
  running: '<circle cx="15" cy="4.5" r="2"/><path d="M13 8l-3 3 4 3-2 6"/><path d="M10 11L6 10"/><path d="M12 14l-4 3-3-1"/><path d="M13 8l4 2 2-3"/>',
  tennis: '<circle cx="9" cy="9" r="6"/><path d="M3.5 6.5h11M3.5 11.5h11"/><path d="M13.5 13.5L20 20"/><path d="M18 18l2 2"/>',
  training: '<path d="M4 9v6M7 7v10M17 7v10M20 9v6"/><path d="M7 12h10"/>',
  hiking: '<path d="M12 3l3 6h-6z"/><circle cx="12" cy="14" r="2.5"/><path d="M9 21l3-4 3 4"/>',
  boxing: '<path d="M6 11a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z"/><path d="M9 7V5M15 7V5"/>',
  pilates: '<circle cx="12" cy="5" r="2"/><path d="M12 8v5M5 12h14"/><path d="M12 13l-4 4M12 13l4 4"/>',
  cycling: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M12 17.5l3-7h3"/><path d="M9 17.5l3-5"/>',

  /* 功能图标 */
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  challenge: '<path d="M12 3l2.4 2.1 3.1-.4.9 3 2.6 1.8-1.4 2.9 1.4 2.9-2.6 1.8-.9 3-3.1-.4L12 21l-2.4-2.1-3.1.4-.9-3L3 14.5 4.4 11.6 3 8.7l2.6-1.8.9-3 3.1.4z"/><path d="M9.5 12l1.8 1.8 3.4-3.6"/>',
  camera: '<path d="M3 8.5h3.5L8 6h8l1.5 2.5H21v11H3z"/><circle cx="12" cy="13.5" r="3.5"/>',
  friends: '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 6.2A3 3 0 0 1 16 12M17.5 14.5c2 .7 3.5 2.2 3.5 4.5"/>',
  badge: '<path d="M12 2.5l2.6 2 3.2-.5.9 3.1 2.8 1.6-1.3 3 1.3 3-2.8 1.6-.9 3.1-3.2-.5-2.6 2-2.6-2-3.2.5-.9-3.1L3 15.3l1.3-3L3 9.3l2.8-1.6.9-3.1 3.2.5z"/><path d="M9.5 12.5l1.8 1.8 3.4-3.8"/>',
  gift: '<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M2.5 9h19v4h-19z"/><path d="M12 9v11"/><path d="M12 9S9 3 6.5 4.5 9 9 12 9zM12 9s3-6 5.5-4.5S15 9 12 9z"/>',
  coins: '<ellipse cx="12" cy="6.5" rx="7.5" ry="3"/><path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>',
  level: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  invite: '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-5 6-5 1 0 2 .2 2.8.5"/><path d="M17 14v6M14 17h6"/>',
  benefits: '<path d="M4 6h16v13H4z"/><path d="M9 6V4h6v2"/><path d="M4 11h16"/>',
  camera2: '<path d="M3 8.5h3.5L8 6h8l1.5 2.5H21v11H3z"/><circle cx="12" cy="13.5" r="3.5"/>',
  share: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8l7.6-4M8.2 13.2l7.6 4"/>',
  heart: '<path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20z"/>',
  comment: '<path d="M20 12a8 8 0 1 1-3.2-6.4"/><path d="M4 20l1.5-4.2"/>',
  bookmark: '<path d="M6 3.5h12v17l-6-4-6 4z"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  shuffle: '<path d="M4 6h4l8 12h4M4 18h4l2-3M16 9l4-3"/><path d="M18 3l2 3-2 3M18 15l2 3-2 3"/>',
  trash: '<path d="M4.5 6.5h15M9 6.5V4h6v2.5M6.5 6.5L7.5 21h9l1-14.5"/>',
  edit: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z"/>',
  shield: '<path d="M12 3l8 3v6c0 4.6-3.2 8-8 9-4.8-1-8-4.4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.5l3.5 2"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5"/><circle cx="17.5" cy="9" r="2.4"/><path d="M15.5 14.5c2.6.4 4.5 2 4.5 4.5"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  scan: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M4 12h16"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/>',
  leaf: '<path d="M4 20c0-8 5-14 16-15 0 12-5 16-12 16-2 0-3.5-.5-4-1z"/><path d="M9 15c2-3 5-5 9-6"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z"/>',
  shoe: '<path d="M3 16v-5h4l3 3h5l5 3v3H3z"/><path d="M3 16h17"/>',
  crop: '<path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M2 6h14a2 2 0 0 1 2 2v14"/>',
  crown: '<path d="M3 8l3.5 3L12 4l5.5 7L21 8l-1.5 11h-15z"/>',
  fire: '<path d="M12 21c3.9 0 6.5-2.6 6.5-6 0-4.5-4-6.5-4-10-2 1.5-3 3.5-3 6-1.2-.8-1.5-2-1.5-3.5C7.5 9.5 5.5 12 5.5 15c0 3.4 2.6 6 6.5 6z"/>',
  store: '<path d="M4 9h16v11H4z"/><path d="M3 9l1.6-5h14.8L21 9"/><path d="M9 20v-6h6v6"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.4"/>',
  wave: '<path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>',
};

function icon(name, cls) {
  const d = ICONS[name] || '';
  return `<svg viewBox="0 0 24 24" class="${cls || ''}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${d}</svg>`;
}
/* 官方 lululemon Ω 标志：取自用户素材上的真实缝制标志，Catmull-Rom 平滑重建 */
const LULU_OMEGA_PATH =
  'M 40.50,16.00 C 33.00,21.00 29.00,32.50 29.50,45.00 ' +
  'C 30.00,56.50 33.50,63.50 28.50,70.50 ' +
  'C 25.30,75.00 19.50,76.50 16.50,71.80 ' +
  'C 14.80,68.90 15.60,65.90 18.20,65.30 ' +
  'M 59.50,16.00 C 67.00,21.00 71.00,32.50 70.50,45.00 ' +
  'C 70.00,56.50 66.50,63.50 71.50,70.50 ' +
  'C 74.70,75.00 80.50,76.50 83.50,71.80 ' +
  'C 85.20,68.90 84.40,65.90 81.80,65.30';

function omega(size) {
  const s = size || 17;
  return `<svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="7.2" stroke-linecap="round" stroke-linejoin="round"><path d="${LULU_OMEGA_PATH}"/></svg>`;
}
function omegaSolid(size) {
  const s = size || 17;
  return `<svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="9.6" stroke-linecap="round" stroke-linejoin="round"><path d="${LULU_OMEGA_PATH}"/></svg>`;
}

/* lululemon 官方 logo：直接使用参考图完整抠图位图（非矢量重构） */
function luluLogo(size) {
  const h = Math.round(size || 24);
  return `<img class="lulu-logo-img" src="assets/img/lululemon_logo.png" style="height:${h}px" alt="lululemon">`;
}
