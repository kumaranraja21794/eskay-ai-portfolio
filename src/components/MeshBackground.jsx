import React from 'react';
import { motion } from 'framer-motion';

const MeshBackground = () => {
  return (
    <div className="mesh-container">
      <motion.div
        className="mesh-orb orb-1"
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="mesh-orb orb-2"
        animate={{
          x: [0, -120, 120, 0],
          y: [0, 80, -80, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="mesh-orb orb-3"
        animate={{
          x: [0, 80, -80, 0],
          y: [0, 120, -120, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="mesh-orb orb-4"
        animate={{
          x: [0, -150, 150, 0],
          y: [0, -150, 150, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="mesh-noise" />
    </div>
  );
};

export default MeshBackground;
