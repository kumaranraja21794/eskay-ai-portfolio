import React, { useEffect, useRef } from 'react';
import './designova.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Home from './studio/Home';
import ProgressBar from './components/ProgressBar';
import CaseStudyAlpha from './components/CaseStudyAlpha';
import CaseStudyBitwise from './components/CaseStudyBitwise';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const CaseStudyLayout = ({ children }) => (
  <>
    <ProgressBar />
    {children}
  </>
);

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
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

    return () => lenis.destroy();
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/alpha-arena" element={<CaseStudyLayout><CaseStudyAlpha /></CaseStudyLayout>} />
        <Route path="/case-study/bitwise" element={<CaseStudyLayout><CaseStudyBitwise /></CaseStudyLayout>} />
      </Routes>
    </div>
  );
}

export default App;
