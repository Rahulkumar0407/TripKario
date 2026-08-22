'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/lib/admin/auth';
import AdminLoginPage from '@/app/adminconsole1811/login/page';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAdminAuth();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0E0C] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#C85D3A] border-t-transparent animate-spin" />
        <span className="text-xs font-mono tracking-widest uppercase text-[#D4A467]">
          Loading TripKario Console...
        </span>
      </div>
    );
  }

  const isAuthPage =
    pathname === '/adminconsole1811/login' ||
    pathname === '/adminconsole1811/update-password';

  // Auth pages (login, update-password) handle their own states
  if (isAuthPage) {
    return <>{children}</>;
  }

  // If not logged in on a protected admin page, render the login page
  if (!user) {
    return <AdminLoginPage />;
  }

  return <>{children}</>;
}
