/* ============================================================
   P18 Friends / P19 Challenges / P20 Badges / P21 Calendar / P23 Garden
   ============================================================ */

/* ---------- P18 Find Friends / Move Mate ---------- */
function renderFriends(){
  const mates = FRIENDS.filter(f=>state.mates.includes(f.id));
  const recs = FRIENDS.filter(f=>!state.mates.includes(f.id));
  return `
  ${headerHTML({back:true, spread:true})}
  <div class="screen-body scroll fr-body">
    <div class="fr-search">
      ${icon('search')}<input placeholder="Search by name or Movement ID" id="frq">
    </div>
    <p class="fr-note">${icon('shield')}You only share what you choose. Every request needs both sides to agree.</p>

    <div class="sect" style="margin-top:16px">
      <div class="sect-head"><div class="sect-title">RECOMMENDED FOR YOU</div></div>
      <div class="fr-recs">
        ${recs.map(f=>`
          <div class="fr-card">
            <span class="av" style="width:52px;height:52px"><img src="${chById(f.ch).img}" alt=""></span>
            <b>${f.name}</b>
            <span class="fr-reason">${f.reason}</span>
            <button class="btn xs" data-invite="${f.id}">Invite</button>
          </div>`).join('')}
      </div>
    </div>

    <div class="sect">
      <div class="sect-head">
        <div class="sect-title">MY MOVE MATES</div>
        <span class="small muted">${mates.length}</span>
      </div>
      ${mates.length? mates.map(m=>`
        <div class="fr-mate">
          <span class="av" style="width:46px;height:46px"><img src="${chById(m.ch).img}" alt=""></span>
          <div class="fm-meta">
            <b>${m.name}</b>
            <span>${m.sport} · duo mission 2 / 3</span>
            <span class="pbar" style="margin-top:5px"><i style="width:66%"></i></span>
          </div>
          <button class="btn xs ghost" data-act="toast" data-msg="Nudge sent to ${m.name}">Nudge</button>
        </div>`).join('')
        : `<div class="fr-empty">${icon('friends')}<b>No Move Mate yet</b><span>Invite someone above to unlock duo actions together.</span></div>`}
    </div>

    <div class="sect" style="padding-bottom:24px">
      <div class="sect-head"><div class="sect-title">THIS WEEK'S DUO MISSION</div></div>
      <div class="duo">
        <div class="duo-h">
          <span class="duo-ic">${icon('tennis')}</span>
          <div><b>Move three times together</b><span>Both avatars must complete 3 sessions</span></div>
        </div>
        <div class="duo-p">
          <span class="av duo-a"><img src="${chById(state.avatar.char).img}" alt=""></span>
          <span class="duo-bar"><i style="width:66%"></i></span>
          <span class="av duo-b">${mates.length?`<img src="${chById(mates[0].ch).img}" alt="">`:'<span class="ini">?</span>'}</span>
        </div>
        <div class="duo-lock">
          ${icon('lock')}
          <span>Duo Move — unlock at 3/3</span>
        </div>
      </div>
    </div>
  </div>
  <style>
    .fr-body{padding-bottom:16px}
    .fr-search{display:flex;align-items:center;gap:9px;margin:14px 20px 0;height:40px;border-radius:var(--r-pill);background:var(--surface-2);padding:0 15px}
    .fr-search svg{width:17px;height:17px;stroke:var(--ink-3);stroke-width:1.6;fill:none;flex:none}
    .fr-search input{flex:1;font-size:13px}
    .fr-note{display:flex;gap:6px;font-size:11px;color:var(--ink-3);margin:10px 20px 0;line-height:1.4}
    .fr-note svg{width:13px;height:13px;flex:none;stroke:var(--ink-3);stroke-width:1.5;fill:none;margin-top:1px}
    .fr-recs{display:flex;gap:10px;overflow-x:auto;padding:0 20px 4px;scrollbar-width:none}
    .fr-recs::-webkit-scrollbar{display:none}
    .fr-card{flex:none;width:160px;border:1px solid var(--line);border-radius:var(--r-lg);padding:13px;display:flex;flex-direction:column;align-items:center;text-align:center;background:var(--paper)}
    .fr-card .av img{object-position:center 12%}
    .fr-card b{font-size:13px;font-weight:700;margin-top:8px}
    .fr-reason{font-size:10.5px;color:var(--ink-3);margin-top:3px;line-height:1.35;min-height:28px}
    .fr-card .btn{margin-top:8px}
    .fr-mate{display:flex;align-items:center;gap:11px;padding:11px 13px;border:1px solid var(--line);border-radius:var(--r-md);margin-bottom:9px}
    .fr-mate .av img{object-position:center 12%}
    .fm-meta{flex:1;min-width:0;display:flex;flex-direction:column}
    .fm-meta b{font-size:13.5px;font-weight:700}
    .fm-meta span{font-size:11px;color:var(--ink-3)}
    .fm-meta .pbar{height:5px;border-radius:3px;background:var(--surface-2);overflow:hidden;display:block}
    .fm-meta .pbar i{display:block;height:100%;background:var(--ink)}
    .fr-empty{text-align:center;padding:30px 20px;border:1px dashed var(--line);border-radius:var(--r-lg)}
    .fr-empty svg{width:26px;height:26px;stroke:var(--ink-3);stroke-width:1.4;fill:none;margin:0 auto 10px;display:block}
    .fr-empty b{display:block;font-size:13.5px;font-weight:700}
    .fr-empty span{font-size:11.5px;color:var(--ink-3);display:block;margin-top:4px}
    .duo{border:1px solid var(--line);border-radius:var(--r-lg);padding:14px}
    .duo-h{display:flex;gap:10px;align-items:center}
    .duo-ic{width:38px;height:38px;border-radius:50%;background:var(--ink);display:flex;align-items:center;justify-content:center;flex:none}
    .duo-ic svg{width:19px;height:19px;stroke:#fff;stroke-width:1.6;fill:none}
    .duo-h b{display:block;font-size:13.5px;font-weight:700}
    .duo-h span{font-size:11px;color:var(--ink-3)}
    .duo-p{display:flex;align-items:center;gap:10px;margin-top:14px}
    .duo-p .av{width:36px;height:36px}
    .duo-p .av img{object-position:center 12%}
    .duo-bar{flex:1;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden}
    .duo-bar i{display:block;height:100%;background:var(--ink)}
    .duo-lock{display:flex;align-items:center;gap:6px;margin-top:13px;padding-top:11px;border-top:1px solid var(--line-soft);font-size:11.5px;color:var(--ink-3);font-weight:600}
    .duo-lock svg{width:14px;height:14px;stroke:currentColor;stroke-width:1.6;fill:none}
  </style>`;
}

/* ---------- P19 Challenges ---------- */
function renderChallenges(){
  const filters=['For you','Circle','Community'];
  return `
  ${headerHTML({back:true, spread:true})}
  <div class="screen-body scroll ch-body">
    <div class="chiprow" id="chfilters" style="margin-top:14px">
      ${filters.map((f,i)=>`<button class="chip ${i===0?'on':''}" data-chfilter="${f}">${f}</button>`).join('')}
    </div>
    <div id="chlist">
      ${CHALLENGES.map(ch=>chCard(ch)).join('')}
    </div>
    <div style="height:20px"></div>
  </div>
  <style>
    .ch-body{padding-bottom:16px}
    .chcard{margin:14px 20px 0;border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden;background:var(--paper)}
    .chcard.community{background:rgba(110,155,78,.07)}
    .ch-strip{height:3px}
    .ch-in{padding:13px}
    .ch-h{display:flex;align-items:flex-start;gap:10px}
    .ch-ic{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none}
    .ch-ic svg{width:19px;height:19px;stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .ch-h b{font-size:14px;font-weight:800;display:block}
    .ch-tag{font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:2px 7px;border-radius:var(--r-pill);display:inline-block;margin-bottom:4px}
    .ch-d{font-size:12px;color:var(--ink-2);margin-top:6px;line-height:1.45}
    .ch-meta{display:flex;gap:14px;margin-top:10px;font-size:11px;color:var(--ink-3)}
    .ch-meta span{display:flex;align-items:center;gap:4px}
    .ch-meta svg{width:13px;height:13px;stroke:currentColor;stroke-width:1.5;fill:none}
    .ch-prog{margin-top:11px}
    .ch-prog .lbl{display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink-3);margin-bottom:5px}
    .ch-prog .pbar{height:5px;border-radius:3px;background:var(--surface-2);overflow:hidden}
    .ch-prog .pbar i{display:block;height:100%;background:var(--ink)}
    .ch-act{display:flex;gap:8px;margin-top:12px}
    .ch-act .btn{flex:1;height:38px;font-size:13px}
  </style>`;
}
function chCard(ch){
  const joined = state.joinedChallenges.includes(ch.id);
  const prog = ch.id==='c_duo'?66 : ch.id==='c_garden'?68 : ch.id==='c_tennis5k'?40 : 0;
  return `<article class="chcard ${ch.type==='community'?'community':''}" data-challenge="${ch.id}">
    <div class="ch-strip" style="background:${ch.color}"></div>
    <div class="ch-in">
      <div class="ch-h">
        <span class="ch-ic" style="background:${ch.color}1f">${icon(ch.sport==='tennis'?'tennis':ch.sport==='running'?'running':ch.sport==='yoga'?'yoga':'challenge').replace('<svg ',`<svg style="stroke:${ch.color}" `)}</span>
        <div class="grow">
          ${ch.type==='community'?`<span class="ch-tag" style="background:${ch.color};color:#fff">Community</span>`:''}
          <b>${ch.name}</b>
        </div>
      </div>
      <p class="ch-d">${ch.desc}</p>
      <div class="ch-meta">
        <span>${icon('users')}${ch.people}</span>
        <span>${icon('clock')}${ch.ends}</span>
      </div>
      ${joined||prog?`<div class="ch-prog">
        <div class="lbl"><span>Your progress</span><span>${prog}%</span></div>
        <div class="pbar"><i style="width:${prog}%"></i></div>
      </div>`:''}
      <div class="ch-act">
        <button class="btn ${joined?'soft':''}" data-joinch="${ch.id}">${joined?'Joined':'Join'}</button>
        <button class="btn ghost" data-act="toast" data-msg="Challenge details">View</button>
      </div>
    </div>
  </article>`;
}

/* ---------- P20 Badges ---------- */
function renderBadges(){
  const got = state.badges;
  return `
  ${headerHTML({back:true, spread:true})}
  <div class="screen-body scroll bd-body">
    <div class="bd-count"><b>${got.length}</b> / ${BADGES.length} collected</div>
    <div class="bd-grid">
      ${BADGES.map(b=>{
        const has=got.includes(b.id);
        return `<button class="bd ${has?'on':''}" data-badge="${b.id}">
          <span class="bd-ic" style="background:${has?b.color:'var(--surface-2)'}">
            ${icon(b.icon).replace('<svg ',`<svg style="stroke:${has?'#16150F':'#8B8576'}" `)}
          </span>
          <span class="bd-n">${b.name}</span>
          <span class="bd-h">${has?'Earned':'Locked'}</span>
        </button>`;
      }).join('')}
    </div>
    <div style="height:24px"></div>
  </div>
  <style>
    .bd-body{padding-bottom:16px}
    .bd-count{text-align:center;font-size:12px;color:var(--ink-3);margin:18px 0 4px}
    .bd-count b{font-size:16px;color:var(--ink);font-weight:800}
    .bd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px 10px;padding:16px 20px 0}
    .bd{display:flex;flex-direction:column;align-items:center;gap:5px;text-align:center}
    .bd-ic{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--line)}
    .bd.on .bd-ic{border-color:transparent}
    .bd-ic svg{width:24px;height:24px;stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .bd-n{font-size:10px;font-weight:600;line-height:1.2}
    .bd-h{font-size:9px;color:var(--ink-3)}
    .bd.on .bd-h{color:var(--success);font-weight:700}
  </style>`;
}

/* ---------- P21 Activity Calendar ---------- */
function renderCalendar(){
  const days = Array.from({length:30},(_,i)=>i+1);
  const evByDay = {16:'e_tennis',17:'e_yoga',19:'e_pilates',22:'e_run'};
  return `
  ${headerHTML({back:true, spread:true, right:`<button class="rbtn" data-act="toast" data-msg="November 2026">Nov</button>`})}
  <div class="screen-body scroll cal-body">
    <div class="cal-head">
      <button class="cal-nav" data-act="toast" data-msg="October 2026">${icon('chevU')}</button>
      <b>November 2026</b>
      <button class="cal-nav" data-act="toast" data-msg="December 2026">${icon('chevD')}</button>
    </div>
    <div class="cal-week">
      ${['M','T','W','T','F','S','S'].map(d=>`<span>${d}</span>`).join('')}
    </div>
    <div class="cal-grid">
      ${['','',''].concat(days).map((d,i)=>{
        if(!d) return '<span></span>';
        const ev = evByDay[d];
        return `<button class="cal-d ${ev?'has':''} ${state.checkedIn.includes(ev)?'done':''}" data-day="${d}">
          <span>${d}</span>${ev?'<i></i>':''}
        </button>`;
      }).join('')}
    </div>
    <div class="sect" style="margin-top:20px">
      <div class="sect-head"><div class="sect-title">SELECTED DAY</div></div>
      <div id="calevents">
        ${EVENTS.map(e=>`
          <button class="cal-ev" data-event="${e.id}">
            <span class="ce-ic" style="background:${e.color}1f">${icon(e.icon).replace('<svg ',`<svg style="stroke:${e.color}" `)}</span>
            <span class="ce-t">
              <b>${e.name}</b>
              <span>${e.date} · ${e.time}</span>
              <span>${e.venue} · ${e.dist}</span>
            </span>
            <span class="ce-act">${state.checkedIn.includes(e.id)?'Checked in':state.signedUp.includes(e.id)?'You are going':'Sign up'}</span>
          </button>`).join('')}
      </div>
    </div>
    <div style="height:24px"></div>
  </div>
  <style>
    .cal-body{padding-bottom:16px}
    .cal-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px 12px}
    .cal-head b{font-size:15px;font-weight:800}
    .cal-nav{width:30px;height:30px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center}
    .cal-nav svg{width:16px;height:16px;stroke:var(--ink-2);stroke-width:1.8;fill:none}
    .cal-week{display:grid;grid-template-columns:repeat(7,1fr);padding:0 20px 6px;text-align:center}
    .cal-week span{font-size:10.5px;font-weight:700;color:var(--ink-3)}
    .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:0 20px}
    .cal-d{aspect-ratio:1;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;font-size:12.5px;font-weight:600;color:var(--ink-2)}
    .cal-d.has{background:var(--blush);color:var(--ink);font-weight:700}
    .cal-d.done{background:rgba(110,155,78,.14)}
    .cal-d i{position:absolute;bottom:5px;width:4px;height:4px;border-radius:50%;background:var(--lulu-red)}
    .cal-d.done i{background:var(--success)}
    .cal-ev{display:flex;align-items:center;gap:11px;width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:var(--r-md);margin-bottom:9px;text-align:left}
    .ce-ic{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none}
    .ce-ic svg{width:19px;height:19px;stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .ce-t{flex:1;min-width:0;display:flex;flex-direction:column}
    .ce-t b{font-size:13.5px;font-weight:700}
    .ce-t span{font-size:11px;color:var(--ink-3)}
    .ce-act{font-size:11.5px;font-weight:700;color:var(--ink);flex:none}
  </style>`;
}

/* ---------- P23 Community Garden ---------- */
function renderGarden(){
  const pct = Math.min(1, state.seeds/50);
  const stage = pct<0.25?0:pct<0.45?1:pct<0.65?2:pct<0.85?3:4;
  return `
  ${headerHTML({back:true, spread:true})}
  <div class="screen-body scroll gd-body">
    <div class="gd-bar">
      <b>Community Garden</b>
      <span>${state.seeds} seeds · ${Math.round(pct*100)}% to the next area</span>
      <div class="pbar" style="margin-top:8px"><i style="width:${pct*100}%"></i></div>
    </div>
    <div class="gd-scene" id="gdscene">
      <div class="gd-sky"></div>
      <div class="gd-hill"></div>
      <div class="gd-tree t${stage}">${icon('leaf')}</div>
      <div class="gd-sprouts">
        ${Array.from({length:Math.min(14,Math.floor(state.seeds/3))},(_,i)=>`<span class="sprout" style="left:${6+i*6.4}%;animation-delay:${(i%6)*0.12}s"></span>`).join('')}
      </div>
      <div class="gd-ground"></div>
    </div>
    <div class="sect" style="margin-top:16px">
      <div class="sect-head"><div class="sect-title">COMMUNITY GARDEN WEEK</div></div>
      <div class="gd-card">
        <div class="gd-card-h">
          <span class="ch-ic" style="background:#5B8C6E1f">${icon('leaf').replace('<svg ',`<svg style="stroke:#5B8C6E" `)}</span>
          <div><b>Grow the Sunrise Terrace</b><span>Every session plants one seed for the whole community</span></div>
        </div>
        <div class="ch-prog"><div class="lbl"><span>Community total</span><span>68%</span></div><div class="pbar"><i style="width:68%"></i></div></div>
        <button class="btn block" style="margin-top:12px" data-act="plantseed">Plant my seed</button>
      </div>
    </div>
    <div class="sect" style="padding-bottom:24px">
      <div class="sect-head"><div class="sect-title">GROWERS</div><span class="small muted">1,284</span></div>
      <div class="gd-people">
        ${PARK_USERS.slice(0,7).map(u=>`<span class="av"><img src="${chById(u.ch).img}" alt=""></span>`).join('')}
        <span class="av more">+1.2k</span>
      </div>
    </div>
  </div>
  <style>
    .gd-body{padding-bottom:16px}
    .gd-bar{margin:16px 20px 0;padding:14px 16px;border-radius:var(--r-lg);background:rgba(110,155,78,.1);border:1px solid rgba(110,155,78,.2)}
    .gd-bar b{font-size:15px;font-weight:800;display:block}
    .gd-bar span{font-size:11.5px;color:#3B6D11;display:block;margin-top:2px}
    .gd-bar .pbar{height:6px;border-radius:3px;background:rgba(110,155,78,.2);overflow:hidden}
    .gd-bar .pbar i{display:block;height:100%;background:#5B8C6E}
    .gd-scene{height:280px;margin:14px 20px 0;border-radius:var(--r-xl);position:relative;overflow:hidden;background:linear-gradient(180deg,#DCEDF5,#EAF3DE)}
    .gd-hill{position:absolute;left:-10%;right:-10%;bottom:76px;height:120px;border-radius:50% 50% 0 0;background:#A8C98A}
    .gd-ground{position:absolute;left:0;right:0;bottom:0;height:80px;background:#7EA85C}
    .gd-tree{position:absolute;left:50%;bottom:74px;transform:translateX(-50%);transition:all .5s}
    .gd-tree svg{width:74px;height:74px;stroke:#4E7A3C;stroke-width:1.2;fill:#4E7A3C;opacity:.85}
    .gd-tree.t0 svg{width:30px;height:30px}
    .gd-tree.t1 svg{width:44px;height:44px}
    .gd-tree.t2 svg{width:58px;height:58px}
    .gd-tree.t3 svg{width:68px;height:68px}
    .gd-tree.t4 svg{width:86px;height:86px;opacity:1}
    .gd-sprouts{position:absolute;left:0;right:0;bottom:34px;height:34px}
    .sprout{position:absolute;bottom:0;width:7px;height:13px;border-radius:50% 50% 0 0;background:#4E7A3C;opacity:.8;animation:sproutin .5s ease both}
    @keyframes sproutin{from{transform:scaleY(0);opacity:0}to{transform:scaleY(1);opacity:.8}}
    .gd-card{border:1px solid var(--line);border-radius:var(--r-lg);padding:14px}
    .gd-card-h{display:flex;gap:10px;align-items:center}
    .gd-card-h b{display:block;font-size:14px;font-weight:800}
    .gd-card-h span{font-size:11.5px;color:var(--ink-3)}
    .gd-people{display:flex;gap:0}
    .gd-people .av{width:42px;height:42px;border:2px solid var(--paper);margin-left:-10px}
    .gd-people .av:first-child{margin-left:0}
    .gd-people .av img{object-position:center 12%}
    .gd-people .more{background:var(--surface-2);color:var(--ink-2);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
  </style>`;
}
