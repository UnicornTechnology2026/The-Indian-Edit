import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface IntroHeroSplashProps {
  onEnter: () => void;
}

export const IntroHeroSplash: React.FC<IntroHeroSplashProps> = ({ onEnter }) => {
  const handleStart = () => {
    sound.playSuccess();
    onEnter();
  };

  return (
    <div
      id="intro-hero-splash"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 bg-[#070403]/95 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      {/* Top Bar with Brand Identifier & Quick Skip */}
      <div className="w-full max-w-5xl flex items-center justify-between pt-2 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 bg-[#1a0c06] flex items-center justify-center p-1.5 shadow-md">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-[#d4af37]">
              <path d="M19 13c.6 0 1-.4 1-1V8.5C20 5.5 17.5 3 14.5 3c-1.8 0-3.4 1-4.2 2.5C9.5 5.2 8.7 5 8 5 5.8 5 4 6.8 4 9v6h2v-3.5c0-.8.7-1.5 1.5-1.5h1.5v5h2v-5h2.5c.8 0 1.5.7 1.5 1.5V17h2v-4h2z" />
            </svg>
          </div>
          <span className="font-serif tracking-[0.2em] text-sm sm:text-base font-bold text-[#faf5eb] uppercase">
            THE INDIAN EDIT
          </span>
        </div>

        <button
          id="btn-skip-intro"
          onClick={handleStart}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a0c06] hover:bg-[#2d160b] border border-[#d4af37]/40 text-xs text-[#f7e7a9] hover:text-[#fff3c4] hover:border-[#d4af37] transition-all cursor-pointer shadow-md"
          title="Direct to Experience"
        >
          <span>Skip to Experience</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Showcase Stage: Displaying the image AS IT IS with zero alterations or distortion */}
      <div className="relative my-auto flex flex-col items-center justify-center max-w-full">
        <div className="relative group flex items-center justify-center">
          {/* Exact, pristine, unadulterated original bottle artwork */}
          <img
            id="the-indian-edit-original-image"
            src="/assets/indian-edit-hero.jpg"
            alt="The Indian Edit Super Premium Whisky"
            className="block max-h-[68vh] sm:max-h-[72vh] md:max-h-[76vh] w-auto max-w-full object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] border border-[#d4af37]/30 transition-transform duration-500 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Bottom CTA Action Bar */}
      <div className="w-full max-w-md flex flex-col items-center pb-3 pt-4">
        <button
          id="btn-enter-experience"
          onClick={handleStart}
          className="w-full sm:w-auto px-10 py-3.5 btn-gold text-sm sm:text-base font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-3 cursor-pointer shadow-[0_8px_30px_rgba(212,175,55,0.45)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.65)] transform hover:-translate-y-0.5 transition-all"
        >
          <span>ENTER THE EXPERIENCE</span>
          <ArrowRight className="w-5 h-5 text-[#070403]" />
        </button>

        <p className="mt-2 text-[11px] font-mono text-[#ab9580] tracking-widest uppercase">
          SUPER PREMIUM WHISKY • CRAFTED IN INDIA
        </p>
      </div>
    </div>
  );
};
