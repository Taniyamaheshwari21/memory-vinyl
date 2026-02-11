import { useMemo } from 'react';
import { motion } from 'framer-motion';

const DISC_SIZE = 280;
const PHOTO_COUNT = 12;
const PHOTO_SIZE = 56;
const INNER_RADIUS = 70;
const OUTER_RADIUS = 120;

function getPhotoPosition(index) {
  const angle = (index / PHOTO_COUNT) * Math.PI * 2 - Math.PI / 2;
  const r = INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) * 0.5;
  const x = DISC_SIZE / 2 + r * Math.cos(angle) - PHOTO_SIZE / 2;
  const y = DISC_SIZE / 2 + r * Math.sin(angle) - PHOTO_SIZE / 2;
  return { x, y, angle: (angle * 180) / Math.PI };
}

export default function PhotoDisc({ isPlaying }) {
  const positions = useMemo(() => {
    return Array.from({ length: PHOTO_COUNT }, (_, i) => ({
      ...getPhotoPosition(i),
      src: `/memories/${i + 1}.jpg`,
    }));
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: DISC_SIZE,
          height: DISC_SIZE,
          background: 'linear-gradient(145deg, #f0ebe6 0%, #e5dfd8 50%, #d9d2c9 100%)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          rotate: {
            duration: 20,
            repeat: isPlaying ? Infinity : 0,
            ease: 'linear',
          },
        }}
      >
        {/* Center label area */}
        <div
          className="absolute rounded-full z-10 flex items-center justify-center border-2 border-[#d0c9c0]"
          style={{
            width: 80,
            height: 80,
            left: '50%',
            top: '50%',
            marginLeft: -40,
            marginTop: -40,
            background: 'linear-gradient(145deg, #fff 0%, #f5f0eb 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <span className="text-[10px] font-medium text-[#888] tracking-wider">MEMORY</span>
        </div>

        {/* Photo stickers around the disc */}
        {positions.map(({ x, y, src }, i) => (
          <motion.div
            key={i}
            className="absolute overflow-hidden rounded-full border-2 border-white shadow-md"
            style={{
              left: x,
              top: y,
              width: PHOTO_SIZE,
              height: PHOTO_SIZE,
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }}
            initial={false}
          >
            <img
              src={src}
              alt={`Memory ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #e8e4df 0%, #d4cfc8 100%)';
                e.target.alt = '';
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
