import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, MessageSquare, Sparkles } from 'lucide-react';
import { initialWishes } from '../data/weddingData';

export default function GuestbookSection() {
  const [wishes, setWishes] = useState(initialWishes);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish = {
      id: `w-${Date.now()}`,
      name: name.trim(),
      relationship: relationship.trim() || 'Friend of the Family',
      message: message.trim(),
      date: 'Just Now',
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setRelationship('');
    setMessage('');
    setSubmitted(true);

    // Trigger golden confetti burst!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F4EBE1', '#E8D3D1', '#C5A059'],
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="wishes" className="py-24 bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
            SECTION 06 • DIGITAL GUESTBOOK
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal dark:text-ivory">
            Wishes & Love Notes
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-charcoal-muted dark:text-ivory/70 font-light">
            Leave your warm blessings for Arjun & Ananya to cherish forever in their memory book.
          </p>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Submit Form Column */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-champagne/40 dark:bg-charcoal-light/60 border border-gold/20 shadow-luxury h-fit">
            <h3 className="font-serif text-2xl text-charcoal dark:text-ivory mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold fill-gold/20" />
              <span>Send Your Blessing</span>
            </h3>
            <p className="text-xs text-charcoal-muted dark:text-ivory/60 mb-6 font-light">
              Your message will be displayed live in the couple's wedding storybook.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-gold/20 border border-gold text-gold text-xs font-medium text-center animate-fade-in flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Thank you! Your wish has been added to our guestbook.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal-muted dark:text-ivory/70 mb-1 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Varma"
                  className="w-full px-4 py-2.5 rounded-xl bg-ivory dark:bg-charcoal border border-gold/30 text-sm focus:outline-none focus:border-gold text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal-muted dark:text-ivory/70 mb-1 font-medium">
                  Relation / Location
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Friend / College Buddy"
                  className="w-full px-4 py-2.5 rounded-xl bg-ivory dark:bg-charcoal border border-gold/30 text-sm focus:outline-none focus:border-gold text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal-muted dark:text-ivory/70 mb-1 font-medium">
                  Your Blessing Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a funny memory or warm blessing..."
                  className="w-full px-4 py-2.5 rounded-xl bg-ivory dark:bg-charcoal border border-gold/30 text-sm focus:outline-none focus:border-gold text-charcoal dark:text-ivory resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Publish Blessing</span>
              </button>
            </form>
          </div>

          {/* Wishes Display Wall Column */}
          <div className="lg:col-span-7 space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="p-6 rounded-2xl bg-ivory dark:bg-charcoal-light/40 border border-gold/20 shadow-luxury hover:border-gold/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-serif text-lg text-charcoal dark:text-ivory font-semibold">
                      {wish.name}
                    </h4>
                    <span className="text-[11px] text-gold tracking-wider uppercase font-medium">
                      {wish.relationship}
                    </span>
                  </div>
                  <span className="text-[10px] text-charcoal-muted dark:text-ivory/50">
                    {wish.date}
                  </span>
                </div>
                <p className="text-sm font-serif italic text-charcoal-muted dark:text-ivory/80 leading-relaxed">
                  "{wish.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
