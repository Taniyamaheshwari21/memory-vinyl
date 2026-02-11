import { useRef, useState, useCallback } from 'react';
import Hero from './components/Hero';
import Turntable from './components/Turntable';
import PhotoDisc from './components/PhotoDisc';
import Visualizer from './components/Visualizer';

const SONG_SRC = '/song.mp3';

export default function App() {
  const [showVinyl, setShowVinyl] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch((err) => {
          console.warn('Play failed (e.g. autoplay policy):', err);
        });
      }
    }
    setIsPlaying((p) => !p);
  }, [isPlaying]);

  const handleVolumeChange = useCallback((e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  if (!showVinyl) {
    return <Hero onReveal={() => setShowVinyl(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] flex flex-col">
      <audio
        ref={audioRef}
        src={SONG_SRC}
        loop
        volume={volume}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      {/* Centered full-screen turntable */}
      <div className="flex items-center justify-center h-screen w-full">
        <div className="w-full h-full flex items-center justify-center">
          <Turntable isPlaying={isPlaying} onTonearmClick={togglePlay} />
        </div>
      </div>
    </div>
  );
}
