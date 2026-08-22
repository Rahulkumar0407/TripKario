'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Super Administrator' | 'Content Manager';
  avatar?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, pass: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updatePassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check persistent localStorage or session-only sessionStorage
    try {
      const saved =
        (typeof window !== 'undefined' && localStorage.getItem('tripkario_admin_session')) ||
        (typeof window !== 'undefined' && sessionStorage.getItem('tripkario_admin_session'));

      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch (e) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('tripkario_admin_session');
        sessionStorage.removeItem('tripkario_admin_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string, remember: boolean = true) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. If Supabase Auth is configured, attempt real authentication
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
      ) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: pass,
        });

        if (error) {
          setIsLoading(false);
          const msg = error.message?.toLowerCase() || '';
          if (msg.includes('rate') || msg.includes('too many') || error.status === 429) {
            return { success: false, error: 'Too many attempts. Please wait a moment and try again.' };
          }
          if (msg.includes('network') || msg.includes('fetch')) {
            return { success: false, error: "Couldn't sign you in right now. Please try again." };
          }
          return { success: false, error: 'Email or password is incorrect.' };
        }

        if (data.user) {
          const adminObj: AdminUser = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            name: data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
            role: 'Super Administrator',
          };
          setUser(adminObj);

          if (remember) {
            localStorage.setItem('tripkario_admin_session', JSON.stringify(adminObj));
            sessionStorage.removeItem('tripkario_admin_session');
          } else {
            sessionStorage.setItem('tripkario_admin_session', JSON.stringify(adminObj));
            localStorage.removeItem('tripkario_admin_session');
          }

          setIsLoading(false);
          return { success: true };
        }
      }

      // 2. Standalone fallback verification for local development environment
      if (cleanEmail.includes('@') && pass.length >= 6) {
        const adminObj: AdminUser = {
          id: `adm_${Date.now()}`,
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          role: 'Super Administrator',
        };
        setUser(adminObj);

        if (remember) {
          localStorage.setItem('tripkario_admin_session', JSON.stringify(adminObj));
          sessionStorage.removeItem('tripkario_admin_session');
        } else {
          sessionStorage.setItem('tripkario_admin_session', JSON.stringify(adminObj));
          localStorage.removeItem('tripkario_admin_session');
        }

        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: 'Email or password is incorrect.' };
    } catch (err: any) {
      setIsLoading(false);
      const msg = err?.message?.toLowerCase() || '';
      if (msg.includes('network') || msg.includes('failed to fetch')) {
        return { success: false, error: "Couldn't sign you in right now. Please try again." };
      }
      return { success: false, error: 'Email or password is incorrect.' };
    }
  };

  const logout = async () => {
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
      ) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      // Ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tripkario_admin_session');
      sessionStorage.removeItem('tripkario_admin_session');
    }
    setUser(null);
  };

  const updatePassword = async (currentPass: string, newPass: string) => {
    if (newPass.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters long.' };
    }

    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
      ) {
        const { error } = await supabase.auth.updateUser({
          password: newPass,
        });
        if (error) {
          return { success: false, error: error.message || 'Failed to update password.' };
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update password.' };
    }
  };

  const requestPasswordReset = async (emailToReset: string) => {
    const cleanEmail = emailToReset.trim().toLowerCase();
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
      ) {
        let redirectUrl = 'https://tripkario.com/adminconsole1811/update-password';
        if (typeof window !== 'undefined' && window.location.origin) {
          redirectUrl = `${window.location.origin}/adminconsole1811/update-password`;
        } else if (process.env.NEXT_PUBLIC_SITE_URL) {
          redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')}/adminconsole1811/update-password`;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: redirectUrl,
        });
        if (error) {
          return { success: false, error: "Couldn't send reset link. Please try again." };
        }
      }
      return { success: true };
    } catch {
      return { success: false, error: "Couldn't send reset link. Please try again." };
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        updatePassword,
        requestPasswordReset,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
