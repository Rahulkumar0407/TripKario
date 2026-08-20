'use client';

import React, { useState } from 'react';
import { initialWhatsAppSettings, SeedWhatsAppSettings } from '@/lib/admin/seedData';
import { MessageSquare, Phone, Check, ExternalLink, Sparkles } from 'lucide-react';

export default function AdminWhatsAppPage() {
  const [settings, setSettings] = useState<SeedWhatsAppSettings>(initialWhatsAppSettings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const testLink = `https://wa.me/${settings.businessPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    settings.defaultMessage
  )}`;

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            INSTANT CONCIERGE CHANNEL
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            WhatsApp Concierge Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Configure the direct WhatsApp button and initial automated greetings.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md cursor-pointer"
        >
          {isSaved ? <Check className="w-4 h-4 text-[#D4A467]" /> : null}
          <span>{isSaved ? 'Settings Saved!' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Settings Form Card */}
      <div className="max-w-2xl bg-white dark:bg-[#14120F] rounded-3xl border border-[#E5DFD5] dark:border-[#262420] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-[#8C8479] uppercase block mb-1 font-bold">
              Business WhatsApp Number (with country code)
            </label>
            <input
              type="text"
              value={settings.businessPhone}
              onChange={(e) => setSettings({ ...settings, businessPhone: e.target.value })}
              className="w-full p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm font-bold outline-none focus:border-[#C85D3A]"
            />
          </div>

          <div>
            <label className="text-[#8C8479] uppercase block mb-1 font-bold">
              Default Customer Greeting Message
            </label>
            <textarea
              rows={3}
              value={settings.defaultMessage}
              onChange={(e) => setSettings({ ...settings, defaultMessage: e.target.value })}
              className="w-full p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs leading-relaxed outline-none focus:border-[#C85D3A]"
            />
          </div>

          <div>
            <label className="text-[#8C8479] uppercase block mb-1 font-bold">
              Chatbot Handoff Prompt Text
            </label>
            <input
              type="text"
              value={settings.handoffPrompt}
              onChange={(e) => setSettings({ ...settings, handoffPrompt: e.target.value })}
              className="w-full p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs outline-none focus:border-[#C85D3A]"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#262420]">
            <div>
              <span className="font-bold text-sm text-[#171512] dark:text-white block">
                Floating WhatsApp Pill on Website
              </span>
              <span className="text-[11px] text-[#8C8479]">
                Shows a subtle floating WhatsApp concierge at the bottom right corner.
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setSettings({ ...settings, isFloatingEnabled: !settings.isFloatingEnabled })
              }
              className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-colors ${
                settings.isFloatingEnabled
                  ? 'bg-[#25D366] text-white'
                  : 'bg-black/10 text-[#8C8479]'
              }`}
            >
              {settings.isFloatingEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Test WhatsApp Button */}
        <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between">
          <span className="text-xs font-mono text-[#8C8479]">
            Verify your click-to-chat setup:
          </span>

          <a
            href={testLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold uppercase flex items-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Test WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
