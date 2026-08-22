'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  RotateCcw,
  Eye,
  Check,
  AlertCircle,
  Loader2,
  X,
  ImageIcon,
} from 'lucide-react';

interface ItineraryImageManagerProps {
  currentImageUrl: string;
  originalImageUrl?: string;
  tripTitle: string;
  tripSlug: string;
  destinationName: string;
  onChangeCoverImage: (newUrl: string, isRestore?: boolean) => void;
}

// Utility to normalize image URLs for accurate equality comparisons
function cleanUrl(url?: string): string {
  if (!url) return '';
  try {
    const u = new URL(url.startsWith('http') ? url : `https://ik.imagekit.io${url}`);
    return `${u.origin}${u.pathname}`.toLowerCase();
  } catch {
    return url.split('?')[0].split('#')[0].toLowerCase();
  }
}

export default function ItineraryImageManager({
  currentImageUrl,
  originalImageUrl,
  tripTitle,
  tripSlug,
  destinationName,
  onChangeCoverImage,
}: ItineraryImageManagerProps) {
  // Effective original image fallback
  const effectiveOriginalUrl = originalImageUrl || currentImageUrl;
  const isOriginal = Boolean(
    effectiveOriginalUrl && cleanUrl(currentImageUrl) === cleanUrl(effectiveOriginalUrl)
  );

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Modals
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<{ url: string; label: string } | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Replace image handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError('Please choose an image file (JPG, PNG, or WEBP).');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('This image is too large. Please choose an image smaller than 15MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    setUploadError('');

    const destSlug = (destinationName || 'general').toLowerCase().replace(/\s+/g, '-');
    const cleanTripSlug = (tripSlug || 'itinerary').toLowerCase().replace(/\s+/g, '-');
    const folder = `/tripkario/itineraries/${destSlug}/${cleanTripSlug}`;
    const fileName = 'hero.jpg';

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
      formData.append('folder', folder);
      formData.append('category', 'Itinerary');
      formData.append('currentImageUrl', currentImageUrl || '');
      formData.append('useUniqueFileName', 'false');

      const res = await fetch('/api/admin/imagekit/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      // Duplicate upload prevention (SHA-256 binary match)
      if (data.isDuplicate) {
        showToast('This image is already active.');
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Upload failed');
      }

      const newImageUrl = data.url;

      // Update parent with the newly replaced cover image (preserving original)
      onChangeCoverImage(newImageUrl, false);
      showToast('Image replaced successfully.');
    } catch (err: any) {
      console.error('Image replacement failed:', err);
      setUploadError(err?.message || "Couldn't replace the image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Restore Original handler
  const handleConfirmRestore = async () => {
    if (!effectiveOriginalUrl) return;
    setIsRestoring(true);
    setUploadError('');

    try {
      const res = await fetch('/api/admin/imagekit/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: effectiveOriginalUrl,
          fileId: 'ik_original_restore',
          versionId: 'original_master',
        }),
      });

      let restoredUrl = effectiveOriginalUrl;
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          restoredUrl = data.url;
        }
      }

      // Update parent component to live original URL
      onChangeCoverImage(restoredUrl, true);
      setIsRestoreModalOpen(false);
      showToast('Original image restored.');
    } catch (err) {
      console.error('Restore failed:', err);
      // Even if network call fails, apply original URL client-side
      onChangeCoverImage(effectiveOriginalUrl, true);
      setIsRestoreModalOpen(false);
      showToast('Original image restored.');
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <Check className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {uploadError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* ── 01. CURRENT COVER IMAGE ────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase text-[#8C8479] font-bold block tracking-wider">
            CURRENT COVER IMAGE
          </span>
          <span className="text-[11px] text-[#C85D3A] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C85D3A] animate-pulse" />
            Live on Website
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="relative w-full sm:w-80 aspect-[16/10] rounded-2xl overflow-hidden bg-black/10 border border-[#E5DFD5] dark:border-[#262420] shadow-sm shrink-0">
            <Image
              src={currentImageUrl}
              alt={tripTitle}
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-cover"
              key={currentImageUrl}
            />
            <div className="absolute top-2.5 left-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] tracking-wider uppercase font-bold border border-white/20">
                CURRENT
              </span>
            </div>
          </div>

          <div className="space-y-3 flex-1 w-full">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
              id="itineraryHeroFileInput"
            />

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#C85D3A]/20 transition-all active:scale-95 cursor-pointer touch-manipulation"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Replace Image</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setPreviewImageUrl({ url: currentImageUrl, label: 'CURRENT COVER' })}
                className="min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E5DFD5] dark:border-[#262420] hover:bg-black/5 dark:hover:bg-white/5 text-xs text-[#171512] dark:text-white flex items-center gap-1.5 cursor-pointer touch-manipulation transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#8C8479]" />
                <span>Preview</span>
              </button>
            </div>

            <p className="text-[11px] text-[#8C8479] leading-relaxed">
              Upload a new photo to instantly update the cover image across all catalogue cards, modal views, and direct itinerary pages.
            </p>
          </div>
        </div>
      </div>

      {/* ── 02. ORIGINAL COVER (RESTORE ONLY) ──────────────────────────── */}
      <div className="space-y-3 pt-6 border-t border-[#E5DFD5] dark:border-[#262420]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#174E48] dark:text-[#D4A467]" />
            <span className="text-xs uppercase text-[#8C8479] font-bold block tracking-wider">
              ORIGINAL COVER
            </span>
          </div>

          {isOriginal ? (
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              CURRENT IMAGE IS ORIGINAL
            </span>
          ) : (
            <span className="text-[11px] text-[#8C8479] font-normal">
              Starting Baseline
            </span>
          )}
        </div>

        {/* Original Image Card */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isOriginal
              ? 'bg-[#FAF7F2] dark:bg-[#1C1916] border-emerald-500/30'
              : 'bg-white dark:bg-[#14120F] border-[#E5DFD5] dark:border-[#262420] hover:border-[#8C8479]'
          }`}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Thumbnail */}
            <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-black/10 shrink-0 border border-black/5 dark:border-white/10">
              <Image
                src={effectiveOriginalUrl}
                alt="Original cover image"
                fill
                sizes="100px"
                className="object-cover"
                key={effectiveOriginalUrl}
              />
            </div>

            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  ORIGINAL
                </span>
                <span className="text-xs text-[#171512] dark:text-white font-medium truncate">
                  Initial Master Asset
                </span>
              </div>
              <p className="text-[10px] text-[#8C8479] truncate">
                {isOriginal
                  ? 'Currently active on website as the primary cover'
                  : 'The starting image this itinerary was published with'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setPreviewImageUrl({ url: effectiveOriginalUrl, label: 'ORIGINAL COVER' })}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#E5DFD5] dark:border-[#262420] hover:bg-black/5 dark:hover:bg-white/5 text-xs text-[#171512] dark:text-white flex items-center gap-1.5 cursor-pointer touch-manipulation transition-colors"
              title="Preview original image"
            >
              <Eye className="w-3.5 h-3.5 text-[#8C8479]" />
              <span>Preview</span>
            </button>

            {isOriginal ? (
              <span className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 text-[#8C8479] text-xs font-semibold flex items-center gap-1.5 opacity-70 cursor-not-allowed select-none">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>CURRENTLY ORIGINAL</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setIsRestoreModalOpen(true)}
                className="min-h-[38px] px-4 py-1.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95 touch-manipulation"
                title="Restore original image"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Original</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 03. RESTORE CONFIRMATION MODAL ───────────────────────────── */}
      {isRestoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-[#FAF7F2] dark:bg-[#14120F] border border-[#262420]/20 dark:border-[#262420] p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#174E48]/10 text-[#174E48] dark:text-[#2DD4BF] flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-serif text-[#171512] dark:text-white">
                Restore original image?
              </h3>
              <p className="text-xs text-[#8C8479] leading-relaxed">
                This will replace the current cover image with the image this itinerary originally had.
              </p>
            </div>

            <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-black/10 border border-[#262420]/15 dark:border-[#262420]">
              <Image
                src={effectiveOriginalUrl}
                alt="Original cover preview"
                fill
                sizes="300px"
                className="object-cover"
                key={effectiveOriginalUrl}
              />
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={isRestoring}
                onClick={() => setIsRestoreModalOpen(false)}
                className="min-h-[44px] flex-1 px-4 py-2.5 rounded-xl border border-[#262420]/15 dark:border-[#262420] text-xs font-mono uppercase text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer touch-manipulation transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isRestoring}
                onClick={handleConfirmRestore}
                className="min-h-[44px] flex-1 px-4 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-mono font-bold uppercase shadow-sm cursor-pointer flex items-center justify-center gap-1.5 touch-manipulation transition-all active:scale-95"
              >
                {isRestoring ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Restoring...</span>
                  </>
                ) : (
                  <span>Restore Original</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 04. PREVIEW MODAL ────────────────────────────────────────── */}
      {previewImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#14120F] border border-[#262420] p-4 sm:p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#C85D3A] text-white text-[10px] font-bold uppercase">
                  {previewImageUrl.label}
                </span>
                <span className="text-xs font-mono text-[#8C8479]">
                  {tripTitle}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setPreviewImageUrl(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-black">
              <Image
                src={previewImageUrl.url}
                alt="Full preview"
                fill
                sizes="600px"
                className="object-contain"
                key={previewImageUrl.url}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
