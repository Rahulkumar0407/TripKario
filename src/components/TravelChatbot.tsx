'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, RotateCcw, MessageSquare, Compass, ArrowLeft, PhoneCall } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '@/data/siteConfig';

interface StepAnswer {
  destination?: string;
  travelCompanion?: string;
  travelTime?: string;
  budget?: string;
  tripVibe?: string;
  helpType?: string;
  unsurePreference?: string;
}

export default function TravelChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<StepAnswer>({});
  const [history, setHistory] = useState<Array<{ sender: 'guide' | 'user'; text: string }>>([
    {
      sender: 'guide',
      text: "Hi! I'm your TripKaro Guide.\n\nTell me a little about your trip and I'll point you in the right direction.",
    },
  ]);

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setHistory([
      {
        sender: 'guide',
        text: "Hi! I'm your TripKaro Guide.\n\nTell me a little about your trip and I'll point you in the right direction.",
      },
    ]);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Helper response for destinations
  const getDestinationResponse = (dest: string) => {
    switch (dest) {
      case 'Kashmir':
        return 'Kashmir is a great pick for lakes, mountains and relaxed days.';
      case 'Ladakh':
        return 'Ladakh is incredible for high mountain passes, clear skies and road trips.';
      case 'Rajasthan':
        return 'Rajasthan is perfect for heritage havelis, desert sunsets and fort walks.';
      case 'Kerala':
        return 'Kerala offers serene backwaters, green hills and peaceful houseboats.';
      case 'Meghalaya':
        return 'Meghalaya is wonderful for living root bridges and crystal-clear rivers.';
      default:
        return 'Great choice. Let us narrow down the plan for you.';
    }
  };

  // Helper response for companions
  const getCompanionResponse = (comp: string) => {
    switch (comp) {
      case 'Family':
        return "Nice. I'll focus on family-friendly options with easy pacing.";
      case 'Partner':
        return 'Lovely. Romantic boutique stays and scenic candlelit evenings.';
      case 'Friends':
        return 'Awesome. We will keep good road trip pacing and fun stops.';
      case 'Just me':
        return 'Solo journeys are the best. Safe, verified stays and scenic routes.';
      default:
        return 'Got it!';
    }
  };

  // Generate dynamic WhatsApp message from answers
  const generateWhatsAppMessage = () => {
    const dest = answers.destination || 'India';
    const comp = answers.travelCompanion ? `${answers.travelCompanion.toLowerCase()} trip` : 'trip';
    const budget = answers.budget || 'standard budget';
    const vibe = answers.tripVibe || 'custom holiday';

    return `Hi TripKario, I'm planning a ${comp} to ${dest}. I'm looking at ${budget} for a ${vibe} vibe, and would like help with a relaxed day-by-day plan.`;
  };

  // Step 1: Destination
  const handleSelectDestination = (dest: string) => {
    if (dest === "I'm not sure yet") {
      setAnswers((prev) => ({ ...prev, destination: "I'm not sure yet" }));
      setHistory((prev) => [
        ...prev,
        { sender: 'user', text: "I'm not sure yet" },
        { sender: 'guide', text: 'No worries at all! What kind of feeling sounds better right now?' },
      ]);
      setCurrentStep(10); // Branch to unsure path
      return;
    }

    const resp = getDestinationResponse(dest);
    setAnswers((prev) => ({ ...prev, destination: dest }));
    setHistory((prev) => [
      ...prev,
      { sender: 'user', text: dest },
      { sender: 'guide', text: resp },
    ]);
    setCurrentStep(1);
  };

  // Branch 10: Unsure Preferences
  const handleSelectUnsure = (pref: string) => {
    setAnswers((prev) => ({ ...prev, destination: 'Curated Region', unsurePreference: pref }));
    setHistory((prev) => [
      ...prev,
      { sender: 'user', text: pref },
      {
        sender: 'guide',
        text: `For ${pref.toLowerCase()}, you will love Kashmir, Kerala, or Himachal. Let's build your plan.`,
      },
    ]);
    setCurrentStep(1);
  };

  // Step 2: Who
  const handleSelectCompanion = (comp: string) => {
    const resp = getCompanionResponse(comp);
    setAnswers((prev) => ({ ...prev, travelCompanion: comp }));
    setHistory((prev) => [
      ...prev,
      { sender: 'user', text: comp },
      { sender: 'guide', text: resp },
    ]);
    setCurrentStep(2);
  };

  // Step 3: When
  const handleSelectTime = (time: string) => {
    setAnswers((prev) => ({ ...prev, travelTime: time }));
    setHistory((prev) => [
      ...prev,
      { sender: 'user', text: time },
      { sender: 'guide', text: 'Got the timing. What budget per person works best?' },
    ]);
    setCurrentStep(3);
  };

  // Step 4: Budget
  const handleSelectBudget = (bud: string) => {
    setAnswers((prev) => ({ ...prev, budget: bud }));
    setHistory((prev) => [
      ...prev,
      { sender: 'user', text: bud },
      { sender: 'guide', text: 'What kind of trip vibe do you want?' },
    ]);
    setCurrentStep(4);
  };

  // Step 5: Vibe
  const handleSelectVibe = (vibe: string) => {
    setAnswers((prev) => ({ ...prev, tripVibe: vibe }));
    setHistory((prev) => [
      ...prev,
      { sender: 'user', text: vibe },
      { sender: 'guide', text: 'What would you like the most help with?' },
    ]);
    setCurrentStep(5);
  };

  // Step 6: Help Type
  const handleSelectHelp = (help: string) => {
    setAnswers((prev) => ({ ...prev, helpType: help }));
    setHistory((prev) => [
      ...prev,
      { sender: 'user', text: help },
      {
        sender: 'guide',
        text: 'Got it. Let’s take this to WhatsApp where our team can send you a day-by-day plan with photos and verified pricing.',
      },
    ]);
    setCurrentStep(6); // Final handoff
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-[#1B4947] text-[#FAF4E8] shadow-2xl flex items-center gap-2.5 border border-white/20 backdrop-blur-md cursor-pointer group"
          aria-label="Open TripKaro Guide"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#EE582C] animate-pulse" />
          <MessageSquare className="w-4 h-4 text-[#FAF4E8]" />
          <span className="text-xs font-mono font-bold tracking-wide">
            {siteConfig.guideName}
          </span>
        </motion.button>
      )}

      {/* Interactive Guide Modal / Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] max-h-[580px] h-[85vh] rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141816] border border-[var(--border-card)] shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Guide Header */}
            <div className="p-4 sm:p-5 bg-[#1B4947] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FAF4E8] text-[#1B4947] flex items-center justify-center font-bold text-xs shadow-sm">
                  <Compass className="w-5 h-5 text-[#EE582C]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">{siteConfig.guideName}</h3>
                  <span className="text-[10px] font-mono text-[#FAF4E8]/80 block">
                    Your TripKario Travel Helper
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2 rounded-xl text-white/80 hover:bg-white/10 transition-colors"
                    title="Start over"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-white/80 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conversation Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {history.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-[#EE582C] text-white rounded-tr-xs font-medium'
                        : 'bg-[var(--bg-surface-2)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Options Choice Bar */}
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 space-y-2 shrink-0">
              {/* Step 0: Destination */}
              {currentStep === 0 && (
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase text-[var(--text-muted)] font-semibold block">
                    Where do you want to go?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Kashmir', 'Ladakh', 'Rajasthan', 'Kerala', 'Meghalaya', "I'm not sure yet"].map(
                      (opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectDestination(opt)}
                          className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[#EE582C] hover:text-white border border-[var(--border-card)] text-xs font-mono font-medium text-left transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Step 10: Unsure Branch */}
              {currentStep === 10 && (
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase text-[var(--text-muted)] font-semibold block">
                    What sounds better right now?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Mountains', 'Beach & Water', 'Nature & Rainforest', 'History & Havelis', 'Food & Cafes', 'Just a Relaxing Break'].map(
                      (opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectUnsure(opt)}
                          className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[#EE582C] hover:text-white border border-[var(--border-card)] text-xs font-mono font-medium text-left transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Who */}
              {currentStep === 1 && (
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase text-[var(--text-muted)] font-semibold block">
                    Who are you travelling with?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Family', 'Partner', 'Friends', 'Just me'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectCompanion(opt)}
                        className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[#EE582C] hover:text-white border border-[var(--border-card)] text-xs font-mono font-medium text-left transition-colors cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: When */}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase text-[var(--text-muted)] font-semibold block">
                    When are you planning to travel?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['This month', 'Next 2–3 months', 'Later this year', "I'm not sure yet"].map(
                      (opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectTime(opt)}
                          className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[#EE582C] hover:text-white border border-[var(--border-card)] text-xs font-mono font-medium text-left transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Budget */}
              {currentStep === 3 && (
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase text-[var(--text-muted)] font-semibold block">
                    How much do you want to spend?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Under ₹15K', '₹15K–₹30K', '₹30K–₹50K', '₹50K+', 'Not sure yet'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectBudget(opt)}
                        className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[#EE582C] hover:text-white border border-[var(--border-card)] text-xs font-mono font-medium text-left transition-colors cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Vibe */}
              {currentStep === 4 && (
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase text-[var(--text-muted)] font-semibold block">
                    What kind of trip do you want?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Relax', 'Adventure', 'Honeymoon', 'Family', 'Friends', 'A bit of everything'].map(
                      (opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectVibe(opt)}
                          className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[#EE582C] hover:text-white border border-[var(--border-card)] text-xs font-mono font-medium text-left transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Help Type */}
              {currentStep === 5 && (
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase text-[var(--text-muted)] font-semibold block">
                    What would you like help with?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Find a trip', 'Make my own trip', 'Ask about a destination', 'Talk to a person'].map(
                      (opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectHelp(opt)}
                          className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[#EE582C] hover:text-white border border-[var(--border-card)] text-xs font-mono font-medium text-left transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Step 6: Final WhatsApp Handoff */}
              {currentStep === 6 && (
                <div className="space-y-2 pt-1">
                  <a
                    href={getWhatsAppLink(generateWhatsAppMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all"
                  >
                    <span>Chat on WhatsApp →</span>
                  </a>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="hover:underline text-[var(--text-primary)]"
                    >
                      Start over
                    </button>
                    <span>Direct human reply in ~5 mins</span>
                  </div>
                </div>
              )}

              {/* Universal Direct Talk Link at Bottom */}
              {currentStep < 6 && (
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="hover:underline flex items-center gap-1 text-[var(--text-primary)]"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <span>~60 second trip helper</span>
                  )}

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#10B981] dark:text-[#34D399] font-bold hover:underline"
                  >
                    Talk to us directly →
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
