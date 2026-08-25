import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Save,
  Upload,
  Sparkles,
  Check,
  Eye,
  Share2,
  FileText,
  Image as ImageIcon,
  Heart,
  Settings,
  RefreshCw,
} from 'lucide-react';
import StoryBuilder from './StoryBuilder';

export default function AdminStudio({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  photos,
  onUpdatePhotos,
  stories,
  onUpdateStories,
  onResetAll,
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('COUPLE');
  const [tempConfig, setTempConfig] = useState({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Bulk Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('CEREMONY');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleConfigSave = (e) => {
    e.preventDefault();
    onUpdateConfig(tempConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleBulkPhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const newPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      newPhotos.push({
        id: `p-${Date.now()}-${i}`,
        title: file.name.split('.')[0].replace(/[-_]/g, ' '),
        category: newCategory || 'CEREMONY',
        caption: '',
        date: tempConfig.weddingDate || 'Wedding Day',
        imageUrl: dataUrl,
        download: true,
        featured: true,
        aspectRatio: 'landscape',
      });

      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    onUpdatePhotos([...newPhotos, ...photos]);
    setIsUploading(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDeletePhoto = (id) => {
    onUpdatePhotos(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/95 backdrop-blur-xl p-4 sm:p-6 animate-fade-in text-ivory font-sans">
      <div className="max-w-4xl w-full max-h-[92vh] flex flex-col rounded-2xl bg-charcoal border border-gold/30 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-gold/20 flex items-center justify-between bg-charcoal-light">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center font-serif text-gold text-base shadow-gold-glow">
              {config.coupleInitials || 'W'}
            </div>
            <div>
              <h3 className="font-serif text-xl text-ivory font-semibold">
                Wedding Magazine Owner Studio
              </h3>
              <p className="text-xs text-ivory/60">
                Logged in as Wedding Owner • {config.coupleNames || 'My Wedding'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gold text-charcoal hover:bg-gold-light text-xs font-semibold uppercase tracking-wider transition-colors shadow-gold-glow flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-red-500/20 text-ivory transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap border-b border-gold/20 bg-charcoal/60 text-xs uppercase tracking-widest font-medium">
          {[
            { id: 'COUPLE', label: '1. Couple & Venue' },
            { id: 'INVITATION', label: '2. Personal Invitation' },
            { id: 'BULK_UPLOAD', label: '3. Bulk Photo Upload' },
            { id: 'STORIES', label: '4. Custom Story Builder' },
            { id: 'PHOTOS', label: `5. Gallery (${photos.length})` },
            { id: 'RESET', label: '6. Settings & Reset' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] py-3 px-2 text-center transition-colors border-r border-gold/10 ${
                activeTab === tab.id
                  ? 'border-b-2 border-gold text-gold bg-gold/10 font-semibold'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {savedSuccess && (
          <div className="bg-gold/20 border-b border-gold text-gold px-6 py-2 text-xs font-medium flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>Changes updated successfully to IndexedDB!</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === 'COUPLE' && (
            <form onSubmit={handleConfigSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Partner 1 Name
                  </label>
                  <input
                    type="text"
                    value={tempConfig.partner1 || ''}
                    onChange={(e) =>
                      setTempConfig({
                        ...tempConfig,
                        partner1: e.target.value,
                        coupleNames: `${e.target.value.toUpperCase()} & ${(
                          tempConfig.partner2 || ''
                        ).toUpperCase()}`,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Partner 2 Name
                  </label>
                  <input
                    type="text"
                    value={tempConfig.partner2 || ''}
                    onChange={(e) =>
                      setTempConfig({
                        ...tempConfig,
                        partner2: e.target.value,
                        coupleNames: `${(
                          tempConfig.partner1 || ''
                        ).toUpperCase()} & ${e.target.value.toUpperCase()}`,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Wedding Date
                  </label>
                  <input
                    type="text"
                    value={tempConfig.weddingDate || ''}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, weddingDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Wedding Time
                  </label>
                  <input
                    type="text"
                    value={tempConfig.weddingTime || ''}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, weddingTime: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={tempConfig.venueName || ''}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, venueName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={tempConfig.location || ''}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, location: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Wedding Tagline
                </label>
                <input
                  type="text"
                  value={tempConfig.tagline || ''}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold text-charcoal font-semibold tracking-widest uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Couple & Venue Changes</span>
              </button>
            </form>
          )}

          {activeTab === 'INVITATION' && (
            <form onSubmit={handleConfigSave} className="space-y-4">
              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Personal Invitation Wording
                </label>
                <textarea
                  rows={5}
                  value={tempConfig.invitationMessage || ''}
                  onChange={(e) =>
                    setTempConfig({
                      ...tempConfig,
                      invitationMessage: e.target.value,
                    })
                  }
                  placeholder="Write your custom wedding invitation message..."
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Dress Code
                  </label>
                  <input
                    type="text"
                    value={tempConfig.dressCode || ''}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, dressCode: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    RSVP Details
                  </label>
                  <input
                    type="text"
                    value={tempConfig.rsvpDetails || ''}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, rsvpDetails: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold text-charcoal font-semibold tracking-widest uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Invitation Wording</span>
              </button>
            </form>
          )}

          {activeTab === 'BULK_UPLOAD' && (
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-charcoal-light border-2 border-dashed border-gold/40 text-center space-y-4">
                <Upload className="w-12 h-12 text-gold mx-auto opacity-80" />
                <h3 className="font-serif text-xl text-ivory">
                  BULK PHOTO UPLOADER
                </h3>
                <p className="text-xs text-ivory/60">
                  Select 10, 50, 100+ photos from your computer. Stored in IndexedDB.
                </p>

                <div className="mb-4">
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Assign Category to Uploaded Photos
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-charcoal border border-gold/30 text-gold focus:outline-none"
                  >
                    <option value="CEREMONY">CEREMONY</option>
                    <option value="PRE-WEDDING">PRE-WEDDING</option>
                    <option value="ENGAGEMENT">ENGAGEMENT</option>
                    <option value="MEHENDI">MEHENDI</option>
                    <option value="HALDI">HALDI</option>
                    <option value="SANGEET">SANGEET</option>
                    <option value="RECEPTION">RECEPTION</option>
                    <option value="FAMILY">FAMILY</option>
                    <option value="FRIENDS">FRIENDS</option>
                    <option value="COUPLE">COUPLE</option>
                  </select>
                </div>

                <label className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-charcoal text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-gold-light transition-all shadow-gold-glow">
                  <Upload className="w-4 h-4" />
                  <span>Choose Wedding Photos (Multiple)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleBulkPhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {isUploading && (
                <div className="p-4 rounded-xl bg-charcoal-light border border-gold/30 space-y-2">
                  <div className="flex justify-between text-xs text-gold font-semibold">
                    <span>Processing bulk uploads...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-charcoal rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'STORIES' && (
            <StoryBuilder
              stories={stories}
              onUpdateStories={onUpdateStories}
              availablePhotos={photos}
            />
          )}

          {activeTab === 'PHOTOS' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-gold font-semibold uppercase">
                <span>Total Uploaded Photos: {photos.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-1">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-charcoal-light border border-gold/20"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-14 h-14 object-cover rounded-lg border border-gold/30"
                    />
                    <div className="flex-1 truncate">
                      <h5 className="font-serif text-sm text-ivory truncate">
                        {photo.title}
                      </h5>
                      <span className="text-[10px] text-gold uppercase font-semibold">
                        {photo.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-ivory transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'RESET' && (
            <div className="space-y-6 text-center py-8 bg-charcoal-light rounded-2xl border border-red-500/30 p-8">
              <RefreshCw className="w-12 h-12 text-red-400 mx-auto" />
              <h3 className="font-serif text-xl text-ivory">
                Reset Wedding Data & Relaunch Setup
              </h3>
              <p className="text-xs text-ivory/70 max-w-md mx-auto">
                Warning: This will clear your current configured details and relaunch the setup wizard.
              </p>
              <button
                onClick={onResetAll}
                className="px-6 py-3 rounded-full bg-red-500 text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-red-600 transition-colors"
              >
                Reset All Wedding Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
