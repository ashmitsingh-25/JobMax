import { motion, useInView as useFramerInView } from 'framer-motion';
import React, { useRef } from 'react';

export function InView({ children, variants, transition, viewOptions, className }) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, ...viewOptions });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
