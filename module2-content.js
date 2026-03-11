// ADITLOA Module 2 — Content Coverage Matrix (CCM2)
export const MODULE2_RIG_METADATA = [
  { id: 'immune_overview', label: 'Immune System Overview' },
  { id: 'type1_hyper', label: 'Type I Hypersensitivity' },
  { id: 'type2_hyper', label: 'Type II Hypersensitivity' },
  { id: 'type3_hyper', label: 'Type III Hypersensitivity' },
  { id: 'type4_hyper', label: 'Type IV Hypersensitivity' },
  { id: 'autoimmune', label: 'Autoimmune Concept' },
  { id: 'sle', label: 'Systemic Lupus Erythematosus' },
  { id: 'ra', label: 'Rheumatoid Arthritis' },
  { id: 'immunodeficiency', label: 'Immunodeficiency Overview' },
  { id: 'scid', label: 'SCID' },
  { id: 'hiv', label: 'HIV Infection' },
  { id: 'aids', label: 'AIDS' },
  { id: 'cancer_basics', label: 'Cancer Basics' },
  { id: 'all', label: 'Acute Lymphoblastic Leukemia' },
  { id: 'cll', label: 'Chronic Lymphocytic Leukemia' },
  { id: 'hodgkin', label: 'Hodgkin Lymphoma' },
  { id: 'non_hodgkin', label: 'Non‑Hodgkin Lymphoma' },
  { id: 'anemia_overview', label: 'Anemia Overview' },
  { id: 'iron_deficiency', label: 'Iron Deficiency Anemia' },
  { id: 'sickle_cell', label: 'Sickle Cell Disease' },
  { id: 'erythroblastosis', label: 'Erythroblastosis Fetalis' },
  { id: 'ebv', label: 'EBV Mononucleosis' },
  { id: 'meningitis', label: 'Meningitis Emergency' },
  { id: 'primary_hemostasis', label: 'Primary Hemostasis' },
  { id: 'secondary_hemostasis', label: 'Secondary Hemostasis' },
  { id: 'pt_ptt', label: 'PT vs aPTT' },
  { id: 'hemophilia', label: 'Hemophilia' },
  { id: 'thrombocytopenia', label: 'Thrombocytopenia' },
  { id: 'virchows_triad', label: 'Virchow’s Triad' },
  { id: 'dvt', label: 'Deep Vein Thrombosis' },
  { id: 'pe', label: 'Pulmonary Embolism' },
  { id: 'heart_failure_m2', label: 'Heart Failure (Block 2)' },
  { id: 'v_fib_m2', label: 'Ventricular Fibrillation (Block 2)' }
];

// MODULE 2 — Mechanism Training Bank (MTB) — 30 Tutor-Mode Questions
export const MODULE2_QUIZ_DATA = [
  // Q1
  {
    q: "Peanut allergy causing rapid airway swelling — what triggers mast-cell degranulation?",
    opts: ["Complement activation", "IgG binding erythrocytes", "IgE cross-linking on mast cells", "Cytotoxic T-cell activation"],
    ans: 2,
    rationales: [
      "INCORRECT: Complement activation occurs when antibodies activate the complement cascade, usually in Type II cytotoxic reactions or immune complex diseases. Complement does not directly trigger mast-cell degranulation in allergic reactions.",
      "INCORRECT: IgG antibodies targeting erythrocytes describe antibody-mediated cytotoxic reactions, such as transfusion reactions or autoimmune hemolytic anemia. This mechanism attacks red blood cells rather than triggering allergic airway reactions.",
      "CORRECT: Immediate peanut allergy represents Type I hypersensitivity. Allergen exposure → IgE already bound to mast cells → allergen cross-links IgE → mast-cell degranulation → histamine release → bronchoconstriction and airway edema.",
      "INCORRECT: Cytotoxic T cells participate in Type IV delayed hypersensitivity reactions, such as contact dermatitis. These reactions occur hours to days after exposure, not immediately after eating peanuts."
    ]
  },
  // Q2
  {
    q: "Which immune cell produces antibodies during adaptive immune responses?",
    opts: ["Macrophages", "Plasma cells", "Neutrophils", "Cytotoxic T cells"],
    ans: 1,
    rationales: [
      "INCORRECT: Macrophages function mainly as phagocytes and antigen-presenting cells. They present antigen to T cells but do not produce antibodies.",
      "CORRECT: Antibodies are produced by plasma cells, which develop from activated B lymphocytes. Antigen exposure → B-cell activation → differentiation into plasma cells → antibody secretion.",
      "INCORRECT: Neutrophils are part of the innate immune system and primarily perform phagocytosis of bacteria. They do not generate antigen-specific antibodies.",
      "INCORRECT: Cytotoxic T cells destroy infected host cells through cell-mediated immunity. They kill infected cells but do not produce antibodies."
    ]
  },
  // Q3
  {
    q: "A rash develops 48 hours after poison ivy exposure. What immune mechanism causes this?",
    opts: ["IgE mast-cell reaction", "Immune complex deposition", "Antibody cytotoxicity", "T-cell mediated inflammation"],
    ans: 3,
    rationales: [
      "INCORRECT: IgE-mediated reactions occur immediately after allergen exposure and produce symptoms like urticaria or anaphylaxis, not delayed rashes.",
      "INCORRECT: Immune complex diseases involve antigen-antibody complexes depositing in tissues such as kidneys or blood vessels. They do not typically produce localized delayed skin reactions like poison ivy.",
      "INCORRECT: Antibody-mediated cytotoxic reactions involve antibodies targeting cell surfaces and activating complement. These reactions destroy cells but do not produce delayed dermatitis.",
      "CORRECT: Poison ivy reactions are Type IV delayed hypersensitivity reactions. Allergen exposure → antigen presentation to T cells → T-cell activation → cytokine release → macrophage recruitment → delayed inflammatory skin reaction. This process typically appears 24–72 hours after exposure."
    ]
  },
  // Q4
  {
    q: "Which hypersensitivity reaction involves antibodies binding directly to cell surface antigens?",
    opts: ["Type I", "Type II", "Type III", "Type IV"],
    ans: 1,
    rationales: [
      "INCORRECT: Type I hypersensitivity involves IgE and mast-cell degranulation, producing allergic reactions.",
      "CORRECT: Type II hypersensitivity reactions involve antibodies targeting cells. IgG or IgM antibodies bind cell surface antigen → complement activation → cell destruction. Examples include transfusion reactions and autoimmune hemolytic anemia.",
      "INCORRECT: Type III hypersensitivity involves immune complexes depositing in tissues, not direct antibody binding to cells.",
      "INCORRECT: Type IV hypersensitivity is T-cell mediated, not antibody mediated."
    ]
  },
  // Q5
  {
    q: "Immune complexes depositing in the kidney glomeruli represent which mechanism?",
    opts: ["Type I hypersensitivity", "Type II hypersensitivity", "Type III hypersensitivity", "Type IV hypersensitivity"],
    ans: 2,
    rationales: [
      "INCORRECT: Type I hypersensitivity causes allergic reactions through mast-cell degranulation, not immune complex deposition.",
      "INCORRECT: Type II reactions involve antibodies binding directly to cell surfaces rather than forming circulating complexes.",
      "CORRECT: Type III hypersensitivity involves circulating immune complexes. Antigen + antibody complexes → circulate in bloodstream → deposit in tissues → complement activation → inflammation and tissue injury. Kidney glomeruli are common deposition sites.",
      "INCORRECT: Type IV reactions involve T-cell mediated inflammation rather than antibody-antigen complexes."
    ]
  },
  // Q6
  {
    q: "Which immune cells are primarily infected and destroyed by HIV?",
    opts: ["CD8 T cells", "CD4 T cells", "Neutrophils", "Macrophages"],
    ans: 1,
    rationales: [
      "INCORRECT: CD8 T cells kill infected cells but are not the main target of HIV infection.",
      "CORRECT: HIV targets CD4 helper T cells. HIV binds CD4 receptor → viral entry into CD4 cells → viral replication → progressive CD4 depletion → immune system coordination failure.",
      "INCORRECT: Neutrophils are innate immune cells and are not the primary targets of HIV infection.",
      "INCORRECT: Macrophages can harbor HIV but are not the defining cell type whose depletion causes immune collapse."
    ]
  },
  // Q7
  {
    q: "Loss of CD4 T cells most directly causes which immune problem?",
    opts: ["Reduced platelet production", "Failure of immune coordination", "Increased antibody production", "Excess inflammation"],
    ans: 1,
    rationales: [
      "INCORRECT: Platelet production occurs in bone marrow and is unrelated to CD4 T-cell levels.",
      "CORRECT: CD4 T cells act as immune coordinators. CD4 cell loss → impaired communication between immune cells → weakened antibody and cytotoxic responses → susceptibility to opportunistic infections.",
      "INCORRECT: CD4 loss actually reduces antibody production because B-cell activation requires helper T cells.",
      "INCORRECT: The primary problem in HIV is immune deficiency, not excessive immune activation."
    ]
  },
  // Q8
  {
    q: "Which genetic change most directly causes uncontrolled cell proliferation?",
    opts: ["Increased hemoglobin synthesis", "Activation of oncogenes", "Reduced glucose metabolism", "Increased immune signaling"],
    ans: 1,
    rationales: [
      "INCORRECT: Hemoglobin production affects red blood cell function, not cell-cycle regulation.",
      "CORRECT: Oncogenes drive cell proliferation. Mutation activating oncogene → continuous growth signaling → uncontrolled cell division → tumor formation.",
      "INCORRECT: Cancer cells typically increase glucose metabolism rather than reduce it.",
      "INCORRECT: Immune signaling may influence inflammation but does not directly cause uncontrolled cell division."
    ]
  },
  // Q9
  {
    q: "Bone marrow overcrowding in leukemia reduces production of:",
    opts: ["Red blood cells", "Platelets", "Functional leukocytes", "All of the above"],
    ans: 3,
    rationales: [
      "INCOMPLETE: Red blood cell reduction (anemia) does occur, but leukemia suppresses all three blood cell lineages.",
      "INCOMPLETE: Platelet reduction (thrombocytopenia) does occur, but leukemia suppresses all three blood cell lineages.",
      "INCOMPLETE: Functional leukocyte reduction does occur, but leukemia suppresses all three blood cell lineages.",
      "CORRECT: Leukemia causes marrow replacement by malignant cells. Uncontrolled proliferation of leukemic cells → marrow overcrowding → suppression of normal hematopoiesis. This leads to anemia, thrombocytopenia, and infection risk."
    ]
  },
  // Q10
  {
    q: "What distinguishes acute leukemia from chronic leukemia?",
    opts: ["Presence of mature cells", "Rapid proliferation of immature cells", "Absence of marrow involvement", "No systemic symptoms"],
    ans: 1,
    rationales: [
      "INCORRECT: Mature-appearing leukocytes are more characteristic of chronic leukemia.",
      "CORRECT: Acute leukemia involves immature precursor cells (blasts) that proliferate rapidly. Mutation in hematopoietic precursor → blast proliferation → marrow overcrowding → rapid disease progression.",
      "INCORRECT: Both acute and chronic leukemias involve the bone marrow.",
      "INCORRECT: Acute leukemias often produce severe systemic symptoms including fatigue, infection, and bleeding."
    ]
  },
  // Q11
  {
    q: "Which cell type is the hallmark diagnostic feature of Hodgkin lymphoma?",
    opts: ["Plasma cell", "Reed–Sternberg cell", "Eosinophil", "Myeloblast"],
    ans: 1,
    rationales: [
      "INCORRECT: Plasma cells produce antibodies and are normally present in immune responses. They are not the defining malignant cell type of Hodgkin lymphoma.",
      "CORRECT: Hodgkin lymphoma is defined by the presence of Reed–Sternberg cells, which are large abnormal B-cells with characteristic morphology. Malignant transformation of B lymphocyte → formation of Reed–Sternberg cells → release of cytokines → recruitment of inflammatory cells → enlarged lymph nodes.",
      "INCORRECT: Eosinophils are inflammatory cells often recruited into tissues during allergic or parasitic responses. While they may appear in Hodgkin lymphoma tissue due to cytokine signaling, they are not the malignant cell driving the disease.",
      "INCORRECT: Myeloblasts are immature myeloid cells associated with acute myelogenous leukemia, not lymphoma."
    ]
  },
  // Q12
  {
    q: "What is the fundamental physiological problem in anemia?",
    opts: ["Reduced blood pressure", "Reduced oxygen delivery", "Increased immune activation", "Reduced platelet formation"],
    ans: 1,
    rationales: [
      "INCORRECT: Blood pressure may change in severe anemia but it is not the defining physiological problem.",
      "CORRECT: Anemia reduces the blood's ability to carry oxygen. Low hemoglobin concentration → decreased oxygen transport capacity → reduced oxygen delivery to tissues → fatigue and weakness.",
      "INCORRECT: Anemia affects oxygen transport, not immune activation.",
      "INCORRECT: Platelet reduction describes thrombocytopenia, not anemia."
    ]
  },
  // Q13
  {
    q: "Which red blood cell morphology is typical of iron deficiency anemia?",
    opts: ["Large and pale cells", "Small and pale cells", "Large and dark cells", "Normal-size cells"],
    ans: 1,
    rationales: [
      "INCORRECT: Large cells are typical of vitamin B12 or folate deficiency, which produce macrocytic anemia.",
      "CORRECT: Iron deficiency limits hemoglobin synthesis. Iron deficiency → reduced hemoglobin production → smaller red blood cells (microcytic) → decreased hemoglobin concentration (hypochromic). This produces microcytic hypochromic red blood cells, which appear small and pale.",
      "INCORRECT: Large, highly hemoglobin-dense cells are not typical of iron deficiency anemia.",
      "INCORRECT: Normal-size red blood cells occur in normocytic anemia, which has different causes such as acute blood loss or chronic disease."
    ]
  },
  // Q14
  {
    q: "Which protein is mutated in sickle cell disease?",
    opts: ["Platelet proteins", "Alpha globin", "Beta globin", "Myoglobin"],
    ans: 2,
    rationales: [
      "INCORRECT: Platelet proteins are involved in clot formation and platelet function, not hemoglobin structure.",
      "INCORRECT: Mutations in alpha globin are associated with alpha thalassemia, not sickle cell disease.",
      "CORRECT: Sickle cell disease results from a mutation in the beta-globin gene. Beta-globin gene mutation → abnormal hemoglobin (HbS) → polymerization of HbS during low oxygen conditions → deformation of red blood cells.",
      "INCORRECT: Myoglobin stores oxygen in muscle tissue and is unrelated to red blood cell hemoglobin disorders."
    ]
  },
  // Q15
  {
    q: "Low oxygen conditions cause HbS to produce which cellular change?",
    opts: ["Red blood cell swelling", "Red blood cell sickling", "Red blood cell fragmentation", "Red blood cell dehydration"],
    ans: 1,
    rationales: [
      "INCORRECT: Swelling is not the mechanism responsible for sickle cell complications.",
      "CORRECT: Under low oxygen conditions, HbS molecules polymerize. Deoxygenation → HbS polymer formation → distortion of red blood cell shape → sickle-shaped cells → vascular obstruction. This leads to pain crises and ischemia.",
      "INCORRECT: Fragmentation occurs in mechanical hemolysis or microangiopathic hemolytic anemia, not sickle cell disease.",
      "INCORRECT: Although dehydration may worsen sickling, it is not the primary structural change caused by HbS polymerization."
    ]
  },
  // Q16
  {
    q: "What is the first step in primary hemostasis?",
    opts: ["Thrombin activation", "Platelet adhesion to collagen", "Fibrin formation", "Factor X activation"],
    ans: 1,
    rationales: [
      "INCORRECT: Thrombin participates in secondary hemostasis, which occurs later in the clotting cascade.",
      "CORRECT: Primary hemostasis begins when platelets adhere to exposed collagen. Vessel injury → exposure of subendothelial collagen → platelet adhesion via von Willebrand factor → platelet activation. This forms the initial platelet plug.",
      "INCORRECT: Fibrin stabilizes the clot during secondary hemostasis, not during the initial platelet adhesion phase.",
      "INCORRECT: Factor X activation is part of the coagulation cascade and occurs after platelet plug formation begins."
    ]
  },
  // Q17
  {
    q: "Which molecule allows platelets to attach to exposed collagen?",
    opts: ["Thrombin", "Fibrinogen", "von Willebrand factor", "Factor IX"],
    ans: 2,
    rationales: [
      "INCORRECT: Thrombin converts fibrinogen into fibrin during secondary hemostasis.",
      "INCORRECT: Fibrinogen links platelets together during aggregation but does not mediate initial adhesion.",
      "CORRECT: von Willebrand factor (vWF) connects platelets to collagen. Vessel injury → vWF binds exposed collagen → platelet receptor GpIb binds vWF → platelet adhesion. This interaction initiates the formation of the platelet plug.",
      "INCORRECT: Factor IX is part of the coagulation cascade and is unrelated to platelet adhesion."
    ]
  },
  // Q18
  {
    q: "Which platelet receptor binds von Willebrand factor?",
    opts: ["GpIb", "GpIIb/IIIa", "CD4", "Fc receptor"],
    ans: 0,
    rationales: [
      "CORRECT: GpIb is the platelet receptor responsible for binding vWF. vWF attaches to exposed collagen → platelet receptor GpIb binds vWF → platelet adhesion to vessel wall. This is the first major platelet interaction after vascular injury.",
      "INCORRECT: GpIIb/IIIa mediates platelet aggregation, not initial adhesion.",
      "INCORRECT: CD4 is a receptor found on helper T cells and is involved in immune signaling.",
      "INCORRECT: Fc receptors bind antibodies and are involved in immune cell activation, not platelet adhesion."
    ]
  },
  // Q19
  {
    q: "Which receptor mediates platelet aggregation?",
    opts: ["GpIb", "GpIIb/IIIa", "Factor X", "CD8"],
    ans: 1,
    rationales: [
      "INCORRECT: GpIb mediates platelet adhesion, not aggregation.",
      "CORRECT: Platelet aggregation occurs through fibrinogen bridges connecting platelets. Platelet activation → expression of GpIIb/IIIa receptors → fibrinogen binding between platelets → platelet aggregation. This stabilizes the platelet plug.",
      "INCORRECT: Factor X is an enzyme in the coagulation cascade and is unrelated to platelet aggregation.",
      "INCORRECT: CD8 identifies cytotoxic T cells and has no role in platelet function."
    ]
  },
  // Q20
  {
    q: "What is the final structural product of the coagulation cascade?",
    opts: ["Platelets", "Thrombin", "Fibrin", "Collagen"],
    ans: 2,
    rationales: [
      "INCORRECT: Platelets form the initial plug but are not the final stabilizing structure.",
      "INCORRECT: Thrombin is an enzyme that generates fibrin but is not the final structural component.",
      "CORRECT: The coagulation cascade ends with the formation of fibrin, which stabilizes the clot. Coagulation cascade → thrombin activation → fibrinogen conversion → fibrin polymer formation → stable blood clot.",
      "INCORRECT: Collagen is exposed after vessel injury but does not form the clot itself."
    ]
  },
  // Q21
  {
    q: "Which laboratory test primarily evaluates the extrinsic coagulation pathway?",
    opts: ["Activated partial thromboplastin time (aPTT)", "Prothrombin time (PT)", "Bleeding time", "Platelet count"],
    ans: 1,
    rationales: [
      "INCORRECT: The activated partial thromboplastin time measures the intrinsic pathway, not the extrinsic pathway.",
      "CORRECT: The prothrombin time (PT) measures the integrity of the extrinsic coagulation pathway. Tissue injury → tissue factor activation → Factor VII activation → extrinsic pathway cascade → clot formation. PT therefore evaluates factors involved in the extrinsic and common pathways.",
      "INCORRECT: Bleeding time evaluates platelet function, not coagulation cascade pathways.",
      "INCORRECT: Platelet count measures the number of platelets but does not test coagulation cascade activity."
    ]
  },
  // Q22
  {
    q: "Which laboratory test primarily evaluates the intrinsic coagulation pathway?",
    opts: ["Prothrombin time (PT)", "Activated partial thromboplastin time (aPTT)", "Platelet count", "Hemoglobin level"],
    ans: 1,
    rationales: [
      "INCORRECT: PT measures the extrinsic pathway, particularly Factor VII activity.",
      "CORRECT: The aPTT evaluates the intrinsic pathway. Activation of intrinsic factors → Factors XII, XI, IX, VIII → activation of Factor X → fibrin clot formation. Prolongation of aPTT suggests dysfunction in these intrinsic pathway components.",
      "INCORRECT: Platelet count evaluates platelet number, not coagulation cascade function.",
      "INCORRECT: Hemoglobin levels measure oxygen-carrying capacity, not clotting pathways."
    ]
  },
  // Q23
  {
    q: "A prolonged aPTT with a normal PT most strongly suggests a defect in which pathway?",
    opts: ["Extrinsic pathway", "Intrinsic pathway", "Platelet adhesion pathway", "Fibrinolysis pathway"],
    ans: 1,
    rationales: [
      "INCORRECT: Extrinsic pathway defects typically prolong PT, not aPTT.",
      "CORRECT: When PT is normal but aPTT is prolonged, the problem lies within the intrinsic coagulation pathway. Intrinsic pathway factor deficiency → impaired activation of Factor X → delayed fibrin clot formation. This pattern is classically seen in hemophilia.",
      "INCORRECT: Platelet adhesion disorders affect primary hemostasis and bleeding time, not aPTT.",
      "INCORRECT: Fibrinolysis breaks down clots after formation and does not primarily affect aPTT results."
    ]
  },
  // Q24
  {
    q: "Hemophilia A results from deficiency of which clotting factor?",
    opts: ["Factor VII", "Factor VIII", "Factor X", "Factor XIII"],
    ans: 1,
    rationales: [
      "INCORRECT: Factor VII belongs to the extrinsic pathway, not the intrinsic pathway.",
      "CORRECT: Hemophilia A is caused by deficiency of Factor VIII. Factor VIII deficiency → impaired intrinsic pathway activation → reduced Factor X activation → decreased fibrin formation. This leads to prolonged bleeding.",
      "INCORRECT: Factor X is part of the common pathway and deficiency would affect both PT and aPTT.",
      "INCORRECT: Factor XIII stabilizes fibrin but is not the primary defect in hemophilia A."
    ]
  },
  // Q25
  {
    q: "Which coagulation disorder is characterized by prolonged aPTT with normal platelet count?",
    opts: ["Hemophilia", "Thrombocytopenia", "Iron deficiency anemia", "Leukemia"],
    ans: 0,
    rationales: [
      "CORRECT: Hemophilia involves a deficiency of intrinsic pathway clotting factors. Intrinsic factor deficiency → prolonged aPTT → normal platelet number and function → impaired fibrin clot formation.",
      "INCORRECT: Thrombocytopenia reduces platelet count and affects primary hemostasis, not intrinsic pathway clotting factors.",
      "INCORRECT: Iron deficiency affects red blood cell production rather than coagulation pathways.",
      "INCORRECT: Leukemia affects bone marrow cell production but is not specifically defined by prolonged aPTT."
    ]
  },
  // Q26
  {
    q: "Which disorder involves low platelet count leading to bleeding tendency?",
    opts: ["Hemophilia", "Thrombocytopenia", "Leukemia", "Polycythemia"],
    ans: 1,
    rationales: [
      "INCORRECT: Hemophilia involves clotting factor deficiency, not platelet deficiency.",
      "CORRECT: Thrombocytopenia is defined by reduced platelet numbers. Low platelet count → impaired platelet plug formation → defective primary hemostasis → increased bleeding tendency.",
      "INCORRECT: Leukemia may reduce platelets indirectly through marrow replacement but is not defined primarily by platelet count loss.",
      "INCORRECT: Polycythemia involves increased red blood cell mass, not platelet deficiency."
    ]
  },
  // Q27
  {
    q: "Which three factors together form Virchow's triad, the major contributors to thrombosis?",
    opts: ["Platelet count, fibrinogen level, hemoglobin level", "Blood stasis, endothelial injury, hypercoagulability", "Inflammation, infection, immune activation", "Hemoglobin, oxygen tension, carbon dioxide"],
    ans: 1,
    rationales: [
      "INCORRECT: These laboratory values do not represent the major physiological causes of thrombosis.",
      "CORRECT: Virchow's triad identifies three conditions promoting clot formation: blood stasis, endothelial injury, and hypercoagulability → increased risk of thrombosis.",
      "INCORRECT: Inflammation may influence clotting but does not define the classic triad.",
      "INCORRECT: These relate to oxygen transport, not clot formation."
    ]
  },
  // Q28
  {
    q: "Which factor most strongly contributes to deep vein thrombosis (DVT) formation?",
    opts: ["Increased platelet destruction", "Prolonged immobility causing blood stasis", "Decreased hemoglobin levels", "Excess antibody production"],
    ans: 1,
    rationales: [
      "INCORRECT: Platelet destruction would reduce clotting ability rather than increase thrombosis risk.",
      "CORRECT: Prolonged immobility promotes venous blood stasis. Immobility → slowed venous blood flow → increased clotting factor interaction → thrombus formation in deep veins. This represents one component of Virchow's triad.",
      "INCORRECT: Hemoglobin levels affect oxygen transport, not venous clot formation.",
      "INCORRECT: Antibody levels do not directly cause deep vein thrombosis."
    ]
  },
  // Q29
  {
    q: "A thrombus that forms in a leg vein and travels to the lungs causes which condition?",
    opts: ["Stroke", "Pulmonary embolism", "Myocardial infarction", "Cerebral aneurysm"],
    ans: 1,
    rationales: [
      "INCORRECT: Stroke occurs when blood flow to brain tissue is interrupted.",
      "CORRECT: A thrombus that dislodges and travels through the bloodstream is called an embolus. Deep vein thrombosis → thrombus detaches → travels through venous circulation → lodges in pulmonary arteries → pulmonary embolism.",
      "INCORRECT: Heart attacks occur when coronary arteries become blocked.",
      "INCORRECT: Aneurysms involve vessel wall dilation, not embolic obstruction."
    ]
  },
  // Q30
  {
    q: "What is the primary physiological consequence of a pulmonary embolism?",
    opts: ["Reduced oxygen exchange in the lungs", "Increased red blood cell production", "Reduced platelet function", "Increased immune activation"],
    ans: 0,
    rationales: [
      "CORRECT: Pulmonary embolism blocks blood flow to lung tissue. Embolus lodges in pulmonary artery → reduced perfusion of lung tissue → impaired gas exchange → decreased oxygenation of blood.",
      "INCORRECT: Red blood cell production changes slowly and is not an immediate consequence of pulmonary embolism.",
      "INCORRECT: Pulmonary embolism affects blood flow in the lungs, not platelet activity.",
      "INCORRECT: Immune activation is not the defining physiological effect of pulmonary embolism."
    ]
  }
];

export const MODULE2_CLINICAL_SUMMARIES = {
  immune_overview: { 
    mechanism: "The immune system distinguishes 'self' from 'non-self' using MHC/HLA markers. Innate immunity provides immediate, non-specific defense (neutrophils, macrophages), while adaptive immunity (B and T cells) provides long-term, specific memory.",
    pearl: "Innate immunity is the 'first responder'; adaptive immunity is the 'special forces' with memory.",
    visual: "MACROPHAGES // TLR ACTIVATION // LYMPHOCYTE RECRUITMENT"
  },
  type1_hyper: { 
    mechanism: "IgE-mediated immediate hypersensitivity. Allergen binds to IgE on mast cells, causing degranulation and release of histamine, leukotrienes, and prostaglandins.",
    pearl: "Think 'A' for Anaphylaxis/Atopy. Immediate reaction within minutes.",
    visual: "MAST CELL DEGRANULATION // HISTAMINE RELEASE"
  },
  type2_hyper: { 
    mechanism: "Antibody-mediated (IgG/IgM) cytotoxicity. Antibodies bind to antigens on cell surfaces, leading to complement activation and MAC-mediated lysis or opsonization.",
    pearl: "Think 'B' for Anti-Body. Examples: Rh incompatibility, Goodpasture syndrome.",
    visual: "IgG BINDING // COMPLEMENT ACTIVATION // CELL LYSIS"
  },
  type3_hyper: { 
    mechanism: "Immune complex-mediated. Antigen-antibody complexes deposit in tissues (vessel walls, joints, kidneys), triggering neutrophil recruitment and vasculitis.",
    pearl: "Think 'C' for Complex. Examples: SLE, Serum Sickness, Arthus reaction.",
    visual: "IMMUNE COMPLEX DEPOSITION // VASCULITIS"
  },
  type4_hyper: { 
    mechanism: "Delayed-type, T-cell mediated. Sensitized T-cells release cytokines (CD4+) or directly kill cells (CD8+). No antibodies involved.",
    pearl: "Think 'D' for Delayed. Reaction occurs 48-72 hours later. Example: PPD test, Contact dermatitis.",
    visual: "T-CELL ACTIVATION // MACROPHAGE RECRUITMENT"
  },
  hiv: {
    mechanism: "Retrovirus that targets CD4+ T-cells. Viral gp120 binds CD4/CCR5, integrates into host DNA via reverse transcriptase and integrase, causing progressive immune depletion.",
    pearl: "Monitor CD4 count and Viral Load. AIDS defined by CD4 < 200 or opportunistic infection.",
    visual: "gp120 BINDING // REVERSE TRANSCRIPTION // CD4 DEPLETION"
  },
  all: {
    mechanism: "Acute Lymphoblastic Leukemia. Malignant proliferation of lymphoblasts in the bone marrow, leading to marrow overcrowding and suppression of normal hematopoiesis.",
    pearl: "Most common pediatric cancer. Look for bone pain, bruising (low PLT), and infections (low WBC).",
    visual: "BONE MARROW OVERCROWDING // BLAST ACCUMULATION"
  },
  sickle_cell: {
    mechanism: "Autosomal recessive point mutation in the beta-globin gene (Glutamate → Valine). HbS polymerizes under low oxygen conditions, causing RBCs to sickle and occlude microvessels.",
    pearl: "Hydration and oxygenation are key to preventing vaso-occlusive crises.",
    visual: "HbS POLYMERIZATION // VASO-OCCLUSION"
  }
};

export const MODULE2_PATHOPHYSIOLOGY_DATA = [
  { 
    act: "PROLOGUE: COUSIN ORACLE SITUATION", day: "MONDAY", time: "07:48 AM", event: "THE ARRIVAL", location: "atrium",
    beats: [
      { 
        text: "Students move through the glass atrium on their way to the first lecture of the week.", 
        diagram: [
          { type: 'text', x: 20, y: 30, label: "07:48 AM // WESTBRIDGE" },
          { type: 'node', x: 20, y: 50, label: "INNATE IMMUNITY", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "ADAPTIVE IMMUNITY", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} }
        ] 
      },
      { 
        text: "Alfie stands near the railing reviewing his notes when Belinda arrives with coffee and a stack of color-coded pens.", 
        diagram: [
          { type: 'node', x: 50, y: 40, label: "ALFIE: NOTES", shape: 'circle', isMedical: false },
          { type: 'node', x: 50, y: 70, label: "BELINDA: COFFEE", shape: 'circle', isMedical: false }
        ] 
      },
      { 
        text: "A moment later Adrian walks in. Neil immediately turns toward her.", 
        diagram: [
          { type: 'node', x: 30, y: 50, label: "ADRIAN", shape: 'circle', isMedical: false },
          { type: 'node', x: 70, y: 50, label: "NEIL", shape: 'circle', isMedical: false }
        ] 
      },
      { 
        text: "Neil: 'I’ve decided something. From now on I will be known as Cousin Oracle.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "COUSIN ORACLE", shape: 'box', isMedical: false },
          { type: 'arrow', from: {x: 50, y: 38}, to: {x: 50, y: 55} },
          { type: 'node', x: 50, y: 60, label: "PATTERN RECOGNITION", shape: 'circle', isMedical: false }
        ] 
      },
      { 
        text: "Adrian stops walking. 'No.' Neil gestures toward Alfie. 'It’s perfectly logical. I’m his cousin, and I have an exceptional ability to recognize patterns.' Adrian crosses her arms.", 
        speaker: 'adrian',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "PATTERN A", shape: 'circle', isMedical: false },
          { type: 'node', x: 50, y: 50, label: "PATTERN B", shape: 'circle', isMedical: false },
          { type: 'node', x: 80, y: 50, label: "PATTERN C", shape: 'circle', isMedical: false },
          { type: 'arrow', from: {x: 25, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      }
    ],
    q: "According to the baseline principles of clinical pathology, what is the primary role of the immune system?", 
    opts: ["To maintain homeostasis via cellular recognition", "To increase inflammation indefinitely", "To produce red blood cells", "To decrease blood pressure"], 
    ans: 0, 
    rationales: ["CORRECT: The immune system's baseline function is distinguishing 'self' from 'non-self' to maintain homeostasis.", "INCORRECT: Controlled inflammation is a response tool, but the primary goal is recognition and homeostasis.", "INCORRECT: Erythropoiesis (RBC production) is a function of the bone marrow, not the immune system.", "INCORRECT: Blood pressure is a cardiovascular/hemodynamic function."]
  },
  { 
    act: "SCENE 1: TWO SYSTEMS", day: "MONDAY", time: "08:02 AM", event: "LITMUS TEST", location: "conference_room",
    beats: [
      { 
        text: "Dr. Rao enters without ceremony and writes INNATE and ADAPTIVE on the board.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 30, y: 30, label: "INNATE", shape: 'box' },
          { type: 'node', x: 70, y: 30, label: "ADAPTIVE", shape: 'box' }
        ] 
      },
      { 
        text: "'Every immune disease you study this week will trace back to the interaction between these two systems.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 30, y: 30, label: "INNATE", shape: 'box' },
          { type: 'node', x: 70, y: 30, label: "ADAPTIVE", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 30}, to: {x: 55, y: 30} },
          { type: 'arrow', from: {x: 55, y: 30}, to: {x: 45, y: 30} }
        ] 
      },
      { 
        text: "Alfie begins writing as Dr. Rao draws a chain. Neil raises one finger.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "LINK 1", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "LINK 2", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "LINK 3", shape: 'circle' },
          { type: 'arrow', from: {x: 25, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Cousin Oracle will now compare. Innate immunity is basically Chuck Norris entering a room. He stops the fight immediately.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 40, label: "CHUCK NORRIS", shape: 'box' },
          { type: 'node', x: 50, y: 70, label: "INNATE", shape: 'circle' },
          { type: 'arrow', from: {x: 50, y: 48}, to: {x: 50, y: 65} }
        ] 
      },
      { 
        text: "Neil: 'Adaptive immunity is more like Star Trek command strategy. It studies the enemy first, then remembers them forever.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "STUDY", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "MEMORY", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "ADAPTIVE", shape: 'box' },
          { type: 'arrow', from: {x: 25, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      }
    ],
    q: "Which of the following is a hallmark characteristic of the Innate immune response?", 
    opts: ["Antigen specific", "Rapid and nonspecific", "Immune memory", "T-cell mediated precision"], 
    ans: 1, 
    rationales: ["INCORRECT: Antigen specificity is a feature of adaptive immunity.", "CORRECT: The innate system provides a rapid, nonspecific defense using macrophages, neutrophils, and complement.", "INCORRECT: Memory is the defining feature of the adaptive system.", "INCORRECT: Precision and T-cell activation belong to the adaptive arm."]
  },
  { 
    act: "SCENE 2: THE FIRST REACTION", day: "MONDAY", time: "09:17 AM", event: "TYPE I RESPONSE", location: "allergy_wing",
    beats: [
      { 
        text: "The group enters an exam room where a teenage patient sits scratching red welts.", 
        diagram: [
          { type: 'node', x: 50, y: 50, label: "TEENAGE PATIENT", shape: 'box' },
          { type: 'node', x: 50, y: 75, label: "WELTS", shape: 'circle' }
        ] 
      },
      { 
        text: "Belinda: 'Symptoms started about fifteen minutes after eating peanut cookies.'", 
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "PEANUT ALLERGEN", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 50, y: 50} },
          { type: 'node', x: 70, y: 50, label: "REACTION", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie writes the chain: Allergen exposure → IgE binding to mast cells.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "ALLERGEN", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "IgE", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "MAST CELL", shape: 'box' },
          { type: 'arrow', from: {x: 25, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Alfie: 'Second exposure → Mast-cell degranulation → Histamine release.'", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "2ND EXPOSURE", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "DEGRANULATION", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "HISTAMINE", shape: 'circle' },
          { type: 'arrow', from: {x: 25, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'This is Breaking Bad. Season one is setup. Season two is explosions.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 30, y: 50, label: "S1: SETUP", shape: 'box' },
          { type: 'node', x: 70, y: 50, label: "S2: EXPLOSION", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} }
        ] 
      }
    ],
    q: "Which antibody type is primarily responsible for the mast cell degranulation seen in Type I Hypersensitivity?", 
    opts: ["IgG", "IgM", "IgE", "IgA"], 
    ans: 2, 
    rationales: ["INCORRECT: IgG is primarily involved in Type II and III reactions.", "INCORRECT: IgM is the first antibody produced but not the mediator of Type I allergy.", "CORRECT: IgE binds to mast cells; allergen cross-linking then triggers rapid histamine release.", "INCORRECT: IgA is found in mucosal secretions and does not drive degranulation."]
  },
  { 
    act: "SCENE 3: WHEN ANTIBODIES ATTACK", day: "MONDAY", time: "10:41 AM", event: "TYPE II HEMOLYSIS", location: "hematology_lab",
    beats: [
      { 
        text: "Dr. Rao points toward a projector screen showing damaged red blood cells. 'Autoimmune hemolytic anemia.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "RBC", shape: 'circle' },
          { type: 'node', x: 20, y: 25, label: "ANTIBODY", shape: 'circle' },
          { type: 'arrow', from: {x: 20, y: 33}, to: {x: 20, y: 42} }
        ] 
      },
      { 
        text: "Alfie writes the chain: Autoantibody formation → RBC binding → Complement cascade → Cell lysis.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "BINDING", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "COMPLEMENT", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "LYSIS", shape: 'box' },
          { type: 'arrow', from: {x: 25, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'This is basically Office Space. The company destroys its own employees.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 40, label: "OFFICE SPACE", shape: 'box' },
          { type: 'node', x: 50, y: 70, label: "AUTOIMMUNITY", shape: 'box' },
          { type: 'arrow', from: {x: 50, y: 48}, to: {x: 50, y: 62} }
        ] 
      },
      { 
        text: "Marty Pickles pauses outside: 'Cells marked for destruction rarely last long.'", 
        speaker: 'marty',
        diagram: [
          { type: 'node', x: 80, y: 30, label: "MARTY'S RULE", shape: 'box' },
          { type: 'text', x: 80, y: 50, label: "MARKED = DEAD" }
        ] 
      }
    ],
    q: "What is the consequence of the complement cascade activation in Type II Hypersensitivity?", 
    opts: ["Histamine release", "Formation of immune complexes", "Membrane attack complex (MAC) formation and cell lysis", "T-cell sensitization"], 
    ans: 2, 
    rationales: ["INCORRECT: Histamine release is a Type I event.", "INCORRECT: Circulating complexes are characteristic of Type III.", "CORRECT: In Type II, antibodies bind cell surfaces, activating complement and leading to direct cellular destruction via the MAC.", "INCORRECT: T-cell sensitization is the hallmark of Type IV."]
  },
  { 
    act: "SCENE 4: IMMUNE COMPLEXES", day: "MONDAY", time: "12:06 PM", event: "TYPE III DEPOSITION", location: "cafeteria",
    beats: [
      { 
        text: "Lunch trays cover the table while Belinda flips through a lupus case file.", 
        diagram: [
          { type: 'node', x: 50, y: 50, label: "LUPUS FILE", shape: 'box' }
        ] 
      },
      { 
        text: "Dr. Rao writes on a napkin: Autoantibody formation → Circulating immune complexes → Deposition in tissues → Complement activation.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 40, label: "COMPLEXES", shape: 'circle' },
          { type: 'node', x: 50, y: 40, label: "DRIFTING", shape: 'circle' },
          { type: 'node', x: 80, y: 40, label: "DEPOSITION", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 40}, to: {x: 40, y: 40} },
          { type: 'arrow', from: {x: 60, y: 40}, to: {x: 70, y: 40} }
        ] 
      },
      { 
        text: "Neil: 'This is Star Trek. Immune complexes drift everywhere before causing problems.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "STAR TREK", shape: 'box' },
          { type: 'text', x: 50, y: 50, label: "DRIFTING IN SPACE/BODY" }
        ] 
      },
      { 
        text: "Marty Pickles walks past: 'Deposition matters more than production.'", 
        speaker: 'marty',
        diagram: [
          { type: 'node', x: 50, y: 70, label: "DEPOSITION > PRODUCTION", shape: 'box' }
        ] 
      }
    ],
    q: "In systemic lupus erythematosus (SLE), what is the primary cause of multi-organ inflammatory tissue injury?", 
    opts: ["Direct T-cell killing", "Deposition of circulating antigen-antibody complexes", "IgE-mediated degranulation", "Viral replication in host DNA"], 
    ans: 1, 
    rationales: ["INCORRECT: Direct T-cell killing is Type IV.", "CORRECT: Type III involves the formation and deposition of immune complexes that trigger inflammation wherever they land.", "INCORRECT: IgE degranulation is Type I.", "INCORRECT: SLE is an autoimmune complex disease, not a primary viral infection."]
  },
  { 
    act: "SCENE 5: THE DELAYED REACTION", day: "MONDAY", time: "01:52 PM", event: "TYPE IV DELAY", location: "dermatology_clinic",
    beats: [
      { 
        text: "A patient has red blistering streaks across both forearms. 'Poison ivy,' Dr. Rao says.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "POISON IVY", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "DELAYED RESPONSE" }
        ] 
      },
      { 
        text: "Alfie writes: Allergen exposure → Dendritic cell capture → T-cell sensitization → Cytokine release → Macrophage recruitment.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "URUSHIOL", shape: 'circle' },
          { type: 'node', x: 30, y: 50, label: "DENDRITIC", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "T-CELL", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "CYTOKINES", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "M-PHAGE", shape: 'circle' },
          { type: 'arrow', from: {x: 15, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 65, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'This is like a pottery kiln. You set the clay earlier, then the real transformation happens later.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 20, y: 30, label: "POTTERY", shape: 'box' },
          { type: 'node', x: 80, y: 30, label: "TYPE IV", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 30}, to: {x: 65, y: 30} }
        ] 
      },
      { 
        text: "Marty Pickles: 'Delayed reactions are often the loudest ones.'", 
        speaker: 'marty',
        diagram: [
          { type: 'text', x: 50, y: 70, label: "48-72 HOURS LATER" }
        ] 
      }
    ],
    q: "Unlike Types I-III, what is the unique mediator of Type IV Hypersensitivity?", 
    opts: ["IgG antibodies", "Complement proteins", "T lymphocytes (T-cells)", "Mast cell histamine"], 
    ans: 2, 
    rationales: ["INCORRECT: Antibodies are not involved in Type IV reactions.", "INCORRECT: Complement is primarily involved in Types II and III.", "CORRECT: Type IV is a delayed, cell-mediated response involving T-cells and macrophage recruitment.", "INCORRECT: Histamine is the mediator for Type I."]
  },
  { 
    act: "SCENE 6: WHEN TOLERANCE FAILS", day: "MONDAY", time: "03:08 PM", event: "IMMUNE TOLERANCE", location: "conference_room",
    beats: [
      { 
        text: "Dr. Rao: 'The immune system must distinguish self from non-self.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "SELF", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "NON-SELF", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} }
        ] 
      },
      { 
        text: "Alfie draws the chain: Failure of tolerance → Autoreactive T cells escape → Recognition of self antigens → Chronic inflammation.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "TOLERANCE FAIL", shape: 'box' },
          { type: 'node', x: 35, y: 50, label: "ESCAPE", shape: 'circle' },
          { type: 'node', x: 60, y: 50, label: "SELF-ATTACK", shape: 'box' },
          { type: 'node', x: 85, y: 50, label: "INFLAM.", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} },
          { type: 'arrow', from: {x: 70, y: 50}, to: {x: 80, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'This is Napoleon Dynamite. Everyone in that movie misunderstands each other.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "NAPOLEON DYNAMITE", shape: 'box' },
          { type: 'text', x: 50, y: 50, label: "MISRECOGNITION" }
        ] 
      }
    ],
    q: "Autoimmune disease primarily begins when which process fails?", 
    opts: ["Bone marrow RBC production", "Immune tolerance and self-recognition", "Clotting factor synthesis", "Hypothalamic temperature set-point"], 
    ans: 1, 
    rationales: ["INCORRECT: RBC production is unrelated to autoimmune recognition.", "CORRECT: Loss of immune tolerance allows autoreactive lymphocytes to survive and attack self tissues.", "INCORRECT: Clotting is a hemostatic function.", "INCORRECT: Temperature set-point is a hypothalamic/fever response."]
  },
  { 
    act: "SCENE 7: LUPUS", day: "TUESDAY", time: "08:06 AM", event: "SLE CASCADE", location: "internal_medicine_ward",
    beats: [
      { 
        text: "Morning rounds begin. Belinda reads labs: 'Positive ANA. Anti-dsDNA. Proteinuria.' Dr. Rao: 'SLE.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 30, label: "ANA+", shape: 'box' },
          { type: 'node', x: 20, y: 60, label: "anti-dsDNA+", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie writes: Loss of tolerance → Autoantibodies against nuclear antigens → Immune complex deposition in kidneys, joints, skin → Complement activation.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "NUCLEUS", shape: 'circle' },
          { type: 'node', x: 30, y: 50, label: "AUTO-Ab", shape: 'circle' },
          { type: 'node', x: 55, y: 50, label: "COMPLEX", shape: 'circle' },
          { type: 'node', x: 85, y: 50, label: "KIDNEY/SKIN", shape: 'box' },
          { type: 'arrow', from: {x: 15, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 40, y: 50}, to: {x: 50, y: 50} },
          { type: 'arrow', from: {x: 65, y: 50}, to: {x: 80, y: 50} }
        ] 
      },
      { 
        text: "Marty Pickles: 'Deposition explains the damage.'", 
        speaker: 'marty',
        diagram: [
          { type: 'text', x: 85, y: 70, label: "TARGET TISSUE" }
        ] 
      }
    ],
    q: "Which specific clinical clue helps identify Systemic Lupus Erythematosus (SLE) in this scene?", 
    opts: ["Low hemoglobin", "Positive ANA and anti-dsDNA antibodies", "High platelet count", "Normal CD4 count"], 
    ans: 1, 
    rationales: ["INCORRECT: Low hemoglobin is generic anemia.", "CORRECT: Autoantibodies against nuclear antigens (ANA) and double-stranded DNA are hallmarks of SLE.", "INCORRECT: SLE often involves low counts, but high platelets are not a hallmark.", "INCORRECT: CD4 counts are used for HIV/AIDS monitoring."]
  },
  { 
    act: "SCENE 8: RHEUMATOID ARTHRITIS", day: "TUESDAY", time: "09:14 AM", event: "SYNOVIAL DESTRUCTION", location: "rheumatology_clinic",
    beats: [
      { 
        text: "A patient flexes stiff hands. Dr. Rao shows an X-ray: joint narrowing and pannus.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "JOINT NARROWING", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie writes the chain: Chronic synovial inflammation → TNF-α/IL-1/IL-6 release → Pannus formation → Cartilage erosion.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "SYNOVITIS", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "CYTOKINES", shape: 'circle' },
          { type: 'node', x: 60, y: 50, label: "PANNUS", shape: 'box' },
          { type: 'node', x: 85, y: 50, label: "EROSION", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} },
          { type: 'arrow', from: {x: 70, y: 50}, to: {x: 80, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'This is pottery. If you keep reshaping clay the wrong way, the structure collapses.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "RESHAPING CLAY", shape: 'box' },
          { type: 'arrow', from: {x: 50, y: 40}, to: {x: 50, y: 60} },
          { type: 'text', x: 50, y: 70, label: "COLLAPSE" }
        ] 
      }
    ],
    q: "What is the destructive, invasive tissue formed in the joints of patients with Rheumatoid Arthritis?", 
    opts: ["Foam cells", "Pannus", "Reed-Sternberg cells", "Hemoglobin S"], 
    ans: 1, 
    rationales: ["INCORRECT: Foam cells are found in atherosclerosis.", "CORRECT: Pannus is the invasive, inflammatory synovial tissue that erodes cartilage and bone in RA.", "INCORRECT: Reed-Sternberg cells are pathognomonic for Hodgkin Lymphoma.", "INCORRECT: HbS is the variant in Sickle Cell Disease."]
  },
  { 
    act: "SCENE 9: IMMUNODEFICIENCY", day: "TUESDAY", time: "10:28 AM", event: "IMPAIRED RECOGNITION", location: "pediatric_conference_room",
    beats: [
      { 
        text: "A pediatric case file shows recurrent infections. Dr. Rao: 'Patterns reveal weakness.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "RECURRENT INFECTION", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie writes: Primary (genetic) vs Secondary (acquired). Defect → Impaired recognition → Recurrent or unusually severe infections.", 
        diagram: [
          { type: 'node', x: 20, y: 40, label: "GENETIC DEFECT", shape: 'box' },
          { type: 'node', x: 50, y: 40, label: "FAIL RECOGNITION", shape: 'circle' },
          { type: 'node', x: 80, y: 40, label: "INFECTION", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 40}, to: {x: 45, y: 40} },
          { type: 'arrow', from: {x: 60, y: 40}, to: {x: 75, y: 40} }
        ] 
      },
      { 
        text: "Neil: 'This is like the Enterprise losing its command crew. The ship exists, but stops functioning properly.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "ENTERPRISE", shape: 'box' },
          { type: 'text', x: 50, y: 50, label: "NO COMMAND CREW" }
        ] 
      }
    ],
    q: "What is the primary clinical indicator that a patient may have an underlying immunodeficiency?", 
    opts: ["A single mild cold", "Recurrent, severe, or unusual infections", "Occasional fatigue", "Normal wound healing"], 
    ans: 1, 
    rationales: ["INCORRECT: Mild colds are common.", "CORRECT: Patterns of frequency, severity, and unusual organisms are the keys to identifying immunodeficiency.", "INCORRECT: Fatigue is non-specific.", "INCORRECT: Immunodeficiency often leads to poor recovery, not normal healing."]
  },
  { 
    act: "SCENE 10: SCID", day: "TUESDAY", time: "11:11 AM", event: "COMBINED FAILURE", location: "pediatric_immunology_unit",
    beats: [
      { 
        text: "Neonatal case: severe infections within months of life. Dr. Rao: 'Severe Combined Immunodeficiency.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SCID", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "NEONATAL ONSET" }
        ] 
      },
      { 
        text: "Alfie: Genetic mutation → Failure of T-cell maturation → Impaired cell-mediated and humoral (B-cell) immunity.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "GENETIC", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "NO T-CELLS", shape: 'box' },
          { type: 'node', x: 65, y: 50, label: "NO B-HELPER", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "TOTAL FAIL", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 60, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Running a chemistry lab without electricity.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "LAB", shape: 'box' },
          { type: 'text', x: 50, y: 50, label: "NO ELECTRICITY" }
        ] 
      }
    ],
    q: "Why is the term 'Combined' used in Severe Combined Immunodeficiency (SCID)?", 
    opts: ["It involves both lungs and heart", "It involves both T-cell and B-cell arms of immunity", "It is caused by both bacteria and viruses", "It affects both adults and children"], 
    ans: 1, 
    rationales: ["INCORRECT: SCID is a lymphocyte development failure, not a primary organ system disease.", "CORRECT: SCID involves a failure in T-cell maturation which also impairs B-cell antibody production.", "INCORRECT: It is a genetic failure, not defined by the infecting organism type.", "INCORRECT: SCID is a primary deficiency manifesting in infancy."]
  },
  { 
    act: "SCENE 11: HIV INFECTION", day: "TUESDAY", time: "01:08 PM", event: "VIRAL REPLICATION", location: "infectious_disease_clinic",
    beats: [
      { 
        text: "Weight loss, oral candidiasis, low CD4 count. Dr. Rao points to the value.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "CD4 COUNT LOW", shape: 'box' },
          { type: 'node', x: 50, y: 60, label: "CANDIDIASIS", shape: 'circle' }
        ] 
      },
      { 
        text: "Alfie writes the chain: HIV binds CD4 → Reverse transcription → Integration into genome → CD4 destruction → Impaired coordination.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "gp120", shape: 'circle' },
          { type: 'node', x: 30, y: 50, label: "RT", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "DNA", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "LYSIS", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "NO HELP", shape: 'box' },
          { type: 'arrow', from: {x: 15, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 65, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Breaking Bad. When the organizer collapses, the system stops functioning.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "ORGANIZER", shape: 'box' },
          { type: 'arrow', from: {x: 50, y: 38}, to: {x: 50, y: 52} },
          { type: 'text', x: 50, y: 60, label: "COLLAPSE" }
        ] 
      }
    ],
    q: "Which immune cell is specifically targeted and destroyed by the HIV virus?", 
    opts: ["Neutrophils", "CD4+ T lymphocytes", "Red blood cells", "Platelets"], 
    ans: 1, 
    rationales: ["INCORRECT: HIV does not primarily target neutrophils.", "CORRECT: HIV binds to and destroys CD4+ helper T-cells, which are essential for coordinating the immune response.", "INCORRECT: Red blood cells do not have CD4 receptors.", "INCORRECT: Platelets are involved in clotting."]
  },
  { 
    act: "SCENE 12: AIDS", day: "TUESDAY", time: "02:21 PM", event: "IMMUNE COLLAPSE", location: "infectious_disease_ward",
    beats: [
      { 
        text: "Class reviews a second chart: multiple opportunistic infections. Dr. Rao: 'This is the progression.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "OPPORTUNISTIC INFECTION", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie writes: Continued HIV replication → Severe CD4 depletion → Collapse of adaptive response → Advanced immune compromise (AIDS).", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "HIV REPL.", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "CD4 < 200", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "AIDS", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'The final season of a long TV series.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "FINAL SEASON", shape: 'box' }
        ] 
      }
    ],
    q: "What defines the progression from HIV infection to AIDS?", 
    opts: ["Persistent fever", "Severe depletion of CD4+ T-cells and presence of opportunistic infections", "Successful reverse transcription", "Initial viral entry"], 
    ans: 1, 
    rationales: ["INCORRECT: Fever occurs in early HIV as well.", "CORRECT: AIDS is defined by a critical drop in CD4 count or the presence of specific opportunistic infections due to immune collapse.", "INCORRECT: Reverse transcription is a step in the viral lifecycle, not a disease definition.", "INCORRECT: Viral entry is the start of infection."]
  },
  { 
    act: "SCENE 13: CANCER BEGINS", day: "WEDNESDAY", time: "08:03 AM", event: "REGULATION LOSS", location: "oncology_amphitheater",
    beats: [
      { 
        text: "Dr. Rao: 'Why do cells stop dividing?'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "CELL CYCLE", shape: 'circle' }
        ] 
      },
      { 
        text: "Alfie draws: DNA mutation → Oncogene activation → Failure of checkpoints → Uncontrolled proliferation.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "MUTATION", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "ONCOGENE", shape: 'circle' },
          { type: 'node', x: 60, y: 50, label: "CHECKPOINT FAIL", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "CANCER", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Office Space. When management stops enforcing rules, chaos spreads.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "OFFICE SPACE", shape: 'box' },
          { type: 'text', x: 50, y: 50, label: "NO MANAGEMENT = CHAOS" }
        ] 
      }
    ],
    q: "Cancer results from a failure in which fundamental cellular process?", 
    opts: ["ATP production", "Cell-cycle regulation and checkpoints", "Osmotic balance", "Protein folding in the Golgi"], 
    ans: 1, 
    rationales: ["INCORRECT: ATP depletion causes cell death, not cancer.", "CORRECT: Uncontrolled division occurs when the genetic 'management' and checkpoints of the cell cycle fail.", "INCORRECT: Osmotic balance prevents swelling/lysis.", "INCORRECT: Misfolding causes storage diseases or apoptosis."]
  },
  { 
    act: "SCENE 14: ALL", day: "WEDNESDAY", time: "09:21 AM", event: "MARROW OVERCROWDING", location: "hematopathology_lab",
    beats: [
      { 
        text: "Dr. Rao points to a dense field of immature cells. 'Acute lymphoblastic leukemia.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "BLAST", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "BLAST", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "BLAST", shape: 'circle' },
          { type: 'text', x: 50, y: 30, label: "IMMURE CELLS" }
        ] 
      },
      { 
        text: "Alfie writes: Lymphoid mutation → Lymphoblast proliferation → Marrow overcrowding → Decreased RBC/Platelet production.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "MUTATION", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "BLASTS++", shape: 'circle' },
          { type: 'node', x: 65, y: 50, label: "OVERCROWD", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "LOW RBC/PLT", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 60, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Napoleon Dynamite. Too many awkward characters in one place.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "NAPOLEON DYNAMITE", shape: 'box' }
        ] 
      }
    ],
    q: "Why does Acute Lymphoblastic Leukemia (ALL) lead to anemia and bleeding risk?", 
    opts: ["Direct destruction of mature RBCs", "Bone marrow overcrowding by malignant lymphoblasts", "Vitamin deficiency", "Liver failure"], 
    ans: 1, 
    rationales: ["INCORRECT: It is a production problem, not a destruction problem.", "CORRECT: The malignant proliferation of blasts chokes out the 'factory' space in the marrow, suppressing normal RBC and platelet production.", "INCORRECT: This is a malignant, not nutritional, process.", "INCORRECT: Anemia in ALL is marrow-driven."]
  },
  { 
    act: "SCENE 15: CLL", day: "WEDNESDAY", time: "10:38 AM", event: "MATURE CLONES", location: "hematology_reading_room",
    beats: [
      { 
        text: "Dr. Rao contrast the leukemias. Belinda: 'Older patient. Elevated lymphocyte count.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "MATURE B-CELLS++", shape: 'box' },
          { type: 'text', x: 50, y: 50, label: "CHRONIC PROGRESSION" }
        ] 
      },
      { 
        text: "Alfie: Clonal proliferation of mature B lymphocytes → Slower progression.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "MATURE CLONE", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} },
          { type: 'node', x: 80, y: 50, label: "SLOW GROW", shape: 'box' }
        ] 
      }
    ],
    q: "What is the key cellular difference between Acute (ALL) and Chronic (CLL) leukemia?", 
    opts: ["Cell color", "Maturity of the malignant cells (Blasts vs Mature lymphocytes)", "Presence of hemoglobin", "Speed of ATP production"], 
    ans: 1, 
    rationales: ["INCORRECT: Color is not the defining pathological trait.", "CORRECT: Acute leukemias involve immature blasts; chronic leukemias involve the accumulation of more mature lymphocytes.", "INCORRECT: Hemoglobin is found in RBCs, not the malignant WBCs.", "INCORRECT: Metabolic speed is not the primary diagnostic differentiator."]
  },
  { 
    act: "SCENE 16: HODGKIN LYMPHOMA", day: "WEDNESDAY", time: "11:52 AM", event: "THE RS HALLMARK", location: "pathology_teaching_suite",
    beats: [
      { 
        text: "Dr. Rao: 'Identify the hallmark.' Adrian: 'Reed-Sternberg cell.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "RS CELL", shape: 'circle' },
          { type: 'text', x: 50, y: 70, label: "OWL-EYE APPEARANCE" }
        ] 
      },
      { 
        text: "Alfie: Malignant transformation → RS cells → Cytokine signaling → Inflammatory cell recruitment.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "RS CELL", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "SIGNALING", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "RECRUITMENT", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 65, y: 50}, to: {x: 75, y: 50} }
        ] 
      }
    ],
    q: "The presence of which cell is pathognomonic for Hodgkin Lymphoma?", 
    opts: ["Auer Rods", "Foam Cells", "Reed-Sternberg Cells", "Blast Cells"], 
    ans: 2, 
    rationales: ["INCORRECT: Auer rods are seen in AML.", "INCORRECT: Foam cells are seen in atherosclerosis.", "CORRECT: Reed-Sternberg cells ('owl-eye' cells) are the diagnostic hallmark of Hodgkin Lymphoma.", "INCORRECT: Blasts are seen in acute leukemias."]
  },
  { 
    act: "SCENE 17: NON-HODGKIN LYMPHOMA", day: "WEDNESDAY", time: "01:07 PM", event: "LYMPHOID DIVERSITY", location: "pathology_consultation_room",
    beats: [
      { 
        text: "Dr. Rao: 'Contrast it with Hodgkin.' Alfie: Mutation → B or T cell proliferation → Lymph node enlargement.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "B/T CELL", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} },
          { type: 'node', x: 80, y: 50, label: "NODE++", shape: 'box' }
        ] 
      },
      { 
        text: "Adrian: 'Key difference is no Reed-Sternberg cells.'", 
        speaker: 'adrian',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "NO RS CELLS", shape: 'box' }
        ] 
      }
    ],
    q: "What is the primary pathological distinction of Non-Hodgkin Lymphoma compared to Hodgkin Lymphoma?", 
    opts: ["Higher fever", "Absence of Reed-Sternberg cells", "Faster growth", "Presence of viruses"], 
    ans: 1, 
    rationales: ["INCORRECT: Fever is common to both.", "CORRECT: Non-Hodgkin Lymphoma is characterized by the absence of diagnostic Reed-Sternberg cells.", "INCORRECT: Growth speed varies by subtype.", "INCORRECT: Some are viral-linked, but it is not the defining pathological distinction."]
  },
  { 
    act: "SCENE 18: ANEMIA", day: "WEDNESDAY", time: "02:02 PM", event: "HYPOXIA PRINCIPLE", location: "hematology_teaching_room",
    beats: [
      { 
        text: "Hemoglobin: low. Dr. Rao: 'Explain the mechanism.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "LOW Hb", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Reduced RBCs → Decreased O2 delivery → Compensatory tachycardia → Fatigue, pallor.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "LOW RBC", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "LOW O2", shape: 'circle' },
          { type: 'node', x: 60, y: 50, label: "HEART SPEED", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "FATIGUE", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      }
    ],
    q: "Anemia results in clinical symptoms like fatigue and pallor due to which mechanism?", 
    opts: ["Increased blood pressure", "Tissue hypoxia from reduced oxygen-carrying capacity", "Vitamin C toxicity", "Reduced white cell count"], 
    ans: 1, 
    rationales: ["INCORRECT: Anemia often involves lower volume/pressure potential.", "CORRECT: Low hemoglobin means less oxygen reaches the tissues, causing hypoxia and compensatory fatigue.", "INCORRECT: Vitamin C deficiency causes scurvy, not iron-linked anemia.", "INCORRECT: Anemia specifically refers to red cell/hemoglobin deficits."]
  },
  { 
    act: "SCENE 19: IRON DEFICIENCY ANEMIA", day: "WEDNESDAY", time: "03:06 PM", event: "MICROCYTIC PATTERN", location: "clinical_lab_review",
    beats: [
      { 
        text: "Microscope slide: pale red blood cells. Dr. Rao: 'Iron deficiency.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "PALE RBC", shape: 'circle' },
          { type: 'text', x: 50, y: 70, label: "HYPOCHROMIC" }
        ] 
      },
      { 
        text: "Alfie writes: Insufficient iron → Reduced hemoglobin synthesis → Microcytic hypochromic RBCs.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "NO IRON", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "NO Hb SYNTH", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "SMALL RBC", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 40, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ] 
      }
    ],
    q: "What is the characteristic appearance of red blood cells in iron deficiency anemia?", 
    opts: ["Large and purple", "Small and pale (Microcytic/Hypochromic)", "Sickle-shaped", "Multinucleated"], 
    ans: 1, 
    rationales: ["INCORRECT: Large cells are macrocytic (B12/Folate deficiency).", "CORRECT: Iron deficiency leads to small (microcytic) and pale (hypochromic) RBCs due to failed hemoglobin synthesis.", "INCORRECT: Sickle shape is genetic (HbS).", "INCORRECT: RBCs are normally anucleated."]
  },
  { 
    act: "SCENE 20: SICKLE CELL DISEASE", day: "THURSDAY", time: "08:04 AM", event: "VASO-OCCLUSION", location: "hematology_ward",
    beats: [
      { 
        text: "Morning rounds. Belinda: 'Severe pain. Abnormal RBCs.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SICKLE RBC", shape: 'circle' },
          { type: 'text', x: 50, y: 70, label: "CRESCENT SHAPE" }
        ] 
      },
      { 
        text: "Alfie: Beta-globin mutation → HbS → Polymerization under low O2 → Sickle shape → Vascular obstruction → Pain crisis.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "MUTATION", shape: 'circle' },
          { type: 'node', x: 30, y: 50, label: "HbS", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "POLYMER", shape: 'circle' },
          { type: 'node', x: 75, y: 50, label: "CLOG", shape: 'box' },
          { type: 'node', x: 95, y: 50, label: "PAIN", shape: 'box' },
          { type: 'arrow', from: {x: 15, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 70, y: 50} },
          { type: 'arrow', from: {x: 85, y: 50}, to: {x: 90, y: 50} }
        ] 
      }
    ],
    q: "In Sickle Cell Disease, what is the underlying cause of a painful 'crisis'?", 
    opts: ["Iron overload", "Obstruction of microvasculature by sickled RBCs", "Bacterial infection", "High blood pressure"], 
    ans: 1, 
    rationales: ["INCORRECT: Iron overload is a complication of transfusions.", "CORRECT: Distortion of RBCs into sickle shapes leads to vascular blockage (vaso-occlusion), causing tissue ischemia and extreme pain.", "INCORRECT: Infection can trigger a crisis, but the blockage is the mechanical cause of the pain.", "INCORRECT: BP is not the primary driver here."]
  },
  { 
    act: "SCENE 21: Rh INCOMPATIBILITY", day: "THURSDAY", time: "09:16 AM", event: "SECOND PREGNANCY RISK", location: "obstetrics_consultation",
    beats: [
      { 
        text: "Belinda: 'Mother Rh-negative. Fetus Rh-positive.'", 
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "MOTHER Rh-", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "FETUS Rh+", shape: 'circle' }
        ] 
      },
      { 
        text: "Alfie: First pregnancy sensitizes mother → Second pregnancy antibodies cross placenta → Fetal RBC hemolysis.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "1ST: SENSITIZE", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "2ND: Ab CROSS", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "HEMOLYSIS", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 65, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Security system that learns the wrong target.' Marty Pickles: 'Antibodies remember.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "MEMORY", shape: 'box' },
          { type: 'text', x: 50, y: 50, label: "WRONG TARGET" }
        ] 
      }
    ],
    q: "Why does Rh incompatibility typically affect the second pregnancy rather than the first?", 
    opts: ["The first fetus is always Rh-negative", "The mother's immune system needs the first exposure to develop anti-Rh antibodies", "The second fetus is larger", "Antibodies cannot cross the placenta in the first pregnancy"], 
    ans: 1, 
    rationales: ["INCORRECT: The first fetus can be Rh-positive.", "CORRECT: The mother's immune system is sensitized during the first birth; the resulting memory antibodies then target the second Rh-positive fetus.", "INCORRECT: Fetal size is irrelevant.", "INCORRECT: Antibodies can cross, but they haven't been created yet."]
  },
  { 
    act: "SCENE 22: INFECTIOUS MONONUCLEOSIS", day: "THURSDAY", time: "10:32 AM", event: "REACTIVE LYMPHOCYTES", location: "infectious_disease_ward",
    beats: [
      { 
        text: "Fever, sore throat, enlarged nodes. Dr. Rao: 'EBV.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "EBV", shape: 'circle' }
        ] 
      },
      { 
        text: "Alfie: EBV infection of B cells → Cytotoxic T cell activation → Proliferation of reactive lymphocytes.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "EBV", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "B-CELLS", shape: 'circle' },
          { type: 'node', x: 65, y: 50, label: "REACTIVE T", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "NODE++", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 28, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 60, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      }
    ],
    q: "Infectious mononucleosis (EBV) is characterized by the proliferation of which cells?", 
    opts: ["Auer rods", "Reactive (atypical) T-lymphocytes", "Foam cells", "Reed-Sternberg cells"], 
    ans: 1, 
    rationales: ["INCORRECT: Auer rods are AML.", "CORRECT: EBV infects B-cells, but the characteristic blood finding is the vigorous response of reactive (atypical) T-lymphocytes.", "INCORRECT: Foam cells are atherosclerosis.", "INCORRECT: RS cells are Hodgkin Lymphoma."]
  },
  { 
    act: "SCENE 23: MENINGITIS", day: "THURSDAY", time: "11:41 AM", event: "INTRACRANIAL PRESSURE", location: "emergency_case_conference",
    beats: [
      { 
        text: "Simulated emergency. Fever, neck stiffness. Dr. Rao: 'Meningitis.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "MENINGES", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "STIFF NECK" }
        ] 
      },
      { 
        text: "Alfie: Bacterial infection → Inflammatory response in CSF → Increased intracranial pressure → Brain injury.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "BACTERIA", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "CSF INFLAM.", shape: 'box' },
          { type: 'node', x: 65, y: 50, label: "PRESSURE++", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "BRAIN DMG", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 60, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      }
    ],
    q: "What is the primary life-threatening mechanical complication of bacterial meningitis?", 
    opts: ["Low blood sugar", "Increased intracranial pressure", "Reduced heart rate", "Metaplasia"], 
    ans: 1, 
    rationales: ["INCORRECT: Glucose might drop in CSF, but it's not the primary mechanical threat.", "CORRECT: Inflammation in the confined space of the skull causes a rapid increase in intracranial pressure, which can damage the brain.", "INCORRECT: Heart rate might change as a late sign, but pressure is the driver.", "INCORRECT: Metaplasia is a chronic adaptation."]
  },
  { 
    act: "SCENE 24: PRIMARY HEMOSTASIS", day: "THURSDAY", time: "01:08 PM", event: "PLATELET PLUG", location: "hemostasis_lab",
    beats: [
      { 
        text: "Damaged vessel diagram. Alfie: Injury → vWF binding → Platelet adhesion → Activation → Aggregation → Platelet plug.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "INJURY", shape: 'box' },
          { type: 'node', x: 30, y: 50, label: "vWF", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "ADHESION", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "AGGREGATE", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "PLUG", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 65, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Basic engineering. You reinforce a damaged structure before rebuilding it.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "ENGINEERING", shape: 'box' }
        ] 
      }
    ],
    q: "What is the end-product of Primary Hemostasis?", 
    opts: ["Stable fibrin clot", "Platelet plug", "Factor X activation", "RBC lysis"], 
    ans: 1, 
    rationales: ["INCORRECT: A stable fibrin clot is the end of secondary hemostasis.", "CORRECT: Primary hemostasis results in the formation of a temporary platelet plug to seal the vessel.", "INCORRECT: Factor X is part of the secondary cascade.", "INCORRECT: RBC lysis is a pathological event."]
  },
  { 
    act: "SCENE 25: ALFIE’S EVENING", day: "THURSDAY", time: "06:41 PM", event: "VIRCHOW'S REFLECTION", location: "home",
    beats: [
      { 
        text: "Alfie opens his notebook. Virchow’s triad: Endothelial injury, Stasis, Hypercoagulability → Thrombus.", 
        diagram: [
          { type: 'node', x: 20, y: 30, label: "INJURY", shape: 'circle' },
          { type: 'node', x: 50, y: 30, label: "STASIS", shape: 'circle' },
          { type: 'node', x: 80, y: 30, label: "HYPER-COAG", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 30}, to: {x: 45, y: 30} },
          { type: 'arrow', from: {x: 65, y: 30}, to: {x: 75, y: 30} },
          { type: 'node', x: 50, y: 60, label: "THROMBUS", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: 'So a clot doesn't just appear.' He taps his pen: Vessel injury → Platelet activation → Clot → Embolization.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "INJURY", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "CLOT", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "EMBOLUS", shape: 'box' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 40, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ] 
      }
    ],
    q: "Which three factors constitute 'Virchow's Triad'?", 
    opts: ["Fever, Pallor, Pain", "Stasis, Endothelial Injury, Hypercoagulability", "Anemia, Leukemia, Lymphoma", "IgE, IgG, IgM"], 
    ans: 1, 
    rationales: ["INCORRECT: These are symptoms, not mechanical factors.", "CORRECT: The triad identifies the conditions required for thrombus formation: stasis, injury, and a hypercoagulable state.", "INCORRECT: These are hematological diseases.", "INCORRECT: These are antibodies."]
  },
  { 
    act: "SCENE 26: BELINDA’S NIGHT ROUTINE", day: "THURSDAY", time: "07:36 PM", event: "SECONDARY HEMOSTASIS", location: "home",
    beats: [
      { 
        text: "Belinda maps the coagulation review. Intrinsic (XII) and Extrinsic (VII) → Factor X → Thrombin → Fibrin.", 
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 10, y: 30, label: "XII", shape: 'circle' },
          { type: 'node', x: 30, y: 30, label: "VII", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "FACTOR X", shape: 'box' },
          { type: 'node', x: 70, y: 50, label: "THROMBIN", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "FIBRIN", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 35}, to: {x: 45, y: 48} },
          { type: 'arrow', from: {x: 32, y: 35}, to: {x: 48, y: 48} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 65, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Belinda: 'So the plug forms first, then fibrin locks it in place.'", 
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 30, y: 50, label: "PLUG", shape: 'box' },
          { type: 'node', x: 70, y: 50, label: "FIBRIN MESH", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 55, y: 50} }
        ] 
      }
    ],
    q: "What is the primary role of Fibrin in the coagulation process?", 
    opts: ["To attract platelets", "To stabilize and reinforce the initial platelet plug", "To cause vasodilation", "To digest the clot"], 
    ans: 1, 
    rationales: ["INCORRECT: vWF attracts/anchors platelets.", "CORRECT: Fibrin (the end product of the coagulation cascade) creates a mesh that stabilizes the temporary plug into a permanent clot.", "INCORRECT: Fibrin is not a vasodilator.", "INCORRECT: Plasmin digests the clot."]
  },
  { 
    act: "SCENE 27: ADRIAN’S WALK HOME", day: "THURSDAY", time: "08:12 PM", event: "CLOT MIGRATION", location: "atrium",
    beats: [
      { 
        text: "Adrian rewrites the mechanism: Virchow’s triad → DVT → Clot propagation → Embolus traveling → Pulmonary artery obstruction.", 
        speaker: 'adrian',
        diagram: [
          { type: 'node', x: 10, y: 50, label: "TRIAD", shape: 'circle' },
          { type: 'node', x: 30, y: 50, label: "DVT", shape: 'box' },
          { type: 'node', x: 50, y: 50, label: "EMBOLUS", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "TRAVEL", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "PE", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 65, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Adrian: 'The danger isn't the clot staying in the leg. It’s when it moves.'", 
        speaker: 'adrian',
        diagram: [
          { type: 'text', x: 50, y: 30, label: "MIGRATION = DANGER" }
        ] 
      }
    ],
    q: "What is the term for a thrombus that detaches and travels through the circulation?", 
    opts: ["Pannus", "Embolus", "Foam cell", "Reed-Sternberg cell"], 
    ans: 1, 
    rationales: ["INCORRECT: Pannus is joint tissue.", "CORRECT: An embolus is a detached, traveling mass (usually a clot) that can obstruct distant vessels.", "INCORRECT: Foam cells are lipid-laden macrophages.", "INCORRECT: RS cells are lymphoma cells."]
  },
  { 
    act: "SCENE 28: DR. RAO’S LATE ERRAND", day: "THURSDAY", time: "09:18 PM", event: "LUNG OBSTRUCTION", location: "market",
    beats: [
      { 
        text: "Dr. Rao sketches the chain on a receipt: DVT → Vena cava → Right heart → Pulmonary artery obstruction → Impaired O2 exchange.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 10, y: 50, label: "DVT", shape: 'box' },
          { type: 'node', x: 30, y: 50, label: "V. CAVA", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "R. HEART", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "P. ARTERY", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "O2 FAIL", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 65, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Dr. Rao: 'A migrating clot blocks blood flow through the lungs.'", 
        speaker: 'rao',
        diagram: [
          { type: 'text', x: 50, y: 30, label: "PULMONARY EMBOLISM" }
        ] 
      }
    ],
    q: "What is the ultimate consequence of a pulmonary embolism?", 
    opts: ["Leg swelling", "Impaired oxygen exchange due to lung vessel obstruction", "Increased white cell count", "High blood sugar"], 
    ans: 1, 
    rationales: ["INCORRECT: Leg swelling is a sign of the DVT itself.", "CORRECT: A pulmonary embolism blocks blood flow to the lungs, preventing proper oxygenation of the blood.", "INCORRECT: PE is a mechanical/circulatory issue.", "INCORRECT: Glucose is not primarily affected by PE."]
  },
  { 
    act: "SCENE 29: TACO CART", day: "THURSDAY", time: "10:44 PM", event: "ORGANIZED SEQUENCES", location: "atrium",
    beats: [
      { 
        text: "Neil at a taco cart: 'It’s the same principle as thrombosis. Everything works because the sequence stays organized.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 20, y: 50, label: "ORDER TACO", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "PREP TACO", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "EAT TACO", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 50}, to: {x: 40, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 70, y: 50} }
        ] 
      },
      { 
        text: "Marty Pickles steps out from the NBME building with a textbook and a plumbing kit. Neil: 'Marty? What are you doing here?'", 
        speaker: 'marty',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "MARTY: PLUMBING", shape: 'box' }
        ] 
      },
      { 
        text: "Marty: 'Just helping with something.'", 
        speaker: 'marty',
        diagram: [
          { type: 'text', x: 50, y: 50, label: "SEQUENCE MATTERS" }
        ] 
      }
    ],
    q: "Based on Neil's analogy, why is medical sequence critical in thrombosis?", 
    opts: ["It determines the flavor of the clot", "The failure of one step (like DVT) leads to the next (like PE)", "It increases the number of platelets", "It prevents all future infections"], 
    ans: 1, 
    rationales: ["INCORRECT: Clots do not have flavor.", "CORRECT: Pathology follows a sequence where one event (thrombus) can lead to a complication (embolus).", "INCORRECT: Sequence describes flow, not count.", "INCORRECT: Thrombosis is unrelated to primary infection prevention."]
  },
  { 
    act: "SCENE 30: PRIMARY HEMOSTASIS", day: "FRIDAY", time: "08:03 AM", event: "INITIAL SEAL", location: "atrium",
    beats: [
      { 
        text: "Construction worker with a shallow cut. Dr. Rao: 'Explain why that stops bleeding.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SHALLOW CUT", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Vessel injury → Platelet adhesion (vWF) → Activation → Aggregation → Plug.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "vWF", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "ADHESION", shape: 'circle' },
          { type: 'node', x: 65, y: 50, label: "AGGREGATE", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "PLUG", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 60, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Pottery. You shape the clay first. Structure comes before reinforcement.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "POTTERY: CLAY", shape: 'box' }
        ] 
      }
    ],
    q: "Which factor acts as the 'bridge' allowing platelets to adhere to exposed collagen?", 
    opts: ["Thrombin", "von Willebrand Factor (vWF)", "Factor X", "Fibrinogen"], 
    ans: 1, 
    rationales: ["INCORRECT: Thrombin is an enzyme that creates fibrin.", "CORRECT: vWF binds to exposed subendothelial collagen and provides the anchor for platelet adhesion.", "INCORRECT: Factor X starts the common pathway.", "INCORRECT: Fibrinogen is converted into fibrin."]
  },
  { 
    act: "SCENE 31: SECONDARY HEMOSTASIS", day: "FRIDAY", time: "09:11 AM", event: "FIBRIN LOCK", location: "conference_room",
    beats: [
      { 
        text: "Dr. Rao writes: COAGULATION CASCADE. Alfie: Intrinsic/Extrinsic → Factor X → Thrombin → Fibrin.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 40, label: "CASCADE", shape: 'box' },
          { type: 'node', x: 50, y: 40, label: "THROMBIN", shape: 'circle' },
          { type: 'node', x: 80, y: 40, label: "FIBRIN", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 40}, to: {x: 45, y: 40} },
          { type: 'arrow', from: {x: 60, y: 40}, to: {x: 75, y: 40} }
        ] 
      },
      { 
        text: "Belinda: 'Platelets start the plug, but fibrin locks it in place.'", 
        speaker: 'belinda',
        diagram: [
          { type: 'node', x: 30, y: 60, label: "PLATELET PLUG", shape: 'box' },
          { type: 'node', x: 70, y: 60, label: "FIBRIN LOCK", shape: 'box' },
          { type: 'arrow', from: {x: 45, y: 60}, to: {x: 55, y: 60} }
        ] 
      },
      { 
        text: "Neil: 'Primary hemostasis is building the scaffolding. Secondary hemostasis pours the concrete.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "SCAFFOLD vs CONCRETE", shape: 'box' }
        ] 
      }
    ],
    q: "What is the mechanical relationship between primary and secondary hemostasis?", 
    opts: ["They are unrelated", "Secondary hemostasis (fibrin) reinforces the primary plug", "Primary hemostasis happens after the fibrin clot", "They both destroy platelets"], 
    ans: 1, 
    rationales: ["INCORRECT: They are closely linked steps of the same process.", "CORRECT: Primary hemostasis creates the temporary seal; secondary hemostasis provides the permanent reinforcement.", "INCORRECT: Primary happens first.", "INCORRECT: They use/protect platelets."]
  },
  { 
    act: "SCENE 32: PT VS aPTT", day: "FRIDAY", time: "10:07 AM", event: "PATHWAY TESTS", location: "hematology_lab",
    beats: [
      { 
        text: "PT: prolonged. aPTT: normal. Dr. Rao: 'Interpretation begins with pathways.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 30, y: 30, label: "PT (EXTRINSIC)", shape: 'box' },
          { type: 'node', x: 70, y: 30, label: "aPTT (INTRINSIC)", shape: 'box' },
          { type: 'text', x: 30, y: 50, label: "PROLONGED" },
          { type: 'text', x: 70, y: 50, label: "NORMAL" }
        ] 
      },
      { 
        text: "Neil: 'Like Star Trek movies. Odd-numbered films are terrible. If the odd pathway fails, you know exactly which side collapsed.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "ODD vs EVEN", shape: 'box' }
        ] 
      }
    ],
    q: "If a patient has a prolonged PT but a normal aPTT, which pathway is likely affected?", 
    opts: ["Intrinsic", "Extrinsic", "Common", "Fibrinolytic"], 
    ans: 1, 
    rationales: ["INCORRECT: Intrinsic is measured by aPTT.", "CORRECT: PT (Prothrombin Time) specifically measures the extrinsic and common pathways.", "INCORRECT: Common pathway defects would prolong both.", "INCORRECT: Fibrinolytic pathway breaks clots down."]
  },
  { 
    act: "SCENE 33: HEMOPHILIA", day: "FRIDAY", time: "11:18 AM", event: "FACTOR VIII DEFICIT", location: "atrium",
    beats: [
      { 
        text: "Patient chart: Factor VIII deficiency. Dr. Rao: 'Hemophilia.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "FACTOR VIII DOWN", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Factor VIII deficit → Intrinsic disruption → Reduced thrombin → Unstable clot → Prolonged bleeding.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "NO VIII", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "NO THROMBIN", shape: 'circle' },
          { type: 'node', x: 65, y: 50, label: "NO FIBRIN", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "BLEEDING", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 60, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      }
    ],
    q: "Which pathway is disrupted in Hemophilia A (Factor VIII deficiency)?", 
    opts: ["Extrinsic", "Intrinsic", "Platelet activation", "Complement"], 
    ans: 1, 
    rationales: ["INCORRECT: Extrinsic is Factor VII.", "CORRECT: Hemophilia A is a deficiency of Factor VIII, a key component of the intrinsic coagulation cascade.", "INCORRECT: Platelets are usually normal in hemophilia.", "INCORRECT: Complement is for immunity."]
  },
  { 
    act: "SCENE 34: THROMBOCYTOPENIA", day: "FRIDAY", time: "12:06 PM", event: "PETECHIAE MECHANISM", location: "internal_medicine_ward",
    beats: [
      { 
        text: "Patient with petechiae. Dr. Rao: 'Explain the mechanism.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "PETECHIAE", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "PINPOINT BLEED" }
        ] 
      },
      { 
        text: "Alfie: Low platelet count → Impaired plug formation → Fragile capillary bleeding.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "LOW PLT", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "NO PLUG", shape: 'box' },
          { type: 'node', x: 80, y: 50, label: "LEAK", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ] 
      }
    ],
    q: "Why do patients with thrombocytopenia develop petechiae (small red spots on skin)?", 
    opts: ["Failed fibrin cross-linking", "Inability to form a primary platelet plug to seal capillaries", "Overactive T-cells", "Vitamin C toxicity"], 
    ans: 1, 
    rationales: ["INCORRECT: This is a secondary hemostasis issue.", "CORRECT: Without sufficient platelets, minor capillary leaks aren't sealed, leading to pinpoint bleeding (petechiae).", "INCORRECT: T-cells are unrelated to clotting.", "INCORRECT: Vitamin C deficiency (not toxicity) causes bleeding."]
  },
  { 
    act: "SCENE 35: VIRCHOW’S TRIAD", day: "FRIDAY", time: "01:14 PM", event: "THROMBOSIS CONDITIONS", location: "conference_room",
    beats: [
      { 
        text: "Dr. Rao: STASIS, ENDOTHELIAL INJURY, HYPERCOAGULABILITY. Alfie: Endothelial injury + Stasis + Hypercoagulability → Thrombus.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 20, y: 30, label: "STASIS", shape: 'circle' },
          { type: 'node', x: 50, y: 30, label: "INJURY", shape: 'circle' },
          { type: 'node', x: 80, y: 30, label: "HYPER-COAG", shape: 'circle' },
          { type: 'arrow', from: {x: 30, y: 35}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 50, y: 38}, to: {x: 50, y: 50} },
          { type: 'arrow', from: {x: 70, y: 35}, to: {x: 55, y: 50} },
          { type: 'node', x: 50, y: 60, label: "THROMBUS", shape: 'box' }
        ] 
      }
    ],
    q: "According to Virchow's Triad, which of the following increases the risk of thrombus formation?", 
    opts: ["Normal blood flow", "Venous stasis (abnormal flow)", "Exercise", "High fluid intake"], 
    ans: 1, 
    rationales: ["INCORRECT: Normal flow prevents clots.", "CORRECT: Stasis (immobility) is one of the three core conditions that allow blood to clot pathologically in vessels.", "INCORRECT: Exercise improves flow.", "INCORRECT: Hydration reduces hypercoagulability risk."]
  },
  { 
    act: "SCENE 36: DVT", day: "FRIDAY", time: "02:02 PM", event: "LOCAL CLOT", location: "atrium",
    beats: [
      { 
        text: "Patient with swollen calf after a long flight. Dr. Rao: 'Apply Virchow's triad.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SWOLLEN CALF", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "STASIS (FLIGHT)" }
        ] 
      },
      { 
        text: "Alfie: Prolonged immobility → Venous stasis → Platelet activation → Thrombus in deep veins.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "STASIS", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "ACTIVATION", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "DVT", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ] 
      }
    ],
    q: "What is the primary driver of deep vein thrombosis (DVT) in a patient following a long airplane flight?", 
    opts: ["Endothelial injury", "Venous stasis", "Hypercoagulability", "Low altitude"], 
    ans: 1, 
    rationales: ["INCORRECT: While possible, stasis is the dominant factor here.", "CORRECT: Prolonged immobility during travel causes venous stasis, a key pillar of Virchow's triad.", "INCORRECT: Stasis is the primary cause in this clinical scenario.", "INCORRECT: Altitude is not a primary driver of DVT."]
  },
  { 
    act: "SCENE 37: PULMONARY EMBOLISM", day: "FRIDAY", time: "02:48 PM", event: "DETACHMENT", location: "emergency_room",
    beats: [
      { 
        text: "Simulation: patient short of breath.", 
        diagram: [
          { type: 'node', x: 50, y: 50, label: "SHORT BREATH", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "SIMULATION ROOM" }
        ] 
      },
      { 
        text: "Alfie: DVT → Thrombus detaches → Embolus travels through heart → Pulmonary artery obstruction.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "DVT", shape: 'box' },
          { type: 'node', x: 30, y: 50, label: "DETACH", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "HEART", shape: 'circle' },
          { type: 'node', x: 70, y: 50, label: "LUNG", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "CLOG", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 55, y: 50}, to: {x: 65, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Like an object drifting through space until it hits a starship engine.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "DRIFTING OBJECT", shape: 'box' }
        ] 
      }
    ],
    q: "Where does a pulmonary embolus typically originate?", 
    opts: ["The lungs", "The right heart", "Deep veins of the lower extremities (DVT)", "The left ventricle"], 
    ans: 2, 
    rationales: ["INCORRECT: The embolus travels TO the lungs.", "INCORRECT: It passes THROUGH the right heart.", "CORRECT: Most PEs result from a clot detaching from the deep veins of the legs (DVT).", "INCORRECT: Left ventricle clots go to the systemic circulation (brain/body)."]
  },
  { 
    act: "SCENE 38: HEART FAILURE", day: "FRIDAY", time: "03:33 PM", event: "RIGHT VS LEFT", location: "internal_medicine_ward",
    beats: [
      { 
        text: "Dr. Rao: LEFT VS RIGHT.", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 30, y: 30, label: "LEFT HEART", shape: 'box' },
          { type: 'node', x: 70, y: 30, label: "RIGHT HEART", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Left failure → Pulmonary backup → Shortness of breath.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "L-FAIL", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} },
          { type: 'node', x: 80, y: 50, label: "LUNGS", shape: 'box' },
          { type: 'text', x: 50, y: 40, label: "BACKUP" }
        ] 
      },
      { 
        text: "Alfie: Right failure → Systemic backup → JVD/Edema.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "R-FAIL", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} },
          { type: 'node', x: 80, y: 50, label: "BODY/VEINS", shape: 'box' },
          { type: 'text', x: 50, y: 40, label: "BACKUP" }
        ] 
      },
      { 
        text: "Neil: 'Left side floods the lungs. Right side floods the body.'", 
        speaker: 'neil',
        diagram: [
          { type: 'text', x: 50, y: 30, label: "FLOODING PATTERNS" }
        ] 
      }
    ],
    q: "What is a characteristic clinical sign of Right Heart Failure?", 
    opts: ["Pulmonary crackles", "Jugular Venous Distension (JVD) and peripheral edema", "Cough", "High oxygen saturation"], 
    ans: 1, 
    rationales: ["INCORRECT: Crackles are a sign of left heart backup into lungs.", "CORRECT: Right heart failure causes blood to back up into the systemic veins, leading to JVD and swelling.", "INCORRECT: Cough is a pulmonary (left) symptom.", "INCORRECT: Oxygen saturation often drops in failure."]
  },
  { 
    act: "SCENE 39: COR PULMONALE", day: "FRIDAY", time: "04:08 PM", event: "LUNG-HEART LINK", location: "atrium",
    beats: [
      { 
        text: "Dr. Rao: 'Explain cor pulmonale.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "COR PULMONALE", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Chronic lung disease → Pulmonary hypertension → Right ventricle overworks → Right heart failure.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "LUNG DIS.", shape: 'box' },
          { type: 'node', x: 35, y: 50, label: "P-HYPERTEN", shape: 'box' },
          { type: 'node', x: 65, y: 50, label: "RV WORK++", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "R-FAIL", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 60, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Like running a pump against a blocked pipe.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "PUMP vs PIPE", shape: 'box' }
        ] 
      }
    ],
    q: "What is 'Cor Pulmonale'?", 
    opts: ["Primary heart disease", "Right heart failure caused by chronic lung disease", "A type of lung cancer", "Left heart failure"], 
    ans: 1, 
    rationales: ["INCORRECT: It is secondary to lung pathology.", "CORRECT: Cor pulmonale is right-sided heart hypertrophy or failure resulting from chronic lung disease and pulmonary hypertension.", "INCORRECT: It is a heart failure condition.", "INCORRECT: It specifically involves the right side."]
  },
  { 
    act: "SCENE 40: ACUTE BLOOD LOSS", day: "FRIDAY", time: "04:52 PM", event: "HEMORRHAGE", location: "emergency_room",
    beats: [
      { 
        text: "Trauma bay: deep laceration. Dr. Rao: 'Why tachycardia?'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "BLOOD LOSS", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Acute hemorrhage → Decreased volume → Decreased O2 delivery → Sympathetic activation → Tachycardia.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "BLEED", shape: 'circle' },
          { type: 'node', x: 30, y: 50, label: "VOL DOWN", shape: 'box' },
          { type: 'node', x: 50, y: 50, label: "O2 DOWN", shape: 'box' },
          { type: 'node', x: 70, y: 50, label: "SYMPATH.", shape: 'circle' },
          { type: 'node', x: 90, y: 50, label: "TACHY", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 38, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 65, y: 50} },
          { type: 'arrow', from: {x: 78, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Concert losing power mid-song. You don’t notice the system until it drops.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "POWER DROP", shape: 'box' }
        ] 
      }
    ],
    q: "How does the body immediately compensate for acute blood loss?", 
    opts: ["Decreasing heart rate", "Sympathetic activation leading to tachycardia and vasoconstriction", "Increasing iron absorption", "Stopping all cell division"], 
    ans: 1, 
    rationales: ["INCORRECT: The heart rate must increase to maintain perfusion.", "CORRECT: The body responds to volume loss with a sympathetic 'fight or flight' surge to maintain blood pressure and oxygenation.", "INCORRECT: Iron absorption is a slow, chronic process.", "INCORRECT: Cell division is not an immediate compensation."]
  },
  { 
    act: "SCENE 41: ITP", day: "FRIDAY", time: "05:37 PM", event: "POST-VIRAL BRUISING", location: "atrium",
    beats: [
      { 
        text: "Child with petechiae after viral illness. Dr. Rao: 'And now?'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "POST-VIRAL", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Post-viral dysregulation → Autoantibodies against platelets → Splenic clearance → Thrombocytopenia.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "VIRUS", shape: 'circle' },
          { type: 'node', x: 35, y: 50, label: "AUTO-Ab", shape: 'circle' },
          { type: 'node', x: 65, y: 50, label: "SPLEEN", shape: 'box' },
          { type: 'node', x: 90, y: 50, label: "LOW PLT", shape: 'box' },
          { type: 'arrow', from: {x: 20, y: 50}, to: {x: 30, y: 50} },
          { type: 'arrow', from: {x: 45, y: 50}, to: {x: 60, y: 50} },
          { type: 'arrow', from: {x: 75, y: 50}, to: {x: 85, y: 50} }
        ] 
      },
      { 
        text: "Marty Pickles: 'Wrong target. Same consequence.'", 
        speaker: 'marty',
        diagram: [
          { type: 'text', x: 50, y: 30, label: "IMPROPER TARGETING" }
        ] 
      }
    ],
    q: "In Immune Thrombocytopenic Purpura (ITP), why is the platelet count low?", 
    opts: ["Failed marrow production", "Antibody-mediated destruction and splenic clearance", "Vitamin K deficiency", "Excessive clotting in the lungs"], 
    ans: 1, 
    rationales: ["INCORRECT: The marrow is usually working fine.", "CORRECT: ITP involves autoantibodies that coat platelets, leading to their removal by the spleen.", "INCORRECT: Vitamin K affects coagulation factors, not platelets.", "INCORRECT: ITP is a bleeding disorder, not a lung clotting disorder."]
  },
  { 
    act: "SCENE 42: METAPLASIA", day: "FRIDAY", time: "06:18 PM", event: "SURVIVAL ADAPTATION", location: "atrium",
    beats: [
      { 
        text: "Endoscopy image: Distal esophageal irritation. Dr. Rao: 'Adaptive replacement.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "GERD STRESS", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Chronic stress (GERD) → Epithelial stress → One mature cell type replaced by another.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "SQUAMOUS", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} },
          { type: 'node', x: 80, y: 50, label: "COLUMNAR", shape: 'box' },
          { type: 'text', x: 50, y: 40, label: "SWAP" }
        ] 
      },
      { 
        text: "Neil: 'Replacing a hardwood floor with tile because water keeps ruining the wood.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "WOOD -> TILE", shape: 'box' }
        ] 
      }
    ],
    q: "What is the primary characteristic of Metaplasia?", 
    opts: ["Cell death", "Reversible replacement of one mature cell type by another", "Disordered cancerous growth", "Increase in cell size only"], 
    ans: 1, 
    rationales: ["INCORRECT: Metaplasia is a survival strategy.", "CORRECT: Metaplasia is the reversible swap of one adult cell type for another to better survive chronic irritation.", "INCORRECT: Disordered growth is dysplasia.", "INCORRECT: Increase in size is hypertrophy."]
  },
  { 
    act: "SCENE 43: DYSPLASIA", day: "FRIDAY", time: "06:56 PM", event: "DISORDERED GROWTH", location: "conference_room",
    beats: [
      { 
        text: "Biopsy: chronic colitis. Dr. Rao: 'How it differs from metaplasia.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "DISORDER", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Abnormal growth and architecture → Dysplasia → Premalignant risk.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "ORDER", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 65, y: 50} },
          { type: 'node', x: 80, y: 50, label: "CHAOS", shape: 'circle' },
          { type: 'text', x: 50, y: 40, label: "DYSPLASIA" }
        ] 
      },
      { 
        text: "Marty Pickles: 'Adaptation becomes danger when structure stops obeying.'", 
        speaker: 'marty',
        diagram: [
          { type: 'text', x: 50, y: 30, label: "PRE-CANCER" }
        ] 
      }
    ],
    q: "What distinguishes Dysplasia from Metaplasia?", 
    opts: ["Metaplasia is cancerous; Dysplasia is not", "Dysplasia involves disordered growth and loss of architectural organization", "They are exactly the same", "Dysplasia is always reversible with rest"], 
    ans: 1, 
    rationales: ["INCORRECT: Neither is cancer yet, but both carry risk.", "CORRECT: Dysplasia is characterized by disordered growth and architectural disorganization, indicating a higher risk of malignancy.", "INCORRECT: They represent different stages of adaptation vs disorder.", "INCORRECT: It is often permanent or requires intervention."]
  },
  { 
    act: "SCENE 44: ATHEROSCLEROSIS", day: "FRIDAY", time: "07:41 PM", event: "FOAM CELL ORIGINS", location: "conference_room",
    beats: [
      { 
        text: "Vascular diagram. Alfie: LDL → Oxidation → Macrophage uptake → Foam cells → Plaque.", 
        diagram: [
          { type: 'node', x: 10, y: 50, label: "LDL", shape: 'circle' },
          { type: 'node', x: 30, y: 50, label: "OXY-LDL", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "UPTAKE", shape: 'circle' },
          { type: 'node', x: 75, y: 50, label: "FOAM CELL", shape: 'circle' },
          { type: 'node', x: 95, y: 50, label: "PLAQUE", shape: 'box' },
          { type: 'arrow', from: {x: 18, y: 50}, to: {x: 25, y: 50} },
          { type: 'arrow', from: {x: 38, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 58, y: 50}, to: {x: 70, y: 50} },
          { type: 'arrow', from: {x: 82, y: 50}, to: {x: 90, y: 50} }
        ] 
      },
      { 
        text: "Hypertension → Endothelial injury → Faster plaque.", 
        diagram: [
          { type: 'node', x: 20, y: 30, label: "PRESSURE", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 30}, to: {x: 65, y: 30} },
          { type: 'node', x: 80, y: 30, label: "INJURY", shape: 'box' }
        ] 
      },
      { 
        text: "Marty Pickles: 'Pressure speeds damage. Lipid builds it.'", 
        speaker: 'marty',
        diagram: [
          { type: 'text', x: 50, y: 15, label: "PATHOGENESIS" }
        ] 
      }
    ],
    q: "What is a 'Foam Cell' in the context of atherosclerosis?", 
    opts: ["A type of skin cell", "A macrophage filled with oxidized LDL", "A dead platelet", "A bubble in the blood"], 
    ans: 1, 
    rationales: ["INCORRECT: Not a skin cell.", "CORRECT: Foam cells are macrophages that have ingested oxidized LDL until they are bloated with lipids; they are the core of an atherosclerotic plaque.", "INCORRECT: Platelets do not become foam cells.", "INCORRECT: It is a cellular finding, not a bubble."]
  },
  { 
    act: "SCENE 45: V-FIB", day: "FRIDAY", time: "08:18 PM", event: "ZERO OUTPUT", location: "emergency_room",
    beats: [
      { 
        text: "Monitor: chaotic rhythm. Dr. Rao: 'Ventricular fibrillation.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 50, label: "CHAOS", shape: 'box' },
          { type: 'text', x: 50, y: 70, label: "V-FIB MONITOR" }
        ] 
      },
      { 
        text: "Alfie: Disorganized electrical activity → No coordinated contraction → No cardiac output → Immediate loss of perfusion.", 
        diagram: [
          { type: 'node', x: 15, y: 50, label: "ELECTRICAL CHAOS", shape: 'box' },
          { type: 'node', x: 50, y: 50, label: "NO PUMP", shape: 'box' },
          { type: 'node', x: 85, y: 50, label: "NO PERFUSION", shape: 'box' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 60, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Neil: 'Orchestra where every musician plays at once with no conductor.'", 
        speaker: 'neil',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "ORCHESTRA", shape: 'box' }
        ] 
      }
    ],
    q: "Why is Ventricular Fibrillation (V-Fib) immediately fatal without intervention?", 
    opts: ["The heart rate is too slow", "There is no coordinated contraction and therefore zero cardiac output", "The blood becomes too thin", "It causes massive blood loss"], 
    ans: 1, 
    rationales: ["INCORRECT: V-fib is fast but ineffective.", "CORRECT: Without coordinated contraction, the heart cannot pump blood to the brain and body, leading to immediate collapse.", "INCORRECT: V-fib is an electrical/mechanical issue.", "INCORRECT: It is a pump failure, not a hemorrhage."]
  },
  { 
    act: "SCENE 46: FINAL REFLECTION", day: "FRIDAY", time: "08:57 PM", event: "TREATMENT RULES", location: "conference_room",
    beats: [
      { 
        text: "Dr. Rao: 'Replacement fails if the leak stays open.'", 
        speaker: 'rao',
        diagram: [
          { type: 'node', x: 50, y: 30, label: "OPEN LEAK", shape: 'box' }
        ] 
      },
      { 
        text: "Alfie: Iron deficiency treatment → Oral ferrous sulfate + Vitamin C → IV iron if failure.", 
        diagram: [
          { type: 'node', x: 20, y: 50, label: "ORAL Fe", shape: 'circle' },
          { type: 'node', x: 50, y: 50, label: "VIT C", shape: 'circle' },
          { type: 'node', x: 80, y: 50, label: "IV Fe", shape: 'circle' },
          { type: 'arrow', from: {x: 35, y: 50}, to: {x: 45, y: 50} },
          { type: 'arrow', from: {x: 65, y: 50}, to: {x: 75, y: 50} }
        ] 
      },
      { 
        text: "Alfie: 'Module 2 stops being chaos when the mechanisms stay connected.'", 
        diagram: [
          { type: 'text', x: 50, y: 30, label: "MECHANISM CONNECTED" }
        ] 
      }
    ],
    q: "What is a critical clinical step in treating chronic iron deficiency anemia?", 
    opts: ["Giving only B12", "Identifying and treating the underlying source of blood loss", "Ignoring the cause", "Providing only IV iron to everyone"], 
    ans: 1, 
    rationales: ["INCORRECT: B12 treats a different anemia.", "CORRECT: Replacing iron is only half the battle; you must find and stop the 'leak' (blood loss) causing the deficiency.", "INCORRECT: Ignoring the cause leads to recurrence.", "INCORRECT: Oral therapy is first-line for most."]
  }
];

// NPC steps are STRICTLY narrative-accurate. Only characters who speak or are explicitly present.
// Evening/solo scenes = Alfie only. Class scenes = only named participants.
export const MODULE2_NPC_DATA = [
  { id: 'neil', name: 'NEIL', color: '#ff8c00', steps: [0, 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 18, 19, 21, 23, 24, 29, 30, 31, 32, 33, 37, 38, 39, 40, 42, 45], image: 'https://rosebud.ai/assets/neil-oracle.png.webp?1oMl' },
  { id: 'belinda', name: 'BELINDA', color: '#ffff00', steps: [0, 2, 4, 7, 15, 20, 21, 26, 31], image: 'https://rosebud.ai/assets/belinda-v2-sprite.webp?VrWo' },
  { id: 'adrian', name: 'ADRIAN', color: '#ff00ff', steps: [0, 16, 17, 27], image: 'https://rosebud.ai/assets/adrian-student.png.webp?oG54' },
  { id: 'rao', name: 'DR. RAO', color: '#00ff41', steps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], image: 'https://rosebud.ai/assets/dr-rao-character.png.webp?REEF' },
  { id: 'marty', name: 'MARTY', color: '#32cd32', steps: [3, 4, 5, 7, 21, 29, 41, 43, 44], image: 'https://rosebud.ai/assets/marty-pickles-ninja.png.webp?iCpM' }
];

export const MODULE2_WORLD_LOCATIONS = [
  { id: 'atrium', x: 500, label: 'WESTBRIDGE ATRIUM', interior: 'Main Hall' },
  { id: 'conference_room', x: 1000, label: 'TEACHING CONFERENCE ROOM', interior: 'Conference Room' },
  { id: 'allergy_wing', x: 1200, label: 'ALLERGY WING', interior: 'Exam Room' },
  { id: 'hematology_lab', x: 1400, label: 'HEMATOLOGY LAB', interior: 'Lab Bench' },
  { id: 'cafeteria', x: 1600, label: 'STUDENT CAFETERIA', interior: 'Lunch Table' },
  { id: 'dermatology_clinic', x: 1800, label: 'DERMATOLOGY CLINIC', interior: 'Derm Room' },
  { id: 'internal_medicine_ward', x: 2000, label: 'INTERNAL MEDICINE WARD', interior: 'Ward Room 4B' },
  { id: 'rheumatology_clinic', x: 2200, label: 'RHEUMATOLOGY CLINIC', interior: 'Exam Room 2' },
  { id: 'pediatric_conference_room', x: 2400, label: 'PEDIATRIC CONFERENCE ROOM', interior: 'Conf Room' },
  { id: 'pediatric_immunology_unit', x: 2600, label: 'PEDIATRIC IMMUNOLOGY UNIT', interior: 'Immunology Unit' },
  { id: 'infectious_disease_clinic', x: 2800, label: 'INFECTIOUS DISEASE CLINIC', interior: 'Clinic Desk' },
  { id: 'infectious_disease_ward', x: 3000, label: 'INFECTIOUS DISEASE WARD', interior: 'ID Ward' },
  { id: 'oncology_amphitheater', x: 3200, label: 'ONCOLOGY AMPHITHEATER', interior: 'Lecture Hall' },
  { id: 'hematopathology_lab', x: 3400, label: 'HEMATOPATHOLOGY LAB', interior: 'Path Lab' },
  { id: 'hematology_reading_room', x: 3600, label: 'HEMATOLOGY READING ROOM', interior: 'Reading Room' },
  { id: 'pathology_teaching_suite', x: 3800, label: 'PATHOLOGY TEACHING SUITE', interior: 'Path Suite' },
  { id: 'pathology_consultation_room', x: 4000, label: 'PATHOLOGY CONSULTATION ROOM', interior: 'Consult Room' },
  { id: 'hematology_teaching_room', x: 4200, label: 'HEMATOLOGY TEACHING ROOM', interior: 'Teaching Room' },
  { id: 'clinical_lab_review', x: 4400, label: 'CLINICAL LAB REVIEW', interior: 'Lab Review' },
  { id: 'hematology_ward', x: 4600, label: 'HEMATOLOGY WARD', interior: 'Hema Ward' },
  { id: 'obstetrics_consultation', x: 4800, label: 'OBSTETRICS CONSULTATION', interior: 'OB Room' },
  { id: 'emergency_case_conference', x: 5000, label: 'EMERGENCY CASE CONFERENCE', interior: 'Emergency Room' },
  { id: 'hemostasis_lab', x: 5200, label: 'HEMOSTASIS LAB', interior: 'Coag Lab' },
  { id: 'market', x: 5400, label: 'WESTBRIDGE MARKET', interior: 'Market Aisle' },
  { id: 'emergency_room', x: 5600, label: 'EMERGENCY ROOM', interior: 'Trauma Bay' },
  { id: 'home', x: 5800, label: 'HOME', interior: 'Living Room' }
];
