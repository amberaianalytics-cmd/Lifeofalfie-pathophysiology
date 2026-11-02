// ADITLOA Module 6 — ENDOCRINE / DIABETES / NEURO

export const MOD6_DATABASE = [
  {
    id: 'dm_type1',
    name: 'Type 1 Diabetes',
    category: 'endocrine',
    chain: [
      { type: 'etiology', label: 'Autoimmune Destruction', detail: 'T-cells destroy pancreatic beta cells.' },
      { type: 'mechanism', label: 'Absolute Insulin Deficiency', detail: 'No insulin produced; glucose cannot enter cells.' },
      { type: 'structural', label: 'Islet Cell Loss', detail: 'The actual insulin-producing regions of the pancreas are gone.' },
      { type: 'physiologic', label: 'Hyperglycemia & Ketogenesis', detail: 'Cells starve amidst plenty; body breaks down fat for fuel.' },
      { type: 'symptoms', label: '3 Ps: Polyuria, Polydipsia, Polyphagia', detail: 'Excessive urination, thirst, and hunger.' },
      { type: 'diagnostics', label: 'Islet Autoantibodies', detail: 'Presence of antibodies against beta cell components.' },
      { type: 'complication', label: 'Diabetic Ketoacidosis (DKA)', detail: 'Life-threatening accumulation of ketones and severe acidosis.' }
    ],
    scenarios: [
        {
            symptoms: "A 12yo boy presents with extreme thirst, frequent urination, and unexplained weight loss. His breath smells fruity.",
            vitals: { bp: '100/60', hr: 115, spo2: 98, temp: 98.6 },
            clues: ["Blood Glucose: 450", "Urine: Positive for Ketones"],
            interventions: [
                { label: 'Regular Insulin & IV Fluids', correct: true, feedback: 'CORRECT. Essential for resolving hyperglycemia and ketoacidosis.' },
                { label: 'Give Oral Glucagon', correct: false, feedback: 'INCORRECT. Glucagon raises blood sugar; this patient is already severely hyperglycemic.' }
            ]
        }
    ]
  },
  {
    id: 'stroke_ischemic',
    name: 'Ischemic Stroke',
    category: 'neuro',
    chain: [
      { type: 'etiology', label: 'Thrombosis / Embolism', detail: 'A blood clot blocks an artery in the brain.' },
      { type: 'mechanism', label: 'Ischemic Cascade', detail: 'Loss of blood flow leads to ATP failure and glutamate toxicity.' },
      { type: 'structural', label: 'Cytotoxic Edema', detail: 'Cells swell and die within minutes of total ischemia.' },
      { type: 'physiologic', label: 'Infarction Core', detail: 'An area of irreversible brain tissue death.' },
      { type: 'symptoms', label: 'Sudden Unilateral Weakness', detail: 'Face drooping, arm weakness, speech difficulty (FAST).' },
      { type: 'diagnostics', label: 'Non-contrast CT Brain', detail: 'Essential to rule out hemorrhage before starting tPA.' },
      { type: 'complication', label: 'Ischemic Penumbra', detail: 'Potentially salvageable tissue surrounding the core infarction.' }
    ],
    scenarios: [
        {
            symptoms: "Patient sudden onset of right-sided facial droop and inability to speak. Occurred 45 minutes ago.",
            vitals: { bp: '170/95', hr: 80, spo2: 96, temp: 98.6 },
            clues: ["CT Head: Negative for blood", "History: Atrial Fibrillation"],
            interventions: [
                { label: 'tPA (Thrombolytics)', correct: true, feedback: 'CORRECT. Dissolves the clot to restore perfusion within the window.' },
                { label: 'Give Aspirin 325mg immediately', correct: false, feedback: 'INCORRECT. While antiplatelets are used later, the priority is tPA screening if within the time window.' }
            ]
        }
    ]
  },
  {
    id: 'hyperthyroidism',
    name: 'Hyperthyroidism (Graves)',
    category: 'endocrine',
    chain: [
      { type: 'etiology', label: 'TSH Receptor Antibodies', detail: 'Antibodies (TSI) stimulate the thyroid gland directly.' },
      { type: 'mechanism', label: 'Excess T3/T4', detail: 'Hyper-secretion of thyroid hormones into the bloodstream.' },
      { type: 'structural', label: 'Diffuse Goiter', detail: 'The thyroid gland becomes enlarged and hyper-vascular.' },
      { type: 'physiologic', label: 'Hypermetabolic State', detail: 'Increased basal metabolic rate and sympathetic activity.' },
      { type: 'symptoms', label: 'Tachycardia & Exophthalmos', detail: 'Fast heart rate and bulging eyes.' },
      { type: 'diagnostics', label: 'Low TSH / High Free T4', detail: 'Negative feedback loop: high T4 suppresses TSH.' },
      { type: 'complication', label: 'Thyroid Storm', detail: 'Life-threatening extreme hypermetabolic crisis.' }
    ],
    scenarios: [
        {
            symptoms: "Patient reports weight loss despite increased appetite, heat intolerance, and palpitations.",
            vitals: { bp: '150/70', hr: 125, spo2: 99, temp: 99.1 },
            clues: ["Exam: Resting tremor", "Labs: TSH 0.01 (Very Low)"],
            interventions: [
                { label: 'Methimazole & Beta Blockers', correct: true, feedback: 'CORRECT. Methimazole blocks hormone synthesis; Beta blockers treat symptoms.' },
                { label: 'Give Levothyroxine', correct: false, feedback: 'INCORRECT. Levothyroxine is T4 replacement for Hypothyroidism; it will worsen Hyperthyroidism.' }
            ]
        }
    ]
  }
];

export const MODULE6_RIG_METADATA = (MOD6_DATABASE || []).map(d => ({ id: d.id, label: d.name }));
export const MODULE6_QUIZ_DATA = (MOD6_DATABASE || []).map(d => ({ q: `Mechanism of ${d.name}?`, opts: [d.chain[1].label, 'Normal feedback', 'Cold exposure', 'Dehydration'], ans: 0, rationales: [d.chain[1].detail, 'Incorrect', 'Incorrect', 'Incorrect'] }));
export const MODULE6_CLINICAL_SUMMARIES = (MOD6_DATABASE || []).reduce((acc, d) => { acc[d.id] = { mechanism: d.chain[1].detail, pearl: d.chain[6].detail, visual: d.name }; return acc; }, {});
export const MODULE6_PATHOPHYSIOLOGY_DATA = (MOD6_DATABASE || []).map(d => ({ act: "Module 6: Endocrine/Neuro", event: d.name, location: "intensive_care_unit", beats: [{ text: d.name, speaker: 'alfie' }], q: `Key diagnostic for ${d.name}?`, opts: [d.chain[5].label, 'No symptoms', 'Clear lungs', 'Normal HR'], ans: 0, rationales: [d.chain[5].detail, 'Incorrect', 'Incorrect', 'Incorrect'] }));
export const MODULE6_NPC_DATA = [
  { id: 'dr_patel', name: 'Dr. Aarav Patel', image: 'assets/kenji-stocky-sprite.webp', steps: [0] },
  { id: 'dr_goldstein', name: 'Dr. Sarah Goldstein', image: 'assets/belinda-curvy-sprite.webp', steps: [1, 2] }
];
export const MODULE6_WORLD_LOCATIONS = [{ id: 'intensive_care_unit', label: 'WESTBRIDGE NEURO ICU', interior: 'assets/hospital-icu-interior.webp' }];
export const MOD6_STORY_SCENARIOS = [
  {
    id: 'story_endo_1',
    title: 'The Thirsty Boy',
    instructor: 'dr_patel',
    location: 'intensive_care_unit',
    beats: [
      { text: "Dr. Patel here. We have a young patient in DKA. He's been drinking water non-stop and losing weight.", speaker: 'dr_patel' },
      { text: "This is Type 1 Diabetes. An autoimmune destruction of the beta cells. There is zero insulin production.", speaker: 'dr_patel' },
      { text: "Alfie's scan: Blood glucose is 450. Without insulin, the cells are starving. The body is breaking down fat, producing acidic ketones.", speaker: 'alfie' },
      { text: "We need regular insulin and isotonic fluids immediately to stabilize the pH and lower the glucose level.", speaker: 'dr_patel' }
    ],
    diseaseId: 'dm_type1'
  },
  {
    id: 'story_neuro_1',
    title: 'The Sudden Droop',
    instructor: 'dr_goldstein',
    location: 'intensive_care_unit',
    beats: [
      { text: "Time is Brain, Operator. This patient just lost the ability to move her right side and speak.", speaker: 'dr_goldstein' },
      { text: "An ischemic stroke. A clot has blocked a cerebral artery. Every minute, millions of neurons die.", speaker: 'dr_goldstein' },
      { text: "FAST protocol initiated. CT scan is clear of blood. We are in the window for tPA—the clot buster.", speaker: 'alfie' },
      { text: "Priority is restoring perfusion to the 'penumbra'—the salvageable brain tissue surrounding the dead core.", speaker: 'dr_goldstein' }
    ],
    diseaseId: 'stroke_ischemic'
  },
  {
    id: 'story_endo_2',
    title: 'The Butterfly Effect',
    instructor: 'dr_patel',
    location: 'intensive_care_unit',
    beats: [
      { text: "This patient is revving like a car engine with no brakes. Heart rate is 130, and she can't tolerate any heat.", speaker: 'dr_patel' },
      { text: "Graves' Disease. Antibodies are mimicking TSH and telling the thyroid to dump hormones non-stop.", speaker: 'dr_patel' },
      { text: "Notice the 'Exophthalmos'—bulging eyes. The hypermetabolic state is putting the heart at extreme risk.", speaker: 'alfie' },
      { text: "We'll use Methimazole to block hormone synthesis and Beta-Blockers to calm the sympathetic storm.", speaker: 'dr_patel' }
    ],
    diseaseId: 'hyperthyroidism'
  },
  {
    id: 'story_neuro_2',
    title: 'The Signal Failure',
    instructor: 'dr_goldstein',
    location: 'intensive_care_unit',
    beats: [
      { text: "A patient presenting with ascending paralysis. It started in the feet and is moving up to the chest.", speaker: 'dr_goldstein' },
      { text: "Guillain-Barré Syndrome. An autoimmune attack on the myelin sheath of the peripheral nerves.", speaker: 'dr_goldstein' },
      { text: "Warning: Myelin loss leads to 'segmental demyelination'. Signal conduction is slowing or stopping entirely.", speaker: 'alfie' },
      { text: "Watch the respiratory effort. If the paralysis reaches the diaphragm, we'll need mechanical ventilation.", speaker: 'dr_goldstein' }
    ],
    diseaseId: 'gbs'
  }
];

export const MOD6_GAME_MODES = [
    { id: 'diabetes_collapse', name: 'Metabolic Lab', icon: '🍭', description: 'Mechanism drill: Glucose and ketone stabilization in DKA.' },
    { id: 'stroke_timeline', name: 'Stroke Timeline', icon: '⌛', description: 'Visual simulator: Track ischemic progression and the FAST protocol.' },
    { id: 'hormone_command', name: 'Hormone Command', icon: '📡', description: 'Feedback loop activity: Master Endocrine regulation chains.' },
    { id: 'signal_breakdown', name: 'Signal Breakdown Lab', icon: '⚡', description: 'Nerve activity: MS, GBS, and MG conduction failure mechanisms.' },
    { id: 'seizure_lab', name: 'Seizure Control', icon: '🧠', description: 'Simulation: EEG patterns and focal vs generalized seizure mechanisms.' },
    { id: 'neuro_icu', name: 'Neuro ICU', icon: '🏥', description: 'Differential simulation: Rapidly identify neuro deterioration causes.' }
];

export const MOD6_HORMONE_DATA = [
  {
    q: "In Hypothyroidism (Hashimoto), what is the expected feedback response of TSH?",
    opts: ["High TSH", "Low TSH", "Normal TSH", "Fluctuating TSH"],
    ans: 0,
    rationales: ["Correct. Because T3/T4 are low, the anterior pituitary releases more TSH to try and stimulate the failing gland.", "Incorrect. Low TSH is seen in Hyperthyroidism where high T3/T4 suppresses TSH via negative feedback.", "Incorrect. TSH should be elevated in primary hypothyroidism.", "Incorrect. TSH levels in primary hypothyroidism are consistently elevated."]
  },
  {
    q: "Cushing's Syndrome is characterized by an excess of which hormone?",
    opts: ["Cortisol", "Insulin", "ADH", "Aldosterone"],
    ans: 0,
    rationales: ["Correct. Cushing's is hypercortisolism, leading to weight gain, 'moon face', and hyperglycemia.", "Incorrect. Insulin excess causes hypoglycemia.", "Incorrect. ADH excess causes SIADH.", "Incorrect. Aldosterone excess causes Conn's Syndrome (hypertension/hypokalemia)."]
  }
];

export const MOD6_SIGNAL_DATA = [
  {
    q: "Multiple Sclerosis (MS) involves an autoimmune attack on myelin in which system?",
    opts: ["Central Nervous System (CNS)", "Peripheral Nervous System (PNS)", "Enteric Nervous System", "Autonomic Nervous System only"],
    ans: 0,
    rationales: ["Correct. MS specifically targets CNS myelin (brain and spinal cord).", "Incorrect. Autoimmune attack on PNS myelin is characteristic of Guillain-Barré Syndrome.", "Incorrect. The enteric system involves GI regulation.", "Incorrect. While the ANS can be involved, MS is defined by CNS demyelination."]
  },
  {
    q: "What is the hallmark mechanism of Myasthenia Gravis?",
    opts: ["Antibody destruction of ACh receptors", "Loss of dopamine in the substantia nigra", "Myelin sheath destruction", "Amyloid plaque accumulation"],
    ans: 0,
    rationales: ["Correct. MG involves antibodies blocking or destroying Acetylcholine receptors at the neuromuscular junction.", "Incorrect. This is the mechanism for Parkinson's Disease.", "Incorrect. This is the mechanism for MS or GBS.", "Incorrect. This is characteristic of Alzheimer's Disease."]
  }
];
