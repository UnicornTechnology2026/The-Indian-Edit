import React, { useState } from "react";
import { useGame } from "../../context/GameContext";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  MapPin,
  User,
  Phone,
} from "lucide-react";
import { sound } from "../../utils/audio";

export const LoginScreen: React.FC = () => {
  const { state, setUserName, setUserCity, setUserPhone, navigateTo } =
    useGame();

  const [name, setName] = useState(state.userName || "");
  const [city, setCity] = useState(state.userCity || "Nagpur");
  const [customCity, setCustomCity] = useState("");
  const [phone, setPhone] = useState(state.userPhone || "");
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(true);
  const [error, setError] = useState("");

  const cityOptions = [
    "Nagpur",
    "Mumbai",
    "Pune",
    "Delhi NCR",
    "Bengaluru",
    "Hyderabad",
    "Kolkata",
    "Chennai",
    "Jaipur",
    "Ahmedabad",
    "Chandigarh",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      sound.playWrong();
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      sound.playWrong();
      return;
    }

    if (!isAgeConfirmed) {
      setError("You must confirm you are of legal drinking age (21+).");
      sound.playWrong();
      return;
    }

    const chosenCity = city === "Other" ? customCity.trim() || "Nagpur" : city;

    setUserName(name.trim());
    setUserCity(chosenCity);
    setUserPhone(cleanPhone);
    sound.playSuccess();
    navigateTo("screen-otp");
  };

  const fillDemo = () => {
    setName("Aarav Sharma");
    setCity("Nagpur");
    setPhone("9876543210");
    setIsAgeConfirmed(true);
    sound.playClick();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Luxury Bottle Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <div className="relative w-64 h-84 sm:w-72 sm:h-96 flex items-center justify-center p-4">
            {/* Ambient Gold Glow Backdrop */}
            <div className="absolute inset-0 rounded-full bg-radial from-[#d4af37]/20 via-[#ff9933]/10 to-transparent blur-2xl animate-pulse-glow" />

            {/* Bottle Render */}
            <img
              src="/assets/NewBottle.svg"
              alt="The Indian Edit Luxury Bottle"
              className="relative z-10 w-auto h-full max-h-80 object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] animate-float-slow"
              onError={(e) => {
                // Fallback to png if svg fails
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/indian-edit-bottle.png";
              }}
            />
          </div>

          <div className="">
            <div className="text-center text-[#faf6f0]">
              <div className="font-serif text-lg tracking-wide">THE</div>

              <h2 className="font-serif text-4xl font-normal tracking-wide">
                INDIAN
              </h2>

              <div className="mt-1 font-serif text-sm tracking-[0.35em]">
                EDIT
              </div>
            </div>
            <p className="text-xs text-[#faf6f0] max-w-xs mt-1">
              Born from the spirit of India, matured to inspire every remarkable
              moment.
            </p>
          </div>
        </div>

        {/* Right: Registration Form Card */}
        <div className="lg:col-span-7">
          <div className="gold-card p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#3d261a]">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6f0]">
                  Enter the World of Luxury
                </h2>
              </div>
              <button
                type="button"
                onClick={fillDemo}
                className="text-xs px-3 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#22160f] text-[#f5d77f] hover:bg-[#2e1e15] hover:border-[#d4af37] transition-all flex items-center gap-1"
                title="Prefill sample credentials"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Autofill</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-xs text-red-200 flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#e5d8cb] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#d4af37]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#170f0a]/90 border border-[#d4af37]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm text-[#faf6f0] placeholder-[#6d5746] transition-colors"
                  />
                </div>
              </div>

              {/* Home City */}
              <div>
                <label className="block text-xs font-semibold text-[#e5d8cb] mb-1.5">
                  Your City of Residence
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#d4af37]" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#170f0a]/90 border border-[#d4af37]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm text-[#faf6f0] transition-colors"
                  >
                    {cityOptions.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className="bg-[#170f0a] text-white"
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {city === "Other" && (
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder="Type your city name"
                    className="mt-2 w-full px-4 py-2 rounded-xl bg-[#170f0a]/90 border border-[#d4af37]/40 text-sm text-[#faf6f0] placeholder-[#6d5746]"
                  />
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-[#e5d8cb] mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-2.5 flex items-center gap-1 text-[#d4af37] text-sm font-semibold border-r border-[#3d261a] pr-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={10}
                    required
                    className="w-full pl-22 pr-4 py-2.5 rounded-xl bg-[#170f0a]/90 border border-[#d4af37]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm text-[#faf6f0] placeholder-[#6d5746] font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Legal Age Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-[#a69383] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAgeConfirmed}
                    onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                    className="mt-0.5 rounded border-[#d4af37]/60 text-[#d4af37] focus:ring-[#d4af37] bg-[#170f0a]"
                  />
                  <span>
                    I confirm that I am 21 years of age or older, and agree to
                    receive my luxury personality report & reward notification.
                  </span>
                </label>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 btn-gold text-sm font-bold flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Verify & Unlock The Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
