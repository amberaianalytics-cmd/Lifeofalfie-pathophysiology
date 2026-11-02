
import React, { useState, useEffect } from 'react';
import Module1Story3D from './Module1Story3D.js';
import { 
    MODULE1_RIG_METADATA,
    MODULE1_QUIZ_DATA,
    MODULE1_PATHOPHYSIOLOGY_DATA
} from './module1-content.js';

const e = React.createElement;

// --- SHARED RESOURCE VIEWER ---
function ResourceViewer({ onBack }) {
    return e('div', { className: 'mod3-sim-screen fade-in' },
        e('div', { className: 'sim-header' },
            e('div', { className: 'sim-type-badge' }, 'LEARNING RESOURCES'),
            e('button', { className: 'hud-back-btn', onClick: onBack }, 'BACK')
        ),
        e('div', { className: 'resources-scroll-area', style: { padding: '20px', color: '#fff', overflowY: 'auto', maxHeight: '80vh' } },
            e('h2', { className: 'matrix-text' }, 'MODULE 1 CURRICULUM OVERVIEW'),
            e('div', { className: 'resource-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' } },
                MODULE1_RIG_METADATA.map(ch => e('div', { key: ch.id, className: 'resource-card', style: { background: 'rgba(0, 255, 65, 0.05)', border: '1px solid rgba(0, 255, 65, 0.2)', padding: '15px' } },
                    e('h3', { style: { color: '#00ff41' } }, ch.label),
                    e('p', { style: { fontSize: '0.9rem' } }, "Mechanism of cellular injury or hemodynamic foundation.")
                ))
            )
        )
    );
}

// --- MAIN ENGINE ROOT ---
export default function Module1Engine({ operatorName, onBack, activeMode, onModeChange, onMusicChange, onGeneratePDF, onReportResult }) {
  const [currentTab, setCurrentTab] = useState('hub'); // 'hub', 'resources'

  // Manage Hub Music: assets/loam2a.mp3
  useEffect(() => {
    if (!activeMode) {
      if (onMusicChange) onMusicChange("assets/loam2a.mp3");
    }
  }, [activeMode, onMusicChange]);

  const renderGame = () => {
    if (activeMode === 'story') {
        return e(Module1Story3D, {
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
        e('div', { className: 'matrix-text hub-title-glow' }, 'MODULE 1: THE FESTIVAL'),
        e('button', { className: 'btn-return-home', onClick: onBack }, '← CAMPUS HUB')
      ),
      e('div', { className: 'mod-tabs' },
        e('button', { className: `tab-btn ${currentTab === 'hub' ? 'active' : ''}`, onClick: () => setCurrentTab('hub') }, 'MOD 1 HUB'),
        e('button', { className: `tab-btn ${currentTab === 'resources' ? 'active' : ''}`, onClick: () => setCurrentTab('resources') }, 'LEARNING RESOURCES')
      ),
      currentTab === 'hub' ? e('div', { className: 'story-mode-container fade-in' },
        e('h2', { className: 'matrix-text' }, 'ACTIVE ENVIRONMENTS'),
        e('div', { className: 'story-grid' },
            e('div', { className: 'story-card', onClick: () => onModeChange('story') },
                e('div', { className: 'story-title' }, 'STORY MODE'),
                e('div', { className: 'story-meta' }, '3D CLINICAL EXPLORATION')
            )
        )
      ) :
      e('div', { className: 'story-mode-container fade-in' },
        e('h2', { className: 'matrix-text' }, 'DOCUMENTATION'),
        e('div', { className: 'story-grid' },
            e('div', { className: 'story-card', onClick: () => onModeChange('resources') },
                e('div', { className: 'story-title' }, 'PATHOLOGY DATA'),
                e('div', { className: 'story-meta' }, 'MODULE 1 CURRICULUM')
            ),
            e('div', { className: 'story-card', onClick: onGeneratePDF },
                e('div', { className: 'story-title' }, 'DOWNLOAD PDF'),
                e('div', { className: 'story-meta' }, 'MODULE 1 REPORT')
            )
        )
      )
    );
  }

  return e('div', { className: 'mod3-engine-root' },
    e('div', { className: 'mod3-viewport', style: { padding: 0, overflow: 'hidden' } }, renderGame())
  );
}
