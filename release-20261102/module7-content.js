// ADITLOA Module 7 — RENAL & GU PATHOPHYSIOLOGY
// Version 1.0.0 — Block 2 Renal & Reproductive

export const MOD7_DATABASE = [
  // --- RENAL CORE ---
  {
    id: 'aki_prerenal',
    name: 'Prerenal AKI',
    category: 'renal',
    highYield: true,
    chain: [
      { type: 'cause', label: 'Hypoperfusion', detail: 'Decreased blood flow to the kidney due to shock, dehydration, or HF.' },
      { type: 'mechanism', label: 'Decreased GFR', detail: 'Lowered hydrostatic pressure in the glomerulus reduces filtration rate.' },
      { type: 'structural', label: 'Intact Nephrons', detail: 'The kidney structure is initially normal; the problem is "before" the kidney.' },
      { type: 'functional', label: 'RAAS Activation', detail: 'Kidneys conserve salt and water to restore systemic volume.' },
      { type: 'clinical', label: 'Oliguria', detail: 'Sudden drop in urine output (<0.5 mL/kg/hr).' },
      { type: 'lab', label: 'BUN:Cr > 20:1 / FeNa < 1%', detail: 'High urea reabsorption and efficient sodium conservation.' },
      { type: 'complication', label: 'Ischemic ATN', detail: 'Prolonged hypoperfusion leads to actual structural damage (Intrarenal).' }
    ],
    scenarios: [
        {
            symptoms: "Patient with severe diarrhea for 3 days has dry mouth and BP of 90/60. Urine output is 10mL in 4 hours.",
            vitals: { bp: '90/60', hr: 115, spo2: 98, temp: 98.6 },
            clues: ["BUN: 45 (High)", "Creatinine: 1.5 (Slightly High)", "FeNa: 0.5%"],
            interventions: [
                { label: 'Isotonic IV Fluids', correct: true, feedback: 'CORRECT. Restoring volume reverses the prerenal state.' },
                { label: 'Give Furosemide (Lasix)', correct: false, feedback: 'INCORRECT. Diuretics will worsen the volume depletion and hypoperfusion.' }
            ]
        }
    ]
  },
  {
    id: 'atn_intrarenal',
    name: 'Acute Tubular Necrosis (ATN)',
    category: 'renal',
    highYield: true,
    chain: [
      { type: 'cause', label: 'Ischemia / Nephrotoxins', detail: 'Prolonged shock or drugs (Aminoglycosides, Contrast) damage tubules.' },
      { type: 'mechanism', label: 'Tubular Cell Death', detail: 'Epithelial cells necrose and slough off into the lumen.' },
      { type: 'structural', label: 'Cylindrical Casts', detail: 'Dead cells clump together, forming "muddy brown" casts.' },
      { type: 'functional', label: 'Lumen Obstruction', detail: 'Casts block the tubule, increasing back-pressure and stopping GFR.' },
      { type: 'clinical', label: 'Fixed Specific Gravity', detail: 'Kidney loses the ability to concentrate or dilute urine.' },
      { type: 'lab', label: 'FeNa > 2% / Muddy Brown Casts', detail: 'The damaged kidney cannot reabsorb sodium.' },
      { type: 'complication', label: 'Hyperkalemia / Metabolic Acidosis', detail: 'Loss of electrolyte and acid-base regulation.' }
    ],
    scenarios: [
        {
            symptoms: "Patient post-septic shock has rising Creatinine despite normal BP now. Urine is dark.",
            vitals: { bp: '122/75', hr: 80, spo2: 96, temp: 98.6 },
            clues: ["Microscopy: Muddy brown granular casts", "FeNa: 3.2%"],
            interventions: [
                { label: 'Fluid Balance & Monitor K+', correct: true, feedback: 'CORRECT. Management is supportive while tubules regenerate.' },
                { label: 'Give IV Gentamicin', correct: false, feedback: 'INCORRECT. Gentamicin is nephrotoxic and could worsen ATN.' }
            ]
        }
    ]
  },
  {
    id: 'nephrotic_syndrome_classic',
    name: 'Nephrotic Syndrome',
    category: 'renal',
    highYield: true,
    chain: [
      { type: 'cause', label: 'Podocyte Injury', detail: 'Damage to the filtration slits (e.g., Minimal Change, Diabetes).' },
      { type: 'mechanism', label: 'Massive Proteinuria', detail: 'Loss of >3.5g of protein per day in the urine.' },
      { type: 'structural', label: 'Hypoalbuminemia', detail: 'Liver cannot keep up with the massive loss of albumin.' },
      { type: 'functional', label: 'Low Oncotic Pressure', detail: 'Fluid leaks out of the vessels because albumin is missing.' },
      { type: 'clinical', label: 'Anasarca (Full Body Edema)', detail: 'Severe swelling, especially periorbital and pretibial.' },
      { type: 'lab', label: 'Hyperlipidemia / Fatty Casts', detail: 'Liver makes extra lipids to compensate for low protein.' },
      { type: 'complication', label: 'Hypercoagulability', detail: 'Loss of Antithrombin III in urine increases clot risk.' }
    ],
    scenarios: [
        {
            symptoms: "A 6yo child has puffy eyes and swollen ankles. Mother says his urine looks 'foamy'.",
            vitals: { bp: '105/65', hr: 90, spo2: 99, temp: 98.6 },
            clues: ["Urine Protein: 4+ (Large)", "Albumin: 1.8 (Low)"],
            interventions: [
                { label: 'Steroids (Corticosteroids)', correct: true, feedback: 'CORRECT. Minimal Change Disease is highly steroid-responsive.' },
                { label: 'High Salt Diet', correct: false, feedback: 'INCORRECT. Salt will worsen the profound edema.' }
            ]
        }
    ]
  },
  {
    id: 'nephritic_syndrome_gn',
    name: 'Nephritic Syndrome (GN)',
    category: 'renal',
    highYield: true,
    chain: [
      { type: 'cause', label: 'Immune Complex Deposition', detail: 'Inflammation of the glomerulus (e.g., Post-Strep GN).' },
      { type: 'mechanism', label: 'Glomerular Inflammation', detail: 'Neutrophils and cytokines damage the capillary walls.' },
      { type: 'structural', label: 'RBC Leakage', detail: 'Red blood cells pass through the inflamed, porous basement membrane.' },
      { type: 'functional', label: 'Reduced Surface Area', detail: 'Inflammation clogs the filter, reducing GFR.' },
      { type: 'clinical', label: 'Hematuria & Hypertension', detail: 'Cola-colored urine and fluid retention due to low GFR.' },
      { type: 'lab', label: 'RBC Casts / Dysmorphic RBCs', detail: 'Proof of glomerular bleeding.' },
      { type: 'complication', label: 'Acute Renal Failure', detail: 'Rapidly progressive GN can lead to total kidney shutdown.' }
    ],
    scenarios: [
        {
            symptoms: "A 10yo has 'tea-colored' urine and a headache. He had a sore throat 2 weeks ago.",
            vitals: { bp: '155/95', hr: 85, spo2: 98, temp: 98.6 },
            clues: ["Urine: Red cell casts", "ASO Titer: Positive"],
            interventions: [
                { label: 'BP Control & Sodium Restriction', correct: true, feedback: 'CORRECT. Managing HTN and fluid is key in Post-Strep GN.' },
                { label: 'Push 2L Fluid Bolus', correct: false, feedback: 'INCORRECT. The patient is already hypertensive and fluid overloaded.' }
            ]
        }
    ]
  },
  {
    id: 'ckd_progression',
    name: 'Chronic Kidney Disease',
    category: 'renal',
    chain: [
      { type: 'cause', label: 'Diabetes / HTN', detail: 'Years of hyperfiltration or high pressure scar the nephrons.' },
      { type: 'mechanism', label: 'Glomerulosclerosis', detail: 'Replacement of functional filter units with non-functional scar tissue.' },
      { type: 'structural', label: 'Adaptive Hypertrophy', detail: 'Remaining nephrons work harder, leading to further damage (vicious cycle).' },
      { type: 'functional', label: 'Uremic Syndrome', detail: 'Systemic buildup of nitrogenous waste (BUN) and toxins.' },
      { type: 'clinical', label: 'Pruritus / Uremic Frost', detail: 'Itchy skin and waste crystals on the skin surface.' },
      { type: 'lab', label: 'GFR < 60 for 3+ Months', detail: 'The definition of chronic kidney dysfunction.' },
      { type: 'complication', label: 'Renal Osteodystrophy', detail: 'Bone disease due to low Vit D and high Phosphorus.' }
    ],
    scenarios: [
        {
            symptoms: "Patient with long-term Diabetes has high Phosphorus and low Calcium. Reports bone pain.",
            vitals: { bp: '148/92', hr: 78, spo2: 96, temp: 98.6 },
            clues: ["GFR: 22 (Stage 4)", "Phosphorus: 6.2 (High)"],
            interventions: [
                { label: 'Phosphate Binders', correct: true, feedback: 'CORRECT. Prevents absorption of phosphorus to protect bones.' },
                { label: 'High Protein Diet', correct: false, feedback: 'INCORRECT. Protein breakdown increases uremic waste in CKD.' }
            ]
        }
    ]
  },
  {
    id: 'aki_postrenal',
    name: 'Postrenal AKI',
    category: 'renal',
    chain: [
      { type: 'cause', label: 'BPH / Stones', detail: 'Physical obstruction of urine flow below the level of the kidney.' },
      { type: 'mechanism', label: 'Retrograde Pressure', detail: 'Urine backs up, increasing hydrostatic pressure in Bowman\'s space.' },
      { type: 'structural', label: 'Hydronephrosis', detail: 'Dilation of the renal pelvis and calyces due to pressure.' },
      { type: 'functional', label: 'GFR Collapse', detail: 'Backward pressure equals filtration pressure, stopping the filter.' },
      { type: 'clinical', label: 'Anuria / Pain', detail: 'Sudden total stop of urine flow or intense flank/suprapubic pain.' },
      { type: 'lab', label: 'Post-Void Residual > 100mL', detail: 'Proof that urine is being made but not evacuated.' },
      { type: 'complication', label: 'Irreversible Atrophy', detail: 'Chronic pressure eventually kills the functional kidney tissue.' }
    ],
    scenarios: [
        {
            symptoms: "75yo male with history of BPH has not voided in 12 hours. Lower abdomen is distended and painful.",
            vitals: { bp: '140/90', hr: 95, spo2: 98, temp: 99.0 },
            clues: ["Ultrasound: Bilateral Hydronephrosis", "Bladder: Palpable mass"],
            interventions: [
                { label: 'Emergency Catheterization', correct: true, feedback: 'CORRECT. Relieving the obstruction restores GFR immediately.' },
                { label: 'Aggressive IVF', correct: false, feedback: 'INCORRECT. Adding more fluid to a blocked system will increase pain and pressure.' }
            ]
        }
    ]
  },
  {
    id: 'pyelonephritis_full',
    name: 'Pyelonephritis',
    category: 'renal',
    chain: [
      { type: 'cause', label: 'Ascending UTI', detail: 'Bacteria (usually E. coli) travel from the bladder to the kidneys.' },
      { type: 'mechanism', label: 'Tubulointerstitial Inflammation', detail: 'Bacterial invasion triggers a massive neutrophil response.' },
      { type: 'structural', label: 'Renal Pelvic Edema', detail: 'The kidney becomes swollen and covered in small abscesses.' },
      { type: 'functional', label: 'Temporary GFR Impairment', detail: 'Inflammation slows down normal tubular function.' },
      { type: 'clinical', label: 'CVA Tenderness / Fever', detail: 'Fever, chills, and intense pain when the back is tapped.' },
      { type: 'lab', label: 'WBC Casts in Urine', detail: 'Hallmark finding indicating the infection is in the kidney itself.' },
      { type: 'complication', label: 'Urosepsis', detail: 'Bacteria enter the systemic circulation via the renal vessels.' }
    ],
    scenarios: [
        {
            symptoms: "Young female has 103F fever, shaking chills, and intense right-sided back pain.",
            vitals: { bp: '110/65', hr: 110, spo2: 97, temp: 103.2 },
            clues: ["Urine: Positive Nitrites and Leukocyte Esterase", "Exam: Positive CVA Tenderness"],
            interventions: [
                { label: 'IV Antibiotics & Culture', correct: true, feedback: 'CORRECT. Upper UTI requires aggressive antimicrobial therapy.' },
                { label: 'Heating pad to back only', correct: false, feedback: 'INCORRECT. Pain is secondary to a life-threatening infection.' }
            ]
        }
    ]
  },
  {
    id: 'nephrolithiasis_full',
    name: 'Nephrolithiasis (Stones)',
    category: 'renal',
    chain: [
      { type: 'cause', label: 'Supersaturation', detail: 'High concentration of solutes (Calcium, Oxalate) in urine.' },
      { type: 'mechanism', label: 'Crystal Precipitation', detail: 'Solutes come out of solution and form solid aggregates.' },
      { type: 'structural', label: 'Calculus Formation', detail: 'Aggregates grow into stones, often in the renal pelvis.' },
      { type: 'functional', label: 'Ureteral Peristalsis Obstruction', detail: 'The stone blocks the ureter, causing smooth muscle spasms.' },
      { type: 'clinical', label: 'Renal Colic / Hematuria', detail: 'Excruciating waves of flank pain radiating to the groin.' },
      { type: 'lab', label: 'CT Abdomen/Pelvis (Non-con)', detail: 'Gold standard for visualizing the location and size of stones.' },
      { type: 'complication', label: 'Hydronephrosis / Infection', detail: 'Obstruction leads to pressure buildup and static urine prone to infection.' }
    ],
    scenarios: [
        {
            symptoms: "Patient is rolling on the floor in agony, clutching his left side. Pain comes in waves.",
            vitals: { bp: '150/90', hr: 105, spo2: 98, temp: 98.6 },
            clues: ["Urine: Macroscopic hematuria", "Pain: Radiates to the scrotum"],
            interventions: [
                { label: 'Analgesics & Hydration', correct: true, feedback: 'CORRECT. Pain management and fluid to help pass the stone.' },
                { label: 'Start Heparin', correct: false, feedback: 'INCORRECT. Heparin is an anticoagulant and not indicated for stones.' }
            ]
        }
    ]
  }
];

export const MODULE7_RIG_METADATA = (MOD7_DATABASE || []).map(d => ({ id: d.id, label: d.name }));

export const MODULE7_QUIZ_DATA = (MOD7_DATABASE || []).map(d => ({ 
    q: `Identify the hallmark finding for ${d.name}.`,
    opts: [d.chain?.[5]?.label || 'Lab Finding', 'Normal Exam', 'Hypotension', 'Tachycardia'],
    ans: 0,
    rationales: [d.chain?.[5]?.detail || 'Hallmark finding.', 'Incorrect', 'Incorrect', 'Incorrect']
}));

export const MODULE7_CLINICAL_SUMMARIES = (MOD7_DATABASE || []).reduce((acc, d) => {
    acc[d.id] = { 
        mechanism: d.chain?.[1]?.detail || 'Underlying mechanism.', 
        pearl: d.chain?.[2]?.detail || 'Clinical pearl.', 
        visual: d.chain?.[0]?.label || d.name 
    };
    return acc;
}, {});

export const MODULE7_PATHOPHYSIOLOGY_DATA = (MOD7_DATABASE || []).map(d => ({ 
    act: "Module 7: Renal & Reproductive", 
    day: "N/A", 
    event: d.name, 
    location: "intensive_care_unit",
    beats: [{ text: d.name, speaker: 'alfie', diagram: [] }],
    q: `What is the hallmark of ${d.name}?`,
    opts: [d.chain?.[5]?.label || 'Lab result', 'No symptoms', 'Clear lungs', 'Normal heart rate'],
    ans: 0,
    rationales: [d.chain?.[5]?.detail || 'Key diagnostic finding.', 'Incorrect', 'Incorrect', 'Incorrect']
}));

export const MODULE7_NPC_DATA = [
  { id: 'dr_dragomir', name: 'Dr. Elena Dragomir', image: 'assets/maya-tall-sprite.webp', steps: [0, 1, 2] },
  { id: 'nurse_marcus', name: 'Marcus Washington, RN', image: 'assets/kenji-stocky-sprite.webp', steps: [3, 4, 5] }
];

export const MODULE7_WORLD_LOCATIONS = [
  { id: 'intensive_care_unit', label: 'WESTBRIDGE RENAL UNIT', interior: 'assets/hospital-icu-interior.webp' }
];

export const MOD7_STORY_SCENARIOS = [
  {
    id: 'story_renal_1',
    title: 'The Filter Failure',
    instructor: 'dr_dragomir',
    location: 'intensive_care_unit',
    beats: [
      { text: "Dr. Dragomir here. We have a patient in shock. Their blood pressure is 85/50, and they haven't made a drop of urine in hours.", speaker: 'dr_dragomir' },
      { text: "This is Prerenal AKI. The kidneys are perfectly fine structurally, but they aren't getting the pressure they need to filter.", speaker: 'dr_dragomir' },
      { text: "Alfie's warning: If we don't restore volume soon, the tubular cells will die from ischemia. That's when Prerenal turns into Intrarenal ATN.", speaker: 'alfie' },
      { text: "We need to push an IV fluid bolus. Restoring the mean arterial pressure is the only way to save these nephrons.", speaker: 'dr_dragomir' }
    ],
    diseaseId: 'aki_prerenal'
  },
  {
    id: 'story_renal_2',
    title: 'The Nephrotic Leak',
    instructor: 'dr_dragomir',
    location: 'intensive_care_unit',
    beats: [
      { text: "Look at the swelling in this child's face and ankles. It's called Anasarca.", speaker: 'dr_dragomir' },
      { text: "The filtration barrier is broken. Massive amounts of albumin are leaking into the urine. Without albumin, oncotic pressure drops.", speaker: 'dr_dragomir' },
      { text: "System check: The liver is working overtime to make more protein, but it's also making excess lipids. We'll see 'fatty casts' in the urine.", speaker: 'alfie' },
      { text: "Steroids are our best bet here to stabilize the podocytes and stop the protein leak.", speaker: 'dr_dragomir' }
    ],
    diseaseId: 'nephrotic_syndrome_classic'
  },
  {
    id: 'story_renal_3',
    title: 'The Urinary Blockade',
    instructor: 'nurse_marcus',
    location: 'intensive_care_unit',
    beats: [
      { text: "Marcus here. This elderly gentleman has a distended bladder and is in extreme pain, but he can't void.", speaker: 'nurse_marcus' },
      { text: "Postrenal AKI. Likely a BPH obstruction. The urine is backing up all the way to the kidneys, creating 'Hydronephrosis'.", speaker: 'nurse_marcus' },
      { text: "Alert: Retrograde pressure is equalizing with filtration pressure. GFR has collapsed. We need to catheterize immediately.", speaker: 'alfie' },
      { text: "Relieving the pressure is the priority. If left too long, the chronic pressure will cause irreversible atrophy of the kidney tissue.", speaker: 'nurse_marcus' }
    ],
    diseaseId: 'aki_postrenal'
  },
  {
    id: 'story_renal_4',
    title: 'The Silent Scarring',
    instructor: 'nurse_marcus',
    location: 'intensive_care_unit',
    beats: [
      { text: "A patient with a 20-year history of poorly controlled Diabetes. His Creatinine is slowly rising.", speaker: 'nurse_marcus' },
      { text: "Chronic Kidney Disease. High glucose levels have caused glomerulosclerosis—scarring of the filtration units.", speaker: 'nurse_marcus' },
      { text: "System Warning: Remaining nephrons are hyper-filtering to compensate, which actually speeds up their own destruction. It's a vicious cycle.", speaker: 'alfie' },
      { text: "We need to manage the blood pressure and glucose strictly. Once GFR drops below 15, we're looking at dialysis.", speaker: 'nurse_marcus' }
    ],
    diseaseId: 'ckd_progression'
  }
];

export const MOD7_GAME_MODES = [
    { id: 'nephron_defense', name: 'Nephron Defense', icon: '🛡️', description: 'Interactive drill: Balance GFR and perfusion in acute prerenal crisis.' },
    { id: 'renal_cascade', name: 'Renal Cascade Lab', icon: '📉', description: 'Mechanism tracker: Track the progression from AKI to CKD and uremia.' },
    { id: 'stone_runner', name: 'Stone Runner Lab', icon: '💎', description: 'Simulation: Navigate urinary obstructions and handle renal colic.' },
    { id: 'ascending_infection', name: 'Infection Tracker', icon: '🦠', description: 'Drill: Trace ascending UTI to Pyelonephritis and WBC casts.' },
    { id: 'urologic_crisis', name: 'Urologic Emergency', icon: '⚠️', description: 'Activity: Identify and manage BPH and acute urinary retention.' },
    { id: 'renal_arena', name: 'Renal Arena', icon: '⚔️', description: 'Clinical simulation: Differentiate between AKI, CKD, and nephritic states.' }
];

export const MOD7_INFECTION_DATA = [
  {
    q: "A patient with pyelonephritis has WBC casts in their urine. What does this signify?",
    opts: ["The infection is in the kidney parenchyma", "The infection is limited to the bladder", "The patient has a kidney stone", "The patient is severely dehydrated"],
    ans: 0,
    rationales: ["Correct. Casts form in the tubules of the kidney, so their presence proves the inflammation is in the kidney itself.", "Incorrect. Bladder infections (cystitis) show WBCs but not casts.", "Incorrect. Stones cause hematuria, not typically WBC casts unless there is a secondary infection.", "Incorrect. Dehydration might show hyaline casts, but WBC casts are specific for tubulointerstitial inflammation."]
  },
  {
    q: "What is the most common organism responsible for ascending UTIs?",
    opts: ["Escherichia coli (E. coli)", "Staphylococcus aureus", "Klebsiella pneumoniae", "Proteus mirabilis"],
    ans: 0,
    rationales: ["Correct. E. coli from the GI tract is responsible for the vast majority of UTIs.", "Incorrect. S. aureus is more common in hematogenous spread or skin infections.", "Incorrect. While Klebsiella can cause UTIs, E. coli is far more prevalent.", "Incorrect. Proteus is associated with certain types of stones but is less common than E. coli."]
  }
];

export const MOD7_STONE_DATA = [
  {
    q: "Renal colic pain classically radiates to which area?",
    opts: ["Groin/Scrotum", "Shoulder blade", "Right Upper Quadrant", "Lower jaw"],
    ans: 0,
    rationales: ["Correct. As the stone moves down the ureter, the pain typically radiates from the flank to the groin.", "Incorrect. Shoulder pain is more common in gallbladder or diaphragmatic irritation.", "Incorrect. RUQ pain is typical of hepatic or gallbladder issues.", "Incorrect. Jaw pain is characteristic of cardiac ischemia."]
  },
  {
    q: "Which physiologic state promotes the formation of kidney stones?",
    opts: ["Supersaturation of urine", "Excessive hydration", "High urine flow rate", "Alkaline urine (for all stones)"],
    ans: 0,
    rationales: ["Correct. When solutes exceed their solubility in urine, they precipitate into crystals and form stones.", "Incorrect. Hydration prevents stone formation by diluting solutes.", "Incorrect. Stasis, not high flow, promotes stones.", "Incorrect. While some stones form in alkaline urine, others form in acidic urine; supersaturation is the universal driver."]
  }
];
