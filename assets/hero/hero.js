/* ============================================================================
   Particle figure — plain canvas 2D, zero dependencies.

   A 3D point cloud (sampled off a mesh surface) rotates slowly on its Y axis
   while loose particles pour out of the intro card and merge into it. As the
   page scrolls the figure moves into the right margin and morphs from one
   pose to the next: the same particles simply re-target, so each change reads
   as the cloud reassembling rather than a cut.

   TO CHANGE THE FIGURES: edit the numbers in MESH_URLS below.
   All 14 live in files/lowpoly-people/ (01..14); open contact-sheet.html to
   see them side by side. Anything else can go in mesh/ and be listed here by
   its own path. If none of the listed files load, a procedural placeholder
   head is built in code instead.
   ========================================================================= */

const POSES = '/files/lowpoly-people/';   // where the figure library lives

const CFG = {
  /* Poses in scroll order, shown one after another as the page scrolls.
     Picked off the contact sheet for silhouette variety — upright, crouched,
     arm extended, arm raised — since a point cloud conveys shape and nothing
     else. Swap a number to swap that pose. */
  MESH_URLS  : [POSES + '03_person.obj', POSES + '02_person.obj',
                POSES + '11_person.obj', POSES + '12_person.obj'],
  N_CORE     : 9000,            // points forming the figure
  N_STREAM   : 2200,            // in-flight particles from the card
  SPIN       : 0.16,            // rad/s — slow Y rotation
  START_ANGLE: -0.55,           // radians; -0.55 ≈ three-quarter view
  TILT       : 0.06,            // fixed X tilt
  FOV        : 2.6,             // perspective strength (smaller = wider)
  FILL       : 0.62,            // hero size as a fraction of the short side
  FILL_RAIL  : 0.62,            // size once parked in the right margin
  MORPH_EASE : 0.055,           // lower = slower, more visible re-forming

  /* Glitter. A gentle shimmer across every point, plus rare sharp flares on
     a minority — uniform twinkling reads as noise, while occasional bright
     specks read as sparkle. */
  GLIT_SHIM  : 0.26,            // depth of the continuous shimmer
  GLIT_FRAC  : 0.18,            // share of points that can flare
  GLIT_RATE  : 1.15,            // base flare rate, Hz-ish
  GLIT_GAIN  : 0.80,            // how hard a flare pushes alpha
  GLIT_TONE  : 0.45,            // flare strength before a point turns accent

  /* Orientation fixes for supplied meshes — flip if yours load sideways.
     ROT is applied once at load: [x, y, z] radians. */
  MESH_ROT   : [0, 0, 0],
  MESH_FLIP_Z: false,
};

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ?inspect — head centred and alone, no card, no streamers. Use it to check a
   newly dropped mesh's orientation and framing before judging the full hero. */
const INSPECT = location.search.includes('inspect');
if (INSPECT) document.documentElement.classList.add('inspect');

/* Light is the default; ?dark switches both the CSS and the cloud palette. */
const LIGHT = !location.search.includes('dark');
if (!LIGHT) document.documentElement.classList.add('theme-dark');

/* ------------------------------------------------------------------ utils */
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const smooth = x => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };

/* Piecewise-linear lookup over a [[y, value], ...] table sorted by y. */
function curve(tab, y) {
  if (y <= tab[0][0]) return tab[0][1];
  const last = tab.length - 1;
  if (y >= tab[last][0]) return tab[last][1];
  for (let i = 0; i < last; i++) {
    const a = tab[i], b = tab[i + 1];
    if (y <= b[0]) return a[1] + (b[1] - a[1]) * (y - a[0]) / (b[0] - a[0]);
  }
  return tab[last][1];
}

/* ------------------------------------------------------- placeholder head
   Built as a real triangle mesh (a loft of stacked cross-sections) so it can
   go through exactly the same sampling path as a loaded .obj — including
   per-point surface normals, which are what make the cloud read as a solid. */

/*  Proportions follow a real skull: chin (-.45) to crown (1.04) is the head,
    and it is deeper front-to-back than it is wide, which is what keeps the
    silhouette from reading as a flat egg while it turns.
    y:  -.85 neck base ................................ +1.04 crown          */
const T_W = [[-.85,.170],[-.62,.190],[-.45,.234],[-.30,.325],[-.12,.382],
             [.02,.413],[.16,.440],[.30,.456],[.50,.461],[.72,.428],
             [.90,.336],[1.00,.171]];                       // half width (x)
const T_F = [[-.85,.200],[-.62,.260],[-.45,.420],[-.30,.483],[-.12,.532],
             [.02,.536],[.16,.533],[.30,.549],[.50,.529],[.72,.462],
             [.90,.308],[1.00,.133]];                       // front reach (+z)
const T_B = [[-.85,.280],[-.62,.340],[-.45,.400],[-.30,.462],[-.12,.536],
             [.02,.588],[.16,.630],[.30,.658],[.50,.669],[.72,.616],
             [.90,.462],[1.00,.196]];                       // back reach (-z)
const T_Z = [[-.85,-.120],[-.62,-.070],[-.45,0],[1.00,0]];  // slice z offset

function ringPoint(y, a) {
  const ca = Math.cos(a), sa = Math.sin(a);
  const w = curve(T_W, y);
  let z = (ca >= 0 ? curve(T_F, y) : curve(T_B, y)) * ca + curve(T_Z, y);
  if (ca > 0) {                                   // nose: tight front bump
    const g = Math.exp(-Math.pow((y - 0.015) / 0.115, 2));
    z += 0.160 * g * Math.pow(ca, 6);
  }
  return [w * sa, y, z];
}

function buildPlaceholderHead() {
  const NS = 70, NR = 76, verts = [], tris = [];
  const Y0 = -0.85, Y1 = 1.00;
  for (let i = 0; i < NS; i++) {
    const y = Y0 + ((Y1 - Y0) * i) / (NS - 1);
    for (let j = 0; j < NR; j++) verts.push(ringPoint(y, (j / NR) * Math.PI * 2));
  }
  for (let i = 0; i < NS - 1; i++) {
    for (let j = 0; j < NR; j++) {
      const j2 = (j + 1) % NR;
      const a = i * NR + j, b = i * NR + j2, c = (i + 1) * NR + j, d = (i + 1) * NR + j2;
      tris.push([a, c, d], [a, d, b]);
    }
  }
  const top = verts.push([0, 1.04, 0]) - 1;         // crown cap
  const bot = verts.push([0, Y0, curve(T_Z, Y0)]) - 1;
  for (let j = 0; j < NR; j++) {
    const j2 = (j + 1) % NR;
    tris.push([top, (NS - 1) * NR + j2, (NS - 1) * NR + j]);
    tris.push([bot, j, j2]);
  }
  for (const side of [-1, 1]) ellipsoid(verts, tris, side * 0.430, 0.135, -0.120,
                                        0.036, 0.105, 0.070);   // ears
  return { verts, tris };
}

function ellipsoid(verts, tris, cx, cy, cz, rx, ry, rz) {
  const NU = 16, NV = 12, base = verts.length;
  for (let u = 0; u <= NU; u++) for (let v = 0; v <= NV; v++) {
    const th = (u / NU) * Math.PI * 2, ph = (v / NV) * Math.PI;
    verts.push([cx + rx * Math.sin(ph) * Math.cos(th),
                cy + ry * Math.cos(ph),
                cz + rz * Math.sin(ph) * Math.sin(th)]);
  }
  const S = NV + 1;
  for (let u = 0; u < NU; u++) for (let v = 0; v < NV; v++) {
    const a = base + u * S + v, b = base + (u + 1) * S + v;
    tris.push([a, b, a + 1], [b, b + 1, a + 1]);
  }
}

/* -------------------------------------------------------------- obj parse */
function parseOBJ(text) {
  const verts = [], tris = [], lines = text.split('\n');
  for (const raw of lines) {
    const line = raw.trim();
    if (line.charCodeAt(0) === 118 && line[1] === ' ') {           // "v "
      const p = line.split(/\s+/);
      verts.push([+p[1], +p[2], +p[3]]);
    } else if (line.charCodeAt(0) === 102 && line[1] === ' ') {    // "f "
      const p = line.split(/\s+/), idx = [];
      for (let i = 1; i < p.length; i++) {
        let n = parseInt(p[i], 10);
        if (!isFinite(n)) continue;
        idx.push(n < 0 ? verts.length + n : n - 1);
      }
      for (let i = 2; i < idx.length; i++) tris.push([idx[0], idx[i - 1], idx[i]]);
    }
  }
  if (!verts.length || !tris.length) throw new Error('no geometry in obj');
  return { verts, tris };
}

/* -------------------------------------- area-weighted surface point sample */
function sampleSurface(mesh, N) {
  const { verts, tris } = mesh;
  const cum = new Float64Array(tris.length);
  let total = 0;
  for (let t = 0; t < tris.length; t++) {
    const [i, j, k] = tris[t], A = verts[i], B = verts[j], C = verts[k];
    const ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2];
    const vx = C[0] - A[0], vy = C[1] - A[1], vz = C[2] - A[2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    total += 0.5 * Math.hypot(nx, ny, nz);
    cum[t] = total;
  }
  const pos = new Float32Array(N * 3), nrm = new Float32Array(N * 3);
  for (let s = 0; s < N; s++) {
    const r = Math.random() * total;
    let lo = 0, hi = cum.length - 1;
    while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < r) lo = m + 1; else hi = m; }
    const [i, j, k] = tris[lo], A = verts[i], B = verts[j], C = verts[k];
    let u = Math.random(), v = Math.random();
    if (u + v > 1) { u = 1 - u; v = 1 - v; }
    const ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2];
    const vx = C[0] - A[0], vy = C[1] - A[1], vz = C[2] - A[2];
    pos[s * 3]     = A[0] + ux * u + vx * v;
    pos[s * 3 + 1] = A[1] + uy * u + vy * v;
    pos[s * 3 + 2] = A[2] + uz * u + vz * v;
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const L = Math.hypot(nx, ny, nz) || 1;
    nrm[s * 3] = nx / L; nrm[s * 3 + 1] = ny / L; nrm[s * 3 + 2] = nz / L;
  }
  return { pos, nrm };
}

/* Centre on the bounding box and scale the largest extent to 1. */
function normalizeCloud(cloud) {
  const p = cloud.pos, n = p.length / 3;
  let lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
  for (let i = 0; i < n; i++) for (let a = 0; a < 3; a++) {
    const v = p[i * 3 + a];
    if (v < lo[a]) lo[a] = v;
    if (v > hi[a]) hi[a] = v;
  }
  const c = [0, 1, 2].map(a => (lo[a] + hi[a]) / 2);
  const k = 1 / Math.max(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2], 1e-6);
  for (let i = 0; i < n; i++) for (let a = 0; a < 3; a++) p[i * 3 + a] = (p[i * 3 + a] - c[a]) * k;
  return cloud;
}

function applyMeshRotation(cloud) {
  const [rx, ry, rz] = CFG.MESH_ROT;
  const fz = CFG.MESH_FLIP_Z;
  if (!rx && !ry && !rz && !fz) return cloud;
  const rot = (arr) => {
    for (let i = 0; i < arr.length; i += 3) {
      let x = arr[i], y = arr[i + 1], z = arr[i + 2];
      if (fz) { x = -x; z = -z; }
      let c = Math.cos(rx), s = Math.sin(rx);
      let ty = y * c - z * s, tz = y * s + z * c; y = ty; z = tz;
      c = Math.cos(ry); s = Math.sin(ry);
      let tx = x * c + z * s; tz = -x * s + z * c; x = tx; z = tz;
      c = Math.cos(rz); s = Math.sin(rz);
      tx = x * c - y * s; ty = x * s + y * c; x = tx; y = ty;
      arr[i] = x; arr[i + 1] = y; arr[i + 2] = z;
    }
  };
  rot(cloud.pos); rot(cloud.nrm);
  return cloud;
}

/* Scale every pose by the SAME factor, so a morph reads as one figure
   changing pose rather than the camera zooming between differently-sized
   models. Each is still centred on its own bounding box to stay framed. */
function normalizeTogether(clouds) {
  let k = Infinity;
  const centres = clouds.map(c => {
    const p = c.pos, n = p.length / 3;
    const lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
    for (let i = 0; i < n; i++) for (let a = 0; a < 3; a++) {
      const v = p[i * 3 + a];
      if (v < lo[a]) lo[a] = v;
      if (v > hi[a]) hi[a] = v;
    }
    k = Math.min(k, 1 / Math.max(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2], 1e-6));
    return [0, 1, 2].map(a => (lo[a] + hi[a]) / 2);
  });
  clouds.forEach((c, ci) => {
    const p = c.pos, ctr = centres[ci];
    for (let i = 0; i < p.length / 3; i++)
      for (let a = 0; a < 3; a++) p[i * 3 + a] = (p[i * 3 + a] - ctr[a]) * k;
  });
  return clouds;
}

/* ------------------------------------------------------------------ boot */
async function getClouds() {
  const loaded = [];
  for (const url of CFG.MESH_URLS) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      loaded.push(applyMeshRotation(sampleSurface(parseOBJ(await res.text()), CFG.N_CORE)));
    } catch (_) { /* skip a pose that isn't there rather than failing outright */ }
  }
  if (!loaded.length) {
    return { clouds: [sampleSurface(buildPlaceholderHead(), CFG.N_CORE)].map(c =>
             normalizeTogether([c])[0]), label: 'placeholder mesh' };
  }
  return { clouds: normalizeTogether(loaded),
           label: loaded.length + ' pose' + (loaded.length > 1 ? 's' : '') };
}

getClouds().then(({ clouds, label }) => {
  document.getElementById('src').textContent = label;
  document.getElementById('pcount').textContent = CFG.N_CORE.toLocaleString();
  run(clouds);
});

/* ---------------------------------------------------------------- engine */
function run(clouds) {
  const canvas  = document.getElementById('pc');
  const ctx     = canvas.getContext('2d', { alpha: true });
  const hero    = document.getElementById('hero');
  const panel   = document.querySelector('.intro');
  const column  = document.querySelector('.wrap');
  const mergedEl = document.getElementById('merged');
  const poseEl  = document.getElementById('pose');
  const DPR = Math.min(2, devicePixelRatio || 1);

  const N = CFG.N_CORE;
  const NS = REDUCED ? 0 : CFG.N_STREAM;

  /* active pose; the particles ease toward whichever cloud is current, so
     swapping the reference here is the whole morph */
  let pose = 0;
  let P = clouds[0].pos, NRM = clouds[0].nrm;
  let morph = 0;                       // 1 right after a swap, decays to 0
  function setPose(i) {
    i = clamp(i, 0, clouds.length - 1) | 0;
    if (i === pose) return;
    pose = i; P = clouds[i].pos; NRM = clouds[i].nrm; morph = 1;
    if (poseEl) poseEl.textContent = (i + 1) + '/' + clouds.length;
  }
  if (poseEl) poseEl.textContent = '1/' + clouds.length;

  let NARROW = matchMedia('(max-width:860px)').matches;
  const nCore   = () => NARROW ? Math.floor(N * 0.6) : N;
  const nStream = () => NARROW ? Math.floor(NS * 0.5) : NS;

  /* screen-space state for the core cloud */
  const sx = new Float32Array(N), sy = new Float32Array(N);
  const ease = new Float32Array(N), accent = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    sx[i] = Math.random() * innerWidth;
    sy[i] = Math.random() * innerHeight;
    ease[i] = 0.10 + Math.random() * 0.10;
    accent[i] = Math.random() < 0.055 ? 1 : 0;
  }

  /* glitter state: a phase and rate per point, and a flag for the minority
     that flare. Sampling a sine table rather than calling Math.sin keeps
     this off the hot path — it runs 9000 times a frame. */
  const TAU = Math.PI * 2;
  const LUTN = 1024, LMASK = LUTN - 1, LINV = LUTN / TAU;
  const SINT = new Float32Array(LUTN);
  for (let k = 0; k < LUTN; k++) SINT[k] = 0.5 + 0.5 * Math.sin((k / LUTN) * TAU);
  const twp = new Float32Array(N), tws = new Float32Array(N);
  const spark = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    twp[i] = Math.random() * TAU;
    tws[i] = CFG.GLIT_RATE * (0.45 + Math.random() * 1.7);
    spark[i] = Math.random() < CFG.GLIT_FRAC ? 1 : 0;
  }
  let clock = 0;
  /* projected target of every core point, refreshed each frame */
  const tx = new Float32Array(N), ty = new Float32Array(N);

  /* streamers */
  const gb = new Uint8Array(NS), o1 = new Float32Array(NS), o2 = new Float32Array(NS);
  const tgt = new Int32Array(NS), su = new Float32Array(NS), sv = new Float32Array(NS);
  const sph = new Float32Array(NS), son = new Uint8Array(NS), sdl = new Float32Array(NS);
  for (let i = 0; i < NS; i++) gb[i] = i % 4;
  const ARC = [-74, -27, 27, 74];      // per-band bow, px
  const FRQ = [2.2, 2.6, 2.4, 2.8];    // wiggle cycles per crossing
  let merged = 0;

  function respawn(i, warm) {
    o1[i] = Math.random(); o2[i] = Math.random();
    tgt[i] = Math.floor(Math.random() * nCore());
    sv[i] = 0.0055 + Math.random() * 0.0045;
    sph[i] = Math.random() * Math.PI * 2;
    su[i] = warm ? Math.random() * 0.9 : 0;
    sdl[i] = warm ? 0 : Math.random() * 1.6;
    son[i] = 1;
  }
  for (let i = 0; i < NS; i++) respawn(i, i % 3 !== 0);

  /* layout */
  let W = 0, H = 0, cx = 0, cy = 0, scale = 1;
  let railX = 0, railScale = 1;
  let pL = 0, pR = 0, pT = 0, pB = 0, pW = 0, pH = 0;

  function layout() {
    NARROW = matchMedia('(max-width:860px)').matches && !INSPECT;
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx = INSPECT ? W * 0.5 : (NARROW ? W * 0.5 : W * 0.68);
    cy = NARROW ? H * 0.30 : H * 0.50;
    scale = Math.min(W, H) * (INSPECT ? 0.92 : (NARROW ? 0.52 : CFG.FILL));

    /* Park position: centred in whatever is left of the viewport to the right
       of the content column. Measured rather than hard-coded so it tracks the
       CSS margins instead of duplicating them. */
    const cr = column ? column.getBoundingClientRect().right : W * 0.7;
    const stripW = Math.max(0, W - cr);
    railX = cr + stripW / 2;
    railScale = Math.min(H * CFG.FILL_RAIL, stripW * 1.45);
    refreshPanel();
  }
  function refreshPanel() {
    const r = panel.getBoundingClientRect();
    pL = r.left; pR = r.right; pT = r.top; pB = r.bottom; pW = r.width; pH = r.height;
  }
  /* live spawn origin, read from the card's current rect every frame */
  function spawnXY(i) {
    const g = gb[i];
    if (NARROW) return [pL + ((g + 0.5) / 4) * pW + (o1[i] - 0.5) * pW * 0.22, pT - 6 + o2[i] * 14];
    return [pR - 26 + o2[i] * 40, pT + ((g + 0.5) / 4) * pH + (o1[i] - 0.5) * pH * 0.2];
  }

  addEventListener('resize', layout);

  let mx = 0, my = 0;
  addEventListener('pointermove', e => {
    mx = (e.clientX / innerWidth - 0.5);
    my = (e.clientY / innerHeight - 0.5);
  }, { passive: true });

  /* Tone is chosen by how lit a point is, so the cloud shades like a surface.
     Order is [lit, mid, shadow, accent].

     The two themes invert the relationship between light and ink. On dark, a
     lit point is a bright dot, so alpha rises with light. On light, the cloud
     behaves like graphite on paper: shadow means more ink, so alpha rises as
     light falls. Using the same alpha ramp for both would flatten the light
     theme into a grey haze.

     Styles are prebuilt because setting fillStyle ~9000x a frame is the single
     most expensive thing this renderer could do. */
  const TONES = LIGHT
    ? [[124, 150, 184], [58, 84, 120], [20, 34, 58], [194, 80, 15]]
    : [[226, 238, 252], [130, 190, 230], [70, 110, 160], [255, 178, 107]];
  const ALEV = 16, NTONE = TONES.length;
  const AMAX = LIGHT ? 0.80 : 0.95;
  const STYLE = [];
  for (let t = 0; t < NTONE; t++) for (let a = 0; a < ALEV; a++) {
    const [r, g, b] = TONES[t];
    STYLE.push(`rgba(${r},${g},${b},${((a + 1) / ALEV * AMAX).toFixed(3)})`);
  }
  /* key light: upper-left, slightly toward the viewer */
  const LX = -0.45, LY = 0.55, LZ = 0.70;

  const bucket = new Uint8Array(N + NS);
  const bx = new Float32Array(N + NS), by = new Float32Array(N + NS), bs = new Float32Array(N + NS);
  const counts = new Int32Array(NTONE * ALEV), offs = new Int32Array(NTONE * ALEV + 1);
  const order = new Int32Array(N + NS);

  layout();

  let theta = CFG.START_ANGLE, last = 0, pending = false;
  const req = () => { if (!pending) { pending = true; requestAnimationFrame(frame); } };

  function frame(now) {
    pending = false;
    /* clamped both ways: a tab waking from sleep gives a huge gap, and a
       non-monotonic clock would otherwise drive the easing backwards */
    const dt = last ? clamp((now - last) / 1000, 0, 0.05) : 0.016;
    last = now;

    /* Re-layout whenever the canvas's box changes. A resize listener alone is
       not enough: if the first layout() lands before the canvas has been laid
       out (hidden pane, background tab, collapsed parent) it measures 0x0 and
       no resize event ever follows to correct it. */
    if (canvas.clientWidth !== W || canvas.clientHeight !== H) layout();
    if (!W || !H) { req(); return; }

    if (!REDUCED) theta += CFG.SPIN * dt;
    clock = (clock + dt) % 1000;     // wrapped so the LUT index stays small
    morph = Math.max(0, morph - dt * 0.8);
    refreshPanel();
    ctx.clearRect(0, 0, W, H);

    /* Park progress: 0 while the hero fills the screen, 1 once it is gone.
       The figure slides from the hero position into the right margin and
       stays there for the rest of the page. */
    const hr = hero.getBoundingClientRect();
    const park = INSPECT || NARROW ? 0
               : smooth(clamp(-hr.top / Math.max(1, hr.height * 0.8), 0, 1));

    /* Poses advance with progress through the whole document, so the figure
       changes a handful of times over the scroll rather than per section —
       there are more sections than poses. */
    if (!INSPECT && clouds.length > 1) {
      const doc = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const prog = clamp(scrollY / doc, 0, 0.9999);
      setPose(Math.floor(prog * clouds.length));
    }

    const ccx = cx + (railX - cx) * park;
    const ccy = cy;
    const csc = scale + (railScale - scale) * park;

    /* soft wash behind the figure, seating it in the page; it thins out once
       parked so the margin does not compete with the text column */
    const wash = 1 - park * 0.7;
    const gr = ctx.createRadialGradient(ccx, ccy, 0, ccx, ccy, csc * 0.75);
    if (LIGHT) {
      gr.addColorStop(0, `rgba(150,175,205,${0.20 * wash})`);
      gr.addColorStop(0.55, `rgba(170,190,215,${0.09 * wash})`);
      gr.addColorStop(1, 'rgba(255,255,255,0)');
    } else {
      gr.addColorStop(0, `rgba(60,130,180,${0.17 * wash})`);
      gr.addColorStop(0.55, `rgba(40,80,130,${0.07 * wash})`);
      gr.addColorStop(1, 'rgba(0,0,0,0)');
    }
    ctx.fillStyle = gr;
    ctx.fillRect(ccx - csc, ccy - csc, csc * 2, csc * 2);

    /* ---- project + integrate the core cloud ---- */
    const rotY = theta, tiltX = CFG.TILT + my * 0.16, yaw = mx * 0.22;
    const cyw = Math.cos(rotY + yaw), syw = Math.sin(rotY + yaw);
    const cxt = Math.cos(tiltX), sxt = Math.sin(tiltX);
    const nA = nCore();
    let bn = 0;

    for (let i = 0; i < nA; i++) {
      const i3 = i * 3;
      /* rotate: Y (spin) then X (tilt) */
      let X = P[i3], Y = P[i3 + 1], Z = P[i3 + 2];
      let x1 = X * cyw + Z * syw, z1 = -X * syw + Z * cyw;
      let y2 = Y * cxt - z1 * sxt, z2 = Y * sxt + z1 * cxt;
      const nx = NRM[i3], ny = NRM[i3 + 1], nz = NRM[i3 + 2];
      const nx2 = nx * cyw + nz * syw, nz1 = -nx * syw + nz * cyw;
      const ny2 = ny * cxt - nz1 * sxt, nz2 = ny * sxt + nz1 * cxt;

      const persp = CFG.FOV / (CFG.FOV - z2);
      const px = ccx + x1 * csc * persp;
      const py = ccy - y2 * csc * persp;
      tx[i] = px; ty[i] = py;

      if (REDUCED) { sx[i] = px; sy[i] = py; }
      else {
        /* slow the easing right after a pose swap so the cloud is visibly
           re-forming rather than snapping into the next shape */
        const e = ease[i] + (CFG.MORPH_EASE - ease[i]) * morph;
        const k = e * Math.min(1, dt * 60);
        sx[i] += (px - sx[i]) * k;
        sy[i] += (py - sy[i]) * k;
      }

      /* Three things sell the 3D: points facing away are heavily dimmed
         (stands in for occlusion), a key light shades the rest, and a rim
         term brightens the grazing edge into a silhouette glow. */
      const facing = clamp(nz2, -1, 1);
      const gate = facing >= 0 ? 1 : 0.10 + 0.30 * (1 + facing);
      const diff = Math.max(0, nx2 * LX + ny2 * LY + nz2 * LZ);
      const rim = Math.pow(1 - Math.abs(facing), 3) * 0.34;
      const fog = 0.62 + 0.38 * clamp((z2 + 0.6) / 1.2, 0, 1);
      const shade = clamp(0.18 + 0.82 * diff + rim, 0, 1);   // lighting only
      /* on dark, light means a brighter dot; on light, shadow means more ink */
      let a = clamp(gate * fog * (LIGHT ? 0.26 + 0.74 * (1 - shade) : shade), 0, 1);
      let tone = accent[i] ? 3 : (shade > 0.62 ? 0 : shade > 0.26 ? 1 : 2);
      let size = shade > 0.55 ? 1.9 : 1.4;

      /* Glitter rides on top of the lighting rather than replacing it, so the
         form still reads. Alpha is already quantised into buckets downstream,
         so this costs a table lookup and no extra draw state. */
      if (!REDUCED) {
        const s = SINT[(((clock * tws[i] + twp[i]) * LINV) | 0) & LMASK];
        a *= 1 - CFG.GLIT_SHIM + CFG.GLIT_SHIM * s;
        if (spark[i]) {
          const s2 = s * s, s4 = s2 * s2, fl = s4 * s4;   // s^8: a narrow spike
          a = clamp(a + fl * CFG.GLIT_GAIN, 0, 1);        // brightness is smooth
          /* the colour switch is not: a low threshold here tips every mild
             flare fully to the accent and the cloud turns orange */
          if (fl > CFG.GLIT_TONE) { tone = 3; size += fl * 1.1; }
        }
      }
      if (a < 0.03) continue;

      bx[bn] = sx[i]; by[bn] = sy[i];
      bs[bn] = size;
      bucket[bn] = tone * ALEV + Math.min(ALEV - 1, (a * ALEV) | 0);
      bn++;
    }

    /* ---- streamers ---- */
    /* streamers belong to the hero moment only — once the figure parks in the
       margin the card has condensed and there is nothing to pour from */
    if (!REDUCED && !INSPECT && park < 0.35) {
      const nStr = nStream();
      for (let i = 0; i < nStr; i++) {
        if (!son[i]) continue;
        if (sdl[i] > 0) { sdl[i] -= dt; continue; }
        su[i] += sv[i] * dt * 60;
        if (su[i] >= 1) { merged++; respawn(i, false); continue; }

        const [ox, oy] = spawnXY(i);
        const ti = tgt[i], dx = tx[ti], dy = ty[ti];
        const u = su[i], e = smooth(u);
        let px = ox + (dx - ox) * e, py = oy + (dy - oy) * e;
        /* Each band bows out along its own arc and carries a small wiggle on
           top — the steady arc is what makes them read as ribbons rather than
           drifting dust. Both flatten to zero on arrival so the merge is clean. */
        const vx = dx - ox, vy = dy - oy, L = Math.hypot(vx, vy) || 1;
        const g = gb[i];
        const bow = Math.sin(Math.PI * u) * ARC[g];
        const wig = (1 - u) * 11 * Math.sin(u * Math.PI * FRQ[g] + sph[i]);
        px += (-vy / L) * (bow + wig); py += (vx / L) * (bow + wig);

        const a = clamp(Math.min(1, u * 6) * (0.35 + 0.65 * (1 - u)), 0, 1);
        bx[bn] = px; by[bn] = py; bs[bn] = 1.5;
        /* warm on the way out, cooling into the head's palette as it lands */
        bucket[bn] = (u < 0.62 ? 3 : 1) * ALEV + Math.min(ALEV - 1, (a * ALEV) | 0);
        bn++;
      }
      mergedEl.textContent = merged.toLocaleString();
    }

    /* ---- counting sort by style bucket, then draw ---- */
    counts.fill(0);
    for (let i = 0; i < bn; i++) counts[bucket[i]]++;
    offs[0] = 0;
    for (let b = 0; b < counts.length; b++) offs[b + 1] = offs[b] + counts[b];
    const cur = offs.slice(0, counts.length);
    for (let i = 0; i < bn; i++) order[cur[bucket[i]]++] = i;

    for (let b = 0; b < counts.length; b++) {
      if (!counts[b]) continue;
      ctx.fillStyle = STYLE[b];
      for (let k = offs[b]; k < offs[b + 1]; k++) {
        const i = order[k], s = bs[i];
        ctx.fillRect(bx[i], by[i], s, s);
      }
    }
    dbg = { bn, ccx, ccy, csc, nA, cx, cy, scale,
            sx0: sx[0], sy0: sy[0], tx0: tx[0], ty0: ty[0] };
    req();
  }
  /* test hook: lets a frame be stepped by hand when rAF is paused
     (hidden tab / headless capture). Harmless in normal use. */
  let dbg = null;
  window.__hero = { frame, cfg: CFG, setPose,
                    stats: () => ({ merged, theta, pose, poses: clouds.length, ...dbg }) };
  req();
}
