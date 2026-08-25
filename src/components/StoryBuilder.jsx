import React, { useState } from 'react';
import { Plus, Trash2, Layout, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

export default function StoryBuilder({ stories, onUpdateStories, availablePhotos }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [quote, setQuote] = useState('');
  const [content, setContent] = useState('');
  const [layout, setLayout] = useState('COLLAGE');
  const [selectedPhotoIds, setSelectedPhotoIds] = useState([]);

  const handleCreateSection = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedPhotos = availablePhotos.filter((p) =>
      selectedPhotoIds.includes(p.id)
    );

    const newStorySection = {
      id: `story-${Date.now()}`,
      chapterNumber: String(stories.length + 1).padStart(2, '0'),
      chapterTitle: `SECTION ${String(stories.length + 1).padStart(2, '0')}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'WEDDING MEMORY',
      quote: quote.trim(),
      content: content.trim(),
      layout,
      imageLeft:
        selectedPhotos[0]?.imageUrl ||
        'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      imageRight:
        selectedPhotos[1]?.imageUrl ||
        selectedPhotos[0]?.imageUrl ||
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
      date: new Date().toLocaleDateString(),
    };

    onUpdateStories([...stories, newStorySection]);
    setTitle('');
    setSubtitle('');
    setQuote('');
    setContent('');
    setSelectedPhotoIds([]);
  };

  const handleDeleteSection = (id) => {
    onUpdateStories(stories.filter((s) => s.id !== id));
  };

  const togglePhotoSelect = (id) => {
    if (selectedPhotoIds.includes(id)) {
      setSelectedPhotoIds(selectedPhotoIds.filter((pId) => pId !== id));
    } else {
      setSelectedPhotoIds([...selectedPhotoIds, id]);
    }
  };

  return (
    <div className="space-y-8 text-xs text-ivory">
      {/* Add New Section Form */}
      <form onSubmit={handleCreateSection} className="p-6 rounded-2xl bg-charcoal-light border border-gold/30 space-y-4">
        <div className="flex items-center gap-2 text-gold font-semibold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>+ Create New Custom Story Section</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-ivory/70 uppercase tracking-wider mb-1">
              Section Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How We Met / The Vows"
              className="w-full px-3 py-2 rounded-xl bg-charcoal border border-gold/30 text-ivory focus:outline-none focus:border-gold text-xs"
            />
          </div>

          <div>
            <label className="block text-ivory/70 uppercase tracking-wider mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Mumbai • 2022"
              className="w-full px-3 py-2 rounded-xl bg-charcoal border border-gold/30 text-ivory focus:outline-none focus:border-gold text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-ivory/70 uppercase tracking-wider mb-1">
            Pull Quote (Optional)
          </label>
          <input
            type="text"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="e.g. Under golden arches, two lives became one..."
            className="w-full px-3 py-2 rounded-xl bg-charcoal border border-gold/30 text-ivory focus:outline-none focus:border-gold text-xs"
          />
        </div>

        <div>
          <label className="block text-ivory/70 uppercase tracking-wider mb-1">
            Story Narrative
          </label>
          <textarea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story text here..."
            className="w-full px-3 py-2 rounded-xl bg-charcoal border border-gold/30 text-ivory focus:outline-none focus:border-gold resize-none text-xs"
          />
        </div>

        {/* Photo Selection Grid */}
        {availablePhotos.length > 0 && (
          <div>
            <label className="block text-ivory/70 uppercase tracking-wider mb-2">
              Select Photographs for this Story ({selectedPhotoIds.length} Selected)
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-2 bg-charcoal rounded-xl border border-gold/20">
              {availablePhotos.map((p) => {
                const isSelected = selectedPhotoIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => togglePhotoSelect(p.id)}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer ${
                      isSelected ? 'border-gold shadow-gold-glow' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-16 object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1 p-0.5 rounded-full bg-gold text-charcoal">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gold text-charcoal font-semibold tracking-widest uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Section to Magazine</span>
        </button>
      </form>

      {/* Existing Sections List */}
      <div className="space-y-3">
        <h4 className="font-serif text-base text-gold uppercase tracking-wider">
          Active Magazine Sections ({stories.length})
        </h4>

        {stories.map((story) => (
          <div
            key={story.id}
            className="flex items-center justify-between p-4 rounded-xl bg-charcoal-light border border-gold/20"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-gold uppercase font-semibold">
                {story.chapterTitle} • {story.subtitle}
              </span>
              <h5 className="font-serif text-base text-ivory">{story.title}</h5>
            </div>

            <button
              onClick={() => handleDeleteSection(story.id)}
              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-ivory transition-colors"
              title="Delete Section"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
