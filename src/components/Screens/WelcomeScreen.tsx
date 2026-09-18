import React from "react";
import { useGame } from "../../context/GameContext";
import {
  ArrowRight,
  Compass,
  Sparkles,
  Award,
  Layers,
  Flame,
} from "lucide-react";
import { sound } from "../../utils/audio";

export const WelcomeScreen: React.FC = () => {
  const { state, navigateTo } = useGame();

  const handleStart = () => {
    sound.playSuccess();
    navigateTo("screen-level-1");
  };

  const levelsOverview = [
    {
      num: "01",
      title: "Harvest Rush",
      desc: "10s fast-paced catch challenge collecting signature bottles & heritage tokens.",
      icon: "",
    },
    {
      num: "02",
      title: "Zero Mile Center",
      desc: "Pinpoint Nagpur on the geographic map of India to calculate precision distance.",
      icon: "📍",
    },
    {
      num: "03",
      title: "Decode The Bottle",
      desc: "Explore the crystalline bottle craft, botanical botanicals, and hand-embossed seals.",
      icon: "🔍",
    },
    {
      num: "04",
      title: "Master The Blend",
      desc: "Whisky alchemy challenge balancing peat, oak, and citrus notes for a speed bonus.",
      icon: "🥃",
    },
    {
      num: "05",
      title: "Hunt The Edit",
      desc: "3-round hidden object challenge spotting 5 signature bottles in royal scenes before time expires.",
      icon: "🥃",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 animate-fade-in text-center">
      {/* Prologue Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a0c06]/90 border border-[#d4af37]/50 text-xs font-semibold tracking-[0.25em] text-[#f7e7a9] uppercase mb-4 shadow">
        <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>
          Welcome {state.userName ? `${state.userName}` : "to The Experience"}
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#faf5eb] tracking-[0.12em] leading-tight uppercase">
        India's Rich Heritage. <br />
        <span className="gold-gradient-text">A Premium Blend.</span>
      </h1>

      <p className="mt-4 text-sm sm:text-base md:text-lg text-[#ebd9c0] max-w-2xl mx-auto leading-relaxed font-light">
        A celebration of Indian craftsmanship, refined character, and the art of
        fine whisky. Step into The Indian Edit and embark on a five-part journey
        through flavour, heritage, and the spirit of extraordinary experiences.
      </p>

      {/* Authentic Bottle Visual As It Is */}
      <div className="my-6 flex justify-center">
        <div className="relative p-2 rounded-2xl bg-[#140a05]/90 border border-[#d4af37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-[1.01]">
          <img
            src="/assets/indian-edit-hero.jpg"
            alt="The Indian Edit Super Premium Whisky"
            className="h-60 sm:h-72 md:h-80 w-auto object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Levels 5-Step Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
        {levelsOverview.map((item) => (
          <div
            key={item.num}
            className="p-4 rounded-xl bg-[#140a05]/85 backdrop-blur-md border border-[#d4af37]/35 hover:border-[#d4af37] transition-all hover:-translate-y-1 group shadow-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#f7e7a9] px-2 py-0.5 rounded bg-[#0a0503] border border-[#d4af37]/35">
                L-{item.num}
              </span>
            </div>
            <h3 className="font-serif text-sm font-bold text-[#faf5eb] group-hover:text-[#f7e7a9] transition-colors">
              {item.title}
            </h3>
            <p className="text-[11px] text-[#ab9580] mt-1 line-clamp-3">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Reward Incentive Card */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1f1008]/90 via-[#2d160b]/90 to-[#140a05]/90 backdrop-blur-md border border-[#d4af37]/60 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f7e7a9] to-[#d4af37] text-[#070403] flex items-center justify-center font-bold text-xl shadow-lg shrink-0">
            🎁
          </div>
          <div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-[#faf5eb]">
              Grand Finale Privilege Reward
            </h4>
            <p className="text-xs text-[#f7e7a9]">
              Unlocks custom 1080p Instagram post + Gold Foil Scratch Card.
            </p>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full sm:w-auto px-8 py-3.5 btn-gold text-sm font-bold flex items-center justify-center gap-2 group cursor-pointer shrink-0"
        >
          <span>Begin Challenge 01</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
