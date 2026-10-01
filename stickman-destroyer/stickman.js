
(() => {
  if (window.__textDestroyer) { window.__textDestroyer.quit(); return; }
  const CSS = ":host{--ink:#1b1f3b;--bg:#eaf1ff;--pop:#ff4f81;--sun:#ffc93c;--mint:#2ec4b6}\n*{box-sizing:border-box}\n.ui{font-family:\"Trebuchet MS\",\"Segoe UI\",sans-serif;line-height:1.4;text-align:left;pointer-events:auto}\n#quit{float:right;padding:2px 9px;margin-left:4px}\n#fx {\n    position: fixed;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n    z-index: 50;\n  }\n  #msgs {\n    position: fixed;\n    inset: 0;\n    pointer-events: none;\n    z-index: 60;\n    overflow: hidden;\n  }\n  .m {\n    position: absolute;\n    font:\n      900 clamp(22px, 4vw, 38px) \"Arial Rounded MT Bold\",\n      \"Trebuchet MS\",\n      sans-serif;\n    color: #fff;\n    -webkit-text-stroke: 2px var(--ink);\n    text-shadow: 0 4px 0 var(--pop);\n    animation: rise 1.2s ease-out forwards;\n    white-space: nowrap;\n  }\n  @keyframes rise {\n    0% {\n      transform: translate(-50%, 10px) scale(0.4);\n      opacity: 0;\n    }\n    15% {\n      transform: translate(-50%, 0) scale(1.15);\n      opacity: 1;\n    }\n    100% {\n      transform: translate(-50%, -70px) scale(1);\n      opacity: 0;\n    }\n  }\n  #combo {\n    position: fixed;\n    left: 16px;\n    top: 70px;\n    z-index: 90;\n    font:\n      900 34px \"Arial Rounded MT Bold\",\n      \"Trebuchet MS\",\n      sans-serif;\n    color: var(--sun);\n    -webkit-text-stroke: 2px var(--ink);\n    text-shadow: 0 4px 0 var(--pop);\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity 0.3s;\n  }\n  #combo.on {\n    opacity: 1;\n  }\n  #combo.bump {\n    animation: bump 0.25s;\n  }\n  @keyframes bump {\n    50% {\n      transform: scale(1.4) rotate(-4deg);\n    }\n  }\n  .ui {\n    position: fixed;\n    z-index: 100;\n    color: #fff;\n    background: linear-gradient(145deg, #2b2060, #14112e);\n    border: 2px solid #5b4bd6;\n    border-radius: 18px;\n    box-shadow:\n      0 10px 30px rgba(20, 17, 46, 0.5),\n      0 0 22px rgba(124, 92, 255, 0.45);\n    font-size: 13px;\n  }\n  #panel {\n    top: 12px;\n    right: 12px;\n    width: min(250px, calc(100vw - 24px));\n    padding: 12px;\n  }\n  #panel h2,\n  #hud h2 {\n    margin: 0;\n    font-size: 15px;\n    letter-spacing: 1px;\n    color: var(--sun);\n    text-shadow: 0 0 10px rgba(255, 201, 60, 0.6);\n  }\n  .row {\n    display: flex;\n    gap: 6px;\n    flex-wrap: wrap;\n    margin: 8px 0;\n    align-items: center;\n  }\n  .ui button {\n    font: inherit;\n    font-weight: 700;\n    color: #fff;\n    border: 0;\n    border-radius: 10px;\n    padding: 8px 10px;\n    cursor: pointer;\n    background: linear-gradient(#ff6b9a, #e0336b);\n    box-shadow: 0 3px 0 #8f1f47;\n    transition: transform 0.1s;\n  }\n  .ui button:active {\n    transform: translateY(3px);\n    box-shadow: none;\n  }\n  .ui button.b2 {\n    background: linear-gradient(#5b8cff, #3a5bd6);\n    box-shadow: 0 3px 0 #1f2f87;\n  }\n  .ui button.b3 {\n    background: linear-gradient(#ffd25c, #e8a100);\n    color: var(--ink);\n    box-shadow: 0 3px 0 #8f6200;\n  }\n  .ui select {\n    width: 100%;\n    padding: 7px;\n    border-radius: 8px;\n    border: 0;\n    font: inherit;\n  }\n  .ui label {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n  }\n  #stop {\n    display: none;\n    width: 100%;\n  }\n  #hud {\n    right: 12px;\n    bottom: 12px;\n    padding: 10px 14px;\n    min-width: 150px;\n  }\n  #hud button {\n    position: absolute;\n    top: 4px;\n    right: 6px;\n    padding: 0 7px;\n    font-size: 14px;\n    background: none;\n    box-shadow: none;\n  }\n  #tog {\n    float: right;\n    padding: 2px 9px;\n  }\n  @media (max-width: 640px) {\n    #hud {\n      font-size: 11px;\n      min-width: 120px;\n    }\n  }\n";
  const HTML = "<canvas id=\"fx\"></canvas><div id=\"msgs\"></div><div id=\"combo\"></div>\n\n<div id=\"hud\" class=\"ui\"><button id=\"hx\" title=\"Close\">&times;</button><h2>TEXT DESTROYER</h2>\n<div>Weapon: <b id=\"hw\">Pistol</b></div><div>Targets: <b id=\"ht\">0</b></div><div>Destroyed: <b id=\"hd\">0</b></div></div>\n\n<div id=\"panel\" class=\"ui\"><button id=\"quit\" class=\"b2\" title=\"Remove Text Destroyer\">&times;</button><button id=\"tog\" class=\"b2\">&ndash;</button><h2>TEXT DESTROYER</h2>\n<div id=\"pb\">\n<div class=\"row\">Weapon:<select id=\"weapon\"></select></div>\n<div class=\"row\"><button id=\"bd\">DESTROY TEXT</button><button id=\"br\" class=\"b2\">RANDOM ATTACK</button><button id=\"ba\" class=\"b3\">DESTROY ALL</button><button id=\"bx\" class=\"b2\">RESET</button></div>\n<div class=\"row\">Targets: <b id=\"pt\">0</b> &nbsp; Destroyed: <b id=\"pd\">0</b></div>\n<div class=\"row\"><label><input type=\"checkbox\" id=\"chaos\"> Chaos Mode</label></div>\n<button id=\"stop\">STOP</button>\n<div class=\"row\"><label><input type=\"checkbox\" id=\"mute\"> Mute</label><input type=\"range\" id=\"vol\" min=\"0\" max=\"100\" value=\"60\" style=\"width:90px\"></div>\n<div class=\"row\"><label><input type=\"checkbox\" id=\"reduce\"> Reduced motion</label></div>\n<div style=\"opacity:.75;font-size:11px;line-height:1.4\">Move: WASD / arrows &middot; Attack nearest: Space &middot; Click text to attack it &middot; Click empty space to walk &middot; 1&ndash;9, 0 pick weapon</div>\n</div></div>\n\n";
  const PAGE_CSS = ".td-hl{outline:3px solid #ffc93c!important;outline-offset:4px;border-radius:8px;box-shadow:0 0 26px #ffc93c;animation:td-pulse .45s ease-in-out infinite alternate}@keyframes td-pulse{to{box-shadow:0 0 6px #ffc93c;outline-color:#ff4f81}}";

  const host = document.createElement("div");
  host.id = "td-host";
  host.style.cssText = "all:initial;position:fixed;inset:0;z-index:2147483647;pointer-events:none";
  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = "<style>" + CSS + "</style>" + HTML;
  root.querySelector("style").textContent += `
    #panel{top:8px;right:8px;width:min(232px,calc(100vw - 16px));padding:9px;border-radius:11px;font-size:11px}
    #panel h2,#hud h2{font-size:12px;letter-spacing:.4px}
    #hud{left:8px;top:58px;width:154px;padding:7px 9px;border-radius:10px;font-size:11px}
    #hud button,#panel button{padding:5px 7px;border-radius:7px;font-size:10px}
    #panel .row{gap:4px;margin:5px 0}
    .weapon-strip{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;margin:5px 0 7px}
    .weapon-strip button{height:27px;padding:0!important;font-size:16px!important;line-height:1;cursor:pointer}
    .weapon-strip button.active{outline:2px solid #ffc93c;outline-offset:1px;filter:brightness(1.2)}
    #panel #pb>div[style]{font-size:9px!important;line-height:1.25!important}
    #combo{font-size:24px;left:10px;top:46px}
    @media(max-width:420px){#panel{width:min(216px,calc(100vw - 12px));top:6px;right:6px;padding:7px}#hud{top:52px;left:6px}}
  `;
  const pageStyle = document.createElement("style");
  pageStyle.textContent = PAGE_CSS;
  document.head.appendChild(pageStyle);
  document.documentElement.appendChild(host);

  // every window listener is removable (quit) and runs in the capture phase so sites can't swallow our input
  const ctl = new AbortController();
  const CAPTURE = ["keydown", "keyup", "click", "pointerdown", "scroll"];
  const addEventListener = (type, fn) => window.addEventListener(type, fn, { capture: CAPTURE.includes(type), signal: ctl.signal });

    

    // ---------- Setup ----------
    const $ = (s) => root.querySelector(s),
      cv = $("#fx"),
      c = cv.getContext("2d");
    const INK = "#1b1f3b",
      R = (a, b) => a + Math.random() * (b - a),
      pick = (a) => a[(Math.random() * a.length) | 0];
    const ease = (p) => p * p * (3 - 2 * p),
      clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    let W, H;
    function size() {
      const d = devicePixelRatio || 1;
      W = innerWidth;
      H = innerHeight;
      cv.width = W * d;
      cv.height = H * d;
      c.setTransform(d, 0, 0, d, 0, 0);
    }
    addEventListener("resize", size);
    size();

    // ---------- State ----------
    const S = {
      reduce: matchMedia("(prefers-reduced-motion:reduce)").matches,
      destroyed: 0,
      combo: 0,
      comboEnd: 0,
      shake: 0,
      flash: 0,
      busy: false,
      auto: false,
      chaos: false,
      weapon: "rocket",
      ep: 0,
    };
    const CANCEL = {}; // thrown to abort running animations after Reset
    const WEAPONS = {
      pistol: "Pistol",
      machine: "Machine Gun",
      bomb: "Bomb",
      rocket: "Rocket",
      laser: "Laser",
      hammer: "Hammer",
      fireball: "Fireball",
      lightning: "Lightning",
      eraser: "Eraser",
      meteor: "Meteor",
      random: "Random",
    };
    const KEYS = Object.keys(WEAPONS).filter((k) => k !== "random");
    // ---------- Targets: words of the host page, wrapped lazily ----------
    const els = []; // every word <span> wrapped so far
    const SKIP = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|INPUT|SELECT|OPTION|CANVAS|IFRAME|CODE|PRE|TITLE|HEAD)$/i;
    // Wraps the words of text that is on (or near) the screen. Text inside flex/grid parents gets
    // one wrapper span so its words don't become separate flex items and break the layout.
    function wrapVisibleText() {
      if (!document.body) return;
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT),
        nodes = [],
        rg = document.createRange();
      while (tw.nextNode() && nodes.length < 700) {
        const n = tw.currentNode,
          p = n.parentElement;
        if (!p || !n.nodeValue.trim() || p instanceof SVGElement || SKIP.test(p.tagName)) continue;
        if (p.closest(".td-w,.td-wrap,[contenteditable]")) continue;
        rg.selectNodeContents(n);
        const r = rg.getBoundingClientRect();
        if (r.width < 4 || r.height < 4 || r.bottom < -150 || r.top > H + 150) continue;
        nodes.push(n);
      }
      nodes.forEach((n) => {
        const flexy = /flex|grid/.test(getComputedStyle(n.parentElement).display),
          box = flexy ? document.createElement("span") : document.createDocumentFragment();
        if (flexy) box.className = "td-wrap";
        n.nodeValue.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) box.append(part);
          else {
            const w = document.createElement("span");
            w.className = "td-w";
            w.textContent = part;
            box.append(w);
            els.push(w);
          }
        });
        n.replaceWith(box);
      });
      hud();
    }
    const alive = () => els.filter((e) => e.isConnected && !e.dataset.dead);
    function onScreen() {
      return alive().filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.bottom > 0 && r.top < H && r.right > 0 && r.left < W;
      });
    }
    const atBottom = () => innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
    const sel = $("#weapon");
    for (const k in WEAPONS) sel.add(new Option(WEAPONS[k], k));
    sel.value = "rocket";
    const WEAPON_ICONS = {
      pistol: "🔫", machine: "💥", bomb: "💣", rocket: "🚀", laser: "🔴",
      hammer: "🔨", fireball: "🔥", lightning: "⚡", eraser: "🧽", meteor: "☄️", random: "🎲",
    };
    const weaponBar = document.createElement("div");
    weaponBar.className = "weapon-strip";
    weaponBar.setAttribute("role", "toolbar");
    weaponBar.setAttribute("aria-label", "Choose a weapon");
    sel.closest(".row").style.display = "none";
    $("#bd").parentElement.before(weaponBar);
    for (const key of Object.keys(WEAPONS)) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = WEAPON_ICONS[key];
      button.title = `${WEAPONS[key]} (${Object.keys(WEAPONS).indexOf(key) + 1})`;
      button.setAttribute("aria-label", WEAPONS[key]);
      button.setAttribute("aria-pressed", key === sel.value ? "true" : "false");
      button.classList.toggle("active", key === sel.value);
      button.addEventListener("click", () => {
        sel.value = key;
        S.weapon = key;
        hud();
        syncWeaponBar();
      });
      weaponBar.append(button);
    }

    function hud() {
      $("#hw").textContent = WEAPONS[sel.value];
      $("#ht").textContent = $("#pt").textContent = els.length;
      $("#hd").textContent = $("#pd").textContent = S.destroyed;
    }
    function syncWeaponBar() {
      weaponBar.querySelectorAll("button").forEach((button) => {
        const selected = button.getAttribute("aria-label") === WEAPONS[sel.value];
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", selected ? "true" : "false");
      });
    }

    // ---------- Audio (synthesized locally with Web Audio) ----------
    let ac, mg;
    function unlock() {
      if (!ac) {
        ac = new (window.AudioContext || window.webkitAudioContext)();
        mg = ac.createGain();
        mg.connect(ac.destination);
        setVol();
      }
      if (ac.state === "suspended") ac.resume();
    }
    function setVol() {
      if (mg) mg.gain.value = $("#mute").checked ? 0 : $("#vol").value / 100;
    }
    function tone(f1, f2, d, type = "square", v = 0.2) {
      if (!ac) return;
      const t = ac.currentTime,
        o = ac.createOscillator(),
        g = ac.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f1, t);
      o.frequency.exponentialRampToValueAtTime(f2, t + d);
      g.gain.setValueAtTime(v, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + d);
      o.connect(g);
      g.connect(mg);
      o.start();
      o.stop(t + d);
    }
    function noise(d, v = 0.3, f = 1200) {
      if (!ac) return;
      const n = (ac.sampleRate * d) | 0,
        b = ac.createBuffer(1, n, ac.sampleRate),
        a = b.getChannelData(0);
      for (let i = 0; i < n; i++) a[i] = Math.random() * 2 - 1;
      const s = ac.createBufferSource(),
        fl = ac.createBiquadFilter(),
        g = ac.createGain(),
        t = ac.currentTime;
      s.buffer = b;
      fl.frequency.value = f;
      g.gain.setValueAtTime(v, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + d);
      s.connect(fl);
      fl.connect(g);
      g.connect(mg);
      s.start();
    }
    const SFX = {
      shot: () => {
        tone(900, 120, 0.12, "square", 0.15);
        noise(0.08, 0.2, 3000);
      },
      boom: () => {
        noise(0.6, 0.6, 500);
        tone(120, 30, 0.5, "sawtooth", 0.3);
      },
      whoosh: () => noise(0.4, 0.2, 900),
      laser: () => tone(1400, 200, 0.35, "sawtooth", 0.12),
      zap: () => {
        noise(0.25, 0.5, 4000);
        tone(2000, 100, 0.25, "square", 0.15);
      },
      hit: () => tone(300, 80, 0.12, "triangle", 0.3),
      pop: () => tone(500, 900, 0.08, "sine", 0.15),
      charge: () => tone(200, 1200, 0.5, "sine", 0.12),
      thud: () => {
        tone(90, 30, 0.25, "sine", 0.5);
        noise(0.15, 0.3, 300);
      },
      wipe: () => noise(0.5, 0.15, 2500),
    };
    const sfx = (n) => {
      try {
        SFX[n]();
      } catch (e) {}
    };

    // ---------- Timing helpers (all cancel when S.ep changes) ----------
    const wait = (ms, ep) =>
      new Promise((res, rej) => setTimeout(() => (ep === S.ep ? res() : rej(CANCEL)), ms));
    const tween = (ms, fn, ep) =>
      new Promise((res, rej) => {
        const t0 = performance.now();
        (function f(n) {
          if (ep !== S.ep) return rej(CANCEL);
          const p = Math.min(1, (n - t0) / ms);
          fn(p);
          p < 1 ? requestAnimationFrame(f) : res();
        })(t0);
      });

    // ---------- Effects: drawables, particles ----------
    const OBJ = new Set(),
      P = [],
      SCARS = [];
    function fx(ms, fn) {
      const t0 = performance.now(),
        o = {
          draw() {
            const p = (performance.now() - t0) / ms;
            p >= 1 ? OBJ.delete(o) : fn(p);
          },
        };
      OBJ.add(o);
      return o;
    }
    const circle = (x, y, r) => {
      c.beginPath();
      c.arc(x, y, Math.max(0, r), 0, 7);
      c.fill();
    };
    const PAL = ["#ff4f81", "#ffc93c", "#2ec4b6", "#5b8cff", "#fff"],
      FIRE = ["#ff7b00", "#ffd23f", "#ff4f00", "#fff2a8"];
    function burst(x, y, n, o = {}) {
      if (S.reduce) n >>= 2;
      n = Math.min(n, 420 - P.length);
      const sp = o.sp || [2, 9],
        ty = o.types || ["sq", "circ"];
      for (let i = 0; i < n; i++) {
        const a = R(0, 7),
          s = R(sp[0], sp[1]);
        P.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          g: o.g ?? 0.25,
          l: 0,
          max: R(...(o.life || [0.6, 1.3])),
          r: R(...(o.r || [3, 8])),
          rot: R(0, 7),
          vr: R(-0.3, 0.3),
          col: pick(o.cols || PAL),
          ty: pick(ty),
          ch: pick(o.ch || "ABCXYZ"),
        });
      }
    }
    function drawParticles(dt) {
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i];
        p.l += dt;
        if (p.l >= p.max) {
          P.splice(i, 1);
          continue;
        }
        p.vy += p.g;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        const k = 1 - p.l / p.max;
        c.globalAlpha = p.ty === "smoke" ? k * 0.45 : k;
        c.fillStyle = c.strokeStyle = p.col;
        if (p.ty === "sq") {
          c.save();
          c.translate(p.x, p.y);
          c.rotate(p.rot);
          c.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
          c.restore();
        } else if (p.ty === "circ") circle(p.x, p.y, p.r / 2);
        else if (p.ty === "smoke") circle(p.x, p.y, p.r * (1 + 2 * (1 - k)));
        else if (p.ty === "spark") {
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(p.x, p.y);
          c.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
          c.stroke();
        } else {
          c.save();
          c.translate(p.x, p.y);
          c.rotate(p.rot);
          c.font = "bold " + p.r * 3 + "px sans-serif";
          c.fillText(p.ch, 0, 0);
          c.restore();
        }
      }
      c.globalAlpha = 1;
    }
    function ring(x, y, r, col, ms, w = 6) {
      fx(ms, (p) => {
        c.globalAlpha = 1 - p;
        c.strokeStyle = col;
        c.lineWidth = w * (1 - p);
        c.beginPath();
        c.arc(x, y, r * ease(p), 0, 7);
        c.stroke();
        c.globalAlpha = 1;
      });
    }
    const shake = (a) => {
      if (!S.reduce) S.shake = Math.max(S.shake, a);
    };
    const flash = (a) => {
      S.flash = Math.max(S.flash, S.reduce ? a * 0.2 : a);
    };
    function boom(x, y, s = 1) {
      sfx("boom");
      shake(14 * s);
      flash(0.5 * s);
      fx(500, (p) => {
        c.globalAlpha = 1 - p;
        c.fillStyle = "#ff7b00";
        circle(x, y, 20 + 80 * s * ease(p));
        c.fillStyle = "#ffd23f";
        circle(x, y, 10 + 55 * s * ease(p));
        c.fillStyle = "#fff";
        circle(x, y, 30 * s * (1 - p));
        c.globalAlpha = 1;
      });
      ring(x, y, 130 * s, "#fff", 400, 8);
      burst(x, y, 30 * s, { cols: FIRE, types: ["spark", "circ"], sp: [3, 13], g: 0.2 });
      burst(x, y, 14 * s, {
        cols: ["#888", "#bbb", "#666"],
        types: ["smoke"],
        sp: [0.5, 3],
        g: -0.05,
        r: [8, 16],
        life: [0.8, 1.6],
      });
    }
    function muzzle(h) {
      fx(90, (p) => {
        c.fillStyle = "#ffd23f";
        circle(h.x, h.y, 16 * (1 - p));
        c.fillStyle = "#fff";
        circle(h.x, h.y, 7 * (1 - p));
      });
    }

    // ---------- Messages & combo ----------
    const MSGS = ["TARGET ACQUIRED", "CHAOS MODE", "TEXT DESTROYED", "STICKMAN READY", "COMBO!"];
    function msg(t) {
      const box = $("#msgs");
      if (box.children.length > 3) return;
      const d = document.createElement("div");
      d.className = "m";
      d.textContent = t;
      d.style.left = R(25, 75) + "%";
      d.style.top = R(25, 55) + "%";
      d.onanimationend = () => d.remove();
      box.appendChild(d);
    }
    function addCombo() {
      S.combo++;
      S.comboEnd = performance.now() + 4000;
      const b = $("#combo");
      if (S.combo >= 2) {
        b.textContent = "COMBO x" + S.combo;
        b.className = "on";
        void b.offsetWidth;
        b.className = "on bump";
        b.style.fontSize = Math.min(60, 30 + S.combo * 3) + "px";
      }
      if (S.combo % 5 === 0) msg("COMBO!");
    }

    // ---------- Stickman ----------
    const sm = {
      x: 70,
      y: 0,
      dir: 1,
      arm: 0.5,
      held: null,
      walk: 0,
      moving: false,
      lean: 0,
      bend: 0,
      crouch: 0,
      head: 0,
      sx: 1,
      sy: 1,
      jy: 0,
      orb: 0,
      orbCol: "#fff",
    };
    function home() {
      Object.assign(sm, {
        x: 70,
        y: H - 24,
        dir: 1,
        arm: 0.5,
        held: null,
        moving: false,
        lean: 0,
        bend: 0,
        crouch: 0,
        sx: 1,
        sy: 1,
        jy: 0,
        orb: 0,
      });
    }
    // Rig: hip/shoulder positions in body space (feet at 0,0, facing +x). crouch lowers the hips, bend flexes the waist.
    function skel() {
      const hy = -34 + sm.crouch * 13,
        hx = -sm.crouch * 4,
        t = -Math.PI / 2 + sm.bend;
      return { hx, hy, t, sx: hx + Math.cos(t) * 28, sy: hy + Math.sin(t) * 28 };
    }
    function toWorld(x, y) {
      const l = sm.lean,
        cs = Math.cos(l),
        sn = Math.sin(l),
        rx = x * cs - y * sn,
        ry = x * sn + y * cs;
      return { x: sm.x + sm.dir * sm.sx * rx, y: sm.y - sm.jy + sm.sy * ry };
    }
    const shoulderW = () => {
      const k = skel();
      return toWorld(k.sx, k.sy);
    };
    const hand = () => {
      const k = skel();
      return toWorld(k.sx + Math.cos(sm.arm) * 28, k.sy + Math.sin(sm.arm) * 28);
    };
    // Two-bone inverse kinematics: returns the joint (elbow/knee) and the reachable end point.
    function ik(x0, y0, x1, y1, l1, l2, side) {
      const a = Math.atan2(y1 - y0, x1 - x0),
        d = clamp(Math.hypot(x1 - x0, y1 - y0), 4, l1 + l2 - 0.5),
        k = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
      return [
        x0 + Math.cos(a + side * k) * l1,
        y0 + Math.sin(a + side * k) * l1,
        x0 + Math.cos(a) * d,
        y0 + Math.sin(a) * d,
      ];
    }
    function drawHeld(hx, hy) {
      c.save();
      c.translate(hx, hy);
      c.rotate(sm.arm);
      switch (sm.held) {
        case "gun":
          c.fillStyle = "#333";
          c.fillRect(-4, -5, 20, 8);
          c.fillRect(-4, 0, 7, 10);
          break;
        case "mg":
          c.fillStyle = "#333";
          c.fillRect(-8, -6, 32, 9);
          c.fillStyle = "#c33";
          circle(2, 10, 7);
          break;
        case "launcher":
          c.fillStyle = "#4a7c59";
          c.fillRect(-14, -8, 40, 13);
          c.fillStyle = "#222";
          c.fillRect(24, -10, 5, 17);
          break;
        case "bomb":
          c.fillStyle = INK;
          circle(8, 0, 10);
          c.strokeStyle = "#ff7b00";
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(8, -9);
          c.lineTo(12, -16);
          c.stroke();
          break;
        case "hammer":
          c.strokeStyle = "#8b5a2b";
          c.lineWidth = 6;
          c.beginPath();
          c.moveTo(0, 0);
          c.lineTo(38, 0);
          c.stroke();
          c.fillStyle = "#777";
          c.fillRect(30, -17, 24, 34);
          c.fillStyle = "#aaa";
          c.fillRect(30, -17, 24, 8);
          break;
        case "orb":
          c.shadowColor = sm.orbCol;
          c.shadowBlur = 22;
          c.fillStyle = sm.orbCol;
          circle(12, 0, sm.orb);
          c.fillStyle = "#fff";
          circle(12, 0, sm.orb * 0.5);
          break;
      }
      c.restore();
    }
    function drawMan(t) {
      const ph = sm.walk,
        mv = sm.moving ? 1 : 0,
        step = Math.sin(ph),
        k = skel();
      const bounce = mv ? Math.abs(Math.cos(ph)) * 4 : Math.sin(t / 350) * 1.2,
        tuck = clamp(sm.jy, 0, 60) * 0.4;
      c.save();
      c.translate(clamp(sm.x, 20, W - 20), clamp(sm.y, 90, H - 4) - sm.jy);
      c.scale(
        sm.dir * sm.sx * (1 + 0.04 * Math.sin(ph * 2) * mv),
        sm.sy * (1 - 0.04 * Math.sin(ph * 2) * mv),
      );
      c.rotate(sm.lean);
      c.translate(0, -bounce);
      c.lineCap = c.lineJoin = "round";
      c.lineWidth = 5;
      c.shadowColor = "transparent";
      const limb = (x0, y0, x1, y1, l1, l2, side, col) => {
        const j = ik(x0, y0, x1, y1, l1, l2, side);
        c.strokeStyle = col;
        c.beginPath();
        c.moveTo(x0, y0);
        c.lineTo(j[0], j[1]);
        c.lineTo(j[2], j[3]);
        c.stroke();
        return j;
      };
      // legs: feet follow a walk cycle, lift when walking, tuck when airborne; knees bend forward
      for (const s of [-1, 1]) {
        const q = ph + (s > 0 ? 0 : Math.PI),
          fx = mv ? Math.sin(q) * 17 : s * 8,
          fy = -(mv ? Math.max(0, Math.cos(q)) * 9 : 0) - tuck,
          col = s > 0 ? INK : "#5a6090";
        const j = limb(k.hx, k.hy, fx, fy, 18, 18, -1, col);
        c.beginPath();
        c.moveTo(j[2], j[3]);
        c.lineTo(j[2] + 7, j[3]);
        c.stroke();
      }
      // torso
      c.strokeStyle = INK;
      c.beginPath();
      c.moveTo(k.hx, k.hy);
      c.lineTo(k.sx, k.sy);
      c.stroke();
      // back arm: swings, or steadies the weapon with two hands
      const fh = { x: k.sx + Math.cos(sm.arm) * 28, y: k.sy + Math.sin(sm.arm) * 28 },
        two = sm.held === "gun" || sm.held === "mg" || sm.held === "launcher";
      const bt = two
        ? [fh.x - Math.cos(sm.arm) * 13, fh.y - Math.sin(sm.arm) * 13 + 3]
        : mv
          ? [k.sx + Math.cos(1.4 + step * 0.9) * 26, k.sy + Math.sin(1.4 + step * 0.9) * 26]
          : [k.sx + 5 + Math.sin(t / 500) * 1.5, k.sy + 26];
      limb(k.sx, k.sy, bt[0], bt[1], 15, 15, 1, "#5a6090");
      // head: tilts with the body, blinks, grins or shouts while busy
      const hd = { x: k.sx + Math.cos(k.t + sm.head) * 15, y: k.sy + Math.sin(k.t + sm.head) * 15 };
      c.save();
      c.translate(hd.x, hd.y);
      c.rotate(sm.bend * 0.6 + Math.sin(ph * 2) * 0.07 * mv);
      c.fillStyle = "#fff";
      c.strokeStyle = INK;
      c.beginPath();
      c.arc(0, 0, 12, 0, 7);
      c.fill();
      c.stroke();
      c.fillStyle = INK;
      if (t % 3500 < 120) c.fillRect(3, -2, 9, 2);
      else {
        c.fillRect(3, -5, 3, 5);
        c.fillRect(8, -5, 3, 5);
      }
      c.lineWidth = 2;
      c.beginPath();
      if (S.busy) c.ellipse(6, 5, 3, 2.5, 0, 0, 7);
      else c.arc(6, 1, 4, 0.2, 2.9);
      c.stroke();
      c.restore();
      // front arm holds the item and points it where sm.arm says; swings freely while walking
      const ft =
        sm.moving && !sm.held
          ? [k.sx + Math.cos(1.4 - step * 0.9) * 26, k.sy + Math.sin(1.4 - step * 0.9) * 26]
          : [fh.x, fh.y];
      const j = limb(k.sx, k.sy, ft[0], ft[1], 15, 15, 1, INK);
      drawHeld(j[2], j[3]);
      c.restore();
    }

    // ---------- Stickman actions ----------
    function walkTo(x, y, ep) {
      return new Promise((res, rej) => {
        sm.moving = true;
        sm.held = null;
        sm.arm = 0.6;
        (function f() {
          if (ep !== S.ep) return rej(CANCEL);
          const dx = x - sm.x,
            dy = y - sm.y,
            d = Math.hypot(dx, dy);
          if (d < 6) {
            sm.moving = false;
            return res();
          }
          const sp = Math.min(d, 8);
          sm.x += (dx / d) * sp;
          sm.y += (dy / d) * sp;
          if (Math.abs(dx) > 4) sm.dir = dx > 0 ? 1 : -1;
          sm.walk += 0.35;
          requestAnimationFrame(f);
        })();
      });
    }
    async function armTo(a, ms, ep) {
      const a0 = sm.arm;
      await tween(ms, (p) => (sm.arm = a0 + (a - a0) * ease(p)), ep);
    }
    async function aimAt(I, ep) {
      sm.dir = I.x >= sm.x ? 1 : -1;
      const sh = shoulderW();
      await armTo(Math.atan2(I.y - sh.y, (I.x - sh.x) * sm.dir), 250, ep);
    }
    const antic = (ep) =>
      tween(
        180,
        (p) => {
          sm.lean = -0.12 * ease(p);
          sm.bend = -0.3 * ease(p);
          sm.crouch = 0.6 * ease(p);
        },
        ep,
      );
    function kick() {
      tween(
        180,
        (p) => {
          sm.lean = -0.12 * (1 - p) + 0.1 * Math.sin(p * Math.PI);
          sm.bend = -0.3 * (1 - p) + 0.3 * Math.sin(p * Math.PI);
        },
        S.ep,
      ).catch(() => {});
    }
    async function fly(a, b, ms, ep, o = {}) {
      const ob = {
        x: a.x,
        y: a.y,
        px: a.x,
        py: a.y,
        p: 0,
        a: 0,
        draw() {
          o.draw && o.draw(this);
        },
      };
      OBJ.add(ob);
      try {
        await tween(
          ms,
          (p) => {
            ob.px = ob.x;
            ob.py = ob.y;
            ob.p = p;
            ob.x = a.x + (b.x - a.x) * p;
            ob.y = a.y + (b.y - a.y) * p - Math.sin(p * Math.PI) * (o.arc || 0);
            ob.a = Math.atan2(ob.y - ob.py, ob.x - ob.px);
            o.step && o.step(ob);
          },
          ep,
        );
      } finally {
        OBJ.delete(ob);
      }
    }
    const bullet = (o) => {
      c.strokeStyle = "#ffd23f";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(o.x, o.y);
      c.lineTo(o.x - Math.cos(o.a) * 16, o.y - Math.sin(o.a) * 16);
      c.stroke();
      c.fillStyle = "#fff";
      circle(o.x, o.y, 3);
    };
    function addDamage(e, weapon) {
      const r = e.getBoundingClientRect();
      SCARS.push({
        x: r.left + r.width / 2,
        y: scrollY + r.top + r.height / 2,
        type: weapon,
        points: Array.from({ length: weapon === "machine" ? 4 : 2 }, () => ({
          x: R(-Math.max(4, r.width / 3), Math.max(4, r.width / 3)),
          y: R(-Math.max(3, r.height / 2), Math.max(3, r.height / 2)),
          r: R(2, 4),
        })),
      });
      if (SCARS.length > 120) SCARS.splice(0, SCARS.length - 120);
    }
    function drawScars() {
      SCARS.forEach((scar) => {
        const y = scar.y - scrollY;
        if (y < -45 || y > H + 45) return;
        c.save();
        c.translate(scar.x, y);
        if (scar.type === "pistol" || scar.type === "machine") {
          scar.points.forEach((p) => {
            c.fillStyle = "rgba(24,20,22,.78)";
            circle(p.x, p.y, p.r + 1.5);
            c.fillStyle = "rgba(5,5,8,.95)";
            circle(p.x, p.y, p.r);
            c.strokeStyle = "rgba(255,255,255,.35)";
            c.lineWidth = 1;
            c.beginPath();
            c.arc(p.x - 1, p.y - 1, p.r, Math.PI, Math.PI * 1.6);
            c.stroke();
          });
        } else if (["bomb", "rocket", "fireball", "meteor"].includes(scar.type)) {
          c.fillStyle = "rgba(35,24,20,.56)";
          c.beginPath();
          c.ellipse(0, 0, 15, 9, -0.2, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = "rgba(255,111,24,.78)";
          circle(-2, 0, 5);
          c.fillStyle = "rgba(255,219,88,.9)";
          circle(0, -1, 2.2);
        } else if (scar.type === "lightning") {
          c.strokeStyle = "rgba(255,230,91,.95)";
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(-3, -15); c.lineTo(3, -5); c.lineTo(-2, -2);
          c.lineTo(5, 8); c.lineTo(1, 15);
          c.moveTo(-2, -2); c.lineTo(-9, 3);
          c.moveTo(3, -5); c.lineTo(10, -10);
          c.stroke();
        } else if (scar.type === "hammer") {
          c.strokeStyle = "rgba(45,35,35,.82)";
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(0, 0); c.lineTo(-8, -9); c.lineTo(-12, -13);
          c.moveTo(-8, -9); c.lineTo(-4, -14);
          c.moveTo(0, 0); c.lineTo(8, 7); c.lineTo(13, 10);
          c.moveTo(8, 7); c.lineTo(10, 13);
          c.stroke();
        } else if (scar.type === "laser") {
          c.strokeStyle = "rgba(255,55,121,.85)";
          c.shadowColor = "#ff3979";
          c.shadowBlur = 8;
          c.lineWidth = 4;
          c.beginPath(); c.moveTo(-14, 0); c.lineTo(14, 0); c.stroke();
        } else if (scar.type === "eraser") {
          c.strokeStyle = "rgba(255,255,255,.8)";
          c.lineWidth = 7;
          c.beginPath(); c.moveTo(-14, 2); c.lineTo(14, -2); c.stroke();
        } else {
          c.fillStyle = "rgba(35,28,30,.58)";
          circle(0, 0, 8);
        }
        c.restore();
      });
    }
    async function shakeEl(e, ms, amp, ep) {
      await tween(
        ms,
        (p) => {
          const a = amp * (1 - p);
          e.style.transform = `translate(${R(-a, a)}px,${R(-a, a)}px) rotate(${R(-a, a) / 6}deg)`;
        },
        ep,
      );
      e.style.transform = "";
    }

    // ---------- Destroying a target ----------
    function destroy(e, o = {}) {
      const r = e.getBoundingClientRect(),
        txt = e.textContent.replace(/\s+/g, ""),
        col = getComputedStyle(e).color,
        cols = o.cols || [col, col, ...PAL];
      const n = clamp(((r.width * r.height) / 400) | 0, 20, 40);
      for (let i = 0; i < (o.quiet ? 5 : n); i += 10)
        burst(R(r.left, r.right), R(r.top, r.bottom), o.quiet ? 5 : 10, {
          cols,
          types: ["txt", "sq", "circ"],
          ch: txt,
          sp: [1, 7],
          g: 0.3,
          r: [4, 9],
        });
      if (!o.quiet || o.damage) addDamage(e, o.damage || S.weapon);
      if (o.smoke && !o.quiet)
        burst(r.left + r.width / 2, r.top + r.height / 2, 12, {
          cols: ["#999", "#ccc"],
          types: ["smoke"],
          sp: [0.5, 2.5],
          g: -0.05,
          r: [8, 16],
          life: [0.8, 1.5],
        });
      e.classList.remove("td-hl");
      e.style.visibility = "hidden";
      e.style.transform = e.style.clipPath = e.style.opacity = e.style.filter = "";
      e.dataset.dead = 1;
      S.destroyed++;
      hud();
      if (!o.quiet) {
        addCombo();
        sfx("pop");
        if (Math.random() < 0.5) msg("TEXT DESTROYED");
      }
    }

    // ---------- Weapons: each is an async choreography ----------
    const A = {
      async pistol(e, I, r, ep) {
        sm.held = "gun";
        await aimAt(I, ep);
        await antic(ep);
        const h = hand();
        muzzle(h);
        sfx("shot");
        kick();
        await fly(h, I, 170, ep, { draw: bullet });
        sfx("hit");
        burst(I.x, I.y, 10, { cols: ["#ffd23f", "#fff"], types: ["spark"], sp: [3, 8] });
        await shakeEl(e, 320, 9, ep);
        destroy(e);
      },
      async machine(e, I, r, ep) {
        sm.held = "mg";
        await aimAt(I, ep);
        await antic(ep);
        for (let i = 0; i < 11; i++) {
          const h = hand(),
            t = { x: I.x + R(-14, 14), y: I.y + R(-8, 8) };
          muzzle(h);
          sfx("shot");
          fly(h, t, 110, ep, { draw: bullet })
            .then(() => {
              burst(t.x, t.y, 4, { cols: ["#ffd23f", "#fff"], types: ["spark"], sp: [2, 6] });
              fx(80, (p) => {
                c.fillStyle = "#fff";
                circle(t.x, t.y, 10 * (1 - p));
              });
            })
            .catch(() => {});
          e.style.transform = `translate(${R(-5, 5)}px,${R(-3, 3)}px)`;
          sm.lean = -0.2 + R(0, 0.06);
          await wait(70, ep);
        }
        e.style.transform = "";
        kick();
        burst(I.x, I.y, 20, { cols: FIRE, types: ["spark"], sp: [3, 9] });
        await wait(120, ep);
        destroy(e);
      },
      async bomb(e, I, r, ep) {
        sm.held = "bomb";
        await armTo(-2.2, 220, ep);
        await wait(120, ep);
        sfx("whoosh");
        armTo(0.2, 150, ep).catch(() => {});
        const h = hand();
        sm.held = null;
        await fly(h, I, 650, ep, {
          arc: 150,
          draw: (o) => {
            c.save();
            c.translate(o.x, o.y);
            c.rotate(o.p * 12);
            c.fillStyle = INK;
            circle(0, 0, 10);
            c.fillStyle = "#ff7b00";
            circle(0, -11, 3);
            c.restore();
          },
        });
        boom(I.x, I.y, 1.3);
        destroy(e, { smoke: 1 });
      },
      async rocket(e, I, r, ep) {
        sm.held = "launcher";
        await aimAt(I, ep);
        await antic(ep);
        const h = hand();
        muzzle(h);
        sfx("whoosh");
        kick();
        await fly(h, I, 650, ep, {
          draw: (o) => {
            c.save();
            c.translate(o.x, o.y);
            c.rotate(o.a);
            c.fillStyle = "#e33";
            c.fillRect(-14, -5, 26, 10);
            c.fillStyle = "#fff";
            c.beginPath();
            c.moveTo(12, -5);
            c.lineTo(22, 0);
            c.lineTo(12, 5);
            c.fill();
            c.fillStyle = "#ffd23f";
            circle(-16, 0, 6);
            c.restore();
          },
          step: (o) =>
            burst(o.x, o.y, 2, {
              cols: ["#ccc", "#eee"],
              types: ["smoke"],
              sp: [0.2, 1],
              g: -0.02,
              r: [6, 12],
              life: [0.5, 1],
            }),
        });
        boom(I.x, I.y, 1.7);
        shake(24);
        destroy(e, { smoke: 1 });
      },
      async laser(e, I, r, ep) {
        sm.held = "orb";
        sm.orbCol = "#7df9ff";
        await aimAt(I, ep);
        sfx("charge");
        await tween(
          600,
          (p) => {
            sm.orb = 3 + p * 10;
            sm.lean = -0.1 * p;
            if (Math.random() < 0.4) {
              const h = hand();
              burst(h.x + R(-25, 25), h.y + R(-25, 25), 1, {
                cols: ["#7df9ff"],
                types: ["circ"],
                g: 0,
                sp: [0, 0.5],
                r: [2, 4],
                life: [0.2, 0.4],
              });
            }
          },
          ep,
        );
        sfx("laser");
        flash(0.4);
        const h = hand();
        fx(500, (p) => {
          c.save();
          c.shadowColor = "#7df9ff";
          c.shadowBlur = 30;
          c.strokeStyle = "rgba(125,249,255,.9)";
          c.lineWidth = 14 * (1 - p * 0.5);
          c.beginPath();
          c.moveTo(h.x, h.y);
          c.lineTo(I.x, I.y);
          c.stroke();
          c.strokeStyle = "#fff";
          c.lineWidth = 5;
          c.stroke();
          c.restore();
        });
        await tween(
          500,
          (p) => {
            e.style.opacity = 1 - p;
            e.style.filter = `blur(${p * 3}px) brightness(${1 + p * 2})`;
            if (Math.random() < 0.7)
              burst(R(r.left, r.right), R(r.top, r.bottom), 2, {
                cols: ["#7df9ff", "#fff", "#b8fff0"],
                types: ["circ", "spark"],
                g: -0.05,
                sp: [0.5, 3],
              });
          },
          ep,
        );
        sm.orb = 0;
        destroy(e, { cols: ["#7df9ff", "#fff", "#b8fff0"] });
      },
      async hammer(e, I, r, ep) {
        sm.held = "hammer";
        await armTo(-2.2, 260, ep);
        await wait(120, ep);
        await tween(180, (p) => (sm.crouch = p), ep);
        await tween(
          260,
          (p) => {
            sm.jy = 70 * Math.sin((p * Math.PI) / 2);
            sm.sy = 1 + 0.1 * p;
            sm.crouch = 1 - p;
            sm.bend = -0.3 * p;
          },
          ep,
        );
        sm.sy = 1;
        sfx("whoosh");
        await tween(
          170,
          (p) => {
            sm.arm = -2.2 + 3.4 * p * p;
            sm.jy = 70 * (1 - p * p);
            sm.bend = -0.3 + 0.7 * p;
          },
          ep,
        );
        sm.jy = 0;
        sm.crouch = 1;
        sfx("thud");
        shake(16);
        const hx = sm.x + sm.dir * 55;
        ring(hx, sm.y, 160, "#fff", 450, 10);
        ring(I.x, I.y, 90, "#ffc93c", 400, 6);
        burst(hx, sm.y, 14, {
          cols: ["#888", "#ccc"],
          types: ["smoke"],
          sp: [1, 4],
          g: -0.03,
          r: [6, 12],
        });
        await tween(
          240,
          (p) => {
            e.style.transform = `scale(${1 + 0.3 * p},${1 - 0.75 * p}) translate(${R(-4, 4)}px,0)`;
          },
          ep,
        );
        destroy(e);
      },
      async fireball(e, I, r, ep) {
        sm.held = "orb";
        sm.orbCol = "#ff7b00";
        sm.orb = 4;
        await aimAt(I, ep);
        await tween(350, (p) => (sm.orb = 4 + 9 * p), ep);
        sfx("whoosh");
        kick();
        const h = hand();
        sm.held = null;
        sm.orb = 0;
        await fly(h, I, 520, ep, {
          draw: (o) => {
            c.save();
            c.shadowColor = "#ff7b00";
            c.shadowBlur = 30;
            c.fillStyle = "#ff7b00";
            circle(o.x, o.y, 15);
            c.fillStyle = "#ffd23f";
            circle(o.x, o.y, 8);
            c.restore();
          },
          step: (o) =>
            burst(o.x, o.y, 3, {
              cols: FIRE,
              types: ["circ"],
              sp: [0.3, 2],
              g: -0.08,
              r: [3, 8],
              life: [0.3, 0.6],
            }),
        });
        sfx("boom");
        ring(I.x, I.y, 80, "#ff7b00", 350);
        shake(10);
        await tween(
          650,
          (p) => {
            e.style.opacity = 1 - p;
            e.style.filter = `sepia(1) brightness(${1 - p * 0.6})`;
            e.style.transform = `translate(${R(-2, 2)}px,${-p * 6}px)`;
            if (Math.random() < 0.8)
              burst(R(r.left, r.right), R(r.top, r.bottom), 3, {
                cols: FIRE,
                types: ["circ", "spark"],
                g: -0.12,
                sp: [0.3, 2],
                r: [2, 6],
              });
            if (Math.random() < 0.3)
              burst(I.x, r.top, 1, { cols: ["#777"], types: ["smoke"], g: -0.06, r: [8, 14] });
          },
          ep,
        );
        destroy(e, { smoke: 1, cols: FIRE });
      },
      async lightning(e, I, r, ep) {
        sm.held = null;
        await armTo(-1.4, 250, ep);
        await wait(150, ep);
        sfx("zap");
        flash(0.9);
        shake(16);
        let pts = [];
        const bolt = () => {
          pts = [[I.x + R(-30, 30), -10]];
          for (let y = 30; y < I.y; y += R(30, 60)) pts.push([I.x + R(-35, 35) * (1 - y / I.y), y]);
          pts.push([I.x, I.y]);
        };
        bolt();
        fx(350, (p) => {
          if (Math.random() < 0.5) bolt();
          c.save();
          c.globalAlpha = 1 - p * 0.6;
          c.shadowColor = "#ffe066";
          c.shadowBlur = 25;
          c.strokeStyle = "#fff";
          c.lineWidth = 6 * (1 - p * 0.5);
          c.beginPath();
          pts.forEach((q, i) => (i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
          c.stroke();
          c.restore();
        });
        burst(I.x, I.y, 16, { cols: ["#ffe066", "#fff"], types: ["spark"], sp: [3, 10] });
        await shakeEl(e, 420, 11, ep);
        destroy(e, { cols: ["#ffe066", "#fff", "#7df9ff"] });
      },
      async eraser(e, I, r, ep) {
        sm.held = null;
        await armTo(-0.3, 200, ep);
        sfx("wipe");
        const hh = r.height + 24,
          xAt = (p) => r.left - 30 + (r.width + 60) * p;
        fx(820, (p) => {
          c.save();
          c.translate(xAt(p), I.y);
          c.rotate(-0.12);
          c.fillStyle = "#ff9ecb";
          c.fillRect(-28, -hh / 2, 56, hh);
          c.fillStyle = "#4d7cff";
          c.fillRect(-28, -hh / 2, 20, hh);
          c.strokeStyle = INK;
          c.lineWidth = 3;
          c.strokeRect(-28, -hh / 2, 56, hh);
          c.restore();
        });
        await tween(
          800,
          (p) => {
            e.style.clipPath = `inset(0 0 0 ${clamp(((xAt(p) - r.left) / r.width) * 100, 0, 100)}%)`;
            if (Math.random() < 0.6)
              burst(xAt(p), I.y + R(-hh / 2, hh / 2), 2, {
                cols: ["#fff", "#ffd1e6", "#ddd"],
                types: ["sq", "circ"],
                sp: [0.5, 3],
                g: 0.3,
                r: [2, 5],
              });
          },
          ep,
        );
        destroy(e);
      },
      async meteor(e, I, r, ep) {
        sm.held = null;
        await armTo(-1.2, 250, ep);
        sfx("whoosh");
        await fly({ x: I.x + W * 0.35, y: -80 }, I, 700, ep, {
          draw: (o) => {
            c.save();
            c.shadowColor = "#ff7b00";
            c.shadowBlur = 40;
            c.strokeStyle = "rgba(255,123,0,.6)";
            c.lineWidth = 30;
            c.lineCap = "round";
            c.beginPath();
            c.moveTo(o.x, o.y);
            c.lineTo(o.x + Math.cos(o.a + Math.PI) * 120, o.y + Math.sin(o.a + Math.PI) * 120);
            c.stroke();
            c.fillStyle = "#7a4b2a";
            circle(o.x, o.y, 28);
            c.fillStyle = "#ffd23f";
            circle(o.x + 6, o.y + 6, 12);
            c.restore();
          },
          step: (o) =>
            burst(o.x, o.y, 2, {
              cols: FIRE,
              types: ["circ", "smoke"],
              sp: [0.3, 2],
              g: -0.02,
              r: [6, 14],
              life: [0.4, 0.9],
            }),
        });
        boom(I.x, I.y, 2.4);
        ring(I.x, I.y, 240, "#ffd23f", 600, 10);
        shake(28);
        destroy(e, { smoke: 1 });
      },
    };

    // ---------- Attack orchestration ----------
    async function attack(e, key, ep) {
      if (key === "random") key = pick(KEYS);
      S.weapon = key;
      const rr0 = e.getBoundingClientRect();
      if (rr0.top < 70 || rr0.bottom > H - 70) {
        e.scrollIntoView({ block: "center", behavior: S.reduce ? "auto" : "smooth" });
        await wait(S.reduce ? 40 : 480, ep);
      }
      e.style.display = "inline-block"; // lets the word shake, squash and burn on its own
      e.classList.add("td-hl");
      msg(Math.random() < 0.5 ? "TARGET ACQUIRED" : "STICKMAN READY");
      sfx("pop");
      let r = e.getBoundingClientRect();
      const left = r.left > 90 || r.right > W - 90;
      await walkTo(
        clamp(left ? r.left - 46 : r.right + 46, 30, W - 30),
        clamp(r.top + r.height / 2 + 40, 100, H - 8),
        ep,
      );
      r = e.getBoundingClientRect();
      sm.dir = left ? 1 : -1;
      const I = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      await wait(150, ep);
      await A[key](e, I, r, ep);
      sm.held = null;
      const a0 = sm.arm,
        l0 = sm.lean,
        b0 = sm.bend,
        c0 = sm.crouch; // recovery pose
      await tween(
        320,
        (p) => {
          const q = ease(p);
          sm.arm = a0 + (0.5 - a0) * q;
          sm.sy = 1 - 0.06 * Math.sin(p * Math.PI);
          sm.lean = l0 * (1 - q);
          sm.bend = b0 * (1 - q);
          sm.crouch = c0 * (1 - q);
        },
        ep,
      );
      sm.sy = 1;
      sm.lean = sm.bend = sm.crouch = 0;
    }
    async function one(key, target) {
      wrapVisibleText();
      const list = onScreen();
      if (!list.length) {
        msg("ALL CLEAR!");
        return false;
      }
      const ep = S.ep,
        e = target || pick(list);
      S.busy = true;
      try {
        await attack(e, key, ep);
      } catch (x) {
        if (x !== CANCEL) console.error(x);
      } finally {
        if (ep === S.ep) {
          S.busy = false;
          sm.held = null;
          sm.lean = sm.bend = sm.crouch = 0;
          sm.sx = sm.sy = 1;
          sm.jy = 0;
          e.classList.remove("td-hl");
        }
      }
      return ep === S.ep;
    }
    async function series(getKey, cond) {
      // runs attacks back to back; ends on Reset / Stop / no targets
      if (S.busy || S.auto) return;
      S.auto = true;
      const ep = S.ep;
      msg("CHAOS MODE");
      while (ep === S.ep && cond()) {
        wrapVisibleText();
        if (!onScreen().length) {
          if (atBottom()) break;
          const y0 = scrollY;
          scrollBy({ top: H * 0.8, behavior: S.reduce ? "auto" : "smooth" });
          await wait(650, ep).catch(() => {});
          if (Math.abs(scrollY - y0) < 2) break;
          continue;
        }
        if (!(await one(getKey(), S.splash ? nearest() : undefined))) break;
        await wait(350, ep).catch(() => {});
      }
      if (ep === S.ep) {
        S.auto = false;
        S.chaos = false;
        $("#chaos").checked = false;
        $("#stop").style.display = "none";
      }
    }
    async function destroyAllBarrage() {
      if (S.busy || S.auto) return;
      S.busy = S.auto = true;
      S.splash = true;
      const ep = S.ep;
      let index = 0;
      msg("FULL ARSENAL!");
      try {
        while (ep === S.ep) {
          wrapVisibleText();
          const batch = onScreen();
          if (!batch.length) {
            if (atBottom()) break;
            const y0 = scrollY;
            scrollBy({ top: H * 0.78, behavior: S.reduce ? "auto" : "smooth" });
            await wait(600, ep);
            if (Math.abs(scrollY - y0) < 2) break;
            continue;
          }
          batch.forEach((e) => {
            const key = KEYS[index++ % KEYS.length];
            const r = e.getBoundingClientRect();
            const x = r.left + r.width / 2;
            const y = r.top + r.height / 2;
            const icon = WEAPON_ICONS[key];
            e.style.display = "inline-block";
            e.classList.add("td-hl");
            S.weapon = key;
            if (index <= 90) {
              fx(390, (p) => {
                c.save();
                c.globalAlpha = 1 - p;
                c.font = "22px sans-serif";
                c.textAlign = "center";
                c.fillText(icon, x + (sm.x - x) * (1 - p), y + (sm.y - y) * (1 - p));
                c.restore();
              });
            }
          });
          await wait(390, ep);
          batch.forEach((e, i) => {
            if (!e.isConnected || e.dataset.dead) return;
            const key = KEYS[(index - batch.length + i) % KEYS.length];
            destroy(e, {
              damage: key,
              smoke: ["bomb", "rocket", "fireball", "meteor"].includes(key),
            });
          });
          await wait(220, ep);
          if (atBottom()) break;
          const y0 = scrollY;
          scrollBy({ top: H * 0.78, behavior: S.reduce ? "auto" : "smooth" });
          await wait(600, ep);
          if (Math.abs(scrollY - y0) < 2) break;
        }
      } catch (error) {
        if (error !== CANCEL) console.error(error);
      } finally {
        if (ep === S.ep) {
          S.busy = S.auto = S.splash = false;
          msg("ALL CLEAR!");
        }
      }
    }
    function reset() {
      S.ep++;
      S.busy = S.auto = S.chaos = S.splash = false;
      S.weapon = sel.value;
      $("#chaos").checked = false;
      $("#stop").style.display = "none";
      OBJ.clear();
      P.length = 0;
      SCARS.length = 0;
      S.shake = S.flash = S.destroyed = S.combo = 0;
      els.forEach((e) => {
        e.style.visibility =
          e.style.transform =
          e.style.clipPath =
          e.style.opacity =
          e.style.filter =
            "";
        e.classList.remove("td-hl");
        delete e.dataset.dead;
        e.style.display = "";
      });
      $("#msgs").innerHTML = "";
      $("#combo").className = "";
      home();
      hud();
    }

    // ---------- Main loop ----------
    let last = performance.now();
    function loop(now) {
      if (S.dead) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      c.clearRect(0, 0, W, H);
      let ox = 0,
        oy = 0;
      if (S.shake > 0.4) {
        ox = R(-1, 1) * S.shake;
        oy = R(-1, 1) * S.shake;
        S.shake *= 0.88;
      } else S.shake = 0;
      c.save();
      c.translate(ox, oy);
      if (!S.busy && !S.auto) {
        // player control: WASD / arrows
        const dx = (K.right ? 1 : 0) - (K.left ? 1 : 0),
          dy = (K.down ? 1 : 0) - (K.up ? 1 : 0);
        sm.moving = !!(dx || dy);
        if (sm.moving) {
          const n = Math.hypot(dx, dy);
          sm.x = clamp(sm.x + (dx / n) * 4.5, 25, W - 25);
          sm.y = clamp(sm.y + (dy / n) * 4.5, 100, H - 8);
          if (dx) sm.dir = dx;
          sm.walk += 0.3;
          sm.arm = 0.6;
        }
      }
      OBJ.forEach((o) => o.draw());
      drawParticles(dt);
      drawScars();
      drawMan(now);
      c.restore();
      if (S.flash > 0.02) {
        c.fillStyle = `rgba(255,255,255,${S.flash})`;
        c.fillRect(0, 0, W, H);
        S.flash *= 0.86;
      }
      if (S.combo && now > S.comboEnd) {
        S.combo = 0;
        $("#combo").className = "";
      }
      requestAnimationFrame(loop);
    }

    // ---------- Controls: panel buttons & settings ----------
    addEventListener("pointerdown", unlock);
    $("#bd").onclick = () => {
      if (!S.busy && !S.auto) one(sel.value);
    };
    $("#br").onclick = () => {
      if (!S.busy && !S.auto) one("random");
    };
    $("#ba").onclick = destroyAllBarrage;
    $("#bx").onclick = reset;
    $("#chaos").onchange = (ev) => {
      S.chaos = ev.target.checked;
      $("#stop").style.display = S.chaos ? "block" : "none";
      if (S.chaos)
        series(
          () => "random",
          () => S.chaos,
        );
    };
    $("#stop").onclick = () => {
      S.chaos = false;
      $("#chaos").checked = false;
      $("#stop").style.display = "none";
    };
    sel.onchange = () => {
      S.weapon = sel.value;
      hud();
      syncWeaponBar();
    };
    $("#mute").onchange = $("#vol").oninput = setVol;
    $("#reduce").checked = S.reduce;
    $("#reduce").onchange = (ev) => (S.reduce = ev.target.checked);
    $("#hx").onclick = () => ($("#hud").style.display = "none");
    $("#tog").onclick = () => {
      const b = $("#pb");
      b.style.display = b.style.display === "none" ? "" : "none";
    };

    // ---------- Controls: keyboard & mouse ----------
    const K = { left: 0, right: 0, up: 0, down: 0 },
      MOVE = {
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
      };
    const typing = (t) => {
      if (t === host) t = root.activeElement || t;
      return !!t.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName);
    };
    function nearest() {
      // closest living target that is on screen (falls back to any)
      const pool = onScreen();
      let best = null,
        bd = 1e9;
      pool.forEach((e) => {
        const r = e.getBoundingClientRect(),
          d = Math.hypot(r.left + r.width / 2 - sm.x, r.top + r.height / 2 - sm.y);
        if (d < bd) {
          bd = d;
          best = e;
        }
      });
      return best;
    }
    addEventListener("keydown", (ev) => {
      if (typing(ev.target) || ev.ctrlKey || ev.metaKey) return;
      const k = ev.key.toLowerCase();
      if (MOVE[k] || k === " " || k === "f" || /^[0-9]$/.test(k)) ev.stopImmediatePropagation();
      if (MOVE[k]) {
        K[MOVE[k]] = 1;
        ev.preventDefault();
      } else if (k === " " || k === "f") {
        ev.preventDefault();
        if (root.activeElement) root.activeElement.blur();
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        if (!S.busy && !S.auto) one(sel.value, nearest());
      } else if (/^[0-9]$/.test(k)) {
        const w = k === "0" ? "random" : KEYS[+k - 1];
        if (w) {
          sel.value = w;
          hud();
          syncWeaponBar();
          msg(WEAPONS[w].toUpperCase());
        }
      }
    });
    addEventListener("keyup", (ev) => {
      const k = MOVE[ev.key.toLowerCase()];
      if (k) K[k] = 0;
    });
    addEventListener("blur", () => {
      K.left = K.right = K.up = K.down = 0;
    });
    addEventListener("click", (ev) => {
      // click text = attack it; click empty space = walk there
      if (ev.composedPath().includes(host)) return;
      const t = ev.target.closest && ev.target.closest(".td-w");
      if (S.busy || S.auto) {
        if (t) {
          ev.preventDefault();
          ev.stopImmediatePropagation();
        }
        return;
      }
      if (t && !t.dataset.dead) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        one(sel.value, t);
        return;
      }
      const ep = S.ep;
      S.busy = true;
      walkTo(clamp(ev.clientX, 25, W - 25), clamp(ev.clientY + 40, 100, H - 8), ep)
        .catch(() => {})
        .finally(() => {
          if (ep === S.ep) S.busy = false;
        });
    });

    // ---------- Boot ----------
    // panel controls give up keyboard focus after use so WASD / Space keep working
    root.addEventListener("change", (ev) => {
      if (ev.target.type !== "range") ev.target.blur();
    });
    function quit() {
      // remove the toy and put the page's text back exactly as it was
      S.dead = true;
      S.ep++;
      ctl.abort();
      try {
        ac && ac.close();
      } catch (e) {}
      document.querySelectorAll(".td-wrap").forEach((w) => w.replaceWith(w.textContent));
      els.forEach((e) => e.isConnected && e.replaceWith(e.textContent));
      host.remove();
      pageStyle.remove();
      delete window.__textDestroyer;
    }
    window.__textDestroyer = { quit };
    $("#quit").onclick = quit;
    let scrollTimer;
    addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(wrapVisibleText, 150);
    });
    wrapVisibleText();
    home();
    hud();
    requestAnimationFrame(loop);
  
})();