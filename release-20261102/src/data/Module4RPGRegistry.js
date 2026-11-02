export const RPG_ASSETS = {
    ALFIE_SHEET: 'assets/alfie_protagonist_sprite_final.webp',
    ALFIE_PORTRAIT: 'assets/alfie_portrait_final_v4.webp',
    MAYOR: 'assets/npc-mayor-topdown.webp',
    NPC_DOCTOR: 'assets/npc_doctor.webp',
    NPC_NURSE: 'assets/npc_nurse.webp',
    NPC_GUARD: 'assets/npc_guard.webp',
    NPC_VILLAGER_M: 'assets/npc_villager_m.webp',
    NPC_VILLAGER_F: 'assets/npc_villager_f.webp',
    NPC_ELDER: 'assets/npc_elder.webp',
    NPC_CHILD: 'assets/npc_child.webp',
    NPC_TRAVELER: 'assets/npc_traveler_1.webp',
    NPC_COURIER: 'assets/new_town_courier_npc.webp',
    NPC_MEDICAL_WORKER: 'assets/npc_medical_worker_1.webp',
    NPC_GARDENER: 'assets/npc_gardener_1.webp',
    TOWN_MAP: 'assets/osteopolis-topdown-map.webp',
    INTERIOR_MAP: 'assets/osteopolis-interior-townhall.webp',
    GRANDPA_COTTAGE_MAP: 'assets/grandpas-cottage-background.webp',
    ORCHARD_MAP: 'assets/apple-orchard-background.webp',
    LACUNA_EXT_MAP: 'assets/lady-lacuna-exterior-background.webp',
    HAVERSIAN_EXT_MAP: 'assets/sir-haversian-archive-exterior-background.webp',
    CITADEL_EXT_MAP: 'assets/citadel-exterior-background.webp',
    MARROW_HALL_EXT_MAP: 'assets/bone-marrow-hall-exterior-background.webp',
    PROGENITOR_PEAKS_MAP: 'assets/progenitor-peaks-background.webp',
    SYNOVIAL_GARDENS_MAP: 'assets/synovial-gardens-background.webp',
    VERTEBRAL_PASS_MAP: 'assets/vertebral-pass-background.webp',
    TICKWOOD_FOREST_MAP: 'assets/tickwood-forest-background.webp',
    CRYSTAL_GROTTO_MAP: 'assets/crystal-grotto-background.webp',
    SEQUESTRUM_MINES_MAP: 'assets/sequestrum-mines-background.webp',
    AFFLICTIONS_HALL_EXT_MAP: 'assets/hall-of-afflictions-background.webp',
    MYSTERIES_HALL_EXT_MAP: 'assets/hall-of-mysteries-exterior-background.webp',
    REMEDIES_HOUSE_EXT_MAP: 'assets/house-of-remedies-exterior-background.webp',
    WOLFF_GROVE_MAP: 'assets/grove-of-wolff-background.webp',
    ORACLE_GROVE_MAP: 'assets/oracle-grove-background.webp',
    NORTHERN_GATE_MAP: 'assets/northern-gate-background.webp',
    LADY_LACUNA: 'assets/lady-lacuna-sprite.webp',
    SIR_HAVERSIAN: 'assets/sir-haversian-sprite.webp',
    MUSIC_INTRO: 'assets/rpg1.mp3',
    MUSIC_TOWN: 'assets/rpg1.mp3',
    MUSIC_MYSTERY: 'assets/audio/mod4b.mp3',
    MUSIC_GROVE: 'assets/audio/mod4c.mp3',
    MUSIC_BATTLE: 'assets/audio/mod4d.mp3',
    VFX_LEAVES: 'assets/falling-leaves-vfx.webp',
    VFX_BIRD: 'assets/bird-pixel-sprite.webp',
    VFX_SMOKE: 'assets/chimney-smoke-vfx.webp'
};

export const NARRATION_LINES = [
    "Welcome to the Kingdom of Osteopolis, the Living Fortress.",
    "A world built on the structural synergy of the musculoskeletal system.",
    "From the Everforge of remodeling to the dense shields of Granite Ridge, the matrix is alive.",
    "But disturbances are spreading. The balance of building and reclaiming is at risk.",
    "Alfie, a student of clinical mastery, must consult the Elders and the High Council.",
    "Balance the scales of formation and resorption, and unlock the secrets of the ancients."
];

export const DISEASE_IDS = ['osteoporosis', 'osteoarthritis', 'ddd', 'osteomyelitis', 'lyme', 'gout'];

export const NPC_TO_DISEASE = {
    'clastus': 'osteoporosis',
    'flexicon_cartilage': 'osteoarthritis',
    'elder_corticus': 'ddd',
    'sir_wolff': 'osteomyelitis',
    'sec_synovius': 'lyme',
    'eurasius': 'gout'
};

export const DEFAULT_NPC_DIALOGUE = {
    mayor: {
        initial: [
            "Greetings, traveler. I am Mayor Peri O'Steum, High Protector of the Matrix.",
            "You stand in Osteophyta, the capital. Our city is built on the living foundation of bone.",
            "Chancellor Parathor and Lady Calciferol are here to manage our mineral reserves.",
            "Lately, the Council of Five has reported disturbances in the Five Signs: Rubor, Calor, Tumor, Dolor, and Functio Laesa.",
            "Explore the regions. Visit Blastus and Clastus in the Everforge, and Cytus the Watcher at Marrowmere.",
            "Your Journal [J] will be your guide. Record every clinical pearl you find!"
        ],
        master: [
            "Incredible! You have stabilized the remodeling balance and understood the synovial flow.",
            "The Kingdom is in your debt, Alfie. Are you ready for the Final Clinical Audit?"
        ],
        audit: {
            title: "Final Clinical Audit",
            description: "Which of these pairs represents the correct contrast between Osteoporosis (OP) and Osteoarthritis (OA)?",
            options: [
                { text: "OP is cartilage loss; OA is bone thinning.", correct: false },
                { text: "OP is bone thinning; OA is articular cartilage loss.", correct: true },
                { text: "OP causes morning stiffness; OA causes fragility fractures.", correct: false },
                { text: "Both are caused by Staphylococcus aureus.", correct: false }
            ]
        }
    },
    sir_wolff: [
        "Halt! I am Sir Wolff, Grand Marshal of the Order.",
        "To pass through Wolff’s Rise, you must understand the Law of Stress.",
        "Bone adaptations are not random; they are a response to mechanical loading.",
        "If you do not use it, you will lose it. Weight-bearing is the path to strength.",
        "Remember: Remodeling follows the lines of force. That is our code."
    ],
    sec_synovius: [
        "Movement is life, and life is fluid. Welcome to Synovia.",
        "I am Secretary Synovius. I oversee the lubricated waterways of the kingdom.",
        "Articular cartilage needs our synovial fluid to remain slick and nourished.",
        "When the fluid fails, friction takes over. We must keep the canals flowing!",
        "Watch out for the Monosodium Syndicate... they've been dumping crystal contraband in our waters."
    ],
    cytus: [
        "Cytus the Watcher has been expecting you, Alfie.",
        "I am the Third Elder. I have lived in this matrix for decades.",
        "We are the sensors. We monitor every vibration, every step, and every fracture throughout Osteopolis.",
        "We pass the signal through our canaliculi, calling for the builders or the reclaimers.",
        "Homeostasis is a conversation, and I am the listener."
    ],
    elder_corticus: [
        "Granite Ridge is a place of strength and density.",
        "I am Warden Corticus. I guard the compact outer shell of the kingdom.",
        "Without our rigid cortical defense, the marrow would be exposed and the city would collapse.",
        "We are the shield. We provide the leverage for every movement.",
        "Strength requires organization. Circular organization. We call them Osteons."
    ],
    elder_trabeculus: [
        "Welcome to the South, where the bone is porous but metabolic.",
        "I am Scout Trabeculus. We live in the lattice-work, the spongy heart of the bone.",
        "We are the first to respond to hormonal changes. When estrogen fades, we are the first to thin.",
        "Osteopora is becoming too fragile. The 'Cavities' are growing.",
        "Don't let the lattice break. Once the trabeculae are gone, the foundation is lost."
    ],
    blastus: [
        "I am Blastus the Builder, First Elder of Osteopolis.",
        "I dream of new structures and fresh matrix here in the Everforge.",
        "We build the osteoid and wait for the minerals to settle.",
        "Every day is a chance to renew. We follow the signals of the Watchers.",
        "But we cannot work alone. We need the materials, the calcium, and the vitamin D."
    ],
    clastus: [
        "Renewal begins by releasing what no longer serves the kingdom.",
        "I am Clastus the Reclaimer, Second Elder. The old must make way for the new.",
        "That is the cycle of remodeling. But if I work too fast, the city becomes a sieve.",
        "That is the tragedy of Osteoporosis. RANKL is my signal. OPG is my stop sign."
    ],
    chancellor_parathor: [
        "Emergency withdrawals only! Chancellor Parathor speaking.",
        "When the blood calcium level drops, I authorize the reclaimers to start mining.",
        "Stability in the blood is my priority, even if the walls must thin to provide it.",
        "Bone is our kingdom's bank, and I hold the vault keys."
    ],
    lady_calciferol: [
        "Blessings of the sun upon you, traveler.",
        "I am Lady Calciferol. I bring the vital calcium from the world beyond our gates.",
        "Without my guidance, the builders cannot finish their work.",
        "Seek the light to keep the matrix strong!"
    ],
    ambassador_calcitonia: [
        "Peace and preservation to you. I am Ambassador Calcitonia.",
        "When the coffers are full, I encourage the builders to store our minerals.",
        "I keep the reclaimers at bay so the matrix can harden.",
        "Balance is the key to longevity."
    ],
    oracle_cyte: [
        "Balance is the highest law. I am Oracle Osteocitica.",
        "Neither building nor resorption should dominate.",
        "In the Balance Chamber, we weigh the needs of the city against the available resources.",
        "When the balance shifts, disease takes root. We must find the middle path."
    ],
    eurasius: [
        "Join the feast! The Purine Pantry is open for all!",
        "I am Eurasius. My feasts are legendary, though my big toe is killing me.",
        "They call it Podagra. A small price to pay for such rich venison and wine.",
        "Wait... is it raining needles again? My blood feels... over-saturated.",
        "Don't listen to the doctors. The Monosodium Syndicate knows how to party!"
    ],
    flexicon_cartilage: [
        "Bouncy, bouncy! Everything is soft here in Chondropolis.",
        "I am Chondrosacius. We are the shock absorbers of the kingdom.",
        "As long as we are smooth and wet, movement is a joy.",
        "But watch your step... if the cartilage wears out, it's bone-on-bone grind-time!"
    ],
    flexicon_builder: [
        "Busy, busy! I'm making more collagen Type II for the matrix.",
        "I am Chondroblastus. Cartilage is hard to repair, so we have to work constantly.",
        "We live in the lacunae, safe and small.",
        "If you want to live forever, protect your joints!"
    ],
    arthur: [
        "Ready for your exercises, Alfie? Movement is the best medicine.",
        "I am Arthur the Therapist. We focus on restoration and mobility.",
        "Whether it's a stiff joint or a healing fracture, we have a plan.",
        "Don't just stand there—get that synovial fluid moving!"
    ],
    lady_lacuna: [
        "Welcome to my district, young scholar. I am Lady Lacuna.",
        "Here in the Petrifica Plateau, we value density and tradition.",
        "We live within the matrix, tucked away in our private lacunae.",
        "If you wish to understand the strength of the kingdom, you must understand the circular architecture of the Osteon.",
        "The Elder Corticus is further west, guarding the gates to Marrowmere."
    ],
    osteon_guard_1: [
        "Halt. You are entering a zone of high density.",
        "Maintain your structural integrity at all times.",
        "We Sentries ensure the concentric lamellae remain unbroken."
    ],
    osteon_guard_2: [
        "The Plateau is the shield of Osteopolis.",
        "Weight and strength—that is the cortical way.",
        "Watch your step; the bedrock here does not bend easily."
    ],
    lamella_gardener: [
        "I'm tending to the concentric rings today.",
        "Each layer of matrix must be perfectly mineralized.",
        "A garden of bone requires patience and calcium."
    ],
    lacuna_resident_1: [
        "It's quiet here in my little room in the rock.",
        "I send my signals out through the tubes, but sometimes I feel isolated.",
        "Still, there's no better place for a mature cell to retire."
    ],
    lacuna_resident_2: [
        "Did you bring any nutrients from the Haversian Canal?",
        "It's a long way for the diffusion to reach us out here in the outer rings.",
        "We depend on the canaliculi for everything!"
    ],
    bone_smith_dense: [
        "I'm forging the heaviest armor in the kingdom.",
        "Cortical bone can handle thousands of pounds of pressure.",
        "If you want to survive the peaks, you need a dense shell."
    ],
    architect_osteon: [
        "Look at the symmetry! The Haversian system is a masterpiece of biology.",
        "Longitudinal canals for the blood, concentric rings for the strength.",
        "I'm planning a new expansion for the Plateau, if the remodeling guild approves."
    ],
    haver_chan: [
        "Wheee! I'm running through the tunnels!",
        "Don't tell the Warden I'm playing in the Volkmann canals.",
        "He says they're for 'horizontal communication', but I think they're for racing!"
    ],
    volkmann_runner: [
        "I have a message for the Mayor! Out of the way!",
        "I'm taking the Volkmann Shortcut to the main highway.",
        "Connecting the osteons is a full-time job."
    ]
};