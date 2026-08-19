'use client';

import React from 'react';
import Image from 'next/image';
import { teamMembers } from '@/data/team';

export default function TeamSection() {
  return (
    <section className="py-20 bg-[var(--bg-surface-2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member) => {
            const avatarSrc = member.avatar || member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';
            return (
              <div key={member.id} className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] text-center space-y-3">
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-black/10">
                  <Image src={avatarSrc} alt={member.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-semibold text-[var(--text-primary)]">{member.name}</h4>
                  <span className="text-xs font-mono text-[var(--accent)]">{member.role}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{member.bio || member.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
