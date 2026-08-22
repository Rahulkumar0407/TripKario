'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TripkarioLogo from '@/components/TripkarioLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { useAdminAuth } from '@/lib/admin/auth';
import { Compass, Users, Image as ImageIcon, ExternalLink, LogOut } from 'lucide-react';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const navItems = [
    { label: 'Trips', href: '/adminconsole1811/trips', icon: Compass },
    { label: 'Team', href: '/adminconsole1811/team', icon: Users },
    { label: 'Gallery', href: '/adminconsole1811/gallery', icon: ImageIcon },
  ];

  return (
    <aside className="w-72 bg-[#0F0E0C] text-[#EBE6DF] flex flex-col h-full border-r border-[#262420] select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#262420] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TripkarioLogo badgeSize={34} showWordmark={true} />
          <span className="px-2 py-0.5 rounded-md bg-[#C85D3A]/20 text-[#D4A467] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#C85D3A]/30">
            Console
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
        <span className="px-3 text-[10px] font-mono tracking-[0.2em] text-[#8C8479] uppercase font-semibold block mb-2">
          Management
        </span>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-[#C85D3A] text-white font-semibold shadow-md shadow-[#C85D3A]/25'
                  : 'text-[#B8B0A4] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-[#8C8479] group-hover:text-white'
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Profile & Public Site Action */}
      <div className="p-4 border-t border-[#262420] space-y-2 bg-[#14120F]">
        <ThemeToggle variant="sidebar" />

        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#D4A467]" />
        </Link>

        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-[#174E48] flex items-center justify-center font-bold text-xs text-[#D4A467] border border-white/10 shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate leading-none">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] font-mono text-[#8C8479] truncate block mt-0.5">
                {user?.email || 'admin@tripkario.com'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            title="Log Out"
            className="p-2 rounded-lg text-[#8C8479] hover:text-[#C85D3A] hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
