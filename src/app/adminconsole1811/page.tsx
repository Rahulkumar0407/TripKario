'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdminAuth } from '@/lib/admin/auth';
import { initialTrips, initialTeamMembers, initialPastVisits, initialMediaLibrary } from '@/lib/admin/seedData';
import {
  Compass,
  Users,
  ImageIcon,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Plus,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickActions = [
    {
      title: 'Trips & Pricing',
      desc: 'Update trip prices, details, and cover photos.',
      href: '/adminconsole1811/trips',
      icon: Compass,
      primary: true,
      actionText: 'Manage Trips',
    },
    {
      title: 'Itineraries & Photos',
      desc: 'Update day-by-day itineraries and day photos.',
      href: '/adminconsole1811/trips?tab=itineraries',
      icon: Sparkles,
      actionText: 'Edit Itineraries',
    },
    {
      title: 'Team Members',
      desc: 'Add, edit, or update team member photos and bios.',
      href: '/adminconsole1811/team',
      icon: Users,
      actionText: 'Manage Team',
    },
    {
      title: 'Past Visit Photos',
      desc: 'Manage photo galleries from completed trips.',
      href: '/adminconsole1811/past-visits',
      icon: BookOpen,
      actionText: 'View Visits',
    },
    {
      title: 'Photo Library',
      desc: 'Upload new photos and browse existing images.',
      href: '/adminconsole1811/media',
      icon: ImageIcon,
      actionText: 'Browse Photos',
    },
  ];

  const stats = [
    { label: 'Active Trips', value: String(initialTrips.length).padStart(2, '0'), detail: 'Published circuits', icon: Compass, href: '/adminconsole1811/trips' },
    { label: 'Team Members', value: String(initialTeamMembers.length).padStart(2, '0'), detail: 'Active specialists', icon: Users, href: '/adminconsole1811/team' },
    { label: 'Past Visits', value: String(initialPastVisits.length).padStart(2, '0'), detail: 'Photo galleries', icon: BookOpen, href: '/adminconsole1811/past-visits' },
    { label: 'Media Photos', value: String(initialMediaLibrary.length).padStart(2, '0'), detail: 'Ready for use', icon: ImageIcon, href: '/adminconsole1811/media' },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 01. Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            TRIPKARIO OVERVIEW
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-1">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Rahul'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal mt-1">
            Quickly manage your trips, itineraries, prices, photos, and team members.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1916] hover:bg-[#F4EFE7] dark:hover:bg-white/10 text-xs font-bold text-[#171512] dark:text-white border border-[#E5DFD5] dark:border-white/10 shadow-sm transition-all"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C85D3A]" />
          </Link>
        </div>
      </div>

      {/* 02. Simple Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white dark:bg-[#14120F] rounded-2xl p-5 border border-[#E5DFD5] dark:border-[#262420] shadow-sm hover:border-[#C85D3A]/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#6D665E] dark:text-[#8C8479] uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
                <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-[#C85D3A] group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#171512] dark:text-white tracking-tight font-mono block">
                  {stat.value}
                </span>
                <span className="text-[11px] font-mono text-[#174E48] dark:text-[#D4A467] font-semibold block mt-0.5">
                  {stat.detail} →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 03. Big Clear Quick Actions */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#8C8479] font-bold">
          Quick Actions
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className={`p-4 rounded-2xl border transition-all duration-200 group flex flex-col justify-between ${
                  action.primary
                    ? 'bg-[#C85D3A] hover:bg-[#B54F2E] text-white border-[#C85D3A] shadow-lg shadow-[#C85D3A]/20'
                    : 'bg-white dark:bg-[#14120F] hover:bg-[#FDFBF7] dark:hover:bg-[#1C1916] text-[#171512] dark:text-white border-[#E5DFD5] dark:border-[#262420] shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      action.primary
                        ? 'bg-white/20 text-white'
                        : 'bg-[#F4EFE7] dark:bg-white/5 text-[#C85D3A] group-hover:scale-105 transition-transform'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight leading-none block">
                      {action.title}
                    </h3>
                    <p
                      className={`text-[11px] font-normal leading-relaxed mt-1 line-clamp-2 ${
                        action.primary ? 'text-white/90' : 'text-[#6D665E] dark:text-[#8C8479]'
                      }`}
                    >
                      {action.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="font-semibold">{action.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 04. Current Published Trips List with Quick Edit */}
      <div className="bg-white dark:bg-[#14120F] rounded-3xl p-6 sm:p-7 border border-[#E5DFD5] dark:border-[#262420] shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#171512] dark:text-white tracking-tight">
              Curated Trips
            </h2>
            <p className="text-xs text-[#6D665E] dark:text-[#8C8479]">
              Manage pricing, trip overview, and day-by-day photo itineraries
            </p>
          </div>

          <Link
            href="/adminconsole1811/trips"
            className="text-xs font-mono text-[#C85D3A] hover:underline font-bold"
          >
            Manage All Trips →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialTrips.slice(0, 3).map((trip) => (
            <div
              key={trip.slug}
              className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1815] border border-[#E5DFD5] dark:border-white/5 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black/10 shrink-0">
                  <Image
                    src={trip.coverImageUrl}
                    alt={trip.title}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#C85D3A] uppercase font-bold block">
                    {trip.destinationName}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#171512] dark:text-white truncate">
                    {trip.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#6D665E] dark:text-[#8C8479] block">
                    {trip.durationNights} Nights · {trip.durationDays} Days
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-[#8C8479] uppercase block">Price</span>
                  <span className="text-xs sm:text-sm font-bold text-[#174E48] dark:text-[#D4A467] font-mono">
                    ₹{trip.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                </div>

                <Link
                  href="/adminconsole1811/trips"
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#14120F] hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 05. Security / Fast Shortcut */}
      <div className="bg-[#FAF7F2] dark:bg-[#14120F] rounded-2xl p-4 border border-[#E5DFD5] dark:border-[#262420] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#174E48]/10 text-[#174E48] dark:text-[#D4A467]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-[#171512] dark:text-white block">
              Admin Security & Password
            </span>
            <span className="text-[#6D665E] dark:text-[#8C8479]">
              Need to change your admin password? You can update credentials anytime.
            </span>
          </div>
        </div>

        <Link
          href="/adminconsole1811/settings/security"
          className="px-4 py-2 rounded-xl bg-white dark:bg-[#1C1916] text-[#171512] dark:text-white font-mono font-bold hover:bg-[#C85D3A] hover:text-white border border-[#E5DFD5] dark:border-white/10 transition-colors shrink-0"
        >
          Security Settings
        </Link>
      </div>
    </div>
  );
}
