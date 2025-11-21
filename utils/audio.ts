
// Web Audio API Synthesizer for instant, high-performance game sounds
// No external assets required = No loading times = Instant Dopamine

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const playClickSound = () => {
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // "Bubble Pop" Sound - Very satisfying for UI clicks
    // Sweeps frequency up quickly
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.08);
    
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.1);
  } catch (e) {
    console.error("Audio error", e);
  }
};

export const playSuccessSound = () => {
  try {
    const ctx = initAudio();
    if (!ctx) return;

    const t = ctx.currentTime;
    const vol = 0.1;
    
    // "Notification Chime" - Pleasant Major 3rd interval (C6 -> E6)
    // Feels like a reward/correct answer
    
    // Tone 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, t); // A5
    gain1.gain.setValueAtTime(vol, t);
    gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.3);

    // Tone 2 (Harmonic, slightly delayed)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1108.73, t + 0.05); // C#6
    gain2.gain.setValueAtTime(vol, t + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t + 0.05);
    osc2.stop(t + 0.4);
    
  } catch (e) {
    console.error("Audio error", e);
  }
};

export const playCelebrationSound = () => {
  try {
    const ctx = initAudio();
    if (!ctx) return;

    const t = ctx.currentTime;
    const vol = 0.1;

    // Grand Major Chord Arpeggio (C Major)
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle'; // Brighter sound for celebration
        osc.frequency.setValueAtTime(freq, t + (i * 0.08));
        
        gain.gain.setValueAtTime(0, t + (i * 0.08));
        gain.gain.linearRampToValueAtTime(vol, t + (i * 0.08) + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 1.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(t + (i * 0.08));
        osc.stop(t + 1.5);
    });

  } catch (e) {
    console.error("Audio error", e);
  }
};
