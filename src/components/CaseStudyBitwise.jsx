import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Cursor, Rise, Scramble, Magnet, DotGrid } from '../studio/fx';
import '../studio/styles.css';

const FIGMA_URL =
  'https://www.figma.com/proto/nuKIprwh9w0h3vCzTxJ1zB/Design-Portfolio?node-id=20-829&t=2QQUZMdyGy6uC4GL-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=322%3A714&show-proto-sidebar=1';

const FigmaGlyph = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M19 28.5C19 25.98 20 23.56 21.78 21.78C23.56 20 25.98 19 28.5 19C31.02 19 33.44 20 35.22 21.78C37 23.56 38 25.98 38 28.5C38 31.02 37 33.44 35.22 35.22C33.44 37 31.02 38 28.5 38C25.98 38 23.56 37 21.78 35.22C20 33.44 19 31.02 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 44.98 1 42.56 2.78 40.78C4.56 39 6.98 38 9.5 38H19V47.5C19 50.02 18 52.44 16.22 54.22C14.44 56 12.02 57 9.5 57C6.98 57 4.56 56 2.78 54.22C1 52.44 0 50.02 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C31.02 19 33.44 18 35.22 16.22C37 14.44 38 12.02 38 9.5C38 6.98 37 4.56 35.22 2.78C33.44 1 31.02 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 12.02 1 14.44 2.78 16.22C4.56 18 6.98 19 9.5 19H19V0H9.5C6.98 0 4.56 1 2.78 2.78C1 4.56 0 6.98 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 31.02 1 33.44 2.78 35.22C4.56 37 6.98 38 9.5 38H19V19H9.5C6.98 19 4.56 20 2.78 21.78C1 23.56 0 25.98 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const CaseStudyBitwise = () => {
  const shots = [
    { src: '/bitwise_screen1.png', label: 'Settings & Accessibility' },
    { src: '/bitwise_screen2.png', label: 'Simplified Buy Flow' },
    { src: '/bitwise_screen3.png', label: 'Search & Rankings' },
    { src: '/bitwise_screen4.png', label: 'Asset Diligence' },
    { src: '/bitwise_screen5.png', label: 'Splash & Identity' },
  ];

  const surfaces = [
    { num: 'SCREEN 01', title: 'Settings', features: ['Centralized profile with gorilla avatar', 'One-tap dark/light mode toggle', 'Structured nav to FAQs and Signout'], takeaway: 'Reduces the density of account settings to focus on primary accessibility configuration first.' },
    { num: 'SCREEN 02', title: 'Buy / Swap', features: ['Selective Buy / Sell / Swap tabs', 'High-action neon CTA buttons', 'Minimal trade parameters'], takeaway: 'Discloses fees and estimated payouts upfront, removing retail trader hesitation.' },
    { num: 'SCREEN 03', title: 'Market Listings', features: ['Simple search at the top', 'Gainers, Losers, New Listings filters', 'Roomy list rows for legibility'], takeaway: 'Focuses on Symbol, Name, Price, Daily % — avoiding complex margin statistics.' },
    { num: 'SCREEN 04', title: 'Asset Info', features: ['Info integrated alongside charts', 'Standardized history + chain references', 'No app-exit for diligence'], takeaway: 'Aligns trading decisions with inline fundamental research.' },
    { num: 'SCREEN 05', title: 'Chart View', features: ['High-contrast red/green candles', 'Clean intervals: 1H, 1D, 1W, 1M, 3M', 'Core metrics: Volume, Liquidity, Cap'], takeaway: 'Balances advanced technical analysis with lightweight data formatting.' },
  ];

  const table = [
    ['Information Density', 'Extreme density — flashing order books, bid-ask spreads, leverage selectors and multiple indicators cause instant clutter.', 'Progressive disclosure. Chart metrics are isolated; buy prompts show only flat fees and a calculated cost breakdown.'],
    ['Educational Context', 'Housed in a separate academy section, splitting knowledge away from transactional choices.', 'Contextual tabs — an "Info" description sits inside the charting view to encourage safe due diligence.'],
    ['Visual Balance', 'Hyper-reactive greens and reds trigger emotional trading; cluttered borders add fatigue.', 'Calm dark palette. Neon accents reserved strictly for positive returns and BUY cues.'],
    ['Transaction Funnel', 'Complex order forms with limit/market, GTC options and margin leverage variables.', 'A simple two-step amount input. Flat fee and total pay make cost immediate and transparent.'],
  ];

  const takeaways = [
    { eyebrow: 'Insight 01', title: 'Calm over chaos', body: 'In speculative environments, visual calm creates cognitive relief that enables smarter decisions.' },
    { eyebrow: 'Insight 02', title: 'Action-focused', body: 'Hiding complexity behind smart settings avoids intimidation; progressive disclosure cleans the conversion path.' },
    { eyebrow: 'Insight 03', title: 'Inline education', body: 'Fundamental info next to the chart builds trust and aids retail users without breaking flow.' },
  ];

  const ticker = ['MOBILE UX', 'FINTECH', 'PROGRESSIVE DISCLOSURE', 'CRYPTO', 'DARK-FIRST DESIGN'];

  return (
    <div className="studio cs">
      <Cursor />

      {/* Top bar */}
      <div className="cs-bar">
        <div className="wrap cs-bar-inner">
          <Link to="/" className="cs-back"><ArrowLeft size={15} /> Index</Link>
          <Link to="/" className="cs-bar-logo">ATLAS<sup>®</sup></Link>
          <span className="cs-bar-code">FILE / CRY-2025</span>
        </div>
      </div>

      {/* Hero */}
      <header className="cs-hero">
        <DotGrid />
        <div className="wrap">
          <motion.div className="hero-product" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="sig-dot" /> Case File — Crypto Trading App
          </motion.div>
          <h1 className="cs-title">
            <Rise>Bit</Rise><span className="ghost"><Rise delay={0.08}>Wise</Rise></span><span className="sig">.</span>
          </h1>
          <p className="cs-lead">
            <b>BitWise</b> is a dark-first, clarity-focused crypto trading app. This case study weighs standard trading-app
            complexity against mockups designed to offload cognitive fatigue.
          </p>

          <div className="cs-specstrip">
            <div className="cs-spec-item"><label>Team</label><span>Atlas — Product Design</span></div>
            <div className="cs-spec-item"><label>Focus</label><span>Mobile UX</span></div>
            <div className="cs-spec-item sig"><label>Outcome</label><span>Clear Depth</span></div>
            <div className="cs-spec-item cs-spec-cta">
              <Magnet><a className="cs-figma" href={FIGMA_URL} target="_blank" rel="noopener noreferrer"><FigmaGlyph /> View mockups <ArrowUpRight size={14} /></a></Magnet>
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

      {/* Overview */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="01 / OVERVIEW" /></span>
              <h2 className="sec-title"><Rise>Selective by design</Rise></h2>
            </div>
            <p className="sec-note">Standard apps bombard users with order books, margin toggles and flashing rates. BitWise progressive-discloses stats and groups education alongside chart indices.</p>
          </div>
          <div className="cs-cards">
            <div className="cs-card">
              <span className="cs-card-eyebrow"><span className="sig-dot" style={{ width: 6, height: 6 }} />Problem</span>
              <h4>High friction</h4>
              <p>Dense order books and flashing rates make even simple trades feel high-risk for retail users.</p>
            </div>
            <div className="cs-card">
              <span className="cs-card-eyebrow"><span className="sig-dot" style={{ width: 6, height: 6 }} />Approach</span>
              <h4>Progressive disclosure</h4>
              <p>Reveal only what a decision needs, when it's needed — fees, payouts and core metrics up front.</p>
            </div>
            <div className="cs-card">
              <span className="cs-card-eyebrow"><span className="sig-dot" style={{ width: 6, height: 6 }} />Result</span>
              <h4>Confident trades</h4>
              <p>A calmer, dark-first interface where the next action is always the clearest thing on screen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mockups */}
      <section className="section" style={{ background: 'var(--bone-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="02 / INTERFACE MOCKUPS" /></span>
              <h2 className="sec-title"><Rise>The screens</Rise></h2>
            </div>
            <p className="sec-note">High-fidelity screens covering the core architecture: profile settings, buy/swap execution, search, asset info and price charts.</p>
          </div>
          <div className="cs-shots">
            {shots.map((s, i) => (
              <motion.div className="cs-shot" key={i}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <img src={s.src} alt={s.label} />
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen breakdown */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="03 / UX BREAKDOWN" /></span>
              <h2 className="sec-title"><Rise>Architecture & flow</Rise></h2>
            </div>
            <p className="sec-note">How each screen streamlines navigation hierarchy and visual structure.</p>
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
                  <span className="cs-col-label">Key features</span>
                  <ul className="cs-list">
                    {s.features.map((f) => <li key={f}><Check size={15} color="var(--signal)" /><span>{f}</span></li>)}
                  </ul>
                </div>
                <div>
                  <span className="cs-col-label">UX rationale</span>
                  <p style={{ color: 'var(--ink-dim)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{s.takeaway}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparative analysis */}
      <section className="section" style={{ background: 'var(--bone-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="04 / COMPARISON" /></span>
              <h2 className="sec-title"><Rise>vs. traditional</Rise></h2>
            </div>
            <p className="sec-note">How the minimalist, dark-first hierarchy of BitWise ranks against high-density crypto platforms.</p>
          </div>
          <div className="cs-tablewrap">
            <table className="cs-table">
              <thead>
                <tr><th>Dimension</th><th>Traditional exchanges</th><th className="sig">BitWise mobile</th></tr>
              </thead>
              <tbody>
                {table.map(([dim, trad, bw]) => (
                  <tr key={dim}><td>{dim}</td><td>{trad}</td><td className="sig">{bw}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cs-callout">
            <h4><Info size={18} color="var(--signal)" /> Aesthetic mockup anomalies</h4>
            <p>
              A close review reveals minor anomalies — coin prices (e.g. SOL at $8.7k, ETH at $67.90) and chart Y-axis ranges ($0–$250)
              that don't match real values, plus a duplicated "New Listings" tab. These artifacts show the mockups prioritized visual flow,
              typographic spacing and aesthetic harmony over mathematical precision — a common standard in early-stage UX layout testing.
            </p>
          </div>
        </div>
      </section>

      {/* Takeaways */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="05 / TAKEAWAYS" /></span>
              <h2 className="sec-title"><Rise>Key takeaways</Rise></h2>
            </div>
          </div>
          <div className="cs-cards">
            {takeaways.map((t) => (
              <div className="cs-card" key={t.eyebrow}>
                <span className="cs-card-eyebrow"><span className="sig-dot" style={{ width: 6, height: 6 }} />{t.eyebrow}</span>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="section contact cs-closing">
        <div className="wrap">
          <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="06 / NEXT" /></span>
          <h2 className="contact-mega"><Rise>Premium fintech UX?</Rise></h2>
          <p className="contact-sub">BitWise proves that simplicity is the ultimate sophistication in crypto product design.</p>
          <div className="contact-actions">
            <Magnet><Link className="btn-primary" to="/">All project files ↗</Link></Magnet>
            <Magnet><a className="cs-figma on-dark" href={FIGMA_URL} target="_blank" rel="noopener noreferrer"><FigmaGlyph /> View mockups</a></Magnet>
          </div>
        </div>
      </section>

      <div className="footer-zone">
        <div className="wrap">
          <footer className="footer">
            <span>© MMXXVI ATLAS® — DESIGNED BY HUMANS, ACCELERATED BY AI</span>
            <span>BITWISE / CRY-2025</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyBitwise;
