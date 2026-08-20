'use client';

import React, { useState } from 'react';
import { AdminAuthProvider } from '@/lib/admin/auth';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <AdminAuthProvider>
      <AdminAuthGuard>
        <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#0C0B0A] text-[#171512] dark:text-[#F5EFE6] flex transition-colors duration-200">
          {/* Desktop Persistent Sidebar */}
          <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-30">
            <AdminSidebar />
          </div>

          {/* Mobile Overlay Drawer Sidebar */}
          {isMobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              <div className="relative z-10 w-72 h-full">
                <AdminSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* Main Console Canvas */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <AdminHeader onToggleMobileMenu={() => setIsMobileSidebarOpen(true)} />
            <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
              {children}
            </main>
          </div>
        </div>
      </AdminAuthGuard>
    </AdminAuthProvider>
  );
}
