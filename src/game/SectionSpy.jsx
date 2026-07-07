import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGame, SECTIONS } from './GameContext';

/** Marks sections as visited via IntersectionObserver; unlocks deep-diver on case-study routes. */
const SectionSpy = () => {
  const { visitSection, unlock } = useGame();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/case-study/')) {
      unlock('inspector');
      const t = setTimeout(() => unlock('deep-diver'), 12000);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            visitSection(e.target.id);
            if (e.target.id === 'contact') unlock('connector');
          }
        });
      },
      { threshold: 0.25 }
    );

    // Sections mount after the splash screen, so retry until found.
    let tries = 0;
    const attach = () => {
      const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
      if (els.length < SECTIONS.length && tries++ < 20) {
        setTimeout(attach, 500);
        return;
      }
      els.forEach((el) => observer.observe(el));
    };
    attach();

    return () => observer.disconnect();
  }, [location.pathname, visitSection, unlock]);

  return null;
};

export default SectionSpy;
