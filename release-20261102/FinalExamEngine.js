import React, { useState, useMemo, useEffect } from 'react';
import { MODULE4_QUIZ_DATA, MODULE4_PATHOPHYSIOLOGY_DATA } from './module4-content.js';
import { MODULE5_QUIZ_DATA, MODULE5_PATHOPHYSIOLOGY_DATA } from './module5-content.js';
import { MODULE6_QUIZ_DATA, MODULE6_PATHOPHYSIOLOGY_DATA } from './module6-content.js';
import { MODULE7_QUIZ_DATA, MODULE7_PATHOPHYSIOLOGY_DATA } from './module7-content.js';
import Module4Engine from './Module4Engine.js';
import Module5Engine from './Module5Engine.js';
import Module6Engine from './Module6Engine.js';
import Module7Engine from './Module7Engine.js';

const e = React.createElement;

function MatrixStinger({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return e('div', { className: 'matrix-stinger' }, 
    e('div', { className: 'stinger-logo-wrap' },
      e('div', { className: 'stinger-brand matrix-text' }, 'DR. MODALI'),
      e('div', { className: 'stinger-labs matrix-text' }, 'LEARNING LABS'),
      e('div', { className: 'matrix-text', style: { fontSize: '0.8rem', marginTop: '15px', color: '#fff' } }, 'TRANSITIONING TO NEXT UNIT...')
    )
  );
}

export default function FinalExamEngine({ operatorName, onBack }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [phase, setPhase] = useState('intro'); // intro -> stinger -> quiz_gauntlet -> stinger -> final_sim -> complete
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selected, setSelected] = useState(null);
    const [history, setHistory] = useState([]);
    const [showStinger, setShowStinger] = useState(false);
    const [activeLabMod, setActiveLabMod] = useState(null);

    // Filtered pool for Modules 4-7
    const examPool = useMemo(() => {
        const allQuizzes = [
            ...MODULE4_QUIZ_DATA, ...MODULE5_QUIZ_DATA, ...MODULE6_QUIZ_DATA, ...MODULE7_QUIZ_DATA
        ];
        return allQuizzes.sort(() => Math.random() - 0.5).slice(0, 75);
    }, []);

    const handleAnswer = (idx) => {
        if (answered) return;
        setAnswered(true);
        setSelected(idx);
        const isCorrect = idx === examPool[currentIdx].ans;
        if (isCorrect) setScore(s => s + 1);
        setHistory([...history, { q: currentIdx, correct: isCorrect }]);
    };

    const nextQ = () => {
        if (currentIdx < examPool.length - 1) {
            // Every 15 questions, show a "Lab Break"
            if ((currentIdx + 1) % 15 === 0) {
                setShowStinger(true);
                const modIds = [4, 5, 6, 7];
                setActiveLabMod(modIds[Math.floor((currentIdx + 1) / 15) - 1]);
                setPhase('lab_break');
            } else {
                setCurrentIdx(i => i + 1);
                setAnswered(false);
                setSelected(null);
            }
        } else {
            setPhase('complete');
        }
    };

    const handleLabComplete = () => {
        setShowStinger(true);
        setActiveLabMod(null);
        setPhase('quiz_gauntlet');
        setCurrentIdx(i => i + 1);
        setAnswered(false);
        setSelected(null);
    };

    if (phase === 'intro') {
        return e('div', { className: 'splash-screen' }, 
            e('div', { className: 'identity-panel' },
                e('div', { className: 'matrix-text', style: { borderBottom: '1px solid', paddingBottom: '10px', marginBottom: '20px' } }, 'BLOCK 2 CERTIFICATION'),
                e('p', { style: { lineHeight: '1.6' } }, `Greetings, Operator ${operatorName}. You are about to enter the Final Exam Gauntlet for Modules 4-7. This simulation consists of a 75-question mechanism review interspersed with clinical lab exercises.`),
                e('button', { className: 'btn-cyber mission-start-btn', style: { width: '100%', marginTop: '30px' }, onClick: () => { setShowStinger(true); setPhase('quiz_gauntlet'); } }, 'INITIATE GAUNTLET')
            ),
            showStinger && e(MatrixStinger, { onComplete: () => setShowStinger(false) })
        );
    }

    if (phase === 'lab_break') {
        const renderEngine = () => {
            const props = { 
                operatorName, 
                activeMode: activeLabMod === 4 ? 'matrix_collapse' : activeLabMod === 5 ? 'gi_ed' : activeLabMod === 6 ? 'neuro_icu' : 'renal_arena',
                onBack: handleLabComplete,
                onModeChange: () => {},
                onReportResult: ({ correct }) => { if (correct) setScore(s => s + 5); } 
            };
            if (activeLabMod === 4) return e(Module4Engine, props);
            if (activeLabMod === 5) return e(Module5Engine, props);
            if (activeLabMod === 6) return e(Module6Engine, props);
            return e(Module7Engine, props);
        };

        return e('div', { className: 'app-root' }, 
            renderEngine(),
            showStinger && e(MatrixStinger, { onComplete: () => setShowStinger(false) })
        );
    }

    if (phase === 'complete') {
        const percentage = Math.round((score / (examPool.length + 20)) * 100);
        return e('div', { className: 'splash-screen' }, 
            e('div', { className: 'identity-panel', style: { textAlign: 'center' } },
                e('h1', { className: 'matrix-text' }, 'CERTIFICATION COMPLETE'),
                e('div', { style: { fontSize: '2rem', margin: '20px 0' } }, `${percentage}%`),
                e('p', null, `OPERATOR: ${operatorName}`),
                e('button', { className: 'btn-cyber', onClick: onBack }, 'RETURN HUB')
            )
        );
    }

    const q = examPool[currentIdx];

    return e('div', { className: 'mod3-exam-screen' },
        e('div', { className: 'exam-card' },
            e('div', { className: 'exam-header' }, `GAUNTLET Q${currentIdx + 1} / 75 — MODULES 4-7`),
            e('p', { className: 'exam-context' }, q.q),
            e('div', { className: 'exam-options' },
                q.opts.map((opt, i) => e('button', { 
                    key: i, 
                    className: `exam-opt ${answered && i === q.ans ? 'correct' : ''} ${answered && i === selected && i !== q.ans ? 'wrong' : ''}`, 
                    onClick: () => handleAnswer(i) 
                }, opt))
            ),
            answered && e('div', { className: 'exam-feedback' },
                e('div', { className: 'feedback-title' }, q.ans === selected ? '✓ ACCURATE' : '✗ DISCREPANCY'),
                e('p', null, q.rationales[selected] || q.rationales[q.ans])
            ),
            answered && e('button', { className: 'btn-cyber', style: { marginTop: '20px' }, onClick: nextQ }, 'NEXT CHALLENGE →')
        ),
        showStinger && e(MatrixStinger, { onComplete: () => setShowStinger(false) })
    );
}
