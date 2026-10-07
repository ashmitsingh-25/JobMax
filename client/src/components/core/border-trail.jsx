import { motion } from 'framer-motion';
import React from 'react';

export function BorderTrail({ size = 100, style, className = "" }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] ${className}`}>
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          top: 0,
          left: 0,
          ...style,
        }}
        animate={{
          x: ['0%', '300%', '300%', '0%', '0%'],
          y: ['0%', '0%', '300%', '300%', '0%'],
        }}
        transition={{
          duration: 6,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </div>
  );
}
