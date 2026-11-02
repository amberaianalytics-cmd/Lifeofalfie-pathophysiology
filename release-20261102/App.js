import "./debug-logger.js";
// Dr. Modali Learning Labs - App Entry Point
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { jsPDF } from "jspdf";

// --- CORE APP ENTRY ---
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

import { 
  MODULE3_RIG_METADATA, 
  MODULE3_QUIZ_DATA, 
  MODULE3_CLINICAL_SUMMARIES, 
  MODULE3_PATHOPHYSIOLOGY_DATA, 
  MODULE3_NPC_DATA, 
  MODULE3_WORLD_LOCATIONS 
} from './module3-content.js';

import { 
  MODULE4_RIG_METADATA, 
  MODULE4_QUIZ_DATA, 
  MODULE4_CLINICAL_SUMMARIES, 
  MODULE4_PATHOPHYSIOLOGY_DATA, 
  MODULE4_NPC_DATA, 
  MODULE4_WORLD_LOCATIONS 
} from './module4-content.js';

import { 
  MODULE5_RIG_METADATA, 
  MODULE5_QUIZ_DATA, 
  MODULE5_CLINICAL_SUMMARIES, 
  MODULE5_PATHOPHYSIOLOGY_DATA, 
  MODULE5_NPC_DATA, 
  MODULE5_WORLD_LOCATIONS 
} from './module5-content.js';

import { 
  MODULE6_RIG_METADATA, 
  MODULE6_QUIZ_DATA, 
  MODULE6_CLINICAL_SUMMARIES, 
  MODULE6_PATHOPHYSIOLOGY_DATA, 
  MODULE6_NPC_DATA, 
  MODULE6_WORLD_LOCATIONS 
} from './module6-content.js';

import { 
  MODULE7_RIG_METADATA, 
  MODULE7_QUIZ_DATA, 
  MODULE7_CLINICAL_SUMMARIES, 
  MODULE7_PATHOPHYSIOLOGY_DATA, 
  MODULE7_NPC_DATA, 
  MODULE7_WORLD_LOCATIONS 
} from './module7-content.js';

import Module3Engine from './Module3Engine.js';
import Module1Engine from './Module1Engine.js';
import Module4Engine from './Module4Engine.js';
import Module5Engine from './Module5Engine.js';
import Module6Engine from './Module6Engine.js';
import Module7Engine from './Module7Engine.js';
import PracticeMidtermEngine from './PracticeMidtermEngine.js';
import FinalExamEngine from './FinalExamEngine.js';
import MidtermNexusComponent from './MidtermNexusComponent.js';
import Protocol150Component from './Protocol150Component.js';
import { MIDTERM_NEXUS_QUESTIONS } from './MidtermNexusData.js';
import { RECALL_DECKS } from './src/data/RecallDecks.js';

import StarField from './src/StarField.js';
import ImmuneDefenseMiniGame from './src/ImmuneDefenseMiniGame.js'; 
import AdaptiveRecallUI from './AlfieAdaptiveRecall.js';
import AlfieMetabolicAdventure from './AlfieMetabolicAdventure.js';

import * as Tone from 'tone';

import Module3NexusGame from './src/Module3NexusGame.js';
import { RetroAudio } from './src/systems/RetroAudio.js';
import QuizNexus from './QuizNexus.js';
import { QUIZ_NEXUS_CONFIG } from './QuizNexusData.js';

const e = React.createElement;

// --- CONFIGURATION ---
export const APP_CONFIG = {
  TITLE: "DR. MODALI LEARNING LABS",
  SUBTITLE: "A DAY IN THE LIFE OF ALFIE",
  ASSETS: {
    TITLE_MUSIC: "assets/titletrack.mp3",
    HUB_MUSIC: "assets/gvl1.mp3",
    MOD4A: "assets/mod4a.mp3",
    MOD4B: "assets/mod4b.mp3",
    MOD4C: "assets/mod4c.mp3",
    MOD4D: "assets/mod4d.mp3",
    MOD1_MUSIC: "assets/loam2a.mp3",
    MOD2_MUSIC: "assets/loam2b.mp3",
    MOD3_ROOTSDUB1: "assets/rootsdub1.mp3",
    MOD3_SALSA1: "assets/salsa1.mp3",
    MOD3_SALSA2: "assets/salsa2.mp3",
    MOD3_REGGAE1: "assets/reggae1.mp3",
    MOD3_REGGAE2: "assets/reggae2.mp3",
    MOD3_BOSS1: "assets/boss1.mp3",
    MOD3_BOSS2: "assets/boss2.mp3",
    MOD3_MELLOW1: "assets/mellowtechno1.mp3", 
    MOD3_MELLOW2: "assets/mellowtechno2.mp3",
    STORM_MUSIC: "assets/alfitechno5.mp3",
    ALFIE_PORTRAIT: "assets/alfie-south-indian-sprite.webp",
    ALFIE_SPRITES: {
      GUITAR: "assets/alfie_guitar.webp",
      DRUMS: "assets/alfie_drums.webp",
      SINGER: "assets/alfie_singer.webp",
      MARACAS: "assets/alfie_maracas.webp",
      TRUMPET: "assets/alfie_trumpet.webp"
    },
    BELINDA_PORTRAIT: "assets/belinda-curvy-sprite.webp",
    MAYA_PORTRAIT: "assets/maya-tall-sprite.webp",
    KENJI_PORTRAIT: "assets/kenji-stocky-sprite.webp",
    BACKGROUNDS: {
        festival: {
            exterior: "assets/festival-exterior.webp",
            interior: "assets/festival-interior.webp"
        },
        home: {
            exterior: "assets/home-exterior.webp",
            interior: "assets/home-interior.webp"
        },
        tacobell: {
            exterior: "assets/tacobell-exterior.webp",
            interior: "assets/tacobell-interior.webp"
        },
        mcdonalds: {
            exterior: "assets/mcdonalds-exterior.webp",
            interior: "assets/mcdonalds-interior.webp"
        },
        clinic: {
            exterior: "assets/modali-clinic-exterior-v2.webp",
            interior: "assets/clinic-interior.webp"
        },
        atrium: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-atrium-interior-v2.webp"
        },
        conference_room: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/clinic-interior.webp"
        },
        allergy_wing: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-allergy-clinic-webp.webp"
        },
        hematology_lab: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-hematology-lab-webp.webp"
        },
        cafeteria: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-cafeteria-webp.webp"
        },
        dermatology_clinic: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-allergy-clinic-webp.webp"
        },
        internal_medicine_ward: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-internal-medicine-ward-webp.webp"
        },
        rheumatology_clinic: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-rheumatology-clinic-webp.webp"
        },
        pediatric_conference_room: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-lecture-hall-webp.webp"
        },
        pediatric_immunology_unit: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-pediatric-immunology-webp.webp"
        },
        infectious_disease_clinic: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-infectious-disease-clinic-webp.webp"
        },
        infectious_disease_ward: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-infectious-disease-ward-webp.webp"
        },
        oncology_amphitheater: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-oncology-lecture-webp.webp"
        },
        hematopathology_lab: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-hematology-lab-webp.webp"
        },
        hematology_reading_room: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-clinical-lab-review-webp.webp"
        },
        pathology_teaching_suite: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-pathology-suite-webp.webp"
        },
        pathology_consultation_room: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-pathology-suite-webp.webp"
        },
        hematology_teaching_room: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-hematology-teaching-webp.webp"
        },
        clinical_lab_review: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-clinical-lab-review-webp.webp"
        },
        hematology_ward: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-hematology-ward-webp.webp"
        },
        obstetrics_consultation: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-obstetrics-consultation-webp.webp"
        },
        emergency_case_conference: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-emergency-trauma-webp.webp"
        },
        hemostasis_lab: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-hemostasis-lab-webp.webp"
        },
        emergency_room: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-emergency-trauma-webp.webp"
        },
        gastro_consult: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-gastro-consult-webp.webp"
        },
        alfie_kitchen: {
            exterior: "assets/home-exterior.webp",
            interior: "assets/alfie-kitchen-webp.webp"
        },
        belinda_home: {
            exterior: "assets/home-exterior.webp",
            interior: "assets/belinda-living-room-webp.webp"
        },
        park: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-park-webp.webp"
        },
        market: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/westbridge-market-v2.webp"
        },
        taco_cart: {
            exterior: "assets/westbridge-atrium-exterior-webp.webp",
            interior: "assets/northbridge-taco-cart-webp.webp"
        },
        intensive_care_unit: {
            exterior: "assets/medical-center-exterior.webp",
            interior: "assets/hospital-icu-interior.webp"
        },
        operating_room: {
            exterior: "assets/medical-center-exterior.webp",
            interior: "assets/operating-room-interior.webp"
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
  if (modId === 2) {
    return {
      rigMetadata: MODULE2_RIG_METADATA,
      quizData: MODULE2_QUIZ_DATA,
      clinicalSummaries: MODULE2_CLINICAL_SUMMARIES,
      pathophysiologyData: MODULE2_PATHOPHYSIOLOGY_DATA,
      npcData: MODULE2_NPC_DATA,
      worldLocations: MODULE2_WORLD_LOCATIONS
    };
  }
  if (modId === 3) {
    return {
      rigMetadata: MODULE3_RIG_METADATA,
      quizData: MODULE3_QUIZ_DATA,
      clinicalSummaries: MODULE3_CLINICAL_SUMMARIES,
      pathophysiologyData: MODULE3_PATHOPHYSIOLOGY_DATA,
      npcData: MODULE3_NPC_DATA,
      worldLocations: MODULE3_WORLD_LOCATIONS
    };
  }
  if (modId === 4) {
    return {
      rigMetadata: MODULE4_RIG_METADATA,
      quizData: MODULE4_QUIZ_DATA,
      clinicalSummaries: MODULE4_CLINICAL_SUMMARIES,
      pathophysiologyData: MODULE4_PATHOPHYSIOLOGY_DATA,
      npcData: MODULE4_NPC_DATA,
      worldLocations: MODULE4_WORLD_LOCATIONS
    };
  }
  if (modId === 5) {
    return {
      rigMetadata: MODULE5_RIG_METADATA,
      quizData: MODULE5_QUIZ_DATA,
      clinicalSummaries: MODULE5_CLINICAL_SUMMARIES,
      pathophysiologyData: MODULE5_PATHOPHYSIOLOGY_DATA,
      npcData: MODULE5_NPC_DATA,
      worldLocations: MODULE5_WORLD_LOCATIONS
    };
  }
  if (modId === 6) {
    return {
      rigMetadata: MODULE6_RIG_METADATA,
      quizData: MODULE6_QUIZ_DATA,
      clinicalSummaries: MODULE6_CLINICAL_SUMMARIES,
      pathophysiologyData: MODULE6_PATHOPHYSIOLOGY_DATA,
      npcData: MODULE6_NPC_DATA,
      worldLocations: MODULE6_WORLD_LOCATIONS
    };
  }
  return {
    rigMetadata: MODULE7_RIG_METADATA,
    quizData: MODULE7_QUIZ_DATA,
    clinicalSummaries: MODULE7_CLINICAL_SUMMARIES,
    pathophysiologyData: MODULE7_PATHOPHYSIOLOGY_DATA,
    npcData: MODULE7_NPC_DATA,
    worldLocations: MODULE7_WORLD_LOCATIONS
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
      if (ev.key === '3') onSelect(3);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onSelect]);

  const blocks = [
    {
      title: "BLOCK 1",
      modules: [
        { id: 1, label: "Module 1", sub: "The Festival", active: true, key: '1' },
        { id: 'module1_quiz_nexus', label: "Module 1 Quiz Nexus", sub: "50-Question Pathophysiology Practice", active: true, key: 'N1', quizNexus: true },
        { id: 2, label: "Module 2", sub: "The Mission", active: true, key: '2' },
        { id: 'module2_quiz_nexus', label: "Module 2 Quiz Nexus", sub: "50-Question Pathophysiology Practice", active: true, key: 'N2', quizNexus: true },
        { id: 3, label: "Module 3", sub: "Clinical Rotation", active: true, key: '3' },
        { id: 'module3_quiz_nexus', label: "Module 3 Quiz Nexus", sub: "50-Question Pathophysiology Practice", active: true, key: 'N3', quizNexus: true },
        { id: 'midterm', label: "Practice Midterm", sub: "75 Questions", active: true, key: 'M' },
        { id: 'midterm_nexus', label: "The Midterm Nexus", sub: "Cinematic 100-Question Challenge", active: true, key: 'N' },
        { id: 'adaptive_recall', label: "ADAPTIVE RECALL", sub: "Intelligent Retrieval Engine", active: true, key: 'R' }
      ]
    },
    {
      title: "BLOCK 2",
      modules: [
        { id: 4, label: "Module 4", sub: "MSK Collapse", active: true, key: '4' },
        { id: 5, label: "Module 5", sub: "GI & Hepatic", active: true, key: '5' },
        { id: 6, label: "Module 6", sub: "Endo & Neuro", active: true, key: '6' },
        { id: 7, label: "Module 7", sub: "Renal & GU", active: true, key: '7' },
        { id: 'final', label: "Practice Final", sub: "75 Questions", active: true, key: 'F' },
        { id: 'protocol_150', label: "PROTOCOL 150", sub: "The Final Dance", active: true, key: 'P' },
        { id: 'metabolic_adventure', label: "Alfie's Metabolic Adventure", sub: "Interactive Biochemistry Journey", active: true, key: 'B' }
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
            className: `module-card ${mod.quizNexus ? 'quiz-nexus-menu-card' : ''} ${!mod.active ? 'locked' : ''}`,
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
      e('div', { className: 'debug-btn-row', style: { flexWrap: 'wrap' } },
        e('button', { className: `debug-btn ${activeModule === 1 ? 'green' : ''}`, onClick: () => onSwitchModule(1) }, 'MOD 1'),
        e('button', { className: `debug-btn ${activeModule === 2 ? 'green' : ''}`, onClick: () => onSwitchModule(2) }, 'MOD 2'),
        e('button', { className: `debug-btn ${activeModule === 3 ? 'green' : ''}`, onClick: () => onSwitchModule(3) }, 'MOD 3'),
        e('button', { className: `debug-btn ${activeModule === 4 ? 'green' : ''}`, onClick: () => onSwitchModule(4) }, 'MOD 4'),
        e('button', { className: `debug-btn ${activeModule === 5 ? 'green' : ''}`, onClick: () => onSwitchModule(5) }, 'MOD 5'),
        e('button', { className: `debug-btn ${activeModule === 6 ? 'green' : ''}`, onClick: () => onSwitchModule(6) }, 'MOD 6'),
        e('button', { className: `debug-btn ${activeModule === 7 ? 'green' : ''}`, onClick: () => onSwitchModule(7) }, 'MOD 7')
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
      e('div', { className: 'debug-btn-row', style: { flexWrap: 'wrap' } },
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(1) }, 'MOD 1'),
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(2) }, 'MOD 2'),
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(3) }, 'MOD 3'),
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(4) }, 'MOD 4'),
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(5) }, 'MOD 5'),
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(6) }, 'MOD 6'),
        e('button', { className: 'debug-btn green', onClick: () => onGeneratePDF(7) }, 'MOD 7')
      )
    )
  );
}

function MascotAlfie({ percentage, musicOn, danceStyle }) {
  // 12 Tiers of Emotion
  const tier = Math.min(12, Math.max(1, Math.ceil(percentage / 8.33)));
  
  const getStatusColor = () => {
    if (tier >= 9) return '#00ff41'; // Green (Success)
    if (tier >= 7) return '#00e5ff'; // Cyan (Neutral/Stable)
    if (tier >= 5) return '#ffcc00'; // Yellow (Warning)
    return '#ff3e3e';                // Red (Failure)
  };

  const statusColor = getStatusColor();
  const isSerious = !musicOn;

  // Map dance style to appropriate instrument sprite
  const getSprite = () => {
    if (isSerious) return APP_CONFIG.ASSETS.ALFIE_SPRITES.SINGER;
    switch (danceStyle) {
      case 'salsa': return APP_CONFIG.ASSETS.ALFIE_SPRITES.MARACAS;
      case 'reggae': return APP_CONFIG.ASSETS.ALFIE_SPRITES.GUITAR;
      case 'dub': return APP_CONFIG.ASSETS.ALFIE_SPRITES.DRUMS;
      case 'mellow': return APP_CONFIG.ASSETS.ALFIE_SPRITES.GUITAR;
      case 'boss': return APP_CONFIG.ASSETS.ALFIE_SPRITES.TRUMPET;
      default: return APP_CONFIG.ASSETS.ALFIE_SPRITES.SINGER;
    }
  };

  const spriteUrl = getSprite();

  return e('div', { 
    className: `alfie-sprite-container tier-${tier} dance-${musicOn ? danceStyle : 'none'}`,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
    // The actual stick figure image
    e('img', { 
      src: spriteUrl, 
      className: 'alfie-pose-img',
      style: {
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
        filter: `drop-shadow(0 0 10px ${statusColor})`, // Performance feedback via glow
        transition: 'filter 0.5s ease'
      }
    }),
    
    // Status Indicator Halo (behind)
    e('div', { 
      className: 'status-halo-v2',
      style: {
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: statusColor,
        opacity: 0.15,
        filter: 'blur(15px)',
        zIndex: -1
      }
    })
  );
}

function MascotHUD({ score, history, musicOn, danceStyle }) {
  // Use a Set to count unique steps attempted to ensure mathematical accuracy
  const uniqueStepsAttempted = new Set(history.map(h => h.step)).size;
  const percentage = uniqueStepsAttempted > 0 ? Math.round((score / uniqueStepsAttempted) * 100) : 100;
  
  let label = musicOn ? "FEELING THE BEAT" : "SERIOUS FOCUS";
  if (uniqueStepsAttempted === 0) label = "PRE-FLIGHT READY";
  else if (percentage >= 100) label = "GOD-TIER MASTERY";
  else if (percentage >= 90) label = "CLINICAL ELITE";
  else if (percentage < 30) label = "TOTAL FAILURE";

  return e('div', { className: 'mascot-tray-wrap fade-in' },
    e('div', { className: 'mascot-alfie-wrap' }, e(MascotAlfie, { percentage, musicOn, danceStyle })),
    e('div', { className: 'mascot-stats' },
      e('div', { className: 'mascot-percentage' }, `${percentage}%`),
      e('div', { className: 'mascot-status-label' }, label),
      e('div', { className: 'mascot-tally', style: { fontSize: '0.5rem', opacity: 0.5, marginTop: '2px' } }, 
        `ACCURACY: ${score}/${uniqueStepsAttempted}`
      )
    )
  );
}

function App() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [screen, setScreen] = useState('splash_brand'); 
  const [activeModule, setActiveModule] = useState(1);
  const [mod3Mode, setMod3Mode] = useState(null);
  const [operatorName, setOperatorName] = useState('GUEST_STUDENT');
  const [musicOn, setMusicOn] = useState(true);
  const [musicVolume, setMusicVolume] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [showStinger, setShowStinger] = useState(false);
  const isTransitioningRef = useRef(false);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [lockedAnswer, setLockedAnswer] = useState(null);
  const [showRationale, setShowRationale] = useState(false);
  const [history, setHistory] = useState([]); // Track right/wrong per step
  const [module4Results, setModule4Results] = useState(null); // Track specific Siege results

  // Lifted from Game2D so it persists across quiz/lab screen transitions
  const visitedLocationsRef = useRef(new Set());
  const prevLocationRef = useRef(null);
  const [showDebug, setShowDebug] = useState(false);

  const audioRef = useRef(null);
  if (!audioRef.current) {
    audioRef.current = new Audio(APP_CONFIG.ASSETS.TITLE_MUSIC);
  }

  const [currentMusicOverride, setCurrentMusicOverride] = useState(null);

  const fadeIntervalRef = useRef(null);
  const fadeAudio = (newSrc) => {
    try {
        const audio = audioRef.current;
        if (!audio) return;
        const targetVolume = screen === 'quiz_nexus' ? Math.max(0, Math.min(1, musicVolume)) : 1;
        const absoluteNewSrc = new URL(newSrc, window.location.href).href;
        if (audio.src === absoluteNewSrc && !audio.paused) return; 

        console.log("[DEBUG-FADE-AUDIO] Fading to:", newSrc);

        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        // Fade out
        fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.1) {
            audio.volume -= 0.1;
        } else {
            clearInterval(fadeIntervalRef.current);
            audio.pause();
            audio.src = newSrc;
            audio.load();
            audio.volume = 0;
            if (musicOn && (hasInteracted || screen === 'splash_brand')) {
            audio.play().then(() => {
                // Fade in
                fadeIntervalRef.current = setInterval(() => {
                if (audio.volume < targetVolume) {
                    audio.volume = Math.min(targetVolume, audio.volume + 0.1);
                } else {
                    audio.volume = targetVolume;
                    clearInterval(fadeIntervalRef.current);
                    fadeIntervalRef.current = null;
                }
                }, 50);
            }).catch(e => {
                if (e.name !== 'NotAllowedError') {
                console.warn("[DEBUG-FADE-AUDIO] Audio play blocked", e);
                }
                fadeIntervalRef.current = null;
            });
            } else {
            fadeIntervalRef.current = null;
            }
        }
        }, 50);
    } catch (err) {
        console.error("[DEBUG-FADE-AUDIO-ERROR]", err);
    }
  };

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

  useEffect(() => {
    if (!hasInteracted) return;
    const isTitle = ['splash_brand', 'splash1', 'splash_brand_replay', 'identity', 'hub', 'briefing'].includes(screen);
    if (isTitle) {
      RetroAudio.startAmbientLoop();
    } else {
      RetroAudio.stopAmbientLoop();
    }
  }, [screen, hasInteracted]);

  useEffect(() => {
    const handleGlobalClick = (ev) => {
      if (ev.target.tagName === 'BUTTON' || ev.target.closest('button')) {
        RetroAudio.playConfirm();
      }
    };
    const handleGlobalMouseOver = (ev) => {
      if (ev.target.tagName === 'BUTTON' || ev.target.closest('button')) {
        RetroAudio.playTick();
      }
    };
    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('mouseover', handleGlobalMouseOver);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('mouseover', handleGlobalMouseOver);
    };
  }, []);

  const transitionTo = (nextScreen) => {
    RetroAudio.playWarp();
    setIsFading(true);
    setTimeout(() => {
      setScreen(nextScreen);
      setIsFading(false);
    }, 400);
  };

  useEffect(() => {
    // Load Midterm Nexus CSS once
    if (!document.getElementById('nexus-styles')) {
      const link = document.createElement('link');
      link.id = 'nexus-styles';
      link.rel = 'stylesheet';
      link.href = 'MidtermNexus.css';
      document.head.appendChild(link);
    }
    // Load Protocol 150 CSS once
    if (!document.getElementById('protocol-150-styles')) {
      const link = document.createElement('link');
      link.id = 'protocol-150-styles';
      link.rel = 'stylesheet';
      link.href = 'Protocol150.css';
      document.head.appendChild(link);
    }
    // Load Adaptive Recall CSS once
    if (!document.getElementById('adaptive-recall-styles')) {
      const link = document.createElement('link');
      link.id = 'adaptive-recall-styles';
      link.rel = 'stylesheet';
      link.href = 'AlfieAdaptiveRecall.css';
      document.head.appendChild(link);
    }
    // Load Metabolic Adventure CSS once
    if (!document.getElementById('metabolic-adventure-styles')) {
      const link = document.createElement('link');
      link.id = 'metabolic-adventure-styles';
      link.rel = 'stylesheet';
      link.href = 'AlfieMetabolicAdventure.css';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (screen === 'splash_brand') {
      // Transition to splash1 only if we have already interacted
      if (hasInteracted) {
        const t = setTimeout(() => { setScreen('splash1'); }, 500);
        return () => clearTimeout(t);
      }
    }
    if (screen === 'splash_brand_replay') {
      const t = setTimeout(() => { setScreen('identity'); }, 900);
      return () => clearTimeout(t);
    }
  }, [screen, hasInteracted]);

  useEffect(() => {
    audioRef.current.loop = true;
    
    const updateAudio = async () => {
      let targetUrl = APP_CONFIG.ASSETS.HUB_MUSIC;
      
      const isTitleScreen = ['splash_brand', 'splash1', 'splash_brand_replay', 'identity', 'hub', 'briefing'].includes(screen);
      if (isTitleScreen) {
        targetUrl = APP_CONFIG.ASSETS.TITLE_MUSIC;
      }

      const isGameplayScreen = ['lab', 'quiz', 'exam', 'module3_hub', 'module4_hub', 'module5_hub', 'module6_hub', 'module7_hub', 'midterm_nexus', 'midterm_nexus_game', 'midterm_nexus_complete', 'metabolic_adventure', 'quiz_nexus'].includes(screen);
      
      if (isGameplayScreen || currentMusicOverride) {
        if (currentMusicOverride) {
            targetUrl = currentMusicOverride;
        } else {
            if (screen === 'midterm_nexus_game' || screen === 'midterm_nexus' || screen === 'midterm_nexus_complete') {
                targetUrl = APP_CONFIG.ASSETS.MOD4C; // STRICT OVERRIDE: Nexus must be mod4c
            }
            else if (screen === 'metabolic_adventure') {
              // Handled internally by AlfieMetabolicAdventure or passed via currentMusicOverride?
              // The user wants App to handle the transition logic or AlfieMetabolicAdventure?
              // "Immediately stop any music currently playing anywhere else... begin playing assets/rag1.mp3"
              targetUrl = null; // We'll let AlfieMetabolicAdventure handle its own Tone.js instance for complex crossfades
            }
            else if (activeModule === 1) targetUrl = APP_CONFIG.ASSETS.MOD1_MUSIC;
            else if (activeModule === 2) targetUrl = APP_CONFIG.ASSETS.MOD2_MUSIC;
            else if (activeModule === 3) {
                targetUrl = APP_CONFIG.ASSETS.MOD3_ROOTSDUB1; 
                if (mod3Mode === 'mech_lab') targetUrl = APP_CONFIG.ASSETS.MOD3_MELLOW1;
                if (mod3Mode === 'path_builder') targetUrl = APP_CONFIG.ASSETS.MOD3_MELLOW2;
                if (mod3Mode === 'adaptive_exam') targetUrl = APP_CONFIG.ASSETS.MOD3_MELLOW2;
                if (mod3Mode === 'coronary_crisis') targetUrl = APP_CONFIG.ASSETS.MOD3_BOSS1;
                if (mod3Mode === 'shock_unit') targetUrl = APP_CONFIG.ASSETS.MOD3_BOSS2;
                if (mod3Mode === 'boss_battles') targetUrl = APP_CONFIG.ASSETS.MOD3_BOSS1;
                if (mod3Mode === 'pulm_collapse') targetUrl = APP_CONFIG.ASSETS.MOD3_REGGAE1;
                if (mod3Mode === 'emergency_dept') targetUrl = APP_CONFIG.ASSETS.MOD3_REGGAE2;
                if (mod3Mode === 'clot_runner') targetUrl = APP_CONFIG.ASSETS.MOD3_SALSA1;
                if (mod3Mode === 'hemo_arena') targetUrl = APP_CONFIG.ASSETS.MOD3_SALSA2;
                if (mod3Mode === 'final_sim') targetUrl = APP_CONFIG.ASSETS.MOD3_ROOTSDUB1;
            }
            else if (activeModule === 4) {
              targetUrl = APP_CONFIG.ASSETS.MOD4A;
            }
        }
      }

      // --- CRITICAL MODULE 4 AUDIO ISOLATION ---
      // If we are in Module 4 (either via hub or override), strictly enforce mod4A/B/C/D plus requested tracks
      if (activeModule === 4 && (isGameplayScreen || currentMusicOverride)) {
        const mod4Allowed = [
          APP_CONFIG.ASSETS.MOD4A,
          APP_CONFIG.ASSETS.MOD4B,
          APP_CONFIG.ASSETS.MOD4C,
          APP_CONFIG.ASSETS.MOD4D,
          APP_CONFIG.ASSETS.MOD3_ROOTSDUB1,
          APP_CONFIG.ASSETS.MOD3_BOSS1,
          "assets/rpg1.mp3",
          "assets/rpg2.mp3",
          "assets/rag1.mp3",
          "assets/rag2ruski.mp3",
          "assets/alfitechno1.mp3",
          "assets/alfitechno2.mp3",
          "assets/alfitechno3.mp3",
          "assets/alfitechno4.mp3",
          "assets/alfitechno5.mp3"
        ];
        
        const normalizedTarget = targetUrl ? targetUrl.toLowerCase() : '';
        const isMod4Valid = mod4Allowed.some(path => normalizedTarget && path && normalizedTarget.includes(path.toLowerCase()));
        
        if (!isMod4Valid) {
          console.error(`STRICT AUDIO BLOCK: Module 4 cannot play ${targetUrl}. Silence enforced.`);
          targetUrl = null; 
        }
      }

      if (!targetUrl) {
        audioRef.current.pause();
        return;
      }

      const currentSrc = audioRef.current.src;
      const absoluteTarget = new URL(targetUrl, window.location.href).href;
      
      if (currentSrc !== absoluteTarget) {
        fadeAudio(targetUrl);
      }

      if (musicOn && (hasInteracted || screen === 'splash_brand')) {
        if (audioRef.current.paused && audioRef.current.src) {
           audioRef.current.play().catch(e => {
             if (e.name !== 'NotAllowedError') {
               console.warn("Audio play blocked", e);
             }
           });
        }
      } else {
        audioRef.current.pause();
      }
    };

    updateAudio();
  }, [musicOn, screen, activeModule, mod3Mode, currentMusicOverride]);

  const getDanceStyle = () => {
    if (!musicOn) return 'none';
    if (activeModule === 3) {
      if (['mech_lab', 'path_builder', 'adaptive_exam', 'final_sim'].includes(mod3Mode)) return 'dub';
      if (['coronary_crisis', 'boss_battles', 'shock_unit'].includes(mod3Mode)) return 'boss';
      if (['pulm_collapse', 'emergency_dept'].includes(mod3Mode)) return 'reggae';
      if (['clot_runner', 'hemo_arena'].includes(mod3Mode)) return 'salsa';
      return 'dub'; // Default for Mod 3
    }
    if (activeModule === 4) {
      if (currentMusicOverride && currentMusicOverride.includes('rootsdub1')) return 'dub';
      if (currentMusicOverride && currentMusicOverride.includes('boss1')) return 'boss';
      return 'mellow';
    }
    return 'mellow'; // Default
  };

  const danceStyle = getDanceStyle();

  useEffect(() => {
    // Reset transition lock when screen changes back to a title phase if needed
    if (['splash_brand', 'splash1'].includes(screen) && !hasInteracted) {
      isTransitioningRef.current = false;
    }
  }, [screen, hasInteracted]);

  const handleEnterHub = () => {
    if (musicOn) audioRef.current.play().catch(() => {});
    setScreen('splash_brand_replay');
  };

  const isTitlePhase = ['splash_brand', 'splash1', 'splash_brand_replay', 'identity', 'hub', 'briefing'].includes(screen);

  // Global keyboard across all screens
  useEffect(() => {
    const handleKey = (ev) => {
      if (ev.target.tagName === 'INPUT' || ev.target.tagName === 'BUTTON') {
        // If a button is focused, we only allow specific debug keys to pass through
        // but ignore general space/enter to prevent double-triggering game logic
        if (ev.code !== 'Backquote' && ev.key !== '`') return;
      }

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

        // SPACE to continue after lock-in - but only if we aren't focused on a utility button
        if ((ev.code === 'Space' || ev.key === ' ') && lockedAnswer !== null) {
          if (ev.target.tagName !== 'BUTTON') {
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

  const generateNexusPDF = (results) => {
    try {
        console.log("[DEBUG-PDF] Starting PDF generation...");
        const doc = new jsPDF();
        const pageW = 210;
        const pageH = 297;
        const margin = 15;
        const contentW = pageW - margin * 2;
        let y = 0;

        const GREEN = [0, 180, 45];
        const DARK = [10, 10, 10];
        const WHITE = [255, 255, 255];
        const GRAY = [100, 100, 100];
        const BLUE = [0, 110, 220];

        const drawHeader = () => {
            doc.setFillColor(...DARK);
            doc.rect(0, 0, pageW, 40, 'F');
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.setTextColor(...WHITE);
            doc.text("ARIZONA COLLEGE: PATHOPHYSIOLOGY", margin, 20);
            doc.setFontSize(14);
            doc.setTextColor(...GREEN);
            doc.text("DR. MODALI LEARNING LABS — THE MIDTERM NEXUS REPORT", margin, 30);
        };

        const drawFooter = () => {
            doc.setFontSize(8);
            doc.setTextColor(...GRAY);
            doc.text(`Generated on ${new Date().toLocaleString()} // Page ${doc.internal.getNumberOfPages()}`, pageW / 2, pageH - 10, { align: 'center' });
        };

        const checkNewPage = (needed) => {
            if (y + needed > pageH - 20) {
                doc.addPage();
                y = 20;
                drawFooter();
                return true;
            }
            return false;
        };

        drawHeader();
        y = 55;

        // --- Performance Summary Section ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(...BLUE);
        doc.text("PERFORMANCE SUMMARY", margin, y);
        y += 10;

        const stats = [
            ["OPERATOR NAME:", operatorName],
            ["TOTAL SCORE:", `${results.score} PTS`],
            ["ACCURACY:", `${results.percentage}%`],
            ["TOTAL CORRECT:", `${results.correct} / ${results.total}`],
            ["TOTAL INCORRECT:", `${results.total - results.correct}`],
            ["TIME PLAYED:", `${Math.floor(results.duration / 60)}m ${results.duration % 60}s`],
            ["COMPLETION DATE:", new Date().toLocaleDateString()]
        ];

        doc.setFontSize(10);
        stats.forEach(([label, val]) => {
            doc.setTextColor(...GRAY);
            doc.text(label, margin, y);
            doc.setTextColor(0, 0, 0);
            doc.text(val, margin + 60, y);
            y += 7;
        });

        y += 10;

        // --- Strengths & Weaknesses ---
        const topicStats = {};
        results.history.forEach(h => {
            const topic = h.topic || "General";
            if (!topicStats[topic]) topicStats[topic] = { correct: 0, total: 0 };
            topicStats[topic].total++;
            if (h.correct) topicStats[topic].correct++;
        });

        const sortedTopics = Object.entries(topicStats).sort((a, b) => (b[1].correct / b[1].total) - (a[1].correct / a[1].total));
        const strengths = sortedTopics.filter(t => (t[1].correct / t[1].total) >= 0.8).map(t => t[0]);
        const weaknesses = sortedTopics.filter(t => (t[1].correct / t[1].total) < 0.6).map(t => t[0]);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(...GREEN);
        doc.text("STRENGTHS:", margin, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(strengths.length > 0 ? strengths.join(", ") : "None identified", margin + 40, y);
        y += 7;

        doc.setFont("helvetica", "bold");
        doc.setTextColor(200, 0, 0);
        doc.text("WEAKNESSES:", margin, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(weaknesses.length > 0 ? weaknesses.join(", ") : "None identified", margin + 40, y);
        y += 15;

        doc.setFont("helvetica", "italic");
        doc.setTextColor(...GRAY);
        doc.text("Stay focused and continue your physiological exploration. You are on the path to clinical mastery!", margin, y);
        y += 15;

        // --- Detailed Review Table ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(...BLUE);
        doc.text("DETAILED QUESTION REVIEW", margin, y);
        y += 10;

        // Table Header
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, y, contentW, 10, 'F');
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text("Q#", margin + 2, y + 7);
        doc.text("RESULT", margin + 10, y + 7);
        doc.text("QUESTION & RATIONALE", margin + 30, y + 7);
        y += 12;

        results.history.forEach((h, i) => {
            const qText = `Q: ${h.q}`;
            const sText = `Student Choice: ${h.selected}`;
            const cText = `Correct Answer: ${h.ans}`;
            const rText = `Rationale: ${h.rationale}`;

            const qLines = doc.splitTextToSize(qText, contentW - 35);
            const sLines = doc.splitTextToSize(sText, contentW - 35);
            const cLines = doc.splitTextToSize(cText, contentW - 35);
            const rLines = doc.splitTextToSize(rText, contentW - 35);

            const rowH = (qLines.length + sLines.length + cLines.length + rLines.length) * 5 + 10;
            checkNewPage(rowH);

            doc.setFont("helvetica", "bold");
            doc.text(`${i + 1}`, margin + 2, y + 5);
            
            doc.setTextColor(h.correct ? 0 : 200, h.correct ? 150 : 0, 0);
            doc.text(h.correct ? "CORRECT" : "INCORRECT", margin + 10, y + 5);
            
            doc.setTextColor(0, 0, 0);
            let rowY = y + 5;
            qLines.forEach(line => { doc.text(line, margin + 35, rowY); rowY += 5; });
            doc.setFont("helvetica", "normal");
            doc.setTextColor(h.correct ? 0 : 200, 0, 0);
            sLines.forEach(line => { doc.text(line, margin + 35, rowY); rowY += 5; });
            doc.setTextColor(...GREEN);
            cLines.forEach(line => { doc.text(line, margin + 35, rowY); rowY += 5; });
            doc.setTextColor(...GRAY);
            doc.setFontSize(8);
            rLines.forEach(line => { doc.text(line, margin + 35, rowY); rowY += 4; });
            doc.setFontSize(9);

            y += rowH;
            doc.setDrawColor(230, 230, 230);
            doc.line(margin, y - 2, margin + contentW, y - 2);
        });

        drawFooter();
        doc.save(`Nexus_Report_${operatorName}_${new Date().getTime()}.pdf`);
        console.log("[DEBUG-PDF] PDF generation complete and saved.");
    } catch (err) {
        console.error("[DEBUG-PDF-ERROR]", err);
    }
  };

  const generatePDF = (modId, nexusResults = null) => {
    if (modId === 'nexus') {
        if (nexusResults) {
            generateNexusPDF(nexusResults);
        } else {
            console.error("[DEBUG-PDF] generatePDF('nexus') called without results.");
            alert("Report error: No session data found.");
        }
        return;
    }
    let pdfData = getModuleData(modId);
    const { pathophysiologyData: pd, quizData: qd, clinicalSummaries: cs, rigMetadata: rm } = pdfData;

    const modScore = modId === activeModule ? score : 0;
    const modHistory = modId === activeModule ? history : [];
    const totalSteps = pd.length;
    const percentage = totalSteps > 0 ? Math.round((modScore / totalSteps) * 100) : 0;
    
    let modLabel = "";
    if (modId === 1) modLabel = "MODULE 1: THE FESTIVAL";
    else if (modId === 2) modLabel = "MODULE 2: THE MISSION";
    else if (modId === 3) modLabel = "MODULE 3: CLINICAL ROTATION";
    else if (modId === 4) modLabel = "MODULE 4: MSK COLLAPSE";
    else if (modId === 5) modLabel = "MODULE 5: GI CRISIS";
    else if (modId === 6) modLabel = "MODULE 6: ENDO/NEURO CRISIS";
    else if (modId === 7) modLabel = "MODULE 7: RENAL/GU CRISIS";
    else if (modId === 'nexus') modLabel = "THE MIDTERM NEXUS";

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
    // NEW: CLINICAL SIMULATION (MODULE 4) TRAPS
    // =============================================
    if (modId === 4 && module4Results && module4Results.traps && module4Results.traps.length > 0) {
      newPage();
      drawSectionHeader(`MODULE 4 — CLINICAL SIMULATION REMEDIATION`);
      
      drawWrappedText(
        'During the Patho-Hero simulation, you encountered the following physiological misconceptions (Traps). These areas require focused review to ensure clinical diagnostic integrity.',
        8, WHITE, false
      );
      y += 6;

      module4Results.traps.forEach((trap, ti) => {
        checkSpace(20);
        doc.setFillColor(30, 10, 10);
        doc.roundedRect(margin, y - 2, contentW, 14, 1, 1, 'F');
        doc.setFont("courier", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...RED);
        doc.text(`MISCONCEPTION: ${trap}`, margin + 4, y + 5);
        y += 16;
      });
      
      doc.setFont("courier", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...GRAY);
      doc.text(`Simulation Score: ${module4Results.score} // Residency Level: ${module4Results.level}`, margin, y);
      y += 10;
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
    // Reset global state for new module to ensure Mascot accuracy reflects the current task
    setScore(0);
    setHistory([]);
    visitedLocationsRef.current = new Set();
    prevLocationRef.current = null;

    const quizNexusMatch = typeof id === 'string' && id.match(/^module([123])_quiz_nexus$/);
    if (quizNexusMatch) {
      const moduleId = Number(quizNexusMatch[1]);
      setActiveModule(moduleId);
      setMod3Mode(null);
      setCurrentMusicOverride(QUIZ_NEXUS_CONFIG[moduleId].soundtrack);
      setScreen('quiz_nexus');
      return;
    }

    if (id === 'midterm_nexus') {
      setActiveModule(3); // Nexus is for Module 3
      setScreen('midterm_nexus_game');
      return;
    }
    if (id === 'metabolic_adventure') {
      // Immediate audio start on user gesture
      try {
        // Stop current music
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        // Initialize rag1.mp3
        const musicSrc = "assets/rag1.mp3";
        const absoluteUrl = new URL(musicSrc, window.location.href).href;
        
        console.log("[DEBUG-AUDIO] Starting Alfie's Metabolic Adventure Audio...");
        console.log("- Resolved URL:", absoluteUrl);
        
        audioRef.current.src = absoluteUrl;
        audioRef.current.loop = true;
        audioRef.current.volume = 1.0;
        
        // Start playback
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log("rag1.mp3 playback started successfully");
            console.log("- Audio Context State:", Tone.getContext().state);
            console.log("- Player Loaded: true");
            console.log("- Player Volume:", audioRef.current.volume);
          }).catch(err => {
            console.error("rag1.mp3 playback failed:", err);
          });
        }
      } catch (err) {
        console.error("Audio initialization failed:", err);
      }
      setScreen('metabolic_adventure');
      return;
    }
    if (id === 'adaptive_recall') {
      setScreen('adaptive_recall');
      return;
    }
    if (id === 'protocol_150') {
      setActiveModule(3); // Protocol 150 also uses same logic for now
      setScreen('protocol_150');
      return;
    }
    if (id === 'midterm') {
      setScreen('midterm');
      return;
    }
    if (id === 3) {
      setActiveModule(3);
      setScreen('module3_hub');
      return;
    }
    if (id === 4) {
      setActiveModule(4);
      setScreen('module4_hub');
      return;
    }
    if (id === 5) {
      setActiveModule(5);
      setScreen('module5_hub');
      return;
    }
    if (id === 6) {
      setActiveModule(6);
      setScreen('module6_hub');
      return;
    }
    if (id === 7) {
      setActiveModule(7);
      setScreen('module7_hub');
      return;
    }
    if (id === 'final') {
      setScreen('final');
      return;
    }
    setActiveModule(id);
    setShowStinger(true);
    setTimeout(() => setScreen('briefing'), 800);
    setTimeout(() => setShowStinger(false), 3000);
  };

  useEffect(() => {
    if (!hasInteracted) return;
    Tone.Destination.mute = !musicOn;
    if (audioRef.current) {
      audioRef.current.muted = !musicOn;
    }
  }, [musicOn, hasInteracted]);

  useEffect(() => {
    if (screen === 'quiz_nexus' && audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, musicVolume));
    }
  }, [musicVolume, screen]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlTouchAction = html.style.touchAction;
    const previousBodyTouchAction = body.style.touchAction;
    if (screen === 'hub') {
      html.style.touchAction = 'pan-y';
      body.style.touchAction = 'pan-y';
    }
    return () => {
      html.style.touchAction = previousHtmlTouchAction;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, [screen]);

  const renderContent = () => {
    switch (screen) {
      case 'splash_brand':
        return e('div', { 
            className: 'splash-screen',
            style: { cursor: 'default' }
          },
          e(ImmuneDefenseMiniGame, { isActive: !hasInteracted }),
          e('h1', { className: 'splash-main matrix-text crt-glow brand-fuzz-in', style: { letterSpacing: '15px', textAlign: 'center', zIndex: 2 } }, 
            screen === 'splash_brand' && isTransitioningRef.current && activeModule === 3 ? 'MODULE 3 NEXUS' : 'DR. MODALI LEARNING LABS'
          ),
          !hasInteracted && e('div', { 
            className: 'matrix-text fade-in click-initialize-btn', 
            style: { marginTop: '20px', fontSize: '0.8rem', opacity: 0.6, zIndex: 2, cursor: 'pointer' },
            onClick: async (ev) => {
              ev.stopPropagation();
              if (isTransitioningRef.current) return;
              isTransitioningRef.current = true;
              
              console.log("[DEBUG-APP] Starting initialization...");
              try {
                await RetroAudio.init();
                console.log("[DEBUG-APP] RetroAudio initialized.");
              } catch (err) {
                console.error("[DEBUG-APP-ERROR] RetroAudio init failed", err);
              }
              
              try {
                RetroAudio.startAmbientLoop();
                console.log("[DEBUG-APP] Ambient loop started.");
              } catch (err) {
                console.error("[DEBUG-APP-ERROR] Ambient loop failed", err);
              }
              
              setHasInteracted(true);
              if (musicOn && audioRef.current) {
                audioRef.current.play().catch(err => {
                   if (err.name !== 'NotAllowedError') {
                     console.warn("[DEBUG-APP] Audio play blocked", err);
                   }
                });
              }
            }
          }, '[ CLICK TO INITIALIZE ]')
        );
      case 'splash_brand_replay':
        return e('div', { className: 'splash-screen' },
          e('h1', { className: 'splash-main matrix-text crt-glow brand-splash-anim' }, 'DR. MODALI LEARNING LABS')
        );

      case 'splash1':
        return e('div', { className: `splash-screen ${isFading ? 'fade-out' : 'fade-in'}` },
          e(StarField),
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

      case 'quiz_nexus':
        return e(QuizNexus, {
          key: `quiz-nexus-${activeModule}-${operatorName}`,
          moduleId: activeModule,
          operatorName,
          onBack: () => { setCurrentMusicOverride(null); setScreen('hub'); },
          onMusicChange: setCurrentMusicOverride,
          musicOn,
          onMusicToggle: () => setMusicOn(value => !value),
          volume: musicVolume,
          onVolumeChange: value => setMusicVolume(Math.max(0, Math.min(1, value)))
        });

      case 'module3_hub':
        return e(Module3Engine, { 
          operatorName, 
          onBack: () => { setScreen('hub'); setMod3Mode(null); },
          onModeChange: setMod3Mode,
          activeMode: mod3Mode,
          onGeneratePDF: () => generatePDF(3),
          onReportResult: ({ id, correct }) => {
            setHistory(h => {
                const existing = h.find(entry => entry.step === id);
                if (existing) return h;
                if (correct) setScore(s => s + 1);
                return [...h, { step: id, correct }];
            });
          }
        });

      case 'module4_hub':
        return e(Module4Engine, { 
          operatorName, 
          onBack: () => { setScreen('hub'); setMod3Mode(null); setCurrentMusicOverride(null); },
          onModeChange: setMod3Mode,
          onMusicChange: setCurrentMusicOverride,
          activeMode: mod3Mode,
          onGeneratePDF: () => generatePDF(4),
          onReportResult: ({ id, correct }) => {
            setHistory(h => {
                const existing = h.find(entry => entry.step === id);
                if (existing) return h;
                if (correct) setScore(s => s + 1);
                return [...h, { step: id, correct }];
            });
          }
        });

      case 'module5_hub':
        return e(Module5Engine, { 
          operatorName, 
          onBack: () => { setScreen('hub'); setMod3Mode(null); },
          onModeChange: setMod3Mode,
          activeMode: mod3Mode,
          onGeneratePDF: () => generatePDF(5),
          onReportResult: ({ id, correct }) => {
            setHistory(h => {
                const existing = h.find(entry => entry.step === id);
                if (existing) return h;
                if (correct) setScore(s => s + 1);
                return [...h, { step: id, correct }];
            });
          }
        });

      case 'module6_hub':
        return e(Module6Engine, { 
          operatorName, 
          onBack: () => { setScreen('hub'); setMod3Mode(null); },
          onModeChange: setMod3Mode,
          activeMode: mod3Mode,
          onGeneratePDF: () => generatePDF(6),
          onReportResult: ({ id, correct }) => {
            setHistory(h => {
                const existing = h.find(entry => entry.step === id);
                if (existing) return h;
                if (correct) setScore(s => s + 1);
                return [...h, { step: id, correct }];
            });
          }
        });

      case 'module7_hub':
        return e(Module7Engine, { 
          operatorName, 
          onBack: () => { setScreen('hub'); setMod3Mode(null); },
          onModeChange: setMod3Mode,
          activeMode: mod3Mode,
          onGeneratePDF: () => generatePDF(7),
          onReportResult: ({ id, correct }) => {
            setHistory(h => {
                const existing = h.find(entry => entry.step === id);
                if (existing) return h;
                if (correct) setScore(s => s + 1);
                return [...h, { step: id, correct }];
            });
          }
        });

      case 'metabolic_adventure':
        return e(AlfieMetabolicAdventure, {
            onBack: () => setScreen('hub')
        });

      case 'adaptive_recall':
        return e(AdaptiveRecallUI, {
            deck: RECALL_DECKS[0],
            onBack: () => setScreen('hub')
        });

      case 'final':
        return e(FinalExamEngine, {
          operatorName,
          onBack: () => setScreen('hub')
        });

      case 'midterm_nexus':
        return e(MidtermNexusComponent, {
          onBack: () => setScreen('hub'),
          onGeneratePDF: (results) => {
            generatePDF('nexus', results);
          }
        });

      case 'protocol_150':
        return e(Protocol150Component, {
            onComplete: (results) => {
                // Adapt results to performance summary
                setScore(results.score);
                setHistory(results.history);
                setScreen('protocol_150_complete');
                // Automatically trigger PDF generation
                setTimeout(() => {
                  generatePDF('protocol_150', results);
                }, 1000);
            },
            onGeneratePDF: () => {}, 
            onMusicChange: (src) => setCurrentMusicOverride(src)
        });

      case 'midterm_nexus_game':
        return e(Module3NexusGame, {
            onComplete: (results) => {
                // Adapt results to performance summary
                setScore(results.score);
                setHistory(results.history);
                setScreen('midterm_nexus_complete');
                // Automatically trigger PDF generation
                setTimeout(() => {
                  generateNexusPDF(results);
                }, 1000);
            },
            onGeneratePDF: () => {}, // Handled via onComplete
            onMusicChange: (src) => setCurrentMusicOverride(src)
        });

      case 'midterm_nexus_complete':
        return e('div', { className: 'splash-screen fade-in' },
          e('div', { className: 'identity-panel', style: { textAlign: 'center' } },
            e('h1', { className: 'matrix-text crt-glow', style: { fontSize: '2rem', marginBottom: '30px' } }, `MODULE 3 NEXUS SYNCHRONIZED`),
            e('div', { style: { fontSize: '1.2rem', margin: '20px 0' } }, 
              e('div', { className: 'matrix-text' }, `OPERATOR: ${operatorName}`),
              e('div', { style: { marginTop: '10px', color: '#fff' } }, `SYNAPSE SCORE: ${score}`)
            ),
            e('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center' } },
              e('button', { className: 'btn-cyber', onClick: () => generatePDF('nexus') }, 'DOWNLOAD PERFORMANCE REPORT'),
              e('button', { className: 'btn-cyber', onClick: () => setScreen('hub') }, 'RETURN TO HUB')
            )
          )
        );

      case 'protocol_150_complete':
        return e('div', { className: 'splash-screen fade-in' },
          e('div', { className: 'identity-panel', style: { textAlign: 'center' } },
            e('h1', { className: 'matrix-text crt-glow', style: { fontSize: '2rem', marginBottom: '30px' } }, `PROTOCOL 150 SYNCHRONIZED`),
            e('div', { style: { fontSize: '1.2rem', margin: '20px 0' } }, 
              e('div', { className: 'matrix-text' }, `OPERATOR: ${operatorName}`),
              e('div', { style: { marginTop: '10px', color: '#fff' } }, `SYNAPSE SCORE: ${score}`)
            ),
            e('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center' } },
              e('button', { className: 'btn-cyber', onClick: () => generatePDF('protocol_150') }, 'DOWNLOAD PERFORMANCE REPORT'),
              e('button', { className: 'btn-cyber', onClick: () => setScreen('hub') }, 'RETURN TO HUB')
            )
          )
        );

      case 'midterm':
        return e(PracticeMidtermEngine, {
          operatorName,
          onBack: () => setScreen('hub'),
          module1Quiz: MODULE1_QUIZ_DATA,
          module1Patho: MODULE1_PATHOPHYSIOLOGY_DATA,
          module2Quiz: MODULE2_QUIZ_DATA,
          module2Patho: MODULE2_PATHOPHYSIOLOGY_DATA,
          module3Quiz: MODULE3_QUIZ_DATA,
          module3Patho: MODULE3_PATHOPHYSIOLOGY_DATA
        });

      case 'identity': {
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
      }

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

      case 'quiz': {
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
              e('div', { className: 'quiz-nav-row' },
                e('button', { 
                    className: 'btn-cyber-small', 
                    disabled: currentStep === 0, 
                    onClick: () => { setCurrentStep(s => s - 1); setQuizChoice(null); setLockedAnswer(null); setShowRationale(false); setScreen('lab'); } 
                }, '← PREV STEP'),
                e('div', { className: 'matrix-text', style: { fontSize: '0.9rem' } }, 
                    isLocked ? 'ANSWER LOCKED — REVIEWING DATA' : 'SIT AND THINK'
                ),
                e('button', { 
                    className: 'btn-cyber-small', 
                    disabled: !isLocked, 
                    onClick: () => {
                        if (currentStep < totalPossible - 1) {
                            setCurrentStep(s => s + 1);
                            setScreen('lab');
                        } else {
                            setScreen('complete');
                        }
                    }
                }, 'NEXT STEP →')
              ),
              e('p', { className: 'quiz-question' }, step.q),
              e('div', { className: 'quiz-options' },
                step.opts.map((opt, i) => e('button', {
                  key: i,
                  className: getOptClass(i),
                  onClick: () => {
                    const firstPickForThisStep = !history.some(h => h.step === currentStep);
                    if (!isLocked) {
                      setLockedAnswer(i);
                      const isCorrect = i === step.ans;
                      if (isCorrect && firstPickForThisStep) setScore(s => s + 1);
                      if (firstPickForThisStep) {
                        setHistory(h => [...h, { step: currentStep, correct: isCorrect, choice: i }]);
                      }
                    }
                    setQuizChoice(i);
                    setShowRationale(true);
                  }
                }, 
                  e('span', { className: 'quiz-opt-number' }, `${i + 1}`),
                  e('span', { className: 'quiz-opt-text' }, opt),
                  isLocked && i === (history.find(h => h.step === currentStep)?.choice ?? lockedAnswer) && e('span', { className: 'quiz-your-answer-badge' }, 'YOUR ANSWER'),
                  isLocked && i === step.ans && e('span', { className: 'quiz-correct-badge' }, 'CORRECT')
                ))
              ),
              showRationale && e('div', { className: `feedback-rationale ${quizChoice === step.ans ? 'rationale-correct' : 'rationale-wrong'}` }, 
                e('div', { className: 'rationale-header' }, 
                  e('span', null, `RATIONALE: `),
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
      }

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
      e('div', { 
        className: 'utility-tray',
        onPointerDown: (ev) => ev.stopPropagation(),
        onKeyDown: (ev) => ev.stopPropagation(),
        onKeyUp: (ev) => ev.stopPropagation(),
        onKeyPress: (ev) => ev.stopPropagation(),
        onClick: (ev) => ev.stopPropagation()
      },
        // Clinical Mascot HUD
        (['lab', 'quiz', 'module3_hub', 'module4_hub', 'module5_hub', 'module6_hub', 'module7_hub', 'midterm', 'final'].includes(screen)) && e(MascotHUD, { score, history, musicOn, danceStyle }),

        // Navigation Buttons
        (['hub', 'identity', 'splash_brand', 'splash1', 'splash_brand_replay'].indexOf(screen) === -1) && e(React.Fragment, null,
            e('button', { 
                className: 'btn-utility btn-nav-campus', 
                tabIndex: -1,
                onClick: (ev) => { 
                    ev.stopPropagation(); 
                    ev.currentTarget.blur();
                    setScreen('hub');
                    setMod3Mode(null);
                    setCurrentMusicOverride(null);
                }
            }, 'CAMPUS HUB'),
            
            (activeModule !== 3 && screen !== 'midterm_nexus') && e('button', { 
                className: 'btn-utility btn-nav-mod', 
                tabIndex: -1,
                onClick: (ev) => { 
                    ev.stopPropagation(); 
                    ev.currentTarget.blur();
                    if (screen === 'quiz_nexus') setCurrentMusicOverride(null);
                    if (activeModule === 4) {
                        setScreen('module4_hub');
                        setMod3Mode(null);
                    } else if (activeModule === 5) {
                        setScreen('module5_hub');
                        setMod3Mode(null);
                    } else if (activeModule === 6) {
                        setScreen('module6_hub');
                        setMod3Mode(null);
                    } else if (activeModule === 7) {
                        setScreen('module7_hub');
                        setMod3Mode(null);
                    } else {
                        setScreen('hub');
                    }
                }
            }, `MOD ${activeModule} HUB`)
        ),

        e('button', { 
          className: 'btn-utility', 
          tabIndex: -1,
          onClick: (ev) => { 
            ev.stopPropagation();
            ev.currentTarget.blur(); 
            saveProgress(); 
          },
          title: 'Save Progress'
        }, 'SAVE'),
        e('button', { 
          className: 'btn-utility', 
          tabIndex: -1,
          onClick: (ev) => { 
            ev.stopPropagation();
            ev.currentTarget.blur(); 
            setMusicOn(!musicOn); 
          },
          title: musicOn ? 'Mute' : 'Unmute'
        }, musicOn ? '🔊' : '🔇')
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
        setCurrentMusicOverride(null);
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
      if (ev.target.tagName === 'INPUT' || ev.target.tagName === 'BUTTON') return;
      
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
        e('div', { className: 'hud-label' }, `${(step.day || 'N/A').toUpperCase()} // ${step.time || '08:00 AM'}`),
        e('div', { className: 'hud-value' }, (step.event || 'N/A').toUpperCase())
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
// End of App.js
root.render(e(App));
