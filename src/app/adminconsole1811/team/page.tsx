'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialTeamMembers, SeedTeamMember } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

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
    setTeam((prev) => prev.filter((m) => m.id !== id));
    if (editingMember?.id === id) setEditingMember(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            HUMAN EXPERTS & CONCIERGES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Team Members ({team.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Meet the specialist human planners behind TripKario customized circuits.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="rounded-3xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-[#E8DED0] dark:bg-[#1A1815]">
              <Image src={member.photoUrl} alt={member.name} fill sizes="250px" className="object-cover" />
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#C85D3A] uppercase font-bold block">
                  {member.role}
                </span>
                <h3 className="text-base font-bold text-[#171512] dark:text-white">{member.name}</h3>
                <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] line-clamp-2 mt-1">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingMember(member)}
                  className="px-3 py-1 rounded-xl bg-[#FAF7F2] dark:bg-white/5 hover:bg-[#C85D3A] hover:text-white text-xs font-mono font-bold uppercase transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(member.id)}
                  className="p-1 rounded-xl text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60" onClick={() => setEditingMember(null)} />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#14120F] h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5] dark:border-[#262420]">
                <h2 className="text-base font-bold text-[#171512] dark:text-white">Edit Team Member</h2>
                <button onClick={() => setEditingMember(null)}><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-1">
                <label className="text-[#8C8479] uppercase block">Specialist Photo</label>
                <div className="relative w-32 aspect-square rounded-2xl overflow-hidden bg-black/10 mx-auto">
                  <Image src={editingMember.photoUrl} alt={editingMember.name} fill sizes="150px" className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="w-full py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] text-[#C85D3A] font-bold mt-1"
                >
                  Change Photo from Media Library
                </button>
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Name</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Role</label>
                <input
                  type="text"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Short Bio</label>
                <textarea
                  rows={3}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262420] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleSave(editingMember)}
                className="px-5 py-2 rounded-xl bg-[#174E48] text-white text-xs font-mono font-bold uppercase"
              >
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => {
          if (editingMember) setEditingMember({ ...editingMember, photoUrl: url });
        }}
        categoryFilter="Team"
      />
    </div>
  );
}
