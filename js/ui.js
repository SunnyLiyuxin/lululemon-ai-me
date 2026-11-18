/* ============================================================
   LULULEMON AI ME · Router + UI Kit
   ============================================================ */

const device = () => document.getElementById('device');
const stage = () => document.getElementById('stage');

/* ---------- 路由表 ---------- */
const ROUTES = {
  splash:     { render: () => renderSplash(),     bare:true },
  wizard:     { render: () => renderWizard(),     bare:true },
  reveal:     { render: () => renderReveal(),     bare:true },
  home:       { render: () => renderHome(),       tab:'home' },
  discover:   { render: () => renderDiscover(),   tab:'discover' },
  park:       { render: () => renderParkHub(),    tab:'park' },
  plaza:      { render: () => renderPark(),       bare:true, park:true },
  myavatar:   { render: () => renderMyAvatar(),   bare:true },
  wardrobe:   { render: () => renderWardrobe(),   tab:'wardrobe' },
  profile:    { render: () => renderProfile(),    tab:'profile' },
  match:      { render: () => renderMatch(),      bare:true },
  outfit:     { render: () => renderOutfit(),     bare:true },
  dressing:   { render: () => renderDressing(),   bare:true },
  editor:     { render: () => renderEditor(),     bare:true },
  product:    { render: () => renderProduct(),    bare:true },
  circle:     { render: () => renderCircle(),     bare:true },
  avatarCard: { render: () => renderAvatarCard(), bare:true, overlay:true },
  photo:      { render: () => renderPhoto(),      bare:true },
  friends:    { render: () => renderFriends(),    bare:true },
  challenges: { render: () => renderChallenges(), bare:true },
  badges:     { render: () => renderBadges(),     bare:true },
  calendar:   { render: () => renderCalendar(),   bare:true },
  garden:     { render: () => renderGarden(),     bare:true },
  event:      { render: () => renderEvent(),      bare:true },
  collection: { render: () => renderCollection(), bare:true },
};

let current = 'splash';
let currentParam = null;
let history = [];

function go(name, param, replace){
  if(current === name && !param) return;
  if(!replace) history.push({ page:current, param:currentParam });
  const r = ROUTES[name];
  if(!r){ console.warn('no route', name); return; }
  current = name; currentParam = param;
  paint(r);
}
function back(){
  const prev = history.pop();
  if(prev){ current = prev.page; currentParam = prev.param; paint(ROUTES[current]); }
  else { go('home', null, true); }
}

function paint(r){
  const s = stage();
  const old = s.firstElementChild;
  const same = old && old.dataset.page === current;
  const el = document.createElement('div');
  el.className = 'screen enter' + (r.tab || r.bare ? '' : ' scroll');
  el.dataset.page = current;
  el.innerHTML = r.render();
  s.appendChild(el);
  if(old){
    if(same){ old.remove(); el.classList.remove('enter'); }   // 同页重绘：不闪动
    else { old.classList.add('leave'); setTimeout(()=>old.remove(), 220); } // 换页：滑出过渡
  }
  bindCommon(el);
  if(r.tab) el.insertAdjacentHTML('beforeend', tabbarHTML(r.tab));
  if(r.park){ el.insertAdjacentHTML('beforeend', dockHTML()); setTimeout(parkInit, 30); }
  if(el.scrollHeight > el.clientHeight) el.classList.add('scroll');
  setTimeout(()=>el.classList.remove('enter'), 260);
}
/* ---------- 通用 Header ---------- */
function headerHTML(opt){
  opt = opt || {};
  if(opt.bare) return '';
  const icons = opt.noIcons ? '' : `
    <div class="icons">
      ${icon('search')}
      <span class="bell">${icon('bell')}</span>
      ${icon('compass')}
    </div>`;
  const brand = opt.back
    ? `<button class="backbtn" data-act="back" aria-label="Back">${icon('back')}</button>`
    : `<div class="brand">${luluLogo(23)}</div>`;
  const title = opt.title ? `<div class="title">${opt.title}</div>` : '';
  const right = opt.right || '';
  return `<div class="appbar${opt.back?' back':''}">${brand}${title}${opt.spread?'<div class="spacer"></div>':''}${icons}${right}</div>`;
}

/* ---------- 底部 Tab Bar ---------- */
function tabbarHTML(active){
  const items = [
    ['home','home','Home'],
    ['discover','discover','Discover'],
    ['park','globe','Park'],
    ['wardrobe','wardrobe','Wardrobe'],
    ['profile','profile','Profile'],
  ];
  return `<nav class="tabbar">${items.map(([id,ic,label])=>`
    <button class="tab ${active===id?'on':''}" data-go="${id}">
      ${icon(ic)}<span>${label}</span>
    </button>`).join('')}</nav>`;
}

/* ---------- Park Hub：三个子 Tab ---------- */
const PARK_SUBTABS = [
  { k:'plaza',    l:'Plaza' },
  { k:'circles',  l:'Circles' },
  { k:'challenges',l:'Challenges' },
];
let parkSub = 'plaza';

function renderParkHub(){
  return `
  ${headerHTML({})}
  <div class="screen-body scroll parkhub">
    <div class="ph-tabs" id="phtabs">
      ${PARK_SUBTABS.map(t=>`<button class="${parkSub===t.k?'on':''}" data-phtab="${t.k}">${t.l}</button>`).join('')}
      <i class="ph-ind"></i>
    </div>
    <div id="phbody">${parkSubBody()}</div>
  </div>
  <style>
    .parkhub{padding-bottom:16px}
    .ph-tabs{display:flex;gap:4px;margin:12px 20px 0;background:var(--surface-2);border-radius:var(--r-pill);padding:3px;position:relative}
    .ph-tabs button{flex:1;height:32px;border-radius:var(--r-pill);font-size:12.5px;font-weight:600;color:var(--ink-3);position:relative;z-index:2;transition:color .2s}
    .ph-tabs button.on{color:#fff}
    .ph-ind{position:absolute;left:3px;top:3px;bottom:3px;width:calc(33.33% - 2px);background:var(--ink);border-radius:var(--r-pill);z-index:1;transition:transform .26s cubic-bezier(.22,1,.36,1)}
  </style>`;
}

function parkSubBody(){
  if(parkSub==='plaza'){
    return `
    <div class="ph-hero">
      <div class="ph-hero-img" style="background-image:url('assets/img/park_hero.jpg')"></div>
      <div class="ph-hero-tx">
        <h1>THE MOVEMENT PARK</h1>
        <p class="serif">Your Avatar, Your Circle.<br>Move Together, Offline Too.</p>
        <button class="btn sm" data-act="openplaza">Enter the Plaza</button>
      </div>
      <div class="ph-dots"><i class="on"></i><i></i><i></i></div>
    </div>

    <div class="sect">
      <div class="sect-head"><div class="sect-title">JOIN A CIRCLE</div>
        <button class="sect-more" data-act="parkcircles">See All ${icon('chevR')}</button>
      </div>
      <div class="cir-row">
        ${CIRCLES.map(c=>`
          <button class="cir" data-circle="${c.id}">
            <span class="cir-ic" style="background:${c.color}1f">${icon(c.icon).replace('<svg ',`<svg style="stroke:${c.color}" `)}</span>
            <b>${c.name}</b>
            <span class="cir-mem">${c.members} Members</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="sect">
      <div class="sect-head"><div class="sect-title">QUICK ACCESS</div></div>
      <div class="qa-grid">
        ${[['gift','New Member Gift','coins'],['coins','Move Coins','coins'],['crown','My Level Lv.'+state.level,'level'],['friends','Invite Friends','users'],['benefits','Benefits & Events','calendar']].map(([ic,t,k])=>`
          <button class="qa" data-qa="${k}">
            <span class="qa-ic">${icon(ic)}</span>
            <span>${t}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="sect" style="padding-bottom:20px">
      <div class="sect-head"><div class="sect-title">LIVE NOW</div></div>
      <div class="live-list">
        ${[['Tennis Challenge','Ends in 2h','tennis','#8FBF3F'],['Yoga Garden class','Today 18:00','yoga','#9B7BB8'],['Running Club 12km','This week','running','#B5573F']].map(l=>`
          <button class="live-item" data-live="${l[2]}">
            <span class="li-dot" style="background:${l[3]}"></span>
            <span class="li-tx"><b>${l[0]}</b><span>${l[1]}</span></span>
            ${icon('chevR','chev')}
          </button>`).join('')}
      </div>
    </div>

    <style>
      .ph-hero{margin:14px 20px 0;border-radius:var(--r-xl);overflow:hidden;position:relative;height:280px;background:var(--ink)}
      .ph-hero-img{position:absolute;inset:0;background-size:cover;background-position:center}
      .ph-hero-img::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(22,21,15,.76),rgba(22,21,15,.16))}
      .ph-hero-tx{position:absolute;left:16px;top:16px;right:40%;color:#fff;z-index:2}
      .ph-hero-tx h1{font-size:24px;font-weight:800;line-height:1.05;letter-spacing:-.02em;text-shadow:0 2px 12px rgba(0,0,0,.4)}
      .ph-hero-tx p{font-size:12.5px;color:rgba(255,255,255,.85);margin-top:9px;line-height:1.4}
      .ph-hero-tx .btn{margin-top:14px;background:#fff;color:var(--ink)}
      .ph-dots{position:absolute;left:16px;bottom:14px;display:flex;gap:5px;z-index:2}
      .ph-dots i{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.5)}
      .ph-dots i.on{width:16px;border-radius:3px;background:#fff}
      .cir-row{display:flex;gap:10px;overflow-x:auto;padding:0 20px 4px;scrollbar-width:none}
      .cir-row::-webkit-scrollbar{display:none}
      .cir{flex:none;width:104px;text-align:left}
      .cir-ic{width:48px;height:48px;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;margin-bottom:8px}
      .cir-ic svg{width:23px;height:23px;stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round}
      .cir b{display:block;font-size:12px;font-weight:700}
      .cir-mem{font-size:10.5px;color:var(--ink-3)}
      .qa-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
      .qa{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
      .qa-ic{width:46px;height:46px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center}
      .qa-ic svg{width:21px;height:21px;stroke:var(--ink-2);stroke-width:1.5;fill:none}
      .qa span{font-size:9.5px;font-weight:600;color:var(--ink-2);line-height:1.2}
      .live-list{display:flex;flex-direction:column;gap:8px}
      .live-item{display:flex;align-items:center;gap:11px;padding:12px 13px;border:1px solid var(--line);border-radius:var(--r-md);text-align:left}
      .li-dot{width:8px;height:8px;border-radius:50%;flex:none;animation:pulse 1.6s infinite}
      .li-tx{flex:1;display:flex;flex-direction:column}
      .li-tx b{font-size:13px;font-weight:700}
      .li-tx span{font-size:11px;color:var(--ink-3)}
      .live-item .chev{width:15px;height:15px;flex:none;stroke:var(--ink-3);stroke-width:1.8;fill:none}
    </style>`;
  }
  if(parkSub==='circles'){
    return `
    <div class="sect" style="margin-top:16px">
      <div class="sect-head"><div class="sect-title">ALL CIRCLES</div></div>
      <div class="cl-list">
        ${CIRCLES.map(c=>`
          <button class="cl-card" data-circle="${c.id}">
            <span class="cl-ic" style="background:${c.color}1f">${icon(c.icon).replace('<svg ',`<svg style="stroke:${c.color}" `)}</span>
            <span class="cl-tx">
              <b>${c.name}</b>
              <span>${c.members} Members</span>
              <span class="cl-d">${c.desc}</span>
            </span>
            ${state.circles.includes(c.id)?'<span class="cl-joined">Joined</span>':icon('chevR','chev')}
          </button>`).join('')}
      </div>
    </div>
    <div style="height:24px"></div>
    <style>
      .cl-list{display:flex;flex-direction:column;gap:10px}
      .cl-card{display:flex;align-items:center;gap:12px;padding:13px;border:1px solid var(--line);border-radius:var(--r-lg);text-align:left}
      .cl-ic{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none}
      .cl-ic svg{width:22px;height:22px;stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round}
      .cl-tx{flex:1;min-width:0;display:flex;flex-direction:column}
      .cl-tx b{font-size:14px;font-weight:800}
      .cl-tx span{font-size:11px;color:var(--ink-3)}
      .cl-d{font-size:11.5px;color:var(--ink-2)!important;margin-top:4px;line-height:1.4}
      .cl-card .chev{width:16px;height:16px;flex:none;stroke:var(--ink-3);stroke-width:1.8;fill:none}
      .cl-joined{font-size:11px;font-weight:700;color:var(--success);flex:none}
    </style>`;
  }
  return `
  <div class="sect" style="margin-top:16px">
    <div class="sect-head"><div class="sect-title">CHALLENGES</div></div>
    <div id="parkchs">${CHALLENGES.map(ch=>chCard(ch)).join('')}</div>
  </div>
  <div style="height:24px"></div>`;
}

/* ---------- 广场底部 Dock ---------- */
function dockHTML(){
  const items = [
    ['calendar','calendar','Activity<br>Calendar'],
    ['challenges','challenge','Challenges'],
    ['photo','camera','Photo'],
    ['friends','friends','Find Friends'],
    ['badges','badge','My Badges'],
  ];
  return `<nav class="dock">
    <button class="ditem" data-go="calendar">${icon('calendar')}<span>Activity<br>Calendar</span></button>
    <button class="ditem" data-go="challenges">${icon('challenge')}<span>Challenges</span></button>
    <div class="shotwrap"><button class="shot" data-go="photo">${icon('camera')}</button></div>
    <button class="ditem" data-go="friends">${icon('friends')}<span>Find Friends</span></button>
    <button class="ditem" data-go="badges">${icon('badge')}<span>My Badges</span></button>
  </nav>`;
}

/* ---------- Toast ---------- */
function toast(msg){
  let host = document.getElementById('toast');
  if(!host){
    host = document.createElement('div');
    host.id = 'toast';
    device().appendChild(host);
  }
  host.innerHTML = `<div class="toast">${msg}</div>`;
  requestAnimationFrame(()=>host.querySelector('.toast').classList.add('on'));
  clearTimeout(host._t);
  host._t = setTimeout(()=>{
    const t = host.querySelector('.toast');
    if(t){ t.classList.remove('on'); setTimeout(()=>{ if(host.innerHTML.trim()==='') host.innerHTML=''; },250); }
  }, 2400);
}

/* ---------- Drawer ---------- */
function openDrawer(html){
  closeDrawer();
  const scrim = document.createElement('div');
  scrim.className = 'scrim';
  const dr = document.createElement('div');
  dr.className = 'drawer';
  dr.innerHTML = `<div class="grab"></div>` + html;
  device().appendChild(scrim);
  device().appendChild(dr);
  requestAnimationFrame(()=>{ scrim.classList.add('on'); dr.classList.add('on'); });
  scrim.addEventListener('click', closeDrawer);
  return dr;
}
function closeDrawer(){
  const s = device().querySelector('.scrim');
  const d = device().querySelector('.drawer');
  if(s) s.remove();
  if(d) d.remove();
}

/* ---------- 事件绑定 ---------- */
function bindCommon(root){
  root.addEventListener('click', e => {
    const go_ = e.target.closest('[data-go]');
    if(go_){ go(go_.dataset.go); return; }
    const act = e.target.closest('[data-act]');
    if(act){
      const a = act.dataset.act;
      if(a==='back'){ back(); return; }
      if(a==='close'){ back(); return; }
      if(a==='toast'){ toast(act.dataset.msg); return; }
      if(a==='reset'){ resetAll(); go('splash',null,true); toast('Progress reset'); return; }
    }
  });
}

/* ---------- 工具 ---------- */
const $  = (s,r)=> (r||document).querySelector(s);
const $$ = (s,r)=> Array.from((r||document).querySelectorAll(s));
function esc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function money(n){ return '$' + n; }
