'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { REGISTRATION } from '@/constants/site-data';

interface SuccessModalProps {
  show: boolean;
  onRedirect: () => void;
}

export function SuccessModal({ show, onRedirect }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-glass rounded-3xl p-8 sm:p-12 max-w-md w-full flex flex-col items-center gap-6 text-center"
              initial={{ scale: 0.85, y: 32 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 32 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* Animated check */}
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'var(--gradient-accent)', boxShadow: 'var(--glow-primary)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
              >
                <CheckCircle2 size={40} className="text-white" />
              </motion.div>

              <div className="flex flex-col gap-2">
                <h2
                  className="font-bold text-2xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {REGISTRATION.successTitle}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {REGISTRATION.successBody}
                </p>
              </div>

              {/* Confetti dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent-glow)' }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: (i % 2 === 0 ? 1 : -1) * (40 + i * 20),
                    y: -(60 + i * 15),
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                />
              ))}

              <GlowButton
                label={REGISTRATION.successCta}
                onClick={onRedirect}
                size="lg"
                className="w-full justify-center"
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
