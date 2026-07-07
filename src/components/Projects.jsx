import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';

const projects = [
  {
    title: "KC Chinnadurai Silk Emporium",
    img: "silk_emporium.png",
    role: "UX/UI Designer",
    outcome: "Premium E-commerce",
    desc: "A comprehensive digital storefront and e-commerce experience designed for a traditional silk emporium, blending cultural heritage with modern usability.",
    tags: ["E-commerce", "Prototyping", "UI/UX"],
    link: "https://www.figma.com/proto/PuzuMFEVnnwpOeDgMqM4PV/Projects?node-id=1-534&viewport=303%2C225%2C0.13&t=7idDLKO3LPkis8VF-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A534&show-proto-sidebar=1&page-id=0%3A1",
    accentColor: "#EA580C",
  },
  {
    title: "Alpha Arena Platform",
    img: "new-dash.png",
    role: "UX Designer",
    outcome: "65% Faster Workflow",
    desc: "An AI-driven trading competition dashboard. Transformed complex financial datasets into actionable insights through strategic information hierarchy and intuitive data visualization.",
    tags: ["Fintech", "UX Research", "Dashboard"],
    link: "/case-study/alpha-arena",
    accentColor: "#8B5CF6",
  },
  {
    title: "BitWise App",
    img: "bitwise_thumb.png",
    role: "Product Designer",
    outcome: "Clear Market Depth",
    desc: "A dark-first, clarity-focused crypto trading app designed for new and intermediate traders who want simplicity without losing market depth.",
    tags: ["Crypto", "Mobile UX", "Fintech"],
    link: "/case-study/bitwise",
    accentColor: "#10B981",
  },
  {
    title: "Oman United Insurance",
    img: "oman_insurance_thumb.png",
    role: "Frontend Developer & UI Designer",
    outcome: "Angular Insurance Portal",
    desc: "Designed and developed the Angular web portal for leading insurer (OUIC) — quoting and buying policies with self service account management — and designed UI for companion mobile app.",
    tags: ["Angular", "Web & Mobile", "Mobile UI Design"],
    link: "https://online.omanutd.com",
    accentColor: "#0D9488",
  },
  {
    title: "BookAPanditUK",
    img: "bookapandit_thumb.png",
    role: "Full Stack Developer",
    outcome: "Verified Priest Marketplace",
    desc: "Built a verified Hindu-priest marketplace for the UK — search by city and ceremony, dynamic profile pages, reviews, and one-tap WhatsApp enquiry routing across 6 cities.",
    tags: ["Next.js", "React", "Marketplace"],
    link: "https://book-a-pandit-chi.vercel.app",
    accentColor: "#F59E0B",
  },
  {
    title: "Shinhan Life Vietnam",
    img: "shinhan_life_thumb.png",
    role: "Frontend Developer",
    outcome: "Life Insurance Site",
    desc: "Frontend for a bilingual (VI/EN) life-insurance corporate site — CMS-driven navigation, product catalogs, and portal integration.",
    tags: ["WordPress", "CMS", "Bilingual UI"],
    link: "https://shinhanlifevn.com.vn",
    accentColor: "#2563EB",
  },
  {
    title: "Infy Tech School",
    img: "infy_tech_thumb.png",
    role: "Frontend Developer",
    outcome: "Academy Marketing Site",
    desc: "Multi-page marketing site for an online tech academy — course catalog and lead-capture enquiry forms.",
    tags: ["Responsive Web", "Lead Capture", "Enquiry Portal"],
    link: "https://infytechschool.com",
    accentColor: "#8B5CF6",
  }
];

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Monitor resize for responsive layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 991);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Monitor scroll progress in the project section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active project index from scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Range: 0 to 1 split dynamically based on project array length
    const index = Math.min(Math.floor(latest * projects.length), projects.length - 1);
    setActiveIndex(index);
  });

  // Motion values for the 3D mouse parallax tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed rotation transforms for the image container
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x / width);
    mouseY.set(y / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Dot Navigator Click handler (scrolls directly to specific project segment)
  const handleDotClick = (index) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScroll = container.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / Math.max(1, projects.length - 1)) * totalScroll;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const safeIndex = Math.min(activeIndex, projects.length - 1);
  const activeProject = projects[safeIndex] || projects[0];

  // Mobile layout
  if (isMobile) {
    return (
      <section id="projects" className="projects mobile-vertical">
        <div className="container">
          <div className="projects-header" style={{ marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6B4A', letterSpacing: '0.15em' }}>WORK</span>
            <TextReveal as="h2" mode="word" stagger={0.06} duration={0.7}>
              Featured Projects
            </TextReveal>
            <p className="projects-subtitle">
              A collection of selected works focusing on usability, aesthetics, and user-centric problem solving.
            </p>
          </div>

          <div className="project-list-ref">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                className="project-mobile-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: '#121212',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden',
                  marginBottom: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Dynamically colored background glow on mobile cards */}
                <div 
                  className="mobile-card-glow"
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    background: p.accentColor,
                    filter: 'blur(80px)',
                    opacity: 0.1,
                    pointerEvents: 'none'
                  }}
                />

                <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: p.accentColor }}>0{i + 1}</span>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>/ FEATURED</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                  
                  <div className="project-meta-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span className="meta-pill"><strong>Role:</strong> {p.role}</span>
                    <span className="meta-pill"><strong>Impact:</strong> {p.outcome}</span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                  
                  <div className="project-tags-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {p.tags.map((t) => <span key={t} className="tag-ref">{t}</span>)}
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    {p.link && p.link.startsWith('http') ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-explore-btn" style={{ textDecoration: 'none', borderColor: `${p.accentColor}40`, background: `${p.accentColor}08` }}>
                        <span style={{ color: p.accentColor }}>Explore Project</span>
                        <ArrowRight size={18} style={{ color: p.accentColor }} />
                      </a>
                    ) : (
                      <Link to={p.link || '#'} className="project-explore-btn" style={{ textDecoration: 'none', borderColor: `${p.accentColor}40`, background: `${p.accentColor}08` }}>
                        <span style={{ color: p.accentColor }}>Explore Project</span>
                        <ArrowRight size={18} style={{ color: p.accentColor }} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Cinematic Showcase
  return (
    <section id="projects" ref={containerRef} className="cinematic-projects-section" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky-scroll-wrapper">
        <div className="cinematic-viewport">
          
          {/* Left Details Column */}
          <div className="project-details-pane">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="details-pane-content"
              >
                {/* Outlined Project Number Watermark */}
                <div className="details-index-watermark" style={{ WebkitTextStroke: `1px ${activeProject.accentColor}30`, color: 'transparent' }}>
                  0{safeIndex + 1}
                </div>

                <div className="details-header-row">
                  <span className="details-featured-badge" style={{ color: activeProject.accentColor }}>
                    <Sparkles size={12} style={{ marginRight: '4px' }} />
                    0{safeIndex + 1} / FEATURED WORK
                  </span>
                </div>

                <h3 className="details-project-title">
                  {activeProject.title}
                </h3>

                {/* Meta Pills Bento Card */}
                <div className="details-meta-bento">
                  <div className="meta-bento-item">
                    <span className="meta-label">ROLE</span>
                    <span className="meta-val">{activeProject.role}</span>
                  </div>
                  <div className="meta-bento-item">
                    <span className="meta-label">IMPACT</span>
                    <span className="meta-val" style={{ color: activeProject.accentColor }}>{activeProject.outcome}</span>
                  </div>
                </div>

                <p className="details-project-desc">
                  {activeProject.desc}
                </p>

                <div className="details-tags-row">
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className="tag-ref" style={{ borderColor: `${activeProject.accentColor}30` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="details-cta-row">
                  <Magnetic strength={0.15}>
                    {activeProject.link && activeProject.link.startsWith('http') ? (
                      <a 
                        href={activeProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-explore-btn"
                        style={{ borderColor: `${activeProject.accentColor}40`, background: `${activeProject.accentColor}06` }}
                      >
                        <span style={{ color: '#fff' }}>Launch Project</span>
                        <ArrowRight size={18} style={{ color: activeProject.accentColor }} />
                      </a>
                    ) : (
                      <Link 
                        to={activeProject.link || '#'} 
                        className="project-explore-btn"
                        style={{ borderColor: `${activeProject.accentColor}40`, background: `${activeProject.accentColor}06` }}
                      >
                        <span style={{ color: '#fff' }}>Launch Case Study</span>
                        <ArrowRight size={18} style={{ color: activeProject.accentColor }} />
                      </Link>
                    )}
                  </Magnetic>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Visual Column */}
          <div className="project-visual-pane">
            <div className="perspective-container">
              
              {/* Dynamic colored background glow */}
              <div 
                className="cinematic-backdrop-glow"
                style={{ 
                  background: `radial-gradient(circle, ${activeProject.accentColor}18 0%, transparent 70%)` 
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={safeIndex}
                  initial={{ opacity: 0, scale: 0.95, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                  exit={{ opacity: 0, scale: 0.95, clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="image-3d-wrapper"
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    borderColor: `${activeProject.accentColor}20`,
                    boxShadow: `0 35px 80px rgba(0, 0, 0, 0.6), 0 0 50px ${activeProject.accentColor}08`
                  }}
                >
                  <img 
                    src={activeProject.img} 
                    alt={activeProject.title} 
                    className="cinematic-image"
                    style={{ transform: "translateZ(30px)" }}
                  />

                  {/* Inner glossy reflection overlay */}
                  <div className="inner-gloss-reflection" style={{ transform: "translateZ(31px)" }} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Floating Navigator Strip */}
          <div className="navigator-dot-strip">
            {projects.map((p, index) => {
              const isActive = index === safeIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`dot-nav-item ${isActive ? 'active' : ''}`}
                  style={{ '--accent': p.accentColor }}
                >
                  <span className="dot-label">0{index + 1}</span>
                  <div className="dot-circle">
                    {isActive && (
                      <motion.div 
                        layoutId="activeDotRing" 
                        className="dot-ring"
                        transition={{ type: "spring", stiffness: 150, damping: 18 }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
