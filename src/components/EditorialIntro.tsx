'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

interface EditorialIntroProps {
  onOpenPlanTrip: () => void;
}

export default function EditorialIntro({ onOpenPlanTrip }: EditorialIntroProps) {
  return (
    <section id="introduction" className="py-24 md:py-32 bg-[#FAF8F5] text-[#121316] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[#1E3A2F]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#1E3A2F] font-semibold">
            The Philosophy of Tripkario
          </span>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#121316] leading-[1.12] mb-8"
            >
              Some journeys are planned.{' '}
              <span className="italic font-normal block mt-2 text-[#1E3A2F]">
                The best ones are remembered.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 text-base md:text-lg text-[#121316]/75 font-light leading-relaxed mb-8"
            >
              <p>
                At Tripkario, we believe that true travel is never a standardized checkbox. It is the spontaneous warm cup of noon tea shared with a shepherd in Gulmarg, the golden hour over a 500-year-old Rajasthani fortress, or the quiet ripples of an early morning canoe in the backwaters of Alleppey.
              </p>
              <p>
                We blend meticulous logistical precision with authentic local storytelling — designing hand-tailored journeys that honor your personal pace, curiosity, and comfort.
              </p>
            </motion.div>

            {/* Value Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10 mb-8"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1E3A2F]/10 text-[#1E3A2F] mt-1 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#121316]">Zero Template Trips</h4>
                  <p className="text-xs text-[#121316]/60 mt-0.5">Every itinerary is customized to your exact style.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#D97736]/10 text-[#D97736] mt-1 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#121316]">24/7 Human Concierge</h4>
                  <p className="text-xs text-[#121316]/60 mt-0.5">Real on-ground experts with you at every step.</p>
                </div>
              </div>
            </motion.div>

            {/* Action link */}
            <div>
              <button
                onClick={() => onOpenPlanTrip()}
                data-cursor="PLAN"
                className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-[#121316] group"
              >
                <span className="underline underline-offset-8 decoration-[#D97736] decoration-2 group-hover:text-[#D97736] transition-colors">
                  Meet our trip designers
                </span>
                <ArrowRight className="w-4 h-4 text-[#D97736] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Asymmetric Photo Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1200&auto=format&fit=crop"
                alt="Shikara cutting through morning mist on Dal Lake in Srinagar, Kashmir"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 block">
                  Featured Experience
                </span>
                <p className="text-base font-serif font-light">Sunset Cedar Shikara, Dal Lake</p>
              </div>
            </div>

            {/* Overlapping Small Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -left-6 sm:-left-10 w-48 sm:w-60 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] hidden sm:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop"
                alt="Rajasthan Palace Courtyard"
                fill
                sizes="240px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-xs font-serif">Mewar Heritage, Udaipur</p>
              </div>
            </motion.div>

            {/* Floating Quote Stamp */}
            <div className="absolute -top-6 -right-4 sm:-right-6 bg-[#1E3A2F] text-[#FAF8F5] p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[200px]">
              <Sparkles className="w-5 h-5 text-[#D97736] shrink-0" />
              <p className="text-[11px] font-mono leading-tight">
                Crafted with 10+ years of regional mastery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
