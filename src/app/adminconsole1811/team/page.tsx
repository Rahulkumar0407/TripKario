'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { SeedTeamMember } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  Mail,
  Phone,
  ImageIcon,
  Save,
  Sparkles,
  ArrowRight,
  UserPlus,
} from 'lucide-react';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<SeedTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<SeedTeamMember | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [memberToDelete, setMemberToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isConfirmingRemovePhoto, setIsConfirmingRemovePhoto] = useState(false);

  // Load team data from authoritative backend API on mount
  useEffect(() => {
    async function loadTeamData() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/team');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.team)) {
            setTeam(data.team);
            try {
              localStorage.setItem('tripkario_admin_team', JSON.stringify(data.team));
            } catch (e) {}
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not query /api/admin/team:', err);
      }

      // Check local cache fallback
      try {
        const local = localStorage.getItem('tripkario_admin_team');
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) {
            setTeam(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Could not read team from localStorage:', e);
      }

      // Default: clean empty state (NO FAKE / MOCK DATA)
      setTeam([]);
      setIsLoading(false);
    }

    loadTeamData();
  }, []);

  const handleAddNew = () => {
    const newMember: SeedTeamMember = {
      id: crypto.randomUUID(),
      name: '',
      role: '',
      bio: '',
      photoUrl: '',
      phone: '',
      email: '',
      displayOrder: team.length + 1,
      isActive: true,
    };
    setEditingMember(newMember);
    setIsCreatingNew(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name.trim() || !editingMember.role?.trim()) return;

    setSaveStatus('saving');

    const sanitizedMember: SeedTeamMember = {
      ...editingMember,
      name: editingMember.name.trim(),
      role: editingMember.role.trim() || 'Trip Specialist',
      bio: editingMember.bio?.trim() || '',
      photoUrl: editingMember.photoUrl?.trim() || '',
    };

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member: sanitizedMember }),
      });

      if (res.ok) {
        const data = await res.json();
        const savedMember: SeedTeamMember = data.member || sanitizedMember;

        let updatedList: SeedTeamMember[];
        if (isCreatingNew) {
          updatedList = [...team, savedMember];
        } else {
          updatedList = team.map((m) => (m.id === savedMember.id ? savedMember : m));
        }

        setTeam(updatedList);
        try {
          localStorage.setItem('tripkario_admin_team', JSON.stringify(updatedList));
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('tripkario-team-updated'));
          }
        } catch (e) {}

        setSaveStatus('saved');
        setTimeout(() => {
          setSaveStatus('idle');
          setEditingMember(null);
          setIsCreatingNew(false);
        }, 600);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (err) {
      console.error('Failed to save team member to backend:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;
    const { id } = memberToDelete;

    try {
      await fetch('/api/admin/team', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const updatedList = team
        .filter((m) => m.id !== id)
        .map((m, idx) => ({ ...m, displayOrder: idx + 1 }));

      setTeam(updatedList);
      try {
        localStorage.setItem('tripkario_admin_team', JSON.stringify(updatedList));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('tripkario-team-updated'));
        }
      } catch (e) {}
    } catch (err) {
      console.error('Failed to delete team member from backend:', err);
    }

    if (editingMember?.id === id) {
      setEditingMember(null);
      setIsCreatingNew(false);
    }
    setMemberToDelete(null);
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= team.length) return;

    const list = [...team];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const reordered = list.map((m, idx) => ({ ...m, displayOrder: idx + 1 }));
    setTeam(reordered);
    try {
      localStorage.setItem('tripkario_admin_team', JSON.stringify(reordered));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('tripkario-team-updated'));
      }
      await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: reordered }),
      });
    } catch (err) {
      console.warn('Failed to persist reordered team:', err);
    }
  };

  const teamCountLabel = String(team.length).padStart(2, '0');

  return (
    <div className="space-y-12 sm:space-y-16 min-h-screen select-none pb-24">
      {/* ══════════════════════════════════════════════════
          HERO EDITORIAL HEADER
          ══════════════════════════════════════════════════ */}
      <div className="border-b border-[#262420]/15 dark:border-[#262420] pb-8 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C85D3A] font-semibold block">
              THE PEOPLE BEHIND THE JOURNEY
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171512] dark:text-[#F5EFE6] tracking-tight leading-none">
              Human Specialists & Curators
            </h1>
            <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#A8A095] font-light leading-relaxed pt-1">
              Meet the people who turn routes, stays and ideas into memorable journeys.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C8479] uppercase block">
                Total Directory
              </span>
              <span className="text-xs font-mono font-bold text-[#171512] dark:text-[#F5EFE6]">
                {teamCountLabel} {team.length === 1 ? 'PERSON' : 'PEOPLE'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddNew}
              className="px-6 py-3.5 rounded-2xl bg-[#171512] dark:bg-[#F5EFE6] text-white dark:text-[#171512] hover:bg-[#C85D3A] dark:hover:bg-[#C85D3A] dark:hover:text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2.5 shadow-lg transition-all duration-300 active:scale-98 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Team Member</span>
            </button>
          </div>
        </div>

        {/* Count Bar Subline */}
        <div className="mt-6 flex items-center gap-3 text-[11px] font-mono text-[#8C8479]">
          <span className="w-2 h-2 rounded-full bg-[#174E48] dark:bg-[#D4A467]" />
          <span>
            {isLoading
              ? 'Querying directory...'
              : `${teamCountLabel} active specialist profile${team.length === 1 ? '' : 's'}`}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          EDITORIAL EMPTY STATE (IF 0 TEAM MEMBERS)
          ══════════════════════════════════════════════════ */}
      {!isLoading && team.length === 0 && (
        <div className="py-20 sm:py-28 px-6 text-center max-w-xl mx-auto rounded-3xl border border-dashed border-[#262420]/20 dark:border-[#262420] bg-white/40 dark:bg-[#14120F]/40 backdrop-blur-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#262420] mx-auto flex items-center justify-center text-[#C85D3A]">
            <UserPlus className="w-7 h-7 stroke-1" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#C85D3A] uppercase font-bold">
              DIRECTORY EMPTY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#171512] dark:text-[#F5EFE6]">
              The Team is Waiting
            </h2>
            <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#A8A095] font-light max-w-sm mx-auto leading-relaxed">
              Add the people travellers will speak to, plan with and remember throughout their journey.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNew}
            className="px-6 py-3.5 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold tracking-widest uppercase inline-flex items-center gap-2 shadow-lg shadow-[#C85D3A]/25 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Team Member</span>
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          EDITORIAL TEAM PRESENTATION (MAGAZINE PORTRAITS)
          ══════════════════════════════════════════════════ */}
      {!isLoading && team.length > 0 && (
        <div className="space-y-12 sm:space-y-16">
          {team.map((member, index) => {
            const isEven = index % 2 === 1;
            const itemNumber = String(index + 1).padStart(2, '0');
            const isHovered = hoveredMemberId === member.id;

            return (
              <div
                key={member.id}
                onMouseEnter={() => setHoveredMemberId(member.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                className={`relative group rounded-3xl p-6 sm:p-10 transition-all duration-500 border ${
                  isHovered
                    ? 'bg-white dark:bg-[#14120F] border-[#C85D3A]/40 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
                    : 'bg-white/60 dark:bg-[#14120F]/60 border-[#262420]/10 dark:border-[#262420]'
                }`}
              >
                <div
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-8 lg:gap-14`}
                >
                  {/* Portrait Column */}
                  <div className="w-full lg:w-5/12 shrink-0">
                    <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden bg-[#171512] shadow-2xl">
                      {member.photoUrl ? (
                        <Image
                          src={member.photoUrl}
                          alt={member.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 400px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[#8C8479] space-y-2 p-6 text-center">
                          <ImageIcon className="w-10 h-10 stroke-1" />
                          <span className="text-xs font-mono">No portrait uploaded</span>
                        </div>
                      )}

                      {/* Subtle Editorial Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 pointer-events-none" />

                      {/* Number Stamp */}
                      <span className="absolute top-4 left-4 text-xs font-mono tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        PORTRAIT {itemNumber}
                      </span>

                      {/* Status Tag */}
                      <span
                        className={`absolute bottom-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          member.isActive
                            ? 'bg-[#174E48] text-[#D4A467] border border-[#174E48]'
                            : 'bg-black/70 text-[#8C8479]'
                        }`}
                      >
                        {member.isActive ? 'Active on Web' : 'Hidden / Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Editorial Details Column */}
                  <div className="w-full lg:w-7/12 space-y-6">
                    {/* Index & Line Draw Indicator */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-[#C85D3A] font-bold">
                        /{itemNumber}
                      </span>
                      <div
                        className={`h-px bg-[#C85D3A] transition-all duration-500 ${
                          isHovered ? 'w-16' : 'w-8'
                        }`}
                      />
                      <span className="text-[11px] font-mono tracking-[0.2em] text-[#8C8479] uppercase">
                        {member.role || 'Trip Specialist'}
                      </span>
                    </div>

                    {/* Member Name */}
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#171512] dark:text-[#F5EFE6] tracking-tight">
                        {member.name || 'Unnamed Specialist'}
                      </h2>
                      <span className="text-xs font-mono text-[#C85D3A] block">
                        {member.role || 'Route Curator & Concierge'}
                      </span>
                    </div>

                    {/* Short Bio / Introduction */}
                    <p className="text-sm sm:text-base text-[#6D665E] dark:text-[#B8B0A4] font-light leading-relaxed font-sans">
                      {member.bio ||
                        'Crafting thoughtful, unhurried journeys planned around quiet boutique stays and private chauffeurs.'}
                    </p>

                    {/* Direct Contact Details */}
                    {(member.phone || member.email) && (
                      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#8C8479]">
                        {member.phone && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#262420]/10 dark:border-[#262420]">
                            <Phone className="w-3.5 h-3.5 text-[#C85D3A]" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                        {member.email && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#262420]/10 dark:border-[#262420]">
                            <Mail className="w-3.5 h-3.5 text-[#C85D3A]" />
                            <span>{member.email}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions Bar: Reorder & Edit / Delete */}
                    <div className="pt-6 border-t border-[#262420]/10 dark:border-[#262420] flex flex-wrap items-center justify-between gap-4">
                      {/* Move Up / Down Reorder */}
                      <div className="flex items-center gap-2 text-xs font-mono text-[#8C8479]">
                        <span className="uppercase text-[10px] tracking-wider">Position:</span>
                        <span className="font-bold text-[#171512] dark:text-white">#{member.displayOrder}</span>
                        <div className="flex items-center gap-1 ml-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMove(index, 'up')}
                            className="p-1.5 rounded-lg border border-[#262420]/15 dark:border-[#262420] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-20 cursor-pointer"
                            title="Move Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === team.length - 1}
                            onClick={() => handleMove(index, 'down')}
                            className="p-1.5 rounded-lg border border-[#262420]/15 dark:border-[#262420] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-20 cursor-pointer"
                            title="Move Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Edit & Delete Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMember(member);
                            setIsCreatingNew(false);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white border border-[#262420]/15 dark:border-[#262420] text-xs font-mono font-bold uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Profile</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setMemberToDelete({ id: member.id, name: member.name || 'this specialist' })}
                          className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          SIDE PANEL: EDIT / ADD TEAM MEMBER
          ══════════════════════════════════════════════════ */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setEditingMember(null);
              setIsCreatingNew(false);
            }}
          />

          <div className="relative z-10 w-full max-w-lg bg-[#FAF7F2] dark:bg-[#14120F] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#262420]/20 dark:border-[#262420]">
            <form onSubmit={handleSaveMember} className="flex-1 flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#262420]/15 dark:border-[#262420]">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#C85D3A] uppercase font-bold">
                      {isCreatingNew ? 'NEW PROFILE' : 'EDIT PROFILE'}
                    </span>
                    <h2 className="text-xl font-serif text-[#171512] dark:text-white">
                      {isCreatingNew ? 'Add Team Specialist' : editingMember.name || 'Edit Member'}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMember(null);
                      setIsCreatingNew(false);
                    }}
                    className="p-2 rounded-xl text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-5 text-xs font-mono">
                  {/* Photo Selection */}
                  <div className="space-y-2">
                    <label className="text-[#8C8479] uppercase block font-bold">
                      Magazine Portrait Photo
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {editingMember.photoUrl ? (
                        <>
                          <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-black/10 border border-black/10 dark:border-white/10 shrink-0 shadow-inner">
                            <Image
                              src={editingMember.photoUrl}
                              alt={editingMember.name || 'Portrait'}
                              fill
                              sizes="100px"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                            <span className="absolute bottom-1 left-1.5 right-1.5 text-[8px] font-mono text-center text-white/90 uppercase font-bold tracking-wider">
                              CURRENT
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setIsMediaPickerOpen(true)}
                                className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#262420] text-[#C85D3A] font-bold text-xs hover:bg-[#C85D3A] hover:text-white flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                              >
                                <ImageIcon className="w-4 h-4" />
                                <span>Replace Image</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setIsConfirmingRemovePhoto(true)}
                                className="px-3.5 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 text-xs font-mono font-bold transition-colors cursor-pointer"
                              >
                                <span>Remove Image</span>
                              </button>
                            </div>
                            <span className="text-[10px] text-[#8C8479] block">
                              3:4 aspect ratio recommended
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => setIsMediaPickerOpen(true)}
                            className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#262420] text-[#C85D3A] font-bold text-xs hover:bg-[#C85D3A] hover:text-white flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Photo</span>
                          </button>
                          <span className="text-[10px] text-[#8C8479] block">
                            Optional. If omitted, profile displays in clean typography format.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                      Name
                    </label>
                    <p className="text-[10px] text-[#8C8479] mb-1.5">
                      How should this person appear on the website?
                    </p>
                    <input
                      type="text"
                      required
                      value={editingMember.name}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, name: e.target.value })
                      }
                      placeholder="e.g. Yashi Singh"
                      className="w-full p-3 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                      Role / Title
                    </label>
                    <p className="text-[10px] text-[#8C8479] mb-1.5">
                      e.g. Travel Specialist, Route Curator, Kashmir Concierge
                    </p>
                    <input
                      type="text"
                      required
                      value={editingMember.role}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, role: e.target.value })
                      }
                      placeholder="e.g. Founder & Route Curator"
                      className="w-full p-3 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  {/* Short Bio */}
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                      Short Introduction
                    </label>
                    <p className="text-[10px] text-[#8C8479] mb-1.5">
                      Tell travellers a little about them.
                    </p>
                    <textarea
                      rows={3}
                      value={editingMember.bio}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, bio: e.target.value })
                      }
                      placeholder="Specializes in quiet Himalayan escapes, bespoke boutique stays, and slow pacing..."
                      className="w-full p-3 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs leading-relaxed outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  {/* Direct Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#8C8479] uppercase block mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="text"
                        value={editingMember.phone || ''}
                        onChange={(e) =>
                          setEditingMember({ ...editingMember, phone: e.target.value })
                        }
                        placeholder="+91 99580..."
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[#8C8479] uppercase block mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={editingMember.email || ''}
                        onChange={(e) =>
                          setEditingMember({ ...editingMember, email: e.target.value })
                        }
                        placeholder="hello@tripkario.com"
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Status & Display Order */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[#8C8479] uppercase block mb-1">
                        Website Visibility
                      </label>
                      <select
                        value={editingMember.isActive ? 'active' : 'inactive'}
                        onChange={(e) =>
                          setEditingMember({
                            ...editingMember,
                            isActive: e.target.value === 'active',
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white text-xs cursor-pointer"
                      >
                        <option value="active">Active (Visible)</option>
                        <option value="inactive">Hidden (Draft)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[#8C8479] uppercase block mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={editingMember.displayOrder}
                        onChange={(e) =>
                          setEditingMember({
                            ...editingMember,
                            displayOrder: Number(e.target.value),
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-6 border-t border-[#262420]/15 dark:border-[#262420] flex items-center justify-between bg-white dark:bg-[#11100E]">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMember(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saveStatus === 'saving'}
                  className="px-6 py-3 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-[#C85D3A]/25 cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          MEDIA PICKER MODAL (PHOTO SELECTION)
          ══════════════════════════════════════════════════ */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => {
          if (editingMember) {
            setEditingMember({ ...editingMember, photoUrl: url });
          }
        }}
        categoryFilter="Team"
        title="Select Specialist Portrait"
      />

      {/* ══════════════════════════════════════════════════
          DELETE MEMBER CONFIRMATION MODAL
          ══════════════════════════════════════════════════ */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] dark:bg-[#1C1916] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E5DFD5] dark:border-[#262420] shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-[#171512] dark:text-white">
                Remove Team Member?
              </h3>
              <p className="text-xs font-mono text-[#8C8479] leading-relaxed">
                Are you sure you want to remove <span className="text-[#171512] dark:text-white font-bold">{memberToDelete.name}</span> from the team directory?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                className="px-5 py-2.5 rounded-xl border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-mono font-bold uppercase transition-all shadow-md cursor-pointer"
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          REMOVE PHOTO CONFIRMATION MODAL
          ══════════════════════════════════════════════════ */}
      {isConfirmingRemovePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] dark:bg-[#1C1916] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E5DFD5] dark:border-[#262420] shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-[#171512] dark:text-white">
                Remove Member&apos;s Photo?
              </h3>
              <p className="text-xs font-mono text-[#8C8479] leading-relaxed">
                The member will remain active in the directory and will be displayed in an elegant typography-only layout.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmingRemovePhoto(false)}
                className="px-5 py-2.5 rounded-xl border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (editingMember) {
                    setEditingMember({ ...editingMember, photoUrl: '' });
                  }
                  setIsConfirmingRemovePhoto(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-mono font-bold uppercase transition-all shadow-md cursor-pointer"
              >
                Remove Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
