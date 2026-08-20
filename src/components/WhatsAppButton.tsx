'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';
import { siteConfig } from '@/data/siteConfig';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    openWhatsApp(siteConfig.defaultWhatsAppMessage);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Talk to us on WhatsApp"
        className="flex items-center gap-2.5 h-11 px-3.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#25D366] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group backdrop-blur-md"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: hovered ? 'auto' : 0,
            opacity: hovered ? 1 : 0,
          }}
          className="text-xs font-mono font-medium whitespace-nowrap overflow-hidden hidden sm:flex items-center gap-1.5"
        >
          <span>WhatsApp Concierge</span>
          <span className="text-[10px] text-[var(--text-muted)]">· +91 99580 34778</span>
        </motion.div>
      </button>
    </div>
  );
}
