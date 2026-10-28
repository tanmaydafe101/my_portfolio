/**
 * ==============================================================================
 * 🎵 PROCEDURAL AUDIO SYNTHESIZER & SOUND FX (Web Audio API)
 * ==============================================================================
 * Zero external audio files required! Synthesizes clean futuristic clicks,
 * harmonic chimes, terminal beeps, and ambient generative Lo-Fi chill beats.
 * ==============================================================================
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('portfolio_sound') !== 'on'; // default muted for user comfort
    this.lofiPlaying = false;
    this.lofiTimer = null;
    this.chordIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.init();
    this.muted = !this.muted;
    localStorage.setItem('portfolio_sound', this.muted ? 'off' : 'on');
    if (!this.muted) {
      this.playChime();
    } else if (this.lofiPlaying) {
      this.stopLoFi();
    }
    return !this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // ── Quick Sound Effects ─────────────────────────────────────────────
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playHover() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.02);
  }

  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  playGlitch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // ── Generative Ambient Lo-Fi Beats Synthesizer ──────────────────────
  toggleLoFi(onStatusChange) {
    this.init();
    if (this.lofiPlaying) {
      this.stopLoFi();
      if (onStatusChange) onStatusChange(false);
      return false;
    } else {
      if (this.muted) {
        this.muted = false;
        localStorage.setItem('portfolio_sound', 'on');
      }
      this.startLoFi();
      if (onStatusChange) onStatusChange(true);
      return true;
    }
  }

  startLoFi() {
    if (this.lofiPlaying) return;
    this.lofiPlaying = true;
    this.chordIndex = 0;

    // Progression in D minor / F Major: Dm9 -> BbMaj7 -> Gm7 -> Am7
    const chords = [
      [293.66, 349.23, 440.0, 523.25, 659.25], // Dm9
      [233.08, 349.23, 440.0, 587.33],        // BbMaj7
      [196.00, 293.66, 349.23, 440.0],        // Gm7
      [220.00, 329.63, 392.0, 523.25]         // Am7
    ];

    const playChordStep = () => {
      if (!this.lofiPlaying || !this.ctx) return;
      const chord = chords[this.chordIndex % chords.length];
      this.chordIndex++;

      const now = this.ctx.currentTime;
      // Play warm electric piano style chord
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);
        filter.frequency.exponentialRampToValueAtTime(450, now + 2.2);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.045 / (chord.length * 0.8), now + 0.15 + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.2);
      });

      // Subtle soft kick pulse
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.frequency.setValueAtTime(110, now);
      kickOsc.frequency.exponentialRampToValueAtTime(38, now + 0.2);
      kickGain.gain.setValueAtTime(0.04, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      kickOsc.connect(kickGain);
      kickGain.connect(this.ctx.destination);
      kickOsc.start(now);
      kickOsc.stop(now + 0.2);

      this.lofiTimer = setTimeout(playChordStep, 2800);
    };

    playChordStep();
  }

  stopLoFi() {
    this.lofiPlaying = false;
    if (this.lofiTimer) {
      clearTimeout(this.lofiTimer);
      this.lofiTimer = null;
    }
  }
}

export const sound = new SoundEngine();
