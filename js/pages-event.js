/* ============================================================
   P22 Event / P24 Collection
   ============================================================ */

/* ---------- P22 Offline Event Detail + Check-in ---------- */
function renderEvent(){
  const id = currentParam || 'e_tennis';
  const e = EVENTS.find(x=>x.id===id) || EVENTS[0];
  const signed = state.signedUp.includes(e.id);
  const checked = state.checkedIn.includes(e.id);
  const joined = PARK_USERS.slice(0,7);
  return `
  ${headerHTML({back:true, spread:true})}
  <div class="screen-body scroll ev-body">
    <div class="ev-hero" style="background-image:url('assets/img/park_bg.jpg');background-position:50% 22%">
      <div class="ev-hero-ov" style="background:linear-gradient(180deg,${e.color}dd,${e.color}99)"></div>
      ${icon(e.icon).replace('<svg ',`<svg style="stroke:#fff;width:52px;height:52px;stroke-width:1.3" `)}
      <span class="ev-sport">${e.sport}</span>
    </div>
    <div class="ev-main">
      <h1>${e.name}</h1>
      <div class="ev-info">
        <div class="ei">${icon('calendar')}<span><b>${e.date}</b>${e.time}</span></div>
        <div class="ei">${icon('pin')}<span><b>${e.venue}</b>${e.dist} away</span></div>
        <div class="ei">${icon('users')}<span><b>${e.host}</b>${e.joined} of ${e.cap} spots filled</span></div>
      </div>

      <div class="ev-sec">
        <div class="ev-sec-h">What to expect</div>
        <ul class="ev-list">
          <li>45-minute coached session in ${e.sport.toLowerCase()}, grouped by level.</li>
          <li>Every attendee receives a movement credit and a limited event badge.</li>
          <li>Your AI ME unlocks the matching scene and event outfit after check-in.</li>
        </ul>
      </div>

      <div class="ev-sec">
        <div class="ev-sec-h">What to bring</div>
        <div class="ev-tags">
          <span class="chip mini">Water bottle</span>
          <span class="chip mini">Comfortable shoes</span>
          <span class="chip mini">Your Fit Profile</span>
        </div>
      </div>

      <div class="ev-sec">
        <div class="ev-sec-h">Who is going</div>
        <div class="ev-people">
          ${joined.map(u=>`<span class="av"><img src="${chById(u.ch).img}" alt=""></span>`).join('')}
          <span class="av more">+${e.joined-7}</span>
        </div>
      </div>

      ${signed&&!checked?`
        <div class="ev-qr">
          <div class="ev-sec-h">Show this code at check-in</div>
          <div class="qr-box">
            <div class="qr-grid">${Array.from({length:64},(_,i)=>`<i style="background:${[0,1,2,3,4,5,6,7].includes(i%8)||Math.floor(i/8)%3===0?'#16150F':'transparent'}"></i>`).join('')}</div>
          </div>
          <p class="ev-qrn">Movement ID · LM-${2841+state.level}</p>
        </div>`:''}

      ${checked?`
        <div class="ev-done">
          ${icon('check')}
          <b>You're checked in</b>
          <span>Your rewards have been added to your AI ME.</span>
        </div>`:''}
    </div>
  </div>
  <div class="footbar">
    ${checked
      ? `<button class="btn block" data-act="goeventwear">See my new outfit</button>`
      : signed
        ? `<button class="btn block" data-act="checkin" data-event="${e.id}">Check in now</button>`
        : `<button class="btn block" data-act="signup" data-event="${e.id}">Sign up — Free</button>`}
  </div>
  <style>
    .ev-body{padding-bottom:110px}
    .ev-hero{height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;position:relative;background-size:cover}
    .ev-hero-ov{position:absolute;inset:0}
    .ev-sport{font-size:11px;font-weight:800;letter-spacing:.18em;color:rgba(255,255,255,.85);text-transform:uppercase}
    .ev-main{padding:18px 20px 0}
    .ev-main h1{font-size:21px;font-weight:800;letter-spacing:-.02em}
    .ev-info{margin-top:14px;border-top:1px solid var(--line-soft)}
    .ei{display:flex;gap:11px;align-items:center;padding:11px 0;border-bottom:1px solid var(--line-soft)}
    .ei svg{width:19px;height:19px;stroke:var(--ink-3);stroke-width:1.5;fill:none;flex:none}
    .ei span{display:flex;flex-direction:column;font-size:11.5px;color:var(--ink-3)}
    .ei b{font-size:13.5px;font-weight:700;color:var(--ink)}
    .ev-sec{margin-top:22px}
    .ev-sec-h{font-size:11px;font-weight:800;letter-spacing:.1em;color:var(--ink-3);text-transform:uppercase;margin-bottom:10px}
    .ev-list li{font-size:13px;color:var(--ink-2);line-height:1.55;padding-left:16px;position:relative;margin-bottom:7px}
    .ev-list li::before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:var(--rose-deep)}
    .ev-tags{display:flex;gap:7px;flex-wrap:wrap}
    .ev-people{display:flex}
    .ev-people .av{width:42px;height:42px;border:2px solid var(--paper);margin-left:-10px}
    .ev-people .av:first-child{margin-left:0}
    .ev-people .av img{object-position:center 12%}
    .ev-people .more{background:var(--surface-2);color:var(--ink-2);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
    .ev-qr{margin-top:24px;padding:16px;border-radius:var(--r-lg);background:var(--surface);text-align:center}
    .qr-box{width:150px;height:150px;margin:6px auto 0;background:#fff;border-radius:8px;padding:10px;box-shadow:0 2px 10px rgba(0,0,0,.06)}
    .qr-grid{display:grid;grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(8,1fr);width:100%;height:100%;gap:1.5px}
    .qr-grid i{display:block;border-radius:1px}
    .ev-qrn{font-size:11.5px;color:var(--ink-3);margin-top:12px;letter-spacing:.06em}
    .ev-done{margin-top:24px;padding:20px;border-radius:var(--r-lg);background:rgba(63,125,78,.1);text-align:center;border:1px solid rgba(63,125,78,.22)}
    .ev-done svg{width:34px;height:34px;stroke:var(--success);stroke-width:2.2;fill:none;margin:0 auto 10px;display:block}
    .ev-done b{display:block;font-size:15px;font-weight:800;color:var(--success)}
    .ev-done span{font-size:12px;color:#2F5C3C;display:block;margin-top:4px}
  </style>`;
}

/* ---------- 签到奖励页 ---------- */
function renderCheckinReward(eventId){
  const e = EVENTS.find(x=>x.id===eventId) || EVENTS[0];
  const sceneId = e.sport;
  const sc = SCENES.find(s=>s.id===sceneId);
  const rewards = [
    { ic:'coins', t:'+120 Move Coins', s:'Added to your wallet', color:'#F4E9D4' },
    { ic:'globe', t:`${sc?sc.name:e.sport+' Court'} Scene`, s:'Unlocked for your avatar', color:'#E6F1FB' },
    { ic:'wardrobe', t:`${e.sport} Event Outfit`, s:'Added to your digital wardrobe', color:'#FBF4F2' },
    { ic:'badge', t:'First Clinic Badge', s:'Added to your badge wall', color:'#EAF3DE' },
  ];
  const ch=chById(state.avatar.char);
  return `
  <div class="ck-page">
    <div class="ck-fig">
      <div class="shadow"></div>
      <img src="${ch.img}" alt="">
      <div class="ck-burst">${Array.from({length:14},(_,i)=>`<i style="--a:${(i/14*360).toFixed(0)}deg"></i>`).join('')}</div>
    </div>
    <div class="ck-tick">${icon('check')}</div>
    <h1>You're checked in</h1>
    <p class="ck-sub">${e.name} · ${e.date}</p>
    <div class="ck-list">
      ${rewards.map((r,i)=>`
        <div class="ck-rw" style="animation-delay:${0.2+i*0.15}s">
          <span class="ck-ic" style="background:${r.color}">${icon(r.ic)}</span>
          <span class="ck-tx"><b>${r.t}</b><span>${r.s}</span></span>
        </div>`).join('')}
    </div>
  </div>
  <div class="footbar">
    <button class="btn block" data-act="goeventwear">Next: explore your new outfit</button>
  </div>
  <style>
    .ck-page{position:absolute;inset:0;padding:calc(var(--safe-t) + 40px) 20px 150px;display:flex;flex-direction:column;align-items:center;overflow-y:auto;background:linear-gradient(180deg,#fff,#F7FBF3)}
    .ck-fig{position:relative;height:220px;display:flex;align-items:flex-end;justify-content:center;width:100%;animation:pop .6s cubic-bezier(.2,.9,.3,1) both}
    .ck-fig .shadow{position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:110px;height:14px;border-radius:50%;background:rgba(22,21,15,.13);filter:blur(6px)}
    .ck-fig img{max-height:100%;width:auto;object-fit:contain;animation:celebrate 1.1s ease-in-out infinite}
    @keyframes celebrate{0%,100%{transform:translateY(0) scale(1)}30%{transform:translateY(-14px) scale(1.03)}60%{transform:translateY(0) scale(.99)}}
    .ck-burst{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:220px;height:220px;pointer-events:none}
    .ck-burst i{position:absolute;left:50%;top:50%;width:6px;height:6px;border-radius:50%;background:var(--rose-deep);opacity:.7;transform:rotate(var(--a)) translateX(0);animation:burst 2.4s ease-in-out infinite}
    @keyframes burst{0%{transform:rotate(var(--a)) translateX(30px);opacity:0}40%{opacity:.8}100%{transform:rotate(var(--a)) translateX(110px);opacity:0}}
    .ck-tick{width:46px;height:46px;border-radius:50%;background:var(--success);display:flex;align-items:center;justify-content:center;margin-top:6px;animation:pop .4s .3s both}
    .ck-tick svg{width:26px;height:26px;stroke:#fff;stroke-width:3;fill:none}
    .ck-page h1{font-size:21px;font-weight:800;margin-top:12px;letter-spacing:-.02em}
    .ck-sub{font-size:12.5px;color:var(--ink-3);margin-top:3px}
    .ck-list{width:100%;max-width:340px;margin-top:20px;display:flex;flex-direction:column;gap:9px}
    .ck-rw{display:flex;align-items:center;gap:11px;padding:12px 13px;border-radius:var(--r-md);background:rgba(255,255,255,.92);border:1px solid var(--line);animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
    .ck-ic{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none}
    .ck-ic svg{width:19px;height:19px;stroke:var(--ink);stroke-width:1.6;fill:none}
    .ck-tx b{display:block;font-size:13.5px;font-weight:700}
    .ck-tx span{font-size:11px;color:var(--ink-3)}
  </style>`;
}

/* ---------- P24 Collection（实体盲盒） ---------- */
const FIG_SERIES = [
  { id:'s1', name:'Series 01 · Tennis',    ch:'ch_boxer',  sport:'Boxing' },
  { id:'s2', name:'Series 02 · Yoga',      ch:'ch_yoga',   sport:'Yoga' },
  { id:'s3', name:'Series 03 · Run',       ch:'ch_runner', sport:'Running' },
  { id:'s4', name:'Series 04 · Outdoors',  ch:'ch_hiker',  sport:'Hiking' },
  { id:'s5', name:'Series 05 · Train',     ch:'ch_cyclist',sport:'Training' },
  { id:'s6', name:'Series 06 · Community', ch:'ch_yoga',   sport:'Pilates' },
];
function renderCollection(){
  const bound = state.boundFigure;
  const unlocked = FIG_SERIES.filter(f=>state.figures.includes(f.id));
  return `
  ${headerHTML({back:true, spread:true})}
  <div class="screen-body scroll co-body">
    <div class="co-hero">
      <h1>MOVEMENT FIGURE<br>COLLECTION</h1>
      <p class="serif">Your avatar, in your hands.</p>
    </div>

    <div class="co-steps">
      ${[['Create your AI ME',true],['Complete a challenge',state.joinedChallenges.length>0],['Check in at a Pop-up',state.checkedIn.length>0],['Scan & Bind',bound]].map(([t,d],i)=>`
        <div class="co-step ${d?'done':''}">
          <span class="cs-ic">${d?icon('check'):`<i>${i+1}</i>`}</span>
          <span>${t}</span>
        </div>`).join('')}
    </div>

    <div class="sect" style="margin-top:18px">
      <div class="sect-head">
        <div class="sect-title">MY FIGURES</div>
        <span class="small muted">${unlocked.length} of ${FIG_SERIES.length}</span>
      </div>
      <div class="co-grid">
        ${FIG_SERIES.map(f=>{
          const has=state.figures.includes(f.id);
          return `<button class="co-cell ${has?'on':''}" data-figure="${f.id}">
            <span class="co-fig">
              ${has?`<img src="${chById(f.ch).img}" alt="">`:`<span class="co-lock">${icon('lock')}</span>`}
            </span>
            <span class="co-nm">${f.name}</span>
            <span class="co-st">${has?(state.boundFigure?'Bound to LM-'+(2841+state.level):'Ready to bind'):'Unlock at a Pop-up'}</span>
          </button>`;
        }).join('')}
      </div>
    </div>

    ${bound?`
      <div class="sect" style="margin-top:18px">
        <div class="co-bound">
          <div class="co-bound-fig"><img src="${chById(FIG_SERIES[0].ch).img}" alt=""></div>
          <div class="co-bound-tx">
            <b>Bound and moving together</b>
            <span>Your figure and avatar now move together. The Tennis Figure Outfit is unlocked.</span>
            <button class="btn xs" style="margin-top:9px" data-go="dressing">Wear the figure outfit</button>
          </div>
        </div>
      </div>`:''}

    <div class="sect" style="padding-bottom:24px">
      <div class="sect-head"><div class="sect-title">FIND AN AI ME POP-UP</div></div>
      <div class="co-stores">
        ${[['Shenzhen','Bay MixC','Open today · 10:00–20:00','1.2 km'],['Shanghai','Taikoo Hui','Open today · 11:00–21:00','4.8 km'],['Beijing','Sanlitun','Opens Nov 21 · 10:00–22:00','—']].map(s=>`
          <div class="co-store">
            <span class="cs-ic">${icon('store')}</span>
            <div class="cs-tx"><b>${s[0]} · ${s[1]}</b><span>${s[2]}</span></div>
            <button class="btn xs ghost" data-act="toast" data-msg="Directions opened">${s[3]}</button>
          </div>`).join('')}
      </div>
      <button class="btn block" style="margin-top:14px" data-act="scanfigure">${icon('scan')} Scan the QR on your figure</button>
    </div>
  </div>
  <style>
    .co-body{padding-bottom:16px}
    .co-hero{padding:22px 20px 6px}
    .co-hero h1{font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1.1}
    .co-hero p{font-size:13px;color:var(--ink-3);margin-top:7px}
    .co-steps{margin:16px 20px 0;display:flex;flex-direction:column;gap:8px}
    .co-step{display:flex;align-items:center;gap:10px;font-size:12.5px;color:var(--ink-3)}
    .cs-ic{width:22px;height:22px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;flex:none}
    .cs-ic svg{width:12px;height:12px;stroke:var(--ink-3);stroke-width:2.4;fill:none}
    .cs-ic i{font-size:10px;font-weight:800;font-style:normal}
    .co-step.done{color:var(--ink);font-weight:600}
    .co-step.done .cs-ic{background:var(--success)}
    .co-step.done .cs-ic svg{stroke:#fff}
    .co-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}
    .co-cell{text-align:left}
    .co-fig{width:100%;aspect-ratio:.9;background:var(--surface);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;overflow:hidden;border:1.5px solid transparent}
    .co-cell.on .co-fig{background:var(--blush);border-color:var(--line)}
    .co-fig img{height:92%;width:auto;object-fit:contain}
    .co-lock{width:30px;height:30px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center}
    .co-lock svg{width:15px;height:15px;stroke:var(--ink-3);stroke-width:1.6;fill:none}
    .co-nm{display:block;font-size:10.5px;font-weight:600;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .co-st{display:block;font-size:9.5px;color:var(--ink-3)}
    .co-bound{display:flex;gap:13px;padding:14px;border-radius:var(--r-lg);background:var(--blush);border:1px solid var(--line)}
    .co-bound-fig{width:76px;height:88px;flex:none;display:flex;align-items:flex-end;justify-content:center}
    .co-bound-fig img{height:100%;width:auto;object-fit:contain}
    .co-bound-tx b{display:block;font-size:13.5px;font-weight:800}
    .co-bound-tx span{font-size:11.5px;color:var(--ink-2);display:block;margin-top:4px;line-height:1.45}
    .co-store{display:flex;align-items:center;gap:11px;padding:11px 12px;border:1px solid var(--line);border-radius:var(--r-md);margin-bottom:9px}
    .cs-ic{width:36px;height:36px;border-radius:var(--r-sm);background:var(--surface-2);display:flex;align-items:center;justify-content:center;flex:none}
    .cs-ic svg{width:18px;height:18px;stroke:var(--ink-2);stroke-width:1.5;fill:none}
    .cs-tx{flex:1;min-width:0}
    .cs-tx b{display:block;font-size:13px;font-weight:700}
    .cs-tx span{font-size:11px;color:var(--ink-3)}
  </style>`;
}
