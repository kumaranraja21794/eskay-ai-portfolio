import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';

/* =========================================================
   ESKAY STUDIO — interaction primitives
   ========================================================= */

/* ---- Custom cursor: dot + trailing ring, difference blend ---- */
export const Cursor = () => {
  const dotX = useMotionValue(-100); const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 400, damping: 35 });
  const ringY = useSpring(dotY, { stiffness: 400, damping: 35 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => { dotX.set(e.clientX - 4); dotY.set(e.clientY - 4); };
    const over = (e) => {
      setHover(!!e.target.closest('a, button, [data-hover]'));
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [dotX, dotY]);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
      <motion.div
        className={hover ? 'cursor-ring is-hover' : 'cursor-ring'}
        style={{ x: ringX, y: ringY, translateX: -14, translateY: -14 }}
      />
    </>
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
