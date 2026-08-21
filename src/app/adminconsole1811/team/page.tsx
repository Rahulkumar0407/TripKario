'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialTeamMembers, SeedTeamMember } from '@/lib/admin/seedData';
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
} from 'lucide-react';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<SeedTeamMember[]>(initialTeamMembers);
  const [editingMember, setEditingMember] = useState<SeedTeamMember | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const handleAddNew = () => {
    const newMember: SeedTeamMember = {
      id: `team-${Date.now()}`,
      name: 'New Specialist',
      role: 'Trip Specialist',
      bio: 'Deep local knowledge of Himalayan routes, offbeat tea gardens, and boutique homestays.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=85&w=600&auto=format&fit=crop',
      phone: '+91 99580 34778',
      email: 'specialist@tripkario.com',
      displayOrder: team.length + 1,
      isActive: true,
    };
    setTeam([...team, newMember]);
    setEditingMember(newMember);
  };

  const handleSave = (saved: SeedTeamMember) => {
    setTeam((prev) => prev.map((m) => (m.id === saved.id ? saved : m)));
    setEditingMember(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      setTeam((prev) => prev.filter((m) => m.id !== id));
      if (editingMember?.id === id) setEditingMember(null);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= team.length) return;

    const list = [...team];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const reordered = list.map((m, idx) => ({ ...m, displayOrder: idx + 1 }));
    setTeam(reordered);
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            HUMAN SPECIALISTS & CONCIERGES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Team Members ({team.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Manage your team of travel curators, guides, and route specialists.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((member, idx) => (
          <div
            key={member.id}
            className={`rounded-3xl bg-white dark:bg-[#14120F] border overflow-hidden shadow-sm flex flex-col justify-between transition-all ${
              member.isActive
                ? 'border-[#E5DFD5] dark:border-[#262420]'
                : 'border-black/10 opacity-60'
            }`}
          >
            <div className="p-5 flex items-start gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black/10 shrink-0 border border-black/5 dark:border-white/10">
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#C85D3A] uppercase font-bold tracking-wider">
                    {member.role}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                      member.isActive
                        ? 'bg-[#174E48]/15 text-[#174E48] dark:text-[#D4A467]'
                        : 'bg-black/10 text-[#8C8479]'
                    }`}
                  >
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#171512] dark:text-white truncate">
                  {member.name}
                </h3>

                <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] line-clamp-2 leading-relaxed font-normal">
                  {member.bio}
                </p>

                {(member.phone || member.email) && (
                  <div className="pt-1 text-[11px] font-mono text-[#8C8479] space-y-0.5">
                    {member.phone && <div>{member.phone}</div>}
                    {member.email && <div className="truncate">{member.email}</div>}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Bar with Reorder & Edit */}
            <div className="px-5 py-3 border-t border-[#E5DFD5] dark:border-[#262420] bg-[#FAF7F2]/50 dark:bg-[#11100E]/50 flex items-center justify-between">
              {/* Order & Move buttons */}
              <div className="flex items-center gap-1 text-xs font-mono text-[#8C8479]">
                <span className="font-bold">#{member.displayOrder}</span>
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30"
                  title="Move Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === team.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(member)}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#1C1916] hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold uppercase transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(member.id)}
                  className="p-1.5 rounded-xl text-red-500 hover:bg-red-500/10"
                  title="Delete Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Member Drawer */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingMember(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#14120F] h-full p-6 sm:p-7 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E5DFD5] dark:border-[#262420]">
            <div className="space-y-5 text-xs font-mono">
              <div className="flex justify-between items-center pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
                <div>
                  <span className="text-[10px] font-mono text-[#C85D3A] uppercase font-bold">
                    TEAM EDITOR
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#171512] dark:text-white">
                    {editingMember.name || 'Edit Team Member'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="p-1.5 rounded-xl text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo selection */}
              <div className="space-y-2">
                <label className="text-[#8C8479] uppercase block font-bold">Member Photo</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black/10 border border-black/5 dark:border-white/10 shrink-0">
                    <Image
                      src={editingMember.photoUrl}
                      alt={editingMember.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#262420] text-[#C85D3A] font-bold text-xs hover:bg-[#FAF7F2]/80 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Change Photo</span>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs font-sans font-bold"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">Role / Title</label>
                <input
                  type="text"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  placeholder="e.g. Route Curator, Kashmir Specialist"
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs font-sans"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">Short Bio</label>
                <textarea
                  rows={3}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  placeholder="Brief description of their expertise..."
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs font-sans leading-relaxed"
                />
              </div>

              {/* Optional Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Phone (Optional)</label>
                  <input
                    type="text"
                    value={editingMember.phone || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                    placeholder="+91 99580..."
                    className="w-full p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={editingMember.email || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    placeholder="name@tripkario.com"
                    className="w-full p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* Active Toggle & Order */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Status</label>
                  <select
                    value={editingMember.isActive ? 'active' : 'inactive'}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, isActive: e.target.value === 'active' })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingMember.displayOrder}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        displayOrder: Number(e.target.value),
                      })
                    }
                    className="w-full p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase text-[#8C8479] hover:bg-black/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleSave(editingMember)}
                className="px-6 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold uppercase shadow-md shadow-[#C85D3A]/25 cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Member</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => {
          if (editingMember) setEditingMember({ ...editingMember, photoUrl: url });
        }}
        categoryFilter="Team"
        title="Select Team Member Photo"
      />
    </div>
  );
}
