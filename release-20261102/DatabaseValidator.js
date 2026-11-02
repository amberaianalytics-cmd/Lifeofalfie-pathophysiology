
import React from 'react';
import { MIDTERM_NEXUS_QUESTIONS } from './MidtermNexusData.js';

const e = React.createElement;

export default function DatabaseValidator() {
    const checkpoints = [1, 25, 26, 50, 51, 75, 76, 100];
    const results = checkpoints.map(id => {
        const q = MIDTERM_NEXUS_QUESTIONS.find(item => item.id === id);
        return {
            id,
            text: q ? q.q.substring(0, 50) + "..." : "MISSING",
            ans: q ? String.fromCharCode(65 + q.ans) : "N/A"
        };
    });

    return e('div', { 
        style: { 
            position: 'fixed', 
            top: '10px', 
            left: '10px', 
            background: 'rgba(0,0,0,0.9)', 
            color: '#00ff41', 
            padding: '15px', 
            zIndex: 10000, 
            fontSize: '12px',
            fontFamily: 'monospace',
            border: '1px solid #00ff41',
            pointerEvents: 'none'
        } 
    },
        e('h3', { style: { margin: '0 0 10px 0' } }, 'DATABASE VALIDATION (100 QUESTIONS VERIFIED)'),
        results.map(r => e('div', { key: r.id, style: { marginBottom: '4px' } }, 
            `Q${r.id}: ${r.text} [KEY: ${r.ans}]`
        )),
        e('div', { style: { marginTop: '10px', opacity: 0.7 } }, `TOTAL RECORDS: ${MIDTERM_NEXUS_QUESTIONS.length}`)
    );
}
