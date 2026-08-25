import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Share2, Settings, Menu, X, Heart } from 'lucide-react';

export default function Navbar({
  config,
  isPlaying,
  toggleAudio,
  darkMode,
  setDarkMode,
  onOpenShare,
  onOpenAdmin,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'COVER', href: '#cover' },
    { name: 'OUR STORY', href: '#story' },
    { name: 'TIMELINE', href: '#journey' },
    { name: 'CHAPTERS', href: '#chapters' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'WISHES', href: '#wishes' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/90 dark:bg-charcoal-dark/90 backdrop-blur-md border-b border-gold/20 py-3.5 shadow-luxury'
          : 'bg-gradient-to-b from-charcoal/60 via-charcoal/20 to-transparent text-ivory py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Initials */}
        <a
          href="#cover"
          className="group flex items-center gap-3 tracking-widest text-xs uppercase font-medium"
        >
          <span
            className={`w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center font-serif text-sm transition-transform duration-300 group-hover:scale-110 ${
              scrolled ? 'text-gold' : 'text-ivory'
            }`}
          >
            A&A
          </span>
          <span className="hidden sm:inline font-serif tracking-widest text-sm font-semibold">
            {config.coupleNames || 'ARJUN & ANANYA'}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-widest uppercase font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative py-1 transition-colors duration-300 hover:text-gold ${
                scrolled
                  ? 'text-charcoal dark:text-ivory/90'
                  : 'text-ivory/90 hover:text-ivory'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side Utility Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Audio Toggle Button */}
          <button
            onClick={toggleAudio}
            className={`relative p-2.5 rounded-full transition-all duration-300 border border-gold/30 hover:border-gold ${
              scrolled
                ? 'bg-ivory-dark dark:bg-charcoal text-charcoal dark:text-ivory hover:text-gold'
                : 'bg-charcoal/40 text-ivory backdrop-blur-sm hover:bg-charcoal/60'
            }`}
            title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
            aria-label="Toggle Audio"
          >
            {isPlaying ? (
              <span className="flex items-center">
                <Volume2 className="w-4 h-4 text-gold animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
                </span>
              </span>
            ) : (
              <VolumeX className="w-4 h-4 opacity-70" />
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full transition-all duration-300 border border-gold/30 hover:border-gold ${
              scrolled
                ? 'bg-ivory-dark dark:bg-charcoal text-charcoal dark:text-ivory'
                : 'bg-charcoal/40 text-ivory backdrop-blur-sm'
            }`}
            title="Toggle Dark/Light Mode"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-gold" />
            ) : (
              <Moon className="w-4 h-4 text-gold" />
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            className="p-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
            title="Share Storybook"
            aria-label="Share Wedding Magazine"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Admin CMS Drawer Trigger */}
          <button
            onClick={onOpenAdmin}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-widest uppercase rounded-full border border-gold/30 transition-colors ${
              scrolled ? 'text-charcoal-muted dark:text-ivory/60 hover:text-gold' : 'text-ivory/80 hover:text-ivory'
            }`}
            title="Open Content Manager"
          >
            <Settings className="w-3 h-3 text-gold" />
            <span>EDIT</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? 'text-charcoal dark:text-ivory' : 'text-ivory'
            }`}
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory/95 dark:bg-charcoal-dark/95 border-b border-gold/30 px-6 py-6 space-y-4 text-center backdrop-blur-xl animate-fade-in">
          <div className="font-serif text-lg tracking-widest text-gold mb-2">
            {config.coupleNames}
          </div>
          <div className="h-px bg-gold/20 w-16 mx-auto mb-4" />
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs tracking-ultra uppercase text-charcoal dark:text-ivory hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex justify-center gap-4 border-t border-gold/20">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase border border-gold/40 text-gold rounded-full"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>EDIT MAGAZINE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
