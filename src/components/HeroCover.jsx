import React from 'react';
import { ChevronDown, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function HeroCover({ config }) {
  return (
    <section
      id="cover"
      className="relative w-full min-h-screen flex flex-col justify-between items-center text-center overflow-hidden bg-charcoal text-ivory pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Luxury Photography with Parallax/Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={config.coverImage}
          alt={config.coupleNames}
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 brightness-[0.72] contrast-[1.05]"
        />
        {/* Magazine Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal/30 to-charcoal/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-charcoal/20 to-charcoal/70" />
      </div>

      {/* Top Magazine Header Badge */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-ivory/20 pb-4 text-[11px] tracking-ultra uppercase text-ivory/80 font-sans font-light gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span>{config.issueTitle || 'THE WEDDING EDITION • ISSUE NO. 01'}</span>
        </div>
        <div className="hidden sm:block font-serif tracking-widest italic text-gold-light">
          "A Celebration of Eternal Vows"
        </div>
        <div>VOL. MMXXVI</div>
      </div>

      {/* Main Editorial Title Box */}
      <div className="relative z-10 my-auto py-12 max-w-5xl mx-auto flex flex-col items-center">
        {/* Monogram Circle */}
        <div className="mb-6 w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center font-serif text-2xl text-gold backdrop-blur-sm bg-charcoal/30 shadow-gold-glow animate-float">
          A & A
        </div>

        <p className="text-xs sm:text-sm tracking-ultra uppercase text-gold font-medium mb-3">
          {config.tagline || 'THE BEGINNING OF FOREVER'}
        </p>

        {/* Huge Editorial Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight text-ivory leading-none text-glow">
          {config.coupleNames || 'ARJUN & ANANYA'}
        </h1>

        <p className="mt-6 max-w-xl text-sm sm:text-base md:text-lg font-serif italic text-ivory/90 leading-relaxed font-light">
          {config.coverSubtitle || 'A Luxury Editorial Celebration of Vows & Memories'}
        </p>

        {/* Date & Location Badge */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-full bg-charcoal/40 border border-gold/30 backdrop-blur-md text-xs sm:text-sm tracking-widest uppercase text-ivory/90 shadow-luxury">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            <span>{config.weddingDate || '12 DECEMBER 2026'}</span>
          </div>
          <span className="hidden sm:inline text-gold/40">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" />
            <span>{config.location || 'KOCHI, KERALA'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-xs tracking-ultra uppercase text-ivory/70 animate-bounce cursor-pointer">
        <a href="#story" className="flex flex-col items-center gap-1 hover:text-gold transition-colors">
          <span>SCROLL TO EXPLORE MAGAZINE</span>
          <ChevronDown className="w-4 h-4 text-gold" />
        </a>
      </div>
    </section>
  );
}
