import React from 'react';
import NihalcoHero from './NihalcoHero';
import {
  Sparkles,
  Heart,
  Calendar,
  FileText,
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function NihalcoLanding({
  config,
  publishedClients = [],
  onOpenAdminLogin,
  onViewClientMagazine,
}) {
  return (
    <div className="min-h-screen bg-charcoal text-ivory font-sans selection:bg-gold selection:text-charcoal transition-colors">
      {/* Abstract Animated Hero */}
      <NihalcoHero config={config} onOpenAdminLogin={onOpenAdminLogin} />

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-dark border-t border-gold/20">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
            CREATIVE STUDIO
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
            About {config.companyName || 'NIHALCO'}
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto" />
          <p className="text-base sm:text-lg text-ivory/80 max-w-3xl mx-auto font-light leading-relaxed">
            {config.aboutText}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
              OUR CAPABILITIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
              Services & Digital Media
            </h2>
            <div className="w-16 h-px bg-gold/40 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.services.map((srv) => (
              <div
                key={srv.id}
                className="p-8 rounded-2xl bg-charcoal-light border border-gold/20 hover:border-gold transition-all duration-300 shadow-luxury space-y-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-ivory group-hover:text-gold transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-ivory/70 font-light leading-relaxed">
                  {srv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Showcase (Only Published Public Clients) */}
      {publishedClients.length > 0 && (
        <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-dark border-t border-gold/20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
                PUBLIC PORTFOLIO
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
                Featured Client Magazines
              </h2>
              <div className="w-16 h-px bg-gold/40 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => onViewClientMagazine(client.shareToken)}
                  className="group rounded-2xl overflow-hidden bg-charcoal border border-gold/20 shadow-luxury hover:border-gold transition-all duration-500 cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={
                        client.coverPhoto ||
                        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop'
                      }
                      alt={client.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 text-ivory">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                        {client.serviceType} • {client.eventDate}
                      </span>
                      <h3 className="font-serif text-2xl text-ivory">
                        {client.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gold/20 flex items-center justify-between text-xs text-gold">
                    <span>Open Digital Magazine</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Company Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
            Start Your Digital Preserved Story
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs">
            {config.contactEmail && (
              <div className="p-6 rounded-2xl bg-charcoal-light border border-gold/20 space-y-2 flex flex-col items-center">
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-gold font-semibold uppercase tracking-wider">EMAIL</span>
                <span className="text-ivory/80">{config.contactEmail}</span>
              </div>
            )}

            {config.contactPhone && (
              <div className="p-6 rounded-2xl bg-charcoal-light border border-gold/20 space-y-2 flex flex-col items-center">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-gold font-semibold uppercase tracking-wider">PHONE</span>
                <span className="text-ivory/80">{config.contactPhone}</span>
              </div>
            )}

            {config.location && (
              <div className="p-6 rounded-2xl bg-charcoal-light border border-gold/20 space-y-2 flex flex-col items-center">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-gold font-semibold uppercase tracking-wider">LOCATION</span>
                <span className="text-ivory/80">{config.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-charcoal-dark border-t border-gold/20 text-center text-xs tracking-widest uppercase text-ivory/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} {config.companyName}. ALL RIGHTS RESERVED.</div>
          <button
            onClick={onOpenAdminLogin}
            className="flex items-center gap-1.5 text-gold hover:underline text-[11px]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMINISTRATOR LOGIN</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
