'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { HardDrive, RefreshCw, AlertTriangle, Database, ExternalLink } from 'lucide-react';

export interface StorageUsageData {
  success: boolean;
  storageBytes: number;
  formattedUsed: string;
  limitBytes: number | null;
  formattedLimit: string | null;
  formattedRemaining: string | null;
  percentUsed: number | null;
  limitKnown: boolean;
  warningStatus: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
  dashboardUrl?: string;
  error?: string;
}

interface ImageKitStorageWidgetProps {
  variant?: 'header' | 'panel';
}

export default function ImageKitStorageWidget({ variant = 'panel' }: ImageKitStorageWidgetProps) {
  const [data, setData] = useState<StorageUsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUsage = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/admin/imagekit/usage');
      if (!res.ok) throw new Error('Failed to fetch usage');
      const result = await res.json();
      if (result.success) {
        setData(result);
      } else {
        setError(true);
      }
    } catch (e) {
      console.warn('Could not load ImageKit storage usage:', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  const getProgressBg = (status?: string) => {
    if (status === 'critical') return 'bg-red-500';
    if (status === 'warning') return 'bg-amber-500';
    return 'bg-[#C85D3A]';
  };

  const dashboardLink = data?.dashboardUrl || 'https://imagekit.io/dashboard';

  // Header Variant (Compact button / badge with popover)
  if (variant === 'header') {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono text-[#171512] dark:text-[#F5EFE6] hover:border-[#C85D3A] transition-all cursor-pointer touch-manipulation"
          title="ImageKit Storage Usage"
        >
          <HardDrive className="w-3.5 h-3.5 text-[#C85D3A]" />
          <span className="hidden sm:inline font-medium">
            {loading ? 'Storage...' : error ? 'Storage' : data?.formattedUsed}
          </span>
          {data?.limitKnown && data.percentUsed !== null && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 font-bold">
              {data.percentUsed}%
            </span>
          )}
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1C1916] rounded-2xl shadow-xl border border-[#E5DFD5] dark:border-[#2C2824] p-4 z-40 space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] dark:border-[#262420] pb-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#8C8479] font-bold">
                  <Database className="w-3.5 h-3.5 text-[#C85D3A]" />
                  <span>IMAGEKIT STORAGE</span>
                </div>
                <button
                  type="button"
                  onClick={fetchUsage}
                  disabled={loading}
                  className="p-1 rounded-lg text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  title="Refresh usage"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {loading ? (
                <div className="py-4 text-center text-xs font-mono text-[#8C8479]">
                  Loading storage...
                </div>
              ) : error ? (
                <div className="py-2 text-center space-y-2">
                  <p className="text-xs font-mono text-red-500">Storage usage unavailable</p>
                  <button
                    type="button"
                    onClick={fetchUsage}
                    className="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-[11px] font-mono font-medium hover:bg-[#C85D3A] hover:text-white transition-colors cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex items-center justify-between text-[#171512] dark:text-white font-medium mb-1">
                      <span>{data?.formattedUsed} used</span>
                      {data?.limitKnown && data?.formattedLimit && (
                        <span className="font-bold text-[#8C8479]">
                          / {data.formattedLimit}
                        </span>
                      )}
                    </div>

                    {data?.limitKnown && data.percentUsed !== null ? (
                      <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${getProgressBg(data.warningStatus)}`}
                          style={{ width: `${Math.min(100, Math.max(3, data.percentUsed))}%` }}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-[#8C8479] mt-1">
                        <span>Plan limit</span>
                        <span className="italic">Not available via API</span>
                      </div>
                    )}
                  </div>

                  {data?.limitKnown && data.formattedRemaining && (
                    <div className="flex items-center justify-between text-[11px] text-[#8C8479]">
                      <span>Remaining</span>
                      <span className="font-semibold text-[#171512] dark:text-white">
                        {data.formattedRemaining} remaining
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between text-[10px] text-[#8C8479]">
                    <span>{data?.lastUpdated}</span>
                    <a
                      href={dashboardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C85D3A] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>View ImageKit →</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  // Panel Variant (Clean card embedded in Trips / Gallery pages)
  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-[#C85D3A]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#171512] dark:text-white">
            IMAGEKIT STORAGE
          </span>
        </div>

        <button
          type="button"
          onClick={fetchUsage}
          disabled={loading}
          className="p-1.5 rounded-lg text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
          title="Refresh storage usage"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="py-2 text-xs text-[#8C8479]">Loading storage usage...</div>
      ) : error ? (
        <div className="py-2 flex items-center justify-between">
          <span className="text-xs text-red-500">Storage usage unavailable</span>
          <button
            type="button"
            onClick={fetchUsage}
            className="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-xs text-[#171512] dark:text-white hover:bg-[#C85D3A] hover:text-white transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <div>
              <span className="font-bold text-[#171512] dark:text-white">
                {data?.formattedUsed} used
              </span>
              {data?.limitKnown && data?.formattedLimit && (
                <span className="text-[#8C8479]"> / {data.formattedLimit}</span>
              )}
            </div>

            {data?.limitKnown && data.formattedRemaining ? (
              <div>
                <span className="font-bold text-[#171512] dark:text-white">
                  {data.formattedRemaining} remaining
                </span>
                {data.percentUsed !== null && (
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 font-bold">
                    {data.percentUsed}%
                  </span>
                )}
              </div>
            ) : (
              <div className="text-[11px] text-[#8C8479]">
                <span>Plan limit: </span>
                <span className="italic">Not available via API</span>
              </div>
            )}
          </div>

          {data?.limitKnown && data.percentUsed !== null ? (
            <div className="w-full h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${getProgressBg(data.warningStatus)}`}
                style={{ width: `${Math.min(100, Math.max(3, data.percentUsed))}%` }}
              />
            </div>
          ) : null}

          {data?.warningStatus === 'critical' && (
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Storage almost full</span>
            </div>
          )}

          {data?.warningStatus === 'warning' && (
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Storage getting high</span>
            </div>
          )}

          <div className="text-[10px] text-[#8C8479] pt-1 flex items-center justify-between border-t border-[#E5DFD5] dark:border-[#262420]">
            <span>{data?.lastUpdated}</span>
            <a
              href={dashboardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C85D3A] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>View ImageKit →</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
