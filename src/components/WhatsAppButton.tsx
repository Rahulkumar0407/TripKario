'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    openWhatsApp('Hi TripKario! Human chahiye? Bilkul. I would like to talk to a travel specialist.');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Talk to a Travel Expert"
        className="flex items-center gap-2.5 h-11 px-3.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: hovered ? 'auto' : 0,
            opacity: hovered ? 1 : 0,
          }}
          className="text-xs font-medium whitespace-nowrap overflow-hidden hidden sm:flex items-center gap-1.5"
        >
          <span>Talk to a travel expert</span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">· Human help</span>
        </motion.div>
      </button>
    </div>
  );
}
