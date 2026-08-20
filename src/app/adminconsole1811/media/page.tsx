'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { initialMediaLibrary, SeedMediaItem } from '@/lib/admin/seedData';
import {
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  Plus,
  ImageIcon,
  FolderOpen,
} from 'lucide-react';

const categories = [
  'All',
  'Hero',
  'Destination',
  'Trip',
  'Itinerary',
  'Past Trip',
  'Team',
  'Testimonial',
  'Story',
  'Other',
] as const;

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<SeedMediaItem[]>(initialMediaLibrary);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<SeedMediaItem | null>(null);

  // Batch Upload Progress State
  const [isUploading, setIsUploading] = useState(false);
  const [batchTotal, setBatchTotal] = useState(0);
  const [batchCompleted, setBatchCompleted] = useState(0);
  const [currentUploadName, setCurrentUploadName] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteWarningItem, setDeleteWarningItem] = useState<SeedMediaItem | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMedia = mediaList.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Batch Multi-File Upload Processor (#04)
  const processFilesBatch = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setIsUploading(true);
    setBatchTotal(fileArray.length);
    setBatchCompleted(0);

    const newlyAdded: SeedMediaItem[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setCurrentUploadName(file.name);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('category', selectedCategory === 'All' ? 'Destination' : selectedCategory);

      try {
        const res = await fetch('/api/admin/imagekit/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          const item: SeedMediaItem = {
            id: data.fileId || `m_${Date.now()}_${i}`,
            name: data.name || file.name.replace(/\.[^/.]+$/, ''),
            url: data.url,
            category: (data.category as any) || 'Destination',
            altText: `TripKario travel photo - ${file.name.replace(/\.[^/.]+$/, '')}`,
            photographer: 'Admin Upload',
            usageCount: 0,
          };
          newlyAdded.push(item);
        }
      } catch (err) {
        console.error(`Failed uploading ${file.name}`, err);
      }

      setBatchCompleted(i + 1);
    }

    if (newlyAdded.length > 0) {
      setMediaList((prev) => [...newlyAdded, ...prev]);
      setSelectedItem(newlyAdded[0]);
    }

    setTimeout(() => {
      setIsUploading(false);
      setBatchTotal(0);
      setBatchCompleted(0);
    }, 1200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFilesBatch(e.dataTransfer.files);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteItem = (item: SeedMediaItem) => {
    if (item.usageCount > 0) {
      setDeleteWarningItem(item);
      return;
    }
    setMediaList((prev) => prev.filter((m) => m.id !== item.id));
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  const confirmDeleteAnyway = () => {
    if (!deleteWarningItem) return;
    setMediaList((prev) => prev.filter((m) => m.id !== deleteWarningItem.id));
    if (selectedItem?.id === deleteWarningItem.id) setSelectedItem(null);
    setDeleteWarningItem(null);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`space-y-6 sm:space-y-8 min-h-screen transition-colors ${
        isDragOver ? 'bg-[#C85D3A]/5 rounded-3xl p-2' : ''
      }`}
    >
      {/* Top Header & Upload Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            MEDIA ASSET MANAGER
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Media Library ({mediaList.length} photos)
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Drag & drop or batch upload photos. All files are automatically optimized to WebP/AVIF and served via CDN.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={(e) => e.target.files && processFilesBatch(e.target.files)}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? `Uploading (${batchCompleted}/${batchTotal})...` : 'Upload Photos (Batch)'}</span>
          </button>
        </div>
      </div>

      {/* Batch Upload Progress Indicator (#04) */}
      {isUploading && (
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14120F] border border-[#C85D3A]/40 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#C85D3A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A467] animate-spin" />
              <span>
                Uploading photo {batchCompleted} of {batchTotal}: &ldquo;{currentUploadName}&rdquo;
              </span>
            </span>
            <span className="text-[#174E48] dark:text-[#D4A467]">
              {batchCompleted} ready · {batchTotal - batchCompleted} remaining
            </span>
          </div>

          <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C85D3A] transition-all duration-300 rounded-full"
              style={{ width: `${(batchCompleted / Math.max(batchTotal, 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search photos by name, territory, or category..."
            className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] text-xs sm:text-sm text-[#171512] dark:text-white placeholder:text-[#8C8479] outline-none focus:border-[#C85D3A] focus:ring-1 focus:ring-[#C85D3A] shadow-sm transition-all"
          />
          <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[#8C8479] hover:text-[#171512] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#174E48] dark:bg-[#1E5A53] text-white font-bold shadow-sm'
                    : 'bg-white dark:bg-[#14120F] text-[#6D665E] dark:text-[#B8B0A4] hover:bg-[#F4EFE7] dark:hover:bg-white/5 border border-[#E5DFD5] dark:border-[#262420]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Drag & Drop Visual Dropzone Callout */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-[#C85D3A] bg-[#C85D3A]/10 scale-101'
            : 'border-[#E5DFD5] dark:border-[#262420] hover:border-[#C85D3A]/50 bg-white/50 dark:bg-[#14120F]/50'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-1.5 text-xs text-[#6D665E] dark:text-[#8C8479]">
          <FolderOpen className="w-6 h-6 text-[#C85D3A]" />
          <span className="font-bold text-[#171512] dark:text-white text-sm">
            Drag and drop 1 or 20+ photos anywhere here
          </span>
          <span>or click to browse from your computer</span>
        </div>
      </div>

      {/* Media Thumbnail Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#14120F] rounded-3xl border border-[#E5DFD5] dark:border-[#262420] p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] dark:bg-white/5 mx-auto flex items-center justify-center text-[#C85D3A]">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#171512] dark:text-white">
              No photos found
            </h3>
            <p className="text-xs text-[#6D665E] dark:text-[#8C8479] max-w-sm mx-auto mt-1">
              {searchQuery
                ? `No images match your search for "${searchQuery}".`
                : 'Upload travel photographs to start managing your library.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {filteredMedia.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative bg-white dark:bg-[#14120F] rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 ring-[#C85D3A] border-[#C85D3A] shadow-lg'
                    : 'border-[#E5DFD5] dark:border-[#262420] hover:border-[#C85D3A]/50 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="relative aspect-[4/3] bg-[#E8DED0] dark:bg-[#1A1815] overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.altText}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-mono font-bold text-white uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="p-3 space-y-1">
                  <span className="text-xs font-bold text-[#171512] dark:text-white block truncate">
                    {item.name}
                  </span>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8479]">
                    <span>Used in {item.usageCount} {item.usageCount === 1 ? 'place' : 'places'}</span>
                    <span className="text-[#174E48] dark:text-[#D4A467] font-semibold">CDN Ready</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Media Detail Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          />

          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#14120F] h-full shadow-2xl border-l border-[#E5DFD5] dark:border-[#262420] flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85D3A] font-bold">
                    PHOTO DETAILS
                  </span>
                  <h2 className="text-lg font-bold text-[#171512] dark:text-white truncate">
                    {selectedItem.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-xl text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DED0] dark:bg-[#1C1916] border border-black/5 dark:border-white/10 shadow-inner">
                <Image
                  src={selectedItem.url}
                  alt={selectedItem.altText}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Image Name</label>
                  <input
                    type="text"
                    value={selectedItem.name}
                    onChange={(e) => {
                      const updated = { ...selectedItem, name: e.target.value };
                      setSelectedItem(updated);
                      setMediaList((prev) =>
                        prev.map((m) => (m.id === updated.id ? updated : m))
                      );
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Alt Text (Accessibility & SEO)</label>
                  <textarea
                    rows={2}
                    value={selectedItem.altText}
                    onChange={(e) => {
                      const updated = { ...selectedItem, altText: e.target.value };
                      setSelectedItem(updated);
                      setMediaList((prev) =>
                        prev.map((m) => (m.id === updated.id ? updated : m))
                      );
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Category</label>
                    <select
                      value={selectedItem.category}
                      onChange={(e) => {
                        const updated = { ...selectedItem, category: e.target.value as any };
                        setSelectedItem(updated);
                        setMediaList((prev) =>
                          prev.map((m) => (m.id === updated.id ? updated : m))
                        );
                      }}
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    >
                      {categories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Usage Count</label>
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#174E48] dark:text-[#D4A467] font-bold">
                      {selectedItem.usageCount} places
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Optimized CDN Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedItem.url}
                      className="flex-1 p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[11px] text-[#8C8479] truncate"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(selectedItem.url, selectedItem.id)}
                      className="p-2 rounded-xl bg-[#C85D3A] text-white hover:bg-[#B54F2E] transition-colors"
                      title="Copy Image URL"
                    >
                      {copiedId === selectedItem.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between gap-3 bg-[#FAF7F2] dark:bg-[#11100E]">
              <button
                type="button"
                onClick={() => handleDeleteItem(selectedItem)}
                className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-bold font-mono tracking-wider uppercase shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety Warning Modal if image is used in live website (#09 & #35) */}
      {deleteWarningItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-[#171512] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-500/30 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#171512] dark:text-white">
                This photo is currently in use
              </h3>
              <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] mt-1.5 leading-relaxed">
                <strong>&ldquo;{deleteWarningItem.name}&rdquo;</strong> is actively displayed in{' '}
                <span className="font-bold text-[#C85D3A]">{deleteWarningItem.usageCount} places</span> across the TripKario website (e.g. Hero carousel, trip package cards).
              </p>
            </div>

            <p className="text-xs text-red-600 dark:text-red-400 font-mono bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              Deleting this image may cause placeholder images to appear on your live website.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteWarningItem(null)}
                className="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold text-[#171512] dark:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteAnyway}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Delete Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
