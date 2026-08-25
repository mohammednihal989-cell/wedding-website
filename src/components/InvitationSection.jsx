import React from 'react';
import { Mail, Calendar, Clock, MapPin, Shirt, ExternalLink } from 'lucide-react';

export default function InvitationSection({ config }) {
  if (!config.invitationMessage && !config.venueName) return null;

  return (
    <section id="invitation" className="py-24 bg-champagne-light dark:bg-charcoal-dark text-charcoal dark:text-ivory transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Invitation Card */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-ivory/90 dark:bg-charcoal-light/70 border-2 border-gold/30 shadow-luxury backdrop-blur-md space-y-8">
          <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center font-serif text-2xl text-gold mx-auto shadow-gold-glow">
            {config.coupleInitials || 'W'}
          </div>

          <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
            THE OFFICIAL INVITATION
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal dark:text-ivory leading-tight">
            {config.coupleNames}
          </h2>

          {config.invitationMessage && (
            <p className="font-serif italic text-lg sm:text-xl text-charcoal-muted dark:text-ivory/90 leading-relaxed max-w-2xl mx-auto">
              "{config.invitationMessage}"
            </p>
          )}

          <div className="w-24 h-px bg-gold/40 mx-auto" />

          {/* Key Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center pt-4">
            {config.weddingDate && (
              <div className="p-4 rounded-2xl bg-champagne/40 dark:bg-charcoal/40 border border-gold/20 flex flex-col items-center">
                <Calendar className="w-5 h-5 text-gold mb-2" />
                <span className="text-[10px] tracking-widest uppercase text-gold font-semibold">
                  DATE
                </span>
                <span className="font-serif text-base text-charcoal dark:text-ivory mt-1">
                  {config.weddingDate}
                </span>
              </div>
            )}

            {config.weddingTime && (
              <div className="p-4 rounded-2xl bg-champagne/40 dark:bg-charcoal/40 border border-gold/20 flex flex-col items-center">
                <Clock className="w-5 h-5 text-gold mb-2" />
                <span className="text-[10px] tracking-widest uppercase text-gold font-semibold">
                  TIME
                </span>
                <span className="font-serif text-base text-charcoal dark:text-ivory mt-1">
                  {config.weddingTime}
                </span>
              </div>
            )}

            {config.venueName && (
              <div className="p-4 rounded-2xl bg-champagne/40 dark:bg-charcoal/40 border border-gold/20 flex flex-col items-center">
                <MapPin className="w-5 h-5 text-gold mb-2" />
                <span className="text-[10px] tracking-widest uppercase text-gold font-semibold">
                  VENUE
                </span>
                <span className="font-serif text-base text-charcoal dark:text-ivory mt-1">
                  {config.venueName}
                </span>
              </div>
            )}
          </div>

          {/* Full Address & Google Maps */}
          {config.venueAddress && (
            <div className="pt-2 text-xs text-charcoal-muted dark:text-ivory/70 space-y-2">
              <p className="font-light">{config.venueAddress}</p>

              {config.googleMapsUrl && (
                <a
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold hover:underline font-medium uppercase tracking-wider text-[11px]"
                >
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Dress Code & RSVP */}
          {(config.dressCode || config.rsvpDetails) && (
            <div className="pt-6 border-t border-gold/20 flex flex-wrap justify-center gap-6 text-xs">
              {config.dressCode && (
                <div className="flex items-center gap-2 text-charcoal-muted dark:text-ivory/80">
                  <Shirt className="w-4 h-4 text-gold" />
                  <span>Dress Code: <strong className="font-semibold">{config.dressCode}</strong></span>
                </div>
              )}

              {config.rsvpDetails && (
                <div className="flex items-center gap-2 text-charcoal-muted dark:text-ivory/80">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>RSVP: <strong className="font-semibold">{config.rsvpDetails}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
