import React, { useState, useEffect, useRef } from "react";
import { useGame } from "../../context/GameContext";
import {
  ArrowRight,
  RotateCcw,
  Timer,
  Award,
  Sparkles,
  Volume2,
} from "lucide-react";
import { sound } from "../../utils/audio";

interface Item {
  id: number;
  type: "tie_bottle" | "heritage_token" | "leaf_token" | "coldrink" | "waste";
  x: number; // percentage 5% to 90%
  y: number; // percentage 0% to 100%
  speed: number;
  points: number;
  size: number;
  collected: boolean;
  burstText?: string;
  icon: string;
}

export const Level1BottleRush: React.FC = () => {
  const { state, updateRushScore, navigateTo } = useGame();

  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10.0);
  const [score, setScore] = useState(0);
  const [bottlesCount, setBottlesCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const nextId = useRef(1);

  // Spawn interval and game tick
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    let spawnInterval: NodeJS.Timeout;
    let physicsInterval: NodeJS.Timeout;

    if (gameActive) {
      // Countdown
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          const next = Math.max(0, +(prev - 0.1).toFixed(1));
          if (next <= 3.0 && next > 0 && Math.round(next * 10) % 10 === 0) {
            sound.playTick();
          }
          if (next <= 0) {
            sound.playSuccess();
            setGameActive(false);
            setGameOver(true);
          }
          return next;
        });
      }, 100);

      // Spawner
      spawnInterval = setInterval(() => {
        const rand = Math.random();
        let type: Item["type"] = "tie_bottle";
        let pts = 100;
        let icon = "/assets/game/NewBottle.svg";

        if (rand < 0.45) {
          type = "tie_bottle";
          pts = 100;
          icon = "/assets/game/bottle-tie.svg";
        } else if (rand < 0.65) {
          type = "heritage_token";
          pts = 150;
          icon = "/assets/game/token-heritage.svg";
        } else if (rand < 0.8) {
          type = "leaf_token";
          pts = 80;
          icon = "/assets/game/token-leaf.svg";
        } else if (rand < 0.9) {
          type = "coldrink";
          pts = -50;
          icon = "/assets/game/bottle-coldrink.svg";
        } else {
          type = "waste";
          pts = -75;
          icon = "/assets/game/wrong-waste.svg";
        }

        const newItem: Item = {
          id: nextId.current++,
          type,
          x: Math.floor(Math.random() * 80) + 10,
          y: -10,
          speed: Math.random() * 0.5 + 0.6,
          points: pts,
          size: type === "tie_bottle" ? 68 : 52,
          collected: false,
          icon,
        };

        setItems((prev) => [...prev.slice(-15), newItem]);
      }, 550);

      // Physics loop
      physicsInterval = setInterval(() => {
        setItems((prev) =>
          prev
            .map((item) => ({
              ...item,
              y: item.y + item.speed,
            }))
            .filter((item) => item.y < 110),
        );
      }, 30);
    }

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      clearInterval(physicsInterval);
    };
  }, [gameActive]);

  // When game finishes, sync score with Context
  useEffect(() => {
    if (gameOver) {
      const bonus = combo > 4 ? 250 : 100;
      const finalScore = Math.max(0, score + bonus);
      updateRushScore(bottlesCount, finalScore, bonus);
    }
  }, [gameOver]);

  const startGame = () => {
    sound.playClick();
    setScore(0);
    setBottlesCount(0);
    setCombo(0);
    setTimeLeft(10.0);
    setGameOver(false);
    setItems([]);
    setGameActive(true);
  };

  const handleCollect = (item: Item) => {
    if (item.collected || !gameActive) return;

    if (item.points > 0) {
      sound.playClick();
      setScore((prev) => prev + item.points);
      if (item.type === "tie_bottle") {
        setBottlesCount((prev) => prev + 1);
      }
      setCombo((prev) => prev + 1);
    } else {
      sound.playWrong();
      setScore((prev) => Math.max(0, prev + item.points));
      setCombo(0);
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? {
              ...i,
              collected: true,
              burstText: item.points > 0 ? `+${item.points}` : `${item.points}`,
            }
          : i,
      ),
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 animate-fade-in">
      {/* Title & Live Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2e1e15] border border-[#d4af37]/40 text-xs text-[#f5d77f]">
            <span>LEVEL 01 / 05</span>
            <span>•</span>
            <span className="text-[#a69383]">10s ARCADE CHALLENGE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6f0] mt-1">
            The Nagpur Harvest Rush
          </h2>
        </div>

        {/* Live Score and Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#22160f] border border-[#d4af37]/35 rounded-xl px-4 py-2">
            <Timer
              className={`w-4 h-4 ${timeLeft <= 3 && gameActive ? "text-red-400 animate-bounce" : "text-[#d4af37]"}`}
            />
            <div>
              <div className="text-[10px] text-[#a69383] uppercase font-bold">
                TIME
              </div>
              <div
                className={`font-mono text-xl font-bold ${timeLeft <= 3 && gameActive ? "text-red-400" : "text-[#f5d77f]"}`}
              >
                {timeLeft.toFixed(1)}s
              </div>
            </div>
          </div>

          <div className="bg-[#22160f] border border-[#d4af37]/35 rounded-xl px-4 py-2">
            <div className="text-[10px] text-[#a69383] uppercase font-bold">
              SCORE
            </div>
            <div className="font-mono text-xl font-bold text-[#fff1b8]">
              {score}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Arena */}
      <div className="relative w-full h-112.5 sm:h-125 rounded-2xl bg-[#1a110a] border-2 border-[#d4af37]/40 overflow-hidden shadow-2xl select-none touch-none">
        {/* Background Jaali Pattern & Orchard Ambience */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] bg-size-[16px_16px]" />

        {/* Progress Bar at top of arena */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2e1e15]">
          <div
            className="h-full bg-linear-to-r from-[#d4af37] to-[#ff9933] transition-all duration-100"
            style={{ width: `${(timeLeft / 10.0) * 100}%` }}
          />
        </div>

        {/* Start Overlay if not started and not over */}
        {!gameActive && !gameOver && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-[#170f0a]/85 backdrop-blur-sm text-center">
            <div className="w-16 h-16 rounded-full bg-[#2e1e15] border border-[#d4af37] flex items-center justify-center text-3xl mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              🍊
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#faf6f0]">
              Catch The Indian Edit Bottles!
            </h3>
            <p className="text-xs sm:text-sm text-[#warm-beige] max-w-md mt-2 leading-relaxed">
              Tap or click the falling luxury bottles (+100) and heritage tokens
              (+150). Avoid plastic waste (-75) and generic colas (-50)!
            </p>

            <div className="flex items-center gap-6 mt-4 p-3 rounded-xl bg-[#22160f] border border-[#3d261a] text-xs">
              <div className="flex items-center gap-1.5 text-[#f5d77f]">
                <span className="w-3 h-3 rounded-full bg-[#d4af37]" />
                <span>Bottles: +100</span>
              </div>
              <div className="flex items-center gap-1.5 text-green-400">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span>Heritage: +150</span>
              </div>
              <div className="flex items-center gap-1.5 text-red-400">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span>Waste: -75</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="mt-6 px-8 py-3.5 btn-gold text-sm font-bold flex items-center gap-2 group cursor-pointer"
            >
              <span>Start 10s Rush</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Falling Interactive Elements */}
        {gameActive &&
          items.map((item) => {
            if (item.collected) {
              return (
                <div
                  key={item.id}
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold font-mono animate-ping"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    color: item.points > 0 ? "#d4af37" : "#ef4444",
                  }}
                >
                  {item.burstText}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleCollect(item)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleCollect(item);
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 active:scale-95 transition-transform focus:outline-none flex items-center justify-center"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  // Hit area is larger than the visible icon so fast taps still register
                  width: `${item.size + 24}px`,
                  height: `${item.size + 24}px`,
                }}
              >
                <img
                  src={item.icon}
                  alt="target item"
                  style={{ width: `${item.size}px`, height: `${item.size}px` }}
                  className="object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] pointer-events-none"
                  onError={(e) => {
                    // Fallback icon if svg not loaded
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/indian-edit-bottle.svg";
                  }}
                />
              </button>
            );
          })}

        {/* Game Over Modal */}
        {gameOver && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#170f0a]/90 backdrop-blur-md text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#d4af37] text-[#170f0a] flex items-center justify-center text-3xl font-bold mb-3 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              🏆
            </div>
            <span className="text-xs font-bold tracking-widest text-[#d4af37] uppercase">
              Challenge Complete
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#faf6f0] mt-1">
              Harvest Rush Cleared!
            </h3>

            <div className="grid grid-cols-2 gap-4 my-4 w-full max-w-xs p-4 rounded-xl bg-[#22160f] border border-[#d4af37]/40">
              <div className="text-center border-r border-[#3d261a]">
                <div className="text-[10px] text-[#a69383] uppercase font-bold">
                  Bottles Caught
                </div>
                <div className="font-serif text-2xl font-bold text-[#f5d77f]">
                  {bottlesCount}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-[#a69383] uppercase font-bold">
                  Total Score
                </div>
                <div className="font-serif text-2xl font-bold text-[#fff1b8]">
                  {score} pts
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startGame}
                className="px-4 py-2.5 rounded-full border border-[#d4af37]/40 text-xs font-semibold text-[#f5d77f] hover:bg-[#2e1e15] flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              <button
                onClick={() => {
                  sound.playSuccess();
                  navigateTo("screen-level-2");
                }}
                className="px-6 py-2.5 btn-gold text-xs font-bold flex items-center gap-2 group cursor-pointer"
              >
                <span>Proceed to Level 02: Zero Mile Map</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
