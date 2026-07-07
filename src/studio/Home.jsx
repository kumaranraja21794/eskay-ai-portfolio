import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Cursor, Scramble, Rise, Magnet, CountUp, NeuralCanvas, Rotator, Tilt } from './fx';
import './styles.css';

/* =========================================================
   ESKAY STUDIO — fresh single-page experience
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1];

/* ---------------- Preloader ---------------- */
const Preloader = ({ onDone }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.max(1, Math.round((100 - v) / 9));
      if (v >= 100) { v = 100; clearInterval(t); setTimeout(onDone, 420); }
      setN(v);
    }, 55);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <motion.div className="loader" exit={{ y: '-100%', transition: { duration: 0.8, ease: EASE } }}>
      <div className="loader-logo">ES<em>KAY</em></div>
      <div className="loader-bar"><motion.i animate={{ scaleX: n / 100 }} style={{ scaleX: 0 }} /></div>
      <div className="loader-count">INITIALIZING STUDIO — {n}%</div>
    </motion.div>
  );
};

/* ---------------- Nav ---------------- */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    tick();
    const t = setInterval(tick, 30000);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearInterval(t); window.removeEventListener('scroll', onScroll); };
  }, []);
  return (
    <motion.header
      className={scrolled ? 'nav scrolled' : 'nav'}
      initial={{ y: -70 }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
    >
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo">ES<span style={{ color: 'var(--ink-dim)' }}>KAY</span><sup>®</sup></a>
        <nav className="nav-links">
          <a className="nav-link" href="#work"><i>01</i>Work</a>
          <a className="nav-link" href="#services"><i>02</i>Services</a>
          <a className="nav-link" href="#about"><i>03</i>Studio</a>
          <a className="nav-link" href="#contact"><i>04</i>Contact</a>
        </nav>
        <div className="nav-meta"><span className="pulse" />CHENNAI · {time} IST · OPEN FOR WORK</div>
        <Magnet><a className="nav-cta" href="#contact">Start a project</a></Magnet>
      </div>
    </motion.header>
  );
};

/* ---------------- Hero ---------------- */
const Hero = () => (
  <section className="hero" id="top">
    <NeuralCanvas />
    <div className="hero-fade" />
    <div className="wrap hero-content">
      <motion.div className="hero-tag"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8, ease: EASE }}>
        <span className="dot" /> AI-POWERED DESIGN STUDIO — EST. 2016
      </motion.div>
      <h1 className="hero-h1">
        <Rise delay={0.45}>I design</Rise>{' '}
        <Rotator words={['products', 'interfaces', 'systems', 'brands', 'futures']} />
        <br />
        <span className="outline"><Rise delay={0.65}>that ship at</Rise></span>{' '}
        <span className="grad"><Rise delay={0.8}>AI speed.</Rise></span>
      </h1>
      <motion.p className="hero-sub"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9, ease: EASE }}>
        EsKay is the studio of Sakthi Kumaran — 9+ years of enterprise UI/UX,
        now supercharged with an AI-first workflow. Research to pixel to
        production code, in days instead of months.
      </motion.p>
      <motion.div className="hero-actions"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.9, ease: EASE }}>
        <Magnet><a className="btn-primary" href="#work"><span>See the work ↗</span></a></Magnet>
        <Magnet><a className="btn-ghost" href="#contact">Book a call</a></Magnet>
      </motion.div>
    </div>
    <motion.div className="hero-scroll"
      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.4, repeat: Infinity }}>
      Scroll to explore
    </motion.div>
  </section>
);

/* ---------------- Marquee ---------------- */
const Marquee = ({ items, rev = false }) => {
  const row = items.map((it, i) => <span key={i}>{it} <b>✦</b></span>);
  return (
    <div className={rev ? 'mq rev' : 'mq'} aria-hidden="true">
      <div className="mq-track">{row}{row}</div>
    </div>
  );
};

/* ---------------- About ---------------- */
const About = () => (
  <section className="section" id="about">
    <div className="wrap">
      <span className="sec-kicker"><Scramble text="03 / THE STUDIO" /></span>
      <div className="about-grid">
        <div>
          <p className="about-big">
            <Rise>Most agencies choose between</Rise>{' '}
            <span className="dim"><Rise>fast, good, and cheap.</Rise></span>{' '}
            <Rise>An AI-first pipeline deletes the trade-off —</Rise>{' '}
            <em><Rise>senior design craft, delivered at machine tempo.</Rise></em>
          </p>
          <div className="stats">
            <div className="stat"><CountUp end={9} suffix="+" /><span>YEARS IN PRODUCT</span></div>
            <div className="stat"><CountUp end={30} suffix="+" /><span>PROJECTS SHIPPED</span></div>
            <div className="stat"><CountUp end={7} suffix="" /><span>INDUSTRIES SERVED</span></div>
            <div className="stat"><CountUp end={4} suffix="" /><span>COUNTRIES DEPLOYED</span></div>
            <div className="stat"><CountUp end={10} suffix="×" /><span>FASTER WITH AI</span></div>
            <div className="stat"><b>∞<i /></b><span>ITERATIONS INCLUDED</span></div>
          </div>
        </div>
        <Tilt className="portrait-card" max={6}>
          <img src="/developer_portrait.png" alt="Sakthi Kumaran — EsKay" loading="lazy" />
          <div className="portrait-label">
            <div>
              <div>SAKTHI KUMARAN</div>
              <div className="role">FOUNDER / DESIGN ENGINEER</div>
            </div>
            <div>CHENNAI, IN</div>
          </div>
        </Tilt>
      </div>
    </div>
  </section>
);

/* ---------------- Services ---------------- */
const SERVICES = [
  {
    size: 'b-6', icon: '⚡', title: 'AI-Accelerated Product Design',
    desc: 'Concept to hi-fi prototype in days. Generative exploration finds directions humans miss; senior judgment picks the winner.',
    tags: ['Figma AI', 'v0', 'Framer AI', 'Google Stitch'],
  },
  {
    size: 'b-6', icon: '🧠', title: 'UX Research → Strategy',
    desc: 'Heuristic audits, user flows, journey maps and A/B interpretation that turn vague briefs into measurable product bets.',
    tags: ['Discovery', 'User flows', 'Usability testing'],
  },
  {
    size: 'b-4', icon: '🧬', title: 'Design Systems',
    desc: 'Token-driven, WCAG-compliant component libraries your engineers will actually enjoy consuming.',
    tags: ['Tokens', 'Variables', 'WCAG'],
  },
  {
    size: 'b-4', icon: '⌨️', title: 'Design-to-Code',
    desc: 'The handoff disappears — I ship the frontend too. React, Angular, production-grade CSS.',
    tags: ['React', 'Angular', 'CSS'],
  },
  {
    size: 'b-4', icon: '🛰️', title: 'Enterprise UI Modernization',
    desc: 'Legacy fintech and insurance platforms rebuilt into interfaces people stop complaining about.',
    tags: ['Fintech', 'Insurance', 'SaaS'],
  },
];

const Services = () => {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-kicker"><Scramble text="02 / CAPABILITIES" /></span>
            <h2 className="sec-title"><Rise>What the studio does</Rise></h2>
          </div>
          <p className="sec-note">
            One senior brain, an AI copilot stack, zero agency bloat.
            Every engagement runs research → design → code as a single pipeline.
          </p>
        </div>
        <div className="bento">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title} className={`bento-card ${s.size}`} onMouseMove={onMove}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
              data-hover
            >
              <span className="bento-num">0{i + 1}</span>
              <div className="bento-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="bento-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Work ---------------- */
const PROJECTS = [
  { name: 'Alpha Arena', meta: ['Fintech', 'Dashboard', 'UX Research'], img: '/alpha_detail.png', to: '/case-study/alpha-arena' },
  { name: 'BitWise', meta: ['Crypto', 'Mobile UX'], img: '/bitwise_thumb.png', to: '/case-study/bitwise' },
  { name: 'Silk Emporium', meta: ['E-commerce', 'Brand', 'UI'], img: '/silk_emporium.png' },
  { name: 'Oman United Insurance', meta: ['Insurance', 'Web + Mobile', 'Angular'], img: '/oman_insurance_thumb.png' },
  { name: 'BookAPandit UK', meta: ['Marketplace', 'Next.js'], img: '/bookapandit_thumb.png' },
  { name: 'Shinhan Life Vietnam', meta: ['Insurance', 'Bilingual CMS'], img: '/shinhan_life_thumb.png' },
  { name: 'Infy Tech School', meta: ['EdTech', 'Lead Capture'], img: '/infy_tech_thumb.png' },
];

const Work = () => {
  const [preview, setPreview] = useState(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });

  const onMove = (e) => { x.set(e.clientX + 28); y.set(e.clientY - 120); };

  const Item = ({ p, i }) => {
    const inner = (
      <>
        <span className="work-idx">/0{i + 1}</span>
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
            <span className="sec-kicker"><Scramble text="01 / SELECTED WORK" /></span>
            <h2 className="sec-title"><Rise>Proof, not promises</Rise></h2>
          </div>
          <p className="sec-note">
            Fintech, insurance, e-commerce, edtech — shipped across India,
            the Gulf, the UK and Vietnam. Hover to peek, click to dive.
          </p>
        </div>
        <div className="work-list">
          {PROJECTS.map((p, i) => <Item key={p.name} p={p} i={i} />)}
        </div>
      </div>
      <AnimatePresence>
        {preview && (
          <motion.div className="work-preview" style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: EASE }}>
            <img src={preview} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ---------------- Terminal (AI workflow, self-typing) ---------------- */
const TERM_LINES = [
  { c: 'p', t: '$ eskay run brief.md' },
  { c: '', t: '▸ parsing brief · extracting user goals … done' },
  { c: '', t: '▸ generating 12 layout directions … done' },
  { c: '', t: '▸ senior review: 9 killed, 3 refined ✂' },
  { c: '', t: '▸ hi-fi prototype + design tokens … done' },
  { c: '', t: '▸ react components w/ WCAG pass … done' },
  { c: 'ok', t: '✓ shipped in 6 days — client cried (happy)' },
];

const Terminal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [lines, setLines] = useState([]);
  useEffect(() => {
    if (!inView) return;
    TERM_LINES.forEach((l, i) => setTimeout(() => setLines((prev) => [...prev, l]), 350 + i * 520));
  }, [inView]);
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap" ref={ref}>
        <div className="term" data-hover>
          <div className="term-bar"><i /><i /><i /><span>eskay-studio — pipeline.log</span></div>
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

/* ---------------- Journey ---------------- */
const JOURNEY = [
  { period: '2026 — NOW', role: 'Founder — EsKay AI Design Studio', co: 'AI-powered freelance design & development', loc: 'REMOTE / GLOBAL' },
  { period: '2021 — 2026', role: 'UI/UX Designer & Frontend Developer', co: 'Azentio Software Pvt. Ltd.', loc: 'CHENNAI' },
  { period: '2019 — 2021', role: 'UI Designer', co: '3i Infotech Ltd.', loc: 'CHENNAI' },
  { period: '2016 — 2017', role: 'Trainee Engineer — Development', co: 'IVTL Infoview Technologies', loc: 'CHENNAI' },
];

const Journey = () => (
  <section className="section" style={{ paddingTop: 0 }}>
    <div className="wrap">
      <div className="sec-head">
        <div>
          <span className="sec-kicker"><Scramble text="04 / TRAJECTORY" /></span>
          <h2 className="sec-title"><Rise>A decade of pixels</Rise></h2>
        </div>
      </div>
      <div className="journey">
        {JOURNEY.map((j, i) => (
          <motion.div className="journey-row" key={j.role}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}>
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
      <span className="sec-kicker"><Scramble text="05 / NEXT PROJECT" /></span>
      <h2 className="contact-mega">
        <Rise>Got an idea?</Rise><br />
        <a href="mailto:kumaranraja210794@gmail.com" data-hover>
          <span className="fill">Let's ship it.</span>
        </a>
      </h2>
      <p className="contact-sub">
        Currently taking on 2 new clients for Q3 2026.
        Tell me what you're building — you'll hear back within 24 hours.
      </p>
      <div className="contact-actions">
        <Magnet><a className="btn-primary" href="mailto:kumaranraja210794@gmail.com"><span>kumaranraja210794@gmail.com</span></a></Magnet>
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
const Footer = () => (
  <div className="wrap">
    <footer className="footer">
      <span>© 2026 ESKAY® STUDIO — DESIGNED & CODED BY A HUMAN, ACCELERATED BY AI</span>
      <span>CHENNAI → THE WORLD</span>
    </footer>
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
      <Nav />
      <main>
        <Hero />
        <Marquee items={['AI PRODUCT DESIGN', 'UX RESEARCH', 'DESIGN SYSTEMS', 'REACT', 'PROTOTYPING', 'DESIGN-TO-CODE']} />
        <Work />
        <Services />
        <Terminal />
        <About />
        <Journey />
        <Marquee rev items={['DISCOVER', 'DEFINE', 'GENERATE', 'REFINE', 'SHIP', 'MEASURE', 'REPEAT']} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
