// Synthesized Web Audio API sound engine - guaranteed zero external network dependencies

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // Lazy audio context creation on first user interaction
  }

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  public playTone(freq: number, type: OscillatorType, duration: number, gainStart = 0.15, gainEnd = 0.001) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(gainStart, now);
      gain.gain.exponentialRampToValueAtTime(gainEnd, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio autoplay policy handled
    }
  }

  public playClick() {
    this.playTone(840, 'sine', 0.06, 0.12, 0.001);
  }

  public playTick() {
    this.playTone(980, 'triangle', 0.05, 0.18, 0.001);
  }

  public playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.22, 0.14, 0.001);
      }, idx * 75);
    });
  }

  public playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    this.playTone(220, 'sawtooth', 0.18, 0.16, 0.001);
    setTimeout(() => {
      this.playTone(180, 'sawtooth', 0.25, 0.16, 0.001);
    }, 90);
  }

  public playFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [
      { f: 440, t: 0 },
      { f: 554.37, t: 0 },
      { f: 659.25, t: 0 },
      { f: 554.37, t: 0.14 },
      { f: 659.25, t: 0.14 },
      { f: 880, t: 0.14 },
      { f: 880, t: 0.3 },
      { f: 1108.73, t: 0.3 },
      { f: 1318.51, t: 0.3 }
    ];

    chords.forEach(c => {
      setTimeout(() => {
        this.playTone(c.f, 'triangle', 0.45, 0.12, 0.001);
      }, c.t * 1000);
    });
  }

  public playReveal() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const freqs = [440, 554, 659, 880, 1108];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'sine', 0.35, 0.15, 0.001);
      }, i * 60);
    });
  }
}

export const sound = new SoundEngine();
