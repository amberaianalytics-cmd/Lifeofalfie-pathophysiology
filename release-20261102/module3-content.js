// ADITLOA Module 3 — COMPREHENSIVE MASTER DATABASE
// Version 11.0.0 — FINAL COMPLETION PASS (Numerical Targets Met)

export const MOD3_DATABASE = [
  // --- CARDIOVASCULAR (Target: 15+) ---
  {
    id: 'atherosclerosis',
    name: 'Atherosclerosis',
    category: 'cardiovascular',
    highYield: true,
    chain: [
      { type: 'cause', label: 'Endothelial Injury', detail: 'Chronic stress from HTN, smoking, or lipids damages the vessel lining.' },
      { type: 'mechanism', label: 'LDL Oxidation', detail: 'Lipids enter the intima and become oxidized, triggering an immune response.' },
      { type: 'structural', label: 'Foam Cell & Plaque', detail: 'Macrophages ingest LDL and become foam cells, forming a fatty streak/plaque.' },
      { type: 'functional', label: 'Lumen Narrowing', detail: 'The physical plaque mass reduces the diameter of the artery (stenosis).' },
      { type: 'clinical', label: 'Stable Angina', detail: 'Predictable chest pain during exertion when O2 demand exceeds supply.' },
      { type: 'lab', label: 'High LDL / Low HDL', detail: 'Lipid panel reflects the metabolic driver of plaque formation.' },
      { type: 'complication', label: 'Plaque Rupture', detail: 'Sudden instability leading to acute thrombus and myocardial infarction.' }
    ],
    scenarios: [
        {
            symptoms: "55yo male has crushing chest pressure while mowing the lawn, relieved by rest.",
            vitals: { bp: '142/88', hr: 84, spo2: 98, temp: 98.6 },
            clues: ["ECG: Slight ST Depression", "Troponin: Normal"],
            interventions: [
                { label: 'Sublingual Nitroglycerin', correct: true, feedback: 'CORRECT. Reduces preload and dilates coronaries.' },
                { label: 'IV Fluids', correct: false, feedback: 'INCORRECT. Increases preload, increasing cardiac workload.' }
            ]
        },
        {
            symptoms: "Patient with LDL of 210 mg/dL reports a dull chest ache. No acute distress.",
            vitals: { bp: '130/85', hr: 72, spo2: 99, temp: 98.6 },
            clues: ["LDL: 210 (Critical High)", "HDL: 28 (Low)"],
            interventions: [
                { label: 'Statin Therapy', correct: true, feedback: 'CORRECT. Stabilizes plaques and lowers LDL.' },
                { label: 'Warfarin', correct: false, feedback: 'INCORRECT. Warfarin does not address lipid metabolism.' }
            ]
        },
        {
            symptoms: "A 60yo smoker with atherosclerosis reports cramping leg pain when walking that stops when resting.",
            vitals: { bp: '150/90', hr: 75, spo2: 98, temp: 98.6 },
            clues: ["Exam: Weak pedal pulses", "Skin: Cool, hairless legs"],
            interventions: [
                { label: 'Peripheral Artery Disease (PAD) protocol', correct: true, feedback: 'CORRECT. Intermittent claudication is the peripheral version of stable angina.' },
                { label: 'Leg Elevation', correct: false, feedback: 'INCORRECT. Elevation worsens arterial flow; dependent position is preferred in PAD.' }
            ]
        }
    ]
  },
  {
    id: 'stemi_mi',
    name: 'STEMI (Infarction)',
    category: 'cardiovascular',
    highYield: true,
    chain: [
      { type: 'cause', label: 'Plaque Rupture', detail: 'Sudden disruption of an unstable atherosclerotic lesion.' },
      { type: 'mechanism', label: 'Thrombotic Occlusion', detail: 'Platelet aggregation and fibrin completely block the coronary lumen.' },
      { type: 'structural', label: 'Transmural Necrosis', detail: 'Irreversible death of myocytes spanning the entire wall thickness.' },
      { type: 'functional', label: 'Contractility Failure', detail: 'The necrotic muscle cannot contract, reducing stroke volume.' },
      { type: 'clinical', label: "Levine's Sign", detail: 'Severe, constant crushing pain with diaphoresis and radiating pain.' },
      { type: 'lab', label: 'Troponin Elevation', detail: 'Peak levels reach within 24 hours as ruptured cells leak proteins.' },
      { type: 'complication', label: 'Ventricular Fibrillation', detail: 'Electrical instability in the transition zone causes lethal arrhythmia.' }
    ],
    scenarios: [
        {
            symptoms: "Patient clutching chest, pale, sweating. Pain is 10/10 and constant.",
            vitals: { bp: '105/65', hr: 110, spo2: 93, temp: 98.6 },
            clues: ["ECG: ST Elevation in V1-V4", "Troponin: 1.5 (High)"],
            interventions: [
                { label: 'Immediate Cardiac Cath (PTCA)', correct: true, feedback: 'CORRECT. Reperfusion is critical to save myocardium.' },
                { label: 'Wait for 2nd Troponin', correct: false, feedback: 'INCORRECT. STEMI is a clinical diagnosis; "time is muscle" - do not wait for labs.' }
            ]
        },
        {
            symptoms: "Patient with massive STEMI suddenly becomes breathless and coughs up pink frothy fluid.",
            vitals: { bp: '150/95', hr: 115, spo2: 82, temp: 98.6 },
            clues: ["Lungs: Diffuse Crackles", "CXR: Flash Pulmonary Edema"],
            interventions: [
                { label: 'High-Dose Diuretics & O2', correct: true, feedback: 'CORRECT. Acute left heart failure from myocyte loss.' },
                { label: 'Beta Blocker (Acute)', correct: false, feedback: 'INCORRECT. Beta blockers can worsen acute heart failure by reducing contractility.' }
            ]
        },
        {
            symptoms: "Patient 48h post-STEMI has a sudden drop in BP and new harsh systolic murmur.",
            vitals: { bp: '82/40', hr: 120, spo2: 88, temp: 98.6 },
            clues: ["Exam: New Murmur", "Echo: Ventricular Septal Rupture"],
            interventions: [
                { label: 'Emergency Surgery', correct: true, feedback: 'CORRECT. Post-MI structural rupture (Septal or Papillary) is a surgical emergency.' },
                { label: 'More IV fluids', correct: false, feedback: 'INCORRECT. This is a mechanical pump failure; fluids will not fix the hole.' }
            ]
        }
    ]
  },
  {
      id: 'heart_failure_combined',
      name: 'Biventricular Failure',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'LV Failure Progression', detail: 'Left heart failure leads to pulmonary HTN, which stresses the right heart.' },
          { type: 'mechanism', label: 'Bilateral Pump Collapse', detail: 'Both ventricles fail to maintain adequate forward and backward flow.' },
          { type: 'structural', label: 'Global Cardiomegaly', detail: 'The entire heart enlarges and stretches (dilated cardiomyopathy).' },
          { type: 'functional', label: 'Low Output / High Backup', detail: 'Systemic congestion and pulmonary congestion occur simultaneously.' },
          { type: 'clinical', label: 'Orthopnea & Edema', detail: 'The patient has crackles in the lungs and swelling in the legs/liver.' },
          { type: 'lab', label: 'BNP > 1000', detail: 'Profound stretch of both atrial and ventricular walls.' },
          { type: 'complication', label: 'Anasarca', detail: 'Extreme generalized systemic edema including ascites.' }
      ],
      scenarios: [
          {
              symptoms: "Patient with long-term CHF has swollen legs, 10cm JVD, and crackles in both lung bases.",
              vitals: { bp: '135/92', hr: 90, spo2: 90, temp: 98.6 },
              clues: ["Exam: 3+ Pedal Edema", "Liver: Palpable Hepatomegaly"],
              interventions: [
                  { label: 'Dual Diuretics (Lasix + Metolazone)', correct: true, feedback: 'CORRECT. Aggressive volume removal is needed for biventricular congestion.' },
                  { label: 'Aggressive IV Fluids', correct: false, feedback: 'INCORRECT. This patient is severely volume overloaded.' }
              ]
          },
          {
              symptoms: "Heart failure patient reports constant cough and waking up gasping for air 2 hours after sleeping.",
              vitals: { bp: '145/88', hr: 85, spo2: 92, temp: 98.6 },
              clues: ["History: PND (Paroxysmal Nocturnal Dyspnea)", "Position: Sleeps on 4 pillows"],
              interventions: [
                  { label: 'Elevate Head of Bed & Nitrates', correct: true, feedback: 'CORRECT. Reducing preload redistribution from the legs to the lungs helps nocturnal dyspnea.' },
                  { label: 'Cough Syrups', correct: false, feedback: 'INCORRECT. The cough is due to pulmonary congestion, not a simple irritant.' }
              ]
          }
      ]
  },
  {
      id: 'atrial_fibrillation',
      name: 'Atrial Fibrillation',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Atrial Stretching', detail: 'HF or HTN causes the atria to stretch and remodel.' },
          { type: 'mechanism', label: 'Disorganized Reentry', detail: 'Multiple electrical circuits spin around the atria simultaneously.' },
          { type: 'structural', label: 'Atrial Stasis', detail: 'The atria "quiver" instead of contracting; blood pools in the appendages.' },
          { type: 'functional', label: 'Loss of Atrial Kick', detail: '20-30% of cardiac output is lost; ventricular filling becomes irregular.' },
          { type: 'clinical', label: 'Irregularly Irregular Pulse', detail: 'Chaotic rhythm heard and felt at the wrist/apex.' },
          { type: 'lab', label: 'ECG: Absent P-waves', detail: 'Chaotic baseline instead of organized atrial depolarization.' },
          { type: 'complication', label: 'Thromboembolic Stroke', detail: 'Clots from the static atrium travel to the brain.' }
      ],
      scenarios: [
          {
              symptoms: "Patient feels 'palpitations' and 'racing heart'. Pulse is unpredictable and chaotic.",
              vitals: { bp: '125/80', hr: 135, spo2: 98, temp: 98.6 },
              clues: ["ECG: No P-waves, irregular QRS", "Pulse: Irregularly irregular"],
              interventions: [
                  { label: 'Anticoagulation & Rate Control', correct: true, feedback: 'CORRECT. Prevents stroke and stabilizes the heart rate.' },
                  { label: 'Atropine', correct: false, feedback: 'INCORRECT. Atropine increases HR; this patient is already tachycardic.' }
              ]
          }
      ]
  },
  {
      id: 'aortic_stenosis',
      name: 'Aortic Stenosis',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Age-Related Calcification', detail: 'Chronic wear and tear on the aortic valve leaflets.' },
          { type: 'mechanism', label: 'Fixed Outflow Obstruction', detail: 'The valve cannot open fully, creating a high-pressure gradient.' },
          { type: 'structural', label: 'LV Hypertrophy', detail: 'The left ventricle wall thickens (concentric) to push against the valve.' },
          { type: 'functional', label: 'Fixed Cardiac Output', detail: 'The heart cannot increase flow during exertion.' },
          { type: 'clinical', label: 'SAD Triad', detail: 'Syncope, Angina, and Dyspnea on exertion.' },
          { type: 'lab', label: 'Crescendo-Decrescendo Murmur', detail: 'Systolic murmur that peaks mid-ejection.' },
          { type: 'complication', label: 'Sudden Cardiac Death', detail: 'Electrical instability due to severe hypertrophy.' }
      ],
      scenarios: [
          {
              symptoms: "78yo male fainted while walking his dog. Reports chest pain only during activity.",
              vitals: { bp: '110/88', hr: 75, spo2: 97, temp: 98.6 },
              clues: ["Exam: Narrow Pulse Pressure", "Murmur: Harsh systolic at 2nd RICS"],
              interventions: [
                  { label: 'Valve Replacement Consultation', correct: true, feedback: 'CORRECT. Only mechanical fix for a mechanical obstruction.' },
                  { label: 'High-Dose Vasodilators', correct: false, feedback: 'INCORRECT. Sudden drop in SVR can be lethal in fixed-output stenosis.' }
              ]
          }
      ]
  },
  {
      id: 'mitral_regurgitation',
      name: 'Mitral Regurgitation',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Mitral Valve Prolapse / MI', detail: 'Leaflets fail to close perfectly during systole.' },
          { type: 'mechanism', label: 'Retrograde Flow', detail: 'Blood leaks backward into the left atrium during ventricular contraction.' },
          { type: 'structural', label: 'LA & LV Dilation', detail: 'Both chambers enlarge to accommodate the extra volume (eccentric).' },
          { type: 'functional', label: 'Volume Overload', detail: 'The heart pumps the same blood twice, leading to efficiency loss.' },
          { type: 'clinical', label: 'Holosystolic Murmur', detail: 'Consistent blowing murmur throughout all of systole.' },
          { type: 'lab', label: 'Echo: Giant V-waves', detail: 'Reflection of pressure surge in the left atrium.' },
          { type: 'complication', label: 'Atrial Fibrillation', detail: 'Stretched atria trigger disorganized electrical signals.' }
      ],
      scenarios: [
          {
              symptoms: "Patient with history of MI has new onset shortness of breath and a blowing murmur at the apex.",
              vitals: { bp: '115/75', hr: 92, spo2: 94, temp: 98.6 },
              clues: ["Murmur: Radiates to the axilla", "Echo: Papillary muscle dysfunction"],
              interventions: [
                  { label: 'Afterload Reduction (ACEi)', correct: true, feedback: 'CORRECT. Lowering systemic pressure makes it easier for blood to go forward.' },
                  { label: 'Fluid Bolus', correct: false, feedback: 'INCORRECT. Volume will worsen the pulmonary backup.' }
              ]
          }
      ]
  },
  {
      id: 'pericarditis_full',
      name: 'Acute Pericarditis',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Viral Infection / Uremia', detail: 'Inflammation of the outer sac of the heart.' },
          { type: 'mechanism', label: 'Fibrinous Exudate', detail: 'Fibrin and fluid build up between the pericardial layers.' },
          { type: 'structural', label: 'Pericardial Friction', detail: 'The inflamed layers rub together during each heartbeat.' },
          { type: 'functional', label: 'Pain-Limited Ventilation', detail: 'Sharp pain prevents deep breaths, but the pump works fine initially.' },
          { type: 'clinical', label: 'Pleuritic Chest Pain', detail: 'Sharp pain that improves when leaning forward.' },
          { type: 'lab', label: 'Diffuse ST Elevation', detail: 'Concave upward elevation across all ECG leads.' },
          { type: 'complication', label: 'Cardiac Tamponade', detail: 'Rapid fluid buildup prevents the heart from filling (diastolic failure).' }
      ],
      scenarios: [
          {
              symptoms: "Young male has sharp chest pain that is worse when lying flat, better when sitting up.",
              vitals: { bp: '122/78', hr: 95, spo2: 99, temp: 100.2 },
              clues: ["ECG: Global PR Depression", "Exam: Friction rub heard"],
              interventions: [
                  { label: 'NSAIDs & Colchicine', correct: true, feedback: 'CORRECT. Reduces the underlying pericardial inflammation.' },
                  { label: 'Heparin', correct: false, feedback: 'INCORRECT. Anti-coagulation risks converting inflammation to hemorrhage (Tamponade).' }
              ]
          }
      ]
  },
  {
      id: 'cardiac_tamponade_full',
      name: 'Cardiac Tamponade',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Pericardial Effusion / Trauma', detail: 'Rapid accumulation of fluid in the pericardial sac.' },
          { type: 'mechanism', label: 'Diastolic Compression', detail: 'External fluid pressure exceeds internal filling pressure.' },
          { type: 'structural', label: 'Chamber Collapse', detail: 'Right heart chambers (lower pressure) collapse during diastole.' },
          { type: 'functional', label: 'Obstructive Failure', detail: 'The heart cannot fill, so it cannot pump (Low preload).' },
          { type: 'clinical', label: "Beck's Triad", detail: 'Hypotension, JVD, and Muffled heart sounds.' },
          { type: 'lab', label: 'Pulsus Paradoxus', detail: '>10mmHg drop in systolic BP during inspiration.' },
          { type: 'complication', label: 'PEA Arrest', detail: 'Electrical signals continue but no mechanical output occurs.' }
      ],
      scenarios: [
          {
              symptoms: "Trauma patient has very low BP and distended neck veins, but lungs are clear.",
              vitals: { bp: '72/40', hr: 128, spo2: 95, temp: 98.6 },
              clues: ["Exam: Muffled heart tones", "Echo: RV diastolic collapse"],
              interventions: [
                  { label: 'Emergent Pericardiocentesis', correct: true, feedback: 'CORRECT. Needle drainage of the sac restores filling capacity.' },
                  { label: 'High-dose Diuretics', correct: false, feedback: 'INCORRECT. Diuretics will lower preload further, killing the patient.' }
              ]
          }
      ]
  },
  {
      id: 'hypertension_secondary',
      name: 'Secondary Hypertension',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Renal Artery Stenosis', detail: 'Narrowing of the vessel supplying the kidney.' },
          { type: 'mechanism', label: 'RAAS Hyperactivation', detail: 'Kidney "thinks" the body is hypotensive and pumps out Renin.' },
          { type: 'structural', label: 'Vessel Wall Thickening', detail: 'Chronic high pressure leads to hyaline arteriolosclerosis.' },
          { type: 'functional', label: 'Extreme Total Resistance', detail: 'The heart must pump against massive systemic afterload.' },
          { type: 'clinical', label: 'Refractory High BP', detail: 'High blood pressure that does not respond to 3+ meds.' },
          { type: 'lab', label: 'Abdominal Bruit', detail: 'Turbulent flow heard over the renal arteries.' },
          { type: 'complication', label: 'Aortic Dissection', detail: 'High pressure tears the inner lining of the aorta.' }
      ],
      scenarios: [
          {
              symptoms: "25yo female has BP of 180/110. No family history of hypertension.",
              vitals: { bp: '180/110', hr: 72, spo2: 98, temp: 98.6 },
              clues: ["Exam: Bruit over right upper quadrant", "Imaging: Fibromuscular Dysplasia"],
              interventions: [
                  { label: 'Renal Artery Stenting', correct: true, feedback: 'CORRECT. Restoring flow to the kidney stops the Renin surge.' },
                  { label: 'Wait and see', correct: false, feedback: 'INCORRECT. Organ damage is imminent at these pressures.' }
              ]
          }
      ]
  },
  {
      id: 'dilated_cardiomyopathy_full',
      name: 'Dilated Cardiomyopathy',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Alcohol / Viral Myocarditis', detail: 'Toxic or infectious injury to the heart muscle cells.' },
          { type: 'mechanism', label: 'Eccentric Remodeling', detail: 'New sarcomeres added in series, stretching the chambers thin.' },
          { type: 'structural', label: 'Spherical Heart', detail: 'The heart loses its conical shape and becomes a large, weak globe.' },
          { type: 'functional', label: 'Systolic Dysfunction', detail: 'EF drops significantly (e.g. <30%); forward flow is minimal.' },
          { type: 'clinical', label: 'S3 Gallop', detail: 'Sound of blood hitting a compliant, over-filled ventricle.' },
          { type: 'lab', label: 'EF < 40% on Echo', detail: 'Primary measure of poor pump performance.' },
          { type: 'complication', label: 'Mural Thrombus', detail: 'Slow-moving blood in the large apex forms clots.' }
      ],
      scenarios: [
          {
              symptoms: "Patient with history of heavy alcohol use has diffuse edema and cannot walk 10 feet without gasping.",
              vitals: { bp: '95/60', hr: 105, spo2: 88, temp: 98.6 },
              clues: ["Echo: EF 15%", "Exam: S3 Gallop present"],
              interventions: [
                  { label: 'Diuretics & Heart Failure Meds', correct: true, feedback: 'CORRECT. Standard therapy for HFrEF (Reduced EF).' },
                  { label: 'Aggressive IV Fluids', correct: false, feedback: 'INCORRECT. The heart is too weak to handle more volume.' }
              ]
          }
      ]
  },

  // --- RESPIRATORY (Target: 15+) ---
  {
      id: 'emphysema_copd_full',
      name: 'Emphysema',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Smoking / Alpha-1', detail: 'Chronic irritants or protease/antiprotease imbalance.' },
          { type: 'mechanism', label: 'Alveolar Wall Destruction', detail: 'Elastase breaks down elastin in the alveolar septa.' },
          { type: 'structural', label: 'Permanent Dilation', detail: 'Alveoli fuse into large, inefficient bullae.' },
          { type: 'functional', label: 'Loss of Recoil', detail: 'Lungs cannot "snap back" to exhale air (air trapping).' },
          { type: 'clinical', label: 'Pink Puffer', detail: 'Thin patient, pursed-lip breathing, barrel chest.' },
          { type: 'lab', label: 'Increased TLC', detail: 'Total Lung Capacity increases due to hyperinflation.' },
          { type: 'complication', label: 'Cor Pulmonale', detail: 'Right heart failure due to chronic pulmonary HTN.' }
      ],
      scenarios: [
          {
              symptoms: "Elderly thin male, 40-pack-year smoker, using accessory muscles to breathe.",
              vitals: { bp: '125/85', hr: 82, spo2: 90, temp: 98.6 },
              clues: ["CXR: Flattened diaphragms", "AP Chest Diameter: Increased"],
              interventions: [
                  { label: 'Pursed-Lip Breathing', correct: true, feedback: 'CORRECT. Prevents airway collapse during expiration.' },
                  { label: 'High-Flow Oxygen (15L)', correct: false, feedback: 'INCORRECT. Can blunt the respiratory drive in chronic CO2 retainers.' }
              ]
          }
      ]
  },
  {
      id: 'chronic_bronchitis_full',
      name: 'Chronic Bronchitis',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Smoking / Irritants', detail: 'Long-term exposure leads to chronic airway inflammation.' },
          { type: 'mechanism', label: 'Goblet Cell Hyperplasia', detail: 'Massive increase in mucus-producing cells in the large airways.' },
          { type: 'structural', label: 'Airway Narrowing', detail: 'Thickened bronchial walls and excess mucus plug the tubes.' },
          { type: 'functional', label: 'Increased Airway Resistance', detail: 'Harder to move air into and out of the lungs (Obstructive).' },
          { type: 'clinical', label: 'Blue Bloater', detail: 'Productive cough for 3 months/year, cyanosis, and edema.' },
          { type: 'lab', label: 'Respiratory Acidosis', detail: 'Chronic CO2 retention due to obstructed exhalation.' },
          { type: 'complication', label: 'Secondary Infections', detail: 'Mucus serves as a perfect medium for bacterial growth.' }
      ],
      scenarios: [
          {
              symptoms: "Obese male has a deep hacking cough and bluish discoloration of the lips.",
              vitals: { bp: '140/90', hr: 88, spo2: 84, temp: 98.6 },
              clues: ["History: Productive cough for 2 years", "Sputum: Thick, yellow"],
              interventions: [
                  { label: 'Mucolytics & Bronchodilators', correct: true, feedback: 'CORRECT. Helps clear the thick mucus and open narrow airways.' },
                  { label: 'Antibiotics every day', correct: false, feedback: 'INCORRECT. Daily antibiotics cause resistance; treat only acute flares.' }
              ]
          }
      ]
  },
  {
      id: 'asthma_acute_flare',
      name: 'Acute Asthma',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Type I Hypersensitivity', detail: 'Allergen triggers IgE-mediated mast cell degranulation.' },
          { type: 'mechanism', label: 'Reversible Bronchospasm', detail: 'Smooth muscle constriction and airway edema.' },
          { type: 'structural', label: 'Mucus Plugging', detail: 'Curschmann spirals and Charcot-Leyden crystals in airways.' },
          { type: 'functional', label: 'Expiratory Airway Closure', detail: 'Air can enter but is trapped during exhalation.' },
          { type: 'clinical', label: 'Wheezing / Dyspnea', detail: 'High-pitched whistle heard on exhalation.' },
          { type: 'lab', label: 'Reduced FEV1', detail: 'Significantly decreased volume expired in one second.' },
          { type: 'complication', label: 'Status Asthmaticus', detail: 'Severe, non-responsive flare leading to respiratory failure.' }
      ],
      scenarios: [
          {
              symptoms: "12yo child is wheezing loudly after playing in a dusty attic.",
              vitals: { bp: '110/70', hr: 115, spo2: 91, temp: 98.6 },
              clues: ["Exam: Prolonged expiratory phase", "History: Known allergies"],
              interventions: [
                  { label: 'Albuterol (SABA) Inhaler', correct: true, feedback: 'CORRECT. Rapidly relaxes bronchial smooth muscle.' },
                  { label: 'Wait for X-ray', correct: false, feedback: 'INCORRECT. Clinical wheezing requires immediate bronchodilation.' }
              ]
          }
      ]
  },
  {
      id: 'pneumothorax_tension',
      name: 'Tension Pneumothorax',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Trauma / Ruptured Bleb', detail: 'Air enters the pleural space but cannot escape.' },
          { type: 'mechanism', label: 'One-Way Valve Effect', detail: 'Each breath pumps more air into the pleura, increasing pressure.' },
          { type: 'structural', label: 'Mediastinal Shift', detail: 'High pressure pushes the heart and trachea to the opposite side.' },
          { type: 'functional', label: 'Venous Return Failure', detail: 'Pressure collapses the vena cava, cutting off blood to the heart.' },
          { type: 'clinical', label: 'Tracheal Deviation', detail: 'Trachea visible shifted away from the affected side.' },
          { type: 'lab', label: 'Absent Breath Sounds', detail: 'No air movement on the side of the collapsed lung.' },
          { type: 'complication', label: 'Obstructive Shock', detail: 'The heart has no blood to pump; rapid death follows.' }
      ],
      scenarios: [
          {
              symptoms: "Trauma patient has sudden drop in BP, severe distress, and tracheal shift.",
              vitals: { bp: '65/35', hr: 140, spo2: 78, temp: 98.6 },
              clues: ["Exam: Hyper-resonance to percussion", "Neck: JVD present"],
              interventions: [
                  { label: 'Needle Decompression (2nd ICS)', correct: true, feedback: 'CORRECT. Converts tension back to a simple pneumothorax.' },
                  { label: 'Intubation first', correct: false, feedback: 'INCORRECT. Positive pressure ventilation will accelerate the tension collapse.' }
              ]
          }
      ]
  },
  {
      id: 'ards_full',
      name: 'ARDS',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Sepsis / Pneumonia', detail: 'Direct or indirect injury to the alveolar-capillary membrane.' },
          { type: 'mechanism', label: 'Diffuse Alveolar Damage', detail: 'Massive cytokine release causes neutrophils to attack the lung.' },
          { type: 'structural', label: 'Hyaline Membranes', detail: 'Protein-rich fluid and dead cells form a "waxy" barrier in alveoli.' },
          { type: 'functional', label: 'Profound Shunting', detail: 'Blood passes through the lungs without any O2 pick-up.' },
          { type: 'clinical', label: 'Refractory Hypoxemia', detail: 'Low O2 levels that do not improve even with 100% O2.' },
          { type: 'lab', label: 'P/F Ratio < 200', detail: 'Ratio of arterial O2 to inspired O2 reflects severe failure.' },
          { type: 'complication', label: 'Pulmonary Fibrosis', detail: 'The hyaline membranes organize into permanent scar tissue.' }
      ],
      scenarios: [
          {
              symptoms: "Patient with severe pneumonia is on 100% O2 but SpO2 is only 82%.",
              vitals: { bp: '105/65', hr: 118, spo2: 82, temp: 101.5 },
              clues: ["CXR: Diffuse 'White Out' lungs", "Heart: Normal size"],
              interventions: [
                  { label: 'Intubation & PEEP', correct: true, feedback: 'CORRECT. Positive End-Expiratory Pressure keeps alveoli open.' },
                  { label: 'Fluid Bolus', correct: false, feedback: 'INCORRECT. Fluid will leak through the damaged membrane into the lungs.' }
              ]
          }
      ]
  },
  {
      id: 'pulmonary_embolism_full',
      name: 'Pulmonary Embolism',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Deep Vein Thrombosis', detail: 'Clot from leg travels through the venous system.' },
          { type: 'mechanism', label: 'Vessel Occlusion', detail: 'The clot blocks a pulmonary artery, cutting off blood flow.' },
          { type: 'structural', label: 'Alveolar Dead Space', detail: 'Alveoli are ventilated (filled with air) but not perfused.' },
          { type: 'functional', label: 'VQ Mismatch', detail: 'Gas exchange is impossible in the affected segment.' },
          { type: 'clinical', label: 'Sudden Sharp CP / Dyspnea', detail: 'Instant onset of breathlessness and pleuritic pain.' },
          { type: 'lab', label: 'CT Angio: Filling Defect', detail: 'Visual proof of the clot blocking the contrast flow.' },
          { type: 'complication', label: 'Pulmonary Infarction', detail: 'Death of lung tissue distal to the obstruction.' }
      ],
      scenarios: [
          {
              symptoms: "Post-op patient stands up and immediately becomes breathless and pale.",
              vitals: { bp: '95/60', hr: 122, spo2: 84, temp: 98.6 },
              clues: ["ECG: S1Q3T3 pattern", "Leg: Unilateral calf swelling"],
              interventions: [
                  { label: 'Heparin & Stabilize', correct: true, feedback: 'CORRECT. Prevents the clot from growing and new ones from forming.' },
                  { label: 'Give Antibiotics', correct: false, feedback: 'INCORRECT. This is a vascular obstruction, not an infection.' }
              ]
          }
      ]
  },

  // --- SHOCK (Target: 12+) ---
  {
      id: 'cardiogenic_shock_full',
      name: 'Cardiogenic Shock',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Massive MI', detail: 'Loss of >40% of left ventricular myocardium.' },
          { type: 'mechanism', label: 'Primary Pump Failure', detail: 'Heart cannot generate enough pressure to move blood.' },
          { type: 'structural', label: 'LV Dilation', detail: 'Ventricle stretches as blood backs up during failure.' },
          { type: 'functional', label: 'CO ↓ / SVR ↑', detail: 'Low output triggers a compensatory (but harmful) vasoconstriction.' },
          { type: 'clinical', label: 'Cold / Clammy / Hypotensive', detail: 'Systemic shutdown as body tries to protect the brain.' },
          { type: 'lab', label: 'CI < 2.2 / PCWP > 18', detail: 'Low cardiac index and high backup pressure in the lungs.' },
          { type: 'complication', label: 'Multisystem Failure', detail: 'Kidneys and liver fail due to lack of fresh blood.' }
      ],
      scenarios: [
          {
              symptoms: "MI patient has 78/40 BP, cold extremities, and crackles in the lungs.",
              vitals: { bp: '78/40', hr: 110, spo2: 85, temp: 98.6 },
              clues: ["Skin: Mottled and cold", "Lungs: Diffuse crackles"],
              interventions: [
                  { label: 'Inotropes (Dobutamine)', correct: true, feedback: 'CORRECT. Strengthens the failing pump without too much vasoconstriction.' },
                  { label: 'Aggressive IVF Bolus', correct: false, feedback: 'INCORRECT. The heart is already failing from too much volume (backup).' }
              ]
          }
      ]
  },
  {
      id: 'hypovolemic_shock_full',
      name: 'Hypovolemic Shock',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Hemorrhage / Dehydration', detail: 'Loss of intravascular volume (blood or water).' },
          { type: 'mechanism', label: 'Reduced Preload', detail: 'Not enough blood returns to the heart to fill the pump.' },
          { type: 'structural', label: 'Collapsed Veins', detail: 'Neck veins and heart chambers are "flat".' },
          { type: 'functional', label: 'Starling Curve Failure', detail: 'Low volume prevents heart stretch, resulting in low stroke volume.' },
          { type: 'clinical', label: 'Tachycardia / Low BP', detail: 'Heart races to compensate for the missing volume.' },
          { type: 'lab', label: 'Hgb < 7 / High BUN', detail: 'Evidence of blood loss or extreme dehydration.' },
          { type: 'complication', label: 'Acute Tubular Necrosis', detail: 'Kidneys die from lack of perfusion.' }
      ],
      scenarios: [
          {
              symptoms: "Patient with massive GI bleed is pale, dizzy, and has a HR of 140.",
              vitals: { bp: '82/45', hr: 142, spo2: 95, temp: 98.6 },
              clues: ["Skin: Dry mucous membranes", "Mental: Confused"],
              interventions: [
                  { label: 'Rapid IVF & Blood Transfusion', correct: true, feedback: 'CORRECT. Replacing the lost volume is the only way to restore pressure.' },
                  { label: 'Give Nitro to lower HR', correct: false, feedback: 'INCORRECT. Vasodilation will cause instant death in hypovolemia.' }
              ]
          }
      ]
  },
  {
      id: 'neurogenic_shock_full',
      name: 'Neurogenic Shock',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Spinal Cord Injury (T6+)', detail: 'Trauma disrupts the sympathetic nervous system pathways.' },
          { type: 'mechanism', label: 'Sympathetic Loss', detail: 'Loss of vessel tone and heart rate control signals.' },
          { type: 'structural', label: 'Massive Vasodilation', detail: 'All blood vessels below the injury relax completely.' },
          { type: 'functional', label: 'Low SVR / Low HR', detail: 'Vessels are "too big" for the blood, and heart cannot speed up.' },
          { type: 'clinical', label: 'Bradycardia & Hypotension', detail: 'The only shock where the heart is SLOW instead of fast.' },
          { type: 'lab', label: 'Warm / Flush Skin', detail: 'Dilation causes blood to pool in the skin (unlike other shocks).' },
          { type: 'complication', label: 'Hypoperfusion Death', detail: 'Brain and heart fail from lack of pressure.' }
      ],
      scenarios: [
          {
              symptoms: "Trauma patient with neck injury has BP 70/40 and HR 48.",
              vitals: { bp: '70/40', hr: 48, spo2: 98, temp: 98.6 },
              clues: ["Skin: Warm and pink", "Motor: No movement in legs"],
              interventions: [
                  { label: 'Vasopressors & Atropine', correct: true, feedback: 'CORRECT. Must replace the missing sympathetic signals.' },
                  { label: 'Give Beta Blockers', correct: false, feedback: 'INCORRECT. Will worsen the bradycardia and kill the patient.' }
              ]
          }
      ]
  },

  // --- HEMO/COAG (Target: 15+) ---
  {
      id: 'itp_full',
      name: 'ITP',
      category: 'coagulation',
      chain: [
          { type: 'cause', label: 'Autoimmune Attack', detail: 'Antibodies target GIIb/IIIa receptors on platelets.' },
          { type: 'mechanism', label: 'Splenic Sequestration', detail: 'Spleen removes antibody-coated platelets.' },
          { type: 'structural', label: 'Thrombocytopenia', detail: 'Low absolute platelet count.' },
          { type: 'functional', label: 'Primary Hemostasis Failure', detail: 'Cannot form initial platelet plug.' },
          { type: 'clinical', label: 'Petechiae', detail: 'Pinpoint red/purple spots on skin.' },
          { type: 'lab', label: 'Platelets < 50,000', detail: 'Significantly reduced platelet level.' },
          { type: 'complication', label: 'Intracranial Hemorrhage', detail: 'Bleeding into the brain.' }
      ],
      scenarios: [
          {
              symptoms: "Child has red spots on legs after viral illness. Platelets are 12,000.",
              vitals: { bp: '110/70', hr: 80, spo2: 99, temp: 98.6 },
              clues: ["PT/PTT: Normal", "Spleen: Not palpable"],
              interventions: [
                  { label: 'Steroids / IVIG', correct: true, feedback: 'CORRECT. Prevents spleen from destroying platelets.' },
                  { label: 'Aspirin', correct: false, feedback: 'INCORRECT.' }
              ]
          }
      ]
  },
  {
      id: 'hemophilia_a_full',
      name: 'Hemophilia A',
      category: 'coagulation',
      chain: [
          { type: 'cause', label: 'Factor VIII Deficiency', detail: 'X-linked recessive genetic defect.' },
          { type: 'mechanism', label: 'Intrinsic Pathway Failure', detail: 'Cannot generate the tenase complex to activate Factor X.' },
          { type: 'structural', label: 'Secondary Hemostasis Failure', detail: 'Cannot form a stable fibrin mesh.' },
          { type: 'functional', label: 'Deep Tissue Bleeding', detail: 'Bleeding into joints and muscles.' },
          { type: 'clinical', label: 'Hemarthrosis', detail: 'Swollen, painful, bloody joints.' },
          { type: 'lab', label: 'Prolonged PTT / Normal PT', detail: 'PTT reflects the intrinsic pathway defect.' },
          { type: 'complication', label: 'Joint Destruction', detail: 'Chronic iron from blood destroys cartilage.' }
      ],
      scenarios: [
          {
              symptoms: "Young boy has a very swollen, painful knee after a minor fall.",
              vitals: { bp: '105/65', hr: 95, spo2: 98, temp: 99.1 },
              clues: ["History: Maternal uncle had bleeding issues", "PTT: 60 seconds (High)"],
              interventions: [
                  { label: 'Factor VIII Replacement', correct: true, feedback: 'CORRECT. Essential to complete the clotting cascade.' },
                  { label: 'Platelet Transfusion', correct: false, feedback: 'INCORRECT. The problem is a factor, not the platelets.' }
              ]
          }
      ]
  },
  {
      id: 'von_willebrand_full',
      name: 'von Willebrand Disease',
      category: 'coagulation',
      chain: [
          { type: 'cause', label: 'vWF Deficiency', detail: 'Autosomal dominant lack of bridging protein.' },
          { type: 'mechanism', label: 'Platelet Adhesion Failure', detail: 'Platelets cannot stick to the damaged subendothelium.' },
          { type: 'structural', label: 'Loss of Factor VIII Carrier', detail: 'vWF normally protects Factor VIII from degradation.' },
          { type: 'functional', label: 'Dual Hemostasis Defect', detail: 'Both platelet plug and stable fibrin are affected.' },
          { type: 'clinical', label: 'Mucosal Bleeding', detail: 'Heavy periods and frequent nosebleeds.' },
          { type: 'lab', label: 'Abnormal Ristocetin Test', detail: 'Platelets fail to clump in the presence of vWF stimulus.' },
          { type: 'complication', label: 'Iron Deficiency Anemia', detail: 'Chronic loss of blood during menstruation.' }
      ],
      scenarios: [
          {
              symptoms: "Teenage girl reports periods that last 10 days and severe nosebleeds.",
              vitals: { bp: '110/65', hr: 88, spo2: 98, temp: 98.6 },
              clues: ["Labs: Mildly high PTT", "Hgb: 9.5 (Low)"],
              interventions: [
                  { label: 'DDAVP (Desmopressin)', correct: true, feedback: 'CORRECT. Stimulates release of vWF from endothelial stores.' },
                  { label: 'NSAIDs for pain', correct: false, feedback: 'INCORRECT. NSAIDs inhibit platelets and worsen the bleeding.' }
              ]
          }
      ]
  },
  {
      id: 'iron_deficiency_anemia_full',
      name: 'Iron Deficiency',
      category: 'hematology',
      chain: [
          { type: 'cause', label: 'Chronic Bleeding / Poor Intake', detail: 'Loss of iron through GI bleed or inadequate diet.' },
          { type: 'mechanism', label: 'Heme Synthesis failure', detail: 'Lack of iron prevents hemoglobin formation.' },
          { type: 'structural', label: 'Microcytosis', detail: 'Small, pale RBCs (hypochromic).' },
          { type: 'functional', label: 'O2 Carrying Capacity ↓', detail: 'Reduced Hgb means less O2 to tissues.' },
          { type: 'clinical', label: 'Pica / Koilonychia', detail: 'Cravings for ice and spoon-shaped nails.' },
          { type: 'lab', label: 'Low Ferritin / High TIBC', detail: 'Stores are empty; body is "hunting" for iron.' },
          { type: 'complication', label: 'Cognitive Impairment', detail: 'Long-term brain dysfunction due to chronic low O2.' }
      ],
      scenarios: [
          {
              symptoms: "Elderly male reports dark stools and extreme fatigue.",
              vitals: { bp: '105/65', hr: 98, spo2: 96, temp: 98.6 },
              clues: ["MCV: 72 (Low)", "Stool: Guaiac positive"],
              interventions: [
                  { label: 'Iron & Colonoscopy', correct: true, feedback: 'CORRECT. Must replace iron and find the source of bleeding.' },
                  { label: 'B12 shots', correct: false, feedback: 'INCORRECT.' }
              ]
          }
      ]
  },
  {
      id: 'scid_full',
      name: 'SCID',
      category: 'immunology',
      chain: [
          { type: 'cause', label: 'IL-2R / ADA Mutation', detail: 'Genetic defect in lymphocyte development.' },
          { type: 'mechanism', label: 'Stem Cell Differentiation Failure', detail: 'Progenitors cannot become T or B cells.' },
          { type: 'structural', label: 'Thymic Aplasia', detail: 'Absent thymus.' },
          { type: 'functional', label: 'Humoral & Cell-Mediated Failure', detail: 'Total lack of adaptive immunity.' },
          { type: 'clinical', label: 'Recurrent Infections', detail: 'Chronic thrush, diarrhea, and FTT.' },
          { type: 'lab', label: 'No Lymphocytes', detail: 'Absolute Lymphocyte Count < 500.' },
          { type: 'complication', label: 'Early Death', detail: 'Lethal infection in first year of life.' }
      ],
      scenarios: [
          {
              symptoms: "Infant has constant yeast infections and pneumonia. No thymus seen on X-ray.",
              vitals: { bp: '80/50', hr: 140, spo2: 90, temp: 101.5 },
              clues: ["WBC: 3,000", "Lymphocytes: 50"],
              interventions: [
                  { label: 'Bone Marrow Transplant', correct: true, feedback: 'CORRECT.' },
                  { label: 'Oral Antibiotics', correct: false, feedback: 'INCORRECT.' }
              ]
          }
      ]
  },
  // --- CARDIOVASCULAR EXPANSION (Target: 15) ---
  {
      id: 'infective_endocarditis_full',
      name: 'Infective Endocarditis',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Bacteremia', detail: 'Bacteria (Staph/Strep) enter the bloodstream via IV use or dental work.' },
          { type: 'mechanism', label: 'Vegetation Formation', detail: 'Bacteria and fibrin stick to heart valves, creating "vegetations".' },
          { type: 'structural', label: 'Valve Destruction', detail: 'The infection physically eats away at the valve leaflets.' },
          { type: 'functional', label: 'Acute Regurgitation', detail: 'The damaged valve cannot close, leading to sudden heart failure.' },
          { type: 'clinical', label: 'Janeway Lesions / Murmur', detail: 'New murmur, fever, and painless spots on palms/soles.' },
          { type: 'lab', label: 'Positive Blood Cultures', detail: 'Growth of the causative organism in systemic blood.' },
          { type: 'complication', label: 'Septic Emboli', detail: 'Chunks of vegetation break off and travel to brain or lungs.' }
      ],
      scenarios: [
          { symptoms: "IV drug user has a 103F fever and a new loud murmur.", vitals: { bp: '110/60', hr: 112, spo2: 95, temp: 103.5 }, clues: ["Skin: Painless red spots on palms", "Echo: Large mitral vegetation"], interventions: [{ label: '6 Weeks IV Antibiotics', correct: true, feedback: 'CORRECT.' }, { label: 'Oral Tylenol only', correct: false, feedback: 'INCORRECT.' }] }
      ]
  },
  {
      id: 'hypertrophic_cardiomyopathy_full',
      name: 'Hypertrophic CM',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Sarcomere Mutation', detail: 'Genetic defect in beta-myosin heavy chain.' },
          { type: 'mechanism', label: 'Asymmetric Septal Hypertrophy', detail: 'The interventricular septum grows disproportionately thick.' },
          { type: 'structural', label: 'LVOT Obstruction', detail: 'The thick septum blocks the path to the aortic valve.' },
          { type: 'functional', label: 'Diastolic Filling Failure', detail: 'The thick, stiff heart cannot relax to receive blood.' },
          { type: 'clinical', label: 'Sudden Death in Athletes', detail: 'Exertion triggers lethal arrhythmia in a young, "healthy" person.' },
          { type: 'lab', label: 'Systolic Murmur (Loud with Valsalva)', detail: 'Obstruction worsens when heart volume decreases.' },
          { type: 'complication', label: 'Ventricular Arrhythmia', detail: 'Disorganized muscle fibers trigger chaotic electrical signals.' }
      ],
      scenarios: [
          { symptoms: "17yo basketball player faints during a game. Heart is loud when he strains.", vitals: { bp: '115/75', hr: 88, spo2: 98, temp: 98.6 }, clues: ["History: Brother died young", "Echo: Septal thickness 2.5cm"], interventions: [{ label: 'Beta Blockers & No Sports', correct: true, feedback: 'CORRECT. Slows HR to improve filling time and reduces O2 demand.' }, { label: 'Start running drills', correct: false, feedback: 'INCORRECT. Extreme risk of death.' }] }
      ]
  },
  {
      id: 'restrictive_cardiomyopathy_full',
      name: 'Restrictive CM',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Amyloidosis / Sarcoidosis', detail: 'Infiltration of the heart muscle by abnormal proteins or granulomas.' },
          { type: 'mechanism', label: 'Myocardial Stiffening', detail: 'The muscle becomes rigid and non-compliant.' },
          { type: 'structural', label: 'Impaired Diastolic Relaxation', detail: 'The heart cannot stretch to fill with blood.' },
          { type: 'functional', label: 'Decreased Preload Capacity', detail: 'Stroke volume is limited by the stiff walls.' },
          { type: 'clinical', label: "Kussmaul's Sign", detail: 'JVD increases during inspiration (paradoxical).' },
          { type: 'lab', label: 'Normal EF / Large Atria', detail: 'The pump squeezes fine, but the chambers stay small/stiff.' },
          { type: 'complication', label: 'Right Heart Failure', detail: 'Backup pressure into the systemic venous system.' }
      ],
      scenarios: [
          { symptoms: "Patient with amyloidosis has extreme JVD and clear lungs.", vitals: { bp: '105/70', hr: 90, spo2: 96, temp: 98.6 }, clues: ["Echo: Normal EF but small LV", "Neck: JVD rises when inhaling"], interventions: [{ label: 'Symptom Management', correct: true, feedback: 'CORRECT. Focus on the underlying systemic disease.' }, { label: 'High-flow fluids', correct: false, feedback: 'INCORRECT. Stiff heart cannot handle volume.' }] }
      ]
  },
  {
      id: 'aortic_dissection_full',
      name: 'Aortic Dissection',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Chronic Hypertension', detail: 'Chronic stress on the aortic wall leads to cystic medial necrosis.' },
          { type: 'mechanism', label: 'Intimal Tearing', detail: 'Blood tears the inner lining and enters the wall of the aorta.' },
          { type: 'structural', label: 'False Lumen Creation', detail: 'Blood creates a second channel between the layers of the aorta.' },
          { type: 'functional', label: 'Branch Vessel Occlusion', detail: 'The dissection flap blocks blood to the brain, heart, or kidneys.' },
          { type: 'clinical', label: 'Tearing Back Pain', detail: 'Sudden, excruciating "ripping" pain between the shoulder blades.' },
          { type: 'lab', label: 'BP Discrepancy (L vs R arm)', detail: 'Flap obstructs one subclavian artery more than the other.' },
          { type: 'complication', label: 'Exsanguination', detail: 'The aorta ruptures through the outer wall, causing instant death.' }
      ],
      scenarios: [
          { symptoms: "Male with BP 210/110 has sudden ripping pain in his back.", vitals: { bp: '210/115', hr: 110, spo2: 98, temp: 98.6 }, clues: ["L Arm BP: 210/115", "R Arm BP: 160/90"], interventions: [{ label: 'Esmolol & Surgery', correct: true, feedback: 'CORRECT. Must lower HR/BP to stop the tear from extending.' }, { label: 'Give Heparin', correct: false, feedback: 'INCORRECT. Anti-coagulation will accelerate the fatal hemorrhage.' }] }
      ]
  },
  {
      id: 'stable_angina_classic',
      name: 'Stable Angina',
      category: 'cardiovascular',
      chain: [
          { type: 'cause', label: 'Fixed Plaque', detail: 'Stable atherosclerotic lesion blocks >70% of lumen.' },
          { type: 'mechanism', label: 'Predictable Ischemia', detail: 'O2 demand during exertion exceeds the restricted supply.' },
          { type: 'structural', label: 'No Myocyte Death', detail: 'Ischemia is transient and reversible.' },
          { type: 'functional', label: 'Subendocardial Ischemia', detail: 'Inner wall of the heart is most sensitive to low flow.' },
          { type: 'clinical', label: 'Pain with Exertion', detail: 'Chest pressure that stops with rest or Nitroglycerin.' },
          { type: 'lab', label: 'Normal Troponin', detail: 'No permanent cell damage or enzyme leakage.' },
          { type: 'complication', label: 'Unstable Angina', detail: 'Plaque starts to crack, causing pain at rest.' }
      ],
      scenarios: [
          { symptoms: "50yo male has chest pressure while climbing stairs; stops when he sits.", vitals: { bp: '135/85', hr: 78, spo2: 98, temp: 98.6 }, clues: ["ECG: T-wave inversion during pain", "Troponin: <0.01"], interventions: [{ label: 'Rest & Nitrates', correct: true, feedback: 'CORRECT.' }, { label: 'Emergency Cath', correct: false, feedback: 'INCORRECT. Not an acute infarction yet.' }] }
      ]
  },

  // --- RESPIRATORY EXPANSION (Target: 15) ---
  {
      id: 'pneumonia_lobar_full',
      name: 'Lobar Pneumonia',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Inhaled Pathogen', detail: 'S. pneumoniae enters the lower respiratory tract.' },
          { type: 'mechanism', label: 'Alveolar Exudate', detail: 'Neutrophils and fluid fill the alveolar spaces.' },
          { type: 'structural', label: 'Consolidation', detail: 'A whole lobe of the lung becomes solid like a liver (hepatization).' },
          { type: 'functional', label: 'V/Q Shunt', detail: 'Blood passes through a solid lobe with zero oxygen uptake.' },
          { type: 'clinical', label: 'Rusty Sputum / Fever', detail: 'Cough, chills, and high fever.' },
          { type: 'lab', label: 'Increased Tactile Fremitus', detail: 'Vibration travels better through solid (liquid) than air.' },
          { type: 'complication', label: 'Sepsis', detail: 'Bacteria cross the alveolar membrane into the bloodstream.' }
      ],
      scenarios: [
          { symptoms: "Patient with cough and 102F fever has dullness to percussion in RLL.", vitals: { bp: '120/80', hr: 105, spo2: 92, temp: 102.5 }, clues: ["Sputum: Rust-colored", "Fremitus: High on right"], interventions: [{ label: 'Antibiotics & Hydration', correct: true, feedback: 'CORRECT.' }, { label: 'Diuretics', correct: false, feedback: 'INCORRECT.' }] }
      ]
  },
  {
      id: 'tuberculosis_full',
      name: 'Tuberculosis',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Acid-Fast Bacilli', detail: 'M. tuberculosis is inhaled and reaches the alveoli.' },
          { type: 'mechanism', label: 'Granuloma Formation', detail: 'Macrophages surround the bacteria but cannot kill them.' },
          { type: 'structural', label: 'Caseous Necrosis', detail: 'Tissue dies and becomes soft, cheese-like debris.' },
          { type: 'functional', label: 'Cavitation', detail: 'Necrotic centers liquefy and erode into the airways.' },
          { type: 'clinical', label: 'Night Sweats / Weight Loss', detail: 'Chronic cytokine release (TNF-alpha) causes systemic wasting.' },
          { type: 'lab', label: 'Ghon Complex on CXR', detail: 'Calcified lung node and lymph node.' },
          { type: 'complication', label: 'Miliary TB', detail: 'Hematogenous spread to all organs (seeds like millet).' }
      ],
      scenarios: [
          { symptoms: "Homeless patient has bloody cough, night sweats, and lost 20lbs.", vitals: { bp: '110/70', hr: 95, spo2: 94, temp: 99.5 }, clues: ["CXR: Upper lobe cavity", "Sputum: Acid-fast bacilli (+)"], interventions: [{ label: 'Airborne Precautions & RIPE', correct: true, feedback: 'CORRECT.' }, { label: 'Albuterol', correct: false, feedback: 'INCORRECT.' }] }
      ]
  },
  {
      id: 'cystic_fibrosis_pulm',
      name: 'Cystic Fibrosis (Lungs)',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'CFTR Mutation', detail: 'Defective chloride channel prevents water from following salt.' },
          { type: 'mechanism', label: 'Hyper-viscous Mucus', detail: 'Lungs are covered in thick, dehydrated "super-glue" mucus.' },
          { type: 'structural', label: 'Bronchiectasis', detail: 'Chronic inflammation and infection permanently dilate the airways.' },
          { type: 'functional', label: 'Mucociliary Clearance Failure', detail: 'The "escalator" is broken; bacteria are never removed.' },
          { type: 'clinical', label: 'Pseudomonas Infections', detail: 'Recurrent pneumonia with specific opportunistic pathogens.' },
          { type: 'lab', label: 'Sweat Chloride > 60', detail: 'Proof of the underlying ion transport defect.' },
          { type: 'complication', label: 'Respiratory Failure', detail: 'Lungs eventually become a mass of scar and mucus.' }
      ],
      scenarios: [
          { symptoms: "Child with salty skin has constant coughing and foul-smelling stools.", vitals: { bp: '90/60', hr: 110, spo2: 92, temp: 98.6 }, clues: ["History: Meconium ileus at birth", "Cultures: Pseudomonas aeruginosa"], interventions: [{ label: 'Chest PT & Pancreatic Enzymes', correct: true, feedback: 'CORRECT.' }, { label: 'Restrict salt intake', correct: false, feedback: 'INCORRECT. These patients lose too much salt.' }] }
      ]
  },
  {
      id: 'lung_cancer_central',
      name: 'Squamous Cell CA',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Smoking / Metaplasia', detail: 'Chronic smoke turns columnar cells into squamous cells.' },
          { type: 'mechanism', label: 'Neoplastic Transformation', detail: 'p53 mutations allow uncontrolled squamous cell growth.' },
          { type: 'structural', label: 'Central Hilar Mass', detail: 'Tumor grows near the main bronchi.' },
          { type: 'functional', label: 'Airway Obstruction', detail: 'Mass blocks airflow, causing distal collapse (Atelectasis).' },
          { type: 'clinical', label: 'Hemoptysis', detail: 'Erosion of blood vessels as the tumor invades.' },
          { type: 'lab', label: 'Hypercalcemia (PTHrP)', detail: 'Paraneoplastic syndrome mimicking hyperparathyroidism.' },
          { type: 'complication', label: 'Superior Vena Cava Syndrome', detail: 'Tumor compresses the SVC, causing face/arm swelling.' }
      ],
      scenarios: [
          { symptoms: "Smoker has a bloody cough and very high Calcium levels.", vitals: { bp: '135/85', hr: 88, spo2: 96, temp: 98.6 }, clues: ["CXR: Central mass near hilum", "Calcium: 13.5 (High)"], interventions: [{ label: 'Biopsy & Oncology Ref', correct: true, feedback: 'CORRECT.' }, { label: 'Give Vitamin D', correct: false, feedback: 'INCORRECT. Will worsen the hypercalcemia.' }] }
      ]
  },
  {
      id: 'epiglottitis_full',
      name: 'Epiglottitis',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'H. influenzae Type B', detail: 'Bacterial infection of the supraglottic tissues.' },
          { type: 'mechanism', label: 'Rapid Supraglottic Edema', detail: 'The epiglottis swells into a "thumb-like" obstruction.' },
          { type: 'structural', label: 'Upper Airway Narrowing', detail: 'The airway opening is reduced to a tiny slit.' },
          { type: 'functional', label: 'Inspiratory Obstruction', detail: 'Harder to pull air past the swollen mass.' },
          { type: 'clinical', label: 'Drooling / Tripod Pose', detail: 'Child cannot swallow spit and leans forward to open airway.' },
          { type: 'lab', label: '"Thumb Sign" on X-ray', detail: 'Lateral neck film showing the massively swollen epiglottis.' },
          { type: 'complication', label: 'Complete Airway Closure', detail: 'Sudden, total inability to breathe; a true emergency.' }
      ],
      scenarios: [
          { symptoms: "4yo child is leaning forward, drooling, and looks terrified. Muffled voice.", vitals: { bp: '90/60', hr: 130, spo2: 90, temp: 103.1 }, clues: ["Pose: Tripoding", "Voice: Hot potato voice"], interventions: [{ label: 'Emergent Intubation in OR', correct: true, feedback: 'CORRECT. Do not agitate the child or look in the throat in the ED.' }, { label: 'Tongue blade exam', correct: false, feedback: 'INCORRECT. Can trigger instant, fatal laryngospasm.' }] }
      ]
  },
  {
      id: 'croup_full',
      name: 'Croup (Laryngotracheitis)',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Parainfluenza Virus', detail: 'Infection of the subglottic larynx and trachea.' },
          { type: 'mechanism', label: 'Subglottic Inflammation', detail: 'Swelling just below the vocal cords.' },
          { type: 'structural', label: 'Airway Narrowing', detail: 'The trachea is pinched, creating a "steeple" shape.' },
          { type: 'functional', label: 'Turbulent Airflow', detail: 'Air rushing past the narrow spot creates a high-pitched noise.' },
          { type: 'clinical', label: 'Barking Seal Cough', detail: 'Characteristic harsh cough and inspiratory stridor.' },
          { type: 'lab', label: '"Steeple Sign" on X-ray', detail: 'AP view showing subglottic narrowing.' },
          { type: 'complication', label: 'Hypoxic Fatigue', detail: 'Child tires from the work of breathing, leading to collapse.' }
      ],
      scenarios: [
          { symptoms: "2yo has a cough that sounds like a seal and high-pitched noise when breathing in.", vitals: { bp: '95/60', hr: 120, spo2: 95, temp: 100.5 }, clues: ["Cough: Barking", "Stridor: Only when crying"], interventions: [{ label: 'Cool Mist / Dexamethasone', correct: true, feedback: 'CORRECT. Steroids reduce the subglottic swelling.' }, { label: 'Give Antibiotics', correct: false, feedback: 'INCORRECT. This is a viral condition.' }] }
      ]
  },
  {
      id: 'sleep_apnea_obstructive',
      name: 'Obstructive Sleep Apnea',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Obesity / Narrow Airway', detail: 'Excess soft tissue in the neck collapses during sleep.' },
          { type: 'mechanism', label: 'Pharyngeal Collapse', detail: 'Loss of muscle tone during REM allows the tongue to block the throat.' },
          { type: 'structural', label: 'Episodic Obstruction', detail: 'Lungs are trying to work but no air can enter.' },
          { type: 'functional', label: 'Intermittent Hypoxia', detail: 'O2 levels drop dozens of times per hour.' },
          { type: 'clinical', label: 'Daytime Somnolence', detail: 'Extreme fatigue and snoring reported by partner.' },
          { type: 'lab', label: 'Polysomnography (Sleep Study)', detail: 'Proof of apnea/hypopnea events during sleep.' },
          { type: 'complication', label: 'Pulmonary Hypertension', detail: 'Chronic nighttime hypoxia causes reactive lung vessel narrowing.' }
      ],
      scenarios: [
          { symptoms: "Obese male is falling asleep at traffic lights. Partner says he 'gasps' at night.", vitals: { bp: '155/95', hr: 78, spo2: 96, temp: 98.6 }, clues: ["BMI: 38", "Neck Circ: 19 inches"], interventions: [{ label: 'CPAP Machine', correct: true, feedback: 'CORRECT. Splints the airway open with positive pressure.' }, { label: 'Give sleeping pills', correct: false, feedback: 'INCORRECT. Will worsen the airway collapse and potentially kill the patient.' }] }
      ]
  },
  {
      id: 'aspiration_pneumonia_full',
      name: 'Aspiration Pneumonia',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Impaired Swallowing', detail: 'Stroke or intoxication allows stomach/mouth contents into lungs.' },
          { type: 'mechanism', label: 'Chemical & Bacterial Insult', detail: 'Acid and anaerobic bacteria damage lung tissue.' },
          { type: 'structural', label: 'Right Lower Lobe Infiltrate', detail: 'Gravity pulls material into the straighter right main bronchus.' },
          { type: 'functional', label: 'Inflammatory Edema', detail: 'Lungs fill with fluid in response to the irritants.' },
          { type: 'clinical', label: 'Foul-smelling Sputum', detail: 'Hallmark of anaerobic bacterial growth.' },
          { type: 'lab', label: 'CXR: Patchy RLL infiltrate', detail: 'Proof of the localized injury.' },
          { type: 'complication', label: 'Lung Abscess', detail: 'The necrotic tissue becomes a walled-off cavity of pus.' }
      ],
      scenarios: [
          { symptoms: "Drunk patient vomits while lying flat, then develops fever and cough.", vitals: { bp: '120/75', hr: 110, spo2: 90, temp: 101.8 }, clues: ["Sputum: Foul-smelling", "History: Chronic alcohol use"], interventions: [{ label: 'Clindamycin (Anaerobic cover)', correct: true, feedback: 'CORRECT.' }, { label: 'Lying the patient flat', correct: false, feedback: 'INCORRECT. Increases risk of further aspiration.' }] }
      ]
  },
  {
      id: 'pulm_htn_full',
      name: 'Pulmonary HTN',
      category: 'respiratory',
      chain: [
          { type: 'cause', label: 'Chronic Hypoxia / LV Failure', detail: 'Lung vessels constrict to redirect flow or due to backup.' },
          { type: 'mechanism', label: 'Vascular Remodeling', detail: 'Smooth muscle hypertrophy in the pulmonary arteries.' },
          { type: 'structural', label: 'Intimal Fibrosis', detail: 'Vessels become permanently thick and narrow.' },
          { type: 'functional', label: 'Increased Pulmonary Resistance', detail: 'Pressure in the lung circuit rises significantly (>20mmHg).' },
          { type: 'clinical', label: 'Loud P2 / RV Heave', detail: 'Forceful closure of the pulmonary valve.' },
          { type: 'lab', label: 'Right Heart Cath: High PAP', detail: 'Direct measurement of elevated lung pressure.' },
          { type: 'complication', label: 'Cor Pulmonale', detail: 'The right heart fails because it cannot push against the lungs.' }
      ],
      scenarios: [
          { symptoms: "Young female with autoimmune disease has severe SOB and distended neck veins.", vitals: { bp: '110/70', hr: 92, spo2: 91, temp: 98.6 }, clues: ["Exam: Loud 2nd heart sound", "Echo: Massive RV enlargement"], interventions: [{ label: 'Pulm Vasodilators (Bosentan)', correct: true, feedback: 'CORRECT.' }, { label: 'Vigorous exercise', correct: false, feedback: 'INCORRECT. Can trigger RV collapse.' }] }
      ]
  },

  // --- SHOCK EXPANSION (Target: 12) ---
  {
      id: 'sepsis_warm_full',
      name: 'Early Septic Shock',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Pathogen Entry', detail: 'Infection triggers a systemic inflammatory response (SIRS).' },
          { type: 'mechanism', label: 'Massive Nitric Oxide', detail: 'Cytokines trigger endothelial cells to release vasodilators.' },
          { type: 'structural', label: 'Extreme Vasodilation', detail: 'The "tank" gets much bigger than the blood inside it.' },
          { type: 'functional', label: 'Hyperdynamic State', detail: 'Low resistance causes a surge in heart rate and cardiac output.' },
          { type: 'clinical', label: 'Warm / Flushed / Febrile', detail: "Early sepsis feels WARM because vessels in the skin are wide open." },
          { type: 'lab', label: 'Low SVR / High CO', detail: 'The hallmark hemodynamic profile of early distributive shock.' },
          { type: 'complication', label: 'Cold Sepsis', detail: 'Pump eventually fails, and skin becomes cold and mottled.' }
      ],
      scenarios: [
          { symptoms: "Patient with UTI is confused, BP is 85/40, but skin is warm and pink.", vitals: { bp: '85/40', hr: 125, spo2: 94, temp: 103.5 }, clues: ["CO: 8.0 (High)", "SVR: 400 (Very Low)"], interventions: [{ label: 'IV Fluids & Vasopressors', correct: true, feedback: 'CORRECT. Must fill the dilated tank and then shrink it.' }, { label: 'Cooling blanket only', correct: false, feedback: 'INCORRECT. Fever is a symptom, but hypotension is the killer.' }] }
      ]
  },
  {
      id: 'obstructive_pe_shock',
      name: 'Obstructive Shock (PE)',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Large Saddle Embolus', detail: 'Clot blocks both main pulmonary arteries.' },
          { type: 'mechanism', label: 'Acute RV Outflow Block', detail: 'Blood is physically trapped in the right heart.' },
          { type: 'structural', label: 'Empty Left Ventricle', detail: 'No blood returns to the LV, so there is nothing to pump out.' },
          { type: 'functional', label: 'Preload Collapse', detail: 'The LV cannot maintain systemic pressure.' },
          { type: 'clinical', label: 'Acute SOB / JVD / Clear Lungs', detail: 'Classic triad of obstructive heart failure.' },
          { type: 'lab', label: 'High CVP / Low PCWP', detail: 'High backup in the body, low pressure in the lungs/left heart.' },
          { type: 'complication', label: 'Pulseless Electrical Activity', detail: 'Heart is beating but it is "empty," so there is no pulse.' }
      ],
      scenarios: [
          { symptoms: "Patient post-hip surgery suddenly collapses. BP 60/palp, HR 140, neck veins bulged.", vitals: { bp: '65/30', hr: 145, spo2: 70, temp: 98.6 }, clues: ["Lungs: Clear bilaterally", "Legs: Right calf is purple"], interventions: [{ label: 'Thrombolytics (tPA)', correct: true, feedback: 'CORRECT. Must dissolve the physical block to restore flow.' }, { label: 'Nitro for chest pain', correct: false, feedback: 'INCORRECT. Nitro will drop BP further and kill the patient.' }] }
      ]
  },
  {
      id: 'tension_ptx_shock',
      name: 'Obstructive Shock (PTX)',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Traumatic Pneumothorax', detail: 'Pressure in the chest increases with each breath.' },
          { type: 'mechanism', label: 'Vena Cava Kinking', detail: 'Mediastinal shift physically bends the large return veins.' },
          { type: 'structural', label: 'Preload Blockade', detail: 'Blood cannot enter the chest cavity.' },
          { type: 'functional', label: 'Systemic Hypotension', detail: 'No blood into the heart means no blood out.' },
          { type: 'clinical', label: 'Absent Breath Sounds / Tracheal Shift', detail: 'Signs of extreme intrathoracic pressure.' },
          { type: 'lab', label: 'Profound Tachycardia', detail: 'Heart tries desperately to pump the few drops of blood it has.' },
          { type: 'complication', label: 'Cardiac Arrest', detail: 'Rapid death from lack of circulation.' }
      ],
      scenarios: [
          { symptoms: "Stab wound victim is gasping for air. BP 70/30. Trachea is pushed to the left.", vitals: { bp: '72/35', hr: 138, spo2: 80, temp: 98.6 }, clues: ["Exam: No breath sounds on right", "Neck: Extreme JVD"], interventions: [{ label: 'Needle Decompression', correct: true, feedback: 'CORRECT. Relieves the pressure blocking venous return.' }, { label: 'Order a stat Portable X-ray', correct: false, feedback: 'INCORRECT. Patient will die before the technician arrives.' }] }
      ]
  },
  {
      id: 'hemorrhagic_shock_full',
      name: 'Hemorrhagic Shock',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Arterial Rupture', detail: 'Trauma or aneurysm results in massive internal bleeding.' },
          { type: 'mechanism', label: 'Intravascular Volume Loss', detail: 'Loss of the medium that carries O2 and maintains pressure.' },
          { type: 'structural', label: 'Baroreceptor Trigger', detail: 'Pressure drop triggers a massive sympathetic surge.' },
          { type: 'functional', label: 'SVR ↑ / CO ↓', detail: 'Body clamps down on skin/gut to save the brain.' },
          { type: 'clinical', label: 'Pale / Cold / Weak Pulses', detail: 'Peripheral vasoconstriction moves blood to the core.' },
          { type: 'lab', label: 'Lactic Acidosis', detail: 'Tissues switch to anaerobic metabolism without O2.' },
          { type: 'complication', label: 'Exsanguination', detail: 'Bleeding out until the heart stops.' }
      ],
      scenarios: [
          { symptoms: "Patient with gunshot wound to the leg. Blood is pooling on the floor.", vitals: { bp: '80/40', hr: 135, spo2: 95, temp: 97.5 }, clues: ["Skin: Ice cold and white", "Urine: None in 2 hours"], interventions: [{ label: 'Tourniquet & Blood', correct: true, feedback: 'CORRECT. Stop the leak and refill the tank.' }, { label: 'Give IVF only', correct: false, feedback: 'INCORRECT. You cannot carry O2 with salt water alone.' }] }
      ]
  },
  {
      id: 'adrenal_crisis_shock',
      name: 'Adrenal Crisis',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Abrupt Steroid Stop', detail: 'Sudden lack of Cortisol in a dependent patient.' },
          { type: 'mechanism', label: 'Glucocorticoid Deficiency', detail: 'Loss of vascular responsiveness to catecholamines.' },
          { type: 'structural', label: 'Vessel Unresponsiveness', detail: 'Vessels remain dilated even when "Epi" is present.' },
          { type: 'functional', label: 'Refractory Hypotension', detail: 'Low BP that does not respond to fluids or pressors.' },
          { type: 'clinical', label: 'Nausea / Lethargy / Shock', detail: 'Vague symptoms followed by rapid collapse.' },
          { type: 'lab', label: 'Hyponatremia / Hyperkalemia', detail: 'Loss of Aldosterone alongside Cortisol.' },
          { type: 'complication', label: 'Lethal Vascular Collapse', detail: 'Irreversible drop in BP without replacement.' }
      ],
      scenarios: [
          { symptoms: "Patient on long-term Prednisone ran out 3 days ago. Now has BP 75/40.", vitals: { bp: '78/35', hr: 110, spo2: 98, temp: 100.1 }, clues: ["Na: 128 (Low)", "K: 5.8 (High)"], interventions: [{ label: 'IV Hydrocortisone & IVF', correct: true, feedback: 'CORRECT. Essential to restore vessel tone.' }, { label: 'Give Insulin for High K', correct: false, feedback: 'INCORRECT. Must treat the underlying steroid deficiency first.' }] }
      ]
  },

  // --- HEMO/COAG EXPANSION (Target: 15) ---
  {
      id: 'thalassemia_major_full',
      name: 'Beta Thalassemia',
      category: 'hematology',
      chain: [
          { type: 'cause', label: 'Beta-Globin Mutation', detail: 'Total absence of beta-globin chains.' },
          { type: 'mechanism', label: 'Alpha-Chain Precipitation', detail: 'Excess alpha chains clump and damage RBC membranes.' },
          { type: 'structural', label: 'Ineffective Erythropoiesis', detail: 'RBCs are destroyed in the marrow before maturity.' },
          { type: 'functional', label: 'Severe Microcytic Anemia', detail: 'Extreme lack of functional hemoglobin.' },
          { type: 'clinical', label: 'Chipmunk Facies', detail: 'Marrow expansion in facial bones to try to make more blood.' },
          { type: 'lab', label: 'Hgb < 7 / Target Cells', detail: 'Severe anemia and characteristic "bullseye" RBCs.' },
          { type: 'complication', label: 'Iron Overload (Hemosiderosis)', detail: 'Toxicity from life-long blood transfusions.' }
      ],
      scenarios: [
          { symptoms: "6mo old child of Mediterranean descent is pale and failing to thrive.", vitals: { bp: '85/55', hr: 120, spo2: 95, temp: 98.6 }, clues: ["X-ray: Crew-cut skull", "Smear: Target Cells"], interventions: [{ label: 'Chronic Transfusions & Chelation', correct: true, feedback: 'CORRECT. Must replace blood and then remove the extra iron.' }, { label: 'Iron supplements', correct: false, feedback: 'INCORRECT. This child already has too much iron; supplements will be toxic.' }] }
      ]
  },
  {
      id: 'polycythemia_vera_full',
      name: 'Polycythemia Vera',
      category: 'hematology',
      chain: [
          { type: 'cause', label: 'JAK2 Mutation', detail: 'Bone marrow is "stuck on" and makes too many RBCs.' },
          { type: 'mechanism', label: 'Hyper-viscosity', detail: 'The blood becomes thick like "sludge" or "molasses".' },
          { type: 'structural', label: 'Increased RBC Mass', detail: 'Massive increase in the number of red cells.' },
          { type: 'functional', label: 'Sluggish Perfusion', detail: 'Thick blood moves slowly through small capillaries.' },
          { type: 'clinical', label: 'Aquagenic Pruritus', detail: 'Intense itching after a warm shower.' },
          { type: 'lab', label: 'Hct > 55% / Low Erythropoietin', detail: 'RBCs are high but EPO is low because marrow is acting alone.' },
          { type: 'complication', label: 'Venous Thrombosis', detail: 'Thick blood prone to forming spontaneous clots (e.g. Budd-Chiari).' }
      ],
      scenarios: [
          { symptoms: "Male reports headache, red face, and his skin itches like crazy after showering.", vitals: { bp: '150/95', hr: 82, spo2: 96, temp: 98.6 }, clues: ["Exam: Splenomegaly", "Hct: 62% (Critical High)"], interventions: [{ label: 'Therapeutic Phlebotomy', correct: true, feedback: 'CORRECT. Physically removing blood lowers the viscosity.' }, { label: 'Give EPO shots', correct: false, feedback: 'INCORRECT. Marrow is already overactive; EPO will make it worse.' }] }
      ]
  },
  {
      id: 'multiple_myeloma_full',
      name: 'Multiple Myeloma',
      category: 'hematology',
      chain: [
          { type: 'cause', label: 'Plasma Cell Malignancy', detail: 'Clonal expansion of plasma cells in the marrow.' },
          { type: 'mechanism', label: 'Excess M-Protein', detail: 'Production of massive amounts of non-functional IgG/IgA.' },
          { type: 'structural', label: 'Lytic Bone Lesions', detail: 'Cancer cells trigger osteoclasts to eat away at the bone.' },
          { type: 'functional', label: 'Renal Blockage', detail: 'Excess light chains (Bence-Jones) clog the kidney tubules.' },
          { type: 'clinical', label: 'CRAB features', detail: 'Calcium high, Renal failure, Anemia, Bone pain.' },
          { type: 'lab', label: 'Rouleaux Formation', detail: 'RBCs stack like coins on a smear due to high protein.' },
          { type: 'complication', label: 'Pathologic Fracture', detail: 'Bones break under normal stress because they are hollow.' }
      ],
      scenarios: [
          { symptoms: "70yo male has severe back pain and foamy urine.", vitals: { bp: '130/80', hr: 75, spo2: 98, temp: 98.6 }, clues: ["X-ray: 'Punched out' lesions in skull", "Urine: Bence-Jones proteins (+)"], interventions: [{ label: 'Chemo & Bisphosphonates', correct: true, feedback: 'CORRECT.' }, { label: 'Give Vitamin D', correct: false, feedback: 'INCORRECT. Calcium is already dangerously high.' }] }
      ]
  },
  {
      id: 'folate_deficiency_full',
      name: 'Folate Deficiency',
      category: 'hematology',
      chain: [
          { type: 'cause', label: 'Poor Intake / Alcoholism', detail: 'Lack of green leafy vegetables or alcohol interference.' },
          { type: 'mechanism', label: 'DNA Synthesis Failure', detail: 'Lack of Folate prevents thymidine production.' },
          { type: 'structural', label: 'Megaloblastic Changes', detail: 'Large RBCs and hypersegmented neutrophils.' },
          { type: 'functional', label: 'Macrocytic Anemia', detail: 'Inefficient production of red blood cells.' },
          { type: 'clinical', label: 'Glossitis / Fatigue', detail: 'Beefy red tongue but NO neurological symptoms.' },
          { type: 'lab', label: 'Low Folate / High Homocysteine', detail: 'MMA is normal (unlike B12 deficiency).' },
          { type: 'complication', label: 'Neural Tube Defects', detail: 'Risk to fetus if mother is deficient.' }
      ],
      scenarios: [
          { symptoms: "Alcoholic patient is pale and tired. No tingling in hands or feet.", vitals: { bp: '110/70', hr: 92, spo2: 97, temp: 98.6 }, clues: ["MCV: 115", "Neutrophils: 6+ lobes"], interventions: [{ label: 'Folate Supplementation', correct: true, feedback: 'CORRECT.' }, { label: 'B12 shots', correct: false, feedback: 'INCORRECT. B12 won\'t fix folate-specific DNA failure.' }] }
      ]
  },
  {
      id: 'aplastic_anemia_full',
      name: 'Aplastic Anemia',
      category: 'hematology',
      chain: [
          { type: 'cause', label: 'Autoimmune / Viral', detail: 'T-cells attack hematopoietic stem cells in the marrow.' },
          { type: 'mechanism', label: 'Marrow Failure', detail: 'Total loss of blood-producing tissue.' },
          { type: 'structural', label: 'Dry Tap / Fatty Marrow', detail: 'Marrow cavity contains only fat cells and no blood precursors.' },
          { type: 'functional', label: 'Pancytopenia', detail: 'Lack of RBCs, WBCs, and Platelets.' },
          { type: 'clinical', label: 'Bleeding / Infection / Fatigue', detail: 'Triple threat of missing all blood components.' },
          { type: 'lab', label: 'Reticulocyte Count: 0%', detail: 'Zero evidence of any new blood production.' },
          { type: 'complication', label: 'Lethal Sepsis / Hemorrhage', detail: 'Death from lack of immune cells or catastrophic bleeding.' }
      ],
      scenarios: [
          { symptoms: "Patient has 102F fever, severe bleeding gums, and extreme fatigue.", vitals: { bp: '100/60', hr: 115, spo2: 94, temp: 102.1 }, clues: ["WBC: 500", "Plt: 5,000", "Hgb: 6.0"], interventions: [{ label: 'Bone Marrow Transplant', correct: true, feedback: 'CORRECT.' }, { label: 'Iron and Vitamins', correct: false, feedback: 'INCORRECT. The factory is empty; supplements won\'t help.' }] }
      ]
  },
  {
      id: 'hitt_clotting_full',
      name: 'HIT (Type II)',
      category: 'coagulation',
      chain: [
          { type: 'cause', label: 'Heparin Exposure', detail: 'Patient receives heparin for a previous clot.' },
          { type: 'mechanism', label: 'PF4-Heparin Antibodies', detail: 'Autoimmune response to the drug complex.' },
          { type: 'structural', label: 'Platelet Activation', detail: 'Antibodies bind and "turn on" every platelet in the body.' },
          { type: 'functional', label: 'Paradoxical Thrombosis', detail: 'Platelet count drops because they are all being used in new clots.' },
          { type: 'clinical', label: 'DVT/PE while on Heparin', detail: 'Clot gets worse or new ones form despite treatment.' },
          { type: 'lab', label: '50% Drop in Platelets', detail: 'Sudden fall in count 5-10 days after starting drug.' },
          { type: 'complication', label: 'Limb Gangrene', detail: 'Widespread arterial clots cut off flow to extremities.' }
      ],
      scenarios: [
          { symptoms: "Patient on Heparin drip for 6 days suddenly has a blue, cold left foot.", vitals: { bp: '140/90', hr: 88, spo2: 98, temp: 98.6 }, clues: ["Platelets: 80,000 (was 250,000)", "Leg: No pedal pulse"], interventions: [{ label: 'Stop Heparin & Give Argatroban', correct: true, feedback: 'CORRECT. Must stop the trigger and use a different anticoagulant.' }, { label: 'Increase Heparin dose', correct: false, feedback: 'INCORRECT. Will rapidly worsen the clotting/limb loss.' }] }
      ]
  },
  {
      id: 'sickle_cell_crisis_full',
      name: 'Sickle Cell Vaso-occlusive',
      category: 'hematology',
      chain: [
          { type: 'cause', label: 'HbS Mutation', detail: 'Glutamic Acid to Valine substitution in beta-globin.' },
          { type: 'mechanism', label: 'Deoxygenated Polymerization', detail: 'Low O2 causes HbS to form long, rigid rods.' },
          { type: 'structural', label: 'Sickle Shape', detail: 'RBCs become curved and lose their flexibility.' },
          { type: 'functional', label: 'Microvascular Plugging', detail: 'Sticky, rigid cells block the small capillaries.' },
          { type: 'clinical', label: 'Acute Pain Crisis', detail: 'Excruciating pain in bones, chest, or abdomen.' },
          { type: 'lab', label: 'Smear: Sickle Cells', detail: 'Irreversibly damaged RBCs visible under the lens.' },
          { type: 'complication', label: 'Acute Chest Syndrome', detail: 'Lethal pulmonary infarction mimicking pneumonia.' }
      ],
      scenarios: [
          { symptoms: "Child with Sickle Cell has severe leg pain and 101F fever.", vitals: { bp: '105/65', hr: 110, spo2: 92, temp: 101.2 }, clues: ["Hgb: 8.2", "Pain: 10/10"], interventions: [{ label: 'O2, IVF, & Morphine', correct: true, feedback: 'CORRECT. Hydration and oxygen help reverse the sickling.' }, { label: 'Ice packs to legs', correct: false, feedback: 'INCORRECT. Cold causes vasoconstriction and worsens sickling.' }] }
      ]
  }
];

// Content Map Targets met:
// Cardio: Athero, STEMI, HF, AFib, AS, MR, Pericarditis, Tamponade, Sec HTN, Dilated CM, Endocarditis, Hypertrophic CM, Restrictive CM, Aortic Dissection, Stable Angina = 15 (Target Met)
// Resp: Emphysema, Bronchitis, Asthma, PTX, ARDS, PE, Lobar Pneumo, TB, CF, Squamous Cell CA, Epiglottitis, Croup, Sleep Apnea, Aspiration, Pulm HTN = 15 (Target Met)
// Shock: Anaphylaxis, Sepsis (Cold), Cardiogenic, Hypovolemic, Neurogenic, Warm Sepsis, Obstructive (PE), Obstructive (PTX), Hemorrhagic, Adrenal Crisis = 10 (Adding 2 more)
MOD3_DATABASE.push(
  {
      id: 'post_mi_septal_shock',
      name: 'Obstructive Shock (Septal Rupture)',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Myocardial Necrosis', detail: 'Post-MI weakening of the interventricular septum.' },
          { type: 'mechanism', label: 'Left-to-Right Shunt', detail: 'Blood blasts through the hole into the RV during systole.' },
          { type: 'structural', label: 'Acute RV Overload', detail: 'The RV is overwhelmed by the sudden volume surge.' },
          { type: 'functional', label: 'Forward CO Failure', detail: 'Blood wasted in the shunt doesn\'t reach the systemic organs.' },
          { type: 'clinical', label: 'New Harsh Holosystolic Murmur', detail: 'Loud noise heard 3-5 days after a massive STEMI.' },
          { type: 'lab', label: 'O2 Sat Step-up (RA to RV)', detail: 'Venous blood in the RV has higher O2 than normal due to shunt.' },
          { type: 'complication', label: 'Multi-organ Failure', detail: 'Rapid death without surgical intervention.' }
      ],
      scenarios: [
          { symptoms: "Patient 4 days post-MI has sudden drop in BP and new loud murmur.", vitals: { bp: '82/40', hr: 120, spo2: 88, temp: 98.6 }, clues: ["Echo: Hole in septum", "Murmur: 4/6 holosystolic"], interventions: [{ label: 'Emergency Surgery', correct: true, feedback: 'CORRECT.' }, { label: 'Fluid bolus only', correct: false, feedback: 'INCORRECT.' }] }
      ]
  },
  {
      id: 'cardiac_tamponade_shock',
      name: 'Obstructive Shock (Tamponade)',
      category: 'shock',
      chain: [
          { type: 'cause', label: 'Pericardial Fluid', detail: 'Blood or fluid fills the restrictive sac around the heart.' },
          { type: 'mechanism', label: 'Diastolic Compression', detail: 'External pressure prevents heart chambers from opening.' },
          { type: 'structural', label: 'Chamber Collapse', detail: 'Lower pressure right heart is crushed by the fluid.' },
          { type: 'functional', label: 'Low Preload failure', detail: 'Zero output because there is zero input.' },
          { type: 'clinical', label: 'Beck\'s Triad', detail: 'Hypotension, Muffled heart tones, and JVD.' },
          { type: 'lab', label: 'Electrical Alternans', detail: 'ECG showing heart "swinging" in the fluid.' },
          { type: 'complication', label: 'Sudden Death', detail: 'The pump is physically unable to move.' }
      ],
      scenarios: [
          { symptoms: "Trauma patient with hypotension and distended neck veins. Heart sounds are distant.", vitals: { bp: '75/40', hr: 125, spo2: 95, temp: 98.6 }, clues: ["ECG: Low voltage QRS", "Beck's: (+) Positive"], interventions: [{ label: 'Needle Pericardiocentesis', correct: true, feedback: 'CORRECT.' }, { label: 'Diuretics', correct: false, feedback: 'INCORRECT. Fatal.' }] }
      ]
  }
);
// Shock = 12 (Target Met)

// Heme/Coag = 12 (Adding 3 more)
MOD3_DATABASE.push(
  {
      id: 'g6pd_crisis_full',
      name: 'Hemolytic Crisis (G6PD)',
      category: 'coagulation',
      chain: [
          { type: 'cause', label: 'Fava Beans / Sulfa', detail: 'Oxidative challenge in an enzyme-deficient host.' },
          { type: 'mechanism', label: 'Heinz Body Formation', detail: 'Hgb is damaged and precipitates.' },
          { type: 'structural', label: 'Bite Cell formation', detail: 'Spleen "bites" the clumps out of the RBCs.' },
          { type: 'functional', label: 'Intravascular Hemolysis', detail: 'Cells burst in the bloodstream.' },
          { type: 'clinical', label: 'Back Pain / Dark Urine', detail: 'Free Hgb in the urine causes dark color and renal pain.' },
          { type: 'lab', label: 'Low Haptoglobin', detail: 'Carrier protein is used up binding to free Hgb.' },
          { type: 'complication', label: 'Acute Renal Failure', detail: 'Free Hgb is toxic to the kidney tubules.' }
      ],
      scenarios: [
          { symptoms: "Male with UTI took Sulfa drugs; now has yellow skin and black urine.", vitals: { bp: '115/70', hr: 105, spo2: 96, temp: 99.1 }, clues: ["Smear: Bite Cells", "Labs: Low Haptoglobin"], interventions: [{ label: 'Stop Trigger & IVF', correct: true, feedback: 'CORRECT.' }, { label: 'Give Vitamin K', correct: false, feedback: 'INCORRECT.' }] }
      ]
  },
  {
      id: 'vitamin_k_deficiency_full',
      name: 'Vitamin K Deficiency',
      category: 'coagulation',
      chain: [
          { type: 'cause', label: 'Malabsorption / Antibiotics', detail: 'Loss of gut flora or bile needed for Vit K absorption.' },
          { type: 'mechanism', label: 'Gla-Protein failure', detail: 'Factors II, VII, IX, X cannot be gamma-carboxylated.' },
          { type: 'structural', label: 'Secondary Hemostasis Failure', detail: 'Coagulation cascade is non-functional.' },
          { type: 'functional', label: 'Delayed Fibrin Formation', detail: 'Clotting time is massively extended.' },
          { type: 'clinical', label: 'Post-Op Bleeding / Bruising', detail: 'Oozing from wounds in a malnourished or antibiotic-treated patient.' },
          { type: 'lab', label: 'High PT & High PTT', detail: 'Both pathways are affected (Factor II/X are common).' },
          { type: 'complication', label: 'Fatal Hemorrhage', detail: 'Internal bleeding that cannot be stopped.' }
      ],
      scenarios: [
          { symptoms: "Patient on long-term broad antibiotics is bleeding from his PICC line.", vitals: { bp: '115/75', hr: 88, spo2: 98, temp: 98.6 }, clues: ["PT: 45s (High)", "PTT: 60s (High)"], interventions: [{ label: 'IV Vitamin K & FFP', correct: true, feedback: 'CORRECT.' }, { label: 'Give Heparin', correct: false, feedback: 'INCORRECT.' }] }
      ]
  },
  {
      id: 'hereditary_spherocytosis_full',
      name: 'Spherocytosis',
      category: 'hematology',
      chain: [
          { type: 'cause', label: 'Spectrin / Ankyrin defect', detail: 'Mutation in the RBC membrane skeleton.' },
          { type: 'mechanism', label: 'Blebbing / Surface Loss', detail: 'The membrane is unstable and pieces fall off.' },
          { type: 'structural', label: 'Sphere Shape', detail: 'RBCs lose biconcave shape and become tight globes.' },
          { type: 'functional', label: 'Splenic Entrapment', detail: 'Rigid spheres cannot fit through the narrow splenic sinusoids.' },
          { type: 'clinical', label: 'Splenomegaly / Jaundice', detail: 'Enlarged spleen from constant "work" of eating RBCs.' },
          { type: 'lab', label: 'Osmotic Fragility (+)', detail: 'Spheres burst easily when placed in water.' },
          { type: 'complication', label: 'Aplastic Crisis', detail: 'Parvovirus B19 stops RBC production in a high-turnover patient.' }
      ],
      scenarios: [
          { symptoms: "Young adult has yellow eyes and a very large, painful spleen.", vitals: { bp: '110/70', hr: 85, spo2: 98, temp: 98.6 }, clues: ["MCHC: Increased", "Smear: Small, dark, round cells"], interventions: [{ label: 'Splenectomy Consultation', correct: true, feedback: 'CORRECT. Removing the "eater" stops the anemia.' }, { label: 'High dose Iron', correct: false, feedback: 'INCORRECT.' }] }
      ]
  }
);
// Heme/Coag = 15 (Target Met)

// Total Database entries = ~57 (Target met across all modes)

export const MODULE3_RIG_METADATA = (MOD3_DATABASE || []).map(d => ({ id: d.id, label: d.name }));

export const MODULE3_QUIZ_DATA = (MOD3_DATABASE || []).map(d => ({ 
    q: `Identify the hallmark clinical finding for ${d.name}.`,
    opts: [d.chain?.[4]?.label || 'Clinical Presentation', 'Hypertension', 'Decreased Heart Rate', 'Fever'],
    ans: 0,
    rationales: [d.chain?.[4]?.detail || 'Hallmark finding.', 'General sign', 'Opposite effect', 'Inflammatory sign']
}));

export const MODULE3_CLINICAL_SUMMARIES = (MOD3_DATABASE || []).reduce((acc, d) => {
    acc[d.id] = { 
        mechanism: d.chain?.[1]?.detail || 'Underlying mechanism.', 
        pearl: d.chain?.[2]?.detail || 'Clinical pearl.', 
        visual: d.chain?.[0]?.label || d.name 
    };
    return acc;
}, {});

export const MODULE3_PATHOPHYSIOLOGY_DATA = (MOD3_DATABASE || []).map(d => ({ 
    act: "Module 3 Clinical Integration", 
    day: "N/A", 
    event: d.name, 
    location: "atrium",
    beats: [{ text: d.name, diagram: [] }],
    q: `What is the complication of ${d.name}?`,
    opts: [d.chain?.[6]?.label || 'Lethal complication', 'Recovery', 'No effect', 'Minor pain'],
    ans: 0,
    rationales: [d.chain?.[6]?.detail || 'Progressive deterioration.', 'Incorrect outcome', 'Incorrect outcome', 'Incorrect outcome']
}));
export const MODULE3_NPC_DATA = [];
export const MODULE3_WORLD_LOCATIONS = [
  { id: 'atrium', label: 'MEDICAL CENTER ATRIUM', interior: 'assets/westbridge-atrium-interior-v2.webp' }
];

export const MOD3_GAME_MODES = [
    { id: 'mech_lab', name: 'Mechanism Lab', icon: '🔬', description: 'Explore disease chains step-by-step.' },
    { id: 'path_builder', name: 'Path Builder', icon: '🧩', description: 'Reconstruct mechanism sequences.' },
    { id: 'adaptive_exam', name: 'Adaptive Exam', icon: '🧠', description: 'High-stakes retrieval drills.' },
    { id: 'coronary_crisis', name: 'Coronary Crisis', icon: '🫀', description: 'Manage acute cardiac emergencies.' },
    { id: 'shock_unit', name: 'Shock Unit', icon: '⚡', description: 'Differentiate shock mechanisms.' },
    { id: 'boss_battles', name: 'Mechanism Bosses', icon: '👾', description: 'Defeat lethal complications.' },
    { id: 'pulm_collapse', name: 'Pulm Collapse', icon: '🫁', description: 'Respiratory failure simulators.' },
    { id: 'emergency_dept', name: 'Emergency Dept', icon: '🚑', description: 'Rapid clinical triaging.' },
    { id: 'clot_runner', name: 'Clot Runner', icon: '🩸', description: 'Evade thrombus formations.' },
    { id: 'hemo_arena', name: 'Hemo Arena', icon: '💉', description: 'Master blood & coagulation labs.' },
    { id: 'final_sim', name: 'Final Integration', icon: '🏢', description: 'System-wide collapse simulator.' }
];

