import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGame } from './GameContext';

const COMMANDS = [
  { id: 'hero',              label: 'Go to Top',           hint: 'Section', type: 'scroll' },
  { id: 'career-highlights', label: 'Career Journey',      hint: 'Section', type: 'scroll' },
  { id: 'skills',            label: 'Skills & Playground', hint: 'Section', type: 'scroll' },
  { id: 'projects',          label: 'Projects',            hint: 'Section', type: 'scroll' },
  { id: 'process',           label: 'Design Process',      hint: 'Section', type: 'scroll' },
  { id: 'contact',           label: 'Contact / Hire Me',   hint: 'Section', type: 'scroll' },
  { id: '/case-study/alpha-arena', label: 'Case Study — Alpha Arena', hint: 'Deep dive', type: 'route' },
  { id: '/case-study/bitwise',     label: 'Case Study — BitWise',     hint: 'Deep dive', type: 'route' },
  { id: 'mailto:kumaranraja210794@gmail.com', label: 'Email EsKay', hint: 'Action', type: 'href' },
  { id: 'https://www.linkedin.com/in/sakthi-kumaran-62645372/', label: 'Open LinkedIn', hint: 'Action', type: 'href' },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { unlock } = useGame();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q)) : COMMANDS;
  }, [query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      unlock('commander');
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open, unlock]);

  const run = (cmd) => {
    setOpen(false);
    if (!cmd) return;
    if (cmd.type === 'href') {
      window.open(cmd.id, '_blank', 'noopener');
    } else if (cmd.type === 'route') {
      navigate(cmd.id);
    } else {
      const go = () => document.getElementById(cmd.id)?.scrollIntoView({ behavior: 'smooth' });
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(go, 450);
      } else {
        go();
      }
    }
  };

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); run(results[active]); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="cmdk-panel"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              className="cmdk-input"
              placeholder="Type a command or search…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActive(0); }}
              onKeyDown={onInputKey}
            />
            <ul className="cmdk-list">
              {results.length === 0 && <li className="cmdk-empty">No matches</li>}
              {results.map((c, i) => (
                <li
                  key={c.id}
                  className={i === active ? 'cmdk-item active' : 'cmdk-item'}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(c)}
                >
                  <span>{c.label}</span>
                  <em>{c.hint}</em>
                </li>
              ))}
            </ul>
            <div className="cmdk-foot">↑↓ navigate · ↵ select · esc close</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
