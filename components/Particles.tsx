import React from 'react';
import { motion } from 'framer-motion';

const Particles: React.FC = () => {
  // Generate random positions for particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    char: ['💰', '✨', '🚀', '💎'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '110vh', x: `${p.x}vw`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.4, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{ fontSize: p.size }}
          className="absolute text-white/10"
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
};

export default Particles;