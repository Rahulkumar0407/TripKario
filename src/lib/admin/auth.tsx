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
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check existing stored admin session
    const saved = localStorage.getItem('tripkario_admin_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem('tripkario_admin_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string, remember: boolean = true) => {
    setIsLoading(true);
    try {
      // 1. If Supabase Auth is configured, attempt real authentication
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: 'Incorrect email or password. Please try again.' };
        }

        if (data.user) {
          const adminObj: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.full_name || email.split('@')[0],
            role: 'Super Administrator',
          };
          setUser(adminObj);
          if (remember) {
            localStorage.setItem('tripkario_admin_session', JSON.stringify(adminObj));
          }
          setIsLoading(false);
          return { success: true };
        }
      }

      // 2. Initial administrator session setup for standalone dev mode
      if (email.includes('@') && pass.length >= 6) {
        const adminObj: AdminUser = {
          id: `adm_${Date.now()}`,
          email: email.trim().toLowerCase(),
          name: email.split('@')[0],
          role: 'Super Administrator',
        };
        setUser(adminObj);
        if (remember) {
          localStorage.setItem('tripkario_admin_session', JSON.stringify(adminObj));
        }
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: 'Invalid credentials. Please enter a valid email and password (minimum 6 characters).' };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co') {
        await supabase.auth.signOut();
      }
    } catch (e) {
      // Ignore
    }
    localStorage.removeItem('tripkario_admin_session');
    setUser(null);
  };

  const updatePassword = async (currentPass: string, newPass: string) => {
    if (newPass.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters long.' };
    }

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co') {
        const { error } = await supabase.auth.updateUser({
          password: newPass,
        });
        if (error) {
          return { success: false, error: error.message };
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update password.' };
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
