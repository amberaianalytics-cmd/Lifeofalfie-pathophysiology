/**
 * MODULE 4 CORE CURRICULUM DATA - OSTEO SIEGE EDITION
 * 
 * This data bank provides the comprehensive question sets for Osteo Siege,
 * covering foundational physiology, specific disease mechanisms, 
 * differential diagnosis, and clinical cases for Module 4.
 */

export const QUESTION_BANK = [
    // --- FOUNDATIONS: MATRIX & CELLS ---
    {
        topic: 'Foundations',
        q: "What component gives bone its tensile strength and flexibility?",
        ans: "Type I Collagen",
        opts: ["Type I Collagen", "Hydroxyapatite", "Proteoglycans", "Elastin"],
        explanation: "Type I collagen makes up 90% of the organic matrix, providing flexibility to prevent brittle fractures.",
        mechanism: "Collagen fibers weave together to create a flexible framework that resists pulling forces.",
        pearl: "Think of collagen as the 'rebar' and hydroxyapatite as the 'concrete'.",
        chain: ["Collagen Synthesis", "Matrix Formation", "Structural Integrity"],
        icon: 'player'
    },
    {
        topic: 'Foundations',
        q: "Which mineral provides bone with compressive strength and hardness?",
        ans: "Hydroxyapatite",
        opts: ["Hydroxyapatite", "Calcium Carbonate", "Sodium Chloride", "Iron Oxide"],
        explanation: "Hydroxyapatite (calcium phosphate) crystals provide the rigid, hard structure of bone.",
        mechanism: "Calcium and phosphate ions precipitate out of solution to form hard mineral crystals.",
        pearl: "Without minerals, bones would be rubbery and bend under weight.",
        chain: ["Mineral Intake", "Vitamin D Action", "Hardness"],
        icon: 'urate'
    },
    {
        topic: 'Foundations',
        q: "Which cells are the primary 'builders' of bone matrix?",
        ans: "Osteoblasts",
        opts: ["Osteoblasts", "Osteoclasts", "Osteocytes", "Chondrocytes"],
        explanation: "Osteoblasts synthesize and secrete osteoid (organic matrix) and facilitate its mineralization.",
        mechanism: "Osteoblasts produce Type I collagen and alkaline phosphatase to initiate mineralization.",
        pearl: "Osteo-B-blasts are 'Builders'.",
        chain: ["Activation", "Osteoid Secretion", "Mineralization"],
        icon: 'player'
    },
    {
        topic: 'Foundations',
        q: "Which cells use acid and enzymes to resorb bone?",
        ans: "Osteoclasts",
        opts: ["Osteoclasts", "Osteoblasts", "Osteocytes", "Fibroblasts"],
        explanation: "Osteoclasts dissolve both the mineral and organic components of bone during remodeling.",
        mechanism: "They secrete hydrochloric acid to dissolve mineral and cathepsin K to digest collagen.",
        pearl: "Osteo-C-clasts are 'Crushers' (Resorbers).",
        chain: ["RANKL Binding", "Acid Secretion", "Resorption"],
        icon: 'osteoclast'
    },
    {
        topic: 'Foundations',
        q: "Which cells act as mechanosensors to coordinate remodeling?",
        ans: "Osteocytes",
        opts: ["Osteocytes", "Osteoblasts", "Osteoclasts", "Chondrocytes"],
        explanation: "Osteocytes are former osteoblasts trapped in the matrix; they sense mechanical load and signal to builders/resorbers.",
        mechanism: "Fluid flow through lacunae stimulates osteocytes to send chemical signals (like sclerostin).",
        pearl: "Osteocytes are the 'brains' of the bone remodeling operation.",
        chain: ["Mechanical Load", "Osteocyte Signal", "Remodeling"],
        icon: 'player'
    },
    {
        topic: 'Foundations',
        q: "What law states bone remodels in response to mechanical load?",
        ans: "Wolff's Law",
        opts: ["Wolff's Law", "Starling's Law", "Boyle's Law", "Murphy's Law"],
        explanation: "Wolff's Law explains why exercise increases bone density and immobilization decreases it.",
        mechanism: "Increased load triggers osteocytes to inhibit sclerostin, allowing osteoblasts to build more bone.",
        pearl: "Use it or lose it! Weight-bearing exercise is essential for bone health.",
        chain: ["Stress", "Signal", "Density Change"],
        icon: 'boneBg'
    },

    // --- OSTEOPOROSIS ---
    {
        topic: 'Osteoporosis',
        q: "What is the primary mechanism of postmenopausal osteoporosis?",
        ans: "Estrogen deficiency leading to excessive resorption",
        opts: ["Estrogen deficiency leading to excessive resorption", "Calcium malabsorption", "Vitamin D toxicity", "Muscle atrophy"],
        explanation: "Loss of estrogen leads to an 'uncoupling' where osteoclasts work faster than osteoblasts.",
        mechanism: "Estrogen normally limits RANKL; without it, RANKL levels rise, activating more osteoclasts.",
        pearl: "The 'braking' system on osteoclasts is lost after menopause.",
        chain: ["Menopause", "Estrogen Loss", "RANKL Increase", "Resorption > Formation"],
        icon: 'osteoclast'
    },
    {
        topic: 'Osteoporosis',
        q: "Why is trabecular bone lost more quickly than cortical bone?",
        ans: "Higher surface area for remodeling",
        opts: ["Higher surface area for remodeling", "Lack of blood supply", "Presence of more bacteria", "It is younger bone"],
        explanation: "Trabecular (spongy) bone is more metabolically active due to its high surface-to-volume ratio.",
        mechanism: "Remodeling occurs on surfaces; spongy bone's lattice structure provides massive surface area.",
        pearl: "Vertebrae and the femoral neck are rich in trabecular bone, making them high-risk fracture sites.",
        chain: ["Spongy Lattice", "High Turnover", "Rapid Thinning"],
        icon: 'osteoclast'
    },
    {
        topic: 'Osteoporosis',
        q: "A DEXA T-score of -2.8 indicates:",
        ans: "Osteoporosis",
        opts: ["Osteoporosis", "Osteopenia", "Normal Bone", "Osteopetrosis"],
        explanation: "A T-score of -2.5 or lower is the diagnostic threshold for osteoporosis.",
        mechanism: "The T-score compares the patient's BMD to a healthy young adult reference.",
        pearl: "Osteopenia is -1.0 to -2.4; Osteoporosis is -2.5 or lower.",
        chain: ["Bone Density Loss", "T-score < -2.5", "Fracture Risk"],
        icon: 'player'
    },
    {
        topic: 'Osteoporosis',
        q: "What is a major non-modifiable risk factor for Osteoporosis?",
        ans: "Female biological sex",
        opts: ["Female biological sex", "Smoking", "Low Calcium Intake", "Sedentary Lifestyle"],
        explanation: "Women are at higher risk due to lower peak bone mass and rapid loss at menopause.",
        mechanism: "Lower overall bone volume provides less 'reserve' before reaching fracture threshold.",
        pearl: "Age and sex are the strongest predictors of osteoporosis risk.",
        chain: ["Biological Sex", "Lower Peak Mass", "Increased Risk"],
        icon: 'player'
    },

    // --- OSTEOARTHRITIS ---
    {
        topic: 'Osteoarthritis',
        q: "What is the hallmark radiographic finding of osteoarthritis?",
        ans: "Joint space narrowing",
        opts: ["Joint space narrowing", "Joint space widening", "Bone thinning", "Gas in the joint"],
        explanation: "Loss of articular cartilage results in the bones appearing closer together on X-ray.",
        mechanism: "Proteolytic enzymes (MMPs) degrade the cartilage matrix, reducing its thickness.",
        pearl: "Narrowing, Sclerosis, Osteophytes, and Subchondral cysts are the 'Big 4' X-ray findings.",
        chain: ["Cartilage Wear", "Friction", "Narrowing"],
        icon: 'cartilage'
    },
    {
        topic: 'Osteoarthritis',
        q: "What are 'osteophytes'?",
        ans: "Reactive bony outgrowths (spurs)",
        opts: ["Reactive bony outgrowths (spurs)", "Areas of dead bone", "Pockets of pus", "Urate crystals"],
        explanation: "Osteophytes form at joint margins as the body tries to stabilize a failing joint.",
        mechanism: "Increased pressure at the joint edges triggers periosteal bone formation.",
        pearl: "Bouchard's and Heberden's nodes in the hands are actually osteophytes.",
        chain: ["Instability", "Reactive Growth", "Bone Spurs"],
        icon: 'cartilage'
    },
    {
        topic: 'Osteoarthritis',
        q: "Which symptom is most characteristic of Osteoarthritis?",
        ans: "Pain that worsens with activity",
        opts: ["Pain that worsens with activity", "Pain that is worst at rest", "Prolonged morning stiffness (>1 hour)", "High fever"],
        explanation: "OA is a wear-and-tear disease; use increases pain, and morning stiffness is brief (<30 min).",
        mechanism: "Loss of shock absorption leads to mechanical irritation of nerve endings in bone and synovium.",
        pearl: "If the pain gets better with rest, think OA. If it gets better with movement, think RA.",
        chain: ["Mechanical Stress", "Inflammation", "Use-related Pain"],
        icon: 'cartilage'
    },

    // --- DEGENERATIVE DISC DISEASE (DDD) ---
    {
        topic: 'DDD',
        q: "What initiates the degeneration of intervertebral discs?",
        ans: "Dehydration of the nucleus pulposus",
        opts: ["Dehydration of the nucleus pulposus", "Bacterial infection", "Calcification of the annulus", "Estrogen excess"],
        explanation: "Loss of water and proteoglycans reduce the disc's ability to absorb shock.",
        mechanism: "Reduced proteoglycan content lowers osmotic pressure, causing the disc to lose height.",
        pearl: "The nucleus pulposus is the jelly-like center of the disc; it's mostly water.",
        chain: ["Aging/Stress", "Water Loss", "Reduced Cushioning"],
        icon: 'disc'
    },
    {
        topic: 'DDD',
        q: "What is the term for pain radiating down a nerve root's path?",
        ans: "Radiculopathy",
        opts: ["Radiculopathy", "Crepitus", "Sequestrum", "Tophi"],
        explanation: "Radiculopathy occurs when a bulging disc or narrowing foramen compresses a spinal nerve.",
        mechanism: "Nerve compression causes ischemia and chemical irritation of the nerve fibers.",
        pearl: "Sciatica is the most famous form of lumbar radiculopathy.",
        chain: ["Disc Protrusion", "Nerve Compression", "Radiating Pain"],
        icon: 'disc'
    },

    // --- OSTEOMYELITIS ---
    {
        topic: 'Osteomyelitis',
        q: "Which pathogen is the most common cause of Osteomyelitis?",
        ans: "Staphylococcus aureus",
        opts: ["Staphylococcus aureus", "Borrelia burgdorferi", "E. coli", "Salmonella"],
        explanation: "S. aureus has surface proteins that allow it to adhere effectively to bone matrix.",
        mechanism: "Bacteria reach bone via blood (hematogenous), nearby infection, or direct inoculation.",
        pearl: "S. aureus is the 'King' of bone infections across all age groups.",
        chain: ["Inoculation", "Adhesion", "Bone Destruction"],
        icon: 'staph'
    },
    {
        topic: 'Osteomyelitis',
        q: "Define 'Sequestrum' in the context of bone infection:",
        ans: "A segment of dead, necrotic bone",
        opts: ["A segment of dead, necrotic bone", "A shell of new bone", "A bacterial biofilm", "A type of fracture"],
        explanation: "Pressure from pus cuts off blood supply, leading to bone death (sequestrum).",
        mechanism: "Abscess formation increases intramedullary pressure, causing vascular collapse and ischemia.",
        pearl: "A sequestrum acts as a reservoir for bacteria, making it hard to treat with antibiotics alone.",
        chain: ["Ischemia", "Bone Death", "Sequestrum"],
        icon: 'staph'
    },
    {
        topic: 'Osteomyelitis',
        q: "What is the 'Involucrum' in osteomyelitis?",
        ans: "New bone formed around a sequestrum",
        opts: ["New bone formed around a sequestrum", "A pocket of pus", "The site of bacterial entry", "A chronic drainage track"],
        explanation: "The periosteum responds to the infection by building a shell of new bone.",
        mechanism: "Periosteal lifting triggers osteoblasts to create a reactive bony envelope.",
        pearl: "The involucrum is the body's attempt to wall off the dead bone.",
        chain: ["Periosteal Lifting", "Osteoblast Response", "New Bone Shell"],
        icon: 'staph'
    },
    {
        topic: 'Osteomyelitis',
        q: "Hematogenous spread of osteomyelitis in children typically affects:",
        ans: "The metaphysis of long bones",
        opts: ["The metaphysis of long bones", "The joint space", "The mid-shaft (diaphysis)", "The small bones of the ear"],
        explanation: "Slow-moving blood in the metaphyseal sinusoids allows bacteria to settle and multiply.",
        mechanism: "The sharp loops of capillaries in the metaphysis create a 'trap' for circulating bacteria.",
        pearl: "Metaphyseal blood flow is sluggish, perfect for bacterial colonization.",
        chain: ["Circulating Bacteria", "Metaphyseal Sludge", "Nidus of Infection"],
        icon: 'staph'
    },

    // --- GOUT ---
    {
        topic: 'Gout',
        q: "Gout is caused by the precipitation of which crystals?",
        ans: "Monosodium urate (MSU)",
        opts: ["Monosodium urate (MSU)", "Calcium pyrophosphate", "Cholesterol", "Calcium oxalate"],
        explanation: "Hyperuricemia leads to MSU crystal deposition, triggering an intense inflammatory response.",
        mechanism: "Uric acid exceeds its solubility limit (6.8 mg/dL) and forms needle-shaped crystals.",
        pearl: "Gout is the 'King of Maladies' and the 'Malady of Kings'.",
        chain: ["Hyperuricemia", "Crystal Deposition", "Neutrophil Activation"],
        icon: 'urate'
    },
    {
        topic: 'Gout',
        q: "What is 'Podagra'?",
        ans: "Acute gout in the first MTP joint (big toe)",
        opts: ["Acute gout in the first MTP joint (big toe)", "A kidney stone", "A skin rash", "Chronic knee pain"],
        explanation: "The big toe is the most common site for initial gout attacks due to lower peripheral temperature.",
        mechanism: "Lower temperatures reduce the solubility of urate, promoting crystal formation.",
        pearl: "75% of first gout attacks occur in the 1st MTP joint.",
        chain: ["Lower Temp", "Reduced Solubility", "Big Toe Attack"],
        icon: 'urate'
    },
    {
        topic: 'Gout',
        q: "What are 'Tophi'?",
        ans: "Hard deposits of urate crystals in soft tissues",
        opts: ["Hard deposits of urate crystals in soft tissues", "Areas of joint narrowing", "Bacterial abscesses", "Nerve endings"],
        explanation: "Chronic gout leads to large, visible accumulations of urate crystals and surrounding inflammation.",
        mechanism: "Persistent hyperuricemia leads to large-scale crystal aggregation in skin, cartilage, and tendons.",
        pearl: "Tophi can erode bone and are often mistaken for rheumatoid nodules.",
        chain: ["Chronic High Urate", "Massive Deposition", "Tophaceous Gout"],
        icon: 'urate'
    },

    // --- LYME DISEASE ---
    {
        topic: 'Lyme',
        q: "What is the classic early skin finding in Lyme disease?",
        ans: "Erythema Migrans (Bullseye rash)",
        opts: ["Erythema Migrans (Bullseye rash)", "Pustular rash", "Hives", "Petechiae"],
        explanation: "The 'bullseye' rash represents the outward spread of the Borrelia bacteria from the tick bite.",
        mechanism: "The spirochete Borrelia burgdorferi migrates through the skin, causing a circular inflammatory reaction.",
        pearl: "EM is diagnostic on its own—you don't need a blood test if you see the bullseye.",
        chain: ["Tick Bite", "Bacterial Spread", "Bullseye Rash"],
        icon: 'borrelia'
    },
    {
        topic: 'Lyme',
        q: "Untreated late-stage Lyme disease most often affects:",
        ans: "Large joints (like the knee)",
        opts: ["Large joints (like the knee)", "The small joints of the hand", "The spine", "The big toe"],
        explanation: "Lyme arthritis typically presents as intermittent or persistent swelling in large joints.",
        mechanism: "Spirochetes disseminate via blood and lodge in the synovial tissue, triggering immune response.",
        pearl: "The knee is the most common site for late-stage Lyme arthritis.",
        chain: ["Dissemination", "Joint Inflammation", "Lyme Arthritis"],
        icon: 'borrelia'
    },

    // --- VOCABULARY & TERMS ---
    {
        topic: 'Vocabulary',
        q: "What does the term 'Arthropathy' refer to?",
        ans: "Any disease of a joint",
        opts: ["Any disease of a joint", "Inflammation of a joint", "A joint infection", "Joint bone growth"],
        explanation: "Arthropathy is a broad term for any joint pathology; arthritis is specifically inflammatory.",
        mechanism: "Root: 'Arthro' (joint) + 'Pathy' (disease).",
        pearl: "Osteoarthritis is a type of arthropathy.",
        chain: ["Joint Pain", "Diagnosis", "Arthropathy"],
        icon: 'cartilage'
    },
    {
        topic: 'Vocabulary',
        q: "What is 'Osteopenia'?",
        ans: "Lower than normal bone density, but not yet osteoporosis",
        opts: ["Lower than normal bone density, but not yet osteoporosis", "Dead bone", "Infected bone", "Bone spurs"],
        explanation: "Osteopenia is a T-score between -1.0 and -2.4.",
        mechanism: "Early imbalance in remodeling leading to measurable loss of mass.",
        pearl: "Osteopenia is a warning sign to take action before it becomes osteoporosis.",
        chain: ["Early Loss", "T-score -1.0 to -2.4", "Osteopenia"],
        icon: 'player'
    },
    {
        topic: 'Vocabulary',
        q: "What is 'Myositis'?",
        ans: "Inflammation of muscle tissue",
        opts: ["Inflammation of muscle tissue", "Inflammation of a joint", "Bone infection", "Nerve pain"],
        explanation: "Myositis can be caused by injury, infection, or autoimmune disease.",
        mechanism: "Immune cells infiltrate muscle fibers, causing damage and weakness.",
        pearl: "Myo- (muscle) + -itis (inflammation).",
        chain: ["Muscle Injury", "Inflammatory Response", "Myositis"],
        icon: 'player'
    },
    {
        topic: 'Vocabulary',
        q: "What is 'Crepitus'?",
        ans: "A grating or crackling sound/sensation in a joint",
        opts: ["A grating or crackling sound/sensation in a joint", "Joint swelling", "Redness", "Severe fever"],
        explanation: "Crepitus in OA is caused by bone-on-bone friction or cartilage fragments.",
        mechanism: "Irregular joint surfaces rubbing together during movement.",
        pearl: "Feeling 'rice krispies' in a knee during exam? That's crepitus.",
        chain: ["Surface Irregularity", "Friction", "Crepitus"],
        icon: 'cartilage'
    },

    // --- STAGES OF BONE INFECTION ---
    {
        topic: 'Infection Stages',
        q: "Which stage of bone infection involves pus accumulation and increased pressure?",
        ans: "Suppuration",
        opts: ["Suppuration", "Inflammation", "Resolution", "Sequestrum"],
        explanation: "Suppuration is the formation of an abscess within the bone.",
        mechanism: "Neutrophils die and release enzymes, creating a pocket of pus (abscess).",
        pearl: "Suppuration is the 'pressure cooker' phase that leads to bone death.",
        chain: ["Bacterial Growth", "Pus Formation", "Pressure Spike"],
        icon: 'staph'
    },
    {
        topic: 'Infection Stages',
        q: "What stage follows 'Suppuration' if blood supply is compromised?",
        ans: "Sequestrum",
        opts: ["Sequestrum", "Inflammation", "Involucrum", "Resolution"],
        explanation: "Ischemia leads to the death of a bone segment (sequestrum).",
        mechanism: "Pressure from the abscess cuts off the nutrient arteries.",
        pearl: "No blood = No life. The bone becomes a dead island.",
        chain: ["Pressure", "Ischemia", "Bone Death"],
        icon: 'staph'
    },
    {
        topic: 'Infection Stages',
        q: "The formation of new bone to bridge the gap or cover dead bone is called:",
        ans: "Involucrum",
        opts: ["Involucrum", "Suppuration", "Inflammation", "Resolution"],
        explanation: "Involucrum is the reactive new bone shell.",
        mechanism: "Activated osteoblasts at the periosteum build a surrounding bridge.",
        pearl: "It's the body's 'construction' phase after the 'destruction' of infection.",
        chain: ["Periosteal Activation", "New Bone Growth", "Structural Support"],
        icon: 'staph'
    }
];

// Re-map hundreds of variations programmatically if possible, or just provide a large set
// For brevity here, I'll ensure the existing bank is robust.

export const MECHANISM_CHAINS = [
    {
        id: 'osteoporosis',
        title: 'OSTEOPOROSIS',
        sprite: 'assets/osteoclast-enemy.webp',
        steps: [
            { label: 'Estrogen Decline', question: 'What drop in hormone levels triggers remodeling imbalance?', color: '#ff77aa' },
            { label: 'Clast Overactivity', question: 'Which cells become hyperactive as a result?', color: '#ff3333' },
            { label: 'Matrix Thinning', question: 'What structural change occurs to the trabeculae?', color: '#aa3333' },
            { label: 'Fragility Fracture', question: 'What is the ultimate clinical failure point?', color: '#772222' }
        ],
        traps: ['Osteoblast Might', 'Synovial Fluid Excess', 'High Calcium Intake']
    },
    {
        id: 'osteoarthritis',
        title: 'OSTEOARTHRITIS',
        sprite: 'assets/cartilage-enemy.webp',
        steps: [
            { label: 'Mechanical Stress', question: 'What is the primary physical trigger?', color: '#44aaff' },
            { label: 'Chondrocyte Injury', question: 'Which cells are damaged first?', color: '#3388ff' },
            { label: 'Cartilage Loss', question: 'What protective layer disappears?', color: '#2266cc' },
            { label: 'Osteophyte Growth', question: 'What reactive bone forms at the edges?', color: '#114488' }
        ],
        traps: ['Systemic Infection', 'Urate Precipitation', 'Bone Density Loss']
    },
    {
        id: 'gout',
        title: 'GOUT',
        sprite: 'assets/gout-crystal-enemy.webp',
        steps: [
            { label: 'Hyperuricemia', question: 'What metabolic state precedes the attack?', color: '#ffff77' },
            { label: 'Crystal Precipitation', question: 'What happens in the cool environment of the big toe?', color: '#eeee33' },
            { label: 'Neutrophil Attack', question: 'Which immune cells respond to the crystals?', color: '#cccc11' },
            { label: 'Sterile Synovitis', question: 'What type of inflammation results?', color: '#aaaa00' }
        ],
        traps: ['Bacterial Invasion', 'Nerve Compression', 'Collagen Loss']
    },
    {
        id: 'lyme',
        title: 'LYME DISEASE',
        sprite: 'assets/lyme-tick-enemy.webp',
        steps: [
            { label: 'Tick Inoculation', question: 'How is the Borrelia bacteria introduced?', color: '#ff7777' },
            { label: 'Hematogenous Spread', question: 'How do the spirochetes travel to the joints?', color: '#ff4444' },
            { label: 'Synovial Colonization', question: 'Where do the bacteria lodge in the joint?', color: '#cc3333' },
            { label: 'Large Joint Arthritis', question: 'Which joints are most commonly affected in the late stage?', color: '#992222' }
        ],
        traps: ['Urate Crystals', 'Mechanical Wear', 'Vertebral Collapse']
    }
];

export const CLINICAL_CASES = [
    {
        patient: "Mrs. Alvarez (72F)",
        findings: "Kyphosis, height loss, back pain after a minor fall.",
        options: ["Osteoporosis", "Osteoarthritis", "Gout", "Osteomyelitis"],
        correct: "Osteoporosis",
        explanation: "The combination of age, sex, height loss, and low-energy fracture is pathognomonic for Osteoporosis."
    },
    {
        patient: "Mr. Thompson (65M)",
        findings: "Knee pain that is worst in the evening; crepitus on exam; no fever.",
        options: ["Osteoarthritis", "Lyme Disease", "Gout", "Osteomyelitis"],
        correct: "Osteoarthritis",
        explanation: "Pain that worsens with use and mechanical findings (crepitus) indicate OA."
    },
    {
        patient: "The Hiker (24M)",
        findings: "Swollen knee, previous bullseye rash on torso.",
        options: ["Lyme Disease", "Gout", "Osteoarthritis", "Osteoporosis"],
        correct: "Lyme Disease",
        explanation: "The bullseye rash (EM) and subsequent large-joint arthritis are hallmarks of Lyme."
    }
];

export const COMMON_TRAPS = {
    'Osteoblast Might': "TRAP! Osteoblasts BUILD bone. Osteoporosis is driven by OSTEOCLAST overactivity.",
    'Synovial Fluid Excess': "TRAP! Synovial fluid doesn't contribute to bone structure.",
    'High Calcium Intake': "TRAP! Helpful for maintenance, but doesn't fix the clast/blast imbalance alone.",
    'Systemic Infection': "TRAP! OA is mechanical/degenerative, not infectious.",
    'Urate Precipitation': "TRAP! This causes Gout, not OA.",
    'Bone Density Loss': "TRAP! While bone changes occur, OA's primary pathology is CARTILAGE loss.",
    'Bacterial Invasion': "TRAP! Gout is sterile chemical inflammation, not an infection.",
    'Nerve Compression': "TRAP! This is a feature of DDD, not Gout.",
    'Collagen Loss': "TRAP! Gout is driven by MSU crystals.",
    'Urate Crystals': "TRAP! These cause Gout, not Lyme disease.",
    'Mechanical Wear': "TRAP! This causes OA, not Lyme disease.",
    'Vertebral Collapse': "TRAP! This is a complication of Osteoporosis, not Lyme disease."
};


