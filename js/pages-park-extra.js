/* ============================================================
   LULULEMON AI ME · P15 Circle / P16 Avatar Card / P17 Photo
   （新版视觉：真实 logo、真实商品图、可返回、评价与购物车）
   ============================================================ */

/* ---------- P15 Circle Detail ---------- */
function renderCircle(){
  const id = currentParam || 'tennis';
  const c = CIRCLES.find(x => x.id === id) || CIRCLES[0];
  const rewards = [
    { n:'Tennis Event Outfit', ic:'wardrobe', cond:'Check in at a Tennis event', prog:100 },
    { n:'Court Badge', ic:'badge', cond:'Complete 3 Tennis sessions', prog:66 },
    { n:'Duo Move', ic:'friends', cond:'Complete a duo mission', prog:33 },
  ];
  return `
  ${headerHTML({back:true, spread:true, title:'CIRCLE', right:`<button class="rbtn" data-act="share">${icon('share')}</button>`})}
  <div class="screen-body scroll ci-body">
    <div class="ci-banner" style="background-image:url('assets/img/circle_tennis.jpg')">
      <div class="ci-ban-grad"></div>
      <span class="ci-logo">${omega(28)}</span>
    </div>
    <div class="ci-title">
      <div>
        <h1>The ${c.name}</h1>
        <span class="ci-mem">${c.members} Members</span>
      </div>
      <button class="btn sm" data-act="joincircle" data-circle="${c.id}">${state.circles.includes(c.id)?'Joined':'Join'}</button>
    </div>
    <p class="ci-desc">${c.desc}</p>

    <div class="ci-tabs" id="citabs">
      ${['Feed','Events','Challenges','Rewards'].map((t,i)=>`<button class="${i===0?'on':''}" data-citab="${t}">${t}</button>`).join('')}
    </div>

    <div id="cipanel">${ciPanel('Feed', c)}</div>
  </div>
  <div class="footbar ci-foot">
    <button class="evcard" data-event="e_tennis">
      <span class="ev-ic">${icon('calendar')}</span>
      <span class="ev-txt">
        <span class="ev-h">Upcoming Event</span>
        <b>lululemon Tennis Meetup</b>
        <span>Sat, Nov 16 &nbsp;10:00–12:00</span>
        <span>Shenzhen Tennis Club</span>
      </span>
      ${icon('chevR','chev')}
    </button>
  </div>
  <style>
    .ci-body{padding-bottom:120px}
    .ci-banner{height:180px;background-size:cover;background-position:center 30%;position:relative}
    .ci-ban-grad{position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,21,15,.05) 50%,rgba(22,21,15,.4))}
    .ci-logo{position:absolute;right:14px;top:12px;color:#fff;opacity:.9}
    .ci-title{display:flex;align-items:center;gap:12px;padding:14px 20px 4px}
    .ci-title h1{font-size:20px;font-weight:800;letter-spacing:-.02em}
    .ci-mem{font-size:12px;color:var(--ink-3);display:block;margin-top:2px}
    .ci-title .btn{margin-left:auto}
    .ci-desc{font-size:12.5px;color:var(--ink-2);line-height:1.5;padding:2px 20px 12px}
    .ci-tabs{display:flex;gap:22px;padding:0 20px;border-bottom:1px solid var(--line);overflow-x:auto;scrollbar-width:none}
    .ci-tabs::-webkit-scrollbar{display:none}
    .ci-tabs button{font-size:13px;font-weight:600;color:var(--ink-3);padding:8px 0 10px;border-bottom:2px solid transparent;white-space:nowrap}
    .ci-tabs button.on{color:var(--ink);border-bottom-color:var(--ink)}
    .post{margin:14px 20px 0;padding:13px;border:1px solid var(--line);border-radius:var(--r-lg)}
    .post-h{display:flex;align-items:center;gap:9px}
    .post-h .av{width:36px;height:36px;border-radius:50%;overflow:hidden;flex:none}
    .post-h .av img{width:100%;height:100%;object-fit:cover;object-position:center 8%}
    .post-h .pn{font-size:13.5px;font-weight:700;display:flex;align-items:center;gap:5px}
    .post-h .lv{font-size:9.5px;font-weight:800;color:var(--ink-3);background:var(--surface-2);padding:2px 6px;border-radius:var(--r-pill)}
    .post-h .tm{margin-left:auto;font-size:11px;color:var(--ink-3)}
    .post-txt{font-size:13.5px;line-height:1.5;margin-top:9px}
    .post-imgs{display:flex;gap:8px;margin-top:10px}
    .post-imgs img{width:96px;height:110px;object-fit:contain;background:var(--blush);border-radius:var(--r-sm)}
    .post-acts{display:flex;align-items:center;gap:16px;margin-top:12px;padding-top:11px;border-top:1px solid var(--line-soft)}
    .post-acts button{display:flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;color:var(--ink-2)}
    .post-acts svg{width:17px;height:17px;stroke:currentColor;stroke-width:1.5;fill:none}
    .post-acts button:last-child{margin-left:auto}
    .evcard{display:flex;align-items:center;gap:11px;width:100%;padding:12px;border-radius:var(--r-md);border:1px solid var(--line);background:var(--paper);text-align:left}
    .ev-ic{width:34px;height:34px;border-radius:var(--r-sm);background:var(--blush);display:flex;align-items:center;justify-content:center;flex:none}
    .ev-ic svg{width:17px;height:17px;stroke:var(--lulu-red);stroke-width:1.5;fill:none}
    .ev-txt{flex:1;min-width:0;display:flex;flex-direction:column}
    .ev-h{font-size:10px;font-weight:800;letter-spacing:.1em;color:var(--ink-3);text-transform:uppercase}
    .ev-txt b{font-size:13.5px;font-weight:700;margin-top:2px}
    .ev-txt span{font-size:11.5px;color:var(--ink-2)}
    .evcard .chev{width:16px;height:16px;flex:none;stroke:var(--ink-3);stroke-width:1.8;fill:none}
    .rw{margin:14px 20px 0;padding:13px;border:1px solid var(--line);border-radius:var(--r-lg)}
    .rw-h{display:flex;align-items:center;gap:9px}
    .rw-ic{width:34px;height:34px;border-radius:50%;background:var(--gold-soft);display:flex;align-items:center;justify-content:center}
    .rw-ic svg{width:17px;height:17px;stroke:var(--gold);stroke-width:1.6;fill:none}
    .rw-h b{font-size:13px;font-weight:700}
    .rw-h .rwst{margin-left:auto;font-size:11px;font-weight:700;color:var(--ink-3)}
    .rw-cond{font-size:11.5px;color:var(--ink-3);margin-top:6px}
    .rw .pbar{margin-top:8px;height:5px;border-radius:3px;background:var(--surface-2);overflow:hidden}
    .rw .pbar i{display:block;height:100%;background:var(--ink)}
  </style>`;
}

function ciPanel(tab, c){
  if(tab === 'Feed'){
    const posts = [
      { u:'Ava.L', lv:5, t:'2h ago', ch:'ch_yoga',    txt:'Finished my first lululemon Tennis Clinic! Unlocked the Tennis Outfit.', imgs:['short_swim','tank_sport'], like:328, cmt:56 },
      { u:'Ryu',   lv:3, t:'5h ago', ch:'ch_runner',  txt:'Duo mission complete with Kenji. Two in, one more this week.', imgs:[], like:142, cmt:18 },
      { u:'Lena',  lv:2, t:'1d ago', ch:'ch_hiker',   txt:'Who is joining the Saturday clinic? I need a partner for the 10:00 slot.', imgs:[], like:87, cmt:31 },
    ];
    return posts.map(p=>`
      <article class="post">
        <div class="post-h">
          <span class="av"><img src="${CHARACTERS.find(x=>x.id===p.ch).img}" alt=""></span>
          <span class="pn">${p.u}<span class="lv">Lv.${p.lv}</span></span>
          <span class="tm">${p.t}</span>
        </div>
        <p class="post-txt">${p.txt}</p>
        ${p.imgs.length?`<div class="post-imgs">${p.imgs.map(id=>{const pr=prodById(id); return pr?`<img src="${pr.img}" alt="">`:'';}).join('')}</div>`:''}
        <div class="post-acts">
          <button>${icon('heart')}${p.like}</button>
          <button>${icon('comment')}${p.cmt}</button>
          <button>${icon('bookmark')}</button>
        </div>
      </article>`).join('');
  }
  if(tab === 'Events'){
    return EVENTS.map(e=>`
      <article class="post" data-event="${e.id}" style="cursor:pointer">
        <div class="post-h">
          <span class="ev-ic" style="background:${e.color}1f">${icon(e.icon).replace('<svg ',`<svg style="stroke:${e.color}" `)}</span>
          <span class="pn">${e.name}</span>
        </div>
        <p class="post-txt">${e.date} · ${e.time}<br>${e.venue} · ${e.dist}</p>
        <div class="post-acts"><button style="color:var(--ink)">${state.signedUp.includes(e.id)?'You are going':'Sign up'}</button></div>
      </article>`).join('');
  }
  if(tab === 'Challenges'){
    return CHALLENGES.slice(0,3).map(ch=>`
      <article class="post" data-challenge="${ch.id}" style="cursor:pointer;border-top:3px solid ${ch.color}">
        <div class="post-h">
          <span class="ev-ic" style="background:${ch.color}1f">${icon(ch.icon==='tennis'?'tennis':'challenge').replace('<svg ',`<svg style="stroke:${ch.color}" `)}</span>
          <span class="pn">${ch.name}</span>
        </div>
        <p class="post-txt">${ch.desc}</p>
        <div class="post-acts"><button style="color:var(--ink)">${ch.people} joined</button><button>${ch.ends}</button></div>
      </article>`).join('');
  }
  const rewards = [
    { n:'Tennis Event Outfit', ic:'wardrobe', cond:'Check in at a Tennis event', prog:100 },
    { n:'Court Badge', ic:'badge', cond:'Complete 3 Tennis sessions', prog:66 },
    { n:'Duo Move', ic:'friends', cond:'Complete a duo mission', prog:33 },
  ];
  return rewards.map(r=>`
    <div class="rw">
      <div class="rw-h">
        <span class="rw-ic">${icon(r.ic)}</span>
        <b>${r.n}</b>
        <span class="rwst">${r.prog>=100?'Unlocked':r.prog+'%'}</span>
      </div>
      <div class="rw-cond">${r.cond}</div>
      <div class="pbar"><i style="width:${r.prog}%"></i></div>
    </div>`).join('');
}

/* ---------- P16 Avatar Card（点击广场里的其他用户） ---------- */
function renderAvatarCard(){
  const id = currentParam || 'u_ava';
  const u = PARK_USERS.find(x => x.id === id) || PARK_USERS[0];
  const isMate = state.mates.includes(u.id);
  const invited = state.pendingInvites.includes(u.id);
  const ch = CHARACTERS.find(c => c.id === u.ch) || CHARACTERS[0];
  return `
  <div class="scrim on" data-act="close"></div>
  <button class="ac-back" data-act="close">${icon('back')}<span>Back</span></button>
  <div class="acard">
    <div class="ac-top">
      <span class="av ac-av"><img src="${ch.img}" alt=""></span>
      <button class="ac-close" data-act="close">${icon('close')}</button>
      <b class="ac-nm">${u.name}</b>
      <span class="ac-lv">Lv.${u.lvl}</span>
      <span class="ac-bio">Also here for the Saturday clinic.</span>
    </div>
    <div class="ac-info">
      <div class="ac-row"><span>Favorite sport</span><b>${u.sport}</b></div>
      <div class="ac-row"><span>${u.sport} experience</span><b>${u.exp}</b></div>
      <div class="ac-row"><span>Attended</span><b>${u.evts} events</b></div>
      <div class="ac-row"><span>Open to</span><b>${u.open?'Move Mate · Team up':'Members only'}</b></div>
    </div>
    <div class="ac-acts">
      <button class="btn ghost" data-act="toast" data-msg="Encouragement card sent to ${u.name}">Send Encouragement</button>
      <button class="btn" id="acinvite" data-user="${u.id}" ${!u.open?'disabled':''}>
        ${isMate?'Move Mate ✓':invited?'Invitation sent':'Invite to Move Mate'}
      </button>
    </div>
    <p class="ac-note">${icon('shield')} Only what ${u.name} chose to share is shown. No location, no real name.</p>
  </div>
  <style>
    .acard{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:calc(100% - 72px);max-width:268px;max-height:calc(100% - 56px);overflow-y:auto;-webkit-overflow-scrolling:touch;background:var(--paper);border-radius:20px;padding:18px 16px 13px;z-index:100;box-shadow:var(--shadow-pop);animation:popc .3s cubic-bezier(.2,.9,.3,1) both}
    .ac-back{position:absolute;top:calc(14px + var(--safe-t));left:16px;z-index:110;display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 14px 0 10px;border-radius:var(--r-pill);background:rgba(255,255,255,.94);backdrop-filter:blur(6px);font-size:13px;font-weight:700;color:var(--ink);box-shadow:0 4px 14px rgba(22,21,15,.14);cursor:pointer}
    .ac-back svg{width:15px;height:15px;stroke:var(--ink);stroke-width:2;fill:none}
    .ac-top{display:flex;flex-direction:column;align-items:center;text-align:center}
    .ac-av{width:60px;height:60px;box-shadow:0 0 0 3px var(--rose);border-radius:50%;overflow:hidden}
    .ac-av img{width:100%;height:100%;object-fit:cover;object-position:center 8%}
    .ac-close{position:absolute;top:10px;right:10px;width:26px;height:26px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center}
    .ac-close svg{width:13px;height:13px;stroke:var(--ink-2);stroke-width:2;fill:none}
    .ac-nm{margin-top:9px;font-size:15px;font-weight:800;display:flex;align-items:center;gap:5px}
    .ac-lv{font-size:9.5px;font-weight:800;color:var(--ink-3);background:var(--surface-2);padding:2px 6px;border-radius:var(--r-pill)}
    .ac-bio{font-size:11.5px;color:var(--ink-2);margin-top:4px;line-height:1.35}
    .ac-info{margin-top:11px;border-top:1px solid var(--line-soft)}
    .ac-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--line-soft)}
    .ac-row span{font-size:11px;color:var(--ink-3)}
    .ac-row b{margin-left:auto;font-size:11.5px;font-weight:700}
    .ac-acts{display:flex;gap:7px;margin-top:12px}
    .ac-acts .btn{flex:1;height:36px;font-size:11px;padding:0 8px}
    .ac-note{display:flex;gap:5px;font-size:9.5px;color:var(--ink-3);margin-top:9px;line-height:1.35}
    .ac-note svg{width:11px;height:11px;flex:none;stroke:var(--ink-3);stroke-width:1.5;fill:none;margin-top:1px}
  </style>`;
}

/* ---------- P17 Photo（合影） ---------- */
function renderPhoto(){
  const a=state.avatar;
  const ch = CHARACTERS.find(c => c.id === a.char) || CHARACTERS[0];
  const picks = state.photoPicks || ['u_ava'];
  return `
  <div class="ph">
    <div class="ph-view" id="phview">
      <img class="ph-bg" src="assets/img/park_bg.jpg" alt="">
      <div class="ph-people" id="phpeople">
        <span class="php me"><span class="av"><img src="${ch.img}" alt=""></span></span>
        ${picks.filter(p=>p!=='me').map((p)=>{
          const u=PARK_USERS.find(x=>x.id===p); if(!u) return '';
          const uc = CHARACTERS.find(c=>c.id===u.ch) || CHARACTERS[0];
          return `<span class="php" style="margin-left:-10px"><span class="av"><img src="${uc.img}" alt=""></span></span>`;
        }).join('')}
      </div>
      <div class="ph-frame"></div>
      <div class="ph-hint">Frame your shot</div>
    </div>
    <div class="ph-top">
      <button class="ptb-back" data-act="back">${icon('close')}</button>
      <button class="ph-pick-btn" data-act="toast" data-msg="Tap a person in the Park to add them to your shot">${icon('friends')} Add friend</button>
    </div>
    <div class="ph-bar">
      <button class="ph-side" data-act="toast" data-msg="Photo library">${icon('avatar')}<span>Library</span></button>
      <button class="ph-shutter" id="phshot"></button>
      <button class="ph-side" data-act="toast" data-msg="Switch camera">${icon('shuffle')}<span>Flip</span></button>
    </div>
  </div>
  <style>
    .ph{position:absolute;inset:0;background:#16150F;display:flex;flex-direction:column}
    .ph-view{flex:1;position:relative;overflow:hidden}
    .ph-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .ph-people{position:absolute;left:50%;bottom:24%;transform:translateX(-50%);display:flex;align-items:flex-end}
    .php .av{width:66px;height:66px;border:2px solid #fff;box-shadow:0 6px 18px rgba(0,0,0,.4);display:block;border-radius:50%;overflow:hidden}
    .php .av img{width:100%;height:100%;object-fit:cover;object-position:center 8%}
    .php.me .av{width:78px;height:78px;box-shadow:0 0 0 3px var(--rose),0 6px 18px rgba(0,0,0,.4)}
    .ph-frame{position:absolute;left:16px;right:16px;top:16px;bottom:16px;border:1.5px dashed rgba(255,255,255,.5);border-radius:16px;pointer-events:none}
    .ph-hint{position:absolute;left:50%;top:22px;transform:translateX(-50%);font-size:11.5px;color:rgba(255,255,255,.9);background:rgba(0,0,0,.4);padding:5px 13px;border-radius:var(--r-pill)}
    .ph-top{position:absolute;top:0;left:0;right:0;padding:calc(var(--safe-t) + 12px) 14px 0;display:flex;gap:10px;align-items:center}
    .ph-pick-btn{flex:1;max-width:190px;height:34px;border-radius:var(--r-pill);background:rgba(255,255,255,.2);color:#fff;font-size:11.5px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px}
    .ph-pick-btn svg{width:15px;height:15px;stroke:currentColor;stroke-width:1.5;fill:none}
    .ph-bar{height:calc(96px + var(--safe-b));padding-bottom:var(--safe-b);display:flex;align-items:center;justify-content:space-around;background:#0D0C09}
    .ph-side{display:flex;flex-direction:column;align-items:center;gap:4px;color:rgba(255,255,255,.7);font-size:10px}
    .ph-side svg{width:22px;height:22px;stroke:currentColor;stroke-width:1.5;fill:none}
    .ph-shutter{width:70px;height:70px;border-radius:50%;background:#fff;border:4px solid rgba(255,255,255,.35);box-shadow:0 0 0 3px #fff inset,0 0 0 6px transparent}
    .ph-shutter:active{transform:scale(.92)}
  </style>`;
}
