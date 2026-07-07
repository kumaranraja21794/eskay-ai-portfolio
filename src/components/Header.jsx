import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import MenuOverlay from './MenuOverlay';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollY } = useScroll();

  // Hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    // Show border after scrolling past 100px (hero section)
    setHasScrolled(latest > 100);
    // Hide header when scrolling down past 150px
    if (latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Dynamic blur intensity based on scroll position
  const backdropBlur = useTransform(scrollY, [0, 300], [8, 22]);
  const headerBg = useTransform(
    scrollY,
    [0, 200],
    ['rgba(15, 15, 15, 0.4)', 'rgba(15, 15, 15, 0.85)']
  );

  return (
    <>
      <motion.header
        className="craftfolio-header"
        initial={{ y: 0 }}
        animate={{
          y: isHidden ? '-100%' : '0%',
        }}
        transition={{
          duration: 0.35,
          ease: [0.32, 0.72, 0, 1],
        }}
        style={{
          backgroundColor: headerBg,
          backdropFilter: useTransform(backdropBlur, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(backdropBlur, (v) => `blur(${v}px)`),
        }}
      >
        <div className="header-container">
          {/* Logo with letter-spacing expand on hover */}
          <motion.a
            href="#hero"
            className="logo-brand"
            whileHover="hovered"
            initial="idle"
          >
            <span style={{ display: 'flex', alignItems: 'center', fontSize: '1.35rem' }}>
              <motion.span
                style={{ fontWeight: 800, display: 'inline-block' }}
                variants={{
                  idle: { letterSpacing: '-0.04em' },
                  hovered: { letterSpacing: '0.08em' },
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                ES
              </motion.span>
              <motion.span
                style={{ fontWeight: 300, marginLeft: '1px', color: '#A0A0A0', display: 'inline-block' }}
                variants={{
                  idle: { letterSpacing: '0.15em' },
                  hovered: { letterSpacing: '0.3em' },
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                KAY
              </motion.span>
            </span>
          </motion.a>

          <div className="header-right">
            {/* Menu button with smooth rotation on click */}
            <motion.button
              className="btn-icon-outline"
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.08, borderColor: '#FF6B4A' }}
              whileTap={{ scale: 0.92 }}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Menu size={20} />
            </motion.button>
            <motion.a
              href="#contact"
              className="btn-hire-me"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Hire Me
            </motion.a>
          </div>
        </div>

        {/* Subtle bottom border that fades in after scrolling past hero */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,107,74,0.3), rgba(255,255,255,0.08), rgba(255,107,74,0.3), transparent)',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: hasScrolled ? 1 : 0,
            scaleX: hasScrolled ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
