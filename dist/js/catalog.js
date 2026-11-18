/* ============================================================
   LULULEMON AI ME · 商品目录（真实 lululemon 商品锚点）
   ------------------------------------------------------------
   每一件都对应真实品类与真实配色，并绑定可点击进入商品详情页。
   img 优先指向用户参考图的截屏快照（assets/img/ref_*.png，
   由 tools/crop_ref.py 从参考图裁剪，非生成图）。
   ============================================================ */

const PRODUCTS = [
  /* ---------- 上装 ---------- */
  { id:'bra_energy',   name:'Energy Bra',        cat:'top',    price:68,  img:'assets/img/ref_bra_energy.png',   color:'Black & Rose', sport:'Boxing',   stock:'Low stock', rating:4.8, reviews:2143, badge:'Best Seller' },
  { id:'bra_align',    name:'Align Bra',         cat:'top',    price:68,  img:'assets/img/prod_bra_blue.png',     color:'Fog Blue',     sport:'Yoga',     stock:'In stock',  rating:4.9, reviews:5612, badge:'Most Loved' },
  { id:'bra_cloud',    name:'Cloud Bra',         cat:'top',    price:78,  img:'assets/img/prod_bra_rose.png',     color:'Mauve',       sport:'Yoga',     stock:'In stock',  rating:4.7, reviews:3320 },
  { id:'tank_sport',   name:'All Mesh Tank',     cat:'top',    price:58,  img:'assets/img/ref_tank_blue.png',    color:'Black',       sport:'Training', stock:'In stock',  rating:4.6, reviews:1180 },
  { id:'top_swift',    name:'Swiftwick Half Zip',cat:'top',    price:98,  img:'assets/img/ref_hoodie_beige.png',  color:'Oat',         sport:'Running',  stock:'In stock',  rating:4.7, reviews:2265, badge:'New' },
  { id:'jkt_define',   name:'Define Jacket',     cat:'outer',  price:128, img:'assets/img/ref_jkt_define.png',   color:'Blush',       sport:'Training', stock:'In stock',  rating:4.9, reviews:4417, badge:'Icon' },
  { id:'jkt_zip',      name:'Zip Jacket',        cat:'outer',  price:118, img:'assets/img/ref_jkt_pink.png',     color:'Rose',        sport:'Training', stock:'In stock',  rating:4.5, reviews:980 },
  { id:'jkt_wander',   name:'Wander Fleece',     cat:'outer',  price:148, img:'assets/img/ref_fleece_lilac.png', color:'Lilac',       sport:'Hiking',   stock:'In stock',  rating:4.8, reviews:1730 },
  { id:'hoodie_black', name:'Hooded Zip Jacket', cat:'outer',  price:138, img:'assets/img/prod_hoodie.png',      color:'Black',       sport:'Training', stock:'In stock',  rating:4.9, reviews:3877 },
  { id:'hoodie_blush', name:'Cloud Fleece Hoodie',cat:'outer', price:148, img:'assets/img/prod_hoodie_blush.png', color:'Blush',       sport:'Training', stock:'In stock',  rating:4.8, reviews:1420 },

  /* ---------- 下装 ---------- */
  { id:'leg_align',    name:'Align Legging',     cat:'bottom', price:118, img:'assets/img/ref_leg_align.png',      color:'Black',    sport:'Yoga',     stock:'In stock',  rating:4.9, reviews:8214, badge:'Best Seller' },
  { id:'leg_mauve',    name:'Align Legging',     cat:'bottom', price:118, img:'assets/img/prod_legging_mauve.png',color:'Mauve',    sport:'Yoga',     stock:'In stock',  rating:4.9, reviews:2940 },
  { id:'leg_blue',     name:'Gathered Legging',  cat:'bottom', price:108, img:'assets/img/prod_legging_blue.png', color:'Fog Blue',  sport:'Yoga',     stock:'In stock',  rating:4.7, reviews:1650 },
  { id:'leg_classic',  name:'Classic Legging',   cat:'bottom', price:118, img:'assets/img/ref_leg_align.png',      color:'Black',    sport:'Training', stock:'In stock',  rating:4.8, reviews:6105 },
  { id:'short_swim',   name:'Court Short',       cat:'bottom', price:78,  img:'assets/img/prod_short.png',         color:'Cream',    sport:'Tennis',   stock:'In stock',  rating:4.7, reviews:2410 },
  { id:'short_bike',   name:'5" Bike Short',     cat:'bottom', price:68,  img:'assets/img/ref_legging_black.png',  color:'Black',    sport:'Cycling',  stock:'In stock',  rating:4.9, reviews:5230 },
  { id:'short_run',    name:'Run Short 5"',      cat:'bottom', price:68,  img:'assets/img/prod_short_black.png',   color:'Black',    sport:'Running',  stock:'In stock',  rating:4.8, reviews:2980 },
  { id:'pant_grey',    name:'Relaxed Pant',      cat:'bottom', price:98,  img:'assets/img/prod_pant_grey.png',      color:'Grey',     sport:'Hiking',   stock:'In stock',  rating:4.6, reviews:1190 },

  /* ---------- 鞋袜 ---------- */
  { id:'shoe_trail',   name:'Trail Runner',      cat:'shoes',  price:148, img:'assets/img/prod_shoe_white.png',   color:'Cream',    sport:'Hiking',   stock:'In stock',  rating:4.7, reviews:3320 },
  { id:'shoe_run',     name:'Cityrun 2',         cat:'shoes',  price:138, img:'assets/img/prod_shoe_black.png',   color:'Black',    sport:'Running',  stock:'In stock',  rating:4.6, reviews:2740 },
  { id:'shoe_knit',    name:'Knit Runner',       cat:'shoes',  price:128, img:'assets/img/prod_shoe_white.png',   color:'Cream',    sport:'Training', stock:'In stock',  rating:4.8, reviews:1890 },
  { id:'sock_white',   name:'Everywhere Rib Sock',cat:'shoes', price:18,  img:'assets/img/prod_sock_white.png',    color:'Cream',    sport:'Training', stock:'In stock',  rating:4.8, reviews:4120 },
  { id:'sock_black',   name:'Everywhere Rib Sock',cat:'shoes', price:18,  img:'assets/img/prod_sock_black.png',    color:'Black',    sport:'Training', stock:'In stock',  rating:4.7, reviews:2260 },

  /* ---------- 配件（全部带官方 Ω 标志，可进入商品页购买） ---------- */
  { id:'beanie_lilac', name:'A Sense of Wonder Beanie', cat:'acc', price:48, img:'assets/img/prod_beanie_lilac.png', color:'Lilac',     sport:'Hiking',   stock:'In stock',  rating:4.8, reviews:940 },
  { id:'headband_black',name:'A Sense of Wonder Headband',cat:'acc',price:38,img:'assets/img/prod_headband_black.png',color:'Black',  sport:'Training', stock:'In stock',  rating:4.7, reviews:1610, badge:'Bestseller' },
  { id:'headband_pink',name:'A Sense of Wonder Headband',cat:'acc',price:38,img:'assets/img/prod_headband_pink.png', color:'Blush',   sport:'Training', stock:'In stock',  rating:4.7, reviews:1320 },
  { id:'cap_black',    name:'A Sense of Wonder Cap', cat:'acc', price:48, img:'assets/img/prod_cap_black.png',    color:'Black',     sport:'Running',  stock:'In stock',  rating:4.6, reviews:870 },
  { id:'bottle_white', name:'Classic Water Bottle 24oz', cat:'acc', price:38, img:'assets/img/prod_bottle_white.png', color:'White', sport:'Training', stock:'In stock', rating:4.8, reviews:2140 },
  { id:'bottle_rose',  name:'Classic Water Bottle 24oz', cat:'acc', price:38, img:'assets/img/prod_bottle_rose.png',  color:'Blush',  sport:'Yoga',     stock:'In stock',  rating:4.8, reviews:1730 },
  { id:'earbud_white', name:'Wireless Earbuds',  cat:'acc',     price:149, img:'assets/img/prod_earbuds_white.png',color:'White',     sport:'Training', stock:'Low stock', rating:4.5, reviews:640 },
  { id:'pack_lilac',   name:'Everywhere Backpack',cat:'acc',    price:128, img:'assets/img/prod_pack_lilac.png',  color:'Lilac',     sport:'Hiking',   stock:'In stock',  rating:4.9, reviews:1890 },
  { id:'mat_rose',     name:'Mat 5mm',           cat:'acc',     price:88,  img:'assets/img/prod_mat_rose.png',     color:'Blush',     sport:'Yoga',     stock:'In stock',  rating:4.8, reviews:1520 },
  { id:'glove_pink',   name:'Boxing Gloves',     cat:'acc',     price:68,  img:'assets/img/prod_glove_pink.png',   color:'Blush',     sport:'Boxing',   stock:'In stock',  rating:4.7, reviews:760 },
  { id:'glasses_black',name:'Sun Glasses',       cat:'acc',     price:98,  img:'assets/img/prod_glasses.png',     color:'Black',     sport:'Outdoor',  stock:'In stock',  rating:4.4, reviews:420 },
  { id:'watch_black',  name:'Sport Watch',       cat:'acc',     price:249, img:'assets/img/prod_watch.png',      color:'Black',     sport:'Training', stock:'In stock',  rating:4.5, reviews:980 },
];

/* 配件在角色身上出现的挂点类型 */
const ACCESSORY_SLOT = {
  beanie_lilac:'head', headband_black:'head', headband_pink:'head', cap_black:'head',
  glasses_black:'face', earbud_white:'ear', watch_black:'wrist',
  bottle_white:'side', bottle_rose:'side', pack_lilac:'back',
  mat_rose:'ground', glove_pink:'hand'
};

/* ---------- 角色库（用户提供的 5 个素材） ---------- */
const CHARACTERS = [
  { id:'ch_yoga',    name:'Mia',    img:'assets/av/ch_yoga/body.png',    tone:'#9FB8C4', sport:'Yoga',    default:true,
    desc:'Align Bra · Align Legging · Headband · Water Bottle' },
  { id:'ch_hiker',   name:'Lily',   img:'assets/av/ch_hiker/body.png',   tone:'#C6AEDC', sport:'Hiking',
    desc:'Wander Fleece · Relaxed Pant · Beanie · Backpack' },
  { id:'ch_runner',  name:'Noah',   img:'assets/av/ch_runner/body.png',  tone:'#D9C7A8', sport:'Running',
    desc:'Swiftwick Half Zip · Run Short · Cityrun 2 · Earbuds' },
  { id:'ch_cyclist', name:'Kai',    img:'assets/av/ch_cyclist/body.png', tone:'#B9A99B', sport:'Training',
    desc:'Hooded Zip Jacket · 5" Bike Short · Trail Runner · Headband · Bottle' },
  { id:'ch_boxer',   name:'Ava',    img:'assets/av/ch_boxer/body.png',   tone:'#E8C4C0', sport:'Boxing',
    desc:'Energy Bra · Classic Legging · Boxing Gloves · Headband' },
];

/* 每个角色「真实穿着的产品」—— 依据用户参考图逐一识别 */
const CHAR_OUTFIT = {
  ch_yoga:    ['bra_align','leg_mauve','sock_white','headband_pink','bottle_rose','mat_rose'],
  ch_hiker:   ['jkt_wander','pant_grey','shoe_trail','beanie_lilac','pack_lilac'],
  ch_runner:  ['top_swift','short_run','shoe_run','earbud_white'],
  ch_cyclist: ['hoodie_black','short_bike','shoe_trail','headband_black','bottle_white'],
  ch_boxer:   ['bra_energy','leg_classic','sock_white','glove_pink','headband_black'],
};


/* ---------- 广场中的其他用户 Avatar（对应真实用户，非系统 NPC） ---------- */
const PARK_USERS = [
  { id:'u_ava',   name:'Ava.L',   ch:'ch_yoga',    sport:'Tennis',   lvl:5, exp:'Intermediate', open:true,  evts:3, pos:[22,54] },
  { id:'u_kenji', name:'Kenji',   ch:'ch_runner',  sport:'Running',  lvl:4, exp:'Advanced',     open:true,  evts:5, pos:[55,72] },
  { id:'u_lena',  name:'Lena',    ch:'ch_hiker',   sport:'Pilates',  lvl:3, exp:'Beginner',     open:false, evts:2, pos:[13,40] },
  { id:'u_sam',   name:'Sam',     ch:'ch_cyclist', sport:'Hiking',   lvl:6, exp:'Advanced',     open:true,  evts:7, pos:[82,52] },
  { id:'u_omar',  name:'Omar',    ch:'ch_boxer',   sport:'Training', lvl:2, exp:'Intermediate', open:true,  evts:1, pos:[32,28] },
  { id:'u_zoe',   name:'Zoe',     ch:'ch_yoga',    sport:'Yoga',     lvl:5, exp:'Intermediate', open:false, evts:4, pos:[60,24] },
  { id:'u_ryu',   name:'Ryu',     ch:'ch_runner',  sport:'Tennis',   lvl:3, exp:'Beginner',     open:true,  evts:2, pos:[70,64] },
  { id:'u_nina',  name:'Nina',    ch:'ch_hiker',   sport:'Outdoor',  lvl:4, exp:'Intermediate', open:true,  evts:4, pos:[45,36] },
];

/* ---------- 推荐好友 ---------- */
const FRIENDS = [
  { id:'u_ava',   name:'Ava.L',  ch:'ch_yoga',    sport:'Tennis',   reason:'Also plays Tennis · 2 circles in common' },
  { id:'u_ryu',   name:'Ryu',    ch:'ch_runner',  sport:'Tennis',   reason:'Also plays Tennis · 1 circle in common' },
  { id:'u_sam',   name:'Sam',    ch:'ch_cyclist', sport:'Hiking',   reason:'Shares your Outdoor Circle' },
  { id:'u_kenji', name:'Kenji',  ch:'ch_runner',  sport:'Running',  reason:'Also plays Running · 3 circles in common' },
];
