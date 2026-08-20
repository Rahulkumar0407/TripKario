'use client';

import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle2, MapPin, Calendar, Users, Wallet, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { openWhatsApp } from '@/lib/whatsapp';
import { siteConfig } from '@/data/siteConfig';

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
  const [destination, setDestination] = useState(initialDestination);
  const [duration, setDuration] = useState('5–7 Days');
  const [travellerCount, setTravellerCount] = useState('2 Adults');
  const [budget, setBudget] = useState('₹20,000–₹35,000');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppHandoff = () => {
    const text = `Hi TripKario! I would like to plan a custom trip:
• Destination: ${destination || 'Flexible'}
• Duration: ${duration}
• Travellers: ${travellerCount}
• Budget: ${budget}
• Notes: ${notes || 'None'}

Please share availability and a day-by-day plan.`;

    openWhatsApp(text);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-6 sm:p-8">
        <DialogHeader className="pb-2 border-b border-[var(--border-subtle)]">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C85D3A] dark:text-[#E16A43] font-bold block">
            CUSTOM TRIP PLANNER
          </span>
          <DialogTitle className="text-2xl font-serif font-bold text-[#171512] dark:text-[#F5EFE6] mt-0.5">
            {submitted ? 'Request Received' : 'Plan your trip'}
          </DialogTitle>
          <p className="text-xs text-[var(--text-muted)] font-normal">
            Tell us where you want to go. We&apos;ll handle stays, private car, and route pacing.
          </p>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-[#171512] dark:text-white mb-1">
                We&apos;re preparing your plan!
              </h4>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
                Our destination specialist is preparing a customized day-by-day itinerary. Connect on WhatsApp for instant assistance and photos.
              </p>
            </div>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                `Hi TripKario, I just submitted my custom trip request for ${destination || 'India'}. Please share the day-by-day plan!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Continue on WhatsApp →</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#171512] dark:text-[#F5EFE6] font-bold mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
                <span>Where do you want to go?</span>
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
                <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#171512] dark:text-[#F5EFE6] font-bold mb-1.5">
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
                <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#171512] dark:text-[#F5EFE6] font-bold mb-1.5">
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
              <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#171512] dark:text-[#F5EFE6] font-bold mb-1.5">
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
              <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#171512] dark:text-[#F5EFE6] font-bold mb-1.5">
                <FileText className="w-3.5 h-3.5 text-[#C85D3A] dark:text-[#E16A43]" />
                <span>Any specific preferences or dates?</span>
              </label>
              <Textarea
                placeholder="Preferred stays, quiet mornings, scenic breaks, room preferences..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppHandoff}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-md shadow-[#C85D3A]/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
