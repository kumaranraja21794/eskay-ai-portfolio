import React from 'react';
import { motion } from 'framer-motion';

const TextReveal = ({ 
  children, 
  as: Tag = 'h2', 
  mode = 'word', // 'word' | 'char' | 'line'
  delay = 0,
  stagger = 0.04,
  duration = 0.6,
  className = '',
  style = {},
  once = true 
}) => {
  const text = typeof children === 'string' ? children : '';

  const charVariants = {
    hidden: { y: '110%', opacity: 0, rotateX: 40 },
    visible: (i) => ({
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: delay + i * stagger,
        duration,
        ease: [0.16, 1, 0.3, 1],
      }
    })
  };

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i) => ({
      y: '0%',
      opacity: 1,
      transition: {
        delay: delay + i * stagger,
        duration,
        ease: [0.16, 1, 0.3, 1],
      }
    })
  };

  const lineVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  // Dynamically look up standard HTML tags in Framer Motion components
  const MotionTag = motion[Tag] || motion.h2;

  if (mode === 'char') {
    const words = text.split(' ');
    let charIndex = 0;
    return (
      <MotionTag 
        className={`text-reveal text-reveal--char ${className}`} 
        style={{ ...style, overflow: 'visible' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.05, margin: '0px 0px 100px 0px' }}
      >
        {words.map((word, wIdx) => {
          const chars = word.split('');
          return (
            <span 
              key={wIdx} 
              style={{ 
                display: 'inline-block', 
                whiteSpace: 'nowrap' 
              }}
            >
              {chars.map((char) => {
                const i = charIndex++;
                return (
                  <span 
                    key={i} 
                    style={{ 
                      display: 'inline-block', 
                      overflow: 'hidden', 
                      verticalAlign: 'bottom',
                      paddingBottom: '0.18em', 
                      marginBottom: '-0.18em' 
                    }}
                  >
                    <motion.span
                      custom={i}
                      variants={charVariants}
                      style={{ display: 'inline-block', transformOrigin: 'bottom', willChange: 'transform' }}
                    >
                      {char}
                    </motion.span>
                  </span>
                );
              })}
              {wIdx < words.length - 1 && (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              )}
            </span>
          );
        })}
      </MotionTag>
    );
  }

  if (mode === 'word') {
    const words = text.split(' ');
    return (
      <MotionTag 
        className={`text-reveal text-reveal--word ${className}`} 
        style={{ ...style, overflow: 'visible' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.05, margin: '0px 0px 100px 0px' }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em' }}>
            <motion.span
              custom={i}
              variants={wordVariants}
              style={{ display: 'inline-block', willChange: 'transform' }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </MotionTag>
    );
  }

  // line mode - whole line reveals
  return (
    <MotionTag 
      className={`text-reveal text-reveal--line ${className}`} 
      style={{ ...style, overflow: 'visible' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.05, margin: '0px 0px 100px 0px' }}
    >
      <span style={{ display: 'block', overflow: 'hidden' }}>
        <motion.span
          variants={lineVariants}
          style={{ display: 'block', willChange: 'transform' }}
        >
          {children}
        </motion.span>
      </span>
    </MotionTag>
  );
};

export default TextReveal;
