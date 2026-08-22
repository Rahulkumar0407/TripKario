'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TripkarioLogo from '@/components/TripkarioLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { supabase } from '@/lib/supabase/client';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

type SessionStatus = 'checking' | 'valid' | 'invalid' | 'success';

export default function UpdatePasswordPage() {
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('checking');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // 1. Check for URL error parameters in hash or query
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));

      const error = searchParams.get('error') || hashParams.get('error');
      const errorCode = searchParams.get('error_code') || hashParams.get('error_code');
      const errorDesc = searchParams.get('error_description') || hashParams.get('error_description');

      if (error || errorCode || (errorDesc && errorDesc.toLowerCase().includes('expired'))) {
        if (isMounted) {
          setSessionStatus('invalid');
        }
        return;
      }
    }

    // 2. Subscribe to Supabase Auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (event === 'PASSWORD_RECOVERY') {
        setSessionStatus('valid');
      } else if (event === 'SIGNED_IN' && session) {
        setSessionStatus('valid');
      }
    });

    // 3. Check for active session or wait briefly for token parsing
    const verifySession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (session) {
          setSessionStatus('valid');
        } else {
          // If hash tokens are being processed asynchronously, give a short grace period
          const timer = setTimeout(async () => {
            if (!isMounted) return;
            const { data: { session: retrySession } } = await supabase.auth.getSession();
            if (retrySession) {
              setSessionStatus('valid');
            } else {
              setSessionStatus((prev) => (prev === 'checking' ? 'invalid' : prev));
            }
          }, 800);

          return () => clearTimeout(timer);
        }
      } catch {
        if (isMounted) {
          setSessionStatus('invalid');
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Password Validation
    if (newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
      ) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          setIsSubmitting(false);
          setErrorMsg(error.message || 'Failed to update password. Please try again.');
          return;
        }

        // Sign out to force re-login with new password
        try {
          await supabase.auth.signOut();
        } catch {
          // ignore
        }
      }

      // Clear any cached local storage session
      if (typeof window !== 'undefined') {
        localStorage.removeItem('tripkario_admin_session');
        sessionStorage.removeItem('tripkario_admin_session');
      }

      setIsSubmitting(false);
      setSessionStatus('success');
    } catch {
      setIsSubmitting(false);
      setErrorMsg('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0E0C] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Top Floating Controls */}
      <div className="absolute top-5 right-5 z-20">
        <ThemeToggle className="bg-white/10 border-white/20 hover:bg-white/15" />
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_30%,rgba(200,93,58,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="flex justify-center">
            <div className="p-3.5 bg-[#171512] rounded-2xl border border-white/10 shadow-2xl">
              <TripkarioLogo badgeSize={42} showWordmark={true} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              TripKario Console
            </h1>
            <p className="text-xs sm:text-sm text-[#B8B0A4] font-normal mt-1">
              Secure Administrator Password Recovery
            </p>
          </div>
        </div>

        {/* Checking State */}
        {sessionStatus === 'checking' && (
          <div className="bg-[#171512] rounded-3xl p-8 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#C85D3A] border-t-transparent animate-spin" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Verifying reset link...</p>
              <p className="text-xs text-[#8C8479] font-mono">Authenticating your secure recovery token</p>
            </div>
          </div>
        )}

        {/* Invalid / Expired State */}
        {sessionStatus === 'invalid' && (
          <div className="bg-[#171512] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] space-y-6">
            <div className="p-4 rounded-2xl bg-[#C85D3A]/15 border border-[#C85D3A]/30 text-[#F5B4A1] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#C85D3A] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white">
                  This password reset link is invalid or has expired.
                </h2>
                <p className="text-xs text-[#B8B0A4] leading-relaxed">
                  Password reset links are single-use and expire after a short period. Please return to the sign-in page to request a new link.
                </p>
              </div>
            </div>

            <Link
              href="/adminconsole1811/login"
              className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO SIGN IN</span>
            </Link>
          </div>
        )}

        {/* Success State */}
        {sessionStatus === 'success' && (
          <div className="bg-[#171512] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white">
                  Password updated successfully.
                </h2>
                <p className="text-xs text-[#B8B0A4] leading-relaxed">
                  Your administrator password has been updated. You can now sign in using your new password.
                </p>
              </div>
            </div>

            <Link
              href="/adminconsole1811/login"
              className="w-full py-4 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C85D3A]/30 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <span>SIGN IN TO CONSOLE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Valid Recovery Session: Form */}
        {sessionStatus === 'valid' && (
          <div className="bg-[#171512] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Reset your password</h2>
              <p className="text-xs text-[#B8B0A4] mt-1">
                Enter and confirm your new password below.
              </p>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="p-3.5 rounded-2xl bg-[#C85D3A]/15 border border-[#C85D3A]/30 text-xs font-medium text-[#F5B4A1] flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-[#C85D3A] shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="newPasswordInput"
                  className="text-xs font-mono uppercase tracking-widest text-[#B8B0A4] block"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPasswordInput"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Minimum 8 characters"
                    className="w-full px-4 py-3.5 pl-11 pr-11 rounded-2xl bg-white/5 border border-white/15 focus:border-[#C85D3A] focus:ring-1 focus:ring-[#C85D3A] text-white text-sm outline-none transition-all placeholder:text-[#6D665E]"
                  />
                  <Lock className="w-4 h-4 text-[#8C8479] absolute left-4 top-4" />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-[#8C8479] hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPasswordInput"
                  className="text-xs font-mono uppercase tracking-widest text-[#B8B0A4] block"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPasswordInput"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Repeat new password"
                    className="w-full px-4 py-3.5 pl-11 pr-11 rounded-2xl bg-white/5 border border-white/15 focus:border-[#C85D3A] focus:ring-1 focus:ring-[#C85D3A] text-white text-sm outline-none transition-all placeholder:text-[#6D665E]"
                  />
                  <Lock className="w-4 h-4 text-[#8C8479] absolute left-4 top-4" />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-[#8C8479] hover:text-white transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] disabled:opacity-50 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C85D3A]/30 transition-all duration-200 active:scale-98 cursor-pointer mt-2"
              >
                <span>{isSubmitting ? 'UPDATING...' : 'UPDATE PASSWORD'}</span>
              </button>
            </form>
          </div>
        )}

        {/* Security Trust Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-[#8C8479]">
          <ShieldCheck className="w-4 h-4 text-[#174E48] dark:text-[#D4A467]" />
          <span>TripKario Protected Business Area</span>
        </div>
      </div>
    </div>
  );
}
