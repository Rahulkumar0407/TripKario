'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, RotateCcw, Compass, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  destinations?: string[];
  whatsappPrompt?: string;
}

export default function TravelChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'bot',
      text: 'Hi. Where are we going? Robot hoon, par travel advice decent hai.',
    },
  ]);

  const quickOptions = [
    {
      q: 'I want a honeymoon',
      a: 'Shaadi ka pressure khatam, ab honeymoon ka plan karo. Our Kashmir Houseboat & Pahalgam Pine Valley or Kerala Backwaters are top rated.',
      dests: ['Kashmir', 'Kerala'],
      prompt: 'Hi TripKario! I am looking for honeymoon packages.',
    },
    {
      q: 'I have ₹20K',
      a: 'Perfect. We have a few options that won’t require selling your kidney. Rajasthan heritage circuit or Himachal mountain breaks are ideal.',
      dests: ['Rajasthan', 'Himachal'],
      prompt: 'Hi TripKario! I have a budget of around ₹20,000 per person. Please share matching itineraries.',
    },
    {
      q: 'Show me weekend trips',
      a: 'Weekend aa gaya. Ab bahana kya hai? Check out our 3–4 day escapes to Shimla, Jaipur, or South Goa.',
      dests: ['Himachal', 'Rajasthan', 'Goa'],
      prompt: 'Hi TripKario! Please share quick weekend getaway options.',
    },
    {
      q: 'I want Kashmir',
      a: 'Signature Dal Lake houseboats, Gondola Phase II in Gulmarg, and quiet walks along Lidder river in Pahalgam.',
      dests: ['Kashmir'],
      prompt: 'Hi TripKario! I want to explore the Kashmir itinerary.',
    },
    {
      q: 'Help me choose',
      a: 'Abhi kahin decide nahi kiya? Fair enough. Tell us who is travelling and what vibe you want, and we will build around it.',
      dests: ['Custom Route'],
      prompt: 'Hi TripKario! I need advice picking a destination.',
    },
  ];

  const handleAsk = (item: typeof quickOptions[0]) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: item.q,
    };
    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: item.a,
      destinations: item.dests,
      whatsappPrompt: item.prompt,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'msg-0',
        sender: 'bot',
        text: 'Hi. Where are we going? Robot hoon, par travel advice decent hai.',
      },
    ]);
  };

  return (
    <>
      {/* Floating Concierge Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="TripKario Concierge"
          className="flex items-center gap-2.5 h-11 px-4 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <Compass className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Concierge
          </span>
        </button>
      </div>

      {/* Concierge Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-50 w-[92vw] sm:w-[390px] max-h-[540px] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-2xl shadow-2xl border border-[var(--border-card)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--bg-surface-2)] border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-serif font-medium text-[var(--text-primary)]">
                  TripKario Concierge
                </h3>
                <p className="text-[10.5px] font-mono text-[var(--text-muted)]">
                  Where are we going?
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-1.5 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-[var(--bg-primary)]/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[var(--accent)] text-white rounded-br-none'
                        : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.destinations && (
                      <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {msg.destinations.map((d) => (
                            <span key={d} className="px-2 py-0.5 rounded bg-[var(--bg-surface-2)] text-[10px] font-mono text-[var(--accent)] font-semibold">
                              {d}
                            </span>
                          ))}
                        </div>

                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => openWhatsApp(msg.whatsappPrompt || 'Hi TripKario! I would like to plan a trip.')}
                          className="w-full justify-center gap-1.5 mt-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Talk on WhatsApp →</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Options */}
            <div className="p-3 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1.5 font-semibold">
                Quick Options:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto no-scrollbar">
                {quickOptions.map((item) => (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => handleAsk(item)}
                    className="text-left px-2.5 py-1 rounded-full text-xs bg-[var(--bg-surface-2)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all cursor-pointer"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
