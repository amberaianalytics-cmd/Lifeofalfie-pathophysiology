import React, { useState, useMemo, useEffect } from 'react';
import { 
    MOD5_DATABASE, 
    MOD5_GAME_MODES, 
    MOD5_STORY_SCENARIOS, 
    MODULE5_NPC_DATA, 
    MODULE5_WORLD_LOCATIONS,
    MOD5_HEP_DATA,
    MOD5_BLEED_DATA
} from './module5-content.js';
import Module5ClassNotes from './Module5ClassNotes.js';

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
                            else if (i === answerState.selected && answerState.selected !== q.ans) cls += ' wrong';
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
        const npc = MODULE5_NPC_DATA.find(n => n.id === scenario.instructor);
        const location = MODULE5_WORLD_LOCATIONS.find(l => l.id === scenario.location);

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
            e('div', { className: 'story-meta' }, `INSTRUCTOR: ${MODULE5_NPC_DATA.find(n => n.id === s.instructor)?.name}`)
        ))
    );
}

// --- MAIN ENGINE ROOT ---
export default function Module5Engine({ operatorName, onBack, activeMode, onModeChange, onGeneratePDF, onReportResult }) {
  const [score, setScore] = useState(0);
  const [currentTab, setCurrentTab] = useState('story'); // 'story' or 'analysis'

  const renderGame = () => {
    switch(activeMode) {
      case 'gi_ed': 
        return e(StandardQuizRunner, { 
            questions: MOD5_DATABASE.map(d => d.scenarios[0]).map(s => ({
                q: s.symptoms,
                opts: s.interventions.map(i => i.label),
                ans: s.interventions.findIndex(i => i.correct),
                rationales: s.interventions.map(i => i.feedback)
            })),
            title: 'GI EMERGENCY DEPT',
            onBack: () => onModeChange(null),
            onReportResult,
            setScore
        });
      case 'portal_sim':
        return e(StandardQuizRunner, { 
            questions: [
                {
                    q: "In Cirrhosis, portal hypertension results from:",
                    opts: ["Intrahepatic resistance due to fibrosis", "Increased heart rate", "Peripheral vasodilation", "Renal sodium retention"],
                    ans: 0,
                    rationales: ["Correct. Fibrosis physically obstructs blood flow through the liver architecture.", "Incorrect. While hemodynamics change, HR is not the cause of portal pressure.", "Incorrect. Vasodilation actually leads to the drop in systemic BP seen in liver failure.", "Incorrect. Sodium retention is a consequence of RAAS activation due to low systemic volume, not the cause of portal pressure."]
                }
            ],
            title: 'PORTAL HYPERTENSION LAB',
            onBack: () => onModeChange(null),
            onReportResult,
            setScore
        });
      case 'acid_wars':
        return e(StandardQuizRunner, { 
            questions: [
                {
                    q: "The change of esophageal cells from squamous to columnar in GERD is called:",
                    opts: ["Metaplasia", "Dysplasia", "Hyperplasia", "Atrophy"],
                    ans: 0,
                    rationales: ["Correct. This is Barrett's Esophagus, a metaplastic change to withstand acid exposure.", "Incorrect. Dysplasia is disorganized growth, a precursor to cancer.", "Incorrect. Hyperplasia is an increase in cell number.", "Incorrect. Atrophy is cell shrinkage."]
                }
            ],
            title: 'ACID WARS LAB',
            onBack: () => onModeChange(null),
            onReportResult,
            setScore
        });
      case 'hep_tracker':
        return e(StandardQuizRunner, { questions: MOD5_HEP_DATA, title: 'HEPATITIS LAB', onBack: () => onModeChange(null), onReportResult, setScore });
      case 'pancreas_collapse':
        return e(StandardQuizRunner, { 
            questions: [
                {
                    q: "What is the hallmark mechanism of acute pancreatitis?",
                    opts: ["Intra-pancreatic activation of digestive enzymes", "Bacterial infection of the bile duct", "Vitamin deficiency", "Excessive insulin production"],
                    ans: 0,
                    rationales: ["Correct. Autodigestion by trypsin and other enzymes is the primary mechanism.", "Incorrect. This describes cholangitis.", "Incorrect. Pancreatitis is not a nutritional deficiency disease.", "Incorrect. Pancreatitis often leads to insulin deficiency (hyperglycemia), not excess."]
                }
            ],
            title: 'PANCREATIC LAB',
            onBack: () => onModeChange(null),
            onReportResult,
            setScore
        });
      case 'gi_bleed':
        return e(StandardQuizRunner, { questions: MOD5_BLEED_DATA, title: 'GI BLEED LAB', onBack: () => onModeChange(null), onReportResult, setScore });
      default: return e('div', { className: 'mod3-placeholder' }, e('h2', null, 'GI MODE COMING SOON'));
    }
  };

  if (!activeMode) {
    return e('div', { className: 'mod3-hub-screen fade-in' },
      e('div', { className: 'hub-header-v2' },
        e('div', { className: 'matrix-text hub-title-glow' }, 'MODULE 5: GI & HEPATIC'),
        e('button', { className: 'btn-return-home', onClick: onBack }, '← CAMPUS HUB')
      ),
      e('div', { className: 'mod-tabs' },
        e('button', { className: `tab-btn ${currentTab === 'story' ? 'active' : ''}`, onClick: () => setCurrentTab('story') }, 'STORY MODE'),
        e('button', { className: `tab-btn ${currentTab === 'analysis' ? 'active' : ''}`, onClick: () => setCurrentTab('analysis') }, 'CONCEPT ANALYSIS'),
        e('button', { className: `tab-btn ${currentTab === 'notes' ? 'active' : ''}`, onClick: () => setCurrentTab('notes') }, 'ALFIE’S CLASS NOTES')
      ),
      currentTab === 'story' && e(StoryMode, { scenarios: MOD5_STORY_SCENARIOS, onReportResult, setScore }),
      currentTab === 'analysis' && e('div', { className: 'mode-grid' },
        MOD5_GAME_MODES.map(mode => e('div', { key: mode.id, className: 'mode-card-v2', onClick: () => onModeChange(mode.id) },
          e('div', { className: 'mode-icon' }, mode.icon),
          e('div', { className: 'mode-name matrix-text' }, mode.name),
          e('div', { className: 'mode-desc' }, mode.description)
        ))
      ),
      currentTab === 'notes' && e(Module5ClassNotes)
    );
  }

  return e('div', { className: 'mod3-engine-root' },
    e('div', { className: 'mod3-hud' },
        e('div', { className: 'hud-left' }, e('span', null, 'GI UNIT')),
        e('div', { className: 'hud-right' }, 
            e('span', { className: 'hud-score-val' }, `SCORE: ${score}`),
            e('button', { className: 'hud-back-btn', onClick: () => onModeChange(null) }, 'EXIT MODE')
        )
    ),
    e('div', { className: 'mod3-viewport' }, renderGame())
  );
}
