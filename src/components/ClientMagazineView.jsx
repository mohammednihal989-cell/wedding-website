import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroCover from './HeroCover';
import InvitationSection from './InvitationSection';
import OurStory from './OurStory';
import EditorialChapter from './EditorialChapter';
import PhotoGallery from './PhotoGallery';
import GuestbookSection from './GuestbookSection';
import FooterClosing from './FooterClosing';
import LightboxModal from './LightboxModal';
import ShareModal from './ShareModal';
import AudioPlayer from './AudioPlayer';
import PasswordGateModal from './PasswordGateModal';
import { Sparkles, ShieldAlert, Lock, ArrowLeft } from 'lucide-react';

export default function ClientMagazineView({ clientData, onGoHome }) {
  const [unlocked, setUnlocked] = useState(
    !clientData?.isPasswordProtected || false
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Offline / Unpublished / Invalid Link state
  if (!clientData || clientData.isOffline) {
    return (
      <div className="min-h-screen bg-charcoal text-ivory flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6 shadow-gold-glow">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <span className="text-xs tracking-ultra uppercase text-gold font-semibold mb-2">
          PRIVATE CLIENT ARCHIVE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory">
          Magazine Offline or Private Access
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-ivory/60 max-w-md mx-auto font-light leading-relaxed">
          The requested wedding magazine is currently unpublished or restricted by the administrator. Please contact NIHALCO or the couple for access.
        </p>

        <button
          onClick={onGoHome}
          className="mt-8 px-6 py-3 rounded-full bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to NIHALCO Homepage</span>
        </button>
      </div>
    );
  }

  // Password Protection Gate
  if (clientData.isPasswordProtected && !unlocked) {
    return (
      <PasswordGateModal
        clientName={clientData.name}
        correctPassword={clientData.password}
        onUnlock={() => setUnlocked(true)}
      />
    );
  }

  const config = {
    coupleNames: clientData.name,
    weddingDate: clientData.eventDate,
    weddingTime: clientData.weddingTime || '5:00 PM',
    location: clientData.location,
    venueName: clientData.venueName,
    venueAddress: clientData.venueAddress,
    tagline: clientData.tagline || 'THE BEGINNING OF FOREVER',
    introduction: clientData.introduction,
    invitationMessage: clientData.invitationMessage,
    dressCode: clientData.dressCode,
    rsvpDetails: clientData.rsvpDetails,
    coverImage:
      clientData.coverPhoto ||
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop',
    musicTitle: 'Eternal Promise',
    musicUrl:
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    footerMessage: `Thank you for celebrating with ${clientData.name}. Preserved forever by NIHALCO.`,
  };

  const photos = clientData.photos || [];
  const stories = clientData.stories || [];

  const handleDownloadPhoto = async (photo) => {
    if (!clientData.downloadsEnabled) return;
    try {
      const cleanName = clientData.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const cleanTitle = photo.title
        ? photo.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)
        : 'photo';
      const filename = `${cleanName}-${cleanTitle}-${photo.id}.jpg`;

      const response = await fetch(photo.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.open(photo.imageUrl, '_blank');
    }
  };

  const currentSelectedPhoto =
    selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory transition-colors">
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gold z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header Bar */}
      <Navbar
        config={config}
        isPlaying={isPlayingAudio}
        toggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenAdmin={() => {}}
      />

      {/* Magazine Body */}
      <main>
        <HeroCover config={config} />
        <InvitationSection config={config} />
        <OurStory config={config} />
        {stories.length > 0 && <EditorialChapter stories={stories} />}
        <PhotoGallery
          photos={photos}
          coupleNames={clientData.name}
          onSelectPhoto={(photo, index) => setSelectedPhotoIndex(index)}
          onDownloadPhoto={handleDownloadPhoto}
        />
        <GuestbookSection />
      </main>

      {/* Closing Footer with NIHALCO Branding */}
      <FooterClosing config={config} onOpenShare={() => setIsShareOpen(true)} />

      {/* Audio Controller */}
      <AudioPlayer
        config={config}
        isPlaying={isPlayingAudio}
        setIsPlaying={setIsPlayingAudio}
      />

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <LightboxModal
          photo={currentSelectedPhoto}
          currentIndex={selectedPhotoIndex}
          totalPhotos={photos.length}
          onClose={() => setSelectedPhotoIndex(null)}
          onNext={() =>
            setSelectedPhotoIndex((prev) => (prev + 1) % photos.length)
          }
          onPrev={() =>
            setSelectedPhotoIndex(
              (prev) => (prev - 1 + photos.length) % photos.length
            )
          }
          onDownload={handleDownloadPhoto}
          onShare={() => setIsShareOpen(true)}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        photo={currentSelectedPhoto}
      />
    </div>
  );
}
