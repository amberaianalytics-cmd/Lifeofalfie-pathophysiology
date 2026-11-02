import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EncounterDirector } from './src/systems/EncounterDirector.js';
import { PROTOCOL_150_QUESTIONS } from './Protocol150Data.js';
import { ENCOUNTER_DATABASE } from './src/data/EncounterDatabase.js';

export class Protocol150Engine {
    constructor(canvas, hudCallbacks, onGameOver, onVictory, audioManager) {
        this.canvas = canvas;
        this.hud = hudCallbacks; // { setHealth, setScore, setQuestion, setChoices, setQuestionIndex, setExplanation, setTimer, setPhase }
        this.onGameOver = onGameOver;
        this.onVictory = onVictory;
        this.audioManager = audioManager;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 5000);
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.clock = new THREE.Clock();
        this.running = false;

        this.shipGroup = new THREE.Group();
        this.scene.add(this.shipGroup);

        this.state = {
            phase: 'IDLE',
            health: 100,
            score: 0,
            currentQuestionIndex: 0,
            questions: [],
            isPaused: false,
            speed: 0.8,
            correctCount: 0,
            missedTopics: new Set(),
            masteredTopics: new Set(),
            missedQuestions: [],
            ship: {
                position: new THREE.Vector3(0, 0, 0),
                velocity: new THREE.Vector3(0, 0, 0),
                rotation: new THREE.Euler(0, 0, 0),
                input: {
                    up: false,
                    down: false,
                    left: false,
                    right: false
                }
            }
        };

        this.tunnelSegments = [];
        this.loadedModels = {};

        this.loader = new GLTFLoader();
        this.setupEventListeners();
        this.initScene();
        this.loadAssets();

        // Initialize Encounter Director
        this.director = new EncounterDirector(this.scene, this.shipGroup, this.camera);
        this.setupDirectorCallbacks();
    }

    setupDirectorCallbacks() {
        this.director.onPhaseChange = (phase) => {
            console.log(`[Protocol150Engine] Phase changed to: ${phase}`);
            this.state.phase = phase;
            this.hud.setPhase(phase);
        };

        this.director.onQuestionReady = () => {
            const q = this.state.questions[this.state.currentQuestionIndex];
            
            console.log(`[Protocol150Engine] renderQuestion() - ID: ${q.id}`);
            this.hud.setQuestion(q.q);
            this.hud.setChoices(q.opts);
            this.hud.setQuestionIndex(this.state.currentQuestionIndex + 1);
        };

        this.director.onEncounterComplete = () => {
            console.log(`[Protocol150Engine] Encounter complete, advancing...`);
            this.nextQuestion();
        };

        this.director.onAnswerSelected = (idx) => {
            this.handleAnswer(idx);
        };

        this.director.onEvaluationComplete = (isCorrect, idx) => {
            this.processEvaluation(isCorrect, idx);
        };
    }

    mergeEncounterData() {
        // Map canonical questions to metadata
        return PROTOCOL_150_QUESTIONS.map(q => {
            const metadata = ENCOUNTER_DATABASE.find(e => e.questionNumber === q.id);
            
            // Generate fallback metadata if missing
            const fallback = {
                pathology: q.topic || "Cellular Stress",
                environmentTheme: "The Blood Stream",
                requiredAssets: this.getFallbackAssets(q.topic),
                encounterType: "Diagnostic Scenario",
                landmarkType: "Pathophysiology Event",
                introAnimation: "reveal_generic",
                correctAnimation: "stabilize_generic",
                incorrectAnimation: "stress_generic",
                ambientAudio: "low_thrum"
            };

            return {
                ...q,
                metadata: metadata ? { ...metadata } : fallback
            };
        });
    }

    getFallbackAssets(topic) {
        const map = {
            "Inflammation": ["inflamed_tissue_model"],
            "Wound Healing": ["granulation_tissue_model"],
            "Hemostasis": ["platelet_plug_model"],
            "Hematology": ["pale_rbc_model"],
            "Respiratory": ["constricted_bronchus_model"],
            "COPD": ["destroyed_alveoli_model"],
            "Asthma": ["constricted_bronchus_model"],
            "Cardiovascular": ["infarcted_myocardium_model"],
            "Myocardial Infarction": ["infarcted_myocardium_model"]
        };
        return map[topic] || ["cell_model"];
    }

    async loadAssets() {
        const models = [
            { name: 'ship', path: 'assets/models/von-willebrand-express.glb' },
            { name: 'alfie', path: 'assets/models/alfie-3d-model.glb' }
        ];

        let loadedCount = 0;
        for (const model of models) {
            this.loader.load(model.path, (gltf) => {
                this.loadedModels[model.name] = gltf.scene;
                loadedCount++;
                if (model.name === 'ship') {
                    this.setupShip(gltf.scene);
                }
                if (loadedCount === models.length) {
                    this.onAllAssetsLoaded();
                }
            }, undefined, (err) => {
                console.warn(`Failed to load model ${model.name}:`, err);
                loadedCount++;
            });
        }
    }

    onAllAssetsLoaded() {
        if (this.loadedModels['alfie'] && this.shipGroup) {
            this.setupAlfiePilot();
        }
    }

    setupShip(scene) {
        // Redesigning the VWF-Express from primitives for a high-fidelity "Federation hospital craft" look
        this.shipModel = new THREE.Group();
        
        const whiteMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
        const blueGlassMat = new THREE.MeshPhongMaterial({ color: 0x00f2ff, transparent: true, opacity: 0.5, shininess: 150 });
        const engineMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff });
        const trimMat = new THREE.MeshPhongMaterial({ color: 0x004488 });

        // Primary Hull (Saucer-like but elongated/medical)
        const hullGeo = new THREE.CapsuleGeometry(1, 2, 8, 16);
        const hull = new THREE.Mesh(hullGeo, whiteMat);
        hull.rotation.x = Math.PI / 2;
        this.shipModel.add(hull);

        // Cockpit / Bridge
        const bridgeGeo = new THREE.SphereGeometry(0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const bridge = new THREE.Mesh(bridgeGeo, blueGlassMat);
        bridge.position.set(0, 0.4, 0.8);
        this.shipModel.add(bridge);

        // Sensor Arrays (Small details)
        const sensorGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4);
        const sensorLeft = new THREE.Mesh(sensorGeo, whiteMat);
        sensorLeft.position.set(-0.5, -0.2, 1.2);
        this.shipModel.add(sensorLeft);
        const sensorRight = sensorLeft.clone();
        sensorRight.position.x = 0.5;
        this.shipModel.add(sensorRight);

        // Engines / Nacelles
        const nacelleGeo = new THREE.CylinderGeometry(0.2, 0.1, 1.5, 16);
        const nacelleL = new THREE.Mesh(nacelleGeo, whiteMat);
        nacelleL.position.set(-1.2, 0, -0.5);
        nacelleL.rotation.x = Math.PI / 2;
        this.shipModel.add(nacelleL);

        const engineGlowGeo = new THREE.SphereGeometry(0.18, 16, 16);
        const engineGlowL = new THREE.Mesh(engineGlowGeo, engineMat);
        engineGlowL.position.set(-1.2, 0, -1.3);
        this.shipModel.add(engineGlowL);

        const nacelleR = nacelleL.clone();
        nacelleR.position.x = 1.2;
        this.shipModel.add(nacelleR);
        const engineGlowR = engineGlowL.clone();
        engineGlowR.position.x = 1.2;
        this.shipModel.add(engineGlowR);

        // Pylons
        const pylonGeo = new THREE.BoxGeometry(0.8, 0.1, 0.3);
        const pylonL = new THREE.Mesh(pylonGeo, whiteMat);
        pylonL.position.set(-0.8, 0, -0.2);
        pylonL.rotation.z = 0.3;
        this.shipModel.add(pylonL);
        const pylonR = pylonL.clone();
        pylonR.position.x = 0.8;
        pylonR.rotation.z = -0.3;
        this.shipModel.add(pylonR);

        // Physical Hull Plate for "PROTOCOL 150"
        const plateGeo = new THREE.BoxGeometry(0.8, 0.05, 0.5);
        const plate = new THREE.Mesh(plateGeo, new THREE.MeshPhongMaterial({ color: 0x004488 }));
        plate.position.set(0, 0.48, -0.2);
        this.shipModel.add(plate);

        const decalCanvas = document.createElement('canvas');
        decalCanvas.width = 512;
        decalCanvas.height = 128;
        const decalCtx = decalCanvas.getContext('2d');
        decalCtx.fillStyle = '#ffffff'; 
        decalCtx.font = 'bold 50px Orbitron, sans-serif';
        decalCtx.textAlign = 'center';
        decalCtx.fillText('PROTOCOL 150', 256, 80);
        
        const decalTex = new THREE.CanvasTexture(decalCanvas);
        const decalMat = new THREE.MeshBasicMaterial({ map: decalTex, transparent: true });
        const textPlaneGeo = new THREE.PlaneGeometry(0.7, 0.4);
        const textPlane = new THREE.Mesh(textPlaneGeo, decalMat);
        textPlane.position.set(0, 0.52, -0.2);
        textPlane.rotation.x = -Math.PI / 2;
        this.shipModel.add(textPlane);

        // Vertical Tail Fin with ID
        const finGeo = new THREE.BoxGeometry(0.05, 0.6, 0.4);
        const fin = new THREE.Mesh(finGeo, whiteMat);
        fin.position.set(0, 0.5, -1.0);
        this.shipModel.add(fin);

        const finNameL = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.2), decalMat);
        finNameL.position.set(-0.03, 0.5, -1.0);
        finNameL.rotation.y = -Math.PI / 2;
        this.shipModel.add(finNameL);
        const finNameR = finNameL.clone();
        finNameR.position.x = 0.03;
        finNameR.rotation.y = Math.PI / 2;
        this.shipModel.add(finNameR);

        // --- PROTOCOL 150 FLAG ---
        const flagGroup = new THREE.Group();
        flagGroup.position.set(0, 0.8, -1.2);
        this.shipModel.add(flagGroup);

        const flagCanvas = document.createElement('canvas');
        flagCanvas.width = 512;
        flagCanvas.height = 256;
        const flagCtx = flagCanvas.getContext('2d');
        // Background
        flagCtx.fillStyle = '#004488';
        flagCtx.fillRect(0, 0, 512, 256);
        // Border
        flagCtx.strokeStyle = '#00f2ff';
        flagCtx.lineWidth = 20;
        flagCtx.strokeRect(0, 0, 512, 256);
        // Text
        flagCtx.fillStyle = '#ffffff';
        flagCtx.font = 'bold 60px Orbitron, sans-serif';
        flagCtx.textAlign = 'center';
        flagCtx.fillText('PROTOCOL 150', 256, 145);
        
        const flagTex = new THREE.CanvasTexture(flagCanvas);
        const flagMat = new THREE.MeshPhongMaterial({ map: flagTex, side: THREE.DoubleSide });
        const flagGeo = new THREE.PlaneGeometry(2, 1, 10, 5);
        const flag = new THREE.Mesh(flagGeo, flagMat);
        flag.position.set(1.1, 0, 0); // Offset from the pole
        flagGroup.add(flag);
        this.shipFlag = flag; // Save for animation

        const poleGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.5);
        const pole = new THREE.Mesh(poleGeo, whiteMat);
        pole.position.set(0, -0.25, 0);
        flagGroup.add(pole);

        // Medical Insignia (Side cross)
        const crossCanvas = document.createElement('canvas');
        crossCanvas.width = 128;
        crossCanvas.height = 128;
        const crossCtx = crossCanvas.getContext('2d');
        crossCtx.fillStyle = '#00f2ff'; // Cyan medical cross
        crossCtx.fillRect(48, 16, 32, 96);
        crossCtx.fillRect(16, 48, 96, 32);
        const crossTex = new THREE.CanvasTexture(crossCanvas);
        const crossMat = new THREE.MeshBasicMaterial({ map: crossTex, transparent: true });
        const crossGeo = new THREE.PlaneGeometry(0.5, 0.5);
        const crossL = new THREE.Mesh(crossGeo, crossMat);
        crossL.position.set(-1, 0.3, 0.2);
        crossL.rotation.y = -Math.PI / 2;
        this.shipModel.add(crossL);
        const crossR = crossL.clone();
        crossR.position.x = 1;
        crossR.rotation.y = Math.PI / 2;
        this.shipModel.add(crossR);

        // Cockpit Lighting for Alfie
        const cockpitLight = new THREE.PointLight(0x00f2ff, 2, 5);
        cockpitLight.position.set(0, 0.6, 0.8);
        this.shipModel.add(cockpitLight);

        this.shipGroup.add(this.shipModel);
        this.shipGroup.position.set(0, 0, 0);
    }

    setupAlfiePilot() {
        const alfie = this.loadedModels['alfie'].clone();
        alfie.scale.set(0.18, 0.18, 0.18); 
        alfie.rotation.y = Math.PI;
        alfie.position.set(0, 0, 0.6); // Seated inside the new cockpit
        this.shipGroup.add(alfie);
        this.alfiePilot = alfie;
        
        // Initial pose
        this.alfiePilot.rotation.x = 0; 
    }

    setupEventListeners() {
        this.handleResize = () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        };

        this.handleKeyDown = (e) => {
            // Steering - always allowed except for specific UI-locked phases
            if (e.key === 'ArrowUp' || e.key === 'w') this.state.ship.input.up = true;
            if (e.key === 'ArrowDown' || e.key === 's') this.state.ship.input.down = true;
            if (e.key === 'ArrowLeft' || e.key === 'a') this.state.ship.input.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd') this.state.ship.input.right = true;

            if (this.state.phase === 'QUESTIONING') {
                if (e.key === 'ArrowLeft') this.director.cycleTarget('LEFT');
                if (e.key === 'ArrowRight') this.director.cycleTarget('RIGHT');
                if (e.key === 'ArrowUp') this.director.cycleTarget('UP');
                if (e.key === 'ArrowDown') this.director.cycleTarget('DOWN');
                if (e.code === 'Space') this.director.submitFlightAnswer();
            }
        };

        this.handleKeyUp = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w') this.state.ship.input.up = false;
            if (e.key === 'ArrowDown' || e.key === 's') this.state.ship.input.down = false;
            if (e.key === 'ArrowLeft' || e.key === 'a') this.state.ship.input.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd') this.state.ship.input.right = false;
        };

        window.addEventListener('resize', this.handleResize);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    destroy() {
        this.running = false;
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        this.scene.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                else child.material.dispose();
            }
        });
        this.renderer.dispose();
    }

    initScene() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambient);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(20, 30, 10);
        this.scene.add(mainLight);

        // Fill Light
        const fillLight = new THREE.DirectionalLight(0x00f2ff, 0.4);
        fillLight.position.set(-20, -10, 5);
        this.scene.add(fillLight);

        this.createTunnel();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.001); 
        this.camera.position.set(0, 5, 15);
    }

    createTunnel() {
        const tunnelGeom = new THREE.CylinderGeometry(100, 100, 1000, 32, 20, true);
        const tunnelMat = new THREE.MeshPhongMaterial({
            color: 0x440000,
            emissive: 0x220000,
            side: THREE.BackSide,
            shininess: 10,
            bumpScale: 1
        });

        // Add some "vein" texture/variation
        for (let i = 0; i < 4; i++) {
            const segment = new THREE.Mesh(tunnelGeom, tunnelMat);
            segment.rotation.x = Math.PI / 2;
            segment.position.z = -i * 1000;
            this.scene.add(segment);
            this.tunnelSegments.push(segment);
        }
    }

    start(encounters, startIndex = 0) {
        this.state.questions = this.mergeEncounterData();
        this.state.currentQuestionIndex = startIndex;
        this.state.correctCount = 0;
        this.state.score = 0;
        this.state.health = 100;
        this.running = true;
        this.clock.start();
        
        this.loadEncounter();
        this.loop();
    }

    loadEncounter() {
        const data = this.state.questions[this.state.currentQuestionIndex];
        this.director.startEncounter(data);
    }

    update() {
        if (!this.running || this.state.isPaused) return;
        const delta = Math.min(this.clock.getDelta(), 0.1);

        // --- SHIP MOVEMENT ---
        let forwardSpeed = this.state.speed * 120;
        if (this.state.phase === 'OBSERVING') forwardSpeed *= 0.4;
        if (this.state.phase === 'FOCUSING') forwardSpeed *= 0.15;
        if (this.state.phase === 'QUESTIONING' || this.state.phase === 'EXPLAINING' || this.state.phase === 'SCANNING') forwardSpeed = 0;

        // Steering logic
        const targetVel = new THREE.Vector3(0, 0, 0);
        const steerForce = 80;
        
        // Allow steering unless we are scanning or explaining
        if (this.state.phase !== 'SCANNING' && this.state.phase !== 'EXPLAINING') {
            if (this.state.ship.input.left) targetVel.x = -steerForce;
            if (this.state.ship.input.right) targetVel.x = steerForce;
            if (this.state.ship.input.up) targetVel.y = steerForce;
            if (this.state.ship.input.down) targetVel.y = -steerForce;
        }

        this.state.ship.velocity.lerp(targetVel, 0.1);
        this.state.ship.position.x += this.state.ship.velocity.x * delta;
        this.state.ship.position.y += this.state.ship.velocity.y * delta;
        this.state.ship.position.z -= forwardSpeed * delta;

        // Clamp
        this.state.ship.position.x = THREE.MathUtils.clamp(this.state.ship.position.x, -35, 35);
        this.state.ship.position.y = THREE.MathUtils.clamp(this.state.ship.position.y, -30, 30);

        if (this.shipGroup) {
            this.shipGroup.position.copy(this.state.ship.position);
            
        if (this.state.phase === 'SCANNING' || this.state.phase === 'QUESTIONING') {
            // Director handles rotation during these phases
        } else {
            // Banking and Pitching
            const targetRotZ = -this.state.ship.velocity.x * 0.01;
            const targetRotX = this.state.ship.velocity.y * 0.01;
            
            this.shipGroup.rotation.z = THREE.MathUtils.lerp(this.shipGroup.rotation.z, targetRotZ, 0.1);
            this.shipGroup.rotation.x = THREE.MathUtils.lerp(this.shipGroup.rotation.x, targetRotX, 0.1);
        }

            // Alfie reacts
            if (this.alfiePilot) {
                this.alfiePilot.rotation.z = -this.shipGroup.rotation.z * 0.5;
                this.alfiePilot.rotation.x = -this.shipGroup.rotation.x * 0.5;
            }

            // Animate flag
            if (this.shipFlag) {
                const time = performance.now() * 0.005;
                this.shipFlag.geometry.attributes.position.array.forEach((val, i) => {
                    if (i % 3 === 2) { // Z coordinate
                        const x = this.shipFlag.geometry.attributes.position.getX(Math.floor(i / 3));
                        this.shipFlag.geometry.attributes.position.setZ(Math.floor(i / 3), Math.sin(time + x * 2) * 0.1 * x);
                    }
                });
                this.shipFlag.geometry.attributes.position.needsUpdate = true;
            }
        }

        // Camera follow - Moved much closer to see Alfie and VWF-Express
        const idealOffset = new THREE.Vector3(0, 3, 10);
        const lookAtOffset = new THREE.Vector3(0, 1.5, -40);
        
        const targetCamPos = this.state.ship.position.clone().add(idealOffset);
        this.camera.position.lerp(targetCamPos, 0.1);
        
        const targetLookAt = this.state.ship.position.clone().add(lookAtOffset);
        this.camera.lookAt(targetLookAt);

        // Director Update
        this.director.update(delta, forwardSpeed);

        // HUD timer
        if (this.state.phase === 'EXPLAINING') {
            this.hud.setTimer(Math.ceil(10 - this.director.timer));
        }

        // Tunnel cycling
        this.tunnelSegments.forEach(seg => {
            if (seg.position.z > this.camera.position.z + 500) {
                seg.position.z -= 4000;
            }
        });
    }

    handleAnswer(choiceIdx) {
        if (this.state.phase !== 'QUESTIONING') return;
        const q = this.state.questions[this.state.currentQuestionIndex];
        const isCorrect = choiceIdx === q.ans;
        this.director.handleAnswer(isCorrect, choiceIdx);
    }

    processEvaluation(isCorrect, choiceIdx) {
        const q = this.state.questions[this.state.currentQuestionIndex];
        
        if (isCorrect) {
            this.state.score += 100;
            this.state.correctCount++;
            this.state.masteredTopics.add(q.topic);
            if (this.alfiePilot) {
                // Celebration jump / Excited reaction
                const originalY = 0;
                const jump = () => {
                    let startTime = performance.now();
                    const anim = (now) => {
                        let elapsed = (now - startTime) / 1000;
                        if (elapsed < 0.5) {
                            this.alfiePilot.position.y = originalY + Math.abs(Math.sin(elapsed * Math.PI * 4)) * 0.15;
                            this.alfiePilot.rotation.z = Math.sin(elapsed * Math.PI * 4) * 0.2;
                            requestAnimationFrame(anim);
                        } else {
                            this.alfiePilot.position.y = originalY;
                            this.alfiePilot.rotation.z = 0;
                        }
                    };
                    requestAnimationFrame(anim);
                };
                jump();
            }
        } else {
            this.state.health -= 10;
            this.state.missedTopics.add(q.topic);
            this.state.missedQuestions.push(q);
            if (this.alfiePilot) {
                // Worried / Slouch reaction
                const originalY = 0;
                const slouch = () => {
                    let startTime = performance.now();
                    const anim = (now) => {
                        let elapsed = (now - startTime) / 1000;
                        if (elapsed < 1.0) {
                            this.alfiePilot.position.y = originalY - (elapsed < 0.5 ? elapsed * 0.2 : (1.0 - elapsed) * 0.2);
                            this.alfiePilot.rotation.x = (elapsed < 0.5 ? elapsed * 0.5 : (1.0 - elapsed) * 0.5);
                            requestAnimationFrame(anim);
                        } else {
                            this.alfiePilot.position.y = originalY;
                            this.alfiePilot.rotation.x = 0;
                        }
                    };
                    requestAnimationFrame(anim);
                };
                slouch();
            }
            if (this.state.health <= 0) {
                this.onGameOver();
                return;
            }
        }
        
        this.hud.setScore(this.state.score);
        this.hud.setHealth(this.state.health);
        this.hud.setExplanation(q.rationale, isCorrect, q.ans);
    }

    nextQuestion() {
        this.state.currentQuestionIndex++;
        if (this.state.currentQuestionIndex >= this.state.questions.length) {
            this.running = false;
            this.onVictory({
                score: this.state.score,
                percentage: Math.round((this.state.correctCount / this.state.questions.length) * 100),
                correct: this.state.correctCount,
                total: this.state.questions.length,
                masteredTopics: Array.from(this.state.masteredTopics),
                missedTopics: Array.from(this.state.missedTopics),
                missedQuestions: this.state.missedQuestions
            });
            return;
        }
        this.loadEncounter();
    }

    loop() {
        if (!this.running) return;
        requestAnimationFrame(() => this.loop());
        this.update();
        this.renderer.render(this.scene, this.camera);
    }
}
