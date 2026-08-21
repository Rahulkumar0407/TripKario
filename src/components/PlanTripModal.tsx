'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, MapPin, Calendar, Users, Wallet, FileText, User, Phone, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { openWhatsApp } from '@/lib/whatsapp';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export default function PlanTripModal({
  isOpen,
  onClose,
  initialDestination = '',
}: PlanTripModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(initialDestination);
  const [duration, setDuration] = useState('5–7 Days');
  const [travellerCount, setTravellerCount] = useState('2 Adults');
  const [budget, setBudget] = useState('₹25,000–₹40,000 / person');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    }
  }, [initialDestination]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!phone.trim()) {
      alert('Please enter your WhatsApp/phone number');
      return;
    }

    setIsSubmitting(true);

    const messageLines = [
      "Hello TripKario! I'd like help planning a custom trip.\n",
      `Destination:\n${destination.trim() || 'Flexible across India'}`,
      duration.trim() ? `Duration:\n${duration.trim()}` : null,
      travellerCount.trim() ? `Travellers:\n${travellerCount.trim()}` : null,
      budget.trim() ? `Budget:\n${budget.trim()}` : null,
      `Name:\n${name.trim()}`,
      `Phone:\n${phone.trim()}`,
      notes.trim() ? `Additional requirements:\n${notes.trim()}` : null,
      '\nPlease help me plan this custom journey with verified stays and private chauffeur transport.'
    ].filter(Boolean).join('\n\n');

    openWhatsApp(messageLines, true);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xl">
        <DialogHeader className="pb-3 border-b border-[var(--border-subtle)]">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C85D3A] dark:text-[#E16A43] font-bold block">
            CUSTOM TRIP PLANNER
          </span>
          <DialogTitle className="text-2xl font-serif font-bold text-[#171512] dark:text-[#F5EFE6] mt-0.5">
            Plan your custom trip
          </DialogTitle>
          <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">
            Tell us where and how you want to travel. We&apos;ll craft a personalized itinerary with verified boutique stays and private transport.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1">
                <User className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
                <span>Your Name *</span>
              </label>
              <Input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1">
                <Phone className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
                <span>WhatsApp / Phone *</span>
              </label>
              <Input
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
              <span>Destination *</span>
            </label>
            <Input
              placeholder="e.g. Kashmir, Rajasthan, Kerala, Meghalaya, Ladakh"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
                <span>Trip Duration</span>
              </label>
              <Input
                placeholder="e.g. 5 Nights / 6 Days"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1">
                <Users className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
                <span>Travellers</span>
              </label>
              <Input
                placeholder="e.g. 2 Adults, 1 Child"
                value={travellerCount}
                onChange={(e) => setTravellerCount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1">
              <Wallet className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
              <span>Approximate Budget / Person</span>
            </label>
            <Input
              placeholder="e.g. ₹25,000 / person"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1">
              <FileText className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
              <span>Preferences, Dates or Stays</span>
            </label>
            <Textarea
              placeholder="Preferred travel dates, heritage stays, quiet mornings, pacing preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Opening WhatsApp...' : 'Chat on WhatsApp →'}</span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
