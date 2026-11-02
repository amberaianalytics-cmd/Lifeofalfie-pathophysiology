/**
 * Alfie's Adaptive Recall - Central Hub Component
 */
import React, { useState, useEffect, useMemo } from 'react';
import { RecallEngine, RECALL_RATINGS, RECALL_STATES } from './src/systems/RecallEngine.js';
import { RecallStorage } from './src/systems/RecallStorage.js';
import { RECALL_DECKS } from './src/data/RecallDecks.js';

const e = React.createElement;

const RECALL_TABS = [
    { id: 'mod1', label: 'Module 1', modules: [1] },
    { id: 'mod2', label: 'Module 2', modules: [2] },
    { id: 'mod3', label: 'Module 3', modules: [3] },
    { id: 'midterm', label: 'Midterm Adaptive Recall', modules: [1, 2, 3] },
    { id: 'mod4', label: 'Module 4', modules: [4] },
    { id: 'mod5', label: 'Module 5', modules: [5] },
    { id: 'mod6', label: 'Module 6', modules: [6] },
    { id: 'mod7', label: 'Module 7', modules: [7] },
    { id: 'final', label: 'Final Adaptive Recall', modules: [4, 5, 6, 7] }
];

const MODULE_4_SUBDECKS = [
    { id: 'entire', label: 'Entire Module' },
    { id: '01 Foundations', label: 'Foundations' },
    { id: '02 Osteoporosis', label: 'Osteoporosis' },
    { id: '03 Osteoarthritis', label: 'Osteoarthritis' },
    { id: '04 Degenerative Disc Disease', label: 'Degenerative Disc Disease' },
    { id: '05 Osteomyelitis', label: 'Osteomyelitis' },
    { id: '06 Lyme Disease', label: 'Lyme Disease' },
    { id: '07 Gout', label: 'Gout' },
    { id: '08 Comparisons', label: 'Disease Comparisons' },
    { id: '09 Clinical Cases', label: 'Clinical Cases' },
    { id: '10 Final Integration', label: 'Final Integration' }
];

export default function AdaptiveRecallUI({ onBack }) {
    const [progressMap, setProgressMap] = useState(() => RecallStorage.loadProgress());
    const [activeTabId, setActiveTabId] = useState('mod1');
    const [activeSubdeckId, setActiveSubdeckId] = useState('entire');
    const [sessionQueue, setSessionQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewState, setViewState] = useState('menu'); // 'menu', 'study', 'summary', 'analytics'
    const [isRevealed, setIsRevealed] = useState(false);
    const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0, xp: 0 });

    // Derive the active deck based on the selected tab and subdeck
    const activeDeck = useMemo(() => {
        const tab = RECALL_TABS.find(t => t.id === activeTabId);
        if (!tab) return null;

        let cards = RECALL_DECKS
            .filter(d => tab.modules.includes(d.module))
            .flatMap(d => d.cards.map(c => ({ ...c, moduleLabel: `Module ${d.module}` })));

        // If Module 4 is selected, apply subdeck filter
        if (activeTabId === 'mod4' && activeSubdeckId !== 'entire') {
            cards = cards.filter(c => c.topic === activeSubdeckId || c.subdeck === activeSubdeckId);
        }

        const subdeckLabel = activeTabId === 'mod4' && activeSubdeckId !== 'entire' 
            ? MODULE_4_SUBDECKS.find(s => s.id === activeSubdeckId)?.label 
            : null;

        return {
            id: tab.id + (subdeckLabel ? `_${activeSubdeckId}` : ''),
            name: subdeckLabel ? `MODULE 4: ${subdeckLabel.toUpperCase()}` : tab.label.toUpperCase(),
            cards: cards
        };
    }, [activeTabId, activeSubdeckId]);

    // Deck metrics
    const metrics = useMemo(() => {
        if (!activeDeck) return null;
        const total = activeDeck.cards.length;
        const processed = activeDeck.cards.filter(c => progressMap[c.id] && progressMap[c.id].reviewCount > 0);
        const mastered = activeDeck.cards.filter(c => progressMap[c.id] && progressMap[c.id].learningState === RECALL_STATES.MASTERED);
        const due = activeDeck.cards.filter(c => progressMap[c.id] && progressMap[c.id].nextReviewDate <= Date.now());
        
        // Topic coverage (Subdecks)
        const topics = {};
        activeDeck.cards.forEach(c => {
            const topicName = c.topic || 'General';
            if (!topics[topicName]) topics[topicName] = { total: 0, mastered: 0, learned: 0 };
            topics[topicName].total++;
            if (progressMap[c.id]) {
                if (progressMap[c.id].reviewCount > 0) topics[topicName].learned++;
                if (progressMap[c.id].learningState === RECALL_STATES.MASTERED) {
                    topics[topicName].mastered++;
                }
            }
        });

        const avgMastery = processed.length > 0 
            ? Math.round(processed.reduce((acc, c) => acc + progressMap[c.id].masteryScore, 0) / processed.length)
            : 0;

        // Current Streak and XP (Mocked or derived from global progressMap for this session/deck)
        // For simplicity, we can sum XP gained in history for these specific cards
        let totalXP = 0;
        processed.forEach(c => {
            const hist = progressMap[c.id]?.history || [];
            hist.forEach(h => totalXP += (h.rating + 1) * 10);
        });

        return {
            total,
            learned: processed.length,
            mastered: mastered.length,
            due: due.length,
            remaining: total - processed.length,
            avgMastery,
            topics,
            totalXP,
            completionRate: total > 0 ? Math.round((mastered.length / total) * 100) : 0
        };
    }, [activeDeck, progressMap]);

    const startStudy = (mode) => {
        const queue = RecallEngine.getStudyQueue(activeDeck, progressMap, mode);
        if (queue.length === 0) {
            alert("No cards due for review in this mode!");
            return;
        }
        setSessionQueue(queue);
        setCurrentIndex(0);
        setIsRevealed(false);
        setSessionStats({ correct: 0, total: 0, xp: 0 });
        setViewState('study');
    };

    const handleRating = (rating) => {
        const currentCP = sessionQueue[currentIndex];
        const newProgress = RecallEngine.processReview(currentCP.progress, rating);
        
        const newProgressMap = { ...progressMap, [currentCP.card.id]: newProgress };
        setProgressMap(newProgressMap);
        RecallStorage.saveProgress(newProgressMap);

        // Update session stats
        const xpGained = (rating + 1) * 10;
        setSessionStats(prev => ({
            correct: prev.correct + (rating > 0 ? 1 : 0),
            total: prev.total + 1,
            xp: prev.xp + xpGained
        }));

        if (currentIndex < sessionQueue.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsRevealed(false);
        } else {
            setViewState('summary');
        }
    };

    // Keyboard listeners
    useEffect(() => {
        if (viewState !== 'study') return;

        const handleKey = (ev) => {
            if (!isRevealed) {
                if (ev.code === 'Space' || ev.code === 'Enter') {
                    setIsRevealed(true);
                }
            } else {
                const val = parseInt(ev.key);
                if (val >= 0 && val <= 3) {
                    handleRating(val);
                }
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [viewState, isRevealed, currentIndex, sessionQueue]);

    const renderTabs = () => {
        return e('div', { className: 'recall-navigation' },
            e('div', { className: 'recall-tabs-bar' },
                RECALL_TABS.map(tab => e('button', {
                    key: tab.id,
                    className: `recall-tab-btn ${activeTabId === tab.id ? 'active' : ''}`,
                    onClick: () => {
                        if (viewState === 'menu' || viewState === 'analytics') {
                            setActiveTabId(tab.id);
                            setActiveSubdeckId('entire'); // Reset subdeck when changing module
                            if (viewState === 'analytics') setViewState('menu');
                        }
                    },
                    disabled: viewState === 'study' || viewState === 'summary'
                }, tab.label.toUpperCase()))
            ),
            activeTabId === 'mod4' && e('div', { className: 'recall-subtabs-bar fade-in' },
                MODULE_4_SUBDECKS.map(sub => e('button', {
                    key: sub.id,
                    className: `recall-subtab-btn ${activeSubdeckId === sub.id ? 'active' : ''}`,
                    onClick: () => setActiveSubdeckId(sub.id),
                    disabled: viewState === 'study' || viewState === 'summary'
                }, sub.label.toUpperCase()))
            )
        );
    };

    const renderMenu = () => {
        return e('div', { className: 'recall-menu fade-in' },
            e('div', { className: 'recall-header-box' },
                e('h2', { className: 'matrix-text main-title' }, activeDeck?.name || 'ALFIE’S ADAPTIVE RECALL'),
                e('div', { className: 'recall-dashboard-grid' },
                    e('div', { className: 'dash-tile' },
                        e('div', { className: 'dash-val' }, metrics?.total),
                        e('div', { className: 'dash-lbl' }, 'CARDS TOTAL')
                    ),
                    e('div', { className: 'dash-tile' },
                        e('div', { className: 'dash-val' }, metrics?.learned),
                        e('div', { className: 'dash-lbl' }, 'CARDS LEARNED')
                    ),
                    e('div', { className: 'dash-tile' },
                        e('div', { className: 'dash-val' }, metrics?.remaining),
                        e('div', { className: 'dash-lbl' }, 'CARDS REMAINING')
                    ),
                    e('div', { className: 'dash-tile' },
                        e('div', { className: 'dash-val' }, metrics?.mastered),
                        e('div', { className: 'dash-lbl' }, 'CARDS MASTERED')
                    ),
                    e('div', { className: 'dash-tile highlight-due' },
                        e('div', { className: 'dash-val' }, metrics?.due),
                        e('div', { className: 'dash-lbl' }, 'CARDS DUE')
                    ),
                    e('div', { className: 'dash-tile highlight-mastery' },
                        e('div', { className: 'dash-val' }, `${metrics?.avgMastery}%`),
                        e('div', { className: 'dash-lbl' }, 'MASTERY %')
                    ),
                    e('div', { className: 'dash-tile' },
                        e('div', { className: 'dash-val' }, `${Math.ceil(metrics?.total * 0.5)}m`),
                        e('div', { className: 'dash-lbl' }, 'EST. STUDY TIME')
                    ),
                    e('div', { className: 'dash-tile' },
                        e('div', { className: 'dash-val' }, '0'),
                        e('div', { className: 'dash-lbl' }, 'CURRENT STREAK')
                    ),
                    e('div', { className: 'dash-tile' },
                        e('div', { className: 'dash-val' }, metrics?.totalXP),
                        e('div', { className: 'dash-lbl' }, 'DECK XP')
                    )
                )
            ),
            e('div', { className: 'study-modes-grid' },
                e('button', { className: 'mode-btn smart', onClick: () => startStudy('smart') },
                    e('div', { className: 'mode-title' }, 'SMART REVIEW'),
                    e('div', { className: 'mode-desc' }, 'Prioritize overdue and weak concepts')
                ),
                e('button', { className: 'mode-btn new', onClick: () => startStudy('new') },
                    e('div', { className: 'mode-title' }, 'NEW MATERIAL'),
                    e('div', { className: 'mode-desc' }, 'Learn fresh concepts gradually')
                ),
                e('button', { className: 'mode-btn weak', onClick: () => startStudy('weakest') },
                    e('div', { className: 'mode-title' }, 'WEAKEST TOPICS'),
                    e('div', { className: 'mode-desc' }, 'Drill areas requiring extra reinforcement')
                ),
                e('button', { className: 'mode-btn analytics', onClick: () => setViewState('analytics') },
                    e('div', { className: 'mode-title' }, 'ANALYTICS'),
                    e('div', { className: 'mode-desc' }, 'View detailed coverage and mastery maps')
                )
            ),
            e('button', { className: 'btn-cyber recall-exit', onClick: onBack }, 'EXIT SYSTEM')
        );
    };

    const renderStudy = () => {
        const currentCP = sessionQueue[currentIndex];
        const card = currentCP.card;

        return e('div', { className: 'recall-study-view fade-in' },
            e('div', { className: 'study-hud' },
                e('div', { className: 'hud-left' }, `CARD ${currentIndex + 1} / ${sessionQueue.length}`),
                e('div', { className: 'hud-right' }, 
                    e('span', { className: 'xp-gain' }, `Session XP: ${sessionStats.xp}`),
                    e('button', { className: 'hud-quit', onClick: () => setViewState('menu') }, 'QUIT')
                )
            ),
            e('div', { className: `recall-card ${isRevealed ? 'revealed' : ''}` },
                e('div', { className: 'card-front' },
                    e('div', { className: 'card-category' }, 
                        card.moduleLabel ? `${card.moduleLabel} | ${card.category.toUpperCase()}` : card.category.toUpperCase()
                    ),
                    e('div', { className: 'card-content' }, card.front)
                ),
                isRevealed && e('div', { className: 'card-back fade-in' },
                    e('div', { className: 'answer-text' }, card.back),
                    e('div', { className: 'explanation-box' }, 
                        e('div', { className: 'label' }, 'EXPLANATION'),
                        e('div', { className: 'text' }, card.explanation)
                    ),
                    card.mechanism && e('div', { className: 'mechanism-box' },
                        e('div', { className: 'label' }, 'MECHANISM'),
                        e('div', { className: 'text' }, card.mechanism)
                    ),
                    card.pearl && e('div', { className: 'pearl-box' },
                        e('div', { className: 'label' }, 'CLINICAL PEARL'),
                        e('div', { className: 'text' }, card.pearl)
                    )
                )
            ),
            e('div', { className: 'recall-controls' },
                !isRevealed ? 
                    e('button', { className: 'btn-cyber reveal-btn', onClick: () => setIsRevealed(true) }, 'REVEAL ANSWER') :
                    e('div', { className: 'rating-buttons' },
                        e('button', { className: 'rate-btn again', onClick: () => handleRating(RECALL_RATINGS.AGAIN) },
                            e('div', { className: 'val' }, '0'),
                            e('div', { className: 'lbl' }, 'AGAIN')
                        ),
                        e('button', { className: 'rate-btn hard', onClick: () => handleRating(RECALL_RATINGS.HARD) },
                            e('div', { className: 'val' }, '1'),
                            e('div', { className: 'lbl' }, 'HARD')
                        ),
                        e('button', { className: 'rate-btn good', onClick: () => handleRating(RECALL_RATINGS.GOOD) },
                            e('div', { className: 'val' }, '2'),
                            e('div', { className: 'lbl' }, 'GOOD')
                        ),
                        e('button', { className: 'rate-btn easy', onClick: () => handleRating(RECALL_RATINGS.EASY) },
                            e('div', { className: 'val' }, '3'),
                            e('div', { className: 'lbl' }, 'EASY')
                        )
                    )
            )
        );
    };

    const renderSummary = () => {
        return e('div', { className: 'recall-summary fade-in' },
            e('h2', { className: 'matrix-text' }, 'SESSION COMPLETE'),
            e('div', { className: 'summary-stats' },
                e('div', { className: 'stat-row' }, 
                    e('span', null, 'Cards Reviewed'),
                    e('span', null, sessionStats.total)
                ),
                e('div', { className: 'stat-row' }, 
                    e('span', null, 'Accuracy'),
                    e('span', null, sessionStats.total > 0 ? `${Math.round((sessionStats.correct / sessionStats.total) * 100)}%` : '0%')
                ),
                e('div', { className: 'stat-row highlighted' }, 
                    e('span', null, 'XP Gained'),
                    e('span', null, `+${sessionStats.xp}`)
                )
            ),
            e('button', { className: 'btn-cyber', onClick: () => setViewState('menu') }, 'RETURN TO MENU')
        );
    };

    const renderAnalytics = () => {
        const sortedTopics = Object.entries(metrics.topics).sort((a, b) => (a[1].mastered / a[1].total) - (b[1].mastered / b[1].total));
        const learnedCards = metrics.learned;
        const totalCards = metrics.total;

        return e('div', { className: 'recall-analytics fade-in' },
            e('div', { className: 'analytics-header' },
                e('h3', { className: 'matrix-text' }, 'ANALYTICS: ' + activeDeck.name),
                e('button', { className: 'hud-back-btn', onClick: () => setViewState('menu') }, 'BACK')
            ),
            e('div', { className: 'analytics-summary-bar' },
                e('div', { className: 'analytic-tile' },
                    e('div', { className: 'tile-val' }, totalCards),
                    e('div', { className: 'tile-lbl' }, 'TOTAL CARDS')
                ),
                e('div', { className: 'analytic-tile' },
                    e('div', { className: 'tile-val' }, learnedCards),
                    e('div', { className: 'tile-lbl' }, 'LEARNED')
                ),
                e('div', { className: 'analytic-tile' },
                    e('div', { className: 'tile-val' }, totalCards - learnedCards),
                    e('div', { className: 'tile-lbl' }, 'REMAINING')
                )
            ),
            e('div', { className: 'analytics-scroll-area' },
                e('h4', { className: 'matrix-text', style: { fontSize: '0.8rem', color: '#00ff41', marginBottom: '15px' } }, 'SUBDECK MASTERY'),
                sortedTopics.map(([name, data]) => {
                    const perc = Math.round((data.mastered / data.total) * 100);
                    const learnedPerc = Math.round((data.learned / data.total) * 100);
                    return e('div', { key: name, className: 'topic-mastery-row' },
                        e('div', { className: 'topic-info' },
                            e('span', { className: 'topic-name' }, name),
                            e('span', { className: 'topic-perc' }, `${perc}%`)
                        ),
                        e('div', { className: 'mastery-track' },
                            e('div', { className: 'mastery-fill learned', style: { width: `${learnedPerc}%`, opacity: 0.3 } }),
                            e('div', { className: 'mastery-fill', style: { width: `${perc}%` } })
                        ),
                        e('div', { className: 'topic-meta' }, `${data.mastered} / ${data.total} Mastered (${data.learned} learned)`)
                    );
                })
            )
        );
    };

    return e('div', { className: 'adaptive-recall-root' },
        renderTabs(),
        viewState === 'menu' && renderMenu(),
        viewState === 'study' && renderStudy(),
        viewState === 'summary' && renderSummary(),
        viewState === 'analytics' && renderAnalytics()
    );
}
