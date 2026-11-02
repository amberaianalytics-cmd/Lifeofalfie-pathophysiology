import React, { useEffect, useRef, useState } from 'react';
import { RetroAudio } from './systems/RetroAudio.js';

const IMMUNE_CELLS = [
    { name: 'Neutrophil', color: '#ffffff', attack: 'Rapid oxidative burst' },
    { name: 'Macrophage', color: '#ffff00', attack: 'Engulfs target' },
    { name: 'Dendritic Cell', color: '#00ff00', attack: 'Antigen presentation' },
    { name: 'Natural Killer Cell', color: '#ff00ff', attack: 'Cytotoxic burst' },
    { name: 'CD8 Cytotoxic T Cell', color: '#ff0000', attack: 'Perforin beam' },
    { name: 'CD4 Helper T Cell', color: '#00ffff', attack: 'Cytokine support' },
    { name: 'B Cell', color: '#0000ff', attack: 'Antibody projectile' },
    { name: 'Plasma Cell', color: '#7b68ee', attack: 'Antibody barrage' },
    { name: 'Eosinophil', color: '#ff8c00', attack: 'Toxic granules' },
    { name: 'Basophil', color: '#4b0082', attack: 'Histamine release' },
    { name: 'Mast Cell', color: '#ff1493', attack: 'Histamine explosion' },
    { name: 'Regulatory T Cell', color: '#a9a9a9', attack: 'Suppression' }
];

const PATHOGENS = [
    // Bacteria -> Neutrophil
    { name: 'Staphylococcus aureus', target: 'Neutrophil' },
    { name: 'Streptococcus pyogenes', target: 'Neutrophil' },
    { name: 'Streptococcus pneumoniae', target: 'Neutrophil' },
    { name: 'Escherichia coli', target: 'Neutrophil' },
    { name: 'Klebsiella pneumoniae', target: 'Neutrophil' },
    { name: 'Pseudomonas aeruginosa', target: 'Neutrophil' },
    { name: 'Neisseria meningitidis', target: 'Neutrophil' },
    { name: 'Haemophilus influenzae', target: 'Neutrophil' },
    { name: 'Shigella', target: 'Neutrophil' },
    { name: 'Campylobacter', target: 'Neutrophil' },
    { name: 'Vibrio cholerae', target: 'Neutrophil' },
    { name: 'Clostridium tetani', target: 'Neutrophil' },
    { name: 'Clostridium difficile', target: 'Neutrophil' },
    { name: 'Candida albicans', target: 'Neutrophil' },
    { name: 'Aspergillus fumigatus', target: 'Neutrophil' },
    // Bacteria -> Macrophage
    { name: 'Salmonella', target: 'Macrophage' },
    { name: 'Yersinia pestis', target: 'Macrophage' },
    { name: 'Legionella pneumophila', target: 'Macrophage' },
    { name: 'Mycobacterium tuberculosis', target: 'Macrophage' },
    { name: 'Mycobacterium leprae', target: 'Macrophage' },
    { name: 'Treponema pallidum', target: 'Macrophage' },
    { name: 'Borrelia burgdorferi', target: 'Macrophage' },
    { name: 'Cryptococcus neoformans', target: 'Macrophage' },
    { name: 'Histoplasma capsulatum', target: 'Macrophage' },
    { name: 'Blastomyces', target: 'Macrophage' },
    { name: 'Coccidioides', target: 'Macrophage' },
    // CD8 T Cell
    { name: 'Listeria monocytogenes', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Influenza', target: 'CD8 Cytotoxic T Cell' },
    { name: 'SARS-CoV-2', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Epstein-Barr Virus', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Herpes Simplex Virus', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Varicella Zoster Virus', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Respiratory Syncytial Virus', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Hepatitis B', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Hepatitis C', target: 'CD8 Cytotoxic T Cell' },
    { name: 'HIV', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Human Papillomavirus', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Rabies', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Kidney Transplant', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Heart Transplant', target: 'CD8 Cytotoxic T Cell' },
    { name: 'Liver Transplant', target: 'CD8 Cytotoxic T Cell' },
    // NK Cell
    { name: 'Cytomegalovirus', target: 'Natural Killer Cell' },
    { name: 'Melanoma', target: 'Natural Killer Cell' },
    { name: 'Glioblastoma', target: 'Natural Killer Cell' },
    { name: 'Leukemia Cell', target: 'Natural Killer Cell' },
    { name: 'Lymphoma Cell', target: 'Natural Killer Cell' },
    { name: 'Renal Cell Carcinoma', target: 'Natural Killer Cell' },
    { name: 'Small Cell Lung Cancer', target: 'Natural Killer Cell' },
    // Eosinophil
    { name: 'Ascaris lumbricoides', target: 'Eosinophil' },
    { name: 'Strongyloides', target: 'Eosinophil' },
    { name: 'Hookworm', target: 'Eosinophil' },
    { name: 'Schistosoma', target: 'Eosinophil' },
    { name: 'Taenia', target: 'Eosinophil' },
    { name: 'Trichinella', target: 'Eosinophil' },
    { name: 'Enterobius', target: 'Eosinophil' },
    { name: 'Wuchereria bancrofti', target: 'Eosinophil' },
    // Mast Cell
    { name: 'Pollen', target: 'Mast Cell' },
    { name: 'House Dust Mite', target: 'Mast Cell' },
    { name: 'Cat Dander', target: 'Mast Cell' },
    { name: 'Bee Sting', target: 'Mast Cell' },
    { name: 'Peanut Protein', target: 'Mast Cell' },
    { name: 'Latex', target: 'Mast Cell' },
    // Regulatory T Cell
    { name: 'Autoimmune Tissue', target: 'Regulatory T Cell' }
];

const e = React.createElement;

export default function ImmuneDefenseMiniGame({ isActive, musicPulse = 1.0 }) {
    const canvasRef = useRef(null);
    const [cellIndex, setCellIndex] = useState(0);
    const gameState = useRef({
        playerX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
        enemy: null,
        projectiles: [],
        particles: [],
        lastTime: 0,
        feedback: null,
        feedbackTimer: 0,
        moveLeft: false,
        moveRight: false
    });

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (gameState.current.playerX > canvas.width) gameState.current.playerX = canvas.width / 2;
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        const spawnEnemy = () => {
            const pathogen = PATHOGENS[Math.floor(Math.random() * PATHOGENS.length)];
            gameState.current.enemy = {
                ...pathogen,
                x: Math.random() * (canvas.width - 400) + 200,
                y: -100,
                speed: canvas.height / (15 * 60), // Travel in ~15 seconds at 60fps
                health: 100,
                pulse: 0
            };
        };

        const handleKeyDown = (ev) => {
            if (!isActive) return;
            
            if (ev.code === 'ArrowLeft') {
                gameState.current.moveLeft = true;
            } else if (ev.code === 'ArrowRight') {
                gameState.current.moveRight = true;
            } else if (ev.code === 'KeyN') {
                setCellIndex(prev => (prev - 1 + IMMUNE_CELLS.length) % IMMUNE_CELLS.length);
            } else if (ev.code === 'KeyM') {
                setCellIndex(prev => (prev + 1) % IMMUNE_CELLS.length);
            } else if (ev.code === 'Space') {
                ev.preventDefault();
                fireProjectile();
            }
        };

        const handleKeyUp = (ev) => {
            if (ev.code === 'ArrowLeft') gameState.current.moveLeft = false;
            if (ev.code === 'ArrowRight') gameState.current.moveRight = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const fireProjectile = () => {
            RetroAudio.playLaser();
            const cell = IMMUNE_CELLS[cellIndex];
            gameState.current.projectiles.push({
                x: gameState.current.playerX,
                y: canvas.height - 120,
                cell: cell,
                speed: 12,
                life: 1.0
            });
        };

        const update = (time) => {
            const dt = time - gameState.current.lastTime;
            gameState.current.lastTime = time;

            // Player movement
            const moveSpeed = 10;
            if (gameState.current.moveLeft) gameState.current.playerX = Math.max(100, gameState.current.playerX - moveSpeed);
            if (gameState.current.moveRight) gameState.current.playerX = Math.min(canvas.width - 100, gameState.current.playerX + moveSpeed);

            // Enemy update
            if (!gameState.current.enemy) {
                spawnEnemy();
            } else {
                gameState.current.enemy.y += gameState.current.enemy.speed;
                gameState.current.enemy.pulse = Math.sin(time / 200) * 0.1 + 1.0;
                if (gameState.current.enemy.y > canvas.height + 100) {
                    gameState.current.enemy = null;
                    setTimeout(spawnEnemy, 1000);
                }
            }

            // Projectiles update
            gameState.current.projectiles = gameState.current.projectiles.filter(p => {
                p.y -= p.speed;
                
                // Collision check
                if (gameState.current.enemy && 
                    Math.abs(p.x - gameState.current.enemy.x) < 50 && 
                    Math.abs(p.y - gameState.current.enemy.y) < 50) {
                    
                    const isCorrect = p.cell.name === gameState.current.enemy.target;
                    if (isCorrect) {
                        gameState.current.enemy.health -= 35;
                        spawnParticles(p.x, p.y, p.cell.color, 15);
                        if (gameState.current.enemy.health <= 0) {
                            RetroAudio.playHit(true);
                            RetroAudio.playExplosion();
                            spawnParticles(gameState.current.enemy.x, gameState.current.enemy.y, '#ffffff', 40);
                            gameState.current.enemy = null;
                            setTimeout(spawnEnemy, 1000);
                        } else {
                            RetroAudio.playHit(false);
                        }
                    } else {
                        RetroAudio.playRicochet();
                        gameState.current.feedback = "INEFFECTIVE IMMUNE RESPONSE";
                        gameState.current.feedbackTimer = 90;
                        spawnParticles(p.x, p.y, p.cell.color, 5);
                    }
                    return false;
                }
                return p.y > -50;
            });

            // Particles update
            gameState.current.particles = gameState.current.particles.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.015;
                return p.life > 0;
            });

            if (gameState.current.feedbackTimer > 0) gameState.current.feedbackTimer--;

            draw();
            animationFrameId = requestAnimationFrame(update);
        };

        const spawnParticles = (x, y, color, count) => {
            for (let i = 0; i < count; i++) {
                gameState.current.particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 12,
                    vy: (Math.random() - 0.5) * 12,
                    color,
                    life: 1.0
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mPulse = musicPulse; // Use passed music pulse if available

            // Draw Pathogen
            if (gameState.current.enemy) {
                const enemy = gameState.current.enemy;
                const pulse = enemy.pulse * mPulse;
                
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                
                // Glow
                ctx.shadowBlur = 20 * pulse;
                ctx.shadowColor = '#ff3e3e';
                
                // Pathogen body
                ctx.fillStyle = 'rgba(255, 62, 62, 0.8)';
                ctx.beginPath();
                ctx.arc(0, 0, 30 * pulse, 0, Math.PI * 2);
                ctx.fill();

                // Pathogen name
                ctx.shadowBlur = 5;
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 18px Courier New';
                ctx.textAlign = 'center';
                ctx.fillText(enemy.name.toUpperCase(), 0, -50);
                
                // Health bar (subtle)
                ctx.fillStyle = 'rgba(51, 51, 51, 0.5)';
                ctx.fillRect(-30, 45, 60, 6);
                ctx.fillStyle = '#ff3e3e';
                ctx.fillRect(-30, 45, 60 * (enemy.health / 100), 6);
                
                ctx.restore();
            }

            // Draw Projectiles
            gameState.current.projectiles.forEach(p => {
                ctx.save();
                ctx.shadowBlur = 15 * mPulse;
                ctx.shadowColor = p.cell.color;
                ctx.fillStyle = p.cell.color;
                
                // Style based on immune cell
                const name = p.cell.name;
                if (name === 'Neutrophil') {
                    // Rapid oxidative burst
                    ctx.fillRect(p.x - 3, p.y - 15, 6, 20);
                } else if (name === 'Macrophage') {
                    // Phagocytosis bubble
                    ctx.beginPath(); ctx.arc(p.x, p.y, 12, 0, Math.PI * 2); ctx.fill();
                } else if (name === 'CD8 Cytotoxic T Cell') {
                    // Perforin beam
                    ctx.fillRect(p.x - 2, p.y - 40, 4, 50);
                } else if (name === 'Eosinophil') {
                    // Orange toxic granules
                    ctx.fillStyle = '#ff8c00';
                    ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
                } else if (name === 'Mast Cell') {
                    // Histamine explosion (large projectile)
                    ctx.beginPath(); ctx.arc(p.x, p.y, 15, 0, Math.PI * 2); ctx.fill();
                } else {
                    ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); ctx.fill();
                }
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

            // Draw Feedback
            if (gameState.current.feedbackTimer > 0) {
                ctx.save();
                ctx.globalAlpha = Math.min(1.0, gameState.current.feedbackTimer / 30);
                ctx.fillStyle = '#ff3e3e';
                ctx.font = 'bold 24px Courier New';
                ctx.textAlign = 'center';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#000';
                ctx.fillText(gameState.current.feedback, canvas.width / 2, canvas.height / 2 + 100);
                ctx.restore();
            }

            // Draw Player
            const cell = IMMUNE_CELLS[cellIndex];
            ctx.save();
            ctx.translate(gameState.current.playerX, canvas.height - 100);
            
            // Player Glow
            ctx.shadowBlur = 25 * mPulse;
            ctx.shadowColor = cell.color;
            
            // Player body
            ctx.fillStyle = cell.color;
            ctx.beginPath();
            ctx.arc(0, 0, 35, 0, Math.PI * 2);
            ctx.fill();

            // Inner core
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.fill();

            // Cell name
            ctx.shadowBlur = 5;
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Courier New';
            ctx.textAlign = 'center';
            ctx.fillText(cell.name.toUpperCase(), 0, 70);
            
            ctx.restore();
        };

        animationFrameId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isActive, cellIndex, musicPulse]);

    return e('canvas', {
        ref: canvasRef,
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.7
        }
    });
}


