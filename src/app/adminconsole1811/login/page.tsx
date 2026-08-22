'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TripkarioLogo from '@/components/TripkarioLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { useAdminAuth } from '@/lib/admin/auth';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login, requestPasswordReset } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password modal
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);

  // If already logged in, redirect to admin trips
  useEffect(() => {
    if (user) {
      router.replace('/adminconsole1811/trips');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Email or password is incorrect.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const result = await login(email, password, rememberMe);
    setIsSubmitting(false);

    if (result.success) {
      router.replace('/adminconsole1811/trips');
    } else {
      setErrorMsg(result.error || 'Email or password is incorrect.');
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setIsForgotSubmitting(true);
    setForgotStatus(null);

    const result = await requestPasswordReset(forgotEmail);
    setIsForgotSubmitting(false);

    if (result.success) {
      setForgotStatus({
        success: true,
        message: 'If this email is registered as an administrator, a password reset link has been sent to your inbox.',
      });
    } else {
      setForgotStatus({
        success: false,
        message: result.error || "Couldn't send reset link. Please try again.",
      });
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
              Sign in to manage trips, photos, enquiries, and website content.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#171512] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] space-y-6">
          {/* Error Banner: ONLY shown after failed submission */}
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
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="adminEmailInput" className="text-xs font-mono uppercase tracking-widest text-[#B8B0A4] block">
                Admin Email
              </label>
              <div className="relative">
                <input
                  id="adminEmailInput"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="admin@tripkario.com"
                  className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-white/5 border border-white/15 focus:border-[#C85D3A] focus:ring-1 focus:ring-[#C85D3A] text-white text-sm outline-none transition-all placeholder:text-[#6D665E]"
                />
                <Mail className="w-4 h-4 text-[#8C8479] absolute left-4 top-4" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="adminPasswordInput" className="text-xs font-mono uppercase tracking-widest text-[#B8B0A4] block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotStatus(null);
                    setIsForgotOpen(true);
                  }}
                  className="text-[11px] font-mono text-[#D4A467] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="adminPasswordInput"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="••••••••••••"
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

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-white/5 border-white/20 text-[#C85D3A] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs font-mono text-[#B8B0A4] cursor-pointer">
                Remember my session on this computer
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] disabled:opacity-50 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C85D3A]/30 transition-all duration-200 active:scale-98 cursor-pointer mt-2"
            >
              <span>{isSubmitting ? 'SIGNING IN...' : 'SIGN IN TO CONSOLE →'}</span>
            </button>
          </form>
        </div>

        {/* Security Trust Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-[#8C8479]">
          <ShieldCheck className="w-4 h-4 text-[#174E48] dark:text-[#D4A467]" />
          <span>TripKario Protected Business Area</span>
        </div>
      </div>

      {/* Forgot Password Reset Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="bg-[#171512] rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Reset Admin Password</h3>
              <button
                type="button"
                onClick={() => setIsForgotOpen(false)}
                className="text-[#8C8479] hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#B8B0A4] leading-relaxed">
              Enter your administrator email address to receive instructions on resetting your password.
            </p>

            {forgotStatus && (
              <div
                className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  forgotStatus.success
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                    : 'bg-[#C85D3A]/15 border border-[#C85D3A]/30 text-[#F5B4A1]'
                }`}
              >
                {forgotStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#C85D3A]" />
                )}
                <span>{forgotStatus.message}</span>
              </div>
            )}

            {!forgotStatus?.success && (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="forgotEmailInput" className="text-[10px] font-mono uppercase tracking-widest text-[#B8B0A4]">
                    Admin Email Address
                  </label>
                  <input
                    id="forgotEmailInput"
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@tripkario.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isForgotSubmitting}
                  className="w-full py-3 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] disabled:opacity-50 text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{isForgotSubmitting ? 'Sending...' : 'Send Reset Link'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {forgotStatus?.success && (
              <button
                type="button"
                onClick={() => setIsForgotOpen(false)}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono tracking-wider uppercase cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
