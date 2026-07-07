import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState('default');
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState([]);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // High-performance responsive springs for smooth trailing drag
  const followerX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const followerY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  const moveCursor = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const handleHoverStart = useCallback((e) => {
    const target = e.target;
    if (target && target.closest) {
      if (target.closest('input, textarea, [contenteditable="true"]')) {
        setCursorType('text');
      } else if (target.closest('.project-item-ref, .featured-project, .project-visual-ref')) {
        setCursorType('project');
      } else if (target.closest('.contact-section, .contact-email-link')) {
        setCursorType('contact');
      } else if (target.closest('a, button, [role="button"], .exp-item, .skill-card, .view-btn, .nav-link, .menu-item, .magnetic-wrap')) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsClicked(true);
    const target = e.target;
    // Spawn ripple unless we are hovering over an input
    if (target && target.closest && !target.closest('input, textarea, [contenteditable="true"]')) {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);
    }
  }, []);

  const handleMouseUp = useCallback(() => setIsClicked(false), []);

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [moveCursor, handleHoverStart, handleMouseDown, handleMouseUp]);

  const getFollowerSize = () => {
    switch (cursorType) {
      case 'project': return 80;
      case 'contact': return 90;
      case 'hover': return 40;
      case 'text': return 0;
      default: return 20;
    }
  };

  const getFollowerLabel = () => {
    switch (cursorType) {
      case 'project': return 'VIEW ↗';
      case 'contact': return 'SAY HI 👋';
      default: return null;
    }
  };

  return (
    <>
      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: ripple.x,
            y: ripple.y,
            pointerEvents: 'none',
            zIndex: 99997,
            width: 8,
            height: 8,
            borderRadius: '50%',
            border: '1.5px solid #FF6B4A',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(ripple.id)}
        />
      ))}

      {/* Precision Center Point / Blinking I-Beam */}
      <motion.div
        id="custom-cursor"
        style={{
          x: mouseX,
          y: mouseY,
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: cursorType === 'text' ? 2 : (isClicked ? 4 : 6),
          height: cursorType === 'text' ? 18 : (isClicked ? 4 : 6),
          borderRadius: cursorType === 'text' ? '1px' : '50%',
          backgroundColor: '#FF6B4A',
          opacity: cursorType === 'text' ? [1, 0, 1] : 1,
        }}
        transition={{
          opacity: cursorType === 'text' ? { repeat: Infinity, duration: 1, ease: 'easeInOut' } : { duration: 0.2 },
          width: { type: 'spring', damping: 25, stiffness: 450 },
          height: { type: 'spring', damping: 25, stiffness: 450 },
          borderRadius: { duration: 0.1 }
        }}
      />
      
      {/* Simple Follower Ring */}
      <motion.div
        id="cursor-follower"
        animate={{
          width: getFollowerSize(),
          height: getFollowerSize(),
          scale: isClicked ? 0.85 : 1,
          opacity: cursorType === 'text' ? 0 : 1,
          backgroundColor: cursorType === 'project' || cursorType === 'contact' 
            ? 'rgba(15, 15, 15, 0.85)' 
            : (cursorType === 'hover' ? 'rgba(255, 107, 74, 0.05)' : 'transparent'),
          borderColor: cursorType === 'project' || cursorType === 'contact' || cursorType === 'hover'
            ? '#FF6B4A' 
            : 'rgba(255, 255, 255, 0.3)',
          borderWidth: cursorType === 'text' ? 0 : 1.5,
        }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        style={{
          x: followerX,
          y: followerY,
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          borderStyle: 'solid',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: cursorType === 'project' || cursorType === 'contact' ? 'blur(8px)' : 'none',
        }}
      >
        <AnimatePresence mode="wait">
          {getFollowerLabel() && (
            <motion.span 
              key={cursorType}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              style={{ 
                color: '#FFF', 
                fontSize: '0.65rem', 
                fontWeight: '700', 
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                zIndex: 2,
              }}
            >
              {getFollowerLabel()}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
