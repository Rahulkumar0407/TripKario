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
  const size = badgeSize || (variant === 'compact' || variant === 'mobile' ? 36 : 42);
  const isWhiteText = variant === 'white';
  const isAnimatedMode = variant === 'animated' || isAnimated;

  // The authentic client logo palette
  const teal = '#1B4947';
  const tealDark = '#133937';
  const sunsetOrange = '#EE582C';
  const creamBg = '#FAF4E8';
  const creamLight = '#FFFDF9';
  const cloudTint = '#FCEEE3';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* ════════════════════════════════════════════
          AUTHENTIC CLIENT LOGO: HEXAGON AIRLINER BADGE
          ════════════════════════════════════════════ */}
      <div
        className="relative shrink-0 flex items-center justify-center filter drop-shadow-md"
        style={{ width: size * 1.08, height: size * 1.15 }}
      >
        <svg
          viewBox="0 0 240 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Hexagon Clip Path */}
            <clipPath id="clientLogoHexClip">
              <path d="M120 12 L224 68 L224 182 L120 238 L16 182 L16 68 Z" />
            </clipPath>

            {/* Inner Shadow / Glow filter for realism */}
            <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ── 1. OUTER HEXAGON FRAME ── */}
          {isAnimatedMode ? (
            <motion.path
              d="M120 12 L224 68 L224 182 L120 238 L16 182 L16 68 Z"
              fill={creamBg}
              stroke={teal}
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          ) : (
            <path
              d="M120 12 L224 68 L224 182 L120 238 L16 182 L16 68 Z"
              fill={creamBg}
              stroke={teal}
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* Inner Inset Border Line */}
          <path
            d="M120 22 L214 73 L214 177 L120 228 L26 177 L26 73 Z"
            fill="none"
            stroke={creamLight}
            strokeWidth="3"
            opacity="0.8"
          />

          {/* ── 2. CLIPPED ARTWORK CONTENT ── */}
          <g clipPath="url(#clientLogoHexClip)">
            {/* Background Sky / Clouds */}
            <rect x="0" y="0" width="240" height="250" fill={creamBg} />
            <path
              d="M60 48 C60 42 72 40 85 43 C93 38 108 39 114 45 C120 39 135 38 143 43 C156 40 168 42 168 48 Z"
              fill={cloudTint}
            />

            {/* Glowing Sunset with Horizontal Stripe Cuts */}
            <g>
              <circle cx="120" cy="106" r="48" fill={sunsetOrange} />
              <rect x="68" y="98" width="104" height="4" fill={creamBg} />
              <rect x="74" y="108" width="92" height="4" fill={creamBg} />
              <rect x="84" y="118" width="72" height="4" fill={creamBg} />
              <rect x="98" y="128" width="44" height="4" fill={creamBg} />
            </g>

            {/* Desert Mountains Left & Right */}
            <path
              d="M12 110 L44 102 L54 118 L78 126 L104 136 L12 136 Z"
              fill={teal}
            />
            <path
              d="M228 110 L196 102 L186 118 L162 126 L136 136 L228 136 Z"
              fill={teal}
            />

            {/* Saguaro Cacti Silhouettes */}
            <g stroke={teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Left Cacti */}
              <path d="M36 96 V116 M30 104 H36 M30 100 V104 M42 108 H36 M42 104 V108" />
              {/* Right Cacti */}
              <path d="M204 96 V116 M198 104 H204 M198 100 V104 M210 108 H204 M210 104 V108" />
            </g>

            {/* Vintage Airliner (Facing Forward) */}
            <g>
              {/* Wings */}
              <path
                d="M120 80 L28 88 L28 98 L112 94 L120 94 L128 94 L212 98 L212 88 Z"
                fill={teal}
              />
              {/* Jet Turbines Left & Right with cream center intake */}
              <rect x="62" y="92" width="16" height="20" rx="8" fill={teal} stroke={creamLight} strokeWidth="2.5" />
              <circle cx="70" cy="102" r="3.5" fill={creamBg} />
              <rect x="162" y="92" width="16" height="20" rx="8" fill={teal} stroke={creamLight} strokeWidth="2.5" />
              <circle cx="170" cy="102" r="3.5" fill={creamBg} />

              {/* Fuselage Body */}
              <path
                d="M120 40 C108 40 102 54 102 88 C102 112 108 134 120 134 C132 134 138 112 138 88 C138 54 132 40 120 40 Z"
                fill={teal}
              />
              {/* Cockpit Windshield Windows */}
              <path
                d="M110 56 C110 52 114 50 120 50 C126 50 130 52 130 56 L127 63 H113 Z"
                fill={creamLight}
              />
              <line x1="120" y1="50" x2="120" y2="63" stroke={teal} strokeWidth="2" />
              <line x1="115" y1="53" x2="115" y2="63" stroke={teal} strokeWidth="1.5" />
              <line x1="125" y1="53" x2="125" y2="63" stroke={teal} strokeWidth="1.5" />

              {/* Horizontal Tail Stabilizers */}
              <path
                d="M120 114 L94 124 V128 L120 126 L146 128 V124 Z"
                fill={teal}
              />
            </g>

            {/* Lower Half: Stars & Serif 'T' */}
            <g>
              {/* Left Star */}
              <polygon
                points="72,192 76,204 88,204 78,212 82,224 72,216 62,224 66,212 56,204 68,204"
                fill={sunsetOrange}
              />
              {/* Right Star */}
              <polygon
                points="168,192 172,204 184,204 174,212 178,224 168,216 158,224 162,212 152,204 164,204"
                fill={sunsetOrange}
              />
              {/* Centered 'T' */}
              <text
                x="120"
                y="222"
                textAnchor="middle"
                fontFamily="'Times New Roman', Times, serif"
                fontWeight="900"
                fontSize="42"
                fill={teal}
              >
                T
              </text>
            </g>
          </g>

          {/* ── 3. HORIZONTAL BANNER: TRIPKARIO.COM ── */}
          <g>
            {/* Banner Winged Ribbon Background */}
            <path
              d="M4 140 H236 C238 140 240 143 238 147 L226 174 C225 177 222 179 219 179 H21 C18 179 15 177 14 174 L2 147 C0 143 2 140 4 140 Z"
              fill={creamBg}
              stroke={teal}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Inner Gold/Cream Accent Line */}
            <path
              d="M12 145 H228 L218 172 H22 Z"
              fill="none"
              stroke={creamLight}
              strokeWidth="1.5"
            />
            {/* TRIPKARIO.COM Text in Heavy Condensed Font with 3D Offset */}
            <text
              x="121"
              y="169"
              textAnchor="middle"
              fontFamily="Impact, 'Arial Black', sans-serif"
              fontWeight="900"
              fontSize="27"
              letterSpacing="2.5"
              fill="rgba(27,73,71,0.25)"
            >
              TRIPKARIO.COM
            </text>
            <text
              x="120"
              y="168"
              textAnchor="middle"
              fontFamily="Impact, 'Arial Black', sans-serif"
              fontWeight="900"
              fontSize="27"
              letterSpacing="2.5"
              fill={teal}
            >
              TRIPKARIO.COM
            </text>
          </g>
        </svg>
      </div>

      {/* ── Wordmark Typography Lockup ── */}
      {showWordmark && variant !== 'badge-only' && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-serif font-bold text-xl sm:text-2xl tracking-tight transition-colors ${
              textColor
                ? textColor
                : isWhiteText
                ? 'text-white'
                : 'text-[var(--text-primary)]'
            }`}
          >
            TripKario
          </span>
          <span
            className={`text-[9px] font-mono tracking-[0.2em] uppercase mt-0.5 ${
              isWhiteText
                ? 'text-white/75'
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
