import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, PenTool, Rocket } from 'lucide-react';
import TextReveal from './TextReveal';

const stepIcons = [Search, Target, PenTool, Rocket];

// 1. Discover Visual: Concentric radar grid with a rotating sweep line and blinking nodes
const DiscoverVisual = () => {
  return (
    <div className="process-visual-box radar-sweep-box">
      <svg className="radar-grid" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" className="radar-ring radar-ring-1" />
        <circle cx="50" cy="50" r="24" className="radar-ring radar-ring-2" />
        <circle cx="50" cy="50" r="10" className="radar-ring radar-ring-3" />
        <line x1="50" y1="8" x2="50" y2="92" className="radar-axis-y" />
        <line x1="8" y1="50" x2="92" y2="50" className="radar-axis-x" />
        {/* Rotating sweep line */}
        <motion.line 
          x1="50" 
          y1="50" 
          x2="50" 
          y2="12" 
          className="radar-sweep-line"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        />
      </svg>
      {/* Blinking signal nodes */}
      <div className="radar-signal signal-1"></div>
      <div className="radar-signal signal-2"></div>
    </div>
  );
};

// 2. Define Visual: Venn Diagram representing overlapping user needs & business goals
const DefineVisual = () => {
  return (
    <div className="process-visual-box venn-diagram-box">
      <div className="venn-container">
        {/* User Needs circle */}
        <motion.div 
          className="venn-circle user-circle"
          animate={{ x: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <span className="venn-label">User Needs</span>
        </motion.div>
        {/* Business Goals circle */}
        <motion.div 
          className="venn-circle business-circle"
          animate={{ x: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <span className="venn-label">Business</span>
        </motion.div>
        {/* Intersecting node */}
        <div className="venn-intersection">
          <motion.div 
            className="intersection-core"
            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

// 3. Design Visual: A wireframe bento canvas building itself in a loop
const DesignVisual = () => {
  return (
    <div className="process-visual-box wireframe-canvas">
      <div className="wireframe-container">
        {/* Sidebar */}
        <motion.div 
          className="wf-sidebar"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
        />
        
        {/* Main Content Pane */}
        <div className="wf-main-content">
          {/* Header */}
          <motion.div 
            className="wf-header"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, repeat: Infinity, repeatType: "reverse", repeatDelay: 4.2 }}
          />
          {/* Bento grid layout block outlines */}
          <div className="wf-blocks-grid">
            <motion.div 
              className="wf-block block-a"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 4.5 }}
            />
            <motion.div 
              className="wf-block block-b"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 4.5 }}
            />
            <motion.div 
              className="wf-block block-c"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0, repeat: Infinity, repeatType: "reverse", repeatDelay: 4.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Deliver Visual: A progress loading ring ending in a successful checkmark pulse
const DeliverVisual = () => {
  return (
    <div className="process-visual-box deliver-release-box">
      <div className="release-container">
        <svg className="release-progress-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="36" className="release-ring-bg" />
          <motion.circle 
            cx="50" 
            cy="50" 
            r="36" 
            className="release-ring-fill" 
            initial={{ strokeDashoffset: 226 }}
            animate={{ strokeDashoffset: [226, 0, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 2
            }}
          />
        </svg>
        {/* Success Checkmark */}
        <motion.div 
          className="release-check-icon"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.4, 0.9, 1]
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

const visualComponents = [DiscoverVisual, DefineVisual, DesignVisual, DeliverVisual];

const ProcessStep = ({ title, desc, index }) => {
  const VisualComp = visualComponents[index] || DiscoverVisual;
  
  return (
    <motion.article
      className="process-bento-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      style={{
        background: 'rgba(22, 22, 22, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '32px',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        transition: 'border-color 0.4s, box-shadow 0.4s'
      }}
    >
      {/* Dynamic Conic Glow Outline Border Trace on Hover */}
      <div className="process-card-glow" />

      {/* Card Header: Step Index Badge & Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF6B4A', letterSpacing: '0.12em', fontFamily: 'var(--font-heading)' }}>
          0{index + 1} / PHASE
        </span>
        <div 
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: 'rgba(255,107,74,0.08)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#FF6B4A',
            flexShrink: 0
          }}
        >
          {React.createElement(stepIcons[index] || Search, { size: 18 })}
        </div>
      </div>

      {/* Dynamic Visual Box Panel */}
      <div style={{ zIndex: 2 }}>
        <VisualComp />
      </div>

      {/* Footer Text Details */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem', zIndex: 2 }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0, color: '#fff', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-body)' }}>
          {desc}
        </p>
      </div>
    </motion.article>
  );
};

const Process = () => {
  const steps = [
    { title: 'Discover', desc: 'Immersion into the problem space through user interviews, audits, and competitive research.' },
    { title: 'Define', desc: 'Synthesis of research into personas, journey maps, and clear product requirements.' },
    { title: 'Design', desc: 'Iterative wireframing and high-fidelity prototyping with a focus on core user loops.' },
    { title: 'Deliver', desc: 'Polished UI assets, documentation, and handoff to the engineering teams.' },
  ];

  return (
    <section
      id="process"
      className="process"
      style={{
        padding: '10rem 0',
        background: '#0d0d0d',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric radial ambient background overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,107,74,0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <TextReveal
          as="h2"
          mode="word"
          stagger={0.03}
          duration={0.5}
          className="process-heading"
          style={{
            fontSize: '1.1rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '8vh',
            letterSpacing: '0.4em',
            color: 'var(--accent-primary, #FF6B4A)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          DESIGN METHODOLOGY
        </TextReveal>

        <div className="process-bento-grid">
          {steps.map((step, i) => (
            <ProcessStep key={i} {...step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
