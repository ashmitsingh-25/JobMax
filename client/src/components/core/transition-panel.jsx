import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

export function TransitionPanel({ activeIndex, variants, transition, children, custom }) {
  const items = React.Children.toArray(children);
  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence initial={false} custom={custom}>
        <motion.div
          key={activeIndex}
          custom={custom}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full"
        >
          {items[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
