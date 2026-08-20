'use client';

import React from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/lib/admin/auth';
import { initialEnquiries, initialMediaLibrary } from '@/lib/admin/seedData';
import {
  Compass,
  MapPin,
  Image as ImageIcon,
  Inbox,
  Users,
  MessageSquareQuote,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
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
      title: 'Add a Trip',
      desc: 'Create a new curated package with day-by-day itinerary and photos.',
      href: '/adminconsole1811/trips/new',
      icon: Compass,
      primary: true,
    },
    {
      title: 'Add Destination',
      desc: 'Publish a new travel territory with highlights and photos.',
      href: '/adminconsole1811/destinations/new',
      icon: MapPin,
    },
    {
      title: 'Upload Photos',
      desc: 'Add high-res travel photography directly to Media Library.',
      href: '/adminconsole1811/media?upload=true',
      icon: ImageIcon,
    },
    {
      title: 'View Enquiries',
      desc: 'Review incoming customer leads and chat on WhatsApp.',
      href: '/adminconsole1811/enquiries',
      icon: Inbox,
    },
    {
      title: 'Add Team Member',
      desc: 'Introduce a new human concierge or local guide on the website.',
      href: '/adminconsole1811/team/new',
      icon: Users,
    },
  ];

  const stats = [
    { label: 'New Enquiries', value: '03', detail: '2 need reply today', icon: Inbox, color: '#C85D3A' },
    { label: 'Active Trips', value: '06', detail: 'Published on homepage', icon: Compass, color: '#174E48' },
    { label: 'Destinations', value: '06', detail: 'Covering 5 territories', icon: MapPin, color: '#D4A467' },
    { label: 'Website Photos', value: String(initialMediaLibrary.length).padStart(2, '0'), detail: 'Optimized via ImageKit', icon: ImageIcon, color: '#174E48' },
  ];

  const recentActivity = [
    { action: 'Updated Kashmir Dal Lake Itinerary', time: '15 mins ago', type: 'trip' },
    { action: 'Uploaded 4 new Munnar travel photographs', time: '1 hour ago', type: 'media' },
    { action: 'New enquiry received from Aarav Sharma (Kashmir)', time: '2 hours ago', type: 'enquiry' },
    { action: 'Published 5-star Google review by Abhishek Goswami', time: 'Yesterday', type: 'testimonial' },
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
            Here is what is happening across your travel website today.
          </p>
        </div>

        <div className="flex items-center gap-2">
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

      {/* 02. Big Obvious Quick Actions for Non-Technical Admin */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#8C8479] font-bold">
          Quick Business Actions
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
                  <span className="font-semibold">Start</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 03. Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#14120F] rounded-2xl p-5 border border-[#E5DFD5] dark:border-[#262420] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#6D665E] dark:text-[#8C8479] uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
                <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-[#C85D3A]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#171512] dark:text-white tracking-tight font-mono block">
                  {stat.value}
                </span>
                <span className="text-[11px] font-mono text-[#174E48] dark:text-[#D4A467] font-semibold block mt-0.5">
                  {stat.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 04. Two-Column Dashboard Content: Recent Enquiries + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Enquiries (approx 7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#14120F] rounded-3xl p-6 sm:p-7 border border-[#E5DFD5] dark:border-[#262420] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#171512] dark:text-white tracking-tight">
                Recent Customer Enquiries
              </h2>
              <p className="text-xs text-[#6D665E] dark:text-[#8C8479]">
                Direct trip planning requests from website visitors
              </p>
            </div>

            <Link
              href="/adminconsole1811/enquiries"
              className="text-xs font-mono text-[#C85D3A] hover:underline font-bold"
            >
              View All ({initialEnquiries.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {initialEnquiries.map((enq) => {
              const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
              const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Hi ${enq.customerName}, this is TripKario concierge following up on your ${enq.destination} trip enquiry.`
              )}`;

              return (
                <div
                  key={enq.id}
                  className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1815] border border-[#E5DFD5] dark:border-white/5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#171512] dark:text-white">
                          {enq.customerName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#C85D3A]/15 text-[#C85D3A] border border-[#C85D3A]/30">
                          {enq.status}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#174E48] dark:text-[#D4A467] font-semibold block mt-0.5">
                        Interested in {enq.destination} · {enq.travellerCount}
                      </span>
                    </div>

                    {/* WhatsApp Action Button */}
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </Link>
                  </div>

                  <p className="text-xs text-[#171512]/80 dark:text-[#B8B0A4] line-clamp-2 leading-relaxed bg-white/70 dark:bg-black/20 p-2.5 rounded-xl border border-black/5 dark:border-white/5 font-normal">
                    &ldquo;{enq.message}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8479]">
                    <span>Source: {enq.source}</span>
                    <span>Dates: {enq.travelDates}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Activity & Management Shortcuts (approx 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Management Navigation */}
          <div className="bg-white dark:bg-[#14120F] rounded-3xl p-6 border border-[#E5DFD5] dark:border-[#262420] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#171512] dark:text-white uppercase tracking-wider font-mono">
              Website Management
            </h2>

            <div className="space-y-1">
              {[
                { title: 'Homepage Sections Manager', desc: 'Toggle & reorder page blocks', href: '/adminconsole1811/homepage' },
                { title: 'Media & Photo Library', desc: 'Upload & organize travel photos', href: '/adminconsole1811/media' },
                { title: 'Company Contact & Social Links', desc: 'Phone, email, WhatsApp, address', href: '/adminconsole1811/settings' },
                { title: 'Security & Change Password', desc: 'Update administrator credentials', href: '/adminconsole1811/settings/security' },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F2] dark:hover:bg-white/5 transition-colors group"
                >
                  <div>
                    <span className="text-xs font-bold text-[#171512] dark:text-white block group-hover:text-[#C85D3A] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#8C8479] block">
                      {item.desc}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8C8479] group-hover:text-[#C85D3A] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-white dark:bg-[#14120F] rounded-3xl p-6 border border-[#E5DFD5] dark:border-[#262420] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#171512] dark:text-white uppercase tracking-wider font-mono">
              Recent Activity
            </h2>

            <div className="space-y-3">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#174E48] dark:bg-[#D4A467] mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[#171512] dark:text-white font-medium block">
                      {act.action}
                    </span>
                    <span className="text-[10px] font-mono text-[#8C8479]">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
