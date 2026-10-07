import { motion, AnimatePresence } from 'framer-motion';
import React, { createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';

const AccordionContext = createContext({});

export function Accordion({ children, className, transition, variants }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <AccordionContext.Provider value={{ expanded, setExpanded, transition, variants }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, value, className }) {
  const { expanded } = useContext(AccordionContext);
  const isExpanded = expanded === value;
  return (
    <div className={clsx(className, isExpanded ? 'group-data-expanded' : '')} data-expanded={isExpanded || undefined}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, isExpanded });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({ children, className, value }) {
  const { expanded, setExpanded } = useContext(AccordionContext);
  return (
    <button
      className={className}
      onClick={() => setExpanded(expanded === value ? null : value)}
    >
      {children}
    </button>
  );
}

export function AccordionContent({ children, className, value, isExpanded }) {
  const { transition, variants } = useContext(AccordionContext);
  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={variants || {
            expanded: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={transition}
          className={clsx('overflow-hidden', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
