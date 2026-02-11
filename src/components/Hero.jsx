import { useState } from 'react';

const CORRECT_INDEX = 2;

export default function Hero({ onReveal }) {
  const [hintVisible, setHintVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleCoverClick = (index) => {
    if (index === CORRECT_INDEX && !animating) {
      setAnimating(true);
      setTimeout(() => setRevealed(true), 900);
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center bg-[#f8f6f2] overflow-hidden">
      <div className="flex flex-col items-center justify-center relative z-10">

        {/* ---------- TITLE (PRE REVEAL) ---------- */}
        {!revealed && (
          <h1 className="hero-title text-[#644619] text-center mb-[6vh] text-5xl md:text-6xl italic transition-opacity duration-700">
            Choose the correct one
          </h1>
        )}

        {/* ---------- ALBUM COVERS ---------- */}
        {!revealed && (
          <>
            <div className="flex justify-center items-center gap-[2.5vw] mb-[6vh] px-4">
              {[0, 1, 2].map((index) => {
                const isCorrect = index === CORRECT_INDEX;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCoverClick(index)}
                    className={`
                      relative transition-all duration-900 ease-in-out
                      ${!animating ? 'animate-[subtle-shake_3.5s_ease-in-out_infinite]' : ''}
                      ${animating && !isCorrect ? 'opacity-0 scale-90' : ''}
                    `}
                  >
                    <img
                      src="/sleeve.png"
                      alt=""
                      className="object-cover aspect-square w-[22vw] min-w-30 max-w-55 h-[22vw] min-h-30 max-h-55 rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.25)] sleeve-interactive"
                    />
                  </button>
                );
              })}
            </div>

            <p className="hero-subtitle text-[#644619] text-center mb-[6vh] transition-opacity duration-700">
              only one of them has a surprise!
            </p>
          </>
        )}

        {/* ---------- REVEAL STATE ---------- */}
        {revealed && (
          <>
            <h1 className="hero-title text-[#644619] text-center mb-[3vh] -mt-[16vh] text-5xl md:text-6xl italic transition-opacity duration-700">
              Yayy!! you chose the right one
            </h1>

            <p className="hero-subtitle text-[#644619] text-center mb-[4vh] transition-opacity duration-700">
              it’s a vinyl record.
            </p>

            {/* RECORD + SLEEVE */}
            <div className="relative flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Record */}
                <img
                  src="/record.png"
                  alt="Vinyl Record"
                  className={`
                    absolute top-1/2 left-1/2 -translate-y-1/2
                    transition-transform duration-700 ease-out
                    ${revealed ? 'translate-x-[35%]' : 'translate-x-0'}
                    w-[18vw] min-w-[140px] max-w-[200px]
                    h-[18vw] min-h-[140px] max-h-[200px]
                    z-0
                  `}
                />

                {/* Sleeve */}
                <img
                  src="/sleeve.png"
                  alt="Album Sleeve"
                  className={`
                    relative object-cover aspect-square
                    w-[22vw] min-w-[160px] max-w-[240px]
                    h-[22vw] min-h-[160px] max-h-[240px]
                    rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                    z-10 transition-transform duration-700 ease-out
                    ${revealed ? '-translate-x-[5%]' : 'translate-x-0'}
                  `}
                />
              </div>
            </div>

            {/* PLAY BUTTON */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onReveal && onReveal()}
                className="px-6 py-3 rounded-full bg-[#644619] text-white text-sm tracking-wide shadow-md hover:bg-[#543f2b] transition-colors"
              >
                Play the song
              </button>
            </div>
          </>
        )}
      </div>

      {/* ---------- HINT BUTTON ---------- */}
      <button
        type="button"
        onClick={() => setHintVisible(true)}
        className="absolute bottom-[5vh] right-[5vw] flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#644619] bg-[#f5f2eb] text-[#644619] text-sm tracking-wide hover:bg-[#ebe7df] transition-colors z-20"
      >
        HINT
      </button>

      {/* ---------- HINT MODAL ---------- */}
      {hintVisible && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setHintVisible(false)}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          <div className="relative bg-[#f5f2eb] border-2 border-[#644619] rounded-lg px-6 py-5 shadow-xl">
            <p className="text-[#644619] font-semibold text-sm uppercase tracking-wider mb-2">
              Hint:
            </p>
            <p className="text-[#644619] text-lg">
              A woman is always _______?
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
