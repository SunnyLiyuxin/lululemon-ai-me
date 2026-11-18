/* ============================================================
   LULULEMON AI ME · App bootstrap + interactions
   ============================================================ */

function boot(){
  const d = document.createElement('div');
  d.id = 'device';
  d.innerHTML = '<div id="stage"></div>';
  document.body.appendChild(d);

  // 首屏：已创建过直接进 Home，否则 Splash
  if(state.created) { current='splash'; paint(ROUTES.splash); setTimeout(()=>go('home',null,true),1400); }
  else { current='splash'; paint(ROUTES.splash); }
  splashInit();

  loadRigs(CHARACTERS.map(c=>c.id)).then(()=>{ if(current==='splash') return; paint(ROUTES[current]); });

  document.addEventListener('click', globalClick);
  document.addEventListener('change', globalChange);
  document.addEventListener('input', globalInput);
}

/* ---------- 全局交互代理 ---------- */
function globalClick(e){
  const t = e.target;

  /* —— Park 子 Tab —— */
  const pht = t.closest('[data-phtab]');
  if(pht){
    parkSub = pht.dataset.phtab;
    const ind = document.querySelector('.ph-ind');
    const idx = PARK_SUBTABS.findIndex(x=>x.k===parkSub);
    if(ind) ind.style.transform = `translateX(${idx*100}%)`;
    document.getElementById('phbody').innerHTML = parkSubBody();
    $$('#phtabs button').forEach(x=>x.classList.toggle('on', x.dataset.phtab===parkSub));
    return;
  }
  if(t.closest('[data-act="openplaza"]')){ go('plaza'); return; }
  if(t.closest('[data-act="parkcircles"]')){ parkSub='circles'; go('park',null,true); return; }
  const qa = t.closest('[data-qa]');
  if(qa){
    const k=qa.dataset.qa;
    if(k==='coins'){ toast(`${state.coins} Move Coins in your wallet`); return; }
    if(k==='level'){ go('myavatar'); return; }
    if(k==='users'){ go('friends'); return; }
    if(k==='calendar'){ go('calendar'); return; }
    toast('New Member Gift added to your wallet'); return;
  }
  const lc = t.closest('[data-circle]');
  if(lc && current !== 'wizard'){ go('circle', lc.dataset.circle); return; }
  const llive = t.closest('[data-live]');
  if(llive){ go('challenges'); return; }

  /* —— 商品卡 —— */
  const prod = t.closest('[data-product]');
  if(prod){ e.stopPropagation(); go('product', prod.dataset.product); return; }

  /* —— 角色切换 —— */
  const ch = t.closest('[data-char]');
  if(ch){
    state.avatar.char = ch.dataset.char;
    $$('.wz-thumb').forEach(x=>x.classList.toggle('on', x.dataset.char===ch.dataset.char));
    save();
    const f = document.querySelector('.wz-fig');
    if(f){ f.style.opacity=0; setTimeout(()=>{ repaintAvatarViews(); f.style.opacity=1; },160); }
    return;
  }

  /* —— 向导属性 —— */
  /* —— 实时捏脸选项（body/height/skin/eyes/brows/mouth/hair/acc/mood）—— */
  const live = t.closest('[data-body],[data-height],[data-skin],[data-eyes],[data-brows],[data-mouth],[data-haircol],[data-hairstyle],[data-mood]');
  if(live){
    const d = live.dataset;
    if(d.body !== undefined) applyAvatarChange('body', d.body);
    else if(d.height !== undefined) applyAvatarChange('height', d.height);
    else if(d.skin !== undefined) applyAvatarChange('skin', +d.skin);
    else if(d.eyes !== undefined) applyAvatarChange('eyes', d.eyes);
    else if(d.brows !== undefined) applyAvatarChange('brows', d.brows);
    else if(d.mouth !== undefined) applyAvatarChange('mouth', d.mouth);
    else if(d.haircol !== undefined) applyAvatarChange('hairColor', +d.haircol);
    else if(d.hairstyle !== undefined) applyAvatarChange('hairStyle', d.hairstyle);
    else if(d.mood !== undefined) applyAvatarChange('mood', d.mood);
    if(current === 'editor'){ edTab = edTab; $$('#edtabs button').forEach(x=>x.classList.toggle('on', x.dataset.edtab===edTab)); document.getElementById('edpanel').innerHTML = edPanel(); }
    else if(current === 'wizard'){ refreshWizardLive(); }
    return;
  }
  const w = t.closest('[data-face],[data-acc],[data-style],[data-color],[data-sport],[data-exp],[data-goal],[data-scene],[data-fit],[data-fitpref],[data-fabric],[data-circle]');
  if(w){ wizardPick(w); return; }

  /* —— 向导 tab —— */
  const wt = t.closest('[data-tab]');
  if(wt){
    $$('#wztabs button').forEach(x=>x.classList.toggle('on', x===wt));
    document.getElementById('wzpanel').innerHTML = wizPanel(wt.dataset.tab);
    return;
  }

  /* —— 向导下一步 —— */
  if(t.closest('#wiznext')){
    if(wizStep<5){ wizStep++; repaintWizard(); }
    else { finishWizard(); }
    return;
  }
  if(t.closest('[data-act="skip"]')){
    if(wizStep<5){ wizStep++; repaintWizard(); } else finishWizard();
    return;
  }
  if(t.closest('[data-sugg]')){
    const s=t.closest('[data-sugg]').dataset.sugg;
    state.lifestyle.motive = s;
    state.lifestyle.style = /group|others/i.test(s)?'group':'solo';
    state.lifestyle.freq = /most days/i.test(s)?'5+':/three|four/i.test(s)?'3-4':'1-2';
    save(); toast('Noted'); return;
  }

  /* —— Reveal —— */
  if(t.closest('[data-act="revealgo"]')){ state.created=true; save(); go('home',null,true); toast('Welcome to AI ME'); return; }

  /* —— Home hero 轮播 —— */
  const hs = t.closest('[data-hsport]');
  if(hs){
    state.style.sport = SPORTS.find(s=>s.id===hs.dataset.hsport).name;
    save(); go('match'); return;
  }

  /* —— Match 行选择 —— */
  const mr = t.closest('[data-mrow]');
  if(mr){ openMatchPicker(mr.dataset.mrow); return; }
  if(t.closest('#matchcta')){
    // 保存当前搭配到 avatar outfit，再进换装台
    const recs = recommendBy(state.style.sport);
    state.avatar.outfit.top = recs[0].id;
    state.avatar.outfit.bottom = recs[1].id;
    state.avatar.outfit.outer = recs[2].id;
    state.avatar.outfitColor = state.style.color;
    save(); go('outfit'); return;
  }
  if(t.closest('#mtwhy')){ document.getElementById('mtwhytxt').classList.toggle('on'); return; }

  /* —— Dressing Room —— */
  const dc = t.closest('[data-drcat]');
  if(dc){ drCat = dc.dataset.drcat; repaintDressing(); return; }
  const di = t.closest('[data-dritem]');
  if(di){
    const id=di.dataset.idit || di.dataset.dritem;
    const kind=di.dataset.kind;
    if(kind==='scene'){
      const sc = SCENES.find(s=>s.id===id);
      if(state.level < sc.lvl){ toast(`Unlock ${sc.name} at Level ${sc.lvl}`); return; }
      state.avatar.scene = id; save(); repaintDressing(); toast(`${sc.name} is now your scene`); return;
    }
    const cat = di.dataset.cat;
    const p = prodById(id);
    if(cat === 'acc'){
      applyAvatarChange('acc', id);
      repaintDressing();
      if(p) toast(`${p.name} ${state.avatar.accessories.includes(id)?'on':'off'} your AI ME`);
      return;
    }
    state.avatar.outfit[cat] = (state.avatar.outfit[cat]===id) ? '' : id;
    save(); repaintDressing();
    if(p) toast(`${p.name} on your AI ME`);
    return;
  }
  const dcol = t.closest('[data-drcolor]');
  if(dcol){ state.avatar.outfitColor=dcol.dataset.drcolor; state.style.color=dcol.dataset.drcolor; save(); repaintDressing(); return; }
  const hot = t.closest('[data-hot]');
  if(hot){
    drCat = hot.dataset.hot;
    repaintDressing();
    document.getElementById('drcats')?.scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }

  /* —— Editor —— */
  const et = t.closest('[data-edtab]');
  if(et){ edTab=et.dataset.edtab; $$('#edtabs button').forEach(x=>x.classList.toggle('on', x===et)); document.getElementById('edpanel').innerHTML=edPanel(); return; }
  const em = t.closest('[data-mood]');
  if(em){ applyAvatarChange('mood', em.dataset.mood); document.getElementById('edpanel').innerHTML = edPanel(); return; }

  /* —— Wardrobe —— */
  const wt2 = t.closest('[data-wrtab]');
  if(wt2){ wrTab=wt2.dataset.wrtab; wrCat='All'; repaintWardrobe(); return; }
  const wc = t.closest('[data-wrcat]');
  if(wc){ wrCat=wc.dataset.wrcat; repaintWardrobe(); return; }
  const wcell = t.closest('[data-wrcell]');
  if(wcell){
    const p=prodById(wcell.dataset.wrcell);
    openWearDrawer(p);
    return;
  }

  /* —— Discover —— */
  const dt = t.closest('[data-dtab]');
  if(dt){ $$('#disctabs button').forEach(x=>x.classList.toggle('on', x===dt)); toast(`${dt.dataset.dtab} selected`); return; }
  const dsc = t.closest('[data-sceneopen]');
  if(dsc){
    const sc=SCENES.find(s=>s.id===dsc.dataset.sceneopen);
    if(state.level<sc.lvl){ toast(`${sc.name} unlocks at Level ${sc.lvl}`); return; }
    state.avatar.scene=sc.id; save(); go('dressing'); toast(`${sc.name} is now your scene`); return;
  }

  /* —— Profile 隐私 —— */
  const vis = t.closest('[data-vis]');
  if(vis){ state.visibility=vis.dataset.vis; save(); $$('#pfvis button').forEach(x=>x.classList.toggle('on', x===vis)); toast('Visibility updated'); return; }
  const tg = t.closest('[data-toggle]');
  if(tg){ const k=tg.dataset.toggle; state[k]=!state[k]; save(); tg.classList.toggle('on', state[k]); return; }

  /* —— Park —— */
  const pz = t.closest('[data-zone]');
  if(pz){ openZone(pz.dataset.zone); return; }
  const pu = t.closest('[data-user]');
  if(pu){ go('avatarCard', pu.dataset.user); return; }
  if(t.closest('#pevent')){ go('event','e_tennis'); return; }
  if(t.closest('#pme')){ go('avatar'); return; }

  /* —— Circle —— */
  const ct = t.closest('[data-citab]');
  if(ct){
    $$('#citabs button').forEach(x=>x.classList.toggle('on', x===ct));
    document.getElementById('cipanel').innerHTML = ciPanel(ct.dataset.citab, CIRCLES.find(c=>c.id===currentParam));
    return;
  }
  if(t.closest('[data-act="joincircle"]')){
    const cid=t.closest('[data-act="joincircle"]').dataset.circle;
    const i=state.circles.indexOf(cid);
    if(i>=0){ state.circles.splice(i,1); toast(`Left ${CIRCLES.find(c=>c.id===cid).name}`); }
    else { state.circles.push(cid); toast(`Joined ${CIRCLES.find(c=>c.id===cid).name}`); }
    save(); repaintCircle();
    return;
  }

  /* —— 活动 —— */
  const ev = t.closest('[data-event]');
  if(ev){ go('event', ev.dataset.event); return; }
  if(t.closest('[data-act="signup"]')){
    const id=t.closest('[data-act="signup"]').dataset.event;
    if(!state.signedUp.includes(id)) state.signedUp.push(id);
    save(); toast('You are going. Show this code at check-in.'); repaintEvent();
    return;
  }
  if(t.closest('[data-act="checkin"]')){
    const id=t.closest('[data-act="checkin"]').dataset.event;
    doCheckin(id); return;
  }
  if(t.closest('[data-act="goeventwear"]')){
    const id = currentParam || 'e_tennis';
    const e = EVENTS.find(x=>x.id===id) || EVENTS[0];
    const sc = SCENES.find(s=>s.id===e.sport);
    state.avatar.scene = sc ? sc.id : 'home';
    save(); go('dressing'); return;
  }

  /* —— 挑战 —— */
  const jc = t.closest('[data-joinch]');
  if(jc){
    const id=jc.dataset.joinch;
    const i=state.joinedChallenges.indexOf(id);
    if(i>=0){ state.joinedChallenges.splice(i,1); toast('Left the challenge'); }
    else { state.joinedChallenges.push(id); toast('Joined. Your avatar is counting.'); }
    save(); repaintChallenges(); return;
  }
  const cf = t.closest('[data-chfilter]');
  if(cf){ $$('#chfilters .chip').forEach(x=>x.classList.toggle('on', x===cf)); filterChallenges(cf.dataset.chfilter); return; }

  /* —— 好友 —— */
  const iv = t.closest('[data-invite]');
  if(iv){
    const id=iv.dataset.invite;
    if(!state.pendingInvites.includes(id)) state.pendingInvites.push(id);
    save(); iv.textContent='Invited'; iv.disabled=true;
    toast('Invitation sent — waiting for their reply');
    return;
  }
  const aci = t.closest('#acinvite');
  if(aci){
    const id=aci.dataset.user;
    if(!state.pendingInvites.includes(id)) state.pendingInvites.push(id);
    save(); aci.textContent='Invitation sent'; aci.disabled=true;
    toast('Invitation sent — waiting for their reply');
    return;
  }

  /* —— 徽章 —— */
  const bg = t.closest('[data-badge]');
  if(bg){
    const b=BADGES.find(x=>x.id===bg.dataset.badge);
    const has=state.badges.includes(b.id);
    openDrawer(`<div class="bd-story">
      <div class="bd-ic" style="background:${has?b.color:'var(--surface-2)'};width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center">
        ${icon(b.icon).replace('<svg ',`<svg style="stroke:${has?'#16150F':'#8B8576'};width:26px;height:26px" `)}
      </div>
      <b>${b.name}</b>
      <p>${b.how}</p>
      <span>${has?'Earned. This badge is linked to your real activity history.':'Locked. Keep moving to unlock it.'}</span>
    </div>`);
    return;
  }

  /* —— Collection —— */
  if(t.closest('[data-act="scanfigure"]')){ openScan(); return; }
  const fg = t.closest('[data-figure]');
  if(fg){
    const f=FIG_SERIES.find(x=>x.id===fg.dataset.figure);
    if(state.figures.includes(f.id) && !state.boundFigure){ openScan(); return; }
    if(!state.figures.includes(f.id)){ toast('Complete a challenge and check in at a Pop-up to unlock this series'); return; }
    openScan(); return;
  }

  /* —— 花园 —— */
  if(t.closest('[data-act="plantseed"]')){
    state.seeds += 1; save(); toast('Seed planted. The garden grows with everyone.');
    repaintGarden(); return;
  }

  /* —— 分享 —— */
  if(t.closest('[data-act="share"]')){ toast('Share card created'); return; }

  /* —— 保存 —— */
  if(t.closest('[data-act="savelook"]')){ toast('Look saved to My Wardrobe'); return; }
  if(t.closest('[data-act="saveoutfit"]')){ toast('Outfit saved to My Wardrobe'); return; }
  if(t.closest('[data-act="saveface"]')){ save(); toast('Changes saved'); go('avatar'); return; }
  if(t.closest('[data-act="randomize"]')){ randomizeLook(); return; }
  if(t.closest('[data-act="resetface"]')){
    state.avatar = Object.assign(state.avatar, {body:'balanced',height:'mid',skin:2,hair:0,hairColor:0,face:'oval',eyes:0,brows:0,mouth:0,accessories:[],mood:'happy'});
    save(); repaintEditor(); repaintAvatarViews(); toast('Face reset'); return;
  }

  /* —— 收藏 —— */
  if(t.closest('[data-act="wishlist"]')){
    const id=t.closest('[data-act="wishlist"]').dataset.id;
    const i=state.wardrobe.wishlist.indexOf(id);
    if(i>=0){ state.wardrobe.wishlist.splice(i,1); toast('Removed from wishlist'); }
    else { state.wardrobe.wishlist.push(id); toast('Added to wishlist'); }
    save(); repaintProduct(); return;
  }

  /* —— 加购 —— */
  if(t.closest('#pdbag')){
    const p=prodById(currentParam);
    state.bag.push(p.id);
    if(!state.wardrobe.owned.includes(p.id)) state.wardrobe.owned.push(p.id);
    if(state.wardrobe.wishlist.includes(p.id)) state.wardrobe.wishlist.splice(state.wardrobe.wishlist.indexOf(p.id),1);
    if(!state.badges.includes('b_buyer')) state.badges.push('b_buyer');
    save(); toast(`${p.name} added. It is now in your digital wardrobe.`);
    repaintProduct(); return;
  }

  /* —— 试穿 —— */
  const tw = t.closest('[data-trywear]');
  if(tw){
    const id=tw.dataset.trywear, p=prodById(id);
    if(p){
      if(p.cat==='acc'){ applyAvatarChange('acc', id); go('dressing'); toast(`${p.name} on your AI ME`); return; }
      const cat = p.cat==='outer'?'outer':p.cat==='bottom'?'bottom':p.cat==='shoes'?'shoes':'top';
      state.avatar.outfit[cat]=id; state.avatar.outfitColor=p.color;
      save();
    }
    go('dressing'); toast(`${p.name} on your AI ME`); return;
  }
}
function globalChange(e){
  const t=e.target;
  if(t.id==='frq'){ const v=t.value.trim().toLowerCase(); if(v) toast(`Searching for "${v}"`); }
}
function globalInput(e){
  const t=e.target;
  if(t.id==='frq'){ const v=t.value.trim().toLowerCase(); if(v) toast(`Searching for "${v}"`); }
}

/* ---------- 面板选择 ---------- */
function wizardPick(el){
  const d=el.dataset, a=state.avatar;
  if(d.body){ a.body=d.body; }
  else if(d.height){ a.height=d.height; }
  else if(d.skin!==undefined){ a.skin=+d.skin; }
  else if(d.face){ a.face=d.face; }
  else if(d.eyes!==undefined){ a.eyes=+d.eyes; }
  else if(d.brows!==undefined){ a.brows=+d.brows; }
  else if(d.mouth!==undefined){ a.mouth=+d.mouth; }
  else if(d.hair!==undefined){ a.hair=+d.hair; }
  else if(d.haircol!==undefined){ a.hairColor=+d.haircol; }
  else if(d.acc){
    const i=a.accessories.indexOf(d.acc);
    if(i>=0) a.accessories.splice(i,1);
    else { if(a.accessories.length>=3){ toast('Three accessories maximum'); return; } a.accessories.push(d.acc); }
  }
  else if(d.style){ state.style.style=d.style; }
  else if(d.color){ state.style.color=d.color; a.outfitColor=d.color; }
  else if(d.sport){ a.sport=d.sport; const sp=SPORTS.find(s=>s.id===d.sport); if(sp) state.style.sport=sp.name;
    const i=state.movement.sports.indexOf(d.sport); if(i<0) state.movement.sports.push(d.sport); }
  else if(d.exp){ state.movement.exp=d.exp; }
  else if(d.goal){ state.movement.goal=d.goal; }
  else if(d.scene){ state.movement.scene=d.scene; }
  else if(d.fit){ state.fit[d.fit]=d.val; }
  else if(d.fitpref){ state.fit.fit=d.fitpref; }
  else if(d.fabric){ state.fit.fabric=d.fabric; }
  else if(d.circle){
    const i=state.circles.indexOf(d.circle);
    if(i>=0) state.circles.splice(i,1); else state.circles.push(d.circle);
  }
  save();
  // 就地重绘当前步骤
  if(current==='wizard'){
    const wzp = document.getElementById('wzpanel');
    if(wzp) wzp.innerHTML = wizPanel(document.querySelector('#wztabs button.on')?.dataset.tab || 'body');
    const dw = document.getElementById('wzdna'); if(dw) dw.innerHTML = wizDnaTags();
    // 刷新属性选项高亮
    const panel = document.getElementById('wzpanel');
    if(panel) panel.querySelectorAll('[data-body],[data-height],[data-skin],[data-face],[data-eyes],[data-brows],[data-mouth],[data-hair],[data-haircol],[data-acc]').forEach(x=>{
      const k=Object.keys(x.dataset)[0], v=x.dataset[k];
      const cur = k==='body'?a.body:k==='height'?a.height:k==='skin'?String(a.skin):k==='face'?a.face:k==='eyes'?String(a.eyes):k==='brows'?String(a.brows):k==='mouth'?String(a.mouth):k==='hair'?String(a.hair):k==='haircol'?String(a.hairColor):null;
      x.classList.toggle('on', cur===v);
    });
    if(wizStep===1){
      document.querySelectorAll('[data-style]').forEach(x=>x.style.borderColor = x.dataset.style===state.style.style?'var(--ink)':'');
      document.querySelectorAll('[data-color]').forEach(x=>x.classList.toggle('on', x.dataset.color===state.style.color));
    }
    if(wizStep===2){
      document.querySelectorAll('[data-sport]').forEach(x=>x.classList.toggle('on', state.movement.sports.includes(x.dataset.sport)));
      document.querySelectorAll('[data-exp]').forEach(x=>x.classList.toggle('on', x.dataset.exp===state.movement.exp));
      document.querySelectorAll('[data-goal]').forEach(x=>x.classList.toggle('on', x.dataset.goal===state.movement.goal));
      document.querySelectorAll('[data-scene]').forEach(x=>x.classList.toggle('on', x.dataset.scene===state.movement.scene));
    }
    if(wizStep===3){
      document.querySelectorAll('[data-fit]').forEach(x=>x.classList.toggle('on', state.fit[x.dataset.fit]===x.dataset.val));
      document.querySelectorAll('[data-fitpref]').forEach(x=>x.classList.toggle('on', x.dataset.fitpref===state.fit.fit));
      document.querySelectorAll('[data-fabric]').forEach(x=>x.classList.toggle('on', x.dataset.fabric===state.fit.fabric));
    }
    if(wizStep===5){
      document.querySelectorAll('[data-circle]').forEach(x=>{
        const on=state.circles.includes(x.dataset.circle);
        x.style.borderColor=on?'var(--ink)':'';
        x.style.background=on?'var(--blush)':'';
      });
    }
  }
  else if(current==='editor'){
    document.getElementById('edpanel').innerHTML = edPanel();
  }
  repaintAvatarViews();
}

/* ---------- 随机捏脸 ---------- */
function randomizeLook(){
  const a=state.avatar;
  a.body=['slim','balanced','athletic','strong'][Math.floor(Math.random()*4)];
  a.height=['low','mid','tall'][Math.floor(Math.random()*3)];
  a.skin=Math.floor(Math.random()*SKIN_TONES.length);
  a.hairColor=Math.floor(Math.random()*HAIR_COLORS.length);
  a.hairStyle=HAIR_STYLES[Math.floor(Math.random()*HAIR_STYLES.length)].id;
  a.face=['oval','round','square'][Math.floor(Math.random()*3)];
  a.eyesId=FACE_EYES[Math.floor(Math.random()*FACE_EYES.length)].id;
  a.browsId=FACE_BROWS[Math.floor(Math.random()*FACE_BROWS.length)].id;
  a.mouthId=FACE_MOUTH[Math.floor(Math.random()*FACE_MOUTH.length)].id;
  a.mood=MOODS[Math.floor(Math.random()*MOODS.length)].id;
  save();
  repaintAvatarViews();
  if(current==='editor'){ document.getElementById('edpanel').innerHTML = edPanel(); }
  toast('New look generated');
}

/* ---------- 完成向导 ---------- */
function finishWizard(){
  state.created = true;
  state.style.sport = SPORTS.find(s=>s.id===state.movement.sports[0])?.name || 'Boxing';
  state.avatar.name = chById(state.avatar.char).name;
  save();
  go('reveal', null, true);
}
function repaintWizard(){
  paint(ROUTES.wizard);
}

/* ---------- Match 选择面板 ---------- */
function openMatchPicker(kind){
  let html='';
  if(kind==='sport'){
    html = `<b>Sport</b><div class="mp-grid">${SPORTS.map(s=>`<button class="mp ${state.style.sport===s.name?'on':''}" data-mp="sport" data-val="${s.name}">${icon(s.icon)}${s.name}</button>`).join('')}</div>`;
  } else if(kind==='style'){
    html = `<b>Style</b><div class="mp-grid">${MATCH_STYLES.map(s=>`<button class="mp ${state.style.style===s?'on':''}" data-mp="style" data-val="${s}">${s}</button>`).join('')}</div>`;
  } else {
    html = `<b>Color</b><div class="mp-cols">${MATCH_COLORS.map(c=>`<button class="mp-col ${state.style.color===c?'on':''}" data-mp="color" data-val="${c}"><i style="background:${colorHex(c)}"></i><span>${c}</span></button>`).join('')}</div>`;
  }
  const dr = openDrawer(`<div class="mp-title">${html}</div>
    <style>
      .mp-title b{font-size:13px;font-weight:700;display:block;margin-bottom:12px}
      .mp-grid{display:flex;flex-wrap:wrap;gap:8px}
      .mp{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;border-radius:var(--r-pill);border:1px solid var(--line);font-size:13px;font-weight:600}
      .mp svg{width:15px;height:15px;stroke:currentColor;stroke-width:1.5;fill:none}
      .mp.on{background:var(--ink);color:#fff;border-color:var(--ink)}
      .mp-cols{display:flex;flex-wrap:wrap;gap:10px}
      .mp-col{display:flex;flex-direction:column;align-items:center;gap:5px;width:74px}
      .mp-col i{width:40px;height:40px;border-radius:50%;display:block;border:2px solid var(--paper);box-shadow:0 0 0 1px var(--line)}
      .mp-col.on i{box-shadow:0 0 0 2.5px var(--ink)}
      .mp-col span{font-size:10px;color:var(--ink-3)}
    </style>`);
  dr.addEventListener('click', ev=>{
    const b=ev.target.closest('[data-mp]');
    if(!b) return;
    state.style[b.dataset.mp]=b.dataset.val;
    if(b.dataset.mp==='sport'){
      state.movement.sports=[SPORTS.find(s=>s.name===b.dataset.val)?.id].filter(Boolean);
    }
    if(b.dataset.mp==='color') state.avatar.outfitColor=b.dataset.val;
    save();
    closeDrawer();
    repaintMatch();
  });
}
function repaintMatch(){ paint(ROUTES.match); }

/* ---------- 试穿抽屉 ---------- */
function openWearDrawer(p){
  if(!p) return;
  const owned=state.wardrobe.owned.includes(p.id);
  const wish=state.wardrobe.wishlist.includes(p.id);
  const dr=openDrawer(`
    <div class="wd">
      <div class="wd-img"><img src="${p.img}" alt=""></div>
      <div class="wd-meta">
        <b>${p.name}</b>
        <span>${p.color} · ${p.sport}</span>
        <span class="wd-price">${money(p.price)}</span>
        <span class="wd-stock">${owned?'Owned · in your digital wardrobe':(wish?'On your wishlist':p.stock||'Available online')}</span>
      </div>
      <div class="wd-acts">
        <button class="btn ghost" data-wd="close">Close</button>
        <button class="btn" data-wd="product" data-id="${p.id}">View Product</button>
      </div>
      <p class="wd-note">${icon('info')}Real product. Every piece you unlock here is anchored to an item you can buy.</p>
    </div>
    <style>
      .wd{display:flex;gap:14px;align-items:flex-start}
      .wd-img{width:88px;height:100px;flex:none;background:var(--blush);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;overflow:hidden}
      .wd-img img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
      .wd-meta{flex:1;display:flex;flex-direction:column;gap:2px}
      .wd-meta b{font-size:15px;font-weight:800}
      .wd-meta span{font-size:12px;color:var(--ink-3)}
      .wd-price{font-size:16px;font-weight:800;color:var(--lulu-red)!important;margin-top:3px}
      .wd-stock{font-size:11px!important;color:var(--success)!important}
      .wd-acts{display:flex;gap:9px;margin-top:16px}
      .wd-acts .btn{flex:1;height:44px;font-size:13.5px}
      .wd-note{display:flex;gap:6px;font-size:10.5px;color:var(--ink-3);margin-top:12px;line-height:1.4}
      .wd-note svg{width:13px;height:13px;flex:none;stroke:var(--ink-3);stroke-width:1.5;fill:none;margin-top:1px}
    </style>`);
  dr.addEventListener('click', ev=>{
    const b=ev.target.closest('[data-wd]');
    if(!b) return;
    if(b.dataset.wd==='close'){ closeDrawer(); return; }
    if(b.dataset.wd==='product'){ closeDrawer(); go('product', b.dataset.id); return; }
  });
}

/* ---------- 区域点击 ---------- */
function openZone(zoneId){
  const map={ train:'train', tennis:'tennis', pilates:'pilates', outdoor:'outdoor', running:'running' };
  const cid=map[zoneId]||'tennis';
  const c=CIRCLES.find(x=>x.id===cid);
  go('circle', cid);
}

/* ---------- 玩家名片：改为 avatarCard 独立页面（带返回键，见 pages-park-extra.js） ---------- */

/* ---------- 签到 ---------- */
function doCheckin(eventId){
  const e=EVENTS.find(x=>x.id===eventId);
  if(!state.checkedIn.includes(eventId)) state.checkedIn.push(eventId);
  grantCoins(120);
  if(!state.badges.includes('b_clinic')) state.badges.push('b_clinic');
  // 解锁场景
  const sc=SCENES.find(s=>s.id===e.sport);
  if(sc && state.level>=sc.lvl) state.journey[e.sport]=true;
  // 解锁主题服饰
  const outfitId = e.sport==='tennis'?'short_swim':e.sport==='yoga'?'bra_cloud':'bra_energy';
  if(!state.wardrobe.unlocked.includes(outfitId)) state.wardrobe.unlocked.push(outfitId);
  state.seeds += 1;
  save();
  showCheckinReward(eventId);
}
function showCheckinReward(eventId){
  const s=stage(); s.innerHTML='';
  const el=document.createElement('div');
  el.className='screen enter';
  el.innerHTML = renderCheckinReward(eventId);
  s.appendChild(el);
  setTimeout(()=>el.classList.remove('enter'),260);
}

/* ---------- 扫码绑定 ---------- */
function openScan(){
  const dr=openDrawer(`
    <div class="scanbox">
      <div class="sc-frame">
        <span class="sc-l sc-tl"></span><span class="sc-l sc-tr"></span>
        <span class="sc-l sc-bl"></span><span class="sc-l sc-br"></span>
        <div class="sc-line"></div>
      </div>
      <p class="sc-hint">Point your camera at the QR code on your figure</p>
      <button class="btn block" id="scanok">Simulate scan</button>
      <button class="btn ghost block" style="margin-top:8px" data-scancancel>Cancel</button>
    </div>
    <style>
      .sc-frame{position:relative;width:200px;height:200px;margin:6px auto 0;background:rgba(22,21,15,.04);border-radius:var(--r-md)}
      .sc-l{position:absolute;width:24px;height:24px;border:3px solid var(--ink)}
      .sc-tl{top:0;left:0;border-right:none;border-bottom:none;border-radius:6px 0 0 0}
      .sc-tr{top:0;right:0;border-left:none;border-bottom:none;border-radius:0 6px 0 0}
      .sc-bl{bottom:0;left:0;border-right:none;border-top:none;border-radius:0 0 0 6px}
      .sc-br{bottom:0;right:0;border-left:none;border-top:none;border-radius:0 0 6px 0}
      .sc-line{position:absolute;left:8px;right:8px;height:2px;background:var(--lulu-red);animation:scanline 2s ease-in-out infinite}
      @keyframes scanline{0%,100%{top:12px}50%{top:186px}}
      .sc-hint{text-align:center;font-size:12px;color:var(--ink-3);margin:14px 0 16px;line-height:1.45}
    </style>`);
  dr.addEventListener('click', ev=>{
    if(ev.target.closest('[data-scancancel]')){ closeDrawer(); return; }
    if(ev.target.closest('#scanok')){
      closeDrawer();
      if(!state.figures.includes('s1')) state.figures.push('s1');
      state.boundFigure = true;
      save();
      toast('Bound! Your figure and avatar now move together.');
      setTimeout(()=>go('collection'),400);
    }
  });
}

/* ---------- 重绘辅助 ---------- */
function repaintDressing(){ paint(ROUTES.dressing); }
function repaintEditor(){ paint(ROUTES.editor); }
function repaintProduct(){ paint(ROUTES.product); }
function repaintCircle(){ paint(ROUTES.circle); }
function repaintEvent(){ paint(ROUTES.event); }
function repaintChallenges(){ paint(ROUTES.challenges); }
function repaintGarden(){ paint(ROUTES.garden); }
function repaintWardrobe(){ paint(ROUTES.wardrobe); }

let wrTab='owned', wrCat='All';
function filterChallenges(kind){
  const list = kind==='Community' ? CHALLENGES.filter(c=>c.type==='community')
    : kind==='Circle' ? CHALLENGES.filter(c=>c.type==='circle')
    : CHALLENGES.filter(c=>c.type!=='community');
  document.getElementById('chlist').innerHTML = list.map(ch=>chCard(ch)).join('');
}

/* ---------- Wardrobe 渲染 ---------- */
function renderWardrobeGrid(){
  const ids = wrTab==='owned' ? state.wardrobe.owned
    : wrTab==='wishlist' ? state.wardrobe.wishlist : state.wardrobe.unlocked;
  let list = ids.map(id=>prodById(id)).filter(Boolean);
  if(wrCat!=='All') list = list.filter(p=>p.cat===wrCat.toLowerCase());
  if(!list.length){
    return `<div class="wr-empty" style="grid-column:1/-1">
      <span class="ei">${icon('wardrobe')}</span>
      <p>${wrTab==='wishlist'?'Nothing on your wishlist yet. Browse the Park to find pieces you love.':wrTab==='unlocked'?'Complete a movement or check in at an event to unlock your first digital piece.':'Nothing here yet. Buy a piece or complete a movement to start your digital wardrobe.'}</p>
      <button data-go="${wrTab==='owned'?'discover':'challenges'}">${wrTab==='owned'?'Shop New Arrivals':'Find a challenge'} ${icon('chevR')}</button>
    </div>`;
  }
  return list.map(p=>{
    const tag = wrTab==='owned' ? `<span class="tag">${icon('check')}</span>`
      : wrTab==='wishlist' ? `<span class="tag wish">${icon('heart')}</span>`
      : `<span class="tag unl">${icon('snowflake')}</span>`;
    return `<button class="pcell" data-wrcell="${p.id}">
      <span class="pi"><img src="${p.img}" alt="">${tag}</span>
      <span class="pn">${p.name}</span>
      <span class="pp">${money(p.price)}</span>
    </button>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', boot);


/* ---------- 向导实时预览刷新 ---------- */
function refreshWizardLive(){
  repaintAvatarViews();
  const panel = document.getElementById('wzpanel');
  if(panel){
    const tab = document.querySelector('#wztabs button.on');
    panel.innerHTML = wizPanel(tab ? tab.dataset.tab : 'body');
  }
}
