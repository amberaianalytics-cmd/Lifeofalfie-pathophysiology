import React, { useState, useMemo, useEffect } from 'react';
import { MOD3_DATABASE, MOD3_GAME_MODES } from './module3-content.js';

const e = React.createElement;

// --- SHARED UI COMPONENTS (MOVED TO TOP LEVEL FOR STABILITY) ---

function FeedbackOverlay({ feedback, setFeedback, onNext }) {
  if (!feedback) return null;
  const isCorrect = feedback.type === 'success';
  return e('div', { className: `mod3-feedback-overlay ${feedback.type} fade-in` },
    e('div', { className: 'feedback-card' },
      e('div', { className: 'feedback-header-box' },
          e('h1', { className: isCorrect ? 'text-green' : 'text-red' }, isCorrect ? '✓ CORRECT' : '✗ INCORRECT'),
          e('h2', { className: 'matrix-text' }, feedback.msg)
      ),
      e('div', { className: 'feedback-rationale-box' },
          e('div', { className: 'rationale-label' }, 'PHYSIOLOGIC RATIONALE:'),
          e('div', { className: 'feedback-rationale' }, feedback.rationale)
      ),
      feedback.complication && e('div', { className: 'feedback-complication-box' },
          e('div', { className: 'rationale-label' }, 'POTENTIAL COMPLICATION:'),
          e('div', { className: 'feedback-complication' }, feedback.complication)
      ),
      e('button', { className: 'btn-cyber feedback-btn', autoFocus: true, onClick: () => { setFeedback(null); onNext && onNext(); } }, 'CONTINUE [ENTER]')
    )
  );
}

function MechanismChain({ chain, currentStep = 7, showAll = false }) {
  return e('div', { className: 'mod3-chain-container' },
    chain.slice(0, showAll ? 7 : currentStep).map((item, idx) => e('div', { 
      key: idx, 
      className: `mod3-chain-node ${item.type} ${!showAll && idx === currentStep-1 ? 'active' : ''}`
    },
      e('div', { className: 'node-label' }, item.type.toUpperCase()),
      e('div', { className: 'node-content' }, item.label),
      idx < 6 && (showAll || idx < 6) && e('div', { className: 'node-arrow' }, '→')
    ))
  );
}

// --- MODE: MECHANISM LAB (Explorer) ---
function MechanismLab({ setScore, onReportResult, feedback, setFeedback }) {
  const [selectedId, setSelectedId] = useState(MOD3_DATABASE[0].id);
  const [step, setStep] = useState(1);
  const [showFull, setShowFull] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceSelection, setPracticeSelection] = useState(null);
  const [practiceHistory, setPracticeHistory] = useState({}); // { diseaseId-step: { choice, correct } }

  const disease = MOD3_DATABASE.find(d => d.id === selectedId) || MOD3_DATABASE[0];

  const pool = useMemo(() => {
      const correct = disease.chain[step-1].label;
      const others = MOD3_DATABASE.filter(d => d.id !== selectedId)
          .map(d => d.chain[step-1]?.label)
          .filter(l => l && l !== correct);
      const distractors = others.sort(() => Math.random() - 0.5).slice(0, 2);
      return [correct, ...distractors].sort();
  }, [selectedId, step]);

  const handlePracticeClick = (opt) => {
      const key = `lab-${selectedId}-${step}`;
      if (!practiceHistory[key]) {
          const isCorrect = opt === disease.chain[step-1].label;
          setPracticeHistory(prev => ({ ...prev, [key]: { choice: opt, correct: isCorrect } }));
          if (isCorrect) setScore(s => s + 10);
          onReportResult({ id: key, correct: isCorrect });
      }
      setPracticeSelection(opt);
  };

  const getSpecificRationale = (opt) => {
      if (opt === disease.chain[step-1].label) return disease.chain[step-1].detail;
      const originDisease = MOD3_DATABASE.find(d => d.chain.some(n => n.label === opt));
      if (originDisease) {
          return `INCORRECT: "${opt}" is the characteristic ${disease.chain[step-1].type} for ${originDisease.name}. In ${disease.name}, the pathophysiology involves a different clinical trajectory.`;
      }
      return "This physiological process does not align with the current clinical manifestation or disease pathway.";
  };

  const currentResult = practiceHistory[`${selectedId}-${step}`];

  return e('div', { className: 'mod3-lab-screen fade-in' },
    e('div', { className: 'lab-sidebar' },
      e('div', { className: 'sidebar-header matrix-text' }, 'MECHANISM CATALOG'),
      e('div', { className: 'sidebar-scroll' },
          MOD3_DATABASE.map(d => e('div', {
            key: d.id,
            className: `sidebar-item ${selectedId === d.id ? 'active' : ''}`,
            onClick: () => { setSelectedId(d.id); setStep(1); setShowFull(false); setPracticeMode(false); setPracticeSelection(null); }
          }, d.name))
      )
    ),
    e('div', { className: 'lab-main' },
      e('div', { className: 'lab-display' },
          e('div', { className: 'nav-controls-top' },
              e('button', { className: 'btn-cyber-small', onClick: () => {
                  const idx = MOD3_DATABASE.findIndex(d => d.id === selectedId);
                  if (idx > 0) { setSelectedId(MOD3_DATABASE[idx-1].id); setStep(1); setPracticeSelection(null); }
              }}, '← PREV DISEASE'),
              e('span', { className: 'matrix-text' }, `DISEASE ${MOD3_DATABASE.findIndex(d => d.id === selectedId) + 1} / ${MOD3_DATABASE.length}`),
              e('button', { className: 'btn-cyber-small', onClick: () => {
                  const idx = MOD3_DATABASE.findIndex(d => d.id === selectedId);
                  if (idx < MOD3_DATABASE.length - 1) { setSelectedId(MOD3_DATABASE[idx+1].id); setStep(1); setPracticeSelection(null); }
              }}, 'NEXT DISEASE →')
          ),
          e('div', { className: 'category-badge' }, disease.category.toUpperCase()),
          e('h2', { className: 'matrix-text lab-title' }, disease.name),
          
          e('div', { className: 'mod3-chain-container' },
              disease.chain.map((item, idx) => {
                  const stepKey = `${selectedId}-${idx + 1}`;
                  const hist = practiceHistory[stepKey];
                  const isRevealed = (idx < step - 1) || (!practiceMode) || (hist?.correct);
                  const isCurrent = practiceMode && idx === step - 1;
                  return e('div', { 
                      key: idx, 
                      className: `mod3-chain-node ${item.type} ${isCurrent ? 'practice-active' : ''} ${!isRevealed ? 'hidden-node' : ''} ${hist ? (hist.correct ? 'node-correct' : 'node-wrong') : ''}` 
                  },
                      e('div', { className: 'node-label' }, item.type.toUpperCase()),
                      e('div', { className: 'node-content' }, isRevealed ? item.label : '???'),
                      idx < 6 && e('div', { className: 'node-arrow' }, '→')
                  );
              })
          ),

          practiceMode ? e('div', { className: 'practice-zone fade-in' },
              e('div', { className: 'practice-prompt matrix-text' }, 
                  currentResult ? (currentResult.correct ? '✓ CORRECT: LOGIC VERIFIED' : '✗ INCORRECT: FILTRATION ERROR') : `IDENTIFY THE ${disease.chain[step-1].type.toUpperCase()}:`
              ),
              e('div', { className: 'practice-options' },
                  pool.map((opt, i) => {
                      let cls = 'btn-cyber';
                      if (currentResult) {
                          if (opt === disease.chain[step-1].label) cls += ' correct';
                          else if (opt === currentResult.choice) cls += ' wrong';
                          if (opt === currentResult.choice) cls += ' locked-selection';
                          if (opt === practiceSelection) cls += ' reviewing';
                      } else if (opt === practiceSelection) {
                          cls += ' active reviewing';
                      }
                      return e('button', {
                          key: i,
                          className: cls,
                          onClick: () => handlePracticeClick(opt)
                      }, opt);
                  })
              ),
              practiceSelection && e('div', { className: `practice-step-rationale fade-in ${practiceSelection === disease.chain[step-1].label ? 'rationale-correct' : 'rationale-wrong'}` },
                  e('div', { className: 'rationale-header' }, 
                      e('strong', null, practiceSelection === disease.chain[step-1].label ? '✓ CORRECT: ' : '✗ INCORRECT: '),
                      practiceSelection
                  ),
                  e('p', null, getSpecificRationale(practiceSelection))
              )
          ) : (!showFull && e('div', { className: 'step-explanation fade-in', key: selectedId + '-' + step },
              e('div', { className: 'explanation-title matrix-text' }, disease.chain[step-1].label),
              e('p', { className: 'explanation-text' }, disease.chain[step-1].detail)
          ))
      ),
      e('div', { className: 'lab-controls' },
        e('button', { className: `btn-cyber-small ${practiceMode ? 'active-practice' : ''}`, onClick: () => { setPracticeMode(!practiceMode); setStep(1); setPracticeSelection(null); } }, practiceMode ? 'EXIT PRACTICE' : 'PRACTICE THIS CHAIN'),
        !practiceMode && e('button', { className: 'btn-cyber-small', onClick: () => setShowFull(!showFull) }, showFull ? 'STEP-BY-STEP VIEW' : 'VIEW FULL CHAIN'),
        !showFull && e('div', { className: 'nav-group' },
            e('button', { disabled: step === 1, onClick: () => { setStep(s => s - 1); setPracticeSelection(practiceHistory[`${selectedId}-${step-1}`]?.choice || null); } }, '← PREV'),
            e('div', { className: 'step-count' }, `PHASE ${step} / 7`),
            e('button', { disabled: step === 7, onClick: () => { setStep(s => s + 1); setPracticeSelection(practiceHistory[`${selectedId}-${step+1}`]?.choice || null); } }, 'NEXT →')
        )
      )
    ),
    e(FeedbackOverlay, { feedback, setFeedback })
  );
}

// --- MODE: PATHWAY BUILDER ---
function PathwayBuilder({ setScore, onReportResult, feedback, setFeedback }) {
  const [diseaseIdx, setDiseaseIdx] = useState(0);
  const [isViewingReference, setIsViewingReference] = useState(true);
  const [slots, setSlots] = useState(new Array(7).fill(null));
  const [scrambled, setScrambled] = useState([]);

  const disease = MOD3_DATABASE[diseaseIdx];

  useEffect(() => {
      setSlots(new Array(7).fill(null));
      setScrambled([...disease.chain].sort(() => Math.random() - 0.5));
  }, [diseaseIdx]);

  const handleSelectPool = (item) => {
      const firstEmpty = slots.indexOf(null);
      if (firstEmpty === -1) return;
      const newSlots = [...slots];
      newSlots[firstEmpty] = item;
      setSlots(newSlots);
  };

  const validate = () => {
      const firstErrorIdx = slots.findIndex((s, i) => !s || s.label !== disease.chain[i].label);
      const isCorrect = firstErrorIdx === -1;
      const key = `builder-${disease.id}`;
      
      onReportResult({ id: key, correct: isCorrect });

      if (isCorrect) {
          setScore(s => s + 100);
          setFeedback({ type: 'success', msg: `STABILIZED: ${disease.name}`, rationale: `Perfect sequence. The process flows from ${disease.chain[0].label} through ${disease.chain[3].label} to ${disease.chain[6].label}.`, complication: disease.chain[6].detail });
      } else {
          const errorStep = disease.chain[firstErrorIdx];
          setFeedback({ type: 'error', msg: `SEQUENCE ERROR at Step ${firstErrorIdx + 1}`, rationale: `Expected "${errorStep.label}". ${errorStep.detail}` });
      }
  };

  return e('div', { className: 'mod3-builder-screen fade-in' },
    e('div', { className: 'builder-header' }, 
      e('div', { className: 'nav-controls-top' },
          e('button', { className: 'btn-cyber-small', disabled: diseaseIdx === 0, onClick: () => setDiseaseIdx(i => i - 1) }, '← PREV DISEASE'),
          e('span', { className: 'matrix-text' }, `DISEASE ${diseaseIdx + 1} / ${MOD3_DATABASE.length}`),
          e('button', { className: 'btn-cyber-small', disabled: diseaseIdx === MOD3_DATABASE.length - 1, onClick: () => setDiseaseIdx(i => i + 1) }, 'NEXT DISEASE →')
      ),
      e('h2', { className: 'matrix-text builder-title' }, disease.name),
      e('div', { className: 'mode-toggle-zone' },
          e('button', { className: `btn-cyber-small ${isViewingReference ? 'active' : ''}`, onClick: () => setIsViewingReference(true) }, '1. STUDY REFERENCE'),
          e('button', { className: `btn-cyber-small ${!isViewingReference ? 'active' : ''}`, onClick: () => setIsViewingReference(false) }, '2. BUILD IT YOURSELF')
      )
    ),
    isViewingReference ? e('div', { className: 'reference-view fade-in' },
      e(MechanismChain, { chain: disease.chain, currentStep: 7, showAll: true }),
      e('div', { className: 'reference-tip' }, 'Study the physiologic sequence above, then switch to "BUILD IT YOURSELF" to test your knowledge.')
    ) : e('div', { className: 'builder-layout fade-in' },
      e('div', { className: 'slots-column' },
          slots.map((s, i) => e('div', { key: i, className: `path-slot ${s ? 'filled' : 'empty'}` }, 
              e('span', { className: 'slot-num' }, i + 1),
              e('span', { className: 'slot-type' }, disease.chain[i].type.toUpperCase()),
              e('span', { className: 'slot-label' }, s ? s.label : 'SELECT STEP')
          ))
      ),
      e('div', { className: 'pool-column' },
          e('div', { className: 'pool-header matrix-text' }, 'AVAILABLE STEPS'),
          e('div', { className: 'pool-grid' },
              scrambled.map((item, i) => {
                  const used = slots.some(s => s?.label === item.label);
                  return e('button', { key: i, className: `pool-btn ${used ? 'used' : ''}`, onClick: () => !used && handleSelectPool(item) }, item.label);
              })
          )
      )
    ),
    !isViewingReference && e('div', { className: 'builder-controls' },
      e('button', { className: 'btn-cyber', onClick: () => setSlots(new Array(7).fill(null)) }, 'CLEAR'),
      e('button', { className: 'btn-cyber submit-btn', onClick: validate }, 'VERIFY LOGIC')
    ),
    e(FeedbackOverlay, { feedback, setFeedback, onNext: () => { if (diseaseIdx < MOD3_DATABASE.length - 1) setDiseaseIdx(i => i + 1); setIsViewingReference(true); } })
  );
}

// --- UNIVERSAL SIM ENGINE ---
function ClinicalSim({ type, setScore, onReportResult, setWeakConcepts }) {
  const [scenario, setScenario] = useState(null);
  const [simHistory, setSimHistory] = useState({}); // { scenarioId: choiceLabel }
  const [selectedChoice, setSelectedChoice] = useState(null);

  const pool = useMemo(() => {
      if (type === 'coronary') return MOD3_DATABASE.filter(d => d.category === 'cardiovascular');
      if (type === 'pulm') return MOD3_DATABASE.filter(d => d.category === 'respiratory');
      if (type === 'shock') return MOD3_DATABASE.filter(d => d.category === 'shock');
      if (type === 'hemo') return MOD3_DATABASE.filter(d => d.category === 'coagulation' || d.category === 'hematology');
      return MOD3_DATABASE; // ED
  }, [type]);

  const refresh = () => {
      let d = pool[Math.floor(Math.random() * pool.length)];
      while (!d.scenarios || d.scenarios.length === 0) d = pool[Math.floor(Math.random() * pool.length)];
      const s = d.scenarios[Math.floor(Math.random() * d.scenarios.length)];
      setScenario({ ...s, id: s.symptoms, disease: d.name, category: d.category, complication: d.chain[6].label });
      setSelectedChoice(null);
  };

  useEffect(() => refresh(), [type]);

  const handleAnswer = (choice) => {
      if (!simHistory[scenario.id]) {
          setSimHistory(prev => ({ ...prev, [scenario.id]: choice.label }));
          const isCorrect = choice.correct;
          onReportResult({ id: `sim-${scenario.id}`, correct: isCorrect });
          
          if (isCorrect) setScore(s => s + 50);
          else setWeakConcepts(prev => [...prev, scenario.disease]);
      }
      setSelectedChoice(choice);
  };

  if (!scenario) return null;
  const lockedLabel = simHistory[scenario.id];

  return e('div', { className: 'mod3-sim-screen fade-in' },
    e('div', { className: 'sim-header' },
      e('div', { className: 'sim-type-badge matrix-text' }, `${type.toUpperCase()} SIMULATOR`),
      e('div', { className: 'sim-disease-label' }, `PRESENTATION: ${scenario.disease.toUpperCase()}`)
    ),
    e('div', { className: 'sim-hud-v2' },
      e('div', { className: 'vitals-monitor' },
          e('div', { className: 'monitor-header' }, 'REAL-TIME VITALS'),
          e('div', { className: 'vitals-grid' },
              e('div', { className: 'vital-box' }, e('label', null, 'BP'), e('span', { className: 'val' }, scenario.vitals.bp)),
              e('div', { className: 'vital-box' }, e('label', null, 'HR'), e('span', { className: 'val yellow' }, scenario.vitals.hr)),
              e('div', { className: 'vital-box' }, e('label', null, 'SpO2'), e('span', { className: 'val cyan' }, `${scenario.vitals.spo2}%`)),
              e('div', { className: 'vital-box' }, e('label', null, 'TEMP'), e('span', { className: 'val' }, `${scenario.vitals.temp}F`))
          )
      ),
      e('div', { className: 'clinical-evidence' },
          e('div', { className: 'monitor-header' }, 'DIAGNOSTIC CLUES'),
          e('div', { className: 'clues-list' }, scenario.clues?.map((c, i) => e('div', { key: i, className: `clue-item` }, `> ${c}`)))
      )
    ),
    e('div', { className: 'sim-main-v2' },
      e('div', { className: 'scenario-box' }, e('p', { className: 'symptoms-text' }, scenario.symptoms)),
      e('div', { className: 'intervention-grid' },
          e('div', { className: 'choices-wrap' },
              scenario.interventions.map((choice, i) => {
                  let cls = 'btn-cyber choice-btn';
                  if (lockedLabel) {
                      if (choice.correct) cls += ' correct';
                      else if (choice.label === lockedLabel) cls += ' wrong';
                      if (choice.label === lockedLabel) cls += ' locked-selection';
                      if (selectedChoice?.label === choice.label) cls += ' reviewing';
                  } else if (selectedChoice?.label === choice.label) cls += ' reviewing';
                  return e('button', { key: i, className: cls, onClick: () => handleAnswer(choice) }, choice.label);
              })
          ),
          selectedChoice && e('div', { className: `practice-step-rationale fade-in ${selectedChoice.correct ? 'rationale-correct' : 'rationale-wrong'}` },
              e('div', { className: 'rationale-header' }, e('strong', null, selectedChoice.correct ? '✓ CORRECT: ' : '✗ INCORRECT: '), selectedChoice.label),
              e('p', null, selectedChoice.feedback)
          ),
          lockedLabel && e('button', { className: 'btn-cyber next-btn', onClick: refresh }, 'NEXT SCENARIO →')
      )
    )
  );
}

// --- MODE: THROMBUS TRAJECTORY MAP ---
function VascularThreatMap({ setScore, onReportResult, setFeedback, feedback }) {
    const scenarios = [
        { 
            origin: 'Deep Veins of Leg (DVT)', 
            path: 'Leg -> IVC -> Right Atrium -> Right Ventricle -> Lungs',
            targets: [
                { label: 'Brain (Stroke)', correct: false, rationale: '✗ INCORRECT: Venous clots cannot cross to the arterial side unless there is a septal defect (PFO).' },
                { label: 'Lungs (Pulm Embolism)', correct: true, rationale: '✓ CORRECT: This is the hallmark destination for a DVT embolus.' },
                { label: 'Kidneys (Infarct)', correct: false, rationale: '✗ INCORRECT: Clot would be filtered by the pulmonary capillary bed first.' }
            ]
        },
        {
            origin: 'Left Atrium (Afib)',
            path: 'LA -> Left Ventricle -> Aorta -> Systemic Circulation',
            targets: [
                { label: 'Lungs (PE)', correct: false, rationale: '✗ INCORRECT: Clots from the left heart enter the arterial system, not the venous/pulmonary system.' },
                { label: 'Brain (Ischemic Stroke)', correct: true, rationale: '✓ CORRECT: The carotids are a high-flow destination for left-heart emboli.' },
                { label: 'Legs (DVT)', correct: false, rationale: '✗ INCORRECT: DVT is a primary venous clot, not an embolic destination from the heart.' }
            ]
        },
        {
            origin: 'Left Ventricle (Post-MI)',
            path: 'LV Wall -> Aorta -> Systemic Arteries',
            targets: [
                { label: 'Kidneys (Renal Infarct)', correct: true, rationale: '✓ CORRECT: Left-heart mural thrombi can shower any systemic organ, including kidneys.' },
                { label: 'Right Atrium', correct: false, rationale: '✗ INCORRECT: Blood flows from the LV to the Aorta, never backward to the Right Atrium.' },
                { label: 'Lungs (PE)', correct: false, rationale: '✗ INCORRECT: To reach the lungs, a clot must be in the venous system or right heart.' }
            ]
        }
    ];

    const [idx, setIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [vmapHistory, setVmapHistory] = useState({});
    const scenario = scenarios[idx];

    const handleSelect = (target) => {
        if (vmapHistory[idx]) return;
        setVmapHistory(prev => ({ ...prev, [idx]: target }));
        setSelected(target);
        
        onReportResult({ id: `vmap-${idx}`, correct: target.correct });

        if (target.correct) {
            setScore(s => s + 50);
            setFeedback({ type: 'success', msg: 'TRAJECTORY VERIFIED', rationale: target.rationale });
        } else {
            setFeedback({ type: 'error', msg: 'PHYSIOLOGIC MISMATCH', rationale: target.rationale });
        }
    };

    return e('div', { className: 'vascular-map-screen fade-in' },
        e('div', { className: 'vmap-grid' },
            e('div', { className: 'vmap-anatomy' },
                e('svg', { viewBox: '0 0 400 600', className: 'anatomy-svg' },
                    // Stylized Body Outline
                    e('path', { d: 'M 200 50 Q 150 50 150 100 L 150 450 L 100 580 M 200 50 Q 250 50 250 100 L 250 450 L 300 580', stroke: '#333', fill: 'none', strokeWidth: 2 }),
                    // Organs
                    e('circle', { cx: 200, cy: 80, r: 30, className: 'vmap-target-node', onClick: () => {} }), // Brain
                    e('text', { x: 200, y: 85, textAnchor: 'middle', fill: '#888', fontSize: 10 }, 'BRAIN'),
                    
                    e('ellipse', { cx: 160, cy: 200, rx: 40, ry: 60, className: 'vmap-target-node' }), // Lungs
                    e('ellipse', { cx: 240, cy: 200, rx: 40, ry: 60, className: 'vmap-target-node' }),
                    e('text', { x: 200, y: 205, textAnchor: 'middle', fill: '#888', fontSize: 10 }, 'LUNGS'),

                    e('rect', { x: 180, y: 220, width: 40, height: 50, className: 'vmap-target-node' }), // Heart
                    e('text', { x: 200, y: 250, textAnchor: 'middle', fill: '#888', fontSize: 10 }, 'HEART'),

                    e('rect', { x: 170, y: 550, width: 60, height: 20, className: 'vmap-target-node' }), // Legs
                    e('text', { x: 200, y: 565, textAnchor: 'middle', fill: '#888', fontSize: 10 }, 'LEGS'),

                    // Origin Marker
                    scenario.origin.includes('Leg') && e('circle', { cx: 200, cy: 560, r: 8, fill: '#ff3e3e', className: 'pulse' }),
                    scenario.origin.includes('Atrium') && e('circle', { cx: 195, cy: 235, r: 6, fill: '#ff3e3e', className: 'pulse' }),
                    scenario.origin.includes('Ventricle') && e('circle', { cx: 205, cy: 255, r: 6, fill: '#ff3e3e', className: 'pulse' })
                )
            ),
            e('div', { className: 'vmap-controls' },
                e('div', { className: 'vmap-scenario-box' },
                    e('div', { className: 'vmap-label' }, 'THROMBUS ORIGIN:'),
                    e('h2', { className: 'matrix-text' }, scenario.origin),
                    e('p', { style: { color: '#ccc', fontSize: '0.9rem', marginTop: '10px' } }, `The clot has detached and entered the flow: ${scenario.path}`)
                ),
                e('div', { className: 'vmap-label', style: { marginTop: '20px' } }, 'PREDICT LETHAL DESTINATION:'),
                e('div', { className: 'vmap-options' },
                    scenario.targets.map((t, i) => e('button', { 
                        key: i, 
                        className: `btn-cyber ${selected === t ? 'active' : ''}`, 
                        style: { width: '100%', marginBottom: '10px', textAlign: 'left' },
                        onClick: () => handleSelect(t)
                    }, t.label))
                )
            )
        ),
        e(FeedbackOverlay, { feedback, setFeedback, onNext: () => { setIdx((idx + 1) % scenarios.length); setSelected(null); } })
    );
}

// --- MODE: FINAL INTEGRATION (Domino visualizer) ---
function IntegrationSim({ operatorName, setScore, onReportResult, onGeneratePDF, setActiveMode }) {
  const [pathway, setPathway] = useState('cardio');
  const [step, setStep] = useState(0);
  const [matchingOptions, setMatchingOptions] = useState([]);
  const [wrongSelection, setWrongSelection] = useState(null);
  const [isGuided, setIsGuided] = useState(true); 
  const [isBlockComplete, setIsBlockComplete] = useState(false);
  const [integrationHistory, setIntegrationHistory] = useState({}); // { pathway-step: choice }

  const chains = {
      cardio: [
          { label: 'Atherosclerosis', rationale: 'LDL oxidation and plaque formation narrow the coronary lumen.' },
          { label: 'Myocardial Infarction', rationale: 'Plaque rupture triggers thrombus, causing irreversible myocyte death.' },
          { label: 'Left Heart Failure', rationale: 'Necrotic muscle fails to eject blood, increasing LVEDP.' },
          { label: 'Pulmonary Edema', rationale: 'Backup pressure forces fluid into alveoli, causing crackles and orthopnea.' },
          { label: 'Cardiogenic Shock', rationale: 'Systemic perfusion fails as the primary pump collapses.' }
      ],
      respiratory: [
          { label: 'Smoking/Alpha-1', rationale: 'Protease/Antiprotease imbalance destroys alveolar elastin.' },
          { label: 'COPD/Emphysema', rationale: 'Alveoli fuse and lose recoil, causing air trapping and hyperinflation.' },
          { label: 'Chronic Hypoxemia', rationale: 'Persistent low O2 triggers reactive pulmonary vasoconstriction.' },
          { label: 'Pulm Hypertension', rationale: 'Increased vascular resistance forces the RV to work harder.' },
          { label: 'Cor Pulmonale', rationale: 'Right ventricle fails due to primary lung disease; JVD and edema follow.' }
      ],
      sepsis: [
          { label: 'Systemic Infection', rationale: 'Pathogens enter the blood, triggering a massive cytokine storm.' },
          { label: 'Profound Vasodilation', rationale: 'Nitric oxide release causes systemic vascular resistance to collapse.' },
          { label: 'Capillary Leak', rationale: 'Cytokines increase permeability; fluid escapes into the interstitium.' },
          { label: 'Distributive Shock', rationale: 'Preload and SVR both drop, causing critical hypotension.' },
          { label: 'DIC/Organ Failure', rationale: 'Widespread clotting consumes factors, leading to multi-system hemorrhage.' }
      ],
      renal_cardio: [
          { label: 'Renal Artery Stenosis', rationale: 'Decreased perfusion to the kidney triggers the RAAS cascade.' },
          { label: 'Secondary Hypertension', rationale: 'Angiotensin II and Aldosterone cause systemic vasoconstriction and fluid retention.' },
          { label: 'Left Ventricular Hypertrophy', rationale: 'Chronic high afterload causes the heart wall to thicken and stiffen.' },
          { label: 'Diastolic Dysfunction', rationale: 'The stiff heart cannot fill properly, raising backward pressure.' },
          { label: 'Flash Pulmonary Edema', rationale: 'Sudden surge in pressure leads to rapid alveolar fluid accumulation.' }
      ],
      liver_coag: [
          { label: 'Chronic Cirrhosis', rationale: 'Fibrosis destroys hepatocytes responsible for protein synthesis.' },
          { label: 'Hypoalbuminemia', rationale: 'Loss of oncotic pressure causes fluid to leak into the abdomen (Ascites).' },
          { label: 'Factor Deficiency', rationale: 'Liver can no longer produce Vitamin K-dependent clotting factors.' },
          { label: 'Portal Hypertension', rationale: 'Blood backs up into the esophagus, creating fragile varices.' },
          { label: 'Massive Hematemesis', rationale: 'Ruptured varices and poor clotting lead to life-threatening hemorrhage.' }
      ],
      valve_failure: [
          { label: 'Aortic Stenosis', rationale: 'Calcified valve restricts blood flow from the LV to the Aorta.' },
          { label: 'Concentric Hypertrophy', rationale: 'The LV thickens significantly to overcome the high resistance.' },
          { label: 'Myocardial O2 Demand ↑', rationale: 'The massive muscle requires more oxygen than the coronaries can provide.' },
          { label: 'Exertional Syncope', rationale: 'Brain is deprived of blood when cardiac output cannot meet demand during activity.' },
          { label: 'Sudden Cardiac Death', rationale: 'Extreme hypertrophy leads to lethal ventricular arrhythmias.' }
      ],
      pulm_embolism: [
          { label: 'Deep Vein Thrombosis', rationale: 'Stasis or injury leads to a clot in the deep leg veins.' },
          { label: 'Clot Embolization', rationale: 'The thrombus detaches and travels through the right heart to the lungs.' },
          { label: 'V/Q Mismatch', rationale: 'Lungs have ventilation (air) but no perfusion (blood), preventing gas exchange.' },
          { label: 'Acute Right Strain', rationale: 'Sudden backup pressure causes the thin-walled RV to dilate and fail.' },
          { label: 'Obstructive Shock', rationale: 'Blood cannot return to the left heart, causing systemic BP to plummet.' }
      ],
      trauma_dic: [
          { label: 'Crush Injury', rationale: 'Massive tissue destruction releases Tissue Factor into circulation.' },
          { label: 'Widespread Thrombi', rationale: 'The extrinsic pathway triggers microclots in every organ.' },
          { label: 'Platelet Consumption', rationale: 'Tiny clots use up all available platelets and fibrinogen.' },
          { label: 'Diffuse Hemorrhage', rationale: 'The body can no longer form functional clots; patient bleeds from all sites.' },
          { label: 'Ischemic Organ Failure', rationale: 'Microthrombi block nutrient flow to the kidneys, liver, and brain.' }
      ]
  };

  const currentChain = chains[pathway] || chains.cardio;

  useEffect(() => {
      if (step < currentChain.length - 1) {
          const correct = currentChain[step + 1].label;
          const others = Object.values(chains).flat().map(c => c.label).filter(l => l !== correct);
          const distractors = others.sort(() => Math.random() - 0.5).slice(0, 2);
          setMatchingOptions([correct, ...distractors].sort());
      } else {
          setMatchingOptions([]);
      }
  }, [pathway, step]);

  const handleMatch = (opt) => {
      const key = `integration-${pathway}-${step+1}`;
      if (!integrationHistory[key]) {
          const isCorrect = opt === currentChain[step + 1].label;
          setIntegrationHistory(prev => ({ ...prev, [key]: opt }));
          onReportResult({ id: key, correct: isCorrect });
          
          if (isCorrect) {
              setScore(s => s + 20);
              setStep(s => s + 1);
              setWrongSelection(null);
          } else {
              setWrongSelection(opt);
          }
      } else {
          if (opt === currentChain[step+1].label) {
              setStep(s => s + 1);
              setWrongSelection(null);
          } else {
              setWrongSelection(opt);
          }
      }
  };

  const getIntegrationRationale = (opt) => {
      const correctLabel = currentChain[step + 1]?.label;
      if (opt === correctLabel) return currentChain[step + 1].rationale;
      const originKey = Object.keys(chains).find(k => chains[k].some(c => c.label === opt));
      if (originKey) return `INCORRECT: "${opt}" is part of the ${originKey.toUpperCase()} systemic collapse. In ${pathway.toUpperCase()}, the physiologic dominoes fall differently.`;
      return "This physiological event does not follow the current systemic collapse pathway.";
  };

  if (isBlockComplete) {
      return e('div', { className: 'splash-screen fade-in' },
          e('div', { className: 'identity-panel', style: { textAlign: 'center' } },
            e('h1', { className: 'matrix-text crt-glow', style: { fontSize: '2rem', marginBottom: '30px' } }, `BLOCK 1 COMPLETE`),
            e('div', { className: 'matrix-text', style: { fontSize: '1.2rem', margin: '20px 0', color: '#fff' } }, `OPERATOR: ${operatorName}`),
            e('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center' } },
              e('button', { className: 'btn-cyber', onClick: onGeneratePDF }, 'DOWNLOAD REPORT'),
              e('button', { className: 'btn-cyber', onClick: () => { setIsBlockComplete(false); setStep(0); setActiveMode(null); } }, 'RETURN TO HUB')
            )
          )
      );
  }

  return e('div', { className: 'mod3-integration-screen fade-in' },
      e('div', { className: 'integration-header' },
          e('h2', { className: 'matrix-text' }, 'SYSTEM INTEGRATION DOMINOES'),
          e('div', { className: 'path-tabs' }, Object.keys(chains).map(k => e('button', { key: k, className: pathway === k ? 'active' : '', onClick: () => { setPathway(k); setStep(0); setIntegrationHistory({}); } }, k.toUpperCase())))
      ),
      e('div', { className: 'domino-container' }, currentChain.map((c, i) => e('div', { key: i, className: `domino-card ${i <= step ? 'active' : 'inactive'} ${i < step ? 'collapsed' : ''}` },
          e('div', { className: 'domino-num' }, i + 1), e('div', { className: 'domino-label matrix-text' }, c.label), i === step && e('div', { className: 'domino-rationale' }, c.rationale), i < step && e('div', { className: 'domino-status' }, '✓ COLLAPSED')))),
      e('div', { className: 'integration-controls' },
          e('div', { className: 'mode-toggle-zone' },
              e('button', { className: `btn-cyber-small ${isGuided ? 'active' : ''}`, onClick: () => setIsGuided(true) }, 'STUDY MODE (GUIDED)'),
              e('button', { className: `btn-cyber-small ${!isGuided ? 'active' : ''}`, onClick: () => { setIsGuided(false); setStep(0); } }, 'PRACTICE MODE (MATCH)')
          ),
          step < currentChain.length - 1 && (isGuided ? (
              e('button', { className: 'btn-cyber next-domino-btn', onClick: () => setStep(s => s + 1) }, 'NEXT DOMINO →')
          ) : (
              e('div', { className: 'integration-matching fade-in' },
                  e('div', { className: 'matching-options' }, matchingOptions.map((opt, i) => {
                      const key = `${pathway}-${step+1}`;
                      const hist = integrationHistory[key];
                      let cls = 'btn-cyber';
                      if (hist) {
                          if (opt === currentChain[step+1].label) cls += ' correct';
                          else if (opt === hist) cls += ' wrong';
                          if (opt === hist) cls += ' locked-selection';
                          if (wrongSelection === opt || (hist === opt && !wrongSelection)) cls += ' reviewing';
                      } else if (wrongSelection === opt) cls += ' wrong reviewing';
                      return e('button', { key: i, className: cls, onClick: () => handleMatch(opt) }, opt);
                  })),
                  (wrongSelection || (integrationHistory[`${pathway}-${step+1}`] && step < currentChain.length - 1)) && e('div', { className: `practice-step-rationale fade-in ${wrongSelection ? 'rationale-wrong' : 'rationale-correct'}` },
                      e('div', { className: 'rationale-header' }, e('strong', null, wrongSelection ? '✗ INCORRECT: ' : '✓ CORRECT: '), wrongSelection || currentChain[step+1]?.label),
                      e('p', null, getIntegrationRationale(wrongSelection || currentChain[step+1]?.label))
                  )
              )
          )),
          step === currentChain.length - 1 && e('button', { className: 'btn-mastered', onClick: () => { setScore(s => s + 200); setIsBlockComplete(true); } }, 'FINALIZE BLOCK 1 CERTIFICATION')
      )
  );
}

// --- MODE: MECHANISM BOSS BATTLES ---
function BossBattles({ setScore, onReportResult }) {
  const [phase, setStepPhase] = useState(0); 
  const [bossHp, setBossHp] = useState(100);
  const [disease, setDisease] = useState(() => MOD3_DATABASE[Math.floor(Math.random() * MOD3_DATABASE.length)]);
  const [battleHistory, setBattleHistory] = useState({}); // { phase: choice }
  const [currentReview, setCurrentReview] = useState(null);

  const phaseQuestions = [
      { type: 'cause', q: `PHASE 1: Primary TRIGGER for ${disease.name}?` },
      { type: 'mechanism', q: `PHASE 2: PHYSIOLOGIC PROCESS in ${disease.name}?` },
      { type: 'structural', q: `PHASE 3: STRUCTURAL CHANGE in ${disease.name}?` },
      { type: 'clinical', q: `PHASE 4: Hallmark CLINICAL FINDING?` },
      { type: 'complication', q: `PHASE 5: LETHAL COMPLICATION?` }
  ];

  const currentQ = phaseQuestions[phase];
  const correctNode = disease.chain.find(n => n.type === currentQ.type);
  const lockedChoice = battleHistory[phase];

  const handleAction = (opt) => {
      const key = `boss-${disease.id}-${phase}`;
      if (!battleHistory[phase]) {
          const isCorrect = opt === correctNode.label;
          setBattleHistory(prev => ({ ...prev, [phase]: opt }));
          onReportResult({ id: key, correct: isCorrect });
          
          if (isCorrect) { 
              setBossHp(h => Math.max(0, h - 20)); 
              setScore(s => s + 50); 
          }
      }
      setCurrentReview(opt);
  };

  const nextBoss = () => { setDisease(MOD3_DATABASE[Math.floor(Math.random() * MOD3_DATABASE.length)]); setStepPhase(0); setBossHp(100); setBattleHistory({}); setCurrentReview(null); };

  const getSpecificBattleRationale = (opt) => {
      if (opt === correctNode.label) return correctNode.detail;
      const originDisease = MOD3_DATABASE.find(d => d.chain.some(n => n.type === currentQ.type && n.label === opt));
      if (originDisease) return `INCORRECT: "${opt}" is the characteristic ${currentQ.type} for ${originDisease.name}. In ${disease.name}, the pathophysiology involves a different mechanism.`;
      return "This choice does not fit the diagnostic criteria or pathophysiologic mechanism of the current threat.";
  };
  
  const options = useMemo(() => {
      const distracts = MOD3_DATABASE.filter(d => d.id !== disease.id).map(d => d.chain.find(n => n.type === currentQ.type)?.label).filter(l => l).sort(() => Math.random() - 0.5).slice(0, 2);
      return [correctNode.label, ...distracts].sort();
  }, [disease, currentQ.type]);

  return e('div', { className: 'mod3-boss-screen fade-in' },
      e('div', { className: 'boss-hud' },
          e('div', { className: 'boss-name-box' }, e('div', { className: 'matrix-text', style: { color: '#ff3e3e', fontSize: '0.8rem' } }, 'THREAT DETECTED'), e('h1', { className: 'text-red' }, disease.name.toUpperCase())),
          e('div', { className: 'boss-hp-outer' }, e('div', { className: 'hp-label matrix-text' }, `STABILIZATION: ${phase + 1} / 5`), e('div', { className: 'hp-bar' }, e('div', { className: 'hp-fill', style: { width: `${bossHp}%` } })))
      ),
      e('div', { className: 'boss-arena' },
          e('div', { className: 'boss-prompt-box' },
              e('div', { className: 'quiz-nav-row' },
                  e('button', { className: 'btn-cyber-small', disabled: phase === 0, onClick: () => { setStepPhase(p => p - 1); setCurrentReview(battleHistory[phase-1] || null); } }, '← PREV'),
                  e('div', { className: 'phase-type matrix-text' }, currentQ.type.toUpperCase()),
                  e('button', { className: 'btn-cyber-small', disabled: !lockedChoice, onClick: () => { if (phase < 4) { setStepPhase(p => p + 1); setCurrentReview(battleHistory[phase+1] || null); } } }, 'NEXT →')
              ),
              e('p', { className: 'boss-question' }, currentQ.q)
          ),
          e('div', { className: 'boss-options' }, options.map((o, i) => {
              let cls = 'btn-cyber boss-btn';
              if (lockedChoice) {
                  if (o === correctNode.label) cls += ' correct'; else if (o === lockedChoice) cls += ' wrong';
                  if (o === lockedChoice) cls += ' locked-selection';
                  if (o === currentReview) cls += ' reviewing';
              } else if (currentReview === o) cls += ' reviewing';
              return e('button', { key: i, className: cls, onClick: () => handleAction(o) }, o);
          })),
          (lockedChoice || currentReview) && e('div', { className: `practice-step-rationale fade-in ${currentReview === correctNode.label ? 'rationale-correct' : 'rationale-wrong'}` },
              e('div', { className: 'rationale-header' }, e('strong', null, currentReview === correctNode.label ? '✓ CORRECT: ' : '✗ INCORRECT: '), currentReview),
              e('p', null, getSpecificBattleRationale(currentReview))
          )
      ),
      lockedChoice && phase === 4 && e('button', { className: 'btn-cyber', onClick: nextBoss }, 'NEXT THREAT')
  );
}

// --- MODE: ADAPTIVE EXAM ---
function AdaptiveExam({ setScore, onReportResult, weakConcepts, setWeakConcepts }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [examHistory, setExamHistory] = useState({}); // { idx: { choice, correct, scenario } }
  const [reviewChoice, setReviewChoice] = useState(null);

  const scenario = useMemo(() => {
      if (examHistory[currentIdx]) return examHistory[currentIdx].scenario;
      const d = MOD3_DATABASE[Math.floor(Math.random() * MOD3_DATABASE.length)];
      const type = ['mechanism', 'functional', 'clinical', 'lab', 'complication'][Math.floor(Math.random() * 5)];
      const targetNode = d.chain.find(n => n.type === type);
      const distractors = MOD3_DATABASE.filter(db => db.id !== d.id).map(db => db.chain.find(n => n.type === type)?.label).filter(l => l && l !== targetNode.label).sort(() => Math.random() - 0.5).slice(0, 3);
      return { diseaseId: d.id, disease: d.name, type: type.toUpperCase(), context: `Retrieve the underlying ${type} for:`, q: d.name.toUpperCase(), correct: targetNode.label, rationale: targetNode.detail, options: [targetNode.label, ...distractors].sort() };
  }, [currentIdx]);

  const handleAnswer = (opt) => {
      const key = `exam-${currentIdx}-${scenario.diseaseId}`;
      if (!examHistory[currentIdx]) {
          const isCorrect = opt === scenario.correct;
          setExamHistory(prev => ({ ...prev, [currentIdx]: { choice: opt, correct: isCorrect, scenario } }));
          onReportResult({ id: key, correct: isCorrect });
          
          if (isCorrect) setScore(s => s + 75);
          else setWeakConcepts(prev => [...prev, scenario.disease]);
      }
      setReviewChoice(opt);
  };

  const currentResult = examHistory[currentIdx];
  const getSpecificExamRationale = (opt) => {
      if (opt === scenario.correct) return scenario.rationale;
      const originDisease = MOD3_DATABASE.find(d => d.chain.some(n => n.type === scenario.type.toLowerCase() && n.label === opt));
      if (originDisease) return `INCORRECT: "${opt}" is specifically linked to ${originDisease.name}. For ${scenario.disease}, we require a different ${scenario.type.toLowerCase()} process.`;
      return "Knowledge gap detected: This process does not belong to the selected pathophysiology.";
  };

  return e('div', { className: 'mod3-exam-screen fade-in' },
      e('div', { className: 'exam-card' },
          e('div', { className: 'exam-header-v2' }, e('span', { className: 'matrix-text' }, 'ADAPTIVE RETRIEVAL ENGINE'), e('div', { className: 'weak-tally' }, `WEAK CONCEPTS: ${weakConcepts.length}`)),
          e('div', { className: 'exam-content' },
              e('div', { className: 'quiz-nav-row' },
                  e('button', { className: 'btn-cyber-small', disabled: currentIdx === 0, onClick: () => { setCurrentIdx(i => i - 1); setReviewChoice(examHistory[currentIdx-1]?.choice || null); } }, '← PREV'),
                  e('div', { className: 'matrix-text' }, `QUESTION ${currentIdx + 1}`),
                  e('button', { className: 'btn-cyber-small', disabled: !currentResult, onClick: () => { if (examHistory[currentIdx]) { setCurrentIdx(i => i + 1); setReviewChoice(examHistory[currentIdx+1]?.choice || null); } } }, 'NEXT →')
              ),
              e('p', { className: 'exam-context' }, scenario.context), e('h1', { className: 'exam-subject' }, scenario.q),
              e('div', { className: 'exam-options-grid' }, scenario.options.map((opt, i) => {
                  let cls = 'btn-cyber exam-btn';
                  if (currentResult) {
                      if (opt === scenario.correct) cls += ' correct'; else if (opt === currentResult.choice) cls += ' wrong';
                      if (opt === currentResult.choice) cls += ' locked-selection';
                      if (opt === reviewChoice) cls += ' reviewing';
                  } else if (reviewChoice === opt) cls += ' reviewing';
                  return e('button', { key: i, className: cls, onClick: () => handleAnswer(opt) }, opt);
              }))
          ),
          (currentResult || reviewChoice) && e('div', { className: `practice-step-rationale fade-in ${reviewChoice === scenario.correct ? 'rationale-correct' : 'rationale-wrong'}` },
              e('div', { className: 'rationale-header' }, e('strong', null, reviewChoice === scenario.correct ? '✓ CORRECT: ' : '✗ INCORRECT: '), reviewChoice),
              e('p', null, getSpecificExamRationale(reviewChoice))
          ),
          currentResult && e('button', { className: 'btn-cyber next-btn', onClick: () => { setCurrentIdx(i => i + 1); setReviewChoice(null); } }, 'NEXT ANALYSIS')
      )
  );
}

// --- MAIN ENGINE ROOT ---

export default function Module3Engine({ operatorName, onBack, activeMode, onModeChange, onGeneratePDF, onReportResult }) {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [weakConcepts, setWeakConcepts] = useState([]); 

  const setActiveMode = (mode) => {
    setFeedback(null);
    onModeChange(mode);
  };

  const renderGame = () => {
    switch(activeMode) {
      case 'mech_lab': return e(MechanismLab, { setScore, onReportResult, feedback, setFeedback });
      case 'path_builder': return e(PathwayBuilder, { setScore, onReportResult, feedback, setFeedback });
      case 'coronary_crisis': return e(ClinicalSim, { type: 'coronary', setScore, onReportResult, setWeakConcepts });
      case 'pulm_collapse': return e(ClinicalSim, { type: 'pulm', setScore, onReportResult, setWeakConcepts });
      case 'shock_unit': return e(ClinicalSim, { type: 'shock', setScore, onReportResult, setWeakConcepts });
      case 'emergency_dept': return e(ClinicalSim, { type: 'emergency_dept', setScore, onReportResult, setWeakConcepts });
      case 'clot_runner': return e(VascularThreatMap, { setScore, onReportResult, feedback, setFeedback });
      case 'hemo_arena': return e(ClinicalSim, { type: 'hemo', setScore, onReportResult, setWeakConcepts });
      case 'boss_battles': return e(BossBattles, { setScore, onReportResult });
      case 'adaptive_exam': return e(AdaptiveExam, { setScore, onReportResult, weakConcepts, setWeakConcepts });
      case 'final_sim': return e(IntegrationSim, { operatorName, setScore, onReportResult, onGeneratePDF, setActiveMode });
      default: return e('div', { className: 'mod3-placeholder' }, e('h2', null, 'UNDER CONSTRUCTION'));
    }
  };

  if (!activeMode) {
    return e('div', { className: 'mod3-hub-screen fade-in' },
      e('div', { className: 'hub-header-v2' }, e('div', { className: 'matrix-text hub-title-glow' }, 'MODULE 3: SYSTEM FAILURE'), e('div', { className: 'hub-subtitle' }, 'BLOCK 1 CLINICAL ROTATION'), e('button', { className: 'btn-return-home', onClick: onBack }, '← CAMPUS HUB')),
      e('div', { className: 'mode-grid' }, MOD3_GAME_MODES.map(mode => e('div', { key: mode.id, className: 'mode-card-v2', onClick: () => setActiveMode(mode.id) }, e('div', { className: 'mode-icon' }, mode.icon), e('div', { className: 'mode-name matrix-text' }, mode.name), e('div', { className: 'mode-desc' }, mode.description)))),
      e('div', { className: 'hub-footer-actions' }, e('button', { className: 'btn-cyber btn-report', onClick: onGeneratePDF }, 'DOWNLOAD BLOCK 1 REPORT (.PDF)'))
    );
  }

  return e('div', { className: 'mod3-engine-root' },
    e('div', { className: 'mod3-hud' }, e('div', { className: 'hud-left' }, e('span', null, modeNameById(activeMode))), e('div', { className: 'hud-right' }, e('span', { className: 'hud-score-val' }, `SCORE: ${score}`))),
    e('div', { className: 'mod3-viewport' }, renderGame())
  );
}

function modeNameById(id) {
    return MOD3_GAME_MODES.find(m => m.id === id)?.name.toUpperCase() || 'MODE';
}