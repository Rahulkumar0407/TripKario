'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  dataCursor?: string;
}

export default function MagneticButton({
  children,
  className = '',
  magneticStrength = 0.2,
  dataCursor,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Limit maximum displacement to 6px
    const clampedX = Math.max(-6, Math.min(6, middleX * magneticStrength));
    const clampedY = Math.max(-6, Math.min(6, middleY * magneticStrength));
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 450, damping: 28, mass: 0.15 }}
      data-cursor={dataCursor}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wider text-xs transition-colors duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...(props as any)}
    >
      <motion.span
        animate={{ x: isHovered ? 1.5 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="inline-flex items-center justify-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
