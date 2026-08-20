'use client';

import React, { useState } from 'react';
import { initialSiteSettings } from '@/lib/admin/seedData';
import TripkarioLogo from '@/components/TripkarioLogo';
import {
  Building2,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Globe,
  Share2,
  Camera,
  Video,
  Save,
  Check,
  Sparkles,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSiteSettings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            GLOBAL CONFIGURATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Site Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Manage company contact details, WhatsApp concierge number, social channels, and brand assets.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Settings Saved!' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 01. Company Information */}
        <div className="bg-white dark:bg-[#14120F] rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] dark:border-[#262420] shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
            <Building2 className="w-4 h-4 text-[#C85D3A]" />
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#171512] dark:text-white">
              Company Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-[#8C8479] uppercase block mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
              />
            </div>

            <div>
              <label className="text-[#8C8479] uppercase block mb-1">Support Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
              />
            </div>

            <div>
              <label className="text-[#8C8479] uppercase block mb-1">Support Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
              />
            </div>

            <div>
              <label className="text-[#8C8479] uppercase block mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[#8C8479] uppercase block mb-1">Office Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[#8C8479] uppercase block mb-1">Brand Statement / Meta Description</label>
              <textarea
                rows={2}
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
              />
            </div>
          </div>
        </div>

        {/* 02. Social Channels */}
        <div className="bg-white dark:bg-[#14120F] rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] dark:border-[#262420] shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
            <Globe className="w-4 h-4 text-[#174E48] dark:text-[#D4A467]" />
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#171512] dark:text-white">
              Social Media Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-[#8C8479] uppercase block mb-1">Instagram URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full p-3 pl-10 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                />
                <Camera className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[#8C8479] uppercase block mb-1">Facebook URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="w-full p-3 pl-10 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                />
                <Share2 className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[#8C8479] uppercase block mb-1">YouTube URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={settings.youtubeUrl}
                  onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                  className="w-full p-3 pl-10 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                />
                <Video className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[#8C8479] uppercase block mb-1">LinkedIn URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={settings.linkedinUrl}
                  onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                  className="w-full p-3 pl-10 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                />
                <Globe className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* 03. Brand Logo Asset */}
        <div className="bg-white dark:bg-[#14120F] rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] dark:border-[#262420] shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#171512] dark:text-white">
            Brand Logo & Assets
          </h2>
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824]">
            <div className="p-3 bg-white dark:bg-[#11100E] rounded-2xl shadow-sm border border-black/5 dark:border-white/10">
              <TripkarioLogo badgeSize={40} showWordmark={true} />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#171512] dark:text-white block">
                TripKario Master Vector Logo
              </span>
              <span className="text-[11px] font-mono text-[#8C8479] block">
                SVG format · Automatically renders on light & dark surfaces
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
