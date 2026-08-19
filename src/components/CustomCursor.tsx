'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'hidden'>('hidden');

  useEffect(() => {
    // Non-touch & respect reduced-motion
    const hasTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hasTouch || prefersReducedMotion) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverElement = target.closest('[data-cursor]');
      if (hoverElement) {
        const text = hoverElement.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorVariant('hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const onMouseLeave = () => setCursorVariant('hidden');
    const onMouseEnter = () => setCursorVariant('default');

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (cursorVariant === 'hidden') return null;

  const isHovered = cursorVariant === 'hover' && Boolean(cursorText);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovered ? 34 : 5),
        y: mousePosition.y - (isHovered ? 34 : 5),
        width: isHovered ? 68 : 10,
        height: isHovered ? 68 : 10,
        backgroundColor: '#FFFFFF',
      }}
      transition={{
        type: 'spring',
        stiffness: 550,
        damping: 35,
        mass: 0.35,
      }}
    >
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.span
            key={cursorText}
            initial={{ opacity: 0, y: 3, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -3, scale: 0.85 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="text-[10px] font-bold tracking-widest text-black uppercase font-mono select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
