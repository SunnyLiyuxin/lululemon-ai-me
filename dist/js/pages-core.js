/* ============================================================
   LULULEMON AI ME · 实时捏脸编辑器 / 装扮台 / 商品详情
   P12 Editor · P11 Dressing · P13 Product
   核心：所有选项点击后立即在角色身上生效（实时重绘）
   ============================================================ */

const MATCH_STYLES = ['Minimalist','Sporty','Elegant','Streetwear','Confident'];
const MATCH_COLORS = ['Black & Rose','Sand','Lilac','Mauve','Fog Blue','Clay','Cream','Ink'];

function recommendBy(sportName){
  const order = {
    'Boxing':['bra_energy','leg_align','hoodie_black'],
    'Yoga':['bra_align','leg_mauve','jkt_wander'],
    'Tennis':['short_swim','tank_sport','short_run'],
    'Running':['leg_classic','tank_sport','hoodie_blush'],
    'Training':['tank_sport','leg_align','hoodie_black'],
    'Hiking':['jkt_wander','leg_classic','bra_cloud'],
  };
  const map = {
    bra_sport:'tank_sport', bra_cloud:'bra_align', leg_classic:'leg_align',
    leg_swim:'short_run', jkt_soft:'hoodie_blush',
  };
  return (order[sportName] || order.Training)
    .map(id => prodById(map[id] || id)).filter(Boolean);
}

function whyText(sport, style, color){
  return [
    `${sport} calls for a support layer that stays put through impact — we started with the ${sport==='Boxing'?'Energy Bra':'most-worn top'}.`,
    `Your Style DNA reads ${String(style).toLowerCase()}, so we pulled the cleanest line rather than the loudest print.`,
    `${color} is already in your palette, so the full look stays inside the colours you actually wear.`,
  ];
}

/* ============================================================
   P09 AI Outfit Matching
   ============================================================ */
function renderMatch(){
  const s=state.style;
  const recs=recommendBy(s.sport);
  return `
  ${headerHTML({back:true, spread:true, right:`<button class="rbtn" data-act="toast" data-msg="Saved look">Save</button>`})}
  <div class="screen-body scroll mt-body">
    <h1 class="mt-h1">AI OUTFIT MATCHING</h1>

    <div style="padding:0 20px">
      <div class="setrow" data-mrow="sport">
        <div class="sic">${icon('running')}</div><span class="slab">Sport</span><span class="sval">${s.sport}</span>${icon('chevR','chev')}
      </div>
      <div class="setrow" data-mrow="style">
        <div class="sic">${icon('crown')}</div><span class="slab">Style</span><span class="sval">${s.style}</span>${icon('chevR','chev')}
      </div>
      <div class="setrow" data-mrow="color">
        <div class="sic">${icon('sparkle')}</div><span class="slab">Color</span><span class="sval">${s.color}</span>${icon('chevR','chev')}
      </div>
    </div>

    <div class="mt-stage">
      <div class="mt-fig" data-av>${avatarHTML({})}</div>
      <div class="mt-prods">
        ${recs.map(p=>`
          <button class="prodrow" data-product="${p.id}">
            <span class="pimg"><img src="${p.img}" alt=""></span>
            <span class="pmeta">
              <span class="pname">${p.name}</span>
              <span class="pprice">${money(p.price)}</span>
              <span class="pview">View ${icon('chevR')}</span>
            </span>
          </button>`).join('')}
      </div>
    </div>

    <button class="mt-why" id="mtwhy">Why this outfit? ${icon('chevD','chev')}</button>
    <div class="mt-whytxt" id="mtwhytxt">
      ${whyText(s.sport, s.style, s.color).map(t=>`<p>${t}</p>`).join('')}
    </div>
  </div>
  <div class="footbar">
    <button class="btn block" id="matchcta">Try this outfit</button>
  </div>
  <style>
    .mt-body{padding-bottom:100px}
    .mt-h1{font-size:19px;font-weight:800;letter-spacing:-.02em;margin:18px 20px 14px}
    .mt-stage{display:flex;gap:12px;align-items:center;padding:14px 20px 0}
    .mt-fig{flex:0 0 50%;height:290px;position:relative}
    .mt-prods{flex:1;min-width:0;display:flex;flex-direction:column;gap:9px}
    .mt-prods .prodrow{padding:8px}
    .mt-prods .pimg{width:50px;height:50px;flex:none}
    .mt-prods .pimg img{width:100%;height:100%;object-fit:contain}
    .mt-prods .pname{font-size:12px}
    .mt-prods .pprice{font-size:12.5px}
    .mt-why{display:flex;align-items:center;gap:5px;margin:16px 20px 0;font-size:12px;font-weight:600;color:var(--ink-2)}
    .mt-why .chev{width:14px;height:14px;stroke:var(--ink-3);stroke-width:1.8;fill:none}
    .mt-whytxt{max-height:0;overflow:hidden;transition:max-height .3s ease}
    .mt-whytxt.on{max-height:220px}
    .mt-whytxt p{font-size:12px;color:var(--ink-2);line-height:1.5;margin:10px 20px 0;padding-left:12px;border-left:2px solid var(--rose)}
  </style>`;
}

/* ============================================================
   P10 Outfit Result
   ============================================================ */
function renderOutfit(){
  const s=state.style;
  const recs=recommendBy(s.sport);
  return `
  ${headerHTML({back:true, spread:true, right:`<button class="rbtn" data-act="share">${icon('share')}</button>`})}
  <div class="screen-body scroll of-body">
    <div class="of-fig" data-av>${avatarHTML({})}</div>
    <div class="of-tags">
      <span>${s.style}</span><span>${s.color}</span><span>${s.sport}</span>
    </div>
    <div class="of-prods">
      ${recs.map(p=>`
        <button class="of-card" data-product="${p.id}">
          <span class="of-img"><img src="${p.img}" alt=""></span>
          <span class="of-nm">${p.name}</span>
          <span class="of-pr">${money(p.price)}</span>
        </button>`).join('')}
    </div>
    <div class="of-id">Movement ID · LM-${2841+state.level}</div>
  </div>
  <div class="footbar">
    <button class="btn block" data-go="dressing">View all 3 items</button>
    <button class="btn ghost block" style="margin-top:8px" data-act="saveoutfit">Save to Wardrobe</button>
  </div>
  <style>
    .of-body{padding-bottom:130px}
    .of-fig{height:400px;position:relative;display:flex;align-items:center;justify-content:center;padding-top:20px}
    .of-tags{display:flex;gap:7px;justify-content:center;flex-wrap:wrap;padding:0 20px}
    .of-tags span{font-size:11.5px;font-weight:600;padding:6px 12px;border-radius:var(--r-pill);background:var(--blush);color:var(--clay)}
    .of-prods{display:flex;gap:10px;padding:18px 20px 0}
    .of-card{flex:1;min-width:0;text-align:left}
    .of-img{width:100%;aspect-ratio:.85;background:var(--blush);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .of-img img{width:100%;height:100%;object-fit:contain}
    .of-nm{display:block;font-size:11.5px;font-weight:600;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .of-pr{display:block;font-size:11.5px;font-weight:700;color:var(--lulu-red);margin-top:1px}
    .of-id{text-align:center;font-size:11px;color:var(--ink-3);margin-top:20px;letter-spacing:.06em}
  </style>`;
}

/* ============================================================
   P11 Dressing Room —— 装扮台
   配件/服饰缩略图 = 真实商品图；点击立即穿到角色身上；
   缩略图上的「View」可进入真实购买页（价格/评价/购物车）
   ============================================================ */
const DRESS_CATS = [
  {k:'top',   l:'Top'},
  {k:'bottom',l:'Bottom'},
  {k:'outer', l:'Outerwear'},
  {k:'shoes', l:'Shoes'},
  {k:'acc',   l:'Accessories'},
  {k:'scene', l:'Scene'},
];
let drCat = 'top';

function dressItems(cat){
  if(cat === 'scene') return SCENES.map(s => ({ ...s, scene:true }));
  if(cat === 'acc') return PRODUCTS.filter(p => p.cat === 'acc');
  if(cat === 'shoes') return PRODUCTS.filter(p => p.cat === 'shoes');
  return PRODUCTS.filter(p => p.cat === cat);
}

function renderDressing(){
  const a=state.avatar;
  const sc = SCENES.find(s => s.id === a.scene) || SCENES[0];
  const scBg = { home:'#F2EDE4', yoga:'#E4EFE0', running:'#F3E2DC', tennis:'#E0EEE7', community:'#EFEAE3', global:'#E6EAF2' }[sc.id] || '#F4F1EA';
  const items = dressItems(drCat);
  const worn = CHAR_OUTFIT[a.char] || [];

  return `
  ${headerHTML({back:true, spread:true, right:`<button class="rbtn" data-act="randomize">${icon('shuffle')} Shuffle</button>`})}
  <div class="screen-body scroll dr-body">
    <div class="dr-stage" style="background:${scBg}">
      <div class="dr-scene">${sc.name}</div>
      <div class="dr-fig" data-av>${avatarHTML({})}</div>
      <div class="dr-hotrow">
        ${['top','bottom','outer','shoes','acc'].map(c=>`
          <button class="dr-hot" data-hot="${c}">
            <span class="dr-hot-ic">${icon(c==='top'?'avatar':c==='bottom'?'crop':c==='outer'?'wardrobe':c==='shoes'?'shoe':'sparkle')}</span>
            <span class="dr-hot-lb">${c==='acc'?'Accessories':c[0].toUpperCase()+c.slice(1)}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="chiprow dr-cats" id="drcats">
      ${DRESS_CATS.map(c=>`<button class="chip ${drCat===c.k?'on':''}" data-drcat="${c.k}">${c.l}</button>`).join('')}
    </div>

    <div class="dr-items" id="dritems">
      ${items.map(it=>{
        const on = it.scene ? a.scene===it.id
          : (it.cat==='acc' ? a.accessories.includes(it.id) : a.outfit[it.cat]===it.id);
        const locked = it.scene && state.level < it.lvl;
        return `<div class="dr-item ${on?'on':''} ${locked?'locked':''}">
          <button class="di-img" data-dritem="${it.id}" data-kind="${it.scene?'scene':'wear'}" data-cat="${it.cat||''}">
            ${it.scene ? icon('globe') : `<img src="${it.img}" alt="">`}
            ${locked?`<span class="di-lock">${icon('lock')}</span>`:''}
          </button>
          <span class="di-nm">${it.name}</span>
          <span class="di-meta">
            ${it.scene ? (locked?`Level ${it.lvl}`:'Unlocked') : money(it.price)}
          </span>
          ${it.scene ? '' : `<button class="di-view" data-product="${it.id}">${icon('search')} View</button>`}
        </div>`;
      }).join('')}
    </div>

    <div class="dr-colors" id="drcolors">
      ${MATCH_COLORS.map(c=>`<button class="dr-col ${a.outfitColor===c?'on':''}" data-drcolor="${c}" title="${c}"><i style="background:${colorHex(c)}"></i></button>`).join('')}
    </div>

    <div class="dr-worn">
      <div class="dr-worn-t">ON YOUR AVATAR</div>
      <div class="dr-worn-row">
        ${worn.map(id=>{
          const p = prodById(id); if(!p) return '';
          return `<button class="dr-worn-cell" data-product="${id}">
            <span class="dw-img"><img src="${p.img}" alt=""></span>
            <span class="dw-nm">${p.name.split(' ')[0]}</span>
          </button>`;
        }).join('')}
      </div>
    </div>
    <div style="height:20px"></div>
  </div>
  <div class="footbar">
    <button class="btn block" data-act="savelook">Save Look</button>
  </div>
  <style>
    .dr-body{padding-bottom:110px}
    .dr-stage{margin:12px 20px 0;height:min(52vh,420px);border-radius:var(--r-xl);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;transition:background .4s}
    .dr-scene{position:absolute;top:12px;left:14px;font-size:10px;font-weight:800;letter-spacing:.12em;color:rgba(22,21,15,.42);text-transform:uppercase;z-index:2}
    .dr-fig{position:relative;height:78%;width:100%;display:flex;align-items:flex-end;justify-content:center}
    .dr-hotrow{position:absolute;left:0;right:0;bottom:10px;display:flex;gap:6px;justify-content:center;z-index:2;flex-wrap:wrap;padding:0 10px}
    .dr-hot{display:flex;flex-direction:column;align-items:center;gap:3px;background:rgba(255,255,255,.94);border-radius:var(--r-pill);padding:6px 10px;box-shadow:0 3px 10px rgba(22,21,15,.14)}
    .dr-hot-ic svg{width:15px;height:15px;stroke:var(--ink);stroke-width:1.6;fill:none;display:block}
    .dr-hot-lb{font-size:9px;font-weight:700;color:var(--ink-2)}
    .dr-cats{margin-top:16px;padding-left:20px}
    .dr-items{display:flex;gap:11px;overflow-x:auto;padding:14px 20px 8px;scrollbar-width:none}
    .dr-items::-webkit-scrollbar{display:none}
    .dr-item{flex:none;width:82px;text-align:center}
    .di-img{width:82px;height:90px;border-radius:var(--r-md);background:var(--blush);display:flex;align-items:center;justify-content:center;overflow:hidden;border:2px solid transparent;transition:border-color .2s;position:relative;width:100%}
    .di-img img{width:100%;height:100%;object-fit:contain}
    .di-img svg{width:28px;height:28px;stroke:var(--ink-2);stroke-width:1.4;fill:none}
    .dr-item.on .di-img{border-color:var(--ink)}
    .dr-item.locked .di-img{filter:grayscale(1);opacity:.55}
    .di-nm{display:block;font-size:10.5px;font-weight:600;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .di-meta{display:block;font-size:10px;color:var(--ink-3);margin-top:1px}
    .di-view{display:inline-flex;align-items:center;gap:3px;margin-top:4px;font-size:9.5px;font-weight:700;color:var(--ink-2);background:var(--surface-2);border-radius:var(--r-pill);padding:3px 7px}
    .di-view svg{width:9px;height:9px;stroke:currentColor;stroke-width:2;fill:none}
    .di-lock{position:absolute;top:6px;right:6px;width:18px;height:18px;border-radius:50%;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center}
    .di-lock svg{width:10px;height:10px;stroke:var(--ink-2);stroke-width:1.8;fill:none}
    .dr-colors{display:flex;gap:10px;padding:6px 20px 0}
    .dr-col{width:32px;height:32px;border-radius:50%;border:2px solid var(--paper);box-shadow:0 0 0 1px var(--line);display:flex;align-items:center;justify-content:center}
    .dr-col i{width:22px;height:22px;border-radius:50%;display:block}
    .dr-col.on{box-shadow:0 0 0 2px var(--ink)}
    .dr-worn{margin:18px 20px 0;padding:13px;border-radius:var(--r-lg);background:var(--surface);border:1px solid var(--line-soft)}
    .dr-worn-t{font-size:10px;font-weight:800;letter-spacing:.1em;color:var(--ink-3);margin-bottom:9px}
    .dr-worn-row{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
    .dr-worn-row::-webkit-scrollbar{display:none}
    .dr-worn-cell{flex:none;width:62px;text-align:center}
    .dw-img{width:62px;height:62px;border-radius:var(--r-sm);background:var(--paper);display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid var(--line-soft)}
    .dw-img img{width:100%;height:100%;object-fit:contain}
    .dw-nm{display:block;font-size:9px;color:var(--ink-3);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  </style>`;
}

function colorHex(c){
  return {'Black & Rose':'#16150F','Sand':'#E3D9C4','Lilac':'#C6AEDC','Mauve':'#B98A96','Fog Blue':'#9FB8C4','Clay':'#AE4526','Cream':'#F4F0E8','Ink':'#2C2C2A'}[c]||'#ccc';
}

/* ============================================================
   P12 Avatar Editor —— 实时捏脸
   ============================================================ */
const ED_TABS = [
  {k:'body', l:'Body'},{k:'face', l:'Face'},{k:'hair', l:'Hair'},
  {k:'acc', l:'Accessories'},{k:'mood', l:'Mood'},
];
let edTab='body';

function renderEditor(){
  return `
  ${headerHTML({back:true, spread:true, right:`<button class="rbtn" data-act="resetface">Reset</button>`})}
  <div class="screen-body scroll ed-body">
    <div class="ed-fig" data-av>${avatarHTML({})}</div>

    <div class="ed-live">
      <span class="ed-live-dot"></span>
      <span>Live preview — every option updates your AI ME instantly</span>
    </div>

    <div class="ed-tabs" id="edtabs">
      ${ED_TABS.map(t=>`<button class="${edTab===t.k?'on':''}" data-edtab="${t.k}">${t.l}</button>`).join('')}
    </div>
    <div id="edpanel">${edPanel()}</div>
    <div style="height:24px"></div>
  </div>
  <div class="footbar">
    <button class="btn ghost block" data-act="randomize">Randomize</button>
    <button class="btn block" style="margin-top:8px" data-act="saveface">Save Changes</button>
  </div>
  <style>
    .ed-body{padding-bottom:150px}
    .ed-fig{height:300px;position:relative;background:var(--surface);margin:12px 20px 0;border-radius:var(--r-xl);overflow:hidden;display:flex;align-items:center;justify-content:center}
    .ed-live{display:flex;align-items:center;gap:7px;margin:9px 20px 0;font-size:10.5px;color:var(--ink-3)}
    .ed-live-dot{width:7px;height:7px;border-radius:50%;background:var(--success);animation:pulse 1.6s infinite;flex:none}
    .ed-tabs{display:flex;gap:6px;padding:14px 20px 0}
    .ed-tabs button{flex:1;height:32px;border-radius:var(--r-pill);background:var(--surface-2);font-size:12px;font-weight:600;color:var(--ink-2)}
    .ed-tabs button.on{background:var(--ink);color:#fff}
    .ed-title{font-size:11px;font-weight:800;letter-spacing:.1em;color:var(--ink-3);margin:18px 20px 9px;text-transform:uppercase}
    .ed-opts{display:flex;gap:8px;flex-wrap:wrap;padding:0 20px}
    .ed-sw{width:40px;height:40px;border-radius:50%;border:2px solid var(--paper);box-shadow:0 0 0 1px var(--line);display:inline-block}
    .ed-sw.on{box-shadow:0 0 0 2.5px var(--ink)}
    .ed-chip{padding:8px 14px;border-radius:var(--r-pill);border:1px solid var(--line);font-size:12.5px;font-weight:600;background:var(--paper)}
    .ed-chip.on{background:var(--ink);color:#fff;border-color:var(--ink)}
    .ed-moods{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;padding:0 20px}
    .ed-mood{height:70px;border-radius:var(--r-md);border:1px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;background:var(--paper)}
    .ed-mood .em{font-size:22px;line-height:1}
    .ed-mood span{font-size:10.5px;font-weight:600}
    .ed-mood.on{background:var(--ink);border-color:var(--ink);color:#fff}
    /* 配件网格：真实商品缩略图 */
    .ed-accs{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;padding:0 20px}
    .ed-acc{border-radius:var(--r-md);background:var(--paper);border:1.5px solid var(--line);padding:6px;text-align:center;position:relative}
    .ed-acc.on{border-color:var(--ink);background:var(--blush)}
    .ed-acc-img{width:100%;aspect-ratio:1;background:var(--surface);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .ed-acc-img img{width:100%;height:100%;object-fit:contain}
    .ed-acc-nm{font-size:9px;font-weight:600;margin-top:4px;line-height:1.2;height:22px;overflow:hidden}
    .ed-acc-pr{font-size:9.5px;font-weight:700;color:var(--lulu-red)}
    .ed-acc-buy{position:absolute;top:4px;right:4px;width:20px;height:20px;border-radius:50%;background:var(--ink);display:flex;align-items:center;justify-content:center}
    .ed-acc-buy svg{width:11px;height:11px;stroke:#fff;stroke-width:2;fill:none}
    .ed-note{font-size:10.5px;color:var(--ink-3);margin:10px 20px 0;line-height:1.45;display:flex;gap:6px}
    .ed-note svg{width:13px;height:13px;flex:none;stroke:var(--ink-3);stroke-width:1.6;fill:none;margin-top:1px}
  </style>`;
}

function edPanel(){
  const a=state.avatar;
  if(edTab==='body') return `
    <div class="ed-title">Body shape</div>
    <div class="ed-opts">${['slim','balanced','athletic','strong'].map(b=>`
      <button class="ed-chip ${a.body===b?'on':''}" data-body="${b}">${b[0].toUpperCase()+b.slice(1)}</button>`).join('')}</div>
    <div class="ed-title">Height</div>
    <div class="ed-opts">${[['low','Petite'],['mid','Mid'],['tall','Tall']].map(([k,l])=>`
      <button class="ed-chip ${a.height===k?'on':''}" data-height="${k}">${l}</button>`).join('')}</div>
    <div class="ed-title">Skin tone</div>
    <div class="ed-opts">${SKIN_TONES.map((c,i)=>`
      <button class="ed-sw ${a.skin===i?'on':''}" data-skin="${i}" style="background:${c}"></button>`).join('')}</div>
    <div class="ed-title">Character</div>
    <div class="ed-opts">${CHARACTERS.map(c=>`
      <button class="ed-chip ${a.char===c.id?'on':''}" data-char="${c.id}">${c.name}</button>`).join('')}</div>`;

  if(edTab==='face') return `
    <div class="ed-title">Face shape</div>
    <div class="ed-opts">${['oval','round','square'].map(f=>`
      <button class="ed-chip ${a.face===f?'on':''}" data-face="${f}">${f[0].toUpperCase()+f.slice(1)}</button>`).join('')}</div>`;

  if(edTab==='hair') return `
    <div class="ed-title">Hair color</div>
    <div class="ed-opts">${HAIR_COLORS.map((h,i)=>`
      <button class="ed-sw ${a.hairColor===i?'on':''}" data-haircol="${i}" title="${h.name}"
        style="background:rgb(${h.rgb.join(',')})"></button>`).join('')}</div>
    <div class="ed-title">Hairstyle</div>
    <div class="ed-opts">${HAIR_STYLES.map(h=>`
      <button class="ed-chip ${a.hairStyle===h.id?'on':''}" data-hairstyle="${h.id}">${h.name}</button>`).join('')}</div>
    <p class="ed-note">${icon('info')}Hair color and style update your AI ME in real time — the same character, your look.</p>`;

  if(edTab==='acc'){
    const accs = PRODUCTS.filter(p=>p.cat==='acc');
    return `
    <div class="ed-title">Accessories <span style="text-transform:none;letter-spacing:0;font-weight:500">· up to 3</span></div>
    <div class="ed-accs">
      ${accs.map(p=>`
        <div class="ed-acc ${a.accessories.includes(p.id)?'on':''}">
          <button class="ed-acc-img" data-acc="${p.id}" title="${p.name}">
            <img src="${p.img}" alt="">
          </button>
          <span class="ed-acc-nm">${p.name.split(' ').slice(-1)[0]}</span>
          <span class="ed-acc-pr">${money(p.price)}</span>
          <button class="ed-acc-buy" data-product="${p.id}" title="View product">${icon('search')}</button>
        </div>`).join('')}
    </div>
    <p class="ed-note">${icon('info')}Tap an accessory to put it on your AI ME. Tap the magnifier to open the real product page with price, reviews and bag.</p>`;
  }

  const moods = MOODS;
  return `<div class="ed-title">Mood &amp; pose</div>
  <div class="ed-moods">${moods.map(m=>`
    <button class="ed-mood ${a.mood===m.id?'on':''}" data-mood="${m.id}">
      <span class="em">${m.id==='happy'?'☺':m.id==='focus'?'◉':m.id==='tired'?'—':m.id==='calm'?'◡':m.id==='excited'?'✦':'✺'}</span>
      <span>${m.name}</span>
    </button>`).join('')}</div>
  <p class="ed-note">${icon('info')}Mood changes your expression and the way your AI ME moves — it never punishes you for missing a day.</p>`;
}

/* ============================================================
   P13 Product Detail —— 真实商品页（价格 / 评价 / 购物车）
   ============================================================ */
function renderProduct(){
  const id = currentParam || 'bra_energy';
  const p = prodById(id) || PRODUCTS[0];
  const a=state.avatar;
  const owned = state.wardrobe.owned.includes(p.id);
  const wish = state.wardrobe.wishlist.includes(p.id);
  const pairings = PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat && x.sport === p.sport).slice(0,3);
  const feats = ['Nulu™ fabric','Sweat-wicking','4-way stretch','Hidden pocket'];
  const isAcc = p.cat === 'acc';

  return `
  ${headerHTML({back:true, spread:true, right:`<button class="rbtn" data-act="wishlist" data-id="${p.id}">${icon('heart')}</button>`})}
  <div class="screen-body scroll pd-body">
    <div class="pd-img">
      <img src="${p.img}" alt="">
      ${owned?'<span class="pd-owned">'+icon('check')+' Owned</span>':''}
      ${p.badge?`<span class="pd-badge">${p.badge}</span>`:''}
    </div>
    <div class="pd-main">
      <div class="pd-row1">
        <div>
          <h1>${p.name}</h1>
          <p class="pd-sub">${p.color} · ${p.sport}</p>
        </div>
        <div class="pd-price">${money(p.price)}</div>
      </div>

      <div class="pd-rate">
        <span class="pd-stars">${'★'.repeat(Math.round(p.rating||4.7))}<i>${'★'.repeat(5-Math.round(p.rating||4.7))}</i></span>
        <b>${(p.rating||4.7).toFixed(1)}</b>
        <span>${(p.reviews||0).toLocaleString()} reviews</span>
        ${p.stock==='Low stock'?'<em>Low stock</em>':''}
      </div>

      <button class="pd-try" data-trywear="${p.id}">
        <span class="pd-try-av" data-av-mini>${miniAvatarHTML()}</span>
        <span class="pt-l"><b>See it on your AI ME</b><span>Tap to try ${p.name} on your avatar</span></span>
        ${icon('chevR','chev')}
      </button>

      <div class="pd-sec">
        <div class="pd-sec-h">Why it works</div>
        <div class="pd-feats">
          ${feats.map(f=>`<span class="feat">${icon('check')}${f}</span>`).join('')}
        </div>
      </div>

      <div class="pd-sec">
        <div class="pd-sec-h">Your fit</div>
        <div class="pd-fit">
          <span>${state.fit.fit} · ${state.fit.top} · ${state.fit.fabric}</span>
          <button data-go="wizard">Update</button>
        </div>
        <p class="pd-note">Based on your Fit Profile. Lululemon AI ME does not predict size — it remembers your preference.</p>
      </div>

      <div class="pd-sec">
        <div class="pd-sec-h">Also available in</div>
        <div class="pd-colors">
          ${MATCH_COLORS.slice(0,6).map(c=>`<span class="pd-col"><i style="background:${colorHex(c)}"></i></span>`).join('')}
        </div>
      </div>

      <div class="pd-sec">
        <div class="pd-sec-h">${isAcc?'Complete the look':'Pair with'}</div>
        <div class="pd-pair">
          ${(pairings.length?pairings:PRODUCTS.filter(x=>x.id!==p.id).slice(0,3)).map(x=>`
            <button class="pd-pair-c" data-product="${x.id}">
              <span class="pp-img"><img src="${x.img}" alt=""></span>
              <span class="pp-nm">${x.name}</span>
              <span class="pp-pr">${money(x.price)}</span>
            </button>`).join('')}
        </div>
      </div>

      <div class="pd-sec">
        <div class="pd-sec-h">Reviews</div>
        <div class="pd-rev">
          <div class="pd-rev-h"><b>${(p.rating||4.7).toFixed(1)}</b><span>${'★'.repeat(Math.round(p.rating||4.7))}</span><span>Based on ${(p.reviews||0).toLocaleString()} verified reviews</span></div>
          ${[['Kept its shape after 20 washes',5,'Jess'],['Exactly the fit I wanted',5,'Ryan'],['Softer than I expected',4,'Mika']].map(r=>`
            <div class="pd-rev-i">
              <span class="pd-rev-s">${'★'.repeat(r[1])}</span>
              <b>${r[0]}</b>
              <span class="pd-rev-a">${r[2]} · Verified buyer</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
  <div class="footbar pd-foot">
    <button class="btn grow" id="pdbag">${owned?'Buy again':'Add to Bag'}</button>
    <button class="bag-btn" data-go="wardrobe">${icon('wardrobe')}<i>${state.bag.length}</i></button>
  </div>
  <style>
    .pd-body{padding-bottom:100px}
    .pd-img{aspect-ratio:1;background:var(--blush);display:flex;align-items:center;justify-content:center;position:relative}
    .pd-img img{width:78%;height:78%;object-fit:contain}
    .pd-owned{position:absolute;top:12px;left:12px;height:26px;padding:0 11px;border-radius:var(--r-pill);background:var(--success);color:#fff;font-size:11.5px;font-weight:700;display:flex;align-items:center;gap:4px}
    .pd-owned svg{width:12px;height:12px;stroke:#fff;stroke-width:2.4;fill:none}
    .pd-badge{position:absolute;top:12px;right:12px;height:26px;padding:0 11px;border-radius:var(--r-pill);background:var(--ink);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center}
    .pd-main{padding:16px 20px 0}
    .pd-row1{display:flex;align-items:flex-start;gap:12px}
    .pd-row1 h1{font-size:20px;font-weight:800;letter-spacing:-.02em}
    .pd-sub{font-size:12.5px;color:var(--ink-3);margin-top:3px}
    .pd-price{margin-left:auto;font-size:20px;font-weight:800;color:var(--lulu-red)}
    .pd-rate{display:flex;align-items:center;gap:8px;margin-top:9px;font-size:12px;color:var(--ink-3)}
    .pd-stars{color:var(--gold);letter-spacing:1px}
    .pd-stars i{color:var(--line);font-style:normal}
    .pd-rate b{color:var(--ink);font-size:13px}
    .pd-rate em{font-style:normal;color:var(--lulu-red);font-weight:700;font-size:11px}
    .pd-try{display:flex;align-items:center;gap:11px;width:100%;margin-top:16px;padding:10px 13px;border-radius:var(--r-md);border:1px solid var(--line);background:var(--surface);text-align:left}
    .pd-try-av{width:44px;height:44px;border-radius:50%;overflow:hidden;background:var(--paper);flex:none;display:block}
    .pd-try-av .av{width:100%;height:100%}
    .pd-try .pt-l{flex:1;min-width:0;display:flex;flex-direction:column}
    .pd-try .pt-l b{font-size:13px;font-weight:700}
    .pd-try .pt-l span{font-size:11px;color:var(--ink-3)}
    .pd-try .chev{width:16px;height:16px;flex:none;stroke:var(--ink-3);stroke-width:1.8;fill:none}
    .pd-sec{margin-top:22px}
    .pd-sec-h{font-size:11px;font-weight:800;letter-spacing:.1em;color:var(--ink-3);text-transform:uppercase;margin-bottom:10px}
    .pd-feats{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .feat{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--ink-2)}
    .feat svg{width:14px;height:14px;stroke:var(--success);stroke-width:2.2;fill:none;flex:none}
    .pd-fit{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600}
    .pd-fit button{margin-left:auto;font-size:12.5px;font-weight:700;color:var(--ink);text-decoration:underline}
    .pd-note{font-size:11px;color:var(--ink-3);margin-top:6px;line-height:1.45}
    .pd-colors{display:flex;gap:9px}
    .pd-col{width:30px;height:30px;border-radius:50%;border:2px solid var(--paper);box-shadow:0 0 0 1px var(--line);display:flex;align-items:center;justify-content:center}
    .pd-col i{width:20px;height:20px;border-radius:50%;display:block}
    .pd-pair{display:flex;gap:10px}
    .pd-pair-c{flex:1;min-width:0;text-align:left}
    .pp-img{width:100%;aspect-ratio:.85;background:var(--blush);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .pp-img img{width:100%;height:100%;object-fit:contain}
    .pp-nm{display:block;font-size:11.5px;font-weight:600;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .pp-pr{display:block;font-size:11.5px;font-weight:700;color:var(--lulu-red)}
    .pd-rev{border:1px solid var(--line);border-radius:var(--r-lg);padding:13px}
    .pd-rev-h{display:flex;align-items:center;gap:9px;padding-bottom:10px;border-bottom:1px solid var(--line-soft);margin-bottom:4px}
    .pd-rev-h b{font-size:22px;font-weight:800}
    .pd-rev-h span:nth-child(2){color:var(--gold);letter-spacing:1px}
    .pd-rev-h span:last-child{font-size:11.5px;color:var(--ink-3)}
    .pd-rev-i{padding:9px 0;border-bottom:1px solid var(--line-soft);display:flex;flex-direction:column;gap:3px}
    .pd-rev-i:last-child{border-bottom:none}
    .pd-rev-s{color:var(--gold);font-size:11px;letter-spacing:1px}
    .pd-rev-i b{font-size:12.5px;font-weight:600}
    .pd-rev-a{font-size:11px;color:var(--ink-3)}
    .pd-foot{display:flex;gap:10px;align-items:center}
    .bag-btn{width:52px;height:50px;border-radius:var(--r-md);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;position:relative;flex:none}
    .bag-btn svg{width:21px;height:21px;stroke:var(--ink);stroke-width:1.5;fill:none}
    .bag-btn i{position:absolute;top:-6px;right:-6px;width:19px;height:19px;border-radius:50%;background:var(--lulu-red);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;font-style:normal}
  </style>`;
}

/* 商品页顶部的小头像 */
function miniAvatarHTML(){
  const a = state.avatar;
  const ch = CHARACTERS.find(c => c.id === a.char) || CHARACTERS[0];
  return `<img src="${ch.img}" alt="">`;
}
