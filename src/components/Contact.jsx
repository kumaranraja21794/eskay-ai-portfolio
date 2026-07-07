import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import TextReveal from './TextReveal';
import Magnetic from './Magnetic';

// Custom SVG Brand Icons since they are removed in modern lucide-react
const Dribbble = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
    <path d="M21.75 12.83c-6.62-1.3-12.14.53-15.38 7.32" />
    <path d="M8.53 2.25c3.51 5.02 5.02 11.53 2.72 19.12" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sakthi-kumaran-62645372/', color: '#0A66C2' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/es.kayy_', color: '#E1306C' },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="contact"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#0F0F0F',
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="contact-gradient-bg"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(255,107,74,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 50%)',
            'radial-gradient(ellipse at 60% 30%, rgba(255,107,74,0.09) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.06) 0%, transparent 50%)',
            'radial-gradient(ellipse at 40% 70%, rgba(255,107,74,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.04) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 50%, rgba(255,107,74,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative large ©2026 text */}
      <motion.span
        className="contact-year-decor"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '-3%',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          fontWeight: '900',
          color: '#fff',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      >
        ©2026
      </motion.span>

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem',
          padding: '6rem 2rem',
        }}
      >
        <TextReveal
          as="h2"
          mode="word"
          stagger={0.06}
          duration={0.6}
          className="contact-heading"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '800',
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-heading)',
            maxWidth: '18ch',
          }}
        >
          Let's Create Something Amazing
        </TextReveal>

        <motion.p
          className="contact-subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '480px',
            lineHeight: 1.6,
          }}
        >
          Currently available for freelance opportunities and long-term collaborations.
        </motion.p>

        {/* Magnetic email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7, type: 'spring', stiffness: 80 }}
        >
          <Magnetic strength={0.15}>
            <motion.a
              href="mailto:kumaranraja21794@yahoo.com"
              className="contact-email-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                fontWeight: '700',
                color: '#FF6B4A',
                fontFamily: 'var(--font-heading)',
                textDecoration: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '80px',
                border: '1px solid rgba(255,107,74,0.25)',
                background: 'rgba(255,107,74,0.06)',
                cursor: 'pointer',
                transition: 'border-color 0.3s, background 0.3s',
              }}
            >
              <Mail size={24} />
              kumaranraja21794@yahoo.com
              <ArrowUpRight size={20} style={{ opacity: 0.6 }} />
            </motion.a>
          </Magnetic>
        </motion.div>

        {/* Social links with stagger */}
        <motion.div
          className="social-links"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 1 } },
          }}
          style={{
            display: 'flex',
            gap: '1.2rem',
            marginTop: '1rem',
          }}
        >
          {socialLinks.map(({ icon: SocialIcon, label, href, color }, i) => (
            <motion.a
              key={i}
              href={href}
              aria-label={label}
              className="contact-social-link"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 120,
                    damping: 14,
                  },
                },
              }}
              whileHover={{
                scale: 1.2,
                backgroundColor: color,
                color: color === '#fff' ? '#0F0F0F' : '#fff',
                borderColor: color,
              }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)',
                background: 'transparent',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              <SocialIcon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer credit */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 1 }}
          style={{
            marginTop: '2rem',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.1em',
            fontFamily: 'var(--font-body)',
          }}
        >
          DESIGNED & BUILT WITH PRECISION
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
