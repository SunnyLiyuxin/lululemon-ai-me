/* ============================================================
   LULULEMON AI ME · Movement Park 广场（可拖动 / 可缩放 / 实时渲染）
   ------------------------------------------------------------
   不再是一张静态截图：底图 + 热点 + 用户 Avatar + 事件卡全部是真实 DOM，
   统一挂在一个可 transform 的画布上，支持：
     · 鼠标拖动 / 单指拖动
     · 滚轮 / 双指捏合缩放
     · 缩放范围 1x ~ 3.2x
     · 实时活动条跟随
   ============================================================ */

const PARK_ZONES = [
  { id:'train',   name:'Training Circle', x:4,    y:6,    w:30, h:7,   color:'#B5573F', live:false },
  { id:'tennis',  name:'Tennis Circle',   x:63,   y:6,    w:29, h:7,   color:'#8FBF3F', live:true  },
  { id:'pilates', name:'Pilates Circle',  x:2,    y:50,   w:27, h:7,   color:'#9B7BB8', live:false },
  { id:'outdoor', name:'Outdoor Circle',  x:63,   y:58,   w:29, h:7,   color:'#5B8C6E', live:true  },
  { id:'running', name:'Running Circle',  x:36,   y:84,   w:29, h:7,   color:'#B5573F', live:false },
];

/* PARK_USERS 见 catalog.js */

let parkView = { x:0, y:0, k:1 };

function renderPark(){
  const a = state.avatar, ch = CHARACTERS.find(c => c.id === a.char) || CHARACTERS[0];
  return `
  <div class="park-wrap" id="parkwrap">
    <div class="park-canvas" id="parkcanvas">
      <div class="park-stage" id="parkstage">
        <img class="park-bg" src="assets/img/park_bg.jpg" alt="The Movement Park" draggable="false">

        ${PARK_ZONES.map(z=>`
          <button class="pzone" data-zone="${z.id}" style="left:${z.x}%;top:${z.y}%;width:${z.w}%;height:${z.h}%">
            <span class="pzone-lbl"><i style="background:${z.color}"></i>${z.name}${z.live?'<em>LIVE</em>':''}</span>
          </button>`).join('')}

        <button class="pevent" id="pevent" style="left:56%;top:32%">
          <b>Community Event</b>
          <strong>Tennis Meetup</strong>
          <span>Sat 10:00</span>
          ${icon('chevR','chev')}
        </button>

        ${PARK_USERS.map(u=>`
          <button class="puser" data-user="${u.id}" style="left:${u.pos[0]}%;top:${u.pos[1]}%">
            <span class="av"><img src="${CHARACTERS.find(c=>c.id===u.ch).img}" alt="" draggable="false"></span>
            <i class="pini" style="background:${CHARACTERS.find(c=>c.id===u.ch).tone}">${u.name[0]}</i>
          </button>`).join('')}

        <button class="pme" id="pme" style="left:50%;top:62%">
          <span class="av ring"><img src="${ch.img}" alt="" draggable="false"></span>
          <i class="pmetag">You</i>
        </button>
      </div>
    </div>

    <div class="park-topbar">
      <button class="ptb-back" data-act="back">${icon('back')}</button>
      <div class="livebar">
        <span class="lb-live"><i></i>LIVE</span>
        <span class="lb-txt">Tennis Challenge ends in 2h · Yoga Garden class 18:00 · Running Club 12km this week</span>
      </div>
      <button class="ptb-icon" id="parkzoom" data-act="toast" data-msg="Pinch or scroll to zoom the park">${icon('sparkle')}</button>
    </div>

    <div class="park-ctrls">
      <button class="pc-btn" id="pkout" aria-label="Zoom out">−</button>
      <button class="pc-btn" id="pkin" aria-label="Zoom in">+</button>
      <button class="pc-btn pc-reset" id="pkreset" aria-label="Reset view">${icon('crop')}</button>
    </div>

    <div class="park-hint" id="parkhint">Drag to explore · Scroll or pinch to zoom</div>
  </div>

  <style>
    .park-wrap{position:absolute;inset:0;overflow:hidden;background:#6E9B4E;touch-action:none}
    .park-canvas{position:absolute;left:0;top:0;width:100%;height:100%;transform-origin:0 0;will-change:transform;cursor:grab}
    .park-canvas.dragging{cursor:grabbing}
    .park-stage{position:absolute;left:0;top:0;width:100%;height:100%}
    .park-bg{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;pointer-events:none;user-select:none}
    .pzone{position:absolute;display:flex;align-items:flex-start;touch-action:none}
    .pzone-lbl{
      display:flex;align-items:center;gap:5px;height:26px;padding:0 10px;
      border-radius:var(--r-pill);background:rgba(255,255,255,.96);
      box-shadow:0 3px 10px rgba(22,21,15,.16);
      font-size:11px;font-weight:700;color:var(--ink);white-space:nowrap;
    }
    .pzone-lbl i{width:8px;height:8px;border-radius:50%;display:block;flex:none}
    .pzone-lbl em{font-style:normal;font-size:8.5px;font-weight:800;color:var(--lulu-red);letter-spacing:.08em;margin-left:2px}
    .pevent{
      position:absolute;width:34%;
      background:rgba(255,255,255,.97);border-radius:12px;
      padding:9px 11px;text-align:left;
      box-shadow:0 6px 18px rgba(22,21,15,.2);
      border-top:3px solid var(--lulu-red);
    }
    .pevent b{display:block;font-size:9.5px;font-weight:800;letter-spacing:.1em;color:var(--ink-3);text-transform:uppercase}
    .pevent strong{display:block;font-size:12.5px;font-weight:800;margin-top:2px}
    .pevent span{font-size:11px;color:var(--ink-2)}
    .pevent .chev{position:absolute;right:9px;top:50%;transform:translateY(-50%);width:14px;height:14px;stroke:var(--ink);stroke-width:2;fill:none}
    .puser{position:absolute;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;touch-action:none}
    .puser .av{width:34px;height:34px;border:1.5px solid #fff;box-shadow:0 3px 9px rgba(0,0,0,.25);overflow:hidden;border-radius:50%}
    .puser .av img{width:100%;height:100%;object-fit:cover;object-position:center 8%}
    .pini{position:absolute;bottom:-2px;right:-2px;width:14px;height:14px;border-radius:50%;border:1.5px solid #fff;font-size:8px;font-weight:800;font-style:normal;color:#fff;display:flex;align-items:center;justify-content:center}
    .pme{position:absolute;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;touch-action:none}
    .pme .av{width:40px;height:40px;box-shadow:0 4px 12px rgba(0,0,0,.3);overflow:hidden;border-radius:50%}
    .pme .av img{width:100%;height:100%;object-fit:cover;object-position:center 8%}
    .pmetag{position:absolute;bottom:-4px;font-size:9px;font-weight:800;color:#fff;background:var(--ink);padding:2px 7px;border-radius:var(--r-pill)}
    .park-topbar{position:absolute;top:0;left:0;right:0;z-index:10;padding:calc(var(--safe-t) + 10px) 14px 26px;display:flex;align-items:center;gap:10px;background:linear-gradient(180deg,rgba(22,21,15,.42),rgba(22,21,15,0));pointer-events:none}
    .park-topbar > *{pointer-events:auto}
    .ptb-back{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 2px 8px rgba(0,0,0,.14)}
    .ptb-back svg{width:20px;height:20px;stroke:var(--ink);stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .livebar{flex:1;min-width:0;height:34px;border-radius:var(--r-pill);background:rgba(22,21,15,.78);backdrop-filter:blur(8px);display:flex;align-items:center;gap:7px;padding:0 12px;overflow:hidden}
    .lb-live{display:flex;align-items:center;gap:4px;font-size:9.5px;font-weight:800;color:#fff;letter-spacing:.1em;flex:none}
    .lb-live i{width:6px;height:6px;border-radius:50%;background:#FF6B6B;display:block;animation:pulse 1.4s infinite}
    .lb-txt{font-size:10.5px;color:rgba(255,255,255,.82);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ptb-icon{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 2px 8px rgba(0,0,0,.14)}
    .ptb-icon svg{width:17px;height:17px;stroke:var(--ink);stroke-width:1.6;fill:none}
    .park-ctrls{position:absolute;right:14px;bottom:calc(96px + var(--safe-b));z-index:10;display:flex;flex-direction:column;gap:8px}
    .pc-btn{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:700;color:var(--ink);box-shadow:0 3px 10px rgba(0,0,0,.18);line-height:1}
    .pc-btn svg{width:17px;height:17px;stroke:var(--ink);stroke-width:1.7;fill:none}
    .pc-reset{font-size:12px}
    .park-hint{position:absolute;left:50%;bottom:calc(88px + var(--safe-b));transform:translateX(-50%);z-index:9;font-size:10.5px;font-weight:600;color:#fff;background:rgba(22,21,15,.55);padding:5px 13px;border-radius:var(--r-pill);backdrop-filter:blur(6px);transition:opacity .4s;pointer-events:none}
    .park-hint.hide{opacity:0}
  </style>`;
}

/* ============================================================
   交互：拖动 + 缩放
   ============================================================ */
function parkInit(){
  const wrap = document.getElementById('parkwrap');
  const cv = document.getElementById('parkcanvas');
  if(!wrap || !cv) return;

  // 若上次广场未清理，先移除旧的 window 监听（防止重复绑定）
  if(parkInit._cleanup) parkInit._cleanup();

  let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
  let pinchStart = 0, pinchK = 1;
  let raf = 0;

  const apply = () => {
    if(raf) return;                       // rAF 合帧，拖动更顺滑
    raf = requestAnimationFrame(()=>{
      raf = 0;
      cv.style.transform = `translate3d(${parkView.x}px,${parkView.y}px,0) scale(${parkView.k})`;
    });
  };

  const clamp = () => {
    const W = wrap.clientWidth, H = wrap.clientHeight;
    parkView.k = Math.min(3.2, Math.max(1, parkView.k));
    const maxX = (parkView.k - 1) * W * 0.6;
    const maxY = (parkView.k - 1) * H * 0.6;
    parkView.x = Math.min(maxX, Math.max(-maxX, parkView.x));
    parkView.y = Math.min(maxY, Math.max(-maxY, parkView.y));
    if(parkView.k === 1){ parkView.x = 0; parkView.y = 0; }
  };

  const onDown = e => {
    if(e.target.closest('.puser') || e.target.closest('.pzone') || e.target.closest('.pevent') || e.target.closest('.pme')) return;
    dragging = true;
    sx = e.clientX; sy = e.clientY; ox = parkView.x; oy = parkView.y;
    cv.classList.add('dragging');
    const hint = document.getElementById('parkhint'); if(hint) hint.classList.add('hide');
  };
  const onMove = e => {
    if(!dragging) return;
    parkView.x = ox + (e.clientX - sx);
    parkView.y = oy + (e.clientY - sy);
    clamp(); apply();
  };
  const onUp = () => { dragging = false; cv.classList.remove('dragging'); };

  parkInit._cleanup = () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    if(raf){ cancelAnimationFrame(raf); raf = 0; }
  };

  wrap.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  wrap.addEventListener('wheel', e => {
    e.preventDefault();
    const r = wrap.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    const factor = e.deltaY < 0 ? 1.14 : 1/1.14;
    const before = { x: (cx - parkView.x) / parkView.k, y: (cy - parkView.y) / parkView.k };
    parkView.k = Math.min(3.2, Math.max(1, parkView.k * factor));
    parkView.x = cx - before.x * parkView.k;
    parkView.y = cy - before.y * parkView.k;
    clamp(); apply();
    const hint = document.getElementById('parkhint'); if(hint) hint.classList.add('hide');
  }, { passive:false });

  /* 双指捏合 */
  wrap.addEventListener('touchstart', e => {
    if(e.touches.length === 2){
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStart = Math.hypot(dx, dy);
      pinchK = parkView.k;
    }
  }, { passive:true });
  wrap.addEventListener('touchmove', e => {
    if(e.touches.length === 2 && pinchStart){
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const r = wrap.getBoundingClientRect();
      const cx = (e.touches[0].clientX + e.touches[1].clientX)/2 - r.left;
      const cy = (e.touches[0].clientY + e.touches[1].clientY)/2 - r.top;
      const before = { x: (cx - parkView.x) / parkView.k, y: (cy - parkView.y) / parkView.k };
      parkView.k = Math.min(3.2, Math.max(1, pinchK * dist / pinchStart));
      parkView.x = cx - before.x * parkView.k;
      parkView.y = cy - before.y * parkView.k;
      clamp(); apply();
    }
  }, { passive:true });
  wrap.addEventListener('touchend', () => { pinchStart = 0; });

  const zo = document.getElementById('pkin'), zi = document.getElementById('pkout'), zr = document.getElementById('pkreset');
  if(zo) zo.addEventListener('click', () => {
    const r = wrap.getBoundingClientRect();
    const before = { x: (r.width/2 - parkView.x)/parkView.k, y: (r.height/2 - parkView.y)/parkView.k };
    parkView.k = Math.min(3.2, parkView.k * 1.25);
    parkView.x = r.width/2 - before.x * parkView.k;
    parkView.y = r.height/2 - before.y * parkView.k;
    clamp(); apply();
  });
  if(zi) zi.addEventListener('click', () => {
    const r = wrap.getBoundingClientRect();
    const before = { x: (r.width/2 - parkView.x)/parkView.k, y: (r.height/2 - parkView.y)/parkView.k };
    parkView.k = Math.max(1, parkView.k / 1.25);
    parkView.x = r.width/2 - before.x * parkView.k;
    parkView.y = r.height/2 - before.y * parkView.k;
    clamp(); apply();
  });
  if(zr) zr.addEventListener('click', () => { parkView = { x:0, y:0, k:1 }; apply(); });

  apply();
}
