import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2, ZoomIn, Calendar, Tag } from 'lucide-react';

export default function LightboxModal({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onNext,
  onPrev,
  onDownload,
  onShare,
}) {
  if (!photo) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/95 backdrop-blur-xl text-ivory p-4 sm:p-6 animate-fade-in">
      {/* Top Action Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        {/* Counter Badge */}
        <div className="font-serif text-sm tracking-widest text-gold px-3 py-1.5 rounded-full bg-charcoal/60 border border-gold/30 backdrop-blur-md">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {photo.download && (
            <button
              onClick={() => onDownload(photo)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-charcoal hover:bg-gold-light text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-gold-glow"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Photo</span>
            </button>
          )}

          <button
            onClick={() => onShare(photo)}
            className="p-2.5 rounded-full bg-charcoal/60 hover:bg-gold hover:text-charcoal border border-gold/30 text-gold transition-all duration-300"
            title="Share Photo"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-charcoal/60 hover:bg-red-500/80 border border-gold/30 text-ivory transition-all duration-300"
            title="Close Viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-charcoal/40 hover:bg-gold hover:text-charcoal border border-gold/30 text-ivory transition-all duration-300"
        title="Previous Image (Left Arrow)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-charcoal/40 hover:bg-gold hover:text-charcoal border border-gold/30 text-ivory transition-all duration-300"
        title="Next Image (Right Arrow)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Photo & Details Wrapper */}
      <div className="max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-6 my-auto">
        {/* Image Box */}
        <div className="relative max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-xl border border-gold/20 shadow-2xl bg-charcoal">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="max-h-[70vh] md:max-h-[80vh] w-auto object-contain select-none"
          />
        </div>

        {/* Details Sidebar Panel */}
        <div className="w-full md:w-80 space-y-4 p-4 rounded-xl bg-charcoal/60 border border-gold/20 backdrop-blur-md">
          <div className="flex items-center gap-3 text-[11px] text-gold uppercase tracking-widest font-medium">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {photo.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {photo.date}
            </span>
          </div>

          <h3 className="font-serif text-2xl text-ivory leading-snug">
            {photo.title}
          </h3>

          {photo.caption && (
            <p className="text-xs text-ivory/80 font-light leading-relaxed border-t border-gold/20 pt-3">
              "{photo.caption}"
            </p>
          )}

          <div className="text-[10px] text-ivory/40 tracking-wider pt-2">
            ARJUN & ANANYA WEDDING ARCHIVE
          </div>
        </div>
      </div>
    </div>
  );
}
