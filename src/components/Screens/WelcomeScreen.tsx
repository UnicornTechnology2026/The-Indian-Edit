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
      title: "Build Your Nagpur",
      desc: "30s architectural canvas crafting modern towers, art pavilions, and orange groves.",
      icon: "🏛️",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 animate-fade-in text-center">
      {/* Prologue Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2e1e15] border border-[#d4af37]/40 text-xs font-semibold tracking-[0.2em] text-[#f5d77f] uppercase mb-4 shadow">
        <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>
          Welcome {state.userName ? `${state.userName}` : "to The Experience"}
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#faf6f0] tracking-wide leading-tight">
        Rooted in Heritage. <br />
        <span className="gold-gradient-text">Designed for Tomorrow.</span>
      </h1>

      <p className="mt-4 text-sm sm:text-base text-[#warm-beige] max-w-2xl mx-auto leading-relaxed">
        A celebration of Indian craftsmanship, refined character, and the art of
        fine whisky. Step into The Indian Edit and embark on a five-part journey
        through flavour, heritage, and the spirit of extraordinary experiences.
      </p>

      {/* Levels 5-Step Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
        {levelsOverview.map((item) => (
          <div
            key={item.num}
            className="p-4 rounded-xl bg-[#22160f]/80 border border-[#d4af37]/30 hover:border-[#d4af37] transition-all hover:-translate-y-1 group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#d4af37] px-2 py-0.5 rounded bg-[#170f0a] border border-[#d4af37]/30">
                L-{item.num}
              </span>
            </div>
            <h3 className="font-serif text-sm font-bold text-[#faf6f0] group-hover:text-[#f5d77f] transition-colors">
              {item.title}
            </h3>
            <p className="text-[11px] text-[#a69383] mt-1 line-clamp-3">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Reward Incentive Card */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#2e1e15] via-[#3d261a] to-[#22160f] border border-[#d4af37]/50 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3 text-left">
          <div className="w-16 h-10 rounded-full bg-[#d4af37] text-[#170f0a] flex items-center justify-center font-bold text-lg shadow">
            🎁
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-[#faf6f0]">
              Grand Finale Privilege Reward
            </h4>
            <p className="text-xs text-[#d4af37]">
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
