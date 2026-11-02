
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { 
    MODULE1_RIG_METADATA, 
    MODULE1_PATHOPHYSIOLOGY_DATA, 
    MODULE1_NPC_DATA 
} from './module1-content.js';

const e = React.createElement;

export default function Module1Story3D({ onBack, onMusicChange }) {
    const containerRef = useRef(null);
    const [currentView, setCurrentView] = useState('menu'); // 'menu', 'chapter', 'beat'
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const modelsRef = useRef({});

    useEffect(() => {
        // Manage Story Music for Mod 1
        if (onMusicChange) onMusicChange("assets/loam2a.mp3");
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a1a);
        scene.fog = new THREE.Fog(0x0a0a1a, 5, 25);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 2, 6);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.maxPolarAngle = Math.PI / 2;
        controlsRef.current = controls;

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));
        const pointLight = new THREE.PointLight(0x00ff41, 2, 30);
        pointLight.position.set(5, 10, 5);
        pointLight.castShadow = true;
        scene.add(pointLight);

        // Ground/Grid
        const grid = new THREE.GridHelper(60, 60, 0x00ff41, 0x111111);
        scene.add(grid);

        // Load Assets
        const loader = new GLTFLoader();
        const loadModel = (name, path, pos, scale = 1, rotation = 0) => {
            return new Promise((resolve) => {
                loader.load(path, (gltf) => {
                    const model = gltf.scene;
                    model.position.set(...pos);
                    model.scale.set(scale, scale, scale);
                    model.rotation.y = rotation;
                    model.traverse(n => { if (n.isMesh) n.castShadow = true; });
                    scene.add(model);
                    modelsRef.current[name] = model;
                    resolve(model);
                }, undefined, () => resolve(null));
            });
        };

        Promise.all([
            loadModel('alfie', 'assets/models/alfie-3d-model.glb', [-1.5, 0, 0], 1.2, Math.PI / 6),
            loadModel('dna', 'assets/models/dna-strand-nexus.glb', [2, 1, -1], 5, 0),
            loadModel('monitor', 'assets/models/medical-monitor-stand.glb', [1, 0, -2], 1.3, -Math.PI / 4)
        ]).then(() => {
            setLoading(false);
        });

        const animate = () => {
            requestAnimationFrame(animate);
            if (controlsRef.current) controlsRef.current.update();
            if (modelsRef.current.dna) modelsRef.current.dna.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (renderer.domElement && containerRef.current) containerRef.current.removeChild(renderer.domElement);
            renderer.dispose();
            scene.traverse(obj => {
                if (obj.isMesh) {
                    obj.geometry.dispose();
                    if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                    else obj.material.dispose();
                }
            });
        };
    }, []);

    const renderOverlay = () => {
        if (loading) return e('div', { className: 'story-overlay-loading' }, 
            e('div', { className: 'matrix-text glitch' }, 'LOADING MODULE 1 CLINICAL DATA...'),
            e('div', { style: { fontSize: '0.8rem', marginTop: '10px' } }, 'STABILIZING NEURAL PATHWAYS')
        );

        if (currentView === 'menu') {
            return e('div', { className: 'story-menu-overlay fade-in' },
                e('div', { className: 'story-header' },
                    e('h1', { className: 'matrix-text hub-title-glow' }, 'MODULE 1 STORY MODE'),
                    e('button', { className: 'btn-cyber-small', onClick: onBack }, 'EXIT')
                ),
                e('div', { className: 'story-menu-sections' },
                    e('div', { className: 'story-menu-column' },
                        e('h2', { className: 'matrix-text' }, 'FOUNDATIONS'),
                        MODULE1_RIG_METADATA.map(rig => e('button', { 
                            key: rig.id, 
                            className: 'story-menu-btn', 
                            onClick: () => { setSelectedItem(rig); setCurrentView('chapter'); }
                        }, rig.label))
                    ),
                    e('div', { className: 'story-menu-column' },
                        e('h2', { className: 'matrix-text' }, 'CLINICAL NARRATIVE'),
                        e('button', { 
                            className: 'story-menu-btn highlight', 
                            onClick: () => { setCurrentView('beat'); setCurrentBeatIndex(0); }
                        }, 'START FULL STORY MODE')
                    )
                )
            );
        }

        if (currentView === 'chapter' && selectedItem) {
            return e('div', { className: 'story-content-panel fade-in' },
                e('div', { className: 'panel-header' },
                    e('h2', { className: 'matrix-text' }, selectedItem.label),
                    e('button', { className: 'btn-cyber-small', onClick: () => setCurrentView('menu') }, 'BACK')
                ),
                e('div', { className: 'panel-body' },
                    e('p', null, `Detailed clinical analysis for ${selectedItem.label} is available in the documentation tab.`),
                    e('button', { className: 'btn-cyber', style: { marginTop: '20px' }, onClick: () => setCurrentView('beat') }, 'VIEW NARRATIVE BEATS')
                )
            );
        }

        if (currentView === 'beat') {
            const beat = MODULE1_PATHOPHYSIOLOGY_DATA[currentBeatIndex];
            if (!beat) return null;

            return e('div', { className: 'story-content-panel fade-in' },
                e('div', { className: 'panel-header' },
                    e('div', null,
                        e('div', { className: 'small', style: { opacity: 0.6 } }, `${beat.day} // ${beat.time}`),
                        e('h2', { className: 'matrix-text' }, beat.event)
                    ),
                    e('button', { className: 'btn-cyber-small', onClick: () => setCurrentView('menu') }, 'BACK')
                ),
                e('div', { className: 'panel-body' },
                    e('p', { className: 'panel-desc' }, beat.beats[0]?.text || "No description available."),
                    e('div', { className: 'quiz-mini-card', style: { marginTop: '20px', padding: '15px', background: 'rgba(0,255,65,0.1)', border: '1px solid #00ff41' } },
                        e('h4', { className: 'matrix-text', style: { marginBottom: '10px' } }, 'CLINICAL QUERY'),
                        e('p', { style: { fontSize: '0.9rem' } }, beat.q),
                        e('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' } },
                            beat.opts.map((opt, i) => e('button', { 
                                key: i, 
                                className: `btn-cyber-small ${i === beat.ans ? 'correct' : ''}`,
                                style: { textAlign: 'left', pointerEvents: 'none' } 
                            }, opt))
                        )
                    )
                ),
                e('div', { className: 'panel-footer', style: { marginTop: '20px', display: 'flex', justifyContent: 'space-between' } },
                    e('button', { 
                        className: 'btn-cyber-small', 
                        disabled: currentBeatIndex === 0, 
                        onClick: () => setCurrentBeatIndex(i => i - 1) 
                    }, 'PREVIOUS'),
                    e('span', { className: 'matrix-text' }, `${currentBeatIndex + 1} / ${MODULE1_PATHOPHYSIOLOGY_DATA.length}`),
                    e('button', { 
                        className: 'btn-cyber-small', 
                        disabled: currentBeatIndex === MODULE1_PATHOPHYSIOLOGY_DATA.length - 1, 
                        onClick: () => setCurrentBeatIndex(i => i + 1) 
                    }, 'NEXT')
                )
            );
        }

        return null;
    };

    return e('div', { className: 'story-3d-container', style: { width: '100%', height: '100%', position: 'relative' } },
        e('div', { className: 'three-viewport', ref: containerRef, style: { width: '100%', height: '100%' } }),
        renderOverlay()
    );
}
