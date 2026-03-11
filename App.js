import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { jsPDF } from "jspdf";

// --- CONTENT IMPORTS ---
import { 
  MODULE1_RIG_METADATA, 
  MODULE1_QUIZ_DATA, 
  MODULE1_CLINICAL_SUMMARIES, 
  MODULE1_PATHOPHYSIOLOGY_DATA, 
  MODULE1_NPC_DATA, 
  MODULE1_WORLD_LOCATIONS 
} from './module1-content.js';

import { 
  MODULE2_RIG_METADATA, 
  MODULE2_QUIZ_DATA, 
  MODULE2_CLINICAL_SUMMARIES, 
  MODULE2_PATHOPHYSIOLOGY_DATA, 
  MODULE2_NPC_DATA, 
  MODULE2_WORLD_LOCATIONS 
} from './module2-content.js';

const e = React.createElement;

// --- CONFIGURATION ---
const APP_CONFIG = {
  TITLE: "DR. MODALI LEARNING LABS",
  SUBTITLE: "A DAY IN THE LIFE OF ALFIE",
  ASSETS: {
    HUB_MUSIC: "https://rosebud.ai/assets/GVL1.mp3?d0RA",
    MOD1_MUSIC: "https://rosebud.ai/assets/LOAM2A.mp3?Oc02",
    MOD2_MUSIC: "https://rosebud.ai/assets/LOAM2B.mp3?PSqQ",
    ALFIE_PORTRAIT: "https://rosebud.ai/assets/alfie-south-indian-sprite.webp?JZw4",
    BELINDA_PORTRAIT: "https://rosebud.ai/assets/belinda-curvy-sprite.webp?LG5O",
    MAYA_PORTRAIT: "https://rosebud.ai/assets/maya-tall-sprite.webp?5sJu",
    KENJI_PORTRAIT: "https://rosebud.ai/assets/kenji-stocky-sprite.webp?BsZX",
    BACKGROUNDS: {
        festival: {
            exterior: "https://rosebud.ai/assets/festival-exterior.webp?b2oI",
            interior: "https://rosebud.ai/assets/festival-interior.webp?SBk8"
        },
        home: {
            exterior: "https://rosebud.ai/assets/home-exterior.webp?Afve",
            interior: "https://rosebud.ai/assets/home-interior.webp?fHDk"
        },
        tacobell: {
            exterior: "https://rosebud.ai/assets/tacobell-exterior.webp?0mab",
            interior: "https://rosebud.ai/assets/tacobell-interior.webp?6Kd1"
        },
        mcdonalds: {
            exterior: "https://rosebud.ai/assets/mcdonalds-exterior.webp?vI4N",
            interior: "https://rosebud.ai/assets/mcdonalds-interior.webp?rXJf"
        },
        clinic: {
            exterior: "https://rosebud.ai/assets/modali-clinic-exterior-v2.webp?cZy9",
            interior: "https://rosebud.ai/assets/clinic-interior.webp?PvB0"
        },
        atrium: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-atrium-interior-v2.webp?Eb0C"
        },
        conference_room: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/clinic-interior.webp?PvB0"
        },
        allergy_wing: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-allergy-clinic.webp.webp?y0Wg"
        },
        hematology_lab: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-hematology-lab.webp.webp?gegx"
        },
        cafeteria: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-cafeteria.webp.webp?Jsrf"
        },
        dermatology_clinic: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-allergy-clinic.webp.webp?y0Wg"
        },
        internal_medicine_ward: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-internal-medicine-ward.webp.webp?FK9I"
        },
        rheumatology_clinic: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-rheumatology-clinic.webp.webp?UkGz"
        },
        pediatric_conference_room: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-lecture-hall.webp.webp?zuGc"
        },
        pediatric_immunology_unit: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-pediatric-immunology.webp.webp?MCFx"
        },
        infectious_disease_clinic: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-infectious-disease-clinic.webp.webp?dJIN"
        },
        infectious_disease_ward: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-infectious-disease-ward.webp.webp?3KtC"
        },
        oncology_amphitheater: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-oncology-lecture.webp.webp?ufzf"
        },
        hematopathology_lab: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-hematology-lab.webp.webp?gegx"
        },
        hematology_reading_room: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-clinical-lab-review.webp.webp?fqSx"
        },
        pathology_teaching_suite: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-pathology-suite.webp.webp?O2WD"
        },
        pathology_consultation_room: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-pathology-suite.webp.webp?O2WD"
        },
        hematology_teaching_room: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-hematology-teaching.webp.webp?4taB"
        },
        clinical_lab_review: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-clinical-lab-review.webp.webp?fqSx"
        },
        hematology_ward: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-hematology-ward.webp.webp?NJxf"
        },
        obstetrics_consultation: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-obstetrics-consultation.webp.webp?WNtZ"
        },
        emergency_case_conference: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-emergency-trauma.webp.webp?8ACj"
        },
        hemostasis_lab: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-hemostasis-lab.webp.webp?uyjI"
        },
        emergency_room: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-emergency-trauma.webp.webp?8ACj"
        },
        gastro_consult: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-gastro-consult.webp.webp?HxlD"
        },
        alfie_kitchen: {
            exterior: "https://rosebud.ai/assets/home-exterior.webp?Afve",
            interior: "https://rosebud.ai/assets/alfie-kitchen.webp.webp?p65z"
        },
        belinda_home: {
            exterior: "https://rosebud.ai/assets/home-exterior.webp?Afve",
            interior: "https://rosebud.ai/assets/belinda-living-room.webp.webp?gdOB"
        },
        park: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-park.webp.webp?mdGG"
        },
        market: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/westbridge-market-v2.webp?guQj"
        },
        taco_cart: {
            exterior: "https://rosebud.ai/assets/westbridge-atrium-exterior.webp.webp?20TO",
            interior: "https://rosebud.ai/assets/northbridge-taco-cart.webp.webp?QSmD"
        }
    }
  }
};

// --- HELPERS ---
function getModuleData(modId) {
  if (modId === 1) {
    return {
      rigMetadata: MODULE1_RIG_METADATA,
      quizData: MODULE1_QUIZ_DATA,
      clinicalSummaries: MODULE1_CLINICAL_SUMMARIES,
      pathophysiologyData: MODULE1_PATHOPHYSIOLOGY_DATA,
      npcData: MODULE1_NPC_DATA,
      worldLocations: MODULE1_WORLD_LOCATIONS
    };
  }
  return {
    rigMetadata: MODULE2_RIG_METADATA,
    quizData: MODULE2_QUIZ_DATA,
    clinicalSummaries: MODULE2_CLINICAL_SUMMARIES,
    pathophysiologyData: MODULE2_PATHOPHYSIOLOGY_DATA,
    npcData: MODULE2_NPC_DATA,
    worldLocations: MODULE2_WORLD_LOCATIONS
  };
}

// --- COMPONENTS ---

function MatrixStinger({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return e('div', { className: 'matrix-stinger' }, 
    e('div', { className: 'stinger-logo-wrap' },
      e('div', { className: 'stinger-brand matrix-text' }, 'DR. MODALI'),
      e('div', { className: 'stinger-labs matrix-text' }, 'LEARNING LABS')
    )
  );
}

function ModuleHub({ onSelect, operatorName }) {
  // Keyboard: 1 or 2 to select module
  useEffect(() => {
    const handleKey = (ev) => {
      if (ev.key === '1') onSelect(1);
      if (ev.key === '2') onSelect(2);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onSelect]);

  const blocks = [
    {
      title: "BLOCK 1",
      modules: [
        { id: 1, label: "Module 1", sub: "The Festival", active: true, key: '1' },
        { id: 2, label: "Module 2", sub: "The Mission", active: true, key: '2' },
        { id: 3, label: "Module 3", sub: "Coming Soon", active: false },
        { id: 'midterm', label: "Practice Midterm", sub: "Coming Soon", active: false }
      ]
    },
    {
      title: "BLOCK 2",
      modules: [
        { id: 4, label: "Module 4", sub: "Coming Soon", active: false },
        { id: 5, label: "Module 5", sub: "Coming Soon", active: false },
        { id: 6, label: "Module 6", sub: "Coming Soon", active: false },
        { id: 7, label: "Module 7", sub: "Coming Soon", active: false },
        { id: 'final', label: "Practice Final", sub: "Coming Soon", active: false }
      ]
    }
  ];

  return e('div', { className: 'hub-screen fade-in' },
    e('div', { className: 'hub-header' },
      e('div', { className: 'matrix-text', style: { fontSize: '0.8rem', opacity: 0.7 } }, 'DR. MODALI LEARNING LABS'),
      e('h1', { className: 'matrix-text crt-glow', style: { margin: '5px 0' } }, 'A DAY IN THE LIFE OF ALFIE'),
      e('div', null, `OPERATOR: ${operatorName}`)
    ),
    e('div', { className: 'hub-grid' },
      blocks.map((block, i) => e('div', { key: i, className: 'hub-block' },
        e('div', { className: 'block-title matrix-text' }, block.title),
        e('div', { className: 'module-list' },
          block.modules.map(mod => e('div', { 
            key: mod.id, 
            className: `module-card ${!mod.active ? 'locked' : ''}`,
            onClick: () => mod.active && onSelect(mod.id)
          },
            e('div', { className: 'module-status' }, mod.active ? (mod.key ? `[${mod.key}] READY` : 'READY') : 'COMING SOON'),
            e('div', { className: 'matrix-text', style: { fontSize: '1.2rem' } }, mod.label),
            e('div', { style: { fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' } }, mod.sub)
          ))
        )
      ))
    )
  );
}

function IdentityScreen({ operatorName, setOperatorName, onContinue, onRestore }) {
  // ENTER key to continue
  useEffect(() => {
    const handleKey = (ev) => {
      if (ev.code === 'Enter') { ev.preventDefault(); onContinue(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onContinue]);

  return e('div', { className: 'splash-screen fade-in' },
    e('div', { className: 'identity-panel' },
      e('div', { className: 'matrix-text', style: { marginBottom: '30px', borderBottom: '1px solid var(--matrix-green)', paddingBottom: '10px' } }, 'IDENTITY VERIFICATION'),
      e('div', { className: 'input-group' },
        e('div', { className: 'input-label matrix-text' }, 'OPERATOR NAME'),
        e('input', { 
          className: 'input-cyber', 
          placeholder: 'ENTER NAME...', 
          value: operatorName, 
          onChange: (ev) => setOperatorName(ev.target.value.toUpperCase()) 
        })
      ),
      e('div', { className: 'input-group', style: { marginTop: '20px' } },
        e('div', { className: 'input-label matrix-text' }, 'RETURN CODE'),
        e('input', { 
          className: 'input-cyber', 
          placeholder: 'PASTE CODE...', 
          onChange: (ev) => onRestore(ev.target.value)
        })
      ),
      e('button', { 
        className: 'btn-cyber mission-start-btn', 
        style: { marginTop: '40px' }, 
        onClick: onContinue 
      }, 'BEGIN MISSION [ENTER]')
    )
  );
}

function MissionBriefing({ activeModule, onBegin }) {
  useEffect(() => {
    const handleKey = (ev) => {
      if (ev.code === 'Space' || ev.code === 'Enter') { ev.preventDefault(); onBegin(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onBegin]);

  const briefing = activeModule === 1 
    ? "Welcome to Module 1: The Festival. You must navigate the Westbridge community, identifying cellular injury and hemodynamic foundations in everyday clinical encounters."
    : "Welcome to Module 2: The Mission. Your objective is the Westbridge Hematology Lab. You will analyze immunological cascades, oncological transformations, and hematological disorders.";

  return e('div', { className: 'splash-screen fade-in' },
    e('div', { className: 'briefing-panel' },
      e('div', { className: 'matrix-text', style: { marginBottom: '20px', borderBottom: '1px solid var(--matrix-green)' } }, `MISSION BRIEFING // BLOCK ${activeModule}`),
      e('p', { style: { lineHeight: '1.6', marginBottom: '30px' } }, briefing),
      e('button', { className: 'btn-cyber', style: { width: '100%' }, onClick: onBegin }, 'BEGIN MISSION [SPACE]')
    )
  );
}

function DebugPanel({ screen, activeModule, currentStep, score, operatorName, onClose, onJumpStep, onJumpQuiz, onComplete, onSwitchModule, onGeneratePDF, onSetScore, getModuleData }) {
  const [jumpInput, setJumpInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  const { pathophysiologyData: pd } = getModuleData(activeModule);
  const step = pd[currentStep];

  return e('div', { className: 'debug-overlay' },
    e('div', { className: 'debug-header' },
      e('span', null, 'DEBUG'),
      e('button', { className: 'debug-close-btn', onClick: onClose }, 'X')
    ),

    // State info
    e('div', { className: 'debug-section' },
      e('div', { className: 'debug-section-title' }, 'STATE'),
      e('div', { className: 'debug-info' }, e('strong', null, 'Screen: '), screen),
      e('div', { className: 'debug-info' }, e('strong', null, 'Module: '), activeModule),
      e('div', { className: 'debug-info' }, e('strong', null, 'Step: '), `${currentStep} / ${pd.length - 1}`),
      e('div', { className: 'debug-info' }, e('strong', null, 'Score: '), `${score} / ${pd.length}`),
      e('div', { className: 'debug-info' }, e('strong', null, 'Location: '), step ? step.location : 'N/A'),
      e('div', { className: 'debug-info' }, e('strong', null, 'Event: '), step ? step.event : 'N/A')
    ),

    // Navigation
    e('div', { className: 'debug-section' },
      e('div', { className: 'debug-section-title' }, 'STEP NAVIGATION'),
      e('div', { className: 'debug-btn-row' },
        e('button', { className: 'debug-btn', onClick: () => onJumpStep(currentStep - 1) }, '← PREV'),
        e('button', { className: 'debug-btn', onClick: () => onJumpStep(currentStep + 1) }, 'NEXT →'),
        e('button', { className: 'debug-btn', onClick: () => onJumpStep(0) }, 'FIRST'),
        e('button', { className: 'debug-btn', onClick: () => onJumpStep(pd.length - 1) }, 'LAST')
      ),
      e('div', { style: { display: 'flex', gap: '6px', marginTop: '8px', alignItems: 'center' } },
        e('input', { 
          className: 'debug-step-input', 
          type: 'number', 
          min: 0, 
          max: pd.length - 1, 
          placeholder: '#',
          value: jumpInput,
          onChange: (ev) => setJumpInput(ev.target.value)
        }),
        e('button', { className: 'debug-btn green', onClick: () => { 
          const n = parseInt(jumpInput); 
          if (!isNaN(n)) onJumpStep(n); 
        }}, 'GO')
      )
    ),

    // Screen jumps
    e('div', { className: 'debug-section' },
      e('div', { className: 'debug-section-title' }, 'SCREEN JUMPS'),
      e('div', { className: 'debug-btn-row' },
        e('button', { className: 'debug-btn cyan', onClick: onJumpQuiz }, 'QUIZ'),
        e('button', { className: 'debug-btn cyan', onClick: onComplete }, 'COMPLETE')
      )
    ),

    // Module switch
    e('div', { className: 'debug-section' },
      e('div', { className: 'debug-section-title' }, 'MODULE'),
      e('div', { className: 'debug-btn-row' },
        e('button', { className: `debug-btn ${activeModule === 1 ? 'green' : ''}`, onClick: () => onSwitchModule(1) }, 'MOD 1'),
        e('button', { className: `debug-btn ${activeModule === 2 ? 'green' : ''}`, onClick: () => onSwitchModule(2) }, 'MOD 2')
      )
    ),

    // Score override
    e('div', { className: 'debug-section' },
      e('div', { className: 'debug-section-title' }, 'SCORE OVERRIDE'),
      e('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
        e('input', { 
          className: 'debug-step-input', 
          type: 'number', 
          min: 0, 
          placeholder: 'Score',
          value: scoreInput,
          onChange: (ev) => setScoreInput(ev.target.value)
        }),
        e('button', { className: 'debug-btn green', onClick: () => { 
          const n = parseInt(scoreInput); 
          if (!isNaN(n)) onSetScore(n); 
        }}, 'SET')
      ),
      e('div', { className: 'debug-btn-row', style: { marginTop: '6px' } },
        e('button', { className: 'debug-btn', onClick: () => onSetScore(pd.length) }, 'MAX SCORE'),
        e('button', { className: 'debug-btn', onClick: () => onSetScore(0) }, 'ZERO')
      )
    ),

    // PDF Generation
    e('div', { className: 'debug-section' },
      e('div', { className: 'debug-section-title' }, 'PDF QUIZ REPORTS'),
      e('div', { className: 'debug-btn-row' },
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(1) }, 'MOD 1 QUIZ PDF'),
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(2) }, 'MOD 2 QUIZ PDF')
      )
    )
  );
}

function App() {
  const [screen, setScreen] = useState('splash_brand'); 
  const [activeModule, setActiveModule] = useState(1);
  const [operatorName, setOperatorName] = useState('GUEST_STUDENT');
  const [musicOn, setMusicOn] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [showStinger, setShowStinger] = useState(false);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [lockedAnswer, setLockedAnswer] = useState(null);
  const [showRationale, setShowRationale] = useState(false);
  const [history, setHistory] = useState([]); // Track right/wrong per step

  // Lifted from Game2D so it persists across quiz/lab screen transitions
  const visitedLocationsRef = useRef(new Set());
  const prevLocationRef = useRef(null);
  const [showDebug, setShowDebug] = useState(false);

  const audioRef = useRef(new Audio(APP_CONFIG.ASSETS.HUB_MUSIC));

  const saveProgress = () => {
    const saveData = { 
      name: operatorName, 
      mod: activeModule, 
      step: currentStep, 
      score,
      history 
    };
    const dataString = btoa(JSON.stringify(saveData));
    
    // Copy to clipboard
    navigator.clipboard.writeText(dataString).then(() => {
      // Create and trigger download
      const blob = new Blob([dataString], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `DrModali_Save_${operatorName}_Mod${activeModule}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert("PROGRESS SAVED!\n\n1. Return code copied to clipboard.\n2. Save file downloaded.\n\nKeep this code to restore your mission later.");
    }).catch(err => {
      console.error('Could not copy text: ', err);
      alert("SAVE ERROR: Please check console.");
    });
  };

  const transitionTo = (nextScreen) => {
    setIsFading(true);
    setTimeout(() => {
      setScreen(nextScreen);
      setIsFading(false);
    }, 400);
  };

  useEffect(() => {
    if (screen === 'splash_brand') {
      const t = setTimeout(() => { setScreen('splash1'); }, 500);
      return () => clearTimeout(t);
    }
    if (screen === 'splash_brand_replay') {
      const t = setTimeout(() => { setScreen('identity'); }, 900);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => {
    audioRef.current.loop = true;
    
    const updateAudio = async () => {
      // Only keep the initial brand splashes silent; let music play once the mission is initiated
      const isInitialSplash = ['splash_brand', 'splash1'].includes(screen);
      if (isInitialSplash) {
        audioRef.current.pause();
        return;
      }

      let targetUrl = APP_CONFIG.ASSETS.HUB_MUSIC;
      const isMissionScreen = ['lab', 'quiz', 'briefing', 'complete', 'exam'].includes(screen);
      if (isMissionScreen) {
        targetUrl = activeModule === 1 ? APP_CONFIG.ASSETS.MOD1_MUSIC : APP_CONFIG.ASSETS.MOD2_MUSIC;
      }

      if (audioRef.current.src !== targetUrl) {
        audioRef.current.src = targetUrl;
      }

      if (musicOn) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    };

    updateAudio();
  }, [musicOn, screen, activeModule]);

  const handleEnterHub = () => {
    if (musicOn) audioRef.current.play().catch(() => {});
    setScreen('splash_brand_replay');
  };

  // Global keyboard across all screens
  useEffect(() => {
    const handleKey = (ev) => {
      if (ev.target.tagName === 'INPUT') return;

      // Backtick toggles debug menu
      if (ev.key === '`' || ev.code === 'Backquote') {
        ev.preventDefault();
        setShowDebug(d => !d);
        return;
      }

      // Splash1: SPACE or ENTER to enter
      if (screen === 'splash1' && (ev.code === 'Space' || ev.code === 'Enter')) {
        ev.preventDefault();
        handleEnterHub();
        return;
      }

      // Quiz screen
      if (screen === 'quiz') {
        const { pathophysiologyData: pd } = getModuleData(activeModule);
        const quizStep = pd[currentStep];

        // Number keys 1-4 to select/review answers
        const numKey = parseInt(ev.key);
        if (numKey >= 1 && numKey <= (quizStep.opts ? quizStep.opts.length : 0)) {
          ev.preventDefault();
          const idx = numKey - 1;
          if (lockedAnswer === null) {
            setLockedAnswer(idx);
            const isCorrect = idx === quizStep.ans;
            if (isCorrect) setScore(s => s + 1);
            setHistory(h => [...h, { step: currentStep, correct: isCorrect }]);
          }
          setQuizChoice(idx);
          setShowRationale(true);
          return;
        }

        // SPACE to continue after lock-in
        if ((ev.code === 'Space' || ev.key === ' ') && lockedAnswer !== null) {
          ev.preventDefault();
          setQuizChoice(null);
          setLockedAnswer(null);
          setShowRationale(false);
          if (currentStep < pd.length - 1) {
            setCurrentStep(s => s + 1);
            setScreen('lab');
          } else {
            setScreen('complete');
          }
          return;
        }
      }

      // Complete screen: SPACE to return to hub
      if (screen === 'complete' && (ev.code === 'Space' || ev.code === 'Enter')) {
        ev.preventDefault();
        setScreen('hub');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [screen, lockedAnswer, activeModule, currentStep]);

  const generatePDF = (modId) => {
    const { pathophysiologyData: pd, quizData: qd, clinicalSummaries: cs, rigMetadata: rm } = getModuleData(modId);
    const modScore = modId === activeModule ? score : 0;
    const modHistory = modId === activeModule ? history : [];
    const totalSteps = pd.length;
    const percentage = totalSteps > 0 ? Math.round((modScore / totalSteps) * 100) : 0;
    const modLabel = modId === 1 ? "MODULE 1: THE FESTIVAL" : "MODULE 2: THE MISSION";
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const verificationCode = btoa(JSON.stringify({ n: operatorName, m: modId, s: modScore, t: totalSteps, d: Date.now() }));

    const doc = new jsPDF();
    const pageW = 210;
    const pageH = 297;
    const margin = 18;
    const contentW = pageW - margin * 2;
    let y = 0;

    // Colors
    const GREEN = [0, 255, 65];
    const DARK = [13, 2, 8];
    const WHITE = [255, 255, 255];
    const GRAY = [170, 170, 170];
    const RED = [255, 80, 80];
    const CYAN = [0, 229, 255];
    const DARK_GREEN = [0, 180, 45];

    // --- HELPERS ---
    const drawPageBg = () => {
      doc.setFillColor(...DARK);
      doc.rect(0, 0, pageW, pageH, 'F');
      doc.setDrawColor(...GREEN);
      doc.setLineWidth(0.5);
      doc.rect(8, 8, pageW - 16, pageH - 16, 'S');
      // Footer
      doc.setFontSize(6);
      doc.setTextColor(...GRAY);
      doc.setFont("courier", "normal");
      doc.text('DR. MODALI LEARNING LABS // A DAY IN THE LIFE OF ALFIE // ARIZONA COLLEGE', pageW / 2, pageH - 12, { align: 'center' });
      doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageW - margin, pageH - 12, { align: 'right' });
    };

    const newPage = () => {
      doc.addPage();
      drawPageBg();
      y = margin + 8;
    };

    const checkSpace = (needed) => {
      if (y + needed > pageH - 25) {
        newPage();
        return true;
      }
      return false;
    };

    const drawSectionHeader = (title) => {
      checkSpace(22);
      doc.setDrawColor(...CYAN);
      doc.setLineWidth(1.5);
      doc.line(margin, y, margin + contentW, y);
      y += 8;
      doc.setFont("courier", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...CYAN);
      doc.text(title.toUpperCase(), margin, y);
      y += 6;
      doc.setDrawColor(...CYAN);
      doc.setLineWidth(0.3);
      doc.line(margin, y, margin + contentW, y);
      y += 8;
    };

    const drawWrappedText = (text, fontSize, color, bold, indent = 0) => {
      doc.setFont("courier", bold ? "bold" : "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, contentW - indent);
      for (const line of lines) {
        checkSpace(fontSize * 0.5 + 2);
        doc.text(line, margin + indent, y);
        y += fontSize * 0.45 + 1.2;
      }
    };

    // =============================================
    // PAGE 1: COVER PAGE
    // =============================================
    drawPageBg();
    y = 35;

    // Title
    doc.setFont("courier", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...GREEN);
    doc.text('DR. MODALI LEARNING LABS', pageW / 2, y, { align: 'center' });
    y += 12;

    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text('ARIZONA COLLEGE // PATHOPHYSIOLOGY', pageW / 2, y, { align: 'center' });
    y += 6;
    doc.text('A DAY IN THE LIFE OF ALFIE', pageW / 2, y, { align: 'center' });
    y += 14;

    // Divider
    doc.setDrawColor(...GREEN);
    doc.setLineWidth(1);
    doc.line(40, y, pageW - 40, y);
    y += 14;

    // Module title
    doc.setFontSize(20);
    doc.setTextColor(...WHITE);
    doc.text(modLabel, pageW / 2, y, { align: 'center' });
    y += 8;
    doc.setFontSize(12);
    doc.setTextColor(...GREEN);
    doc.text('MODULE QUIZ REPORT', pageW / 2, y, { align: 'center' });
    y += 20;

    // Student info box
    doc.setFillColor(20, 20, 20);
    doc.setDrawColor(...GREEN);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin + 10, y, contentW - 20, 55, 3, 3, 'FD');
    y += 12;
    doc.setFont("courier", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text('OPERATOR', margin + 20, y);
    doc.setTextColor(...WHITE);
    doc.setFontSize(16);
    doc.text(operatorName, margin + 20, y + 10);
    y += 18;
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text('DATE', margin + 20, y);
    doc.text('SCORE', pageW / 2, y);
    y += 6;
    doc.setFontSize(11);
    doc.setTextColor(...WHITE);
    doc.text(dateStr, margin + 20, y);
    // Score with color coding
    if (percentage >= 80) doc.setTextColor(...GREEN);
    else if (percentage >= 60) doc.setTextColor(...CYAN);
    else doc.setTextColor(...RED);
    doc.text(`${modScore} / ${totalSteps}  (${percentage}%)`, pageW / 2, y);
    y += 25;

    // QR Code section
    y += 5;
    doc.setFont("courier", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...GREEN);
    doc.text('VERIFICATION QR CODE', pageW / 2, y, { align: 'center' });
    y += 5;

    // Draw QR placeholder box (actual QR needs image loading which is async — we encode the data as text)
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pageW / 2 - 25, y, 50, 50, 2, 2, 'F');
    // We'll encode verification as a dense text block since we can't async-load QR images in jsPDF synchronously
    doc.setFontSize(4);
    doc.setTextColor(0, 0, 0);
    const codeChunks = verificationCode.match(/.{1,30}/g) || [];
    let qrY = y + 8;
    for (const chunk of codeChunks.slice(0, 10)) {
      doc.text(chunk, pageW / 2, qrY, { align: 'center' });
      qrY += 4;
    }
    y += 55;

    doc.setFontSize(6);
    doc.setTextColor(...GRAY);
    doc.text('Scan or decode to verify completion', pageW / 2, y, { align: 'center' });
    y += 4;
    doc.setFontSize(5);
    doc.text(verificationCode.substring(0, 60) + '...', pageW / 2, y, { align: 'center' });
    y += 14;

    // Topics covered
    doc.setFontSize(9);
    doc.setTextColor(...GREEN);
    doc.text(`TOPICS COVERED: ${rm.length} CORE MECHANISMS`, pageW / 2, y, { align: 'center' });
    y += 6;
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    const topicList = rm.map(r => r.label).join('  //  ');
    const topicLines = doc.splitTextToSize(topicList, contentW - 20);
    for (const line of topicLines) {
      doc.text(line, pageW / 2, y, { align: 'center' });
      y += 4;
    }

    // =============================================
    // PAGE 2+: SECTION-BY-SECTION QUESTION REVIEW
    // =============================================
    newPage();
    
    drawSectionHeader(`${modLabel} — QUESTION-BY-QUESTION REVIEW`);
    
    drawWrappedText(
      `This section reviews every question from the module in order. Each entry shows the scene context, your answer, the correct answer, and the teaching rationale.`,
      8, GRAY, false
    );
    y += 6;

    // Group steps by act
    const actGroups = {};
    pd.forEach((step, idx) => {
      const act = step.act || 'UNKNOWN';
      if (!actGroups[act]) actGroups[act] = [];
      actGroups[act].push({ step, idx });
    });

    let questionNum = 0;
    for (const [actName, steps] of Object.entries(actGroups)) {
      // Act header
      checkSpace(20);
      doc.setFillColor(20, 25, 18);
      doc.rect(margin, y - 2, contentW, 10, 'F');
      doc.setFont("courier", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...GREEN);
      doc.text(actName, margin + 4, y + 5);
      y += 14;

      for (const { step, idx } of steps) {
        questionNum++;
        const histEntry = modHistory.find(h => h.step === idx);
        const wasCorrect = histEntry ? histEntry.correct : null;

        checkSpace(55);

        // Question number + event context
        doc.setFont("courier", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...CYAN);
        doc.text(`Q${questionNum}`, margin, y);
        doc.setTextColor(...GRAY);
        doc.setFont("courier", "normal");
        doc.setFontSize(7);
        doc.text(`${step.day} ${step.time || ''} // ${step.event}`, margin + 16, y);

        // Result badge
        if (wasCorrect === true) {
          doc.setFillColor(0, 60, 15);
          doc.roundedRect(margin + contentW - 25, y - 4, 25, 7, 1, 1, 'F');
          doc.setTextColor(...GREEN);
          doc.setFontSize(6);
          doc.setFont("courier", "bold");
          doc.text('CORRECT', margin + contentW - 23, y);
        } else if (wasCorrect === false) {
          doc.setFillColor(60, 10, 10);
          doc.roundedRect(margin + contentW - 25, y - 4, 25, 7, 1, 1, 'F');
          doc.setTextColor(...RED);
          doc.setFontSize(6);
          doc.setFont("courier", "bold");
          doc.text('INCORRECT', margin + contentW - 24, y);
        } else {
          doc.setTextColor(...GRAY);
          doc.setFontSize(6);
          doc.setFont("courier", "normal");
          doc.text('NOT ATTEMPTED', margin + contentW - 30, y);
        }
        y += 6;

        // Question text
        drawWrappedText(step.q, 8, WHITE, false, 2);
        y += 2;

        // Options
        if (step.opts) {
          for (let oi = 0; oi < step.opts.length; oi++) {
            checkSpace(8);
            const isCorrectOpt = oi === step.ans;
            const prefix = isCorrectOpt ? '✓' : ' ';
            const optColor = isCorrectOpt ? GREEN : GRAY;
            doc.setFont("courier", isCorrectOpt ? "bold" : "normal");
            doc.setFontSize(7);
            doc.setTextColor(...optColor);
            const optLines = doc.splitTextToSize(`${prefix} ${String.fromCharCode(65 + oi)}) ${step.opts[oi]}`, contentW - 10);
            for (const ol of optLines) {
              checkSpace(6);
              doc.text(ol, margin + 6, y);
              y += 4;
            }
          }
        }
        y += 2;

        // Correct answer rationale
        if (step.rationales && step.rationales[step.ans]) {
          checkSpace(14);
          doc.setFillColor(15, 25, 15);
          const ratText = step.rationales[step.ans];
          const ratLines = doc.splitTextToSize(ratText, contentW - 16);
          const ratH = ratLines.length * 4.5 + 6;
          checkSpace(ratH + 4);
          doc.rect(margin + 4, y - 2, contentW - 8, ratH, 'F');
          doc.setDrawColor(...DARK_GREEN);
          doc.setLineWidth(0.8);
          doc.line(margin + 4, y - 2, margin + 4, y - 2 + ratH);
          doc.setFont("courier", "normal");
          doc.setFontSize(6.5);
          doc.setTextColor(180, 255, 180);
          y += 2;
          for (const rl of ratLines) {
            doc.text(rl, margin + 10, y);
            y += 4.5;
          }
          y += 4;
        }

        // Thin separator
        checkSpace(6);
        doc.setDrawColor(40, 40, 40);
        doc.setLineWidth(0.2);
        doc.line(margin + 10, y, margin + contentW - 10, y);
        y += 6;
      }
    }

    // =============================================
    // CLINICAL SUMMARIES SECTION
    // =============================================
    newPage();
    drawSectionHeader(`${modLabel} — CLINICAL SUMMARY PEARLS`);

    drawWrappedText(
      'High-yield mechanism summaries for each core topic covered in this module.',
      8, GRAY, false
    );
    y += 6;

    for (const rig of rm) {
      const summary = cs[rig.id];
      if (!summary) continue;

      checkSpace(40);

      // Topic header
      doc.setFillColor(20, 25, 25);
      doc.rect(margin, y - 2, contentW, 8, 'F');
      doc.setFont("courier", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...CYAN);
      doc.text(rig.label.toUpperCase(), margin + 4, y + 4);
      y += 12;

      // Mechanism
      doc.setFont("courier", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...GREEN);
      doc.text('MECHANISM:', margin + 4, y);
      y += 5;
      drawWrappedText(summary.mechanism, 7, WHITE, false, 4);
      y += 3;

      // Pearl
      doc.setFont("courier", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...GREEN);
      doc.text('CLINICAL PEARL:', margin + 4, y);
      y += 5;
      drawWrappedText(summary.pearl, 7, [255, 255, 180], false, 4);
      y += 5;

      // Separator
      doc.setDrawColor(40, 40, 40);
      doc.setLineWidth(0.2);
      doc.line(margin + 10, y, margin + contentW - 10, y);
      y += 6;
    }

    // =============================================
    // MODULE QUIZ BANK SECTION
    // =============================================
    if (qd && qd.length > 0) {
      newPage();
      drawSectionHeader(`${modLabel} — MODULE QUIZ BANK (${qd.length} QUESTIONS)`);

      drawWrappedText(
        'Standalone quiz questions covering all module topics. Use these for additional self-assessment.',
        8, GRAY, false
      );
      y += 6;

      qd.forEach((q, qi) => {
        checkSpace(40);

        // Question header
        doc.setFont("courier", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...CYAN);
        doc.text(`QUIZ Q${qi + 1}`, margin, y);
        y += 6;

        // Question text
        drawWrappedText(q.q, 8, WHITE, false, 2);
        y += 2;

        // Options
        if (q.opts) {
          for (let oi = 0; oi < q.opts.length; oi++) {
            checkSpace(8);
            const isCorrectOpt = oi === q.ans;
            const prefix = isCorrectOpt ? '✓' : ' ';
            const optColor = isCorrectOpt ? GREEN : GRAY;
            doc.setFont("courier", isCorrectOpt ? "bold" : "normal");
            doc.setFontSize(7);
            doc.setTextColor(...optColor);
            const optLines = doc.splitTextToSize(`${prefix} ${String.fromCharCode(65 + oi)}) ${q.opts[oi]}`, contentW - 10);
            for (const ol of optLines) {
              checkSpace(6);
              doc.text(ol, margin + 6, y);
              y += 4;
            }
          }
        }
        y += 2;

        // Rationale for correct answer
        const rationale = q.rationales ? q.rationales[q.ans] : q.rationale;
        if (rationale) {
          checkSpace(14);
          doc.setFillColor(15, 25, 15);
          const ratLines = doc.splitTextToSize(rationale, contentW - 16);
          const ratH = ratLines.length * 4.5 + 6;
          checkSpace(ratH + 4);
          doc.rect(margin + 4, y - 2, contentW - 8, ratH, 'F');
          doc.setDrawColor(...DARK_GREEN);
          doc.setLineWidth(0.8);
          doc.line(margin + 4, y - 2, margin + 4, y - 2 + ratH);
          doc.setFont("courier", "normal");
          doc.setFontSize(6.5);
          doc.setTextColor(180, 255, 180);
          y += 2;
          for (const rl of ratLines) {
            doc.text(rl, margin + 10, y);
            y += 4.5;
          }
          y += 4;
        }

        // Separator
        checkSpace(6);
        doc.setDrawColor(40, 40, 40);
        doc.setLineWidth(0.2);
        doc.line(margin + 10, y, margin + contentW - 10, y);
        y += 6;
      });
    }

    // =============================================
    // FINAL PAGE: SCORE SUMMARY + VERIFICATION
    // =============================================
    newPage();
    y = 50;

    doc.setFont("courier", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...GREEN);
    doc.text('COMPLETION VERIFICATION', pageW / 2, y, { align: 'center' });
    y += 14;

    doc.setDrawColor(...GREEN);
    doc.setLineWidth(0.8);
    doc.line(40, y, pageW - 40, y);
    y += 14;

    // Summary box
    doc.setFillColor(20, 20, 20);
    doc.setDrawColor(...GREEN);
    doc.roundedRect(margin + 15, y, contentW - 30, 70, 3, 3, 'FD');
    y += 14;

    const summaryRows = [
      ['OPERATOR', operatorName],
      ['MODULE', modLabel],
      ['MISSION SCORE', `${modScore} / ${totalSteps} (${percentage}%)`],
      ['DATE COMPLETED', dateStr],
      ['INLINE QUESTIONS', `${totalSteps} scenario-based`],
      ['QUIZ BANK', `${qd.length} additional questions`]
    ];

    for (const [label, value] of summaryRows) {
      doc.setFont("courier", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...GRAY);
      doc.text(label, margin + 25, y);
      doc.setFont("courier", "bold");
      doc.setTextColor(...WHITE);
      doc.text(value, margin + 80, y);
      y += 9;
    }

    y += 20;

    // Verification QR block
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pageW / 2 - 22, y, 44, 44, 2, 2, 'F');
    doc.setFontSize(3.5);
    doc.setTextColor(0, 0, 0);
    const codeChunks2 = verificationCode.match(/.{1,26}/g) || [];
    let qrY2 = y + 6;
    for (const chunk of codeChunks2.slice(0, 10)) {
      doc.text(chunk, pageW / 2, qrY2, { align: 'center' });
      qrY2 += 3.5;
    }
    y += 50;

    doc.setFontSize(7);
    doc.setTextColor(...GREEN);
    doc.text('VERIFICATION CODE:', pageW / 2, y, { align: 'center' });
    y += 5;
    doc.setFontSize(5);
    doc.setTextColor(...GRAY);
    // Split verification code into readable lines
    const codeDisplayLines = verificationCode.match(/.{1,50}/g) || [];
    for (const cl of codeDisplayLines) {
      doc.text(cl, pageW / 2, y, { align: 'center' });
      y += 4;
    }

    y += 10;
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    doc.text('This document was generated by Dr. Modali Learning Labs.', pageW / 2, y, { align: 'center' });
    y += 5;
    doc.text('Verification codes can be decoded to confirm authenticity.', pageW / 2, y, { align: 'center' });

    doc.save(`DrModali_Module${modId}_Quiz_${operatorName}.pdf`);
  };

  const handleModuleSelect = (id) => {
    setActiveModule(id);
    setCurrentStep(0);
    setScore(0);
    setHistory([]);
    // Reset location tracking for new module
    visitedLocationsRef.current = new Set();
    prevLocationRef.current = null;
    setShowStinger(true);
    setTimeout(() => setScreen('briefing'), 800);
    setTimeout(() => setShowStinger(false), 3000);
  };

  const renderContent = () => {
    switch (screen) {
      case 'splash_brand':
        return e('div', { className: 'splash-screen' },
          e('h1', { className: 'splash-main matrix-text crt-glow brand-fuzz-in', style: { letterSpacing: '15px', textAlign: 'center' } }, 'DR. MODALI LEARNING LABS')
        );
      case 'splash_brand_replay':
        return e('div', { className: 'splash-screen' },
          e('h1', { className: 'splash-main matrix-text crt-glow brand-splash-anim' }, 'DR. MODALI LEARNING LABS')
        );

      case 'splash1':
        return e('div', { className: `splash-screen ${isFading ? 'fade-out' : 'fade-in'}` },
          e('div', { className: 'splash-content' },
            e('div', { className: 'splash-sub matrix-text' }, 'DR. MODALI LEARNING LABS'),
            e('h1', { className: 'splash-main matrix-text' }, 'PATHOPHYSIOLOGY'),
            e('div', { className: 'splash-sub matrix-text' }, 'ARIZONA COLLEGE'),
            e('div', { className: 'splash-desc matrix-text' }, 'A DAY IN THE LIFE OF ALFIE'),
            e('div', { className: 'splash-divider' }),
            e('button', { className: 'btn-enter-life matrix-text', onClick: handleEnterHub }, 'ENTER THE LIFE OF ALFIE')
          )
        );

      case 'hub':
        return e(ModuleHub, { operatorName, onSelect: handleModuleSelect });

      case 'identity':
        return e(IdentityScreen, {
          operatorName, setOperatorName,
          onRestore: (code) => {
            try {
              const data = JSON.parse(atob(code));
              setOperatorName(data.name || operatorName);
              setActiveModule(data.mod || 1);
              setCurrentStep(data.step || 0);
              setScore(data.score || 0);
              setHistory(data.history || []);
              visitedLocationsRef.current = new Set();
              prevLocationRef.current = null;
              transitionTo('lab');
            } catch (e) {
              console.error("Invalid Code", e);
            }
          },
          onContinue: () => transitionTo('hub')
        });

      case 'briefing':
        return e(MissionBriefing, { activeModule, onBegin: () => transitionTo('lab') });

      case 'lab':
        return e(Game2D, {
          activeModule,
          currentStep,
          operatorName,
          score,
          onInteract: () => setScreen('quiz'),
          onSave: saveProgress,
          visitedLocationsRef,
          prevLocationRef
        });

      case 'quiz':
        const { pathophysiologyData } = getModuleData(activeModule);
        const step = pathophysiologyData[currentStep];
        const totalPossible = pathophysiologyData.length;
        const currentPercentage = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;
        const isLocked = lockedAnswer !== null;

        const getOptClass = (i) => {
          let cls = 'btn-cyber quiz-opt';
          if (isLocked) {
            // After lock-in: always show correct answer green, wrong answers red
            if (i === step.ans) cls += ' correct';
            else if (i === lockedAnswer && lockedAnswer !== step.ans) cls += ' wrong';
            // Mark the student's locked choice
            if (i === lockedAnswer) cls += ' locked-selection';
          }
          // Highlight whichever option is currently being reviewed
          if (quizChoice === i) cls += ' reviewing';
          return cls;
        };

        return e('div', { className: 'quiz-overlay fade-in' },
          e('div', { className: 'score-tally-box' }, 
            e('div', { className: 'matrix-text' }, `SCORE: ${score} / ${totalPossible}`),
            e('div', { className: 'matrix-text', style: { fontSize: '0.8rem', opacity: 0.8 } }, `${currentPercentage}% ACCURACY`)
          ),
          e('div', { className: 'quiz-modal' },
            e('div', { className: 'quiz-scroll-area' },
              e('div', { className: 'matrix-text', style: { borderBottom: '1px solid var(--matrix-green)', paddingBottom: '8px', marginBottom: '15px', fontSize: '0.9rem' } }, 
                isLocked ? 'ANSWER LOCKED — TAP ANY OPTION TO REVIEW ITS RATIONALE' : 'SIT AND THINK'
              ),
              e('p', { className: 'quiz-question' }, step.q),
              e('div', { className: 'quiz-options' },
                step.opts.map((opt, i) => e('button', {
                  key: i,
                  className: getOptClass(i),
                  onClick: () => {
                    if (!isLocked) {
                      setLockedAnswer(i);
                      const isCorrect = i === step.ans;
                      if (isCorrect) setScore(s => s + 1);
                      setHistory(h => [...h, { step: currentStep, correct: isCorrect }]);
                    }
                    setQuizChoice(i);
                    setShowRationale(true);
                  }
                }, 
                  e('span', { className: 'quiz-opt-number' }, `${i + 1}`),
                  e('span', { className: 'quiz-opt-text' }, opt),
                  isLocked && i === lockedAnswer && e('span', { className: 'quiz-your-answer-badge' }, 'YOUR ANSWER'),
                  isLocked && i === step.ans && i !== lockedAnswer && e('span', { className: 'quiz-correct-badge' }, 'CORRECT')
                ))
              ),
              showRationale && e('div', { className: `feedback-rationale ${quizChoice === step.ans ? 'rationale-correct' : 'rationale-wrong'}` }, 
                e('div', { className: 'rationale-header' }, 
                  e('span', null, `REVIEWING: `),
                  e('strong', null, step.opts[quizChoice])
                ),
                e('div', { className: 'rationale-body' }, step.rationales[quizChoice])
              ),
              isLocked && e('button', { className: 'btn-cyber quiz-continue-btn', autoFocus: true, onClick: () => {
                setQuizChoice(null);
                setLockedAnswer(null);
                setShowRationale(false);
                if (currentStep < pathophysiologyData.length - 1) {
                  setCurrentStep(s => s + 1);
                  setScreen('lab');
                } else {
                  setScreen('complete');
                }
              }}, 'CONTINUE [SPACE]')
            )
          )
        );

      case 'complete':
        return e('div', { className: 'splash-screen fade-in' },
          e('div', { className: 'identity-panel', style: { textAlign: 'center' } },
            e('h1', { className: 'matrix-text crt-glow', style: { fontSize: '2rem', marginBottom: '30px' } }, `MODULE ${activeModule} COMPLETE`),
            e('div', { className: 'alfie-portrait', style: { backgroundImage: `url(${APP_CONFIG.ASSETS.ALFIE_PORTRAIT})` } }),
            e('div', { style: { fontSize: '1.2rem', margin: '20px 0' } }, 
              e('div', { className: 'matrix-text' }, `OPERATOR: ${operatorName}`),
              e('div', { style: { marginTop: '10px', color: '#fff' } }, `MISSION SCORE: ${score}`)
            ),
            e('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center' } },
              e('button', { className: 'btn-cyber', onClick: () => generatePDF(activeModule) }, 'DOWNLOAD QUIZ REPORT'),
              e('button', { className: 'btn-cyber', onClick: () => setScreen('hub') }, 'RETURN TO HUB')
            )
          )
        );

      default:
        return e('div', null, "Coming Soon...");
    }
  };

  const debugJumpToStep = (stepNum) => {
    const { pathophysiologyData: pd } = getModuleData(activeModule);
    const clamped = Math.max(0, Math.min(stepNum, pd.length - 1));
    setCurrentStep(clamped);
    setQuizChoice(null);
    setLockedAnswer(null);
    setShowRationale(false);
    visitedLocationsRef.current = new Set();
    prevLocationRef.current = null;
    setScreen('lab');
  };

  const debugJumpToQuiz = () => {
    setScreen('quiz');
  };

  const debugCompleteModule = () => {
    setScreen('complete');
  };

  return e('div', { className: 'app-root' },
    e('div', { className: 'crt-frame' },
      e('div', { className: 'scanlines' }),
      e('div', { className: 'utility-tray' },
        e('button', { 
          className: 'btn-utility', 
          onClick: saveProgress,
          title: 'Save Progress'
        }, 'SAVE PROGRESS'),
        e('button', { 
          className: 'btn-utility', 
          onClick: () => setMusicOn(!musicOn),
          title: musicOn ? 'Mute' : 'Unmute'
        }, musicOn ? 'AUDIO: ON' : 'AUDIO: OFF')
      ),
      renderContent(),
      showStinger && e(MatrixStinger, { onComplete: () => {} })
    ),

    // DEBUG PANEL — toggled by backtick key
    showDebug && e(DebugPanel, {
      screen,
      activeModule,
      currentStep,
      score,
      operatorName,
      onClose: () => setShowDebug(false),
      onJumpStep: debugJumpToStep,
      onJumpQuiz: debugJumpToQuiz,
      onComplete: debugCompleteModule,
      onSwitchModule: (modId) => {
        setActiveModule(modId);
        setCurrentStep(0);
        setScore(0);
        setHistory([]);
        visitedLocationsRef.current = new Set();
        prevLocationRef.current = null;
        setScreen('lab');
      },
      onGeneratePDF: generatePDF,
      onSetScore: setScore,
      getModuleData
    })
  );
}

function DiagramRenderer({ diagram = [] }) {
  if (!diagram) return null;
  return e('div', { className: 'diagram-layer' },
    diagram.map((item, idx) => {
      if (item.type === 'node') {
        const isMedical = item.isMedical !== false;
        return e('div', { 
          key: idx, 
          className: `diagram-node ${isMedical ? 'medical-node' : 'story-node'}`, 
          style: { left: `${item.x}%`, top: `${item.y}%` } 
        },
          e('div', { className: isMedical ? 'node-content-wrap' : 'node-story-wrap' },
            e('div', { className: item.shape === 'box' ? 'node-box' : 'node-circle' }, 
              item.shape === 'box' ? item.label : ''
            ),
            item.shape === 'circle' && e('div', { className: 'node-label' }, item.label)
          )
        );
      }
      if (item.type === 'arrow') {
        const dx = item.to.x - item.from.x;
        const dy = item.to.y - item.from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        const buffer = 20; 
        const finalWidth = Math.max(0, distance - buffer); 
        
        return e('div', { 
          key: idx, 
          className: 'diagram-arrow', 
          style: { 
            left: `${item.from.x + (dx * (buffer/2/distance))}%`, 
            top: `${item.from.y + (dy * (buffer/2/distance))}%`, 
            width: `${finalWidth}%`, 
            transform: `rotate(${angle}deg)` 
          } 
        });
      }
      if (item.type === 'text') {
        return e('div', { 
          key: idx, 
          className: 'moa-text', 
          style: { left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' } 
        }, item.label);
      }
      return null;
    })
  );
}

function BuildingIntro({ location, locationName, characters = [], onComplete }) {
  const [phase, setPhase] = useState('exterior');
  const bg = APP_CONFIG.ASSETS.BACKGROUNDS[location] || APP_CONFIG.ASSETS.BACKGROUNDS.home;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('interior'), 1000);
    const t2 = setTimeout(() => setPhase('ready'), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Keyboard: SPACE/ENTER to skip phases or begin encounter
  useEffect(() => {
    const handleKey = (ev) => {
      if (ev.code === 'Space' || ev.code === 'Enter') {
        ev.preventDefault();
        if (phase === 'exterior') setPhase('interior');
        else if (phase === 'interior') setPhase('ready');
        else onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, onComplete]);

  return e('div', { className: 'building-intro-overlay' },
    e('div', { className: `intro-view ${phase === 'exterior' ? 'active' : ''}`, style: { backgroundImage: `url(${bg.exterior})` } }),
    e('div', { className: `intro-view ${phase !== 'exterior' ? 'active' : ''}`, style: { backgroundImage: `url(${bg.interior})` } }),
    
    e('div', { className: 'intro-label-box' },
      e('div', { className: 'intro-subtitle matrix-text' }, phase === 'exterior' ? 'APPROACHING...' : 'ENTERING...'),
      e('div', { className: 'intro-title matrix-text' }, locationName.toUpperCase()),
      
      phase === 'ready' && e('div', { className: 'fade-in' },
        e('div', { className: 'matrix-text', style: { marginTop: '10px', fontSize: '0.8rem', opacity: 0.6 } }, 'CHARACTERS PRESENT:'),
        e('div', { className: 'intro-character-preview' },
          characters.map((char, i) => e('div', { 
            key: i, 
            className: 'intro-sprite-mini jrpg-sprite-entrance', 
            style: { animationDelay: `${i * 0.2}s` }
          }, 
            char.image && e('img', { 
              src: char.image, 
              style: { height: '100%', objectFit: 'contain' } 
            }),
            e('div', { className: 'mini-char-name' }, char.name.split(' ')[0])
          ))
        ),
        e('div', { style: { marginTop: '30px', display: 'flex', justifyContent: 'center' } },
          e('button', { 
            className: 'btn-cyber', 
            style: { width: '100%', minWidth: '300px' }, 
            onClick: onComplete 
          }, 'BEGIN ENCOUNTER [SPACE]')
        )
      )
    )
  );
}

function CharacterRenderer({ name, isTalking, imageUrl, isEntering, isHidden, isDancing }) {
  if (isHidden || !imageUrl) return null;
  
  return e('div', { 
    className: `jrpg-sprite-container ${isTalking ? 'active jrpg-talk-pulse' : 'inactive jrpg-breathing'} ${isEntering ? 'jrpg-sprite-entrance' : ''} ${isDancing ? 'jrpg-dancing' : ''}`,
  },
    isTalking && e('div', { className: 'speaker-name-tag' }, name.toUpperCase()),
    e('img', { 
      src: imageUrl, 
      alt: name, 
      style: { width: '100%', height: '100%', objectFit: 'contain' }
    })
  );
}

function EmojiHUD({ score, total, onSecretClick }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  let emoji = "😐"; // Default
  let label = "NEUTRAL";
  let emojiClass = "emoji-neutral";

  if (percentage >= 100) {
    emoji = "🤩";
    label = "IRRATIONALLY EXUBERANT";
    emojiClass = "emoji-exuberant";
  } else if (percentage >= 95) {
    emoji = "🥳";
    label = "ECSTATIC";
    emojiClass = "emoji-ecstatic";
  } else if (percentage >= 90) {
    emoji = "😊";
    label = "FULL SMILE";
    emojiClass = "emoji-happy";
  } else if (percentage >= 80) {
    emoji = "🙂";
    label = "HALF SMILE";
    emojiClass = "emoji-smile";
  } else if (percentage >= 70) {
    emoji = "😐";
    label = "NEUTRAL FACE";
    emojiClass = "emoji-neutral";
  }

  return e('div', { className: `emoji-hud-wrap ${emojiClass}`, onClick: percentage >= 100 ? onSecretClick : undefined },
    e('div', { className: 'emoji-icon' }, emoji),
    e('div', { className: 'emoji-label matrix-text' }, label)
  );
}

function Game2D({ activeModule, currentStep, operatorName, score, onInteract, onSave, visitedLocationsRef, prevLocationRef }) {
  const { pathophysiologyData, npcData, worldLocations } = getModuleData(activeModule);
  const step = pathophysiologyData[currentStep];
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [isEnteringScene, setIsEnteringScene] = useState(false);
  const [isExuberant, setIsExuberant] = useState(false);
  
  // Track the previous speaker so we can show them as "listener" on the left
  const prevSpeakerRef = useRef(null);

  // Keyboard controls for narrative
  useEffect(() => {
    const handleKey = (ev) => {
      if (showIntro) return;
      const beats = Array.isArray(step.beats) ? step.beats : [{ text: step.txt, diagram: [], speaker: null }];
      const isFinal = currentBeatIndex === beats.length - 1;

      if (ev.code === 'Space' || ev.key === ' ') {
        ev.preventDefault();
        if (!isFinal) setCurrentBeatIndex(i => i + 1);
      }
      if ((ev.code === 'KeyF' || ev.key === 'f' || ev.key === 'F') && isFinal) {
        ev.preventDefault();
        onInteract();
      }
      if (ev.code === 'KeyS' || ev.key === 's' || ev.key === 'S') {
        ev.preventDefault();
        onSave();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showIntro, currentBeatIndex, step, onInteract, onSave]);

  const beats = useMemo(() => {
    if (Array.isArray(step.beats)) return step.beats;
    return [{ text: step.txt, diagram: [], speaker: null }];
  }, [step]);

  const currentBeat = beats[currentBeatIndex];
  const speakerKey = (currentBeat.speaker || '').toLowerCase();
  
  // Determine the listener: the previous speaker if different from current
  const listenerKey = useMemo(() => {
    if (!speakerKey) return null;
    // Walk backwards through beats to find a different speaker
    for (let i = currentBeatIndex - 1; i >= 0; i--) {
      const prevBeatSpeaker = (beats[i].speaker || '').toLowerCase();
      if (prevBeatSpeaker && prevBeatSpeaker !== speakerKey) {
        return prevBeatSpeaker;
      }
    }
    // Also check the ref from a previous step's conversation
    if (prevSpeakerRef.current && prevSpeakerRef.current !== speakerKey) {
      return prevSpeakerRef.current;
    }
    return null;
  }, [speakerKey, currentBeatIndex, beats]);
  
  // Update prevSpeaker ref when speaker changes
  useEffect(() => {
    if (speakerKey) {
      prevSpeakerRef.current = speakerKey;
    }
  }, [speakerKey]);

  // Is dialogue mode active? (a named character is speaking)
  const isDialogueMode = !!speakerKey;

  // Find character data for speaker and listener
  const findCharData = (key) => {
    if (!key) return null;
    if (key === 'alfie') return { name: 'Alfie', image: APP_CONFIG.ASSETS.ALFIE_PORTRAIT, id: 'alfie' };
    const npc = npcData.find(n => n.id === key);
    if (npc) return { name: npc.name, image: npc.image, id: npc.id };
    return null;
  };

  const speakerData = findCharData(speakerKey);
  const listenerData = findCharData(listenerKey);

  useEffect(() => {
    setCurrentBeatIndex(0);

    const alreadyVisited = visitedLocationsRef.current.has(step.location);
    const locationChanged = step.location !== prevLocationRef.current;

    // Update the previous location tracker
    prevLocationRef.current = step.location;

    if (!alreadyVisited) {
      // Brand new location — show full building intro
      setShowIntro(true);
      return;
    }

    if (locationChanged) {
      // Returning to a visited location — brief entrance animation, NO full intro
      setIsEnteringScene(true);
      const timer = setTimeout(() => setIsEnteringScene(false), 800);
      return () => clearTimeout(timer);
    }
    // Same location as previous step — no animation, no intro
  }, [currentStep, step.location]);

  const isFinalBeat = currentBeatIndex === beats.length - 1;

  // NPCs appear based on STEP NUMBER ONLY — location field on NPC is irrelevant
  const activeNPCs = useMemo(() => {
    return npcData.filter(n => (n.steps || []).includes(currentStep));
  }, [currentStep, npcData]);

  const locationData = worldLocations.find(l => l.id === step.location);
  const bg = APP_CONFIG.ASSETS.BACKGROUNDS[step.location] || APP_CONFIG.ASSETS.BACKGROUNDS.home;

  const sceneCharacters = useMemo(() => {
    const list = [{ name: 'Alfie', image: APP_CONFIG.ASSETS.ALFIE_PORTRAIT, id: 'alfie' }];
    activeNPCs.forEach(n => {
      if (n.image) list.push({ name: n.name, image: n.image, id: n.id });
    });
    return list;
  }, [activeNPCs]);

  if (showIntro) {
    return e(BuildingIntro, {
        location: step.location,
        locationName: locationData ? locationData.label : step.location,
        characters: sceneCharacters,
        onComplete: () => {
          setShowIntro(false);
          visitedLocationsRef.current.add(step.location);
        }
    });
  }

  // Speaker display name (clean up for display)
  const speakerDisplayName = speakerData ? speakerData.name.split(' ')[0].toUpperCase() : null;

  return e('div', { className: `game-container mode-rpg ${isExuberant ? 'exuberant-mode' : ''}` },
    e('div', { className: 'hud-status-stamp' },
      e('div', { className: 'hud-stamp-top' },
        e('div', { className: 'hud-label' }, `${step.day.toUpperCase()} // ${step.time || '08:00 AM'}`),
        e('div', { className: 'hud-value' }, step.event.toUpperCase())
      ),
      e('div', { className: 'hud-stamp-sub' },
        e('div', { className: 'hud-label' }, `SECTION: ${step.act.toUpperCase()}`)
      ),
      e('div', { className: 'hud-label', style: { marginTop: '15px', borderTop: '1px solid rgba(0,255,65,0.3)', paddingTop: '5px' } }, `OPERATOR: ${operatorName}`)
    ),

    e('div', { className: 'top-score-box' },
      e(EmojiHUD, { 
        score, 
        total: pathophysiologyData.length,
        onSecretClick: () => setIsExuberant(!isExuberant)
      }),
      e('div', { className: 'matrix-text', style: { marginTop: '10px' } }, `SCORE: ${score} / ${pathophysiologyData.length}`),
      e('div', { className: 'matrix-text', style: { fontSize: '0.7rem', opacity: 0.7 } }, `${Math.round((score / Math.max(1, pathophysiologyData.length)) * 100)}%`)
    ),

    e('div', { className: `rpg-viewport ${isDialogueMode ? 'dialogue-active' : ''}` },
      e('div', { 
        className: 'viewport-bg', 
        style: { backgroundImage: `url(${bg.interior})` } 
      }),

      e('div', { className: 'moa-center-anchor' },
        e('div', { className: 'diagram-tint-panel' }),
        e('div', { className: 'data-rain-layer' }),
        e(DiagramRenderer, { diagram: currentBeat.diagram })
      ),

      // JRPG Dialogue Portrait Overlay — large bust-up portraits flanking the viewport
      isDialogueMode && e('div', { className: 'dialogue-portraits' },
        // LEFT SLOT: Listener (previous speaker or addressed character)
        e('div', { className: `portrait-slot left ${listenerData ? '' : 'empty'}` },
          listenerData && e('div', { 
            key: listenerData.id, 
            className: 'portrait-bust listening' 
          },
            e('img', { src: listenerData.image, alt: listenerData.name }),
            e('div', { className: 'portrait-name-tag' }, listenerData.name.split(' ')[0].toUpperCase())
          )
        ),
        // RIGHT SLOT: Active Speaker
        e('div', { className: 'portrait-slot right' },
          speakerData && e('div', { 
            key: speakerData.id + '-' + currentBeatIndex, 
            className: 'portrait-bust speaking' 
          },
            e('img', { src: speakerData.image, alt: speakerData.name }),
            e('div', { className: 'portrait-name-tag' }, speakerDisplayName)
          )
        )
      ),

      // Normal staging area — hidden when dialogue portraits are active
      e('div', { className: `staging-area ${isDialogueMode ? 'dialogue-hidden' : ''}` },
        sceneCharacters.map((char) => 
          e(CharacterRenderer, { 
            key: char.id,
            name: char.name.split(' ')[0],
            isTalking: speakerKey === char.id,
            imageUrl: char.image,
            isEntering: isEnteringScene,
            isDancing: char.id === 'alfie' && step.costume === 'dj'
          })
        )
      )
    ),

    e('div', { className: 'narrative-tray' },
      // Speaker name label on the dialogue box (like the JRPG reference)
      speakerDisplayName && e('div', { className: 'narrative-speaker-label' }, speakerDisplayName),
      e('div', { className: 'narrative-tray-inner' },
        e('div', { className: 'narrative-text-area' }, currentBeat.text),
        e('div', { className: 'narrative-button-zone' },
          !isFinalBeat && e('button', { className: 'btn-cyber', onClick: () => setCurrentBeatIndex(i => i + 1) }, 'NEXT [SPACE]'),
          isFinalBeat && e('button', { className: 'btn-cyber', onClick: onInteract }, 'THINK [F]'),
          e('button', { 
            className: 'btn-cyber btn-cyber-small', 
            style: { marginTop: '10px', opacity: 0.5, fontSize: '0.7rem' },
            onClick: onSave 
          }, 'SAVE [S]')
        )
      )
    )
  );
}

const root = createRoot(document.getElementById('root'));
root.render(e(App));
