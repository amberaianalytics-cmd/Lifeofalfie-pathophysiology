export const MODULE4_CLASS_NOTES = [
    {
        id: "part-1",
        title: "PART 1 — FOUNDATIONAL MUSCULOSKELETAL PHYSIOLOGY",
        items: [
            {
                type: "high_yield",
                title: "I. THE MUSCULOSKELETAL SYSTEM",
                points: [
                    "Body structure",
                    "Posture",
                    "Movement",
                    "Force transmission",
                    "Organ protection",
                    "Mineral storage",
                    "Blood cell production"
                ],
                note: "The system includes bones, joints, cartilage, ligaments, tendons, and skeletal muscles. Disease develops when normal homeostasis and tissue repair mechanisms become disrupted."
            },
            {
                type: "section",
                title: "II. NORMAL BONE PHYSIOLOGY",
                content: "Bone is specialized living connective tissue. Bone must balance TWO competing properties: strength and flexibility. If bone becomes too rigid, it fractures easily. If bone becomes too soft, it bends and collapses. Healthy bone depends on collagen matrix, mineralization, blood supply, architecture, and remodeling balance."
            },
            {
                type: "differentiation",
                title: "III. BONE MATRIX",
                left: {
                    title: "Organic Matrix",
                    desc: "Mainly collagen fibers",
                    examples: ["Flexibility", "Tensile strength", "Resistance to pulling forces", "Without collagen, bone becomes brittle"]
                },
                right: {
                    title: "Inorganic Matrix",
                    desc: "Mainly calcium phosphate crystals",
                    examples: ["Hardness", "Resistance to compression", "Without minerals, bone becomes weak and soft"]
                }
            },
            {
                type: "table",
                title: "IV. TYPES OF BONE",
                headers: ["Feature", "Trabecular Bone (Spongy)", "Cortical Bone (Compact)"],
                rows: [
                    ["Density", "Lower", "Higher"],
                    ["Structure", "Lattice-like", "Dense"],
                    ["Blood supply", "Greater", "Lower"],
                    ["Metabolic activity", "High", "Lower"],
                    ["Fracture pattern", "Compression fractures", "Shaft fractures"]
                ],
                note: "^^ Vertebral compression fractures commonly occur in trabecular bone. ^^"
            },
            {
                type: "mechanism",
                title: "V. BONE CELLS",
                steps: [
                    { label: "Osteoblasts (Build)", text: "Produce collagen matrix, deposit calcium phosphate, repair bone. Mechanism: Stress → signaling → recruitment → collagen deposition → mineralization." },
                    { label: "Osteoclasts (Breakdown)", text: "Remove damaged bone, release calcium. Mechanism: PTH/Inflammation → activation → acid release → enzymatic digestion → resorption." },
                    { label: "Osteocytes (Monitor)", text: "Mature cells in matrix. Mechanism: Monitor stress → coordinate remodeling → adaptive strengthening (Wolff’s Law)." }
                ]
            },
            {
                type: "mechanism_diagram",
                title: "VI. BONE REMODELING CYCLE",
                chain: [
                    "OLD MICRODAMAGED BONE",
                    "OSTEOCLAST RESORPTION (Breakdown)",
                    "OSTEOBLAST REPAIR (Rebuild)",
                    "MINERALIZED REMODELED BONE"
                ],
                notes: "Resorption is NORMAL when balanced. Disease develops when ^^ osteoclast activity chronically exceeds osteoblast activity ^^."
            },
            {
                type: "high_yield",
                title: "VII. HORMONAL REGULATION OF BONE",
                points: [
                    "^^ Estrogen ^^: Suppresses excessive osteoclast activation. Loss (postmenopausal) → accelerated resorption.",
                    "^^ PTH ^^: Increases blood calcium via osteoclast stimulation.",
                    "^^ Vitamin D ^^: Increases intestinal calcium absorption. Deficiency → poor mineralization.",
                    "^^ Wolff’s Law ^^: Bone adapts to stress (Exercise = Stronger; Immobilization = Weaker)."
                ]
            },
            {
                type: "section",
                title: "VIII. JOINT PHYSIOLOGY",
                content: "Joints provide movement, flexibility, and shock absorption. Articular cartilage covers surfaces (shock absorption/friction reduction) but has poor blood supply (poor healing). Synovial fluid lubricates joints. ^^ Cartilage degeneration is central in osteoarthritis. ^^"
            },
            {
                type: "mechanism",
                title: "IX. INTERVERTEBRAL DISC PHYSIOLOGY",
                steps: [
                    { label: "Nucleus Pulposus", text: "Gel-like center; absorbs compression. Requires high water content." },
                    { label: "Annulus Fibrosus", text: "Fibrous outer ring; provides structural containment." },
                    { label: "Disc Degeneration", text: "Aging → Dehydration → Decreased height → Annulus weakening → Protrusion → Nerve compression." }
                ],
                note: "^^ Pain radiating down a limb suggests nerve root compression. ^^"
            },
            {
                type: "mechanism_diagram",
                title: "X. MUSCULOSKELETAL INFLAMMATION",
                chain: [
                    "TRAUMA / CELL DAMAGE",
                    "ARACHIDONIC ACID RELEASE",
                    "CYCLOOXYGENASE PATHWAY",
                    "PROSTAGLANDINS",
                    "PAIN + SWELLING"
                ],
                notes: "Cytokines (TNF, IL) drive vasodilation and immune recruitment."
            },
            {
                type: "mechanism_diagram",
                title: "XI. FRACTURE REPAIR",
                chain: [
                    "FRACTURE + HEMATOMA",
                    "INFLAMMATION",
                    "FIBROCARTILAGINOUS CALLUS",
                    "BONY CALLUS",
                    "REMODELING"
                ]
            },
            {
                type: "table",
                title: "XII. HIGH-YIELD DIFFERENTIATION",
                headers: ["Feature", "Osteoarthritis", "Gout", "Osteomyelitis"],
                rows: [
                    ["Problem", "Degeneration", "Crystal inflammation", "Infection"],
                    ["Inflammation", "Mild/Moderate", "Severe Acute", "Infectious"],
                    ["Fever", "Uncommon", "Possible", "Common"],
                    ["Pain Pattern", "Worsens with use", "Sudden severe", "Deep persistent"],
                    ["Mechanism", "Cartilage breakdown", "Neutrophil crystal response", "Bacterial invasion"]
                ]
            },
            {
                type: "summary",
                title: "XIV. FINAL INTEGRATION",
                points: [
                    "Excess osteoclast activity → Osteoporosis",
                    "Cartilage degeneration → Osteoarthritis",
                    "Disc dehydration → Degenerative disc disease",
                    "Inflammatory cytokine excess → Pain/Tissue damage",
                    "Bone infection → Osteomyelitis",
                    "Crystal deposition → Gout"
                ],
                central_principle: "NORMAL STRUCTURE → NORMAL FUNCTION. STRUCTURAL FAILURE → SYMPTOMS + DISEASE."
            }
        ]
    },
    {
        id: "part-2",
        title: "PART 2 — MAJOR DISORDERS",
        items: [
            {
                type: "disorder",
                id: "osteoporosis",
                title: "XV. OSTEOPOROSIS",
                description: "Decreased bone density and weakened architecture. ^^ Bone resorption exceeds bone formation. ^^",
                mechanism_chain: ["Estrogen decline", "Increased osteoclast activation", "Accelerated resorption", "Trabecular/Cortical thinning", "Weakened structure", "Fragility Fracture"],
                clinical: ["Fragility fractures", "Height loss (vertebral collapse)", "Kyphosis", "Silent until fracture"],
                distinguish: "Osteoarthritis (cartilage), Osteomyelitis (infection)"
            },
            {
                type: "disorder",
                id: "osteoarthritis",
                title: "XVI. OSTEOARTHRITIS",
                description: "Chronic degenerative joint disorder involving cartilage breakdown. ^^ Progressive degeneration of articular cartilage. ^^",
                mechanism_chain: ["Mechanical stress", "Chondrocyte injury", "Cartilage loss", "Bone friction", "Osteophytes (Bone Spurs)", "Pain"],
                clinical: ["Pain worsens with activity / improves with rest", "Crepitus (grinding)", "Joint space narrowing", "Subchondral sclerosis"],
                distinguish: "Rheumatoid Arthritis (autoimmune, symmetric), Gout (crystals)"
            },
            {
                type: "disorder",
                id: "ddd",
                title: "XVII. DEGENERATIVE DISC DISEASE",
                description: "Deterioration of intervertebral discs. ^^ Loss of disc hydration and structural integrity. ^^",
                mechanism_chain: ["Aging/Stress", "Disc Dehydration", "Loss of Disc Height", "Annulus Weakening", "Disc Protrusion", "Nerve Compression", "Radiating Pain"],
                clinical: ["Chronic back pain", "Radiating limb pain (Radiculopathy)", "Numbness/Tingling", "Muscle spasm"],
                distinguish: "Osteoporosis (bone density), Osteoarthritis (cartilage)"
            },
            {
                type: "disorder",
                id: "osteomyelitis",
                title: "XVIII. OSTEOMYELITIS",
                description: "Infection and inflammation of bone tissue. ^^ Infection-induced inflammation causes vascular compromise and bone destruction. ^^",
                mechanism_chain: ["Bacterial invasion", "Inflammatory pressure in rigid bone", "Vascular compression", "Ischemia", "Bone Necrosis (Sequestrum)", "Involucrum (reactive new bone)"],
                clinical: ["Deep persistent bone pain", "Fever", "Localized warmth/swelling", "Elevated inflammatory markers"],
                distinguish: "Gout (crystals), Osteoarthritis (degeneration)"
            },
            {
                type: "disorder",
                id: "lyme",
                title: "XIX. LYME DISEASE",
                description: "Multisystem inflammatory disorder caused by Borrelia burgdorferi. ^^ Bacterial dissemination triggers widespread inflammatory responses. ^^",
                mechanism_chain: ["Tick bite", "Local skin infection (Erythema migrans)", "Bacterial dissemination", "Synovitis (Migratory Arthritis)", "Neurologic/Cardiac involvement"],
                clinical: ["Erythema migrans (Bull's-eye rash)", "Migratory joint pain (knees)", "Facial nerve palsy", "Cardiac conduction blocks"],
                distinguish: "Osteomyelitis (localized), Osteoarthritis (degenerative)"
            },
            {
                type: "disorder",
                id: "gout",
                title: "XX. GOUT",
                description: "Inflammatory arthritis caused by urate crystal deposition. ^^ Urate crystal deposition triggers intense neutrophil-mediated inflammation. ^^",
                mechanism_chain: ["Hyperuricemia", "Urate crystal deposition", "Neutrophil activation", "Intense Sterile Inflammation", "Severe Pain", "Tophi (chronic deposits)"],
                clinical: ["Sudden severe pain (often overnight)", "Red, swollen joint", "Great toe (First MTP) involvement", "Hyperuricemia"],
                distinguish: "Osteomyelitis (infectious), Osteoarthritis (gradual)"
            }
        ]
    },
    {
        id: "integration-4",
        title: "XXI. HIGH-YIELD INTEGRATION AND DIFFERENTIATION",
        items: [
            {
                type: "table",
                title: "UNIFIED MUSCULOSKELETAL DISEASE FRAMEWORK",
                headers: ["Category", "Core Mechanism", "Example"],
                rows: [
                    ["Degenerative", "Mechanical breakdown over time", "Osteoarthritis, DDD"],
                    ["Inflammatory", "Immune-mediated inflammation", "Gout, Lyme disease"],
                    ["Infectious", "Bacterial invasion and immune response", "Osteomyelitis"],
                    ["Metabolic", "Abnormal biochemical environment", "Osteoporosis"]
                ]
            }
        ]
    },
    {
        id: "recall-4",
        title: "XXII. MODULE 4 RAPID-RECALL MASTER REVIEW",
        items: [
            {
                type: "section",
                title: "I. THE CORE PRINCIPLE OF MODULE 4",
                content: "^^ Structure determines function, and structural failure produces characteristic symptom patterns. ^^"
            },
            {
                type: "table",
                title: "III. HIGH-YIELD STRUCTURAL CHANGES",
                headers: ["Disease", "Structural Change"],
                rows: [
                    ["Osteoporosis", "trabecular thinning"],
                    ["Osteoarthritis", "cartilage loss"],
                    ["Degenerative disc disease", "disc collapse"],
                    ["Osteomyelitis", "necrotic bone"],
                    ["Gout", "crystal deposition"],
                    ["Lyme disease", "inflammatory synovitis"]
                ]
            },
            {
                type: "table",
                title: "IV. HIGH-YIELD PAIN PATTERNS",
                headers: ["Disease", "Pain Pattern"],
                rows: [
                    ["Osteoporosis", "fracture-related pain"],
                    ["Osteoarthritis", "worsens with movement"],
                    ["Degenerative disc disease", "radiating pain"],
                    ["Osteomyelitis", "deep persistent pain"],
                    ["Gout", "sudden severe pain"],
                    ["Lyme disease", "migratory inflammatory pain"]
                ]
            },
            {
                type: "summary",
                title: "FINAL MODULE 4 INTEGRATION",
                points: [
                    "Mechanical failure → Degeneration",
                    "Immune overactivation → Inflammation",
                    "Infection → Tissue destruction",
                    "Biochemical imbalance → Crystal deposition or Bone weakening"
                ],
                central_principle: "Structure determines function, and structural failure produces characteristic symptom patterns. Understanding the damaged structure and underlying mechanism allows prediction of the clinical pattern."
            }
        ]
    }
];
