'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import type { GALLERY } from '@/constants/site-data';

type GalleryData = typeof GALLERY;

interface GallerySectionProps {
  data: GalleryData;
}

// Placeholder gradient cards for images without a src yet
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #0620E5 0%, #764ba2 100%)',
  'linear-gradient(135deg, #764ba2 0%, #4065F0 100%)',
  'linear-gradient(135deg, #4065F0 0%, #00d4ff 100%)',
  'linear-gradient(135deg, #00d4ff 0%, #0620E5 100%)',
  'linear-gradient(135deg, #6b8fff 0%, #764ba2 100%)',
  'linear-gradient(135deg, #0620E5 0%, #00d4ff 100%)',
  'linear-gradient(135deg, #764ba2 0%, #6b8fff 100%)',
  'linear-gradient(135deg, #4065F0 0%, #764ba2 100%)',
];

export function GallerySection({ data }: GallerySectionProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-scroll loop
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const speed = 0.6; // px per frame

    const tick = () => {
      if (!isPausedRef.current && !isDraggingRef.current && strip) {
        strip.scrollLeft += speed;
        // Seamless loop: when we've scrolled halfway (the duplicated set), reset to start
        if (strip.scrollLeft >= strip.scrollWidth / 2) {
          strip.scrollLeft = 0;
        }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Mouse drag-to-scroll
  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.pageX;
    scrollStartRef.current = stripRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !stripRef.current) return;
    const delta = dragStartXRef.current - e.pageX;
    stripRef.current.scrollLeft = scrollStartRef.current + delta;
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Touch drag support
  const onTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].pageX;
    scrollStartRef.current = stripRef.current?.scrollLeft ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !stripRef.current) return;
    const delta = dragStartXRef.current - e.touches[0].pageX;
    stripRef.current.scrollLeft = scrollStartRef.current + delta;
  };

  const onTouchEnd = () => { isDraggingRef.current = false; };

  // Duplicate images for seamless infinite loop
  const allImages = [...data.images, ...data.images];

  return (
    <SectionWrapper id="gallery" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 section-grid-bg opacity-30 pointer-events-none" />

      {/* Accent blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-secondary) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(80px)',
        }}
      />

      {/* Section header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col items-center text-center gap-4">
          <SectionEyebrow text={data.eyebrow} />
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {data.heading}
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)' }}>
            {data.subheading}
          </p>
        </div>
      </div>

      {/* Filmstrip — full bleed, no horizontal padding */}
      <div className="relative w-full">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-base), transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }}
        />

        {/* Scrollable strip */}
        <div
          ref={stripRef}
          className="flex gap-4 overflow-x-auto pb-4 select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
            paddingLeft: '6rem',
            paddingRight: '6rem',
          }}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; isDraggingRef.current = false; setIsDragging(false); }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {allImages.map((img, i) => (
            <motion.div
              key={`${img.id}-${i}`}
              className="flex-shrink-0 relative rounded-2xl overflow-hidden group"
              style={{
                width: '320px',
                height: '220px',
                border: '1px solid var(--border-color)',
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
            >
              {img.src ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                  sizes="320px"
                />
              ) : (
                /* Placeholder tile — replaced when real photos arrive */
                <div
                  className="w-full h-full flex items-end p-4"
                  style={{ background: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length] }}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className="mono text-xs font-semibold uppercase tracking-widest text-white opacity-70"
                    >
                      {img.year}
                    </span>
                    <span className="text-white font-semibold text-sm leading-tight opacity-40">
                      Photo coming soon
                    </span>
                  </div>
                </div>
              )}

              {/* Hover overlay with caption */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }}
              >
                <span
                  className="mono text-[10px] font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'var(--accent-glow)' }}
                >
                  {img.year}
                </span>
                {img.caption && (
                  <span className="text-white text-sm font-medium">{img.caption}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instructions hint */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex justify-center">
        <span className="mono text-xs" style={{ color: 'var(--text-subtle)' }}>
          ← drag to explore · hover to pause →
        </span>
      </div>
    </SectionWrapper>
  );
}
