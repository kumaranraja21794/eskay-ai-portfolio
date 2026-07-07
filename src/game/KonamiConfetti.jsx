import React, { useEffect, useRef } from 'react';
import { useGame } from './GameContext';

const CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
const COLORS = ['#FF6B4A', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899'];

/** Konami code listener → confetti burst + temporary party mode. */
const KonamiConfetti = () => {
  const { unlock, setPartyMode } = useGame();
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  const burst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const parts = Array.from({ length: 220 }, () => ({
      x: W / 2, y: H / 2,
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 0.9) * 22,
      size: 4 + Math.random() * 6,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      life: 1,
    }));

    cancelAnimationFrame(rafRef.current);
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of parts) {
        p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        p.life -= 0.008;
        if (p.life <= 0 || p.y > H + 20) continue;
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      if (alive) rafRef.current = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    let idx = 0;
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      idx = key === CODE[idx] ? idx + 1 : (key === CODE[0] ? 1 : 0);
      if (idx === CODE.length) {
        idx = 0;
        unlock('konami-legend');
        burst();
        setPartyMode(true);
        setTimeout(() => setPartyMode(false), 8000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(rafRef.current);
    };
  }, [unlock, setPartyMode]);

  return <canvas ref={canvasRef} className="konami-canvas" aria-hidden="true" />;
};

export default KonamiConfetti;
