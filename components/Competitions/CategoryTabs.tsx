'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Figma, TrendingUp } from 'lucide-react';
import { EventCard } from './EventCard';
import type { CompetitionCategory } from '@/constants/site-data';

interface CategoryTabsProps {
  categories: readonly CompetitionCategory[];
}

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Figma,
  TrendingUp,
};

export function CategoryTabs({ categories }: CategoryTabsProps) {
  const [active, setActive] = useState(categories[0]?.id ?? '');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Position the sliding pill indicator under the active tab
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLButtonElement>(
      `[data-tab="${active}"]`
    );
    if (!activeBtn) return;
    setIndicatorStyle({
      left: activeBtn.offsetLeft,
      width: activeBtn.offsetWidth,
    });
  }, [active]);

  const activeCategory = categories.find((c) => c.id === active);

  return (
    <div className="flex flex-col gap-10">
      {/* Tab pill row */}
      <div className="flex justify-center">
        <div
          ref={tabsRef}
          className="relative flex gap-1 p-1 rounded-2xl"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Sliding indicator */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-xl"
            style={{ background: 'var(--gradient-accent)' }}
            animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          />

          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                data-tab={cat.id}
                onClick={() => setActive(cat.id)}
                className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200"
                style={{
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                }}
              >
                {Icon && <Icon size={15} />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category description */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-8"
          >
            <p
              className="text-center text-base max-w-xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              {activeCategory.description}
            </p>

            {/* Events grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {activeCategory.events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
