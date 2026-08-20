'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { initialMediaLibrary, SeedMediaItem } from '@/lib/admin/seedData';
import {
  Search,
  Upload,
  Check,
  X,
  Sparkles,
  Plus,
  ImageIcon,
} from 'lucide-react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, mediaItem?: SeedMediaItem) => void;
  categoryFilter?: string;
  title?: string;
}

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

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelectImage,
  categoryFilter,
  title = 'Choose Photo from Media Library',
}: MediaPickerModalProps) {
  const [mediaList, setMediaList] = useState<SeedMediaItem[]>(initialMediaLibrary);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'All');
  const [selectedItem, setSelectedItem] = useState<SeedMediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'optimizing' | 'ready'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStatus('uploading');

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('category', selectedCategory === 'All' ? 'Destination' : selectedCategory);

    try {
      setTimeout(() => {
        setUploadStatus('optimizing');
      }, 600);

      const res = await fetch('/api/admin/imagekit/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setUploadStatus('ready');

      if (data.success) {
        const newItem: SeedMediaItem = {
          id: data.fileId || `m_${Date.now()}`,
          name: data.name || file.name.replace(/\.[^/.]+$/, ''),
          url: data.url,
          category: (data.category as any) || 'Destination',
          altText: `TripKario travel photograph - ${file.name}`,
          photographer: 'Admin Upload',
          usageCount: 0,
        };

        setMediaList((prev) => [newItem, ...prev]);
        setSelectedItem(newItem);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadStatus('idle');
      }, 900);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedItem) {
      onSelectImage(selectedItem.url, selectedItem);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#14120F] rounded-3xl w-full max-w-4xl max-h-[88vh] border border-[#E5DFD5] dark:border-[#262420] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85D3A] font-bold">
              MEDIA SELECTOR
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#171512] dark:text-white">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Upload New'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload Indicator */}
        {isUploading && (
          <div className="p-3 bg-[#FAF7F2] dark:bg-[#1A1815] border-b border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between text-xs font-mono">
            <span className="text-[#C85D3A] flex items-center gap-2 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A467]" />
              {uploadStatus === 'uploading' && 'Uploading image to ImageKit CDN...'}
              {uploadStatus === 'optimizing' && 'Auto-compressing to WebP/AVIF...'}
              {uploadStatus === 'ready' && 'Ready!'}
            </span>
            <span className="text-[#8C8479]">Auto-Optimizing</span>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E5DFD5] dark:border-[#262420] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF7F2]/50 dark:bg-[#11100E]/50">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photos by name or territory (e.g. Kashmir, Munnar, Fort)..."
              className="w-full px-3.5 py-2 pl-9 rounded-xl bg-white dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-xs text-[#171512] dark:text-white placeholder:text-[#8C8479] outline-none focus:border-[#C85D3A]"
            />
            <Search className="w-4 h-4 text-[#8C8479] absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#174E48] text-white font-bold'
                    : 'bg-white dark:bg-[#1C1916] text-[#6D665E] dark:text-[#8C8479] border border-[#E5DFD5] dark:border-[#262420]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail Selection Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-[300px]">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12 text-[#8C8479] space-y-2">
              <ImageIcon className="w-8 h-8 mx-auto text-[#C85D3A]/60" />
              <p className="text-xs">No matching photographs found in Media Library.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredMedia.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8DED0] dark:bg-[#1A1815] border cursor-pointer transition-all group ${
                      isSelected
                        ? 'ring-3 ring-[#C85D3A] border-[#C85D3A] shadow-md scale-102'
                        : 'border-[#E5DFD5] dark:border-[#262420] hover:border-[#C85D3A]/60'
                    }`}
                  >
                    <Image
                      src={item.url}
                      alt={item.altText}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />

                    {/* Selected Check Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#C85D3A] text-white flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Name Pill on Hover */}
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                      <span className="text-[10px] font-bold text-white block truncate">
                        {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Confirmation Bar */}
        <div className="p-4 sm:p-5 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between bg-[#FAF7F2] dark:bg-[#11100E]">
          <div className="text-xs font-mono text-[#6D665E] dark:text-[#8C8479] truncate max-w-sm">
            {selectedItem ? (
              <span className="text-[#171512] dark:text-white font-bold">
                Selected: {selectedItem.name}
              </span>
            ) : (
              'Click a photo to select'
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#6D665E] dark:text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmSelection}
              disabled={!selectedItem}
              className="px-5 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] disabled:opacity-40 text-white text-xs font-bold font-mono tracking-wider uppercase shadow-sm cursor-pointer"
            >
              Use Selected Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
