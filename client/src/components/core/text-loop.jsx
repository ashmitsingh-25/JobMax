import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

export function TextLoop({ children, className, transition, variants, interval = 2000 }) {
  const [index, setIndex] = useState(0);
  const items = React.Children.toArray(children);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
    <div className={`relative inline-flex ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants}
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
