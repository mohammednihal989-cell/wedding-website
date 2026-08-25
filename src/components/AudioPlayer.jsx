import React, { useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function AudioPlayer({ config, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log('Autoplay blocked by browser policy:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <audio
        ref={audioRef}
        src={config.musicUrl}
        loop
        preload="auto"
      />

      <div className="flex items-center gap-3 p-2.5 pr-5 rounded-full bg-charcoal-dark/90 dark:bg-charcoal/90 text-ivory border border-gold/30 backdrop-blur-xl shadow-luxury hover:border-gold transition-all duration-300 group">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-gold text-charcoal hover:bg-gold-light transition-transform duration-300 group-hover:scale-105"
          title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Track Info & Equalizer Animation */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-gold">
              SOUNDTRACK
            </span>
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-gold animate-[bounce_1s_infinite_100ms] h-full" />
                <span className="w-0.5 bg-gold animate-[bounce_1s_infinite_300ms] h-2/3" />
                <span className="w-0.5 bg-gold animate-[bounce_1s_infinite_200ms] h-4/5" />
              </div>
            )}
          </div>
          <span className="text-xs font-serif italic text-ivory/90 truncate max-w-[140px] sm:max-w-[180px]">
            {config.musicTitle || 'Eternal Promise (Piano & Strings)'}
          </span>
        </div>
      </div>
    </div>
  );
}
