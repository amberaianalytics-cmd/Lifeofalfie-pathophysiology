import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import * as Tone from 'tone';

const e = React.createElement;

// --- ASSET CONSTANTS ---
const ASSETS = {
    MUSIC_EXPLORATION: "assets/rag1.mp3",
    MUSIC_METABOLISM: "assets/rag2ruski.mp3",
    ALFIE_PORTRAITS: {
        NEUTRAL: "assets/alfie_portrait_neutral_final.webp",
        HAPPY: "assets/alfie_portrait_happy.webp",
        SURPRISED: "assets/alfie_portrait_surprised.webp",
        THINKING: "assets/alfie_portrait_neutral-2.webp",
        CELEBRATING: "assets/alfie_portrait_v3.webp",
        CURIOUS: "assets/alfie_portrait_final_v4.webp"
    },
    HENRY_PORTRAITS: {
        PAINED: "assets/henry_portrait_pained.webp"
    },
    BACKGROUNDS: {
        STREET: "assets/scene_neighborhood_street_day.webp",
        MOUTH: "assets/scene_oral_cavity_interior.webp",
        SALIVARY: "assets/scene_salivary_glands_interior.webp",
        ESOPHAGUS: "assets/scene_esophagus_tunnel.webp",
        STOMACH: "assets/scene_stomach_acid_lake.webp",
        DUODENUM: "assets/scene_duodenum_mixing.webp",
        VILLI: "assets/scene_villi_forest.webp",
        PORTAL: "assets/scene_portal_vein_river.webp",
        HEPATOCYTE: "assets/scene_liver_hepatocyte_room_v2.webp",
        MITOCHONDRION: "assets/scene_mitochondrion_interior_factory.webp",
        SUCCESS: "assets/metabolism-map-background.webp"
    },
    SPRITES: {
        ALFIE: "assets/alfie-south-indian-sprite.webp",
        HENRY: "assets/henry_miserable_sprite.webp",
        BURGER: "assets/adventure_cheeseburger.webp",
        ATP: "assets/atp_energy_coin.webp",
        BACKPACK: "assets/pog_collection_backpack.webp",
        BIRD: "assets/bird-pixel-sprite.webp",
        SMOKE: "assets/chimney-smoke-vfx.webp",
        LEAVES: "assets/falling-leaves-vfx.webp",
        TRUCK: "assets/northbridge-taco-cart-webp.webp",
        HARDWARE: "assets/cyber_hardware_store.webp",
        RESTAURANT: "assets/dominics_restaurant_exterior.webp"
    }
};

// --- WORLD SETTINGS ---
const WORLD_WIDTH = 5000;
const LANDMARKS = [
    { id: 'restaurant', x: 1200, src: ASSETS.SPRITES.RESTAURANT, label: "Dominic's Restaurant", aroma: true },
    { id: 'truck', x: 2800, src: ASSETS.SPRITES.TRUCK, label: "Enrique's Umami Truck", aroma: true },
    { id: 'hardware', x: 4200, src: ASSETS.SPRITES.HARDWARE, label: "Hardware Store" }
];

// --- STORY BEATS ---
const STORY_BEATS = [
    {
        id: "mouth_start",
        location: "The Oral Cavity",
        bg: ASSETS.BACKGROUNDS.MOUTH,
        portrait: ASSETS.ALFIE_PORTRAITS.THINKING,
        text: "Well... this is definitely the strangest house call I've ever made. I'm inside Henry's mouth!",
    },
    {
        id: "salivary_zoom",
        location: "The Oral Cavity",
        bg: ASSETS.BACKGROUNDS.SALIVARY,
        portrait: ASSETS.ALFIE_PORTRAITS.SURPRISED,
        text: "Wait! The salivary glands are activating! Amylase is already starting to break down the starches in the taco shell.",
        discovery: "cephalic"
    },
    {
        id: "mouth_interactive",
        location: "The Oral Cavity",
        bg: ASSETS.BACKGROUNDS.MOUTH,
        portrait: ASSETS.ALFIE_PORTRAITS.HAPPY,
        text: "Look at those teeth. Mechanical digestion starts here! We need to chew these tacos into a Bolus.",
        action: "build_the_bolus"
    },
    {
        id: "peristalsis",
        location: "The Esophagus",
        bg: ASSETS.BACKGROUNDS.ESOPHAGUS,
        portrait: ASSETS.ALFIE_PORTRAITS.SURPRISED,
        text: "Down the hatch! Peristalsis is moving the taco bolus toward the stomach. It's like a conveyor belt of muscle!",
        discovery: "peristalsis"
    },
    {
        id: "stomach_acid",
        location: "The Stomach",
        bg: ASSETS.BACKGROUNDS.STOMACH,
        portrait: ASSETS.ALFIE_PORTRAITS.THINKING,
        text: "We've reached the stomach lake. That yellow-green fluid is Hydrochloric Acid (HCl). It's busy denaturing proteins.",
        discovery: "hcl"
    },
    {
        id: "duodenum",
        location: "The Duodenum",
        bg: ASSETS.BACKGROUNDS.DUODENUM,
        portrait: ASSETS.ALFIE_PORTRAITS.NEUTRAL,
        text: "The Duodenum! This is where the real chemical breakdown happens. Bile and pancreatic juices are mixing in.",
    },
    {
        id: "absorption",
        location: "Small Intestine",
        bg: ASSETS.BACKGROUNDS.VILLI,
        portrait: ASSETS.ALFIE_PORTRAITS.HAPPY,
        text: "Look at this forest of Villi! They're like tiny fingers grabbing nutrients. Carbs go to the blood, fats to the lymph.",
        discovery: "villi"
    },
    {
        id: "portal_vein",
        location: "Portal Circulation",
        bg: ASSETS.BACKGROUNDS.PORTAL,
        portrait: ASSETS.ALFIE_PORTRAITS.THINKING,
        text: "Catching a ride in the Portal Vein river! All those nutrients are heading straight for the Liver for processing.",
    },
    {
        id: "hepatocyte",
        location: "The Liver",
        bg: ASSETS.BACKGROUNDS.HEPATOCYTE,
        portrait: ASSETS.ALFIE_PORTRAITS.THINKING,
        text: "Inside a Hepatocyte. This liver cell is deciding whether to store Henry's extra glucose as glycogen or use it now.",
    },
    {
        id: "mitochondrion",
        location: "Cellular Powerhouse",
        bg: ASSETS.BACKGROUNDS.MITOCHONDRION,
        portrait: ASSETS.ALFIE_PORTRAITS.CELEBRATING,
        text: "Diving into the Mitochondrion! Oxygen and nutrients are being turned into ATP energy right here.",
    },
    {
        id: "victory",
        location: "Metabolic Mastery",
        bg: ASSETS.BACKGROUNDS.SUCCESS,
        portrait: ASSETS.ALFIE_PORTRAITS.CELEBRATING,
        text: "Investigation complete! Henry's indigestion was just a lack of fiber, but his metabolism is working hard to process those tacos!",
    }
];

export default function AlfieMetabolicAdventure({ onBack }) {
    // Stages: 'labs-title', 'adventure-title', 'exploration', 'metabolism'
    const [stage, setStage] = useState('labs-title');
    const [worldReveal, setWorldReveal] = useState(0); // 0: black, 1: silhouettes, 2: lit
    const [alfiePos, setAlfiePos] = useState(600);
    const [cameraX, setCameraX] = useState(600);
    const [isWalking, setIsWalking] = useState(false);
    const [walkDirection, setWalkDirection] = useState('right');
    const [activeDialogue, setActiveDialogue] = useState(null);
    const [metabolismStep, setMetabolismStep] = useState(0);
    const [discoveryId, setDiscoveryId] = useState(null);
    const [bolusProgress, setBolusProgress] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [musicMuted, setMusicMuted] = useState(false);

    const requestRef = useRef();
    const visitedLocations = useRef(new Set());

    // --- INITIALIZATION ---
    useEffect(() => {
        // Stinger Sequences
        const t1 = setTimeout(() => setStage('adventure-title'), 3000);
        const t2 = setTimeout(() => {
            setWorldReveal(1); // Silhouettes
        }, 4000);
        const t3 = setTimeout(() => {
            setWorldReveal(2); // Soft Lighting -> Full Color
        }, 6000);
        const t4 = setTimeout(() => {
            setStage('exploration');
            setShowControls(true);
            setActiveDialogue({
                portrait: ASSETS.ALFIE_PORTRAITS.NEUTRAL,
                text: "I need to get to the hardware store for my Pog shelf supplies, but man... something smells incredible."
            });
            // Fade out controls after 4s
            setTimeout(() => setShowControls(false), 4000);
        }, 10000);

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Audio persistence and mute logic
    useEffect(() => {
        // The audio is started by App.js and persists. 
        // We only crossfade to metabolism music later.
        const audio = document.querySelector('audio'); // App.js audio element
        if (audio) {
            audio.muted = musicMuted;
        }
    }, [musicMuted]);

    // Metabolism Crossfade Logic
    useEffect(() => {
        const audio = document.querySelector('audio');
        if (stage === 'metabolism' && metabolismStep >= 6 && audio) {
            // Smoothly swap to rag2ruski.mp3
            const absoluteUrl = new URL("assets/rag2ruski.mp3", window.location.href).href;
            if (audio.src !== absoluteUrl) {
                audio.src = absoluteUrl;
                audio.play();
            }
        }
    }, [stage, metabolismStep]);

    // --- INPUT ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activeDialogue) {
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    if (activeDialogue.onNext) activeDialogue.onNext();
                    setActiveDialogue(null);
                }
                return;
            }

            if (stage === 'exploration') {
                if (e.code === 'ArrowRight' || e.key === 'd') {
                    setIsWalking(true);
                    setWalkDirection('right');
                }
                if (e.code === 'ArrowLeft' || e.key === 'a') {
                    setIsWalking(true);
                    setWalkDirection('left');
                }
            }
            
            if (stage === 'metabolism') {
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    advanceMetabolism();
                }
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === 'ArrowRight' || e.key === 'd' || e.code === 'ArrowLeft' || e.key === 'a') {
                setIsWalking(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [stage, activeDialogue, isWalking, walkDirection, alfiePos]);

    // --- INTERACTION TRIGGERS ---
    useEffect(() => {
        if (stage !== 'exploration' || activeDialogue) return;

        // Henry is at Enrique's Truck (3000)
        if (Math.abs(alfiePos - 3000) < 150) {
            setActiveDialogue({
                speaker: "Henry",
                portrait: ASSETS.HENRY_PORTRAITS.PAINED,
                text: "Ugh... Alfie... I think I ate one taco too many. My stomach feels like a heavy Pog slammer is sitting in it.",
                onNext: () => {
                    setActiveDialogue({
                        speaker: "Alfie",
                        portrait: ASSETS.ALFIE_PORTRAITS.CURIOUS,
                        text: "Hang on, Henry! This calls for a microscopic investigation. I'm going in!",
                        onNext: () => setStage('metabolism')
                    });
                }
            });
            setIsWalking(false);
        }

        // Restaurant Aroma
        if (Math.abs(alfiePos - 1500) < 100 && !visitedLocations.current.has('restaurant')) {
            visitedLocations.current.add('restaurant');
            setActiveDialogue({
                speaker: "Alfie",
                portrait: ASSETS.ALFIE_PORTRAITS.SURPRISED,
                text: "Man, Dominic's place smells great today. But I really need those Pog shelf brackets..."
            });
            setIsWalking(false);
        }
    }, [alfiePos, stage, activeDialogue]);

    const advanceMetabolism = () => {
        if (discoveryId) { setDiscoveryId(null); return; }
        if (metabolismStep < STORY_BEATS.length - 1) {
            setMetabolismStep(s => s + 1);
        } else {
            onBack();
        }
    };

    // --- RENDERERS ---

    const renderVFX = () => e(React.Fragment, null,
        e('div', { className: 'vfx-birds' }),
        e('div', { className: 'vfx-leaves' }),
        e('div', { className: 'vfx-smoke-layer' })
    );

    const renderWorld = () => {
        const viewportWidth = window.innerWidth;
        const transform = `translateX(${viewportWidth / 2 - cameraX}px)`;

        return e('div', { 
            className: `world-engine reveal-stage-${worldReveal}`,
            style: { transform }
        },
            // Deep Background: Sky
            e('div', { className: 'world-sky-layer', style: { width: WORLD_WIDTH } }),
            
            // Background: The Neighborhood Illustration
            e('div', { 
                className: 'world-bg-illustration', 
                style: { 
                    backgroundImage: `url(${ASSETS.BACKGROUNDS.STREET})`,
                    width: WORLD_WIDTH 
                } 
            }),

            // Midground: Landmarks
            LANDMARKS.map(l => e('div', { 
                key: l.id,
                className: `world-landmark landmark-${l.id}`,
                style: { left: l.x }
            }, 
                e('img', { src: l.src }),
                l.aroma && e('div', { className: 'vfx-aroma-physical' })
            )),

            // Interactive: Henry
            e('div', { className: 'world-npc', style: { left: 3000 } },
                e('img', { src: ASSETS.SPRITES.HENRY })
            ),

            // Foreground: Alfie (The Hero)
            e('div', { 
                className: `world-player ${isWalking ? 'walking' : 'idle'} dir-${walkDirection}`,
                style: { left: alfiePos }
            },
                e('img', { src: ASSETS.SPRITES.ALFIE, className: 'alfie-main' }),
                e('img', { src: ASSETS.SPRITES.BACKPACK, className: 'alfie-backpack' })
            ),

            renderVFX()
        );
    };

    const renderCinematicOverlay = () => {
        if (stage === 'labs-title') return e('div', { className: 'cinematic-stinger-text' }, "Dr. Modali Learning Labs");
        if (stage === 'adventure-title') return e('div', { className: 'cinematic-stinger-text big-title' }, "Alfie's Metabolic Adventure");
        return null;
    };

    const renderDialogue = () => {
        if (!activeDialogue && stage !== 'metabolism') return null;
        
        const currentDialogue = activeDialogue || {
            speaker: "Alfie",
            portrait: STORY_BEATS[metabolismStep].portrait,
            text: STORY_BEATS[metabolismStep].text
        };

        return e('div', { className: 'jrpg-dialogue-panel', onClick: () => {
            if (activeDialogue && activeDialogue.onNext) activeDialogue.onNext();
            setActiveDialogue(null);
            if (stage === 'metabolism') advanceMetabolism();
        }},
            e('div', { className: 'jrpg-portrait-wrap' },
                e('img', { src: currentDialogue.portrait, className: 'jrpg-portrait-img' })
            ),
            e('div', { className: 'jrpg-text-wrap' },
                e('div', { className: 'jrpg-speaker' }, currentDialogue.speaker || 'Alfie'),
                e('div', { className: 'jrpg-content' }, currentDialogue.text),
                e('div', { className: 'jrpg-hint' }, "Press SPACE or Click to continue")
            )
        );
    };

    const renderMetabolism = () => {
        const beat = STORY_BEATS[metabolismStep];
        return e('div', { className: 'metabolism-viewport' },
            e('div', { className: 'metabolism-bg', style: { backgroundImage: `url(${beat.bg})` } }),
            beat.action === 'build_the_bolus' && e('div', { className: 'bolus-mini-game-overlay' },
                e('div', { className: 'bolus-mini-game' },
                    e('h3', null, 'CLICK TACOS TO CHEW!'),
                    e('img', { 
                        src: ASSETS.SPRITES.BURGER, 
                        className: 'bolus-target', 
                        style: { transform: `scale(${1 - bolusProgress * 0.005}) rotate(${bolusProgress * 2}deg)` },
                        onClick: () => { if (bolusProgress < 100) setBolusProgress(p => p + 10); }
                    }),
                    e('div', { className: 'bolus-bar-bg' }, e('div', { className: 'bolus-bar-fill', style: { width: `${bolusProgress}%` } })),
                    bolusProgress >= 100 && e('button', { className: 'adventure-btn-large pulse', onClick: () => { setBolusProgress(0); advanceMetabolism(); } }, 'SWALLOW!')
                )
            ),
            renderDialogue()
        );
    };

    return e('div', { className: 'metabolic-adventure-root' },
        e('div', { className: 'adventure-top-hud' },
            e('button', { className: 'exit-btn', onClick: onBack }, 'QUIT'),
            e('div', { className: 'location-tag' }, 
                stage === 'metabolism' ? STORY_BEATS[metabolismStep].location : 'The Neighborhood'
            ),
            e('button', { className: 'mute-toggle-btn', onClick: () => setMusicMuted(!musicMuted) }, musicMuted ? '🔇' : '🔊')
        ),

        (stage === 'exploration' || stage === 'labs-title' || stage === 'adventure-title') && renderWorld(),
        stage === 'metabolism' && renderMetabolism(),
        
        renderCinematicOverlay(),
        (stage === 'exploration' && activeDialogue) && renderDialogue(),
        showControls && e('div', { className: 'controls-tutorial fade-in-out-tutorial' }, "MOVE: ARROW KEYS / WASD"),
        
        discoveryId && e('div', { className: 'knowledge-overlay' },
            e('div', { className: 'knowledge-card' },
                e('button', { className: 'close-card', onClick: () => setDiscoveryId(null) }, '×'),
                e('h2', null, DISCOVERY_CONTENT[discoveryId].title),
                e('div', { className: 'card-section clinical' }, e('strong', null, 'CLINICAL REVELANCE:'), e('p', null, DISCOVERY_CONTENT[discoveryId].clinical)),
                e('button', { className: 'adventure-btn-large', onClick: () => setDiscoveryId(null) }, 'GOT IT!')
            )
        )
    );
}

const DISCOVERY_CONTENT = {
    cephalic: { title: "The Cephalic Phase", clinical: "The initial stage of digestion triggered by sensory stimuli (smell, sight). Prepares the stomach for incoming food." },
    peristalsis: { title: "Peristalsis", clinical: "Wavelike muscular contractions that propel food along the digestive tract." },
    hcl: { title: "Hydrochloric Acid (HCl)", clinical: "Secreted by parietal cells, it lowers stomach pH to activate pepsin and denature proteins." },
    villi: { title: "Intestinal Villi", clinical: "Folds in the small intestine that maximize surface area for nutrient absorption." }
};