/* ============================================================
   P01 Splash / P02 Wizard / P03 Reveal
   ============================================================ */

/* ---------- P01 Splash ---------- */
function renderSplash(){
  return `
  <div class="splash">
    <div class="spl-mark">
      <div class="spl-brand">${luluLogo(44)}</div>
      <div class="spl-word">AI ME</div>
      <div class="spl-claim serif">What if your movement had a personality?</div>
    </div>
    <div class="spl-foot">Create your movement identity</div>
  </div>
  <style>
    .splash{position:absolute;inset:0;background:var(--paper);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 32px}
    .spl-mark{display:flex;flex-direction:column;align-items:center;animation:fadeIn .6s ease both}
    .spl-brand{display:flex;align-items:center;margin-bottom:30px;color:var(--ink)}
    .spl-word{font-size:32px;font-weight:800;letter-spacing:.10em}
    .spl-claim{margin-top:14px;font-size:14px;color:var(--ink-3);text-align:center;line-height:1.5;animation:fadeUp .5s ease .18s both}
    .spl-foot{position:absolute;bottom:calc(40px + var(--safe-b));font-size:11px;letter-spacing:.16em;color:var(--ink-3);text-transform:uppercase;animation:fadeUp .5s ease .34s both}
  </style>`;
}

function splashInit(){
  setTimeout(()=>{ if(current==='splash') go('wizard'); }, 2200);
  device().addEventListener('click', function h(e){
    if(current==='splash'){ device().removeEventListener('click',h); go('wizard'); }
  });
}

/* ---------- P02 Wizard ---------- */
const WIZ_STEPS = [
  { id:'look',    label:'Look' },
  { id:'style',   label:'Style' },
  { id:'move',    label:'Movement' },
  { id:'fit',     label:'Fit' },
  { id:'life',    label:'Lifestyle' },
  { id:'circle',  label:'Circle' },
];
let wizStep = 0;

function renderWizard(){
  return `
  ${headerHTML({title:'AI ME', right:`<button class="rbtn" data-act="skip">Skip</button>`})}
  <div class="screen-body scroll wiz">
    <div class="wiz-prog">
      ${WIZ_STEPS.map((s,i)=>`<span class="wp ${i<wizStep?'done':''} ${i===wizStep?'cur':''}"></span>`).join('')}
      <span class="wiz-count">${wizStep+1} / 6</span>
    </div>
    <div id="wizbody">${wizStepBody()}</div>
  </div>
  <div class="footbar">
    <button class="btn block" id="wiznext">${wizNextLabel()}</button>
  </div>
  <style>
    .wiz{padding-bottom:96px}
    .wiz-prog{display:flex;gap:4px;align-items:center;padding:16px 20px 4px}
    .wiz-prog .wp{flex:1;height:3px;border-radius:2px;background:var(--surface-2)}
    .wiz-prog .wp.done{background:var(--ink)}
    .wiz-prog .wp.cur{background:var(--ink)}
    .wiz-count{font-size:11px;font-weight:600;color:var(--ink-3);margin-left:8px;flex:none}
    .wz h2{font-size:21px;font-weight:800;letter-spacing:-.02em;margin:12px 20px 5px}
    .wiz .lead{font-size:12.5px;color:var(--ink-3);margin:0 20px 14px;line-height:1.5}
    .wz-card{margin:0 20px 14px}
    .wz-title{font-size:11px;font-weight:800;letter-spacing:.1em;color:var(--ink-3);margin:0 20px 9px;text-transform:uppercase}
    .wz-thumbs{display:flex;gap:9px;overflow-x:auto;padding:2px 20px 6px;scrollbar-width:none}
    .wz-thumbs::-webkit-scrollbar{display:none}
    .wz-thumb{flex:none;width:62px;height:62px;border-radius:var(--r-md);background:var(--surface);border:1.5px solid transparent;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
    .wz-thumb img{width:100%;height:100%;object-fit:contain;object-position:center bottom}
    .wz-thumb.on{border-color:var(--ink);background:var(--blush)}
    .wz-thumb.add{border:1.5px dashed var(--line);color:var(--ink-3)}
    .wz-thumb.add svg{width:22px;height:22px;stroke:currentColor;stroke-width:1.5;fill:none}
    .wz-fig{height:min(30vh,215px);display:flex;align-items:flex-end;justify-content:center;margin:6px 20px 4px;position:relative}
    .wz-fig .shadow{position:absolute;left:50%;bottom:4px;transform:translateX(-50%);width:120px;height:16px;border-radius:50%;background:rgba(22,21,15,.13);filter:blur(7px)}
    .wz-fig img{max-height:100%;width:auto;object-fit:contain;transition:opacity .3s,transform .3s}
    .wz-tabs{display:flex;gap:6px;padding:0 20px;margin:12px 0 10px}
    .wz-tabs button{flex:1;height:32px;border-radius:var(--r-pill);background:var(--surface-2);font-size:12px;font-weight:600;color:var(--ink-2)}
    .wz-tabs button.on{background:var(--ink);color:#fff}
    .wz-opts{display:flex;gap:8px;flex-wrap:wrap;padding:0 20px}
    .wz-swatch{width:40px;height:40px;border-radius:50%;border:2px solid var(--paper);box-shadow:0 0 0 1px var(--line)}
    .wz-swatch.on{box-shadow:0 0 0 2.5px var(--ink)}
    .wz-dna{display:flex;gap:6px;flex-wrap:wrap;margin:14px 20px 0}
    .wz-dna span{font-size:11px;font-weight:600;padding:5px 11px;border-radius:var(--r-pill);background:var(--blush);color:var(--clay)}
    .wz-cards{display:flex;gap:10px;overflow-x:auto;padding:0 20px 6px;scrollbar-width:none}
    .wz-cards::-webkit-scrollbar{display:none}
    .wz-card2{flex:none;width:132px;border-radius:var(--r-lg);border:1px solid var(--line);padding:14px;background:var(--paper);text-align:left}
    .wz-card2 h4{font-size:13px;font-weight:700;margin-bottom:4px}
    .wz-card2 p{font-size:11.5px;color:var(--ink-3);line-height:1.4}
    .wz-card2 .sw{margin-top:9px;display:flex;gap:4px}
    .wz-card2 .sw i{width:13px;height:13px;border-radius:50%;display:block}
    .wz-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 20px}
    .wz-sport{height:88px;border-radius:var(--r-md);border:1px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;background:var(--paper)}
    .wz-sport svg{width:24px;height:24px;stroke:var(--ink);stroke-width:1.5;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .wz-sport span{font-size:12px;font-weight:600}
    .wz-sport.on{background:var(--ink);border-color:var(--ink);color:#fff}
    .wz-sport.on svg{stroke:#fff}
    .wz-chat{display:flex;flex-direction:column;gap:12px;padding:6px 20px}
    .wz-msg{max-width:78%;font-size:13px;line-height:1.5}
    .wz-msg.me{align-self:flex-end;background:var(--ink);color:#fff;padding:9px 13px;border-radius:16px 16px 4px 16px}
    .wz-msg.ai{align-self:flex-start;background:var(--surface);padding:9px 13px;border-radius:16px 16px 16px 4px}
    .wz-msg .who{font-size:10px;color:var(--ink-3);margin-bottom:5px;display:flex;align-items:center;gap:5px}
    .wz-msg .who .av{width:24px;height:24px}
    .wz-input{position:absolute;left:0;right:0;bottom:0;padding:10px 20px calc(14px + var(--safe-b));background:var(--paper);border-top:1px solid var(--line-soft)}
    .wz-input .row{gap:8px}
    .wz-input input{flex:1;height:38px;border-radius:var(--r-pill);background:var(--surface-2);padding:0 15px;font-size:13px}
    .wz-sugg{display:flex;gap:7px;overflow-x:auto;padding:0 20px 9px;scrollbar-width:none}
    .wz-sugg::-webkit-scrollbar{display:none}
    .wz-circle{flex:none;width:138px;border-radius:var(--r-lg);border:1px solid var(--line);padding:13px;background:var(--paper);text-align:left}
    .wz-circle .ci{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:9px}
    .wz-circle .ci svg{width:20px;height:20px;stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .wz-circle h4{font-size:12.5px;font-weight:700}
    .wz-circle .mem{font-size:10.5px;color:var(--ink-3);margin-top:2px}
    .wz-circle p{font-size:10.5px;color:var(--ink-2);margin-top:6px;line-height:1.35}
    .wz-privacy{margin:14px 20px 0;padding:12px 14px;border-radius:var(--r-md);background:rgba(110,155,78,.09);display:flex;gap:9px}
    .wz-privacy svg{width:17px;height:17px;flex:none;stroke:var(--park-green);stroke-width:1.6;fill:none;margin-top:1px}
    .wz-privacy p{font-size:11.5px;color:#3B6D11;line-height:1.45}
    .wz-accgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 20px}
    .wz-acc{border-radius:var(--r-md);background:var(--paper);border:1.5px solid var(--line);padding:5px;text-align:center;position:relative}
    .wz-acc.on{border-color:var(--ink);background:var(--blush)}
    .wza-img{width:100%;aspect-ratio:1;background:var(--surface);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .wza-img img{width:100%;height:100%;object-fit:contain}
    .wza-nm{font-size:8.5px;font-weight:600;margin-top:3px;height:20px;overflow:hidden;line-height:1.15}
    .wza-pr{font-size:9px;font-weight:700;color:var(--lulu-red)}
    .wza-buy{position:absolute;top:3px;right:3px;width:18px;height:18px;border-radius:50%;background:var(--ink);display:flex;align-items:center;justify-content:center}
    .wza-buy svg{width:10px;height:10px;stroke:#fff;stroke-width:2;fill:none}
    .wz-accnote{display:flex;gap:6px;font-size:10.5px;color:var(--ink-3);margin:10px 20px 0;line-height:1.4}
    .wz-accnote svg{width:13px;height:13px;flex:none;stroke:var(--ink-3);stroke-width:1.6;fill:none;margin-top:1px}
  </style>`;
}

function wizNextLabel(){
  return ['Next — Discover Your Style','Next — Find Your Movement','Next — Understand Your Fit','Next — Define Your Lifestyle','Next — Meet Your Circle','Create My AI ME'][wizStep];
}

function wizStepBody(){
  const a = state.avatar, s = state.style, m = state.movement;
  if(wizStep===0){
    return `
      <h2>Build your look</h2>
      <p class="lead">Start from a character, then make them yours. You never need to upload a photo.</p>
      <div class="wz-fig" data-av>${avatarHTML({})}</div>
      <div class="wz-thumbs" id="wzchars">
        ${CHARACTERS.map(c=>`<button class="wz-thumb ${c.id===a.char?'on':''}" data-char="${c.id}" title="${c.name}"><img src="${c.img}" alt=""></button>`).join('')}
        <button class="wz-thumb add" data-act="toast" data-msg="Full body editor opens in the next step">${icon('plus')}</button>
      </div>
      <div class="wz-tabs" id="wztabs">
        <button class="on" data-tab="body">Body</button>
        <button data-tab="face">Face</button>
        <button data-tab="hair">Hair</button>
        <button data-tab="acc">Accessories</button>
      </div>
      <div id="wzpanel">${wizPanel('body')}</div>
      <div class="wz-dna" id="wzdna">${wizDnaTags()}</div>`;
  }
  if(wizStep===1){
    const styles = [
      {n:'Minimalist', c:['#16150F','#F7F5F2','#E8C4C0']},
      {n:'Sporty',     c:['#C8102E','#16150F','#EFEBE4']},
      {n:'Elegant',    c:['#AE4526','#C98A83','#FBF4F2']},
      {n:'Streetwear', c:['#2B5876','#8B8576','#EFEBE4']},
    ];
    const colors = ['Black & Rose','Sand','Lilac','Mauve','Fog Blue','Clay','Cream','Ink'];
    const cc = {'Black & Rose':'#16150F','Sand':'#E3D9C4','Lilac':'#C6AEDC','Mauve':'#B98A96','Fog Blue':'#9FB8C4','Clay':'#AE4526','Cream':'#F4F0E8','Ink':'#2C2C2A'};
    return `
      <h2>Discover your style</h2>
      <p class="lead">This becomes your Style DNA — it steers every outfit we suggest.</p>
      <div class="wz-title">Style</div>
      <div class="wz-cards" id="wzstyles">
        ${styles.map(x=>`<button class="wz-card2" data-style="${x.n}">
          <h4>${x.n}</h4><p>${['Clean lines, quiet colors','Built for motion','Refined and soft','Relaxed and bold'][styles.indexOf(x)]}</p>
          <span class="sw">${x.c.map(c=>`<i style="background:${c}"></i>`).join('')}</span>
        </button>`).join('')}
      </div>
      <div class="wz-title" style="margin-top:18px">Color</div>
      <div class="wz-opts" id="wzcolors">
        ${colors.map(c=>`<button class="wz-swatch ${c===s.color?'on':''}" data-color="${c}" title="${c}" style="background:${cc[c]}"></button>`).join('')}
      </div>
      <div class="wz-title" style="margin-top:18px">Inspiration <span style="text-transform:none;letter-spacing:0;font-weight:500">· optional</span></div>
      <div style="padding:0 20px">
        <button style="width:100%;height:74px;border:1.5px dashed var(--line);border-radius:var(--r-md);color:var(--ink-3);font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px" data-act="toast" data-msg="Photo upload requires your explicit permission">
          ${icon('plus')}<span style="width:16px;height:16px">${''}</span>Upload a look you like
        </button>
      </div>
      <div class="wz-dna">${wizDnaTags()}</div>`;
  }
  if(wizStep===2){
    const exps=['Beginner','Intermediate','Advanced'];
    const goals=['Build strength','Run 10K','Find calm','Feel confident'];
    const scenes=['Home','Studio','Park','Outdoors'];
    return `
      <h2>Find your movement</h2>
      <p class="lead">Pick everything that feels like you. We use this to match products, circles and classes.</p>
      <div class="wz-grid" id="wzsports">
        ${SPORTS.map(x=>`<button class="wz-sport ${m.sports.includes(x.id)?'on':''}" data-sport="${x.id}">${icon(x.icon)}<span>${x.name}</span></button>`).join('')}
      </div>
      <div class="wz-title" style="margin-top:20px">Experience</div>
      <div class="wz-opts" id="wzexp">${exps.map(e=>`<button class="chip ${m.exp===e?'on':''}" data-exp="${e}">${e}</button>`).join('')}</div>
      <div class="wz-title" style="margin-top:18px">Goal</div>
      <div class="wz-opts" id="wzgoal">${goals.map(e=>`<button class="chip ${m.goal===e?'on':''}" data-goal="${e}">${e}</button>`).join('')}</div>
      <div class="wz-title" style="margin-top:18px">Where you move</div>
      <div class="wz-opts" id="wzscene">${scenes.map(e=>`<button class="chip ${m.scene===e?'on':''}" data-scene="${e}">${e}</button>`).join('')}</div>`;
  }
  if(wizStep===3){
    const f=state.fit;
    const sizes=['XS','S','M','L','XL'];
    const fits=['Fitted','Relaxed','Oversized'];
    const fabs=['Nulu™','Swiftwick','Wolfsense','Bison'];
    return `
      <h2>Understand your fit</h2>
      <p class="lead">Used only to size your outfits. Never shared with anyone.</p>
      <div style="padding:0 20px">
        <div class="setrow"><div class="sic">${icon('crop')}</div><span class="slab">Top size</span><span class="sval">${f.top}</span>${icon('chevR','chev')}</div>
        <div class="wz-title" style="margin:14px 0 8px">Top</div>
        <div class="wz-opts" id="wztop">${sizes.map(s=>`<button class="chip ${f.top===s?'on':''}" data-fit="top" data-val="${s}">${s}</button>`).join('')}</div>
        <div class="wz-title" style="margin:18px 0 8px">Bottom</div>
        <div class="wz-opts" id="wzbottom">${sizes.map(s=>`<button class="chip ${f.bottom===s?'on':''}" data-fit="bottom" data-val="${s}">${s}</button>`).join('')}</div>
        <div class="wz-title" style="margin:18px 0 8px">Fit preference</div>
        <div class="wz-opts" id="wzfitpref">${fits.map(s=>`<button class="chip ${f.fit===s?'on':''}" data-fitpref="${s}">${s}</button>`).join('')}</div>
        <div class="wz-title" style="margin:18px 0 8px">Fabric</div>
        <div class="wz-opts" id="wzfabric">${fabs.map(s=>`<button class="chip ${f.fabric===s?'on':''}" data-fabric="${s}">${s}</button>`).join('')}</div>
      </div>`;
  }
  if(wizStep===4){
    return `
      <h2>Define your lifestyle</h2>
      <p class="lead">Four quick answers so we know how you like to move and connect.</p>
      <div class="wz-chat" id="wzchat">
        <div class="wz-msg ai"><div class="who"><span class="av">${omega(24)}</span>AI ME</div>Hi. What kind of movement fits your week best?</div>
        <div class="wz-msg me">${state.lifestyle.freq==='1-2'?'A couple of sessions':state.lifestyle.freq==='3-4'?'Three or four':'Most days'}</div>
        <div class="wz-msg ai"><div class="who"><span class="av">${omega(24)}</span>AI ME</div>Nice. Do you move better alone or with people?</div>
        <div class="wz-msg me">${state.lifestyle.style==='solo'?'Mostly solo':'With others'}</div>
        <div class="wz-msg ai"><div class="who"><span class="av">${omega(24)}</span>AI ME</div>Last one — what is really driving you right now?</div>
        <div class="wz-msg me">${esc(state.lifestyle.motive||'I want to feel good')}</div>
      </div>
      <div class="wz-sugg" style="margin-top:16px">
        ${['I like early morning sessions','I am training for a 10K','Group classes keep me going','I am mostly a solo mover'].map(t=>`<button class="chip mini" data-sugg="${t}">${t}</button>`).join('')}
      </div>
      <style>.wz-input{display:none}</style>`;
  }
  // step 6
  return `
    <h2>Meet your circle</h2>
    <p class="lead">Pick the circles you want to belong to. You can change this any time.</p>
    <div class="wz-cards" id="wzcircles" style="padding-bottom:10px">
      ${CIRCLES.map(c=>`
        <button class="wz-circle" data-circle="${c.id}" style="${state.circles.includes(c.id)?'border-color:var(--ink);background:var(--blush)':''}">
          <span class="ci" style="background:${c.color}22">
            ${icon(c.icon).replace('<svg ', `<svg style="stroke:${c.color}" `)}
          </span>
          <h4>The ${c.name}</h4>
          <div class="mem">${c.members} Members</div>
          <p>${c.desc}</p>
        </button>`).join('')}
    </div>
    <div style="padding:0 20px;margin-top:6px">
      <div class="setrow" style="margin-bottom:8px">
        <div class="sic">${icon('pin')}</div>
        <span class="slab">Find classes near me</span>
        <span class="sval">Shenzhen</span>${icon('chevR','chev')}
      </div>
    </div>
    <div class="wz-privacy">
      ${icon('shield')}
      <p>You choose what to share. Location is never shown to others, and your avatar only appears in the Park if you want it to.</p>
    </div>`;
}

function wizDnaTags(){
  const s=state.style, m=state.movement;
  const t=[];
  if(wizStep>=1) t.push(s.style);
  if(wizStep>=1) t.push(s.color);
  if(wizStep>=2 && m.sports.length) t.push(SPORTS.find(x=>x.id===m.sports[0]).name);
  if(wizStep>=2) t.push(m.goal);
  if(wizStep>=3) t.push(state.fit.fit + ' fit');
  if(wizStep>=5) t.push(state.lifestyle.style==='solo'?'Solo mover':'Community mover');
  return t.map(x=>`<span>${esc(x)}</span>`).join('');
}

function wizPanel(tab){
  const a=state.avatar;
  const skins=['#F6D9C0','#EFC9A8','#E0B18A','#C79068','#A26B44','#7A4A2B'];
  const hairs=['High bun','Tight bun','Loose waves','Cropped','Braided','Curly'];
  const haircols=['#3B2A20','#16150F','#6B4A32','#D9A85A','#E3CFA6','#8B6F62','#B9A99B','#C98A83'];
  if(tab==='body') return `
    <div class="wz-title">Body shape</div>
    <div class="wz-opts" id="wzbody">
      ${['slim','balanced','athletic','strong'].map(b=>`<button class="chip ${a.body===b?'on':''}" data-body="${b}">${b[0].toUpperCase()+b.slice(1)}</button>`).join('')}
    </div>
    <div class="wz-title" style="margin-top:16px">Height</div>
    <div class="wz-opts" id="wzheight">
      ${[['low','Petite'],['mid','Mid'],['tall','Tall']].map(([k,l])=>`<button class="chip ${a.height===k?'on':''}" data-height="${k}">${l}</button>`).join('')}
    </div>
    <div class="wz-title" style="margin-top:16px">Skin tone</div>
    <div class="wz-opts" id="wzskin">
      ${skins.map((c,i)=>`<button class="wz-swatch ${a.skin===i?'on':''}" data-skin="${i}" style="background:${c}"></button>`).join('')}
    </div>`;
  if(tab==='face') return `
    <div class="wz-title" style="margin-top:16px">Face shape</div>
    <div class="wz-opts" id="wzface">
      ${['oval','round','square'].map(f=>`<button class="chip ${a.face===f?'on':''}" data-face="${f}">${f[0].toUpperCase()+f.slice(1)}</button>`).join('')}
    </div>`;
  if(tab==='hair') return `
    <div class="wz-title">Hair color</div>
    <div class="wz-opts" id="wzhaircol">${HAIR_COLORS.map((h,i)=>`<button class="wz-swatch ${a.hairColor===i?'on':''}" data-haircol="${i}" title="${h.name}" style="background:rgb(${h.rgb.join(',')})"></button>`).join('')}</div>
    <div class="wz-title" style="margin-top:16px">Hairstyle</div>
    <div class="wz-opts" id="wzhair">${HAIR_STYLES.map(h=>`<button class="chip ${a.hairStyle===h.id?'on':''}" data-hairstyle="${h.id}">${h.name}</button>`).join('')}</div>`;
  // acc —— 真实 lululemon 配件商品图，可点击穿上
  const accProds = PRODUCTS.filter(p=>p.cat==='acc');
  return `
    <div class="wz-title">Accessories <span style="text-transform:none;letter-spacing:0;font-weight:500">· pick up to 3</span></div>
    <div class="wz-accgrid" id="wzacc">
      ${accProds.map(p=>`
        <div class="wz-acc ${a.accessories.includes(p.id)?'on':''}">
          <button class="wza-img" data-acc="${p.id}" title="${p.name}"><img src="${p.img}" alt=""></button>
          <span class="wza-nm">${p.name.split(' ').slice(-1)[0]}</span>
          <span class="wza-pr">${money(p.price)}</span>
          <button class="wza-buy" data-product="${p.id}" title="View product">${icon('search')}</button>
        </div>`).join('')}
    </div>
    <p class="wz-accnote">${icon('info')}Tap to wear it. Tap the magnifier to open the real product page.</p>`;
}

/* ---------- P03 Reveal ---------- */
function renderReveal(){
  const a=state.avatar;
  return `
  <div class="reveal-page">
    <div class="rv-scan"></div>
    <div class="rv-fig" data-av>${avatarHTML({})}</div>
    <div class="rv-dnas">
      <div class="rv-dna" style="animation-delay:.15s">
        <span class="rt">Style DNA</span>
        <div class="rtags">${state.style.style} · ${state.style.color}</div>
      </div>
      <div class="rv-dna" style="animation-delay:.33s">
        <span class="rt">Movement DNA</span>
        <div class="rtags">${state.movement.sports.map(s=>(SPORTS.find(x=>x.id===s)||{}).name).join(', ')}</div>
      </div>
      <div class="rv-dna" style="animation-delay:.51s">
        <span class="rt">Lifestyle</span>
        <div class="rtags">${state.lifestyle.style==='solo'?'Solo mover':'Community mover'} · ${state.fit.fit}</div>
      </div>
    </div>
    <div class="rv-id">Movement ID · LM-${String(2841+state.level)}</div>
  </div>
  <div class="footbar">
    <button class="btn block" data-act="revealgo">Enter My AI ME</button>
    <button class="btn ghost block" style="margin-top:8px" data-go="editor">Customize</button>
  </div>
  <style>
    .reveal-page{position:absolute;inset:0;padding:calc(var(--safe-t) + 40px) 20px 150px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(180deg,#fff 0%,#FDF7F5 70%,#FBF4F2 100%);overflow:hidden}
    .rv-scan{position:absolute;left:0;right:0;height:180px;background:linear-gradient(180deg,transparent,rgba(232,196,192,.42),transparent);animation:rvscan 1.6s ease-in-out .1s infinite;pointer-events:none}
    @keyframes rvscan{0%{top:-180px}100%{top:100%}}
    .rv-fig{flex:1;display:flex;align-items:center;justify-content:center;position:relative;width:100%;min-height:0;max-height:38vh}
    .rv-fig .shadow{position:absolute;bottom:8%;left:50%;transform:translateX(-50%);width:130px;height:16px;border-radius:50%;background:rgba(22,21,15,.13);filter:blur(7px)}
    .rv-fig img{max-height:100%;width:auto;object-fit:contain;animation:pop .8s cubic-bezier(.2,.9,.3,1) both}
    .rv-dnas{display:flex;flex-direction:column;gap:8px;width:100%;max-width:340px}
    .rv-dna{background:rgba(255,255,255,.9);border:1px solid var(--line);border-radius:var(--r-md);padding:11px 14px;animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both}
    .rv-dna .rt{font-size:10px;font-weight:800;letter-spacing:.12em;color:var(--ink-3);text-transform:uppercase}
    .rv-dna .rtags{font-size:13.5px;font-weight:700;margin-top:3px}
    .rv-id{margin-top:14px;font-size:11.5px;color:var(--ink-3);letter-spacing:.06em}
  </style>`;
}
