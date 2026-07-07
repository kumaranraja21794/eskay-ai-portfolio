import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import {
  BriefcaseBusiness,
  Code2,
  Sparkles,
  SwatchBook,
  Layers,
} from 'lucide-react';
import TextReveal from './TextReveal';

const experienceItems = [
  {
    role: 'AI-Powered Freelance Developer',
    company: 'Self-Employed / Remote',
    period: 'Jun 2026 - Present',
    icon: Sparkles,
    iconColor: '#FF6B4A',
  },
  {
    role: 'UI/UX Designer & Frontend Developer',
    company: 'Azentio Software Pvt. Ltd., Chennai',
    period: 'Mar 2021 - May 2026',
    icon: SwatchBook,
    iconColor: '#8B5CF6',
  },
  {
    role: 'UI Designer',
    company: '3i Infotech Ltd., Chennai',
    period: 'Mar 2019 - Mar 2021',
    icon: Layers,
    iconColor: '#06B6D4',
  },
  {
    role: 'Trainee Engineer - Development',
    company: 'IVTL Infoview Technologies Pvt. Ltd., Chennai',
    period: 'Sep 2016 - Aug 2017',
    icon: Code2,
    iconColor: '#10B981',
  },
];

const toolkitItems = [
  {
    title: 'AI Design Toolkit',
    icon: Sparkles,
    items: ['Figma AI', 'Make', 'Google Stitch', 'Framer AI', 'v0 by Vercel'],
  },
  {
    title: 'Core Design',
    icon: SwatchBook,
    items: ['Advanced Figma', 'Variables & tokens', 'Design systems', 'Component architecture', 'Responsive design', 'WCAG accessibility'],
  },
  {
    title: 'Design to Code',
    icon: Code2,
    items: ['HTML5', 'CSS3', 'Angular', 'Production-ready UI implementation', 'Developer-friendly handoff'],
  },
  {
    title: 'Process',
    icon: BriefcaseBusiness,
    items: ['Interaction design', 'Wireframing', 'Prototyping', 'Developer handoff', 'Usability heuristics', 'A/B test interpretation'],
  },
];

// Pill stagger variants
const pillContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ResumeSections = () => {
  const timelineRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.3'],
  });

  // Animate the vertical timeline line drawing on scroll
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <section id="career-highlights" className="resume-career-dark">
        <div className="container">
          {/* Section heading with TextReveal */}
          <motion.div
            className="resume-section-head"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <TextReveal as="h2" mode="word" delay={0} stagger={0.03}>
              Career Journey
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Designing intuitive enterprise products with a focus on usability, collaboration, and seamless execution.
            </motion.p>
          </motion.div>

          <div className="journey-timeline" ref={timelineRef} style={{ position: 'relative' }}>
            {/* Animated vertical timeline line that draws on scroll */}
            <motion.div
              className="journey-timeline-line-animated"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(180deg, #FF6B4A, rgba(255,107,74,0.2))',
                transformOrigin: 'top',
                scaleY: lineScaleY,
                zIndex: 0,
              }}
            />

            {experienceItems.map((item, index) => (
              <motion.div
                key={`${item.role}-${item.company}`}
                className="journey-item"
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -80 : 80,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 65,
                  damping: 14,
                  mass: 0.9,
                  delay: index * 0.12,
                }}
              >
                {/* Left Column: Company & Period */}
                <div className="journey-left">
                  <h3 className="journey-company">{item.company}</h3>
                  <p className="journey-period">{item.period}</p>
                </div>

                {/* Center: Timeline Line & Dot with pop/scale spring animation */}
                <div className="journey-center">
                  <div className="journey-line"></div>
                  <motion.div
                    className={`journey-dot ${index === 0 ? 'pulse-active' : ''}`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 15,
                      delay: 0.25 + index * 0.15,
                    }}
                    style={{
                      borderColor: `${item.iconColor}30`,
                      background: 'rgba(15, 15, 15, 0.8)',
                      borderStyle: 'solid',
                      boxShadow: index === 0 ? `0 0 15px ${item.iconColor}20` : 'none',
                    }}
                  >
                    {(() => {
                      const Icon = item.icon;
                      return <Icon size={18} style={{ color: item.iconColor, zIndex: 3 }} />;
                    })()}

                    {index === 0 && (
                      <motion.div
                        className="dot-pulse-ring"
                        style={{
                          position: 'absolute',
                          inset: -4,
                          borderRadius: '50%',
                          border: `1.5px solid ${item.iconColor}`,
                          opacity: 0.15,
                          zIndex: 1,
                        }}
                        animate={{
                          scale: [1, 1.25, 1],
                          opacity: [0.15, 0.4, 0.15]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Right Column: Role */}
                <div className="journey-right">
                  <h3 className="journey-role">{item.role}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ============================================
// BENTO COMPONENTS
// ============================================

const BentoCard = ({ children, className, accentColor = '#FF6B4A', delay = 0, style = {}, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const glowBg = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(${accentColor === '#FF6B4A' ? '255, 107, 74' : accentColor === '#8b5cf6' || accentColor === '#8B5CF6' ? '139, 92, 246' : accentColor === '#06B6D4' ? '6, 182, 212' : '16, 185, 129'}, ${isHovered ? '0.15' : '0.05'}),
      transparent 80%
    )
  `;

  return (
    <motion.article
      className={`bento-card ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...style,
        position: 'relative',
      }}
      {...props}
    >
      {/* Radial Glow Layer */}
      <motion.div
        className="bento-glow"
        style={{
          position: 'absolute',
          inset: 0,
          background: glowBg,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Glowing Border outline */}
      <div
        className="bento-border-glow"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          border: '1px solid transparent',
          background: isHovered 
            ? `linear-gradient(135deg, ${accentColor}, transparent 60%)` 
            : 'linear-gradient(135deg, rgba(255,255,255,0.05), transparent 60%)',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'background 0.3s ease',
        }}
      />
      
      {/* Inner Card Content */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {children}
      </div>
    </motion.article>
  );
};

const AICard = () => {
  const aiTools = ['Figma AI', 'Make', 'Google Stitch', 'Framer AI', 'v0 by Vercel'];
  return (
    <BentoCard accentColor="#FF6B4A" className="bento-ai-card">
      <div className="bento-card-header">
        <div className="bento-icon-bg" style={{ background: 'rgba(255,107,74,0.08)', color: '#FF6B4A' }}>
          <Sparkles size={20} />
        </div>
        <h3>AI Design Toolkit</h3>
      </div>
      
      {/* Radar scanning visual */}
      <div className="bento-radar-visual" style={{ margin: '1.2rem 0', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div className="radar-circle-outer" style={{ width: '130px', height: '130px', borderRadius: '50%', border: '1px solid rgba(255,107,74,0.1)', position: 'relative', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
          <div className="radar-circle-inner" style={{ width: '70px', height: '70px', borderRadius: '50%', border: '1px dashed rgba(255,107,74,0.18)' }} />
          <div className="radar-scanner-sweep" style={{ position: 'absolute', width: '50%', height: '50%', top: 0, left: '50%', background: 'conic-gradient(from 0deg, rgba(255,107,74,0.22), transparent 60%)', transformOrigin: 'bottom left', borderTopRightRadius: '100%' }} />
          <div className="radar-sparkle-dot dot-1" />
          <div className="radar-sparkle-dot dot-2" />
          <div className="radar-sparkle-dot dot-3" />
        </div>
      </div>
      
      <div className="bento-card-tags">
        {aiTools.map((tool) => (
          <span key={tool} className="bento-tag" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)' }}>{tool}</span>
        ))}
      </div>
    </BentoCard>
  );
};

const CoreDesignCard = () => {
  const [borderRadius, setBorderRadius] = useState('12px');
  const [accentColor, setAccentColor] = useState('#8B5CF6');
  const [fontFamily, setFontFamily] = useState('var(--font-heading)');

  return (
    <BentoCard accentColor="#8B5CF6" className="bento-core-card" delay={0.08}>
      <div className="bento-card-header">
        <div className="bento-icon-bg" style={{ background: 'rgba(139,92,246,0.08)', color: '#8B5CF6' }}>
          <SwatchBook size={20} />
        </div>
        <h3>Core Design System</h3>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '1.2rem 0' }}>
        {/* Mock Component Preview */}
        <div 
          style={{
            flex: '1',
            height: '130px',
            borderRadius: borderRadius,
            border: `1px solid ${accentColor}30`,
            background: 'rgba(255,255,255,0.01)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: fontFamily,
            boxShadow: `0 8px 30px ${accentColor}10`,
            transition: 'all 0.35s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle accent light */}
          <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '50px', height: '50px', borderRadius: '50%', background: accentColor, opacity: 0.15, filter: 'blur(20px)', transition: 'all 0.35s ease' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.05em' }}>Component</span>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, transition: 'all 0.35s ease' }} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '5px 0', color: '#fff' }}>Card Spec</h4>
          <div style={{ height: '5px', borderRadius: '2px', background: `${accentColor}20`, width: '70%', transition: 'all 0.35s ease' }} />
        </div>

        {/* Figma Inspector Panel */}
        <div className="figma-mock-panel" style={{ flex: '1.2', margin: 0, padding: '0.8rem', gap: '0.5rem', background: 'rgba(10, 10, 10, 0.4)', borderRadius: '12px' }}>
          <div className="figma-panel-header" style={{ fontSize: '0.65rem' }}>
            <span>Figma Inspector</span>
            <span style={{ color: '#8B5CF6' }}>Tokens</span>
          </div>
          
          <div className="figma-panel-body" style={{ gap: '0.4rem' }}>
            {/* Accent Color Token */}
            <div 
              className="figma-token-row"
              style={{ padding: '0.4rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem' }}
              onMouseEnter={() => setAccentColor('#10B981')}
              onMouseLeave={() => setAccentColor('#8B5CF6')}
            >
              <span className="token-label">--color</span>
              <div className="token-value-wrap">
                <span className="color-preview" style={{ background: '#10B981', width: '10px', height: '10px' }} />
                <span className="token-val" style={{ color: '#10B981' }}>#10B981</span>
              </div>
            </div>

            {/* Border Radius Token */}
            <div 
              className="figma-token-row"
              style={{ padding: '0.4rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem' }}
              onMouseEnter={() => setBorderRadius('24px')}
              onMouseLeave={() => setBorderRadius('12px')}
            >
              <span className="token-label">--radius</span>
              <div className="token-value-wrap">
                <span className="token-val" style={{ color: '#fff' }}>24px</span>
              </div>
            </div>

            {/* Font Family Token */}
            <div 
              className="figma-token-row"
              style={{ padding: '0.4rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem' }}
              onMouseEnter={() => setFontFamily('Georgia, serif')}
              onMouseLeave={() => setFontFamily('var(--font-heading)')}
            >
              <span className="token-label">--font</span>
              <div className="token-value-wrap">
                <span className="token-val" style={{ fontFamily: 'Georgia, serif', color: '#fff', fontSize: '0.7rem' }}>Serif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bento-card-footer">
        <p className="bento-card-hint" style={{ color: '#8B5CF6', fontSize: '0.75rem' }}>Hover options to update preview card spec</p>
      </div>
    </BentoCard>
  );
};

const DesignToCodeCard = () => {
  return (
    <BentoCard accentColor="#06B6D4" className="bento-code-card" delay={0.16}>
      <div className="bento-card-header">
        <div className="bento-icon-bg" style={{ background: 'rgba(6,182,212,0.08)', color: '#06B6D4' }}>
          <Code2 size={20} />
        </div>
        <h3>Design to Code</h3>
      </div>

      {/* Code Editor Panel */}
      <div className="code-editor-mock" style={{ margin: '1.2rem 0', borderRadius: '12px', background: 'rgba(10,10,10,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="editor-tab-bar" style={{ padding: '0.5rem 0.8rem', background: 'rgba(0,0,0,0.2)' }}>
          <div className="editor-controls" style={{ gap: '0.3rem' }}>
            <span className="dot dot-close" style={{ width: '8px', height: '8px' }} />
            <span className="dot dot-minimize" style={{ width: '8px', height: '8px' }} />
            <span className="dot dot-maximize" style={{ width: '8px', height: '8px' }} />
          </div>
          <span className="editor-file-name" style={{ fontSize: '0.65rem' }}>Link.jsx</span>
        </div>
        <div className="editor-code-body" style={{ padding: '1rem', fontSize: '0.75rem', lineHeight: 1.45 }}>
          <pre style={{ margin: 0 }}>
            <code className="syntax-highlight">
              <span className="code-keyword" style={{ color: '#c586c0' }}>const</span> <span className="code-variable" style={{ color: '#9cdcfe' }}>magneticLink</span> = &#123;<br />
              &nbsp;&nbsp;strength: <span className="code-number" style={{ color: '#b5cea8' }}>0.15</span>,<br />
              &nbsp;&nbsp;active: <span className="code-boolean" style={{ color: '#569cd6' }}>true</span>,<br />
              &nbsp;&nbsp;element: <span className="code-string" style={{ color: '#ce9178' }}>'cta-email'</span><br />
              &#125;;
            </code>
          </pre>
          <div className="blinking-cursor" style={{ background: '#06B6D4', width: '5px', height: '12px', left: '8.4rem', bottom: '1.1rem' }} />
        </div>
      </div>

      <div className="bento-card-tags">
        {['HTML5', 'CSS3', 'React', 'Handoff'].map((tag) => (
          <span key={tag} className="bento-tag" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)' }}>{tag}</span>
        ))}
      </div>
    </BentoCard>
  );
};

const ProcessPipelineCard = () => {
  const steps = [
    { title: 'Research & IA', desc: 'User flows, card sorting, auditing metrics.' },
    { title: 'Prototypes', desc: 'High-fidelity Figma wireframes & transitions.' },
    { title: 'Handoff Specs', desc: 'Code specs, handoff assets.' }
  ];

  return (
    <BentoCard accentColor="#10B981" className="bento-process-card" delay={0.24}>
      <div className="bento-card-header">
        <div className="bento-icon-bg" style={{ background: 'rgba(16,185,129,0.08)', color: '#10B981' }}>
          <BriefcaseBusiness size={20} />
        </div>
        <h3>Process & Handoff</h3>
      </div>

      {/* Static visible pipeline */}
      <div className="bento-pipeline-visual" style={{ margin: '1.25rem 0', height: '140px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: 0 }}>
        {/* Connecting Line */}
        <div className="pipeline-line" style={{ background: 'rgba(255,255,255,0.05)', left: '2rem', right: '2rem', top: '15px', height: '2px', position: 'absolute', zIndex: 0 }}>
          <div 
            className="pipeline-line-fill" 
            style={{ 
              width: '100%',
              background: '#10B981',
              height: '100%'
            }}
          />
        </div>
        
        {/* Steps Row */}
        <div className="pipeline-steps-row" style={{ display: 'flex', justifyContent: 'space-between', zIndex: 1, width: '100%', padding: 0 }}>
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="pipeline-step-node"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div 
                className="pipeline-dot"
                style={{
                  width: '30px',
                  height: '30px',
                  background: '#1c1c1c',
                  borderColor: '#10B981',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 750,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '2px solid',
                  marginBottom: '0.6rem',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.25)',
                  zIndex: 2,
                  transition: 'all 0.3s'
                }}
              >
                <span>{idx + 1}</span>
              </div>
              
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', margin: '0 0 0.2rem 0', fontFamily: 'var(--font-heading)' }}>{step.title}</h4>
              <p style={{ fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.45)', lineHeight: 1.3, margin: 0, padding: '0 4px', fontFamily: 'var(--font-body)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bento-card-footer">
        <p className="bento-card-hint" style={{ color: '#10B981', fontSize: '0.75rem' }}>Complete end-to-end design delivery process</p>
      </div>
    </BentoCard>
  );
};

export default ResumeSections;
