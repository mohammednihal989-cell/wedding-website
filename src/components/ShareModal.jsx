import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, Mail, QrCode } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, photo }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareTitle = photo
    ? `${photo.title} — Arjun & Ananya Wedding Story`
    : 'Arjun & Ananya — The Beginning of Forever (Wedding Magazine)';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: 'Explore Arjun & Ananya\'s interactive wedding digital magazine & storybook.',
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled:', err);
      }
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`Explore Arjun & Ananya's luxury wedding digital magazine: ${shareUrl}`);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodedUrl}&color=1C1B1A&bgcolor=FDFBF7`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="max-w-md w-full rounded-2xl bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory border border-gold/30 p-6 sm:p-8 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gold/20 text-charcoal dark:text-ivory transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto text-gold mb-2">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-charcoal dark:text-ivory">
            Share Our Wedding Story
          </h3>
          <p className="text-xs text-charcoal-muted dark:text-ivory/60 font-light">
            Pass this digital magazine link to family, friends, and loved ones across the world.
          </p>
        </div>

        {/* QR Code Box */}
        <div className="my-6 p-4 rounded-xl bg-champagne/40 dark:bg-charcoal-light/50 border border-gold/20 flex flex-col items-center justify-center">
          <img
            src={qrCodeUrl}
            alt="Wedding QR Code"
            className="w-36 h-36 rounded-lg border border-gold/30 shadow-md p-2 bg-ivory"
          />
          <span className="text-[10px] uppercase tracking-ultra text-gold font-medium mt-2">
            Scan to Open on Mobile
          </span>
        </div>

        {/* Copy Link Row */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 px-3 py-2 text-xs rounded-xl bg-ivory-dark dark:bg-charcoal-light border border-gold/30 text-charcoal dark:text-ivory truncate focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-gold text-charcoal font-semibold text-xs tracking-wider uppercase hover:bg-gold-light transition-all duration-300 shadow-gold-glow flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Native Share Button (If Supported) */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 mb-4 rounded-xl bg-charcoal/10 dark:bg-ivory/10 hover:bg-gold/20 text-xs font-semibold uppercase tracking-widest text-gold border border-gold/30 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Open System Share Menu</span>
          </button>
        )}

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl border border-gold/20 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium flex flex-col items-center gap-1 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl border border-gold/20 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-medium flex flex-col items-center gap-1 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </a>

          <a
            href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodedText}`}
            className="py-2.5 px-3 rounded-xl border border-gold/20 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-medium flex flex-col items-center gap-1 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
