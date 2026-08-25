import React from 'react';
import { Heart, ArrowUp, Share2, Sparkles } from 'lucide-react';

export default function FooterClosing({ config, onOpenShare }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-24 bg-charcoal-dark text-ivory text-center px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-gold/20">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Monogram Badge */}
        <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center font-serif text-3xl text-gold mx-auto backdrop-blur-sm bg-charcoal/50 shadow-gold-glow animate-pulse-subtle">
          A & A
        </div>

        <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
          THE FINAL CHAPTER
        </span>

        {/* Closing Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory leading-tight">
          And This Is Only The Beginning.
        </h2>

        <p className="font-serif italic text-lg sm:text-xl text-ivory/80 max-w-xl mx-auto font-light">
          "{config.footerMessage || 'Thank you for being part of our story. Your love & blessings mean the world to us.'}"
        </p>

        <div className="w-16 h-px bg-gold/40 mx-auto" />

        {/* Couple Details */}
        <div>
          <div className="font-serif text-2xl text-gold font-semibold tracking-wider">
            {config.coupleNames}
          </div>
          <div className="text-xs uppercase tracking-widest text-ivory/60 mt-1">
            {config.weddingDate} • {config.location}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={scrollToTop}
            className="px-6 py-3 rounded-full border border-gold/40 hover:border-gold text-ivory text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 hover:bg-gold hover:text-charcoal"
          >
            <ArrowUp className="w-4 h-4 text-gold group-hover:text-charcoal" />
            <span>View Magazine Again</span>
          </button>

          <button
            onClick={onOpenShare}
            className="px-6 py-3 rounded-full bg-gold text-charcoal text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-all duration-300 shadow-gold-glow flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Our Story</span>
          </button>
        </div>

        {/* Copyright / Editorial Note */}
        <div className="pt-12 text-[10px] tracking-widest uppercase text-ivory/40">
          © MMXXVI {config.coupleNames} WEDDING STORYBOOK. CREATED WITH ETERNAL LOVE.
        </div>
      </div>
    </footer>
  );
}
