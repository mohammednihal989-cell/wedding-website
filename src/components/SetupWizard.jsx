import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  FileText,
  Clock,
  Shirt,
  Mail,
  Compass,
} from 'lucide-react';

export default function SetupWizard({ onComplete }) {
  const [step, setStep] = useState(1);

  // Form State
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [tagline, setTagline] = useState('THE BEGINNING OF FOREVER');
  const [introduction, setIntroduction] = useState(
    'Welcome to our interactive wedding digital magazine. A collection of our eternal vows, shared laughter, and cherished memories.'
  );

  const [weddingDate, setWeddingDate] = useState('');
  const [weddingTime, setWeddingTime] = useState('');
  const [venueName, setVenueName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [dressCode, setDressCode] = useState('Black Tie / Traditional Elegance');
  const [rsvpDetails, setRsvpDetails] = useState('');
  const [invitationMessage, setInvitationMessage] = useState(
    'Together with our families, we joyfully invite you to celebrate our union as we exchange our sacred vows.'
  );

  // Cover Image
  const [coverImage, setCoverImage] = useState('');

  // Bulk Upload State
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const coupleNames =
    partner1 && partner2
      ? `${partner1.toUpperCase()} & ${partner2.toUpperCase()}`
      : partner1
      ? partner1.toUpperCase()
      : 'OUR WEDDING STORY';

  const coupleInitials =
    partner1 && partner2
      ? `${partner1[0].toUpperCase()} & ${partner2[0].toUpperCase()}`
      : 'W';

  const locationStr =
    city && state ? `${city.toUpperCase()}, ${state.toUpperCase()}` : city.toUpperCase();

  // File Upload Handlers
  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        id: `photo-${Date.now()}-${i}`,
        title: file.name.split('.')[0].replace(/[-_]/g, ' '),
        category: 'CEREMONY',
        caption: '',
        date: weddingDate || 'Wedding Day',
        imageUrl: dataUrl,
        download: true,
        featured: true,
        aspectRatio: 'landscape',
      });

      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setUploadedPhotos((prev) => [...prev, ...newPhotos]);
    setIsUploading(false);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    const config = {
      isConfigured: true,
      isPublished: true,
      partner1,
      partner2,
      coupleNames,
      coupleInitials,
      tagline,
      introduction,
      weddingDate,
      weddingTime,
      venueName,
      location: locationStr,
      city,
      state,
      venueAddress: fullAddress,
      googleMapsUrl,
      dressCode,
      rsvpDetails,
      invitationMessage,
      coverImage:
        coverImage ||
        (uploadedPhotos.length > 0 ? uploadedPhotos[0].imageUrl : ''),
      musicTitle: 'Romantic Ambient Soundtrack',
      musicUrl:
        'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    };

    onComplete(config, uploadedPhotos);
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-gold selection:text-charcoal">
      {/* Header Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between border-b border-gold/20 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center font-serif text-gold text-sm shadow-gold-glow">
            {coupleInitials}
          </div>
          <div>
            <h1 className="font-serif text-lg text-ivory tracking-wider">
              {coupleNames}
            </h1>
            <span className="text-[10px] tracking-widest uppercase text-gold">
              PERSONAL WEDDING MAGAZINE SETUP
            </span>
          </div>
        </div>

        {/* Step Progress Pills */}
        <div className="hidden sm:flex items-center gap-2 text-xs tracking-wider">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                step === s
                  ? 'border-gold bg-gold text-charcoal font-bold shadow-gold-glow'
                  : step > s
                  ? 'border-gold/60 text-gold bg-gold/10'
                  : 'border-ivory/20 text-ivory/40'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Content Card */}
      <div className="max-w-3xl w-full mx-auto my-auto py-8">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
                STEP 01 OF 05
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                The Couple Information
              </h2>
              <p className="text-xs text-ivory/70 max-w-md mx-auto font-light">
                Enter your names to personalize your luxury digital wedding magazine.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  Partner 1 Name *
                </label>
                <input
                  type="text"
                  required
                  value={partner1}
                  onChange={(e) => setPartner1(e.target.value)}
                  placeholder="e.g. Alexander"
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  Partner 2 Name *
                </label>
                <input
                  type="text"
                  required
                  value={partner2}
                  onChange={(e) => setPartner2(e.target.value)}
                  placeholder="e.g. Sophia"
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                Wedding Tagline / Motto
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. THE BEGINNING OF FOREVER"
                className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                Short Story Introduction
              </label>
              <textarea
                rows={3}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="Share a short welcome message..."
                className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold resize-none"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
                STEP 02 OF 05
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                Wedding Details & Venue
              </h2>
              <p className="text-xs text-ivory/70 max-w-md mx-auto font-light">
                Specify your wedding date, time, and celebration location.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  Wedding Date *
                </label>
                <input
                  type="text"
                  required
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  placeholder="e.g. 18 October 2026"
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  Wedding Time
                </label>
                <input
                  type="text"
                  value={weddingTime}
                  onChange={(e) => setWeddingTime(e.target.value)}
                  placeholder="e.g. 5:00 PM IST"
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. London"
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  State / Country
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. United Kingdom"
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                Venue Name
              </label>
              <input
                type="text"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="e.g. The Ritz Ballroom & Gardens"
                className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                Full Address
              </label>
              <input
                type="text"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="e.g. 150 Piccadilly, St. James's, London W1J 9BR"
                className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
                STEP 03 OF 05
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                Select Cover Photograph
              </h2>
              <p className="text-xs text-ivory/70 max-w-md mx-auto font-light">
                Choose the main cover portrait for your digital wedding magazine.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-charcoal-light border-2 border-dashed border-gold/40 text-center space-y-4">
              {coverImage ? (
                <div className="space-y-4">
                  <img
                    src={coverImage}
                    alt="Cover Preview"
                    className="max-h-64 mx-auto rounded-xl border border-gold/30 object-cover shadow-luxury"
                  />
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-charcoal text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gold-light transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Change Cover Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-3 py-6">
                  <ImageIcon className="w-12 h-12 text-gold mx-auto opacity-70 animate-bounce" />
                  <h3 className="font-serif text-lg text-ivory">
                    Upload Your Main Cover Photograph
                  </h3>
                  <p className="text-xs text-ivory/60">
                    JPG, PNG, WEBP, or HEIC format supported
                  </p>
                  <label className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-charcoal text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-gold-light transition-all shadow-gold-glow">
                    <Upload className="w-4 h-4" />
                    <span>Choose Cover Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
                STEP 04 OF 05
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                Upload Wedding Photo Archive
              </h2>
              <p className="text-xs text-ivory/70 max-w-md mx-auto font-light">
                Drag & drop or bulk upload your wedding memories (10, 50, 100+ photos).
              </p>
            </div>

            {/* Drag and Drop Zone */}
            <div className="p-8 rounded-2xl bg-charcoal-light border-2 border-dashed border-gold/40 text-center space-y-4">
              <Upload className="w-12 h-12 text-gold mx-auto opacity-80" />
              <h3 className="font-serif text-xl text-ivory">
                DRAG & DROP YOUR WEDDING PHOTOS HERE
              </h3>
              <p className="text-xs text-ivory/60">
                Or click below to choose multiple photos from your computer
              </p>

              <label className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-charcoal text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-gold-light transition-all shadow-gold-glow">
                <Upload className="w-4 h-4" />
                <span>Select Multiple Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleBulkPhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="p-4 rounded-xl bg-charcoal-light border border-gold/30 space-y-2">
                <div className="flex justify-between text-xs text-gold font-semibold">
                  <span>Uploading photos...</span>
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

            {/* Uploaded Count Badge & Grid Previews */}
            {uploadedPhotos.length > 0 && (
              <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center text-xs text-gold">
                  <span className="font-semibold uppercase tracking-wider">
                    {uploadedPhotos.length} Photographs Ready
                  </span>
                  <span>Previews loaded</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-h-48 overflow-y-auto p-2 bg-charcoal-light rounded-xl border border-gold/20">
                  {uploadedPhotos.map((p) => (
                    <img
                      key={p.id}
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-16 object-cover rounded-lg border border-gold/30"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs tracking-ultra uppercase text-gold font-semibold">
                STEP 05 OF 05
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                Personal Invitation & Dress Code
              </h2>
              <p className="text-xs text-ivory/70 max-w-md mx-auto font-light">
                Write your official wedding invitation wording for family & guests.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                Personal Invitation Message
              </label>
              <textarea
                rows={4}
                value={invitationMessage}
                onChange={(e) => setInvitationMessage(e.target.value)}
                placeholder="Write your personal invitation wording here..."
                className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  Dress Code
                </label>
                <input
                  type="text"
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                  placeholder="e.g. Formal Black Tie"
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
                  RSVP Instructions / Contact
                </label>
                <input
                  type="text"
                  value={rsvpDetails}
                  onChange={(e) => setRsvpDetails(e.target.value)}
                  placeholder="e.g. RSVP by 1st Sept to rsvp@ourwedding.com"
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons Footer */}
      <div className="max-w-4xl w-full mx-auto border-t border-gold/20 pt-4 flex justify-between items-center">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 text-ivory hover:bg-gold/10 text-xs tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleFinalSubmit}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gold text-charcoal font-bold text-xs tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow animate-bounce"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch My Wedding Magazine</span>
          </button>
        )}
      </div>
    </div>
  );
}
