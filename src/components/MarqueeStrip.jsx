import React from 'react';
import { motion } from 'framer-motion';

const MarqueeStrip = ({ 
  items = ['UI DESIGN', 'UX RESEARCH', 'PROTOTYPING', 'DESIGN SYSTEMS', 'USER FLOWS', 'WIREFRAMING'],
  speed = 30,
  separator = '✦',
  reverse = false,
  className = ''
}) => {
  const content = items.map((item, i) => (
    <span key={i} className="marquee-item">
      <span className="marquee-text">{item}</span>
      <span className="marquee-separator">{separator}</span>
    </span>
  ));

  return (
    <div className={`marquee-strip ${className}`}>
      <motion.div 
        className="marquee-track"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {content}
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
