import React, { useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [precent, setPrecent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPrecent(Math.round(v * 100));
  });

  return (
    <>
      <div className="progress-container">
        <motion.div
          className="progress-bar"
          style={{ scaleX }}
        />
      </div>
      {/* <div className="progress-text">
        {precent === 100 ? 'Quest Complete!' : `Quest Progress: ${precent}%`}
      </div> */}
    </>
  );
};

export default ProgressBar;
