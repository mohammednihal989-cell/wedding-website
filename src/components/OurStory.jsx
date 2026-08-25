import React from 'react';
import { Quote, Heart } from 'lucide-react';

export default function OurStory({ config }) {
  return (
    <section id="story" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
            SECTION 01 • EDITOR'S LETTER
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal dark:text-ivory">
            Two Hearts. One Story.
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
        </div>

        {/* Quote Banner */}
        <div className="relative my-12 p-8 sm:p-12 rounded-2xl bg-champagne/40 dark:bg-charcoal-light/40 border border-gold/20 backdrop-blur-sm text-center max-w-4xl mx-auto shadow-luxury">
          <Quote className="w-10 h-10 text-gold/30 absolute -top-5 left-1/2 -translate-x-1/2 bg-ivory dark:bg-charcoal px-2" />
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-charcoal dark:text-ivory/90 leading-relaxed">
            "{config.welcomeQuote || 'Two souls, two heartbeats, anchored by an unbroken promise made under golden skies.'}"
          </p>
          <p className="mt-4 font-script text-2xl text-gold">
            — {config.groomName} & {config.brideName}
          </p>
        </div>

        {/* Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-16">
          {/* Left Column Image */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-luxury border border-gold/20 aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
                alt="Couple Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-ivory text-xs font-serif italic text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Mumbai • November 2022
              </div>
            </div>
            {/* Floating Decorative Monogram Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex w-24 h-24 rounded-full bg-ivory dark:bg-charcoal border-2 border-gold/40 items-center justify-center font-serif text-3xl text-gold shadow-luxury">
              A&A
            </div>
          </div>

          {/* Right Column Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal dark:text-ivory leading-snug">
              "Some moments are ordinary when they happen, but become unforgettable when we look back."
            </h3>

            <p className="drop-cap text-base sm:text-lg text-charcoal-muted dark:text-ivory/80 leading-relaxed">
              {config.editorialNote ||
                'Welcome to our digital wedding storybook. More than an album, this is our love letter captured in light, emotion, and eternal vows. We invite you to step into our world and experience the magic of our journey.'}
            </p>

            <p className="text-base sm:text-lg text-charcoal-muted dark:text-ivory/80 leading-relaxed font-light">
              From our first quiet conversation on a rainy November evening in Mumbai to standing beneath golden arches in Kerala exchanging vows, every step has been a testament to shared dreams, deep laughter, and unwavering companionship.
            </p>

            <div className="pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-serif text-xl text-gold font-semibold">
                  {config.coupleNames}
                </div>
                <div className="text-xs uppercase tracking-widest text-charcoal-muted dark:text-ivory/60">
                  {config.weddingDate} • {config.location}
                </div>
              </div>
              <div className="flex items-center gap-2 text-gold">
                <Heart className="w-5 h-5 fill-gold/20" />
                <span className="font-script text-2xl">With Love</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
