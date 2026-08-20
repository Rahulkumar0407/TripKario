'use client';

import React, { useState } from 'react';
import { useAdminAuth } from '@/lib/admin/auth';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Save,
  KeyRound,
} from 'lucide-react';

export default function AdminSecurityPage() {
  const { updatePassword } = useAdminAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (newPassword.length < 8) {
      setStatus({ type: 'error', message: 'New password must be at least 8 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'New password and confirm password do not match.' });
      return;
    }

    setIsSubmitting(true);
    const res = await updatePassword(currentPassword, newPassword);
    setIsSubmitting(false);

    if (res.success) {
      setStatus({ type: 'success', message: 'Password has been updated securely. You can now use your new password.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setStatus({ type: 'error', message: res.error || 'Failed to update password.' });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-2xl">
      {/* Top Header */}
      <div className="pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
          SECURITY & ACCESS
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
          Change Administrator Password
        </h1>
        <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
          Update your TripKario Console login password. Your session will be protected with Supabase Auth encryption.
        </p>
      </div>

      {/* Status Alerts */}
      {status && (
        <div
          className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-3 ${
            status.type === 'success'
              ? 'bg-[#174E48]/15 border-[#174E48]/30 text-[#174E48] dark:text-[#D4A467]'
              : 'bg-[#C85D3A]/15 border-[#C85D3A]/30 text-[#C85D3A]'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      {/* Password Change Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#14120F] rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] dark:border-[#262420] shadow-sm space-y-6"
      >
        <div className="space-y-4 text-xs font-mono">
          {/* Current Password */}
          <div>
            <label className="text-[#8C8479] uppercase block mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full p-3 pl-11 pr-11 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-sm outline-none focus:border-[#C85D3A]"
              />
              <Lock className="w-4 h-4 text-[#8C8479] absolute left-4 top-3.5" />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-[#8C8479] uppercase block mb-1">New Password (Min. 8 characters)</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                className="w-full p-3 pl-11 pr-11 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-sm outline-none focus:border-[#C85D3A]"
              />
              <KeyRound className="w-4 h-4 text-[#8C8479] absolute left-4 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-3.5 text-[#8C8479] hover:text-[#171512] dark:hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-[#8C8479] uppercase block mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full p-3 pl-11 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-sm outline-none focus:border-[#C85D3A]"
              />
              <KeyRound className="w-4 h-4 text-[#8C8479] absolute left-4 top-3.5" />
            </div>
            {newPassword && confirmPassword && (
              <span
                className={`text-[10px] font-mono mt-1 block ${
                  newPassword === confirmPassword ? 'text-[#174E48] dark:text-[#D4A467]' : 'text-red-500'
                }`}
              >
                {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] disabled:opacity-50 text-white font-bold text-xs tracking-widest font-mono uppercase flex items-center justify-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all cursor-pointer"
          >
            <span>{isSubmitting ? 'Updating...' : 'Update Password'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
