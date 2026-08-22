'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function BrandSignatureToggleWidget() {
  const [enabled, setEnabled] = useState(true);
  const [name, setName] = useState('Yashi');
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync state from local cache or storage event
  useEffect(() => {
    function loadFromCache() {
      try {
        const stored = localStorage.getItem('tripkario_site_settings');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.signatureEnabled !== undefined) {
            setEnabled(Boolean(parsed.signatureEnabled));
          }
          if (parsed.signatureName) {
            setName(parsed.signatureName);
          }
        }
      } catch (e) {}
    }

    loadFromCache();

    // Fetch initial server state
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.settings) {
          if (data.settings.signatureEnabled !== undefined) {
            setEnabled(Boolean(data.settings.signatureEnabled));
          }
          if (data.settings.signatureName) {
            setName(data.settings.signatureName);
          }
        }
      })
      .catch(() => {});

    const handleUpdate = () => loadFromCache();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('tripkario-settings-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('tripkario-settings-updated', handleUpdate);
    };
  }, []);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !enabled;
    setEnabled(nextState);
    setIsUpdating(true);

    try {
      const currentStored = (() => {
        try {
          return JSON.parse(localStorage.getItem('tripkario_site_settings') || '{}');
        } catch {
          return {};
        }
      })();

      const updated = {
        ...currentStored,
        signatureEnabled: nextState,
        signatureName: name || 'Yashi',
      };

      // 1. Immediately update localStorage & dispatch cross-tab/local events
      localStorage.setItem('tripkario_site_settings', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('tripkario-settings-updated', { detail: updated }));

      // 2. Persist to API
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: updated }),
      });
    } catch (err) {
      console.warn('Failed to toggle brand signature:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs">
      <Link
        href="/adminconsole1811/settings"
        title="Click to customize Brand Signature in Settings"
        className="flex items-center gap-1.5 text-[11px] font-mono text-[#6D665E] dark:text-[#B8B0A4] hover:text-[#C85D3A] transition-colors"
      >
        <span>Signature:</span>
        <span className="font-serif font-bold text-[#C85D3A] dark:text-[#F4A261]">{name}</span>
      </Link>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Toggle with love, Yashi name visibility on landing page"
        onClick={handleToggle}
        disabled={isUpdating}
        title={enabled ? "Signature is visible on landing page (Click to hide)" : "Signature is hidden from landing page (Click to show)"}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? 'bg-[#C85D3A]' : 'bg-[#C5BEB2] dark:bg-[#3D3832]'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
            enabled ? 'translate-x-4' : 'translate-x-0'
          }`}
        >
          {enabled ? (
            <Eye className="w-2.5 h-2.5 text-[#C85D3A]" />
          ) : (
            <EyeOff className="w-2.5 h-2.5 text-[#8C8479]" />
          )}
        </span>
      </button>
    </div>
  );
}
