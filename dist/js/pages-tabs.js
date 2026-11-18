/* ============================================================
   P04 Home / P05 Discover / P06 My Avatar / P07 Wardrobe / P08 Profile
   ============================================================ */

/* ---------- 首页 Hero 轮播数据 ---------- */
const HERO_SLIDES = [
  { k:'dress', title:'DRESS YOUR AVATAR', sub:'Your Sport. Your Style.', cta:'Explore', to:'match' },
  { k:'park',  title:'THE MOVEMENT PARK', sub:'Your Avatar, Your Circle. Move Together, Offline Too.', cta:'Enter the Park', to:'park' },
  { k:'new',   title:'NEW YOGA COLLECTION', sub:'The new season, in motion.', cta:'Shop New Yoga', to:'discover' },
];

function companionLine(){
  const s=state;
  if(s.planStreak===0) return 'Long time no see. Want to adjust your plan?';
  if(s.lastVisit && s.planStreak>=3) return `You moved ${s.planStreak} times this week.`;
  return "Morning — ready for today's practice?";
}
function moodOf(){
  return state.avatar.mood || 'happy';
}

function renderHome(){
  const a=state.avatar;
  const ch=chById(a.char);
  const owned=ownedProducts();
  const newArr=[PRODUCTS.filter(p=>p.id==='bra_align')[0],PRODUCTS.filter(p=>p.id==='leg_align')[0],PRODUCTS.filter(p=>p.id==='jkt_define')[0]];
  return `
  ${headerHTML({})}
  <div class="screen-body scroll home-body">

    <div class="hero" id="hero">
      <div class="hero-slides" id="heroslides">
        ${HERO_SLIDES.map((s,i)=>`
          <div class="hero-slide ${i===0?'on':''}" data-slide="${i}">
            <div class="hero-bg ${s.k}"></div>
            ${s.k==='dress'?`<div class="hero-fig"><img src="assets/av/ch_boxer/full.png" alt=""></div>`:''}
            ${s.k==='park'?`<div class="hero-bgimg" style="background-image:url('assets/img/park_hero.jpg')"></div>`:''}
            ${s.k==='new'?`<div class="hero-bgimg" style="background-image:url('assets/img/new_arrivals.jpg')"></div>`:''}
            <div class="hero-txt">
              <h1>${s.title}</h1>
              <p>${s.sub}</p>
            </div>
            <button class="hero-cta" data-go="${s.to}">${s.cta}</button>
          </div>`).join('')}
      </div>
      <div class="hero-dots">
        ${HERO_SLIDES.map((s,i)=>`<i class="${i===0?'on':''}"></i>`).join('')}
      </div>
    </div>

    <button class="companion" data-go="myavatar">
      <span class="av c-${moodOf()}" data-av>${avatarHTML({})}</span>
      <span class="ctxt">
        <b>${a.name||ch.name}</b>
        <span>${companionLine()}</span>
      </span>
      ${icon('chevR','chev')}
    </button>

    <div class="sect" style="margin-top:18px">
      <div class="chiprow" id="homesports">
        ${SPORTS.map(s=>`<button class="chip ${state.style.sport===s.name?'on':''}" data-hsport="${s.id}">${icon(s.icon)}${s.name}</button>`).join('')}
      </div>
    </div>

    <div class="sect">
      <div class="sect-head">
        <div class="sect-title">NEW ARRIVALS</div>
        <button class="sect-more" data-go="discover">See All ${icon('chevR')}</button>
      </div>
      <div class="na-row">
        ${newArr.map((p,i)=>`
          <button class="na-card" data-product="${p.id}">
            <span class="na-img"><img src="${p.img}" alt=""></span>
            <span class="na-name">${p.name}</span>
            <span class="na-price">${money(p.price)}</span>
          </button>`).join('')}
      </div>
    </div>

    <button class="park-entry" data-go="park">
      <span class="park-thumb" style="background-image:url('assets/img/park_hero.jpg')"></span>
      <span class="park-txt">
        <b>THE MOVEMENT PARK</b>
        <span class="serif">Your Avatar, Your Circle.</span>
        <span class="live-row"><i class="dot"></i>Tennis Meetup · Sat 10:00</span>
      </span>
      ${icon('chevR','chev')}
    </button>

    <div class="sect" style="padding-bottom:20px">
      <div class="sect-head">
        <div class="sect-title">MY WARDROBE</div>
        <button class="sect-more" data-go="wardrobe">See All ${icon('chevR')}</button>
      </div>
      <div class="wb-row">
        ${wardrobePreview().map(p=>`
          <button class="wb-cell" data-product="${p.id}">
            <span class="wb-img"><img src="${p.img}" alt=""></span>
            <span class="wb-name">${p.name.split(' ')[0]}</span>
          </button>`).join('')}
      </div>
    </div>
  </div>

  <style>
    .home-body{padding-bottom:12px}
    .hero{margin:16px 20px 0;border-radius:var(--r-xl);overflow:hidden;position:relative;height:300px;background:var(--ink)}
    .hero-slides{position:absolute;inset:0}
    .hero-slide{position:absolute;inset:0;opacity:0;transition:opacity .38s ease;display:block}
    .hero-slide.on{opacity:1}
    .hero-bg{position:absolute;inset:0}
    .hero-bg.dress{background:radial-gradient(120% 90% at 60% 30%,#4A4238,#1E1B15 70%)}
    .hero-bgimg{position:absolute;inset:0;background-size:cover;background-position:center}
    .hero-bgimg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(22,21,15,.72) 0%,rgba(22,21,15,.18) 55%,rgba(22,21,15,.35) 100%)}
    .hero-fig{position:absolute;right:-2%;bottom:0;height:100%;display:flex;align-items:flex-end}
    .hero-fig img{height:100%;width:auto;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(0,0,0,.4))}
    .hero-txt{position:absolute;left:18px;top:18px;right:44%;z-index:3;color:#fff}
    .hero-txt h1{font-size:27px;font-weight:800;line-height:1.06;letter-spacing:-.03em;text-shadow:0 2px 14px rgba(0,0,0,.4)}
    .hero-txt p{font-size:12.5px;color:rgba(255,255,255,.85);margin-top:8px;line-height:1.4}
    .hero-cta{position:absolute;left:18px;bottom:16px;z-index:3;height:38px;padding:0 20px;border-radius:var(--r-pill);background:#fff;color:var(--ink);font-size:13.5px;font-weight:700}
    .hero-dots{position:absolute;left:18px;bottom:70px;z-index:4;display:flex;gap:5px}
    .hero-dots i{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.5);display:block}
    .hero-dots i.on{width:18px;border-radius:3px;background:#fff}

    .companion{display:flex;align-items:center;gap:11px;margin:14px 20px 0;padding:10px 13px;border:1px solid var(--line);border-radius:var(--r-lg);background:var(--paper);box-shadow:var(--shadow-1);text-align:left;width:calc(100% - 40px);cursor:pointer}
    .companion .av{width:40px;height:40px}
    .companion .av img{object-position:center 18%}
    .companion .ctxt{flex:1;min-width:0;display:flex;flex-direction:column}
    .companion .ctxt b{font-size:13px;font-weight:700}
    .companion .ctxt span{font-size:12px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .companion .chev{width:16px;height:16px;flex:none;stroke:var(--ink-3);stroke-width:1.8;fill:none}

    .na-row{display:flex;gap:11px}
    .na-card{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start}
    .na-img{width:100%;aspect-ratio:.82;background:var(--blush);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .na-img img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
    .na-name{font-size:11.5px;font-weight:600;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%}
    .na-price{font-size:11.5px;font-weight:700;color:var(--lulu-red)}

    .park-entry{display:flex;align-items:center;gap:12px;width:calc(100% - 40px);margin:22px 20px 0;padding:12px;border-radius:var(--r-lg);border:1px solid var(--line);background:var(--paper);text-align:left;box-shadow:var(--shadow-1)}
    .park-thumb{width:74px;height:74px;border-radius:var(--r-md);background-size:cover;background-position:center;flex:none}
    .park-txt{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
    .park-txt b{font-size:12px;font-weight:800;letter-spacing:.05em}
    .park-txt .serif{font-size:12px;color:var(--ink-2)}
    .live-row{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink-3);margin-top:3px}
    .live-row .dot{width:6px;height:6px;border-radius:50%;background:var(--rose-deep);display:block;animation:pulse 1.6s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    .park-entry .chev{width:16px;height:16px;flex:none;stroke:var(--ink-3);stroke-width:1.8;fill:none}

    .wb-row{display:flex;gap:11px}
    .wb-cell{flex:1;min-width:0}
    .wb-img{width:100%;aspect-ratio:1;background:var(--blush);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .wb-img img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
    .wb-name{display:block;font-size:11px;font-weight:600;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
  </style>`;
}

/* ---------- P05 Discover ---------- */
function renderDiscover(){
  const items = [
    { type:'collection', id:'newyoga' },
    { type:'product', id:'tank_sport' },
    { type:'scene', id:'tennis' },
    { type:'product', id:'jkt_define' },
    { type:'event', id:'e_tennis' },
    { type:'content', id:'amb' },
    { type:'product', id:'leg_classic' },
    { type:'scene', id:'yoga' },
    { type:'product', id:'jkt_wander' },
    { type:'event', id:'e_run' },
  ];
  return `
  ${headerHTML({})}
  <div class="screen-body scroll disc-body">
    <div class="disc-tabs" id="disctabs">
      ${['New Arrivals','Collections','Ambassadors','Classes','Journal'].map((t,i)=>`<button class="${i===0?'on':''}" data-dtab="${t}">${t}</button>`).join('')}
    </div>
    <div class="disc-grid">
      ${items.map(it=>discCard(it)).join('')}
    </div>
  </div>
  <style>
    .disc-body{padding-bottom:14px}
    .disc-tabs{display:flex;gap:20px;padding:14px 20px 12px;overflow-x:auto;scrollbar-width:none;position:sticky;top:0;background:var(--paper);z-index:5}
    .disc-tabs::-webkit-scrollbar{display:none}
    .disc-tabs button{font-size:13.5px;font-weight:600;color:var(--ink-3);white-space:nowrap;padding-bottom:6px;border-bottom:2px solid transparent}
    .disc-tabs button.on{color:var(--ink);border-bottom-color:var(--ink)}
    .disc-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 20px}
    .dc{border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden;background:var(--paper);display:flex;flex-direction:column;text-align:left}
    .dc .dcimg{width:100%;background:var(--blush);display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
    .dc .dcimg img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
    .dc .dcimg.scene{background:var(--surface)}
    .dc .dcimg.scene img{mix-blend-mode:normal}
    .dc .dcbody{padding:10px 11px 12px}
    .dc h4{font-size:12.5px;font-weight:700;line-height:1.3}
    .dc p{font-size:11px;color:var(--ink-3);margin-top:3px;line-height:1.4}
    .dc .price{font-size:12px;font-weight:700;color:var(--lulu-red);margin-top:5px}
    .dc .wide{grid-column:1 / -1}
    .dc .wide .dcimg{aspect-ratio:2.1}
    .dc .pill{position:absolute;top:8px;left:8px;height:22px;padding:0 9px;border-radius:var(--r-pill);background:var(--ink);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center}
    .dc .pill.red{background:var(--lulu-red)}
    .dc .pill.gold{background:var(--gold)}
    .dc .ev-day{font-size:10px;font-weight:800;color:var(--lulu-red);letter-spacing:.06em}
  </style>`;
}

function discCard(it){
  if(it.type==='product'){
    const p=prodById(it.id);
    return `<button class="dc" data-product="${p.id}">
      <span class="dcimg" style="aspect-ratio:.85"><img src="${p.img}" alt=""></span>
      <span class="dcbody"><h4>${p.name}</h4><p>${p.color} · ${p.sport}</p><span class="price">${money(p.price)}</span></span>
    </button>`;
  }
  if(it.type==='collection'){
    return `<button class="dc wide" data-go="discover">
      <span class="dcimg scene" style="background-image:url('assets/img/new_arrivals.jpg');background-size:cover;background-position:center"></span>
      <span class="dcbody"><span class="pill red">New collection</span><h4>New Yoga Collection</h4><p>The season's lineup, worn by the Park's most active members.</p></span>
    </button>`;
  }
  if(it.type==='scene'){
    const sc=SCENES.find(s=>s.id===it.id);
    const locked=state.level<sc.lvl;
    return `<button class="dc" data-sceneopen="${sc.id}">
      <span class="dcimg scene" style="aspect-ratio:.95;background-image:url('assets/img/park_hero.jpg');background-size:cover;background-position:center;filter:${locked?'grayscale(.85)':'none'}"></span>
      <span class="dcbody"><h4>${sc.name}</h4><p>${locked?`Unlock at Level ${sc.lvl}`:'Unlocked · set as your scene'}</p></span>
    </button>`;
  }
  if(it.type==='event'){
    const e=EVENTS.find(x=>x.id===it.id);
    return `<button class="dc" data-event="${e.id}">
      <span class="dcimg scene" style="aspect-ratio:1;background:${e.color}1f;position:relative">
        ${icon(e.icon).replace('<svg ', `<svg style="stroke:${e.color};width:34px;height:34px" `)}
      </span>
      <span class="dcbody"><span class="ev-day">${e.date.toUpperCase()}</span><h4 style="margin-top:4px">${e.name}</h4><p>${e.venue}</p></span>
    </button>`;
  }
  return `<button class="dc wide" data-go="discover">
    <span class="dcimg scene" style="aspect-ratio:2.4;background:linear-gradient(120deg,#F4E9D4,#FBF4F2)"></span>
    <span class="dcbody"><span class="pill gold">Ambassador</span><h4>"I started at 6am and now the Park is my warm-up."</h4><p>Ambassador · Sara Chen on building a morning ritual</p></span>
  </button>`;
}

function wardrobePreview(){
  const owned=ownedProducts();
  if(owned.length>=4) return owned.slice(0,4);
  const fill=PRODUCTS.filter(p=>!state.wardrobe.owned.includes(p.id));
  return owned.concat(fill).slice(0,4);
}

/* ---------- P06 My Avatar ---------- */
function renderMyAvatar(){
  const a=state.avatar;
  const ch=chById(a.char);
  const owned=ownedProducts();
  const nodes=[
    {id:'yoga',label:'Yoga',icon:'yoga'},
    {id:'tennis',label:'Tennis',icon:'tennis'},
    {id:'running',label:'Running Club',icon:'running'},
    {id:'hiking',label:'Hiking',icon:'hiking'},
    {id:'boxing',label:'Boxing',icon:'boxing'},
  ];
  return `
  ${headerHTML({back:true, spread:true, title:'MY AVATAR', right:`<button class="rbtn" data-go="editor">Edit</button>`})}
  <div class="screen-body scroll av-body">
    <div class="idcard av-card-wrap">
      <button class="idcard-fig" data-go="editor">
        <span class="av ring" data-av>${avatarHTML({})}</span>
      </button>
      <span class="idmeta">
        <b>MY AVATAR</b>
        <span class="lv">Level ${state.level}</span>
        <span class="pbar"><i style="width:${(levelProg()*100).toFixed(1)}%"></i></span>
      </span>
      <button class="idcard-edit" data-go="editor">${icon('edit')}</button>
    </div>

    <div class="sect">
      <div class="sect-head">
        <div class="sect-title">WEARING NOW</div>
        <button class="sect-more" data-go="dressing">Dressing Room ${icon('chevR')}</button>
      </div>
      <div class="wb-row">
        ${(CHAR_OUTFIT[a.char]||[]).map(id=>{
          const wp=prodById(id); if(!wp) return '';
          return `<button class="wb-cell" data-product="${id}">
            <span class="wb-img"><img src="${wp.img}" alt=""></span>
            <span class="wb-name">${wp.name.split(' ')[0]}</span>
          </button>`;
        }).join('')}
      </div>
    </div>

    <div class="sect">
      <div class="sect-head">
        <div class="sect-title">MY DIGITAL WARDROBE</div>
        <button class="sect-more" data-go="wardrobe">${icon('chevR')}</button>
      </div>
      <div class="wb-row">
        ${wardrobePreview().map(p=>`
          <button class="wb-cell" data-product="${p.id}">
            <span class="wb-img"><img src="${p.img}" alt=""></span>
            <span class="wb-name">${p.name.split(' ')[0]}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="sect">
      <div class="sect-head">
        <div class="sect-title">MY MOVEMENT JOURNEY</div>
        <button class="sect-more" data-go="myavatar">${icon('chevR')}</button>
      </div>
      <div class="journey">
        <svg class="jpath" viewBox="0 0 335 96" preserveAspectRatio="none"><path d="M8 60 C 60 16, 120 92, 168 48 S 280 8, 328 44" fill="none" stroke="var(--line)" stroke-width="2"/></svg>
        ${nodes.map((n,i)=>{
          const done=state.journey[n.id];
          return `<button class="jnode ${done?'done':''} ${i%2?'low':''}" data-jnode="${n.id}" style="left:${6+i*23.6}%">
            <span class="jcirc">${icon(n.icon)}${done?'<i class="tick">'+icon('check')+'</i>':''}</span>
            <span class="jlab">${n.label}</span>
          </button>`;
        }).join('')}
      </div>
      <div class="jbottom">
        <div class="jcard">
          <span class="jc-ic">${icon('boxing')}</span>
          <b>${(SPORTS.find(s=>s.id===(state.movement.sports[0]||'boxing'))||{}).name}</b>
          <span>Your next movement</span>
        </div>
        <p class="serif jquote">Your avatar moves<br>where you move.</p>
      </div>
    </div>

    <div class="sect" style="padding-bottom:22px">
      <div class="growcard">
        <div class="grow-l">
          <b>Level ${state.level} → ${state.level+1}</b>
          <span>${levelNeed()-state.coins} Move Coins to go</span>
        </div>
        <div class="grow-r">
          ${icon('coins')}
          <span>${state.coins}</span>
        </div>
      </div>
    </div>
  </div>
  <style>
    .av-body{padding-bottom:12px}
    .idcard{display:flex;align-items:center;gap:13px;width:calc(100% - 40px);margin:16px 20px 0;padding:14px;border:1px solid var(--line);border-radius:var(--r-lg);background:var(--paper);box-shadow:var(--shadow-1);text-align:left}
    .idcard .av img{object-position:center 12%}
    .idmeta{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
    .idmeta b{font-size:13px;font-weight:800;letter-spacing:.05em}
    .idmeta .lv{font-size:12px;color:var(--ink-2);font-weight:600}
    .idmeta .pbar{margin-top:6px;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden;display:flex;gap:2px;padding:0}
    .idmeta .pbar i{display:block;height:100%;background:var(--ink);border-radius:2px}
    .idcard .chev{width:17px;height:17px;flex:none;stroke:var(--ink-3);stroke-width:1.8;fill:none}
    .av-card-wrap{position:relative}
    .idcard-fig{width:74px;height:96px;flex:none;border-radius:var(--r-md);overflow:hidden;background:var(--surface);position:relative}
    .idcard-fig .av{position:absolute;inset:0}
    .idcard-edit{position:absolute;right:12px;top:12px;width:32px;height:32px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;flex:none}
    .idcard-edit svg{width:16px;height:16px;stroke:var(--ink-2);stroke-width:1.6;fill:none}

    .journey{position:relative;height:104px;margin:0 20px}
    .jpath{position:absolute;left:0;top:6px;width:100%;height:96px}
    .jnode{position:absolute;top:2px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:5px;width:64px}
    .jnode.low{top:44px}
    .jcirc{width:40px;height:40px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;position:relative}
    .jcirc svg{width:19px;height:19px;stroke:var(--ink-3);stroke-width:1.5;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .jnode.done .jcirc{background:var(--ink)}
    .jnode.done .jcirc svg{stroke:#fff}
    .jnode.done .tick{position:absolute;right:-3px;bottom:-3px;width:15px;height:15px;border-radius:50%;background:var(--success);display:flex;align-items:center;justify-content:center;border:1.5px solid var(--paper)}
    .jnode.done .tick svg{width:9px;height:9px;stroke:#fff;stroke-width:3}
    .jlab{font-size:10px;font-weight:600;color:var(--ink-2);text-align:center;line-height:1.2}

    .jbottom{display:flex;align-items:center;gap:14px;margin:2px 20px 0}
    .jcard{width:118px;flex:none;background:var(--ink);color:#fff;border-radius:var(--r-md);padding:11px 12px;display:flex;flex-direction:column;gap:2px}
    .jcard .jc-ic svg{width:18px;height:18px;stroke:#fff;stroke-width:1.6;fill:none}
    .jcard b{font-size:12.5px;font-weight:700;margin-top:3px}
    .jcard span{font-size:10px;color:rgba(255,255,255,.6)}
    .jquote{font-size:14px;color:var(--ink);line-height:1.35}

    .growcard{display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:var(--r-lg);background:var(--gold-soft);border:1px solid #E7D7B8}
    .grow-l{flex:1;display:flex;flex-direction:column}
    .grow-l b{font-size:13.5px;font-weight:700;color:#633806}
    .grow-l span{font-size:11.5px;color:var(--gold);margin-top:2px}
    .grow-r{display:flex;align-items:center;gap:6px;color:var(--gold)}
    .grow-r svg{width:20px;height:20px;stroke:currentColor;stroke-width:1.5;fill:none}
    .grow-r span{font-size:16px;font-weight:800}
  </style>`;
}

/* ---------- P07 Wardrobe ---------- */
function renderWardrobe(){
  const tabs=[{k:'owned',l:'Owned'},{k:'wishlist',l:'Wishlist'},{k:'unlocked',l:'Unlocked'}];
  const cats=['All','Top','Bottom','Outerwear','Shoes','Accessories'];
  return `
  ${headerHTML({title:'MY DIGITAL WARDROBE', right:`<button class="rbtn" data-go="dressing">Wear</button>`})}
  <div class="screen-body scroll wr-body">
    <div class="seg-tabs" id="wrtabs">
      ${tabs.map((t,i)=>`<button class="${i===0?'on':''}" data-wrtab="${t.k}">${t.l}<span>${wrCount(t.k)}</span></button>`).join('')}
      <i class="seg-ind"></i>
    </div>
    <div class="chiprow" id="wrcats" style="margin-top:12px">
      ${cats.map((c,i)=>`<button class="chip mini ${i===0?'on':''}" data-wrcat="${c}">${c}</button>`).join('')}
    </div>
    <div class="pgrid" id="wrgrid">${renderWardrobeGrid()}</div>
    <div class="wr-note">
      ${icon('info')}<span>Link an in-store purchase with your member account or receipt QR. Bought in store, worn here.</span>
    </div>
  </div>
  <style>
    .wr-body{padding-bottom:18px}
    .seg-tabs{display:flex;margin:14px 20px 0;background:var(--surface-2);border-radius:var(--r-pill);padding:3px;position:relative}
    .seg-tabs button{flex:1;height:32px;border-radius:var(--r-pill);font-size:12.5px;font-weight:600;color:var(--ink-3);display:flex;align-items:center;justify-content:center;gap:5px;position:relative;z-index:2;transition:color .2s}
    .seg-tabs button.on{color:#fff}
    .seg-tabs button span{font-size:10px;opacity:.75}
    .seg-ind{position:absolute;left:3px;top:3px;bottom:3px;width:calc(33.33% - 2px);background:var(--ink);border-radius:var(--r-pill);z-index:1;transition:transform .26s cubic-bezier(.22,1,.36,1)}
    .wr-note{display:flex;gap:8px;margin:18px 20px 0;padding:11px 13px;border-radius:var(--r-md);background:var(--surface);font-size:11.5px;color:var(--ink-2);line-height:1.45}
    .wr-note svg{width:16px;height:16px;flex:none;stroke:var(--ink-3);stroke-width:1.5;fill:none;margin-top:1px}
    .wr-empty{text-align:center;padding:50px 40px}
    .wr-empty .ei{width:56px;height:56px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
    .wr-empty .ei svg{width:26px;height:26px;stroke:var(--ink-3);stroke-width:1.4;fill:none}
    .wr-empty p{font-size:13px;color:var(--ink-2);line-height:1.5}
    .wr-empty button{margin-top:14px;font-size:13px;font-weight:700;color:var(--ink);display:inline-flex;align-items:center;gap:3px}
    .wr-empty button svg{width:13px;height:13px;stroke:currentColor;stroke-width:2;fill:none}
  </style>`;
}
function wrCount(k){
  if(k==='owned') return state.wardrobe.owned.length;
  if(k==='wishlist') return state.wardrobe.wishlist.length;
  return state.wardrobe.unlocked.length;
}

/* ---------- P08 Profile ---------- */
function renderProfile(){
  const a=state.avatar, ch=chById(a.char);
  const rows1=[
    ['badge','My Badges', state.badges.length+' earned'],
    ['calendar','Activity Calendar',''],
    ['challenge','Challenges', state.joinedChallenges.length+' joined'],
    ['crown','My Level & Rewards','Level '+state.level],
  ];
  const rows2=[
    ['gift','Collection', state.boundFigure?'1 figure bound':'Unlock yours'],
    ['sparkle','Preferences',''],
    ['shield','Privacy & Sharing',''],
    ['store','Linked Accounts',''],
  ];
  const rows3=[
    ['bell','Notifications',''],
    ['info','Help & Support',''],
  ];
  return `
  ${headerHTML({})}
  <div class="screen-body scroll pf-body">
    <div class="pf-head">
      <span class="av" style="width:92px;height:92px"><img src="${ch.img}" alt=""></span>
      <div class="pf-id">
        <b>${a.name||ch.name}</b>
        <span>Movement ID · LM-${2841+state.level}</span>
        <span class="lv">Level ${state.level}</span>
        <span class="pbar"><i style="width:${(levelProg()*100).toFixed(1)}%"></i></span>
      </div>
    </div>

    <div class="pf-stats">
      <div class="st"><b>${state.coins}</b><span>Move Coins</span></div>
      <div class="st"><b>${state.badges.length}</b><span>Badges</span></div>
      <div class="st"><b>${state.planStreak}</b><span>Day streak</span></div>
    </div>

    <div class="pf-list">
      ${rows1.map(r=>pfRow(r[0],r[1],r[2],'group1')).join('')}
    </div>
    <div class="pf-list">
      ${rows2.map(r=>pfRow(r[0],r[1],r[2],'group2')).join('')}
    </div>
    <div class="pf-list">
      ${rows3.map(r=>pfRow(r[0],r[1],r[2],'group3')).join('')}
    </div>

    <div class="pf-priv">
      <div class="pf-priv-h">${icon('shield')}<b>Privacy & Sharing</b></div>
      <div class="pf-setrow">
        <span class="slab">Who can see my avatar</span>
        <div class="seg-mini" id="pfvis">
          ${[['me','Only Me'],['circle','My Circles'],['all','Everyone']].map(([k,l])=>`<button class="${state.visibility===k?'on':''}" data-vis="${k}">${l}</button>`).join('')}
        </div>
      </div>
      <div class="pf-setrow"><span class="slab">Allow friend requests</span>
        <button class="toggle ${state.allowRequests?'on':''}" data-toggle="allowRequests"><i></i></button>
      </div>
      <div class="pf-setrow"><span class="slab">Show my location</span>
        <button class="toggle ${state.showLocation?'on':''}" data-toggle="showLocation"><i></i></button>
      </div>
      <p class="pf-privnote">Your avatar only appears in the Park if you choose. Location is never shown to others.</p>
    </div>

    <div class="pf-reset"><button data-act="reset">Reset demo progress</button></div>
  </div>
  <style>
    .pf-body{padding-bottom:26px}
    .pf-head{display:flex;gap:15px;align-items:center;padding:20px 20px 16px}
    .pf-head .av img{object-position:center 10%}
    .pf-id{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
    .pf-id b{font-size:17px;font-weight:800;letter-spacing:-.02em}
    .pf-id span{font-size:11.5px;color:var(--ink-3)}
    .pf-id .lv{font-size:12px;color:var(--ink-2);font-weight:700}
    .pf-id .pbar{margin-top:5px;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden}
    .pf-id .pbar i{display:block;height:100%;background:var(--ink)}
    .pf-stats{display:flex;margin:0 20px;background:var(--surface);border-radius:var(--r-lg);padding:14px 0}
    .pf-stats .st{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;border-right:1px solid var(--line)}
    .pf-stats .st:last-child{border-right:none}
    .pf-stats b{font-size:19px;font-weight:800}
    .pf-stats .st:nth-child(1) b{color:var(--gold)}
    .pf-stats span{font-size:10.5px;color:var(--ink-3)}
    .pf-list{margin:18px 20px 0;border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden}
    .pf-row{display:flex;align-items:center;gap:12px;padding:13px 14px;border-bottom:1px solid var(--line-soft);width:100%;text-align:left}
    .pf-row:last-child{border-bottom:none}
    .pf-row .ri{width:22px;height:22px;flex:none;display:flex;align-items:center;justify-content:center}
    .pf-row .ri svg{width:19px;height:19px;stroke:var(--ink);stroke-width:1.5;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .pf-row .rl{font-size:14px;font-weight:600}
    .pf-row .rv{margin-left:auto;font-size:12px;color:var(--ink-3)}
    .pf-row .chev{width:16px;height:16px;flex:none;stroke:var(--ink-3);stroke-width:1.8;fill:none}
    .pf-priv{margin:18px 20px 0;border:1px solid var(--line);border-radius:var(--r-lg);padding:14px}
    .pf-priv-h{display:flex;align-items:center;gap:8px;margin-bottom:10px}
    .pf-priv-h svg{width:18px;height:18px;stroke:var(--ink);stroke-width:1.5;fill:none}
    .pf-priv-h b{font-size:13px;font-weight:700}
    .pf-setrow{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--line-soft)}
    .pf-setrow .slab{font-size:13px;font-weight:500}
    .seg-mini{margin-left:auto;display:flex;background:var(--surface-2);border-radius:var(--r-pill);padding:2px}
    .seg-mini button{height:24px;padding:0 9px;border-radius:var(--r-pill);font-size:10.5px;font-weight:600;color:var(--ink-3)}
    .seg-mini button.on{background:var(--ink);color:#fff}
    .toggle{margin-left:auto;width:44px;height:26px;border-radius:13px;background:var(--surface-2);position:relative;transition:background .2s;flex:none}
    .toggle i{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .2s}
    .toggle.on{background:var(--ink)}
    .toggle.on i{transform:translateX(18px)}
    .pf-privnote{font-size:11px;color:var(--ink-3);line-height:1.45;margin-top:8px}
    .pf-reset{text-align:center;margin-top:22px}
    .pf-reset button{font-size:12px;color:var(--ink-3);text-decoration:underline}
  </style>`;
}
function pfRow(ic,label,val,group){
  const map={group1:'group1',group2:'group2',group3:'group3'};
  const route={ 'My Badges':'badges','Activity Calendar':'calendar','Challenges':'challenges','Collection':'collection' };
  const act = route[label] ? `data-go="${route[label]}"` : `data-act="toast" data-msg="${label} is ready to connect in Phase 2"`;
  return `<button class="pf-row" ${act}>
    <span class="ri">${icon(ic)}</span>
    <span class="rl">${label}</span>
    ${val?`<span class="rv">${val}</span>`:''}
    ${icon('chevR','chev')}
  </button>`;
}
