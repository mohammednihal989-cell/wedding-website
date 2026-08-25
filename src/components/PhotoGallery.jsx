import React, { useState } from 'react';
import JSZip from 'jszip';
import { Download, Maximize2, Sparkles, FileArchive } from 'lucide-react';
import { defaultCategories } from '../data/initialWeddingState';

export default function PhotoGallery({
  photos = [],
  onSelectPhoto,
  onDownloadPhoto,
  coupleNames,
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  // Extract unique categories from uploaded photos + defaults
  const customCategories = Array.from(
    new Set([
      'ALL',
      ...photos.map((p) => (p.category ? p.category.toUpperCase() : 'WEDDING')),
      ...defaultCategories.slice(1, 6),
    ])
  );

  const filteredPhotos =
    activeCategory === 'ALL'
      ? photos
      : photos.filter((p) => p.category?.toUpperCase() === activeCategory);

  // Download All Photos as a ZIP Archive
  const handleDownloadAllZip = async () => {
    if (photos.length === 0) return;
    setIsZipping(true);
    setZipProgress(0);

    const zip = new JSZip();
    const folderName = coupleNames
      ? coupleNames.toLowerCase().replace(/[^a-z0-9]/g, '-')
      : 'wedding-photos';
    const folder = zip.folder(`${folderName}-archive`);

    try {
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const response = await fetch(photo.imageUrl);
        const blob = await response.blob();
        const cleanTitle = photo.title
          ? photo.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)
          : `photo-${i + 1}`;
        const fileName = `${cleanTitle}-${photo.id}.jpg`;

        folder.file(fileName, blob);
        setZipProgress(Math.round(((i + 1) / photos.length) * 100));
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${folderName}-wedding-photos.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-champagne-light dark:bg-charcoal-dark text-charcoal dark:text-ivory transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
            THE PHOTO ARCHIVE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal dark:text-ivory">
            Treasured Moments
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-charcoal-muted dark:text-ivory/70 font-light">
            Browse through our personal wedding photographs. Click any photo to enlarge or save.
          </p>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
        </div>

        {/* Filter Categories Bar */}
        {customCategories.length > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
            {customCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold text-charcoal font-semibold shadow-gold-glow'
                    : 'bg-ivory/80 dark:bg-charcoal-light/80 text-charcoal-muted dark:text-ivory/70 border border-gold/20 hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Actions Bar (Counter + ZIP Download Button) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gold/20 pb-4">
          <div className="text-xs tracking-widest uppercase text-charcoal-muted dark:text-ivory/60 font-medium">
            Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photograph' : 'Photographs'}
          </div>

          {photos.length > 0 && (
            <button
              onClick={handleDownloadAllZip}
              disabled={isZipping}
              className="px-5 py-2.5 rounded-full bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow flex items-center gap-2"
            >
              <FileArchive className="w-4 h-4" />
              <span>{isZipping ? `Creating ZIP (${zipProgress}%)` : 'Download All Photos (.ZIP)'}</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 bg-ivory/50 dark:bg-charcoal-light/30 rounded-3xl border-2 border-dashed border-gold/30 p-8 space-y-3">
            <Sparkles className="w-10 h-10 text-gold mx-auto opacity-70 animate-pulse" />
            <h3 className="font-serif text-2xl text-charcoal dark:text-ivory">
              No photographs uploaded yet.
            </h3>
            <p className="text-xs text-charcoal-muted dark:text-ivory/60 max-w-sm mx-auto font-light">
              Click the "EDIT" button in the navigation header to open the Admin Studio and upload your wedding photos.
            </p>
          </div>
        )}

        {/* Editorial Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative rounded-2xl overflow-hidden shadow-luxury border border-gold/20 bg-ivory dark:bg-charcoal transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxury-hover cursor-pointer"
              onClick={() => onSelectPhoto(photo, index)}
            >
              <div
                className={`w-full overflow-hidden ${
                  photo.aspectRatio === 'portrait'
                    ? 'aspect-[3/4]'
                    : photo.aspectRatio === 'square'
                    ? 'aspect-square'
                    : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.95] group-hover:brightness-100"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-ivory">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] tracking-ultra uppercase text-gold font-semibold">
                    {photo.category} • {photo.date}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl mt-1 text-ivory">
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p className="text-xs text-ivory/80 font-light mt-1 line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ivory/20 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gold font-medium">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Lightbox</span>
                  </span>

                  {photo.download && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadPhoto(photo);
                      }}
                      className="p-2 rounded-full bg-gold/20 hover:bg-gold text-gold hover:text-charcoal transition-colors border border-gold/40"
                      title="Download Photograph"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
