import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

export default function AdminCMSModal({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  photos,
  onUpdatePhotos,
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('SETTINGS');
  const [tempConfig, setTempConfig] = useState({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const newPhotoObj = {
      id: `p-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      caption: newCaption.trim(),
      date: tempConfig.weddingDate || 'Dec 2026',
      imageUrl: newImageUrl,
      download: true,
      featured: true,
      aspectRatio: 'landscape',
    };

    onUpdatePhotos([newPhotoObj, ...photos]);
    setNewTitle('');
    setNewCaption('');
    setNewImageUrl('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDeletePhoto = (id) => {
    onUpdatePhotos(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/90 backdrop-blur-xl p-4 sm:p-6 animate-fade-in text-ivory">
      <div className="max-w-3xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-charcoal border border-gold/30 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-gold/20 flex items-center justify-between bg-charcoal-light">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold" />
            <div>
              <h3 className="font-serif text-xl text-ivory font-semibold">
                Magazine Content Manager (Admin)
              </h3>
              <p className="text-xs text-ivory/60">
                Customize wedding details, stories, cover, and photo gallery.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gold/20 text-ivory transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gold/20 bg-charcoal/50 text-xs uppercase tracking-widest font-medium">
          <button
            onClick={() => setActiveTab('SETTINGS')}
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'SETTINGS'
                ? 'border-b-2 border-gold text-gold bg-gold/10'
                : 'text-ivory/60 hover:text-ivory'
            }`}
          >
            Site Settings & Couple Info
          </button>
          <button
            onClick={() => setActiveTab('ADD_PHOTO')}
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'ADD_PHOTO'
                ? 'border-b-2 border-gold text-gold bg-gold/10'
                : 'text-ivory/60 hover:text-ivory'
            }`}
          >
            Upload Photo
          </button>
          <button
            onClick={() => setActiveTab('MANAGE_PHOTOS')}
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'MANAGE_PHOTOS'
                ? 'border-b-2 border-gold text-gold bg-gold/10'
                : 'text-ivory/60 hover:text-ivory'
            }`}
          >
            Manage Photos ({photos.length})
          </button>
        </div>

        {savedSuccess && (
          <div className="bg-gold/20 border-b border-gold text-gold px-6 py-2 text-xs font-medium flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>Changes saved successfully to local storage!</span>
          </div>
        )}

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === 'SETTINGS' && (
            <form onSubmit={handleConfigSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Couple Magazine Title
                  </label>
                  <input
                    type="text"
                    value={tempConfig.coupleNames}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, coupleNames: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Wedding Date
                  </label>
                  <input
                    type="text"
                    value={tempConfig.weddingDate}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, weddingDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Groom Name
                  </label>
                  <input
                    type="text"
                    value={tempConfig.groomName}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, groomName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                    Bride Name
                  </label>
                  <input
                    type="text"
                    value={tempConfig.brideName}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, brideName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  value={tempConfig.location}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, location: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Cover Photo Image URL
                </label>
                <input
                  type="text"
                  value={tempConfig.coverImage}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, coverImage: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Hero Editorial Quote
                </label>
                <textarea
                  rows={2}
                  value={tempConfig.welcomeQuote}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, welcomeQuote: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold text-charcoal font-semibold tracking-widest uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </button>
            </form>
          )}

          {activeTab === 'ADD_PHOTO' && (
            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Photograph Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sunset Vows under the Palms"
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                >
                  <option value="PRE-WEDDING">PRE-WEDDING</option>
                  <option value="ENGAGEMENT">ENGAGEMENT</option>
                  <option value="CEREMONY">CEREMONY</option>
                  <option value="RECEPTION">RECEPTION</option>
                  <option value="FAMILY">FAMILY</option>
                  <option value="DETAILS">DETAILS</option>
                </select>
              </div>

              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Upload Image File OR Paste URL
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="mb-2 block w-full text-xs text-ivory/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-charcoal hover:file:bg-gold-light"
                />
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or paste image URL (https://...)"
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              {newImageUrl && (
                <div className="rounded-xl overflow-hidden max-h-48 border border-gold/20">
                  <img
                    src={newImageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block text-ivory/70 uppercase tracking-wider mb-1">
                  Caption / Memory Story
                </label>
                <textarea
                  rows={2}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Short note about this photograph..."
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold text-charcoal font-semibold tracking-widest uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photograph to Gallery</span>
              </button>
            </form>
          )}

          {activeTab === 'MANAGE_PHOTOS' && (
            <div className="space-y-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-charcoal-light border border-gold/20"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-14 h-14 object-cover rounded-lg border border-gold/30"
                  />
                  <div className="flex-1 truncate">
                    <h4 className="font-serif text-sm text-ivory truncate">
                      {photo.title}
                    </h4>
                    <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                      {photo.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-ivory transition-colors"
                    title="Delete Photograph"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
