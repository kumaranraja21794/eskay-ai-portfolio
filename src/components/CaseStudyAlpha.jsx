import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, X, Move } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Cursor, Rise, Scramble, Magnet, DotGrid } from '../studio/fx';
import '../studio/styles.css';

const FIGMA_URL =
  'https://www.figma.com/proto/7N19TYywTBVaZj4IA4jhmx/Sakthi-Kumaran-s-team-library?page-id=418%3A2&node-id=1004-1163&p=f&viewport=233%2C-2344%2C0.32&t=RpaANh85uJ9l3jx9-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1004%3A1163&show-proto-sidebar=1';

const FigmaGlyph = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M19 28.5C19 25.98 20 23.56 21.78 21.78C23.56 20 25.98 19 28.5 19C31.02 19 33.44 20 35.22 21.78C37 23.56 38 25.98 38 28.5C38 31.02 37 33.44 35.22 35.22C33.44 37 31.02 38 28.5 38C25.98 38 23.56 37 21.78 35.22C20 33.44 19 31.02 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 44.98 1 42.56 2.78 40.78C4.56 39 6.98 38 9.5 38H19V47.5C19 50.02 18 52.44 16.22 54.22C14.44 56 12.02 57 9.5 57C6.98 57 4.56 56 2.78 54.22C1 52.44 0 50.02 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C31.02 19 33.44 18 35.22 16.22C37 14.44 38 12.02 38 9.5C38 6.98 37 4.56 35.22 2.78C33.44 1 31.02 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 12.02 1 14.44 2.78 16.22C4.56 18 6.98 19 9.5 19H19V0H9.5C6.98 0 4.56 1 2.78 2.78C1 4.56 0 6.98 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 31.02 1 33.44 2.78 35.22C4.56 37 6.98 38 9.5 38H19V19H9.5C6.98 19 4.56 20 2.78 21.78C1 23.56 0 25.98 0 28.5Z" fill="#A259FF"/>
  </svg>
);

/* ---------------- Model performance simulator ---------------- */
const modelData = {
  alpha: {
    name: 'Alpha-Max', color: '#ff5c00', badge: 'Momentum',
    stats: { return: '+184.2%', winRate: '68.5%', trades: '1,240', sharpe: '2.4', drawdown: '-8.2%' },
    desc: 'High-frequency momentum model optimized for large-cap crypto indices.',
    points: [
      { x: 0, y: 250, value: 0, date: 'Month 1' }, { x: 60, y: 220, value: 15, date: 'Month 2' },
      { x: 120, y: 240, value: 10, date: 'Month 3' }, { x: 180, y: 170, value: 45, date: 'Month 4' },
      { x: 240, y: 190, value: 38, date: 'Month 5' }, { x: 300, y: 130, value: 75, date: 'Month 6' },
      { x: 360, y: 150, value: 68, date: 'Month 7' }, { x: 420, y: 80, value: 120, date: 'Month 8' },
      { x: 480, y: 100, value: 112, date: 'Month 9' }, { x: 540, y: 50, value: 155, date: 'Month 10' },
      { x: 600, y: 30, value: 184.2, date: 'Month 11' },
    ],
  },
  beta: {
    name: 'Beta-Gold', color: '#7ddb63', badge: 'Conservative',
    stats: { return: '+128.6%', winRate: '72.1%', trades: '840', sharpe: '2.8', drawdown: '-5.4%' },
    desc: 'Conservative risk-adjusted trend-following algorithm targeting commodity futures.',
    points: [
      { x: 0, y: 250, value: 0, date: 'Month 1' }, { x: 60, y: 235, value: 8, date: 'Month 2' },
      { x: 120, y: 210, value: 21, date: 'Month 3' }, { x: 180, y: 195, value: 29, date: 'Month 4' },
      { x: 240, y: 170, value: 42, date: 'Month 5' }, { x: 300, y: 150, value: 53, date: 'Month 6' },
      { x: 360, y: 130, value: 65, date: 'Month 7' }, { x: 420, y: 110, value: 78, date: 'Month 8' },
      { x: 480, y: 95, value: 87, date: 'Month 9' }, { x: 540, y: 70, value: 105, date: 'Month 10' },
      { x: 600, y: 55, value: 128.6, date: 'Month 11' },
    ],
  },
  neural: {
    name: 'Neural-Net', color: '#22d3ee', badge: 'Adaptive AI',
    stats: { return: '+242.8%', winRate: '61.2%', trades: '2,150', sharpe: '1.9', drawdown: '-14.6%' },
    desc: 'Deep reinforcement learning model adaptive to high-volatility regime shifts.',
    points: [
      { x: 0, y: 250, value: 0, date: 'Month 1' }, { x: 60, y: 240, value: 5, date: 'Month 2' },
      { x: 120, y: 200, value: 30, date: 'Month 3' }, { x: 180, y: 220, value: 18, date: 'Month 4' },
      { x: 240, y: 150, value: 62, date: 'Month 5' }, { x: 300, y: 180, value: 45, date: 'Month 6' },
      { x: 360, y: 90, value: 110, date: 'Month 7' }, { x: 420, y: 120, value: 95, date: 'Month 8' },
      { x: 480, y: 60, value: 150, date: 'Month 9' }, { x: 540, y: 80, value: 135, date: 'Month 10' },
      { x: 600, y: 10, value: 242.8, date: 'Month 11' },
    ],
  },
};

const ModelPerformanceSimulator = () => {
  const [selectedModel, setSelectedModel] = useState('alpha');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const svgRef = useRef(null);
  const currentModel = modelData[selectedModel];
  const pathD = currentModel.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L 600 300 L 0 300 Z`;

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 600;
    let closest = currentModel.points[0];
    let minDiff = Math.abs(closest.x - svgX);
    for (const p of currentModel.points) {
      const diff = Math.abs(p.x - svgX);
      if (diff < minDiff) { minDiff = diff; closest = p; }
    }
    setHoveredPoint(closest);
  };

  return (
    <div className="performance-simulator">
      <div className="simulator-controls">
        {Object.entries(modelData).map(([key, data]) => (
          <button
            key={key}
            onClick={() => { setSelectedModel(key); setHoveredPoint(null); }}
            className={`simulator-tab ${selectedModel === key ? 'active' : ''}`}
            style={{ '--accent-color': data.color }}
          >
            <span className="tab-indicator" style={{ backgroundColor: data.color }} />
            <span className="tab-name">{data.name}</span>
            <span className="tab-badge">{data.badge}</span>
          </button>
        ))}
      </div>

      <div className="simulator-content-grid">
        <div className="simulator-stats">
          <div className="simulator-desc-card">
            <h4>Model Architecture</h4>
            <p>{currentModel.desc}</p>
          </div>
          <div className="stats-dashboard">
            <div className="stat-box"><label>Net Return</label><span className="stat-val" style={{ color: currentModel.color }}>{currentModel.stats.return}</span></div>
            <div className="stat-box"><label>Win Rate</label><span className="stat-val">{currentModel.stats.winRate}</span></div>
            <div className="stat-box"><label>Sharpe Ratio</label><span className="stat-val">{currentModel.stats.sharpe}</span></div>
            <div className="stat-box"><label>Max Drawdown</label><span className="stat-val drawdown">{currentModel.stats.drawdown}</span></div>
          </div>
        </div>

        <div className="simulator-chart-container">
          <div className="chart-title-bar">
            <div className="live-badge-wrapper">
              <span className="live-dot" style={{ backgroundColor: currentModel.color }} />
              <span className="live-label">LIVE EQUITY SIMULATION</span>
            </div>
            {hoveredPoint ? (
              <div className="chart-tooltip-data">
                <span className="tooltip-date">{hoveredPoint.date}:</span>
                <span className="tooltip-val" style={{ color: currentModel.color }}>+{hoveredPoint.value}% Return</span>
              </div>
            ) : (
              <span className="chart-instruction">Hover chart to inspect epochs</span>
            )}
          </div>

          <div className="svg-chart-wrapper" style={{ position: 'relative' }}>
            <svg ref={svgRef} viewBox="0 0 600 300" width="100%" height="100%" className="trading-svg-chart"
              onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredPoint(null)}>
              <defs>
                <linearGradient id={`gradient-${selectedModel}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={currentModel.color} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={currentModel.color} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {[50, 100, 150, 200, 250].map((y) => (
                <line key={`h-${y}`} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              {[100, 200, 300, 400, 500].map((x) => (
                <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              <motion.path key={`area-${selectedModel}`} d={areaD} fill={`url(#gradient-${selectedModel})`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
              <motion.path key={`line-${selectedModel}`} d={pathD} fill="none" stroke={currentModel.color} strokeWidth="3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
              {hoveredPoint && (
                <line x1={hoveredPoint.x} y1="0" x2={hoveredPoint.x} y2="300" stroke={currentModel.color} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              )}
              {hoveredPoint && (
                <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="6" fill={currentModel.color} stroke="#131311" strokeWidth="2.5" />
              )}
              {!hoveredPoint && (
                <g>
                  <circle cx={currentModel.points.at(-1).x} cy={currentModel.points.at(-1).y} r="5" fill={currentModel.color} />
                  <motion.circle cx={currentModel.points.at(-1).x} cy={currentModel.points.at(-1).y} r="12" fill="none"
                    stroke={currentModel.color} strokeWidth="1.5"
                    initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }} />
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Before / after slider ---------------- */
const ComparisonSlider = ({ before, after }) => {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.type === 'touchmove' ? e.touches[0].pageX : e.pageX) - rect.left;
    setPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };
  return (
    <div ref={ref} className="cs-slider" onMouseMove={onMove} onTouchMove={onMove}>
      <img src={before} alt="Before" />
      <div className="after-wrap" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt="After" />
      </div>
      <div className="cs-slider-tag" style={{ left: 16 }}>Before</div>
      <div className="cs-slider-tag" style={{ right: 16 }}>After</div>
      <div className="cs-handle" style={{ left: `${pos}%` }}><span><Move size={20} /></span></div>
    </div>
  );
};

/* ---------------- Page ---------------- */
const CaseStudyAlpha = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const comparison = {
    dashboard: { before: '/old-dash.png', after: '/new-dash.png', title: 'Trading Dashboard', desc: 'Transformed a cluttered data-dump into a hierarchy-first strategic dashboard.' },
    detail: { before: '/old-model.png', after: '/new-model.png', title: 'Model Detail', desc: 'Optimized information distribution and emphasized key performance metrics.' },
    leaderboard: { before: '/old-lead.png', after: '/new-lead.png', title: 'Leaderboard', desc: 'Reduced cognitive load through visual grouping and metric prioritization.' },
  };

  const snapshot = [
    { eyebrow: 'Challenge', title: 'Too much to read', body: 'The platform surfaced rich trading data, but users had to read too much before understanding who was winning and why.' },
    { eyebrow: 'Goal', title: 'Insight-first', body: 'Create an experience that improves scanability, speeds up comparison, and reduces cognitive load.' },
    { eyebrow: 'Outcome', title: 'Faster decisions', body: 'The redesign improved interpretation speed, accelerated model selection, and made core signals easier to act on.' },
  ];

  const surfaces = [
    { num: 'SURFACE 01', title: 'Live Trading Screen', challenges: ['Overlapping trend lines created noise.', 'Trade logs were dense and hard to scan.'], solutions: ['Highlighted top-performing models first.', 'Reduced chart noise, prioritized P&L visibility.'] },
    { num: 'SURFACE 02', title: 'Model Detail Screen', challenges: ['Large empty areas weakened hierarchy.', 'Key metrics lacked emphasis.'], solutions: ['Restructured data into scannable sections.', 'Added summary cards for critical signals.'] },
    { num: 'SURFACE 03', title: 'Leaderboard Screen', challenges: ['Metric-heavy tables caused scanning fatigue.', 'Important KPIs were buried in raw numbers.'], solutions: ['Spotlighted core metrics like Return % and P&L.', 'Improved spacing, grouping, and alignment.'] },
  ];

  const process = [
    { num: '01', title: 'Audit', body: 'Reviewed the existing dashboard to pinpoint where users were forced to read instead of scan.' },
    { num: '02', title: 'Prioritize', body: 'Defined a hierarchy-first system so the most important signals surfaced immediately.' },
    { num: '03', title: 'Refine', body: 'Used grouped cards, semantic color, and clearer layouts to reduce friction across key screens.' },
  ];

  const validation = [
    { task: 'Identify Best Model', result: 'Users relied on visual hierarchy and badges instead of scanning raw rows.' },
    { task: 'Analyze Recent Trades', result: 'The redesigned log format made vertical scanning noticeably faster.' },
    { task: 'Understand Account Growth', result: 'Semantic color and cleaner chart structure improved interpretation speed.' },
  ];

  const stats = [
    { num: '60', suffix: '%', label: 'Faster UI interpretation' },
    { num: '65', suffix: '%', label: 'Faster model selection' },
    { num: '3', suffix: '', label: 'Core surfaces redesigned' },
  ];

  const improvements = [
    ['Data Readability', 'Low', 'High'], ['Chart Clarity', 'Confusing', 'Clear'],
    ['Trade Analysis', 'Slow', 'Quick'], ['Navigation Effort', 'High', 'Reduced'],
    ['Decision Speed', 'Slow', 'Fast'],
  ];

  const learnings = [
    { eyebrow: 'Principle 01', title: 'Clarity over features', body: 'In data-heavy products, removing noise creates more value than adding surface area.' },
    { eyebrow: 'Principle 02', title: 'Cognitive offloading', body: 'Strong hierarchy lets the interface do more of the processing work for the user.' },
    { eyebrow: 'Principle 03', title: 'Synthesis first', body: 'Users need grouped meaning, not scattered raw metrics.' },
  ];

  const ticker = ['UX RESEARCH', 'DATA VISUALIZATION', 'INFORMATION HIERARCHY', 'FINTECH', 'DASHBOARD SYSTEMS'];

  return (
    <div className="studio cs">
      <Cursor />

      {/* Top bar */}
      <div className="cs-bar">
        <div className="wrap cs-bar-inner">
          <Link to="/" className="cs-back"><ArrowLeft size={15} /> Index</Link>
          <Link to="/" className="cs-bar-logo">ESKAY<sup>®</sup></Link>
          <span className="cs-bar-code">FILE / FIN-2025</span>
        </div>
      </div>

      {/* Hero */}
      <header className="cs-hero">
        <DotGrid />
        <div className="wrap">
          <motion.div className="hero-product" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="sig-dot" /> Case File — AI Trading Platform
          </motion.div>
          <h1 className="cs-title">
            <Rise>Alpha</Rise><br /><span className="ghost"><Rise delay={0.1}>Arena</Rise></span><span className="sig">.</span>
          </h1>
          <p className="cs-lead">
            <b>Alpha Arena</b> is an AI trading competition platform where models execute trades and compete on performance.
            I led the UX transformation that turns dense financial data into an insight-first dashboard.
          </p>

          <div className="cs-specstrip">
            <div className="cs-spec-item"><label>Role</label><span>UX Designer</span></div>
            <div className="cs-spec-item"><label>Focus</label><span>Data Viz</span></div>
            <div className="cs-spec-item sig"><label>Outcome</label><span>+65% Speed</span></div>
            <div className="cs-spec-item cs-spec-cta">
              <Magnet><a className="cs-figma" href={FIGMA_URL} target="_blank" rel="noopener noreferrer"><FigmaGlyph /> View prototype <ArrowUpRight size={14} /></a></Magnet>
            </div>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <div className="mq" aria-hidden="true">
        <div className="mq-track">
          {ticker.concat(ticker).map((t, i) => <span key={i}>{t} <b>●</b></span>)}
        </div>
      </div>

      {/* Snapshot */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="01 / SNAPSHOT" /></span>
              <h2 className="sec-title"><Rise>From data to decisions</Rise></h2>
            </div>
            <p className="sec-note">Account trends, trade logs, model comparisons and metrics — restructured to reduce cognitive load so users interpret the platform faster.</p>
          </div>
          <div className="cs-cards">
            {snapshot.map((c) => (
              <div className="cs-card" key={c.eyebrow}>
                <span className="cs-card-eyebrow"><span className="sig-dot" style={{ width: 6, height: 6 }} />{c.eyebrow}</span>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison slider */}
      <section className="section" style={{ background: 'var(--bone-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="02 / BEFORE / AFTER" /></span>
              <h2 className="sec-title"><Rise>The evolution</Rise></h2>
            </div>
            <p className="sec-note">Drag the handle to compare the technical data view against the decision-first redesign across each core surface.</p>
          </div>
          <div className="cs-tabs">
            {Object.keys(comparison).map((tab) => (
              <button key={tab} className={`cs-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {comparison[tab].title}
              </button>
            ))}
          </div>
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <ComparisonSlider before={comparison[activeTab].before} after={comparison[activeTab].after} />
          </motion.div>
          <p className="cs-caption">▸ {comparison[activeTab].desc}</p>
        </div>
      </section>

      {/* Challenge + solution surfaces */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="03 / CHALLENGE + SOLUTION" /></span>
              <h2 className="sec-title"><Rise>Signal over noise</Rise></h2>
            </div>
            <p className="sec-note">A direct before-to-after narrative across the three core product surfaces.</p>
          </div>
          <div className="cs-surfaces">
            {surfaces.map((s) => (
              <motion.div className="cs-surface" key={s.title}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="cs-surface-head">
                  <span className="cs-surface-num">{s.num}</span>
                  <span className="cs-surface-title">{s.title}</span>
                </div>
                <div>
                  <span className="cs-col-label">Challenges</span>
                  <ul className="cs-list">
                    {s.challenges.map((c) => <li key={c}><X size={15} color="var(--ink-faint)" /><span>{c}</span></li>)}
                  </ul>
                </div>
                <div>
                  <span className="cs-col-label">Redesign moves</span>
                  <ul className="cs-list">
                    {s.solutions.map((c) => <li key={c}><Check size={15} color="var(--signal)" /><span>{c}</span></li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="section" style={{ background: 'var(--bone-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="04 / INTERACTIVE SIM" /></span>
              <h2 className="sec-title"><Rise>Model simulator</Rise></h2>
            </div>
            <p className="sec-note">Toggle a strategy to watch each model execute historical backtests with live equity curves.</p>
          </div>
          <div className="cs-panel"><ModelPerformanceSimulator /></div>
        </div>
      </section>

      {/* Process + validation */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="05 / METHODOLOGY" /></span>
              <h2 className="sec-title"><Rise>Process</Rise></h2>
            </div>
            <p className="sec-note">A compact audit, prioritize and refine loop, validated against real user tasks.</p>
          </div>
          <div className="cs-cards">
            {process.map((p) => (
              <div className="cs-card" key={p.num}>
                <span className="cs-card-eyebrow">STEP {p.num}</span>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>

          <div className="journey" style={{ marginTop: 'clamp(40px,5vw,64px)' }}>
            {validation.map((v, i) => (
              <motion.div className="journey-row" key={v.task}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <span className="journey-period">TASK 0{i + 1}</span>
                <span>
                  <div className="journey-role">{v.task}</div>
                  <div className="journey-co">{v.result}</div>
                </span>
                <span className="journey-loc">Validated</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section" style={{ background: 'var(--bone-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="06 / IMPACT" /></span>
              <h2 className="sec-title"><Rise>Speed of thought</Rise></h2>
            </div>
            <p className="sec-note">Stripping noise and enforcing hierarchy dramatically reduced the effort required to operate the platform.</p>
          </div>

          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <b className="cs-statnum">{s.num}<i>{s.suffix}</i></b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="cs-tablewrap" style={{ marginTop: 'clamp(36px,4vw,52px)' }}>
            <table className="cs-table">
              <thead>
                <tr><th>Aspect</th><th>Before</th><th className="sig">After</th></tr>
              </thead>
              <tbody>
                {improvements.map(([a, b, c]) => (
                  <tr key={a}><td>{a}</td><td>{b}</td><td className="sig">{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Learnings */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="07 / TAKEAWAYS" /></span>
              <h2 className="sec-title"><Rise>Post-flight learnings</Rise></h2>
            </div>
          </div>
          <div className="cs-cards">
            {learnings.map((l) => (
              <div className="cs-card" key={l.eyebrow}>
                <span className="cs-card-eyebrow"><span className="sig-dot" style={{ width: 6, height: 6 }} />{l.eyebrow}</span>
                <h4>{l.title}</h4>
                <p>{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="section contact cs-closing">
        <div className="wrap">
          <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="08 / NEXT" /></span>
          <h2 className="contact-mega"><Rise>Next evolution?</Rise></h2>
          <p className="contact-sub">In finance, design isn't about looks — it's about the speed of thought. Let's build the next one.</p>
          <div className="contact-actions">
            <Magnet><Link className="btn-primary" to="/">All project files ↗</Link></Magnet>
            <Magnet><a className="cs-figma on-dark" href={FIGMA_URL} target="_blank" rel="noopener noreferrer"><FigmaGlyph /> View in Figma</a></Magnet>
          </div>
        </div>
      </section>

      <div className="footer-zone">
        <div className="wrap">
          <footer className="footer">
            <span>© MMXXVI ESKAY® — DESIGNED BY A HUMAN, ACCELERATED BY AI</span>
            <span>ALPHA ARENA / FIN-2025</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyAlpha;
