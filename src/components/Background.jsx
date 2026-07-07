import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Background = () => {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.2]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 50;
      const dotSize = 1;
      const maxDist = 180;
      const connectionDist = 120;
      const dots = [];
      
      // Collect dot positions with wave animation
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Subtle mathematical wave ripple
          const waveX = Math.sin(x * 0.005 + y * 0.003 + time) * 2.5;
          const waveY = Math.cos(x * 0.003 + y * 0.005 + time) * 2.5;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let offsetX = 0;
          let offsetY = 0;
          
          if (distance < maxDist) {
            const force = (maxDist - distance) / maxDist;
            offsetX = dx * force * 0.15;
            offsetY = dy * force * 0.15;
          }
          
          const finalX = x + offsetX + waveX;
          const finalY = y + offsetY + waveY;
          
          dots.push({ x: finalX, y: finalY, distance });
        }
      }
      
      // Draw constellation connection lines between nearby dots close to cursor
      ctx.lineWidth = 0.5;
      for (let i = 0; i < dots.length; i++) {
        if (dots[i].distance > maxDist * 1.5) continue;
        for (let j = i + 1; j < dots.length; j++) {
          if (dots[j].distance > maxDist * 1.5) continue;
          const ddx = dots[i].x - dots[j].x;
          const ddy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < connectionDist) {
            const lineOpacity = (1 - dist / connectionDist) * 0.12;
            // Accent color for connections near cursor
            const cursorProximity = Math.min(dots[i].distance, dots[j].distance);
            if (cursorProximity < maxDist * 0.7) {
              ctx.strokeStyle = `rgba(255, 107, 74, ${lineOpacity * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
            }
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw dots
      for (const dot of dots) {
        const isNearCursor = dot.distance < maxDist * 0.6;
        if (isNearCursor) {
          const glow = (maxDist * 0.6 - dot.distance) / (maxDist * 0.6);
          ctx.fillStyle = `rgba(255, 107, 74, ${0.15 + glow * 0.6})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotSize + glow * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Subtle radial glow around cursor
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 300
      );
      gradient.addColorStop(0, 'rgba(255, 107, 74, 0.03)');
      gradient.addColorStop(0.5, 'rgba(255, 107, 74, 0.01)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationFrameId = requestAnimationFrame(drawGrid);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      style={{ opacity, position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#0F0F0F' }}
    >
      {/* Blurred glowing orbs in the background */}
      <div className="bg-mesh-glow">
        <motion.div 
          className="bg-orb orb-1" 
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.12, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="bg-orb orb-2" 
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 50, -50, 0],
            scale: [1, 0.93, 1.08, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="bg-orb orb-3" 
          animate={{
            x: [0, 40, -50, 0],
            y: [0, 70, -60, 0],
            scale: [1, 1.08, 0.92, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Canvas Dot Grid */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 1 }} />

      {/* Analog Grain / Noise Overlay */}
      <div className="bg-noise-overlay" />
    </motion.div>
  );
};

export default Background;
