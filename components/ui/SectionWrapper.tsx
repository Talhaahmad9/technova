'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
}

function getInitial(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':    return { opacity: 0, y:  distance };
    case 'down':  return { opacity: 0, y: -distance };
    case 'left':  return { opacity: 0, x:  distance };
    case 'right': return { opacity: 0, x: -distance };
    case 'none':  return { opacity: 0 };
    default:      return { opacity: 0, y:  distance };
  }
}

function getAnimate(direction: Direction) {
  switch (direction) {
    case 'left':
    case 'right': return { opacity: 1, x: 0 };
    case 'none':  return { opacity: 1 };
    default:      return { opacity: 1, y: 0 };
  }
}

export function SectionWrapper({
  children,
  className = '',
  id,
  delay = 0,
  direction = 'up',
  distance = 40,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={getInitial(direction, distance)}
      animate={isInView ? getAnimate(direction) : getInitial(direction, distance)}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.section>
  );
}
