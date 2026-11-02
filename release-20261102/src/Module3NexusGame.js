import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MIDTERM_NEXUS_QUESTIONS } from '../MidtermNexusData.js';
import { RetroAudio } from './systems/RetroAudio.js';

const e = React.createElement;

// Configuration matching Immune Defense aesthetic
const NEXUS_CONFIG = {
    COLORS: {
        A: '#00ff41', // Matrix Green
        B: '#00e5ff', // Cyan
        C: '#ff00ff', // Magenta
        D: '#ffcc00', // Gold
        SHOT: '#ffffff',
        CORRECT: '#00ff41',
        WRONG: '#ff3e3e'
    },
    SPEEDS: {
        PLAYER: 10,
        PROJECTILE: 12,
        ENEMY: 1.2, // 20% slower for better reading time
    }
};

const LOGGER = {
    log: (tag, ...args) => console.log(`[NEXUS-DEBUG][${tag}]`, ...args),
    error: (tag, ...args) => console.error(`[NEXUS-DEBUG-ERROR][${tag}]`, ...args),
    warn: (tag, ...args) => console.warn(`[NEXUS-DEBUG-WARN][${tag}]`, ...args)
};

export default function Module3NexusGame({ onComplete, onGeneratePDF, onMusicChange }) {
    const canvasRef = useRef(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [firstAttemptCorrect, setFirstAttemptCorrect] = useState(0);
    const [explanation, setExplanation] = useState(null);
    const [timer, setTimer] = useState(0);
    const [history, setHistory] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const startTimeRef = useRef(Date.now());

    // Synth Voice Helper
    const speak = (text) => {
        LOGGER.log("speak", "Voice triggering:", text);
        if ('speechSynthesis' in window) {
            try {
                window.speechSynthesis.cancel(); // Clear any pending speech
                const utterance = new SpeechSynthesisUtterance(text);
                
                // DEEP MECHANICAL 80s VOICE SETTINGS
                utterance.rate = 0.65; // Even slower for heavy mechanical feel
                utterance.pitch = 0.1; // Maximum depth for robotic effect
                utterance.volume = 1.0;

                // Attempt to find a more robotic voice if available
                const voices = window.speechSynthesis.getVoices();
                if (voices.length > 0) {
                    const roboticVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Male') || v.name.includes('Microsoft David')) || voices[0];
                    if (roboticVoice) utterance.voice = roboticVoice;
                }
                
                utterance.onstart = () => LOGGER.log("speak", "Speech started");
                utterance.onend = () => LOGGER.log("speak", "Speech ended normally");
                utterance.onerror = (event) => {
                    LOGGER.error("speak", "SpeechSynthesisUtterance error", event);
                };
                
                window.speechSynthesis.speak(utterance);
            } catch (e) {
                LOGGER.error("speak", "SpeechSynthesis failed exception", e);
            }
        } else {
            LOGGER.warn("speak", "SpeechSynthesis not supported in this browser");
        }
    };

    // Load questions - the HCR 240 Pathophysiology Practice Midterm bank
    const questions = useMemo(() => {
        return MIDTERM_NEXUS_QUESTIONS;
    }, []);

    const gameState = useRef({
        playerX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
        orbs: [],
        projectiles: [],
        particles: [],
        plateletTrail: [], // NEW: Platelet trail behind hoverboard
        popups: [],
        lastTime: 0,
        moveLeft: false,
        moveRight: false,
        hasAttemptedCurrent: false,
        isPaused: false,
        stars: [],
        nebulaParticles: [],
        isFiring: false,
        consecutiveMisses: 0,
        alfieHoverboardImage: null,
        plateletImage: null,
        portraitNeutral: null,
        portraitHappy: null,
        portraitSurprised: null,
        currentPortrait: 'neutral',
        expressionTimer: 0,
        // CYTOKINE STORM STATE
        isCytokineStormActive: false,
        correctStreak: 0,
        incorrectStreak: 0,
        announcement: null, // { text: string, timer: number }
        voiceTimer: 0
    });

    // Load New Canonical Assets
    useEffect(() => {
        const loadImg = (src, key) => {
            const img = new Image();
            img.src = src;
            img.onload = () => { 
                LOGGER.log("Assets", "Loaded image:", src);
                gameState.current[key] = img; 
            };
            img.onerror = (e) => {
                LOGGER.error("Assets", "Failed to load image:", src, e);
            };
        };
        loadImg('assets/alfie_hoverboard_topdown.webp', 'alfieHoverboardImage');
        loadImg('assets/platelet_particle.webp', 'plateletImage');
        loadImg('assets/alfie_portrait_neutral.webp', 'portraitNeutral');
        loadImg('assets/alfie_portrait_happy.webp', 'portraitHappy');
        loadImg('assets/alfie_portrait_surprised.webp', 'portraitSurprised');
    }, []);

    // Initialize stars for background
    useEffect(() => {
        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2,
                speed: 0.5 + Math.random() * 1.5
            });
        }
        gameState.current.stars = stars;
    }, []);

    const shuffle = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        const spawnOrbs = () => {
            if (gameState.current.isPaused) return;
            const q = questions[currentQuestionIndex];
            if (!q || !q.opts) return;

            // Dual Randomization: Shuffle both the answer options and the column positions
            const optsWithMeta = q.opts.map((text, i) => ({ text, isCorrect: i === q.ans }));
            const shuffledOptions = shuffle(optsWithMeta);
            const colors = [NEXUS_CONFIG.COLORS.A, NEXUS_CONFIG.COLORS.B, NEXUS_CONFIG.COLORS.C, NEXUS_CONFIG.COLORS.D];
            const shuffledColors = shuffle(colors);

            const newOrbs = shuffledOptions.map((opt, i) => {
                return {
                    id: i,
                    text: opt.text,
                    x: (canvas.width / 5) * (i + 1), // Positions randomized because the options were shuffled
                    y: -150 - (Math.random() * 100),
                    color: shuffledColors[i],
                    isCorrect: opt.isCorrect,
                    health: 500,
                    maxHealth: 500,
                    radius: 45,
                    pulse: 1.0,
                    wrongFlash: 0,
                    hitFlash: 0,
                    showHP: false
                };
            });
            gameState.current.orbs = newOrbs;
        };

        const handleKeyDown = (ev) => {
            if (gameState.current.isPaused) {
                if (ev.code === 'KeyB') {
                    ev.preventDefault();
                    nextQuestion();
                }
                return;
            }

            if (ev.code === 'ArrowLeft' || ev.code === 'KeyA') {
                gameState.current.moveLeft = true;
            } else if (ev.code === 'ArrowRight' || ev.code === 'KeyD') {
                gameState.current.moveRight = true;
            } else if (ev.code === 'Space') {
                ev.preventDefault();
                gameState.current.isFiring = true;
                fireProjectile();
            }
        };

        const handleKeyUp = (ev) => {
            if (ev.code === 'ArrowLeft' || ev.code === 'KeyA') gameState.current.moveLeft = false;
            if (ev.code === 'ArrowRight' || ev.code === 'KeyD') gameState.current.moveRight = false;
            if (ev.code === 'Space') gameState.current.isFiring = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const fireProjectile = () => {
            RetroAudio.playLaser();
            if (gameState.current.isCytokineStormActive) {
                // Quad Laser: Four parallel beams
                const offsets = [-30, -10, 10, 30];
                offsets.forEach(off => {
                    gameState.current.projectiles.push({
                        x: gameState.current.playerX + off,
                        y: canvas.height - 190,
                        speed: NEXUS_CONFIG.SPEEDS.PROJECTILE,
                        life: 1.0,
                        isStorm: true
                    });
                });
            } else {
                gameState.current.projectiles.push({
                    x: gameState.current.playerX,
                    y: canvas.height - 190, // Adjusted for raised player
                    speed: NEXUS_CONFIG.SPEEDS.PROJECTILE,
                    life: 1.0
                });
            }
        };

        const spawnParticles = (x, y, color, count, velocityScale = 1) => {
            for (let i = 0; i < count; i++) {
                gameState.current.particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 12 * velocityScale,
                    vy: (Math.random() - 0.5) * 12 * velocityScale,
                    color,
                    life: 1.0
                });
            }
        };

        const update = (time) => {
            try {
                if (!gameState.current.lastTime) gameState.current.lastTime = time;
                const dt = time - gameState.current.lastTime;
                gameState.current.lastTime = time;

                // Background Scroll
                gameState.current.stars.forEach(s => {
                    s.y += s.speed;
                    if (s.y > canvas.height) {
                        s.y = -10;
                        s.x = Math.random() * canvas.width;
                    }
                });

                if (gameState.current.isPaused) {
                    draw();
                    animationFrameId = requestAnimationFrame(update);
                    return;
                }

                // Player movement
                const moveSpeed = NEXUS_CONFIG.SPEEDS.PLAYER;
                if (gameState.current.moveLeft) gameState.current.playerX = Math.max(100, gameState.current.playerX - moveSpeed);
                if (gameState.current.moveRight) gameState.current.playerX = Math.min(canvas.width - 100, gameState.current.playerX + moveSpeed);

                // Orbs update
                if (gameState.current.orbs.length === 0) {
                    spawnOrbs();
                } else {
                    gameState.current.orbs.forEach(orb => {
                        orb.y += NEXUS_CONFIG.SPEEDS.ENEMY;
                        orb.pulse = Math.sin(time / 200) * 0.1 + 1.0;
                        // Reset if orbs go off screen
                        if (orb.y > canvas.height + 100) {
                            gameState.current.orbs = [];
                        }
                    });
                }

                // Platelet Trail Logic
                if (!gameState.current.isPaused) {
                    if (Math.random() < 0.3) {
                        gameState.current.plateletTrail.push({
                            x: gameState.current.playerX + (Math.random() - 0.5) * 40,
                            y: canvas.height - 170, // Raised to follow player
                            size: 10 + Math.random() * 20,
                            opacity: 0.8,
                            speed: 3 + Math.random() * 3, // Faster fall
                            angle: Math.random() * Math.PI * 2
                        });
                    }
                }
                gameState.current.plateletTrail = gameState.current.plateletTrail.filter(pt => {
                    pt.y += pt.speed;
                    pt.opacity -= 0.01;
                    pt.angle += 0.02;
                    return pt.opacity > 0;
                });

                // Projectiles update
                gameState.current.projectiles = gameState.current.projectiles.filter(p => {
                    p.y -= p.speed;
                    
                    // Collision check
                    for (const orb of gameState.current.orbs) {
                        const dx = p.x - orb.x;
                        const dy = p.y - orb.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // ANSWER ACTIVATION: ENTIRE glowing answer orb AND its answer text completely visible.
                        // If orb.y - radius > 0, the orb itself is on screen.
                        // The text is below. Let's ensure the top of the orb is comfortably in view.
                        const isFullyVisible = orb.y - orb.radius > 50; 

                        if (dist < orb.radius && isFullyVisible) {
                            if (orb.isCorrect) {
                                orb.health -= 100;
                                orb.hitFlash = 10;
                                orb.showHP = true;
                                gameState.current.consecutiveMisses = 0;
                                
                                // Successful hit feedback
                                spawnParticles(p.x, p.y, NEXUS_CONFIG.COLORS.CORRECT, 15, 0.8);
                                RetroAudio.playHit(orb.health <= 0);
                                
                                // Pop-up "✓ CORRECT"
                                gameState.current.popups.push({
                                    x: orb.x + 30,
                                    y: orb.y,
                                    text: '✓ CORRECT',
                                    life: 1.0,
                                    color: NEXUS_CONFIG.COLORS.CORRECT
                                });

                                // Gameplay Expression: Focused when shooting/hit
                                gameState.current.expressionTimer = 30;
                                gameState.current.currentPortrait = 'happy';

                                if (orb.health <= 0) {
                                    handleCorrectDestroy(orb);
                                }
                            } else {
                                // Wrong answer feedback
                                RetroAudio.playWrong();
                                orb.wrongFlash = 12;

                                // CYTOKINE STORM: RESET STREAK AND TRACK DISSIPATION
                                gameState.current.correctStreak = 0;
                                if (gameState.current.isCytokineStormActive) {
                                    gameState.current.incorrectStreak++;
                                    if (gameState.current.incorrectStreak >= 3) {
                                        LOGGER.log("Cytokine Storm", "Dissipating storm...");
                                        gameState.current.isCytokineStormActive = false;
                                        gameState.current.incorrectStreak = 0;
                                        gameState.current.announcement = { text: 'CYTOKINE STORM DISSIPATED', timer: 120 };
                                        if (onMusicChange) onMusicChange(null); // Return to default
                                    }
                                }

                                gameState.current.popups.push({
                                    x: orb.x + 30,
                                    y: orb.y,
                                    text: '✕ WRONG',
                                    life: 1.0,
                                    color: NEXUS_CONFIG.COLORS.WRONG
                                });
                                spawnParticles(p.x, p.y, NEXUS_CONFIG.COLORS.WRONG, 8, 0.5);

                                const q = questions[currentQuestionIndex];
                                if (!gameState.current.hasAttemptedCurrent) {
                                    // Record the first wrong choice for the report
                                    setHistory(h => [...h, {
                                        step: currentQuestionIndex,
                                        correct: false,
                                        q: q.q,
                                        selected: orb.text,
                                        ans: q.opts[q.ans],
                                        topic: q.topic || "General",
                                        rationale: q.rationale || (q.rationales ? q.rationales[q.ans] : "N/A")
                                    }]);
                                }

                                gameState.current.hasAttemptedCurrent = true;
                                gameState.current.consecutiveMisses++;

                                // Gameplay Expression: Surprised/Concerned for wrong answer
                                gameState.current.expressionTimer = 45;
                                gameState.current.currentPortrait = 'surprised';
                            }
                            return false;
                        }
                    }
                    return p.y > -50;
                });

                // Particles update
                gameState.current.particles = gameState.current.particles.filter(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.02;
                    return p.life > 0;
                });

                // Popups update
                gameState.current.popups = gameState.current.popups.filter(p => {
                    p.y -= 1.5;
                    p.life -= 0.02;
                    return p.life > 0;
                });

                // Expression Timer Logic
                if (gameState.current.expressionTimer > 0) {
                    gameState.current.expressionTimer--;
                    if (gameState.current.expressionTimer <= 0) {
                        gameState.current.currentPortrait = 'neutral';
                    }
                } else if (gameState.current.isFiring) {
                    gameState.current.currentPortrait = 'neutral'; 
                }

                // Cytokine Storm: Announcement Update
                if (gameState.current.announcement) {
                    gameState.current.announcement.timer--;
                    if (gameState.current.announcement.timer <= 0) {
                        gameState.current.announcement = null;
                    }
                }

                draw();
                animationFrameId = requestAnimationFrame(update);
            } catch (err) {
                LOGGER.error("update", "Loop exception caught", err);
                // Try to recover next frame
                animationFrameId = requestAnimationFrame(update);
            }
        };

        const handleCorrectDestroy = (orb) => {
            RetroAudio.playExplosion();
            RetroAudio.playSuccessJingle();
            spawnParticles(orb.x, orb.y, orb.color, 50, 2);
            gameState.current.isPaused = true;
            gameState.current.orbs = [];
            gameState.current.projectiles = [];

            const q = questions[currentQuestionIndex];
            const isFirstAttempt = !gameState.current.hasAttemptedCurrent;
            
            if (isFirstAttempt) {
                setFirstAttemptCorrect(f => f + 1);
                
                // CYTOKINE STORM: TRACK STREAK AND ACTIVATION
                gameState.current.incorrectStreak = 0; // Reset incorrect streak on any correct answer
                if (!gameState.current.isCytokineStormActive) {
                    gameState.current.correctStreak++;
                    if (gameState.current.correctStreak >= 5) {
                        gameState.current.isCytokineStormActive = true;
                        gameState.current.correctStreak = 0;
                        gameState.current.announcement = { text: '★★ CYTOKINE STORM ACTIVATED ★★', timer: 120 };
                        if (onMusicChange) onMusicChange('assets/alfitechno5.mp3');
                        speak("Cytokine Storm Activated. Quad Laser Ready.");
                    }
                } else {
                    // While active, just ensure correctStreak is reset (though it should already be 0)
                    gameState.current.correctStreak = 0;
                }

                setHistory(h => [...h, {
                    step: currentQuestionIndex,
                    correct: true,
                    q: q.q,
                    selected: q.opts[q.ans],
                    ans: q.opts[q.ans],
                    topic: q.topic || "General",
                    rationale: q.rationale || (q.rationales ? q.rationales[q.ans] : "N/A")
                }]);
            }
            setScore(s => s + 100);

            setExplanation({
                q: q.q,
                ans: q.opts[q.ans],
                rationale: q.rationale || (q.rationales ? q.rationales[q.ans] : "N/A"),
                isFirstAttempt
            });

            setTimer(20);
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Background Stars
            ctx.fillStyle = '#ffffff';
            gameState.current.stars.forEach(s => {
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1.0;

            // Draw Platelet Trail
            gameState.current.plateletTrail.forEach(pt => {
                if (gameState.current.plateletImage) {
                    ctx.save();
                    ctx.globalAlpha = pt.opacity;
                    ctx.translate(pt.x, pt.y);
                    ctx.rotate(pt.angle);
                    ctx.drawImage(gameState.current.plateletImage, -pt.size/2, -pt.size/2, pt.size, pt.size);
                    ctx.restore();
                }
            });

            // Draw Orbs
            gameState.current.orbs.forEach(orb => {
                ctx.save();
                ctx.translate(orb.x, orb.y);
                
                // Update flash timers
                if (orb.wrongFlash > 0) orb.wrongFlash--;
                if (orb.hitFlash > 0) orb.hitFlash--;
                
                const pulse = orb.pulse * (gameState.current.isCytokineStormActive ? 1.3 : 1.0);

                // Glow
                let glowColor = orb.color;
                if (orb.wrongFlash > 0) glowColor = NEXUS_CONFIG.COLORS.WRONG;
                if (orb.hitFlash > 0) glowColor = NEXUS_CONFIG.COLORS.CORRECT;

                const baseGlow = (orb.wrongFlash > 0 || orb.hitFlash > 0 ? 60 : 35);
                ctx.shadowBlur = (gameState.current.isCytokineStormActive ? baseGlow * 3 : baseGlow) * pulse;
                ctx.shadowColor = glowColor;
                
                // Orb body
                let fillStyle = orb.color + (gameState.current.isCytokineStormActive ? '99' : '33');
                if (orb.wrongFlash > 0) fillStyle = NEXUS_CONFIG.COLORS.WRONG + '66';
                if (orb.hitFlash > 0) fillStyle = NEXUS_CONFIG.COLORS.CORRECT + '66';

                ctx.fillStyle = fillStyle;
                ctx.strokeStyle = glowColor;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, orb.radius * pulse, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // HP Bar (Neon Green, Small, Boss-style)
                if (orb.showHP && orb.isCorrect) {
                    const barW = 80;
                    const barH = 6;
                    const hpRatio = Math.max(0, orb.health / orb.maxHealth);
                    
                    // Bar BG
                    ctx.fillStyle = 'rgba(0,0,0,0.5)';
                    ctx.fillRect(-barW/2, orb.radius + 15, barW, barH);
                    
                    // Bar Fill
                    ctx.fillStyle = NEXUS_CONFIG.COLORS.CORRECT;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = NEXUS_CONFIG.COLORS.CORRECT;
                    ctx.fillRect(-barW/2, orb.radius + 15, barW * hpRatio, barH);
                }

                // Text (wrapped) - Readability pass
                ctx.shadowBlur = 0; // Remove unnecessary glow on text
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 28px Courier New'; // Increased 40%
                ctx.textAlign = 'center';
                const words = orb.text.split(' ');
                let line = '';
                let yPos = orb.radius + 60; // Pushed down for better spacing
                const maxWidth = 220; // Slightly wider for larger text
                for (let n = 0; n < words.length; n++) {
                    let testLine = line + words[n] + ' ';
                    let metrics = ctx.measureText(testLine);
                    if (metrics.width > maxWidth && n > 0) {
                        ctx.fillText(line, 0, yPos);
                        line = words[n] + ' ';
                        yPos += 32; // Increased line spacing
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, 0, yPos);

                ctx.restore();
            });

            // Draw Popups
            gameState.current.popups.forEach(p => {
                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;
                ctx.font = 'bold 24px Courier New';
                ctx.textAlign = 'center';
                ctx.fillText(p.text, p.x, p.y);
                ctx.restore();
            });

            // Draw Projectiles
            gameState.current.projectiles.forEach(p => {
                ctx.save();
                ctx.shadowBlur = p.isStorm ? 25 : 15;
                ctx.shadowColor = p.isStorm ? '#00e5ff' : NEXUS_CONFIG.COLORS.SHOT;
                ctx.fillStyle = p.isStorm ? '#00e5ff' : NEXUS_CONFIG.COLORS.SHOT;
                ctx.fillRect(p.x - 2, p.y - 20, 4, 25);
                ctx.restore();
            });

            // Draw Particles
            gameState.current.particles.forEach(p => {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Draw Question Text above player
            const q = questions[currentQuestionIndex];
            if (q) {
                ctx.save();
                
                // Readability priority: Large font and clean spacing
                const fontSize = 50; // Increased 30% from 38
                const lineHeight = 62;
                ctx.font = `bold ${fontSize}px Courier New`;
                ctx.textAlign = 'center';
                
                // Intelligently wrap question
                const words = q.q.split(' ');
                let lines = [];
                let currentLine = '';
                const maxWidth = canvas.width * 0.8;
                
                for (let n = 0; n < words.length; n++) {
                    let testLine = currentLine + words[n] + ' ';
                    let metrics = ctx.measureText(testLine);
                    if (metrics.width > maxWidth && n > 0) {
                        lines.push(currentLine);
                        currentLine = words[n] + ' ';
                    } else {
                        currentLine = testLine;
                    }
                }
                lines.push(currentLine);

                // Position significantly higher (moved up 15% of screen height)
                const totalHeight = lines.length * lineHeight;
                let yPos = canvas.height * 0.65 - (totalHeight / 2); // Raised from bottom area

                // Draw simple charcoal background panel (65% opacity)
                ctx.fillStyle = 'rgba(20, 20, 20, 0.65)';
                const padding = 30;
                const panelWidth = canvas.width * 0.85;
                const panelX = (canvas.width - panelWidth) / 2;
                
                // Draw panel with slightly rounded corners (manual rounded rect)
                const radius = 10;
                ctx.beginPath();
                ctx.moveTo(panelX + radius, yPos - fontSize);
                ctx.lineTo(panelX + panelWidth - radius, yPos - fontSize);
                ctx.quadraticCurveTo(panelX + panelWidth, yPos - fontSize, panelX + panelWidth, yPos - fontSize + radius);
                ctx.lineTo(panelX + panelWidth, yPos + totalHeight + padding - radius);
                ctx.quadraticCurveTo(panelX + panelWidth, yPos + totalHeight + padding, panelX + panelWidth - radius, yPos + totalHeight + padding);
                ctx.lineTo(panelX + radius, yPos + totalHeight + padding);
                ctx.quadraticCurveTo(panelX, yPos + totalHeight + padding, panelX, yPos + totalHeight + padding - radius);
                ctx.lineTo(panelX, yPos - fontSize + radius);
                ctx.quadraticCurveTo(panelX, yPos - fontSize, panelX + radius, yPos - fontSize);
                ctx.closePath();
                ctx.fill();

                // Draw Text - White on Charcoal, no glow
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 0;
                
                lines.forEach((line, i) => {
                    ctx.fillText(line, canvas.width / 2, yPos + (i * lineHeight));
                });

                ctx.restore();
            }

            // Draw VWF EXPRESS (Alfie on Hoverboard)
            if (gameState.current.alfieHoverboardImage) {
                ctx.save();
                ctx.translate(gameState.current.playerX, canvas.height - 175); // Raised 75px
                
                // Visual feedback: Subtle tilt when moving
                let tilt = 0;
                if (gameState.current.moveLeft) tilt = -0.1;
                if (gameState.current.moveRight) tilt = 0.1;
                ctx.rotate(tilt);

                // CYTOKINE STORM: Energy Trail
                if (gameState.current.isCytokineStormActive) {
                    ctx.save();
                    ctx.shadowBlur = 40;
                    ctx.shadowColor = '#00e5ff';
                    ctx.strokeStyle = '#00e5ff';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(-50, 10);
                    ctx.lineTo(-70, 60);
                    ctx.moveTo(50, 10);
                    ctx.lineTo(70, 60);
                    ctx.stroke();
                    ctx.restore();

                    // Extra particles
                    if (Math.random() < 0.5) {
                        spawnParticles(gameState.current.playerX + (Math.random()-0.5)*80, canvas.height - 175, '#00e5ff', 2, 0.5);
                    }
                }

                // Neon Glow for the board - reserved for game objects
                ctx.shadowBlur = gameState.current.isCytokineStormActive ? 50 : 25;
                ctx.shadowColor = gameState.current.isCytokineStormActive ? '#00e5ff' : '#00f2ff';

                const boardW = 120;
                const boardH = 120;
                ctx.drawImage(gameState.current.alfieHoverboardImage, -boardW/2, -boardH/2, boardW, boardH);

                // Label - Clearer font, reduced effects
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#00f2ff';
                ctx.font = 'bold 18px Courier New';
                ctx.textAlign = 'center';
                ctx.fillText('VON WILLEBRAND EXPRESS', 0, 85);
                
                ctx.restore();
            }
            
            // HUD Portrait: ONLY VISIBLE DURING CYTOKINE STORM as a special "Excited" state
            if (gameState.current.isCytokineStormActive && gameState.current.portraitHappy) {
                ctx.save();
                const portSize = 140;
                const margin = 20;
                // Place it in the top right, but below the score HUD
                ctx.translate(canvas.width - portSize - margin, margin + 120);
                
                // EXTREME EXCITEMENT: Shaking/Glitch effect
                const shakeX = (Math.random() - 0.5) * 6;
                const shakeY = (Math.random() - 0.5) * 6;
                ctx.translate(shakeX, shakeY);

                // Tech border
                ctx.shadowBlur = 30 + Math.sin(Date.now() / 50) * 10;
                ctx.shadowColor = '#00e5ff';
                ctx.strokeStyle = '#00e5ff';
                ctx.lineWidth = 3;
                
                // Rounded corner frame for portrait
                const r = 10;
                ctx.beginPath();
                ctx.moveTo(r, 0);
                ctx.lineTo(portSize - r, 0);
                ctx.quadraticCurveTo(portSize, 0, portSize, r);
                ctx.lineTo(portSize, portSize - r);
                ctx.quadraticCurveTo(portSize, portSize, portSize - r, portSize);
                ctx.lineTo(r, portSize);
                ctx.quadraticCurveTo(0, portSize, 0, portSize - r);
                ctx.lineTo(0, r);
                ctx.quadraticCurveTo(0, 0, r, 0);
                ctx.stroke();
                
                // Clipping for portrait
                ctx.save();
                ctx.clip();
                
                // Glitchy draw
                if (Math.random() > 0.95) ctx.globalAlpha = 0.5;
                ctx.drawImage(gameState.current.portraitHappy, 0, 0, portSize, portSize);
                ctx.restore();
                
                // Label outside clip
                ctx.fillStyle = '#00e5ff';
                ctx.font = 'bold 16px Courier New';
                ctx.textAlign = 'center';
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00e5ff';
                ctx.fillText('STORM SYNCHRONIZED', portSize / 2, portSize + 25);
                ctx.restore();
            }

            // Draw Cytokine Storm Announcement
            if (gameState.current.announcement) {
                ctx.save();
                ctx.fillStyle = '#00e5ff';
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#00e5ff';
                ctx.font = 'bold 60px Courier New';
                ctx.textAlign = 'center';
                ctx.globalAlpha = Math.min(1.0, gameState.current.announcement.timer / 20);
                ctx.fillText(gameState.current.announcement.text, canvas.width / 2, canvas.height / 2);
                ctx.restore();
            }
        };

        animationFrameId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [currentQuestionIndex, explanation]);

    // Timer effect for explanation
    useEffect(() => {
        if (timer > 0 && gameState.current.isPaused) {
            const t = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(t);
                        nextQuestion();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(t);
        }
    }, [timer]);

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setExplanation(null);
            setTimer(0);
            gameState.current.isPaused = false;
            gameState.current.orbs = [];
            gameState.current.hasAttemptedCurrent = false;
        } else {
            // End Game
            const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
            const results = {
                score,
                total: questions.length,
                correct: firstAttemptCorrect,
                percentage: Math.round((firstAttemptCorrect / questions.length) * 100),
                history,
                duration
            };
            onComplete(results);
        }
    };

    return e('div', { className: 'nexus-game-root', style: { position: 'fixed', inset: 0, backgroundColor: '#000', overflow: 'hidden' } },
        e('canvas', { ref: canvasRef, style: { display: 'block' } }),
        
        // Stats HUD
        e('div', { className: 'nexus-stats-hud', style: { position: 'absolute', top: '20px', left: '20px', color: '#00ff41', fontFamily: 'Courier New', textShadow: '0 0 10px #00ff41' } },
            e('div', null, `SYNAPSE SCORE: ${score}`),
            e('div', null, `ACCURACY: ${Math.round((firstAttemptCorrect / Math.max(1, currentQuestionIndex)) * 100)}%`),
            e('div', null, `QUESTION: ${currentQuestionIndex + 1} / ${questions.length}`)
        ),

        // Explanation Panel
        explanation && e('div', { className: 'explanation-overlay fade-in', style: { 
            position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 
        } },
            e('div', { className: 'explanation-panel', style: { 
                width: '650px', padding: '40px', background: '#0d0208', border: '2px solid #00ff41', 
                boxShadow: '0 0 30px #00ff41', color: '#fff', fontFamily: 'Courier New',
                display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'flex-start'
            } },
                // Alfie Portrait in Explanation
                e('div', { style: { flexShrink: 0 } },
                    e('img', { 
                        src: explanation.isFirstAttempt ? 'assets/alfie_portrait_happy.webp' : 'assets/alfie_portrait_neutral.webp',
                        style: { width: '150px', height: '150px', border: '2px solid #00f2ff', boxShadow: '0 0 15px #00f2ff', borderRadius: '10px' }
                    })
                ),
                e('div', { style: { flex: 1 } },
                    e('h2', { style: { color: explanation.isFirstAttempt ? '#00ff41' : '#ffcc00', textShadow: '0 0 10px', marginTop: 0 } }, 
                        explanation.isFirstAttempt ? 'SYNAPTIC CONNECTION SUCCESSFUL' : 'CONNECTION RE-ESTABLISHED'
                    ),
                    e('div', { style: { marginTop: '20px', opacity: 0.8, fontSize: '18px' } }, explanation.q),
                    e('div', { style: { marginTop: '20px', color: '#00e5ff', fontWeight: 'bold', fontSize: '20px' } }, `✓ ${explanation.ans}`),
                    e('div', { style: { marginTop: '20px', borderTop: '1px solid #333', paddingTop: '20px', lineHeight: '1.6' } }, explanation.rationale),
                    e('div', { style: { marginTop: '40px', textAlign: 'center', opacity: 0.6 } }, 
                        `CONTINUING IN ${timer}s OR PRESS [B]`
                    )
                )
            )
        )
    );
}
