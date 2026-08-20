'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/lib/admin/auth';
import {
  Menu,
  Plus,
  Search,
  ExternalLink,
  Compass,
  MapPin,
  Image as ImageIcon,
  MessageSquareQuote,
  Users,
  Bell,
} from 'lucide-react';

interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
}

export default function AdminHeader({ onToggleMobileMenu }: AdminHeaderProps) {
  const { user } = useAdminAuth();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const quickActions = [
    { label: 'Add a Trip', href: '/adminconsole1811/trips/new', icon: Compass },
    { label: 'Add Destination', href: '/adminconsole1811/destinations/new', icon: MapPin },
    { label: 'Upload Photos', href: '/adminconsole1811/media?upload=true', icon: ImageIcon },
    { label: 'Add Testimonial', href: '/adminconsole1811/testimonials/new', icon: MessageSquareQuote },
    { label: 'Add Team Member', href: '/adminconsole1811/team/new', icon: Users },
  ];

  return (
    <header className="h-16 bg-white dark:bg-[#14120F] border-b border-[#E5DFD5] dark:border-[#262420] px-4 sm:px-6 lg:px-8 flex items-center justify-between z-20 transition-colors duration-200">
      {/* Left: Mobile Menu Toggle & Global Context */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl text-[#6D665E] dark:text-[#B8B0A4] hover:bg-black/5 dark:hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#6D665E] dark:text-[#8C8479]">
          <span className="w-2 h-2 rounded-full bg-[#174E48] dark:bg-[#1E5A53]" />
          <span>TripKario Production Console</span>
        </div>
      </div>

      {/* Right Actions: Quick Add Dropdown, View Website, Notifications */}
      <div className="flex items-center gap-3 sm:gap-4">
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
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1C1916] rounded-2xl shadow-xl border border-[#E5DFD5] dark:border-[#2C2824] p-1.5 z-40 space-y-1">
                <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#8C8479] uppercase block font-semibold">
                  Create New
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
