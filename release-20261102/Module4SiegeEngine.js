import * as Tone from 'tone';
import { QUESTION_BANK, COMMON_TRAPS } from './Module4SiegeData.js';

export class SiegeGame {
    constructor(canvas, hudElements, onGameOver, onMusicChange) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = 1200;
        this.height = 800;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.hud = hudElements;
        this.onGameOver = onGameOver;
        this.onMusicChange = onMusicChange;

        this.gameState = 'menu';
        this.score = 0;
        this.level = 1;
        this.player = {
            x: this.width / 2,
            y: this.height - 150,
            radius: 40,
            speed: 10,
            hp: 100,
            maxHp: 100,
            projectiles: [],
            lastShot: 0,
            shootDelay: 250,
            tilt: 0,
            wobble: 0
        };

        this.currentQuestion = null;
        this.seenQuestions = [];
        this.enemies = [];
        this.trapsEncountered = [];
        this.particles = [];
        this.stars = []; // Parallax stars
        this.keys = {};
        this.isPaused = false;
        this.spawnDelay = 0; 
        this.onExplanationResume = null;
        this.bgScroll = 0;

        // Statistics
        this.stats = {
            totalQuestions: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            currentStreak: 0,
            longestStreak: 0,
            startTime: Date.now(),
            missedQuestions: []
        };

        this.explanationTimer = null;
        this.explanationTimeLeft = 0;
        this.isCytokineStormActive = false;

        this.comboPopup = { text: '', alpha: 0, scale: 1, timer: 0, x: 0, y: 0, color: '#00ffaa' };
        this.screenFlash = { color: '', alpha: 0 };
        this.cameraShake = 0;
        this.intensity = 0; // 0 to 1 scaling based on streak

        this.assets = {};
        this.isLoaded = false;
        
        // Initialize parallax stars
        for (let i = 0; i < 60; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: 1 + Math.random() * 3,
                speed: 2 + Math.random() * 8
            });
        }

        this.loadAssets().then(() => {
            this.isLoaded = true;
            if (this.hud.loading) this.hud.loading.classList.add('hidden');
            this.playTrack('menu');
        });

        this.setupEventListeners();
        this.running = true;
        this.loop();
    }

    destroy() {
        this.running = false;
        if (this.explanationTimer) clearInterval(this.explanationTimer);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    async loadAssets() {
        const toLoad = {
            player: 'assets/cyber-medic-player-sprite.webp',
            cytokine: 'assets/cytokine-shot.webp',
            boneHighway: 'assets/neon-bone-highway-background.webp',
            osteoblast: 'assets/osteoblast-builder-drone-sprite.webp',
            osteoclast: 'assets/osteoclast-demolition-mech-sprite.webp',
            osteocyte: 'assets/osteocyte-sentinel-drone-sprite.webp',
            fibroblast: 'assets/fibroblast-engineer-drone-sprite.webp',
            star: 'assets/arcade-energy-star-sprite.webp'
        };

        const imagePromises = Object.entries(toLoad).map(([key, src]) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    this.assets[key] = img;
                    resolve();
                };
                img.onerror = () => {
                    console.warn(`Failed to load asset: ${src}`);
                    resolve();
                };
                img.src = src;
            });
        });

        await Promise.all(imagePromises);
    }

    playTrack(key) {
        if (!this.onMusicChange) return;
        
        let trackPath = 'assets/alfitechno1.mp3';
        const streak = this.stats.currentStreak;

        if (this.gameState === 'menu') {
            trackPath = 'assets/alfitechno1.mp3';
        } else if (this.gameState === 'playing') {
            if (streak >= 15) trackPath = 'assets/alfitechno5.mp3';
            else if (streak >= 10) trackPath = 'assets/alfitechno4.mp3';
            else if (streak >= 6) trackPath = 'assets/alfitechno3.mp3';
            else if (streak >= 3) trackPath = 'assets/alfitechno2.mp3';
            else trackPath = 'assets/alfitechno1.mp3';
        }
        
        this.onMusicChange(trackPath);
    }

    setupEventListeners() {
        this.handleKeyDown = (e) => {
            this.keys[e.code] = true;
            if (this.gameState === 'playing' && this.isPaused && e.code === 'KeyB') {
                if (this.explanationTimer) {
                    this.resumeAfterExplanation();
                }
            }
        };
        this.handleKeyUp = (e) => this.keys[e.code] = false;
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    async startGame() {
        if (!this.isLoaded) return;
        if (Tone.context.state !== 'running') await Tone.start();

        this.gameState = 'playing';
        this.score = 0;
        this.level = 1;
        this.player.hp = 100;
        this.player.projectiles = [];
        this.player.x = this.width / 2;
        this.player.y = this.height - 150;
        
        this.stats = {
            totalQuestions: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            currentStreak: 0,
            longestStreak: 0,
            startTime: Date.now(),
            missedQuestions: []
        };
        if (this.explanationTimer) clearInterval(this.explanationTimer);
        this.explanationTimeLeft = 0;
        this.isCytokineStormActive = false;

        this.pickNewQuestion();
        
        if (this.hud.menu) this.hud.menu.classList.add('hidden');
        if (this.hud.gameOver) this.hud.gameOver.classList.add('hidden');
        if (this.hud.main) this.hud.main.classList.remove('hidden');
        this.updateHUD();
        this.playTrack('action');
    }

    pickNewQuestion() {
        let available = QUESTION_BANK.filter(q => !this.seenQuestions.includes(q.q));
        if (available.length === 0) {
            this.seenQuestions = [];
            available = QUESTION_BANK;
        }
        
        const q = available[Math.floor(Math.random() * available.length)];
        this.currentQuestion = q;
        this.seenQuestions.push(q.q);
        
        this.enemies = [];
        this.spawnDelay = 60; 
    }

    updateHUD() {
        if (this.hud.hpFill) this.hud.hpFill.style.width = `${Math.max(0, this.player.hp)}%`;
        if (this.hud.score) this.hud.score.textContent = `REMEMBRANCE: ${this.score}`;
        
        if (this.hud.chain) {
            if (this.stats.currentStreak >= 2) {
                this.hud.chain.classList.remove('hidden');
                this.hud.chain.textContent = `COMBO x${this.stats.currentStreak}`;
                this.hud.chain.className = this.stats.currentStreak >= 10 ? 'arcade-streak-hyper' : 'arcade-streak-active';
            } else {
                this.hud.chain.classList.add('hidden');
            }
        }
    }

    spawnConcept() {
        if (this.isPaused || this.spawnDelay > 0) return;
        if (this.enemies.length > 0) return;

        const q = this.currentQuestion;
        const options = [];
        
        options.push({ label: q.ans, isCorrect: true });

        q.opts.forEach(opt => {
            if (opt !== q.ans) {
                options.push({ label: opt, isCorrect: false });
            }
        });

        while (options.length < 4) {
            const randomTrap = Object.keys(COMMON_TRAPS)[Math.floor(Math.random() * Object.keys(COMMON_TRAPS).length)];
            options.push({ label: randomTrap, isCorrect: false });
        }

        options.sort(() => Math.random() - 0.5);

        const sectionWidth = this.width / 4;
        options.forEach((opt, i) => {
            const x = (i * sectionWidth) + (sectionWidth / 2);
            
            const getSprite = (label) => {
                const lower = label.toLowerCase();
                if (lower.includes('osteoblast')) return this.assets.osteoblast;
                if (lower.includes('osteoclast')) return this.assets.osteoclast;
                if (lower.includes('osteocyte')) return this.assets.osteocyte;
                if (lower.includes('fibroblast')) return this.assets.fibroblast;
                // Fallbacks to drones
                if (lower.includes('resorption') || lower.includes('estrogen')) return this.assets.osteoclast;
                if (lower.includes('calcification') || lower.includes('mineralization')) return this.assets.osteoblast;
                return this.assets.fibroblast; 
            };

            const finalSpeed = (1.5 + (this.level * 0.2)) * (0.8 + Math.random() * 0.4);

            this.enemies.push({
                x,
                y: -150 - (Math.random() * 100),
                label: opt.label,
                isCorrect: opt.isCorrect,
                radius: 60,
                speed: finalSpeed,
                sprite: getSprite(opt.label),
                flash: 0,
                glow: 0,
                shake: 0,
                isActive: false,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.05 + Math.random() * 0.05
            });
        });
    }

    update() {
        if (this.gameState !== 'playing') return;
        if (this.spawnDelay > 0) this.spawnDelay--;
        if (this.isPaused) return;

        // Player Wobble & Tilt
        this.player.wobble += 0.1;
        
        // Movement
        let targetTilt = 0;
        if ((this.keys['ArrowUp'] || this.keys['KeyW']) && this.player.y > 250) this.player.y -= this.player.speed;
        if ((this.keys['ArrowDown'] || this.keys['KeyS']) && this.player.y < this.height - 100) this.player.y += this.player.speed;
        if ((this.keys['ArrowLeft'] || this.keys['KeyA']) && this.player.x > 80) {
            this.player.x -= this.player.speed;
            targetTilt = -0.2;
        }
        if ((this.keys['ArrowRight'] || this.keys['KeyD']) && this.player.x < this.width - 80) {
            this.player.x += this.player.speed;
            targetTilt = 0.2;
        }
        this.player.tilt += (targetTilt - this.player.tilt) * 0.1;

        // Manual Shooting
        const now = Date.now();
        if (this.keys['Space'] && now - this.player.lastShot > this.player.shootDelay) {
            const shootY = this.player.y - 40;
            if (this.isCytokineStormActive) {
                const offsets = [-40, -15, 15, 40];
                offsets.forEach(off => {
                    this.player.projectiles.push({ 
                        x: this.player.x + off, 
                        y: shootY, 
                        vy: -12, 
                        radius: 10, 
                        bounced: false,
                        isStorm: true
                    });
                });
            } else {
                this.player.projectiles.push({ 
                    x: this.player.x, 
                    y: shootY, 
                    vy: -10, 
                    radius: 8, 
                    bounced: false 
                });
            }
            this.player.lastShot = now;
            this.cameraShake = 2; // Tiny recoil
        }

        this.player.projectiles = this.player.projectiles.filter(p => {
            p.y += p.vy;
            return p.y > -50 && p.y < this.height + 50;
        });

        // Stars parallax
        const starSpeedMult = 1 + this.intensity * 2;
        this.stars.forEach(s => {
            s.y += s.speed * starSpeedMult;
            if (s.y > this.height) {
                s.y = -10;
                s.x = Math.random() * this.width;
            }
        });

        this.bgScroll += (2 + this.intensity * 10);

        this.enemies.forEach((e, eIdx) => {
            e.y += e.speed;
            e.wobble += e.wobbleSpeed;
            e.x += Math.sin(e.wobble) * 1.5; // Sine wobble for arcade feel

            if (!e.isActive && e.y > 150) {
                e.isActive = true;
                e.glow = 30; 
            }

            if (e.flash > 0) e.flash--;
            if (e.glow > 0) e.glow--;
            if (e.shake > 0) e.shake--;
            
            if (e.isActive) {
                this.player.projectiles.forEach((p, pIdx) => {
                    if (p.bounced) return; 
                    const pdx = p.x - e.x;
                    const pdy = p.y - e.y;
                    const pdist = Math.sqrt(pdx*pdx + pdy*pdy);
                    if (pdist < p.radius + e.radius) {
                        this.handleConceptHit(e, eIdx, p);
                    }
                });
            }

            if (e.y > this.height + 150) {
                if (e.isCorrect) {
                    this.player.hp -= 20; 
                    this.screenFlash = { color: 'rgba(255, 0, 0, 0.4)', alpha: 0.6 };
                    this.cameraShake = 20;
                    this.stats.currentStreak = 0;
                    this.playTrack('action');
                }
                this.enemies.splice(eIdx, 1);
            }
        });

        if (this.player.hp <= 0) this.gameOver();

        if (this.screenFlash.alpha > 0) this.screenFlash.alpha -= 0.05;
        if (this.cameraShake > 0) this.cameraShake -= 1;
        
        const targetIntensity = Math.min(1, this.stats.currentStreak / 15);
        this.intensity += (targetIntensity - this.intensity) * 0.02;

        if (this.comboPopup.timer > 0) {
            this.comboPopup.timer--;
            this.comboPopup.y -= 2;
            if (this.comboPopup.timer < 10) this.comboPopup.alpha -= 0.1;
        }

        this.spawnConcept();
        this.updateHUD();
        
        this.particles.forEach(p => { 
            p.x += p.vx; 
            p.y += p.vy; 
            p.life -= 0.02; 
            p.rotation += 0.1;
        });
        this.particles = this.particles.filter(p => p.life > 0);
    }

    handleConceptHit(concept, index, projectile) {
        if (this.isPaused) return;

        if (concept.isCorrect) {
            this.isPaused = true;
            this.score += 1000 * (1 + Math.floor(this.stats.currentStreak / 5));
            this.player.projectiles = []; 
            
            this.cameraShake = 25;
            this.createParticles(concept.x, concept.y, '#00ffaa', 40);
            
            const streak = this.stats.currentStreak + 1;
            let popupText = `COMBO x${streak}`;
            let popupColor = '#00ffaa';
            if (streak % 5 === 0) {
                popupText = `DOMINATING! x${streak}`;
                popupColor = '#ffea00';
            }
            if (streak >= 15) {
                popupText = `UNSTOPPABLE! x${streak}`;
                popupColor = '#ff0055';
            }

            this.comboPopup = {
                text: popupText,
                alpha: 1,
                scale: 1.5 + (streak * 0.05),
                timer: 80,
                x: concept.x,
                y: concept.y,
                color: popupColor
            };

            this.stats.totalQuestions++;
            this.stats.correctAnswers++;
            this.stats.currentStreak++;
            if (this.stats.currentStreak > this.stats.longestStreak) {
                this.stats.longestStreak = this.stats.currentStreak;
            }

            if (this.stats.currentStreak >= 3 && !this.isCytokineStormActive) {
                this.isCytokineStormActive = true;
                this.screenFlash = { color: 'rgba(0, 242, 255, 0.3)', alpha: 0.8 };
            }

            this.playTrack('action');

            if (this.hud.explanationOverlay && this.hud.explanationContent) {
                this.hud.explanationOverlay.classList.remove('hidden');
                
                const q = this.currentQuestion;
                const chainHtml = q.chain ? q.chain.map((step, idx) => `
                    <div class="chain-step-row ${idx === q.chain.length - 1 ? 'current' : 'done'}">
                        <span class="chain-dot"></span>
                        <span class="chain-label">${step}</span>
                    </div>`).join('<div class="chain-arrow">↓</div>') : '';

                this.explanationTimeLeft = 15; // Faster pace
                
                const updateExplanationUI = () => {
                    this.hud.explanationContent.innerHTML = `
                        <div class="explanation-timer-wrap">
                            <div class="timer-text">SYSTEM RE-CALIBRATING: <span class="timer-countdown">${Math.ceil(this.explanationTimeLeft)}s</span></div>
                            <div class="timer-progress-bg">
                                <div class="timer-progress-fill" style="width: ${(this.explanationTimeLeft / 15) * 100}%"></div>
                            </div>
                        </div>
                        <h2 style="color: #00ffaa; margin-bottom: 20px; font-family: 'Press Start 2P'; font-size: 1.5rem;">[ CORRECT ]</h2>
                        <div class="explanation-main">
                            <p class="explanation-logic"><strong>MECHANISM:</strong> ${q.explanation}</p>
                        </div>
                        ${q.chain ? `
                        <div class="mechanism-chain-wrap">
                            <h3>PHYSIOLOGICAL CASCADE</h3>
                            <div class="chain-flow-vertical">
                                ${chainHtml}
                            </div>
                        </div>` : ''}
                        <div class="clinical-pearl-box">
                            <h3>CLINICAL INTEL</h3>
                            <p>${q.pearl || q.explanation}</p>
                        </div>
                        <div class="explanation-skip-hint">
                            <strong>Press B to JUMP TO NEXT WAVE</strong>
                        </div>
                    `;
                };

                updateExplanationUI();

                if (this.explanationTimer) clearInterval(this.explanationTimer);
                this.explanationTimer = setInterval(() => {
                    this.explanationTimeLeft -= 1;
                    if (this.explanationTimeLeft <= 0) {
                        clearInterval(this.explanationTimer);
                        this.explanationTimer = null;
                        this.resumeAfterExplanation();
                    } else {
                        updateExplanationUI();
                    }
                }, 1000);
            }
        } else {
            // WRONG ANSWER
            concept.flash = 20;
            concept.shake = 20;
            this.createParticles(concept.x, concept.y, '#ff0055', 30);
            
            this.screenFlash = { color: 'rgba(255, 0, 0, 0.6)', alpha: 0.7 };
            this.cameraShake = 30;

            this.stats.totalQuestions++;
            this.stats.incorrectAnswers++;
            this.stats.currentStreak = 0;
            this.isCytokineStormActive = false;
            this.playTrack('action');

            this.stats.missedQuestions.push({
                q: this.currentQuestion.q,
                ans: this.currentQuestion.ans,
                explanation: this.currentQuestion.explanation,
                topic: this.currentQuestion.topic
            });

            projectile.vy = -projectile.vy * 0.5;
            projectile.vx = (Math.random() - 0.5) * 12;
            projectile.bounced = true;
            
            this.player.hp -= 15;
            if (this.player.hp <= 0) this.gameOver();

            if (!this.trapsEncountered.includes(concept.label)) this.trapsEncountered.push(concept.label);
        }
    }

    resumeAfterExplanation() {
        if (this.explanationTimer) {
            clearInterval(this.explanationTimer);
            this.explanationTimer = null;
        }
        this.isPaused = false;
        this.player.projectiles = []; 
        this.enemies = []; 
        if (this.hud.explanationOverlay) this.hud.explanationOverlay.classList.add('hidden');
        this.pickNewQuestion();
    }

    gameOver() {
        this.gameState = 'game-over';
        this.playTrack('menu');
        if (this.hud.gameOver) this.hud.gameOver.classList.remove('hidden');
        if (this.hud.finalScore) this.hud.finalScore.textContent = `FINAL SCORE: ${this.score}`;
        if (this.hud.main) this.hud.main.classList.add('hidden');
        
        const timePlayed = Math.floor((Date.now() - this.stats.startTime) / 1000);
        const accuracy = this.stats.totalQuestions > 0 ? Math.round((this.stats.correctAnswers / this.stats.totalQuestions) * 100) : 0;
        
        if (this.onGameOver) {
            this.onGameOver({ 
                score: this.score, 
                traps: this.trapsEncountered, 
                level: this.level,
                stats: { ...this.stats, timePlayed, accuracy }
            });
        }
    }

    createParticles(x, y, color, count = 10) {
        for (let i = 0; i < count; i++) {
            this.particles.push({ 
                x, 
                y, 
                vx: (Math.random() - 0.5) * 12, 
                vy: (Math.random() - 0.5) * 12, 
                life: 1.5, 
                color,
                size: 2 + Math.random() * 6,
                rotation: Math.random() * Math.PI * 2
            });
        }
    }

    draw() {
        this.ctx.globalAlpha = 1.0;
        this.ctx.filter = 'none';
        this.ctx.shadowBlur = 0;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Camera Shake
        if (this.cameraShake > 0) {
            this.ctx.translate((Math.random() - 0.5) * this.cameraShake, (Math.random() - 0.5) * this.cameraShake);
        }

        // Parallax Stars
        this.ctx.save();
        this.stars.forEach(s => {
            this.ctx.fillStyle = `rgba(0, 242, 255, ${0.3 + (s.speed/10)})`;
            if (this.assets.star) {
                this.ctx.drawImage(this.assets.star, s.x, s.y, s.size * 2, s.size * 2);
            } else {
                this.ctx.fillRect(s.x, s.y, s.size, s.size);
            }
        });
        this.ctx.restore();
        
        // Scrolling Highway
        const bg = this.assets.boneHighway;
        if (bg) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.5 + (this.intensity * 0.4);
            const scroll = (this.bgScroll % this.height);
            this.ctx.drawImage(bg, 0, scroll - this.height, this.width, this.height);
            this.ctx.drawImage(bg, 0, scroll, this.width, this.height);
            this.ctx.restore();
        }

        this.enemies.forEach(e => {
            this.ctx.save();
            let sx = 0, sy = 0;
            if (e.shake > 0) { sx = (Math.random()-0.5)*12; sy = (Math.random()-0.5)*12; }
            this.ctx.translate(e.x + sx, e.y + sy);

            if (e.flash > 0) this.ctx.filter = `brightness(2) contrast(1.5)`;
            
            const glowStrength = 20 + (this.intensity * 50);
            if (e.isActive) { 
                this.ctx.shadowBlur = glowStrength; 
                this.ctx.shadowColor = e.isCorrect ? '#00ffaa' : '#ff0055'; 
            }

            if (e.sprite) {
                // Add a small pulsating rotation for drones
                const rotation = Math.sin(Date.now() * 0.005 + e.wobble) * 0.1;
                const pulse = 1 + Math.sin(Date.now() * 0.01 + e.wobble) * 0.05;
                this.ctx.rotate(rotation);
                this.ctx.scale(pulse, pulse);
                this.ctx.drawImage(e.sprite, -e.radius, -e.radius, e.radius*2, e.radius*2);
            }
            
            this.ctx.strokeStyle = e.isActive ? (e.isCorrect ? '#00ffaa' : '#ff0055') : 'rgba(255,255,255,0.2)';
            this.ctx.lineWidth = 4 + (this.intensity * 4);
            this.ctx.setLineDash([10, 5]);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, e.radius + 5, 0, Math.PI*2);
            this.ctx.stroke();
            this.ctx.restore();

            // Label
            this.ctx.save();
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 16px "Press Start 2P", cursive, sans-serif';
            if (!this.ctx.font.includes('Press Start')) this.ctx.font = 'bold 16px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = 'black';
            const words = e.label.split(' ');
            let line = '', yP = e.y + e.radius + 25;
            for(let n=0; n<words.length; n++) {
                let test = line + words[n] + ' ';
                if (test.length > 15 && n > 0) {
                    this.ctx.fillText(line, e.x, yP);
                    line = words[n] + ' ';
                    yP += 22;
                } else line = test;
            }
            this.ctx.fillText(line, e.x, yP);
            this.ctx.restore();
        });

        // Player polish
        this.ctx.save();
        this.ctx.translate(this.player.x, this.player.y);
        this.ctx.rotate(this.player.tilt);
        
        // Thrusters
        this.ctx.save();
        this.ctx.globalAlpha = 0.6 + Math.sin(this.player.wobble * 2) * 0.4;
        this.ctx.fillStyle = '#00f2ff';
        this.ctx.beginPath();
        this.ctx.moveTo(-15, 30);
        this.ctx.lineTo(0, 60 + Math.sin(this.player.wobble) * 20);
        this.ctx.lineTo(15, 30);
        this.ctx.fill();
        this.ctx.restore();

        if (this.intensity > 0.5) {
            this.ctx.shadowBlur = 30 * this.intensity;
            this.ctx.shadowColor = '#00f2ff';
        }
        if (this.assets.player) {
            this.ctx.drawImage(this.assets.player, -60, -60, 120, 120);
        }
        this.ctx.restore();

        this.player.projectiles.forEach(p => {
            if (this.assets.cytokine) {
                this.ctx.save();
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = p.isStorm ? '#00f2ff' : '#00ffaa';
                this.ctx.drawImage(this.assets.cytokine, p.x - 20, p.y - 20, 40, 40);
                this.ctx.restore();
            }
        });

        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;
            if (this.assets.star) {
                this.ctx.drawImage(this.assets.star, -p.size/2, -p.size/2, p.size, p.size);
            } else {
                this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            }
            this.ctx.restore();
        });

        if (this.screenFlash.alpha > 0) {
            this.ctx.save();
            this.ctx.fillStyle = this.screenFlash.color;
            this.ctx.globalAlpha = this.screenFlash.alpha;
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.restore();
        }

        // Combo Popup
        if (this.comboPopup.alpha > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.comboPopup.alpha;
            this.ctx.fillStyle = this.comboPopup.color;
            this.ctx.font = `bold ${24 * this.comboPopup.scale}px "Press Start 2P", monospace`;
            this.ctx.textAlign = 'center';
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = 'black';
            this.ctx.fillText(this.comboPopup.text, this.comboPopup.x, this.comboPopup.y);
            this.ctx.restore();
        }

        // Question Box
        if (this.currentQuestion) {
            this.ctx.save();
            const boxW = 1100, boxH = 120, boxX = (this.width - boxW)/2, boxY = 40;
            
            // Glassmorphism effect
            this.ctx.fillStyle = 'rgba(10, 15, 30, 0.9)';
            this.ctx.beginPath();
            this.ctx.roundRect(boxX, boxY, boxW, boxH, 8);
            this.ctx.fill();
            
            this.ctx.strokeStyle = `rgba(0, 242, 255, ${0.4 + this.intensity * 0.6})`;
            this.ctx.lineWidth = 4 + (this.intensity * 4);
            this.ctx.shadowBlur = 15 * this.intensity;
            this.ctx.shadowColor = '#00f2ff';
            this.ctx.stroke();

            this.ctx.fillStyle = '#fff';
            this.ctx.font = '26px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            const lines = this.wrapText(this.currentQuestion.q.toUpperCase(), boxW - 100);
            lines.forEach((line, i) => {
                this.ctx.fillText(line, this.width / 2, boxY + (boxH / 2) + (i * 35) - ((lines.length - 1) * 17));
            });
            this.ctx.restore();
        }
    }

    wrapText(text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
            const width = this.ctx.measureText(currentLine + " " + words[i]).width;
            if (width < maxWidth) currentLine += " " + words[i];
            else { lines.push(currentLine); currentLine = words[i]; }
        }
        lines.push(currentLine);
        return lines;
    }

    loop() {
        if (!this.running) return;
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}