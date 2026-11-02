import React, { useState, useMemo, useEffect } from 'react';
import { 
    MOD7_DATABASE, 
    MOD7_GAME_MODES, 
    MOD7_STORY_SCENARIOS, 
    MODULE7_NPC_DATA, 
    MODULE7_WORLD_LOCATIONS,
    MOD7_INFECTION_DATA,
    MOD7_STONE_DATA
} from './module7-content.js';

const e = React.createElement;

// --- SHARED RUNNER COMPONENT ---
function StandardQuizRunner({ questions, onBack, onReportResult, title, setScore }) {
    const [idx, setIdx] = useState(0);
    const [answers, setAnswers] = useState({}); // { [qIdx]: { selected: number, correct: bool } }
    const [viewingRationale, setViewingRationale] = useState(null);

    const q = questions[idx];
    const answerState = answers[idx];
    const isLocked = answerState !== undefined;

    useEffect(() => {
        setViewingRationale(answers[idx]?.selected ?? null);
    }, [idx, answers]);

    const handleSelect = (optIdx) => {
        if (!isLocked) {
            const isCorrect = optIdx === q.ans;
            setAnswers(prev => ({ ...prev, [idx]: { selected: optIdx, correct: isCorrect } }));
            if (isCorrect && setScore) setScore(s => s + 10);
            onReportResult({ id: `${title}-${idx}`, correct: isCorrect });
        }
        setViewingRationale(optIdx);
    };

    const localScore = Object.values(answers).filter(a => a.correct).length;

    return e('div', { className: 'mod3-sim-screen fade-in' },
        e('div', { className: 'sim-header' },
            e('div', { className: 'sim-type-badge' }, title),
            e('div', { className: 'matrix-text' }, `QUESTION ${idx + 1} / ${questions.length}`),
            e('button', { className: 'hud-back-btn', onClick: onBack }, 'EXIT')
        ),
        e('div', { className: 'quiz-modal', style: { margin: '0 auto', flex: 1, width: '90%' } },
            e('div', { className: 'quiz-scroll-area' },
                e('p', { className: 'quiz-question' }, q.q),
                e('div', { className: 'quiz-options' },
                    q.opts.map((opt, i) => {
                        let cls = 'quiz-opt';
                        if (isLocked) {
                            if (i === q.ans) cls += ' correct';
                            else if (i === answerState.selected) cls += ' wrong';
                        }
                        if (viewingRationale === i) cls += ' reviewing';
                        if (answerState?.selected === i) cls += ' locked-selection';

                        return e('button', { key: i, className: cls, onClick: () => handleSelect(i) },
                            e('span', { className: 'quiz-opt-number' }, i + 1),
                            e('span', { className: 'quiz-opt-text' }, opt),
                            isLocked && i === answerState.selected && e('span', { className: 'quiz-your-answer-badge' }, 'SELECTED'),
                            isLocked && i === q.ans && e('span', { className: 'quiz-correct-badge' }, 'CORRECT')
                        );
                    })
                ),
                viewingRationale !== null && e('div', { className: `feedback-rationale ${viewingRationale === q.ans ? 'rationale-correct' : 'rationale-wrong'}` },
                    e('div', { className: 'rationale-header' }, `RATIONALE: ${q.opts[viewingRationale]}`),
                    e('div', { className: 'rationale-body' }, q.rationales[viewingRationale])
                )
            ),
            e('div', { className: 'quiz-nav-row', style: { padding: '20px', background: '#111' } },
                e('button', { className: 'btn-cyber-small', disabled: idx === 0, onClick: () => setIdx(i => i - 1) }, '← PREV'),
                e('div', { className: 'matrix-text' }, `ACCURACY: ${localScore} / ${Object.keys(answers).length || 0}`),
                e('button', { className: 'btn-cyber-small', disabled: idx === questions.length - 1, onClick: () => setIdx(i => i + 1) }, 'NEXT →')
            )
        )
    );
}

// --- STORY MODE COMPONENT ---
function StoryMode({ scenarios, onReportResult, setScore }) {
    const [activeScenario, setActiveScenario] = useState(null);
    const [beatIdx, setBeatIdx] = useState(0);

    if (activeScenario) {
        const scenario = scenarios.find(s => s.id === activeScenario);
        const beat = scenario.beats[beatIdx];
        const isLastBeat = beatIdx === scenario.beats.length - 1;
        const npc = MODULE7_NPC_DATA.find(n => n.id === scenario.instructor);
        const location = MODULE7_WORLD_LOCATIONS.find(l => l.id === scenario.location);

        return e('div', { className: 'story-active-view fade-in' },
            e('div', { className: 'story-viewport', style: { backgroundImage: `url(${location.interior})`, backgroundSize: 'cover' } },
                npc && e('img', { 
                    src: npc.image, 
                    className: 'jrpg-breathing',
                    style: { position: 'absolute', bottom: 0, left: '10%', height: '80%', objectFit: 'contain' } 
                }),
                e('img', { 
                    src: 'assets/alfie-south-indian-sprite.webp', 
                    className: 'jrpg-breathing',
                    style: { position: 'absolute', bottom: 0, right: '10%', height: '70%', objectFit: 'contain', transform: 'scaleX(-1)' } 
                })
            ),
            e('div', { className: 'story-dialogue-box' },
                e('div', { className: 'story-speaker' }, beat.speaker === 'alfie' ? 'ALFIE' : npc.name),
                e('div', { className: 'story-text' }, beat.text),
                e('div', { className: 'story-controls' },
                    isLastBeat 
                        ? e('button', { className: 'btn-cyber', onClick: () => { setActiveScenario(null); setBeatIdx(0); setScore(s => s + 25); onReportResult({ id: activeScenario, correct: true }); } }, 'FINISH MISSION')
                        : e('button', { className: 'btn-cyber', onClick: () => setBeatIdx(i => i + 1) }, 'NEXT [SPACE]')
                )
            )
        );
    }

    return e('div', { className: 'story-mode-container fade-in' },
        e('h2', { className: 'matrix-text' }, 'CLINICAL MISSIONS'),
        scenarios.map(s => e('div', { key: s.id, className: 'story-card', onClick: () => setActiveScenario(s.id) },
            e('div', { className: 'story-title' }, s.title),
            e('div', { className: 'story-meta' }, `INSTRUCTOR: ${MODULE7_NPC_DATA.find(n => n.id === s.instructor)?.name}`)
        ))
    );
}

// --- MAIN ENGINE ROOT ---
export default function Module7Engine({ operatorName, onBack, activeMode, onModeChange, onGeneratePDF, onReportResult }) {
  const [score, setScore] = useState(0);
  const [currentTab, setCurrentTab] = useState('story'); // 'story' or 'analysis'

  const renderGame = () => {
    switch(activeMode) {
      case 'nephron_defense': 
        return e(StandardQuizRunner, { 
            questions: [
                {
                    q: "What is the primary physiologic response to hypoperfusion in prerenal AKI?",
                    opts: ["Activation of the RAAS system", "Dilation of the efferent arteriole", "Increased GFR", "Loss of sodium reabsorption"],
                    ans: 0,
                    rationales: ["Correct. RAAS activation conserves salt and water to restore systemic volume.", "Incorrect. Angiotensin II constricts the efferent arteriole to maintain GFR.", "Incorrect. GFR drops during hypoperfusion.", "Incorrect. Sodium reabsorption increases to conserve volume."]
                }
            ],
            title: 'NEPHRON DEFENSE',
            onBack: () => onModeChange(null),
            onReportResult,
            setScore
        });
      case 'renal_cascade':
        return e(StandardQuizRunner, { 
            questions: [
                {
                    q: "Which finding is characteristic of the 'uremic syndrome' in ESRD?",
                    opts: ["Encephalopathy and pruritus", "Hypokalemia", "Metabolic alkalosis", "Increased erythropoietin production"],
                    ans: 0,
                    rationales: ["Correct. Buildup of nitrogenous wastes leads to mental status changes (encephalopathy) and itchy skin (pruritus).", "Incorrect. Renal failure causes hyperkalemia due to poor excretion.", "Incorrect. Renal failure causes metabolic acidosis due to inability to excrete H+ and reabsorb Bicarb.", "Incorrect. EPO production drops, leading to anemia."]
                }
            ],
            title: 'RENAL CASCADE LAB',
            onBack: () => onModeChange(null),
            onReportResult,
            setScore
        });
      case 'stone_runner':
        return e(StandardQuizRunner, { questions: MOD7_STONE_DATA, title: 'STONE RUNNER LAB', onBack: () => onModeChange(null), onReportResult, setScore });
      case 'ascending_infection':
        return e(StandardQuizRunner, { questions: MOD7_INFECTION_DATA, title: 'INFECTION TRACKER', onBack: () => onModeChange(null), onReportResult, setScore });
      case 'urologic_crisis':
        return e(StandardQuizRunner, { 
            questions: [
                {
                    q: "Which intervention is most appropriate for acute postrenal obstruction due to BPH?",
                    opts: ["Emergency urinary catheterization", "Aggressive IV fluid bolus", "Loop diuretics (Furosemide)", "Strict bed rest"],
                    ans: 0,
                    rationales: ["Correct. Relieving the physical obstruction restores urine flow and GFR.", "Incorrect. Adding more fluid to a blocked system increases pressure and pain.", "Incorrect. Diuretics will increase urine production and worsen the pressure behind the obstruction.", "Incorrect. Bed rest does not resolve the mechanical blockage."]
                }
            ],
            title: 'UROLOGIC EMERGENCY',
            onBack: () => onModeChange(null),
            onReportResult,
            setScore
        });
      case 'renal_arena':
        return e(StandardQuizRunner, { 
            questions: MOD7_DATABASE.map(d => d.scenarios[0]).map(s => ({
                q: s.symptoms,
                opts: s.interventions.map(i => i.label),
                ans: s.interventions.findIndex(i => i.correct),
                rationales: s.interventions.map(i => i.feedback)
            })),
            title: 'RENAL ARENA',
            onBack: () => onModeChange(null),
            onReportResult,
            setScore
        });
      default: return e('div', { className: 'mod3-placeholder' }, e('h2', null, 'RENAL MODE COMING SOON'));
    }
  };

  if (!activeMode) {
    return e('div', { className: 'mod3-hub-screen fade-in' },
      e('div', { className: 'hub-header-v2' },
        e('div', { className: 'matrix-text hub-title-glow' }, 'MODULE 7: RENAL & GU'),
        e('button', { className: 'btn-return-home', onClick: onBack }, '← CAMPUS HUB')
      ),
      e('div', { className: 'mod-tabs' },
        e('button', { className: `tab-btn ${currentTab === 'story' ? 'active' : ''}`, onClick: () => setCurrentTab('story') }, 'STORY MODE'),
        e('button', { className: `tab-btn ${currentTab === 'analysis' ? 'active' : ''}`, onClick: () => setCurrentTab('analysis') }, 'CONCEPT ANALYSIS')
      ),
      currentTab === 'story' ? e(StoryMode, { scenarios: MOD7_STORY_SCENARIOS, onReportResult, setScore }) :
      e('div', { className: 'mode-grid' },
        MOD7_GAME_MODES.map(mode => e('div', { key: mode.id, className: 'mode-card-v2', onClick: () => onModeChange(mode.id) },
          e('div', { className: 'mode-icon' }, mode.icon),
          e('div', { className: 'mode-name matrix-text' }, mode.name),
          e('div', { className: 'mode-desc' }, mode.description)
        ))
      )
    );
  }

  return e('div', { className: 'mod3-engine-root' },
    e('div', { className: 'mod3-hud' },
        e('div', { className: 'hud-left' }, e('span', null, 'RENAL UNIT')),
        e('div', { className: 'hud-right' }, 
            e('span', { className: 'hud-score-val' }, `SCORE: ${score}`),
            e('button', { className: 'hud-back-btn', onClick: () => onModeChange(null) }, 'EXIT MODE')
        )
    ),
    e('div', { className: 'mod3-viewport' }, renderGame())
  );
}
