/**
 * Registry for Recall Decks.
 */

export const RECALL_DECKS = [
    {
        id: 'mod1',
        name: 'MODULE 1: FOUNDATIONS',
        module: 1,
        description: 'Cellular injury, hemodynamics, and inflammation.',
        cards: [
            {
                id: 'm1_c1',
                category: 'Physiology',
                topic: 'Cellular Injury',
                front: 'What is the most common cause of cellular injury?',
                back: 'Hypoxia',
                explanation: 'Hypoxia (oxygen deprivation) is the most common cause of cell injury and death.',
                mechanism: 'Reduced O2 → Decreased ATP → Na+/K+ Pump Failure → Cellular Swelling',
                pearl: 'Ischemia is the most common cause of hypoxia.'
            }
        ]
    },
    {
        id: 'mod2',
        name: 'MODULE 2: HEMATOLOGY',
        module: 2,
        description: 'Immunity, oncology, and hematological disorders.',
        cards: [
            {
                id: 'm2_c1',
                category: 'Immunology',
                topic: 'Adaptive Immunity',
                front: 'Which cells are responsible for humoral immunity?',
                back: 'B-lymphocytes',
                explanation: 'B-cells differentiate into plasma cells that secrete antibodies.',
                mechanism: 'Antigen Recognition → B-cell Activation → Plasma Cell Differentiation → Antibody Secretion',
                pearl: 'T-cells are for cell-mediated immunity; B-cells are for humoral.'
            }
        ]
    },
    {
        id: 'mod3',
        name: 'MODULE 3: CARDIOPULMONARY',
        module: 3,
        description: 'Cardiac, pulmonary, and hemodynamic crisis.',
        cards: [
            {
                id: 'm3_c1',
                category: 'Cardiovascular',
                topic: 'Heart Failure',
                front: 'What is the hallmark clinical sign of Left-Sided Heart Failure?',
                back: 'Pulmonary Edema',
                explanation: 'Backup of blood into the lungs increases hydrostatic pressure, causing fluid leakage into alveoli.',
                mechanism: 'LV Failure → Increased LA Pressure → Increased Pulmonary Venous Pressure → Pulmonary Edema',
                pearl: 'Right-sided failure typically presents with systemic edema (JVD, hepatomegaly).'
            }
        ]
    },
    {
        id: 'mod4',
        name: 'MODULE 4: MUSCULOSKELETAL',
        module: 4,
        description: 'Bone remodeling, MSK pathology, and trauma.',
        cards: [
            // ==========================================
            // 01 FOUNDATIONS
            // ==========================================
            {
                id: 'm4_f1',
                category: 'Foundations',
                topic: '01 Foundations',
                front: 'What are the two major components of the bone matrix?',
                back: 'Organic Matrix (Collagen) and Inorganic Matrix (Calcium Phosphate)',
                explanation: 'Bone must balance strength and flexibility. Organic matrix provides tensile strength, while inorganic matrix provides hardness.',
                mechanism: 'Collagen + Calcium Phosphate → Balanced Bone Matrix',
                pearl: 'Without collagen, bone is brittle; without minerals, bone is soft.',
                subdeck: '01 Foundations',
                disease: 'Normal Physiology',
                difficultyLevel: 1,
                difficulty: 0.2,
                importance: 'Critical',
                tags: ['Physiology', 'Foundations'],
                sourceSection: 'III. BONE MATRIX'
            },
            {
                id: 'm4_f2',
                category: 'Foundations',
                topic: '01 Foundations',
                front: 'Which type of bone has high metabolic activity and is more vulnerable to osteoclast overactivity?',
                back: 'Trabecular Bone (Cancellous/Spongy Bone)',
                explanation: 'Trabecular bone has a large surface area and extensive blood supply, making its remodeling rate much higher than cortical bone.',
                mechanism: 'High Surface Area + Blood Supply → Rapid Remodeling → Vulnerability',
                pearl: 'Vertebral compression fractures commonly occur in trabecular bone.',
                subdeck: '01 Foundations',
                disease: 'Normal Physiology',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Physiology', 'Foundations'],
                sourceSection: 'IV. TYPES OF BONE'
            },
            {
                id: 'm4_f3',
                category: 'Foundations',
                topic: '01 Foundations',
                front: 'Which bone cell coordinates the remodeling process by monitoring mechanical stress?',
                back: 'Osteocytes',
                explanation: 'Osteocytes are mature bone cells embedded in the matrix that act as "sensors" for mechanical loading.',
                mechanism: 'Mechanical Stress → Osteocyte Activation → Signaling to Osteoblasts/clasts',
                pearl: 'This is the cellular basis of Wolff\'s Law.',
                subdeck: '01 Foundations',
                disease: 'Normal Physiology',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Physiology', 'Foundations'],
                sourceSection: 'V. BONE CELLS'
            },
            {
                id: 'm4_f4',
                category: 'Foundations',
                topic: '01 Foundations',
                front: 'Explain Wolff\'s Law.',
                back: 'Bone adapts to the mechanical stress placed upon it.',
                explanation: 'Increased loading leads to osteoblast stimulation and bone deposition, while immobilization leads to bone loss.',
                mechanism: 'Loading → Osteocyte Signal → Osteoblast Activity > Osteoclast Activity → Increased Density',
                pearl: 'Exercise strengthens bone; bed rest weakens it.',
                subdeck: '01 Foundations',
                disease: 'Normal Physiology',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Physiology', 'Foundations'],
                sourceSection: 'VII. HORMONAL REGULATION'
            },
            {
                id: 'm4_f5',
                category: 'Foundations',
                topic: '01 Foundations',
                front: 'What is the role of Estrogen in bone health?',
                back: 'Estrogen suppresses excessive osteoclast activation.',
                explanation: 'Estrogen inhibits RANKL signaling, which normally triggers osteoclast maturation.',
                mechanism: 'Estrogen → ↓ RANKL Signaling → ↓ Osteoclast Activation → Bone Preservation',
                pearl: 'Postmenopausal estrogen loss is the primary driver of osteoporosis in women.',
                subdeck: '01 Foundations',
                disease: 'Normal Physiology',
                difficultyLevel: 3,
                difficulty: 0.4,
                importance: 'Critical',
                tags: ['Physiology', 'Endocrinology'],
                sourceSection: 'VII. HORMONAL REGULATION'
            },
            {
                id: 'm4_f6',
                category: 'Foundations',
                topic: '01 Foundations',
                front: 'Why does articular cartilage have poor healing capacity?',
                back: 'It has a very poor blood supply.',
                explanation: 'Without direct blood supply, nutrient delivery and waste removal for repair are limited.',
                mechanism: 'Avascularity → Limited Chondrocyte Repair Capacity → Progressive Degeneration',
                pearl: 'This is why osteoarthritis is often a progressive, irreversible condition.',
                subdeck: '01 Foundations',
                disease: 'Normal Physiology',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Physiology', 'Joints'],
                sourceSection: 'VIII. JOINT PHYSIOLOGY'
            },
            {
                id: 'm4_f7',
                category: 'Foundations',
                topic: '01 Foundations',
                front: 'What are the two regions of an intervertebral disc?',
                back: 'Nucleus Pulposus (gel center) and Annulus Fibrosus (fibrous ring)',
                explanation: 'The nucleus absorbs compression while the annulus contains the pressure.',
                mechanism: 'Nucleus (Hydration) + Annulus (Strength) → Shock Absorption',
                pearl: 'Disc height loss starts with dehydration of the nucleus pulposus.',
                subdeck: '01 Foundations',
                disease: 'Normal Physiology',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'Medium',
                tags: ['Physiology', 'Spine'],
                sourceSection: 'IX. INTERVERTEBRAL DISC'
            },

            // ==========================================
            // 02 OSTEOPOROSIS
            // ==========================================
            {
                id: 'm4_op1',
                category: 'Pathophysiology',
                topic: '02 Osteoporosis',
                front: 'What is the central problem in Osteoporosis?',
                back: 'Bone resorption exceeds bone formation.',
                explanation: 'The homeostatic balance between osteoclasts and osteoblasts is lost, leading to decreased density.',
                mechanism: 'Chronic Osteoclast Overactivity > Osteoblast Activity → Weakened Architecture',
                pearl: 'It is a disease of density loss, not necessarily mineralization loss.',
                subdeck: '02 Osteoporosis',
                disease: 'Osteoporosis',
                difficultyLevel: 1,
                difficulty: 0.2,
                importance: 'Critical',
                tags: ['Disease', 'Metabolic'],
                sourceSection: 'XV. OSTEOPOROSIS'
            },
            {
                id: 'm4_op2',
                category: 'Clinical',
                topic: '02 Osteoporosis',
                front: 'What clinical findings suggest vertebral compression fractures in Osteoporosis?',
                back: 'Gradual height loss and thoracic kyphosis.',
                explanation: 'As trabecular bone in the vertebrae weakens, the vertebrae collapse under gravity.',
                mechanism: 'Vertebral Weakening → Compression → Wedge-shaped Collapse → Kyphosis',
                pearl: 'Height loss > 1.5 inches is a major red flag.',
                subdeck: '02 Osteoporosis',
                disease: 'Osteoporosis',
                difficultyLevel: 3,
                difficulty: 0.4,
                importance: 'High',
                tags: ['Clinical', 'Signs'],
                sourceSection: 'XV. OSTEOPOROSIS'
            },
            {
                id: 'm4_op3',
                category: 'Clinical',
                topic: '02 Osteoporosis',
                front: 'Define a "Fragility Fracture".',
                back: 'A fracture occurring after minimal trauma (e.g., falling from standing height).',
                explanation: 'Healthy bone should withstand minor falls; fragility fractures are pathognomonic for weakened bone architecture.',
                mechanism: 'Loss of Structural Integrity → Inability to Distribute Force → Fracture from Minor Stress',
                pearl: 'Fragility fractures are the "silent" first symptom of osteoporosis.',
                subdeck: '02 Osteoporosis',
                disease: 'Osteoporosis',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Clinical', 'Terminology'],
                sourceSection: 'XV. OSTEOPOROSIS'
            },
            {
                id: 'm4_op4',
                category: 'Pathophysiology',
                topic: '02 Osteoporosis',
                front: 'How do chronic glucocorticoids (steroids) cause Osteoporosis?',
                back: 'They suppress osteoblasts and increase bone breakdown.',
                explanation: 'Glucocorticoids impair osteoblast function and survival while potentially increasing osteoclast activity.',
                mechanism: 'Steroids → ↓ Osteoblast Formation → ↓ Calcium Absorption → Bone Loss',
                pearl: 'Steroid-induced osteoporosis is the most common form of secondary osteoporosis.',
                subdeck: '02 Osteoporosis',
                disease: 'Osteoporosis',
                difficultyLevel: 4,
                difficulty: 0.5,
                importance: 'High',
                tags: ['Disease', 'Secondary'],
                sourceSection: 'XV. OSTEOPOROSIS'
            },

            // ==========================================
            // 03 OSTEOARTHRITIS
            // ==========================================
            {
                id: 'm4_oa1',
                category: 'Pathophysiology',
                topic: '03 Osteoarthritis',
                front: 'What is the hallmark structural change in Osteoarthritis (OA)?',
                back: 'Progressive degeneration of articular cartilage.',
                explanation: 'OA is a degenerative "wear and tear" disease where the cartilage protective layer fails.',
                mechanism: 'Mechanical Stress → Chondrocyte Injury → Cartilage Thinning → Joint Space Narrowing',
                pearl: 'OA is primarily degenerative, whereas Rheumatoid Arthritis is autoimmune.',
                subdeck: '03 Osteoarthritis',
                disease: 'Osteoarthritis',
                difficultyLevel: 1,
                difficulty: 0.2,
                importance: 'Critical',
                tags: ['Disease', 'Degenerative'],
                sourceSection: 'XVI. OSTEOARTHRITIS'
            },
            {
                id: 'm4_oa2',
                category: 'Clinical',
                topic: '03 Osteoarthritis',
                front: 'Describe the classic pain pattern of Osteoarthritis.',
                back: 'Pain that worsens with activity and improves with rest.',
                explanation: 'Movement increases friction on damaged surfaces; rest allows inflammation to settle slightly.',
                mechanism: 'Use → Friction on Exposed Bone → Cytokine Release → Pain',
                pearl: 'If pain improves with movement, consider an inflammatory/autoimmune etiology instead.',
                subdeck: '03 Osteoarthritis',
                disease: 'Osteoarthritis',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Clinical', 'Signs'],
                sourceSection: 'XVI. OSTEOARTHRITIS'
            },
            {
                id: 'm4_oa3',
                category: 'Clinical',
                topic: '03 Osteoarthritis',
                front: 'What are "Osteophytes"?',
                back: 'Bone spurs formed at joint margins due to abnormal mechanical stress.',
                explanation: 'As cartilage is lost, the body attempts to stabilize the joint by growing extra bone at the edges.',
                mechanism: 'Cartilage Loss → Direct Bone Stress → Osteoblast Stimulation → Osteophytes',
                pearl: 'Osteophytes limit range of motion and contribute to crepitus.',
                subdeck: '03 Osteoarthritis',
                disease: 'Osteoarthritis',
                difficultyLevel: 3,
                difficulty: 0.4,
                importance: 'Medium',
                tags: ['Clinical', 'Imaging'],
                sourceSection: 'XVI. OSTEOARTHRITIS'
            },
            {
                id: 'm4_oa4',
                category: 'Clinical',
                topic: '03 Osteoarthritis',
                front: 'Define "Crepitus" in the context of MSK.',
                back: 'A grinding or crunching sensation during joint movement.',
                explanation: 'Caused by rough, irregular joint surfaces (bone-on-bone) rubbing against each other.',
                mechanism: 'Irregular Surface → Friction → Audible/Palpable Grinding',
                pearl: 'Crepitus is a classic finding in advanced OA.',
                subdeck: '03 Osteoarthritis',
                disease: 'Osteoarthritis',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Clinical', 'Signs'],
                sourceSection: 'XVI. OSTEOARTHRITIS'
            },

            // ==========================================
            // 04 DEGENERATIVE DISC DISEASE
            // ==========================================
            {
                id: 'm4_ddd1',
                category: 'Pathophysiology',
                topic: '04 Degenerative Disc Disease',
                front: 'What is the primary driver of Degenerative Disc Disease (DDD)?',
                back: 'Loss of disc hydration (dehydration).',
                explanation: 'Aging and stress lead to loss of water content in the nucleus pulposus, reducing shock absorption.',
                mechanism: 'Aging/Stress → ↓ Water in Nucleus → ↓ Disc Height → Structural Failure',
                pearl: 'Loss of disc height is a major radiographic feature of DDD.',
                subdeck: '04 Degenerative Disc Disease',
                disease: 'DDD',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Disease', 'Spine'],
                sourceSection: 'XVII. DEGENERATIVE DISC DISEASE'
            },
            {
                id: 'm4_ddd2',
                category: 'Clinical',
                topic: '04 Degenerative Disc Disease',
                front: 'Why does DDD cause radiating limb pain (Radiculopathy)?',
                back: 'Disc protrusion or collapse causes nerve root compression.',
                explanation: 'When the disc fails, it can bulge or leak, putting physical and chemical pressure on spinal nerves.',
                mechanism: 'Disc Protrusion → Foraminal Narrowing → Nerve Compression → Radiculopathy',
                pearl: 'Pain radiating down the leg (Sciatica) is the most common symptom of lumbar DDD.',
                subdeck: '04 Degenerative Disc Disease',
                disease: 'DDD',
                difficultyLevel: 4,
                difficulty: 0.5,
                importance: 'High',
                tags: ['Clinical', 'Symptoms'],
                sourceSection: 'XVII. DEGENERATIVE DISC DISEASE'
            },

            // ==========================================
            // 05 OSTEOMYELITIS
            // ==========================================
            {
                id: 'm4_om1',
                category: 'Pathophysiology',
                topic: '05 Osteomyelitis',
                front: 'Why is inflammation so destructive inside bone during Osteomyelitis?',
                back: 'Bone is rigid, so swelling increases pressure and cuts off blood supply.',
                explanation: 'Unlike soft tissue, bone cannot expand. Pus and edema compress nutrient vessels.',
                mechanism: 'Infection → Pus → ↑ Intraosseous Pressure → Vascular Compression → Ischemia',
                pearl: 'This ischemia leads to the formation of necrotic bone.',
                subdeck: '05 Osteomyelitis',
                disease: 'Osteomyelitis',
                difficultyLevel: 3,
                difficulty: 0.4,
                importance: 'Critical',
                tags: ['Disease', 'Infection'],
                sourceSection: 'XVIII. OSTEOMYELITIS'
            },
            {
                id: 'm4_om2',
                category: 'Pathophysiology',
                topic: '05 Osteomyelitis',
                front: 'What is a "Sequestrum"?',
                back: 'A piece of dead (necrotic) bone that has separated from healthy bone.',
                explanation: 'Formed when ischemia from high pressure kills the bone tissue during infection.',
                mechanism: 'Infection → Ischemia → Bone Death → Sequestrum',
                pearl: 'Antibiotics struggle to reach the sequestrum because it lacks blood supply.',
                subdeck: '05 Osteomyelitis',
                disease: 'Osteomyelitis',
                difficultyLevel: 3,
                difficulty: 0.4,
                importance: 'High',
                tags: ['Pathology', 'Term'],
                sourceSection: 'XVIII. OSTEOMYELITIS'
            },

            // ==========================================
            // 06 LYME DISEASE
            // ==========================================
            {
                id: 'm4_ld1',
                category: 'Pathophysiology',
                topic: '06 Lyme Disease',
                front: 'What is the name of the characteristic rash in early Lyme Disease?',
                back: 'Erythema Migrans (Bull\'s-eye rash).',
                explanation: 'A circular, expanding red rash that often has a central clear area.',
                mechanism: 'Tick Bite → B. burgdorferi spread → Local Immune Response → Expanding Rash',
                pearl: 'The rash is diagnostic even without lab testing in endemic areas.',
                subdeck: '06 Lyme Disease',
                disease: 'Lyme',
                difficultyLevel: 1,
                difficulty: 0.2,
                importance: 'Critical',
                tags: ['Infection', 'Signs'],
                sourceSection: 'XIX. LYME DISEASE'
            },
            {
                id: 'm4_ld2',
                category: 'Clinical',
                topic: '06 Lyme Disease',
                front: 'Describe the typical joint involvement in late-stage Lyme Disease.',
                back: 'Migratory arthritis, typically affecting large joints like the knee.',
                explanation: 'Bacterial dissemination triggers inflammatory synovitis that can move between joints.',
                mechanism: 'Dissemination → Joint Antigen Exposure → Inflammatory Synovitis → Pain/Swelling',
                pearl: 'Facial nerve (Bell\'s) palsy is another high-yield finding in disseminated Lyme.',
                subdeck: '06 Lyme Disease',
                disease: 'Lyme',
                difficultyLevel: 3,
                difficulty: 0.4,
                importance: 'High',
                tags: ['Clinical', 'Symptoms'],
                sourceSection: 'XIX. LYME DISEASE'
            },

            // ==========================================
            // 07 GOUT
            // ==========================================
            {
                id: 'm4_g1',
                category: 'Pathophysiology',
                topic: '07 Gout',
                front: 'What is the biochemical hallmark of Gout?',
                back: 'Hyperuricemia (Elevated uric acid levels).',
                explanation: 'Uric acid precipitates into needle-like crystals when levels exceed solubility.',
                mechanism: 'Purine Breakdown → Uric Acid Excess → Crystal Precipitation',
                pearl: 'Gout can be caused by overproduction OR under-excretion of uric acid.',
                subdeck: '07 Gout',
                disease: 'Gout',
                difficultyLevel: 1,
                difficulty: 0.2,
                importance: 'Critical',
                tags: ['Disease', 'Metabolic'],
                sourceSection: 'XX. GOUT'
            },
            {
                id: 'm4_g2',
                category: 'Pathophysiology',
                topic: '07 Gout',
                front: 'Which immune cell is primarily responsible for the intense inflammation in an acute Gout attack?',
                back: 'Neutrophils.',
                explanation: 'Neutrophils attempt to phagocytose (eat) the urate crystals, triggering a massive cytokine release.',
                mechanism: 'Crystal Deposition → Neutrophil Infiltration → Phagocytosis → Inflammatory Cascade',
                pearl: 'This is why gout looks like an infection (red, hot, swollen) but is actually sterile.',
                subdeck: '07 Gout',
                disease: 'Gout',
                difficultyLevel: 3,
                difficulty: 0.4,
                importance: 'High',
                tags: ['Immunology', 'Mechanism'],
                sourceSection: 'XX. GOUT'
            },
            {
                id: 'm4_g3',
                category: 'Clinical',
                topic: '07 Gout',
                front: 'Where is the most common location for a first Gout attack?',
                back: 'The first metatarsophalangeal (MTP) joint (the Great Toe).',
                explanation: 'Cooler distal temperatures and walking stress favor crystal precipitation here.',
                mechanism: 'Cooler Temp + Stress → Crystal Formation → Acute Attack (Podagra)',
                pearl: 'This specific presentation is called Podagra.',
                subdeck: '07 Gout',
                disease: 'Gout',
                difficultyLevel: 2,
                difficulty: 0.3,
                importance: 'High',
                tags: ['Clinical', 'Signs'],
                sourceSection: 'XX. GOUT'
            },

            // ==========================================
            // 08 COMPARISONS
            // ==========================================
            {
                id: 'm4_comp1',
                category: 'Differential',
                topic: '08 Comparisons',
                front: 'Compare the primary structure affected in Osteoporosis vs. Osteoarthritis.',
                back: 'Osteoporosis affects Bone Density; Osteoarthritis affects Articular Cartilage.',
                explanation: 'One is a metabolic loss of bone mass; the other is mechanical wear of the joint surface.',
                mechanism: 'OP (Bone Mass) vs OA (Cartilage Integrity)',
                pearl: 'A patient can have both, but their treatments and causes are distinct.',
                subdeck: '08 Disease Comparisons',
                disease: 'Multi',
                difficultyLevel: 3,
                difficulty: 0.4,
                importance: 'High',
                tags: ['Differential', 'Integration'],
                sourceSection: 'XXI. DIFFERENTIATION'
            },
            {
                id: 'm4_comp2',
                category: 'Differential',
                topic: '08 Comparisons',
                front: 'How do you distinguish Osteomyelitis from Gout clinically?',
                back: 'Osteomyelitis is infectious (often with fever/systemic signs); Gout is sterile crystal inflammation (sudden, extremely severe, hyperuricemia).',
                explanation: 'Both cause severe local inflammation, but the presence of systemic fever and high-risk history (trauma) favors infection.',
                mechanism: 'Bacteria (OM) vs Crystals (Gout)',
                pearl: 'Gout is often so painful that even bedsheets touching the toe are unbearable.',
                subdeck: '08 Disease Comparisons',
                disease: 'Multi',
                difficultyLevel: 4,
                difficulty: 0.5,
                importance: 'High',
                tags: ['Differential', 'Integration'],
                sourceSection: 'XXI. DIFFERENTIATION'
            },

            // ==========================================
            // 09 CLINICAL CASES
            // ==========================================
            {
                id: 'm4_case1',
                category: 'Clinical Case',
                topic: '09 Clinical Cases',
                front: 'Case: 72yo woman with progressive kyphosis and 2-inch height loss. No recent trauma. Most likely diagnosis?',
                back: 'Osteoporosis with vertebral compression fractures.',
                explanation: 'Postmenopausal state plus classic "dowager\'s hump" (kyphosis) and height loss is diagnostic.',
                mechanism: 'Estrogen loss → Osteoclast excess → Vertebral collapse',
                pearl: 'Weight-bearing exercise and calcium/Vit D are key preventatives.',
                subdeck: '09 Clinical Cases',
                disease: 'Osteoporosis',
                difficultyLevel: 5,
                difficulty: 0.7,
                importance: 'Critical',
                tags: ['Case', 'Application'],
                sourceSection: 'XXI. MINI CASES'
            },
            {
                id: 'm4_case2',
                category: 'Clinical Case',
                topic: '09 Clinical Cases',
                front: 'Case: Construction worker with back pain radiating down his leg and numbness in his toes. Most likely diagnosis?',
                back: 'Degenerative Disc Disease with Radiculopathy.',
                explanation: 'Radiating pain (sciatica) and sensory changes (numbness) indicate nerve root compression, likely from a bulging disc.',
                mechanism: 'Disc failure → Nerve compression → Dermatomal symptoms',
                pearl: 'Physical therapy is often the first-line treatment.',
                subdeck: '09 Clinical Cases',
                disease: 'DDD',
                difficultyLevel: 5,
                difficulty: 0.7,
                importance: 'High',
                tags: ['Case', 'Application'],
                sourceSection: 'XXI. MINI CASES'
            },

            // ==========================================
            // 10 FINAL INTEGRATION
            // ==========================================
            {
                id: 'm4_int1',
                category: 'Integration',
                topic: '10 Final Integration',
                front: 'Integrate: How does chronic inflammation worsen Osteoporosis?',
                back: 'Inflammatory cytokines (TNF, IL-1) directly stimulate osteoclast activity.',
                explanation: 'Diseases like RA or chronic infection can accelerate bone loss via immune-mediated resorption.',
                mechanism: 'Inflammation → Cytokine Release → ↑ RANKL/Osteoclast Activation → ↑ Bone Loss',
                pearl: 'This is the link between the immune system and bone health.',
                subdeck: '10 Final Integration',
                disease: 'Multi',
                difficultyLevel: 6,
                difficulty: 0.8,
                importance: 'High',
                tags: ['Integration', 'Advanced'],
                sourceSection: 'XIV. FINAL INTEGRATION'
            }
        ]
    },
    {
        id: 'mod5',
        name: 'MODULE 5: GI & HEPATIC',
        module: 5,
        description: 'Gastrointestinal disorders and hepatic function.',
        cards: [
            {
                id: 'm5_c1',
                category: 'Gastroenterology',
                topic: 'Peptic Ulcer Disease',
                front: 'What is the most common cause of Peptic Ulcer Disease (PUD)?',
                back: 'H. pylori infection',
                explanation: 'H. pylori bacteria weaken the protective mucous coating of the stomach and duodenum.',
                mechanism: 'H. pylori → Urease Production → Mucosal Damage → Acid Erosion → Ulceration',
                pearl: 'NSAIDs are the second most common cause of PUD.'
            }
        ]
    },
    {
        id: 'mod6',
        name: 'MODULE 6: ENDO & NEURO',
        module: 6,
        description: 'Endocrine regulation and neurological pathophysiology.',
        cards: [
            {
                id: 'm6_c1',
                category: 'Endocrinology',
                topic: 'Diabetes Mellitus',
                front: 'What is the primary mechanism of Type 1 Diabetes?',
                back: 'Autoimmune destruction of Beta cells',
                explanation: 'Type 1 DM is characterized by an absolute insulin deficiency due to immune-mediated destruction of pancreatic beta cells.',
                mechanism: 'Autoimmune Trigger → T-cell Infiltration → Beta Cell Destruction → Absolute Insulin Deficiency',
                pearl: 'Type 2 is characterized by insulin resistance.'
            }
        ]
    },
    {
        id: 'mod7',
        name: 'MODULE 7: RENAL & GU',
        module: 7,
        description: 'Renal function, electrolyte balance, and GU pathology.',
        cards: [
            {
                id: 'm7_c1',
                category: 'Nephrology',
                topic: 'AKI',
                front: 'What is the most common cause of Pre-renal Acute Kidney Injury?',
                back: 'Decreased Renal Perfusion',
                explanation: 'Reduced blood flow to the kidneys (e.g., dehydration, heart failure) leads to decreased GFR.',
                mechanism: 'Hypovolemia → Decreased RBF → Decreased GFR → Azotemia',
                pearl: 'If treated early, pre-renal AKI is usually reversible.'
            }
        ]
    }
];
