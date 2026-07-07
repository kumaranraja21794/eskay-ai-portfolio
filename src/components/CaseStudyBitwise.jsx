import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle, AlertCircle, TrendingUp,
  BarChart3, Users, Layout, Target,
  Maximize2, Activity, Shield,
  Info, Sparkles, Scale, DollarSign,
  ArrowRightLeft, Landmark, Layers, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TextReveal from './TextReveal';


const CaseStudyBitwise = () => {
  const screenshotCards = [
    {
      title: 'Settings Screen',
      features: ['Centralized profile visualization with gorilla avatar', 'One-tap dark/light mode toggle switch', 'Structured navigation to FAQs and Signout'],
      takeaway: 'Reduces information density of account settings to focus on primary accessibility configurations first.'
    },
    {
      title: 'Buy/Swap interface',
      features: ['Selective tab selectors (Buy, Sell, Swap)', 'Vibrant neon CTA buttons for high-action clarity', 'Minimal trade parameters to reduce pricing confusion'],
      takeaway: 'By disclosing transaction fees and estimated payouts upfront, it removes retail trader hesitation.'
    },
    {
      title: 'Market Listings',
      features: ['Simple search function at the top', 'Gainers, Losers, and New Listings filters', 'Subtle list row padding for mobile legibility'],
      takeaway: 'Focuses entirely on key metrics (Symbol, Name, Price, Daily %) avoiding complex margin statistics.'
    },
    {
      title: 'Asset Info Tab',
      features: ['Direct integration alongside charts', 'Standardized history and blockchain references', 'Saves user from exiting app for asset diligence'],
      takeaway: 'Aligns trading decision-making with inline fundamental research.'
    },
    {
      title: 'Candlestick Chart View',
      features: ['High-contrast red/green candles', 'Clean interval buttons (1H, 1D, 1W, 1M, 3M)', 'Selective core metrics: Volume, Liquidity, Cap'],
      takeaway: 'Balances advanced technical analysis charts with lightweight data formatting.'
    }
  ];

  return (
    <div className="case-study-page bitwise-study-page" style={{ '--accent-primary': '#10B981' }}>
      <div className="cs-watermark">BITWISE</div>
      
      {/* Back Button */}
      <div className="container" style={{ position: 'relative', zIndex: 100 }}>
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero Header */}
      <header className="cs-hero" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.04) 0%, transparent 60%), #0c0c0c' }}>
        <div className="container">
          <motion.div 
            className="cs-tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#10B981' }}
          >
            Case Study — Crypto Trading App
          </motion.div>
          
          <div className="cs-hero-grid">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              BitWise: <br />
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Streamlining the Crypto Trading Funnel</span>
            </motion.h1>
            
            <motion.div 
              className="cs-lead-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="cs-lead">
                BitWise is a dark-first, clarity-focused cryptocurrency trading application. This case study compares standard trading application complexities with the mockup layouts designed to offload cognitive fatigue.
              </p>

              <div className="cs-meta-strip">
                <div className="cs-meta-strip-item">
                  <label>Role</label>
                  <span>Product Designer</span>
                </div>
                <div className="cs-meta-strip-divider" />
                <div className="cs-meta-strip-item">
                  <label>Focus</label>
                  <span>Mobile UX & Fintech</span>
                </div>
                <div className="cs-meta-strip-divider" />
                <div className="cs-meta-strip-item">
                  <label>Outcome</label>
                  <span>Clear Market Depth</span>
                </div>
                <div className="cs-meta-strip-divider" />
                <div className="cs-meta-strip-item cs-meta-strip-cta">
                  <a
                    href="https://www.figma.com/proto/nuKIprwh9w0h3vCzTxJ1zB/Design-Portfolio?node-id=20-829&t=2QQUZMdyGy6uC4GL-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=322%3A714&show-proto-sidebar=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-figma-btn"
                  >
                    <svg width="15" height="15" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/>
                      <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
                      <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/>
                      <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/>
                      <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
                    </svg>
                    View Mockups
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Snapshot Section */}
      <section className="cs-section cs-section-tight">
        <div className="container cs-grid">
          <div className="cs-label">Overview</div>
          <div className="cs-content">
            <TextReveal mode="char" as="h2">Selective details for quick trades.</TextReveal>
            <p className="large-p">
              The primary design goal of BitWise is to limit trading friction. Standard mobile apps bombard users with dense order books, margin toggles, and flashing rates that make simple trades feel high-risk. BitWise progressive-discloses stats, grouping education alongside chart indices.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Mockup Section */}
      <section className="cs-section bg-dark text-white">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <span className="cs-tag" style={{ color: '#10b981', borderColor: '#10b981' }}>Interface Mockups</span>
            <TextReveal mode="char" as="h2" style={{ fontSize: '3.5rem', marginTop: '1rem' }}>Original Portfolio Designs</TextReveal>
            <p style={{ maxWidth: '700px', margin: '2rem auto', opacity: 0.7 }}>
              These high-fidelity screens from BitWise showcase the core architecture: Profile Settings, Buy/Swap Execution, Search & Listings, Asset Diligence Info, and price charts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { src: '/bitwise_screen1.png', label: 'Settings & Accessibility' },
              { src: '/bitwise_screen2.png', label: 'Simplified Buy Flow' },
              { src: '/bitwise_screen3.png', label: 'Search & Market Rankings' },
              { src: '/bitwise_screen4.png', label: 'Asset diligences / Info' },
              { src: '/bitwise_screen5.png', label: 'Splash & Brand Identity' }
            ].map((screen, idx) => (
              <motion.div
                key={idx}
                className="screenshot-card"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '24px',
                  padding: '0.75rem',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <img 
                  src={screen.src} 
                  alt={screen.label} 
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    display: 'block'
                  }} 
                />
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {screen.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen-by-Screen Breakdown */}
      <section className="cs-section bg-light">
        <div className="container cs-grid">
          <div className="cs-label text-accent" style={{ color: '#10b981' }}>UX Breakdown</div>
          <div className="cs-content">
            <TextReveal mode="char" as="h2">Architecture & Flow Details</TextReveal>
            <p>
              Analyzing how each individual screen works to streamline the navigation hierarchy and visual structure.
            </p>

            <div className="cs-compact-grid cs-solution-grid" style={{ marginTop: '2.5rem', gridTemplateColumns: '1fr' }}>
              {screenshotCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  className="cs-solution-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="cs-solution-head">
                    <span className="cs-solution-icon" style={{ color: '#10b981' }}>
                      <Layers size={22} />
                    </span>
                    <h3>{card.title}</h3>
                  </div>

                  <div className="cs-solution-columns">
                    <div>
                      <span className="cs-compact-eyebrow" style={{ color: '#10b981' }}>Key Features</span>
                      <ul className="cs-mini-list">
                        {card.features.map((feature, fIdx) => (
                          <li key={fIdx}>
                            <CheckCircle size={16} color="#10b981" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="cs-compact-eyebrow">UX Rationale</span>
                      <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                        {card.takeaway}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Comparative Analysis */}
      <section className="cs-section bg-light cs-section-tight">
        <div className="container">
          <div className="impact-editorial-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="impact-editorial-left" style={{ position: 'static', marginBottom: '3rem' }}>
              <div className="cs-label text-success" style={{ marginBottom: '1.5rem', color: '#10b981' }}>Comparative Analysis</div>
              <TextReveal mode="char" as="h2">BitWise vs. Traditional Trading Platforms</TextReveal>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                How the minimalist dark-first aesthetics and selective data hierarchies of BitWise rank against traditional, high-density crypto platforms.
              </p>
            </div>
            
            <div className="impact-editorial-right" style={{ width: '100%' }}>
              <div className="table-wrap">
                <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)', textAlign: 'left' }}>
                      <th style={{ padding: '1rem' }}>Dimension</th>
                      <th style={{ padding: '1rem' }}>Traditional Exchanges (e.g. Binance)</th>
                      <th style={{ padding: '1rem', color: '#10b981' }}>BitWise Mobile Design</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: '600' }}>Information Density</td>
                      <td style={{ color: 'rgba(255,255,255,0.6)' }}>Extreme density. Flashing order books, bid-ask spreadsheets, leverage selectors, and multiple chart indicators cause instant visual clutter.</td>
                      <td style={{ color: '#10b981', fontWeight: 'bold' }}>Progressive disclosure. Chart metrics are isolated; buy prompts show only flat fees and calculated cost breakdowns.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: '600' }}>Educational Context</td>
                      <td style={{ color: 'rgba(255,255,255,0.6)' }}>Housed in a separate website category or academy section, separating knowledge from direct transactional choices.</td>
                      <td style={{ color: '#10b981', fontWeight: 'bold' }}>Contextual tabs. An "Info" description is built directly into the core charting view to encourage safe asset due diligence.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: '600' }}>Visual Balance & Color</td>
                      <td style={{ color: 'rgba(255,255,255,0.6)' }}>Hyper-reactive green and red indicators trigger emotional trading. Cluttered borders increase user cognitive exhaustion.</td>
                      <td style={{ color: '#10b981', fontWeight: 'bold' }}>Calming dark blue palette. Neon greens are reserved strictly for positive returns, slider positions, and BUY action cues.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: '600' }}>Transaction Funnel</td>
                      <td style={{ color: 'rgba(255,255,255,0.6)' }}>Highly complex order forms with limit/market selections, GTC options, and margin leverage variables.</td>
                      <td style={{ color: '#10b981', fontWeight: 'bold' }}>A simple two-step amount input. Direct flat fee and total pay details make cost immediate and transparent.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Design Quirks Callout */}
              <div style={{
                marginTop: '3rem',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                borderRadius: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Info size={20} style={{ color: '#10b981' }} />
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#fff', fontWeight: '700' }}>Aesthetic Mockup Anomalies</h4>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                  A detailed review of the portfolio assets reveals minor anomalies, such as coin prices (e.g. SOL at $8.7k, ETH at $67.90) and chart Y-axis ranges ($0 - $250) that do not align with actual values. Additionally, a duplicated "New Listings" tab is visible in the search columns. These artifacts indicate that the mockups were engineered to prioritize visual flow, typographic spacing, and aesthetic harmony over mathematical precision, a common standard in early-stage UX layout testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Takeaways Section */}
      <section className="cs-section bg-dark text-white" style={{ padding: '6.5rem 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 60%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="cs-tag" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>UX Insights</span>
            <TextReveal mode="char" as="h2" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', letterSpacing: '-0.03em', marginTop: '1.5rem', color: '#fff' }}>Key Takeaways.</TextReveal>
          </div>
            
          <div className="cs-compact-grid">
            <article className="cs-learning-card">
              <div className="cs-learning-stripe" style={{ background: 'linear-gradient(90deg, #10b981, transparent)' }} />
              <Shield size={28} color="#10b981" style={{ marginBottom: '1.25rem' }} />
              <h4>Calm over Chaos</h4>
              <p>In highly speculative environments like cryptocurrency trading, visual calm creates cognitive relief, enabling smarter decision-making.</p>
            </article>

            <article className="cs-learning-card">
              <div className="cs-learning-stripe" style={{ background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />
              <Activity size={28} color="#06b6d4" style={{ marginBottom: '1.25rem' }} />
              <h4>Action-Focused Layouts</h4>
              <p>Hiding complex features behind smart settings lists avoids user intimidation, and progressive disclosure leads to a cleaner conversion path.</p>
            </article>

            <article className="cs-learning-card">
              <div className="cs-learning-stripe" style={{ background: 'linear-gradient(90deg, #ff6b4a, transparent)' }} />
              <Sparkles size={28} color="#ff6b4a" style={{ marginBottom: '1.25rem' }} />
              <h4>Inline Education</h4>
              <p>Integrating fundamental asset information adjacent to trading charts builds trust and aids retail users without breaking visual flow.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Closing Trigger */}
      <section className="cs-closing">
        <div className="container">
          <div className="closing-content">
            <TextReveal mode="char" as="h2">Interested in premium fintech UX?</TextReveal>
            <p>BitWise proves that simplicity is the ultimate sophistication in cryptocurrency product design.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginTop: '2rem' }}>
              <Link to="/" className="btn">Back to Portfolio</Link>
              <a
                href="https://www.figma.com/proto/nuKIprwh9w0h3vCzTxJ1zB/Design-Portfolio?node-id=20-829&t=2QQUZMdyGy6uC4GL-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=322%3A714&show-proto-sidebar=1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-figma"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#fff'
                }}
              >
                View Figma Mockups
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyBitwise;
