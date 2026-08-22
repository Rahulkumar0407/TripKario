'use client';

import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Check,
  Save,
  RotateCcw,
  Sparkles,
  Heart,
  Eye,
  EyeOff,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface SiteSettingsState {
  signatureEnabled: boolean;
  signatureName: string;
  signaturePrefix: string;
}

const DEFAULT_SETTINGS: SiteSettingsState = {
  signatureEnabled: true,
  signatureName: 'Yashi',
  signaturePrefix: 'with love,',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsState>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Load existing settings on mount
  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);

      // Check local cache first for instant populate
      try {
        const local = localStorage.getItem('tripkario_site_settings');
        if (local) {
          const parsed = JSON.parse(local);
          setSettings((prev) => ({
            ...prev,
            signatureEnabled: parsed.signatureEnabled !== undefined ? parsed.signatureEnabled : prev.signatureEnabled,
            signatureName: parsed.signatureName || prev.signatureName,
            signaturePrefix: parsed.signaturePrefix || prev.signaturePrefix,
          }));
        }
      } catch (e) {
        // Ignore JSON error
      }

      // Fetch authoritative settings from backend
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.settings) {
            setSettings({
              signatureEnabled: data.settings.signatureEnabled !== undefined ? data.settings.signatureEnabled : true,
              signatureName: data.settings.signatureName || 'Yashi',
              signaturePrefix: data.settings.signaturePrefix || 'with love,',
            });
            try {
              localStorage.setItem('tripkario_site_settings', JSON.stringify(data.settings));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn('Could not query /api/admin/settings:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaveStatus('saving');
    setStatusMessage('');

    try {
      // 1. Sync to local storage & broadcast event immediately
      try {
        localStorage.setItem('tripkario_site_settings', JSON.stringify(settings));
        window.dispatchEvent(new CustomEvent('tripkario-settings-updated', { detail: settings }));
      } catch (e) {}

      // 2. Persist to backend server API
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setStatusMessage('Brand signature settings saved and active across the landing page!');
        setTimeout(() => setSaveStatus('idle'), 3500);
      } else {
        setSaveStatus('saved'); // Still saved to local cache
        setStatusMessage('Settings updated locally and in browser cache.');
        setTimeout(() => setSaveStatus('idle'), 3500);
      }
    } catch (err) {
      console.warn('Error persisting settings to server:', err);
      setSaveStatus('saved'); // Local cache works
      setStatusMessage('Settings updated in local session.');
      setTimeout(() => setSaveStatus('idle'), 3500);
    }
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const namePresets = ['Yashi', 'Yashi & Team', 'TripKario Curators', 'Founder & Team'];
  const prefixPresets = ['with love,', 'crafted with love,', 'warmly,', 'always,'];

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD5] dark:border-[#262420] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#C85D3A]/10 text-[#C85D3A]">
              <Sliders className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#8C8479]">
              Configuration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171512] dark:text-[#F5EFE6]">
            Brand & Site Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] mt-1">
            Manage dynamic brand signatures, editorial controls, and landing page visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#171512] dark:text-white bg-[#EFE9DF] dark:bg-white/5 hover:bg-[#E5DFD5] dark:hover:bg-white/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#C85D3A]" />
            <span>Preview Landing Page</span>
            <ExternalLink className="w-3 h-3 text-[#8C8479]" />
          </Link>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saveStatus === 'saving'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-[#C85D3A]/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {saveStatus === 'saving' ? (
              <span className="animate-spin text-sm">⏳</span>
            ) : saveStatus === 'saved' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Settings Card: Brand Signature */}
      <div className="bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
        {/* Card Header & Toggle Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD5] dark:border-[#262420]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#E46B3B]" />
              <h2 className="text-lg font-serif font-bold text-[#171512] dark:text-[#F5EFE6]">
                Personal Brand Signature
              </h2>
            </div>
            <p className="text-xs text-[#6D665E] dark:text-[#8C8479] max-w-xl">
              Controls the editorial <span className="font-mono text-[#C85D3A] font-semibold">{settings.signaturePrefix} {settings.signatureName || 'Yashi'}</span> branding displayed below the Hero caption and at the bottom of the Final Cinematic CTA.
            </p>
          </div>

          {/* ON / OFF Toggle Switch */}
          <div className="flex items-center gap-3 bg-[#FAF7F2] dark:bg-[#1C1916] p-2 rounded-2xl border border-[#E5DFD5] dark:border-[#2C2824] select-none">
            <div className="text-right">
              <span className="block text-xs font-bold text-[#171512] dark:text-[#F5EFE6]">
                {settings.signatureEnabled ? 'Signature Active' : 'Signature Disabled'}
              </span>
              <span className="block text-[10px] font-mono text-[#8C8479]">
                {settings.signatureEnabled ? 'Visible on Landing Page' : 'Hidden everywhere'}
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.signatureEnabled}
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  signatureEnabled: !prev.signatureEnabled,
                }))
              }
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C85D3A] ${
                settings.signatureEnabled ? 'bg-[#C85D3A]' : 'bg-[#D5CEC2] dark:bg-[#38332C]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out flex items-center justify-center ${
                  settings.signatureEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                {settings.signatureEnabled ? (
                  <Eye className="w-3.5 h-3.5 text-[#C85D3A]" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-[#8C8479]" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Inputs Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Signature Name Input */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#6D665E] dark:text-[#B8B0A4]">
              Signature Name <span className="text-[#C85D3A]">*</span>
            </label>
            <input
              type="text"
              value={settings.signatureName}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, signatureName: e.target.value }))
              }
              placeholder="e.g. Yashi"
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-sm text-[#171512] dark:text-[#F5EFE6] placeholder-[#8C8479] focus:outline-none focus:border-[#C85D3A] transition-colors"
            />

            {/* Quick Presets */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#8C8479] mr-1">Presets:</span>
              {namePresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSettings((prev) => ({ ...prev, signatureName: preset }))}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    settings.signatureName === preset
                      ? 'bg-[#C85D3A]/15 border-[#C85D3A] text-[#C85D3A] font-semibold'
                      : 'bg-black/5 dark:bg-white/5 border-transparent text-[#6D665E] dark:text-[#8C8479] hover:text-[#171512] dark:hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Signature Prefix Input */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#6D665E] dark:text-[#B8B0A4]">
              Signature Prefix
            </label>
            <input
              type="text"
              value={settings.signaturePrefix}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, signaturePrefix: e.target.value }))
              }
              placeholder="e.g. with love,"
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-sm text-[#171512] dark:text-[#F5EFE6] placeholder-[#8C8479] focus:outline-none focus:border-[#C85D3A] transition-colors"
            />

            {/* Quick Presets */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#8C8479] mr-1">Presets:</span>
              {prefixPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSettings((prev) => ({ ...prev, signaturePrefix: preset }))}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    settings.signaturePrefix === preset
                      ? 'bg-[#C85D3A]/15 border-[#C85D3A] text-[#C85D3A] font-semibold'
                      : 'bg-black/5 dark:bg-white/5 border-transparent text-[#6D665E] dark:text-[#8C8479] hover:text-[#171512] dark:hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Visual Previews Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#8C8479] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C85D3A]" />
              Live Interactive Previews
            </span>
            <span className="text-[11px] font-mono text-[#8C8479]">
              Updates automatically as you type
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Preview 01: Hero Section Presentation */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1814] to-[#0D0B0A] border border-white/10 p-6 text-white space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#D4A467] uppercase">
                <span>01. Hero Section Showcase</span>
                {settings.signatureEnabled ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live ON
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    Hidden OFF
                  </span>
                )}
              </div>

              <div className="py-2">
                <p className="text-xs text-white/60 font-light italic mb-2">
                  &ldquo;Planning a trip shouldn&apos;t require 47 WhatsApp messages.&rdquo;
                </p>

                {settings.signatureEnabled ? (
                  <div className="flex items-baseline gap-1.5 select-none animate-fadeIn">
                    <span className="text-xs font-mono font-normal tracking-wide text-white/60">
                      {settings.signaturePrefix || 'with love,'}
                    </span>
                    <span className="text-base font-serif font-normal text-[#F4A261] tracking-normal">
                      {settings.signatureName || 'Yashi'}
                    </span>
                  </div>
                ) : (
                  <div className="py-2 px-3 rounded-xl bg-white/5 border border-dashed border-white/10 text-white/40 text-xs font-mono italic">
                    [Signature component hidden from Hero]
                  </div>
                )}
              </div>

              <p className="text-[10px] font-mono text-white/30">
                Rendered directly beneath the slide headline & caption.
              </p>
            </div>

            {/* Preview 02: Final Cinematic CTA Presentation */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12100E] to-[#080706] border border-white/10 p-6 text-white space-y-3 text-center">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#E46B3B] uppercase text-left">
                <span>02. Final CTA Section</span>
                {settings.signatureEnabled ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live ON
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    Hidden OFF
                  </span>
                )}
              </div>

              <div className="py-2 flex flex-col items-center justify-center">
                {settings.signatureEnabled ? (
                  <div className="space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#E46B3B] to-[#E46B3B]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E46B3B]" />
                    </div>

                    <div className="inline-flex items-baseline gap-1.5">
                      <span className="text-xs font-mono font-normal tracking-wide text-white/60">
                        {settings.signaturePrefix || 'with love,'}
                      </span>
                      <span className="text-base font-serif font-normal text-[#F4A261]">
                        {settings.signatureName || 'Yashi'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 px-3 rounded-xl bg-white/5 border border-dashed border-white/10 text-white/40 text-xs font-mono italic">
                    [Signature component hidden from Final CTA]
                  </div>
                )}
              </div>

              <p className="text-[10px] font-mono text-white/30 text-center">
                Rendered at the footer of the final journey departure banner.
              </p>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-[#6D665E] dark:text-[#8C8479] hover:text-[#171512] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default (with love, Yashi)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saveStatus === 'saving'}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-[#C85D3A]/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {saveStatus === 'saving' ? (
              <span className="animate-spin text-sm">⏳</span>
            ) : saveStatus === 'saved' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved Successfully' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
