import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('enter'); // enter -> hold -> exit
  const loadingProgress = useMotionValue(0);
  const displayPercent = useTransform(loadingProgress, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    // Animate the loading percentage from 0 to 100 over the total splash duration
    const controls = animate(loadingProgress, 100, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });

    // Phase 2: Hold for a moment then exit (reduced from 2.8s to 1.8s)
    const holdTimer = setTimeout(() => {
      setPhase('exit');
    }, 1800);

    // Phase 3: Exit and notify parent
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      controls.stop();
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete, loadingProgress]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background lines */}
          <div className="splash-lines">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="splash-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.15 * i,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            ))}
          </div>

          {/* Corner accents */}
          <motion.div
            className="splash-corner splash-corner--tl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="splash-corner splash-corner--br"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Main content */}
          <div className="splash-content">
            {/* "Design by" text */}
            <div className="splash-label-wrapper">
              <motion.span
                className="splash-label"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Design by
              </motion.span>
            </div>

            {/* "Eskay" text */}
            <div className="splash-name-wrapper">
              <motion.h1
                className="splash-name"
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {'EsKay'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="splash-char"
                    initial={{ y: 80, opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: 0.7 + i * 0.08,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Decorative underline */}
            <motion.div
              className="splash-underline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* Loading percentage counter */}
            <motion.div
              className="splash-percentage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: '"JetBrains Mono", "SF Mono", "Fira Code", "Cascadia Code", monospace',
                fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
                color: '#FF6B4A',
                letterSpacing: '0.15em',
                marginTop: '1.2rem',
                fontWeight: 400,
                textAlign: 'center',
              }}
            >
              <motion.span>{displayPercent}</motion.span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="splash-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.5,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              UI/UX &bull; Enterprise SaaS &bull; Design Systems
            </motion.p>
          </div>

          {/* Expanding circle transition */}
          {phase === 'exit' && (
            <motion.div
              className="splash-wipe"
              initial={{ scale: 0, borderRadius: '50%' }}
              animate={{ scale: 30, borderRadius: '50%' }}
              transition={{
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
