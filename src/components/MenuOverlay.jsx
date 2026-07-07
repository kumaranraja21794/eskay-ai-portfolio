import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const menuItems = [
  'Facebook',
  'LinkedIn',
  'Instagram'
];

// Curtain overlay variants
const overlayVariants = {
  initial: { y: '-100%' },
  animate: { y: 0 },
  exit: { y: '-100%' },
};

// Container for staggering children
const listVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

// Individual menu item variants
const itemVariants = {
  initial: { opacity: 0, y: 60, x: -20 },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// Header content variants
const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const MenuOverlay = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="menu-overlay"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated noise/grain texture */}
          <div className="menu-overlay-grain" />

          {/* Header */}
          <motion.div
            className="menu-header"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="menu-header-left">
              <span className="follow-me">Follow Me</span>
              <h2>MORE WORK ON</h2>
            </div>
            {/* Close button with rotation on hover */}
            <motion.button
              className="menu-close-btn"
              onClick={onClose}
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <X size={32} />
            </motion.button>
          </motion.div>

          {/* Menu items with staggered curtain reveal */}
          <motion.div
            className="menu-items-list"
            variants={listVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {menuItems.map((item, index) => (
              <motion.div
                className="flip-container"
                key={item}
                variants={itemVariants}
                style={{ position: 'relative' }}
              >
                {/* Large background number */}
                <motion.span
                  className="menu-item-bg-number"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 0.04, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.08, duration: 0.8 }}
                  style={{
                    position: 'absolute',
                    left: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 'clamp(3rem, 6vw, 6rem)',
                    fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                    color: '#fff',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    lineHeight: 1,
                    zIndex: 0,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>

                {/* Menu item with hover effects */}
                <motion.div
                  className="flip-flipper"
                  style={{ position: 'relative', zIndex: 1 }}
                  whileHover={{
                    scale: 1.05,
                    x: 20,
                    color: '#FF6B4A',
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                >
                  <div className="flip-front">
                    {item}
                    {/* Animated underline on hover (CSS-driven via parent hover) */}
                    <motion.div
                      className="menu-item-underline"
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        height: '2px',
                        width: '100%',
                        background: 'linear-gradient(90deg, #FF6B4A, transparent)',
                        transformOrigin: 'left',
                        scaleX: 0,
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div className="flip-back">
                    {item} <span>&rarr;</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
