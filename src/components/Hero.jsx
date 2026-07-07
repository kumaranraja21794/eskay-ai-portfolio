import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import { ChevronDown } from 'lucide-react';
import HeroMotionGraphics from './HeroMotionGraphics';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], ['0px', '-40px']);

  return (
    <section id="hero" className="vortiq-hero" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: '#0F0F0F' }}>
      
      {/* Background Image with Parallax */}
      <motion.div 
        className="hero-subject-wrapper" 
        style={{ 
          position: 'absolute', inset: 0, zIndex: 1,
          y: bgY,
          scale: bgScale,
        }}
      >
        <img 
          src="/hero-bg-v13.png" 
          alt="Hero Background" 
          style={{ 
            height: '100%', 
            width: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center',
            opacity: 1
          }} 
        />
        {/* Spotlight Vignette to highlight the user's portrait and keep text/graphics dark and high-contrast */}
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            zIndex: 2, 
            pointerEvents: 'none', 
            background: 'radial-gradient(circle at 45% 55%, transparent 15%, rgba(15,15,15,0.4) 40%, rgba(15,15,15,0.95) 75%, #0F0F0F 100%)' 
          }} 
        />
        {/* Soft horizontal gradient edges for additional text and motion graphics readability */}
        <div 
          className="hero-gradient-overlay" 
          style={{ 
            zIndex: 3, 
            pointerEvents: 'none', 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to right, #0F0F0F 0%, rgba(15,15,15,0.95) 20%, rgba(15,15,15,0.1) 45%, rgba(15,15,15,0.1) 60%, rgba(15,15,15,0.95) 80%, #0F0F0F 100%)' 
          }} 
        />
        {/* Soft bottom fade to blend into the next section */}
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            zIndex: 4, 
            pointerEvents: 'none', 
            background: 'linear-gradient(to top, #0F0F0F 0%, rgba(15,15,15,0.8) 15%, transparent 50%)' 
          }} 
        />
      </motion.div>

      <motion.div 
        className="vortiq-container" 
        style={{ 
          position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: '0 auto', 
          height: '100vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          padding: '0 5vw', boxSizing: 'border-box',
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        
        {/* Left Column */}
        <div className="vortiq-left" style={{ flex: 1, maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <motion.div 
              style={{ width: 40, height: 1, background: '#FF6B4A' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              AI-Powered Design Agency · UI/UX & Frontend
            </span>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', 
                fontWeight: 600, 
                color: '#FFF', 
                lineHeight: '1.1',
                letterSpacing: '-0.03em',
                margin: 0
              }}
            >
              {'Designing'.split('').map((char, i) => (
                <motion.span
                  key={`c1-${i}`}
                  initial={{ y: 80, opacity: 0, rotateX: 40 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.3 + i * 0.03, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                >
                  {char}
                </motion.span>
              ))}
              <br />
              {'& Coding'.split('').map((char, i) => (
                <motion.span
                  key={`c2-${i}`}
                  initial={{ y: 80, opacity: 0, rotateX: 40 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.6 + i * 0.03, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                >
                  {char}
                </motion.span>
              ))}
              <br />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>
                {'Products'.split('').map((char, i) => (
                  <motion.span
                    key={`c3-${i}`}
                    initial={{ y: 80, opacity: 0, rotateX: 40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.85 + i * 0.025, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </div>
          
          <motion.div 
            className="vortiq-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}
          >
            <motion.a 
              href="#contact" 
              className="hero-cta-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,107,74,0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{ 
                background: '#FF6B4A', color: '#FFF', padding: '0.9rem 2rem', borderRadius: '100px', 
                fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem', 
                transition: 'all 0.3s ease', display: 'inline-block',
                fontFamily: 'var(--font-body)',
              }}
            >
              Hire Me
            </motion.a>
            <motion.a 
              href="#projects" 
              className="hero-cta-secondary"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,107,74,0.6)' }}
              whileTap={{ scale: 0.97 }}
              style={{ 
                background: 'transparent', color: '#FFF', padding: '0.9rem 2rem', borderRadius: '100px', 
                border: '1px solid rgba(255,255,255,0.2)', fontWeight: 500, textDecoration: 'none', 
                fontSize: '0.95rem', transition: 'all 0.3s ease', display: 'inline-block',
                fontFamily: 'var(--font-body)',
              }}
            >
              View Work
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column with Motion Graphics */}
        <div className="vortiq-right" style={{ flex: 1.2, maxWidth: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <HeroMotionGraphics />
        </div>
      </motion.div>
      
      {/* Decorative reticles with pulse */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '20%', left: '5%', color: 'rgba(255,107,74,0.4)', zIndex: 10, fontSize: '1.2rem', fontWeight: 300 }}
      >+</motion.div>
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: '20%', left: '5%', color: 'rgba(255,107,74,0.4)', zIndex: 10, fontSize: '1.2rem', fontWeight: 300 }}
      >+</motion.div>
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2], rotate: [0, 90, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ position: 'absolute', top: '25%', right: '5%', color: 'rgba(255,107,74,0.4)', zIndex: 10, fontSize: '1.2rem', fontWeight: 300 }}
      >+</motion.div>

      {/* Scroll down indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: '3vh', left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        }}
      >
        <motion.span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} color="rgba(255,255,255,0.7)" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
