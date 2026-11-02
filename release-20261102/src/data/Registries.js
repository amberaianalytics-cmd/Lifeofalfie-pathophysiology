/**
 * Dr. Modali Learning Labs - Central Registries
 * Decoupling data from logic.
 */

import { MOD4_QUESTS, MOD4_INTERACTIVES } from '../../module4-content.js';

export const NPC_REGISTRY = {
  mayor: {
    id: 'mayor',
    name: "Mayor Peri O'Steum",
    sprite: 'MAYOR',
    location: 'osteophyta',
    x: 512,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "High Protector of the Matrix",
      personality: "Authoritative, structural, and deeply concerned with city-wide homeostasis.",
      educationalPurpose: "Teaches the Periosteum (the connective tissue covering bones) as the 'Outer Protector'.",
      mnemonic: "Peri O'Steum protects the bone's outer room.",
      clinicalPearl: "The periosteum contains the blood vessels and nerves that nourish the bone.",
      memoryHook: "The Mayor always wears an outer cloak of 'connective tissue' (the periosteum)."
    }
  },
  sir_wolff: {
    id: 'sir_wolff',
    name: "Sir Wolff",
    sprite: 'NPC_GUARD',
    location: 'wolffs_rise',
    x: 512,
    y: 200,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'patrol',
    metadata: {
      profession: "Grand Marshal of the Order",
      personality: "Stoic, strong, and obsessed with mechanical loading.",
      educationalPurpose: "Teaches Wolff's Law of bone remodeling.",
      mnemonic: "Wolff's Law: Use it or lose it.",
      clinicalPearl: "Bone adapts to the loads under which it is placed.",
      memoryHook: "He is always seen training with heavy stone weights."
    }
  },
  sec_synovius: {
    id: 'sec_synovius',
    name: "Secretary Synovius",
    sprite: 'NPC_MEDICAL_WORKER',
    location: 'synovia',
    x: 300,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Chief Administrator of Movement",
      personality: "Fluid, efficient, and well-lubricated.",
      educationalPurpose: "Teaches the role of synovial fluid in joint lubrication.",
      mnemonic: "Synovial fluid keeps the motion good.",
      clinicalPearl: "Synovial fluid reduces friction and provides nutrients to articular cartilage.",
      memoryHook: "He is constantly oiling the city's machinery."
    }
  },
  cytus: {
    id: 'cytus',
    name: "Cytus the Watcher",
    sprite: 'NPC_ELDER',
    location: 'osteocyte_observatory',
    x: 512,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Third Elder / Leader of Osteocytes",
      personality: "Ancient, watchful, and highly connected.",
      educationalPurpose: "Teaches the role of mature bone cells in sensing mechanical strain.",
      mnemonic: "Cytus the Watcher monitors every strain in the kingdom.",
      clinicalPearl: "Osteocytes are mature bone cells that coordinate remodeling.",
      memoryHook: "He detects stress, fractures, and imbalance throughout Osteopolis."
    }
  },
  elder_corticus: {
    id: 'elder_corticus',
    name: "Warden Corticus",
    sprite: 'NPC_GUARD',
    location: 'granite_ridge',
    x: 512,
    y: 400,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Shell Guardian of the Ridge",
      personality: "Dense, rigid, and defensive.",
      educationalPurpose: "Teaches the structural role of cortical (compact) bone.",
      mnemonic: "Cortical bone is the shield for the marrow's field.",
      clinicalPearl: "Cortical bone provides the majority of skeletal weight and strength.",
      memoryHook: "He wears heavy, impenetrable armor to guard Granite Ridge."
    }
  },
  elder_trabeculus: {
    id: 'elder_trabeculus',
    name: "Scout Trabeculus",
    sprite: 'NPC_ELDER',
    location: 'last_trabecula',
    x: 512,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Lattice Scout",
      personality: "Lightweight, metabolic, and optimistic.",
      educationalPurpose: "Teaches the high surface area and metabolic activity of trabecular bone.",
      mnemonic: "Trabecular bone: porous but strong in its zone.",
      clinicalPearl: "Trabecular bone is highly metabolic and prone to early osteoporosis.",
      memoryHook: "He monitors the fragile lattice of the South."
    }
  },
  blastus: {
    id: 'blastus',
    name: "Blastus the Builder",
    sprite: 'NPC_VILLAGER_F',
    location: 'everforge',
    x: 512,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "First Elder / Master Architect",
      personality: "Creative, constructive, and tireless.",
      educationalPurpose: "Teaches bone formation.",
      mnemonic: "Blastus Builds the Everforge.",
      clinicalPearl: "Osteoblasts secrete osteoid and facilitate mineralization.",
      memoryHook: "He is the Leader of the Osteoblasts, constantly renewing the city walls."
    }
  },
  clastus: {
    id: 'clastus',
    name: "Clastus the Reclaimer",
    sprite: 'NPC_VILLAGER_M',
    location: 'everforge',
    x: 300,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Second Elder / The Reclaimer",
      personality: "Essential, focused, and purposeful.",
      educationalPurpose: "Teaches bone resorption.",
      mnemonic: "Clastus Reclaims to build stronger again.",
      clinicalPearl: "Osteoclasts break down bone to release calcium and allow remodeling.",
      memoryHook: "He is the Leader of the Osteoclasts, releasing what no longer serves the kingdom."
    }
  },
  oracle_cyte: {
    id: 'oracle_cyte',
    name: "Oracle Osteocitica",
    sprite: 'NPC_VILLAGER_F',
    location: 'balance_chamber',
    x: 512,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "The Balancer",
      personality: "Calm, diplomatic, and central.",
      educationalPurpose: "Teaches the regulation of bone homeostasis.",
      mnemonic: "Cytica keeps the balance in the palace.",
      clinicalPearl: "Bone homeostasis is the balance between formation and resorption.",
      memoryHook: "She stands between Blastus and Clastus, holding a golden scale."
    }
  },
  flexicon_cartilage: {
    id: 'flexicon_cartilage',
    name: "Chondrosacius",
    sprite: 'NPC_CHILD',
    location: 'chondropolis',
    x: 200,
    y: 200,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'wander',
    metadata: {
      profession: "Keeper of Cartilage",
      personality: "Soft, bouncy, and resilient.",
      educationalPurpose: "Teaches the structural role of cartilage in joints.",
      mnemonic: "Chondro means cartilage, nice and soft.",
      clinicalPearl: "Cartilage provides a smooth surface for joint articulation.",
      memoryHook: "He wears a soft, padded suit."
    }
  },
  flexicon_builder: {
    id: 'flexicon_builder',
    name: "Chondroblastus",
    sprite: 'NPC_CHILD',
    location: 'chondropolis',
    x: 400,
    y: 400,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'wander',
    metadata: {
      profession: "Builder of Cartilage",
      personality: "Busy, focused, and small.",
      educationalPurpose: "Teaches the role of chondroblasts in cartilage formation.",
      mnemonic: "Chondroblasts build the cushion for the pushin'.",
      clinicalPearl: "Chondroblasts are the precursors to chondrocytes.",
      memoryHook: "He is always carrying 'hyaluronan' bricks."
    }
  },
  eurasius: {
    id: 'eurasius',
    name: "Irrational Eurasius",
    sprite: 'NPC_TRAVELER',
    location: 'feast_hall_purines',
    x: 512,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "The High Purine Lord",
      personality: "Gluttonous, irrational, and red-faced.",
      educationalPurpose: "Teaches the metabolic cause of gout (hyperuricemia).",
      mnemonic: "Purines in the feast, Eurasius is the beast.",
      clinicalPearl: "Dietary purines are metabolized into uric acid.",
      memoryHook: "He is surrounded by red meat and seafood."
    }
  },
  arthur: {
    id: 'arthur',
    name: "Arthur the Therapist",
    sprite: 'NPC_MEDICAL_WORKER',
    location: 'cartilage_co',
    x: 512,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Physical Therapist",
      personality: "Encouraging, active, and focused on mobility.",
      educationalPurpose: "Teaches the importance of movement and PT in joint health.",
      mnemonic: "Arthur helps the joints work harder.",
      clinicalPearl: "Physical therapy is essential for managing chronic MSK conditions.",
      memoryHook: "He is helping an old NPC walk on a treadmill."
    }
  },
  lady_lacuna: {
    id: 'lady_lacuna',
    name: "Lady Lacuna",
    sprite: 'LADY_LACUNA',
    location: 'petrifica_plateau',
    x: 512,
    y: 200,
    width: 80,
    height: 140,
    interactionRadius: 80,
    behavior: 'fixed',
    metadata: {
      profession: "Matriarch of the Plateau",
      personality: "Elegant, ancient, and deeply rooted.",
      educationalPurpose: "Teaches the concept of Lacunae—the spaces where bone cells live.",
      mnemonic: "Lacunae are the rooms where osteocytes bloom.",
      clinicalPearl: "Lacunae are the small spaces in the bone matrix that house osteocytes.",
      memoryHook: "She lives in the grandest 'room' in the city."
    }
  },
  osteon_guard_1: {
    id: 'osteon_guard_1',
    name: "Osteon Sentry",
    sprite: 'NPC_GUARD',
    location: 'petrifica_plateau',
    x: 150,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'patrol',
    metadata: { profession: "Guardian", mnemonic: "Circular defense.", clinicalPearl: "Osteons are the structural units of compact bone." }
  },
  osteon_guard_2: {
    id: 'osteon_guard_2',
    name: "Plateau Warden",
    sprite: 'NPC_GUARD',
    location: 'petrifica_plateau',
    x: 850,
    y: 300,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'patrol',
    metadata: { profession: "Guardian", mnemonic: "Compact and strong.", clinicalPearl: "Cortical bone is much denser than trabecular bone." }
  },
  lamella_gardener: {
    id: 'lamella_gardener',
    name: "Lamella Gardener",
    sprite: 'NPC_GARDENER',
    location: 'petrifica_plateau',
    x: 300,
    y: 450,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'wander',
    metadata: { profession: "Gardener", mnemonic: "Layers of growth.", clinicalPearl: "Lamellae are the concentric rings of bone matrix." }
  },
  lacuna_resident_1: {
    id: 'lacuna_resident_1',
    name: "Citizen Osteo",
    sprite: 'NPC_VILLAGER_M',
    location: 'petrifica_plateau',
    x: 200,
    y: 150,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'wander',
    metadata: { profession: "Resident", mnemonic: "Home in the bone.", clinicalPearl: "Each lacuna contains one osteocyte." }
  },
  lacuna_resident_2: {
    id: 'lacuna_resident_2',
    name: "Citizen Cyte",
    sprite: 'NPC_VILLAGER_F',
    location: 'petrifica_plateau',
    x: 750,
    y: 450,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'wander',
    metadata: { profession: "Resident", mnemonic: "Rooted in place.", clinicalPearl: "Osteocytes maintain the bone matrix." }
  },
  bone_smith_dense: {
    id: 'bone_smith_dense',
    name: "Blacksmith Corticus",
    sprite: 'NPC_TRAVELER',
    location: 'petrifica_plateau',
    x: 400,
    y: 350,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: { profession: "Smith", mnemonic: "Forge the shell.", clinicalPearl: "Cortical bone handles the highest stress." }
  },
  architect_osteon: {
    id: 'architect_osteon',
    name: "Architect Havers",
    sprite: 'NPC_MEDICAL_WORKER',
    location: 'petrifica_plateau',
    x: 650,
    y: 100,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: { profession: "Architect", mnemonic: "Concentric canals.", clinicalPearl: "Haversian canals run longitudinally through the center of osteons." }
  },
  haver_chan: {
    id: 'haver_chan',
    name: "Haver-Chan",
    sprite: 'NPC_CHILD',
    location: 'petrifica_plateau',
    x: 550,
    y: 400,
    width: 48,
    height: 90,
    interactionRadius: 60,
    behavior: 'wander',
    metadata: { profession: "Student", mnemonic: "Haver-fun in the canals!", clinicalPearl: "Haversian systems are also called osteons." }
  },
  volkmann_runner: {
    id: 'volkmann_runner',
    name: "Runner Volkmann",
    sprite: 'NPC_COURIER',
    location: 'granite_ridge',
    x: 100,
    y: 400,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'patrol',
    metadata: { profession: "Messenger", mnemonic: "Cross-link connection.", clinicalPearl: "Volkmann's canals connect Haversian canals to each other and the periosteum." }
  },
  chancellor_parathor: {
    id: 'chancellor_parathor',
    name: "Chancellor Parathor",
    sprite: 'NPC_DOCTOR',
    location: 'osteophyta',
    x: 400,
    y: 200,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Supreme Chancellor of Mineral Affairs",
      personality: "Stern, efficient, represents PTH.",
      educationalPurpose: "Teaches the role of Parathyroid Hormone (PTH) in raising blood calcium.",
      mnemonic: "Parathor pulls calcium to the blood floor.",
      clinicalPearl: "PTH stimulates osteoclasts to increase bone resorption and blood calcium.",
      memoryHook: "Authorizes emergency calcium withdrawals from the bone matrix."
    }
  },
  lady_calciferol: {
    id: 'lady_calciferol',
    name: "Lady Calciferol",
    sprite: 'NPC_VILLAGER_F',
    location: 'osteophyta',
    x: 600,
    y: 200,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Royal Envoy of the Sun",
      personality: "Radiant, generous, represents Vitamin D.",
      educationalPurpose: "Teaches the importance of Vitamin D in calcium absorption.",
      mnemonic: "Calciferol brings calcium through the door.",
      clinicalPearl: "Vitamin D is essential for intestinal absorption of calcium.",
      memoryHook: "Brings calcium into the kingdom from the 'Great Sun Gates'."
    }
  },
  ambassador_calcitonia: {
    id: 'ambassador_calcitonia',
    name: "Ambassador Calcitonia",
    sprite: 'NPC_VILLAGER_F',
    location: 'everforge',
    x: 700,
    y: 350,
    width: 64,
    height: 120,
    interactionRadius: 60,
    behavior: 'fixed',
    metadata: {
      profession: "Diplomat of Mineral Preservation",
      personality: "Preservative, calm, represents Calcitonin.",
      educationalPurpose: "Teaches the role of Calcitonin in lowering blood calcium.",
      mnemonic: "Calcitonin puts the 'tone' in the bone.",
      clinicalPearl: "Calcitonin inhibits osteoclasts and promotes bone mineralization.",
      memoryHook: "Encourages calcium storage when reserves are plentiful."
    }
  }
};

export const MAP_REGISTRY = {
  osteophyta: {
    id: 'osteophyta',
    name: "Osteophyta: Capital City",
    width: 1024,
    height: 576,
    background: 'TOWN_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['mayor', 'chancellor_parathor', 'lady_calciferol'],
    landmarks: ["The Renewal Nexus", "Grand Arch of Homeostasis"],
    vfx: { smoke: true, dust: true },
    pathologicalDescription: "The seat of the Superfluous Lords. Watch out for the 'Spurs' (Osteophytes) on the sidewalk.",
    warps: [
      { id: 'to_north', x: 480, y: 0, width: 64, height: 40, dest: 'everforge', spawn: { x: 512, y: 500 } },
      { id: 'to_south', x: 480, y: 536, width: 64, height: 40, dest: 'osteopora', spawn: { x: 512, y: 100 } },
      { id: 'to_east', x: 984, y: 268, width: 40, height: 64, dest: 'chondropolis', spawn: { x: 100, y: 300 } },
      { id: 'to_west', x: 0, y: 268, width: 40, height: 64, dest: 'granite_ridge', spawn: { x: 924, y: 300 } }
    ]
  },
  everforge: {
    id: 'everforge',
    name: "The Everforge: Bone Remodeling Frontier",
    width: 1024,
    height: 576,
    background: 'PROGENITOR_PEAKS_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['blastus', 'clastus', 'ambassador_calcitonia'],
    landmarks: ["The Remodeling Frontier", "Renewal Nexus", "Haversian Way Entrance"],
    vfx: { smoke: true },
    pathologicalDescription: "The Everforge, where bone is constantly rebuilt. Renewal begins by releasing what no longer serves the kingdom.",
    warps: [
      { id: 'exit_south', x: 480, y: 536, width: 64, height: 40, dest: 'osteophyta', spawn: { x: 512, y: 100 } },
      { id: 'to_wolff', x: 480, y: 0, width: 64, height: 40, dest: 'wolffs_rise', spawn: { x: 512, y: 500 } }
    ]
  },
  wolffs_rise: {
    id: 'wolffs_rise',
    name: "Wolff’s Rise: Mountain Range",
    width: 1024,
    height: 576,
    background: 'PROGENITOR_PEAKS_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['sir_wolff'],
    landmarks: ["Summit of Stress", "Wolff’s Watch"],
    vfx: { dust: true },
    pathologicalDescription: "The air is heavy here. Only those who carry weight can climb these peaks.",
    warps: [
      { id: 'exit_south', x: 480, y: 536, width: 64, height: 40, dest: 'everforge', spawn: { x: 512, y: 100 } }
    ]
  },
  osteopora: {
    id: 'osteopora',
    name: "The Cavities of Osteopora",
    width: 1024,
    height: 576,
    background: 'GRANDPA_COTTAGE_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['elder_trabeculus'],
    landmarks: ["The Porous Pit", "Trabecular Labyrinth"],
    vfx: { dust: true },
    pathologicalDescription: "A fragile region where the ground is full of holes. Walk softly.",
    warps: [
      { id: 'exit_north', x: 480, y: 0, width: 64, height: 40, dest: 'osteophyta', spawn: { x: 512, y: 500 } },
      { id: 'to_last_trabecula', x: 480, y: 536, width: 64, height: 40, dest: 'last_trabecula', spawn: { x: 512, y: 100 } }
    ]
  },
  last_trabecula: {
    id: 'last_trabecula',
    name: "The Last Trabecula: Sacred Valley",
    width: 1024,
    height: 576,
    background: 'GRANDPA_COTTAGE_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['elder_trabeculus'],
    landmarks: ["The Sacred Lattice", "Cancellous Shrine"],
    vfx: { dust: true },
    pathologicalDescription: "The last remaining stronghold of trabecular bone in the South.",
    warps: [
      { id: 'exit_north', x: 480, y: 0, width: 64, height: 40, dest: 'osteopora', spawn: { x: 512, y: 500 } }
    ]
  },
  chondropolis: {
    id: 'chondropolis',
    name: "Chondropolis: Merchant City",
    width: 1024,
    height: 576,
    background: 'SYNOVIAL_GARDENS_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['flexicon_cartilage', 'flexicon_builder'],
    landmarks: ["The Hyaluronan Market", "Cartilage Corner"],
    vfx: {},
    pathologicalDescription: "A city built on springs. Everything is soft, bouncy, and resilient.",
    warps: [
      { id: 'exit_west', x: 0, y: 268, width: 40, height: 64, dest: 'osteophyta', spawn: { x: 924, y: 300 } },
      { id: 'to_synovia', x: 984, y: 268, width: 40, height: 64, dest: 'synovia', spawn: { x: 100, y: 300 } }
    ]
  },
  synovia: {
    id: 'synovia',
    name: "The Canal City of Synovia",
    width: 1024,
    height: 576,
    background: 'SYNOVIAL_GARDENS_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['sec_synovius'],
    landmarks: ["The Lubrication Canal", "Synovial Sluice"],
    vfx: { pus_drops: true }, // Reused for water/fluid effect
    pathologicalDescription: "A floating city where movement is effortless thanks to the golden canals.",
    warps: [
      { id: 'exit_west', x: 0, y: 268, width: 40, height: 64, dest: 'chondropolis', spawn: { x: 924, y: 300 } }
    ]
  },
  granite_ridge: {
    id: 'granite_ridge',
    name: "Granite Ridge: Compact Bone City",
    width: 1024,
    height: 576,
    background: 'LACUNA_EXT_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['elder_corticus', 'lady_lacuna', 'osteon_guard_1', 'osteon_guard_2', 'lamella_gardener', 'lacuna_resident_1', 'lacuna_resident_2', 'bone_smith_dense', 'architect_osteon', 'haver_chan', 'volkmann_runner'],
    landmarks: ["The Cortical Gate", "Renewal Nexus", "Lady Lacuna’s Manor (Exterior)", "The Canaliculi Gardens"],
    vfx: { dust: true },
    pathologicalDescription: "Granite Ridge is dense, heavy, and impenetrable. The bedrock of Osteopolis, where the compact bone provides the kingdom's shield.",
    warps: [
      { id: 'exit_east', x: 984, y: 268, width: 40, height: 64, dest: 'osteophyta', spawn: { x: 100, y: 300 } },
      { id: 'to_marrowmere', x: 0, y: 268, width: 40, height: 64, dest: 'marrowmere', spawn: { x: 924, y: 300 } }
    ]
  },
  marrowmere: {
    id: 'marrowmere',
    name: "Marrowmere: Lake City",
    width: 1024,
    height: 576,
    background: 'MARROW_HALL_EXT_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['cytus'],
    landmarks: ["The Red District (Hematopoiesis)", "The Yellow District (Storage)"],
    vfx: { pus_drops: true }, // Reused for blood effect
    pathologicalDescription: "The lifeblood of the city. Red and yellow lights dance on the lake's surface.",
    warps: [
      { id: 'exit_east', x: 984, y: 268, width: 40, height: 64, dest: 'granite_ridge', spawn: { x: 100, y: 300 } }
    ]
  },
  osteocyte_observatory: {
    id: 'osteocyte_observatory',
    name: "Osteocyte Observatory",
    width: 1024,
    height: 576,
    background: 'HAVERSIAN_EXT_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['cytus'],
    landmarks: ["The Lens of Lacuna", "Canaliculi Array"],
    vfx: {},
    pathologicalDescription: "An ancient tower from which every strain in the kingdom is measured.",
    warps: [
      { id: 'exit_tower', x: 512, y: 536, width: 64, height: 40, dest: 'marrowmere', spawn: { x: 512, y: 100 } }
    ]
  },
  monastery_crystals: {
    id: 'monastery_crystals',
    name: "Urcle’s Monastery of Crystals",
    width: 1024,
    height: 576,
    background: 'CRYSTAL_GROTTO_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['eurasius'],
    landmarks: ["The Gouty Altar", "Needle Falls"],
    vfx: { needle_rain: true },
    pathologicalDescription: "A dungeon of pain. Sharp crystals grow from every surface.",
    warps: [
      { id: 'exit_dungeon', x: 512, y: 536, width: 64, height: 40, dest: 'synovia', spawn: { x: 512, y: 100 } }
    ]
  },
  feast_hall_purines: {
    id: 'feast_hall_purines',
    name: "The Feast Hall of Purines",
    width: 1024,
    height: 576,
    background: 'INTERIOR_MAP',
    music: 'MUSIC_TOWN',
    npcs: ['eurasius'],
    landmarks: ["The Table of Hyperuricemia", "Purine Pantry"],
    vfx: { fire: true },
    pathologicalDescription: "A place of gluttony that leads to metabolic ruin.",
    warps: [
      { id: 'exit_hall', x: 512, y: 536, width: 64, height: 40, dest: 'chondropolis', spawn: { x: 512, y: 100 } }
    ]
  }
};

export const WARP_REGISTRY = {
  'town_to_townhall': { dest: 'townhall', spawn: { x: 512, y: 450 }, fade: 'black' },
  'townhall_to_town': { dest: 'town', spawn: { x: 1024, y: 480 }, fade: 'black' }
};

