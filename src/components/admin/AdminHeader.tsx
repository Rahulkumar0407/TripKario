'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Plus, ExternalLink, Compass, Users, Image as ImageIcon } from 'lucide-react';
import ImageKitStorageWidget from '@/components/admin/ImageKitStorageWidget';
import ThemeToggle from '@/components/ThemeToggle';

interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
}

export default function AdminHeader({ onToggleMobileMenu }: AdminHeaderProps) {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const quickActions = [
    { label: 'Add Itinerary', href: '/adminconsole1811/trips', icon: Compass },
    { label: 'Add Team Member', href: '/adminconsole1811/team', icon: Users },
    { label: 'Add Photograph', href: '/adminconsole1811/gallery', icon: ImageIcon },
  ];

  return (
    <header className="h-16 bg-white dark:bg-[#14120F] border-b border-[#E5DFD5] dark:border-[#262420] px-4 sm:px-6 lg:px-8 flex items-center justify-between z-20 transition-colors duration-200">
      {/* Left: Mobile Menu Toggle & Global Context */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl text-[#6D665E] dark:text-[#B8B0A4] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#6D665E] dark:text-[#8C8479]">
          <span className="w-2 h-2 rounded-full bg-[#174E48] dark:bg-[#1E5A53]" />
          <span>TripKario Console</span>
        </div>
      </div>

      {/* Right Actions: Theme Toggle, Storage Monitor, Quick Add Dropdown, View Website */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        <ThemeToggle className="bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/15" />

        {/* ImageKit Storage Summary Widget */}
        <ImageKitStorageWidget variant="header" />
        {/* Quick Add Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold tracking-wider uppercase shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Add</span>
          </button>

          {isQuickAddOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsQuickAddOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1C1916] rounded-2xl shadow-xl border border-[#E5DFD5] dark:border-[#2C2824] p-1.5 z-40 space-y-1">
                <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#8C8479] uppercase block font-semibold">
                  Management
                </span>
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      href={action.href}
                      onClick={() => setIsQuickAddOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#171512] dark:text-[#F5EFE6] hover:bg-[#F4EFE7] dark:hover:bg-white/5 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#C85D3A]" />
                      <span>{action.label}</span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-[#171512] dark:text-white bg-[#F4EFE7] dark:bg-white/5 hover:bg-[#EBE4D8] dark:hover:bg-white/10 transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#C85D3A]" />
        </Link>
      </div>
    </header>
  );
}
