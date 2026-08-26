import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Share2,
  Eye,
  Settings,
  Lock,
  Globe,
  Upload,
  Save,
  Check,
  X,
  Sparkles,
  Link as LinkIcon,
  ShieldAlert,
  ArrowLeft,
  Building,
} from 'lucide-react';
import { generateShareToken } from '../utils/storageService';
import AdminStudio from './AdminStudio';
import ShareModal from './ShareModal';

export default function AdminDashboard({
  clients = [],
  companyConfig,
  onSaveClient,
  onDeleteClient,
  onSaveCompanyConfig,
  onCloseAdmin,
  onPreviewClient,
}) {
  const [activeTab, setActiveTab] = useState('CLIENTS');
  const [selectedClientForEdit, setSelectedClientForEdit] = useState(null);
  const [selectedClientForShare, setSelectedClientForShare] = useState(null);

  // New Client Form Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newServiceType, setNewServiceType] = useState('Wedding');
  const [newEventDate, setNewEventDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newCoverPhoto, setNewCoverPhoto] = useState('');

  // Company Settings Form State
  const [tempCompanyConfig, setTempCompanyConfig] = useState({ ...companyConfig });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCreateClientSubmit = (e) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const token = generateShareToken();
    const newClientObj = {
      id: `client-${Date.now()}`,
      name: newClientName.trim(),
      serviceType: newServiceType,
      eventDate: newEventDate.trim() || '2026',
      location: newLocation.trim() || 'Kochi, Kerala',
      contactEmail: newContactEmail.trim(),
      contactPhone: newContactPhone.trim(),
      status: 'PUBLISHED',
      shareToken: token,
      isPasswordProtected: false,
      password: '',
      downloadsEnabled: true,
      coverPhoto:
        newCoverPhoto ||
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop',
      invitationMessage: 'Together with our families, we invite you to celebrate our union.',
      venueName: 'Grand Celebration Venue',
      venueAddress: newLocation.trim(),
      tagline: 'THE BEGINNING OF FOREVER',
      introduction: 'Welcome to our private digital magazine.',
      photos: [],
      stories: [],
    };

    onSaveClient(newClientObj);
    setNewClientName('');
    setNewEventDate('');
    setNewLocation('');
    setNewContactEmail('');
    setNewContactPhone('');
    setNewCoverPhoto('');
    setIsCreateModalOpen(false);
  };

  const handleTogglePublishStatus = (client) => {
    const updatedStatus = client.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    onSaveClient({ ...client, status: updatedStatus });
  };

  const handleCompanySave = (e) => {
    e.preventDefault();
    onSaveCompanyConfig(tempCompanyConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory font-sans selection:bg-gold selection:text-charcoal p-4 sm:p-8">
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-gold/20 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center font-serif text-gold text-lg font-bold shadow-gold-glow">
            N
          </div>
          <div>
            <h1 className="font-serif text-2xl text-ivory tracking-wider flex items-center gap-2">
              <span>{companyConfig.companyName || 'NIHALCO'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/40 uppercase tracking-widest">
                ADMIN DASHBOARD
              </span>
            </h1>
            <span className="text-xs text-ivory/60">
              Multi-Client Private Digital Magazine Platform
            </span>
          </div>
        </div>

        <button
          onClick={onCloseAdmin}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all text-xs tracking-widest uppercase font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Admin Studio</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gold/20 text-xs uppercase tracking-widest font-medium">
          <button
            onClick={() => setActiveTab('CLIENTS')}
            className={`py-3 px-6 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'CLIENTS'
                ? 'border-gold text-gold font-bold bg-gold/10'
                : 'border-transparent text-ivory/60 hover:text-ivory'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Client Management ({clients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SETTINGS')}
            className={`py-3 px-6 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'SETTINGS'
                ? 'border-gold text-gold font-bold bg-gold/10'
                : 'border-transparent text-ivory/60 hover:text-ivory'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Company Branding & Contact</span>
          </button>
        </div>

        {/* CLIENTS TAB */}
        {activeTab === 'CLIENTS' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-ivory">
                  Private Client Magazines
                </h2>
                <p className="text-xs text-ivory/60">
                  Each client has a completely isolated photo archive and unique share token.
                </p>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 rounded-full bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Client</span>
              </button>
            </div>

            {/* Clients Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => {
                const shareUrl = `${window.location.origin}${window.location.pathname}#/m/${client.shareToken}`;
                return (
                  <div
                    key={client.id}
                    className="p-6 rounded-2xl bg-charcoal-light border border-gold/20 hover:border-gold/50 transition-all shadow-luxury space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] tracking-ultra uppercase text-gold font-semibold px-2.5 py-1 rounded-full bg-gold/10 border border-gold/30">
                          {client.serviceType}
                        </span>

                        <span
                          className={`text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full border ${
                            client.status === 'PUBLISHED'
                              ? 'bg-green-500/10 text-green-400 border-green-500/30'
                              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                          }`}
                        >
                          {client.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-2xl text-ivory">
                          {client.name}
                        </h3>
                        <p className="text-xs text-ivory/60 font-light mt-0.5">
                          {client.eventDate} • {client.location}
                        </p>
                      </div>

                      <div className="text-xs text-ivory/70 space-y-1 pt-2 border-t border-gold/10">
                        <div className="flex justify-between">
                          <span>Photos Uploaded:</span>
                          <span className="text-gold font-semibold">
                            {client.photos?.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stories Created:</span>
                          <span className="text-gold font-semibold">
                            {client.stories?.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between truncate">
                          <span>Share Token:</span>
                          <span className="text-gold font-mono text-[11px] truncate">
                            {client.shareToken}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="pt-4 border-t border-gold/20 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedClientForEdit(client)}
                        className="py-2.5 px-3 rounded-xl bg-gold/20 text-gold hover:bg-gold hover:text-charcoal text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>

                      <button
                        onClick={() => onPreviewClient(client.shareToken)}
                        className="py-2.5 px-3 rounded-xl bg-charcoal border border-gold/30 text-ivory hover:border-gold text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => setSelectedClientForShare(client)}
                        className="py-2 px-3 rounded-xl border border-gold/30 text-gold hover:bg-gold/10 text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>

                      <button
                        onClick={() => handleTogglePublishStatus(client)}
                        className="py-2 px-3 rounded-xl border border-gold/20 text-ivory/70 hover:text-ivory text-xs uppercase tracking-wider transition-colors"
                      >
                        {client.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                      </button>

                      <button
                        onClick={() => onDeleteClient(client.id)}
                        className="col-span-2 py-2 text-center text-red-400 hover:text-red-300 text-[11px] uppercase tracking-wider transition-colors"
                      >
                        Delete Client
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'SETTINGS' && (
          <form onSubmit={handleCompanySave} className="max-w-2xl mx-auto space-y-6 bg-charcoal-light p-8 rounded-2xl border border-gold/30">
            <h3 className="font-serif text-2xl text-ivory">
              NIHALCO Company Settings
            </h3>

            {savedSuccess && (
              <div className="bg-gold/20 border border-gold text-gold p-3 rounded-xl text-xs text-center font-semibold">
                Company branding and contact info saved successfully!
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                Company Name
              </label>
              <input
                type="text"
                value={tempCompanyConfig.companyName || ''}
                onChange={(e) =>
                  setTempCompanyConfig({ ...tempCompanyConfig, companyName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                Company Tagline
              </label>
              <input
                type="text"
                value={tempCompanyConfig.companyTagline || ''}
                onChange={(e) =>
                  setTempCompanyConfig({ ...tempCompanyConfig, companyTagline: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={tempCompanyConfig.contactEmail || ''}
                  onChange={(e) =>
                    setTempCompanyConfig({ ...tempCompanyConfig, contactEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={tempCompanyConfig.contactPhone || ''}
                  onChange={(e) =>
                    setTempCompanyConfig({ ...tempCompanyConfig, contactPhone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                Company Location
              </label>
              <input
                type="text"
                value={tempCompanyConfig.location || ''}
                onChange={(e) =>
                  setTempCompanyConfig({ ...tempCompanyConfig, location: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                About NIHALCO Text
              </label>
              <textarea
                rows={4}
                value={tempCompanyConfig.aboutText || ''}
                onChange={(e) =>
                  setTempCompanyConfig({ ...tempCompanyConfig, aboutText: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save NIHALCO Company Settings</span>
            </button>
          </form>
        )}
      </div>

      {/* CREATE NEW CLIENT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/90 backdrop-blur-md p-4 animate-fade-in text-ivory">
          <div className="max-w-lg w-full rounded-2xl bg-charcoal border border-gold/40 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gold/20 text-ivory transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-ivory mb-2">
              Create New Client
            </h3>
            <p className="text-xs text-ivory/60 mb-6 font-light">
              Create an isolated private digital magazine workspace for a new client.
            </p>

            <form onSubmit={handleCreateClientSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-gold mb-1 font-medium">
                  Client Name (Couple / Host) *
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Nihal & Fathima"
                  className="w-full px-3 py-2.5 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-gold mb-1 font-medium">
                    Service Type
                  </label>
                  <select
                    value={newServiceType}
                    onChange={(e) => setNewServiceType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Custom Event">Custom Event</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-gold mb-1 font-medium">
                    Event Date
                  </label>
                  <input
                    type="text"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    placeholder="e.g. 15 Nov 2026"
                    className="w-full px-3 py-2.5 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gold mb-1 font-medium">
                  Location / Venue City
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Kochi, Kerala"
                  className="w-full px-3 py-2.5 rounded-xl bg-charcoal-light border border-gold/30 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold text-charcoal font-semibold tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow flex items-center justify-center gap-2 mt-4"
              >
                <Plus className="w-4 h-4" />
                <span>Create Client Workspace</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CLIENT STUDIO EDITOR MODAL (MANAGEMENT) */}
      {selectedClientForEdit && (
        <AdminStudio
          isOpen={!!selectedClientForEdit}
          onClose={() => setSelectedClientForEdit(null)}
          config={{
            isConfigured: true,
            isPublished: selectedClientForEdit.status === 'PUBLISHED',
            coupleNames: selectedClientForEdit.name,
            groomName: selectedClientForEdit.name?.split('&')[0]?.trim() || '',
            brideName: selectedClientForEdit.name?.split('&')[1]?.trim() || '',
            weddingDate: selectedClientForEdit.eventDate,
            weddingTime: selectedClientForEdit.weddingTime || '5:00 PM',
            venueName: selectedClientForEdit.venueName || '',
            location: selectedClientForEdit.location || '',
            tagline: selectedClientForEdit.tagline || 'THE BEGINNING OF FOREVER',
            invitationMessage: selectedClientForEdit.invitationMessage || '',
            coverImage: selectedClientForEdit.coverPhoto || '',
            musicTitle: 'Eternal Promise',
            musicUrl:
              'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
          }}
          onUpdateConfig={(newConfig) => {
            const updated = {
              ...selectedClientForEdit,
              name: newConfig.coupleNames,
              eventDate: newConfig.weddingDate,
              location: newConfig.location,
              venueName: newConfig.venueName,
              tagline: newConfig.tagline,
              invitationMessage: newConfig.invitationMessage,
              coverPhoto: newConfig.coverImage,
            };
            setSelectedClientForEdit(updated);
            onSaveClient(updated);
          }}
          photos={selectedClientForEdit.photos || []}
          onUpdatePhotos={(newPhotos) => {
            const updated = { ...selectedClientForEdit, photos: newPhotos };
            setSelectedClientForEdit(updated);
            onSaveClient(updated);
          }}
          stories={selectedClientForEdit.stories || []}
          onUpdateStories={(newStories) => {
            const updated = { ...selectedClientForEdit, stories: newStories };
            setSelectedClientForEdit(updated);
            onSaveClient(updated);
          }}
          onResetAll={() => {
            onDeleteClient(selectedClientForEdit.id);
            setSelectedClientForEdit(null);
          }}
        />
      )}

      {/* SHARE MODAL FOR CLIENT */}
      {selectedClientForShare && (
        <ShareModal
          isOpen={!!selectedClientForShare}
          onClose={() => setSelectedClientForShare(null)}
          photo={null}
        />
      )}
    </div>
  );
}
