'use client';

import React, { useState } from 'react';
import { initialEnquiries, SeedEnquiry } from '@/lib/admin/seedData';
import {
  Search,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Users,
  IndianRupee,
  MapPin,
  CheckCircle2,
  Clock,
  X,
  FileText,
} from 'lucide-react';

const statuses = ['All', 'New', 'Contacted', 'Planning', 'Quoted', 'Booked', 'Lost'] as const;

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<SeedEnquiry[]>(initialEnquiries);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeEnquiry, setActiveEnquiry] = useState<SeedEnquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  const filtered = enquiries.filter((e) => {
    const matchesStatus =
      selectedStatus === 'All' ||
      e.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: SeedEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    if (activeEnquiry && activeEnquiry.id === id) {
      setActiveEnquiry({ ...activeEnquiry, status: newStatus });
    }
  };

  const handleAddNote = () => {
    if (!newNoteText.trim() || !activeEnquiry) return;
    const currentNotes = activeEnquiry.notes || '';
    const updatedNotes = currentNotes
      ? `${currentNotes}\n[${new Date().toLocaleDateString('en-IN')}] ${newNoteText.trim()}`
      : `[${new Date().toLocaleDateString('en-IN')}] ${newNoteText.trim()}`;

    const updated = { ...activeEnquiry, notes: updatedNotes };
    setActiveEnquiry(updated);
    setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setNewNoteText('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            CUSTOMER LEADS & TRIP REQUESTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Enquiries & Trip Planner Leads ({enquiries.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Direct enquiries submitted through the Plan Journey modal and chatbot concierge.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by customer name, destination, phone..."
            className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] text-xs sm:text-sm text-[#171512] dark:text-white placeholder:text-[#8C8479] outline-none focus:border-[#C85D3A]"
          />
          <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {statuses.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                selectedStatus === st
                  ? 'bg-[#174E48] text-white font-bold'
                  : 'bg-white dark:bg-[#14120F] text-[#6D665E] dark:text-[#8C8479] border border-[#E5DFD5] dark:border-[#262420]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table List */}
      <div className="bg-white dark:bg-[#14120F] rounded-3xl border border-[#E5DFD5] dark:border-[#262420] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#E5DFD5] dark:divide-[#262420]">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setActiveEnquiry(lead)}
              className="p-4 sm:p-5 hover:bg-[#FAF7F2] dark:hover:bg-white/5 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm sm:text-base font-bold text-[#171512] dark:text-white truncate">
                    {lead.customerName}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      lead.status === 'new'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : lead.status === 'contacted'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : lead.status === 'booked'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-black/5 dark:bg-white/5 text-[#8C8479]'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8C8479]">
                  <span className="flex items-center gap-1 text-[#C85D3A] font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    {lead.destination}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {lead.travellersCount} Guests
                  </span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {lead.budgetRange}
                  </span>
                </div>
              </div>

              {/* Quick contact actions */}
              <div
                className="flex items-center gap-2 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.customerName)},%20this%20is%20TripKario%20Travel.%20Regarding%20your%20trip%20to%20${encodeURIComponent(lead.destination)}...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${lead.phone}`}
                  className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-white/5 text-[#171512] dark:text-white hover:bg-[#C85D3A] hover:text-white transition-colors"
                  title="Call Customer"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveEnquiry(lead)}
                  className="px-3 py-1.5 rounded-xl bg-[#174E48] text-white text-xs font-mono font-bold uppercase"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry Detail Drawer (#25) */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60" onClick={() => setActiveEnquiry(null)} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#14120F] h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6 text-xs font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5] dark:border-[#262420]">
                <div>
                  <span className="text-[10px] uppercase text-[#C85D3A] font-bold">TRIP REQUEST</span>
                  <h2 className="text-lg font-bold text-[#171512] dark:text-white">
                    {activeEnquiry.customerName}
                  </h2>
                </div>
                <button onClick={() => setActiveEnquiry(null)}><X className="w-5 h-5" /></button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">Lead Status</label>
                <div className="flex flex-wrap gap-1.5">
                  {(['new', 'contacted', 'planning', 'quoted', 'booked', 'lost'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(activeEnquiry.id, st)}
                      className={`px-3 py-1 rounded-xl uppercase font-bold text-[10px] transition-colors ${
                        activeEnquiry.status === st
                          ? 'bg-[#174E48] text-white'
                          : 'bg-[#FAF7F2] dark:bg-[#1C1916] text-[#8C8479] border border-[#E5DFD5] dark:border-[#2C2824]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#8C8479]">Phone</span>
                  <span className="text-[#171512] dark:text-white font-bold">{activeEnquiry.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8479]">Email</span>
                  <span className="text-[#171512] dark:text-white font-bold">{activeEnquiry.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8479]">Destination</span>
                  <span className="text-[#C85D3A] font-bold">{activeEnquiry.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8479]">Travel Dates</span>
                  <span className="text-[#171512] dark:text-white font-bold">{activeEnquiry.travelDates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8479]">Budget</span>
                  <span className="text-[#174E48] dark:text-[#D4A467] font-bold">{activeEnquiry.budgetRange}</span>
                </div>
              </div>

              {/* Customer Message */}
              {activeEnquiry.message && (
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1 font-bold">Special Requests</label>
                  <p className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs leading-relaxed">
                    {activeEnquiry.message}
                  </p>
                </div>
              )}

              {/* Internal Notes */}
              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">Internal Specialist Notes</label>
                {activeEnquiry.notes && (
                  <pre className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-mono text-[11px] whitespace-pre-wrap mb-2">
                    {activeEnquiry.notes}
                  </pre>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add follow-up note (e.g. Sent hotel quote on WhatsApp)..."
                    className="flex-1 p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-xs text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                  />
                  <button
                    type="button"
                    onClick={handleAddNote}
                    className="px-4 py-2 rounded-xl bg-[#174E48] text-white font-bold text-xs"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between">
              <a
                href={`https://wa.me/${activeEnquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-mono font-bold text-xs uppercase flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveEnquiry(null)}
                className="px-5 py-2 rounded-xl bg-black/10 dark:bg-white/10 text-xs font-mono font-bold uppercase"
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
