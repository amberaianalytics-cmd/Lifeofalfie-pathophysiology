/**
 * HCR 240 Encounter Director
 * Procedurally constructs and manages the lifecycle of a medical encounter.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ASSET_REGISTRY } from './AssetRegistry.js';

export class EncounterDirector {
    constructor(scene, ship, camera) {
        this.scene = scene;
        this.ship = ship;
        this.camera = camera;
        
        this.loader = new GLTFLoader();
        this.modelCache = new Map();
        
        this.currentEncounter = null;
        this.phase = 'IDLE'; // IDLE, SCENARIO_INTRO, SPAWNING, OBSERVING, FOCUSING, QUESTIONING, SCANNING, EXPLAINING
        
        this.timer = 0;
        this.encounterGroup = new THREE.Group();
        this.scene.add(this.encounterGroup);

        this.targetGroup = new THREE.Group();
        this.encounterGroup.add(this.targetGroup);
        
        this.onPhaseChange = null;
        this.onQuestionReady = null;
        this.onEncounterComplete = null;
        this.onAnswerSelected = null;
        this.onEvaluationComplete = null;

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        
        this.highlightedTarget = null;
        this.selectedIdx = -1;
        this.targetCycleIndex = 0;
        this.scenarioStage = 0;
        this.scanStage = 'NONE'; // NONE, CHARGE, FIRE
    }

    cycleTarget(direction) {
        if (this.phase !== 'QUESTIONING') return;
        const count = this.targetGroup.children.length;
        if (count === 0) return;
        
        let row = Math.floor(this.targetCycleIndex / 2);
        let col = this.targetCycleIndex % 2;

        if (direction === 'LEFT') col = 0;
        if (direction === 'RIGHT') col = 1;
        if (direction === 'UP') row = 0;
        if (direction === 'DOWN') row = 1;

        const nextIdx = row * 2 + col;
        if (nextIdx !== this.targetCycleIndex) {
            this.targetCycleIndex = nextIdx;
            this.highlightedTarget = this.targetGroup.children[this.targetCycleIndex];
        }
    }

    startEncounter(encounterData) {
        this.currentEncounter = encounterData;
        const meta = encounterData.metadata;
        this.clearEncounter();
        
        console.log(`Director: Starting Encounter ${encounterData.id} - ${meta?.pathology || "Unknown"}`);
        
        // For Question 1 (and eventually others), we play the scenario intro
        if (encounterData.id === 1) {
            this.playScenarioSequence();
        } else {
            this.setupEnvironment(meta);
            this.setPhase('OBSERVING');
        }
    }

    setupEnvironment(meta) {
        const pathology = meta?.pathology || "";
        const topic = meta?.topic || "";

        if (pathology.includes("Inflammation") || topic === "Inflammation") {
            this.setupInflammationEnvironment();
        } else if (topic === "Respiratory" || topic === "COPD" || topic === "Asthma") {
            this.setupAlveolarForest();
        } else if (topic === "Hematology" || pathology.includes("Marrow")) {
            this.setupMarrowForge();
        } else {
            this.setupGenericBloodstream();
        }
    }

    setupAlveolarForest() {
        const spawnDistance = 600;
        const spawnPos = this.ship.position.clone();
        spawnPos.z -= spawnDistance;
        this.encounterGroup.position.copy(spawnPos);

        // Alveolar Sacs (Large clusters)
        for (let i = 0; i < 12; i++) {
            const cluster = new THREE.Group();
            cluster.position.set((Math.random()-0.5)*800, (Math.random()-0.5)*800, (Math.random()-0.5)*800);
            
            const sacGeo = new THREE.SphereGeometry(60, 16, 16);
            const sacMat = new THREE.MeshPhongMaterial({ 
                color: 0xffaaaa, 
                transparent: true, 
                opacity: 0.4, 
                side: THREE.DoubleSide 
            });
            const sac = new THREE.Mesh(sacGeo, sacMat);
            cluster.add(sac);
            
            // Add "Destruction" for Emphysema mnemonics
            if (Math.random() > 0.5) {
                sac.scale.set(1.2, 0.8, 1.1);
                sac.material.color.setHex(0xcc8888);
            }
            
            this.encounterGroup.add(cluster);
        }

        // Air-trapping particles (Dusty air)
        const pCount = 2000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for(let i=0; i<pCount*3; i++) pPos[i] = (Math.random() - 0.5) * 1500;
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pPoints = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xaaaaaa, size: 2, transparent: true, opacity: 0.5 }));
        this.encounterGroup.add(pPoints);
    }

    setupMarrowForge() {
        const spawnDistance = 600;
        const spawnPos = this.ship.position.clone();
        spawnPos.z -= spawnDistance;
        this.encounterGroup.position.copy(spawnPos);

        // Marrow Network (Trabecular bone look)
        const boneMat = new THREE.MeshPhongMaterial({ color: 0xffeedd, flatShading: true });
        for (let i = 0; i < 20; i++) {
            const geo = new THREE.BoxGeometry(20, 200, 20);
            const bone = new THREE.Mesh(geo, boneMat);
            bone.position.set((Math.random()-0.5)*1000, (Math.random()-0.5)*1000, (Math.random()-0.5)*1000);
            bone.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
            this.encounterGroup.add(bone);
        }

        // Newly minted Reticulocytes (Pale red cells)
        const cellGeo = new THREE.SphereGeometry(10, 8, 8);
        const cellMat = new THREE.MeshPhongMaterial({ color: 0xffaaaa });
        for (let i = 0; i < 50; i++) {
            const cell = new THREE.Mesh(cellGeo, cellMat);
            cell.position.set((Math.random()-0.5)*600, (Math.random()-0.5)*600, (Math.random()-0.5)*600);
            this.encounterGroup.add(cell);
        }
    }

    setupGenericBloodstream() {
        const spawnDistance = 600;
        const spawnPos = this.ship.position.clone();
        spawnPos.z -= spawnDistance;
        this.encounterGroup.position.copy(spawnPos);

        // RBCs floating around
        const rbcGeo = new THREE.TorusGeometry(8, 3, 8, 16);
        const rbcMat = new THREE.MeshPhongMaterial({ color: 0xcc0000 });
        for (let i = 0; i < 40; i++) {
            const rbc = new THREE.Mesh(rbcGeo, rbcMat);
            rbc.position.set((Math.random()-0.5)*800, (Math.random()-0.5)*800, (Math.random()-0.5)*800);
            rbc.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
            this.encounterGroup.add(rbc);
        }
    }

    playScenarioSequence() {
        this.setPhase('SCENARIO_INTRO');
        this.scenarioStage = 0; 
    }

    update(dt, shipSpeed) {
        this.timer += dt;
        
        if (this.phase === 'SCENARIO_INTRO') {
            this.updateScenarioIntro(dt);
            return; 
        }

        if (this.plasmaParticles) this.plasmaParticles.rotation.y += dt * 0.1;
        
        // Update Neutrophils migration
        if (this.neutrophils) {
            this.neutrophils.children.forEach(n => {
                n.position.addScaledVector(n.userData.vel, dt);
                n.position.lerp(new THREE.Vector3(0,0,0), 0.005);
                n.position.x += (Math.random() - 0.5) * 2;
                n.position.y += (Math.random() - 0.5) * 2;
                n.position.z += (Math.random() - 0.5) * 2;
            });
        }

        // Update Leaking Particles
        if (this.leakArrays) {
            this.leakArrays.forEach(leak => {
                const pos = leak.geometry.attributes.position.array;
                const origin = leak.userData.origin;
                const dir = leak.userData.dir;
                for(let i=0; i<pos.length; i+=3) {
                    pos[i] += dir.x * 20 * dt;
                    pos[i+1] += dir.y * 20 * dt;
                    pos[i+2] += dir.z * 20 * dt;
                    
                    if (new THREE.Vector3(pos[i], pos[i+1], pos[i+2]).distanceTo(origin) > 100) {
                        pos[i] = origin.x;
                        pos[i+1] = origin.y;
                        pos[i+2] = origin.z;
                    }
                }
                leak.geometry.attributes.position.needsUpdate = true;
            });
        }
        
        const distance = this.ship.position.distanceTo(this.encounterGroup.position);
        
        switch(this.phase) {
            case 'OBSERVING': 
                if (distance < 200) this.setPhase('FOCUSING'); 
                break;
            case 'FOCUSING': 
                if (this.timer > 2.5) { 
                    this.setPhase('QUESTIONING'); 
                    this.createAnswerTargets(); 
                    this.targetCycleIndex = 0; 
                    this.highlightedTarget = this.targetGroup.children[0]; 
                    if (this.onQuestionReady) this.onQuestionReady(); 
                } 
                break;
            case 'QUESTIONING': 
                this.updateDiagnosticLock(dt); 
                break;
            case 'SCANNING': 
                this.updateScanning(dt); 
                break;
            case 'EXPLAINING': 
                if (this.timer > 10) { 
                    if (this.onEncounterComplete) this.onEncounterComplete(); 
                    this.setPhase('IDLE'); 
                } 
                break;
        }

        // Pathology rotation / subtle animation
        this.encounterGroup.children.forEach(child => {
            if (child !== this.targetGroup && child.name !== "plasmaParticles") {
                child.rotation.y += 0.01;
                child.rotation.x += 0.005;
            }
        });

        // Holograms look at camera
        const camWorldPos = new THREE.Vector3();
        this.camera.getWorldPosition(camWorldPos);
        this.targetGroup.children.forEach(t => {
            const localCamPos = t.parent.worldToLocal(camWorldPos.clone());
            t.lookAt(localCamPos);
        });
    }

    updateScenarioIntro(dt) {
        if (this.timer < 5) {
            // Step 1-4: Leg Exterior, Wound, Redness, Swelling
            if (this.scenarioStage === 0) {
                this.setupLegExterior();
                this.scenarioStage = 1;
            }
            // Animate swelling/redness
            if (this.legSwellingGroup) {
                const swelling = 1 + Math.min(this.timer * 0.1, 0.4);
                this.legSwellingGroup.scale.set(swelling, 1, swelling);
            }
            if (this.legRedness) {
                this.legRedness.material.opacity = Math.min(this.timer * 0.2, 0.7);
            }
            // Zoom camera in
            this.camera.position.z -= 80 * dt;
        } else if (this.timer < 9) {
            // Step 5-6: Transition beneath skin
            if (this.scenarioStage === 1) {
                this.scene.fog.color.setHex(0x550000);
                this.scene.fog.density = 0.1;
                this.scenarioStage = 2;
            }
            this.camera.position.z -= 120 * dt;
        } else {
            // Step 7-8: Microscopic world
            if (this.scenarioStage === 2) {
                this.clearEncounter();
                this.setupInflammationEnvironment();
                this.scenarioStage = 3;
            }
            this.scene.fog.density = 0.002;
            this.setPhase('OBSERVING');
        }
    }

    setupLegExterior() {
        this.clearEncounter();
        const legGroup = new THREE.Group();
        legGroup.position.set(0, 0, -400);
        this.encounterGroup.add(legGroup);

        // Leg Cylinder (Humanoid proportions)
        const legGeo = new THREE.CylinderGeometry(50, 45, 1200, 32);
        const skinMat = new THREE.MeshPhongMaterial({ color: 0xdbac98, shininess: 10 });
        const leg = new THREE.Mesh(legGeo, skinMat);
        leg.rotation.z = Math.PI / 12;
        legGroup.add(leg);

        this.legSwellingGroup = new THREE.Group();
        this.legSwellingGroup.position.set(10, 50, 45);
        legGroup.add(this.legSwellingGroup);

        // Abrasion / Wound (Recognizable injury)
        const woundGeo = new THREE.SphereGeometry(25, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
        const woundMat = new THREE.MeshPhongMaterial({ 
            color: 0x880000, 
            emissive: 0x440000, 
            bumpScale: 2
        });
        const wound = new THREE.Mesh(woundGeo, woundMat);
        wound.scale.set(1.4, 0.3, 1.2);
        this.legSwellingGroup.add(wound);

        // Redness spreading (Erythema)
        const rednessGeo = new THREE.CircleGeometry(90, 32);
        const rednessMat = new THREE.MeshBasicMaterial({ 
            color: 0xff0000, 
            transparent: true, 
            opacity: 0,
            side: THREE.DoubleSide
        });
        this.legRedness = new THREE.Mesh(rednessGeo, rednessMat);
        this.legRedness.position.set(0, 0.5, 0); // Slightly above skin
        this.legRedness.rotation.x = -Math.PI / 2;
        this.legSwellingGroup.add(this.legRedness);

        // Shine from Edema
        const shineGeo = new THREE.SphereGeometry(100, 32, 32);
        const shineMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            shininess: 100
        });
        const shine = new THREE.Mesh(shineGeo, shineMat);
        shine.scale.set(1.2, 0.5, 1.2);
        this.legSwellingGroup.add(shine);
    }

    setupInflammationEnvironment() {
        const spawnDistance = 600;
        const spawnPos = this.ship.position.clone();
        spawnPos.z -= spawnDistance;
        this.encounterGroup.position.copy(spawnPos);

        // --- VASCULAR MNEMONIC: Dilated Capillaries with ENDOTHELIAL GAPS ---
        const vesselGroup = new THREE.Group();
        this.encounterGroup.add(vesselGroup);

        for (let i = 0; i < 3; i++) {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-400 + i * 200, -200, -800),
                new THREE.Vector3(-100 + i * 100, 50, -400),
                new THREE.Vector3(50, -50, 0),
                new THREE.Vector3(300, 100, 400)
            ]);
            
            // Create segments with visible gaps for "Increased Vascular Permeability"
            const tubePoints = curve.getPoints(50);
            const segmentLength = 4;
            for(let j=0; j<tubePoints.length - 1; j++) {
                if (j % 6 === 0) continue; // Skip a segment to show a GAP
                
                const start = tubePoints[j];
                const end = tubePoints[j+1];
                const dist = start.distanceTo(end);
                
                const segGeo = new THREE.CylinderGeometry(25, 25, dist, 8);
                const segMat = new THREE.MeshPhongMaterial({ 
                    color: 0xaa0000, 
                    transparent: true, 
                    opacity: 0.7,
                    emissive: 0x330000 
                });
                const seg = new THREE.Mesh(segGeo, segMat);
                
                // Align to curve
                const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
                seg.position.copy(midpoint);
                seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
                vesselGroup.add(seg);

                // --- FLUID LEAKAGE PARTICLES from the gaps ---
                if (j % 6 === 1) { // Right after a gap
                    const leakCount = 20;
                    const leakPos = new Float32Array(leakCount * 3);
                    for(let k=0; k<leakCount; k++) {
                        leakPos[k*3] = midpoint.x;
                        leakPos[k*3+1] = midpoint.y;
                        leakPos[k*3+2] = midpoint.z;
                    }
                    const leakGeo = new THREE.BufferGeometry();
                    leakGeo.setAttribute('position', new THREE.BufferAttribute(leakPos, 3));
                    const leakPoints = new THREE.Points(leakGeo, new THREE.PointsMaterial({
                        color: 0xffdd44,
                        size: 3,
                        transparent: true,
                        opacity: 0.6,
                        blending: THREE.AdditiveBlending
                    }));
                    leakPoints.userData.origin = midpoint.clone();
                    leakPoints.userData.dir = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
                    vesselGroup.add(leakPoints);
                    
                    // Save for animation
                    if (!this.leakArrays) this.leakArrays = [];
                    this.leakArrays.push(leakPoints);
                }
            }
        }

        // Interstitial Edema (Golden-yellow plasma pool)
        const pCount = 3000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for(let i=0; i<pCount*3; i++) pPos[i] = (Math.random() - 0.5) * 1200;
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ 
            color: 0xffdd44, 
            size: 2, 
            transparent: true, 
            opacity: 0.3,
            blending: THREE.AdditiveBlending 
        });
        this.plasmaParticles = new THREE.Points(pGeo, pMat);
        this.plasmaParticles.name = "plasmaParticles";
        this.encounterGroup.add(this.plasmaParticles);

        // Migrating Neutrophils (Arriving white blood cells)
        this.neutrophils = new THREE.Group();
        const neutroGeo = new THREE.SphereGeometry(6, 12, 12);
        const neutroMat = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xcccccc });
        for (let i = 0; i < 30; i++) {
            const n = new THREE.Mesh(neutroGeo, neutroMat);
            n.position.set(
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 800
            );
            n.userData.vel = new THREE.Vector3((Math.random()-0.5)*15, (Math.random()-0.5)*15, (Math.random()-0.5)*15);
            this.neutrophils.add(n);
        }
        this.encounterGroup.add(this.neutrophils);

        // Tissue Macro structures (Swollen Fibers)
        for (let i = 0; i < 15; i++) {
            const geo = new THREE.TorusGeometry(30 + Math.random() * 20, 5, 8, 20);
            const mat = new THREE.MeshPhongMaterial({ color: 0xbb5555, transparent: true, opacity: 0.5 });
            const fiber = new THREE.Mesh(geo, mat);
            fiber.position.set(
                (Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 1000
            );
            fiber.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
            this.encounterGroup.add(fiber);
        }
    }

    setPhase(newPhase) {
        this.phase = newPhase;
        this.timer = 0;
        if (this.onPhaseChange) this.onPhaseChange(newPhase);
    }

    clearEncounter() {
        if (this.scanBeam) {
            this.encounterGroup.remove(this.scanBeam);
            this.scanBeam.geometry.dispose();
            this.scanBeam.material.dispose();
            this.scanBeam = null;
        }
        if (this.neutrophils) {
            this.encounterGroup.remove(this.neutrophils);
            this.disposeObject(this.neutrophils);
            this.neutrophils = null;
        }
        this.leakArrays = []; // Reset leaks
        while(this.encounterGroup.children.length > 0) {
            const child = this.encounterGroup.children[0];
            if (child === this.targetGroup) {
                while(this.targetGroup.children.length > 0) {
                    const t = this.targetGroup.children[0];
                    this.targetGroup.remove(t);
                    this.disposeObject(t);
                }
                this.encounterGroup.remove(child);
                continue;
            }
            this.encounterGroup.remove(child);
            this.disposeObject(child);
        }
        this.encounterGroup.add(this.targetGroup);
        this.highlightedTarget = null;
        this.selectedTarget = null;
        this.plasmaParticles = null;
    }

    disposeObject(obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) { obj.material.forEach(m => m.dispose()); }
            else { obj.material.dispose(); }
        }
        if (obj.children) { obj.children.forEach(child => this.disposeObject(child)); }
    }

    spawnPathology(meta) {
        // Legacy fallback
        const spawnDistance = 600;
        const spawnPos = this.ship.position.clone();
        spawnPos.z -= spawnDistance;
        this.encounterGroup.position.copy(spawnPos);
    }

    createAnswerTargets() {
        const choices = this.currentEncounter.opts;
        const labels = ['A', 'B', 'C', 'D'];
        // 2x2 Grid Layout - Positioned for massive visibility
        const gridPositions = [
            { x: -90, y: 50 },
            { x: 90, y: 50 },
            { x: -90, y: -50 },
            { x: 90, y: -50 }
        ];

        // Ensure target group is positioned in front of the camera's normal questioning view
        this.targetGroup.position.set(0, 0, 150); 

        choices.forEach((choice, i) => {
            const group = new THREE.Group();
            
            // Giant Floating ID (A, B, C, D)
            const idCanvas = document.createElement('canvas');
            idCanvas.width = 256;
            idCanvas.height = 256;
            const idCtx = idCanvas.getContext('2d');
            idCtx.fillStyle = '#00f2ff';
            idCtx.font = 'bold 200px Orbitron, sans-serif';
            idCtx.textAlign = 'center';
            idCtx.textBaseline = 'middle';
            idCtx.fillText(labels[i], 128, 128);
            
            const idTex = new THREE.CanvasTexture(idCanvas);
            const idMat = new THREE.MeshBasicMaterial({ map: idTex, transparent: true, side: THREE.DoubleSide });
            const idMesh = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), idMat);
            idMesh.position.set(-60, 0, 5); // Left of the text
            group.add(idMesh);

            // Holographic Panel Background
            const panelGeo = new THREE.PlaneGeometry(120, 40);
            const panelMat = new THREE.MeshBasicMaterial({ 
                color: 0x001a33, 
                transparent: true, 
                opacity: 0.8,
                side: THREE.DoubleSide,
                depthTest: false 
            });
            const panel = new THREE.Mesh(panelGeo, panelMat);
            panel.renderOrder = 100;
            group.add(panel);

            // Glowing Outline
            const outlineGeo = new THREE.EdgesGeometry(panelGeo);
            const outlineMat = new THREE.LineBasicMaterial({ color: 0x00f2ff, linewidth: 4, depthTest: false });
            const outline = new THREE.LineSegments(outlineGeo, outlineMat);
            outline.renderOrder = 101;
            group.add(outline);

            // Animated Brackets
            const bracketSize = 12;
            const brackets = new THREE.Group();
            brackets.name = 'brackets';
            const bMat = new THREE.LineBasicMaterial({ color: 0x00f2ff, linewidth: 6, depthTest: false });
            const createCorner = (x, y, rot) => {
                const bGeo = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(-bracketSize, 0, 0),
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, -bracketSize, 0)
                ]);
                const corner = new THREE.Line(bGeo, bMat);
                corner.position.set(x, y, 0);
                corner.rotation.z = rot;
                corner.renderOrder = 103;
                brackets.add(corner);
            };
            createCorner(-65, 25, 0);
            createCorner(65, 25, -Math.PI/2);
            createCorner(65, -25, -Math.PI);
            createCorner(-65, -25, Math.PI/2);
            brackets.visible = false;
            group.add(brackets);

            const label = this.createLabel(choice);
            label.position.set(10, 0, 2);
            label.renderOrder = 104;
            group.add(label);

            group.position.set(gridPositions[i].x, gridPositions[i].y, 0);
            group.userData.choiceIdx = i;
            this.targetGroup.add(group);
        });
    }

    createLabel(text) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 70px Orbitron, sans-serif'; 
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#00f2ff';
        ctx.shadowBlur = 10;
        
        // Wrap text
        const words = text.split(' ');
        let lines = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
            if (ctx.measureText(currentLine + " " + words[i]).width < 900) {
                currentLine += " " + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);

        lines.forEach((line, idx) => {
            const y = 256 + (idx - (lines.length - 1) / 2) * 80;
            ctx.fillText(line.toUpperCase(), 50, y);
        });

        const texture = new THREE.CanvasTexture(canvas);
        const mat = new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true, 
            side: THREE.DoubleSide, 
            blending: THREE.AdditiveBlending,
            depthTest: false 
        });
        const geom = new THREE.PlaneGeometry(100, 50);
        return new THREE.Mesh(geom, mat);
    }

    updateDiagnosticLock(dt) {
        if (!this.highlightedTarget) return;
        
        // Ship auto-rotates toward highlighed target for precision look
        const targetWorldPos = new THREE.Vector3();
        this.highlightedTarget.getWorldPosition(targetWorldPos);
        const direction = targetWorldPos.clone().sub(this.ship.position).normalize();
        const targetQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, -1), direction);
        this.ship.quaternion.slerp(targetQuat, 0.08);

        this.targetGroup.children.forEach(t => {
            const isSelected = (t === this.highlightedTarget);
            const brackets = t.getObjectByName('brackets');
            if (isSelected) {
                t.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
                if (brackets) { 
                    brackets.visible = true; 
                    const bScale = 1.0 + Math.abs(Math.sin(this.timer * 6)) * 0.1;
                    brackets.scale.set(bScale, bScale, bScale);
                }
            } else {
                t.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                if (brackets) brackets.visible = false;
            }
        });
    }

    updateScanning(dt) {
        if (!this.selectedTarget) return;
        
        // Lock rotation during scanning
        const targetWorldPos = new THREE.Vector3();
        this.selectedTarget.getWorldPosition(targetWorldPos);
        const direction = targetWorldPos.clone().sub(this.ship.position).normalize();
        const targetQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, -1), direction);
        this.ship.quaternion.slerp(targetQuat, 0.15);

        if (this.scanStage === 'CHARGE') {
            if (this.timer > 1.5) { // Slightly longer charge for drama
                this.scanStage = 'FIRE';
                this.timer = 0;
                this.fireLaser();
            }
        } else if (this.scanStage === 'FIRE') {
            if (this.timer > 1.2) {
                this.evaluateAnswer();
            }
        }
    }

    fireLaser() {
        const shipWorldPos = this.ship.getWorldPosition(new THREE.Vector3());
        const targetWorldPos = this.selectedTarget.getWorldPosition(new THREE.Vector3());
        
        // Both in world space, let's put the beam in scene space or encounterGroup space
        const shipLocalPos = this.encounterGroup.worldToLocal(shipWorldPos);
        const targetLocalPos = this.encounterGroup.worldToLocal(targetWorldPos);
        
        const beamGeom = new THREE.BufferGeometry().setFromPoints([shipLocalPos, targetLocalPos]);
        const beamMat = new THREE.LineBasicMaterial({ color: 0x00f2ff, linewidth: 10, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
        this.scanBeam = new THREE.Line(beamGeom, beamMat);
        const coreMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3, transparent: true, opacity: 1.0 });
        this.scanBeam.add(new THREE.Line(beamGeom, coreMat));
        this.encounterGroup.add(this.scanBeam);
    }

    submitFlightAnswer() {
        if (this.highlightedTarget && this.highlightedTarget.userData.choiceIdx !== undefined) {
            this.handleAnswer(this.highlightedTarget.userData.choiceIdx === this.currentEncounter.ans, this.highlightedTarget.userData.choiceIdx);
        }
    }

    handleAnswer(isCorrect, selectedIdx) {
        if (this.phase !== 'QUESTIONING') return;
        this.selectedIdx = selectedIdx; this.selectedIsCorrect = isCorrect;
        this.selectedTarget = this.targetGroup.children.find(t => t.userData.choiceIdx === selectedIdx);
        this.setPhase('SCANNING');
        this.scanStage = 'CHARGE';
    }

    evaluateAnswer() {
        const isCorrect = this.selectedIsCorrect;
        const selectedIdx = this.selectedIdx;
        if (this.onEvaluationComplete) this.onEvaluationComplete(isCorrect, selectedIdx);
        if (this.scanBeam) {
            this.scanBeam.material.color.setHex(isCorrect ? 0x00ffaa : 0xff0055);
            setTimeout(() => { if (this.scanBeam) { this.encounterGroup.remove(this.scanBeam); this.scanBeam.geometry.dispose(); this.scanBeam.material.dispose(); this.scanBeam = null; } }, 1000);
        }
        this.targetGroup.children.forEach(t => {
            const panel = t.children[0];
            if (t.userData.choiceIdx === selectedIdx) {
                panel.material.color.setHex(isCorrect ? 0x00ffaa : 0x550000);
                panel.material.opacity = 0.8;
            } else if (t.userData.choiceIdx === this.currentEncounter.ans) {
                panel.material.color.setHex(0x00ffaa); panel.material.opacity = 0.6;
            }
        });
        const meta = this.currentEncounter.metadata;
        this.triggerAnimation(isCorrect ? meta?.correctAnimation : meta?.incorrectAnimation, isCorrect);
        this.setPhase('EXPLAINING');
    }

    triggerAnimation(key, isCorrect) {
        this.encounterGroup.children.forEach(child => {
            if (child === this.targetGroup) return;
            if (isCorrect) {
                if (child.material && child.material.emissive) { child.material.emissive.setHex(0x00ffaa); child.material.emissiveIntensity = 1.0; }
                child.scale.multiplyScalar(0.95);
            } else {
                if (child.material && child.material.emissive) { child.material.emissive.setHex(0xff0055); child.material.emissiveIntensity = 1.5; }
                child.scale.multiplyScalar(1.1);
            }
        });
    }
}
