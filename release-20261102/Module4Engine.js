
import React, { useState, useEffect } from 'react';
import Module4SiegeComponent from './Module4SiegeComponent.js';
import Module4StoryRPG from './Module4StoryRPG.js';
import Module4ClassNotes from './Module4ClassNotes.js';
import Module4PracticeTest from './Module4PracticeTest.js';
import { 
    MOD4_CHAPTERS,
    MOD4_DISEASE_CHAPTERS,
    MOD4_COMPARISONS,
    MOD4_CLINICAL_CASES
} from './module4-content.js';

const e = React.createElement;

// --- SHARED RESOURCE VIEWER ---
function ResourceViewer({ onBack }) {
    return e('div', { className: 'mod3-sim-screen fade-in' },
        e('div', { className: 'sim-header' },
            e('div', { className: 'sim-type-badge' }, 'LEARNING RESOURCES'),
            e('button', { className: 'hud-back-btn', onClick: onBack }, 'BACK')
        ),
        e('div', { className: 'resources-scroll-area', style: { padding: '20px', color: '#fff', overflowY: 'auto', maxHeight: '80vh' } },
            e('h2', { className: 'matrix-text' }, 'MODULE 4 CURRICULUM OVERVIEW'),
            e('div', { className: 'resource-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' } },
                MOD4_CHAPTERS.map(ch => e('div', { key: ch.id, className: 'resource-card', style: { background: 'rgba(0, 255, 65, 0.05)', border: '1px solid rgba(0, 255, 65, 0.2)', padding: '15px' } },
                    e('h3', { style: { color: '#00ff41' } }, ch.title),
                    e('p', { style: { fontSize: '0.9rem' } }, ch.description)
                )),
                MOD4_COMPARISONS.map(comp => e('div', { key: comp.id, className: 'resource-card', style: { background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', padding: '15px' } },
                    e('h3', { style: { color: '#00e5ff' } }, comp.title),
                    e('p', { style: { fontSize: '0.9rem' } }, comp.content)
                ))
            )
        )
    );
}

// --- MAIN ENGINE ROOT ---
export default function Module4Engine({ operatorName, onBack, activeMode, onModeChange, onMusicChange, onGeneratePDF, onReportResult }) {
  const [currentTab, setCurrentTab] = useState('hub'); // 'hub', 'resources'

  // Manage Hub Music: assets/mod4a.mp3
  useEffect(() => {
    if (!activeMode) {
      if (onMusicChange) onMusicChange("assets/mod4a.mp3");
    }
  }, [activeMode, onMusicChange]);

  // Load Practice Test styles
  useEffect(() => {
    if (!document.getElementById('practice-test-styles')) {
        const link = document.createElement('link');
        link.id = 'practice-test-styles';
        link.rel = 'stylesheet';
        link.href = 'Module4PracticeTest.css';
        document.head.appendChild(link);
    }
  }, []);

  const renderGame = () => {
    if (activeMode === 'siege') {
        return e(Module4SiegeComponent, { 
            onBack: () => onModeChange(null),
            onMusicChange,
            onReportResult
        });
    }

    if (activeMode === 'story') {
        return e(Module4StoryRPG, {
            onBack: () => onModeChange(null),
            onMusicChange
        });
    }

    if (activeMode === 'practice_test') {
        return e(Module4PracticeTest, {
            onBack: () => onModeChange(null),
            onMusicChange
        });
    }

    if (activeMode === 'resources') {
        return e(ResourceViewer, { onBack: () => onModeChange(null) });
    }

    return e('div', { className: 'mod3-placeholder' }, e('h2', null, 'MODE NOT FOUND'));
  };

  if (!activeMode) {
    return e('div', { className: 'mod3-hub-screen fade-in' },
      e('div', { className: 'hub-header-v2' },
        e('div', { className: 'matrix-text hub-title-glow' }, 'MODULE 4: MUSCULOSKELETAL'),
        e('button', { className: 'btn-return-home', onClick: onBack }, '← CAMPUS HUB')
      ),
      e('div', { className: 'mod-tabs' },
        e('button', { className: `tab-btn ${currentTab === 'hub' ? 'active' : ''}`, onClick: () => setCurrentTab('hub') }, 'MOD 4 HUB'),
        e('button', { className: `tab-btn ${currentTab === 'resources' ? 'active' : ''}`, onClick: () => setCurrentTab('resources') }, 'LEARNING RESOURCES'),
        e('button', { className: `tab-btn ${currentTab === 'notes' ? 'active' : ''}`, onClick: () => setCurrentTab('notes') }, 'ALFIE’S CLASS NOTES')
      ),
      currentTab === 'hub' && e('div', { className: 'story-mode-container fade-in' },
        e('h2', { className: 'matrix-text' }, 'ACTIVE ENVIRONMENTS'),
        e('div', { className: 'story-grid' },
            e('div', { className: 'story-card', onClick: () => {
                if (onMusicChange) onMusicChange("assets/rpg1.mp3");
                onModeChange('story');
            } },
                e('div', { className: 'story-title' }, 'STORY MODE'),
                e('div', { className: 'story-meta' }, 'ALFIE IN OSTEOPOLIS (RPG)')
            ),
            e('div', { className: 'story-card', onClick: () => onModeChange('siege') },
                e('div', { className: 'story-title' }, 'OSTEO SIEGE'),
                e('div', { className: 'story-meta' }, 'ROGUE-LITE DEFENSE')
            ),
            e('div', { className: 'story-card', onClick: () => onModeChange('practice_test') },
                e('div', { className: 'story-title' }, 'PRACTICE TEST'),
                e('div', { className: 'story-meta' }, 'MODULE 4 EXAMINATION')
            )
        )
      ),
      currentTab === 'resources' && e('div', { className: 'story-mode-container fade-in' },
        e('h2', { className: 'matrix-text' }, 'DOCUMENTATION'),
        e('div', { className: 'story-grid' },
            e('div', { className: 'story-card', onClick: () => onModeChange('resources') },
                e('div', { className: 'story-title' }, 'PHYSOLOGY DATA'),
                e('div', { className: 'story-meta' }, 'FULL MSK CURRICULUM')
            ),
            e('div', { className: 'story-card', onClick: onGeneratePDF },
                e('div', { className: 'story-title' }, 'DOWNLOAD PDF'),
                e('div', { className: 'story-meta' }, 'REMEDIATION REPORT')
            )
        )
      ),
      currentTab === 'notes' && e(Module4ClassNotes)
    );
  }

  return e('div', { className: 'mod3-engine-root' },
    e('div', { className: 'mod3-viewport', style: { padding: 0, overflow: 'hidden' } }, renderGame())
  );
}
