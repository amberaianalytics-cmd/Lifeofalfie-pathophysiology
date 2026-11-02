
/**
 * HCR 240 Pathophysiology - Protocol 150 Official Question Bank
 * Phase 2: Official 150-Question Payload
 */

export const PROTOCOL_150_QUESTIONS = [
    // PART 1 (1-25) - Musculoskeletal & Metabolic
    {
        id: 1,
        q: "A 71-year-old woman reports losing nearly 3 inches of height since retirement. Imaging reveals multiple vertebral compression deformities. Which physiologic process most likely contributed to these findings?",
        opts: ["Excess osteoblast activity", "Increased bone mineralization", "Progressive deterioration of bone microarchitecture", "Increased cartilage production"],
        ans: 2, // C
        rationale: "Osteoporosis is characterized by the loss of bone density and the progressive deterioration of bone microarchitecture, leading to fragility and compression fractures.",
        topic: "Musculoskeletal",
        pearl: "Osteoporosis = Fragile microarchitecture."
    },
    {
        id: 2,
        q: "A nurse is developing a fracture-prevention program for older adults. Which participant would benefit most from targeted intervention?",
        opts: ["69-year-old sedentary smoker with minimal weight-bearing activity", "28-year-old recreational cyclist", "41-year-old accountant with controlled hypertension", "33-year-old swimmer"],
        ans: 0, // A
        rationale: "Smoking, sedentary lifestyle, and lack of weight-bearing exercise are major modifiable risk factors for osteoporosis and fractures in the elderly.",
        topic: "Musculoskeletal",
        pearl: "Weight-bearing exercise builds bone density."
    },
    {
        id: 3,
        q: "A patient reports chronic knee discomfort that worsens with activity and improves with rest. Imaging demonstrates narrowing of joint spaces. Which process is most likely occurring?",
        opts: ["Autoimmune synovial destruction", "Progressive cartilage degeneration", "Bacterial osteonecrosis", "Crystal deposition disease"],
        ans: 1, // B
        rationale: "Osteoarthritis is a degenerative joint disease characterized by the breakdown of articular cartilage, typically worsening with use.",
        topic: "Musculoskeletal",
        pearl: "OA = Wear and tear of cartilage."
    },
    {
        id: 4,
        q: "A patient presents with lumbar pain radiating into the lower extremity accompanied by intermittent numbness. Which finding would most strongly support a structural spinal cause?",
        opts: ["Elevated serum uric acid", "Positive urine culture", "MRI demonstrating nerve root compression", "Elevated fasting glucose"],
        ans: 2, // C
        rationale: "Nerve root compression (e.g., from a herniated disc) is a primary structural cause of radicular pain and numbness in the extremities.",
        topic: "Musculoskeletal",
        pearl: "Radiculopathy = Nerve root compression."
    },
    {
        id: 5,
        q: "A patient with years of poorly controlled hyperuricemia develops firm nodular deposits around the fingers and external ear. These deposits most likely represent:",
        opts: ["Calcium plaques from osteoporosis", "Necrotic bone fragments", "Fibrotic scar tissue", "Crystalline urate accumulations"],
        ans: 3, // D
        rationale: "Tophi are characteristic of chronic gout and consist of urate crystal accumulations in soft tissues.",
        topic: "Musculoskeletal",
        pearl: "Tophi = Urate crystals."
    },
    {
        id: 6,
        q: "Which patient is most vulnerable to development of a bone infection?",
        opts: ["Patient with controlled hypothyroidism", "Patient recovering from a closed ankle sprain", "Patient with chronic allergic rhinitis", "Patient with an open contaminated fracture"],
        ans: 3, // D
        rationale: "Open fractures provide a direct pathway for bacteria to enter the bone, significantly increasing the risk of osteomyelitis.",
        topic: "Musculoskeletal",
        pearl: "Open fractures = High osteomyelitis risk."
    },
    {
        id: 7,
        q: "A patient with an untreated bone infection develops loss of blood supply within infected tissue. Which complication becomes most likely?",
        opts: ["Formation of necrotic bone", "Accelerated bone growth", "Increased cartilage production", "Hypercalcemia"],
        ans: 0, // A
        rationale: "Ischemia in infected bone leads to the formation of sequestrum, which is a piece of dead (necrotic) bone separated from living tissue.",
        topic: "Musculoskeletal",
        pearl: "Sequestrum = Dead bone in infection."
    },
    {
        id: 8,
        q: "Which statement best differentiates low bone mass from advanced metabolic bone disease?",
        opts: ["Low bone mass always produces fractures", "Low bone mass represents an earlier stage of mineral loss", "Low bone mass is caused by bacterial infection", "Low bone mass only occurs in males"],
        ans: 1, // B
        rationale: "Osteopenia (low bone mass) is the precursor stage to osteoporosis, representing a T-score between -1 and -2.5.",
        topic: "Musculoskeletal",
        pearl: "Osteopenia is the warning sign before Osteoporosis."
    },
    {
        id: 9,
        q: "A patient reports fatigue, blurred vision, polyuria, and polydipsia. Laboratory studies reveal fasting hyperglycemia. Which pathophysiologic mechanism best explains the findings?",
        opts: ["Autoimmune destruction of myelin", "Deficiency of dopamine", "Excess ADH activity", "Impaired cellular response to insulin"],
        ans: 3, // D
        rationale: "Type 2 Diabetes involves insulin resistance (impaired cellular response) and progressive beta-cell failure.",
        topic: "Endocrine",
        pearl: "Type 2 DM = Insulin Resistance."
    },
    {
        id: 10,
        q: "Which process is most directly responsible for long-term retinal injury and peripheral nerve damage in patients with chronic uncontrolled diabetes?",
        opts: ["Persistent tissue exposure to elevated glucose concentrations", "Acute viral infection of neural tissue", "Excessive dopamine production", "Reduced bone mineral density"],
        ans: 0, // A
        rationale: "Chronic hyperglycemia leads to microvascular damage via advanced glycation end products (AGEs) and oxidative stress.",
        topic: "Endocrine",
        pearl: "Hyperglycemia drives microvascular damage."
    },
    {
        id: 11,
        q: "A newborn is delivered after a pregnancy complicated by persistent maternal hyperglycemia. Which assessment is most important during the immediate post-delivery period?",
        opts: ["Hearing screen", "Scoliosis screening", "Blood glucose monitoring", "Developmental testing"],
        ans: 2, // C
        rationale: "Infants of diabetic mothers are at high risk for neonatal hypoglycemia due to hyperinsulinism developed in utero.",
        topic: "Endocrine",
        pearl: "Maternal hyperglycemia -> Neonatal hypoglycemia."
    },
    {
        id: 12,
        q: "A hospitalized patient develops severe hyponatremia, confusion, concentrated urine, and unexplained weight gain. Which mechanism most likely explains the presentation?",
        opts: ["Excessive free-water retention", "Excessive insulin secretion", "Accelerated calcium loss", "Hyperthyroid state"],
        ans: 0, // A
        rationale: "SIADH (Syndrome of Inappropriate ADH) causes excessive water reabsorption in the kidneys, leading to dilutional hyponatremia.",
        topic: "Endocrine",
        pearl: "SIADH = Water intoxication / Low Sodium."
    },
    {
        id: 13,
        q: "Which physiologic change would be expected in a patient unable to produce sufficient antidiuretic hormone?",
        opts: ["Water retention", "Markedly increased urine output", "Reduced thirst", "Progressive edema formation"],
        ans: 1, // B
        rationale: "Diabetes Insipidus (lack of ADH) results in the inability to concentrate urine, causing polyuria and polydipsia.",
        topic: "Endocrine",
        pearl: "DI = Dry Inside (Polyuria)."
    },
    {
        id: 14,
        q: "A patient presents with abdominal striae, easy bruising, muscle weakness, and central weight gain. Which finding would most strongly support excessive cortisol activity rather than thyroid disease?",
        opts: ["Elevated LDL", "Elevated bilirubin", "Hyperpigmented rash", "Increased serum cortisol"],
        ans: 3, // D
        rationale: "Cushing's Syndrome is caused by excessive cortisol, manifesting with central obesity, moon face, and purple striae.",
        topic: "Endocrine",
        pearl: "Cushing = Cortisol excess."
    },
    {
        id: 15,
        q: "A patient experiences transient unilateral weakness and difficulty speaking that completely resolves within one hour. Which statement is most accurate?",
        opts: ["This finding excludes future stroke risk", "This finding requires urgent evaluation because it may precede a stroke", "This represents normal aging", "This confirms intracranial hemorrhage"],
        ans: 1, // B
        rationale: "A Transient Ischemic Attack (TIA) is a 'warning stroke' that signifies a high risk for a major stroke in the near future.",
        topic: "Neurological",
        pearl: "TIA = Temporary Ischemia, Total Warning."
    },
    {
        id: 16,
        q: "MRI demonstrates damage involving a region responsible for balance, coordination, and precision of movement. Which finding would be expected?",
        opts: ["Polyuria", "Jaundice", "Ataxic gait", "Amenorrhea"],
        ans: 2, // C
        rationale: "The cerebellum coordinates movement; damage here leads to ataxia (uncoordinated gait and movement).",
        topic: "Neurological",
        pearl: "Cerebellum = Balance/Coordination."
    },
    {
        id: 17,
        q: "A patient develops resting tremor, rigidity, and slowed voluntary movement. Which pathophysiologic process is most likely occurring?",
        opts: ["Autoimmune destruction of myelin", "Loss of dopamine-producing neurons", "Increased ADH secretion", "Destruction of pancreatic beta cells"],
        ans: 1, // B
        rationale: "Parkinson's Disease is characterized by the degeneration of dopaminergic neurons in the substantia nigra.",
        topic: "Neurological",
        pearl: "Parkinson = Dopamine deficiency."
    },
    {
        id: 18,
        q: "Which assessment finding in a neurologic patient should be reported immediately?",
        opts: ["Mild ankle swelling", "Low-grade fever of 99.2°F", "Nausea after eating", "Declining level of consciousness with severe hypertension"],
        ans: 3, // D
        rationale: "A declining LOC and hypertension (part of Cushing's Triad) are signs of life-threatening increased intracranial pressure.",
        topic: "Neurological",
        pearl: "LOC change = Neurologic emergency."
    },
    {
        id: 19,
        q: "A patient reports recurrent attacks of severe unilateral head pain associated with tearing of one eye and nasal symptoms. Which diagnosis is most likely?",
        opts: ["Gastroenteritis", "Trigeminal autonomic cephalgia", "Tension headache", "Medication-induced gastritis"],
        ans: 1, // B
        rationale: "Cluster headaches (a type of trigeminal autonomic cephalgia) are severe, unilateral, and associated with autonomic features like tearing.",
        topic: "Neurological",
        pearl: "Cluster = Severe unilateral orbital pain."
    },
    {
        id: 20,
        q: "A patient presents with fever, flank pain, nausea, and costovertebral angle tenderness. Which laboratory pattern would most strongly support an upper urinary tract infection?",
        opts: ["Hyperbilirubinemia", "Elevated troponin", "Pyuria with bacteriuria", "Elevated amylase"],
        ans: 2, // C
        rationale: "Pyelonephritis (upper UTI) presents with systemic symptoms (fever, flank pain) and laboratory evidence of infection in the urine.",
        topic: "Renal",
        pearl: "Pyelonephritis = Kidney infection (Flank pain)."
    },
    {
        id: 21,
        q: "A patient has experienced multiple recurrent ascending urinary tract infections over the past two years. Which intervention would most directly reduce the risk of future infections?",
        opts: ["Increasing dietary protein intake", "Routine thyroid screening", "Improving urinary elimination and reducing bacterial access to the urinary tract", "Increasing calcium supplementation"],
        ans: 2, // C
        rationale: "Preventing bacterial ascent (e.g., proper hygiene, hydration, complete emptying) is key to reducing UTI recurrence.",
        topic: "Renal",
        pearl: "UTI prevention = Stagnation prevention."
    },
    {
        id: 22,
        q: "A provider is evaluating a 76-year-old man with progressive urinary symptoms and concerns regarding prostatic enlargement. Which assessment provides the most direct information?",
        opts: ["Colonoscopy", "EEG", "Pulmonary function testing", "Digital rectal examination"],
        ans: 3, // D
        rationale: "A digital rectal examination (DRE) allows the provider to manually assess the size and texture of the prostate gland.",
        topic: "Renal/Reproductive",
        pearl: "DRE is the first-line physical exam for BPH."
    },
    {
        id: 23,
        q: "A patient develops edema, hypertension, and dark urine several weeks after recovery from a streptococcal infection. Which mechanism most likely underlies the renal dysfunction?",
        opts: ["Gallstone obstruction", "Immune-complex injury to glomerular structures", "Degeneration of cartilage", "Dopamine deficiency"],
        ans: 1, // B
        rationale: "Post-streptococcal glomerulonephritis is a Type III hypersensitivity reaction involving immune complex deposition in the glomeruli.",
        topic: "Renal",
        pearl: "Glomerulonephritis = Glomerular inflammation."
    },
    {
        id: 24,
        q: "Why may excessive protein intake worsen symptoms in advanced chronic kidney disease?",
        opts: ["It increases production of nitrogen-containing waste products that impaired kidneys struggle to eliminate", "It directly causes autoimmune destruction of nephrons", "It prevents glucose metabolism", "It causes excessive ADH secretion"],
        ans: 0, // A
        rationale: "Kidneys eliminate nitrogenous wastes (like urea) from protein metabolism; in CKD, these build up (azotemia).",
        topic: "Renal",
        pearl: "CKD = Limit protein to reduce urea load."
    },
    {
        id: 25,
        q: "A patient has experienced years of immobility after spinal cord injury. Which renal complication becomes more likely because of prolonged skeletal demineralization?",
        opts: ["Acute pancreatitis", "Endometritis", "Calcium-containing kidney stones", "Trigeminal autonomic cephalgia"],
        ans: 2, // C
        rationale: "Immobility leads to bone resorption, increasing serum calcium and the risk of calcium-based nephrolithiasis.",
        topic: "Renal",
        pearl: "Immobility -> Hypercalciuria -> Stones."
    },

    // PART 2 (26-50) - Infectious, GI, & Pancreatic
    {
        id: 26,
        id_display: 26,
        q: "Several weeks after returning from a hiking trip, a patient develops episodic facial weakness, migratory joint discomfort, and fatigue. Which mechanism best explains the progression of symptoms?",
        opts: ["Tick-transmitted bacterial dissemination through multiple tissues", "Autoimmune destruction of pancreatic beta cells", "Crystal deposition within synovial fluid", "Progressive degeneration of articular cartilage"],
        ans: 0, // A
        rationale: "Lyme disease is caused by Borrelia burgdorferi, which disseminates through the body after a tick bite.",
        topic: "Infectious",
        pearl: "Lyme Disease = Tick-borne dissemination."
    },
    {
        id: 27,
        q: "A patient is diagnosed with an early-stage systemic bacterial infection known for potential neurologic and cardiac complications if untreated. Which intervention is most appropriate?",
        opts: ["Long-term fluid restriction", "Prompt antimicrobial therapy", "Immediate bowel resection", "High-dose calcium supplementation"],
        ans: 1, // B
        rationale: "Early antibiotic treatment is critical to prevent the late-stage complications of systemic infections like Lyme.",
        topic: "Infectious",
        pearl: "Antibiotics stop the progression."
    },
    {
        id: 28,
        q: "A patient reports increasing difficulty moving food from the mouth into the stomach. Which term best describes this symptom?",
        opts: ["Dyspepsia", "Hematuria", "Dysphagia", "Menorrhagia"],
        ans: 2, // C
        rationale: "Dysphagia is the medical term for difficulty swallowing.",
        topic: "Gastrointestinal",
        pearl: "Dysphagia = Difficulty swallowing."
    },
    {
        id: 29,
        q: "Which finding most strongly suggests chronic bleeding originating from the upper gastrointestinal tract?",
        opts: ["Clay-colored stool", "Bright-red blood coating stool", "Urinary hesitancy", "Black tar-like stool"],
        ans: 3, // D
        rationale: "Melena (black, tarry stool) results from blood being digested by stomach acid and bacteria in the upper GI tract.",
        topic: "Gastrointestinal",
        pearl: "Melena = Upper GI Bleed."
    },
    {
        id: 30,
        q: "A patient reports recurrent epigastric discomfort that improves briefly after eating but returns several hours later. Which pathophysiologic process should be strongly considered?",
        opts: ["Gastric colonization by a mucosa-damaging microorganism", "Autoimmune destruction of glomeruli", "Excess ADH secretion", "Degeneration of dopamine-producing neurons"],
        ans: 0, // A
        rationale: "Helicobacter pylori colonization is a major cause of peptic ulcer disease, causing pain that is often relieved by food.",
        topic: "Gastrointestinal",
        pearl: "H. pylori = PUD culprit."
    },
    {
        id: 31,
        q: "A clinician wants evidence of active gastric infection rather than previous exposure. Which diagnostic study is most appropriate?",
        opts: ["Serum antibody testing alone", "Bone density scan", "Urea breath testing", "Serum uric acid testing"],
        ans: 2, // C
        rationale: "The urea breath test detects active H. pylori infection by measuring the CO2 produced by the bacteria's urease enzyme.",
        topic: "Gastrointestinal",
        pearl: "Breath test = Active H. pylori."
    },
    {
        id: 32,
        q: "A patient presents with chronic diarrhea, weight loss, nutritional deficiencies, and bulky foul-smelling stools. Which mechanism most likely explains these findings?",
        opts: ["Impaired nutrient absorption across small intestinal mucosa", "Increased dopamine metabolism", "Excessive cortisol production", "Obstruction of urinary outflow"],
        ans: 0, // A
        rationale: "Malabsorption syndromes (like Celiac) impair the absorption of nutrients, leading to steatorrhea and malnutrition.",
        topic: "Gastrointestinal",
        pearl: "Malabsorption = Bulky/Foul stools."
    },
    {
        id: 33,
        q: "A patient experiences intestinal injury triggered by exposure to a specific dietary protein. Which process is most responsible for tissue damage?",
        opts: ["Crystal deposition", "Autoimmune-mediated injury of intestinal villi", "Obstruction of bile flow", "Chronic hyperglycemia"],
        ans: 1, // B
        rationale: "Celiac disease is an autoimmune reaction to gluten that causes villous atrophy in the small intestine.",
        topic: "Gastrointestinal",
        pearl: "Celiac = Gluten-triggered villous atrophy."
    },
    {
        id: 34,
        q: "Which characteristic most strongly supports Crohn disease rather than ulcerative colitis?",
        opts: ["Continuous inflammation involving only the colon", "Disease confined to superficial mucosa", "Inflammation limited to the rectum", "Patchy involvement with normal bowel between lesions"],
        ans: 3, // D
        rationale: "Crohn disease features 'skip lesions' (patchy involvement) and can affect any part of the GI tract.",
        topic: "Gastrointestinal",
        pearl: "Crohn = Skip lesions / Patchy."
    },
    {
        id: 35,
        q: "A patient with longstanding inflammatory bowel disease develops intestinal narrowing resulting in recurrent bowel obstruction symptoms. Which process most likely produced the narrowing?",
        opts: ["Fibrotic remodeling and stricture formation", "Dopamine depletion", "Acute biliary obstruction", "Hyperuricemia"],
        ans: 0, // A
        rationale: "Chronic inflammation in IBD leads to fibrosis and the development of strictures, which can cause obstructions.",
        topic: "Gastrointestinal",
        pearl: "Stricture = Narrowing from fibrosis."
    },
    {
        id: 36,
        q: "A patient develops severe abdominal pain radiating toward the back. Laboratory studies reveal marked elevations in digestive enzymes. Which organ is most likely involved?",
        opts: ["Gallbladder", "Pancreas", "Thyroid gland", "Prostate"],
        ans: 1, // B
        rationale: "Pancreatitis pain typically radiates to the back and is associated with elevated amylase and lipase.",
        topic: "Gastrointestinal/Pancreas",
        pearl: "Pancreatitis = Epigastric pain -> Back."
    },
    {
        id: 37,
        q: "Which laboratory pattern most strongly supports acute pancreatic inflammation?",
        opts: ["Elevated bilirubin alone", "Elevated troponin", "Elevated amylase and lipase", "Elevated TSH"],
        ans: 2, // C
        rationale: "Amylase and lipase are the primary biomarkers for acute pancreatitis.",
        topic: "Gastrointestinal/Pancreas",
        pearl: "Amylase/Lipase = Pancreas labs."
    },
    {
        id: 38,
        q: "A patient develops persistent obstruction of the common bile duct. Which consequence is most likely if the obstruction remains unresolved?",
        opts: ["Improved digestion of dietary fats", "Impaired bile delivery to the intestine", "Increased dopamine production", "Accelerated cartilage growth"],
        ans: 1, // B
        rationale: "Obstruction of the common bile duct prevents bile from reaching the duodenum, leading to jaundice and fat malabsorption.",
        topic: "Hepatobiliary",
        pearl: "Bile duct block = Backup into liver."
    },
    {
        id: 39,
        q: "A patient recovering from biliary disease receives dietary counseling. Which meal choice is most appropriate?",
        opts: ["Fried chicken and gravy", "Double cheeseburger with fries", "Baked fish, rice, and vegetables", "Sausage biscuits with cream sauce"],
        ans: 2, // C
        rationale: "A low-fat diet reduces the stimulus for gallbladder contraction and biliary pain.",
        topic: "Hepatobiliary",
        pearl: "Biliary disease = Low fat diet."
    },
    {
        id: 40,
        q: "Which event most commonly initiates gallstone formation?",
        opts: ["Crystallization of substances normally dissolved in bile", "Reduced dopamine production", "Autoimmune destruction of nephrons", "Excess ADH secretion"],
        ans: 0, // A
        rationale: "Gallstones (cholelithiasis) form when cholesterol or bilirubin crystallizes in concentrated bile.",
        topic: "Hepatobiliary",
        pearl: "Gallstones = Crystallized bile."
    },
    {
        id: 41,
        q: "A patient presents with jaundice, fever, and upper abdominal discomfort. Which body system warrants the highest diagnostic priority?",
        opts: ["Musculoskeletal", "Endocrine", "Hepatobiliary", "Neurologic"],
        ans: 2, // C
        rationale: "Jaundice and upper quadrant pain are hallmarks of hepatobiliary dysfunction (liver/gallbladder).",
        topic: "Hepatobiliary",
        pearl: "Jaundice points to the Liver/Bile system."
    },
    {
        id: 42,
        q: "A healthcare system wants to reduce future cases of a viral liver disease that spreads through blood and body fluids. Which intervention is likely to have the greatest long-term impact?",
        opts: ["Routine vaccination programs", "Population calcium supplementation", "Screening for osteoporosis", "Annual spirometry testing"],
        ans: 0, // A
        rationale: "Vaccination (e.g., Hep B) is the most effective way to prevent viral hepatitis spread by blood/fluids.",
        topic: "Hepatobiliary",
        pearl: "Hepatitis vaccination saves lives."
    },
    {
        id: 43,
        q: "A patient with chronic viral liver injury develops progressive scarring that distorts hepatic architecture. What long-term complication is occurring?",
        opts: ["Osteopenia", "Cirrhosis", "Parkinson disease", "Myositis"],
        ans: 1, // B
        rationale: "Cirrhosis is the end-stage of chronic liver disease, characterized by extensive fibrosis and nodules.",
        topic: "Hepatobiliary",
        pearl: "Cirrhosis = Irreversible scarring."
    },
    {
        id: 44,
        q: "A patient presents with generalized edema, heavy protein losses in the urine, and reduced serum albumin. Which condition should be strongly considered?",
        opts: ["Nephrotic syndrome", "Cluster headache", "Osteomyelitis", "Endometritis"],
        ans: 0, // A
        rationale: "Nephrotic syndrome is defined by heavy proteinuria (>3.5g/day), hypoalbuminemia, and edema.",
        topic: "Renal",
        pearl: "Nephrotic = Protein Leak."
    },
    {
        id: 45,
        q: "Which mechanism most directly explains edema formation in nephrotic syndrome?",
        opts: ["Increased cortisol production", "Reduced plasma oncotic pressure from protein loss", "Hyperthyroidism", "Degeneration of articular cartilage"],
        ans: 1, // B
        rationale: "Loss of albumin in the urine lowers the plasma oncotic pressure, allowing fluid to move into tissues.",
        topic: "Renal",
        pearl: "Low Albumin = Low Oncotic Pressure."
    },
    {
        id: 46,
        q: "Renal ultrasound demonstrates dilation of the renal pelvis and calyces proximal to an obstructing lesion. Which process is occurring?",
        opts: ["Nephrotic syndrome", "Glomerulonephritis", "Hydronephrosis", "Osteopenia"],
        ans: 2, // C
        rationale: "Hydronephrosis is the dilation of the kidney due to urine backup from an obstruction.",
        topic: "Renal",
        pearl: "Hydronephrosis = Water inside the Kidney."
    },
    {
        id: 47,
        q: "Which term broadly describes structural or functional impairment of urinary flow that may damage the urinary tract?",
        opts: ["Menorrhagia", "Myositis", "Amenorrhea", "Uropathy"],
        ans: 3, // D
        rationale: "Obstructive uropathy refers to any condition that blocks the flow of urine.",
        topic: "Renal",
        pearl: "Uropathy = Urinary tract pathology."
    },
    {
        id: 48,
        q: "A patient develops fever, pelvic pain, uterine tenderness, and abnormal bleeding following an ascending reproductive tract infection. Which diagnosis is most consistent with the presentation?",
        opts: ["Endometritis", "Diverticulitis", "Parkinson disease", "Osteoarthritis"],
        ans: 0, // A
        rationale: "Endometritis is an infection of the inner lining of the uterus, often following childbirth or GYN procedures.",
        topic: "Reproductive",
        pearl: "Endometritis = Uterine lining infection."
    },
    {
        id: 49,
        q: "A young woman presents with irregular ovulation, elevated androgen levels, and insulin resistance. Which mechanism most likely contributes to her reproductive dysfunction?",
        opts: ["Progressive dopamine depletion", "Autoimmune destruction of villi", "Hormonal dysregulation affecting ovarian function", "Obstruction of urinary flow"],
        ans: 2, // C
        rationale: "Polycystic Ovary Syndrome (PCOS) involves hormonal imbalances (LH/FSH) and insulin resistance.",
        topic: "Reproductive",
        pearl: "PCOS = Hirsutism + Irregular Menses."
    },
    {
        id: 50,
        q: "A patient experiences episodes of neurologic dysfunction separated by periods of recovery. MRI demonstrates lesions scattered throughout the central nervous system. Which process best explains the disease course?",
        opts: ["Episodic immune-mediated injury to CNS myelin", "Chronic biliary obstruction", "Progressive hyperuricemia", "Acute pancreatic inflammation"],
        ans: 0, // A
        rationale: "Multiple Sclerosis (MS) is an autoimmune demyelinating disease characterized by lesions separated in 'time and space'.",
        topic: "Neurological",
        pearl: "MS = Demyelination in the CNS."
    },

    // PART 3 (51-75) - Endocrine & Reproductive
    {
        id: 51,
        q: "A patient has fatigue, cold intolerance, constipation, dry skin, and weight gain. Which mechanism best explains these findings?",
        opts: ["Increased dopamine release", "Reduced thyroid hormone activity", "Excess bile secretion", "Increased bone resorption"],
        ans: 1, // B
        rationale: "Hypothyroidism slows the metabolic rate, leading to cold intolerance and weight gain.",
        topic: "Endocrine",
        pearl: "Hypothyroid = Slow Metabolism."
    },
    {
        id: 52,
        q: "A patient presents with heat intolerance, palpitations, tremor, anxiety, and unexplained weight loss. Which process is most likely occurring?",
        opts: ["Decreased metabolic rate", "Impaired urinary flow", "Excess thyroid hormone effect", "Reduced cortisol activity"],
        ans: 2, // C
        rationale: "Hyperthyroidism accelerates metabolism, causing heat intolerance, tachycardia, and weight loss.",
        topic: "Endocrine",
        pearl: "Hyperthyroid = Fast Metabolism."
    },
    {
        id: 53,
        q: "Which laboratory pattern best supports primary hypothyroidism?",
        opts: ["Low TSH, high T4", "High TSH, low T4", "High cortisol, low ACTH", "High uric acid, normal TSH"],
        ans: 1, // B
        rationale: "In primary hypothyroidism, the thyroid fails, so T4 is low; the pituitary compensates by increasing TSH.",
        topic: "Endocrine",
        pearl: "High TSH + Low T4 = Primary Hypothyroidism."
    },
    {
        id: 54,
        q: "A patient with untreated severe hypothyroidism develops hypothermia, respiratory depression, and altered mental status. Which complication is most concerning?",
        opts: ["Thyroid storm", "Myxedema coma", "Acute pancreatitis", "Renal colic"],
        ans: 1, // B
        rationale: "Myxedema coma is a life-threatening end-stage of severe hypothyroidism.",
        topic: "Endocrine",
        pearl: "Myxedema = Severe Hypothyroid Crisis."
    },
    {
        id: 55,
        q: "A patient with inadequate thyroid hormone production is prescribed medication. What is the main therapeutic goal?",
        opts: ["Replace deficient hormone activity", "Increase bile flow", "Suppress bacterial growth", "Reduce uric acid crystals"],
        ans: 0, // A
        rationale: "Treatment for hypothyroidism is hormone replacement therapy (e.g., Levothyroxine).",
        topic: "Endocrine",
        pearl: "Hypothyroid goal: Restore normal T4 levels."
    },
    {
        id: 56,
        q: "A patient with chronic iodine deficiency develops thyroid enlargement. Which mechanism most directly explains the enlargement?",
        opts: ["Increased stimulation of thyroid tissue by TSH", "Autoimmune destruction of CNS myelin", "Obstruction of urine flow", "Crystal deposition in joints"],
        ans: 0, // A
        rationale: "Lack of iodine prevents T4 synthesis, leading to high TSH levels which stimulate the thyroid gland to grow (goiter).",
        topic: "Endocrine",
        pearl: "Iodine deficiency causes Goiter."
    },
    {
        id: 57,
        q: "A patient presents with fatigue, weight loss, hypotension, and skin darkening. Which endocrine process should be considered?",
        opts: ["Excess insulin production", "Primary adrenal insufficiency", "Biliary obstruction", "Dopamine excess"],
        ans: 1, // B
        rationale: "Addison's disease involves adrenal insufficiency, leading to low cortisol and skin hyperpigmentation.",
        topic: "Endocrine",
        pearl: "Addison = Cortisol Deficiency."
    },
    {
        id: 58,
        q: "Which electrolyte change is most consistent with primary adrenal insufficiency?",
        opts: ["Hypokalemia", "Hyperkalemia", "Hypercalcemia only", "Low uric acid"],
        ans: 1, // B
        rationale: "Lack of aldosterone (in Addison's) leads to sodium loss and potassium retention (hyperkalemia).",
        topic: "Endocrine",
        pearl: "Addison = High Potassium / Low Sodium."
    },
    {
        id: 59,
        q: "A patient with suspected adrenal crisis arrives weak, confused, and profoundly hypotensive. What is the priority concern?",
        opts: ["Risk of circulatory collapse", "Risk of gallstone formation", "Risk of cartilage loss", "Risk of urinary retention only"],
        ans: 0, // A
        rationale: "Acute adrenal crisis is a medical emergency due to profound hypotension and vascular collapse.",
        topic: "Endocrine",
        pearl: "Adrenal Crisis = Cardiovascular Shock."
    },
    {
        id: 60,
        q: "Which hormone is most directly involved in vascular response to physiologic stress?",
        opts: ["Insulin", "ADH", "Cortisol", "Calcitonin"],
        ans: 2, // C
        rationale: "Cortisol helps maintain blood pressure by increasing the sensitivity of vessels to catecholamines.",
        topic: "Endocrine",
        pearl: "Cortisol = Stress Hormone."
    },
    {
        id: 61,
        q: "A patient has central weight gain, thin extremities, bruising, and proximal muscle weakness. Which mechanism best explains these findings?",
        opts: ["Excess cortisol exposure", "Reduced dopamine production", "Low bile acid production", "Acute bacterial gastroenteritis"],
        ans: 0, // A
        rationale: "These are classic signs of Cushing's syndrome (hypercortisolism).",
        topic: "Endocrine",
        pearl: "Cushing = Moon Face + Buffalo Hump."
    },
    {
        id: 62,
        q: "Chronic excessive cortisol activity most commonly increases risk for which metabolic problem?",
        opts: ["Hypoglycemia", "Hyperglycemia", "Hematuria", "Steatorrhea"],
        ans: 1, // B
        rationale: "Cortisol is a glucocorticoid that raises blood glucose levels, potentially leading to 'steroid diabetes'.",
        topic: "Endocrine",
        pearl: "Cortisol raises Blood Sugar."
    },
    {
        id: 63,
        q: "A 15-year-old has not developed expected secondary sexual characteristics. Which concept is being assessed?",
        opts: ["Precocious puberty", "Menorrhagia", "Delayed puberty", "Endometritis"],
        ans: 2, // C
        rationale: "Delayed puberty is the absence of pubertal changes by age 13 in girls or 14 in boys.",
        topic: "Reproductive",
        pearl: "Delayed puberty is defined by age thresholds."
    },
    {
        id: 64,
        q: "A 28-year-old woman who previously had regular menstrual cycles reports no menstrual periods for the past 8 months. Which medical term best describes this finding?",
        opts: ["Amenorrhea", "Dysphagia", "Myositis", "Pyuria"],
        ans: 0, // A
        rationale: "Secondary amenorrhea is the absence of menses for 6 months in a woman who previously had cycles.",
        topic: "Reproductive",
        pearl: "Amenorrhea = Absence of menstruation."
    },
    {
        id: 65,
        q: "Which hormone surge most directly triggers ovulation?",
        opts: ["ADH", "TSH", "Cortisol", "LH"],
        ans: 3, // D
        rationale: "The Luteinizing Hormone (LH) surge triggers the release of the egg from the follicle.",
        topic: "Reproductive",
        pearl: "LH surge = Ovulation."
    },
    {
        id: 66,
        q: "A patient has irregular cycles, infertility, acne, and excess facial hair. Which evaluation best supports endocrine assessment?",
        opts: ["Hormonal profile including androgen levels", "Serum lipase only", "Chest X-ray", "Bone culture"],
        ans: 0, // A
        rationale: "Elevated androgens and irregular cycles are key diagnostic criteria for PCOS.",
        topic: "Reproductive",
        pearl: "PCOS diagnosis requires androgen assessment."
    },
    {
        id: 67,
        q: "A young adult develops painful testicular swelling after a viral illness. Which inflammatory process is most likely?",
        opts: ["Inflammation of the testes", "Enlargement of the prostate gland", "Endometrial infection", "Degeneration of cartilage"],
        ans: 0, // A
        rationale: "Orchitis is the inflammation of the testes, often caused by the mumps virus.",
        topic: "Reproductive",
        pearl: "Orchitis = Testicular inflammation."
    },
    {
        id: 68,
        q: "Severe recurrent testicular inflammation may increase risk for which long-term problem?",
        opts: ["Improved fertility", "Impaired fertility", "Hyperthyroidism", "Osteopenia"],
        ans: 1, // B
        rationale: "Inflammation can damage the seminiferous tubules, leading to impaired sperm production.",
        topic: "Reproductive",
        pearl: "Orchitis can lead to infertility."
    },
    {
        id: 69,
        q: "A patient undergoes surgical removal of one testis as part of treatment for a malignant tumor. Which procedure was performed?",
        opts: ["Orchiectomy", "Cystoscopy", "Cholecystectomy", "Colonoscopy"],
        ans: 0, // A
        rationale: "An orchiectomy is the surgical removal of one or both testes.",
        topic: "Reproductive",
        pearl: "Orchiectomy = Testis removal."
    },
    {
        id: 70,
        q: "A patient with localized testicular malignancy is scheduled for surgery. What is the primary therapeutic objective?",
        opts: ["Remove malignant tissue and reduce risk of disease progression", "Restore thyroid hormone production", "Improve pancreatic insulin secretion", "Reverse urinary tract obstruction"],
        ans: 0, // A
        rationale: "Surgery in localized cancer aims for complete resection of the tumor to prevent metastasis.",
        topic: "Reproductive",
        pearl: "Resection aims for cure in localized cancer."
    },
    {
        id: 71,
        q: "A patient leaks urine when coughing, laughing, or lifting. Which mechanism best explains the leakage?",
        opts: ["Excess ADH activity", "Increased abdominal pressure overcoming urethral support", "Kidney infection spreading upward", "Prostate enlargement only"],
        ans: 1, // B
        rationale: "Stress incontinence occurs when abdominal pressure exceeds the sphincter's closing pressure.",
        topic: "Renal",
        pearl: "Stress incontinence = Leaks with cough/sneeze."
    },
    {
        id: 72,
        q: "A patient with neurologic disease has impaired bladder emptying because bladder control pathways are disrupted. Which type of bladder dysfunction is most likely?",
        opts: ["Stress incontinence", "Functional incontinence", "Neurogenic bladder", "Menorrhagia"],
        ans: 2, // C
        rationale: "Neurogenic bladder results from nerve damage (e.g., spinal cord injury, MS) affecting bladder control.",
        topic: "Renal",
        pearl: "Neurogenic = Nerve-related bladder issue."
    },
    {
        id: 73,
        q: "A patient cannot reach the bathroom in time because of severe mobility impairment, but bladder function itself is intact. Which category best fits?",
        opts: ["Overflow incontinence", "Functional incontinence", "Stress incontinence", "Pyelonephritis"],
        ans: 1, // B
        rationale: "Functional incontinence is caused by physical or mental factors outside the urinary tract.",
        topic: "Renal",
        pearl: "Functional = Mobility/Cognitive issue."
    },
    {
        id: 74,
        q: "A patient develops sudden severe headache, vomiting, declining alertness, and blood visible on brain imaging. Which mechanism best explains the event?",
        opts: ["Temporary reversible vasospasm", "Bleeding into intracranial tissue", "Peripheral nerve compression", "Loss of pancreatic beta cells"],
        ans: 1, // B
        rationale: "Intracranial hemorrhage (e.g., hemorrhagic stroke) causes rapid onset of headache and neurologic decline.",
        topic: "Neurological",
        pearl: "Hemorrhagic stroke = Bleeding in brain."
    },
    {
        id: 75,
        q: "A patient experiences episodes of neurologic dysfunction affecting different body regions over several years. MRI reveals lesions in multiple locations within the central nervous system. Which process best explains the disease pattern?",
        opts: ["Progressive cartilage degeneration", "Episodic immune-mediated demyelination", "Crystal deposition in joints", "Obstruction of bile flow"],
        ans: 1, // B
        rationale: "Multiple Sclerosis is an immune-mediated demyelinating disease of the CNS.",
        topic: "Neurological",
        pearl: "MS = CNS Demyelination."
    },

    // PART 4 (76-100) - Hepatobiliary & Liver
    {
        id: 76,
        q: "A patient develops progressive jaundice, dark urine, and pale stools. Which physiologic process most likely explains these findings?",
        opts: ["Impaired excretion of bile pigments", "Dopamine depletion", "Autoimmune destruction of myelin", "Reduced thyroid hormone activity"],
        ans: 0, // A
        rationale: "Biliary obstruction prevents bilirubin from entering the intestine (pale stools) and forces it into the urine (dark urine).",
        topic: "Hepatobiliary",
        pearl: "Jaundice + Pale Stools = Biliary Obstruction."
    },
    {
        id: 77,
        q: "A patient develops acute hepatocellular injury after exposure to a viral pathogen. Laboratory studies reveal marked elevation of AST and ALT. These findings most directly indicate:",
        opts: ["Injury to liver cells resulting in leakage of intracellular contents", "Increased thyroid hormone production", "Obstruction of urinary flow", "Loss of pancreatic beta-cell function"],
        ans: 0, // A
        rationale: "AST and ALT are intracellular enzymes; their presence in the blood indicates liver cell damage (necrosis/leakage).",
        topic: "Hepatobiliary",
        pearl: "ALT/AST = Liver cell injury markers."
    },
    {
        id: 78,
        q: "A patient presents with fatigue, jaundice, and elevated liver enzymes. Which factor would most strongly suggest viral hepatitis rather than biliary obstruction?",
        opts: ["History of blood exposure risk", "Renal calculi", "Progressive osteoporosis", "Neurogenic bladder"],
        ans: 0, // A
        rationale: "Viral hepatitis (B/C) is primarily transmitted through blood and body fluids.",
        topic: "Hepatobiliary",
        pearl: "Hepatitis B/C = Bloodborne."
    },
    {
        id: 79,
        q: "A patient with chronic viral liver injury develops extensive liver fibrosis over many years. Which consequence becomes increasingly likely?",
        opts: ["Improved portal circulation", "Increased thyroid activity", "Portal hypertension", "Enhanced insulin sensitivity"],
        ans: 2, // C
        rationale: "Fibrosis in cirrhosis increases resistance to blood flow, causing portal hypertension.",
        topic: "Hepatobiliary",
        pearl: "Cirrhosis leads to Portal HTN."
    },
    {
        id: 80,
        q: "A patient with advanced portal hypertension develops progressive abdominal fluid accumulation. Which mechanism most directly contributes to this complication?",
        opts: ["Increased plasma oncotic pressure", "Impaired bilirubin conjugation alone", "Elevated portal venous hydrostatic pressure and reduced albumin production", "Increased dopamine synthesis"],
        ans: 2, // C
        rationale: "Ascites results from high hydrostatic pressure in portal vessels and low oncotic pressure due to hypoalbuminemia.",
        topic: "Hepatobiliary",
        pearl: "Ascites = Fluid in the abdomen."
    },
    {
        id: 81,
        q: "Why are patients with severe liver dysfunction at increased risk for bleeding complications?",
        opts: ["Reduced synthesis of clotting factors", "Excess dopamine production", "Increased calcium absorption", "Hyperthyroidism"],
        ans: 0, // A
        rationale: "The liver synthesizes most coagulation factors; failure leads to clotting deficiencies.",
        topic: "Hepatobiliary",
        pearl: "Liver failure = Bleeding risk."
    },
    {
        id: 82,
        q: "A patient with chronic liver injury develops architectural distortion of hepatic tissue and progressive resistance to portal blood flow. Which consequence most directly results?",
        opts: ["Portal hypertension", "Increased insulin sensitivity", "Reduced bilirubin production", "Hyperthyroidism"],
        ans: 0, // A
        rationale: "Distortion of the liver architecture (cirrhosis) blocks flow, resulting in portal hypertension.",
        topic: "Hepatobiliary",
        pearl: "Cirrhosis = High portal pressure."
    },
    {
        id: 83,
        q: "A patient with chronic cholestatic disease reports severe generalized itching despite minimal skin findings. Which mechanism most likely explains the symptom?",
        opts: ["Excess cortisol production", "Accumulation of bile constituents within tissues", "Dopamine deficiency", "Hyperglycemia"],
        ans: 1, // B
        rationale: "Pruritus (itching) in liver disease is often due to the buildup of bile salts in the skin.",
        topic: "Hepatobiliary",
        pearl: "Cholestasis = Bile salt pruritus."
    },
    {
        id: 84,
        q: "Which physiologic role is most directly performed by the liver?",
        opts: ["Production of cerebrospinal fluid", "Coordination of balance", "Metabolism and detoxification of substances", "Generation of action potentials"],
        ans: 2, // C
        rationale: "The liver is the primary organ for drug metabolism and detoxification.",
        topic: "Hepatobiliary",
        pearl: "Liver = The Body's Filter."
    },
    {
        id: 85,
        q: "A patient with advanced cirrhosis develops confusion, altered sleep patterns, and impaired concentration. Which mechanism most likely contributes to these symptoms?",
        opts: ["Accumulation of neurotoxic substances normally cleared by the liver", "Excess cortisol production", "Increased ADH secretion", "Progressive cartilage degeneration"],
        ans: 0, // A
        rationale: "Hepatic encephalopathy is caused by the accumulation of ammonia, which the liver fails to convert to urea.",
        topic: "Hepatobiliary",
        pearl: "Hepatic Encephalopathy = Ammonia toxicity."
    },
    {
        id: 86,
        q: "A patient with chronic liver disease asks which intervention most reduces future progression of alcohol-related hepatic injury.",
        opts: ["Continued alcohol consumption in moderation", "Increased sodium intake", "Complete alcohol cessation", "Increased dietary cholesterol"],
        ans: 2, // C
        rationale: "Abstinence from alcohol is the most critical intervention to stop the progression of alcoholic liver disease.",
        topic: "Hepatobiliary",
        pearl: "Stop drinking to save the liver."
    },
    {
        id: 87,
        q: "A patient develops severe swelling in both lower extremities and generalized edema due to advanced liver disease. Which mechanism most directly contributes?",
        opts: ["Increased serum albumin", "Reduced plasma oncotic pressure from decreased albumin production", "Hyperthyroidism", "Excess dopamine activity"],
        ans: 1, // B
        rationale: "Low albumin levels (hypoalbuminemia) reduce the 'pulling' force of blood, leading to systemic edema.",
        topic: "Hepatobiliary/Fluid",
        pearl: "Low Albumin = Fluid Leakage."
    },
    {
        id: 88,
        q: "A patient with advanced hepatic dysfunction develops peripheral edema and worsening ascites. Which physiologic change most directly contributes to both findings?",
        opts: ["Increased serum albumin production", "Elevated thyroid hormone activity", "Reduced plasma oncotic pressure caused by impaired protein synthesis", "Excess dopamine production"],
        ans: 2, // C
        rationale: "Both ascites and peripheral edema in liver failure are driven by low oncotic pressure (hypoalbuminemia).",
        topic: "Hepatobiliary/Fluid",
        pearl: "Liver failure = Low Albumin = Edema."
    },
    {
        id: 89,
        q: "Why does longstanding portal hypertension increase the risk of life-threatening upper gastrointestinal bleeding?",
        opts: ["Increased thyroid hormone activity", "Formation of fragile collateral venous channels exposed to high pressure", "Excess cortisol production", "Reduced urinary elimination"],
        ans: 1, // B
        rationale: "High pressure forces blood into collateral veins (like esophageal varices), which are thin-walled and prone to rupture.",
        topic: "Hepatobiliary",
        pearl: "Esophageal Varices = High Bleed Risk."
    },
    {
        id: 90,
        q: "A patient with known cirrhosis develops sudden massive hematemesis and hypotension. What is the priority concern?",
        opts: ["Risk of acute blood loss and shock", "Risk of osteoporosis", "Risk of delayed puberty", "Risk of gallstone formation"],
        ans: 0, // A
        rationale: "A variceal bleed is a life-threatening emergency due to rapid hemorrhagic shock.",
        topic: "Emergency",
        pearl: "Hematemesis in cirrhosis = Variceal emergency."
    },
    {
        id: 91,
        q: "Which mechanism most directly explains development of jaundice?",
        opts: ["Excess cortisol production", "Accumulation of bilirubin within tissues", "Hyperglycemia", "Reduced ADH secretion"],
        ans: 1, // B
        rationale: "Jaundice (icterus) is the yellow discoloration of tissues due to hyperbilirubinemia.",
        topic: "Hepatobiliary",
        pearl: "Jaundice = Bilirubin buildup."
    },
    {
        id: 92,
        q: "A patient presents with right upper quadrant discomfort and jaundice. Which additional finding would most strongly suggest biliary obstruction rather than primary hepatocellular injury?",
        opts: ["Pale stools and dark urine", "Tremor and rigidity", "Polyuria and polydipsia", "Ataxic gait"],
        ans: 0, // A
        rationale: "Pale (acholic) stools occur when bile pigments cannot reach the intestine due to obstruction.",
        topic: "Hepatobiliary",
        pearl: "Pale Stool = Obstruction."
    },
    {
        id: 93,
        q: "Which intervention most effectively reduces transmission risk of bloodborne viral hepatitis?",
        opts: ["Increased calcium intake", "Vaccination and avoidance of blood exposure", "Weight-bearing exercise", "Thyroid hormone replacement"],
        ans: 1, // B
        rationale: "Universal precautions and vaccination (for Hep B) are the primary preventatives for bloodborne hepatitis.",
        topic: "Hepatobiliary",
        pearl: "Blood exposure = Hepatitis B/C risk."
    },
    {
        id: 94,
        q: "A patient develops fat-soluble vitamin deficiencies due to chronic biliary obstruction. Which mechanism best explains the deficiency?",
        opts: ["Impaired bile delivery to the intestine", "Excess dopamine production", "Autoimmune demyelination", "Increased cortisol secretion"],
        ans: 0, // A
        rationale: "Bile is required for the emulsification and absorption of fat-soluble vitamins (A, D, E, K).",
        topic: "Hepatobiliary",
        pearl: "No Bile = No ADEK absorption."
    },
    {
        id: 95,
        q: "A patient with chronic liver disease develops prolonged bleeding after a minor procedure. Which laboratory test would most directly evaluate the affected physiologic process?",
        opts: ["Serum glucose", "Urine specific gravity", "Coagulation studies", "Bone density testing"],
        ans: 2, // C
        rationale: "Coagulation studies (PT/INR) assess the liver's ability to produce clotting factors.",
        topic: "Hepatobiliary/Hematology",
        pearl: "PT/INR measures liver synthesis of clotting factors."
    },
    {
        id: 96,
        q: "A patient develops longstanding portal hypertension. Which finding becomes increasingly likely?",
        opts: ["Splenomegaly", "Orchitis", "Osteoarthritis", "Neurogenic bladder"],
        ans: 0, // A
        rationale: "Blood backs up from the portal vein into the splenic vein, causing splenic congestion (enlargement).",
        topic: "Hepatobiliary",
        pearl: "Portal HTN = Big Spleen (Splenomegaly)."
    },
    {
        id: 97,
        q: "A patient with chronic hepatic dysfunction develops muscle wasting and unintended weight loss. Which process most likely contributes?",
        opts: ["Excessive thyroid hormone activity", "Impaired protein metabolism", "Increased dopamine synthesis", "Hypercalcemia"],
        ans: 1, // B
        rationale: "The liver is central to protein synthesis and nutrient metabolism; its failure leads to catabolism and wasting.",
        topic: "Hepatobiliary",
        pearl: "Liver failure = Catabolic state."
    },
    {
        id: 98,
        q: "A patient develops generalized itching before the onset of visible jaundice. Which process should be strongly considered?",
        opts: ["Cholestatic disease with bile salt accumulation", "Parkinson disease", "Chronic pyelonephritis", "Osteopenia"],
        ans: 0, // A
        rationale: "Itching is a common early sign of cholestasis (impaired bile flow).",
        topic: "Hepatobiliary",
        pearl: "Pruritus can precede jaundice."
    },
    {
        id: 99,
        q: "A patient with end-stage liver disease develops progressive inability to regulate metabolism, synthesize essential proteins, and remove toxic metabolites. Which outcome most directly results from failure of these functions?",
        opts: ["Mild osteopenia", "Seasonal allergic rhinitis", "Delayed puberty", "Progressive multisystem organ dysfunction"],
        ans: 3, // D
        rationale: "Liver failure impacts almost every system, eventually leading to multi-organ failure.",
        topic: "Hepatobiliary",
        pearl: "Liver failure is a systemic disaster."
    },
    {
        id: 100,
        q: "A patient develops ascites, hypoalbuminemia, portal hypertension, variceal bleeding, and hepatic encephalopathy. Which underlying pathophysiologic process best explains the simultaneous development of these findings?",
        opts: ["Progressive loss of hepatic functional capacity and distortion of hepatic architecture", "Autoimmune destruction of CNS myelin", "Degeneration of articular cartilage", "Dopamine depletion"],
        ans: 0, // A
        rationale: "These are all clinical manifestations of end-stage liver disease (cirrhosis).",
        topic: "Hepatobiliary",
        pearl: "Cirrhosis = Architecture loss + Function loss."
    },

    // PART 5 (101-125) - Hematology & Oncology
    {
        id: 101,
        q: "A patient develops progressive muscle pain and weakness accompanied by elevated muscle enzymes. Which pathophysiologic process is most likely occurring?",
        opts: ["Inflammatory injury of skeletal muscle", "Dopamine depletion", "Biliary obstruction", "Reduced thyroid hormone activity"],
        ans: 0, // A
        rationale: "Myositis involves inflammation of muscle fibers, leading to weakness and pain.",
        topic: "Musculoskeletal",
        pearl: "Myositis = Muscle Inflammation."
    },
    {
        id: 102,
        q: "Which laboratory finding most strongly supports active skeletal muscle injury?",
        opts: ["Elevated bilirubin", "Elevated creatine kinase", "Elevated troponin only", "Elevated TSH"],
        ans: 1, // B
        rationale: "Creatine kinase (CK) is an enzyme found in muscle; high levels indicate muscle cell breakdown.",
        topic: "Musculoskeletal",
        pearl: "CK = Muscle damage marker."
    },
    {
        id: 103,
        q: "A patient develops severe localized bone pain, fever, and elevated inflammatory markers. Which finding would most strongly support bone infection rather than inflammatory muscle disease?",
        opts: ["Elevated CK", "MRI evidence of bony destruction", "Symmetric proximal weakness", "Diffuse fatigue"],
        ans: 1, // B
        rationale: "MRI evidence of destruction or abscess within the bone is specific to osteomyelitis.",
        topic: "Musculoskeletal",
        pearl: "MRI is key for Osteomyelitis."
    },
    {
        id: 104,
        q: "A patient with chronic inflammatory muscle disease reports difficulty climbing stairs and rising from a chair. Which muscle group is most likely affected?",
        opts: ["Proximal muscles", "Extraocular muscles only", "Intrinsic hand muscles only", "Diaphragm exclusively"],
        ans: 0, // A
        rationale: "Inflammatory myopathies typically cause symmetric proximal muscle weakness (hips/shoulders).",
        topic: "Musculoskeletal",
        pearl: "Myositis weakness = Proximal (near the core)."
    },
    {
        id: 105,
        q: "Why does chronic inflammation increase risk of tissue injury?",
        opts: ["Persistent immune-mediated damage", "Increased bile production", "Reduced ADH secretion", "Dopamine excess"],
        ans: 0, // A
        rationale: "Chronic inflammation involves persistent release of reactive oxygen species and enzymes that damage normal tissue.",
        topic: "General Pathology",
        pearl: "Chronic Inflammation = Long-term tissue damage."
    },
    {
        id: 106,
        q: "A patient develops progressive numbness and tingling of the hands and feet. Which process most directly explains peripheral neuropathy?",
        opts: ["Damage to peripheral nerves", "Gallstone formation", "Reduced albumin production", "Thyroid enlargement"],
        ans: 0, // A
        rationale: "Peripheral neuropathy results from damage to the nerves outside the brain and spinal cord.",
        topic: "Neurological",
        pearl: "Neuropathy = Nerve damage (Stocking-glove pattern)."
    },
    {
        id: 107,
        q: "Nerve conduction studies demonstrate impaired transmission along peripheral nerves. Which finding would most likely accompany the disorder?",
        opts: ["Loss of sensation", "Hyperbilirubinemia", "Jaundice", "Ascites"],
        ans: 0, // A
        rationale: "Impaired nerve conduction manifests as sensory loss (numbness) or motor weakness.",
        topic: "Neurological",
        pearl: "Nerve conduction measures electrical speed."
    },
    {
        id: 108,
        q: "A patient with severe progressive peripheral neuropathy becomes unable to detect foot injuries. Which complication becomes more likely?",
        opts: ["Portal hypertension", "Chronic skin ulceration", "Endometritis", "Orchitis"],
        ans: 1, // B
        rationale: "Lack of pain sensation (protective sensation) leads to unrecognized trauma and ulcers (Diabetic foot).",
        topic: "Neurological/Endocrine",
        pearl: "No sensation = High ulcer risk."
    },
    {
        id: 109,
        q: "A patient presents with severe fatigue and pallor. Which physiologic process most directly explains reduced oxygen delivery in anemia?",
        opts: ["Reduced circulating oxygen-carrying capacity", "Reduced dopamine production", "Increased cortisol secretion", "Increased bile flow"],
        ans: 0, // A
        rationale: "Anemia is a deficiency in RBCs or hemoglobin, which carry oxygen to tissues.",
        topic: "Hematology",
        pearl: "Anemia = Low Oxygen delivery."
    },
    {
        id: 110,
        q: "Which laboratory finding most strongly supports iron deficiency?",
        opts: ["Elevated ferritin", "Elevated bilirubin", "Reduced ferritin", "Elevated amylase"],
        ans: 2, // C
        rationale: "Ferritin is the storage form of iron; low ferritin is the most specific marker for iron deficiency.",
        topic: "Hematology",
        pearl: "Low Ferritin = Low Iron stores."
    },
    {
        id: 111,
        q: "A patient develops fatigue, glossitis, and neurologic symptoms. Which deficiency should be strongly considered?",
        opts: ["Vitamin B12 deficiency", "Calcium deficiency", "Vitamin K deficiency", "Iodine deficiency"],
        ans: 0, // A
        rationale: "Vitamin B12 deficiency causes megaloblastic anemia and unique neurologic symptoms (demyelination).",
        topic: "Hematology",
        pearl: "B12 deficiency = Anemia + Neuropathy."
    },
    {
        id: 112,
        q: "Which feature most strongly distinguishes vitamin B12 deficiency from iron deficiency?",
        opts: ["Neurologic manifestations", "Pallor", "Fatigue", "Reduced exercise tolerance"],
        ans: 0, // A
        rationale: "Unlike iron deficiency, B12 deficiency causes damage to the myelin sheaths of the spinal cord and peripheral nerves.",
        topic: "Hematology",
        pearl: "B12 has neuro signs; Iron does not."
    },
    {
        id: 113,
        q: "A patient presents with enlarged cervical lymph nodes, fever, and unintentional weight loss. Which category of disease should be strongly considered?",
        opts: ["Lymphoproliferative disorder", "Osteoarthritis", "Nephrolithiasis", "Cholelithiasis"],
        ans: 0, // A
        rationale: "Painless lymphadenopathy and systemic 'B-symptoms' are indicative of lymphoma.",
        topic: "Hematology/Oncology",
        pearl: "Enlarged lymph nodes + Weight loss = Lymphoma suspicion."
    },
    {
        id: 114,
        q: "Why do many malignancies cause unintended weight loss?",
        opts: ["Increased metabolic demand and inflammatory signaling", "Increased albumin production", "Reduced glucose utilization", "Increased bone density"],
        ans: 0, // A
        rationale: "Cancer cells compete for nutrients, and tumors release cytokines (like TNF-alpha) that cause cachexia.",
        topic: "Oncology",
        pearl: "Cancer Cachexia = Tumor-driven wasting."
    },
    {
        id: 115,
        q: "A patient with untreated malignancy develops widespread metastatic disease. Which consequence becomes more likely?",
        opts: ["Localized symptoms only", "Multi-organ dysfunction", "Improved prognosis", "Increased fertility"],
        ans: 1, // B
        rationale: "Metastasis involves cancer spreading to other organs (liver, lungs, bone), causing systemic failure.",
        topic: "Oncology",
        pearl: "Metastasis = Systemic spread."
    },
    {
        id: 116,
        q: "A patient receiving chemotherapy develops fever and profound neutropenia. What is the priority concern?",
        opts: ["Opportunistic infection", "Gallstone formation", "Hyperthyroidism", "Osteopenia"],
        ans: 0, // A
        rationale: "Neutropenic fever is a medical emergency because the patient lacks the WBCs to fight even minor infections.",
        topic: "Oncology/Emergency",
        pearl: "Neutropenia = Severe infection risk."
    },
    {
        id: 117,
        q: "Why does neutropenia increase infection risk?",
        opts: ["Reduced ability to mount effective immune defense", "Increased cortisol production", "Reduced thyroid activity", "Increased bilirubin production"],
        ans: 0, // A
        rationale: "Neutrophils are the primary defense against bacterial and fungal infections.",
        topic: "Hematology/Immune",
        pearl: "Low Neutrophils = Compromised defense."
    },
    {
        id: 118,
        q: "A patient presents with unexplained bruising and recurrent bleeding. Which laboratory study should be prioritized?",
        opts: ["Bone density scan", "Coagulation studies", "Spirometry", "Thyroid ultrasound"],
        ans: 1, // B
        rationale: "Coagulation studies (PT, PTT, Platelet count) are the first step in evaluating a bleeding disorder.",
        topic: "Hematology",
        pearl: "Bruising needs coagulation workup."
    },
    {
        id: 119,
        q: "Which process most directly contributes to thrombus formation?",
        opts: ["Endothelial injury promoting coagulation", "Dopamine depletion", "Reduced bile secretion", "Hyperthyroidism"],
        ans: 0, // A
        rationale: "Damage to the vessel lining (endothelium) exposes collagen and triggers the clotting cascade.",
        topic: "Hematology/Vascular",
        pearl: "Endothelial injury = Clot starting point."
    },
    {
        id: 120,
        q: "A thrombus dislodges and travels through the circulation. It is now best described as:",
        opts: ["Hematoma", "Abscess", "Embolus", "Osteophyte"],
        ans: 2, // C
        rationale: "An embolus is any detached mass (clot, air, fat) that travels through the bloodstream.",
        topic: "Hematology/Vascular",
        pearl: "Embolus = A traveler."
    },
    {
        id: 121,
        q: "A patient develops unilateral leg swelling and calf pain. Which vascular condition should be strongly considered?",
        opts: ["Deep vein thrombosis", "Celiac disease", "Endometritis", "Parkinson disease"],
        ans: 0, // A
        rationale: "Unilateral swelling and pain are classic signs of DVT in the lower extremity.",
        topic: "Vascular",
        pearl: "DVT = Clot in deep vein."
    },
    {
        id: 122,
        q: "A patient presents with chest pain and shortness of breath after a known DVT. Which complication should be considered first?",
        opts: ["Osteomyelitis", "Pulmonary embolism", "Orchitis", "Diverticulitis"],
        ans: 1, // B
        rationale: "The most dangerous complication of DVT is the clot traveling to the lungs (PE).",
        topic: "Emergency",
        pearl: "DVT -> PE = Life-threatening."
    },
    {
        id: 123,
        q: "Which intervention most effectively reduces risk of hospital-acquired venous thrombosis?",
        opts: ["Early mobilization", "Increased cholesterol intake", "Fluid restriction", "Calcium supplementation"],
        ans: 0, // A
        rationale: "Walking (ambulation) prevents venous stasis, one of the three parts of Virchow's triad.",
        topic: "Vascular",
        pearl: "Keep moving to prevent clots."
    },
    {
        id: 124,
        q: "A patient has prolonged immobility, recent surgery, and unilateral leg swelling. Which pathophysiologic process best explains the findings?",
        opts: ["Venous thrombosis formation", "Dopamine deficiency", "Autoimmune demyelination", "Reduced thyroid hormone production"],
        ans: 0, // A
        rationale: "Surgery and immobility are major risk factors for the development of venous clots.",
        topic: "Vascular",
        pearl: "Stasis + Injury = Thrombosis."
    },
    {
        id: 125,
        q: "Why can pulmonary embolism rapidly become life-threatening?",
        opts: ["It obstructs blood flow through the pulmonary circulation", "It increases bile production", "It causes osteoporosis", "It reduces urine output"],
        ans: 0, // A
        rationale: "A large PE can block all blood flow to the lungs, causing instant cardiac arrest or severe hypoxia.",
        topic: "Emergency",
        pearl: "PE = Lung circulation blockage."
    },

    // PART 6 (126-150) - Hematology & Respiratory
    {
        id: 126,
        q: "A patient develops progressive fatigue, exertional dyspnea, and reduced exercise tolerance. Laboratory studies reveal reduced hemoglobin concentration. Which physiologic consequence most directly explains the symptoms?",
        opts: ["Reduced oxygen delivery to tissues", "Increased bile production", "Dopamine depletion", "Excess thyroid hormone activity"],
        ans: 0, // A
        rationale: "Lower hemoglobin means less oxygen is delivered to working muscles during exercise.",
        topic: "Hematology",
        pearl: "Low Hgb = Low tissue oxygenation."
    },
    {
        id: 127,
        q: "Why does severe anemia often produce tachycardia?",
        opts: ["Increased intracranial pressure", "Compensatory attempt to maintain tissue oxygen delivery", "Reduced ADH secretion", "Hyperbilirubinemia"],
        ans: 1, // B
        rationale: "The heart pumps faster to try and circulate the limited oxygenated blood more frequently.",
        topic: "Hematology",
        pearl: "Tachycardia is a compensatory mechanism."
    },
    {
        id: 128,
        q: "A patient presents with fatigue and pallor. Which additional finding would most strongly suggest iron deficiency rather than acute blood loss?",
        opts: ["Low ferritin stores", "Sudden hypotension", "Visible hemorrhage", "Acute abdominal trauma"],
        ans: 0, // A
        rationale: "Low ferritin reflects depleted iron stores, indicating a chronic, progressive deficiency.",
        topic: "Hematology",
        pearl: "Ferritin = Long-term iron storage."
    },
    {
        id: 129,
        q: "A patient with severe untreated anemia develops chest discomfort during exertion. Which mechanism most likely contributes?",
        opts: ["Reduced cerebral perfusion", "Increased portal pressure", "Myocardial oxygen supply-demand mismatch", "Biliary obstruction"],
        ans: 2, // C
        rationale: "The heart muscle (myocardium) isn't getting enough oxygen for the work it's doing (exertion).",
        topic: "Hematology/Cardiovascular",
        pearl: "Anemia can cause Angina."
    },
    {
        id: 130,
        q: "A patient presents with recurrent bruising and prolonged bleeding after minor injuries. Which physiologic process should be evaluated first?",
        opts: ["Coagulation function", "Bile production", "Dopamine metabolism", "Thyroid hormone synthesis"],
        ans: 0, // A
        rationale: "Hemostasis (coagulation) is the body's system for stopping bleeding; its failure causes easy bruising.",
        topic: "Hematology",
        pearl: "Hemostasis = Stopping the bleed."
    },
    {
        id: 131,
        q: "Which laboratory study most directly evaluates the body’s ability to form stable blood clots?",
        opts: ["Bone density testing", "Spirometry", "Thyroid panel", "Coagulation studies"],
        ans: 3, // D
        rationale: "Coagulation studies (PT, PTT, INR) measure the time it takes for a clot to form.",
        topic: "Hematology",
        pearl: "PT/PTT = Clotting time."
    },
    {
        id: 132,
        q: "Why do platelet disorders increase bleeding risk?",
        opts: ["Reduced primary hemostatic plug formation", "Increased albumin production", "Hyperthyroidism", "Reduced bilirubin metabolism"],
        ans: 0, // A
        rationale: "Platelets are the first line of defense; they form the 'plug' that initially seals a wound.",
        topic: "Hematology",
        pearl: "Platelets = The initial plug."
    },
    {
        id: 133,
        q: "A patient presents with spontaneous bruising but normal platelet counts. Which category of disorder should be considered?",
        opts: ["Coagulation factor abnormality", "Gallstone disease", "Osteoarthritis", "Parkinson disease"],
        ans: 0, // A
        rationale: "If platelets are normal, the problem likely lies in the clotting cascade (e.g., Hemophilia).",
        topic: "Hematology",
        pearl: "Normal platelets + bleeding = Factor issue."
    },
    {
        id: 134,
        q: "A patient develops uncontrolled hemorrhage following trauma. Which complication poses the greatest immediate threat?",
        opts: ["Osteopenia", "Hypovolemic shock", "Delayed puberty", "Endometritis"],
        ans: 1, // B
        rationale: "Massive blood loss leads to hypovolemia, resulting in inadequate tissue perfusion (shock).",
        topic: "Emergency",
        pearl: "Hemorrhage -> Hypovolemic Shock."
    },
    {
        id: 135,
        q: "A patient with active hemorrhage becomes confused, tachycardic, and hypotensive. What is the priority concern?",
        opts: ["Reduced cerebral perfusion due to blood loss", "Hyperthyroidism", "Cholelithiasis", "Amenorrhea"],
        ans: 0, // A
        rationale: "Hypotension and confusion indicate that the brain is not receiving enough blood/oxygen.",
        topic: "Emergency",
        pearl: "Confusion in shock = Poor brain perfusion."
    },
    {
        id: 136,
        q: "Which mechanism most directly contributes to edema formation?",
        opts: ["Increased plasma oncotic pressure", "Reduced movement of fluid into tissues", "Alteration of normal fluid balance forces", "Excess dopamine production"],
        ans: 2, // C
        rationale: "Edema is caused by an imbalance between hydrostatic and oncotic pressures in the capillaries.",
        topic: "Fluid Balance",
        pearl: "Edema = Fluid shift to interstitial space."
    },
    {
        id: 137,
        q: "A patient develops bilateral lower-extremity edema and elevated jugular venous pressure. Which physiologic process is most likely contributing?",
        opts: ["Impaired venous return and fluid accumulation", "Hyperbilirubinemia", "Osteomyelitis", "Delayed puberty"],
        ans: 0, // A
        rationale: "These are classic signs of systemic venous congestion, usually due to heart failure.",
        topic: "Cardiovascular/Fluid",
        pearl: "Bilateral edema + JVD = Systemic backup."
    },
    {
        id: 138,
        q: "Persistent tissue edema increases risk for which complication?",
        opts: ["Improved tissue oxygenation", "Enhanced wound healing", "Reduced infection risk", "Impaired tissue integrity and skin breakdown"],
        ans: 3, // D
        rationale: "Swelling stretches the skin and separates cells from their blood supply, making them prone to injury.",
        topic: "General Pathology",
        pearl: "Edema makes skin fragile."
    },
    {
        id: 139,
        q: "A patient develops sudden swelling of one calf, warmth, and localized tenderness. Which diagnosis should be strongly considered?",
        opts: ["Osteomyelitis", "Deep vein thrombosis", "Hypothyroidism", "Cirrhosis"],
        ans: 1, // B
        rationale: "Unilateral leg symptoms (swelling/pain) are highly suspicious for a DVT.",
        topic: "Vascular",
        pearl: "Think DVT for unilateral leg pain."
    },
    {
        id: 140,
        q: "Ultrasound confirms venous thrombosis in the lower extremity. Which complication poses the greatest immediate danger?",
        opts: ["Pulmonary embolism", "Osteoporosis", "Amenorrhea", "Diverticulitis"],
        ans: 0, // A
        rationale: "The 'next step' for a DVT is often becoming a PE, which can be fatal.",
        topic: "Vascular/Emergency",
        pearl: "PE is the biggest DVT danger."
    },
    {
        id: 141,
        q: "Which intervention most effectively reduces risk of venous thromboembolism in hospitalized patients?",
        opts: ["Increased dietary cholesterol", "Fluid restriction", "Early ambulation and mobility", "Increased sodium intake"],
        ans: 2, // C
        rationale: "Walking uses the 'calf muscle pump' to move venous blood back to the heart, preventing stasis.",
        topic: "Vascular/Nursing",
        pearl: "Ambulation prevents VTE."
    },
    {
        id: 142,
        q: "Why does prolonged immobility increase thrombus formation risk?",
        opts: ["Increased venous stasis", "Increased bile secretion", "Excess dopamine production", "Reduced cortisol activity"],
        ans: 0, // A
        rationale: "Stagnant blood is more likely to clot (Virchow's triad).",
        topic: "Vascular",
        pearl: "Stasis = Clotting risk."
    },
    {
        id: 143,
        q: "A patient develops a pulmonary embolism. Which physiologic consequence most directly explains acute hypoxemia?",
        opts: ["Increased albumin synthesis", "Impaired pulmonary perfusion relative to ventilation", "Increased thyroid hormone release", "Reduced bilirubin metabolism"],
        ans: 1, // B
        rationale: "A PE causes a V/Q mismatch: the air is there (ventilation), but the blood is blocked (perfusion).",
        topic: "Respiratory/Emergency",
        pearl: "PE = Perfusion failure."
    },
    {
        id: 144,
        q: "A patient with a massive pulmonary embolism becomes hypotensive and severely dyspneic. Which process is most likely occurring?",
        opts: ["Acute right ventricular strain and circulatory compromise", "Gallstone obstruction", "Hyperthyroidism", "Osteomyelitis"],
        ans: 0, // A
        rationale: "A massive PE increases the pressure the right heart must pump against, leading to right-side failure.",
        topic: "Emergency",
        pearl: "Massive PE = Right Heart Strain."
    },
    {
        id: 145,
        q: "A patient develops fever, productive cough, and localized crackles on lung examination. Which process is most likely occurring?",
        opts: ["Peripheral neuropathy", "Pneumonia", "Amenorrhea", "Osteopenia"],
        ans: 1, // B
        rationale: "Infection of the lung parenchyma (pneumonia) causes inflammatory exudate and systemic symptoms.",
        topic: "Respiratory",
        pearl: "Pneumonia = Lung infection."
    },
    {
        id: 146,
        q: "A patient with bacterial pneumonia develops leukocytosis. What does this finding most directly indicate?",
        opts: ["Immune system activation", "Dopamine depletion", "Biliary obstruction", "Reduced thyroid function"],
        ans: 0, // A
        rationale: "Leukocytosis (high WBC count) is a normal response to infection.",
        topic: "Infectious/Immune",
        pearl: "Leukocytosis = High WBCs."
    },
    {
        id: 147,
        q: "A patient reports chronic cough, progressive dyspnea, and a long history of cigarette smoking. Which disease category should be strongly considered?",
        opts: ["Inflammatory bowel disease", "Chronic obstructive pulmonary disease", "Endometritis", "Osteomyelitis"],
        ans: 1, // B
        rationale: "Smoking is the primary cause of COPD (Chronic Bronchitis and Emphysema).",
        topic: "Respiratory",
        pearl: "Smoking -> COPD."
    },
    {
        id: 148,
        q: "Which mechanism most directly contributes to airflow limitation in chronic obstructive pulmonary disease?",
        opts: ["Progressive obstruction and loss of normal airway function", "Increased bile production", "Hyperthyroidism", "Reduced coagulation activity"],
        ans: 0, // A
        rationale: "Airway inflammation and alveolar destruction lead to permanent airflow obstruction.",
        topic: "Respiratory",
        pearl: "COPD = Permanent obstruction."
    },
    {
        id: 149,
        q: "A patient with advanced chronic lung disease develops chronic hypoxemia. Which complication becomes increasingly likely?",
        opts: ["Hyperthyroidism", "Delayed puberty", "Pulmonary hypertension", "Endometritis"],
        ans: 2, // C
        rationale: "Hypoxia causes pulmonary vasoconstriction, leading to high pressure in the lung vessels.",
        topic: "Respiratory/Cardiovascular",
        pearl: "Hypoxia -> Pulmonary HTN."
    },
    {
        id: 150,
        q: "A hospitalized patient develops unilateral leg swelling, followed several days later by sudden chest pain, dyspnea, hypoxemia, and tachycardia. Which pathophysiologic sequence best explains these findings?",
        opts: ["Autoimmune demyelination followed by renal failure", "Deep vein thrombosis followed by pulmonary embolism", "Gallstone formation followed by pancreatitis", "Cirrhosis followed by portal hypertension"],
        ans: 1, // B
        rationale: "The sequence of unilateral swelling (DVT) followed by sudden respiratory distress (PE) is a classic medical emergency.",
        topic: "Emergency/Vascular",
        pearl: "DVT and PE are two sides of the same coin."
    }
];
