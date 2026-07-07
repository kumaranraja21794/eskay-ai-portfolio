import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from './GameContext';

const Toast = ({ toast, onDone }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone(toast.key), 4200);
    return () => clearTimeout(t);
  }, [toast.key, onDone]);

  return (
    <motion.div
      layout
      className="ach-toast"
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      onClick={() => onDone(toast.key)}
    >
      <motion.span
        className="ach-toast-icon"
        initial={{ rotate: -30, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 15 }}
      >
        {toast.icon}
      </motion.span>
      <div className="ach-toast-body">
        <span className="ach-toast-label">Achievement unlocked</span>
        <span className="ach-toast-title">{toast.title}</span>
        <span className="ach-toast-desc">{toast.desc}</span>
      </div>
      <span className="ach-toast-xp">+{toast.xp} XP</span>
      <motion.div
        className="ach-toast-bar"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 4.2, ease: 'linear' }}
      />
    </motion.div>
  );
};

const AchievementToast = () => {
  const { toasts, dismissToast } = useGame();
  return (
    <div className="ach-toast-stack" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <Toast key={t.key} toast={t} onDone={dismissToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AchievementToast;
