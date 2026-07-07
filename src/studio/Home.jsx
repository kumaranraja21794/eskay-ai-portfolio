import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Cursor, Scramble, Rise, Magnet, CountUp, DotGrid, Tilt } from './fx';
import './styles.css';

/* =========================================================
   ESKAY® — brand-identity portfolio
   Light industrial · dot-matrix type · safety-orange signal
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1];

/* ---------------- Preloader ---------------- */
const Preloader = ({ onDone }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.max(1, Math.round((100 - v) / 8));
      if (v >= 100) { v = 100; clearInterval(t); setTimeout(onDone, 450); }
      setN(v);
    }, 50);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <motion.div className="loader" exit={{ y: '-100%', transition: { duration: 0.75, ease: EASE } }}>
      <div className="loader-logo">ESKAY<em>.</em></div>
      <div className="loader-bar"><motion.i animate={{ scaleX: n / 100 }} style={{ scaleX: 0 }} /></div>
      <div className="loader-count">BOOTING BRAND OS — {String(n).padStart(3, '0')}%</div>
    </motion.div>
  );
};

/* ---------------- Meta strip + Nav ---------------- */
const MetaStrip = () => (
  <div className="meta-strip">
    <div className="wrap">
      <span>ESKAY® INDUSTRIAL DESIGN UNIT</span>
      <span className="m-hide">13.0827° N / 80.2707° E — CHENNAI</span>
      <span className="m-hide">EST. 2016 / AI-NATIVE SINCE 2026</span>
      <span><span className="sig-dot" style={{ width: 6, height: 6, marginRight: 8 }} />ACCEPTING PROJECTS</span>
    </div>
  </div>
);

const Nav = () => (
  <motion.header className="nav"
    initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.15, ease: EASE }}>
    <div className="wrap nav-inner">
      <a href="#top" className="nav-logo">ESKAY<sup>®</sup></a>
      <nav className="nav-links">
        <a className="nav-link" href="#work"><i>01</i>Work</a>
        <a className="nav-link" href="#services"><i>02</i>Spec</a>
        <a className="nav-link" href="#about"><i>03</i>Unit</a>
        <a className="nav-link" href="#contact"><i>04</i>Signal</a>
      </nav>
      <Magnet><a className="nav-cta" href="#contact">Start transmission</a></Magnet>
    </div>
  </motion.header>
);

/* ---------------- Hero ---------------- */
const Hero = () => (
  <section className="hero" id="top">
    <DotGrid />
    <div className="wrap hero-content">
      <motion.div className="hero-product"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE }}>
        <span className="sig-dot" /> ESKAY (01) — PORTFOLIO EDITION · MMXXVI
      </motion.div>
      <h1 className="hero-h1">
        <Rise delay={0.4}>Design</Rise><br />
        <span className="ghost"><Rise delay={0.55}>Beyond</Rise></span><br />
        <Rise delay={0.7}>Ordinary</Rise><span className="sig">.</span>
      </h1>
      <div className="hero-row">
        <motion.p className="hero-sub"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: EASE }}>
          <b>EsKay</b> is the industrial design unit of <b>Sakthi Kumaran</b> —
          9+ years of enterprise UI/UX, rebuilt around an AI-native pipeline.
          Research to pixel to production code. No bloat. No lorem ipsum. Just signal.
        </motion.p>
        <motion.div className="hero-actions"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8, ease: EASE }}>
          <Magnet><a className="btn-primary" href="#work">Open project files ↗</a></Magnet>
          <Magnet><a className="btn-ghost" href="#contact">Send signal</a></Magnet>
        </motion.div>
      </div>
    </div>
    <div className="hero-coords">
      <div className="wrap">
        <span>SCROLL / 100VH</span>
        <span>UI·UX / SYS / CODE</span>
        <span>V.3.0 FINAL</span>
      </div>
    </div>
  </section>
);

/* ---------------- Ticker ---------------- */
const Ticker = ({ items, rev = false }) => {
  const row = items.map((it, i) => <span key={i}>{it} <b>●</b></span>);
  return (
    <div className={rev ? 'mq rev' : 'mq'} aria-hidden="true">
      <div className="mq-track">{row}{row}</div>
    </div>
  );
};

/* ---------------- Work ---------------- */
const PROJECTS = [
  { name: 'Alpha Arena', code: 'FIN-2025', meta: ['Fintech', 'Dashboard', 'UX Research'], img: '/alpha_detail.png', to: '/case-study/alpha-arena' },
  { name: 'BitWise', code: 'CRY-2025', meta: ['Crypto', 'Mobile UX'], img: '/bitwise_thumb.png', to: '/case-study/bitwise' },
  { name: 'Silk Emporium', code: 'COM-2026', meta: ['E-commerce', 'Brand', 'UI'], img: '/silk_emporium.png' },
  { name: 'Oman United Insurance', code: 'INS-2024', meta: ['Insurance', 'Web + Mobile', 'Angular'], img: '/oman_insurance_thumb.png' },
  { name: 'BookAPandit UK', code: 'MKT-2026', meta: ['Marketplace', 'Next.js'], img: '/bookapandit_thumb.png' },
  { name: 'Shinhan Life Vietnam', code: 'INS-2023', meta: ['Insurance', 'Bilingual CMS'], img: '/shinhan_life_thumb.png' },
  { name: 'Infy Tech School', code: 'EDU-2026', meta: ['EdTech', 'Lead Capture'], img: '/infy_tech_thumb.png' },
];

const Work = () => {
  const [preview, setPreview] = useState(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });
  const onMove = (e) => { x.set(e.clientX + 30); y.set(e.clientY - 120); };

  const Item = ({ p, i }) => {
    const inner = (
      <>
        <span className="work-idx">FILE /0{i + 1}<b>{p.code}</b></span>
        <span>
          <span className="work-name">{p.name}</span>
          <span className="work-meta">{p.meta.map((m) => <span key={m}>{m}</span>)}</span>
        </span>
        <span className="work-arrow">↗</span>
      </>
    );
    const common = {
      className: 'work-item',
      onMouseEnter: () => setPreview(p.img),
      onMouseLeave: () => setPreview(null),
      onMouseMove: onMove,
    };
    return p.to
      ? <Link to={p.to} {...common}>{inner}</Link>
      : <a href="#contact" {...common}>{inner}</a>;
  };

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="01 / PROJECT FILES" /></span>
            <h2 className="sec-title"><Rise>Proof, not promises</Rise></h2>
          </div>
          <p className="sec-note">
            Fintech, insurance, e-commerce, edtech — shipped across India,
            the Gulf, the UK and Vietnam. Hover a file to preview. Click to open.
          </p>
        </div>
        <div className="work-list">
          {PROJECTS.map((p, i) => <Item key={p.name} p={p} i={i} />)}
        </div>
      </div>
      <AnimatePresence>
        {preview && (
          <motion.div className="work-preview" style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: EASE }}>
            <img src={preview} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ---------------- Services (spec sheet) ---------------- */
const SERVICES = [
  {
    title: 'AI Product Design', desc: 'Concept to hi-fi prototype in days. Generative exploration finds directions humans miss; senior judgment picks the winner.',
    tags: ['Figma AI', 'v0', 'Framer AI'],
  },
  {
    title: 'UX Research → Strategy', desc: 'Heuristic audits, user flows and A/B interpretation that turn vague briefs into measurable product bets.',
    tags: ['Discovery', 'Flows', 'Testing'],
  },
  {
    title: 'Design Systems', desc: 'Token-driven, WCAG-compliant component libraries your engineers will actually enjoy consuming.',
    tags: ['Tokens', 'Variables', 'WCAG'],
  },
  {
    title: 'Design-to-Code', desc: 'The handoff disappears — the frontend ships with the design. React, Angular, production-grade CSS.',
    tags: ['React', 'Angular', 'CSS'],
  },
  {
    title: 'Enterprise Modernization', desc: 'Legacy fintech and insurance platforms rebuilt into interfaces people stop complaining about.',
    tags: ['Fintech', 'Insurance', 'SaaS'],
  },
];

const Services = () => (
  <section className="section" id="services">
    <div className="wrap">
      <div className="sec-head">
        <div>
          <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="02 / TECHNICAL SPEC" /></span>
          <h2 className="sec-title"><Rise>Unit capabilities</Rise></h2>
        </div>
        <p className="sec-note">
          One senior brain, an AI copilot stack, zero agency bloat.
          Every engagement runs research → design → code as a single pipeline.
        </p>
      </div>
      <motion.div className="specsheet"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5% 0px' }} transition={{ duration: 0.8, ease: EASE }}>
        {SERVICES.map((s, i) => (
          <div className="spec-row" key={s.title} data-hover>
            <span className="spec-num">SPEC<b>0{i + 1}</b></span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="spec-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ---------------- Terminal ---------------- */
const TERM_LINES = [
  { c: 'p', t: '$ eskay run brief.md --mode=ship' },
  { c: '', t: '▸ parsing brief · extracting user goals … done' },
  { c: '', t: '▸ generating 12 layout directions … done' },
  { c: '', t: '▸ senior review: 9 killed, 3 refined ✂' },
  { c: '', t: '▸ hi-fi prototype + design tokens … done' },
  { c: '', t: '▸ react components w/ WCAG pass … done' },
  { c: 'ok', t: '✓ shipped in 6 days — signal received.' },
];

const Terminal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [lines, setLines] = useState([]);
  useEffect(() => {
    if (!inView) return;
    TERM_LINES.forEach((l, i) => setTimeout(() => setLines((prev) => [...prev, l]), 300 + i * 500));
  }, [inView]);
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap" ref={ref}>
        <div className="term" data-hover>
          <div className="term-bar"><i /><i /><i /><span>ESKAY® PIPELINE / LIVE LOG</span></div>
          <div className="term-body">
            {lines.map((l, i) => (
              <motion.div key={i} className={l.c}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}>
                {l.t}
              </motion.div>
            ))}
            <span className="term-caret" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- About ---------------- */
const About = () => (
  <section className="section" id="about" style={{ background: 'var(--bone-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
    <div className="wrap">
      <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="03 / THE UNIT" /></span>
      <div className="about-grid">
        <div>
          <p className="about-big">
            <Rise>Most agencies choose between</Rise>{' '}
            <span className="dim"><Rise>fast, good, and cheap.</Rise></span>{' '}
            <Rise>An AI-native pipeline deletes the trade-off —</Rise>{' '}
            <em><Rise>senior design craft at machine tempo.</Rise></em>
          </p>
          <div className="stats">
            <div className="stat"><CountUp end={9} suffix="+" /><span>Years in product</span></div>
            <div className="stat"><CountUp end={30} suffix="+" /><span>Projects shipped</span></div>
            <div className="stat"><CountUp end={7} suffix="" /><span>Industries served</span></div>
            <div className="stat"><CountUp end={4} suffix="" /><span>Countries deployed</span></div>
            <div className="stat"><CountUp end={10} suffix="×" /><span>Faster with AI</span></div>
            <div className="stat"><b>∞<i /></b><span>Iterations included</span></div>
          </div>
        </div>
        <Tilt className="portrait-card" max={5}>
          <img src="/hero-bg-v13.png" alt="Sakthi Kumaran — EsKay" loading="lazy" />
          <div className="portrait-label">
            <span>SAKTHI KUMARAN — FOUNDER / DESIGN ENGINEER</span>
            <span className="sig-dot" />
          </div>
        </Tilt>
      </div>
    </div>
  </section>
);

/* ---------------- Journey ---------------- */
const JOURNEY = [
  { period: '2026 — NOW', role: 'Founder — EsKay Design Unit', co: 'AI-powered freelance design & development', loc: 'Remote / Global' },
  { period: '2021 — 2026', role: 'UI/UX Designer & Frontend Dev', co: 'Azentio Software Pvt. Ltd.', loc: 'Chennai' },
  { period: '2019 — 2021', role: 'UI Designer', co: '3i Infotech Ltd.', loc: 'Chennai' },
  { period: '2016 — 2017', role: 'Trainee Engineer — Development', co: 'IVTL Infoview Technologies', loc: 'Chennai' },
];

const Journey = () => (
  <section className="section">
    <div className="wrap">
      <div className="sec-head">
        <div>
          <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="04 / SERVICE HISTORY" /></span>
          <h2 className="sec-title"><Rise>A decade of pixels</Rise></h2>
        </div>
      </div>
      <div className="journey">
        {JOURNEY.map((j, i) => (
          <motion.div className="journey-row" key={j.role}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}>
            <span className="journey-period">{j.period}</span>
            <span>
              <div className="journey-role">{j.role}</div>
              <div className="journey-co">{j.co}</div>
            </span>
            <span className="journey-loc">{j.loc}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Contact ---------------- */
const Contact = () => (
  <section className="section contact" id="contact">
    <div className="wrap">
      <span className="sec-kicker"><span className="sig-dot" style={{ width: 6, height: 6 }} /><Scramble text="05 / TRANSMISSION" /></span>
      <h2 className="contact-mega">
        <Rise>Got an idea?</Rise><br />
        <a href="mailto:kumaranraja210794@gmail.com" data-hover>
          <span className="fill"><Rise>Send signal.</Rise></span>
        </a>
      </h2>
      <p className="contact-sub">
        Currently taking on <b>2 new clients for Q3 2026</b>.
        Tell me what you're building — response within 24 hours.
      </p>
      <div className="contact-actions">
        <Magnet><a className="btn-primary" href="mailto:kumaranraja210794@gmail.com">kumaranraja210794@gmail.com</a></Magnet>
        <Magnet><a className="btn-ghost" href="https://www.linkedin.com/in/sakthi-kumaran-62645372/" target="_blank" rel="noreferrer">LinkedIn ↗</a></Magnet>
      </div>
      <div className="socials">
        <a href="https://www.linkedin.com/in/sakthi-kumaran-62645372/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
        <a href="https://www.instagram.com/es.kayy_" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
        <a href="https://github.com/kumaranraja21794" target="_blank" rel="noreferrer" aria-label="GitHub">gh</a>
      </div>
    </div>
  </section>
);

/* ---------------- Footer ---------------- */
const BARS = [8, 22, 14, 26, 10, 24, 16, 26, 12, 20, 8, 26, 18, 24, 10, 22, 14, 26, 8, 20, 16, 24, 12, 26];
const Footer = () => (
  <div className="footer-zone">
    <div className="wrap">
      <footer className="footer">
        <span>© MMXXVI ESKAY® — DESIGNED BY A HUMAN, ACCELERATED BY AI</span>
        <div className="barcode" aria-hidden="true">
          {BARS.map((h, i) => <i key={i} style={{ height: h }} />)}
        </div>
        <span>13.0827° N / 80.2707° E — CHENNAI → THE WORLD</span>
      </footer>
    </div>
  </div>
);

/* ---------------- Page ---------------- */
const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <div className="studio">
      <Cursor />
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>
      <MetaStrip />
      <Nav />
      <main>
        <Hero />
        <Ticker items={['AI PRODUCT DESIGN', 'UX RESEARCH', 'DESIGN SYSTEMS', 'REACT', 'PROTOTYPING', 'DESIGN-TO-CODE']} />
        <Work />
        <Services />
        <Terminal />
        <About />
        <Journey />
        <Ticker rev items={['DISCOVER', 'DEFINE', 'GENERATE', 'REFINE', 'SHIP', 'MEASURE', 'REPEAT']} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
