'use client';

import React, { useState } from 'react';
import { Sparkles, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
        <DialogHeader>
          <Badge variant="secondary" className="w-fit mb-1">
            Custom Trip Plan
          </Badge>
          <DialogTitle className="text-xl">
            {submitted ? 'Request Received' : 'Plan your trip'}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-serif font-medium mb-1">We are on it!</h4>
            <p className="text-xs text-[var(--text-secondary)] mb-6 max-w-sm mx-auto">
              Our travel specialist is preparing a customized day-by-day plan. Connect on WhatsApp for instant assistance.
            </p>
            <Button
              variant="saffron"
              onClick={handleWhatsAppHandoff}
              className="w-full gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Continue on WhatsApp →</span>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Where do you want to go?
              </label>
              <Input
                placeholder="e.g. Kashmir, Rajasthan, Kerala, Meghalaya, Ladakh"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                  Trip Duration
                </label>
                <Input
                  placeholder="e.g. 5 Nights / 6 Days"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                  Travellers
                </label>
                <Input
                  placeholder="e.g. 2 Adults, 1 Child"
                  value={travellerCount}
                  onChange={(e) => setTravellerCount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Approximate Budget / Person
              </label>
              <Input
                placeholder="e.g. ₹25,000 / person"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Any specific preferences or dates?
              </label>
              <Textarea
                placeholder="Preferred stays, quiet mornings, scenic breaks..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <Button
                type="button"
                variant="saffron"
                onClick={handleWhatsAppHandoff}
                className="flex-1 gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </Button>

              <Button
                type="submit"
                variant="default"
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
