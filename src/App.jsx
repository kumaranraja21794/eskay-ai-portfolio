import React, { useEffect, useState, useCallback, useRef } from 'react';
import './designova.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Process from './components/Process';
import Contact from './components/Contact';
import ResumeSections from './components/ResumeSections';
import ProgressBar from './components/ProgressBar';
import Background from './components/Background';
import CaseStudyAlpha from './components/CaseStudyAlpha';
import CaseStudyBitwise from './components/CaseStudyBitwise';
import SplashScreen from './components/SplashScreen';
import MarqueeStrip from './components/MarqueeStrip';
import { GameProvider, useGame } from './game/GameContext';
import AchievementToast from './game/AchievementToast';
import GameHUD from './game/GameHUD';
import CommandPalette from './game/CommandPalette';
import KonamiConfetti from './game/KonamiConfetti';
import SectionSpy from './game/SectionSpy';
import './game/game.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppShell() {
  const [showSplash, setShowSplash] = useState(true);
  const lenisRef = useRef(null);
  const { partyMode } = useGame();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (showSplash) return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [showSplash]);

  // Lock scroll during splash
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showSplash]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <div className={partyMode ? 'App party-mode' : 'App'}>

      <SectionSpy />
      <CommandPalette />
      <KonamiConfetti />
      <AchievementToast />
      {!showSplash && <GameHUD />}

      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <ScrollToTop />
        <ProgressBar />
        <Background />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <MarqueeStrip 
                  items={['UI DESIGN', 'UX RESEARCH', 'PROTOTYPING', 'DESIGN SYSTEMS', 'USER FLOWS', 'WIREFRAMING', 'FIGMA', 'USER TESTING']}
                  speed={25}
                  separator="✦"
                  className="marquee-dark"
                />
                <ResumeSections />
                <MarqueeStrip 
                  items={['VISUAL DESIGN', 'INTERACTION DESIGN', 'MICRO-ANIMATIONS', 'RESPONSIVE DESIGN', 'ACCESSIBILITY', 'DESIGN TOKENS']}
                  speed={30}
                  separator="◆"
                  reverse={true}
                  className="marquee-accent"
                />
                <Skills />
                <Projects />
                <MarqueeStrip 
                  items={['DISCOVER', 'DEFINE', 'DESIGN', 'DELIVER', 'ITERATE', 'REFINE', 'LAUNCH', 'MEASURE']}
                  speed={20}
                  separator="→"
                  className="marquee-dark"
                />
                <Process />
                <Contact />
              </>
            } />
            <Route path="/case-study/alpha-arena" element={<CaseStudyAlpha />} />
            <Route path="/case-study/bitwise" element={<CaseStudyBitwise />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', padding: '3rem 0' }}
            >
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
                &copy; 2026 EsKay. Built with React and Precision.
              </p>
            </motion.div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppShell />
    </GameProvider>
  );
}

export default App;
