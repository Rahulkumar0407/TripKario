'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Edit2,
  X,
  UploadCloud,
  ImageIcon,
  Compass,
  Check,
  Search,
  AlertCircle,
  Loader2,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { galleryImages as defaultGalleryImages, GalleryImage } from '@/data/gallery';
import { tripPackages } from '@/data/trips';
import ImageKitStorageWidget from '@/components/admin/ImageKitStorageWidget';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  // Filter / Active location tab
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>('ALL');
  const [gallerySearchQuery, setGallerySearchQuery] = useState<string>('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // Delete Confirmation Modal State
  const [photoToDelete, setPhotoToDelete] = useState<GalleryImage | null>(null);

  // Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [location, setLocation] = useState('');
  const [selectedTripId, setSelectedTripId] = useState('');
  const [caption, setCaption] = useState('');

  // Auxiliary UI dropdown states
  const [showExistingLocations, setShowExistingLocations] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [showTripSelector, setShowTripSelector] = useState(false);
  const [tripSearchQuery, setTripSearchQuery] = useState('');

  // Drag & drop state
  const [isDragging, setIsDragging] = useState(false);

  // Upload progress & error states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persistent gallery from localStorage or default data
  useEffect(() => {
    try {
      const local = localStorage.getItem('tripkario_admin_gallery');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          setImages(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not load gallery from localStorage:', e);
    }
    setImages(defaultGalleryImages);
  }, []);

  const persistImages = (updatedList: GalleryImage[]) => {
    setImages(updatedList);
    try {
      localStorage.setItem('tripkario_admin_gallery', JSON.stringify(updatedList));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('tripkario-gallery-updated'));
      }
    } catch (e) {
      console.warn('Could not save gallery to localStorage:', e);
    }
  };

  // Distinct existing locations for combobox and filter chips
  const existingLocations = useMemo(() => {
    const map = new Map<string, number>();
    images.forEach((img) => {
      const loc = img.location.trim();
      if (loc) {
        map.set(loc, (map.get(loc) || 0) + 1);
      }
    });
    return Array.from(map.entries()).map(([loc, count]) => ({ location: loc, count }));
  }, [images]);

  const filteredExistingLocations = useMemo(() => {
    if (!locationSearchQuery.trim()) return existingLocations;
    return existingLocations.filter((item) =>
      item.location.toLowerCase().includes(locationSearchQuery.toLowerCase())
    );
  }, [existingLocations, locationSearchQuery]);

  // Filtered trips for linking
  const filteredTrips = useMemo(() => {
    if (!tripSearchQuery.trim()) return tripPackages.slice(0, 10);
    return tripPackages
      .filter(
        (t) =>
          t.title.toLowerCase().includes(tripSearchQuery.toLowerCase()) ||
          t.destination.toLowerCase().includes(tripSearchQuery.toLowerCase())
      )
      .slice(0, 10);
  }, [tripSearchQuery]);

  const selectedTrip = useMemo(() => {
    return tripPackages.find((t) => t.id === selectedTripId) || null;
  }, [selectedTripId]);

  // Filtered gallery images for the admin page display
  const displayedImages = useMemo(() => {
    let list = images;
    if (selectedLocationFilter !== 'ALL') {
      list = list.filter((img) => img.location.trim().toLowerCase() === selectedLocationFilter.toLowerCase());
    }
    if (gallerySearchQuery.trim()) {
      const q = gallerySearchQuery.toLowerCase();
      list = list.filter(
        (img) =>
          img.location.toLowerCase().includes(q) ||
          (img.caption && img.caption.toLowerCase().includes(q)) ||
          (img.tripName && img.tripName.toLowerCase().includes(q))
      );
    }
    return list;
  }, [images, selectedLocationFilter, gallerySearchQuery]);

  // Handle open Add modal
  const handleOpenAdd = (prefilledLocation?: string) => {
    setEditingImage(null);
    setSelectedFile(null);
    setPreviewUrl('');
    setLocation(prefilledLocation || '');
    setSelectedTripId('');
    setCaption('');
    setShowExistingLocations(false);
    setShowTripSelector(false);
    setLocationSearchQuery('');
    setTripSearchQuery('');
    setUploadError('');
    setIsModalOpen(true);
  };

  // Handle open Edit modal
  const handleOpenEdit = (img: GalleryImage) => {
    setEditingImage(img);
    setSelectedFile(null);
    setPreviewUrl(img.imageUrl);
    setLocation(img.location);
    setSelectedTripId(img.tripId || '');
    setCaption(img.caption || '');
    setShowExistingLocations(false);
    setShowTripSelector(false);
    setLocationSearchQuery('');
    setTripSearchQuery('');
    setUploadError('');
    setIsModalOpen(true);
  };

  // Validate and stage file
  const stageFile = (file: File) => {
    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError('Please choose an image file (JPG, PNG, or WEBP).');
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('This image is too large. Please choose a smaller image.');
      return;
    }

    setUploadError('');
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stageFile(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      stageFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(editingImage ? editingImage.imageUrl : '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Save Photo Form
  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl && !selectedFile) {
      setUploadError('Please choose an image file.');
      return;
    }
    if (!location.trim()) {
      setUploadError('Please enter the location where this photo was taken.');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    let finalImageUrl = previewUrl;

    // If new file selected, upload via server endpoint (ImageKit)
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileName', selectedFile.name);
        formData.append('folder', '/tripkario_gallery');
        formData.append('category', 'Gallery');

        const res = await fetch('/api/admin/imagekit/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || 'Upload failed');
        }
        finalImageUrl = data.url;
      } catch (err: any) {
        console.error('Image upload failed:', err);
        setUploadError('Could not upload photo. Please check your internet connection and try again.');
        setIsUploading(false);
        return;
      }
    }

    const tripObj = tripPackages.find((t) => t.id === selectedTripId);

    if (editingImage) {
      // Update existing photo
      const updated: GalleryImage = {
        ...editingImage,
        imageUrl: finalImageUrl,
        location: location.trim(),
        tripId: selectedTripId || undefined,
        tripName: tripObj ? tripObj.title : (selectedTripId ? editingImage.tripName : undefined),
        destination: tripObj ? tripObj.destination.toUpperCase() : editingImage.destination,
        caption: caption.trim() || undefined,
        alt: `${location.trim()} photograph`,
      };
      const updatedList = images.map((img) => (img.id === editingImage.id ? updated : img));
      persistImages(updatedList);
    } else {
      // Create new photo
      const newImg: GalleryImage = {
        id: `gal-${Date.now()}`,
        imageUrl: finalImageUrl,
        location: location.trim(),
        destination: tripObj ? tripObj.destination.toUpperCase() : 'INDIA',
        tripId: selectedTripId || undefined,
        tripName: tripObj ? tripObj.title : undefined,
        caption: caption.trim() || undefined,
        alt: `${location.trim()} travel photograph`,
        aspect: 'landscape',
      };
      persistImages([newImg, ...images]);
    }

    setIsUploading(false);
    setIsModalOpen(false);
  };

  // Delete photo confirmation
  const handleConfirmDelete = () => {
    if (!photoToDelete) return;
    const updated = images.filter((item) => item.id !== photoToDelete.id);
    persistImages(updated);
    setPhotoToDelete(null);
  };

  return (
    <div className="space-y-8 select-none pb-24 max-w-6xl">
      {/* ── 01. Header Bar ─────────────────────────────────────────────── */}
      <div className="border-b border-[#262420]/15 dark:border-[#262420] pb-6 pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] font-bold block">
            PUBLIC ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#171512] dark:text-[#F5EFE6]">
            Gallery
          </h1>
          <p className="text-xs text-[#8C8479]">
            Manage photographs displayed on the public travel journal ({images.length} total).
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleOpenAdd()}
          className="min-h-[44px] px-6 py-3 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2.5 shadow-md shadow-[#C85D3A]/20 transition-all active:scale-95 cursor-pointer shrink-0 touch-manipulation"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Photo</span>
        </button>
      </div>

      {/* ── Storage Monitor Panel ────────────────────────────────────────── */}
      <ImageKitStorageWidget variant="panel" />

      {/* ── 02. Location Filter Chips & Search Bar ────────────────────────── */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Location Filter Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedLocationFilter('ALL')}
                className={`min-h-[38px] px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium touch-manipulation ${
                  selectedLocationFilter === 'ALL'
                    ? 'bg-[#C85D3A] text-white shadow-sm'
                    : 'bg-white dark:bg-[#14120F] text-[#8C8479] hover:text-[#171512] dark:hover:text-white border border-[#262420]/15 dark:border-[#262420]'
                }`}
              >
                All Locations ({images.length})
              </button>

              {existingLocations.map((item) => {
                const isActive = selectedLocationFilter.toLowerCase() === item.location.toLowerCase();
                return (
                  <button
                    key={item.location}
                    type="button"
                    onClick={() => setSelectedLocationFilter(item.location)}
                    className={`min-h-[38px] px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium touch-manipulation flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#C85D3A] text-white shadow-sm'
                        : 'bg-white dark:bg-[#14120F] text-[#8C8479] hover:text-[#171512] dark:hover:text-white border border-[#262420]/15 dark:border-[#262420]'
                    }`}
                  >
                    <span>{item.location}</span>
                    <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-[#8C8479]'}`}>
                      ({item.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative shrink-0 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8C8479] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search photos..."
                value={gallerySearchQuery}
                onChange={(e) => setGallerySearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white dark:bg-[#14120F] border border-[#262420]/15 dark:border-[#262420] text-xs text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── 03. Photo Grid ───────────────────────────────────────────────── */}
      {displayedImages.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-[#262420]/20 bg-white/40 dark:bg-[#14120F]/40 space-y-4 max-w-md mx-auto">
          <ImageIcon className="w-10 h-10 text-[#C85D3A] mx-auto opacity-80" />
          <h3 className="text-lg font-serif text-[#171512] dark:text-[#F5EFE6]">
            {images.length === 0 ? 'No Photographs in Gallery' : 'No photos matching your filter'}
          </h3>
          <p className="text-xs text-[#8C8479]">
            {images.length === 0
              ? 'Add your first photograph to appear on the public /gallery journal.'
              : 'Try clearing your search or selecting a different location filter.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedLocationFilter('ALL');
              setGallerySearchQuery('');
              if (images.length === 0) handleOpenAdd();
            }}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#C85D3A] text-white text-xs font-mono font-bold uppercase shadow-sm cursor-pointer touch-manipulation"
          >
            {images.length === 0 ? 'Upload Photo' : 'Show All Photos'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedImages.map((img) => (
            <div
              key={img.id}
              className="rounded-3xl overflow-hidden bg-white dark:bg-[#14120F] border border-[#262420]/15 dark:border-[#262420] shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all"
            >
              {/* Photo Container */}
              <div className="relative h-56 w-full bg-black/20 overflow-hidden">
                <Image
                  src={img.imageUrl}
                  alt={img.alt || img.location}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none z-10">
                  <div className="flex items-center gap-1.5 text-xs text-[#FFAA70] font-mono mb-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{img.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-serif font-medium text-[#171512] dark:text-white truncate">
                      {img.location}
                    </h3>
                  </div>

                  {img.tripName ? (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C85D3A] truncate">
                      <Compass className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{img.tripName}</span>
                    </div>
                  ) : null}

                  {img.caption && (
                    <p className="text-xs text-[#8C8479] line-clamp-2 font-sans leading-relaxed">
                      {img.caption}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#262420]/10 dark:border-[#262420] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(img)}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#262420]/15 dark:border-[#262420] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-mono font-medium text-[#171512] dark:text-white flex items-center gap-1.5 cursor-pointer transition-colors touch-manipulation"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#C85D3A]" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPhotoToDelete(img)}
                    className="min-h-[38px] min-w-[38px] p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer flex items-center justify-center touch-manipulation"
                    title="Delete Photo"
                    aria-label={`Delete photo from ${img.location}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          SIMPLIFIED UPLOAD / EDIT MODAL
          ══════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF7F2] dark:bg-[#14120F] border border-[#262420]/20 dark:border-[#262420] p-5 sm:p-7 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#262420]/15 dark:border-[#262420]">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#C85D3A] uppercase font-bold">
                  {editingImage ? 'EDIT PHOTO' : 'ADD GALLERY PHOTO'}
                </span>
                <h2 className="text-xl font-serif text-[#171512] dark:text-white">
                  {editingImage ? 'Edit Photo Details' : 'Upload New Photograph'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer flex items-center justify-center touch-manipulation"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Notification */}
            {uploadError && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-600 dark:text-red-400 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleSavePhoto} className="space-y-5 text-xs font-mono">
              {/* ── 01. Direct File Upload Zone ──────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-[#8C8479] uppercase block font-bold">
                  Photograph *
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="galleryPhotoFileInput"
                />

                {previewUrl ? (
                  /* Image Preview Card */
                  <div className="relative rounded-2xl overflow-hidden border border-[#262420]/15 dark:border-[#262420] bg-black/10">
                    <div className="relative h-56 sm:h-64 w-full">
                      <Image
                        src={previewUrl}
                        alt="Photo preview"
                        fill
                        className="object-cover"
                        unoptimized={previewUrl.startsWith('blob:') || previewUrl.startsWith('data:')}
                      />
                    </div>

                    <div className="p-3 bg-white dark:bg-[#1C1916] flex items-center justify-between border-t border-[#262420]/10 dark:border-[#262420]">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="min-h-[44px] px-4 py-2 rounded-xl border border-[#262420]/15 dark:border-[#262420] text-xs font-mono font-medium hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-[#171512] dark:text-white flex items-center gap-1.5 touch-manipulation"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#C85D3A]" />
                        <span>Replace</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="min-h-[44px] px-3 py-2 rounded-xl text-red-500 hover:bg-red-500/10 cursor-pointer flex items-center gap-1 touch-manipulation"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Upload Drag & Drop Box (Desktop) / Tap Button (Mobile) */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-white/50 dark:bg-[#1C1916]/50 space-y-3 touch-manipulation ${
                      isDragging
                        ? 'border-[#C85D3A] bg-[#C85D3A]/5 scale-[0.99]'
                        : 'border-[#262420]/20 dark:border-[#262420] hover:border-[#C85D3A]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C85D3A]/10 text-[#C85D3A] flex items-center justify-center mx-auto">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-sans font-medium text-[#171512] dark:text-white">
                        Upload photo
                      </p>
                      <p className="text-[11px] text-[#8C8479] mt-0.5">
                        Drag &amp; drop or choose file
                      </p>
                    </div>
                    <div className="inline-block px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] text-[#8C8479]">
                      JPG, JPEG, PNG or WEBP (Max 15MB)
                    </div>
                  </div>
                )}
              </div>

              {/* ── 02. Single Location Field ────────────────────────────────── */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[#8C8479] uppercase block font-bold">
                    Location *
                  </label>

                  {existingLocations.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowExistingLocations(!showExistingLocations)}
                      className="min-h-[36px] text-[11px] text-[#C85D3A] hover:underline cursor-pointer flex items-center gap-1 touch-manipulation"
                    >
                      <span>
                        {showExistingLocations ? 'Enter custom location' : '+ Add to existing location'}
                      </span>
                    </button>
                  )}
                </div>

                {showExistingLocations ? (
                  /* Searchable Existing Location Combobox */
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] space-y-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#8C8479] absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search locations (e.g. Dal Lake, Kashmir)..."
                        value={locationSearchQuery}
                        onChange={(e) => setLocationSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-transparent text-sm sm:text-xs text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                      />
                    </div>

                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {filteredExistingLocations.length === 0 ? (
                        <p className="text-center py-3 text-xs text-[#8C8479] font-sans">
                          No matching location found.
                        </p>
                      ) : (
                        filteredExistingLocations.map((item) => (
                          <button
                            key={item.location}
                            type="button"
                            onClick={() => {
                              setLocation(item.location);
                              setShowExistingLocations(false);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#C85D3A]/10 hover:text-[#C85D3A] text-xs font-sans flex items-center justify-between cursor-pointer transition-colors text-[#171512] dark:text-white min-h-[40px] touch-manipulation"
                          >
                            <span className="truncate font-medium">{item.location}</span>
                            <span className="text-[10px] text-[#8C8479] font-mono shrink-0 ml-2">
                              {item.count} {item.count === 1 ? 'photo' : 'photos'}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  /* Plain Human-readable Location Input */
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dal Lake, Srinagar"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                  />
                )}
              </div>

              {/* ── 03. Optional Trip / Itinerary Link ───────────────────────── */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[#8C8479] uppercase block font-bold">
                    Trip / Itinerary (Optional)
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowTripSelector(!showTripSelector)}
                    className="min-h-[36px] text-[11px] text-[#C85D3A] hover:underline cursor-pointer touch-manipulation"
                  >
                    {selectedTrip ? 'Change trip' : '+ Link to a trip'}
                  </button>
                </div>

                {selectedTrip && !showTripSelector && (
                  <div className="p-3 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate text-xs font-sans text-[#171512] dark:text-white">
                      <Compass className="w-4 h-4 text-[#C85D3A] shrink-0" />
                      <span className="truncate font-medium">{selectedTrip.title}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTripId('')}
                      className="min-h-[36px] text-xs text-red-500 hover:underline shrink-0 ml-2 cursor-pointer touch-manipulation"
                    >
                      Unlink
                    </button>
                  </div>
                )}

                {showTripSelector && (
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] space-y-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#8C8479] absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search trips (e.g. Kashmir, Ladakh)..."
                        value={tripSearchQuery}
                        onChange={(e) => setTripSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-transparent text-sm sm:text-xs text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                      />
                    </div>

                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {filteredTrips.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setSelectedTripId(t.id);
                            setShowTripSelector(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#C85D3A]/10 hover:text-[#C85D3A] text-xs font-sans flex items-center justify-between cursor-pointer transition-colors text-[#171512] dark:text-white min-h-[38px] touch-manipulation"
                        >
                          <span className="truncate font-medium">{t.title}</span>
                          <span className="text-[10px] text-[#8C8479] font-mono shrink-0 ml-2">
                            {t.destination}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── 04. Caption (Optional) ───────────────────────────────────── */}
              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                  Caption (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="A short note about this moment..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white text-sm sm:text-xs font-sans outline-none focus:border-[#C85D3A] leading-relaxed"
                />
              </div>

              {/* ── 05. Submit / Actions Bar ─────────────────────────────────── */}
              <div className="pt-4 flex items-center justify-between border-t border-[#262420]/15 dark:border-[#262420]">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setIsModalOpen(false)}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono uppercase text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer touch-manipulation"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="min-h-[44px] px-6 py-3 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] disabled:opacity-50 text-white text-xs font-mono font-bold uppercase shadow-md shadow-[#C85D3A]/25 cursor-pointer flex items-center justify-center gap-2 touch-manipulation"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading photo...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>SAVE PHOTO</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          DELETE CONFIRMATION MODAL
          ══════════════════════════════════════════════════ */}
      {photoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#FAF7F2] dark:bg-[#14120F] border border-[#262420]/20 dark:border-[#262420] p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-serif text-[#171512] dark:text-white">
                Delete this photo?
              </h3>
              <p className="text-xs text-[#8C8479]">
                This photograph from <span className="font-semibold text-[#171512] dark:text-white">{photoToDelete.location}</span> will be removed from the gallery.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPhotoToDelete(null)}
                className="min-h-[44px] flex-1 px-4 py-2.5 rounded-xl border border-[#262420]/15 dark:border-[#262420] text-xs font-mono uppercase text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer touch-manipulation"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="min-h-[44px] flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase shadow-sm cursor-pointer touch-manipulation"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
