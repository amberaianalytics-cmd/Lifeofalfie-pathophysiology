
import React, { useEffect, useRef, useState } from 'react';
import { MidtermNexusEngine } from './MidtermNexusEngine.js';
import { MIDTERM_NEXUS_QUESTIONS } from './MidtermNexusData.js';

const e = React.createElement;

export default function MidtermNexusComponent({ onBack, onGeneratePDF }) {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);

    const [health, setHealth] = useState(100);
    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [choices, setChoices] = useState([]);
    const [explanation, setExplanation] = useState(null); // { text, isCorrect, correctIdx }
    const [timer, setTimer] = useState(0);
    const [phase, setPhase] = useState('IDLE');
    const [gameState, setGameState] = useState('playing'); 
    const [results, setResults] = useState(null);
    const [reviewMode, setReviewMode] = useState(false);
    const [reviewIndex, setReviewIndex] = useState(0);

    useEffect(() => {
        const hudCallbacks = {
            setHealth,
            setScore,
            setQuestion: setCurrentQuestion,
            setChoices,
            setQuestionIndex,
            setExplanation: (text, isCorrect, correctIdx) => setExplanation({ text, isCorrect, correctIdx }),
            setTimer,
            setPhase
        };

        const onGameOver = () => setGameState('gameover');
        const onVictory = (finalResults) => {
            setResults(finalResults);
            setGameState('victory');
        };

        engineRef.current = new MidtermNexusEngine(
            canvasRef.current,
            hudCallbacks,
            onGameOver,
            onVictory,
            null 
        );

        engineRef.current.start(MIDTERM_NEXUS_QUESTIONS);

        const handleGlobalKey = (e) => {
            if (e.code === 'Space' && engineRef.current?.state.phase === 'EXPLAINING') {
                engineRef.current.nextQuestion();
            }
            if (engineRef.current?.state.phase === 'QUESTIONING') {
                if (e.code === 'Digit1') engineRef.current.handleAnswer(0);
                if (e.code === 'Digit2') engineRef.current.handleAnswer(1);
                if (e.code === 'Digit3') engineRef.current.handleAnswer(2);
                if (e.code === 'Digit4') engineRef.current.handleAnswer(3);
            }
        };

        window.addEventListener('keydown', handleGlobalKey);

        return () => {
            if (engineRef.current) engineRef.current.destroy();
            window.removeEventListener('keydown', handleGlobalKey);
        };
    }, []);

    const handleRestart = () => {
        setGameState('playing');
        setHealth(100);
        setScore(0);
        setQuestionIndex(1);
        setExplanation(null);
        setTimer(0);
        setPhase('IDLE');
        setReviewMode(false);
        engineRef.current.start(MIDTERM_NEXUS_QUESTIONS);
    };

    const getRank = (percentage) => {
        if (percentage >= 95) return "S+ — Nexus Master";
        if (percentage >= 90) return "S — Chief of Medicine";
        if (percentage >= 80) return "A — Attending";
        if (percentage >= 70) return "B — Resident";
        return "C — Intern";
    };

    return e('div', { className: 'nexus-root' },
        e('canvas', { ref: canvasRef, className: 'nexus-canvas' }),

        // HUD
        gameState === 'playing' && e('div', { className: 'nexus-hud' },
            e('div', { className: 'hud-top-left' },
                e('div', { className: 'stat-row' }, e('span', null, 'NEURAL STABILITY: '), e('span', { className: 'value', style: { color: health < 40 ? '#ff0055' : '#00f2ff' } }, `${health}%`)),
                e('div', { className: 'stat-row' }, e('span', null, 'SYNAPSE SCORE: '), e('span', { className: 'value' }, score))
            ),
            e('div', { className: 'hud-top-center' },
                e('div', { className: 'question-count' }, `NEURAL SECTION: ${questionIndex} / 100`)
            ),
            
            // Explanation Overlay
            phase === 'EXPLAINING' && explanation && e('div', { className: 'explanation-box' },
                e('div', { className: 'explanation-timer' }, `CONTINUING IN: ${timer}s`),
                e('div', { className: 'explanation-result', style: { color: explanation.isCorrect ? '#00ffaa' : '#ff0055' } }, 
                    explanation.isCorrect ? 'SYNAPTIC CONNECTION SUCCESSFUL' : 'NEURAL INTERFERENCE DETECTED'
                ),
                e('div', { className: 'explanation-header' }, 'PHYSIOLOGICAL RATIONALE'),
                e('div', { className: 'explanation-content' }, explanation.text),
                e('div', { className: 'explanation-hint' }, '[SPACE] TO CONTINUE')
            ),

            phase === 'QUESTIONING' && e('div', { className: 'hud-bottom' },
                e('div', { className: 'question-text' }, currentQuestion),
                e('div', { className: 'control-hint' }, 'IDENTIFY THE PATHOLOGY: USE FLIGHT-CONTROLS TO AIM AT A DIAGNOSIS & PRESS [SPACE] TO SCAN')
            ),

            phase === 'OBSERVING' && e('div', { className: 'observation-hint' }, 'OBSERVING MEDICAL SUBJECT...'),
            phase === 'FOCUSING' && e('div', { className: 'observation-hint focusing' }, 'STABILIZING NEURAL FOCUS...')
        ),

        // Overlays
        gameState === 'gameover' && e('div', { className: 'nexus-overlay' },
            e('div', { className: 'overlay-content' },
                e('h1', { className: 'danger' }, 'SIMULATION FAILED'),
                e('p', null, `Section ${questionIndex} stability lost. System critical.`),
                e('button', { onClick: handleRestart }, 'RESTART SIMULATION'),
                e('button', { onClick: onBack, style: { background: '#444' } }, 'ABORT MISSION')
            )
        ),

        gameState === 'victory' && results && e('div', { className: 'nexus-overlay' },
            e('div', { className: 'overlay-content victory-content' },
                e('h1', { className: 'success' }, 'MISSION COMPLETE'),
                e('h2', null, 'THE MIDTERM NEXUS SYNCHRONIZED'),
                e('div', { className: 'victory-grid' },
                    e('div', { className: 'victory-stat-card' },
                        e('div', { className: 'stat-label' }, 'TOTAL SCORE'),
                        e('div', { className: 'stat-value' }, results.score)
                    ),
                    e('div', { className: 'victory-stat-card' },
                        e('div', { className: 'stat-label' }, 'ACCURACY'),
                        e('div', { className: 'stat-value' }, `${results.percentage}%`)
                    ),
                    e('div', { className: 'victory-stat-card' },
                        e('div', { className: 'stat-label' }, 'RANK'),
                        e('div', { className: 'stat-value' }, getRank(results.percentage))
                    )
                ),
                e('div', { className: 'topics-review' },
                    e('div', { className: 'topic-list mastered' },
                        e('h3', null, 'TOPICS MASTERED'),
                        e('ul', null, results.masteredTopics.slice(0, 5).map(t => e('li', { key: t }, t)))
                    ),
                    e('div', { className: 'topic-list missed' },
                        e('h3', null, 'TOPICS FOR REVIEW'),
                        e('ul', null, results.missedTopics.slice(0, 5).map(t => e('li', { key: t }, t)))
                    )
                ),
                e('div', { className: 'action-row' },
                    results.missedQuestions && results.missedQuestions.length > 0 && e('button', { 
                        onClick: () => {
                            setReviewIndex(0);
                            setReviewMode(true);
                        },
                        style: { background: '#ff0055', color: '#fff' }
                    }, 'REVIEW MISSED EXPLANATIONS'),
                    e('button', { onClick: () => onGeneratePDF(results) }, 'DOWNLOAD PERFORMANCE REPORT'),
                    e('button', { onClick: handleRestart }, 'REPLAY MODULE'),
                    e('button', { onClick: onBack, style: { background: '#0044ff' } }, 'RETURN TO CAMPUS HUB')
                )
            )
        ),

        // Review Mode Overlay
        reviewMode && results?.missedQuestions && e('div', { className: 'review-overlay' },
            e('div', { className: 'review-content' },
                e('div', { className: 'review-header' },
                    e('h2', null, 'NEURAL REVIEW MODE'),
                    e('div', { className: 'review-counter' }, `QUESTION ${reviewIndex + 1} OF ${results.missedQuestions.length}`)
                ),
                e('div', { className: 'review-question' }, results.missedQuestions[reviewIndex].q),
                e('div', { className: 'review-rationale-section' },
                    e('div', { className: 'review-rationale-label' }, 'Physiological Rationale'),
                    e('div', { className: 'review-rationale-text' }, results.missedQuestions[reviewIndex].rationale)
                ),
                e('div', { className: 'review-controls' },
                    e('button', { 
                        className: 'btn-prev', 
                        disabled: reviewIndex === 0,
                        onClick: () => setReviewIndex(prev => Math.max(0, prev - 1))
                    }, 'PREVIOUS'),
                    e('button', { 
                        className: 'btn-close', 
                        onClick: () => setReviewMode(false) 
                    }, 'EXIT REVIEW'),
                    e('button', { 
                        className: 'btn-next', 
                        disabled: reviewIndex === results.missedQuestions.length - 1,
                        onClick: () => setReviewIndex(prev => Math.min(results.missedQuestions.length - 1, prev + 1))
                    }, 'NEXT')
                )
            )
        )
    );
}
