import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroMotionGraphics = () => {
  const [stage, setStage] = useState(0); // 0: Design, 1: Code, 2: Product (Portal & Mobile)

  // Auto cycle through stages (resets timer on manual stage switch)
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearTimeout(timer);
  }, [stage]);

  const stages = [
    { name: 'Design', color: '#FF6B4A', desc: 'Vector Layouts & Figma UI' },
    { name: 'Code', color: '#8B5CF6', desc: 'React & Angular Components' },
    { name: 'Deploy', color: '#10B981', desc: 'Live Portals & Mobile Apps' }
  ];

  return (
    <div 
      className="hero-motion-graphics"
      style={{
        position: 'absolute',
        top: '50%',
        right: '5%',
        transform: 'translateY(-50%)',
        width: 'min(500px, 45vw)',
        height: 'min(500px, 45vw)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'auto',
      }}
    >
      {/* Blueprint Grid Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 80%)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.02)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: '10%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,107,74,0.01) 0%, transparent 70%)',
          borderRadius: '50%',
          border: '1px dashed rgba(255,255,255,0.01)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Main Animated Display Window */}
      <div 
        style={{
          width: '100%',
          height: '80%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <AnimatePresence mode="wait">
          {/* STAGE 0: DESIGN */}
          {stage === 0 && (
            <motion.div
              key="design-stage"
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <svg width="85%" height="85%" viewBox="0 0 400 400" fill="none">
                {/* Figma Grid */}
                <defs>
                  <pattern id="design-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#design-grid)" rx="20" />
                
                {/* Outlined Circle Grid */}
                <circle cx="200" cy="200" r="140" stroke="rgba(255,107,74,0.07)" strokeWidth="1.5" strokeDasharray="5 5" />
                <circle cx="200" cy="200" r="80" stroke="rgba(255,107,74,0.05)" strokeWidth="1" />

                {/* Animated Bezier Curve Drawing */}
                <motion.path
                  d="M 60 250 C 130 90, 270 90, 340 250"
                  stroke="#FF6B4A"
                  strokeWidth="3.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />

                {/* Construction Lines */}
                <motion.line 
                  x1="60" y1="250" x2="130" y2="90" 
                  stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                />
                <motion.line 
                  x1="340" y1="250" x2="270" y2="90" 
                  stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                />

                {/* Anchor Points */}
                <motion.circle 
                  cx="60" cy="250" r="6" fill="#161616" stroke="#FF6B4A" strokeWidth="2.5" 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                />
                <motion.circle 
                  cx="340" cy="250" r="6" fill="#161616" stroke="#FF6B4A" strokeWidth="2.5"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                />

                {/* Control Handles (Interactive Nodes) */}
                <motion.g
                  animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <circle cx="130" cy="90" r="7" fill="#FF6B4A" />
                  <line x1="130" y1="90" x2="130" y2="105" stroke="#FF6B4A" strokeWidth="1.5" />
                </motion.g>

                <motion.g
                  animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                >
                  <circle cx="270" cy="90" r="7" fill="#FF6B4A" />
                  <line x1="270" y1="90" x2="270" y2="105" stroke="#FF6B4A" strokeWidth="1.5" />
                </motion.g>

                {/* Vector Pen Tool Silhouette */}
                <motion.path
                  d="M 170 120 L 195 145 L 205 135 L 180 110 Z"
                  fill="rgba(255,255,255,0.8)"
                  stroke="#FF6B4A"
                  strokeWidth="1.5"
                  animate={{ 
                    x: [0, 10, -5, 0],
                    y: [0, -10, 15, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Measurement Overlay text */}
                <text x="200" y="310" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace" letterSpacing="0.05em">
                  W: 340px &nbsp;&nbsp; H: 160px &nbsp;&nbsp; R: 32px
                </text>
              </svg>

              {/* Glowing Badge */}
              <div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  backgroundColor: 'rgba(255, 107, 74, 0.1)',
                  border: '1px solid rgba(255, 107, 74, 0.25)',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '0.62rem',
                  fontFamily: 'monospace',
                  color: '#FF6B4A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Figma Design Environment
              </div>
            </motion.div>
          )}

          {/* STAGE 1: CODE */}
          {stage === 1 && (
            <motion.div
              key="code-stage"
              initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateX: 15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Mock Code Editor Interface */}
              <div
                style={{
                  width: '85%',
                  height: '80%',
                  background: 'rgba(20, 20, 20, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  color: '#A78BFA'
                }}
              >
                {/* Editor Header Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(10,10,10,0.5)' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>PortalComponent.tsx</span>
                </div>

                {/* Code Body */}
                <div style={{ flexGrow: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left', lineHeight: '1.4' }}>
                  <div>
                    <span style={{ color: '#F43F5E' }}>import</span> <span style={{ color: '#E2E8F0' }}>React</span> <span style={{ color: '#F43F5E' }}>from</span> <span style={{ color: '#10B981' }}>'react'</span><span style={{ color: '#E2E8F0' }}>;</span>
                  </div>
                  <div>
                    <span style={{ color: '#F43F5E' }}>const</span> <span style={{ color: '#3B82F6' }}>Portal</span> <span style={{ color: '#E2E8F0' }}>= ()</span> <span style={{ color: '#F43F5E' }}>=&gt;</span> <span style={{ color: '#E2E8F0' }}>&#123;</span>
                  </div>
                  <div style={{ paddingLeft: '15px' }}>
                    <span style={{ color: '#F43F5E' }}>const</span> <span style={{ color: '#E2E8F0' }}>&#123; active, link &#125; =</span> <span style={{ color: '#3B82F6' }}>useProps</span><span style={{ color: '#E2E8F0' }}>();</span>
                  </div>
                  <div style={{ paddingLeft: '15px' }}>
                    <span style={{ color: '#F43F5E' }}>return</span> <span style={{ color: '#E2E8F0' }}>(</span>
                  </div>
                  <div style={{ paddingLeft: '30px' }}>
                    <span style={{ color: '#6366F1' }}>&lt;</span><span style={{ color: '#EC4899' }}>motion.div</span> <span style={{ color: '#D946EF' }}>className</span><span style={{ color: '#E2E8F0' }}>=</span><span style={{ color: '#10B981' }}>"portal-frame"</span><span style={{ color: '#6366F1' }}>&gt;</span>
                  </div>
                  <div style={{ paddingLeft: '45px' }}>
                    <span style={{ color: '#6366F1' }}>&lt;</span><span style={{ color: '#EC4899' }}>Header</span> <span style={{ color: '#D946EF' }}>title</span><span style={{ color: '#E2E8F0' }}>=</span><span style={{ color: '#10B981' }}>"Oman United"</span> <span style={{ color: '#6366F1' }}>/&gt;</span>
                  </div>
                  <div style={{ paddingLeft: '45px' }}>
                    <span style={{ color: '#6366F1' }}>&lt;</span><span style={{ color: '#EC4899' }}>MobileEmulator</span> <span style={{ color: '#D946EF' }}>responsive</span> <span style={{ color: '#6366F1' }}>/&gt;</span>
                  </div>
                  <div style={{ paddingLeft: '30px' }}>
                    <span style={{ color: '#6366F1' }}>&lt;/</span><span style={{ color: '#EC4899' }}>motion.div</span><span style={{ color: '#6366F1' }}>&gt;</span>
                  </div>
                  <div style={{ paddingLeft: '15px' }}>
                    <span style={{ color: '#E2E8F0' }}>);</span>
                  </div>
                  <div>
                    <span style={{ color: '#E2E8F0' }}>&#125;;</span>
                  </div>

                  {/* Animated Typing Cursor */}
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{
                      width: '6px',
                      height: '11px',
                      background: '#8B5CF6',
                      marginLeft: '60px',
                      marginTop: '3px'
                    }}
                  />
                </div>
              </div>

              {/* Glowing Badge */}
              <div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '0.62rem',
                  fontFamily: 'monospace',
                  color: '#8B5CF6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Typescript React / Angular
              </div>
            </motion.div>
          )}

          {/* STAGE 2: PRODUCT (PORTAL & MOBILE) */}
          {stage === 2 && (
            <motion.div
              key="product-stage"
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: -15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Web Portal (Left) & Mobile App (Right) Layout Wireframes */}
              <div style={{ position: 'relative', width: '90%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* 1. Web Portal Wireframe Mockup */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{
                    width: '65%',
                    height: '75%',
                    background: 'rgba(10, 10, 10, 0.8)',
                    border: '1.5px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    marginRight: '15%'
                  }}
                >
                  {/* Browser top */}
                  <div style={{ display: 'flex', gap: '3px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '5px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                  </div>
                  
                  {/* Browser grid body */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '7px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.4)' }} />
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ width: '15px', height: '5px', borderRadius: '1px', background: 'rgba(255,255,255,0.08)' }} />
                        <div style={{ width: '15px', height: '5px', borderRadius: '1px', background: 'rgba(255,255,255,0.08)' }} />
                      </div>
                    </div>
                    {/* Large image placeholder */}
                    <div style={{ height: '40px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.45rem', opacity: 0.15, color: '#fff' }}>Portal Dashboard</span>
                    </div>
                    {/* 3 small grid cards */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ flex: 1, height: '22px', borderRadius: '3px', background: 'rgba(16,185,129,0.06)', border: '1.5px solid rgba(16,185,129,0.15)' }} />
                      <div style={{ flex: 1, height: '22px', borderRadius: '3px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }} />
                      <div style={{ flex: 1, height: '22px', borderRadius: '3px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }} />
                    </div>
                    {/* Bottom stats row */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: 'auto' }}>
                      <div style={{ width: '80%', height: '5px', borderRadius: '1.5px', background: 'rgba(255,255,255,0.05)' }} />
                      <div style={{ width: '55%', height: '5px', borderRadius: '1.5px', background: 'rgba(255,255,255,0.05)' }} />
                    </div>
                  </div>
                </motion.div>

                {/* 2. Mobile App Mockup (Slightly overlapping on the right) */}
                <motion.div
                  initial={{ x: 20, opacity: 0, scale: 0.95 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  style={{
                    position: 'absolute',
                    right: '5%',
                    width: '32%',
                    height: '80%',
                    background: 'rgba(15, 15, 15, 0.9)',
                    border: '2px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '18px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                    padding: '8px 5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    zIndex: 10
                  }}
                >
                  {/* Phone Notch */}
                  <div style={{ width: '22px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', alignSelf: 'center', marginBottom: '4px' }} />
                  
                  {/* App Screen layout */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                      <div style={{ width: '28px', height: '5px', borderRadius: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>
                    {/* Chart visualizer */}
                    <div style={{ height: '32px', borderRadius: '4px', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)', position: 'relative', overflow: 'hidden' }}>
                      <svg width="100%" height="100%">
                        <path d="M 0 24 Q 15 8 30 18 T 60 12 L 80 20" fill="none" stroke="#10B981" strokeWidth="1.5" />
                      </svg>
                    </div>
                    {/* List items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
                      <div style={{ height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
                      <div style={{ height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
                    </div>
                    {/* CTA Button */}
                    <div style={{ height: '14px', borderRadius: '3px', background: '#10B981', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '25px', height: '4px', background: '#fff', opacity: 0.9, borderRadius: '1px' }} />
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Glowing Badge */}
              <div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '0.62rem',
                  fontFamily: 'monospace',
                  color: '#10B981',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Production Portals & Mobile Apps
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Stage Pipeline Controls */}
      <div 
        style={{
          width: '90%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          padding: '10px 0',
          zIndex: 10
        }}
      >
        {/* Horizontal Pipeline Link Line */}
        <div 
          style={{
            position: 'absolute',
            left: '10%',
            right: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '1.5px',
            background: 'rgba(255,255,255,0.06)',
            zIndex: 0
          }}
        />
        {/* Active Stage Progress line */}
        <motion.div 
          animate={{
            left: '10%',
            width: stage === 0 ? '0%' : stage === 1 ? '40%' : '80%'
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '1.5px',
            background: `linear-gradient(90deg, #FF6B4A, ${stage === 1 ? '#8B5CF6' : '#10B981'})`,
            zIndex: 1
          }}
        />

        {stages.map((st, i) => {
          const isActive = stage === i;
          return (
            <button
              key={st.name}
              onClick={() => setStage(i)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                zIndex: 2,
                padding: 0
              }}
            >
              {/* Node Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.3 : 1,
                  backgroundColor: isActive ? st.color : 'rgba(22, 22, 22, 0.9)',
                  borderColor: isActive ? st.color : 'rgba(255,255,255,0.15)'
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: '1.5px solid',
                  boxShadow: isActive ? `0 0 15px ${st.color}50` : 'none',
                }}
              />
              {/* Text Label */}
              <span 
                style={{
                  fontSize: '0.62rem',
                  fontWeight: isActive ? 800 : 500,
                  fontFamily: 'monospace',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.35)',
                  transition: 'color 0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {st.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroMotionGraphics;
