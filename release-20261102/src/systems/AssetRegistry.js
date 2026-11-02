/**
 * HCR 240 Asset Registry
 * Maps pathology and asset keys to specific 3D model generation or retrieval logic.
 */

export const ASSET_REGISTRY = {
    // Inflammation
    "inflamed_tissue_model": {
        type: "model",
        path: "assets/models/infarcted-myocardium.glb", // Proxy
        description: "Reddened, swollen tissue with visible capillary loops"
    },
    "neutrophil_sprite_group": {
        type: "particle",
        generator: "generateNeutrophilSwarm",
        description: "Swarm of small white spherical cells migrating toward a target"
    },
    "macrophage_model": {
        type: "model",
        path: "assets/models/macrophage-cell-nexus.glb",
        description: "Large, irregular amoeboid cell"
    },
    "lymphocyte_model": {
        type: "procedural",
        generator: "generateLymphocyte",
        description: "Small round cell with a large nucleus"
    },
    
    // Wound Healing
    "ischemic_tissue_model": {
        type: "model",
        path: "assets/models/infarcted-myocardium.glb",
        description: "Pale, dusky tissue with sparse vessel networks"
    },
    "granulation_tissue_model": {
        type: "procedural",
        generator: "generateGranulationTissue",
        description: "Bright red, moist tissue with budding capillaries"
    },
    "pressure_ulcer_model": {
        type: "procedural",
        generator: "generatePressureUlcer",
        description: "Deep crater in tissue with necrotic edges"
    },
    
    // Hematology / Hemostasis
    "platelet_plug_model": {
        type: "model",
        path: "assets/models/platelet-plug-model.glb",
        description: "Aggregation of small jagged particles sealing a breach"
    },
    "clotting_factor_cascade_visual": {
        type: "ui_3d",
        generator: "generateCascadeVisualization",
        description: "A series of glowing nodes representing factor activation"
    },
    "clumping_rbc_model": {
        type: "model",
        path: "assets/models/red-blood-cell-nexus.glb",
        description: "Clusters of red blood cells stuck together in chains"
    },
    "pale_rbc_model": {
        type: "model",
        path: "assets/models/red-blood-cell-nexus.glb",
        description: "Biconcave disc with reduced central redness (hypochromic)"
    },
    "bleeding_capillary_model": {
        type: "procedural",
        generator: "generateBleedingCapillary",
        description: "Small vessel with a visible slow drip of red particles"
    },
    "hemoglobin_complex_model": {
        type: "procedural",
        generator: "generateHemoglobin",
        description: "Four-lobed protein complex with iron binding sites"
    },
    "failed_clot_model": {
        type: "procedural",
        generator: "generateFailedClot",
        description: "Loose, disorganized mesh that fails to hold back flow"
    },
    "marrow_factory_model": {
        type: "procedural",
        generator: "generateMarrowForge",
        description: "Honeycomb-like structure producing young cell spheres"
    },
    
    // Oncology / Genetics
    "cancer_cell_cluster": {
        type: "model",
        path: "assets/models/reed-sternberg-cell.glb",
        description: "Disorganized, multi-nucleated, rapidly dividing cells"
    },
    "dna_helix_damaged": {
        type: "model",
        path: "assets/models/cag-repeat-dna.glb",
        description: "Double helix with missing rungs or frayed sections"
    },
    "reed_sternberg_cell_model": {
        type: "model",
        path: "assets/models/reed-sternberg-cell.glb",
        description: "Giant multi-nucleated owl-eye cell"
    },
    "cag_repeat_expansion_model": {
        type: "model",
        path: "assets/models/cag-repeat-dna.glb",
        description: "DNA with elongated CAG repeat section"
    },
    
    // Respiratory
    "destroyed_alveoli_model": {
        type: "procedural",
        generator: "generateDestroyedAlveoli",
        description: "Enlarged air sacs with ruptured, thin walls"
    },
    "sagging_airway_model": {
        type: "procedural",
        generator: "generateSaggingAirway",
        description: "Floppy bronchial tube that collapses during 'exhalation'"
    },
    "constricted_bronchus_model": {
        type: "procedural",
        generator: "generateConstrictedBronchus",
        description: "Narrowed airway with ridged, spasming walls"
    },
    "mucus_plug_model": {
        type: "procedural",
        generator: "generateMucusPlug",
        description: "Thick yellow/green viscous mass obstructing a tube"
    },
    "tar_stained_lung_model": {
        type: "procedural",
        generator: "generateTarLung",
        description: "Dark, mottled tissue with black deposits"
    },
    "exudate_filled_alveoli": {
        type: "procedural",
        generator: "generateConsolidatedAlveoli",
        description: "Alveoli filled with thick opaque fluid and debris"
    },
    "collapsed_lung_model": {
        type: "procedural",
        generator: "generateCollapsedLung",
        description: "Small, shriveled lung mass surrounded by empty space"
    },
    
    // Cardiovascular
    "infarcted_myocardium_model": {
        type: "model",
        path: "assets/models/infarcted-myocardium.glb",
        description: "Gray, non-contractile patch of heart muscle"
    },
    "plaque_rupture_model": {
        type: "model",
        path: "assets/models/platelet-plug-model.glb",
        description: "Yellow fatty deposit with a torn cap and red clot"
    },
    "flooded_alveoli_model": {
        type: "procedural",
        generator: "generatePulmonaryEdema",
        description: "Pink frothy fluid filling alveolar spaces"
    },
    "vegetation_on_valve_model": {
        type: "procedural",
        generator: "generateValveVegetation",
        description: "Friable, cauliflower-like growths on heart valve leaflets"
    },
    "quivering_heart_model": {
        type: "procedural",
        generator: "generateQuiveringHeart",
        description: "Whole heart model with chaotic, low-amplitude vibration"
    }
};

/**
 * PATHOLOGY ASSET MAP
 * A high-level mapping to help the EncounterDirector find required assets 
 * if they aren't explicitly listed in the database entry.
 */
export const PATHOLOGY_ASSET_MAP = {
    "Inflammation": ["inflamed_tissue_model", "neutrophil_sprite_group"],
    "Wound Healing": ["granulation_tissue_model"],
    "Myocardial Infarction": ["infarcted_myocardium_model", "plaque_rupture_model"],
    "COPD": ["destroyed_alveoli_model"],
    "Asthma": ["constricted_bronchus_model", "mucus_plug_model"],
    "Anemia": ["pale_rbc_model"],
    "DVT": ["occluded_vein_model"],
    "Heart Failure": ["flooded_alveoli_model"]
};