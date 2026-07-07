import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';

/* ---------------------------------------------------------------------------
 * EsKay Portfolio — Gamification Core
 * Achievements + XP + exploration tracking, persisted in localStorage.
 * ------------------------------------------------------------------------- */

export const ACHIEVEMENTS = [
  { id: 'initiate',        icon: '🚀', xp: 50,  title: 'Initiate',          desc: 'Entered the experience' },
  { id: 'explorer',        icon: '🧭', xp: 100, title: 'Explorer',          desc: 'Visited every section' },
  { id: 'inspector',       icon: '🔍', xp: 75,  title: 'Project Inspector', desc: 'Opened a project detail' },
  { id: 'deep-diver',      icon: '🤿', xp: 100, title: 'Deep Diver',        desc: 'Read a full case study' },
  { id: 'commander',       icon: '⌘',  xp: 75,  title: 'Commander',         desc: 'Used the command palette' },
  { id: 'konami-legend',   icon: '👾', xp: 150, title: 'Konami Legend',     desc: 'Entered the sacred code' },
  { id: 'connector',       icon: '🤝', xp: 100, title: 'Connector',         desc: 'Reached out via contact' },
  { id: 'night-owl',       icon: '🦉', xp: 50,  title: 'Night Owl',         desc: 'Visited after midnight' },
];

export const SECTIONS = ['hero', 'career-highlights', 'skills', 'projects', 'process', 'contact'];

const STORAGE_KEY = 'eskay-game-v1';
const MAX_XP = ACHIEVEMENTS.reduce((s, a) => s + a.xp, 0);

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { unlocked: raw?.unlocked ?? [], visited: raw?.visited ?? [] };
  } catch {
    return { unlocked: [], visited: [] };
  }
};

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(load);
  const [toasts, setToasts] = useState([]);
  const [partyMode, setPartyMode] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* private mode */ }
  }, [state]);

  const unlock = useCallback((id) => {
    setState((prev) => {
      if (prev.unlocked.includes(id)) return prev;
      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      if (!ach) return prev;
      setToasts((t) => [...t, { ...ach, key: `${id}-${Date.now()}` }]);
      return { ...prev, unlocked: [...prev.unlocked, id] };
    });
  }, []);

  const visitSection = useCallback((sectionId) => {
    setState((prev) => {
      if (prev.visited.includes(sectionId)) return prev;
      return { ...prev, visited: [...prev.visited, sectionId] };
    });
  }, []);

  const dismissToast = useCallback((key) => {
    setToasts((t) => t.filter((x) => x.key !== key));
  }, []);

  // Auto-achievements
  useEffect(() => {
    const t = setTimeout(() => {
      unlock('initiate');
      const h = new Date().getHours();
      if (h >= 0 && h < 5) unlock('night-owl');
    }, 4500);
    return () => clearTimeout(t);
  }, [unlock]);

  useEffect(() => {
    if (SECTIONS.every((s) => state.visited.includes(s))) unlock('explorer');
  }, [state.visited, unlock]);

  const xp = useMemo(
    () => state.unlocked.reduce((s, id) => s + (ACHIEVEMENTS.find((a) => a.id === id)?.xp ?? 0), 0),
    [state.unlocked]
  );

  const value = useMemo(() => ({
    unlocked: state.unlocked,
    visited: state.visited,
    xp,
    maxXp: MAX_XP,
    level: 1 + Math.floor((xp / MAX_XP) * 4), // levels 1–5
    progress: Math.round((xp / MAX_XP) * 100),
    toasts,
    partyMode,
    setPartyMode,
    unlock,
    visitSection,
    dismissToast,
  }), [state, xp, toasts, partyMode, unlock, visitSection, dismissToast]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
