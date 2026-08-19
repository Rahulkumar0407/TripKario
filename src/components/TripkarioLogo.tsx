'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TripkarioLogoProps {
  variant?: 'desktop' | 'mobile' | 'compact' | 'monochrome' | 'white' | 'dark' | 'animated' | 'badge-only';
  showWordmark?: boolean;
  className?: string;
  badgeSize?: number;
  textColor?: string;
  isAnimated?: boolean;
}

export default function TripkarioLogo({
  variant = 'desktop',
  showWordmark = true,
  className = '',
  badgeSize,
  textColor,
  isAnimated = false,
}: TripkarioLogoProps) {
  const size = badgeSize || (variant === 'compact' || variant === 'mobile' ? 34 : 40);
  const isWhite = variant === 'white';
  const isAnimatedMode = variant === 'animated' || isAnimated;

  const tealPrimary = isWhite ? '#FFFFFF' : '#173D35';
  const orangeSun = isWhite ? '#FFFFFF' : '#E86A3A';
  const creamBg = isWhite ? 'rgba(255,255,255,0.08)' : '#FAF3E0';
  const cloudColor = isWhite ? 'rgba(255,255,255,0.2)' : '#F7D7C4';
  const mountainTeal = isWhite ? 'rgba(255,255,255,0.3)' : '#173D35';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Hexagonal Shield Badge */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: size, height: size * 1.15 }}
      >
        <svg
          viewBox="0 0 200 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs overflow-visible"
        >
          <defs>
            <clipPath id="badgeClipLogoMain">
              <path d="M100 8L186 52V158L100 222L14 158V52L100 8Z" />
            </clipPath>
          </defs>

          {/* Hexagon Outline */}
          {isAnimatedMode ? (
            <motion.path
              d="M100 8L186 52V158L100 222L14 158V52L100 8Z"
              fill={creamBg}
              stroke={tealPrimary}
              strokeWidth="9"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          ) : (
            <path
              d="M100 8L186 52V158L100 222L14 158V52L100 8Z"
              fill={creamBg}
              stroke={tealPrimary}
              strokeWidth="9"
              strokeLinejoin="round"
            />
          )}

          {/* Artwork */}
          <g clipPath="url(#badgeClipLogoMain)">
            {/* Clouds */}
            <path
              d="M60 42C60 38 68 36 78 38C84 34 96 35 100 40C104 35 116 34 122 38C132 36 140 38 140 42H60Z"
              fill={cloudColor}
            />

            {/* Rising Sun */}
            <g>
              <circle cx="100" cy="95" r="46" fill={orangeSun} />
              <path d="M54 90H146" stroke={creamBg} strokeWidth="3" />
              <path d="M58 98H142" stroke={creamBg} strokeWidth="3" />
              <path d="M66 106H134" stroke={creamBg} strokeWidth="3" />
              <path d="M78 114H122" stroke={creamBg} strokeWidth="3" />
            </g>

            {/* Mountain Ridges */}
            <path d="M10 95L38 90L46 104L68 112L90 120H10V95Z" fill={mountainTeal} />
            <path d="M190 95L162 90L154 104L132 112L110 120H190V95Z" fill={mountainTeal} />

            {/* Cacti Silhouettes */}
            <g stroke={mountainTeal} strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M30 84V100M26 90H30M26 86V90M34 94H30M34 90V94" />
              <path d="M170 84V100M166 90H170M166 86V90M174 94H170M174 90V94" />
            </g>

            {/* Ascending Forward Airplane */}
            <g>
              <path d="M100 68L22 76L22 84L94 80L100 80L106 80L178 84L178 76L100 68Z" fill={tealPrimary} />
              <rect x="52" y="80" width="14" height="18" rx="7" fill={tealPrimary} stroke={creamBg} strokeWidth="2" />
              <rect x="134" y="80" width="14" height="18" rx="7" fill={tealPrimary} stroke={creamBg} strokeWidth="2" />
              <path d="M100 32C91 32 87 45 87 75C87 95 91 116 100 116C109 116 113 95 113 75C113 45 109 32 100 32Z" fill={tealPrimary} />
              <path d="M93 46C93 42 96 40 100 40C104 40 107 42 107 46L105 52H95L93 46Z" fill={creamBg} />
              <line x1="100" y1="40" x2="100" y2="52" stroke={tealPrimary} strokeWidth="1.5" />
              <path d="M100 98L78 106V110L100 108L122 110V106L100 98Z" fill={tealPrimary} />
            </g>

            {/* Stars & 'T' */}
            <g>
              <polygon points="58,168 62,180 74,180 64,188 68,200 58,192 48,200 52,188 42,180 54,180" fill={orangeSun} />
              <polygon points="142,168 146,180 158,180 148,188 152,200 142,192 132,200 136,188 126,180 138,180" fill={orangeSun} />
              <text x="100" y="198" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="36" fill={tealPrimary}>
                T
              </text>
            </g>
          </g>

          {/* Banner with TRIPKARIO */}
          <g>
            <path
              d="M4 125H196C198 125 200 128 198 131L190 155C189 157 187 159 184 159H16C13 159 11 157 10 155L2 131C0 128 2 125 4 125Z"
              fill={isWhite ? tealPrimary : '#FFFFFF'}
              stroke={tealPrimary}
              strokeWidth="5"
            />
            <text
              x="100"
              y="149"
              textAnchor="middle"
              fontFamily="Impact, sans-serif"
              fontWeight="900"
              fontSize="23"
              letterSpacing="3"
              fill={isWhite ? '#173D35' : tealPrimary}
            >
              TRIPKARIO
            </text>
          </g>
        </svg>
      </div>

      {/* Wordmark Typography: TripKario */}
      {showWordmark && variant !== 'badge-only' && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-serif font-bold text-xl sm:text-2xl tracking-tight transition-colors ${
              textColor
                ? textColor
                : isWhite
                ? 'text-white'
                : 'text-[var(--text-primary)]'
            }`}
          >
            TripKario
          </span>
          <span
            className={`text-[9px] font-mono tracking-[0.2em] uppercase mt-0.5 ${
              isWhite
                ? 'text-white/70'
                : 'text-[var(--text-muted)]'
            }`}
          >
            Curated Journeys
          </span>
        </div>
      )}
    </div>
  );
}
