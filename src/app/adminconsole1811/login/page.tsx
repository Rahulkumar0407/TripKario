'use client';

import React, { useState } from 'react';
import TripkarioLogo from '@/components/TripkarioLogo';
import { useAdminAuth } from '@/lib/admin/auth';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const result = await login(email, password, rememberMe);
    setIsSubmitting(false);

    if (!result.success && result.error) {
      setErrorMsg(result.error);
    }
  };

  const handleUseDemoCredentials = () => {
    setEmail('admin@tripkario.com');
    setPassword('tripkario1811');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#0F0E0C] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden select-none">
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
        <div className="bg-[#171512] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-[#C85D3A]/15 border border-[#C85D3A]/30 text-xs font-medium text-[#F5B4A1] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C85D3A] shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-[#B8B0A4] block">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tripkario.com"
                  className="w-full px-4 py-3 pl-11 rounded-2xl bg-white/5 border border-white/15 focus:border-[#C85D3A] focus:ring-1 focus:ring-[#C85D3A] text-white text-sm outline-none transition-all placeholder:text-[#6D665E]"
                />
                <Mail className="w-4 h-4 text-[#8C8479] absolute left-4 top-3.5" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-widest text-[#B8B0A4] block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotOpen(true)}
                  className="text-[11px] font-mono text-[#D4A467] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pl-11 pr-11 rounded-2xl bg-white/5 border border-white/15 focus:border-[#C85D3A] focus:ring-1 focus:ring-[#C85D3A] text-white text-sm outline-none transition-all placeholder:text-[#6D665E]"
                />
                <Lock className="w-4 h-4 text-[#8C8479] absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-[#8C8479] hover:text-white"
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] disabled:opacity-50 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C85D3A]/30 transition-all duration-200 active:scale-98 cursor-pointer mt-2"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Sign In to Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Helper for Local Evaluation */}
          <div className="pt-3 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={handleUseDemoCredentials}
              className="text-xs font-mono text-[#D4A467] hover:text-white transition-colors"
            >
              Fill Default Demo Credentials (admin@tripkario.com)
            </button>
          </div>
        </div>

        {/* Security Trust Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-[#8C8479]">
          <ShieldCheck className="w-4 h-4 text-[#174E48] dark:text-[#D4A467]" />
          <span>TripKario Protected Business Area</span>
        </div>
      </div>

      {/* Forgot Password Helper Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#171512] rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-white/15 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Reset Admin Password</h3>
            <p className="text-xs text-[#B8B0A4] leading-relaxed">
              If you have configured Supabase Auth, a reset link will be sent to your administrator email. For local evaluation, use the default administrator credentials.
            </p>
            <button
              type="button"
              onClick={() => setIsForgotOpen(false)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono tracking-wider uppercase"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
