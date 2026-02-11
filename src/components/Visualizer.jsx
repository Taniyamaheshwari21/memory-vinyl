import { useRef, useEffect, useState } from 'react';

const BAR_COUNT = 32;
const BAR_WIDTH = 4;
const GAP = 3;
const MIN_HEIGHT = 4;
const MAX_HEIGHT = 48;
const SMOOTHING = 0.75;

export default function Visualizer({ audioRef, isPlaying }) {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (isPlaying && audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    let analyser = null;
    let audioContext = null;
    let source = null;

    const initAnalyser = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = SMOOTHING;
        analyser.minDecibels = -70;
        analyser.maxDecibels = -25;

        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyserRef.current = analyser;
        setFallback(false);
        return true;
      } catch (err) {
        console.warn('Visualizer: could not create analyser', err);
        setFallback(true);
        return false;
      }
    };

    if (!initAnalyser()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const totalWidth = BAR_COUNT * BAR_WIDTH + (BAR_COUNT - 1) * GAP;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.parentElement?.clientWidth || 320;
      const h = 80;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!analyserRef.current || !isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      analyser.getByteFrequencyData(dataArray);

      const w = canvas.parentElement?.clientWidth || 320;
      const h = 80;
      ctx.clearRect(0, 0, w, h);

      const step = Math.floor(dataArray.length / BAR_COUNT);
      const startX = (w - totalWidth) / 2 + BAR_WIDTH / 2 + GAP / 2;

      for (let i = 0; i < BAR_COUNT; i++) {
        const value = dataArray[i * step] || 0;
        const normalized = value / 255;
        const barHeight = MIN_HEIGHT + normalized * (MAX_HEIGHT - MIN_HEIGHT);
        const x = startX + i * (BAR_WIDTH + GAP);
        const y = h / 2 - barHeight / 2;

        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.beginPath();
        ctx.roundRect(x - BAR_WIDTH / 2, y, BAR_WIDTH, barHeight, 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      try {
        if (source) source.disconnect();
        if (analyser) analyser.disconnect();
        if (audioContext) audioContext.close();
      } catch (_) {}
    };
  }, [audioRef, isPlaying]);

  if (fallback) {
    return (
      <div className="h-20 flex items-center justify-center text-[#999] text-sm">
        Visualizer unavailable
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4">
      <canvas
        ref={canvasRef}
        className="block w-full max-w-md h-20"
        style={{ height: 80 }}
      />
    </div>
  );
}
