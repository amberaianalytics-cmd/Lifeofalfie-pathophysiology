
import React, { useEffect, useRef, useState } from 'react';
import { SiegeGame } from './Module4SiegeEngine.js';
import { jsPDF } from 'jspdf';

const e = React.createElement;

export default function Module4SiegeComponent({ onBack, onMusicChange, onReportResult }) {
    const canvasRef = useRef(null);
    const gameRef = useRef(null);
    
    // HUD Refs
    const hudRefs = {
        main: useRef(null),
        menu: useRef(null),
        levelUp: useRef(null),
        clinic: useRef(null),
        gameOver: useRef(null),
        loading: useRef(null),
        hpFill: useRef(null),
        xpFill: useRef(null),
        score: useRef(null),
        level: useRef(null),
        chain: useRef(null),
        upgradeOptions: useRef(null),
        patientData: useRef(null),
        diagnosticOptions: useRef(null),
        feedback: useRef(null),
        finalScore: useRef(null),
        gameOverTitle: useRef(null),
        explanationOverlay: useRef(null),
        explanationContent: useRef(null)
    };

    const [gameResult, setGameResult] = useState(null);

    const generatePDFReport = (result) => {
        const doc = new jsPDF();
        const stats = result.stats;
        const timestamp = new Date().toLocaleString();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(0, 102, 204);
        doc.text("OSTEO SIEGE - PERFORMANCE REPORT", 105, 20, { align: "center" });
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Activity: Module 4 Musculoskeletal Simulation`, 20, 35);
        doc.text(`Date: ${timestamp}`, 20, 42);
        doc.text(`Final Score: ${result.score}`, 20, 49);

        // Stats Summary
        doc.setFontSize(16);
        doc.text("Session Summary", 20, 65);
        doc.setFontSize(12);
        doc.text(`Total Questions Answered: ${stats.totalQuestions}`, 30, 75);
        doc.text(`Correct Answers: ${stats.correctAnswers}`, 30, 82);
        doc.text(`Incorrect Answers: ${stats.incorrectAnswers}`, 30, 89);
        doc.text(`Accuracy: ${stats.accuracy}%`, 30, 96);
        doc.text(`Longest Streak: ${stats.longestStreak}`, 30, 103);
        doc.text(`Completion Time: ${stats.timePlayed} seconds`, 30, 110);

        // Performance Summary
        let summary = "Needs Improvement";
        if (stats.accuracy >= 90) summary = "Excellent - Mastered Module 4 Content";
        else if (stats.accuracy >= 75) summary = "Proficient - Solid Understanding of MSK Mechanisms";
        else if (stats.accuracy >= 60) summary = "Developing - Review Recommended for Missed Topics";
        
        doc.setFontSize(14);
        doc.text("Performance Assessment", 20, 125);
        doc.setFontSize(12);
        doc.text(summary, 30, 135);

        // Study Review Section
        if (stats.missedQuestions.length > 0) {
            doc.addPage();
            doc.setFontSize(18);
            doc.setTextColor(204, 0, 0);
            doc.text("PERSONALIZED STUDY GUIDE - AREAS FOR REVIEW", 105, 20, { align: "center" });
            
            let y = 40;
            stats.missedQuestions.forEach((item, index) => {
                if (y > 250) {
                    doc.addPage();
                    y = 20;
                }
                doc.setFontSize(11);
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'bold');
                doc.text(`${index + 1}. [${item.topic}] ${item.q}`, 20, y);
                y += 7;
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 153, 51);
                doc.text(`Correct Answer: ${item.ans}`, 25, y);
                y += 7;
                doc.setTextColor(100, 100, 100);
                const splitExplanation = doc.splitTextToSize(`Rationale: ${item.explanation}`, 160);
                doc.text(splitExplanation, 25, y);
                y += (splitExplanation.length * 6) + 10;
            });
        }

        doc.save(`OsteoSiege_Report_${timestamp.replace(/[/:\s]/g, '_')}.pdf`);
    };

    useEffect(() => {
        // Load external CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'Module4Siege.css';
        document.head.appendChild(link);

        const hudElements = {};
        Object.entries(hudRefs).forEach(([key, ref]) => {
            hudElements[key] = ref.current;
        });

        gameRef.current = new SiegeGame(canvasRef.current, hudElements, (result) => {
            setGameResult(result);
            if (onReportResult) {
                onReportResult({
                    score: result.score,
                    module: 'Module 4: Musculoskeletal',
                    traps: result.traps,
                    level: result.level,
                    stats: result.stats
                });
            }
            if (result.stats) {
                generatePDFReport(result);
            }
        }, onMusicChange);

        return () => {
            if (gameRef.current) gameRef.current.destroy();
            document.head.removeChild(link);
        };
    }, []);

    const startRotation = () => {
        setGameResult(null);
        if (gameRef.current) gameRef.current.startGame();
    };

    return e('div', { id: 'siege-game-root', style: { width: '100%', height: '100%', position: 'relative', background: '#000' } },
        e('canvas', { ref: canvasRef, id: 'game-canvas' }),
        
        // HUD
        e('div', { ref: hudRefs.main, id: 'hud', className: 'hidden' },
            e('div', { className: 'hud-left' },
                e('div', { className: 'stat-bar hp-bar' },
                    e('div', { ref: hudRefs.hpFill, id: 'hp-fill' }),
                    e('span', { className: 'label' }, 'INTEGRITY')
                )
            ),
            e('div', { className: 'hud-right' },
                e('div', { ref: hudRefs.chain, id: 'streak-counter', className: 'hidden' }, 'COMBO: 0'),
                e('div', { ref: hudRefs.score, id: 'score-display' }, 'REMEMBRANCE: 0')
            )
        ),

        // Menus
        e('div', { ref: hudRefs.menu, id: 'menu-overlay', className: 'overlay' },
            e('div', { className: 'menu-content' },
                e('h1', { className: 'glitch' }, 'OSTEO SIEGE'),
                e('p', null, 'Master the mechanisms. Defend the structures.'),
                e('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center' } },
                    e('button', { id: 'start-btn', onClick: startRotation }, 'BEGIN ROTATION'),
                    e('button', { onClick: onBack, style: { background: '#444' } }, 'CAMPUS HUB')
                )
            )
        ),

        e('div', { ref: hudRefs.explanationOverlay, id: 'explanation-overlay', className: 'overlay hidden' },
            e('div', { className: 'menu-content explanation-panel' },
                e('div', { ref: hudRefs.explanationContent, className: 'explanation-content-scroll' })
            )
        ),

        e('div', { ref: hudRefs.levelUp, id: 'level-up-overlay', className: 'overlay hidden' },
            e('div', { className: 'menu-content' },
                e('h2', null, 'MECHANISM SELECTION'),
                e('div', { ref: hudRefs.upgradeOptions, id: 'upgrade-options' })
            )
        ),

        e('div', { ref: hudRefs.clinic, id: 'clinic-overlay', className: 'overlay hidden' },
            e('div', { className: 'menu-content' },
                e('h2', null, 'CLINICAL ENCOUNTER'),
                e('p', { ref: hudRefs.patientData, id: 'patient-data' }),
                e('div', { ref: hudRefs.diagnosticOptions, id: 'diagnostic-options' }),
                e('p', { ref: hudRefs.feedback, id: 'feedback', className: 'hidden' })
            )
        ),

        e('div', { ref: hudRefs.gameOver, id: 'game-over-overlay', className: 'overlay hidden' },
            e('div', { className: 'menu-content' },
                e('h2', { ref: hudRefs.gameOverTitle, id: 'game-over-title' }, 'SYSTEM COLLAPSE'),
                e('p', { ref: hudRefs.finalScore, id: 'final-score' }),
                
                gameResult && gameResult.stats && e('div', { className: 'stats-summary-grid' },
                    e('div', { className: 'stat-item' }, 
                        e('span', { className: 'stat-label' }, 'ACCURACY'),
                        e('span', { className: 'stat-value' }, `${gameResult.stats.accuracy}%`)
                    ),
                    e('div', { className: 'stat-item' }, 
                        e('span', { className: 'stat-label' }, 'STREAK'),
                        e('span', { className: 'stat-value' }, gameResult.stats.longestStreak)
                    ),
                    e('div', { className: 'stat-item' }, 
                        e('span', { className: 'stat-label' }, 'CORRECT'),
                        e('span', { className: 'stat-value' }, gameResult.stats.correctAnswers)
                    ),
                    e('div', { className: 'stat-item' }, 
                        e('span', { className: 'stat-label' }, 'TIME'),
                        e('span', { className: 'stat-value' }, `${gameResult.stats.timePlayed}s`)
                    )
                ),

                gameResult && gameResult.traps && gameResult.traps.length > 0 && e('div', { className: 'traps-summary' },
                    e('h3', { style: { color: '#ff0055' } }, 'CLINICAL MISCONCEPTIONS:'),
                    e('ul', null, gameResult.traps.map((t, i) => e('li', { key: i }, t)))
                ),
                e('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' } },
                    e('button', { id: 'retry-btn', onClick: startRotation }, 'RE-START RESIDENCY'),
                    e('button', { onClick: onBack, style: { background: '#444' } }, 'RETURN TO HUB')
                ),
                e('p', { style: { marginTop: '15px', fontSize: '12px', color: '#888' } }, 'A printable study guide has been generated.')
            )
        ),

        e('div', { ref: hudRefs.loading, id: 'loading-overlay', className: 'overlay' },
            e('div', { className: 'menu-content' },
                e('h2', { className: 'matrix-text' }, 'INITIALIZING PHYSIOLOGY...')
            )
        )
    );
}
