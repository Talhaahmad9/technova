'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBlobProps {
  className?: string;
  style?: React.CSSProperties;
  speed?: number; // 0 = static, 1 = full scroll speed. 0.15–0.3 is subtle
  offsetStart?: string;
  offsetEnd?: string;
}

export function ParallaxBlob({
  className = '',
  style = {},
  speed = 0.2,
  offsetStart = '-20%',
  offsetEnd = '20%',
}: ParallaxBlobProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offsetStart, offsetEnd].map((v) => {
      // scale the offset by speed
      const num = parseFloat(v);
      return `${num * speed * 5}%`;
    })
  );

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      style={{ ...style, y }}
    />
  );
}
