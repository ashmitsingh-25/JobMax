import { motion } from 'framer-motion';
import React from 'react';

export function InfiniteSlider({ children, gap = 24, reverse = false, className, speed = 30 }) {
  return (
    <div className={`overflow-hidden flex w-full relative ${className || ''}`}>
      <motion.div
        className="flex shrink-0 items-center justify-around"
        style={{ gap, paddingRight: gap }}
        animate={{ x: reverse ? ['-100%', '0%'] : ['0%', '-100%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {children}
      </motion.div>
      <motion.div
        className="flex shrink-0 items-center justify-around absolute top-0 left-[100%]"
        style={{ gap, paddingRight: gap }}
        animate={{ x: reverse ? ['-100%', '0%'] : ['0%', '-100%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
