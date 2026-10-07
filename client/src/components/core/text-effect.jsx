import { motion } from 'framer-motion';
import React from 'react';

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function TextEffect({ children, per = 'word', preset = 'fade', as: Component = 'div', className }) {
  const words = typeof children === 'string' ? children.split(per === 'char' ? '' : ' ') : [];

  const variants = preset === 'fade' ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: per === 'char' ? 0.02 : 0.05 } }
  } : defaultVariants;

  const itemVariants = preset === 'fade' ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  } : defaultVariants;

  return (
    <Component className={className} initial="hidden" animate="visible" variants={variants}>
      {words.map((word, i) => (
        <motion.span key={i} variants={itemVariants} className="inline-block">
          {word}{per === 'word' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Component>
  );
}
