'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Compass,
  Users,
  Heart,
  User,
  Palmtree,
  Mountain,
  Sparkles,
  ArrowRight,
  RotateCcw,
  MessageCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

interface TripMatcherProps {
  onSelectTrip: (destination: string) => void;
}

export default function TripMatcher({ onSelectTrip }: TripMatcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [companion, setCompanion] = useState('');
  const [mood, setMood] = useState('');
  const [budget, setBudget] = useState('');

  const companionOptions = [
    { id: 'Partner', label: 'Partner', icon: Heart, desc: 'Romantic & scenic' },
    { id: 'Family', label: 'Family', icon: Users, desc: 'Comfortable & guided' },
    { id: 'Friends', label: 'Friends', icon: Palmtree, desc: 'High energy & fun' },
    { id: 'Solo', label: 'Solo', icon: User, desc: 'Self-paced discovery' },
  ];

  const moodOptions = [
    { id: 'Mountains', label: 'Mountains', icon: Mountain, desc: 'Alpine serenity & peaks' },
    { id: 'Beach', label: 'Beach', icon: Palmtree, desc: 'Sun, sand & coastal breeze' },
    { id: 'Adventure', label: 'Adventure', icon: Compass, desc: 'High passes & river rafting' },
    { id: 'Culture', label: 'Culture', icon: Sparkles, desc: 'Royal forts & desert dunes' },
    { id: 'Relax', label: 'Relax', icon: Heart, desc: 'Backwaters & tea estates' },
  ];

  const budgetOptions = [
    { id: 'Under 15K', label: 'Under ₹15K / person', tag: 'Great Value' },
    { id: '15K-30K', label: '₹15K–₹30K / person', tag: 'Most Popular' },
    { id: '30K-50K', label: '₹30K–₹50K / person', tag: 'Premium' },
    { id: '50K+', label: '₹50K+ / person', tag: 'Luxury Bespoke' },
  ];

  const getRecommendation = () => {
    if (mood === 'Mountains' || companion === 'Partner') {
      return {
        destination: 'Kashmir',
        headline: "We have a feeling you'll like Kashmir.",
        reason: 'Misty mornings, mountain roads and absolutely no reason to check your work email.',
        price: '₹24,999',
        image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop',
      };
    }
    if (mood === 'Beach') {
      return {
        destination: 'Goa',
        headline: "We have a feeling you'll like Goa.",
        reason: 'Portuguese heritage villas, quiet south beaches, and sunset catamaran sails.',
        price: '₹9,999',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
      };
    }
    if (mood === 'Culture' || companion === 'Family') {
      return {
        destination: 'Rajasthan',
        headline: "We have a feeling you'll like Rajasthan.",
        reason: 'Majestic hill fortresses, candlelit desert dinners, and effortless private chauffeur transport.',
        price: '₹19,999',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
      };
    }
    return {
      destination: 'Himachal',
      headline: "We have a feeling you'll like Himachal.",
      reason: 'Pine-scented high passes, serene monastery towns, and crisp mountain streams.',
      price: '₹14,999',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
    };
  };

  const handleReset = () => {
    setStep(1);
    setCompanion('');
    setMood('');
    setBudget('');
  };

  const recommendation = getRecommendation();

  return (
    <section className="py-20 md:py-28 bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="bg-[var(--bg-surface)] p-8 sm:p-12 md:p-16 rounded-2xl border border-[var(--border-card)] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--accent)] font-semibold block">
              Recommendation Flow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[var(--text-primary)]">
              Not sure where to go?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal">
              Tell us a little. We&apos;ll do the overthinking.
            </p>
          </div>

          <div>
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                setIsOpen(true);
                handleReset();
              }}
              data-cursor="CLICK"
              className="gap-2.5"
            >
              <span>Help me choose →</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog Experience */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl p-6 sm:p-8 bg-[var(--bg-surface)] border border-[var(--border-card)]">
          <DialogHeader>
            <span className="text-[10.5px] font-mono uppercase text-[var(--accent)] font-semibold tracking-wider block">
              {step <= 3 ? `Step 0${step} of 03` : 'Your Result'}
            </span>
            <DialogTitle className="text-xl sm:text-2xl font-serif font-normal">
              {step === 1 && 'Who are you travelling with?'}
              {step === 2 && "What's your vibe?"}
              {step === 3 && 'Budget per person?'}
              {step === 4 && recommendation.headline}
            </DialogTitle>
          </DialogHeader>

          <div className="pt-3">
            {/* Question 1: Who are you travelling with? */}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-3">
                {companionOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setCompanion(opt.id);
                        setStep(2);
                      }}
                      className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] hover:border-[var(--accent)] transition-all text-left cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] text-[var(--accent)] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-[var(--text-primary)] block">
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">{opt.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Question 2: What's your vibe? */}
            {step === 2 && (
              <div className="space-y-2.5">
                {moodOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setMood(opt.id);
                        setStep(3);
                      }}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] hover:border-[var(--accent)] transition-all text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] text-[var(--accent)] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-[var(--text-primary)] block">
                            {opt.label}
                          </span>
                          <span className="text-[10.5px] text-[var(--text-muted)]">{opt.desc}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Question 3: Budget? */}
            {step === 3 && (
              <div className="space-y-2.5">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setBudget(opt.id);
                      setStep(4);
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] hover:border-[var(--accent)] transition-all text-left cursor-pointer"
                  >
                    <div>
                      <span className="font-semibold text-xs text-[var(--text-primary)] block">
                        {opt.label}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--accent)] font-semibold uppercase">
                        {opt.tag}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Result */}
            {step === 4 && (
              <div>
                <Card className="overflow-hidden border border-[var(--border-card)] mb-5 bg-[var(--bg-surface-2)]">
                  <div className="relative h-44 w-full bg-black/5">
                    <Image
                      src={recommendation.image}
                      alt={recommendation.destination}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h4 className="text-xl font-serif">{recommendation.destination}</h4>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 font-normal">
                      &ldquo;{recommendation.reason}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[var(--border-subtle)]">
                      <span className="text-[var(--text-muted)]">Starting Price:</span>
                      <span className="font-bold text-[var(--accent)] text-sm">
                        From {recommendation.price} / person
                      </span>
                    </div>
                  </div>
                </Card>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsOpen(false);
                      onSelectTrip(recommendation.destination);
                    }}
                    className="flex-1 gap-2"
                  >
                    <span>See {recommendation.destination} trips →</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      openWhatsApp(`Hi TripKario! The recommendation helper suggested ${recommendation.destination}. Please share package availability.`);
                    }}
                    className="gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </Button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 w-full text-center text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Start Over</span>
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
