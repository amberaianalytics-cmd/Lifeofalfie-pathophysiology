export const MODULE1_RIG_METADATA = [
  { id: 'hypoxia', label: 'Hypoxic Cell Injury' },
  { id: 'apoptosis', label: 'Intrinsic Apoptosis' },
  { id: 'cftr', label: 'Cystic Fibrosis (CFTR)' },
  { id: 'sickle', label: 'Sickle Cell (HbS)' },
  { id: 'athero', label: 'Atherosclerosis' },
  { id: 'hf', label: 'Heart Failure (LV/RV)' },
  { id: 'aa_cascade', label: 'Arachidonic Acid Cascade' },
  { id: 'hypersensitivity', label: 'Hypersensitivity (I-IV)' },
  { id: 'trisomy', label: 'Trisomy 21 (Down Syndrome)' },
  { id: 'huntington', label: 'Huntington (CAG Repeat)' },
  { id: 'tay_sachs', label: 'Tay-Sachs (GM2 Storage)' },
  { id: 'anemia', label: 'Microcytic Anemia' },
  { id: 'leukemia', label: 'Acute Leukemia (ALL)' }
];

export const MODULE1_QUIZ_DATA = [
  {
    q: "During irreversible cell injury, the massive influx of which ion into the cytoplasm activates proteases and endonucleases?",
    opts: ["Sodium", "Potassium", "Calcium", "Magnesium"],
    ans: 2,
    rationale: "Calcium influx is the 'point of no return.' It activates enzymes (phospholipases, proteases, endonucleases) that destroy the cell's structural integrity."
  },
  {
    q: "Ischemic injury to the brain uniquely results in which type of necrosis, unlike the coagulative necrosis seen in most other organs?",
    opts: ["Caseous", "Liquefactive", "Fat Necrosis", "Fibrinoid"],
    ans: 1,
    rationale: "The brain contains high lipid content and little structural protein, so enzymes digest it into a liquid mass (liquefactive) during ischemia."
  },
  {
    q: "Which Bcl-2 family members are PRO-apoptotic and form pores in the mitochondrial membrane to release Cytochrome-C?",
    opts: ["Bcl-2 and Bcl-xL", "BAX and BAK", "p53 and MDM2", "Caspase 3 and 8"],
    ans: 1,
    rationale: "BAX and BAK are the 'hole-punchers' that permeabilize the mitochondria. Bcl-2 and Bcl-xL are anti-apoptotic and keep the membrane stable."
  },
  {
    q: "In the 'Rolling' phase of leukocyte extravasation, which molecules on the endothelium interact with Sialyl-Lewis X on neutrophils?",
    opts: ["Integrins", "ICAM-1", "Selectins (E and P)", "PECAM-1"],
    ans: 2,
    rationale: "Selectins (E-selectin and P-selectin) mediate the initial low-affinity 'rolling' of leukocytes along the vessel wall."
  },
  {
    q: "Zileuton is a medication used in asthma. Which enzyme in the Arachidonic Acid cascade does it specifically inhibit?",
    opts: ["Cyclooxygenase-1", "Cyclooxygenase-2", "5-Lipoxygenase", "Phospholipase A2"],
    ans: 2,
    rationale: "Zileuton inhibits 5-LOX, preventing the formation of leukotrienes that cause bronchoconstriction."
  },
  {
    q: "Which specific prostaglandin is produced by endothelial cells to cause vasodilation and INHIBIT platelet aggregation?",
    opts: ["Thromboxane A2 (TXA2)", "Prostacyclin (PGI2)", "PGE2", "LTB4"],
    ans: 1,
    rationale: "PGI2 (Prostacyclin) opposes Thromboxane A2. It keeps vessels open and prevents unnecessary clotting."
  },
  {
    q: "A patient develops a positive PPD skin test (Tuberculosis test) 48 hours after injection. This is which type of hypersensitivity?",
    opts: ["Type I", "Type II", "Type III", "Type IV (Delayed)"],
    ans: 3,
    rationale: "Type IV hypersensitivity is T-cell mediated and delayed (taking 48-72 hours), which is exactly how the PPD test works."
  },
  {
    q: "The 'Late Phase' of an allergic reaction (Type I Hypersensitivity) is primarily mediated by the recruitment of which cell type?",
    opts: ["Neutrophils", "Eosinophils", "Plasma Cells", "Natural Killer Cells"],
    ans: 1,
    rationale: "While mast cells cause the immediate reaction, eosinophils are recruited in the late phase, causing further tissue damage."
  },
  {
    q: "In a patient with Iron Deficiency Anemia, the Total Iron Binding Capacity (TIBC) lab value will be:",
    opts: ["Decreased", "Normal", "Increased", "Zero"],
    ans: 2,
    rationale: "When iron stores are low, the liver increases production of transferrin to 'hunt' for more iron, which increases the TIBC."
  },
  {
    q: "Multiple Myeloma is a malignancy characterized by the uncontrolled proliferation of which cells?",
    opts: ["B-lymphocytes", "T-lymphocytes", "Plasma Cells", "Macrophages"],
    ans: 2,
    rationale: "Multiple Myeloma is a cancer of plasma cells, which produce massive amounts of non-functional monoclonal antibodies."
  },
  {
    q: "Sickle cell patients are at high risk for infection from encapsulated bacteria (like S. pneumoniae) because of which complication?",
    opts: ["Iron overload", "Functional asplenia (Autosplenectomy)", "Low Vitamin C", "Excessive WBC count"],
    ans: 1,
    rationale: "Repeated sickling in the spleen causes infarctions, eventually leading to a shrunken, non-functional spleen (autosplenectomy)."
  },
  {
    q: "CFTR is a chloride channel. In the SWEAT GLANDS, what is its primary physiological role?",
    opts: ["Secreting chloride out of the gland", "Reabsorbing chloride from the sweat into the cell", "Pumping sodium out", "Hydrating the mucus"],
    ans: 1,
    rationale: "Unlike the lungs where CFTR secretes Cl-, in sweat glands it REABSORBS Cl-. This is why CF patients have 'salty' sweat (Cl- is left on the skin)."
  },
  {
    q: "Which of the following is the most common cause of spontaneous abortion in the first trimester?",
    opts: ["Trauma", "Maternal infection", "Chromosomal Aneuploidy (Trisomy)", "Iron deficiency"],
    ans: 2,
    rationale: "Nearly 50% of first-trimester miscarriages are due to chromosomal abnormalities, most commonly trisomies."
  },
  {
    q: "What is the 'Fatty Streak,' the earliest macroscopically visible sign of atherosclerosis?",
    opts: ["A calcified lesion", "A collection of foam cells in the intima", "A ruptured plaque", "A fibrous cap"],
    ans: 1,
    rationale: "Fatty streaks are simply collections of lipid-laden macrophages (foam cells) in the subendothelial space."
  },
  {
    q: "During chronic Left Heart Failure, 'Heart Failure Cells' are often found in the lungs. What are these cells?",
    opts: ["Hypertrophied myocytes", "Hemosiderin-laden macrophages", "Failing pneumocytes", "Neutrophils"],
    ans: 1,
    rationale: "High pressure in the lungs causes RBCs to leak into alveoli. Macrophages eat them and become stained with iron (hemosiderin)."
  },
  {
    q: "The replacement of columnar epithelium by squamous epithelium in the cervix or bronchi is an example of:",
    opts: ["Atrophy", "Hypertrophy", "Metaplasia", "Dysplasia"],
    ans: 2,
    rationale: "Metaplasia is the reversible swap of one adult cell type for another to better survive a stressful environment."
  },
  {
    q: "Which caspase is known as the 'executioner' because it directly initiates the proteolysis that destroys the cell?",
    opts: ["Caspase 8", "Caspase 9", "Caspase 3", "Caspase 12"],
    ans: 2,
    rationale: "While 8 and 9 are 'initiator' caspases, Caspase 3 is the common executioner that does the actual work of killing the cell."
  },
  {
    q: "Vitamin C is an essential cofactor for which specific step in collagen synthesis?",
    opts: ["Translation", "Hydroxylation of Proline and Lysine", "Cross-linking by Lysyl Oxidase", "Glycosylation"],
    ans: 1,
    rationale: "Vitamin C allows the hydroxylation of collagen fibers, which is required for them to form a stable triple helix."
  },
  {
    q: "The Philadelphia Chromosome [t(9;22)] creates a fusion gene (BCR-ABL) that is the hallmark of:",
    opts: ["Acute Lymphoblastic Leukemia (ALL)", "Chronic Myeloid Leukemia (CML)", "Burkitt Lymphoma", "Hodgkin Lymphoma"],
    ans: 1,
    rationale: "CML is defined by the t(9;22) translocation, which creates a constitutively active tyrosine kinase (BCR-ABL)."
  },
  {
    q: "Free radicals cause cellular damage primarily through which chemical mechanism?",
    opts: ["Increasing ATP production", "Lipid peroxidation of membranes", "Lowering intracellular pH", "Activating Bcl-2"],
    ans: 1,
    rationale: "Free radicals (ROS) attack the double bonds in membrane lipids (peroxidation), leading to massive membrane damage."
  }
];

export const MODULE1_CLINICAL_SUMMARIES = {
  hypoxia: {
    mechanism: "↓ O2 → ↓ ATP → Na+/K+ Pump Failure → Cellular Swelling (Hydropic Change).",
    pearl: "Reversible injury involves swelling/blebbing; Irreversible involves membrane rupture.",
    visual: "Watch for the mitochondria dimming and the cell expanding with H2O."
  },
  apoptosis: {
    mechanism: "DNA Damage → BAX/BAK activation → Cytochrome-C release → Caspases 9, 3, 7.",
    pearl: "Programmed and clean; No inflammation because the cell membrane stays intact.",
    visual: "Cytochrome-c 'spills' from mitochondria to trigger the clean-up crew."
  },
  cftr: {
    mechanism: "ΔF508 Mutation → Misfolded CFTR → Impaired Cl- exit → Na+/H2O hyper-absorption.",
    pearl: "Autosomal Recessive. Results in thick, sticky mucus in lungs and pancreas.",
    visual: "The chloride gates stay shut, trapping salt and water inside the cells."
  },
  sickle: {
    mechanism: "Glutamate to Valine mutation → HbS formation → Polymerization under low O2.",
    pearl: "Painful crises are caused by microvascular occlusion by rigid, sickled RBCs.",
    visual: "Deoxygenated hemoglobin chains stick together, bending the cell into a crescent."
  },
  athero: {
    mechanism: "Endothelial Injury → LDL entry into intima → Oxidation → Macrophage uptake.",
    pearl: "Foam cells (lipid-laden macrophages) are the hallmark of early fatty streaks.",
    visual: "Macrophages 'overeat' oxidized LDL until they become bloated foam cells."
  },
  hf: {
    mechanism: "Contractility Failure. Left: Backs into lungs. Right: Backs into systemic veins.",
    pearl: "Left heart failure = Pulmonary Edema (Crackles). Right heart failure = JVD & Edema.",
    visual: "Pressure waves move backward from the failing pump into the vessels."
  },
  aa_cascade: {
    mechanism: "Phospholipase A2 liberates AA → COX (Prostaglandins) or LOX (Leukotrienes).",
    pearl: "PGE2 is the specific mediator that resets the hypothalamus to cause Fever.",
    visual: "Cell membrane fats being sliced into AA signaling molecules."
  },
  hypersensitivity: {
    mechanism: "Type I (IgE), II (IgG/IgM), III (Complexes), IV (T-cells/Delayed).",
    pearl: "Type IV is the only 'Delayed' type and the only one without antibodies.",
    visual: "Compare the instant mast cell 'pop' of Type I with the slow T-cell crawl of Type IV."
  },
  trisomy: {
    mechanism: "Meiotic Nondisjunction → Gamete with 2 copies → Zygote with 3 copies of Chr 21.",
    pearl: "Karyotype (47, XX+21) is the gold standard for definitive diagnosis.",
    visual: "Chromosomes failing to separate during the dance of meiosis."
  },
  huntington: {
    mechanism: "CAG Trinucleotide expansion → Polyglutamine toxicity → Striatal atrophy.",
    pearl: "Autosomal Dominant with 'Anticipation' (gets worse/earlier each generation).",
    visual: "The CAG sequence stuttering and growing longer on Chromosome 4."
  },
  tay_sachs: {
    mechanism: "Hexosaminidase A deficiency → Failure to degrade GM2 gangliosides.",
    pearl: "Cherry-red spot on the macula and progressive neurodegeneration in infants.",
    visual: "Lysosomes filling up with undigested fats until the neuron fails."
  },
  anemia: {
    mechanism: "Iron deficiency → ↓ Hemoglobin → Extra cell division → Small, pale RBCs.",
    pearl: "Classic labs: Microcytic (Low MCV) and Hypochromic (Low MCHC).",
    visual: "RBCs dividing one too many times to try and concentrate their limited iron."
  },
  leukemia: {
    mechanism: "Lymphoblast proliferation → Marrow overcrowding → Suppression of RBCs/PLTs.",
    pearl: "ALL is the most common pediatric cancer; presents with bone pain and infection.",
    visual: "The bone marrow 'factory' being choked by a flood of immature white cells."
  }
};

export const MODULE1_PATHOPHYSIOLOGY_DATA = [
  { 
    act: "ACT I: SUNDAY", day: "SUNDAY", time: "6:42 PM", event: "THE FESTIVAL TRAUMA", location: "festival",
    beats: [
      { 
        text: "The final note of the DJ set vibrated through the air. Alfie, sweat-drenched, stepped down from the booth.", 
        diagram: [
          { type: 'text', x: 50, y: 30, label: "FESTIVAL END" }
        ] 
      },
      { 
        text: "He reached for a heavy lighting stand, but his grip slipped. A jagged metal bracket sliced deep into his palm.", 
        diagram: [
          { type: 'node', x: 50, y: 50, label: "TRAUMA", shape: 'box' },
          { type: 'node', x: 50, y: 25, label: "METAL BRACKET", shape: 'circle' },
          { type: 'arrow', from: {x: 50, y: 33}, to: {x: 50, y: 42} }
        ] 
      },
      { 
        text: "The trauma immediately triggered Phospholipase A2 in his cell membranes, liberating Arachidonic Acid.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "MEMBRANE", shape: 'box' },
          { type: 'node', x: 50, y: 50, label: "PLA2", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "AA LIBERATED", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Subendothelial collagen was exposed, and Weibel-Palade bodies began to dump von Willebrand Factor (vWF).", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "SEC EXPOSED", shape: 'box' },
          { type: 'node', x: 50, y: 50, label: "vWF DUMP", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} }
        ] 
      },
      { 
        text: "The vWF anchored to the wound edges, providing the bridge for platelet adhesion.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "vWF BRIDGE", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "PLATELETS", shape: 'circle' },
          { type: 'arrow', from: {x: 70, y: 50}, to: {x: 35, y: 50} }
        ] 
      }
    ],
    q: "In the immediate aftermath of Alfie's trauma, what allows platelets to adhere to the damaged vessel wall?", 
    opts: ["Direct binding to fibrin", "vWF binding to exposed Subendothelial Collagen (SEC)", "Activation of Factor XII", "Release of Histamine"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Fibrin is part of the secondary, permanent clot, not initial adhesion.",
      "CORRECT: Trauma exposes SEC, which binds vWF, providing the 'bridge' for platelet adhesion (GpIb).",
      "INCORRECT: Factor XII starts the intrinsic cascade, which is secondary hemostasis.",
      "INCORRECT: Histamine causes vasodilation but does not facilitate platelet adhesion."
    ],
    emotion: "surprised", costume: "dj" 
  },
  { 
    act: "ACT I: SUNDAY", day: "SUNDAY", time: "7:30 PM", event: "BIOCHEMICAL REFLECTION", location: "home",
    beats: [
      { 
        text: "Alfie finally made it home. He stared at his hand. The released Arachidonic Acid was meeting Macrophages.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "AA", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "MACROPHAGE", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} }
        ] 
      },
      { 
        text: "Toll-Like Receptors (TLRs) were detecting Damage-Associated Molecular Patterns (DAMPs) from the crushed tissue.", 
        diagram: [
          { type: 'node', x: 50, y: 30, label: "DAMPs", shape: 'circle' },
          { type: 'node', x: 50, y: 60, label: "TLR SENSOR", shape: 'box' },
          { type: 'arrow', from: {x: 50, y: 38}, to: {x: 50, y: 52} }
        ] 
      },
      { 
        text: "The Cyclooxygenase (COX) pathway was producing Prostaglandins (PGE2), brewing a fever.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "COX", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "PGE2", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "FEVER", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "The 5-Lipoxygenase (5-LOX) pathway was producing Leukotrienes, causing swelling.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "5-LOX", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "LTs", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "SWELLING", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      }
    ],
    q: "Which enzyme is responsible for liberating Arachidonic Acid from cell membranes following tissue trauma?", 
    opts: ["Cyclooxygenase", "Phospholipase A2", "5-Lipoxygenase", "Hageman Factor"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Cyclooxygenase metabolizes AA, it doesn't release it from the membrane.",
      "CORRECT: Phospholipase A2 is the enzyme that cleaves Arachidonic Acid from membrane phospholipids.",
      "INCORRECT: 5-LOX is the enzyme for the leukotriene pathway.",
      "INCORRECT: Hageman Factor (XII) initiates the intrinsic coagulation cascade."
    ],
    emotion: "serious", costume: "casual" 
  },
  { 
    act: "ACT I: SUNDAY", day: "SUNDAY", time: "8:45 PM", event: "COAGULATION CASCADE", location: "home",
    beats: [
      { 
        text: "Alfie sat at his desk. As a student, he visualized the secondary hemostasis stabilizing the primary plug.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "PLATELET PLUG", shape: 'box' },
          { type: 'text', x: 50, y: 30, label: "PRIMARY HEMOSTASIS" }
        ]
      },
      { 
        text: "The trauma had triggered Tissue Factor, sparking the Extrinsic Pathway (PT).",
        diagram: [
          { type: 'node', x: 20, y: 40, label: "TISSUE FACTOR", shape: 'circle' },
          { type: 'node', x: 50, y: 40, label: "EXTRINSIC (PT)", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 40}, to: {x: 42, y: 40} }
        ]
      },
      { 
        text: "While the exposed subendothelial collagen activated Hageman Factor (XII), launching the Intrinsic Pathway (PTT).",
        diagram: [
          { type: 'node', x: 20, y: 70, label: "FACTOR XII", shape: 'circle' },
          { type: 'node', x: 50, y: 70, label: "INTRINSIC (PTT)", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 70}, to: {x: 42, y: 70} }
        ]
      },
      { 
        text: "Both pathways converged at Factor X, leading to the formation of Thrombin and finally Fibrin.",
        diagram: [
          { type: 'node', x: 65, y: 55, label: "FACTOR X", shape: 'box' },
          { type: 'node', x: 80, y: 55, label: "THROMBIN", shape: 'circle' },
          { type: 'node', x: 95, y: 55, label: "FIBRIN", shape: 'box' },
          { type: 'arrow', from: {x: 55, y: 45}, to: {x: 62, y: 52} },
          { type: 'arrow', from: {x: 55, y: 65}, to: {x: 62, y: 58} },
          { type: 'arrow', from: {x: 72, y: 55}, to: {x: 75, y: 55} },
          { type: 'arrow', from: {x: 85, y: 55}, to: {x: 92, y: 55} }
        ]
      }
    ],
    q: "Which pathway is initiated by the activation of Hageman Factor (XII) by subendothelial collagen?", 
    opts: ["Extrinsic Pathway", "Intrinsic Pathway", "Common Pathway", "Fibrinolytic Pathway"], 
    ans: 1, 
    rationales: [
      "INCORRECT: The Extrinsic pathway is initiated by Tissue Factor.",
      "CORRECT: Hageman Factor (XII) is the trigger for the Intrinsic (PTT) pathway.",
      "INCORRECT: The Common pathway begins at Factor X where both arms meet.",
      "INCORRECT: The Fibrinolytic pathway breaks down clots."
    ],
    emotion: "serious", costume: "casual" 
  },
  { 
    act: "ACT I: SUNDAY", day: "SUNDAY", time: "10:15 PM", event: "TACO BELL SHIFT", location: "tacobell",
    beats: [
      { 
        text: "The shift at Taco Bell was demanding. Belinda noticed his hand. 'Alfie, that looks inflamed.'",
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "INFLAMMATION", shape: 'box' }
        ]
      },
      { 
        text: "He nodded. Macrophages in the dermis were releasing pro-inflammatory cytokines like IL-1 and TNF-alpha.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "MACROPHAGE", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "IL-1 / TNF", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} }
        ]
      },
      { 
        text: "These cytokines were causing the blood vessels to vasodilate and increase vascular permeability, allowing fluid to leak into the tissue.",
        diagram: [
          { type: 'node', x: 75, y: 50, label: "LEAKY VESSEL", shape: 'box' },
          { type: 'node', x: 95, y: 50, label: "EDEMA", shape: 'circle' },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 70, y: 50} },
          { type: 'arrow', from: {x: 82, y: 50}, to: {x: 90, y: 50} }
        ]
      }
    ],
    q: "Which cells in the dermis possess Toll-Like Receptors that detect PAMPs and DAMPs to trigger cytokine release?", 
    opts: ["Platelets", "Macrophages and Mast Cells", "Endothelial Cells", "Red Blood Cells"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Platelets are primarily for clotting.",
      "CORRECT: Macrophages and Mast cells use TLRs to detect damage/pathogens and release cytokines.",
      "INCORRECT: Endothelial cells respond to cytokines but don't typically 'detect' DAMPs via TLRs for this role.",
      "INCORRECT: RBCs are for gas transport."
    ],
    emotion: "tired", costume: "fastfood" 
  },
  { 
    act: "ACT I: SUNDAY", day: "SUNDAY", time: "11:58 PM", event: "THE HYPOTHALAMIC RESET", location: "tacobell",
    beats: [
      { 
        text: "He felt a chill despite the heat of the fryers. IL-1 released by macrophages had reached his brain.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "IL-1", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "BRAIN", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} }
        ]
      },
      { 
        text: "This induced COX activation in the hypothalamus, producing PGE2.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "COX", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "PGE2", shape: 'circle' },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ]
      },
      { 
        text: "PGE2 reset his body's thermostat to a higher level. 'You're burning up,' Belinda said.",
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "THERMOSTAT RESET", shape: 'box' },
          { type: 'node', x: 50, y: 70, label: "FEVER", shape: 'box' },
          { type: 'arrow', from: {x: 50, y: 40}, to: {x: 50, y: 65} }
        ]
      }
    ],
    q: "Which specific prostaglandin mediator is responsible for resetting the hypothalamic set-point to cause fever?", 
    opts: ["PGI2", "PGE2", "TXA2", "LTB4"], 
    ans: 1, 
    rationales: [
      "INCORRECT: PGI2 (Prostacyclin) is a vasodilator and inhibitor of aggregation.",
      "CORRECT: Prostaglandin E2 (PGE2) is the primary mediator that crosses the blood-brain barrier to cause fever.",
      "INCORRECT: TXA2 (Thromboxane) promotes platelet aggregation.",
      "INCORRECT: LTB4 is a leukotriene involved in neutrophil chemotaxis."
    ],
    emotion: "tired", costume: "fastfood" 
  },
  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "6:07 AM", event: "COMPENSATION", location: "home",
    beats: [
      { 
        text: "He woke slightly pale. Minor blood loss triggered compensation.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "BLOOD LOSS", shape: 'circle' }
        ]
      },
      { 
        text: "Tachycardia and pallor reflect reduced oxygenated hemoglobin. The body compensates automatically.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "TACHYCARDIA", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "PALLOR", shape: 'box' },
          { type: 'arrow', from: {x: 40, y: 50}, to: {x: 65, y: 50} }
        ]
      }
    ],
    q: "What does 'pallor' reflect in Alfie's early morning state?", 
    opts: ["Increased blood flow", "Reduced oxygenated hemoglobin in skin capillaries", "Excessive sodium", "Rapid marrow proliferation"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Increased blood flow would cause redness (erythema), not pallor.",
      "CORRECT: Pallor is the clinical sign of reduced oxygenated hemoglobin reaching the surface capillaries.",
      "INCORRECT: Sodium levels affect hydration and osmolarity, but not immediate skin color like hemoglobin does.",
      "INCORRECT: Marrow proliferation is a slow response to chronic anemia, not an acute cause of pallor."
    ],
    emotion: "tired", costume: "casual" 
  },

  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "7:58 AM", event: "CLINIC: CF", location: "clinic",
    beats: [
      { 
        text: "Dr. Rao handed him a chart. 'Recurrent lung infections. Fifteen years old.'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "RECURRENT INFECTION", shape: 'box' }
        ]
      },
      { 
        text: "Alfie began: Autosomal recessive mutation leading to CFTR dysfunction.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "MUTATION", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "CFTR FAIL", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 42, y: 50} }
        ]
      }
    ],
    q: "What is the inheritance pattern of Cystic Fibrosis?", 
    opts: ["Autosomal Dominant", "X-Linked Recessive", "Autosomal Recessive", "Mitochondrial"], 
    ans: 2, 
    rationales: [
      "INCORRECT: Dominant traits require only one allele; CF requires two.",
      "INCORRECT: X-linked traits show a male-skewed pattern; CF is not sex-linked.",
      "CORRECT: Cystic Fibrosis is a classic autosomal recessive disorder (25% chance from carrier parents).",
      "INCORRECT: Mitochondrial traits are passed only from the mother to all children."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "9:06 AM", event: "CLINIC: GENETICS", location: "clinic",
    beats: [
      { 
        text: "Dr. Rao handed him another chart. 'Family history visit. You’re leading.'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "GENETIC COUNSELING", shape: 'box' }
        ]
      },
      { 
        text: "Inside, a parent asked: 'So… how does this get passed down?'",
        speaker: 'parent',
        diagram: [
          { type: 'node', x: 20, y: 30, label: "MOTHER (Aa)", shape: 'circle' },
          { type: 'node', x: 80, y: 30, label: "FATHER (Aa)", shape: 'circle' },
          { type: 'node', x: 50, y: 70, label: "CHILD (aa)?", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 40}, to: {x: 45, y: 65} },
          { type: 'arrow', from: {x: 70, y: 40}, to: {x: 55, y: 65} }
        ]
      }
    ],
    q: "What is the probability of an affected child (aa) if both parents are carriers (Aa)?", 
    opts: ["0%", "25%", "50%", "100%"], 
    ans: 1, 
    rationales: [
      "INCORRECT: There is a clear risk when both parents carry the recessive allele.",
      "CORRECT: The Punnett square for Aa x Aa results in 25% AA, 50% Aa, and 25% aa (affected).",
      "INCORRECT: 50% is the chance of being a carrier, not being affected.",
      "INCORRECT: 100% only occurs if both parents are affected (aa x aa)."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "11:05 AM", event: "CLINIC: HYPOXIA", location: "clinic",
    beats: [
      { 
        text: "A patient with shortness of breath was brought in.",
        speaker: 'patient',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SOB / HYPOXIA", shape: 'box' }
        ]
      },
      { 
        text: "Dr. Rao asked: 'Inside the cell. What fails first?' Alfie answered: ↓ O₂ → ↓ ATP.",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "LOW O2", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "LOW ATP", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "PUMP FAIL", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "What is the immediate consequence of oxygen deprivation?", 
    opts: ["Membrane rupture", "ATP depletion", "Enzyme leakage", "Dysplasia"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Membrane rupture is a late, irreversible event.",
      "CORRECT: Loss of oxygen halts oxidative phosphorylation, causing immediate ATP depletion.",
      "INCORRECT: Enzyme leakage occurs after the membrane is compromised.",
      "INCORRECT: Dysplasia is a long-term growth adaptation, not an acute response to hypoxia."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "12:18 PM", event: "MCDONALD'S", location: "mcdonalds",
    beats: [
      { 
        text: "Alfie stopped for a Coke. 'Less sugar,' he told himself.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "GLUCOSE STRESS", shape: 'box' }
        ]
      },
      { 
        text: "If oxygen is limited, glucose follows anaerobic pathways to maintain some ATP.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "GLUCOSE", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "ANAEROBIC", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "LACTATE", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "What byproduct accumulates during anaerobic glycolysis, lowering pH?", 
    opts: ["Bicarbonate", "Lactate", "Glucose", "Fibrinogen"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Bicarbonate is a buffer that raises pH.",
      "CORRECT: Lactic acid (lactate) is the end product of anaerobic glycolysis and causes intracellular acidosis.",
      "INCORRECT: Glucose is the substrate, not the accumulating byproduct.",
      "INCORRECT: Fibrinogen is a clotting protein, not a metabolic byproduct."
    ],
    emotion: "neutral", costume: "casual" 
  },
  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "1:07 PM", event: "CLINIC: APOPTOSIS", location: "clinic",
    beats: [
      { 
        text: "Dr. Rao pulled up a pathology slide. 'Explain the difference without using buzzwords.'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "APOPTOSIS", shape: 'box' }
        ]
      },
      { 
        text: "Alfie answered: Apoptosis is programmed, minimal inflammation.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "PROGRAMMED", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "NO INFLAM.", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} }
        ]
      },
      { 
        text: "Which molecule is released from mitochondria to activate caspases?",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "MITOCHONDRIA", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "CYTOCHROME-C", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "CASPASES", shape: 'circle' },
          { type: 'arrow', from: {x: 32, y: 50}, to: {x: 42, y: 50} },
          { type: 'arrow', from: {x: 62, y: 50}, to: {x: 72, y: 50} }
        ]
      }
    ],
    q: "Which molecule is released from mitochondria to activate caspases?", 
    opts: ["Histamine", "Cytochrome-c", "Lactate", "vWF"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Histamine is an inflammatory mediator from mast cells.",
      "CORRECT: Cytochrome-c leakage from the mitochondria triggers the intrinsic apoptotic cascade.",
      "INCORRECT: Lactate is a metabolic byproduct of anaerobic respiration.",
      "INCORRECT: vWF (von Willebrand Factor) is a clotting factor."
    ],
    emotion: "serious", costume: "scrubs" 
  },

  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "2:26 PM", event: "CLINIC: MRSA", location: "clinic",
    beats: [
      { 
        text: "A skin abscess case came in. Dr. Rao asked: 'Likely organism?'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SKIN ABSCESS", shape: 'box' }
        ]
      },
      { 
        text: "Alfie noted Staphylococcus aureus leads to liquefactive necrosis and pus formation.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "S. AUREUS", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "ENZYMES", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "PUS (LIQUEFACTIVE)", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "Which type of necrosis is common in bacterial abscesses?", 
    opts: ["Coagulative", "Liquefactive", "Fat Necrosis", "Caseous"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Coagulative necrosis is typical of ischemic injury in most organs (except brain).",
      "CORRECT: Liquefactive necrosis occurs when enzymes digest the tissue into a liquid mass (pus).",
      "INCORRECT: Fat necrosis is seen in pancreatic injury or breast trauma.",
      "INCORRECT: Caseous necrosis is classic for Tuberculosis (cheese-like appearance)."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "3:41 PM", event: "CLINIC: TOXINS", location: "clinic",
    beats: [
      { 
        text: "Classic toxin physiology. Botulinum (flaccid paralysis) vs Tetanus (spastic paralysis).",
        diagram: [
          { type: 'node', x: 30, y: 40, label: "BOTULINUM", shape: 'box' },
          { type: 'node', x: 70, y: 40, label: "TETANUS", shape: 'box' },
          { type: 'text', x: 30, y: 60, label: "FLACCID" },
          { type: 'text', x: 70, y: 60, label: "SPASTIC" }
        ]
      },
      { 
        text: "Belinda texted: 'You on tonight?' Alfie looked at the schedule. He was.",
        diagram: [
          { type: 'node', x: 50, y: 30, label: "WORK SCHEDULE", shape: 'box' }
        ]
      }
    ],
    q: "What is the clinical manifestation of Tetanus toxin exposure?", 
    opts: ["Flaccid paralysis", "Spastic paralysis", "Mydriasis", "Hypotonia"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Flaccid paralysis is caused by Botulinum toxin (inhibiting ACh release).",
      "CORRECT: Tetanus toxin blocks inhibitory neurotransmitters (GABA/Glycine), causing constant muscle contraction (spasticity).",
      "INCORRECT: Mydriasis is pupil dilation, not the primary sign of Tetanus.",
      "INCORRECT: Hypotonia is low muscle tone, the opposite of the Tetanus effect."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "6:09 PM", event: "TACO BELL", location: "tacobell",
    beats: [
      { 
        text: "Belinda was on shift. 'Still intact?' she asked. 'Still intact.'",
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "HEALING STATUS", shape: 'box' }
        ]
      },
      { 
        text: "The wound moved to the proliferation phase: fibroblast proliferation and Type III collagen deposition.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "FIBROBLASTS", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "PROLIFERATION", shape: 'box' },
          { type: 'node', x: 85, y: 50, label: "COLLAGEN III", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "Which phase of healing involves fibroblast migration and Type III collagen?", 
    opts: ["Hemostasis", "Inflammation", "Proliferation", "Remodeling"], 
    ans: 2, 
    rationales: [
      "INCORRECT: Hemostasis is the immediate clotting phase.",
      "INCORRECT: Inflammation involves neutrophils and macrophages clearing debris.",
      "CORRECT: Proliferation is when the wound is 'rebuilt' with granulation tissue, fibroblasts, and Type III collagen.",
      "INCORRECT: Remodeling is the final phase where Type III is replaced by Type I collagen."
    ],
    emotion: "neutral", costume: "fastfood" 
  },
  { 
    act: "ACT II: MONDAY", day: "MONDAY", time: "9:34 PM", event: "HOME: RECHECK", location: "home",
    beats: [
      { 
        text: "Alfie unwrapped the bandage carefully.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "WOUND RECHECK", shape: 'box' }
        ]
      },
      { 
        text: "He checked for what Dr. Rao drilled into him: Dehiscence (separation) or eschar requiring debridement.",
        diagram: [
          { type: 'node', x: 30, y: 50, label: "DEHISCENCE?", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "ESCHAR?", shape: 'circle' }
        ]
      }
    ],
    q: "What is the term for wound edges separating after closure?", 
    opts: ["Hyperplasia", "Dehiscence", "Metaplasia", "Atrophy"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Hyperplasia is an increase in cell number.",
      "CORRECT: Dehiscence is the mechanical failure of wound closure where the edges pull apart.",
      "INCORRECT: Metaplasia is a change in cell type.",
      "INCORRECT: Atrophy is a decrease in cell size."
    ],
    emotion: "pained", costume: "casual" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "6:11 AM", event: "FEVER RETURNS", location: "home",
    beats: [
      { 
        text: "Woke up warm. 101.3°F. Fever means something is still active.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "101.3°F", shape: 'box' }
        ]
      },
      { 
        text: "Macrophage activation releases cytokines resetting the hypothalamus via PGE2.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "MACROPHAGE", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "CYTOKINES", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "PGE2 (BRAIN)", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "Which lipid mediator induces the hypothalamic set-point change?", 
    opts: ["Histamine", "Prostaglandin E2 (PGE2)", "Lactate", "vWF"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Histamine affects vascular permeability but not the brain's thermostat.",
      "CORRECT: PGE2 is the ultimate mediator that crosses the blood-brain barrier to reset the temperature set-point.",
      "INCORRECT: Lactate is a metabolic byproduct.",
      "INCORRECT: vWF is involved in platelet adhesion."
    ],
    emotion: "tired", costume: "casual" 
  },

  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "8:19 AM", event: "CLINIC: SICKLE CELL", location: "clinic",
    beats: [
      { 
        text: "Daniel’s sickle cell crisis. Alfie explained the mechanism to the students.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SICKLE CELL CRISIS", shape: 'box' }
        ]
      },
      { 
        text: "Deoxygenated HbS polymerizes, distorting the red blood cells into a sickle shape.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "LOW O2", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "HbS POLYMER", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "SICKLE SHAPE", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 42, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 72, y: 50} }
        ]
      },
      { 
        text: "These rigid cells obstruct the microvasculature, causing ischemia and severe pain.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "VASO-OCCLUSION", shape: 'box' },
          { type: 'node', x: 85, y: 50, label: "PAIN", shape: 'box' },
          { type: 'arrow', from: {x: 65, y: 50}, to: {x: 78, y: 50} }
        ]
      }
    ],
    q: "In Sickle Cell, what causes the painful crisis in capillaries?", 
    opts: ["Excessive iron", "Polymerization of deoxygenated HbS", "Increased pH", "RBC overproduction"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Iron overload (hemosiderosis) is a complication of transfusions, not the cause of acute crisis.",
      "CORRECT: When oxygen is low, HbS molecules stick together (polymerize), distorting the RBC into a sickle shape that clogs vessels.",
      "INCORRECT: Low pH (acidosis) actually promotes sickling; high pH would inhibit it.",
      "INCORRECT: RBC count is usually low (anemia) due to hemolysis."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "9:47 AM", event: "CLINIC: PEDIATRIC", location: "clinic",
    beats: [
      { 
        text: "Mother brought in a child. Fatigue, pale conjunctiva.",
        speaker: 'parent',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "PALE CONJUNCTIVA", shape: 'box' }
        ]
      },
      { 
        text: "Dr. Rao looked at Alfie. 'Mechanism.' Alfie: 'Chronic low iron synthesis leads to microcytic RBCs.'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "LOW IRON", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "LOW Hb SYNTH", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "MICROCYTIC RBC", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 42, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 72, y: 50} }
        ]
      }
    ],
    q: "What is the appearance of RBCs in iron deficiency anemia?", 
    opts: ["Large and Red", "Small and Pale (Microcytic/Hypochromic)", "Normocytic", "Hyperchromic"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Large cells (macrocytic) are seen in B12 or Folate deficiency.",
      "CORRECT: Without iron, the cell can't make hemoglobin, resulting in small (microcytic) and pale (hypochromic) cells.",
      "INCORRECT: Normocytic cells are seen in acute blood loss or chronic disease.",
      "INCORRECT: Hyperchromic cells are rare and usually indicate spherocytosis."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "11:32 AM", event: "CLINIC: OB CASE", location: "clinic",
    beats: [
      { 
        text: "Rh-negative mother. Second pregnancy.",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "Rh- MOTHER", shape: 'box' },
          { type: 'node', x: 50, y: 70, label: "Rh+ FETUS (2nd)", shape: 'circle' }
        ]
      },
      { 
        text: "IgG crosses placenta, binds fetal RBCs causing lysis. Type II hypersensitivity reaction.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "IgG CROSS", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "RBC BINDING", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "HEMOLYSIS", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "Rh Disease is which type of hypersensitivity?", 
    opts: ["Type I", "Type II (Cytotoxic)", "Type III", "Type IV"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Type I is allergy/IgE mediated.",
      "CORRECT: Type II involves antibodies (IgG/IgM) targeting specific cell-surface antigens.",
      "INCORRECT: Type III involves immune complex deposition (e.g., Lupus).",
      "INCORRECT: Type IV is delayed T-cell mediated (e.g., Poison Ivy)."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "1:14 PM", event: "LUNCH", location: "tacobell",
    beats: [
      { 
        text: "Belinda slid into the booth. 'So allergies are just drama?'",
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "ALLERGY DISCUSSION", shape: 'box' }
        ]
      },
      { 
        text: "'No.' Alfie drew on a napkin: Allergen cross-links IgE, triggering mast cell degranulation.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "ALLERGEN", shape: 'circle' },
          { type: 'node', x: 40, y: 50, label: "IgE", shape: 'circle' },
          { type: 'node', x: 60, y: 50, label: "MAST CELL", shape: 'box' },
          { type: 'node', x: 85, y: 50, label: "HISTAMINE", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 35, y: 50} },
          { type: 'arrow', from: {x: 50, y: 50}, to: {x: 55, y: 50} },
          { type: 'arrow', from: {x: 65, y: 50}, to: {x: 80, y: 50} }
        ]
      }
    ],
    q: "Which hypersensitivity is characterized by IgE-mediated degranulation?", 
    opts: ["Type I (Immediate)", "Type II", "Type III", "Type IV"], 
    ans: 0, 
    rationales: [
      "CORRECT: Type I is the classic immediate allergic reaction involving IgE and mast cells.",
      "INCORRECT: Type II is antibody-mediated cytotoxicity.",
      "INCORRECT: Type III is immune complex mediated.",
      "INCORRECT: Type IV is delayed hypersensitivity."
    ],
    emotion: "neutral", costume: "casual" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "2:15 PM", event: "CLINIC: LUPUS", location: "clinic",
    beats: [
      { 
        text: "Back at the clinic, Dr. Rao presented a complex case. 'Malar rash, joint pain, and low complement.'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SLE (LUPUS)", shape: 'box' },
          { type: 'text', x: 50, y: 30, label: "MALAR RASH" }
        ]
      },
      { 
        text: "Alfie identified Type III Hypersensitivity. Antigen-antibody complexes were depositing in the microvasculature.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "COMPLEXES", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "BLOOD VESSEL", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "DEPOSITION", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ]
      },
      { 
        text: "This activated complement and recruited neutrophils that damage the vessel walls (Vasculitis).",
        diagram: [
          { type: 'node', x: 30, y: 50, label: "COMPLEMENT", shape: 'circle' },
          { type: 'node', x: 60, y: 50, label: "NEUTROPHILS", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "VASCULITIS", shape: 'box' },
          { type: 'arrow', from: {x: 42, y: 50}, to: {x: 55, y: 50} },
          { type: 'arrow', from: {x: 70, y: 50}, to: {x: 82, y: 50} }
        ]
      }
    ],
    q: "Type III hypersensitivity involves the deposition of which structures into tissues?", 
    opts: ["IgE on Mast Cells", "Sensitized T-cells", "Antigen-Antibody (Immune) Complexes", "Free Histamine"], 
    ans: 2, 
    rationales: [
      "INCORRECT: IgE on Mast cells is Type I.",
      "INCORRECT: T-cell mediated is Type IV.",
      "CORRECT: Type III is defined by the formation and deposition of immune complexes that trigger inflammation.",
      "INCORRECT: Histamine is a mediator, not the primary initiating complex."
    ],
    emotion: "serious", costume: "scrubs" 
  },

  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "2:45 PM", event: "CLINIC: DELAYED REACTION", location: "clinic",
    beats: [
      { 
        text: "A gardener came in with a blistering rash. 'Poison ivy,' Dr. Rao noted.",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "POISON IVY", shape: 'box' }
        ]
      },
      { 
        text: "Alfie explained the Type IV mechanism: Sensitized T-cells (not antibodies) encounter the antigen.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "ANTIGEN", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "T-CELL", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} }
        ]
      },
      { 
        text: "CD4+ cells release cytokines to activate macrophages, while CD8+ cells directly kill the 'foreign' epithelial cells.",
        diagram: [
          { type: 'node', x: 20, y: 30, label: "CD4+", shape: 'circle' },
          { type: 'node', x: 50, y: 30, label: "CYTOKINES", shape: 'circle' },
          { type: 'node', x: 80, y: 30, label: "MACROPHAGE", shape: 'circle' },
          { type: 'node', x: 20, y: 70, label: "CD8+", shape: 'circle' },
          { type: 'node', x: 80, y: 70, label: "CELL DEATH", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 30}, to: {x: 45, y: 30} },
          { type: 'arrow', from: {x: 55, y: 30}, to: {x: 75, y: 30} },
          { type: 'arrow', from: {x: 30, y: 70}, to: {x: 75, y: 70} }
        ]
      }
    ],
    q: "Which of the following is unique to Type IV hypersensitivity compared to Types I-III?", 
    opts: ["It is antibody-independent (T-cell mediated)", "It involves IgE", "It happens instantly", "It requires complement"], 
    ans: 0, 
    rationales: [
      "CORRECT: Type IV is the only one of the four types that does not involve antibodies.",
      "INCORRECT: IgE is Type I.",
      "INCORRECT: Type IV is 'Delayed', taking 48-72 hours.",
      "INCORRECT: Complement is primarily involved in Types II and III."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "3:02 PM", event: "CLINIC: WHITEBOARD", location: "clinic",
    beats: [
      { 
        text: "Dr. Rao pulled Alfie aside. 'Child with blasts in marrow.'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "BONE MARROW", shape: 'box' }
        ]
      },
      { 
        text: "Immature lymphoblasts overfill the marrow, suppressing normal hematopoiesis.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "LYMPHOBLASTS++", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "OVERCROWDING", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "LOW RBC/PLT", shape: 'box' },
          { type: 'arrow', from: {x: 32, y: 50}, to: {x: 42, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 72, y: 50} }
        ]
      }
    ],
    q: "Which leukemia is most common in children and involves lymphoblasts?", 
    opts: ["CLL", "ALL", "CML", "AML"], 
    ans: 1, 
    rationales: [
      "INCORRECT: CLL is a disease of older adults.",
      "CORRECT: Acute Lymphoblastic Leukemia (ALL) is the most common pediatric malignancy.",
      "INCORRECT: CML is characterized by the Philadelphia chromosome in adults.",
      "INCORRECT: AML is common in older adults, though it can occur in children."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "4:16 PM", event: "CLINIC: BIOPSY", location: "clinic",
    beats: [
      { 
        text: "Path lab called. 'Large multinucleated cells with prominent nucleoli.'",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "BIOPSY SLIDE", shape: 'box' }
        ]
      },
      { 
        text: "Reed-Sternberg cells: diagnostic for Hodgkin lymphoma.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "RS CELL", shape: 'circle' },
          { type: 'text', x: 50, y: 70, label: "OWL-EYE" }
        ]
      }
    ],
    q: "Presence of which cell is diagnostic for Hodgkin Lymphoma?", 
    opts: ["Auer Rod", "Reed-Sternberg Cell", "Smudge Cell", "Plasma Cell"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Auer rods are seen in AML.",
      "CORRECT: Reed-Sternberg cells ('owl-eye' appearance) are the hallmark of Hodgkin lymphoma.",
      "INCORRECT: Smudge cells are characteristic of CLL.",
      "INCORRECT: Plasma cells are the source of Multiple Myeloma."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "6:03 PM", event: "DRIVE: TACO BELL", location: "tacobell",
    beats: [
      { 
        text: "Alfie picked up Belinda. She asked: 'So what’s LDL actually doing?'",
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "ATHEROSCLEROSIS", shape: 'box' }
        ]
      },
      { 
        text: "Endothelial injury allows LDL into the intima where it’s oxidized and eaten by macrophages.",
        diagram: [
          { type: 'node', x: 10, y: 50, label: "LDL", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "INTIMA", shape: 'box' },
          { type: 'node', x: 60, y: 50, label: "OXY-LDL", shape: 'circle' },
          { type: 'node', x: 85, y: 50, label: "MACROPHAGE", shape: 'circle' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 40, y: 50}, to: {x: 55, y: 50} },
          { type: 'arrow', from: {x: 65, y: 50}, to: {x: 80, y: 50} }
        ]
      },
      { 
        text: "What are macrophages filled with oxidized LDL called? Foam cells.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "FOAM CELL", shape: 'circle' },
          { type: 'text', x: 50, y: 70, label: "BLOATED WITH LIPID" }
        ]
      }
    ],
    q: "What are macrophages filled with oxidized LDL called?", 
    opts: ["Mast cells", "Foam cells", "Neutrophils", "T-cells"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Mast cells are involved in allergies.",
      "CORRECT: Foam cells are the lipid-laden macrophages that form the bulk of an atherosclerotic plaque.",
      "INCORRECT: Neutrophils are acute inflammatory cells.",
      "INCORRECT: T-cells are part of adaptive immunity."
    ],
    emotion: "neutral", costume: "casual" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "7:44 PM", event: "CLINIC: HF", location: "clinic",
    beats: [
      { 
        text: "Patient with dyspnea. Dr. Rao asked for the difference.",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 30, y: 30, label: "LEFT HEART", shape: 'box' },
          { type: 'node', x: 70, y: 30, label: "RIGHT HEART", shape: 'box' }
        ]
      },
      { 
        text: "LV failure backs into lungs (crackles). RV failure backs into systemic veins (JVD).",
        diagram: [
          { type: 'node', x: 30, y: 60, label: "LUNGS (EDEMA)", shape: 'box' },
          { type: 'node', x: 70, y: 60, label: "BODY (JVD)", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 38}, to: {x: 30, y: 55} },
          { type: 'arrow', from: {x: 70, y: 38}, to: {x: 70, y: 55} }
        ]
      }
    ],
    q: "Which sign is typical of Left Ventricular Failure?", 
    opts: ["Ankle swelling", "Pulmonary Edema (Crackles)", "Jugular distension", "Ascites"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Ankle swelling is a sign of systemic backup (RV failure).",
      "CORRECT: LV failure causes blood to back up into the pulmonary circulation, leading to fluid in the lungs.",
      "INCORRECT: Jugular Venous Distension (JVD) is a classic sign of RV failure.",
      "INCORRECT: Ascites (abdominal fluid) is caused by systemic venous congestion or liver failure."
    ],
    emotion: "serious", costume: "scrubs" 
  },

  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "9:12 PM", event: "EMERGENCY: V-FIB", location: "clinic",
    beats: [
      { 
        text: "Monitor alarmed. Chaotic waveform. Ventricular fibrillation.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "V-FIB CHAOS", shape: 'box' }
        ]
      },
      { 
        text: "Electrical disorganization means zero cardiac output.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "ELEC. CHAOS", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "NO CONTRACTION", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "ZERO OUTPUT", shape: 'box' },
          { type: 'arrow', from: {x: 32, y: 50}, to: {x: 42, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 72, y: 50} }
        ]
      }
    ],
    q: "Why is V-Fib immediately life-threatening?", 
    opts: ["Too much oxygen", "No coordinated contraction or output", "Slow heart rate", "High pH"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Oxygen levels drop rapidly during V-fib.",
      "CORRECT: V-fib is a 'quivering' of the heart; without coordinated contraction, no blood is pumped to the brain.",
      "INCORRECT: The rate is high but ineffective, unlike High heart rate.",
      "INCORRECT: pH drops (acidosis) as tissues shift to anaerobic metabolism."
    ],
    emotion: "surprised", costume: "scrubs" 
  },
  { 
    act: "ACT III: TUESDAY", day: "TUESDAY", time: "10:37 PM", event: "CLINIC: DVT", location: "clinic",
    beats: [
      { 
        text: "Belinda leaned against the counter. 'Why do people clot after surgery?'",
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "POST-OP CLOT", shape: 'box' }
        ]
      },
      { 
        text: "Alfie answered: Virchow's Triad (Stasis, Injury, Hypercoagulability).",
        diagram: [
          { type: 'node', x: 20, y: 30, label: "STASIS", shape: 'circle' },
          { type: 'node', x: 50, y: 30, label: "INJURY", shape: 'circle' },
          { type: 'node', x: 80, y: 30, label: "HYPERCOAG.", shape: 'circle' },
          { type: 'node', x: 50, y: 70, label: "THROMBUS", shape: 'box' },
          { type: 'arrow', from: {x: 25, y: 40}, to: {x: 45, y: 65} },
          { type: 'arrow', from: {x: 50, y: 40}, to: {x: 50, y: 65} },
          { type: 'arrow', from: {x: 75, y: 40}, to: {x: 55, y: 65} }
        ]
      }
    ],
    q: "Which of these is part of Virchow's Triad?", 
    opts: ["Hypoxia", "Venous Stasis", "Metaplasia", "Atrophy"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Hypoxia may result from a clot (embolus) but doesn't cause the initial thrombus.",
      "CORRECT: Venous stasis (lack of movement) is one of the three pillars of clot formation.",
      "INCORRECT: Metaplasia is a cell growth adaptation.",
      "INCORRECT: Atrophy is a reduction in cell size."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT IV: WEDNESDAY", day: "WEDNESDAY", time: "6:03 AM", event: "KITCHEN", location: "home",
    beats: [
      { 
        text: "Sticky note from Clara: 'EAT.' Alfie noticed the wound was less red.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "HEALING PROGRESS", shape: 'box' }
        ]
      },
      { 
        text: "He reviewed cellular adaptation: Atrophy, Metaplasia (Barrett's), and Dysplasia risk.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "ATROPHY", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "METAPLASIA", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "DYSPLASIA", shape: 'circle' }
        ]
      }
    ],
    q: "What is the shrinkage in cell size due to loss of substance?", 
    opts: ["Hyperplasia", "Atrophy", "Metaplasia", "Dysplasia"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Hyperplasia is an increase in the number of cells.",
      "CORRECT: Atrophy is the adaptive response where cells shrink to survive reduced demand or nutrition.",
      "INCORRECT: Metaplasia is the reversible swap of one cell type for another.",
      "INCORRECT: Dysplasia is disordered growth, often pre-cancerous."
    ],
    emotion: "neutral", costume: "casual" 
  },
  { 
    act: "ACT IV: WEDNESDAY", day: "WEDNESDAY", time: "7:26 AM", event: "TEXT: GENETICS", location: "home",
    beats: [
      { 
        text: "Leo texted: 'Cousin’s kid is getting tested.'",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "GENETIC TESTING", shape: 'box' }
        ]
      },
      { 
        text: "Diagnostic tests (Karyotype) confirm Trisomy 21.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "KARYOTYPE", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "3 COPIES OF CHR 21" }
        ]
      }
    ],
    q: "Which test confirms a diagnosis of Down Syndrome?", 
    opts: ["Maternal screening", "Karyotype (CVS/Amnio)", "Ultrasound", "Pica check"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Screening is just a probability check.",
      "CORRECT: Examining the actual chromosomes (Karyotype) is the only way to confirm Trisomy 21.",
      "INCORRECT: Ultrasound is suggestive but not definitive.",
      "INCORRECT: Pica is unrelated."
    ],
    emotion: "serious", costume: "casual" 
  },
  { 
    act: "ACT IV: WEDNESDAY", day: "WEDNESDAY", time: "8:11 AM", event: "CLINIC: NEURO", location: "clinic",
    beats: [
      { 
        text: "Camille asked, 'Is that the one where it gets worse every generation?'",
        speaker: 'camille',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "ANTICIPATION", shape: 'box' }
        ]
      },
      { 
        text: "Alfie: Huntington's involves CAG trinucleotide repeat expansion.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "CAG-CAG-CAG++", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "HUNTINGTON", shape: 'box' },
          { type: 'arrow', from: {x: 40, y: 50}, to: {x: 70, y: 50} }
        ]
      }
    ],
    q: "Huntington disease involves which type of genetic mutation?", 
    opts: ["Trinucleotide repeat expansion", "Single point mutation", "X-linked recessive", "Mitochondrial"], 
    ans: 0, 
    rationales: [
      "CORRECT: CAG repeats expand over generations (anticipation), leading to the disease.",
      "INCORRECT: Single point mutations cause diseases like Sickle Cell.",
      "INCORRECT: Huntington's is Autosomal Dominant.",
      "INCORRECT: Mitochondrial mutations have a unique non-Mendelian inheritance."
    ],
    emotion: "serious", costume: "scrubs" 
  },

  { 
    act: "ACT IV: WEDNESDAY", day: "WEDNESDAY", time: "9:32 AM", event: "CLINIC: TAY-SACHS", location: "clinic",
    beats: [
      { 
        text: "A pediatric follow-up. Alfie went stepwise.",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "TAY-SACHS REVIEW", shape: 'box' }
        ]
      },
      { 
        text: "Hexosaminidase A deficiency leads to GM2 ganglioside accumulation.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "NO HEX-A", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "LYSOSOME", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "GM2 BUILDUP", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "What substance accumulates in Tay-Sachs neurons?", 
    opts: ["Iron", "GM2 Ganglioside", "Glycogen", "Copper"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Iron accumulates in hemochromatosis.",
      "CORRECT: Tay-Sachs is a lysosomal storage disease where GM2 gangliosides build up and destroy neurons.",
      "INCORRECT: Glycogen accumulates in Glycogen Storage Diseases.",
      "INCORRECT: Copper accumulates in Wilson's disease."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT IV: WEDNESDAY", day: "WEDNESDAY", time: "10:58 AM", event: "BREAK ROOM", location: "clinic",
    beats: [
      { 
        text: "Nina was complaining. 'I’m exhausted. My throat hurts.'",
        speaker: 'nina',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "MALAISE / SORE THROAT", shape: 'box' }
        ]
      },
      { 
        text: "Alfie noted: EBV causes immune activation and posterior cervical lymphadenopathy.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "EBV VIRUS", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "B-CELL INFECT", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "NODE SWELL", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "Which virus causes infectious mononucleosis and swollen lymph nodes?", 
    opts: ["MRSA", "EBV", "C. tetani", "HbS"], 
    ans: 1, 
    rationales: [
      "INCORRECT: MRSA is a bacterium.",
      "CORRECT: Epstein-Barr Virus (EBV) is the cause of Mononucleosis.",
      "INCORRECT: C. tetani causes Tetanus.",
      "INCORRECT: HbS is the hemoglobin variant in Sickle Cell."
    ],
    emotion: "neutral", costume: "casual" 
  },
  { 
    act: "ACT IV: WEDNESDAY", day: "WEDNESDAY", time: "12:14 PM", event: "CLINIC: SPEED", location: "clinic",
    beats: [
      { 
        text: "Dr. Rao caught Alfie: 'Bacterial meningitis. First-line antibiotics?'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "MENINGITIS EMERGENCY", shape: 'box' }
        ]
      },
      { 
        text: "Treat immediately; delay increases neurologic injury.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "BACTERIA", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "PRESSURE++", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "BRAIN DMG", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} },
          { type: 'text', x: 50, y: 30, label: "TIME = NEURONS" }
        ]
      }
    ],
    q: "Why treat suspected meningitis before culture results?", 
    opts: ["To prevent fever", "Delay increases morbidity and mortality", "To reduce pH", "To stop pica"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Fever is secondary to survival.",
      "CORRECT: Neurologic damage happens in minutes/hours; treatment must start immediately.",
      "INCORRECT: Antibiotics don't primarily target pH.",
      "INCORRECT: Pica is irrelevant."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT IV: WEDNESDAY", day: "WEDNESDAY", time: "3:41 PM", event: "HOME: HEALING", location: "home",
    beats: [
      { 
        text: "Alfie reviewed wound sequence: Hemostasis → Inflammation → Proliferation → Remodeling.",
        diagram: [
          { type: 'node', x: 10, y: 50, label: "HEMO", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "INFLAM", shape: 'circle' },
          { type: 'node', x: 60, y: 50, label: "PROLIF", shape: 'circle' },
          { type: 'node', x: 85, y: 50, label: "REMOD", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 28, y: 50} },
          { type: 'arrow', from: {x: 42, y: 50}, to: {x: 52, y: 50} },
          { type: 'arrow', from: {x: 68, y: 50}, to: {x: 78, y: 50} }
        ]
      },
      { 
        text: "Remodeling replaces Type III with Type I collagen, increasing tensile strength.",
        diagram: [
          { type: 'node', x: 30, y: 50, label: "COLLAGEN III", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "COLLAGEN I", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} },
          { type: 'text', x: 50, y: 30, label: "STRENGTH++" }
        ]
      }
    ],
    q: "Which type of healing occurs in large, open wounds?", 
    opts: ["Primary Intention", "Secondary Intention", "Metaplasia", "Dysplasia"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Primary intention is for clean, sutured edges.",
      "CORRECT: Secondary intention involves the wound filling with granulation tissue and contracting.",
      "INCORRECT: Metaplasia is not a healing type but a cell adaptation.",
      "INCORRECT: Dysplasia is abnormal growth."
    ],
    emotion: "neutral", costume: "casual" 
  },
  { 
    act: "ACT IV: WEDNESDAY", day: "WEDNESDAY", time: "7:58 PM", event: "TACO BELL: END", location: "tacobell",
    beats: [
      { 
        text: "Belinda saw the new bandage. 'Better.' Alfie nodded. 'Consistency matters.'",
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "RECOVERY", shape: 'box' }
        ]
      },
      { 
        text: "Remodeling replaces Type III with Type I collagen.",
        diagram: [
          { type: 'node', x: 30, y: 50, label: "III", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "I", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} }
        ]
      }
    ],
    q: "What is the final phase of wound healing that increases tensile strength?", 
    opts: ["Hemostasis", "Inflammation", "Proliferation", "Remodeling"], 
    ans: 3, 
    rationales: [
      "INCORRECT: Hemostasis is the start.",
      "INCORRECT: Inflammation clears the site.",
      "INCORRECT: Proliferation builds the new tissue.",
      "CORRECT: Remodeling (Maturation) can last for a year, strengthening the scar by organizing collagen."
    ],
    emotion: "neutral", costume: "fastfood" 
  },

  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "6:08 AM", event: "THE PATTERN", location: "home",
    beats: [
      { 
        text: "He rewrote the single most tested cascade in Module 1: Hypoxic Cell Injury.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "HYPOXIC INJURY", shape: 'box' }
        ]
      },
      { 
        text: "ATP depletion is the root of the cascade, leading to pump failure and swelling.",
        diagram: [
          { type: 'node', x: 10, y: 50, label: "LOW O2", shape: 'circle' },
          { type: 'node', x: 30, y: 50, label: "LOW ATP", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "PUMP FAIL", shape: 'box' },
          { type: 'node', x: 75, y: 50, label: "NA+ INFLUX", shape: 'circle' },
          { type: 'node', x: 95, y: 50, label: "SWELLING", shape: 'circle' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 38, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 70, y: 50} },
          { type: 'arrow', from: {x: 82, y: 50}, to: {x: 90, y: 50} }
        ]
      }
    ],
    q: "What fails first in the hypoxic cell injury sequence?", 
    opts: ["Membrane", "ATP production", "Nucleus", "Ribosomes"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Membrane failure is a late, irreversible stage.",
      "CORRECT: Without oxygen, the cell cannot produce ATP (energy), which powers all subsequent functions.",
      "INCORRECT: Nuclear changes are indicators of irreversible damage.",
      "INCORRECT: Ribosomes detach as a result of ATP loss, but it's not the first event."
    ],
    emotion: "serious", costume: "casual" 
  },
  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "7:34 AM", event: "CLINIC: RISK", location: "clinic",
    beats: [
      { 
        text: "Chronic colonic inflammation leads to repeated epithelial injury.",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "CHRONIC INFLAM.", shape: 'box' }
        ]
      },
      { 
        text: "This increases the risk of dysplasia: disordered growth and architectural disorganization.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "NORMAL", shape: 'box' },
          { type: 'node', x: 50, y: 50, label: "DYSPLASIA", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "PRE-CANCER", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 42, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 72, y: 50} }
        ]
      }
    ],
    q: "Disordered growth and architectural disorganization is called:", 
    opts: ["Atrophy", "Metaplasia", "Dysplasia", "Hyperplasia"], 
    ans: 2, 
    rationales: [
      "INCORRECT: Atrophy is shrinking.",
      "INCORRECT: Metaplasia is a cell swap.",
      "CORRECT: Dysplasia is the disorganized growth that serves as a precursor to cancer.",
      "INCORRECT: Hyperplasia is an increase in number."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "8:52 AM", event: "CLINIC: BARRETT", location: "clinic",
    beats: [
      { 
        text: "GERD patient. Replacement of squamous epithelium by columnar epithelium.",
        speaker: 'patient',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "GERD / HEARTBURN", shape: 'box' }
        ]
      },
      { 
        text: "Metaplasia is protective initially but carries risk of further progression.",
        diagram: [
          { type: 'node', x: 30, y: 50, label: "SQUAMOUS", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "COLUMNAR", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} },
          { type: 'text', x: 50, y: 30, label: "METAPLASIA" }
        ]
      }
    ],
    q: "This replacement of cell types in the esophagus is called:", 
    opts: ["Atrophy", "Metaplasia", "Dysplasia", "Necrosis"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Atrophy is shrinkage.",
      "CORRECT: Metaplasia is the reversible change from one adult cell type to another (e.g., Barrett's Esophagus).",
      "INCORRECT: Dysplasia is disordered growth.",
      "INCORRECT: Necrosis is cell death."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "10:17 AM", event: "CLINIC: SMOKER", location: "clinic",
    beats: [
      { 
        text: "40-pack-year smoking history. Bronchial metaplasia replaces ciliated columnar cells.",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SMOKER BRONCHI", shape: 'box' }
        ]
      },
      { 
        text: "Reducing mucociliary clearance and increasing infection risk.",
        diagram: [
          { type: 'node', x: 30, y: 50, label: "CILIA LOSS", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "INFECTION RISK++", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} }
        ]
      }
    ],
    q: "Loss of which structure in bronchial metaplasia increases infection risk?", 
    opts: ["Nucleus", "Cilia", "Golgi", "Mitochondria"], 
    ans: 1, 
    rationales: [
      "INCORRECT: The nucleus remains but the cell type changes.",
      "CORRECT: Cilia are lost when columnar cells become squamous, preventing the 'elevator' from clearing mucus/bacteria.",
      "INCORRECT: Golgi apparatus is not the primary structure lost here.",
      "INCORRECT: Mitochondria are present in all living cells."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "11:46 AM", event: "CLINIC: PRENATAL", location: "clinic",
    beats: [
      { 
        text: "Patient asked: 'Does this screening mean my baby has it?'",
        speaker: 'parent',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "PRENATAL SCREEN", shape: 'box' }
        ]
      },
      { 
        text: "Screen estimates risk; Karyotype confirms diagnosis.",
        diagram: [
          { type: 'node', x: 30, y: 50, label: "SCREEN (PROB.)", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "KARYOTYPE (DEF.)", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} }
        ]
      }
    ],
    q: "Which test confirms a diagnosis of Down Syndrome?", 
    opts: ["Maternal screening", "Karyotype (CVS/Amnio)", "Ultrasound", "Pica check"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Screening is just a probability check.",
      "CORRECT: Examining the actual chromosomes (Karyotype) is the only way to confirm Trisomy 21.",
      "INCORRECT: Ultrasound is suggestive but not definitive.",
      "INCORRECT: Pica is unrelated."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "1:09 PM", event: "BREAK ROOM", location: "clinic",
    beats: [
      { 
        text: "Camille asked: 'Why doesn’t apoptosis cause inflammation?'",
        speaker: 'camille',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "APOPTOSIS VS NECROSIS", shape: 'box' }
        ]
      },
      { 
        text: "Alfie: Membrane integrity is maintained, no DAMP release.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "MEMBRANE INTACT", shape: 'box' },
          { type: 'node', x: 50, y: 50, label: "APOPTOTIC BODY", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "PHAGOCYTE", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ]
      }
    ],
    q: "Which process maintains membrane integrity while the cell dies?", 
    opts: ["Necrosis", "Apoptosis", "Autolysis", "Heterolysis"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Necrosis involves membrane rupture and massive inflammation.",
      "CORRECT: Apoptosis is clean; the cell fragments into bodies that are eaten without leaking contents.",
      "INCORRECT: Autolysis is post-mortem digestion.",
      "INCORRECT: Heterolysis is digestion by outside enzymes."
    ],
    emotion: "serious", costume: "casual" 
  },
  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "6:38 PM", event: "CLINIC: FINAL", location: "clinic",
    beats: [
      { 
        text: "Dr. Rao again: 'Suspected bacterial meningitis. Do you wait?'",
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "MENINGITIS RULE", shape: 'box' }
        ]
      },
      { 
        text: "Speed saves neurons. Treat immediately.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "ANTIBIOTICS NOW", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "DO NOT WAIT" }
        ]
      }
    ],
    q: "Why treat suspected meningitis before culture results?", 
    opts: ["To prevent fever", "Delay increases morbidity and mortality", "To reduce pH", "To stop pica"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Fever is secondary to survival.",
      "CORRECT: Neurologic damage happens in minutes/hours; treatment must start immediately.",
      "INCORRECT: Antibiotics don't primarily target pH.",
      "INCORRECT: Pica is irrelevant."
    ],
    emotion: "serious", costume: "scrubs" 
  },
  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "11:57 PM", event: "REFLECTION", location: "home",
    beats: [
      { 
        text: "Final reflection before exam week. Medicine is sequence.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "PATHOPHYSIOLOGY", shape: 'box' }
        ]
      },
      { 
        text: "Every stem hides a mechanism. Find the mechanism; diagnosis follows.",
        diagram: [
          { type: 'node', x: 20, y: 50, label: "TRIGGER", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "MECHANISM", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "MANIFESTATION", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 42, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 72, y: 50} }
        ]
      }
    ],
    q: "What marks the transition to irreversible cell injury (necrosis)?", 
    opts: ["Temporary decrease in pH", "Loss of membrane integrity and enzyme leakage", "Slight increase in sodium", "Ribosome detachment"], 
    ans: 1, 
    rationales: [
      "INCORRECT: pH drops are common in reversible injury.",
      "CORRECT: Once the membrane breaks, the cell can no longer recover; enzymes leak out (measurable in blood like Troponin).",
      "INCORRECT: Sodium influx happens in reversible swelling too.",
      "INCORRECT: Ribosome detachment is a reversible step."
    ],
    emotion: "neutral", costume: "casual" 
  },
  { 
    act: "ACT V: THURSDAY", day: "THURSDAY", time: "11:59 PM", event: "MODULE 1 MASTERY", location: "home",
    beats: [
      { 
        text: "Alfie closed his textbook. The 13 core mechanisms of Module 1 were no longer just definitions.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "MODULE 1 COMPLETE", shape: 'box' }
        ]
      },
      { 
        text: "They were the story of his own week. He was ready for the final reflection.",
        diagram: [
          { type: 'node', x: 50, y: 50, label: "READY FOR EXAM", shape: 'box' }
        ]
      }
    ],
    q: "Which of the following best describes the clinical application of pathophysiology?", 
    opts: ["Memorizing drug names", "Understanding the biological 'why' behind signs and symptoms", "Only focusing on surgery", "Ignoring laboratory values"], 
    ans: 1, 
    rationales: [
      "INCORRECT: Pharmacology is separate, though related.",
      "CORRECT: Pathophysiology is the study of disordered physiological processes associated with disease or injury.",
      "INCORRECT: It applies to all clinical fields, not just surgery.",
      "INCORRECT: Lab values are critical evidence of pathophysiology."
    ],
    emotion: "serious", costume: "casual" 
  }
];


// NPC steps are STRICTLY narrative-accurate. Only characters physically present in the scene.
// Home alone / solo scenes = Alfie only (no NPCs). Clinic = Dr. Rao when teaching. Taco Bell = Belinda when working.
export const MODULE1_NPC_DATA = [
  { id: 'belinda', name: 'BELINDA', color: '#ffff00', steps: [3, 4, 13, 19, 24, 27, 35], image: 'https://rosebud.ai/assets/belinda-v2-sprite.webp?VrWo' },
  { id: 'rao', name: 'DR. RAO', color: '#00ff41', steps: [6, 7, 8, 10, 11, 12, 16, 17, 18, 20, 21, 22, 23, 25, 26, 30, 31, 33, 37, 38, 39, 40, 41, 42], image: 'https://rosebud.ai/assets/dr-rao-character.png.webp?REEF' }
];

export const MODULE1_WORLD_LOCATIONS = [
  { id: 'festival', x: 500, label: 'FESTIVAL STAGE', interior: 'Backstage Area' },
  { id: 'home', x: 1200, label: 'ALFIE\'S HOME', interior: 'Living Room' },
  { id: 'tacobell', x: 1600, label: 'TACO BELL', interior: 'Kitchen & Counter' },
  { id: 'mcdonalds', x: 2500, label: 'McDONALD\'S', interior: 'Soda Station' },
  { id: 'clinic', x: 3800, label: 'MODALI CLINIC', interior: 'Exam Room' }
];
