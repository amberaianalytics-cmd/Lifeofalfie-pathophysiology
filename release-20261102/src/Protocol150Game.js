import React, { useEffect, useRef, useState } from 'react';
import { Protocol150Engine } from '../Protocol150Engine.js';
import { PROTOCOL_150_QUESTIONS } from '../Protocol150Data.js';

const e = React.createElement;

export default function Protocol150Game({ onComplete, onGeneratePDF, onMusicChange }) {
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
    const [gameState, setGameState] = useState('playing'); // playing, gameover, victory
    const [results, setResults] = useState(null);

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

        const onGameOver = () => {
            setGameState('gameover');
        };

        const onVictory = (finalResults) => {
            setResults(finalResults);
            setGameState('victory');
            onComplete(finalResults);
        };

        engineRef.current = new Protocol150Engine(
            canvasRef.current,
            hudCallbacks,
            onGameOver,
            onVictory,
            null // audioManager if needed
        );

        engineRef.current.start(PROTOCOL_150_QUESTIONS);

        // Global keys for the game
        const handleGlobalKey = (e) => {
            if (e.code === 'Space' && engineRef.current?.state.phase === 'EXPLAINING') {
                engineRef.current.nextQuestion();
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
        engineRef.current.start(PROTOCOL_150_QUESTIONS);
    };

    return e('div', { className: 'nexus-root' },
        e('canvas', { ref: canvasRef, className: 'nexus-canvas' }),

        // HUD
        gameState === 'playing' && e('div', { className: 'nexus-hud' },
            e('div', { className: 'hud-top-left' },
                e('div', { className: 'stat-row' }, e('span', null, 'NEURAL STABILITY: '), e('span', { className: 'value', style: { color: health < 40 ? '#ff3e3e' : '#00f2ff' } }, `${health}%`)),
                e('div', { className: 'stat-row' }, e('span', null, 'SYNAPSE SCORE: '), e('span', { className: 'value' }, score))
            ),
            e('div', { className: 'hud-top-center' },
                e('div', { className: 'question-count' }, `NEURAL SECTION: ${questionIndex} / ${PROTOCOL_150_QUESTIONS.length}`)
            ),
            
            // Explanation Overlay
            phase === 'EXPLAINING' && explanation && e('div', { className: 'explanation-box' },
                e('div', { className: 'explanation-timer' }, `CONTINUING IN: ${timer}s`),
                e('div', { className: 'explanation-result', style: { color: explanation.isCorrect ? '#00ffaa' : '#ff3e3e' } }, 
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
                e('button', { onClick: handleRestart }, 'RESTART SIMULATION')
            )
        )
    );
}
