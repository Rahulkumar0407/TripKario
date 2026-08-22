'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Compass, ShieldCheck, HeartHandshake, Sparkles, Phone, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TravelChatbot from '@/components/TravelChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import PlanTripModal from '@/components/PlanTripModal';
import { TeamMember, loadClientTeamMembers } from '@/lib/team';

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  useEffect(() => {
    setMembers(loadClientTeamMembers());

    const handleTeamUpdate = () => {
      setMembers(loadClientTeamMembers());
    };

    window.addEventListener('storage', handleTeamUpdate);
    window.addEventListener('tripkario-team-updated', handleTeamUpdate);

    return () => {
      window.removeEventListener('storage', handleTeamUpdate);
      window.removeEventListener('tripkario-team-updated', handleTeamUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col selection:bg-[var(--accent)] selection:text-white transition-colors duration-700">
      {/* Floating Navbar */}
      <Navbar onOpenPlanTrip={() => setIsPlanModalOpen(true)} />

      <main className="pt-24 sm:pt-32 pb-24 md:pb-32 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-12 sm:space-y-16">
          {/* ── 01. Editorial Team Hero ──────────────────────────────────────── */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent)] shadow-xs">
              <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>TripKario Curators & Specialists</span>
              <span className="opacity-40">·</span>
              <span className="font-bold text-[var(--text-primary)]">
                Our Collective
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] leading-[1.02] tracking-tight">
              The people behind the{' '}
              <span className="italic font-normal text-[var(--accent)]">
                journeys.
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-normal max-w-2xl leading-relaxed">
              A dedicated team of route curators, high-altitude specialists, and on-ground hospitality hosts who turn ambitious travel ideas into effortless memories.
            </p>
          </div>

          {/* ── 02. Editorial Philosophy Statement ────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-[var(--border-subtle)] text-xs font-mono">
            <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--accent)] font-semibold">
                <Compass className="w-4 h-4" />
                <span>On-Ground Discovery</span>
              </div>
              <p className="text-[var(--text-muted)] font-sans text-xs leading-relaxed">
                We travel every route personally, vetting boutique stays, tea stops, and vehicle safety before recommending them to families.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--accent)] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Partners</span>
              </div>
              <p className="text-[var(--text-muted)] font-sans text-xs leading-relaxed">
                Long-standing direct relationships with trusted local chauffeurs, mountain guides, and heritage property owners.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--accent)] font-semibold">
                <HeartHandshake className="w-4 h-4" />
                <span>Human Support</span>
              </div>
              <p className="text-[var(--text-muted)] font-sans text-xs leading-relaxed">
                Direct WhatsApp assistance with your dedicated travel specialist before and throughout your journey.
              </p>
            </div>
          </div>

          {/* ── 03. Editorial Team Grid / Asymmetric Layout ──────────────────── */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold">
                Team Directory ({members.length})
              </span>
              <span className="text-[11px] font-mono text-[var(--accent)]">
                TripKario.com
              </span>
            </div>

            {members.length === 0 ? (
              /* Empty State (0 Fake / Mock Fallbacks) */
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-10 sm:p-14 text-center space-y-4 max-w-lg mx-auto shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-serif font-medium text-[var(--text-primary)]">
                    The people behind the journeys.
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    Our specialist team profiles will appear here once published from the admin console.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/itineraries"
                    className="inline-block px-5 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-medium hover:opacity-90 transition-all shadow-xs"
                  >
                    Browse Travel Itineraries
                  </Link>
                </div>
              </div>
            ) : (
              /* Dynamic Team Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {members.map((member) => {
                  const hasPhoto = Boolean(member.photoUrl && member.photoUrl.trim() !== '');

                  return (
                    <div
                      key={member.id}
                      className="group rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Box if Photo Exists */}
                      {hasPhoto ? (
                        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/20 shrink-0">
                          <Image
                            src={member.photoUrl!}
                            alt={`${member.name} — ${member.role}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-104 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                          <div className="absolute bottom-3.5 left-4 right-4 text-white pointer-events-none z-10">
                            <h3 className="text-xl font-serif font-medium text-white drop-shadow-sm">
                              {member.name}
                            </h3>
                            <span className="text-xs font-mono text-[#FFAA70] block mt-0.5">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Pure Typography-Only Editorial Header for Image-less Members (Zero Placeholder Icons / Zero Empty Boxes) */
                        <div className="p-6 sm:p-7 bg-[var(--bg-surface-2)] border-b border-[var(--border-subtle)] space-y-3 shrink-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-bold px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                              Specialist
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-2xl font-serif font-normal text-[var(--text-primary)]">
                              {member.name}
                            </h3>
                            <p className="text-xs font-mono text-[var(--accent)] font-medium">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Member Details Body */}
                      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between bg-[var(--bg-surface)]">
                        {member.bio ? (
                          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                            {member.bio}
                          </p>
                        ) : (
                          <p className="text-xs text-[var(--text-muted)] font-sans italic">
                            Dedicated travel specialist at TripKario.
                          </p>
                        )}

                        {(member.phone || member.email) && (
                          <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-3 text-[11px] font-mono text-[var(--text-muted)]">
                            {member.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[var(--accent)]" />
                                <span>{member.phone}</span>
                              </span>
                            )}
                            {member.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[var(--accent)]" />
                                <span>{member.email}</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── 04. Connect With Our Curators CTA ────────────────────────────── */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Human Assistance</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[var(--text-primary)]">
                Have an idea for a trip?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-normal leading-relaxed">
                Tell us where you want to travel. Our team will prepare a day-by-day pacing draft with verified stays and private transport within 24 hours.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(true)}
                className="px-7 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 touch-manipulation cursor-pointer"
              >
                Plan My Journey
              </button>
              <Link
                href="/itineraries"
                className="px-7 py-3 rounded-full border border-[var(--border-card)] hover:border-[var(--accent)] bg-[var(--bg-surface)] text-xs font-mono font-bold tracking-wider uppercase text-[var(--text-primary)] transition-all active:scale-95 touch-manipulation"
              >
                Explore Itineraries
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Plan Trip Modal */}
      <PlanTripModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />

      {/* Footer */}
      <Footer />

      {/* Floating Chatbot & WhatsApp */}
      <TravelChatbot />
      <WhatsAppButton />
    </div>
  );
}
