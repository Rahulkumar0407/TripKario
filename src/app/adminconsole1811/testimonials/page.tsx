'use client';

import React, { useState } from 'react';
import { initialTestimonials, SeedTestimonial } from '@/lib/admin/seedData';
import { Plus, Trash2, Edit2, Star, Check, X, Quote } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [reviews, setReviews] = useState<SeedTestimonial[]>(initialTestimonials);
  const [editingReview, setEditingReview] = useState<SeedTestimonial | null>(null);

  const handleAddNew = () => {
    const newRev: SeedTestimonial = {
      id: `test-${Date.now()}`,
      customerName: 'Aditya & Priya Sharma',
      location: 'Bengaluru, India',
      quote: 'TripKario curated the perfect honeymoon in Kashmir. The stays were picturesque and the chauffeur was exceptionally courteous.',
      tripName: 'Kashmir Valley Circuit',
      tripDestination: 'Kashmir',
      rating: 5,
      reviewDate: 'August 2026',
      source: 'Google Review',
      displayOrder: reviews.length + 1,
      isActive: true,
    };
    setReviews([newRev, ...reviews]);
    setEditingReview(newRev);
  };

  const handleSave = (saved: SeedTestimonial) => {
    setReviews((prev) => prev.map((r) => (r.id === saved.id ? saved : r)));
    setEditingReview(null);
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    if (editingReview?.id === id) setEditingReview(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            TESTIMONIALS & REVIEWS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Customer Reviews ({reviews.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Manage genuine traveler experiences and verified Google feedback.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[#8C8479]">
                  {rev.reviewDate || 'Verified Guest'}
                </span>
              </div>

              <p className="text-xs text-[#171512] dark:text-white leading-relaxed line-clamp-3 italic">
                &ldquo;{rev.quote}&rdquo;
              </p>

              <div>
                <span className="text-xs font-bold text-[#171512] dark:text-white block">
                  {rev.customerName}
                </span>
                <span className="text-[11px] font-mono text-[#C85D3A] block">
                  {rev.tripName || rev.location}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setEditingReview(rev)}
                className="px-3 py-1 rounded-xl bg-[#FAF7F2] dark:bg-white/5 hover:bg-[#C85D3A] hover:text-white text-xs font-mono font-bold uppercase transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(rev.id)}
                className="p-1 rounded-xl text-red-500 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60" onClick={() => setEditingReview(null)} />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#14120F] h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5] dark:border-[#262420]">
                <h2 className="text-base font-bold text-[#171512] dark:text-white">Edit Review</h2>
                <button onClick={() => setEditingReview(null)}><X className="w-5 h-5" /></button>
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Customer / Traveller Name</label>
                <input
                  type="text"
                  value={editingReview.customerName}
                  onChange={(e) => setEditingReview({ ...editingReview, customerName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Location (e.g. Mumbai, India)</label>
                <input
                  type="text"
                  value={editingReview.location || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Trip Name</label>
                <input
                  type="text"
                  value={editingReview.tripName || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, tripName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Review Quote</label>
                <textarea
                  rows={4}
                  value={editingReview.quote}
                  onChange={(e) => setEditingReview({ ...editingReview, quote: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262420] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleSave(editingReview)}
                className="px-5 py-2 rounded-xl bg-[#174E48] text-white text-xs font-mono font-bold uppercase"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
