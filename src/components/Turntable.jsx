import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function Turntable({ isPlaying, onTonearmClick }) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-start overflow-hidden bg-[#f5f3f0]"
    >
      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
        <h1 className="text-[4rem] md:text-[5 rem] text-[#644619] font-serif italic text-center drop-shadow-lg">
          Will you be my <br/>Valentine??
        </h1>
      </div>

      <div className="relative flex items-center w-full h-full">
        <div
          className="relative shrink-0"
          style={{
            width: 'min(100vmin, 1000px)',
            height: 'min(100vmin, 1000px)',
            transform: 'translateX(-45%)',
          }}
        >
          {/* Vinyl record */}
          <motion.img
            src="/record.png"
            alt="Vinyl record"
            className="absolute inset-0 w-full h-full rounded-full select-none pointer-events-none"
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              },
            }}
          />

          {/* Tonearm */}
          <motion.img
            src="/tonearm.png"
            alt="Tonearm"
            className="absolute select-none cursor-pointer z-20"
            style={{
              width: '90vmin',
              left: '50%',
              top: '10%',
              transformOrigin: '-10% 28%',
            }}
            transition={{
              type: 'tween',
              duration: 0.45,
              ease: [0.4, 0, 0.2, 1],
            }}
            onClick={onTonearmClick}
          />
        </div>
      </div>

      {/* Non-clickable Instruction Button */}
      <div className="absolute top-10 left-100 z-50 pointer-events-none">
        <div className="px-6 py-3 rounded-full bg-[#644619] text-white text-sm tracking-wide shadow-md">
          Click on the tone arm
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full w-[28%] overflow-hidden bg-[#f8f6f2]">
        <motion.div
          animate={{
            y: isPlaying ? ['0%', '-50%'] : '0%',
          }}
          transition={{
            duration: 20,
            repeat: isPlaying ? Infinity : 0,
            ease: 'linear',
          }}
          className="flex flex-col gap-6 p-6"
        >
          {/* Duplicate images for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col gap-6">
              <img src="/img1.png" className="rounded-3xl" />
              <img src="/img2.png" className="rounded-3xl" />
              <img src="/img3.png" className="rounded-3xl" />
              <img src="/img4.png" className="rounded-3xl" />
              <img src="/img5.png" className="rounded-3xl" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
