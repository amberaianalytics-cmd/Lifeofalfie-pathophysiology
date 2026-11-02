import React, { useState, useEffect, useRef } from 'react';
import { MODULE4_CLASS_NOTES } from './Module4ClassNotesData.js';

const e = React.createElement;

export default function Module4ClassNotes() {
    const scrollContainerRef = useRef(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                setShowBackToTop(scrollContainerRef.current.scrollTop > 400);
            }
        };
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const scrollToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const top = element.offsetTop - 20;
            container.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const formatText = (text) => {
        if (!text) return '';
        const parts = text.split(/\^\^(.*?)\^\^/g);
        return parts.map((part, i) => {
            if (i % 2 === 1) {
                return e('span', { key: i, className: 'high-yield-highlight' }, part);
            }
            return part;
        });
    };

    const renderItem = (item, index) => {
        switch (item.type) {
            case 'high_yield':
                return e('div', { key: index, className: 'notes-high-yield-box' },
                    e('h3', { className: 'notes-sub-title' }, item.title),
                    e('ul', { className: 'notes-list' },
                        item.points.map((p, i) => e('li', { key: i }, formatText(p)))
                    ),
                    item.note && e('p', { className: 'notes-special-note' }, formatText(item.note))
                );
            case 'differentiation':
                return e('div', { key: index, className: 'notes-diff-grid' },
                    e('div', { className: 'diff-box' },
                        e('h4', { className: 'diff-title' }, item.left.title),
                        e('p', { className: 'diff-desc' }, item.left.desc),
                        e('ul', null, item.left.examples.map((ex, i) => e('li', { key: i }, formatText(ex))))
                    ),
                    e('div', { className: 'diff-box' },
                        e('h4', { className: 'diff-title' }, item.right.title),
                        e('p', { className: 'diff-desc' }, item.right.desc),
                        e('ul', null, item.right.examples.map((ex, i) => e('li', { key: i }, formatText(ex))))
                    )
                );
            case 'table':
                return e('div', { key: index, className: 'notes-table-container' },
                    e('h3', { className: 'notes-sub-title' }, item.title),
                    e('div', { className: 'table-scroll-wrapper' },
                        e('table', { className: 'notes-table' },
                            e('thead', null,
                                e('tr', null, item.headers.map((h, i) => e('th', { key: i }, h)))
                            ),
                            e('tbody', null,
                                item.rows.map((row, ri) => e('tr', { key: ri },
                                    row.map((cell, ci) => e('td', { key: ci }, formatText(cell)))
                                ))
                            )
                        )
                    ),
                    item.note && e('p', { className: 'notes-footer' }, formatText(item.note))
                );
            case 'mechanism':
                return e('div', { key: index, className: 'notes-mechanism-box' },
                    e('h3', { className: 'notes-sub-title' }, item.title),
                    item.steps.map((step, i) => e('div', { key: i, className: 'mechanism-step' },
                        e('div', { className: 'step-label' }, step.label),
                        e('div', { className: 'step-text' }, formatText(step.text))
                    )),
                    item.note && e('p', { className: 'notes-footer' }, formatText(item.note))
                );
            case 'mechanism_diagram':
                return e('div', { key: index, className: 'notes-mechanism-box' },
                    e('h3', { className: 'notes-sub-title' }, item.title),
                    e('div', { className: 'diagram-flow-compact' },
                        item.chain.map((step, i) => e('div', { key: i, className: 'compact-step' },
                            formatText(step),
                            i < item.chain.length - 1 && e('div', { className: 'compact-arrow' }, '↓')
                        ))
                    ),
                    item.notes && e('p', { className: 'notes-footer' }, formatText(item.notes))
                );
            case 'section':
                return e('div', { key: index, className: 'notes-text-section' },
                    e('h3', { className: 'notes-sub-title' }, item.title),
                    e('p', null, formatText(item.content))
                );
            case 'disorder':
                return e('div', { key: index, className: 'notes-disorder-box', id: item.id },
                    e('h3', { className: 'disorder-title' }, formatText(item.title)),
                    e('p', { className: 'disorder-desc' }, formatText(item.description)),
                    item.mechanism_chain && e('div', { className: 'disorder-chain' },
                        e('h4', null, 'Mechanism Chain'),
                        e('div', { className: 'mini-chain' },
                            item.mechanism_chain.map((step, i) => e('span', { key: i },
                                formatText(step),
                                i < item.mechanism_chain.length - 1 && e('span', { className: 'chain-arrow' }, ' → ')
                            ))
                        )
                    ),
                    item.clinical && e('div', { className: 'disorder-clinical' },
                        e('h4', null, 'Clinical Pattern'),
                        e('ul', null, item.clinical.map((c, i) => e('li', { key: i }, formatText(c))))
                    ),
                    item.distinguish && e('div', { className: 'disorder-distinguish' },
                        e('strong', null, 'Distinguish From: '), e('span', null, formatText(item.distinguish))
                    )
                );
            case 'summary':
                return e('div', { key: index, className: 'notes-summary-box' },
                    e('h3', { className: 'notes-sub-title' }, item.title),
                    e('ul', null, item.points.map((p, i) => e('li', { key: i }, formatText(p)))),
                    e('div', { className: 'central-principle' },
                        e('h4', null, 'CENTRAL PRINCIPLE'),
                        e('p', null, formatText(item.central_principle))
                    )
                );
            default:
                return null;
        }
    };

    return e('div', { className: 'notes-panel-root' },
        e('div', { className: 'notes-header-sticky' },
            e('div', { className: 'notes-title-main' }, 'MODULE 4'),
            e('div', { className: 'notes-sub-main' }, "Alfie's Class Notes"),
            e('div', { className: 'notes-meta-info' }, 
                'Student Notes | Revision: 5/24/26',
                e('br'),
                'Gautam Modali, M.D. | Arizona College | HCR 240'
            )
        ),
        e('div', { ref: scrollContainerRef, className: 'notes-scroll-area' },
            e('div', { className: 'contents-panel' },
                e('h4', null, 'CONTENTS'),
                e('ul', { className: 'contents-list' },
                    MODULE4_CLASS_NOTES.map(section => 
                        e('li', { key: section.id, onClick: () => scrollToSection(section.id) }, section.title)
                    )
                )
            ),
            MODULE4_CLASS_NOTES.map(section => 
                e('section', { key: section.id, id: section.id, className: 'notes-main-section' },
                    e('h2', { className: 'section-title' }, section.title),
                    section.items.map((item, idx) => renderItem(item, idx))
                )
            ),
            e('div', { className: 'notes-end-cap' }, 'END OF CLASS NOTES')
        ),
        showBackToTop && e('button', { className: 'back-to-top-btn', onClick: scrollToTop }, '▲ BACK TO TOP'),
        e('style', null, `
            .notes-panel-root {
                display: flex;
                flex-direction: column;
                height: 100%;
                color: #e0e0e0;
                background: #0a0a0a;
                font-family: 'Courier New', Courier, monospace;
            }
            .notes-header-sticky {
                padding: 15px 25px;
                background: #111;
                border-bottom: 2px solid #00ff41;
                flex-shrink: 0;
            }
            .notes-title-main {
                color: #00ff41;
                font-size: 1.4rem;
                font-weight: bold;
                letter-spacing: 2px;
            }
            .notes-sub-main {
                font-size: 1.1rem;
                margin-bottom: 5px;
            }
            .notes-meta-info {
                font-size: 0.8rem;
                color: #888;
                line-height: 1.4;
            }
            .notes-scroll-area {
                flex: 1;
                overflow-y: auto;
                padding: 20px 25px;
                scroll-behavior: smooth;
            }
            .contents-panel {
                background: #1a1a1a;
                border: 1px solid #333;
                padding: 15px;
                margin-bottom: 30px;
            }
            .contents-panel h4 {
                color: #00ff41;
                margin-top: 0;
                border-bottom: 1px solid #333;
                padding-bottom: 5px;
            }
            .contents-list {
                list-style: none;
                padding: 0;
                margin: 10px 0 0 0;
            }
            .contents-list li {
                color: #aaa;
                cursor: pointer;
                padding: 4px 0;
                font-size: 0.9rem;
                transition: color 0.2s;
            }
            .contents-list li:hover {
                color: #00ff41;
                text-decoration: underline;
            }
            .section-title {
                color: #00ff41;
                border-bottom: 1px solid #00ff41;
                padding-bottom: 10px;
                margin-top: 40px;
                margin-bottom: 20px;
            }
            .notes-sub-title {
                color: #fff;
                margin-top: 25px;
                margin-bottom: 10px;
                border-left: 4px solid #00ff41;
                padding-left: 10px;
            }
            .high-yield-highlight {
                background: rgba(0, 255, 65, 0.2);
                border-bottom: 1px dashed #00ff41;
                padding: 0 2px;
                color: #00ff41;
            }
            .notes-high-yield-box, .notes-text-section, .notes-summary-box {
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .notes-list {
                padding-left: 20px;
            }
            .notes-list li {
                margin-bottom: 8px;
            }
            .notes-special-note {
                background: #1a1a1a;
                padding: 10px;
                border-left: 3px solid #ffcc00;
                font-style: italic;
            }
            .notes-diff-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin: 20px 0;
            }
            .diff-box {
                background: #151515;
                border: 1px solid #333;
                padding: 15px;
            }
            .diff-title {
                color: #00ff41;
                margin-top: 0;
            }
            .diagram-flow-compact {
                background: #111;
                border: 1px dashed #444;
                padding: 20px;
                text-align: center;
            }
            .compact-step {
                margin: 5px 0;
            }
            .compact-arrow, .chain-arrow {
                color: #00ff41;
                font-weight: bold;
                padding: 5px 0;
            }
            .notes-table-container {
                margin: 25px 0;
            }
            .table-scroll-wrapper {
                overflow-x: auto;
            }
            .notes-table {
                width: 100%;
                border-collapse: collapse;
                background: #111;
                font-size: 0.9rem;
            }
            .notes-table th, .notes-table td {
                border: 1px solid #333;
                padding: 10px;
                text-align: left;
            }
            .notes-table th {
                background: #1a1a1a;
                color: #00ff41;
            }
            .notes-table tr:hover {
                background: #1a1a1a;
            }
            .mechanism-step {
                background: #151515;
                border-left: 3px solid #00ff41;
                padding: 10px 15px;
                margin-bottom: 10px;
            }
            .step-label {
                font-weight: bold;
                color: #00ff41;
                font-size: 0.8rem;
                margin-bottom: 5px;
            }
            .notes-disorder-box {
                background: #1a1a1a;
                border: 1px solid #333;
                padding: 20px;
                margin-bottom: 30px;
            }
            .disorder-title {
                color: #00ff41;
                margin-top: 0;
                font-size: 1.2rem;
            }
            .disorder-desc {
                font-style: italic;
                color: #bbb;
                margin-bottom: 15px;
            }
            .disorder-chain {
                background: #111;
                padding: 10px;
                margin: 15px 0;
                border-radius: 4px;
            }
            .disorder-chain h4, .disorder-clinical h4 {
                margin-top: 0;
                font-size: 0.9rem;
                color: #888;
            }
            .mini-chain {
                font-size: 0.9rem;
                line-height: 1.6;
            }
            .notes-footer {
                font-size: 0.8rem;
                color: #888;
                font-style: italic;
                margin-top: 10px;
            }
            .central-principle {
                background: rgba(0, 255, 65, 0.1);
                border: 1px solid #00ff41;
                padding: 15px;
                margin-top: 20px;
            }
            .central-principle h4 {
                margin-top: 0;
                color: #00ff41;
            }
            .back-to-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #00ff41;
                color: #000;
                border: none;
                padding: 10px 15px;
                font-family: inherit;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 0 10px rgba(0,255,65,0.5);
                z-index: 100;
            }
            .back-to-top-btn:hover {
                background: #00cc33;
            }
            .notes-end-cap {
                text-align: center;
                color: #444;
                margin-top: 50px;
                font-size: 0.8rem;
                letter-spacing: 5px;
                border-top: 1px solid #222;
                padding-top: 20px;
            }

            @media (max-width: 768px) {
                .notes-diff-grid {
                    grid-template-columns: 1fr;
                }
                .notes-panel-root {
                    font-size: 14px;
                }
                .notes-title-main {
                    font-size: 1.2rem;
                }
            }
        `)
    );
}
