/* ============================================================================
   Venue badges assembled from particles.

   Same move as the hero: sample a target, fly points into it. There the
   target is a mesh surface; here it is the badge itself — the pill's fill,
   its border, and the glyph coverage of the label — read back from an
   offscreen canvas. The whole badge is particles until the moment it lands.

   The swarm arrives as one body rather than as dust converging from every
   direction: each particle's start is the SAME rotate-scale-translate of its
   own target, so the cloud is a small tilted copy of the finished badge that
   flies in, grows, straightens and resolves.

   One-shot per badge, fired as it scrolls into view; the canvas is removed
   afterwards, so nothing animates while the reader is reading.
   ========================================================================= */

(function () {
  'use strict';

  const CFG = {
    PAD_X   : 190,   // canvas overhang each side — sets how far it can fly
    PAD_Y   : 54,
    STEP_INK: 2,     // sampling stride, device px
    STEP_PILL: 5,
    STEP_EDGE: 3,
    MAX_INK : 150,   // kept lean: dense clouds read as mush, not as a badge
    MAX_PILL: 70,
    MAX_EDGE: 70,
    DUR     : 0.62,  // seconds of travel
    SPREAD  : 0.14,  // small, so the swarm stays a body rather than a stream
    TRAVEL  : 0.80,  // swarm's distance out, as a fraction of PAD_X
    SWARM_S : 0.34,  // how compressed the swarm is vs the final badge
    SWARM_A : 0.30,  // radians of tilt while it is still a swarm
    /* How much a particle forgets its own target while in the swarm. At 0 the
       cloud is a neat shrunken badge, so fill and ink stay in tidy separate
       bands; high values scramble them together and let the badge sort itself
       out during the flight, which is the point of the effect. */
    SWARM_MIX: 0.80,
    JITTER  : 4,     // px of per-particle noise in the swarm
    FADE    : 0.20,
    STAGGER : 60,    // ms between badges entering together
  };

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const smooth = x => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };

  /* ---- colour ramps ------------------------------------------------------
     In flight every particle wears a pale tint of the venue's ink and only
     resolves to its true colour on approach. The pill's own fill is nearly
     white, so particles wearing it are invisible against the page and the
     swarm reads as solid strong colour — hence a shared flight tint rather
     than each particle starting on its final colour.
     Quantised into LEVELS steps so a frame costs a handful of fillStyle
     changes instead of one per particle. */
  const LEVELS = 7;
  const RESOLVE_AT = 0.5;          // fraction of the flight spent still pale

  function parseRGB(s) {
    const m = /(-?[\d.]+)[,\s]+(-?[\d.]+)[,\s]+(-?[\d.]+)/.exec(s || '');
    return m ? [+m[1], +m[2], +m[3]] : [120, 130, 145];
  }
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t,
                           a[1] + (b[1] - a[1]) * t,
                           a[2] + (b[2] - a[2]) * t];
  /* Alpha climbs steeply across the ramp as well as colour. In the real
     layout a badge sits inline mid-title, so the swarm forms over the card's
     own text — nearly transparent at the start, it reads as an approaching
     trail instead of a blob parked on the words. */
  function ramp(flight, final) {
    const out = [];
    for (let i = 0; i < LEVELS; i++) {
      const t = i / (LEVELS - 1);
      const c = mix(flight, final, t);
      const a = 0.22 + 0.78 * t * t;
      out.push(`rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${a.toFixed(2)})`);
    }
    return out;
  }

  const jobs = [];

  function roundRect(c, x, y, w, h, r) {
    if (c.roundRect) { c.beginPath(); c.roundRect(x, y, w, h, r); return; }
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  /* collect points wherever the freshly drawn pass is opaque */
  function harvest(o, W, H, dpr, stride, max) {
    const img = o.getImageData(0, 0, Math.round(W * dpr), Math.round(H * dpr)).data;
    const w = Math.round(W * dpr);
    const found = [];
    for (let y = 0; y < Math.round(H * dpr); y += stride) {
      for (let x = 0; x < w; x += stride) {
        if (img[(y * w + x) * 4 + 3] > 128) found.push(x / dpr, y / dpr);
      }
    }
    const total = found.length / 2;
    if (total <= max) return found;
    const out = [];
    for (let i = 0; i < max; i++) {
      const k = Math.floor(i * total / max) * 2;
      out.push(found[k], found[k + 1]);
    }
    return out;
  }

  function build(badge) {
    const label = badge.querySelector('.v');
    const wrap = badge.parentElement;
    if (!label || !wrap) return null;

    const dpr = Math.min(2, devicePixelRatio || 1);
    const cs = getComputedStyle(badge);
    const ls = getComputedStyle(label);
    const wr = wrap.getBoundingClientRect();
    const br = badge.getBoundingClientRect();
    const lr = label.getBoundingClientRect();
    if (!wr.width || !br.width) return null;

    const W = wr.width + CFG.PAD_X * 2;
    const H = wr.height + CFG.PAD_Y * 2;

    /* badge box in canvas coordinates */
    const bx = (br.left - wr.left) + CFG.PAD_X;
    const by = (br.top - wr.top) + CFG.PAD_Y;
    const bw = br.width, bh = br.height;
    const radius = parseFloat(cs.borderTopLeftRadius) || 7;

    const off = document.createElement('canvas');
    off.width = Math.round(W * dpr);
    off.height = Math.round(H * dpr);
    const o = off.getContext('2d', { willReadFrequently: true });
    o.scale(dpr, dpr);

    /* --- pass 1: the pill's fill --- */
    o.clearRect(0, 0, W, H);
    o.fillStyle = '#000';
    roundRect(o, bx, by, bw, bh, radius); o.fill();
    const pill = harvest(o, W, H, dpr, CFG.STEP_PILL, CFG.MAX_PILL);

    /* --- pass 2: its border --- */
    o.clearRect(0, 0, W, H);
    o.strokeStyle = '#000'; o.lineWidth = 1.6;
    roundRect(o, bx + .5, by + .5, bw - 1, bh - 1, radius); o.stroke();
    const edge = harvest(o, W, H, dpr, CFG.STEP_EDGE, CFG.MAX_EDGE);

    /* --- pass 3: the label's glyphs --- */
    o.clearRect(0, 0, W, H);
    o.font = `${ls.fontWeight} ${ls.fontSize} ${ls.fontFamily}`;
    if ('letterSpacing' in o) o.letterSpacing = ls.letterSpacing;
    o.textAlign = 'center'; o.textBaseline = 'middle';
    o.fillStyle = '#000';
    o.fillText(label.textContent.trim(),
               (lr.left - wr.left) + lr.width / 2 + CFG.PAD_X,
               (lr.top - wr.top) + lr.height / 2 + CFG.PAD_Y);
    const ink = harvest(o, W, H, dpr, CFG.STEP_INK, CFG.MAX_INK);

    const N = (pill.length + edge.length + ink.length) / 2;
    if (!N) return null;

    /* colours must be read before .printing strips them off the element */
    const inkRGB = parseRGB(ls.color);
    /* pale wash of the venue's own ink — soft, but never invisible the way
       the pill's near-white fill would be on a near-white page */
    const flight = mix(inkRGB, [255, 255, 255], 0.66);
    const RAMPS = [
      ramp(flight, parseRGB(cs.backgroundColor)),   // 0 · pill fill
      ramp(flight, parseRGB(cs.borderTopColor)),    // 1 · border
      ramp(flight, inkRGB)                          // 2 · label
    ];

    const tx = new Float32Array(N), ty = new Float32Array(N);
    const sx = new Float32Array(N), sy = new Float32Array(N);
    const dly = new Float32Array(N), siz = new Float32Array(N);
    const grp = new Uint8Array(N);

    /* ONE transform for the whole badge — this is what keeps the swarm
       coherent instead of it reading as dust from all directions */
    const cx = bx + bw / 2, cy = by + bh / 2;
    const dir = Math.random() < 0.5 ? -1 : 1;
    const ang = dir * CFG.SWARM_A;
    const ca = Math.cos(ang), sa = Math.sin(ang);
    const offX = CFG.PAD_X * CFG.TRAVEL;           // swarm waits out to the right
    const offY = dir * CFG.PAD_Y * 0.30;
    /* the blob the swarm occupies, independent of where a particle is headed */
    const blobRX = bw * CFG.SWARM_S * 0.85;
    const blobRY = bh * CFG.SWARM_S * 1.9;

    let i = 0;
    const put = (arr, group, size) => {
      for (let k = 0; k < arr.length; k += 2, i++) {
        const X = arr[k], Y = arr[k + 1];
        tx[i] = X; ty[i] = Y;

        /* where this particle would sit if the swarm kept the badge's shape */
        const rx = (X - cx) * CFG.SWARM_S, ry = (Y - cy) * CFG.SWARM_S;
        const stX = cx + (rx * ca - ry * sa) + offX;
        const stY = cy + (rx * sa + ry * ca) + offY;

        /* ...and a position drawn from the blob with no regard to its target */
        const a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random());
        const blX = cx + offX + Math.cos(a) * rr * blobRX;
        const blY = cy + offY + Math.sin(a) * rr * blobRY;

        const m = CFG.SWARM_MIX;
        sx[i] = stX + (blX - stX) * m + (Math.random() - .5) * CFG.JITTER;
        sy[i] = stY + (blY - stY) * m + (Math.random() - .5) * CFG.JITTER;

        /* outer particles set off a touch later — the badge unfurls */
        const d = Math.hypot(X - cx, Y - cy) / (bw * 0.6 + 1);
        dly[i] = clamp(d, 0, 1) * CFG.DUR * CFG.SPREAD + Math.random() * 0.04;
        grp[i] = group; siz[i] = size;
      }
    };
    put(pill, 0, 2.6);
    put(edge, 1, 1.8);
    put(ink, 2, 1.8);

    const cv = document.createElement('canvas');
    cv.className = 'printfx';
    cv.style.left = -CFG.PAD_X + 'px';
    cv.style.top = -CFG.PAD_Y + 'px';
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    const ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);
    wrap.appendChild(cv);
    badge.classList.add('printing');

    const NB = 3 * LEVELS;
    return {
      badge, cv, ctx, N, W, H, tx, ty, sx, sy, dly, grp, siz, RAMPS,
      px: new Float32Array(N), py: new Float32Array(N),
      bkt: new Uint8Array(N), counts: new Int32Array(NB),
      offs: new Int32Array(NB + 1), order: new Int32Array(N),
      t: 0, done: false,
      step(dt) {
        if (this.done) return;
        this.t += dt;
        const c = this.ctx;
        c.clearRect(0, 0, this.W, this.H);

        let n = 0, settled = 0;
        this.counts.fill(0);
        for (let j = 0; j < this.N; j++) {
          const u = clamp((this.t - this.dly[j]) / CFG.DUR, 0, 1);
          if (u <= 0) continue;
          const e = smooth(u);
          this.px[n] = this.sx[j] + (this.tx[j] - this.sx[j]) * e;
          this.py[n] = this.sy[j] + (this.ty[j] - this.sy[j]) * e;
          /* stay pale for the first stretch, then resolve on approach */
          const ct = smooth((u - RESOLVE_AT) / (1 - RESOLVE_AT));
          const lvl = Math.min(LEVELS - 1, (ct * LEVELS) | 0);
          const b = this.grp[j] * LEVELS + lvl;
          this.bkt[n] = b; this.counts[b]++;
          this.order[n] = j;            // reused below to recover the size
          n++;
          if (u >= 1) settled++;
        }

        /* counting sort into colour buckets */
        this.offs[0] = 0;
        for (let b = 0; b < NB; b++) this.offs[b + 1] = this.offs[b] + this.counts[b];
        const cur = this.offs.slice(0, NB);
        const idx = new Int32Array(n);
        for (let k = 0; k < n; k++) idx[cur[this.bkt[k]]++] = k;

        for (let b = 0; b < NB; b++) {
          if (!this.counts[b]) continue;
          c.fillStyle = this.RAMPS[(b / LEVELS) | 0][b % LEVELS];
          for (let k = this.offs[b]; k < this.offs[b + 1]; k++) {
            const p = idx[k], s = this.siz[this.order[p]];
            c.fillRect(this.px[p], this.py[p], s, s);
          }
        }
        if (settled === this.N) this.land();
      },
      land() {
        this.badge.classList.remove('printing');
        this.badge.__job = null;
        this.cv.style.transition = `opacity ${CFG.FADE}s ease`;
        this.cv.style.opacity = '0';
        const cv = this.cv;
        setTimeout(() => cv.remove(), CFG.FADE * 1000 + 60);
        this.done = true;
      },
      abort() {                       // a badge must never be left invisible
        this.badge.classList.remove('printing');
        this.badge.__job = null;
        this.cv.remove();
        this.done = true;
      }
    };
  }

  let raf = 0, last = 0;
  function tick(now) {
    const dt = last ? clamp((now - last) / 1000, 0, 0.05) : 0.016;
    last = now;
    for (let i = jobs.length - 1; i >= 0; i--) {
      jobs[i].step(dt);
      if (jobs[i].done) jobs.splice(i, 1);
    }
    raf = jobs.length ? requestAnimationFrame(tick) : (last = 0);
  }
  function ensureLoop() { if (!raf && jobs.length) raf = requestAnimationFrame(tick); }

  function print(badge) {
    if (badge.__job) return;          // still flying — never stack two runs
    if (badge.dataset.printed) return; // already printed, not yet re-armed
    badge.dataset.printed = '1';
    let job = null;
    try { job = build(badge); } catch (_) { badge.classList.remove('printing'); return; }
    if (!job) return;
    badge.__job = job;
    jobs.push(job);
    ensureLoop();
    setTimeout(() => { if (!job.done) job.abort(); },
               (CFG.DUR * (1 + CFG.SPREAD) + 1.6) * 1000);
  }

  const onScreen = el => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight;
  };

  function setup() {
    const badges = [...document.querySelectorAll('.venue-badge')];
    badges.forEach(b => {
      if (b.parentElement && b.parentElement.classList.contains('badge-wrap')) return;
      const w = document.createElement('span');
      w.className = 'badge-wrap';
      b.parentNode.insertBefore(w, b);
      w.appendChild(b);
    });
    if (REDUCED) return;

    if (!('IntersectionObserver' in window)) { badges.forEach(print); return; }
    let n = 0;
    /* Kept under observation rather than unobserved after the first run: a
       badge re-arms once it has left the viewport completely, so scrolling
       away and back prints it again. Requiring a full exit is the hysteresis
       that stops it re-firing on small scrolls around the boundary. */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const badge = e.target;
          const wait = (n++ % 6) * CFG.STAGGER;
          /* by the time the stagger elapses the reader may have scrolled on;
             re-arm instead of printing something nobody is looking at */
          setTimeout(() => {
            if (onScreen(badge)) print(badge);
            else delete badge.dataset.printed;
          }, wait);
        } else if (e.intersectionRatio === 0) {
          delete e.target.dataset.printed;
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: [0, 0.1] });
    badges.forEach(b => io.observe(b));
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', setup);
  else setup();

  window.BadgePrint = {
    cfg: CFG,
    print,                            // exposed for tests; guards still apply
    replayAll() {
      jobs.length = 0;
      document.querySelectorAll('.printfx').forEach(c => c.remove());
      document.querySelectorAll('.venue-badge').forEach((b, i) => {
        delete b.dataset.printed;
        b.__job = null;
        b.classList.remove('printing');
        setTimeout(() => print(b), (i % 8) * CFG.STAGGER);
      });
    },
    /* drive a virtual clock when rAF is paused (hidden pane, headless check) */
    step(seconds, slices) {
      slices = slices || 40;
      for (let i = 0; i < slices; i++) jobs.forEach(j => j.step(seconds / slices));
      for (let i = jobs.length - 1; i >= 0; i--) if (jobs[i].done) jobs.splice(i, 1);
      return jobs.length;
    },
    jobs
  };
})();
