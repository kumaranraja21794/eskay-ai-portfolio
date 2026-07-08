import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';

/* =========================================================
   ESKAY STUDIO — interaction primitives
   ========================================================= */

/* ---- Claude-style cursor: orange pointer arrow + orbiting sparkle ---- */
export const Cursor = () => {
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setHover(!!e.target.closest('a, button, [data-hover]'));
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mousedown', dn);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', dn);
      window.removeEventListener('mouseup', up);
    };
  }, [x, y]);

  return (
    <motion.div className="claude-cursor" style={{ x, y }}>
      <motion.svg
        width="24" height="28" viewBox="0 0 24 28"
        animate={{ scale: down ? 0.82 : hover ? 1.15 : 1, rotate: hover ? -10 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{ transformOrigin: '2px 2px', display: 'block' }}
      >
        <path
          d="M2 1 L2 21.5 L7.6 16.4 L10.9 24.6 L15 22.9 L11.7 14.9 L19 14.2 Z"
          fill="#ff5c00" stroke="#f0efe9" strokeWidth="1.6" strokeLinejoin="round"
        />
      </motion.svg>
      <motion.svg
        width="15" height="15" viewBox="-8 -8 16 16"
        style={{ position: 'absolute', left: 17, top: 16 }}
        animate={{ rotate: 360, scale: hover ? 1.25 : 0.85 }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
          scale: { type: 'spring', stiffness: 400, damping: 20 },
        }}
      >
        <path
          d="M0,-6.5 C1.3,-1.3 1.3,-1.3 6.5,0 C1.3,1.3 1.3,1.3 0,6.5 C-1.3,1.3 -1.3,1.3 -6.5,0 C-1.3,-1.3 -1.3,-1.3 0,-6.5 Z"
          fill="#ff5c00"
        />
      </motion.svg>
    </motion.div>
  );
};

/* ---- Scramble/decode text: glyphs resolve into words on view ---- */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#$%&@01';
export const Scramble = ({ text, as: Tag = 'span', speed = 28, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const [out, setOut] = useState(text.replace(/\S/g, ' '));

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let raf;
    const total = text.length * 2.2;
    const t = setTimeout(() => {
      const tick = () => {
        frame += 1;
        const progress = frame / total;
        const resolved = Math.floor(progress * text.length);
        let s = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') { s += ' '; continue; }
          if (i < resolved) s += text[i];
          else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setOut(s);
        if (resolved < text.length) raf = requestAnimationFrame(() => setTimeout(tick, 1000 / speed));
        else setOut(text);
      };
      tick();
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [inView, text, speed, delay]);

  return <Tag ref={ref} className={className} aria-label={text}>{out}</Tag>;
};

/* ---- Word-by-word rise reveal ---- */
/* NOTE: the moving span is fully clipped by its overflow-hidden wrapper,
   so we observe the (unclipped) wrapper — observing the clipped child
   never intersects and the animation deadlocks. */
export const Rise = ({ children, delay = 0, y = '110%', as: Tag = 'span' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const words = String(children).split(' ');
  return (
    <Tag ref={ref}>
      {words.map((w, i) => (
        <span className="word" key={i}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y }}
            animate={inView ? { y: 0 } : { y }}
            transition={{ duration: 0.9, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
};

/* ---- Magnetic wrapper: element leans toward cursor ---- */
export const Magnet = ({ children, strength = 0.35 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }, [x, y, strength]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
};

/* ---- Count-up stat ---- */
export const CountUp = ({ end, suffix = '', duration = 1.6 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <b ref={ref}>{val}<i>{suffix}</i></b>;
};

/* ---- Neural network canvas: drifting nodes + proximity edges + mouse repulsion ---- */
export const NeuralCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, nodes = [], raf;
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((W * H) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
        hue: Math.random() < 0.18,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const LINK = 120;
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22000) { n.x += dx * 0.012; n.y += dy * 0.012; }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.35;
            ctx.strokeStyle = `rgba(139, 92, 246, ${o})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.hue ? 'rgba(200, 245, 66, 0.9)' : 'rgba(34, 211, 238, 0.75)';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    init();
    if (!reduced) raf = requestAnimationFrame(tick);
    else { /* static frame */ tick(); cancelAnimationFrame(raf); }
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseout', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
};

/* ---- Dot-matrix grid canvas: dots wake up + turn signal-orange near cursor ---- */
export const DotGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, dots = [], raf;
    const mouse = { x: -9999, y: -9999 };
    const GAP = 26;

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let x = GAP / 2; x < W; x += GAP) {
        for (let y = GAP / 2; y < H; y += GAP) {
          dots.push({ x, y, e: 0 }); // e = excitement 0..1
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const R = 150;
      for (const d of dots) {
        const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        const target = dist < R ? 1 - dist / R : 0;
        d.e += (target - d.e) * 0.12;
        const r = 1 + d.e * 2.6;
        if (d.e > 0.08) {
          ctx.fillStyle = `rgba(255, 92, 0, ${0.25 + d.e * 0.75})`;
        } else {
          ctx.fillStyle = 'rgba(19, 19, 17, 0.16)';
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    init();
    if (!reduced) raf = requestAnimationFrame(tick);
    else tick() || cancelAnimationFrame(raf);
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseout', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
};

/* ---- Murmuration: boids flock (emergent AI) in brand palette ----
   Simple rules → complex intelligence. Cursor acts as a falcon: the
   flock swirls away from it, exactly like starlings dodging a predator. */
export const Murmuration = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, boids = [], raf, t = 0;
    const mouse = { x: -9999, y: -9999 };

    const PERCEPTION = 52;   // neighbour radius
    const SEP_DIST = 20;     // personal space
    const MAX_SPEED = 2.6;
    const MAX_FORCE = 0.055;
    const FEAR_R = 130;      // falcon (cursor) radius

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(240, Math.max(90, Math.floor((W * H) / 5200)));
      boids = Array.from({ length: n }, () => {
        const a = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * W, y: Math.random() * H,
          vx: Math.cos(a) * MAX_SPEED * 0.6, vy: Math.sin(a) * MAX_SPEED * 0.6,
          sig: Math.random() < 0.12, // signal-orange birds
        };
      });
      ctx.fillStyle = '#f0efe9';
      ctx.fillRect(0, 0, W, H);
    };

    const limit = (vx, vy, max) => {
      const m = Math.hypot(vx, vy);
      return m > max ? [vx / m * max, vy / m * max] : [vx, vy];
    };

    const tick = () => {
      t += 0.004;
      // translucent bone wash → fading trails
      ctx.fillStyle = 'rgba(240, 239, 233, 0.28)';
      ctx.fillRect(0, 0, W, H);

      // drifting invisible attractor keeps the flock wandering as one cloud
      const ax = W * (0.5 + 0.32 * Math.sin(t * 1.3) * Math.cos(t * 0.7));
      const ay = H * (0.45 + 0.28 * Math.sin(t * 0.9 + 2));

      for (const b of boids) {
        let cx = 0, cy = 0, alx = 0, aly = 0, sx = 0, sy = 0, n = 0;
        for (const o of boids) {
          if (o === b) continue;
          const dx = o.x - b.x, dy = o.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < PERCEPTION * PERCEPTION) {
            cx += o.x; cy += o.y;
            alx += o.vx; aly += o.vy;
            n++;
            if (d2 < SEP_DIST * SEP_DIST && d2 > 0.01) {
              const d = Math.sqrt(d2);
              sx -= dx / d / d * 14; sy -= dy / d / d * 14;
            }
          }
        }
        let fx = 0, fy = 0;
        if (n > 0) {
          // cohesion
          let [ix, iy] = limit(cx / n - b.x, cy / n - b.y, MAX_FORCE * 0.9);
          fx += ix; fy += iy;
          // alignment
          [ix, iy] = limit(alx / n - b.vx, aly / n - b.vy, MAX_FORCE * 1.15);
          fx += ix; fy += iy;
          // separation
          [ix, iy] = limit(sx, sy, MAX_FORCE * 1.6);
          fx += ix; fy += iy;
        }
        // wander toward drifting attractor (very gentle)
        let [wx, wy] = limit(ax - b.x, ay - b.y, MAX_FORCE * 0.35);
        fx += wx; fy += wy;
        // falcon: flee the cursor
        const mdx = b.x - mouse.x, mdy = b.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < FEAR_R * FEAR_R && md2 > 0.01) {
          const md = Math.sqrt(md2);
          const [px, py] = limit(mdx / md, mdy / md, MAX_FORCE * 6 * (1 - md / FEAR_R));
          fx += px; fy += py;
        }

        b.vx += fx; b.vy += fy;
        [b.vx, b.vy] = limit(b.vx, b.vy, MAX_SPEED);
        b.x += b.vx; b.y += b.vy;
        // soft wrap
        if (b.x < -12) b.x = W + 12; if (b.x > W + 12) b.x = -12;
        if (b.y < -12) b.y = H + 12; if (b.y > H + 12) b.y = -12;
      }

      // draw: elongated dots along velocity → bird-like streaks
      for (const b of boids) {
        const m = Math.hypot(b.vx, b.vy) || 1;
        ctx.strokeStyle = b.sig ? 'rgba(255, 92, 0, 0.9)' : 'rgba(19, 19, 17, 0.68)';
        ctx.lineWidth = b.sig ? 2.2 : 1.7;
        ctx.beginPath();
        ctx.moveTo(b.x - b.vx / m * 3.2, b.y - b.vy / m * 3.2);
        ctx.lineTo(b.x + b.vx / m * 3.2, b.y + b.vy / m * 3.2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    init();
    if (!reduced) {
      raf = requestAnimationFrame(tick);
    } else {
      // static scatter for reduced motion
      for (const b of boids) {
        ctx.fillStyle = b.sig ? 'rgba(255,92,0,0.8)' : 'rgba(19,19,17,0.5)';
        ctx.beginPath(); ctx.arc(b.x, b.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
    }
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseout', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
};

/* ---- NeuralFace: a neural network that assembles into a living AI face ----
   Cycle: free-floating network → nodes converge into a face → the face
   breathes, blinks, and its eyes FOLLOW THE VISITOR'S CURSOR → dissolves
   back into the network. Emergence, embodied. */

const qbez = (p0, p1, p2, n, g) => {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
    pts.push({ u: a * p0[0] + b * p1[0] + c * p2[0], v: a * p0[1] + b * p1[1] + c * p2[1], g });
  }
  return pts;
};
const ellipsePts = (cx, cy, rx, ry, n, g, a0 = 0, a1 = Math.PI * 2) => {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = a0 + (a1 - a0) * (i / n);
    pts.push({ u: cx + Math.cos(a) * rx, v: cy + Math.sin(a) * ry, g });
  }
  return pts;
};

const buildFacePoints = () => [
  // head outline
  ...ellipsePts(0, 0.02, 0.60, 0.78, 46, 'outline'),
  // brows
  ...qbez([-0.40, -0.30], [-0.26, -0.40], [-0.12, -0.32], 8, 'browL'),
  ...qbez([0.12, -0.32], [0.26, -0.40], [0.40, -0.30], 8, 'browR'),
  // eyes
  ...ellipsePts(-0.26, -0.16, 0.125, 0.055, 12, 'eyeL'),
  ...ellipsePts(0.26, -0.16, 0.125, 0.055, 12, 'eyeR'),
  // pupils (orange)
  ...ellipsePts(-0.26, -0.16, 0.028, 0.028, 6, 'pupilL'),
  ...ellipsePts(0.26, -0.16, 0.028, 0.028, 6, 'pupilR'),
  // nose bridge + base
  ...qbez([-0.02, -0.12], [-0.06, 0.04], [-0.09, 0.14], 6, 'nose'),
  ...qbez([-0.09, 0.14], [0.00, 0.20], [0.08, 0.13], 6, 'nose2'),
  // lips
  ...qbez([-0.22, 0.42], [0.00, 0.34], [0.22, 0.42], 12, 'lipT'),
  ...qbez([-0.22, 0.42], [0.00, 0.52], [0.22, 0.42], 12, 'lipB'),
];

export const NeuralFace = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, parts = [], raf, t = 0;
    const mouse = { x: -9999, y: -9999 };
    const facePts = buildFacePoints();
    const HALO_N = 62;

    // phase machine: net → morphIn → face → morphOut → …
    const PHASES = [['net', 4.0], ['in', 2.2], ['face', 11.0], ['out', 2.2]];
    let phaseIdx = reduced ? 2 : 0, phaseT = 0, last = 0;

    // life: blinking + eye tracking + smile
    let nextBlink = 2.5, blinkT = -1;
    let nextSmile = 6, smileT = -1;

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = [];
      for (let i = 0; i < facePts.length + HALO_N; i++) {
        const face = i < facePts.length ? facePts[i] : null;
        const haloA = Math.random() * Math.PI * 2;
        parts.push({
          x: Math.random() * W, y: Math.random() * H,
          nx: Math.random() * W, ny: Math.random() * H,          // net anchor
          wa: Math.random() * Math.PI * 2,                        // wander angle
          face,
          haloA, haloR: 0.92 + Math.random() * 0.30,              // halo orbit (non-face nodes)
          stag: Math.random() * 0.35,                             // morph stagger
          sig: face ? face.g.startsWith('pupil') : Math.random() < 0.12,
        });
      }
    };

    const smooth = (x) => { const c = Math.min(Math.max(x, 0), 1); return c * c * (3 - 2 * c); };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000 || 0.016, 0.05);
      last = now; t += dt;
      if (!reduced) {
        phaseT += dt;
        if (phaseT > PHASES[phaseIdx][1]) { phaseT = 0; phaseIdx = (phaseIdx + 1) % 4; }
      }
      const [phase, dur] = PHASES[phaseIdx];
      const k = phase === 'face' ? 1 : phase === 'net' ? 0
        : phase === 'in' ? smooth(phaseT / dur) : 1 - smooth(phaseT / dur);

      // face placement
      const S = Math.min(H * 0.40, W * 0.30);
      const cx = W > 860 ? W * 0.72 : W * 0.5;
      const cy = H * 0.46;

      // life timers
      if (t > nextBlink && blinkT < 0) { blinkT = 0; nextBlink = t + 2.4 + Math.random() * 3.6; }
      if (blinkT >= 0) { blinkT += dt; if (blinkT > 0.26) blinkT = -1; }
      const blinkK = blinkT < 0 ? 1 : Math.abs(Math.cos((blinkT / 0.26) * Math.PI)); // 1→0→1
      if (t > nextSmile && smileT < 0) { smileT = 0; nextSmile = t + 7 + Math.random() * 5; }
      if (smileT >= 0) { smileT += dt; if (smileT > 1.4) smileT = -1; }
      const smileK = smileT < 0 ? 0 : Math.sin((smileT / 1.4) * Math.PI);

      // gaze: eyes follow cursor
      const gdx = mouse.x > -999 ? Math.max(-1, Math.min(1, (mouse.x - cx) / (W * 0.4))) : 0;
      const gdy = mouse.y > -999 ? Math.max(-1, Math.min(1, (mouse.y - cy) / (H * 0.4))) : 0;
      const tilt = gdx * 0.05;                                  // head leans toward cursor
      const breathe = 1 + 0.012 * Math.sin(t * 1.5);
      const cosT = Math.cos(tilt), sinT = Math.sin(tilt);

      ctx.clearRect(0, 0, W, H);

      // update positions
      for (const p of parts) {
        // net anchor wanders
        p.wa += (Math.random() - 0.5) * 0.3;
        p.nx += Math.cos(p.wa) * 0.5; p.ny += Math.sin(p.wa) * 0.5;
        if (p.nx < 0 || p.nx > W) p.wa = Math.PI - p.wa;
        if (p.ny < 0 || p.ny > H) p.wa = -p.wa;
        p.nx = Math.max(0, Math.min(W, p.nx)); p.ny = Math.max(0, Math.min(H, p.ny));

        // face target
        let fu, fv;
        if (p.face) {
          fu = p.face.u; fv = p.face.v;
          const g = p.face.g;
          if (g === 'eyeL' || g === 'eyeR' || g === 'pupilL' || g === 'pupilR') {
            fv = -0.16 + (fv + 0.16) * blinkK;                  // blink collapse
            if (g.startsWith('pupil')) { fu += gdx * 0.045; fv += gdy * 0.03; } // gaze
          }
          if ((g === 'lipT' || g === 'lipB') && Math.abs(fu) > 0.13) {
            fv -= smileK * 0.045;                               // smile corners lift
          }
          fv += 0.006 * Math.sin(t * 1.5 + fu * 3);             // micro-life shimmer
        } else {
          p.haloA += dt * 0.12;                                  // thoughts orbiting the head
          fu = Math.cos(p.haloA) * p.haloR * 0.72;
          fv = 0.02 + Math.sin(p.haloA) * p.haloR * 0.92;
        }
        // rotate (tilt), breathe, scale to screen
        const ru = (fu * cosT - fv * sinT) * breathe;
        const rv = (fu * sinT + fv * cosT) * breathe;
        const fx = cx + ru * S + gdx * 10;
        const fy = cy + rv * S + gdy * 6;

        // stagger the morph per particle
        const kk = smooth((k - p.stag) / (1 - p.stag));
        p.x = p.nx + (fx - p.nx) * kk;
        p.y = p.ny + (fy - p.ny) * kk;
        p.kk = kk;
      }

      // edges: proximity network (fades as face forms, stays on halo)
      const LINK = 92;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const d = Math.sqrt(d2);
            const faceMix = (a.kk + b.kk) / 2;
            const o = (1 - d / LINK) * (0.30 - faceMix * 0.16);
            if (o > 0.015) {
              ctx.strokeStyle = `rgba(19, 19, 17, ${o})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
      }
      // feature strokes: consecutive same-group points → crisp face lines
      ctx.lineWidth = 1.4;
      for (let i = 0; i < facePts.length - 1; i++) {
        const a = parts[i], b = parts[i + 1];
        if (a.face.g !== b.face.g) continue;
        const o = Math.min(a.kk, b.kk) * 0.62;
        if (o < 0.02) continue;
        ctx.strokeStyle = a.face.g.startsWith('pupil')
          ? `rgba(255, 92, 0, ${o + 0.25})` : `rgba(19, 19, 17, ${o})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }

      // nodes
      for (const p of parts) {
        const r = p.sig ? 2.3 : 1.7;
        ctx.fillStyle = p.sig
          ? 'rgba(255, 92, 0, 0.95)'
          : `rgba(19, 19, 17, ${0.45 + p.kk * 0.3})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
      }

      // heartbeat dot under the face when alive
      if (k > 0.9) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 4);
        ctx.fillStyle = `rgba(255, 92, 0, ${0.35 + pulse * 0.5})`;
        ctx.beginPath(); ctx.arc(cx, cy + S * 1.05, 3 + pulse * 2, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    init();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseout', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
};

/* ---- Rotating word ---- */
export const Rotator = ({ words, interval = 2200 }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className="hero-rotator" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <motion.span
        key={idx}
        style={{ display: 'inline-block' }}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {words[idx]}
      </motion.span>
    </span>
  );
};

/* ---- Tilt card (3D perspective follow) ---- */
export const Tilt = ({ children, max = 8, className = '' }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref} className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
};
