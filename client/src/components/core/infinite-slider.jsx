import { motion } from 'framer-motion';
import React from 'react';

export function InfiniteSlider({ children, gap = 24, reverse = false, className, speed = 30 }) {
  return (
    <div className={`overflow-hidden flex w-full relative ${className || ''}`}>
      <motion.div
        className="flex shrink-0 items-center"
        style={{ gap }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center justify-around" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center justify-around" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
