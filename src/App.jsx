import React, { useState, useEffect } from 'react';
import {
  getStoredWeddingData,
  saveWeddingData,
  clearWeddingData,
} from './utils/storageService';
import { emptyWeddingConfig } from './data/initialWeddingState';
import SetupWizard from './components/SetupWizard';
import AdminStudio from './components/AdminStudio';
import Navbar from './components/Navbar';
import HeroCover from './components/HeroCover';
import InvitationSection from './components/InvitationSection';
import OurStory from './components/OurStory';
import EditorialChapter from './components/EditorialChapter';
import PhotoGallery from './components/PhotoGallery';
import GuestbookSection from './components/GuestbookSection';
import FooterClosing from './components/FooterClosing';
import LightboxModal from './components/LightboxModal';
import ShareModal from './components/ShareModal';
import AudioPlayer from './components/AudioPlayer';
import { Sparkles, Settings } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Master State
  const [config, setConfig] = useState(emptyWeddingConfig);
  const [photos, setPhotos] = useState([]);
  const [stories, setStories] = useState([]);

  // Audio & Dark mode
  const [darkMode, setDarkMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Modal Controls
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load state from IndexedDB on startup
  useEffect(() => {
    async function loadData() {
      try {
        const stored = await getStoredWeddingData();
        if (stored && stored.config && stored.config.isConfigured) {
          setConfig(stored.config);
          setPhotos(stored.photos || []);
          setStories(stored.stories || []);
        }
      } catch (err) {
        console.error('Failed loading wedding data from storage:', err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    }
    loadData();
  }, []);

  // Track scroll progress
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

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist helper
  const persistState = async (newConfig, newPhotos, newStories) => {
    setConfig(newConfig);
    setPhotos(newPhotos);
    setStories(newStories);
    await saveWeddingData({
      config: newConfig,
      photos: newPhotos,
      stories: newStories,
    });
  };

  // Setup Wizard Completion Handler
  const handleWizardComplete = async (initialConfig, initialPhotos) => {
    await persistState(initialConfig, initialPhotos, []);
  };

  // Reset Everything
  const handleResetAll = async () => {
    if (
      window.confirm(
        'Are you sure you want to reset all wedding data and relaunch the setup wizard?'
      )
    ) {
      await clearWeddingData();
      setConfig(emptyWeddingConfig);
      setPhotos([]);
      setStories([]);
      setIsAdminOpen(false);
    }
  };

  // Direct High-Res Download Handler
  const handleDownloadPhoto = async (photo) => {
    try {
      const cleanCoupleName = config.coupleNames
        ? config.coupleNames.toLowerCase().replace(/[^a-z0-9]/g, '-')
        : 'wedding';
      const cleanTitle = photo.title
        ? photo.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)
        : 'photo';
      const filename = `${cleanCoupleName}-${cleanTitle}-${photo.id}.jpg`;

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

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal text-ivory">
        <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center font-serif text-2xl text-gold mb-6 animate-pulse shadow-gold-glow">
          W
        </div>
        <p className="text-xs uppercase tracking-ultra text-ivory/60 flex items-center gap-2 font-light">
          <Sparkles className="w-4 h-4 text-gold animate-spin" />
          <span>Loading Personal Wedding Magazine...</span>
        </p>
      </div>
    );
  }

  // FIRST TIME SETUP WIZARD (If not configured yet)
  if (!config.isConfigured) {
    return <SetupWizard onComplete={handleWizardComplete} />;
  }

  const currentSelectedPhoto =
    selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory transition-colors">
      {/* Scroll Progress Indicator Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gold z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header */}
      <Navbar
        config={config}
        isPlaying={isPlayingAudio}
        toggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Public Magazine Body */}
      <main>
        {/* Front Cover Hero */}
        <HeroCover config={config} />

        {/* Personal Invitation Section */}
        <InvitationSection config={config} />

        {/* Editor's Letter & Couple Story */}
        <OurStory config={config} />

        {/* Custom Story Sections */}
        {stories.length > 0 && <EditorialChapter stories={stories} />}

        {/* Interactive Photo Gallery */}
        <PhotoGallery
          photos={photos}
          coupleNames={config.coupleNames}
          onSelectPhoto={(photo, index) => setSelectedPhotoIndex(index)}
          onDownloadPhoto={handleDownloadPhoto}
        />

        {/* Guestbook & Wishes Wall */}
        <GuestbookSection />
      </main>

      {/* Footer Closing */}
      <FooterClosing config={config} onOpenShare={() => setIsShareOpen(true)} />

      {/* Ambient Audio Player Controller */}
      <AudioPlayer
        config={config}
        isPlaying={isPlayingAudio}
        setIsPlaying={setIsPlayingAudio}
      />

      {/* Fullscreen Lightbox Modal */}
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

      {/* Share Dialog */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        photo={currentSelectedPhoto}
      />

      {/* Owner Studio / Admin Drawer */}
      <AdminStudio
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdateConfig={(newConfig) =>
          persistState(newConfig, photos, stories)
        }
        photos={photos}
        onUpdatePhotos={(newPhotos) =>
          persistState(config, newPhotos, stories)
        }
        stories={stories}
        onUpdateStories={(newStories) =>
          persistState(config, photos, newStories)
        }
        onResetAll={handleResetAll}
      />
    </div>
  );
}
