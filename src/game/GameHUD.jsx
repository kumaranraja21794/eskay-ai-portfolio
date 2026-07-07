import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, ACHIEVEMENTS } from './GameContext';

const RING = 2 * Math.PI * 16;

const GameHUD = () => {
  const { xp, maxXp, level, progress, unlocked } = useGame();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        className="hud-fab"
        aria-label={`Explorer level ${level}, ${progress}% complete`}
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <svg viewBox="0 0 40 40" className="hud-ring">
          <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
          <motion.circle
            cx="20" cy="20" r="16" fill="none"
            stroke="#FF6B4A" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={RING}
            animate={{ strokeDashoffset: RING * (1 - progress / 100) }}
            transition={{ duration: 1, ease: 'easeOut' }}
            transform="rotate(-90 20 20)"
          />
        </svg>
        <span className="hud-level">L{level}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="hud-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hud-panel-head">
              <span className="hud-panel-title">Visitor Quest</span>
              <span className="hud-panel-xp">{xp} / {maxXp} XP</span>
            </div>
            <p className="hud-panel-hint">
              Explore the portfolio to unlock achievements. Try ⌘K… or a certain retro cheat code. 👀
            </p>
            <ul className="hud-ach-list">
              {ACHIEVEMENTS.map((a) => {
                const got = unlocked.includes(a.id);
                return (
                  <li key={a.id} className={got ? 'hud-ach got' : 'hud-ach'}>
                    <span className="hud-ach-icon">{got ? a.icon : '🔒'}</span>
                    <span className="hud-ach-text">
                      <b>{got ? a.title : '???'}</b>
                      <i>{got ? a.desc : 'Keep exploring to unlock'}</i>
                    </span>
                    <span className="hud-ach-xp">{a.xp}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameHUD;
