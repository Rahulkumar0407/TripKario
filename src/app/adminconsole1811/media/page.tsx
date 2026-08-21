'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { initialMediaLibrary, SeedMediaItem } from '@/lib/admin/seedData';
import {
  Upload,
  Search,
  Trash2,
  Check,
  X,
  Plus,
  ImageIcon,
  FolderOpen,
  Sparkles,
} from 'lucide-react';

const categories = [
  'All',
  'Trip',
  'Itinerary',
  'Past Trip',
  'Team',
  'Destination',
  'Hero',
  'Other',
] as const;

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<SeedMediaItem[]>(initialMediaLibrary);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<SeedMediaItem | null>(null);

  // Upload Progress State
  const [isUploading, setIsUploading] = useState(false);
  const [batchTotal, setBatchTotal] = useState(0);
  const [batchCompleted, setBatchCompleted] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMedia = mediaList.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const processFilesBatch = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setIsUploading(true);
    setBatchTotal(fileArray.length);
    setBatchCompleted(0);

    const newlyAdded: SeedMediaItem[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('category', selectedCategory === 'All' ? 'Trip' : selectedCategory);

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
            category: (data.category as any) || 'Trip',
            altText: `TripKario photo - ${file.name.replace(/\.[^/.]+$/, '')}`,
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
    }, 1000);
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

  const handleDeleteItem = (item: SeedMediaItem) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      setMediaList((prev) => prev.filter((m) => m.id !== item.id));
      if (selectedItem?.id === item.id) setSelectedItem(null);
    }
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
            WEBSITE PHOTOGRAPHY
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Photos ({mediaList.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Upload new travel photographs or browse existing images used across your website.
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
            <span>{isUploading ? `Uploading (${batchCompleted}/${batchTotal})...` : 'Upload Photos'}</span>
          </button>
        </div>
      </div>

      {/* Upload Progress Indicator */}
      {isUploading && (
        <div className="p-4 rounded-2xl bg-white dark:bg-[#14120F] border border-[#C85D3A]/40 shadow-lg space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#C85D3A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A467] animate-spin" />
              <span>Uploading photos ({batchCompleted} of {batchTotal})...</span>
            </span>
            <span className="text-[#174E48] dark:text-[#D4A467]">
              Optimizing automatically
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
            placeholder="Search photos by name..."
            className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] text-xs sm:text-sm text-[#171512] dark:text-white placeholder:text-[#8C8479] outline-none focus:border-[#C85D3A] shadow-sm transition-all"
          />
          <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[#8C8479] hover:text-[#171512]"
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
                    ? 'bg-[#174E48] text-white font-bold shadow-sm'
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
        className={`border-2 border-dashed rounded-3xl p-5 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-[#C85D3A] bg-[#C85D3A]/10'
            : 'border-[#E5DFD5] dark:border-[#262420] hover:border-[#C85D3A]/50 bg-white/40 dark:bg-[#14120F]/40'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-1 text-xs text-[#6D665E] dark:text-[#8C8479]">
          <FolderOpen className="w-5 h-5 text-[#C85D3A]" />
          <span className="font-bold text-[#171512] dark:text-white text-sm">
            Drag & drop photos here or click to browse
          </span>
          <span className="text-[11px]">Supports multiple photos simultaneously</span>
        </div>
      </div>

      {/* Media Thumbnail Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#14120F] rounded-3xl border border-[#E5DFD5] dark:border-[#262420] p-8 space-y-3">
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
                : 'Upload travel photographs to get started.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative bg-white dark:bg-[#14120F] rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 ring-[#C85D3A] border-[#C85D3A] shadow-lg'
                    : 'border-[#E5DFD5] dark:border-[#262420] hover:border-[#C85D3A]/50 shadow-sm'
                }`}
              >
                <div className="relative aspect-[4/3] bg-black/10 overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-mono font-bold text-white uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="p-3">
                  <span className="text-xs font-bold text-[#171512] dark:text-white block truncate">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Media Detail Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
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
                  <h2 className="text-base font-bold text-[#171512] dark:text-white truncate">
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

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/10 border border-black/5 dark:border-white/10 shadow-inner">
                <Image
                  src={selectedItem.url}
                  alt={selectedItem.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1 font-bold">Photo Name</label>
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
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1 font-bold">Category</label>
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
              </div>
            </div>

            <div className="p-6 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between gap-3 bg-[#FAF7F2] dark:bg-[#11100E]">
              <button
                type="button"
                onClick={() => handleDeleteItem(selectedItem)}
                className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-bold font-mono tracking-wider uppercase shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
