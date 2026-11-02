import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
    MOD4_DISEASE_CHAPTERS, 
    MOD4_COMPARISONS, 
    MOD4_CHAPTERS, 
    MOD4_CLINICAL_CASES,
    MOD4_QUESTS,
    MOD4_INTERACTIVES
} from './module4-content.js';
import { EventEngine } from './src/systems/EventEngine.js';
import { NPC_REGISTRY, MAP_REGISTRY } from './src/data/Registries.js';
import { 
    RPG_ASSETS, 
    NARRATION_LINES, 
    DISEASE_IDS, 
    NPC_TO_DISEASE, 
    DEFAULT_NPC_DIALOGUE 
} from './src/data/Module4RPGRegistry.js';

const e = React.createElement;

// --- GAME CONSTANTS ---
const VIEWPORT_WIDTH = 1024;
const VIEWPORT_HEIGHT = 576;
const WORLD_WIDTH = 1024; 
const WORLD_HEIGHT = 576;
const PLAYER_SIZE = 48;
const MOVE_SPEED = 4;

export default function Module4StoryRPG({ onBack, onMusicChange }) {
    const canvasRef = useRef(null);
    const [dialogue, setDialogue] = useState(null); 
    const [currentLocation, setCurrentLocation] = useState('osteophyta'); 
    const [gameState, setGameState] = useState('BLACK_SCREEN'); 
    const [showJournal, setShowJournal] = useState(false);
    const [journalTab, setJournalTab] = useState('DISEASE FILES');
    
    // Educational Framework State
    const [mastery, setMastery] = useState({
        diseases: { osteoporosis: false, osteoarthritis: false, ddd: false, osteomyelitis: false, lyme: false, gout: false },
        infectionStages: [false, false, false, false, false],
        vocab: new Set(),
        clues: 0,
        unlockedComparisons: [],
        discoveredNPCs: new Set()
    });

    const [activeQuest, setActiveQuest] = useState(null); // { diseaseId, stepIndex, steps: [] }
    const [activeActivity, setActiveActivity] = useState(null); // { type, data, onComplete }
    const [notification, setNotification] = useState(null); // { text, type }
    const isWarpingRef = useRef(false);

    const [journalData, setJournalData] = useState({
        diseases: {},
        reflection: "",
        vocabulary: []
    });

    const [cluesFound, setCluesFound] = useState(new Set());
    const phaseStartTimeRef = useRef(Date.now());

    // Event System Initialization
    const eventEngineRef = useRef(null);

    // Plot Flags (World State)
    const [plotFlags, setPlotFlags] = useState({
        INTRO_COMPLETE: false,
        GRANDPA_MET: false,
        ORCHARD_UNLOCKED: false
    });

    // --- DATA INJECTION ---
    const interactivesRef = useRef(MOD4_INTERACTIVES);

    const getNextQuestId = () => {
        if (!mastery.diseases.osteoporosis) return 'osteoporosis';
        if (!mastery.diseases.osteoarthritis) return 'osteoarthritis';
        if (!mastery.diseases.ddd) return 'ddd';
        if (!mastery.diseases.osteomyelitis) return 'osteomyelitis';
        if (!mastery.diseases.lyme) return 'lyme';
        if (!mastery.diseases.gout) return 'gout';
        return null;
    };

    const currentQuestId = getNextQuestId();
    const currentQuestData = currentQuestId ? MOD4_QUESTS[currentQuestId] : null;

    const objectiveLocations = useMemo(() => ({
        'osteoporosis': { x: 512, y: 536, name: "The Cavities of Osteopora (South)", region: "South" },
        'osteoarthritis': { x: 984, y: 268, name: "Chondropolis (East)", region: "East" },
        'ddd': { x: 0, y: 268, name: "Granite Ridge (West)", region: "West" },
        'osteomyelitis': { x: 480, y: 0, name: "The Everforge (North)", region: "North" },
        'lyme': { x: 984, y: 268, name: "Canal City of Synovia (Far East)", region: "Far East" },
        'gout': { x: 300, y: 300, name: "Crystal Monastery (East Dungeons)", region: "East" },
        'visit_mayor': { x: 512, y: 300, name: "Osteophyta City Hall", region: "Center" }
    }), []);

    const getQuestCluesCount = (questId) => {
        return Array.from(cluesFound).filter(id => {
            const item = MOD4_INTERACTIVES.find(i => i.id === id);
            return item && item.questId === questId;
        }).length;
    };

    const currentObjectiveKey = currentQuestId;
    const currentQuestCluesFound = currentQuestId ? getQuestCluesCount(currentQuestId) : 0;

    // --- QUEST ENGINE ---
    const startQuest = (questDef) => {
        if (!questDef) return;
        setActiveQuest({
            diseaseId: questDef.id,
            stepIndex: 0,
            steps: questDef.steps
        });
        executeQuestStep(questDef.steps[0], 0, questDef);
    };

    const executeQuestStep = (step, index, quest) => {
        if (step.type === 'dialogue') {
            setDialogue({
                speaker: step.speaker || "NPC",
                lines: step.lines,
                index: 0,
                onComplete: () => advanceQuest(quest, index)
            });
            setGameState('dialogue');
            fadeTextIn();
        } else if (step.type === 'activity') {
            triggerActivity(step.activityType, step.activityData, (result) => {
                if (step.validate && !step.validate(result)) {
                    showNotification("That's not quite right. Review the signs and try again!", "error");
                    executeQuestStep(step, index, quest); 
                } else {
                    advanceQuest(quest, index);
                }
            });
        }
    };

    const advanceQuest = (quest, currentIndex) => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < quest.steps.length) {
            setActiveQuest(prev => ({ ...prev, stepIndex: nextIndex }));
            executeQuestStep(quest.steps[nextIndex], nextIndex, quest);
        } else {
            if (quest.validation && !activeActivity) {
                setGameState('playing'); 
                triggerActivity(quest.validation.type, quest.validation, (result) => {
                    const isCorrect = result.selectedIndices.length === quest.validation.correctIndices.length && 
                                      quest.validation.correctIndices.every(idx => result.selectedIndices.includes(idx));
                    
                    if (isCorrect) {
                        setDialogue({
                            speaker: quest.steps[0].speaker,
                            lines: quest.validation.successDialogue,
                            onComplete: () => {
                                completeQuest(quest.id, quest.validation);
                            }
                        });
                        setGameState('dialogue');
                        fadeTextIn();
                    } else {
                        showNotification("Review the clinical signs again!", "error");
                    }
                });
            } else {
                completeQuest(quest.id);
            }
        }
    };

    const completeQuest = (diseaseId, validationData = null) => {
        setActiveQuest(null);
        setGameState('playing');
        
        const diseaseData = MOD4_DISEASE_CHAPTERS.find(d => d.id === diseaseId);
        completeDiseaseFile(diseaseId, diseaseData);
        
        if (validationData) {
            validationData.vocab.forEach(v => unlockVocab(v.term, v.definition));
            if (validationData.notification) showNotification(validationData.notification, "success");
        }
        
        showNotification(`Clinical Mastery: ${diseaseData?.name || diseaseId} Recorded`, "success");
        setMastery(prev => ({ ...prev, clues: prev.clues + 1 }));
    };

    const showNotification = (text, type = 'info') => {
        setNotification({ text, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // Cinematic State Machine
    useEffect(() => {
        phaseStartTimeRef.current = Date.now();
        
        if (gameState === 'BLACK_SCREEN') {
            const timer = setTimeout(() => {
                setGameState('TITLE_PHASE_2');
            }, 5000); 
            return () => clearTimeout(timer);
        }
        if (gameState === 'TITLE_PHASE_2') {
            const timer = setTimeout(() => setGameState('TITLE_PHASE_3'), 3000); 
            return () => clearTimeout(timer);
        }
        if (gameState === 'TITLE_PHASE_3') {
            const timer = setTimeout(() => setGameState('TITLE_PHASE_4'), 2000);
            return () => clearTimeout(timer);
        }
        if (gameState === 'TITLE_PHASE_4') {
            const timer = setTimeout(() => setGameState('TITLE_PHASE_5'), 4000);
            return () => clearTimeout(timer);
        }
    }, [gameState]);

    // --- EDUCATIONAL FRAMEWORK METHODS ---
    const unlockVocab = (term, definition) => {
        setMastery(prev => {
            const next = new Set(prev.vocab);
            next.add(term);
            return { ...prev, vocab: next };
        });
        setJournalData(prev => ({
            ...prev,
            vocabulary: [...prev.vocabulary, { term, definition }]
        }));
    };

    const completeDiseaseFile = (diseaseId, data) => {
        setMastery(prev => ({
            ...prev,
            diseases: { ...prev.diseases, [diseaseId]: true }
        }));
        setJournalData(prev => ({
            ...prev,
            diseases: { ...prev.diseases, [diseaseId]: data }
        }));
    };

    const triggerActivity = (type, data, onComplete) => {
        setActiveActivity({ type, data, onComplete });
        setGameState('activity');
    };

    const handleActivityComplete = (result) => {
        const callback = activeActivity?.onComplete;
        setActiveActivity(null);
        setGameState('playing');
        if (callback) callback(result);
    };

    const renderActivity = () => {
        if (!activeActivity) return null;
        const { type, data } = activeActivity;
        return e('div', {
            style: {
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 500, padding: '40px'
            }
        },
            e('div', {
                style: {
                    background: '#1a1a2e', border: '4px solid #00ff41', borderRadius: '10px',
                    padding: '30px', maxWidth: '800px', width: '100%', color: '#fff',
                    fontFamily: 'monospace', boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)'
                }
            },
                e('h2', { style: { color: '#00ff41', textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #00ff41', paddingBottom: '10px' } }, 
                    type.toUpperCase() + ': ' + (data.title || 'Educational Challenge')
                ),
                e('div', { style: { marginBottom: '30px', fontSize: '1.2rem', lineHeight: '1.4' } }, data.description),
                
                type === 'quiz' && e('div', { style: { display: 'flex', flexDirection: 'column', gap: '15px' } },
                    data.options.map((opt, idx) => e('button', {
                        key: idx,
                        className: 'btn-cyber-small',
                        style: { textAlign: 'left', padding: '15px' },
                        onClick: () => handleActivityComplete({ correct: opt.correct, choice: opt.text })
                    }, `${idx + 1}. ${opt.text}`))
                ),

                type === 'sorting' && e(function SortingActivity({ data, onComplete }) {
                    const [selectedItems, setSelectedItems] = useState(new Set());
                    return e('div', null, 
                        e('p', { style: { textAlign: 'center', color: '#aaa' } }, "Select all items that belong to: " + data.category),
                        e('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' } },
                             data.items.map((item, idx) => e('button', {
                                 key: idx,
                                 style: {
                                     padding: '10px',
                                     background: selectedItems.has(idx) ? '#00ff41' : 'transparent',
                                     color: selectedItems.has(idx) ? '#000' : '#fff',
                                     border: '1px solid #00ff41',
                                     cursor: 'pointer'
                                 },
                                 onClick: () => {
                                     const next = new Set(selectedItems);
                                     if (next.has(idx)) next.delete(idx);
                                     else next.add(idx);
                                     setSelectedItems(next);
                                 }
                             }, item.text))
                        ),
                        e('button', { 
                            className: 'btn-cyber', 
                            style: { marginTop: '30px', width: '100%' },
                            onClick: () => onComplete({ selectedIndices: Array.from(selectedItems) })
                        }, 'SUBMIT SELECTION')
                    );
                }, { data, onComplete: handleActivityComplete }),

                type === 'comparison' && e('div', null,
                    e('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } },
                        e('div', { style: { padding: '15px', border: '1px solid #00ff41' } }, 
                            e('h4', { style: { color: '#ffff00' } }, data.left.name),
                            e('p', null, data.left.traits)
                        ),
                        e('div', { style: { padding: '15px', border: '1px solid #00ff41' } }, 
                            e('h4', { style: { color: '#ffff00' } }, data.right.name),
                            e('p', null, data.right.traits)
                        )
                    ),
                    e('button', { 
                        className: 'btn-cyber', 
                        style: { marginTop: '30px', width: '100%' },
                        onClick: () => handleActivityComplete({ viewed: true })
                    }, 'I UNDERSTAND THE DIFFERENCE')
                )
            )
        );
    };

    const [locationTitle, setLocationTitle] = useState({ text: '', opacity: 0 });
    const [fadeOpacity, setFadeOpacity] = useState(0);
    const [narrationIndex, setNarrationIndex] = useState(0);
    const [textOpacity, setTextOpacity] = useState(0);
    const [isTextTransitioning, setIsTextTransitioning] = useState(false);
    
    // Enemy / Encounter State
    const [encounters, setEncounters] = useState([]);
    const [activeEncounter, setActiveEncounter] = useState(null);
    
    const fadeTextIn = () => {
        setIsTextTransitioning(true);
        setTextOpacity(0);
        let op = 0;
        const interval = setInterval(() => {
            op += 0.05;
            if (op >= 1) {
                setTextOpacity(1);
                setIsTextTransitioning(false);
                clearInterval(interval);
            } else {
                setTextOpacity(op);
            }
        }, 20); 
    };

    const fadeTextOut = (callback) => {
        setIsTextTransitioning(true);
        let op = textOpacity;
        const interval = setInterval(() => {
            op -= 0.05;
            if (op <= 0) {
                setTextOpacity(0);
                clearInterval(interval);
                callback();
            } else {
                setTextOpacity(op);
            }
        }, 20);
    };

    const renderJournalContent = () => {
        switch (journalTab) {
            case 'DISEASE FILES':
                return e('div', null,
                    e('h3', { style: { borderBottom: '1px solid #00ff41', paddingBottom: '10px', color: '#00ff41' } }, 
                        `DISEASE FILES (${Object.values(mastery.diseases).filter(v => v).length}/${DISEASE_IDS.length} COMPLETE)`
                    ),
                    e('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' } },
                        MOD4_DISEASE_CHAPTERS.map(disease => {
                            const isMastered = mastery.diseases[disease.id];
                            return e('div', {
                                key: disease.id,
                                style: {
                                    padding: '20px',
                                    background: isMastered ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255,255,255,0.02)',
                                    border: `1px solid ${isMastered ? '#00ff41' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '5px'
                                }
                            },
                                e('div', { style: { fontWeight: 'bold', fontSize: '1.2rem', color: isMastered ? '#00ff41' : '#666', marginBottom: '10px' } }, 
                                    disease.name.toUpperCase()
                                ),
                                isMastered ? e('div', { style: { fontSize: '0.9rem', color: '#ccc' } },
                                    disease.teaching.map((t, idx) => e('div', { key: idx, style: { marginBottom: '5px' } }, `• ${t}`))
                                ) : e('div', { style: { color: '#666', fontStyle: 'italic' } }, 'Research incomplete. Visit corresponding NPC.')
                            );
                        })
                    )
                );
            case 'PEOPLE OF OSTEOPOLIS':
                return e('div', null,
                    e('h3', { style: { borderBottom: '1px solid #00ff41', paddingBottom: '10px', color: '#00ff41' } }, 
                        `CITIZEN DIRECTORY (${mastery.discoveredNPCs.size}/${Object.keys(NPC_REGISTRY).length} DISCOVERED)`
                    ),
                    e('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '20px' } },
                        Object.values(NPC_REGISTRY).map(npc => {
                            const isDiscovered = mastery.discoveredNPCs.has(npc.id);
                            return e('div', {
                                key: npc.id,
                                style: {
                                    padding: '15px',
                                    background: isDiscovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.3)',
                                    border: `1px solid ${isDiscovered ? '#00ff41' : '#333'}`,
                                    borderRadius: '5px',
                                    opacity: isDiscovered ? 1 : 0.5
                                }
                            },
                                e('div', { style: { fontWeight: 'bold', color: isDiscovered ? '#00ff41' : '#666' } }, isDiscovered ? npc.name : "???"),
                                isDiscovered && e('div', { style: { fontSize: '0.75rem', marginTop: '5px' } },
                                    e('div', { style: { color: '#ffff00', fontStyle: 'italic' } }, npc.metadata.profession),
                                    e('div', { style: { marginTop: '10px', color: '#ccc' } }, npc.metadata.clinicalPearl),
                                    e('div', { style: { marginTop: '5px', color: '#00ff41', fontSize: '0.7rem' } }, `Mnemonic: ${npc.metadata.mnemonic}`)
                                )
                            );
                        })
                    )
                );
            case 'VOCAB LEDGER':
                return e('div', null,
                    e('h3', { style: { borderBottom: '1px solid #00ff41', paddingBottom: '10px', color: '#00ff41' } }, 
                        `VOCABULARY LEDGER (${mastery.vocab.size} TERMS UNLOCKED)`
                    ),
                    journalData.vocabulary.length > 0 ? e('div', { style: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' } },
                        journalData.vocabulary.map((v, idx) => e('div', { key: idx, style: { padding: '15px', background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #ffff00' } },
                            e('span', { style: { fontWeight: 'bold', color: '#ffff00', marginRight: '10px' } }, v.term + ':'),
                            e('span', null, v.definition)
                        ))
                    ) : e('p', { style: { marginTop: '20px', fontStyle: 'italic', color: '#666' } }, 'No clinical terms recorded yet.')
                );
            case 'INFECTION TIMELINE':
                const stages = [
                    { id: 'inflammation', label: 'Inflammation', desc: 'Initial immune response and pus buildup.' },
                    { id: 'suppuration', label: 'Suppuration', desc: 'Pressure forces pus into the subperiosteal space.' },
                    { id: 'sequestrum', label: 'Sequestrum', desc: 'Ischemic dead bone becomes detached.' },
                    { id: 'involucrum', label: 'Involucrum', desc: 'New bone forms around the dead bone.' },
                    { id: 'resolution', label: 'Resolution', desc: 'Healing or chronic sinus tract formation.' }
                ];
                return e('div', null,
                    e('h3', { style: { borderBottom: '1px solid #00ff41', paddingBottom: '10px', color: '#00ff41' } }, 'BONE INFECTION TIMELINE'),
                    e('div', { style: { marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' } },
                        stages.map((s, idx) => {
                            const isUnlocked = mastery.infectionStages[idx];
                            return e('div', { key: s.id, style: { display: 'flex', alignItems: 'center', gap: '20px', opacity: isUnlocked ? 1 : 0.3 } },
                                e('div', { style: { width: '40px', height: '40px', borderRadius: '50%', background: isUnlocked ? '#00ff41' : '#333', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', fontWeight: 'bold' } }, idx + 1),
                                e('div', null,
                                    e('div', { style: { fontWeight: 'bold', color: isUnlocked ? '#fff' : '#666' } }, s.label.toUpperCase()),
                                    e('div', { style: { fontSize: '0.8rem' } }, isUnlocked ? s.desc : 'STAGE LOCKED')
                                )
                            );
                        })
                    )
                );
            case 'PROGRESS SUMMARY':
                return e('div', null,
                    e('h3', { style: { borderBottom: '1px solid #00ff41', paddingBottom: '10px', color: '#00ff41' } }, 'PROGRESS SUMMARY'),
                    e('div', { style: { marginTop: '20px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '20px' } },
                        e('div', null, `Clinical Mastery: ${Math.floor((Object.values(mastery.diseases).filter(v => v).length / DISEASE_IDS.length) * 100)}%`),
                        e('div', null, `Vocabulary Proficiency: ${mastery.vocab.size} Terms`),
                        e('div', null, `Clues Found: ${mastery.clues}/10`),
                        e('div', { style: { marginTop: '20px', padding: '20px', background: 'rgba(0, 255, 65, 0.1)', border: '1px dashed #00ff41' } },
                            e('div', { style: { color: '#00ff41', fontWeight: 'bold', marginBottom: '10px' } }, 'NEXT STEPS:'),
                            e('div', null, 'Continue speaking with the citizens of Osteopolis to unlock the remaining disease files.')
                        )
                    )
                );
            case 'REFLECTION':
                return e('div', null,
                    e('h3', { style: { borderBottom: '1px solid #00ff41', paddingBottom: '10px', color: '#00ff41' } }, 'CLINICAL REFLECTION'),
                    e('textarea', {
                        style: {
                            width: '100%', height: '200px', background: 'rgba(255,255,255,0.05)',
                            color: '#fff', border: '1px solid #00ff41', padding: '15px',
                            fontFamily: 'monospace', marginTop: '20px', resize: 'none'
                        },
                        placeholder: 'Record your clinical observations and thoughts here...',
                        value: journalData.reflection,
                        onChange: (ev) => setJournalData(prev => ({ ...prev, reflection: ev.target.value }))
                    }),
                    e('p', { style: { fontSize: '0.8rem', color: '#666', marginTop: '10px' } }, 'Auto-saving reflection notes to persistent state...')
                );
            default: return null;
        }
    };

    // Game World State
    const playerRef = useRef({
        x: WORLD_WIDTH / 2,
        y: WORLD_HEIGHT / 2 + 50,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE * 2.3, // Aspect ratio matching asset
        dir: 'down',
        isMoving: false,
        frame: 0
    });

    const narrationLines = NARRATION_LINES;

    const npcsRef = useRef(Object.values(NPC_REGISTRY).map(data => ({
        ...data,
        spriteKey: data.sprite, 
        sprite: RPG_ASSETS[data.sprite] || RPG_ASSETS.NPC_VILLAGER_M,
        dialogue: [], 
        timer: 0,
        isWandering: data.behavior === 'wander'
    })));

    useEffect(() => {
        npcsRef.current.forEach(npc => {
            const dialogueData = DEFAULT_NPC_DIALOGUE[npc.id];
            if (dialogueData) {
                if (Array.isArray(dialogueData)) {
                    npc.dialogue = dialogueData;
                } else if (dialogueData.initial) {
                    npc.dialogue = dialogueData.initial;
                    if (dialogueData.master) npc.masterDialogue = dialogueData.master;
                }
            }
        });
    }, []);

    const buildingsRef = useRef(MAP_REGISTRY[currentLocation]?.warps.map(warp => ({
        id: warp.id,
        name: warp.dest === 'town' ? 'Exit' : MAP_REGISTRY[warp.dest]?.name || 'Enter',
        x: warp.x, y: warp.y, width: warp.width, height: warp.height, target: warp.dest, spawn: warp.spawn
    })) || []);

    useEffect(() => {
        const map = MAP_REGISTRY[currentLocation];
        if (map) {
            buildingsRef.current = map.warps.map(warp => ({
                id: warp.id, name: warp.dest === 'town' ? 'Exit' : MAP_REGISTRY[warp.dest]?.name || 'Enter',
                x: warp.x, y: warp.y, width: warp.width, height: warp.height, target: warp.dest, spawn: warp.spawn
            }));
            npcsRef.current.forEach(npc => {
                const override = map.npcOverrides?.[npc.id];
                if (override) {
                    npc.x = override.x; npc.y = override.y; npc.location = override.location;
                } else {
                    const defaultData = NPC_REGISTRY[npc.id];
                    if (defaultData && defaultData.location === 'town') {
                        npc.x = defaultData.x; npc.y = defaultData.y; npc.location = 'town';
                    } else if (defaultData && defaultData.location !== currentLocation) {
                        npc.location = defaultData.location; 
                    }
                }
            });
        }
    }, [currentLocation]);

    const keysRef = useRef({});
    const imagesRef = useRef({});
    const vfxRef = useRef({
        leaves: Array.from({ length: 15 }, () => ({ x: Math.random() * WORLD_WIDTH, y: Math.random() * WORLD_HEIGHT, vx: -1 - Math.random(), vy: 1 + Math.random(), frame: 0 })),
        birds: Array.from({ length: 3 }, () => ({ x: Math.random() * WORLD_WIDTH, y: Math.random() * 200, vx: 2 + Math.random(), vy: 0.2 })),
        smoke: Array.from({ length: 2 }, (v, i) => ({ x: 512 + (i * 100), y: 300, frame: 0 }))
    });

    useEffect(() => {
        eventEngineRef.current = new EventEngine({
            setGameState, setDialogue, npcsRef,
            unlockVocab: (term, def) => {
                setMastery(prev => ({ ...prev, vocab: new Set([...prev.vocab, term]) }));
                setJournalData(prev => ({ ...prev, vocabulary: [...prev.vocabulary, { term, definition: def }] }));
            },
            setNotification: (text, type) => setNotification({ text, type }),
            handleWarp: (data) => {
                setGameState('BLACK_SCREEN');
                setTimeout(() => {
                    setCurrentLocation(data.dest);
                    playerRef.current.x = data.spawn.x;
                    playerRef.current.y = data.spawn.y;
                    setGameState('playing');
                }, 1000);
            },
            completeQuest: (id, validation) => completeQuest(id, validation)
        });

        const loadAssets = async () => {
            const promises = Object.keys(RPG_ASSETS).map(key => {
                if (RPG_ASSETS[key].endsWith('.webp') || RPG_ASSETS[key].endsWith('.png')) {
                    return new Promise(resolve => {
                        const img = new Image();
                        img.onload = () => { imagesRef.current[key] = img; resolve(); };
                        img.src = RPG_ASSETS[key];
                    });
                }
                return Promise.resolve();
            });
            await Promise.all(promises);
        };
        loadAssets();
    }, []);

    useEffect(() => {
        const handleKeyDown = (ev) => {
            keysRef.current[ev.code] = true;
            if (ev.repeat || isTextTransitioning) return;
            if (ev.code === 'Space') {
                if (gameState === 'TITLE_PHASE_5') startNarration();
                else if (gameState === 'narration') advanceNarration();
                else if (gameState === 'dialogue') advanceDialogue();
                else if (gameState === 'playing') checkInteractions(); // Space also interacts
            }
            if (ev.code === 'KeyJ') setShowJournal(prev => !prev);
            if (ev.code === 'Escape' || ev.code === 'KeyM') {
                if (showJournal) setShowJournal(false);
                else if (gameState === 'playing') setGameState('menu');
                else if (gameState === 'menu') setGameState('playing');
                return;
            }
            if (ev.code === 'KeyE' && gameState === 'playing') checkInteractions();
        };
        const handleKeyUp = (ev) => keysRef.current[ev.code] = false;
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        let animationFrame;
        const startNarration = () => { setGameState('narration'); setNarrationIndex(0); fadeTextIn(); };
        const advanceNarration = () => {
            fadeTextOut(() => {
                setNarrationIndex(prev => {
                    if (prev < narrationLines.length - 1) { fadeTextIn(); return prev + 1; }
                    startGame(); return prev;
                });
            });
        };
    const startGame = () => {
        setFadeOpacity(1);
        setTimeout(() => {
            setGameState('playing');
            // Seed encounters on start
            seedEncounters('osteophyta');
            let op = 1;
            const playFade = setInterval(() => {
                op -= 0.05; setFadeOpacity(Math.max(0, op));
                if (op <= 0) { clearInterval(playFade); showLocationTitle("OSTEOPHYTA\nCapital City"); }
            }, 50);
        }, 1000);
    };

    const seedEncounters = (mapId) => {
        const map = MAP_REGISTRY[mapId];
        if (!map || mapId === 'osteophyta') {
            setEncounters([]);
            return;
        }
        
        // Add 1-2 random educational encounters (enemies) per wild map
        const count = 1 + Math.floor(Math.random() * 2);
        const newEncounters = Array.from({ length: count }, (_, i) => ({
            id: `encounter_${mapId}_${i}`,
            x: 100 + Math.random() * (WORLD_WIDTH - 200),
            y: 100 + Math.random() * (WORLD_HEIGHT - 200),
            type: 'ENEMEY_BONE_INVADER',
            triggered: false
        }));
        setEncounters(newEncounters);
    };

        const update = () => {
            if (gameState === 'playing' || gameState === 'event') {
                const p = playerRef.current;
                const currentMap = MAP_REGISTRY[currentLocation] || MAP_REGISTRY.town;
                let moved = false; let dx = 0, dy = 0;
                if (gameState === 'playing') {
                    if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) { dx = -MOVE_SPEED; p.dir = 'left'; moved = true; }
                    else if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) { dx = MOVE_SPEED; p.dir = 'right'; moved = true; }
                    if (keysRef.current['ArrowUp'] || keysRef.current['KeyW']) { dy = -MOVE_SPEED; p.dir = 'up'; moved = true; }
                    else if (keysRef.current['ArrowDown'] || keysRef.current['KeyS']) { dy = MOVE_SPEED; p.dir = 'down'; moved = true; }
                }
                p.isMoving = moved;
                if (moved) { p.x += dx; p.y += dy; p.frame = (p.frame + 0.1) % 4; }
                p.x = Math.max(0, Math.min(p.x, currentMap.width));
                p.y = Math.max(0, Math.min(p.y, currentMap.height));
                
                // Collision with encounters
                if (gameState === 'playing') {
                    encounters.forEach(enc => {
                        if (!enc.triggered && Math.hypot(enc.x - p.x, enc.y - p.y) < 40) {
                            triggerEncounter(enc);
                        }
                    });
                }

                const v = vfxRef.current;
                v.leaves.forEach(l => { l.x += l.vx; l.y += l.vy; if (l.x < 0) l.x = WORLD_WIDTH; if (l.y > WORLD_HEIGHT) l.y = 0; });
                v.birds.forEach(b => { b.x += b.vx; b.y += Math.sin(b.x * 0.05) * 2; if (b.x > WORLD_WIDTH) b.x = -100; });
                v.smoke.forEach(s => { s.frame = (s.frame + 0.05) % 1; });
                npcsRef.current.forEach(npc => {
                    if (npc.location === currentLocation) {
                        if (npc.isWandering) {
                            npc.timer -= 1;
                            if (npc.timer <= 0) {
                                if (Math.random() > 0.5) {
                                    npc.dir = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
                                    npc.timer = 60 + Math.random() * 120;
                                } else { npc.dir = 'idle'; npc.timer = 30 + Math.random() * 60; }
                            }
                            if (npc.dir !== 'idle') {
                                if (npc.dir === 'up') npc.y -= 1; else if (npc.dir === 'down') npc.y += 1;
                                else if (npc.dir === 'left') npc.x -= 1; else if (npc.dir === 'right') npc.x += 1;
                            }
                        } else if (npc.behavior === 'patrol') {
                            // Simple horizontal patrol
                            if (!npc.patrolDir) npc.patrolDir = 1;
                            npc.x += npc.patrolDir * 2;
                            npc.dir = npc.patrolDir > 0 ? 'right' : 'left';
                            if (npc.x > 800) npc.patrolDir = -1;
                            if (npc.x < 200) npc.patrolDir = 1;
                        }
                        npc.x = Math.max(0, Math.min(npc.x, currentMap.width));
                        npc.y = Math.max(0, Math.min(npc.y, currentMap.height));
                    }
                });

                // Automatic Edge-of-Map Transitions
                if (!isWarpingRef.current && gameState === 'playing') {
                    const threshold = 15;
                    const atLeft = p.x <= threshold;
                    const atRight = p.x >= currentMap.width - threshold;
                    const atTop = p.y <= threshold;
                    const atBottom = p.y >= currentMap.height - threshold;

                    if (atLeft || atRight || atTop || atBottom) {
                        const warp = buildingsRef.current.find(b => {
                            if (atLeft && b.x <= threshold) return true;
                            if (atRight && b.x + b.width >= currentMap.width - threshold) return true;
                            if (atTop && b.y <= threshold) return true;
                            if (atBottom && b.y + b.height >= currentMap.height - threshold) return true;
                            return false;
                        });

                        if (warp) {
                            handleWarp(warp);
                        }
                    }
                }
            }
        };

        const draw = () => {
            const ctx = canvasRef.current.getContext('2d');
            const width = canvasRef.current.width;
            const height = canvasRef.current.height;
            const isTitlePhase = gameState.startsWith('TITLE_PHASE') || gameState === 'BLACK_SCREEN';
            const getResponsiveSize = (baseSize) => {
                const scale = Math.min(width / VIEWPORT_WIDTH, height / VIEWPORT_HEIGHT);
                return Math.floor(baseSize * scale);
            };
            const wrapText = (text, maxWidth) => {
                const words = text.split(' '); const lines = []; let currentLine = words[0];
                for (let i = 1; i < words.length; i++) {
                    const word = words[i]; const w = ctx.measureText(currentLine + " " + word).width;
                    if (w < maxWidth) currentLine += " " + word; else { lines.push(currentLine); currentLine = word; }
                }
                lines.push(currentLine); return lines;
            };
            const drawWrappedText = (text, x, y, maxWidth, lineHeight, fontSize) => {
                ctx.font = `${fontSize}px monospace`; const lines = wrapText(text, maxWidth);
                lines.forEach((line, index) => { ctx.fillText(line, x, y + (index * lineHeight)); });
                return lines.length * lineHeight;
            };

            if (isTitlePhase) {
                const now = Date.now(); const phaseTime = now - phaseStartTimeRef.current;
                ctx.fillStyle = '#000'; ctx.fillRect(0, 0, width, height);
                if (['TITLE_PHASE_4', 'TITLE_PHASE_5'].includes(gameState)) {
                    if (imagesRef.current.TOWN_MAP) {
                        let bgAlpha = 0.3; if (gameState === 'TITLE_PHASE_4') bgAlpha = Math.min(0.3, (phaseTime / 4000) * 0.3);
                        ctx.globalAlpha = bgAlpha; ctx.drawImage(imagesRef.current.TOWN_MAP, 0, 0, width, height); ctx.globalAlpha = 1;
                    }
                }
                const brandSize = getResponsiveSize(24); const titleBaseSize = getResponsiveSize(36);
                const titleLineHeight = titleBaseSize * 1.2; const storyModeSize = getResponsiveSize(20);
                const promptSize = getResponsiveSize(20); const brandY = height * 0.25; 
                const titleY = brandY + getResponsiveSize(100); const promptY = height * 0.85; 
                const brandAlpha = gameState === 'BLACK_SCREEN' ? (phaseTime > 3500 ? Math.min(1, (phaseTime - 3500) / 1500) : 0) : 1;
                if (brandAlpha > 0) {
                    ctx.globalAlpha = brandAlpha; ctx.fillStyle = '#fff'; ctx.font = `${brandSize}px monospace`;
                    ctx.textAlign = 'center'; ctx.fillText("DR. MODALI LEARNING LABS", width/2, brandY);
                }
                if (gameState.startsWith('TITLE_PHASE') && gameState !== 'TITLE_PHASE_1') {
                    ctx.globalAlpha = gameState === 'TITLE_PHASE_2' ? Math.min(1, phaseTime / 3000) : 1;
                    ctx.fillStyle = '#00ff41'; drawWrappedText("ALFIE AND THE ORCHARD OF OSTEOPOLIS", width/2, titleY, width * 0.9, titleLineHeight, titleBaseSize);
                }
                if (['TITLE_PHASE_3', 'TITLE_PHASE_4', 'TITLE_PHASE_5'].includes(gameState)) {
                    ctx.globalAlpha = 1; ctx.fillStyle = '#fff'; ctx.font = `${storyModeSize}px monospace`;
                    ctx.fillText("Story Mode", width/2, titleY + titleLineHeight * 3);
                }
                if (gameState === 'TITLE_PHASE_5') {
                    ctx.globalAlpha = Math.abs(Math.sin(now / 500)); ctx.font = `${promptSize}px monospace`;
                    ctx.fillText("PRESS SPACEBAR", width/2, promptY);
                }
                ctx.globalAlpha = 1;
            } else if (gameState === 'narration') {
                ctx.fillStyle = '#000'; ctx.fillRect(0, 0, width, height); ctx.fillStyle = '#fff';
                ctx.globalAlpha = textOpacity; ctx.textAlign = 'center'; const baseSize = getResponsiveSize(20);
                const text = narrationLines[narrationIndex] || ""; drawWrappedText(text, width/2, height/2, width * 0.8, baseSize * 1.5, baseSize);
                ctx.globalAlpha = 1;
            } else {
                const p = playerRef.current;
                const currentMap = MAP_REGISTRY[currentLocation] || MAP_REGISTRY.town;
                const scaleX = width / VIEWPORT_WIDTH; const scaleY = height / VIEWPORT_HEIGHT;
                let camX = p.x - VIEWPORT_WIDTH / 2; let camY = p.y - VIEWPORT_HEIGHT / 2;
                camX = Math.max(0, Math.min(camX, currentMap.width - VIEWPORT_WIDTH));
                camY = Math.max(0, Math.min(camY, currentMap.height - VIEWPORT_HEIGHT));

                const mapImg = imagesRef.current[currentMap.background];
                if (mapImg) { ctx.drawImage(mapImg, camX, camY, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, 0, 0, width, height); }
                else { ctx.fillStyle = '#111'; ctx.fillRect(0, 0, width, height); }

                const drawSprite = (img, worldX, worldY, targetWidth, targetHeight, flip = false) => {
                    if (!img) return;
                    const drawX = (worldX - camX) * scaleX; const drawY = (worldY - camY) * scaleY;
                    ctx.save();
                    if (flip) { ctx.translate(drawX, drawY); ctx.scale(-1, 1); ctx.drawImage(img, -targetWidth * scaleX / 2, -targetHeight * scaleY, targetWidth * scaleX, targetHeight * scaleY); }
                    else { ctx.drawImage(img, drawX - targetWidth * scaleX / 2, drawY - targetHeight * scaleY, targetWidth * scaleX, targetHeight * scaleY); }
                    ctx.restore();
                };

                const characters = [
                    { type: 'player', x: p.x, y: p.y, width: p.width, height: p.height, img: imagesRef.current.ALFIE_SHEET, dir: p.dir },
                    ...npcsRef.current.filter(n => n.location === currentLocation).map(n => ({
                        type: 'npc', x: n.x, y: n.y, width: n.width, height: n.height, img: imagesRef.current[n.spriteKey], dir: n.dir
                    }))
                ];
                characters.sort((a, b) => a.y - b.y);
                characters.forEach(c => { drawSprite(c.img, c.x, c.y, c.width, c.height, c.dir === 'left'); });

                // Render Map-specific VFX
                if (currentMap.vfx?.smoke) {
                    vfxRef.current.smoke.forEach(s => {
                        if (imagesRef.current.VFX_SMOKE) {
                            ctx.globalAlpha = 0.6 - s.frame * 0.5;
                            const sx = (s.x - camX) * scaleX; const sy = (s.y - camY - s.frame * 50) * scaleY;
                            ctx.drawImage(imagesRef.current.VFX_SMOKE, sx, sy, 40 * scaleX, 40 * scaleY);
                            ctx.globalAlpha = 1;
                        }
                    });
                }
                
                // --- NEW VFX IMPLEMENTATION ---
                if (currentMap.vfx?.dust) {
                    ctx.fillStyle = 'rgba(200, 200, 100, 0.2)';
                    for (let i = 0; i < 20; i++) {
                        const dx = (Math.sin(Date.now() / 1000 + i) * 500 + 500 - camX) * scaleX;
                        const dy = (Math.cos(Date.now() / 1200 + i) * 300 + 300 - camY) * scaleY;
                        ctx.beginPath(); ctx.arc(dx, dy, 2 * scaleX, 0, Math.PI * 2); ctx.fill();
                    }
                }
                if (currentMap.vfx?.pus_drops) {
                    ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
                    for (let i = 0; i < 10; i++) {
                        const px = ((i * 100 + (Date.now() / 10) % 1024) - camX) * scaleX;
                        const py = ((200 + Math.sin(px) * 50) - camY) * scaleY;
                        ctx.beginPath(); ctx.arc(px, py, 3 * scaleX, 0, Math.PI * 2); ctx.fill();
                    }
                }
                if (currentMap.vfx?.needle_rain) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.lineWidth = 1;
                    for (let i = 0; i < 15; i++) {
                        const nx = ((i * 70 + (Date.now() / 5) % 1024) - camX) * scaleX;
                        const ny = ((Math.random() * 576) - camY) * scaleY;
                        ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nx + 10, ny + 20); ctx.stroke();
                    }
                }
                if (currentMap.vfx?.fire) {
                    ctx.fillStyle = 'rgba(255, 100, 0, 0.5)';
                    for (let i = 0; i < 30; i++) {
                        const fx = (Math.random() * 1024 - camX) * scaleX;
                        const fy = (576 - Math.random() * 100 - camY) * scaleY;
                        ctx.beginPath(); ctx.arc(fx, fy, (5 + Math.random() * 10) * scaleX, 0, Math.PI * 2); ctx.fill();
                    }
                }
                // ------------------------------

                // Render Map-specific interactives
                interactivesRef.current.filter(item => item.mapId === currentLocation).forEach(item => {
                    const isFound = cluesFound.has(item.id);
                    ctx.fillStyle = isFound ? 'rgba(0, 255, 65, 0.4)' : 'rgba(255, 255, 0, 0.6)';
                    const pulse = Math.sin(Date.now() / 200) * 5; ctx.beginPath();
                    ctx.arc((item.x - camX) * scaleX, (item.y - camY) * scaleY, (10 + pulse) * scaleX, 0, Math.PI * 2); ctx.fill();
                });

                // Render Encounters
                encounters.filter(e => !e.triggered).forEach(e => {
                    ctx.fillStyle = '#ff003c';
                    const pulse = Math.sin(Date.now() / 150) * 8;
                    ctx.beginPath();
                    ctx.arc((e.x - camX) * scaleX, (e.y - camY) * scaleY, (15 + pulse) * scaleX, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                });

                if (gameState === 'playing') {
                    const nearNPC = npcsRef.current.filter(n => n.location === currentLocation).find(n => Math.hypot(n.x - p.x, n.y - p.y) < 80);
                    const nearItem = interactivesRef.current.filter(i => i.mapId === currentLocation).find(i => Math.hypot(i.x - p.x, i.y - p.y) < 60);
                    const nearBuilding = buildingsRef.current.find(b => Math.hypot(b.x + b.width/2 - p.x, b.y + b.height/2 - p.y) < 80);
                    if (nearNPC || nearItem || nearBuilding) {
                        ctx.fillStyle = '#fff'; ctx.font = `bold ${getResponsiveSize(16)}px monospace`;
                        ctx.textAlign = 'center'; let label = 'Press E to Interact';
                        if (nearNPC) label = 'Press E to Talk'; else if (nearBuilding) label = 'Press E to Enter'; else if (nearItem) label = 'Press E to Examine';
                        ctx.strokeStyle = '#000'; ctx.lineWidth = 4; ctx.strokeText(label, width / 2, height - 100); ctx.fillText(label, width / 2, height - 100);
                    }
                }
            }
            if (fadeOpacity > 0) { ctx.globalAlpha = fadeOpacity; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, width, height); ctx.globalAlpha = 1; }
            animationFrame = requestAnimationFrame(loop);
        };
        const loop = () => { update(); draw(); };
        animationFrame = requestAnimationFrame(loop);
        return () => { cancelAnimationFrame(animationFrame); window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); };
    }, [gameState, currentLocation, narrationIndex, fadeOpacity, textOpacity, isTextTransitioning]);

    const showLocationTitle = (text) => {
        setLocationTitle({ text, opacity: 1 });
        setTimeout(() => {
            let op = 1;
            const fade = setInterval(() => {
                op -= 0.05; setLocationTitle(prev => ({ ...prev, opacity: Math.max(0, op) }));
                if (op <= 0) clearInterval(fade);
            }, 50);
        }, 3000);
    };

    const handleWarp = (building) => {
        if (isWarpingRef.current) return;
        isWarpingRef.current = true;
        const p = playerRef.current;
        const dest = building.target; 
        const spawn = building.spawn || { x: 512, y: 450 };
        
        setGameState('BLACK_SCREEN');
        setTimeout(() => {
            setCurrentLocation(dest); 
            seedEncounters(dest);
            p.x = spawn.x; 
            p.y = spawn.y;
            showLocationTitle(dest === 'town' ? "OSTEOPOLIS\nRenewal Nexus" : building.name.toUpperCase());
            setGameState('playing');
            isWarpingRef.current = false;
        }, 500);
    };

    const checkInteractions = () => {
        const p = playerRef.current;
        const npc = npcsRef.current.filter(n => n.location === currentLocation).find(n => Math.hypot(n.x - p.x, n.y - p.y) < 100);
        if (npc) {
            // Track discovered NPCs
            setMastery(prev => {
                const next = new Set(prev.discoveredNPCs);
                next.add(npc.id);
                return { ...prev, discoveredNPCs: next };
            });
            
            if (npc.id === 'mayor') {
                const allMastered = Object.values(mastery.diseases).every(v => v);
                if (allMastered) {
                    setDialogue({
                        speaker: npc.name, lines: npc.masterDialogue,
                        onComplete: () => {
                            triggerActivity('quiz', DEFAULT_NPC_DIALOGUE.mayor.audit, (result) => {
                                if (result.correct) {
                                    setDialogue({
                                        speaker: "Mayor Peri O'Steum",
                                        lines: [
                                            "Superb! You have mastered the synergy of the musculoskeletal system.",
                                            "The Recipe Vault is yours. You have found the secret: Bone health requires a balance of building and resorption, supported by healthy joints and clear margins.",
                                            "Alfie, you are ready to graduate from the Orchard of Osteopolis."
                                        ],
                                        onComplete: () => { showNotification("MISSION COMPLETE: Recipe Vault Unlocked!", "success"); setGameState('TITLE_PHASE_1'); }
                                    });
                                    setGameState('dialogue'); fadeTextIn();
                                } else { showNotification("The Recipe Vault remains sealed. Review your Disease Files.", "error"); }
                            });
                        }
                    });
                    setGameState('dialogue'); fadeTextIn(); return;
                }
            }
            const diseaseId = NPC_TO_DISEASE[npc.id]; const quest = MOD4_QUESTS[diseaseId];
            if (quest && !mastery.diseases[diseaseId]) {
                const cluesRequired = 3; const questCluesFound = getQuestCluesCount(diseaseId);
                if (questCluesFound < cluesRequired) { setDialogue({ speaker: npc.name, lines: npc.dialogue, index: 0 }); }
                else { startQuest(quest); }
            } else {
                if (p.x < npc.x) npc.dir = 'left'; else if (p.x > npc.x) npc.dir = 'right'; else if (p.y < npc.y) npc.dir = 'up'; else npc.dir = 'down';
                setDialogue({ speaker: npc.name, lines: npc.dialogue, index: 0 });
            }
            setGameState('dialogue'); fadeTextIn(); return;
        }
        
        const item = interactivesRef.current.filter(i => i.mapId === currentLocation).find(i => Math.hypot(i.x - p.x, i.y - p.y) < 60);
        if (item) {
            setDialogue({
                speaker: item.name || "Observation", lines: [item.description],
                onComplete: () => {
                    if (item.clue && !cluesFound.has(item.id)) {
                        const next = new Set(cluesFound); next.add(item.id); setCluesFound(next);
                        showNotification(`Clue Found: ${item.clue}`, "info");
                    }
                }
            });
            setGameState('dialogue'); fadeTextIn(); return;
        }

        const building = buildingsRef.current.find(b => Math.hypot(b.x + b.width/2 - p.x, b.y + b.height/2 - p.y) < 120);
        if (building) {
            handleWarp(building);
        }
    };

    const triggerEncounter = (enc) => {
        setEncounters(prev => prev.map(e => e.id === enc.id ? { ...e, triggered: true } : e));
        setGameState('event');
        
        // Random pathological question based on current region
        const regionEncounters = [
            { q: "What is the primary mineral component of the bone matrix?", a: "Hydroxyapatite", options: ["Collagen", "Hydroxyapatite", "Keratin", "Elastin"] },
            { q: "Which cell is responsible for bone resorption?", a: "Osteoclast", options: ["Osteoblast", "Osteoclast", "Osteocyte", "Chondrocyte"] },
            { q: "What is the name for the 'bullseye' rash in Lyme disease?", a: "Erythema Migrans", options: ["Erythema Nodosum", "Erythema Migrans", "Eczema", "Psoriasis"] }
        ];
        const randomQ = regionEncounters[Math.floor(Math.random() * regionEncounters.length)];
        
        triggerActivity('quiz', {
            title: "Pathological Encounter!",
            description: randomQ.q,
            options: randomQ.options.map(o => ({ text: o, correct: o === randomQ.a }))
        }, (result) => {
            if (result.correct) {
                showNotification("Mechanism Mastered! +1 Clue", "success");
                setMastery(prev => ({ ...prev, clues: prev.clues + 1 }));
            } else {
                showNotification("The pathology persists...", "error");
            }
            setGameState('playing');
        });
    };

    const advanceDialogue = () => {
        fadeTextOut(() => {
            setDialogue(prev => {
                if (prev.index < prev.lines.length - 1) { fadeTextIn(); return { ...prev, index: prev.index + 1 }; }
                else { if (prev.onComplete) { prev.onComplete(); } setGameState('playing'); return null; }
            });
        });
    };

    const renderMinimap = () => {
        if (currentLocation !== 'town') return null;
        const minimapWidth = 150; const minimapHeight = 150;
        const scaleX = minimapWidth / WORLD_WIDTH; const scaleY = minimapHeight / WORLD_HEIGHT;
        const p = playerRef.current; const objLoc = objectiveLocations[currentObjectiveKey];
        return e('div', {
            style: {
                position: 'absolute', top: '20px', right: '100px', width: minimapWidth, height: minimapHeight,
                background: 'rgba(0,0,0,0.6)', border: '2px solid #00ff41', borderRadius: '5px', overflow: 'hidden', zIndex: 10
            }
        },
            objLoc && e('div', {
                style: {
                    position: 'absolute', left: objLoc.x * scaleX - 5, top: objLoc.y * scaleY - 5,
                    width: '10px', height: '10px', background: '#ffff00', borderRadius: '50%',
                    boxShadow: '0 0 10px #ffff00', animation: 'pulse 1s infinite alternate'
                }
            }),
            buildingsRef.current.map(b => e('div', {
                key: b.id,
                style: {
                    position: 'absolute', left: b.x * scaleX, top: b.y * scaleY,
                    width: b.width * scaleX, height: b.height * scaleY,
                    background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.5)'
                }
            })),
            e('div', { style: { position: 'absolute', left: 0, top: WORLD_HEIGHT/2 * scaleY, width: minimapWidth, height: '4px', background: 'rgba(255,255,255,0.1)' } }),
            e('div', { style: { position: 'absolute', left: WORLD_WIDTH/2 * scaleX, top: 0, width: '4px', height: minimapHeight, background: 'rgba(255,255,255,0.1)' } }),
            e('div', {
                style: {
                    position: 'absolute', left: p.x * scaleX - 3, top: p.y * scaleY - 3,
                    width: '6px', height: '6px', background: '#00ff41', borderRadius: '50%',
                    boxShadow: '0 0 5px #00ff41'
                }
            })
        );
    };

    return e('div', { className: 'story-rpg-container', style: { width: '100%', height: '100%', position: 'relative', background: '#000', overflow: 'hidden' } },
        e('canvas', { ref: canvasRef, width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT, style: { width: '100%', height: 'auto', imageRendering: 'pixelated' } }),
        locationTitle.opacity > 0 && e('div', {
            style: {
                position: 'absolute', top: '20%', left: '5%', width: '90%', textAlign: 'center', color: '#fff',
                fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontFamily: 'monospace', textShadow: '0 0 10px #00ff41',
                opacity: locationTitle.opacity, pointerEvents: 'none', transition: 'opacity 0.5s',
                whiteSpace: 'pre-line', lineHeight: '1.2'
            }
        }, locationTitle.text),
        gameState === 'playing' && e('div', {
            style: {
                position: 'absolute', top: '20px', left: '20px', maxWidth: 'min(300px, 40%)',
                background: 'rgba(0,0,0,0.7)', borderLeft: '4px solid #00ff41', padding: '10px 15px',
                color: '#fff', fontFamily: 'monospace', pointerEvents: 'none', fontSize: 'clamp(0.7rem, 2vw, 1rem)'
            }
        }, 
            e('div', { style: { color: '#00ff41', fontSize: '0.8em', marginBottom: '5px' } }, 'CURRENT OBJECTIVE'),
            e('div', { style: { wordBreak: 'break-word', fontWeight: 'bold' } }, 
                currentQuestData 
                    ? currentQuestCluesFound < 3
                        ? `Examine clues in ${objectiveLocations[currentQuestId]?.name || 'the area'} (${currentQuestCluesFound}/3)`
                        : `Speak with ${npcsRef.current.find(n => n.id === currentQuestData.npcId)?.name || 'the NPC'} at ${objectiveLocations[currentQuestId]?.name || 'their location'}`
                    : 'All current clinical cases resolved! Explore the town or visit the Mayor.'
            ),
            objectiveLocations[currentObjectiveKey] && e('div', { style: { fontSize: '0.7em', marginTop: '5px', opacity: 0.8, color: '#ffff00' } },
                `Located in the ${objectiveLocations[currentObjectiveKey].region} (Marker on Minimap)`
            )
        ),
        renderMinimap(),
        e('button', { className: 'btn-cyber-small', style: { position: 'absolute', top: '20px', right: '20px' }, onClick: onBack }, 'EXIT STORY'),
        notification && e('div', {
            style: {
                position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', padding: '15px 30px',
                background: notification.type === 'success' ? '#00ff41' : notification.type === 'error' ? '#ff003c' : '#ffff00',
                color: '#000', fontWeight: 'bold', fontFamily: 'monospace', borderRadius: '5px',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)', zIndex: 1000, fontSize: '1.1rem'
            }
        }, notification.text),
        renderActivity(),
        dialogue && e('div', { 
            className: 'rpg-dialogue-box',
            style: {
                position: 'absolute', bottom: '20px', left: '5%', width: '90%', minHeight: '140px', height: 'auto',
                background: 'rgba(0, 0, 50, 0.95)', border: '4px solid #fff', borderRadius: '8px', padding: 'min(20px, 3vw)',
                color: '#fff', fontFamily: 'monospace', fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)',
                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)', cursor: 'pointer', opacity: textOpacity,
                pointerEvents: isTextTransitioning ? 'none' : 'auto', display: 'flex', alignItems: 'center', gap: '20px'
            },
            onClick: advanceDialogue
        },
            dialogue.speaker === "Alfie" && imagesRef.current.ALFIE_PORTRAIT && e('img', {
                src: RPG_ASSETS.ALFIE_PORTRAIT,
                style: { width: '100px', height: '100px', borderRadius: '5px', border: '2px solid #00ff41', background: 'rgba(0,0,0,0.5)' }
            }),
            e('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
                e('div', { style: { color: '#ffff00', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', fontSize: '0.8em' } }, dialogue.speaker),
                e('div', { style: { lineHeight: '1.4', wordBreak: 'break-word' } }, dialogue.lines[dialogue.index]),
                e('div', { style: { marginTop: '10px', textAlign: 'right', fontSize: '0.6em', opacity: 0.6 } }, 'PRESS SPACEBAR TO CONTINUE ▼')
            )
        ),
        gameState === 'menu' && e('div', {
            style: {
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,100,0.7)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100
            }
        },
            e('div', {
                style: {
                    background: 'rgba(0,0,50,0.95)', border: '4px solid #fff', borderRadius: '10px',
                    padding: '40px', minWidth: '300px', color: '#fff', fontFamily: 'monospace'
                }
            },
                e('h2', { style: { color: '#ffff00', textAlign: 'center', marginBottom: '30px', fontSize: '2rem' } }, 'MENU'),
                e('div', { style: { display: 'flex', flexDirection: 'column', gap: '15px' } },
                    ['Journal (Press J)', 'Inventory (Disabled)', 'Map', 'Objectives', 'Save', 'Settings', 'Exit Story Mode'].map(item => 
                        e('button', {
                            key: item,
                            style: {
                                background: 'none', border: 'none', color: item.includes('Disabled') ? '#555' : '#fff',
                                textAlign: 'left', fontSize: '1.2rem', cursor: 'pointer', padding: '5px'
                            },
                            onClick: () => {
                                if (item === 'Exit Story Mode') onBack();
                                else if (item === 'Journal (Press J)') setShowJournal(true);
                                else if (item === 'Save') alert('Progress saved!');
                                else setGameState('playing');
                            }
                        }, `> ${item}`)
                    )
                ),
                e('div', { style: { marginTop: '30px', textAlign: 'center', opacity: 0.6 } }, 'Press ESC to Return')
            )
        ),
        showJournal && e('div', {
            style: {
                position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%',
                background: 'rgba(20, 20, 40, 0.98)', border: '6px double #00ff41', borderRadius: '12px',
                zIndex: 200, color: '#fff', fontFamily: 'monospace', display: 'flex', flexDirection: 'column',
                boxShadow: '0 0 50px rgba(0, 255, 65, 0.2)'
            }
        },
            e('div', { 
                style: { 
                    padding: '20px', borderBottom: '2px solid #00ff41', display: 'flex', 
                    justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 255, 65, 0.1)'
                } 
            },
                e('h2', { style: { color: '#00ff41', margin: 0, textShadow: '0 0 5px #00ff41' } }, 'MODULE 4 JOURNAL: MSK PATHOPHYSIOLOGY'),
                e('div', { style: { display: 'flex', alignItems: 'center', gap: '15px' } },
                    imagesRef.current.ALFIE_PORTRAIT && e('img', {
                        src: ASSETS.ALFIE_PORTRAIT,
                        style: { width: '40px', height: '40px', border: '1px solid #00ff41', borderRadius: '4px' }
                    }),
                    e('button', { 
                        style: { background: '#00ff41', border: 'none', color: '#000', padding: '5px 15px', fontWeight: 'bold', cursor: 'pointer' },
                        onClick: () => setShowJournal(false)
                    }, 'CLOSE [J]')
                )
            ),
            e('div', { style: { flex: 1, display: 'flex', overflow: 'hidden' } },
                e('div', { 
                    style: { 
                        width: '250px', borderRight: '1px solid rgba(0, 255, 65, 0.3)', padding: '20px',
                        display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(0,0,0,0.2)'
                    } 
                },
                    ['DISEASE FILES', 'PEOPLE OF OSTEOPOLIS', 'VOCAB LEDGER', 'INFECTION TIMELINE', 'PROGRESS SUMMARY', 'REFLECTION'].map(tab => 
                        e('button', {
                            key: tab,
                            style: {
                                background: 'none', border: 'none', color: journalTab === tab ? '#ffff00' : '#00ff41',
                                textAlign: 'left', fontSize: '1rem', padding: '10px',
                                borderLeft: journalTab === tab ? '3px solid #ffff00' : '3px solid transparent',
                                cursor: 'pointer', transition: 'all 0.2s', textShadow: journalTab === tab ? '0 0 10px #ffff00' : 'none'
                            },
                            onClick: () => setJournalTab(tab)
                        }, `> ${tab}`)
                    )
                ),
                e('div', { style: { flex: 1, padding: '30px', overflowY: 'auto' } },
                    renderJournalContent(),
                    e('div', { style: { padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '5px', marginTop: '30px' } },
                        e('p', { style: { fontStyle: 'italic', opacity: 0.8 } }, 
                          "Tip: Speak with the citizens of Osteopolis to populate your journal. Knowledge of etiology and pathophysiology is the key to the apple-butter recipe."
                        )
                    )
                )
            )
        )
    );
}