'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { loadClientTeamMembers, TeamMember } from '@/lib/team';

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    setMembers(loadClientTeamMembers());

    fetch('/api/admin/team?active=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.team)) {
          setMembers(data.team);
        }
      })
      .catch(() => {});

    const handleTeamUpdate = () => {
      fetch('/api/admin/team?active=true')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.team)) {
            setMembers(data.team);
          }
        })
        .catch(() => {
          setMembers(loadClientTeamMembers());
        });
    };

    window.addEventListener('storage', handleTeamUpdate);
    window.addEventListener('tripkario-team-updated', handleTeamUpdate);

    return () => {
      window.removeEventListener('storage', handleTeamUpdate);
      window.removeEventListener('tripkario-team-updated', handleTeamUpdate);
    };
  }, []);

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[var(--bg-surface-2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {members.map((member) => (
            <div key={member.id} className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] text-center space-y-3">
              {member.photoUrl ? (
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-black/10">
                  <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
                </div>
              ) : null}
              <div>
                <h4 className="text-base font-serif font-semibold text-[var(--text-primary)]">{member.name}</h4>
                <span className="text-xs font-mono text-[var(--accent)]">{member.role}</span>
              </div>
              {member.bio && (
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
