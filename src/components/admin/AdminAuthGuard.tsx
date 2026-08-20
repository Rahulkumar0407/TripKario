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

  // If not logged in, render the login page directly (or login view)
  if (!user && pathname !== '/adminconsole1811/login') {
    return <AdminLoginPage />;
  }

  return <>{children}</>;
}
