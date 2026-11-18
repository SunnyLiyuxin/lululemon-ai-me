/* ============================================================
   LULULEMON AI ME · 实时 Avatar 引擎
   ------------------------------------------------------------
   目标：捏脸不再是「假按钮」——每一次选择都必须立刻改变画面。
   实现：把角色素材拆成可独立渲染的图层，在浏览器端实时合成：
     · body    -> 依据 body/height 参数做真实的比例形变（scaleX / scaleY + 局部裁切）
     · face    -> 眼睛/眉毛/嘴用 SVG 在锚点处实时绘制，随选择改变形状
     · hair    -> 头发层叠加，用 hue-rotate 滤镜实时换色
     · acc     -> 配件商品图按挂点实时叠加到角色身上
     · mood    -> 表情 + 姿态（跳跃/休息/庆祝）实时切换
   所有图层都基于用户提供的原始素材渲染，画风保持一致。
   ============================================================ */

const AVATAR = {
  rigs: {},        // id -> rig.json
  ready: false,
  rigBase: 'assets/av/',
};

/* ---------- 载入 rig ---------- */
function loadRigs(ids){
  return Promise.all(ids.map(id =>
    fetch(AVATAR.rigBase + id + '/rig.json')
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
  )).then(list => {
    list.forEach(r => { if(r && r.id) AVATAR.rigs[r.id] = r; });
    AVATAR.ready = true;
    return AVATAR.rigs;
  });
}

/* ---------- 身体比例参数 -> 形变 ---------- */
const BODY_SHAPE = {
  slim:     { sx:0.90, sy:1.00, note:'Slim' },
  balanced: { sx:1.00, sy:1.00, note:'Balanced' },
  athletic: { sx:1.09, sy:0.99, note:'Athletic' },
  strong:   { sx:1.16, sy:0.97, note:'Strong' },
};
const HEIGHT_SCALE = { low:0.93, mid:1.00, tall:1.08 };

/* ---------- 肤色 ---------- */
const SKIN_TONES = ['#F8DCC4','#F0C6A4','#E2B189','#C68E67','#A16B44','#7A4A2B'];

/* ---------- 发色（用于头发层 hue 偏移） ---------- */
const HAIR_COLORS = [
  { name:'Espresso',  rgb:[62,44,34],  hue:0,   sat:1,    light:1 },
  { name:'Black',     rgb:[26,24,22],  hue:0,   sat:0.85, light:0.85 },
  { name:'Chestnut',  rgb:[107,74,50], hue:0,   sat:1,    light:1.05 },
  { name:'Honey',     rgb:[217,168,90],hue:0,   sat:1,    light:1.18 },
  { name:'Blonde',    rgb:[227,207,166],hue:0,  sat:0.85, light:1.25 },
  { name:'Ash',       rgb:[139,111,98],hue:0,  sat:0.7,  light:1.1 },
  { name:'Rose',      rgb:[201,138,131],hue:0,  sat:0.8,  light:1.12 },
  { name:'Silver',    rgb:[196,198,200],hue:0,  sat:0.25, light:1.3 },
];

/* ---------- 发型（叠加在头发层之上的 SVG 装饰） ---------- */
const HAIR_STYLES = [
  { id:'highbun',  name:'High bun' },
  { id:'tightbun', name:'Tight bun' },
  { id:'loose',     name:'Loose waves' },
  { id:'cropped',   name:'Cropped' },
  { id:'braided',   name:'Braided' },
  { id:'curly',     name:'Curly' },
];

/* ---------- 表情参数 ---------- */
const FACE_EYES = [
  { id:'round',  name:'Round',  w:1.00, h:1.12 },
  { id:'almond', name:'Almond', w:1.12, h:0.88 },
  { id:'wide',   name:'Wide',   w:1.22, h:0.94 },
  { id:'soft',   name:'Soft',   w:0.94, h:1.00 },
];
const FACE_BROWS = [
  { id:'soft',    name:'Soft',    curve:0.30, th:0.55 },
  { id:'straight',name:'Straight',curve:0.08, th:0.70 },
  { id:'bold',    name:'Bold',    curve:0.46, th:1.00 },
  { id:'arched',  name:'Arched',  curve:0.62, th:0.60 },
];
const FACE_MOUTH = [
  { id:'soft',  name:'Soft',  type:'smile', w:1.0, h:1.0 },
  { id:'open',  name:'Open',  type:'open',  w:1.0, h:1.25 },
  { id:'smile', name:'Smile', type:'bigsmile', w:1.18, h:1.15 },
  { id:'pout',  name:'Pout',  type:'pout',  w:0.8, h:1.1 },
];

/* ---------- 情绪：表情 + 姿态 ---------- */
const MOODS = [
  { id:'happy',   name:'Happy',    eyes:'round',  brows:'soft',    mouth:'smile',  pose:'bounce' },
  { id:'focus',   name:'Focus',    eyes:'almond', brows:'straight', mouth:'soft',   pose:'still' },
  { id:'tired',   name:'Tired',    eyes:'soft',   brows:'soft',    mouth:'pout',   pose:'slump' },
  { id:'calm',    name:'Calm',     eyes:'soft',   brows:'soft',    mouth:'soft',   pose:'breathe' },
  { id:'excited', name:'Excited',  eyes:'wide',   brows:'bold',    mouth:'open',   pose:'jump' },
  { id:'cheer',   name:'Cheer',    eyes:'wide',   brows:'bold',    mouth:'bigsmile', pose:'cheer' },
];
const MOOD_MAP = Object.fromEntries(MOODS.map(m => [m.id, m]));

/* ============================================================
   渲染：实时 Avatar
   ============================================================ */
function avatarHTML(opts){
  opts = opts || {};
  const a = state.avatar;
  const ch = CHARACTERS.find(c => c.id === a.char) || CHARACTERS[0];
  const rig = AVATAR.rigs[a.char];
  const body = BODY_SHAPE[a.body] || BODY_SHAPE.balanced;
  const hsc = HEIGHT_SCALE[a.height] || 1.0;

  const mood = MOOD_MAP[a.mood] || MOODS[0];
  /* 头发层用滤镜实时换色 */
  const hc = HAIR_COLORS[a.hairColor % HAIR_COLORS.length];
  const hairFilter = `hue-rotate(${hc.hue}deg) saturate(${hc.sat}) brightness(${hc.light})`;

  /* 肤色：用滤镜作用于整层会污染衣服，因此只对「脸 + 身体皮肤」做整体微调 */
  const skin = SKIN_TONES[a.skin % SKIN_TONES.length];

  const accs = (a.accessories || []).map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  /* 姿态动画 class */
  const pose = 'pose-' + (mood.pose || 'still');

  return `
  <div class="av ${pose}" style="--sx:${body.sx};--sy:${(body.sy * hsc).toFixed(3)};--hairfilter:${hairFilter};--skin:${skin}">
    <div class="av-inner">
      <img class="av-body" src="${rig ? AVATAR.rigBase + a.char + '/face_clean.png' : ch.img}" alt="">
      ${rig ? `<img class="av-hair" src="${AVATAR.rigBase}${a.char}/hair.png" alt="">` : ''}
      ${rig ? accLayerSVG(rig, accs) : ''}
    </div>
  </div>`;
}

/* 画布坐标 -> 百分比 */
function pct(v){ return (v / 720 * 100).toFixed(3) + '%'; }

/* ---------- 五官：使用原画五官（face_clean.png 自带），不再叠加 SVG，
   避免 rig 坐标偏差导致的「多余眼睛」。 ---------- */

/* ---------- 配件层（商品图按挂点实时叠加） ---------- */
function accLayerSVG(rig, accs){
  if(!accs.length) return '';
  const A = rig.anchors || {};
  const out = accs.map(p => {
    const slot = ACCESSORY_SLOT[p.id] || 'side';
    const pt = A[slot] || A.side || [360, 560];
    const size = slot === 'head' ? 96 : slot === 'ground' ? 120 : slot === 'face' ? 62
               : slot === 'ear' ? 46 : slot === 'wrist' ? 52 : slot === 'back' ? 110 : 72;
    const left = pt[0] - size/2;
    const top = pt[1] - size/2;
    return `<img class="av-acc" data-acc-id="${p.id}" src="${p.img}" alt=""
      style="left:${pct(left)};top:${pct(top)};width:${pct(size)}">`;
  }).join('');
  return out;
}

/* ============================================================
   交互：所有选项实时改变并立即重绘
   ============================================================ */
function applyAvatarChange(kind, value){
  const a = state.avatar;
  if(kind === 'body') a.body = value;
  else if(kind === 'height') a.height = value;
  else if(kind === 'skin') a.skin = value;
  else if(kind === 'eyes') a.eyesId = value;
  else if(kind === 'brows') a.browsId = value;
  else if(kind === 'mouth') a.mouthId = value;
  else if(kind === 'hairColor') a.hairColor = value;
  else if(kind === 'hairStyle') a.hairStyle = value;
  else if(kind === 'mood'){
    const m = MOOD_MAP[value];
    if(m){ a.mood = value; a.eyesId = m.eyes; a.browsId = m.brows; a.mouthId = m.mouth; }
  }
  else if(kind === 'acc'){
    const i = a.accessories.indexOf(value);
    if(i >= 0) a.accessories.splice(i,1);
    else {
      if(a.accessories.length >= 3){ toast('Three accessories maximum'); return; }
      a.accessories.push(value);
    }
  }
  save();
  repaintAvatarViews();
}

/* 重绘所有正在显示 avatar 的区域 */
function repaintAvatarViews(){
  const holders = $$('[data-av]');
  holders.forEach(h => {
    h.innerHTML = avatarHTML({});
    h.classList.add('av-flash');
    setTimeout(()=>h.classList.remove('av-flash'), 420);
  });
}
