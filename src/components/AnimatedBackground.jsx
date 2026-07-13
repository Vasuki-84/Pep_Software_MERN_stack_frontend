import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ variant }) => {
  if (variant === 'aurora') {
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary-200 blur-[100px] opacity-40 mix-blend-multiply"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-200 blur-[120px] opacity-30 mix-blend-multiply"
        />
      </div>
    );
  }

  if (variant === 'particles') {
    // Generate random particles
    const particles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));

    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: `${p.y}vh`, x: `${p.x}vw` }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [`${p.y}vh`, `${p.y - 20}vh`],
              x: [`${p.x}vw`, `${p.x + (Math.random() > 0.5 ? 10 : -10)}vw`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-primary-400 blur-[2px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'blobs') {
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full blur-[100px] opacity-40 origin-bottom-right"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-indigo-200 rounded-full blur-[120px] opacity-30 origin-top-left"
        />
      </div>
    );
  }

  if (variant === 'glassmorphism') {
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
        <motion.div
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-200 rounded-full blur-[120px] mix-blend-multiply"
        />
      </div>
    );
  }

  return null;
};

export default AnimatedBackground;
