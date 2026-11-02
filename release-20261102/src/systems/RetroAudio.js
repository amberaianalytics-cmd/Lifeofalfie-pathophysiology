import * as Tone from 'tone';

/**
 * RetroAudio System
 * Procedural arcade sounds designed for low fatigue and maximum satisfaction.
 */
class RetroAudioSystem {
    constructor() {
        this.initialized = false;
        this.ambientLoop = null;
        this.masterFilter = null;
        this.masterGain = null;
        this.synth = null;
        this.perc = null;
        this.metal = null;
        this.poly = null;
        this.lastScheduledTime = 0;
    }

    _getSafeTime(offset = 0) {
        const now = Tone.now() + offset;
        // Ensure strictly increasing time to prevent Tone.js scheduling conflicts
        // Minimum 5ms gap between events on the same synth
        if (now <= this.lastScheduledTime) {
            this.lastScheduledTime += 0.005;
        } else {
            this.lastScheduledTime = now;
        }
        return this.lastScheduledTime;
    }

    async init() {
        try {
            if (this.initialized) return;
            console.log("[DEBUG-RETRO-AUDIO] Initializing Tone.js...");
            await Tone.start();
            console.log("[DEBUG-RETRO-AUDIO] Tone.js started.");

            // Master Output with Low-Pass Filter for "Warmth"
            this.masterFilter = new Tone.Filter({
                type: "lowpass",
                frequency: 4500, // Roll off harsh highs
                rolloff: -12
            }).toDestination();

            // Volume control - mixed 20-35% (approx -15dB to -20dB)
            this.masterGain = new Tone.Gain(0.25).connect(this.masterFilter);

            // --- Instruments ---
            
            // Soft Synth for Lasers and Blips
            this.synth = new Tone.MonoSynth({
                oscillator: { type: "triangle" }, // Warmest wave
                envelope: { attack: 0.005, decay: 0.1, sustain: 0.1, release: 0.1 },
                filterEnvelope: { attack: 0.001, decay: 0.05, sustain: 0.5, baseFrequency: 200, octaves: 4 }
            }).connect(this.masterGain);

            // Percussive Synth for Hits and Thumps
            this.perc = new Tone.MembraneSynth({
                pitchDecay: 0.05,
                octaves: 4,
                oscillator: { type: "sine" }
            }).connect(this.masterGain);

            // Metallic Synth for Ricochets
            this.metal = new Tone.MetalSynth({
                frequency: 200,
                envelope: { attack: 0.001, decay: 0.1, release: 0.1 },
                harmonicity: 5.1,
                modulationIndex: 32,
                resonance: 4000,
                octaves: 1.5
            }).connect(this.masterGain);

            // PolySynth for Jingles
            this.poly = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "triangle" },
                envelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 0.5 }
            }).connect(this.masterGain);

            this.initialized = true;
            console.log("[DEBUG-RETRO-AUDIO] System ready.");
        } catch (err) {
            console.error("[DEBUG-RETRO-AUDIO-ERROR]", err);
        }
    }

    // --- Title Screen & Ambiance ---

    startAmbientLoop() {
        if (!this.initialized || this.ambientLoop) return;
        this.ambientLoop = new Tone.Loop((time) => {
            const r = Math.random();
            if (r > 0.85) {
                this.synth.triggerAttackRelease("C5", "32n", time, 0.2);
            } else if (r > 0.75) {
                this.synth.triggerAttackRelease("G3", "16n", time, 0.1);
            } else if (r > 0.65) {
                this.synth.triggerAttackRelease("E6", "64n", time, 0.1);
            }
        }, "2n").start(0);
        Tone.Transport.start();
    }

    stopAmbientLoop() {
        if (this.ambientLoop) {
            this.ambientLoop.stop();
            this.ambientLoop = null;
        }
    }

    // --- Gameplay SFX ---

    playLaser() {
        try {
            if (!this.initialized) return;
            const time = this._getSafeTime();
            this.synth.triggerAttackRelease("C5", "16n", time);
            this.synth.frequency.rampTo("C3", 0.05, time);
        } catch (err) {
            console.error("[DEBUG-RETRO-AUDIO-SFX-ERROR] playLaser", err);
        }
    }

    playRicochet() {
        try {
            if (!this.initialized) return;
            const time = this._getSafeTime();
            this.metal.triggerAttackRelease("C6", "32n", time, 0.4);
        } catch (err) {
            console.error("[DEBUG-RETRO-AUDIO-SFX-ERROR] playRicochet", err);
        }
    }

    playWrong() {
        try {
            if (!this.initialized) return;
            const now = this._getSafeTime();
            this.synth.triggerAttackRelease("G3", "32n", now, 0.3);
            this.synth.triggerAttackRelease("E3", "32n", now + 0.08, 0.2);
            // Update lastScheduledTime to account for the second note
            this.lastScheduledTime = now + 0.08;
        } catch (err) {
            console.error("[DEBUG-RETRO-AUDIO-SFX-ERROR] playWrong", err);
        }
    }

    playHit(isLastHit = false) {
        try {
            if (!this.initialized) return;
            const time = this._getSafeTime();
            if (isLastHit) {
                this.perc.triggerAttackRelease("G2", "4n", time);
                this.synth.triggerAttackRelease("C6", "16n", time + 0.05);
                this.lastScheduledTime = time + 0.05;
            } else {
                this.perc.triggerAttackRelease("C3", "16n", time, 0.6);
            }
        } catch (err) {
            console.error("[DEBUG-RETRO-AUDIO-SFX-ERROR] playHit", err);
        }
    }

    playExplosion() {
        try {
            if (!this.initialized) return;
            const time = this._getSafeTime();
            const noise = new Tone.NoiseSynth({
                noise: { type: "pink" },
                envelope: { attack: 0.001, decay: 0.3, sustain: 0 }
            }).connect(this.masterGain);
            noise.triggerAttackRelease("4n", time);
            setTimeout(() => {
                try { noise.dispose(); } catch(e) {}
            }, 500);
        } catch (err) {
            console.error("[DEBUG-RETRO-AUDIO-SFX-ERROR] playExplosion", err);
        }
    }

    playSuccessJingle() {
        try {
            if (!this.initialized) return;
            const now = this._getSafeTime();
            this.poly.triggerAttackRelease("C5", "16n", now);
            this.poly.triggerAttackRelease("E5", "16n", now + 0.1);
            this.poly.triggerAttackRelease("G5", "16n", now + 0.2);
            this.poly.triggerAttackRelease("C6", "8n", now + 0.3);
            this.lastScheduledTime = now + 0.3;
        } catch (err) {
            console.error("[DEBUG-RETRO-AUDIO-SFX-ERROR] playSuccessJingle", err);
        }
    }

    // --- UI Sounds ---

    playTick() {
        if (!this.initialized) return;
        this.synth.triggerAttackRelease("C7", "128n", this._getSafeTime(), 0.1);
    }

    playConfirm() {
        if (!this.initialized) return;
        this.synth.triggerAttackRelease("G5", "64n", this._getSafeTime(), 0.3);
    }

    playWarp() {
        if (!this.initialized) return;
        const time = this._getSafeTime();
        this.synth.triggerAttackRelease("C4", "8n", time, 0.2);
        this.synth.frequency.rampTo("C6", 0.1, time);
    }
}

export const RetroAudio = new RetroAudioSystem();
