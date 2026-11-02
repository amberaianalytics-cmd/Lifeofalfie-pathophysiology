// ADITLOA Module 5 — GI / HEPATIC / PANCREATIC CRISIS

export const MOD5_DATABASE = [
  {
    id: 'gerd',
    name: 'GERD',
    category: 'gi',
    chain: [
      { type: 'etiology', label: 'LES Incompetence', detail: 'Lower esophageal sphincter fails to close properly.' },
      { type: 'mechanism', label: 'Acid Reflux', detail: 'Gastric contents move retrograde into the esophagus.' },
      { type: 'structural', label: 'Mucosal Erosion', detail: 'Esophageal lining is damaged by stomach acid.' },
      { type: 'physiologic', label: 'Inflammation', detail: 'Cytokine release and cellular damage in the esophagus.' },
      { type: 'symptoms', label: 'Pyrosis (Heartburn)', detail: 'Burning sensation in the chest, worse after meals.' },
      { type: 'diagnostics', label: 'pH Monitoring', detail: 'Measuring esophageal acidity over 24 hours.' },
      { type: 'complication', label: 'Barrett\'s Esophagus', detail: 'Metaplasia of esophageal cells, increasing cancer risk.' }
    ],
    scenarios: [
        {
            symptoms: "Patient reports a burning sensation in his chest that gets worse when he lies down at night.",
            vitals: { bp: '120/80', hr: 70, spo2: 99, temp: 98.6 },
            clues: ["History: Chronic cough", "Reports 'sour taste' in mouth"],
            interventions: [
                { label: 'PPIs & Elevate HOB', correct: true, feedback: 'CORRECT. Proton pump inhibitors reduce acid production.' },
                { label: 'Large meal before bed', correct: false, feedback: 'INCORRECT. Large meals and lying flat are major triggers.' }
            ]
        }
    ]
  },
  {
    id: 'cirrhosis',
    name: 'Cirrhosis',
    category: 'hepatic',
    chain: [
      { type: 'etiology', label: 'Chronic Injury', detail: 'Long-term damage from Alcohol, Hepatitis, or NAFLD.' },
      { type: 'mechanism', label: 'Fibrosis', detail: 'Healthy liver tissue is replaced by non-functional scar tissue.' },
      { type: 'structural', label: 'Nodular Regeneration', detail: 'Liver attempts to repair itself, forming disorganized nodules.' },
      { type: 'physiologic', label: 'Portal Hypertension', detail: 'Scarring blocks blood flow through the liver, increasing pressure.' },
      { type: 'symptoms', label: 'Ascites & Jaundice', detail: 'Fluid in the abdomen and yellowing of the skin/eyes.' },
      { type: 'diagnostics', label: 'Liver Biopsy', detail: 'The definitive test for staging liver fibrosis.' },
      { type: 'complication', label: 'Esophageal Varices', detail: 'Dilation of esophageal veins due to portal back-pressure; high rupture risk.' }
    ],
    scenarios: [
        {
            symptoms: "Patient with history of alcoholism presents with a distended abdomen and yellowing of the sclera.",
            vitals: { bp: '110/70', hr: 88, spo2: 96, temp: 98.6 },
            clues: ["Exam: Caput medusae present", "Labs: Elevated AST/ALT and PT/INR"],
            interventions: [
                { label: 'Lactulose & Low Sodium', correct: true, feedback: 'CORRECT. Lactulose treats encephalopathy; low sodium manages ascites.' },
                { label: 'High Protein Diet', correct: false, feedback: 'INCORRECT. High protein can worsen hepatic encephalopathy.' }
            ]
        }
    ]
  },
  {
    id: 'pancreatitis',
    name: 'Acute Pancreatitis',
    category: 'pancreatic',
    chain: [
      { type: 'etiology', label: 'Gallstones / Alcohol', detail: 'Blockage of the pancreatic duct or direct toxic injury.' },
      { type: 'mechanism', label: 'Autodigestion', detail: 'Pancreatic enzymes activate early within the pancreas itself.' },
      { type: 'structural', label: 'Acinar Cell Injury', detail: 'The actual secretory cells of the pancreas are destroyed.' },
      { type: 'physiologic', label: 'Systemic Inflammation', detail: 'Release of cytokines can lead to ARDS and multi-organ failure.' },
      { type: 'symptoms', label: 'Epigastric Pain (Radiates to Back)', detail: 'Severe, constant pain often relieved by leaning forward.' },
      { type: 'diagnostics', label: 'Elevated Lipase (>3x Normal)', detail: 'Lipase is more specific than Amylase for pancreatic injury.' },
      { type: 'complication', label: 'Hypocalcemia', detail: 'Fat necrosis binds calcium, lowering systemic levels.' }
    ],
    scenarios: [
        {
            symptoms: "Patient presents with severe epigastric pain that 'bores' through to her back. She is nauseous and vomiting.",
            vitals: { bp: '100/60', hr: 110, spo2: 95, temp: 100.4 },
            clues: ["History: Gallstones", "Lipase: 2,500 (Very High)"],
            interventions: [
                { label: 'NPO & IV Fluids', correct: true, feedback: 'CORRECT. Resting the pancreas and aggressive hydration are vital.' },
                { label: 'Immediate Fatty Meal', correct: false, feedback: 'INCORRECT. Fat stimulates pancreatic enzymes, worsening autodigestion.' }
            ]
        }
    ]
  }
];

export const MODULE5_RIG_METADATA = (MOD5_DATABASE || []).map(d => ({ id: d.id, label: d.name }));
export const MODULE5_QUIZ_DATA = (MOD5_DATABASE || []).map(d => ({ q: `What is the hallmark mechanism of ${d.name}?`, opts: [d.chain[1].label, 'Normal digestion', 'Muscle strain', 'Nerve damage'], ans: 0, rationales: [d.chain[1].detail, 'Incorrect', 'Incorrect', 'Incorrect'] }));
export const MODULE5_CLINICAL_SUMMARIES = (MOD5_DATABASE || []).reduce((acc, d) => { acc[d.id] = { mechanism: d.chain[1].detail, pearl: d.chain[6].detail, visual: d.name }; return acc; }, {});
export const MODULE5_PATHOPHYSIOLOGY_DATA = (MOD5_DATABASE || []).map(d => ({ act: "Module 5: GI Crisis", event: d.name, location: "emergency_room", beats: [{ text: d.name, speaker: 'alfie' }], q: `Hallmark of ${d.name}?`, opts: [d.chain[5].label, 'No symptoms', 'Clear lungs', 'Normal HR'], ans: 0, rationales: [d.chain[5].detail, 'Incorrect', 'Incorrect', 'Incorrect'] }));
export const MODULE5_NPC_DATA = [
  { id: 'dr_rodriguez', name: 'Dr. Sofia Rodriguez', image: 'assets/belinda-curvy-sprite.webp', steps: [0, 1] },
  { id: 'nurse_chen', name: 'Wei Chen, NP', image: 'assets/maya-tall-sprite.webp', steps: [2] }
];
export const MODULE5_WORLD_LOCATIONS = [{ id: 'emergency_room', label: 'WESTBRIDGE GI EMERGENCY', interior: 'https://rosebud.ai/assets/westbridge-emergency-trauma.webp?8ACj' }];
export const MOD5_STORY_SCENARIOS = [
  {
    id: 'story_gi_1',
    title: 'The Fiery Reflux',
    instructor: 'dr_rodriguez',
    location: 'emergency_room',
    beats: [
      { text: "Welcome to the GI unit. We have a patient who thinks he's having a heart attack, but the EKG is clear.", speaker: 'dr_rodriguez' },
      { text: "It's classic Pyrosis—heartburn. The Lower Esophageal Sphincter is incompetent, allowing acid to leak upwards.", speaker: 'dr_rodriguez' },
      { text: "Alfie here. If this continues, the esophageal cells will change to mimic intestinal cells. We call that Barrett's Esophagus. High cancer risk!", speaker: 'alfie' },
      { text: "Management focus: PPIs to block acid and gravity to keep it down. Elevate that head of bed!", speaker: 'dr_rodriguez' }
    ],
    diseaseId: 'gerd'
  },
  {
    id: 'story_gi_2',
    title: 'The Silent Sclera',
    instructor: 'nurse_chen',
    location: 'emergency_room',
    beats: [
      { text: "Take a look at this patient's eyes, Operator. They're yellow—icterus.", speaker: 'nurse_chen' },
      { text: "The liver is fibrosing. Scar tissue is replacing healthy hepatocytes. This causes Portal Hypertension.", speaker: 'nurse_chen' },
      { text: "Warning: Blood is backing up. We're seeing 'Caput Medusae' on the abdomen—dilated veins trying to bypass the scarred liver.", speaker: 'alfie' },
      { text: "We need to monitor for Esophageal Varices. If they rupture, it's a massive upper GI bleed emergency.", speaker: 'nurse_chen' }
    ],
    diseaseId: 'cirrhosis'
  },
  {
    id: 'story_gi_3',
    title: 'The RUQ Storm',
    instructor: 'dr_rodriguez',
    location: 'emergency_room',
    beats: [
      { text: "Severe epigastric pain radiating to the back. The patient is leaning forward to find relief.", speaker: 'dr_rodriguez' },
      { text: "This is Acute Pancreatitis. The enzymes are activating inside the pancreas itself. It's literally digesting itself.", speaker: 'dr_rodriguez' },
      { text: "Analyzing Lipase levels... they are over 3 times the normal limit. Systemic inflammation is imminent.", speaker: 'alfie' },
      { text: "NPO is mandatory. We cannot stimulate those acinar cells further. Aggressive IVF hydration is our priority.", speaker: 'dr_rodriguez' }
    ],
    diseaseId: 'pancreatitis'
  },
  {
    id: 'story_gi_4',
    title: 'The Abdominal Siege',
    instructor: 'nurse_chen',
    location: 'emergency_room',
    beats: [
      { text: "A patient with sudden, high-intensity pain in the RLQ. Rebound tenderness is positive.", speaker: 'nurse_chen' },
      { text: "Could be Appendicitis. Obstruction of the lumen leads to bacterial overgrowth and mounting intraluminal pressure.", speaker: 'nurse_chen' },
      { text: "Scan result: Wall is thinning. High risk of perforation leading to peritonitis—a full system-wide infection.", speaker: 'alfie' },
      { text: "Prepare for surgery. We need to remove the source before it ruptures and dumps bacteria into the sterile peritoneum.", speaker: 'nurse_chen' }
    ],
    diseaseId: 'appendicitis'
  }
];

export const MOD5_GAME_MODES = [
    { id: 'gi_ed', name: 'GI Emergency', icon: '🚑', description: 'Differential simulation: Abdominal pain in the ED.' },
    { id: 'portal_sim', name: 'Portal Hypertension Lab', icon: '🩺', description: 'Mechanism drill: Visual portal backup and complication tracker.' },
    { id: 'acid_wars', name: 'Acid Wars Lab', icon: '🧪', description: 'Simulator: GERD to PUD progression and mucosal protection.' },
    { id: 'hep_tracker', name: 'Hepatitis Lab', icon: '📉', description: 'Activity: Differentiate Hepatitis A, B, and C transmission/mechanisms.' },
    { id: 'pancreas_collapse', name: 'Pancreatic Lab', icon: '💥', description: 'Drill: Autodigestion mechanisms and systemic inflammation.' },
    { id: 'gi_bleed', name: 'GI Bleed Lab', icon: '🩸', description: 'Simulation: Differentiate Upper vs Lower GI bleeds and management.' }
];

export const MOD5_HEP_DATA = [
  {
    q: "Which form of Hepatitis is primarily transmitted via the fecal-oral route?",
    opts: ["Hepatitis A", "Hepatitis B", "Hepatitis C", "Hepatitis D"],
    ans: 0,
    rationales: ["Correct. Hep A (and E) are 'ends of the alphabet' and transmitted via fecal-oral contamination.", "Incorrect. Hep B is transmitted via blood, semen, and other body fluids.", "Incorrect. Hep C is primarily transmitted via blood (IV drug use, transfusions before 1992).", "Incorrect. Hep D requires a co-infection with Hep B and follows the same routes."]
  },
  {
    q: "Chronic infection leading to cirrhosis is most commonly associated with which form?",
    opts: ["Hepatitis C", "Hepatitis A", "Hepatitis E", "Toxic Hepatitis (Acetaminophen)"],
    ans: 0,
    rationales: ["Correct. Hep C has a high rate of chronicity (up to 80%) leading to long-term liver scarring.", "Incorrect. Hep A is acute and usually self-limiting; it doesn't cause chronic cirrhosis.", "Incorrect. Hep E is typically acute, though it can be dangerous in pregnant women.", "Incorrect. Acetaminophen causes acute liver failure, not typically the slow progression of chronic viral cirrhosis."]
  }
];

export const MOD5_BLEED_DATA = [
  {
    q: "A patient presents with 'coffee-ground' emesis. Where is the most likely source?",
    opts: ["Upper GI (Stomach/Esophagus)", "Lower GI (Colon)", "Biliary tree", "Pancreatic duct"],
    ans: 0,
    rationales: ["Correct. Coffee-ground emesis indicates blood that has been partially digested by stomach acid, signifying an Upper GI source.", "Incorrect. Lower GI bleeds typically present as hematochezia (bright red blood per rectum).", "Incorrect. Biliary issues usually cause jaundice or pain, not coffee-ground emesis.", "Incorrect. Pancreatic issues rarely cause direct emesis of blood."]
  },
  {
    q: "What is the hallmark sign of a massive Lower GI bleed?",
    opts: ["Hematochezia", "Melena", "Hematemesis", "Pyrosis"],
    ans: 0,
    rationales: ["Correct. Hematochezia is the passage of fresh, bright red blood from the rectum, typical of Lower GI sources.", "Incorrect. Melena (black, tarry stool) is more characteristic of slow Upper GI bleeds.", "Incorrect. Hematemesis is vomiting of blood (Upper GI).", "Incorrect. Pyrosis is heartburn."]
  }
];
