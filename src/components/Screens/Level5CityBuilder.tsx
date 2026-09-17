import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { CityCategory } from '../../types';
import { Timer, ArrowRight, RotateCcw, CheckCircle2, Sparkles, Plus, Building, Landmark, Utensils, Cpu, Heart, Sun } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PlacedElement {
  id: number;
  category: CityCategory;
  x: number;
  y: number;
  scale: number;
  label: string;
  icon: string;
}

const CATEGORY_CONFIG: {
  category: CityCategory;
  name: string;
  desc: string;
  icon: React.ReactNode;
  emoji: string;
  color: string;
  sampleLabels: string[];
}[] = [
  {
    category: 'CITY',
    name: 'Modern Skyline',
    desc: 'Metro viaducts, transit corridors & towers',
    icon: <Building className="w-4 h-4" />,
    emoji: '🏢',
    color: '#d4af37',
    sampleLabels: ['Metro Hub', 'Glass Tower', 'Skybridge', 'Central Vista']
  },
  {
    category: 'CULTURE',
    name: 'Heritage & Arts',
    desc: 'Deekshabhoomi, Sitabuldi Fort & art pavilions',
    icon: <Landmark className="w-4 h-4" />,
    emoji: '🏛️',
    color: '#ff9933',
    sampleLabels: ['Heritage Dome', 'Sitabuldi Rampart', 'Art Pavilion', 'Amphitheatre']
  },
  {
    category: 'FOOD',
    name: 'Nagpur Gastronomy',
    desc: 'Saoji spiced bistros & orange orchards',
    icon: <Utensils className="w-4 h-4" />,
    emoji: '🍊',
    color: '#e26f20',
    sampleLabels: ['Orange Bistro', 'Saoji Kitchen', 'Tasting Cellar', 'Orchard Kiosk']
  },
  {
    category: 'TECHNOLOGY',
    name: 'MIHAN Innovation',
    desc: 'Smart tech hubs & aerospace facilities',
    icon: <Cpu className="w-4 h-4" />,
    emoji: '🚀',
    color: '#f5d77f',
    sampleLabels: ['MIHAN Campus', 'Data Center', 'Drone Port', 'Clean Tech Lab']
  },
  {
    category: 'LIFESTYLE',
    name: 'Futala Promenade',
    desc: 'Lakeside amphitheater & twilight cafes',
    icon: <Heart className="w-4 h-4" />,
    emoji: '☕',
    color: '#f0828a',
    sampleLabels: ['Futala Promenade', 'Lakeside Cafe', 'Open Air Cinema', 'Rooftop Lounge']
  },
  {
    category: 'FUTURE',
    name: 'Eco & Sustainability',
    desc: 'Solar canopies & urban tiger corridor parks',
    icon: <Sun className="w-4 h-4" />,
    emoji: '🌱',
    color: '#80c25a',
    sampleLabels: ['Solar Forest', 'Bio Corridor', 'Rainwater Oasis', 'Tiger Preserve Edge']
  }
];

export const Level5CityBuilder: React.FC = () => {
  const { state, addCityElementCount, finishCityBuilding, navigateTo } = useGame();

  const [timeLeft, setTimeLeft] = useState(30.0);
  const [isRunning, setIsRunning] = useState(false);
  const [placedElements, setPlacedElements] = useState<PlacedElement[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nextId = useRef(1);

  // Auto start on mount or when user clicks Start
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          const next = Math.max(0, +(prev - 0.1).toFixed(1));
          if (next <= 5.0 && next > 0 && Math.round(next * 10) % 10 === 0) {
            sound.playTick();
          }
          if (next <= 0) {
            setIsRunning(false);
            setIsFinished(true);
            sound.playSuccess();
          }
          return next;
        });
      }, 100);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, timeLeft]);

  // Sync completion with game state
  useEffect(() => {
    if (isFinished) {
      finishCityBuilding(placedElements.length);
    }
  }, [isFinished]);

  // Draw dynamic canvas background and placed architecture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // 1. Nagpur Sunset Sky
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#2e170d');
    sky.addColorStop(0.4, '#6b2d13');
    sky.addColorStop(0.7, '#a84c1b');
    sky.addColorStop(1, '#24130b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // 2. Glowing Nagpur Sun
    ctx.beginPath();
    ctx.arc(w * 0.75, h * 0.28, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#ffaa33';
    ctx.shadowColor = '#ff8800';
    ctx.shadowBlur = 25;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 3. Seminary Hills Silhouette
    ctx.beginPath();
    ctx.moveTo(0, h * 0.52);
    ctx.bezierCurveTo(w * 0.25, h * 0.46, w * 0.45, h * 0.50, w * 0.65, h * 0.44);
    ctx.bezierCurveTo(w * 0.85, h * 0.40, w * 0.95, h * 0.46, w, h * 0.50);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fillStyle = '#1c0f08';
    ctx.fill();

    // 4. Futala Lake Water Reflection at bottom
    const water = ctx.createLinearGradient(0, h * 0.72, 0, h);
    water.addColorStop(0, '#172228');
    water.addColorStop(1, '#0e171b');
    ctx.fillStyle = water;
    ctx.fillRect(0, h * 0.72, w, h * 0.28);

    // Subtle water ripples
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const y = h * 0.76 + i * 14;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, y);
      ctx.lineTo(w * 0.9, y);
      ctx.stroke();
    }

    // 5. Render Placed Elements
    placedElements.forEach(el => {
      ctx.save();
      ctx.translate(el.x, el.y);

      // Shadow & base glow
      ctx.beginPath();
      ctx.ellipse(0, 10, 22 * el.scale, 8 * el.scale, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fill();

      // Draw Badge Container
      ctx.font = `${Math.round(26 * el.scale)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(el.icon, 0, -8);

      // Label
      ctx.font = `bold ${Math.round(9 * el.scale)}px Montserrat, sans-serif`;
      ctx.fillStyle = '#fff1b8';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(el.label, 0, 14);

      ctx.restore();
    });

  }, [placedElements]);

  const handleStartBlueprint = () => {
    sound.playClick();
    setTimeLeft(30.0);
    setPlacedElements([]);
    setIsFinished(false);
    setIsRunning(true);
  };

  const handleAddElement = (cat: typeof CATEGORY_CONFIG[0]) => {
    if (!isRunning && timeLeft <= 0) return;

    sound.playClick();
    addCityElementCount(cat.category);

    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 600;
    const h = canvas ? canvas.height : 400;

    const randomLabel = cat.sampleLabels[Math.floor(Math.random() * cat.sampleLabels.length)];
    const newEl: PlacedElement = {
      id: nextId.current++,
      category: cat.category,
      x: w * 0.12 + Math.random() * (w * 0.76),
      y: h * 0.42 + Math.random() * (h * 0.38),
      scale: 0.85 + Math.random() * 0.3,
      label: randomLabel,
      icon: cat.emoji
    };

    setPlacedElements(prev => [...prev, newEl]);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 animate-fade-in">
      
      {/* Level Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2e1e15] border border-[#d4af37]/40 text-xs text-[#f5d77f]">
            <span>LEVEL 05 / 05</span>
            <span>•</span>
            <span className="text-[#a69383]">30s BLUEPRINT CANVAS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6f0] mt-1">
            Build Your Nagpur
          </h2>
          <p className="text-xs text-[#a69383] mt-1">
            Curate your vision for Nagpur’s future. Tap the 6 city pillars to place architecture onto your canvas!
          </p>
        </div>

        {/* Live Timer and Element Count */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#22160f] border border-[#d4af37]/40 rounded-xl px-4 py-2 shadow-lg">
            <Timer className={`w-4 h-4 ${timeLeft <= 5 && isRunning ? 'text-red-400 animate-bounce' : 'text-[#d4af37]'}`} />
            <div>
              <div className="text-[10px] text-[#a69383] uppercase font-bold">TIMER</div>
              <div className={`font-mono text-lg font-bold ${timeLeft <= 5 && isRunning ? 'text-red-400' : 'text-[#f5d77f]'}`}>
                {timeLeft.toFixed(1)}s
              </div>
            </div>
          </div>

          <div className="bg-[#22160f] border border-[#d4af37]/40 rounded-xl px-4 py-2 shadow-lg text-center">
            <span className="text-[10px] text-[#a69383] uppercase font-bold">ELEMENTS</span>
            <div className="font-mono text-lg font-bold text-[#fff1b8]">
              {placedElements.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Canvas Stage */}
        <div className="lg:col-span-8 gold-card p-4 sm:p-5 relative overflow-hidden flex flex-col items-center">
          
          {/* Top Progress bar */}
          <div className="w-full h-1.5 bg-[#2e1e15] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#ff9933] transition-all duration-100"
              style={{ width: `${(timeLeft / 30.0) * 100}%` }}
            />
          </div>

          <div className="relative w-full aspect-[16/10] max-h-[440px] rounded-xl overflow-hidden border border-[#3d261a] bg-[#1a110a] shadow-inner">
            <canvas
              ref={canvasRef}
              width={720}
              height={450}
              className="w-full h-full object-cover"
            />

            {/* Start Overlay */}
            {!isRunning && !isFinished && placedElements.length === 0 && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-[#170f0a]/85 backdrop-blur-sm text-center">
                <div className="w-14 h-14 rounded-full bg-[#2e1e15] border border-[#d4af37] flex items-center justify-center text-2xl mb-3 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  🏛️
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#faf6f0]">Shape Nagpur’s Horizon</h3>
                <p className="text-xs sm:text-sm text-[#warm-beige] max-w-md mt-2">
                  You have 30 seconds to design the city. Balance culture, sustainable green spaces, cutting-edge technology, and lakeside living.
                </p>

                <button
                  onClick={handleStartBlueprint}
                  className="mt-5 px-8 py-3.5 btn-gold text-sm font-bold flex items-center gap-2 group cursor-pointer"
                >
                  <span>Start 30s Blueprint</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 6 Category Palette Cards */}
        <div className="lg:col-span-4 space-y-4">
          <div className="gold-card p-5">
            <h3 className="font-serif text-lg font-bold text-[#faf6f0] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span>Architectural Palette</span>
            </h3>
            <p className="text-xs text-[#a69383] mt-1">
              Tap categories below to place structures on the canvas.
            </p>

            <div className="mt-4 space-y-2">
              {CATEGORY_CONFIG.map(cat => {
                const count = state.cityElements[cat.category] || 0;
                return (
                  <button
                    key={cat.category}
                    onClick={() => handleAddElement(cat)}
                    disabled={!isRunning && timeLeft <= 0}
                    className="w-full p-2.5 rounded-xl bg-[#1e130d] border border-[#3d261a] hover:border-[#d4af37] hover:bg-[#2e1e15] text-left flex items-center justify-between transition-colors group cursor-pointer disabled:opacity-60"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{cat.emoji}</span>
                      <div>
                        <div className="text-xs font-bold text-[#faf6f0] group-hover:text-[#f5d77f] transition-colors">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-[#a69383]">{cat.desc}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#d4af37]">
                        {count}
                      </span>
                      <div className="w-6 h-6 rounded-md bg-[#2e1e15] border border-[#d4af37]/40 text-[#f5d77f] flex items-center justify-center group-hover:border-[#d4af37]">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Completion Result Modal */}
            {isFinished && (
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-[#2e1e15] to-[#3d261a] border border-[#d4af37] text-center space-y-3 animate-fade-in">
                <div className="flex items-center justify-center gap-1.5 text-[#fff1b8] text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>All 5 Challenges Mastered!</span>
                </div>
                <p className="text-xs text-[#warm-beige]">
                  Blueprint finalized with {placedElements.length} urban elements. Your personality archetype is ready!
                </p>

                <button
                  onClick={() => {
                    sound.playSuccess();
                    navigateTo('screen-result');
                  }}
                  className="w-full py-3.5 btn-gold text-xs font-bold flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
                >
                  <span>Reveal Personality Archetype</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {!isRunning && !isFinished && placedElements.length > 0 && (
              <button
                onClick={handleStartBlueprint}
                className="mt-4 w-full py-2 rounded-full border border-[#d4af37]/40 text-xs text-[#f5d77f] hover:bg-[#2e1e15] flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart 30s Canvas</span>
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
