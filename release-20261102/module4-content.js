// ADITLOA Module 4 — MUSCULOSKELETAL COLLAPSE
// Version 3.0.0 — Osteopolis Lexicon Integration

export const MOD4_QUESTS = {
  osteoporosis: {
    id: 'osteoporosis',
    title: 'The Porous Foundation',
    npcId: 'clastus',
    steps: [
      {
        type: 'dialogue',
        speaker: "Clastus the Reclaimer",
        lines: [
            "Alfie! You've reached the Cavities of Osteopora, and the foundation is full of holes.",
            "I am the Second Elder, the Reclaimer of the Matrix. Usually, Blastus and I maintain the matrix in perfect balance.",
            "But lately, the balance has shifted. I am reclaiming bone—releasing it—faster than he can build it back!",
            "This metabolic disaster is Osteoporosis. Remember: Clasts Crush, Blasts Build.",
            "Renewal begins by releasing what no longer serves the kingdom, but too much release leads to ruin."
        ]
      }
    ],
    validation: {
      type: 'sorting',
      title: "Risk Factor Analysis",
      category: "Osteoporosis Risk Factors",
      description: "Identify the factors that have accelerated the Elder's reclamation speed.",
      items: [
        { text: "Long-term Glucocorticoids (Steroids)", correct: true },
        { text: "Post-menopausal Estrogen Deficiency", correct: true },
        { text: "Low Dietary Calcium/Vitamin D", correct: true },
        { text: "Regular Weight-Bearing Exercise", correct: false },
        { text: "Sedentary Lifestyle (Lack of Stress)", correct: true },
        { text: "High Impact Mechanical Loading", correct: false }
      ],
      correctIndices: [0, 1, 2, 4],
      successDialogue: [
        "Brilliant! Estrogen usually keeps us Reclaimers in check, but without it, we go into overtime.",
        "And without the 'mechanical stress' of movement, the matrix loses its density. It's Wolff's Law!",
        "Take this Trabecular Map Fragment. It shows the way to Granite Ridge.",
        "I've updated your Journal. Porosis makes the matrix porous!"
      ],
      vocab: [
        { term: 'Resorption', definition: 'The process of bone breakdown by osteoclasts.' },
        { term: 'RANKL', definition: 'A protein that activates osteoclasts; inhibited by OPG.' }
      ],
      notification: "Earned: Trabecular Map Fragment"
    }
  },
  osteoarthritis: {
    id: 'osteoarthritis',
    title: 'The Grinding Gears',
    npcId: 'flexicon_cartilage',
    steps: [
      {
        type: 'dialogue',
        speaker: "Chondrosacius",
        lines: [
            "Crr-ack... welcome to Chondropolis, Alfie. My joints sound like a gravel pit today.",
            "I'm the Keeper of Cartilage. I used to keep the 'smooth pavement' of the city in top shape.",
            "But the mechanical stress is wearing us down. It's bone-on-bone friction now.",
            "They call this Osteoarthritis. It's a local mechanical failure of our shock absorbers.",
            "Listen to that sound—Crepitus. Help me check the signs of our wear and tear!"
        ]
      }
    ],
    validation: {
      type: 'sorting',
      title: "OA Clinical Signs",
      category: "Osteoarthritis Characteristics",
      description: "Identify the hallmarks of mechanical wear-and-tear (OA) vs. inflammatory disease.",
      items: [
        { text: "Pain worsens with use throughout the day", correct: true },
        { text: "Morning stiffness lasting > 1 hour", correct: false },
        { text: "Crepitus (bone-on-bone grinding)", correct: true },
        { text: "Symmetrical systemic swelling", correct: false },
        { text: "Bouchard's and Heberden's Nodes", correct: true },
        { text: "Brief morning stiffness (< 30 min)", correct: true }
      ],
      correctIndices: [0, 2, 4, 5],
      successDialogue: [
        "Exactly! OA is 'Old Age' and 'Overuse'. The cartilage thins, and the bone reacts with spurs.",
        "We feel better after a bit of rest, though the 'morning rust' takes a few minutes to clear.",
        "Take this Chondrocyte Key. It unlocks the path to the Synovial Canals.",
        "Journal updated: The mechanics of articular failure."
      ],
      vocab: [
        { term: 'Crepitus', definition: 'A grating sound produced by friction between bone and cartilage.' },
        { term: 'Osteophyte', definition: 'A bony outgrowth or spur associated with joint degeneration.' }
      ],
      notification: "Earned: Chondrocyte Key"
    }
  },
  ddd: {
    id: 'ddd',
    title: 'The Compression Crisis',
    npcId: 'elder_corticus',
    steps: [
      {
        type: 'dialogue',
        speaker: "Warden Corticus",
        lines: [
            "St-stay back! The pressure on Granite Ridge is becoming dangerous.",
            "The rigid shell is holding, but the internal cushions—the discs—are failing.",
            "They are dehydrating, losing their height, and the shock absorption is GONE.",
            "When the gel herniates through the annulus, it presses right on the city's power lines.",
            "It's a lightning bolt of pain. We must diagnose the compression!"
        ]
      }
    ],
    validation: {
      type: 'sorting',
      title: "Spinal Pathophysiology",
      category: "DDD & Sciatica Mechanics",
      description: "Identify the mechanical factors leading to Radiculopathy.",
      items: [
        { text: "Dehydration of the Nucleus Pulposus", correct: true },
        { text: "Herniation of disc material into nerve space", correct: true },
        { text: "Increase in intervertebral disc height", correct: false },
        { text: "Narrowing of the Foramen (Foraminal Stenosis)", correct: true },
        { text: "Compression of the Spinal Nerve Root", correct: true },
        { text: "Increased flexibility of the Annulus", correct: false }
      ],
      correctIndices: [0, 1, 3, 4],
      successDialogue: [
        "That's the truth. The discs lose their 'cushion', the space narrows, and the nerves get 'pinched'.",
        "We call it Radiculopathy. It's all about pressure!",
        "Take this Annulus Seal. It will help you reach the Marrowmere.",
        "Journal updated: The de-hydrated spine."
      ],
      vocab: [
        { term: 'Radiculopathy', definition: 'Pain or numbness caused by compression of a nerve root.' },
        { term: 'Nucleus Pulposus', definition: 'The inner, gel-like core of the intervertebral disc.' }
      ],
      notification: "Earned: Annulus Seal"
    }
  },
  osteomyelitis: {
    id: 'osteomyelitis',
    title: 'The Sequestrum Siege',
    npcId: 'sir_wolff',
    steps: [
      {
        type: 'dialogue',
        speaker: "Sir Wolff",
        lines: [
            "Alfie, report! The Everforge has been breached by Staphylococcus aureus.",
            "The infection is building pus inside our rigid walls. The pressure is cutting off the blood supply.",
            "No blood means no oxygen, and no oxygen means death for the bone.",
            "We have Sequestrum—islands of necrotic bone detached from the city. Help me map the progression!"
        ]
      }
    ],
    validation: {
      type: 'sorting',
      title: "Osteomyelitis Progression",
      category: "Stages of Bone Infection",
      description: "Sequence the stages of clinical progression from infection to chronic bone death.",
      items: [
        { text: "Stage 1: Inflammation & Pus (Suppuration)", correct: true },
        { text: "Stage 2: Increased Pressure & Ischemia", correct: true },
        { text: "Stage 3: Necrosis & Sequestrum formation", correct: true },
        { text: "Stage 4: Involucrum (New bone sheath)", correct: true },
        { text: "Stage 5: Spontaneous Rapid Healing", correct: false },
        { text: "Stage 6: Chronic Sinus Tract Drainage", correct: true }
      ],
      correctIndices: [0, 1, 2, 3, 5],
      successDialogue: [
        "You've mastered the timeline. Sequestrum is the 'enemy inside'—shielded from our antibiotics.",
        "Surgical debridement is our only hope when the blood supply is cut off.",
        "Take this Wolff’s Crest. It grants access to the high peaks.",
        "Infection Timeline updated in your Journal!"
      ],
      vocab: [
        { term: 'Sequestrum', definition: 'Dead bone detached from its blood supply.' },
        { term: 'Involucrum', definition: 'The sheath of new bone that forms around a sequestrum.' }
      ],
      notification: "Earned: Wolff’s Crest"
    }
  },
  lyme: {
    id: 'lyme',
    title: 'The Migratory Mark',
    npcId: 'sec_synovius',
    steps: [
      {
        type: 'dialogue',
        speaker: "Secretary Synovius",
        lines: [
            "Keep your boots high, Alfie. The Borrelia spirochetes are thick in the Synovial Canals today.",
            "They heading straight for our large joints. But first, they leave a calling card.",
            "A target-shaped rash we call Erythema Migrans. It's the mark of early Lyme.",
            "It's a 'migratory' arthritis. Let's confirm the diagnosis to save the canals!"
        ]
      }
    ],
    validation: {
      type: 'sorting',
      title: "Lyme Clinical Profile",
      category: "Lyme Disease Diagnostics",
      description: "Identify the hallmarks of disseminated Lyme disease.",
      items: [
        { text: "Erythema Migrans (Expanding Bullseye)", correct: true },
        { text: "Migratory Large-Joint Arthritis (Knee)", correct: true },
        { text: "Facial Nerve (Bell's) Palsy", correct: true },
        { text: "Needle-shaped Urate Crystals", correct: false },
        { text: "Positive Two-Tier Serology (ELISA/WB)", correct: true },
        { text: "Heberden's Nodes at the fingertips", correct: false }
      ],
      correctIndices: [0, 1, 2, 4],
      successDialogue: [
        "Correct. If you see the Bullseye, act fast with Doxycycline!",
        "Lyme is the 'Great Imitator', but the migratory pattern gives it away.",
        "Take this Canal Key. It will help you navigate the floating city.",
        "Lyme Pathology recorded in your Journal."
      ],
      vocab: [
        { term: 'Pathognomonic', definition: 'A sign specifically characteristic of a particular disease.' },
        { term: 'Spirochete', definition: 'A spirally twisted bacterium.' }
      ],
      notification: "Earned: Canal Key"
    }
  },
  gout: {
    id: 'gout',
    title: 'The Crystal Storm',
    npcId: 'eurasius',
    steps: [
      {
        type: 'dialogue',
        speaker: "Irrational Eurasius",
        lines: [
            "Aargh! Don't you dare touch my big toe! It's a sacred shrine of agony!",
            "My blood is over-saturated with uric acid, and it's raining needles in my joints.",
            "It's Gout—a metabolic riot triggered by my legendary feasts.",
            "Podagra has taken my toe! The crystals are everywhere. Help me find the cure!"
        ]
      }
    ],
    validation: {
      type: 'sorting',
      title: "Gout Diagnostics",
      category: "Gouty Arthritis Hallmarks",
      description: "Identify the evidence of a Gout attack.",
      items: [
        { text: "High-purine diet (red meat, shellfish)", correct: true },
        { text: "Negatively birefringent crystals", correct: true },
        { text: "Needle-shaped MSU crystals", correct: true },
        { text: "Symmetrical joint space narrowing", correct: false },
        { text: "Podagra (Big Toe involvement)", correct: true },
        { text: "Infectious bacterial culture", correct: false }
      ],
      correctIndices: [0, 1, 2, 4],
      successDialogue: [
        "A metabolic masterpiece of misery! Those needle-shaped crystals are no joke.",
        "I need Allopurinol to lower the saturation and Colchicine for the riot.",
        "Take this Feast Pass. It opens the secret Purine Pantry.",
        "Gout Mechanisms added to the Disease Files!"
      ],
      vocab: [
        { term: 'Hyperuricemia', definition: 'High levels of uric acid in the blood.' },
        { term: 'Podagra', definition: 'Acute gouty arthritis of the big toe joint.' }
      ],
      notification: "Earned: Feast Pass"
    }
  }
};

export const MOD4_INTERACTIVES = [
  { id: 'haversian_way', mapId: 'osteophyta', name: "Haversian Way", x: 300, y: 300, description: "The imperial highway of Osteopolis, built with concentric layers of perfectly organized stone.", clue: "Compact Bone" },
  { id: 'volkmann_crossing', mapId: 'petrifica_plateau', name: "Volkmann Crossing", x: 700, y: 200, description: "A bridge connecting the major osteons, allowing nutrients to flow horizontally through the plateau.", clue: "Canaliculi Network" },
  { id: 'lacuna_manor_ext', mapId: 'petrifica_plateau', name: "Lady Lacuna's Manor", x: 512, y: 120, description: "A grand residence carved directly into a massive osteon. The architecture is perfectly circular.", clue: "Osteon Structure" },
  { id: 'canaliculi_gardens', mapId: 'petrifica_plateau', name: "Canaliculi Gardens", x: 300, y: 400, description: "Intricate paths weave through the gardens like tiny tubes connecting the city's homes.", clue: "Cellular Communication" },
  { id: 'trabecular_pit', mapId: 'osteopora', name: "The Porous Pit", x: 300, y: 400, description: "A deep excavation showing the honeycomb structure of cancellous bone. It looks dangerously thin here.", clue: "Cancellous Bone" },
  { id: 'synovial_sluice', mapId: 'synovia', name: "Synovial Sluice", x: 512, y: 150, description: "Golden fluid flows through these gates, ensuring every joint in the kingdom moves without friction.", clue: "Lubrication" },
  { id: 'foundry_furnace', mapId: 'osteogenica', name: "Foundry Furnace", x: 200, y: 300, description: "Massive furnaces where Oracle Osteoclastica acidifies the rock to release the trapped calcium.", clue: "Bone Resorption" },
  { id: 'academy_blueprint', mapId: 'osteogenica', name: "Academy Blueprints", x: 800, y: 400, description: "Plans for new city districts, overseen by Oracle Osteoblastica. Every brick is made of fresh Osteoid.", clue: "Bone Formation" },
  { id: 'observatory_lens', mapId: 'osteocyte_observatory', name: "The Lens of Lacuna", x: 400, y: 250, description: "A telescope that doesn't look at the stars, but inward at the structural strain of the kingdom.", clue: "Mechanotransduction" },
  { id: 'marrow_lake', mapId: 'marrowmere', name: "Lake Hematopoiesis", x: 600, y: 350, description: "A deep red lake where new city citizens (cells) are born every second.", clue: "Hematopoiesis" },
  { id: 'crystal_altar', mapId: 'monastery_crystals', name: "The Gouty Altar", x: 512, y: 200, description: "An altar made of jagged, negatively birefringent crystals. They sting to the touch.", clue: "Urate Crystals" },
  { id: 'feast_table', mapId: 'feast_hall_purines', name: "Table of Hyperuricemia", x: 300, y: 300, description: "Loaded with venison and organ meats. The smell of purines is overwhelming.", clue: "Dietary Triggers" },
  { id: 'wolff_crest', mapId: 'wolffs_rise', name: "Marshal’s Crest", x: 700, y: 400, description: "An emblem showing a bone bending but not breaking under a heavy load.", clue: "Mechanical Adaptation" },
  { id: 'synovial_records', mapId: 'synovia', name: "Synovial Records", x: 400, y: 200, description: "Logs of fluid viscosity and leukocyte counts. Some entries mention 'cloudy fluid' and 'spirochetes'.", clue: "Joint Aspiration" },
  { id: 'city_records', mapId: 'osteophyta', name: "Homeostasis Records", x: 300, y: 200, description: "Logs of calcium balance for the entire kingdom.", clue: "Metabolic Monitoring" },
  { id: 'diagnostic_microscope', mapId: 'marrowmere', name: "Diagnostic Microscope", x: 512, y: 250, description: "Shows Gram-positive clusters. The city has been breached!", clue: "Staph aureus" }
];

export const MOD4_CHAPTERS = [
  {
    id: 'foundations_overview',
    title: 'Foundations: Musculoskeletal Overview',
    description: 'Master the synergy of bones, joints, and muscle.',
    learningObjectives: [
      'Bones: Rigid framework and mineral storage',
      'Joints: Flexibility and articulation',
      'Cartilage: Shock absorption and friction reduction',
      'Ligaments: Bone-to-bone stability',
      'Tendons: Force transmission from muscle to bone',
      'Skeletal Muscle: Contractility and movement'
    ],
    topics: ['Body Structure', 'Posture', 'Movement', 'Force Transmission', 'Organ Protection', 'Mineral Storage', 'Blood Production']
  },
  {
    id: 'normal_bone_phys',
    title: 'Foundations: Normal Bone Physiology',
    description: 'Bone as a living, dynamic connective tissue.',
    topics: ['Collagen Matrix', 'Mineralization', 'Architecture', 'Remodeling', 'Blood Supply'],
    details: 'Bone is constantly being reshaped by the balance of formation and resorption.'
  }
];

export const MOD4_DISEASE_CHAPTERS = [
  {
    id: 'osteoporosis',
    name: 'Osteoporosis',
    teaching: [
      'Etiology: Estrogen loss or steroids.',
      'Mechanism: Resorption > Formation.',
      'Pathology: Trabecular and cortical thinning.',
      'Clinical: Fragility fractures, Kyphosis.',
      'Diagnosis: DEXA Scan (T-score < -2.5).'
    ]
  },
  {
    id: 'osteoarthritis',
    name: 'Osteoarthritis',
    teaching: [
      'Etiology: Mechanical stress and chondrocyte injury.',
      'Mechanism: Cartilage loss and reactive bone growth.',
      'Pathology: Joint space narrowing, Osteophytes.',
      'Clinical: Activity pain, Morning stiffness < 30 min.',
      'Diagnosis: weight-bearing X-rays.'
    ]
  },
  {
    id: 'ddd',
    name: 'Degenerative Disc Disease',
    teaching: [
      'Etiology: Aging and mechanical overload.',
      'Mechanism: Disc dehydration and annulus weakening.',
      'Pathology: Height loss, bulge/herniation.',
      'Clinical: Radicular pain, numbness.',
      'Diagnosis: MRI.'
    ]
  },
  {
    id: 'osteomyelitis',
    name: 'Osteomyelitis',
    teaching: [
      'Etiology: S. aureus (hematogenous spread).',
      'Mechanism: Pus buildup causing ischemia.',
      'Pathology: Sequestrum and Involucrum.',
      'Clinical: Fever, localized bone pain.',
      'Diagnosis: MRI or Bone Scan, Biopsy.'
    ]
  },
  {
    id: 'lyme',
    name: 'Lyme Disease',
    teaching: [
      'Etiology: Borrelia burgdorferi via Ixodes ticks.',
      'Mechanism: Disseminated spirochetes trigger synovitis.',
      'Pathology: Inflammatory arthritis (Knee).',
      'Clinical: Bullseye rash (EM), Migratory arthritis.',
      'Diagnosis: Two-tier serology.'
    ]
  },
  {
    id: 'gout',
    name: 'Gout',
    teaching: [
      'Etiology: Hyperuricemia.',
      'Mechanism: MSU crystal precipitation.',
      'Pathology: Needle-shaped crystals.',
      'Clinical: Podagra, Tophi.',
      'Diagnosis: Arthrocentesis.'
    ]
  }
];

export const MOD4_COMPARISONS = [
  { id: 'op_vs_oa', title: 'Osteoporosis vs Osteoarthritis', content: 'OP is bone thinning; OA is cartilage loss.' }
];

export const MOD4_CLINICAL_CASES = [];
export const MODULE4_RIG_METADATA = MOD4_DISEASE_CHAPTERS.map(d => ({ id: d.id, label: d.name }));
export const MODULE4_QUIZ_DATA = [];
export const MODULE4_CLINICAL_SUMMARIES = {};
export const MODULE4_PATHOPHYSIOLOGY_DATA = [];
export const MODULE4_NPC_DATA = [];
export const MODULE4_WORLD_LOCATIONS = [];
export const MOD4_GAME_MODES = [];
export const MOD4_SPINE_DATA = [];
export const MOD4_INFECTION_DATA = [];
export const MOD4_DATABASE = [];
