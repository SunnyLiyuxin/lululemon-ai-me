/* ============================================================
   LULULEMON AI ME · Data + State Store
   ============================================================ */

const LS_KEY = 'lulu_ai_me_v1';

/* 商品目录与角色库见 catalog.js（真实 lululemon 商品锚点） */

/* ---------- 运动项目 ---------- */
const SPORTS = [
  { id:'yoga',    name:'Yoga',    icon:'yoga' },
  { id:'running', name:'Running', icon:'running' },
  { id:'tennis',  name:'Tennis',  icon:'tennis' },
  { id:'training',name:'Training',icon:'training' },
  { id:'hiking',  name:'Hiking',  icon:'hiking' },
  { id:'boxing',  name:'Boxing',  icon:'boxing' },
];

/* ---------- 圈子 ---------- */
const CIRCLES = [
  { id:'tennis',  name:'Tennis Circle',  members:'12,801', icon:'tennis',  color:'#8FBF3F', desc:'Rally, serve, repeat. Court time with people who love it.' },
  { id:'running',name:'Running Circle', members:'38,500',  icon:'running', color:'#B5573F', desc:'Miles together are lighter than miles alone.' },
  { id:'pilates', name:'Pilates Circle', members:'18,200',  icon:'pilates', color:'#9B7BB8', desc:'Core control, better breathing, stronger everyday.' },
  { id:'outdoor', name:'Outdoor Circle', members:'24,100',  icon:'hiking',  color:'#5B8C6E', desc:'Trails, summits and slow mornings outside.' },
  { id:'train',   name:'Training Circle',members:'31,400',  icon:'training',color:'#AE4526', desc:'Strength, sweat, repeat. Show up strong.' },
];

/* ---------- 场景（随等级解锁） ---------- */
const SCENES = [
  { id:'home',      name:'Home Studio',       lvl:1 },
  { id:'yoga',      name:'Yoga Garden',       lvl:2 },
  { id:'running',   name:'Running Park',      lvl:3 },
  { id:'tennis',    name:'Tennis Court',      lvl:4 },
  { id:'community', name:'Community Studio',  lvl:6 },
  { id:'global',    name:'Global Movement',   lvl:8 },
];

/* ---------- 徽章 ---------- */
const BADGES = [
  { id:'b_first',  name:'First Move',    icon:'running',  color:'#E8C4C0', how:'Complete your first movement' },
  { id:'b_clinic', name:'First Clinic',  icon:'badge',    color:'#9FE1CB', how:'Check in at an offline event' },
  { id:'b_tennis', name:'Tennis Soul',   icon:'tennis',   color:'#FAEEDA', how:'Unlock the Tennis Court scene' },
  { id:'b_mate',   name:'Move Mate',     icon:'friends',  color:'#E6F1FB', how:'Complete a duo mission' },
  { id:'b_buyer',  name:'Real Thing',    icon:'store',    color:'#F1EFE8', how:'Buy a first lululemon piece' },
  { id:'b_garden', name:'Garden Grower', icon:'leaf',     color:'#EAF3DE', how:'Plant 10 community seeds' },
  { id:'b_5k',     name:'5K Runner',     icon:'fire',     color:'#FAECE7', how:'Finish the 5K challenge' },
  { id:'b_fig',    name:'Figure Holder', icon:'gift',     color:'#EEEDFE', how:'Bind your movement figure' },
];

/* ---------- 挑战 ---------- */
const CHALLENGES = [
  { id:'c_tennis5k', name:'Tennis 5K Club',    sport:'tennis',   color:'#8FBF3F', desc:'Five tennis sessions this month.',      ends:'Ends Nov 24', people:'2,481', type:'circle' },
  { id:'c_run10k',   name:'10K in November',   sport:'running',  color:'#B5573F', desc:'Complete a 10K run before month end.',     ends:'Ends Nov 30', people:'8,902', type:'foryou' },
  { id:'c_garden',   name:'Community Garden',  sport:'training', color:'#5B8C6E', desc:'Grow the community garden together.',     ends:'Ends Dec 08', people:'31,204', type:'community' },
  { id:'c_yoga7',    name:'7 Days of Yoga',    sport:'yoga',     color:'#9B7BB8', desc:'Seven consecutive yoga sessions.',        ends:'Ends Nov 22', people:'5,117', type:'foryou' },
  { id:'c_duo',      name:'Duo Mission',       sport:'tennis',   color:'#AE4526', desc:'Move three times with your Move Mate.',   ends:'Ends Nov 28', people:'1,344', type:'circle' },
];

/* ---------- 线下活动 ---------- */
const EVENTS = [
  { id:'e_tennis', name:'lululemon Tennis Meetup', sport:'tennis',  icon:'tennis',  date:'Sat, Nov 16', time:'10:00–12:00', venue:'Shenzhen Tennis Club',   dist:'2.4 km', host:'Ambassador · Sara Chen', color:'#8FBF3F', joined:38, cap:50 },
  { id:'e_yoga',   name:'Sunrise Yoga Session',   sport:'yoga',    icon:'yoga',    date:'Sun, Nov 17', time:'07:30–08:30', venue:'lululemon Shenzhen Bay',  dist:'1.1 km', host:'Ambassador · Mia Lin',   color:'#9B7BB8', joined:22, cap:30 },
  { id:'e_run',    name:'Running Club 10K',        sport:'running', icon:'running', date:'Sun, Nov 17', time:'08:00–10:00', venue:'Shenzhen Bay Park',       dist:'3.6 km', host:'Ambassador · Noah Li',  color:'#B5573F', joined:45, cap:60 },
  { id:'e_pilates',name:'Pilates for Everyone',    sport:'pilates', icon:'pilates', date:'Tue, Nov 19', time:'19:00–20:00', venue:'lululemon One Avenue',  dist:'4.2 km', host:'Ambassador · Lily Zhou',color:'#C6AEDC', joined:18, cap:24 },
];

/* 广场用户数据见 catalog.js */

/* FRIENDS / PARK_USERS 见 catalog.js（唯一数据源） */

/* ============================================================
   Store
   ============================================================ */
const DEFAULT_STATE = {
  created:false,
  avatar:{
    char:'ch_yoga',
    body:'balanced', height:'mid',
    skin:1, hairColor:0, hairStyle:'highbun',
    face:'oval',
    eyesId:'round', browsId:'soft', mouthId:'smile',
    accessories:[],
    mood:'happy',
    outfit:{ top:'bra_align', bottom:'leg_mauve', outer:'', shoes:'sock_white', acc:[] },
    outfitColor:'Black & Rose',
  },
  style:{ style:'Minimalist', color:'Black & Rose', sport:'Boxing' },
  movement:{ sports:['boxing'], exp:'Beginner', goal:'Feel confident', scene:'Studio' },
  fit:{ top:'M', bottom:'M', fit:'Fitted', fabric:'Nulu™' },
  lifestyle:{ style:'solo', freq:'3-4', motive:'feel good' },
  circles:['tennis'],
  visibility:'circle',
  allowRequests:true,
  showLocation:false,

  wardrobe:{ owned:['bra_align','leg_mauve'], wishlist:['jkt_define'], unlocked:[] },
  bag:[],
  journey:{ yoga:true, tennis:false, running:false, hiking:false, boxing:false },
  coins:640,
  level:5,
  badges:['b_first'],
  scene:'tennis',
  joinedChallenges:[],
  signedUp:[],
  checkedIn:[],
  mates:[],
  pendingInvites:[],
  seeds:34,
  figures:[],
  boundFigure:false,
  lastVisit:'',
  planStreak:3,
};

let state = load();

function load(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(raw){
      const s = JSON.parse(raw);
      return deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), s);
    }
  }catch(e){}
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
function deepMerge(base, over){
  for(const k in over){
    if(over[k] && typeof over[k]==='object' && !Array.isArray(over[k]) && base[k] && typeof base[k]==='object' && !Array.isArray(base[k])){
      deepMerge(base[k], over[k]);
    } else if(over[k] !== undefined){
      base[k] = over[k];
    }
  }
  return base;
}
function save(){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(state)); }catch(e){}
}
function resetAll(){
  state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  save();
}

/* ---------- 派生计算 ---------- */
const levelNeed = () => 400 + state.level * 120;
const levelProg = () => Math.min(1, state.coins / levelNeed());
const ownedProducts = () => state.wardrobe.owned.map(id => PRODUCTS.find(p=>p.id===id)).filter(Boolean);
const chById = id => CHARACTERS.find(c=>c.id===id);
const prodById = id => PRODUCTS.find(p=>p.id===id);
const isUnlocked = sceneId => { const s = SCENES.find(x=>x.id===sceneId); return s ? state.level >= s.lvl : false; };

function grantCoins(n, why){
  state.coins += n;
  const need = levelNeed();
  while(state.coins >= need){
    state.coins -= need;
    state.level += 1;
  }
  save();
}
function unlockSceneIfAny(id){
  const sc = SCENES.find(s=>s.id===id);
  if(sc && state.level >= sc.lvl && !state.journey[id]){
    state.journey[id] = true;
    save();
    return sc;
  }
  return null;
}
