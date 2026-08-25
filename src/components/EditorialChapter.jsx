import React from 'react';
import { initialStories } from '../data/weddingData';
import { Sparkles, Heart } from 'lucide-react';

export default function EditorialChapter({ stories = initialStories }) {
  return (
    <section id="chapters" className="py-24 bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory space-y-32 transition-colors">
      {stories.map((story, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={story.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Chapter Tag & Title */}
            <div className="flex flex-col items-center text-center mb-16 space-y-2">
              <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
                {story.chapterTitle || `CHAPTER ${story.chapterNumber}`}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal dark:text-ivory">
                {story.title}
              </h2>
              <p className="text-xs tracking-widest text-charcoal-muted dark:text-ivory/60 uppercase">
                {story.subtitle} • {story.date}
              </p>
              <div className="w-12 h-px bg-gold/40 mt-3" />
            </div>

            {/* Main Editorial Layout Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Column 1 (Image or Content based on isEven) */}
              <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                {/* Collage / Dual Image Box */}
                <div className="grid grid-cols-12 gap-4 relative">
                  <div className="col-span-8 rounded-2xl overflow-hidden shadow-luxury border border-gold/20 aspect-[4/5] group">
                    <img
                      src={story.imageLeft}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="col-span-4 rounded-2xl overflow-hidden shadow-luxury border border-gold/20 aspect-[3/5] mt-12 group">
                    <img
                      src={story.imageRight}
                      alt={story.subtitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Floating Watermark Chapter Number */}
                  <div className="absolute -top-10 -left-6 font-serif text-8xl md:text-9xl text-gold/15 dark:text-gold/10 select-none pointer-events-none font-bold">
                    {story.chapterNumber}
                  </div>
                </div>
              </div>

              {/* Column 2 (Story Narrative & Pull Quote) */}
              <div className={`lg:col-span-5 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-xs text-gold font-medium uppercase tracking-widest">
                  {story.subtitle}
                </div>

                <p className="font-serif italic text-xl sm:text-2xl text-gold-dark dark:text-gold-light leading-relaxed">
                  "{story.quote}"
                </p>

                <p className="text-base sm:text-lg text-charcoal-muted dark:text-ivory/80 font-light leading-relaxed">
                  {story.content}
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <div className="h-px bg-gold/30 flex-1" />
                  <span className="font-serif italic text-sm text-gold">Arjun & Ananya</span>
                  <div className="h-px bg-gold/30 flex-1" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
