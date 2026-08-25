import React from 'react';
import { initialTimeline } from '../data/weddingData';
import { Sparkles, MapPin } from 'lucide-react';

export default function JourneyTimeline() {
  return (
    <section id="journey" className="py-24 bg-champagne-light dark:bg-charcoal-dark text-charcoal dark:text-ivory transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
            SECTION 02 • OUR MILESTONES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal dark:text-ivory">
            The Journey to Forever
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-charcoal-muted dark:text-ivory/70 font-light">
            Every love story is beautiful, but ours is our absolute favorite chapter.
          </p>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
        </div>

        {/* Vertical Timeline Grid */}
        <div className="relative border-l-2 border-gold/30 ml-4 sm:ml-32 pl-6 sm:pl-12 space-y-16">
          {initialTimeline.map((item, index) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot Marker */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-6 h-6 rounded-full bg-ivory dark:bg-charcoal border-2 border-gold flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-gold-glow">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>

              {/* Date Badge (Left floating on desktop) */}
              <div className="sm:absolute sm:-left-44 sm:top-1 text-xs tracking-widest uppercase font-semibold text-gold mb-2 sm:mb-0 sm:w-32 sm:text-right">
                {item.year}
              </div>

              {/* Main Card Container */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-ivory/80 dark:bg-charcoal-light/60 border border-gold/20 shadow-luxury hover:shadow-luxury-hover transition-all duration-500">
                {/* Image Preview */}
                <div className="md:col-span-5 rounded-xl overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Text Content */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gold uppercase tracking-wider font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal dark:text-ivory">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal-muted dark:text-ivory/80 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
