// ADITLOA Module 2 runtime scene map
// Canonical source documents:
// 1. ADITLOA M2 LBP.docx
// 2. ADITLOA M2 SA.docx
// 3. ADITLOA M2 LNE.docx
// 4. ADITLOA M2 MTB.docx
// 5. ADITLOA M2 ILS.docx
// 6. ADITLOA_M2_CCM.docx

export const MODULE2_SCENES = [
  {
    id: 1,
    key: "immune_system_overview",
    title: "Immune System Overview",
    category: "Immunology Foundations",
    trigger: "Orientation to innate versus adaptive immunity.",
    mechanism:
      "Pathogen entry -> innate response -> antigen presentation -> adaptive activation -> immune memory",
    quizIds: [],
    music: "runtime",
    visualCue: "matrix-to-clinic transition"
  },
  {
    id: 2,
    key: "type_i_hypersensitivity",
    title: "Type I Hypersensitivity",
    category: "Immunology Foundations",
    trigger: "Immediate peanut allergy reaction.",
    mechanism:
      "Allergen -> IgE cross-linking -> mast cell degranulation -> histamine release -> allergic reaction",
    quizIds: [1],
    music: "runtime",
    visualCue: "mast-cell degranulation"
  },
  {
    id: 3,
    key: "type_ii_hypersensitivity",
    title: "Type II Hypersensitivity",
    category: "Immunology Foundations",
    trigger: "Antibody-mediated cell injury case.",
    mechanism:
      "IgG or IgM binds cell surface antigen -> complement activation -> cell destruction",
    quizIds: [4],
    music: "runtime",
    visualCue: "antibody-on-cell-surface"
  },
  {
    id: 4,
    key: "type_iii_hypersensitivity",
    title: "Type III Hypersensitivity",
    category: "Immunology Foundations",
    trigger: "Immune-complex deposition case.",
    mechanism:
      "Immune complexes -> tissue deposition -> complement activation -> inflammation",
    quizIds: [5],
    music: "runtime",
    visualCue: "immune-complex deposition"
  },
  {
    id: 5,
    key: "type_iv_hypersensitivity",
    title: "Type IV Hypersensitivity",
    category: "Immunology Foundations",
    trigger: "Delayed contact dermatitis reaction.",
    mechanism:
      "Antigen presentation -> T-cell activation -> macrophage recruitment -> delayed inflammation",
    quizIds: [3],
    music: "runtime",
    visualCue: "delayed dermatitis"
  },
  {
    id: 6,
    key: "autoimmune_mechanism",
    title: "Autoimmune Mechanism",
    category: "Immunology Foundations",
    trigger: "Bridge scene introducing loss of self-tolerance.",
    mechanism:
      "Loss of immune tolerance -> autoreactive lymphocytes -> immune attack on self tissues",
    quizIds: [],
    music: "runtime",
    visualCue: "self-vs-nonself split"
  },
  {
    id: 7,
    key: "sle",
    title: "Systemic Lupus Erythematosus",
    category: "Immunology Foundations",
    trigger: "Multi-system autoimmune patient with renal and joint findings.",
    mechanism:
      "Anti-DNA antibodies -> immune complexes -> kidney/joint deposition -> complement activation -> inflammation",
    quizIds: [5],
    music: "runtime",
    visualCue: "multi-organ deposition"
  },
  {
    id: 8,
    key: "rheumatoid_arthritis",
    title: "Rheumatoid Arthritis",
    category: "Immunology Foundations",
    trigger: "Morning stiffness and small-joint inflammation.",
    mechanism:
      "Synovial inflammation -> cytokines -> pannus formation -> cartilage destruction",
    quizIds: [],
    music: "runtime",
    visualCue: "joint pannus erosion"
  },
  {
    id: 9,
    key: "immunodeficiency_overview",
    title: "Immunodeficiency Overview",
    category: "Immunodeficiency",
    trigger: "Recurrent infection pattern recognition.",
    mechanism:
      "Immune defect -> reduced pathogen clearance -> recurrent infections",
    quizIds: [],
    music: "runtime",
    visualCue: "recurrent infection timeline"
  },
  {
    id: 10,
    key: "scid",
    title: "SCID",
    category: "Immunodeficiency",
    trigger: "Infant with severe early infections.",
    mechanism:
      "Genetic mutation -> T-cell failure -> impaired B-cell activation -> severe infections",
    quizIds: [],
    music: "runtime",
    visualCue: "collapsed adaptive immunity"
  },
  {
    id: 11,
    key: "hiv",
    title: "HIV",
    category: "Immunodeficiency",
    trigger: "Patient with recurrent infections and low CD4 count.",
    mechanism:
      "HIV infection -> CD4 depletion -> immune coordination failure",
    quizIds: [6, 7],
    music: "runtime",
    visualCue: "CD4 decline"
  },
  {
    id: 12,
    key: "aids",
    title: "AIDS",
    category: "Immunodeficiency",
    trigger: "Advanced HIV with opportunistic infection profile.",
    mechanism:
      "Severe CD4 loss -> opportunistic infections",
    quizIds: [6, 7],
    music: "runtime",
    visualCue: "opportunistic infection cascade"
  },
  {
    id: 13,
    key: "cancer_basics",
    title: "Cancer Basics",
    category: "Oncology",
    trigger: "Oncology foundation scene.",
    mechanism:
      "DNA mutation -> oncogene activation or tumor suppressor loss -> checkpoint failure -> tumor growth",
    quizIds: [8],
    music: "runtime",
    visualCue: "cell-cycle checkpoint failure"
  },
  {
    id: 14,
    key: "all",
    title: "Acute Lymphoblastic Leukemia",
    category: "Oncology",
    trigger: "Pediatric fatigue, infection, and bruising case.",
    mechanism:
      "Lymphoblast proliferation -> marrow overcrowding -> decreased RBCs/platelets/WBCs",
    quizIds: [9, 10],
    music: "runtime",
    visualCue: "marrow overcrowding"
  },
  {
    id: 15,
    key: "cll",
    title: "Chronic Lymphocytic Leukemia",
    category: "Oncology",
    trigger: "Older patient with mature lymphocyte proliferation.",
    mechanism:
      "Mature B-cell proliferation -> gradual immune dysfunction",
    quizIds: [10],
    music: "runtime",
    visualCue: "slow lymphocyte accumulation"
  },
  {
    id: 16,
    key: "hodgkin_lymphoma",
    title: "Hodgkin Lymphoma",
    category: "Oncology",
    trigger: "Biopsy with Reed-Sternberg morphology.",
    mechanism:
      "Reed-Sternberg cells -> cytokine signaling -> inflammatory background -> lymph node enlargement",
    quizIds: [11],
    music: "runtime",
    visualCue: "reed-sternberg spotlight"
  },
  {
    id: 17,
    key: "non_hodgkin_lymphoma",
    title: "Non-Hodgkin Lymphoma",
    category: "Oncology",
    trigger: "Contrast lymphoma case without Reed-Sternberg cells.",
    mechanism:
      "Malignant lymphocyte proliferation -> lymphatic tissue expansion",
    quizIds: [],
    music: "runtime",
    visualCue: "lymphoid network expansion"
  },
  {
    id: 18,
    key: "anemia_overview",
    title: "Anemia Overview",
    category: "Hematology",
    trigger: "General fatigue and pallor case.",
    mechanism:
      "Reduced hemoglobin -> reduced oxygen delivery -> fatigue",
    quizIds: [12],
    music: "runtime",
    visualCue: "low oxygen transport"
  },
  {
    id: 19,
    key: "iron_deficiency_anemia",
    title: "Iron Deficiency Anemia",
    category: "Hematology",
    trigger: "Pica and microcytic hypochromic cells.",
    mechanism:
      "Iron deficiency -> decreased heme synthesis -> microcytic hypochromic RBC",
    quizIds: [13],
    music: "runtime",
    visualCue: "small pale RBCs"
  },
  {
    id: 20,
    key: "sickle_cell_disease",
    title: "Sickle Cell Disease",
    category: "Hematology",
    trigger: "Pain crisis and hemoglobinopathy review.",
    mechanism:
      "Beta-globin mutation -> HbS polymerization -> RBC sickling -> vascular obstruction",
    quizIds: [14, 15],
    music: "runtime",
    visualCue: "HbS polymerization"
  },
  {
    id: 21,
    key: "erythroblastosis_fetalis",
    title: "Erythroblastosis Fetalis",
    category: "Hematology",
    trigger: "Maternal-fetal Rh incompatibility.",
    mechanism:
      "Maternal IgG -> fetal RBC destruction",
    quizIds: [],
    music: "runtime",
    visualCue: "maternal antibody crossing placenta"
  },
  {
    id: 22,
    key: "ebv_mononucleosis",
    title: "EBV Mononucleosis",
    category: "Hematology",
    trigger: "Fatigue, sore throat, and lymphadenopathy.",
    mechanism:
      "EBV infection -> immune activation -> lymphadenopathy",
    quizIds: [],
    music: "runtime",
    visualCue: "posterior cervical nodes"
  },
  {
    id: 23,
    key: "meningitis_emergency",
    title: "Meningitis Emergency",
    category: "Hematology",
    trigger: "Suspected bacterial meningitis in acute setting.",
    mechanism:
      "Bacterial infection -> meningeal inflammation -> immediate empiric antibiotics",
    quizIds: [],
    music: "runtime",
    visualCue: "emergency antibiotic decision"
  },
  {
    id: 24,
    key: "primary_hemostasis",
    title: "Primary Hemostasis",
    category: "Hemostasis",
    trigger: "Vessel injury simulation.",
    mechanism:
      "Platelet adhesion via vWF/GpIb -> platelet plug formation",
    quizIds: [16, 17, 18, 19],
    music: "runtime",
    visualCue: "platelet plug"
  },
  {
    id: 25,
    key: "secondary_hemostasis",
    title: "Secondary Hemostasis",
    category: "Hemostasis",
    trigger: "Coagulation cascade simulation.",
    mechanism:
      "Coagulation cascade -> thrombin -> fibrin mesh",
    quizIds: [20],
    music: "runtime",
    visualCue: "fibrin mesh"
  },
  {
    id: 26,
    key: "pt_vs_aptt",
    title: "PT vs aPTT",
    category: "Hemostasis",
    trigger: "Coagulation lab interpretation station.",
    mechanism:
      "Extrinsic pathway vs intrinsic pathway testing logic",
    quizIds: [21, 22, 23],
    music: "runtime",
    visualCue: "split pathway lab panel"
  },
  {
    id: 27,
    key: "hemophilia",
    title: "Hemophilia",
    category: "Hemostasis",
    trigger: "Bleeding disorder case with intrinsic pathway defect.",
    mechanism:
      "Factor VIII deficiency -> intrinsic pathway failure",
    quizIds: [24, 25],
    music: "runtime",
    visualCue: "intrinsic pathway interruption"
  },
  {
    id: 28,
    key: "thrombocytopenia",
    title: "Thrombocytopenia",
    category: "Hemostasis",
    trigger: "Low platelet count and mucocutaneous bleeding.",
    mechanism:
      "Low platelets -> impaired clot formation",
    quizIds: [26],
    music: "runtime",
    visualCue: "platelet depletion"
  },
  {
    id: 29,
    key: "virchows_triad",
    title: "Virchow's Triad",
    category: "Thrombosis & Cardiovascular",
    trigger: "Thrombosis risk setup station.",
    mechanism:
      "Stasis + endothelial injury + hypercoagulability -> thrombosis",
    quizIds: [27],
    music: "runtime",
    visualCue: "three-part thrombosis wheel"
  },
  {
    id: 30,
    key: "deep_vein_thrombosis",
    title: "Deep Vein Thrombosis",
    category: "Thrombosis & Cardiovascular",
    trigger: "Leg swelling after immobility.",
    mechanism:
      "Venous stasis -> clot formation",
    quizIds: [28],
    music: "runtime",
    visualCue: "leg-vein clot"
  },
  {
    id: 31,
    key: "pulmonary_embolism",
    title: "Pulmonary Embolism",
    category: "Thrombosis & Cardiovascular",
    trigger: "Sudden dyspnea after DVT.",
    mechanism:
      "DVT clot -> pulmonary artery obstruction",
    quizIds: [29, 30],
    music: "runtime",
    visualCue: "embolus to lungs"
  },
  {
    id: 32,
    key: "heart_failure",
    title: "Heart Failure",
    category: "Thrombosis & Cardiovascular",
    trigger: "Comparison of left versus right-sided failure.",
    mechanism:
      "Left failure -> pulmonary congestion; Right failure -> systemic congestion",
    quizIds: [],
    music: "runtime",
    visualCue: "left-right heart split"
  },
  {
    id: 33,
    key: "ventricular_fibrillation",
    title: "Ventricular Fibrillation",
    category: "Thrombosis & Cardiovascular",
    trigger: "Cardiac arrest rhythm emergency.",
    mechanism:
      "Electrical chaos -> no effective cardiac output",
    quizIds: [],
    music: "runtime",
    visualCue: "chaotic rhythm collapse"
  }
];

export const MODULE2_SCENE_COUNT = MODULE2_SCENES.length;

export const MODULE2_SCENE_MAP = Object.fromEntries(
  MODULE2_SCENES.map((scene) => [scene.key, scene])
);
