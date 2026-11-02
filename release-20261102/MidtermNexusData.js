
/**
 * HCR 240 Pathophysiology - The Midterm Nexus Question Bank
 * 100 Questions exactly as provided.
 */

export const MIDTERM_NEXUS_QUESTIONS = [
    // PART 1 (1-25)
    {
        id: 1,
        q: "A 67-year-old patient develops redness, warmth, swelling, and tenderness around a leg wound two hours after falling. Which physiological change is primarily responsible for the swelling?",
        opts: ["Increased plasma oncotic pressure", "Increased capillary permeability", "Platelet aggregation", "Vasoconstriction"],
        ans: 1, // B
        rationale: "Increased capillary permeability allows fluid and proteins to leak into the interstitial space, causing edema (swelling) during acute inflammation.",
        topic: "Inflammation",
        pearl: "Swelling is a hallmark of the vascular phase of inflammation."
    },
    {
        id: 2,
        q: "A patient presents with a puncture wound from stepping on a nail. Which leukocyte predominates during the first 24 hours of acute inflammation?",
        opts: ["Eosinophil", "Macrophage", "Neutrophil", "Plasma cell"],
        ans: 2, // C
        rationale: "Neutrophils are the first responders in acute inflammation, arriving within minutes to hours.",
        topic: "Inflammation",
        pearl: "Neutrophils = First Responders."
    },
    {
        id: 3,
        q: "A biopsy from a chronic inflammatory lesion is most likely to reveal large numbers of:",
        opts: ["Basophils and mast cells", "Neutrophils only", "Platelets and erythrocytes", "Macrophages and lymphocytes"],
        ans: 3, // D
        rationale: "Chronic inflammation is characterized by the presence of mononuclear cells like macrophages and lymphocytes.",
        topic: "Inflammation",
        pearl: "Chronic = Mononuclear cells."
    },
    {
        id: 4,
        q: "Which patient is most likely to experience delayed wound healing?",
        opts: ["Healthy 19-year-old marathon runner", "Patient with well-controlled hypertension", "Patient with poorly controlled diabetes who smokes one pack per day", "Patient taking oral vitamin C supplements"],
        ans: 2, // C
        rationale: "Diabetes and smoking both impair blood flow and oxygen delivery to tissues, significantly delaying healing.",
        topic: "Wound Healing",
        pearl: "Blood flow and glucose control are vital for healing."
    },
    {
        id: 5,
        q: "Which event occurs immediately after vascular injury during normal hemostasis?",
        opts: ["Platelet adhesion to exposed collagen", "Fibroblast migration", "Collagen remodeling", "Fibrinolysis"],
        ans: 0, // A
        rationale: "Vascular injury exposes collagen, which triggers immediate platelet adhesion and the formation of a platelet plug.",
        topic: "Hemostasis",
        pearl: "Platelet adhesion is the primary hemostatic response."
    },
    {
        id: 6,
        q: "A patient taking warfarin has a prolonged PT/INR. Which process is directly impaired?",
        opts: ["Platelet production", "Activation of clotting factors", "Leukocyte migration", "Red blood cell synthesis"],
        ans: 1, // B
        rationale: "Warfarin interferes with the synthesis of vitamin K-dependent clotting factors (II, VII, IX, X).",
        topic: "Hemostasis",
        pearl: "Warfarin targets the coagulation cascade, not platelets."
    },
    {
        id: 7,
        q: "Which mediator is primarily responsible for pain associated with acute inflammation?",
        opts: ["Bradykinin", "Albumin", "Complement C5", "Fibrinogen"],
        ans: 0, // A
        rationale: "Bradykinin and prostaglandins are the primary mediators that stimulate nerve endings to cause pain.",
        topic: "Inflammation",
        pearl: "Bradykinin = Pain."
    },
    {
        id: 8,
        q: "A patient’s wound contains bright red, moist tissue with numerous newly formed capillaries. Which stage of healing is occurring?",
        opts: ["Hemostasis", "Inflammatory phase", "Proliferative phase", "Remodeling phase"],
        ans: 2, // C
        rationale: "Granulation tissue, characterized by new capillaries and fibroblasts, forms during the proliferative phase.",
        topic: "Wound Healing",
        pearl: "Granulation tissue = Proliferation."
    },
    {
        id: 9,
        q: "A patient with severe burns loses large amounts of plasma from damaged capillaries. Which physical finding would most likely develop?",
        opts: ["Hypertension", "Tissue edema", "Polycythemia", "Bradycardia"],
        ans: 1, // B
        rationale: "Loss of plasma proteins and fluid into the interstitial space leads to systemic tissue edema.",
        topic: "Fluid Balance",
        pearl: "Burn patients face massive fluid shifts and edema."
    },
    {
        id: 10,
        q: "Failure of which normal cellular process most directly contributes to cancer development?",
        opts: ["Hypertrophy", "Hyperplasia", "Apoptosis", "Metaplasia"],
        ans: 2, // C
        rationale: "Apoptosis (programmed cell death) normally removes damaged or mutated cells; its failure allows cancer cells to survive.",
        topic: "Cellular Adaptation",
        pearl: "Evasion of apoptosis is a hallmark of cancer."
    },
    {
        id: 11,
        q: "Which wound would be expected to heal primarily by secondary intention?",
        opts: ["Clean surgical incision closed with sutures", "Small paper cut", "Large pressure ulcer with tissue loss", "Laparoscopic incision"],
        ans: 2, // C
        rationale: "Secondary intention occurs in wounds with significant tissue loss that cannot be closed by sutures, like pressure ulcers.",
        topic: "Wound Healing",
        pearl: "Secondary intention = Healing from the bottom up."
    },
    {
        id: 12,
        q: "Which patient is experiencing a Type I hypersensitivity reaction?",
        opts: ["Patient with poison ivy dermatitis", "Patient with seasonal allergic rhinitis after pollen exposure", "Patient with hemolytic transfusion reaction", "Patient with lupus nephritis"],
        ans: 1, // B
        rationale: "Type I is IgE-mediated, typical of seasonal allergies and anaphylaxis.",
        topic: "Hypersensitivity",
        pearl: "Type I = Allergic (IgE)."
    },
    {
        id: 13,
        q: "A patient accidentally receives incompatible donor blood. Which hypersensitivity reaction is responsible?",
        opts: ["Type IV", "Type III", "Type II", "Type I"],
        ans: 2, // C
        rationale: "Type II involves antibodies reacting with antigens on cell surfaces, as seen in blood transfusion reactions.",
        topic: "Hypersensitivity",
        pearl: "Type II = Cytotoxic (Blood groups)."
    },
    {
        id: 14,
        q: "A patient develops a fever after bacterial pneumonia. Which substance resets the hypothalamic temperature set point?",
        opts: ["Histamine", "Pyrogens", "Bradykinin", "Leukotrienes"],
        ans: 1, // B
        rationale: "Pyrogens (like IL-1 and TNF) act on the hypothalamus to reset the thermostat upward.",
        topic: "Inflammation",
        pearl: "Pyrogens = Fire (Fever)."
    },
    {
        id: 15,
        q: "Which function best describes chemotaxis?",
        opts: ["Movement of leukocytes toward injured tissue", "Platelet plug formation", "Vasodilation of arterioles", "Destruction of fibrin"],
        ans: 0, // A
        rationale: "Chemotaxis is the directed migration of cells toward a chemical gradient (e.g., to the site of injury).",
        topic: "Inflammation",
        pearl: "Chemotaxis = Cellular navigation."
    },
    {
        id: 16,
        q: "A patient has hereditary sickle cell disease. Which inheritance pattern is responsible?",
        opts: ["X-linked dominant", "Autosomal dominant", "Autosomal recessive", "X-linked recessive"],
        ans: 2, // C
        rationale: "Sickle cell anemia is an autosomal recessive disorder.",
        topic: "Genetics",
        pearl: "Sickle cell requires two copies of the gene."
    },
    {
        id: 17,
        q: "A patient has iron deficiency anemia. Which symptom is most characteristic?",
        opts: ["Jaundice and splenomegaly", "Fatigue with exertional dyspnea", "Generalized edema", "Productive cough"],
        ans: 1, // B
        rationale: "Reduced oxygen-carrying capacity leads to fatigue and shortness of breath upon exertion.",
        topic: "Hematology",
        pearl: "Anemia = Fatigue."
    },
    {
        id: 18,
        q: "A patient with chronic gastrointestinal bleeding is most likely to develop deficiency of:",
        opts: ["Iron", "Vitamin D", "Calcium", "Potassium"],
        ans: 0, // A
        rationale: "Chronic blood loss is the most common cause of iron deficiency in adults.",
        topic: "Hematology",
        pearl: "Chronic bleed = Iron depletion."
    },
    {
        id: 19,
        q: "Which laboratory value most directly reflects the oxygen-carrying capacity of blood?",
        opts: ["Platelet count", "White blood cell count", "Hemoglobin concentration", "ESR"],
        ans: 2, // C
        rationale: "Hemoglobin is the protein in RBCs that binds and carries oxygen.",
        topic: "Hematology",
        pearl: "Hemoglobin carries the O2."
    },
    {
        id: 20,
        q: "A patient with hemophilia experiences prolonged bleeding following a tooth extraction because of:",
        opts: ["Reduced platelet number", "Deficiency of coagulation factors", "Excess fibrinolysis only", "Increased vascular permeability"],
        ans: 1, // B
        rationale: "Hemophilia involves a deficiency in clotting factors (VIII or IX), impairing the coagulation cascade.",
        topic: "Hematology",
        pearl: "Hemophilia = Clotting Factor Deficiency."
    },
    {
        id: 21,
        q: "A patient reports painless enlargement of cervical lymph nodes along with unexplained weight loss and night sweats. Which diagnosis is most likely?",
        opts: ["Acute leukemia", "Hodgkin lymphoma", "Iron deficiency anemia", "Multiple myeloma"],
        ans: 1, // B
        rationale: "Painless lymphadenopathy and B-symptoms (weight loss, night sweats) are classic for Hodgkin lymphoma.",
        topic: "Hematology",
        pearl: "B-symptoms = Lymphoma suspicion."
    },
    {
        id: 22,
        q: "Which finding most strongly supports the diagnosis of Hodgkin lymphoma?",
        opts: ["Elevated platelet count", "Reed-Sternberg cells on lymph node biopsy", "Howell-Jolly bodies", "Hypersegmented neutrophils"],
        ans: 1, // B
        rationale: "Reed-Sternberg cells ('owl-eye' appearance) are the diagnostic marker for Hodgkin lymphoma.",
        topic: "Hematology",
        pearl: "Reed-Sternberg = Hodgkin."
    },
    {
        id: 23,
        q: "A patient recovering from blood loss has an increased reticulocyte count. This finding indicates:",
        opts: ["Increased destruction of mature erythrocytes", "Bone marrow response with increased red blood cell production", "Platelet dysfunction", "Autoimmune hemolysis"],
        ans: 1, // B
        rationale: "Reticulocytes are immature RBCs; an increase indicates the bone marrow is working hard to replace lost cells.",
        topic: "Hematology",
        pearl: "High retics = Marrow is working."
    },
    {
        id: 24,
        q: "Which statement regarding varicose veins is most accurate?",
        opts: ["They result from chronic arterial vasospasm.", "They are caused by failure of venous valves leading to venous dilation.", "They are caused by platelet deficiency.", "They occur because arteries become aneurysmal."],
        ans: 1, // B
        rationale: "Varicose veins occur when valves fail, causing blood to pool and veins to dilate.",
        topic: "Cardiovascular",
        pearl: "Valve failure = Varicosity."
    },
    {
        id: 25,
        q: "Which intervention is most appropriate for improving iron absorption in a patient taking oral ferrous sulfate?",
        opts: ["Take the medication with milk.", "Take it with calcium supplements.", "Take it with orange juice or another source of vitamin C.", "Take it immediately after an antacid."],
        ans: 2, // C
        rationale: "Vitamin C creates an acidic environment that enhances the absorption of iron.",
        topic: "Hematology",
        pearl: "Iron + Vitamin C = Better absorption."
    },

    // PART 2 (26-50)
    {
        id: 26,
        q: "A patient with progressive shortness of breath has destruction of alveolar walls on CT scan. Which diagnosis is most likely?",
        opts: ["Asthma", "Chronic bronchitis", "Emphysema", "Pneumonia"],
        ans: 2, // C
        rationale: "Emphysema is defined by the permanent destruction of alveolar walls and enlargement of airspaces.",
        topic: "Respiratory",
        pearl: "Emphysema = Alveolar destruction."
    },
    {
        id: 27,
        q: "Loss of elastic recoil in emphysema primarily causes:",
        opts: ["Difficulty exhaling air from the lungs", "Increased pulmonary blood flow", "Thickening of the pleura", "Excess surfactant production"],
        ans: 0, // A
        rationale: "Loss of elasticity causes airways to collapse during expiration, leading to air trapping.",
        topic: "Respiratory",
        pearl: "Emphysema = Air trapping on exhale."
    },
    {
        id: 28,
        q: "A patient experiences intermittent wheezing that improves rapidly after using an albuterol inhaler. Which disorder is most likely?",
        opts: ["Bronchiectasis", "Asthma", "Pulmonary fibrosis", "Pleural effusion"],
        ans: 1, // B
        rationale: "Asthma is characterized by reversible bronchoconstriction, often responding quickly to bronchodilators.",
        topic: "Respiratory",
        pearl: "Reversible wheeze = Asthma."
    },
    {
        id: 29,
        q: "During an asthma attack, airflow is reduced primarily because of:",
        opts: ["Destruction of alveoli", "Pulmonary edema", "Bronchoconstriction and mucus secretion", "Pleural inflammation"],
        ans: 2, // C
        rationale: "Inflammation in asthma leads to smooth muscle contraction (bronchospasm) and thick mucus production.",
        topic: "Respiratory",
        pearl: "Asthma = Spasm + Mucus."
    },
    {
        id: 30,
        q: "Which patient has the greatest risk for developing COPD?",
        opts: ["A lifelong smoker with a 40-pack-year history", "A patient with seasonal allergies", "A healthy adolescent athlete", "A patient with iron deficiency anemia"],
        ans: 0, // A
        rationale: "Cigarette smoking is the leading risk factor for the development of COPD.",
        topic: "Respiratory",
        pearl: "Smoking = COPD primary driver."
    },
    {
        id: 31,
        q: "A patient has a productive cough lasting at least three months in each of the last two years. Which diagnosis best fits this presentation?",
        opts: ["Pulmonary embolism", "Chronic bronchitis", "Asthma", "Pneumothorax"],
        ans: 1, // B
        rationale: "Chronic bronchitis is clinically defined by a persistent productive cough for this specific duration.",
        topic: "Respiratory",
        pearl: "3 months / 2 years = Chronic Bronchitis."
    },
    {
        id: 32,
        q: "Which finding is most characteristic of bacterial pneumonia?",
        opts: ["Hyperglycemia", "Bradycardia", "Alveoli filled with inflammatory exudate", "Destruction of heart valves"],
        ans: 2, // C
        rationale: "Pneumonia involves an inflammatory response where alveoli fill with fluid, WBCs, and debris (exudate).",
        topic: "Respiratory",
        pearl: "Pneumonia = Consolidated exudate."
    },
    {
        id: 33,
        q: "A chest X-ray demonstrates air within the pleural cavity after a stab wound. Which condition is present?",
        opts: ["Pleural effusion", "Pneumothorax", "Atelectasis", "Pulmonary fibrosis"],
        ans: 1, // B
        rationale: "A pneumothorax is the presence of air in the pleural space, causing lung collapse.",
        topic: "Respiratory",
        pearl: "Pneumothorax = Air in pleural space."
    },
    {
        id: 34,
        q: "A patient suddenly develops severe dyspnea, hypotension, and tracheal deviation after chest trauma. Which condition requires immediate intervention?",
        opts: ["Simple pneumothorax", "Pneumonia", "Tension pneumothorax", "Bronchitis"],
        ans: 2, // C
        rationale: "Tension pneumothorax is a life-threatening emergency where air pressure shifts the mediastinum and compresses the heart.",
        topic: "Respiratory",
        pearl: "Tracheal deviation = Tension Pneumothorax."
    },
    {
        id: 35,
        q: "Gas exchange between air and blood occurs primarily in the:",
        opts: ["Bronchi", "Alveoli", "Trachea", "Larynx"],
        ans: 1, // B
        rationale: "The alveoli provide the thin-walled surface necessary for the diffusion of O2 and CO2.",
        topic: "Respiratory",
        pearl: "Alveoli = Exchange site."
    },
    {
        id: 36,
        q: "Pulse oximetry measures:",
        opts: ["Hemoglobin concentration", "Percentage of hemoglobin saturated with oxygen", "Carbon dioxide concentration", "Respiratory rate"],
        ans: 1, // B
        rationale: "Pulse oximetry (SpO2) monitors how much oxygen the hemoglobin is actually carrying.",
        topic: "Diagnostics",
        pearl: "SpO2 = Oxygen Saturation."
    },
    {
        id: 37,
        q: "A patient with advanced COPD retains carbon dioxide. Which acid-base disturbance is most likely?",
        opts: ["Metabolic acidosis", "Respiratory alkalosis", "Respiratory acidosis", "Metabolic alkalosis"],
        ans: 2, // C
        rationale: "Hypoventilation in COPD leads to CO2 retention; CO2 is an acid, causing respiratory acidosis.",
        topic: "Acid-Base",
        pearl: "High CO2 = Respiratory Acidosis."
    },
    {
        id: 38,
        q: "Which assessment finding indicates increased work of breathing?",
        opts: ["Use of accessory muscles", "Bradycardia", "Decreased chest expansion with normal oxygenation", "Increased appetite"],
        ans: 0, // A
        rationale: "Use of sternocleidomastoid or intercostal muscles indicates the patient is struggling to ventilate.",
        topic: "Respiratory",
        pearl: "Accessory muscles = Respiratory distress."
    },
    {
        id: 39,
        q: "A patient aspirates gastric contents during surgery. Which complication is most likely?",
        opts: ["Aspiration pneumonia", "Pulmonary fibrosis", "Chronic bronchitis", "Pleural effusion"],
        ans: 0, // A
        rationale: "Inhaling gastric acid or food can cause chemical or bacterial lung inflammation.",
        topic: "Respiratory",
        pearl: "Aspiration leads to pneumonia."
    },
    {
        id: 40,
        q: "Which patient requires immediate nursing assessment?",
        opts: ["Oxygen saturation of 84% on room air", "Mild sore throat for one day", "Seasonal allergic rhinitis", "Stable chronic cough"],
        ans: 0, // A
        rationale: "A SpO2 of 84% indicates significant hypoxemia and requires urgent intervention.",
        topic: "Emergency",
        pearl: "ABC (Airway, Breathing, Circulation) first."
    },
    {
        id: 41,
        q: "A patient experiences crushing substernal chest pain lasting 45 minutes with radiation to the left arm. Which diagnosis is most likely?",
        opts: ["Stable angina", "Acute myocardial infarction", "Gastroesophageal reflux disease", "Costochondritis"],
        ans: 1, // B
        rationale: "Severe, prolonged chest pain radiating to the arm is a classic presentation of MI.",
        topic: "Cardiovascular",
        pearl: "Long-duration crushing pain = MI until proven otherwise."
    },
    {
        id: 42,
        q: "Which laboratory marker is most specific for myocardial injury?",
        opts: ["CK", "Myoglobin", "Troponin I", "LDH"],
        ans: 2, // C
        rationale: "Troponins are the most sensitive and specific markers for cardiac muscle damage.",
        topic: "Diagnostics",
        pearl: "Troponin = Cardiac specific."
    },
    {
        id: 43,
        q: "Most acute myocardial infarctions occur because of:",
        opts: ["Coronary artery spasm alone", "Rupture of an atherosclerotic plaque with thrombus formation", "Congenital heart disease", "Bacterial infection"],
        ans: 1, // B
        rationale: "Plaque rupture triggers the coagulation cascade, forming a clot that blocks the artery.",
        topic: "Cardiovascular",
        pearl: "Plaque rupture + Thrombus = MI."
    },
    {
        id: 44,
        q: "Which modifiable risk factor contributes most strongly to coronary artery disease?",
        opts: ["Smoking cigarettes", "Brown eye color", "Blood type O", "Height"],
        ans: 0, // A
        rationale: "Smoking is a major modifiable risk factor that damages vessel walls and promotes atherosclerosis.",
        topic: "Cardiovascular",
        pearl: "Smoking cessation is key."
    },
    {
        id: 45,
        q: "A patient with left-sided heart failure is most likely to develop:",
        opts: ["Pulmonary edema", "Splenomegaly", "Ascites only", "Peripheral cyanosis without dyspnea"],
        ans: 0, // A
        rationale: "When the left ventricle fails, blood backs up into the lungs, causing pulmonary congestion/edema.",
        topic: "Cardiovascular",
        pearl: "Left = Lungs."
    },
    {
        id: 46,
        q: "Peripheral edema and jugular venous distention are classic findings of:",
        opts: ["Left-sided heart failure", "Right-sided heart failure", "Acute asthma", "Pericarditis"],
        ans: 1, // B
        rationale: "Right-sided failure causes blood to back up into the systemic venous circulation.",
        topic: "Cardiovascular",
        pearl: "Right = Body/Systemic."
    },
    {
        id: 47,
        q: "Which statement best describes coronary artery bypass graft (CABG) surgery?",
        opts: ["It replaces diseased heart valves.", "It restores coronary blood flow by bypassing blocked arteries.", "It permanently cures atherosclerosis.", "It removes infarcted myocardium."],
        ans: 1, // B
        rationale: "CABG uses vessels from elsewhere to 'detour' blood around a blockage.",
        topic: "Cardiovascular",
        pearl: "CABG = Detour around the block."
    },
    {
        id: 48,
        q: "Which patient has the greatest risk for infective endocarditis?",
        opts: ["Healthy young adult with seasonal allergies", "Patient with a prosthetic heart valve and poor dental hygiene", "Patient with iron deficiency anemia", "Healthy marathon runner"],
        ans: 1, // B
        rationale: "Prosthetic valves provide a surface for bacteria to attach, and poor dental hygiene allows bacteria into the blood.",
        topic: "Cardiovascular",
        pearl: "Damaged/Artificial valves are high risk."
    },
    {
        id: 49,
        q: "A patient develops an irregular heartbeat after a myocardial infarction. This abnormal rhythm is called:",
        opts: ["Hypertension", "Dysrhythmia", "Ischemia", "Atherosclerosis"],
        ans: 1, // B
        rationale: "Ischemia can damage the heart's electrical system, leading to dysrhythmias.",
        topic: "Cardiovascular",
        pearl: "Dysrhythmias are a common post-MI complication."
    },
    {
        id: 50,
        q: "A patient with chronic venous insufficiency develops enlarged superficial veins in the legs. Which mechanism best explains this condition?",
        opts: ["Arterial vasospasm", "Failure of venous valves causing blood pooling", "Platelet deficiency", "Coronary artery obstruction"],
        ans: 1, // B
        rationale: "Valve failure leads to increased pressure and dilation of the veins (varicosities).",
        topic: "Cardiovascular",
        pearl: "Valve failure drives venous pooling."
    },

    // PART 3 (51-75)
    {
        id: 51,
        q: "A patient develops sudden swelling of the lips, wheezing, and hypotension within minutes of receiving penicillin. Which condition is most likely?",
        opts: ["Septic shock", "Type IV hypersensitivity", "Anaphylaxis", "Serum sickness"],
        ans: 2, // C
        rationale: "Anaphylaxis is a rapid-onset, life-threatening Type I hypersensitivity reaction.",
        topic: "Hypersensitivity",
        pearl: "Rapid onset + Penicillin = Anaphylaxis suspicion."
    },
    {
        id: 52,
        q: "A patient with chronic kidney disease develops normocytic anemia. Which physiological change is primarily responsible?",
        opts: ["Increased bilirubin production", "Excess iron storage", "Increased platelet destruction", "Reduced erythropoietin production"],
        ans: 3, // D
        rationale: "The kidneys produce erythropoietin (EPO); failure reduces EPO and thus RBC production.",
        topic: "Hematology",
        pearl: "CKD = Low EPO = Anemia."
    },
    {
        id: 53,
        q: "Which laboratory finding is most consistent with iron deficiency anemia?",
        opts: ["Decreased hemoglobin and ferritin", "Increased ferritin", "Elevated platelet count only", "Increased hematocrit"],
        ans: 0, // A
        rationale: "Ferritin reflects iron stores, which are depleted in iron deficiency anemia.",
        topic: "Hematology",
        pearl: "Low ferritin is highly specific for iron deficiency."
    },
    {
        id: 54,
        q: "A patient develops petechiae and frequent nosebleeds. Which laboratory test would best support thrombocytopenia?",
        opts: ["Elevated troponin", "Low platelet count", "Increased hematocrit", "High LDL cholesterol"],
        ans: 1, // B
        rationale: "Thrombocytopenia is a deficiency of platelets, which are essential for clotting and preventing petechiae.",
        topic: "Hematology",
        pearl: "Low platelets = Bleeding risk."
    },
    {
        id: 55,
        q: "A patient with hemophilia A is scheduled for surgery. Which deficiency is responsible for this disorder?",
        opts: ["Factor II", "Factor VII", "Factor VIII", "Factor X"],
        ans: 2, // C
        rationale: "Hemophilia A is specifically a deficiency of Clotting Factor VIII.",
        topic: "Hematology",
        pearl: "Hemophilia A = VIII."
    },
    {
        id: 56,
        q: "Which patient has the greatest risk for developing deep vein thrombosis (DVT)?",
        opts: ["A patient on prolonged bed rest following hip replacement", "Healthy swimmer", "Patient walking daily after surgery", "Patient with seasonal allergies"],
        ans: 0, // A
        rationale: "Immobility after surgery is a major risk factor for venous stasis and clot formation.",
        topic: "Cardiovascular",
        pearl: "Stasis leads to DVT."
    },
    {
        id: 57,
        q: "Virchow’s triad includes endothelial injury, hypercoagulability, and:",
        opts: ["Increased cardiac output", "Polycythemia", "Arterial vasospasm", "Venous stasis"],
        ans: 3, // D
        rationale: "Venous stasis, injury, and hypercoagulability are the three factors that promote thrombosis.",
        topic: "Cardiovascular",
        pearl: "Virchow's Triad = Stasis, Injury, Hypercoagulability."
    },
    {
        id: 58,
        q: "A patient suddenly develops unilateral leg swelling, warmth, and calf tenderness. Which condition is most likely?",
        opts: ["Chronic venous insufficiency", "Deep vein thrombosis", "Peripheral arterial disease", "Cellulitis"],
        ans: 1, // B
        rationale: "Unilateral swelling and tenderness are classic signs of a DVT.",
        topic: "Cardiovascular",
        pearl: "Unilateral swelling is a red flag for DVT."
    },
    {
        id: 59,
        q: "A hospitalized patient with a DVT suddenly develops chest pain and severe dyspnea. Which complication should be suspected first?",
        opts: ["Pulmonary embolism", "Pleural effusion", "Pneumonia", "Asthma exacerbation"],
        ans: 0, // A
        rationale: "A DVT can break off and travel to the lungs, causing a pulmonary embolism (PE).",
        topic: "Emergency",
        pearl: "DVT -> PE."
    },
    {
        id: 60,
        q: "Which assessment finding is most characteristic of pulmonary embolism?",
        opts: ["Productive cough for three months", "Wheezing relieved by albuterol", "Progressive ankle edema over years", "Sudden onset dyspnea with pleuritic chest pain"],
        ans: 3, // D
        rationale: "PE often presents with abrupt shortness of breath and sharp chest pain.",
        topic: "Emergency",
        pearl: "Sudden dyspnea + Pleuritic pain = PE suspicion."
    },
    {
        id: 61,
        q: "A patient with hypertension has progressive thickening of the left ventricular wall. This is an example of:",
        opts: ["Dysplasia", "Hyperplasia", "Hypertrophy", "Metaplasia"],
        ans: 2, // C
        rationale: "The heart muscle cells grow larger to handle the increased pressure load of hypertension.",
        topic: "Cellular Adaptation",
        pearl: "Hypertrophy = Increased cell SIZE."
    },
    {
        id: 62,
        q: "Which patient has the highest risk for developing an abdominal aortic aneurysm?",
        opts: ["Healthy 25-year-old runner", "68-year-old male smoker with hypertension", "Teenager with asthma", "Patient with iron deficiency anemia"],
        ans: 1, // B
        rationale: "Age, male sex, smoking, and hypertension are the primary risk factors for AAA.",
        topic: "Cardiovascular",
        pearl: "Smoking + Hypertension = High AAA risk."
    },
    {
        id: 63,
        q: "Which complication is the greatest concern in a patient with a large untreated abdominal aortic aneurysm?",
        opts: ["Aneurysm rupture with hemorrhage", "Chronic bronchitis", "Complete spontaneous resolution", "Development of asthma"],
        ans: 0, // A
        rationale: "Rupture leads to massive, often fatal internal bleeding.",
        topic: "Emergency",
        pearl: "AAA rupture is a surgical emergency."
    },
    {
        id: 64,
        q: "An aneurysm is best defined as:",
        opts: ["Inflammation of a vein", "Obstruction of a lymphatic vessel", "Abnormal communication between two structures", "Localized dilation of a blood vessel due to wall weakness"],
        ans: 3, // D
        rationale: "An aneurysm is a focal 'bulge' in a vessel wall that is prone to rupture.",
        topic: "Cardiovascular",
        pearl: "Aneurysm = Localized dilation."
    },
    {
        id: 65,
        q: "A patient with peripheral arterial disease reports severe calf pain while walking that resolves with rest. This symptom is called:",
        opts: ["Hemoptysis", "Orthopnea", "Claudication", "Syncope"],
        ans: 2, // C
        rationale: "Intermittent claudication is the 'angina of the legs,' caused by muscle ischemia during exercise.",
        topic: "Cardiovascular",
        pearl: "Pain with walking/rested with rest = Claudication."
    },
    {
        id: 66,
        q: "Which risk factor is most strongly associated with peripheral arterial disease?",
        opts: ["Smoking", "Hyperthyroidism", "Migraine headaches", "Seasonal allergies"],
        ans: 0, // A
        rationale: "Smoking is a critical driver of systemic atherosclerosis, including PAD.",
        topic: "Cardiovascular",
        pearl: "Atherosclerosis is systemic."
    },
    {
        id: 67,
        q: "A patient is diagnosed with bacterial infective endocarditis. Which physical finding may develop from embolization?",
        opts: ["Enlarged thyroid gland", "Petechiae and splinter hemorrhages", "Bilateral cataracts", "Clubbing present since birth"],
        ans: 1, // B
        rationale: "Fragments of heart valve vegetations can break off and lodge in small vessels in the skin/nails.",
        topic: "Cardiovascular",
        pearl: "Splinter hemorrhages = Endocarditis sign."
    },
    {
        id: 68,
        q: "Which organism is a common cause of infective endocarditis following dental procedures?",
        opts: ["Candida albicans", "Clostridium difficile", "Mycoplasma pneumoniae", "Viridans streptococci"],
        ans: 3, // D
        rationale: "Viridans group streptococci are normal oral flora that can enter the blood during dental work.",
        topic: "Cardiovascular",
        pearl: "Dental work -> Viridans strep."
    },
    {
        id: 69,
        q: "A patient reports increasing fatigue and dyspnea while climbing stairs. Echocardiography demonstrates an ejection fraction of 30%. Which diagnosis is most likely?",
        opts: ["Stable angina without dysfunction", "Pulmonary fibrosis", "Heart failure with reduced ejection fraction", "Acute pericarditis"],
        ans: 2, // C
        rationale: "A low EF (<40%) and symptoms of fatigue/dyspnea are diagnostic of HFrEF.",
        topic: "Cardiovascular",
        pearl: "Low Ejection Fraction = Heart Failure."
    },
    {
        id: 70,
        q: "Which compensatory response commonly occurs early in heart failure?",
        opts: ["Activation of the renin-angiotensin-aldosterone system", "Reduced heart rate", "Increased urine sodium excretion", "Decreased sympathetic activity"],
        ans: 0, // A
        rationale: "The body activates RAAS to increase fluid volume and blood pressure in response to perceived low output.",
        topic: "Cardiovascular",
        pearl: "RAAS activation is an early (often maladaptive) response."
    },
    {
        id: 71,
        q: "Which electrolyte abnormality is most likely to precipitate life-threatening ventricular dysrhythmias?",
        opts: ["Increased magnesium intake", "Potassium imbalance", "Elevated phosphorus alone", "Mild hypercalcemia"],
        ans: 1, // B
        rationale: "Potassium is vital for cardiac electrical stability; hypo- or hyperkalemia can cause fatal rhythms.",
        topic: "Electrolytes",
        pearl: "Potassium = Cardiac Rhythm."
    },
    {
        id: 72,
        q: "A patient suddenly loses consciousness due to ventricular fibrillation. Which intervention has the highest priority?",
        opts: ["Oral aspirin only", "Echocardiography", "Chest X-ray", "Immediate defibrillation"],
        ans: 3, // D
        rationale: "V-fib is a non-perfusing rhythm; the only definitive treatment is electrical defibrillation.",
        topic: "Emergency",
        pearl: "V-fib needs the 'zapper' (Defibrillator)."
    },
    {
        id: 73,
        q: "A patient recovering from myocardial infarction asks why smoking cessation is important. Which explanation is most accurate?",
        opts: ["Smoking increases red blood cell lifespan.", "Smoking permanently lowers blood pressure.", "Smoking accelerates atherosclerosis and promotes thrombosis.", "Smoking improves coronary circulation."],
        ans: 2, // C
        rationale: "Smoking causes endothelial damage and increases the stickiness of platelets.",
        topic: "Cardiovascular",
        pearl: "Smoking + Post-MI = Extremely high risk."
    },
    {
        id: 74,
        q: "A patient develops severe chest pain while shoveling snow. Nitroglycerin does not relieve the pain after three doses. Which action is most appropriate?",
        opts: ["Rest for another hour", "Activate emergency medical services immediately", "Drink additional fluids", "Schedule an office visit next week"],
        ans: 1, // B
        rationale: "Chest pain not relieved by rest or nitro suggests an acute MI, requiring emergency care.",
        topic: "Emergency",
        pearl: "Unrelieved pain = EMS call."
    },
    {
        id: 75,
        q: "Which lifestyle modification provides the greatest overall reduction in cardiovascular risk?",
        opts: ["Smoking cessation combined with regular exercise and blood pressure control", "Drinking large amounts of sports drinks", "Taking antibiotics prophylactically", "Eliminating all dietary carbohydrates"],
        ans: 0, // A
        rationale: "Comprehensive risk factor management is the gold standard for cardiovascular prevention.",
        topic: "Cardiovascular",
        pearl: "Multi-factor lifestyle change is most effective."
    },

    // PART 4 (76-100)
    {
        id: 76,
        q: "A patient who has smoked two packs per day for 40 years asks how smoking contributes to coronary artery disease. Which response is most accurate?",
        opts: ["It decreases LDL cholesterol.", "It promotes endothelial injury and accelerates atherosclerosis.", "It strengthens arterial walls.", "It prevents thrombus formation."],
        ans: 1, // B
        rationale: "Chemicals in smoke damage the vessel lining, allowing cholesterol to deposit and plaques to form.",
        topic: "Cardiovascular",
        pearl: "Smoking is an 'insult' to the endothelium."
    },
    {
        id: 77,
        q: "Which patient has the greatest overall risk of experiencing an acute myocardial infarction?",
        opts: ["A 68-year-old smoker with diabetes, hypertension, and hyperlipidemia", "A healthy 25-year-old runner", "A teenager with seasonal allergies", "A patient with controlled hypothyroidism"],
        ans: 0, // A
        rationale: "Risk factors are cumulative; age + smoking + multiple comorbidities = high risk.",
        topic: "Cardiovascular",
        pearl: "Risk factors stack."
    },
    {
        id: 78,
        q: "A patient is diagnosed with stable angina. Which mechanism best explains the chest pain?",
        opts: ["Complete coronary artery occlusion with myocardial necrosis", "Temporary myocardial ischemia during increased oxygen demand", "Pulmonary embolism", "Pericardial inflammation"],
        ans: 1, // B
        rationale: "Stable angina is predictable pain caused when the heart needs more oxygen (e.g., during exercise) than the narrowed artery can supply.",
        topic: "Cardiovascular",
        pearl: "Stable = Predictable ischemia."
    },
    {
        id: 79,
        q: "Which finding most strongly suggests an acute myocardial infarction rather than stable angina?",
        opts: ["Chest pain relieved immediately with rest", "Chest discomfort lasting less than one minute", "Elevated cardiac troponin level", "Pain only after eating"],
        ans: 2, // C
        rationale: "Troponin is only released when heart muscle cells die (infarction), not just when they are stressed (ischemia).",
        topic: "Cardiovascular",
        pearl: "Troponin = Necrosis/Death."
    },
    {
        id: 80,
        q: "A patient develops pulmonary edema following an acute myocardial infarction. Which complication is most likely responsible?",
        opts: ["Right-sided heart failure", "Left ventricular failure", "Deep vein thrombosis", "Aortic aneurysm"],
        ans: 1, // B
        rationale: "Infarction of the left ventricle impairs its ability to pump, leading to backward backup into the lungs.",
        topic: "Cardiovascular",
        pearl: "Post-MI heart failure is common."
    },
    {
        id: 81,
        q: "A patient has bilateral pitting edema, hepatomegaly, and jugular venous distention. Which diagnosis is most likely?",
        opts: ["Right-sided heart failure", "Left-sided heart failure", "Acute asthma", "Pneumothorax"],
        ans: 0, // A
        rationale: "These signs reflect fluid backing up into the systemic venous system due to right-side failure.",
        topic: "Cardiovascular",
        pearl: "JVD + Edema = Right side."
    },
    {
        id: 82,
        q: "Cor pulmonale most commonly develops as a consequence of:",
        opts: ["Chronic pulmonary disease causing pulmonary hypertension", "Acute bacterial endocarditis", "Severe iron deficiency anemia", "Mitral valve prolapse"],
        ans: 0, // A
        rationale: "Lung disease increases resistance in the pulmonary vessels, overworking the right ventricle.",
        topic: "Cardiovascular",
        pearl: "Lung problem -> Right heart failure (Cor Pulmonale)."
    },
    {
        id: 83,
        q: "A patient with hypertrophic cardiomyopathy is advised to avoid strenuous competitive athletics primarily because of the increased risk of:",
        opts: ["Sudden cardiac death from dysrhythmias", "Chronic bronchitis", "Pleural effusion", "Iron deficiency anemia"],
        ans: 0, // A
        rationale: "The thickened muscle can obstruct blood flow and cause dangerous electrical disturbances during high stress.",
        topic: "Cardiovascular",
        pearl: "HCM is a major cause of sudden death in young athletes."
    },
    {
        id: 84,
        q: "Which finding is most characteristic of hypertrophic cardiomyopathy?",
        opts: ["Thinning of the ventricular wall", "Thickened ventricular myocardium with impaired filling", "Complete destruction of heart valves", "Pulmonary fibrosis"],
        ans: 1, // B
        rationale: "The wall becomes abnormally thick (hypertrophic), making the chamber smaller and stiffer.",
        topic: "Cardiovascular",
        pearl: "Thick wall = Poor filling."
    },
    {
        id: 85,
        q: "Which blood vessel is most commonly harvested for coronary artery bypass grafting?",
        opts: ["Internal jugular vein", "Great saphenous vein", "Femoral artery", "Pulmonary vein"],
        ans: 1, // B
        rationale: "The saphenous vein from the leg is frequently used as a conduit for CABG.",
        topic: "Cardiovascular",
        pearl: "Saphenous vein is a common bypass graft."
    },
    {
        id: 86,
        q: "Which statement about coronary artery bypass grafting (CABG) is TRUE?",
        opts: ["It removes atherosclerotic plaque from coronary arteries.", "It creates an alternate route for blood flow around blocked coronary arteries.", "It cures heart failure.", "It permanently eliminates coronary artery disease."],
        ans: 1, // B
        rationale: "CABG 'bypasses' the blockage; it does not remove the plaque itself.",
        topic: "Cardiovascular",
        pearl: "CABG = Detour."
    },
    {
        id: 87,
        q: "A patient with infective endocarditis asks why good dental hygiene is important. Which explanation is most accurate?",
        opts: ["Oral bacteria can enter the bloodstream and infect damaged heart valves.", "It lowers cholesterol levels.", "It prevents pulmonary emboli.", "It increases cardiac output."],
        ans: 0, // A
        rationale: "The mouth is a gateway for bacteria (like Viridans strep) to enter the systemic circulation.",
        topic: "Cardiovascular",
        pearl: "Brush and floss to protect your valves."
    },
    {
        id: 88,
        q: "Which patient has the highest risk for infective endocarditis?",
        opts: ["Healthy college student", "Patient with seasonal allergies", "Patient with a prosthetic heart valve who injects IV drugs", "Patient with iron deficiency anemia"],
        ans: 2, // C
        rationale: "Prosthetic valves + introducing bacteria directly into the vein (IV drugs) is an extremely high-risk combination.",
        topic: "Cardiovascular",
        pearl: "IV drugs + Prosthetic = Massive endocarditis risk."
    },
    {
        id: 89,
        q: "Which cardiac biomarker usually remains elevated the longest following a myocardial infarction?",
        opts: ["Troponin", "Potassium", "Hemoglobin", "Platelet count"],
        ans: 0, // A
        rationale: "Troponin can remain detectable in the blood for up to 1-2 weeks after an MI.",
        topic: "Diagnostics",
        pearl: "Troponin stays high longest."
    },
    {
        id: 90,
        q: "Which finding requires immediate emergency evaluation?",
        opts: ["Mild exertional fatigue", "Crushing chest pain with diaphoresis lasting 30 minutes", "Stable ankle swelling", "Mild seasonal allergies"],
        ans: 1, // B
        rationale: "Crushing pain + sweating (diaphoresis) is highly suggestive of an acute MI.",
        topic: "Emergency",
        pearl: "Pain + Sweating = Acute MI suspicion."
    },
    {
        id: 91,
        q: "A patient develops a new irregular heartbeat after an MI. Which complication is the greatest immediate concern?",
        opts: ["Reduced cardiac output leading to sudden death", "Hair loss", "Iron deficiency", "Hyperthyroidism"],
        ans: 0, // A
        rationale: "Certain post-MI dysrhythmias (like V-tach or V-fib) can cause sudden cardiac arrest.",
        topic: "Cardiovascular",
        pearl: "Post-MI dysrhythmias can be fatal."
    },
    {
        id: 92,
        q: "Which statement best describes an arteriovenous fistula created for hemodialysis?",
        opts: ["It is an abnormal aneurysm of an artery.", "It is a surgically created connection between an artery and a vein.", "It is a blood clot within a vein.", "It is a congenital heart defect."],
        ans: 1, // B
        rationale: "A fistula allows high-flow arterial blood to enter a vein, making it suitable for dialysis access.",
        topic: "Renal",
        pearl: "Fistula = Artery + Vein connection."
    },
    {
        id: 93,
        q: "A patient is diagnosed with chronic venous insufficiency. Which assessment finding is expected?",
        opts: ["Cool, pale feet with absent pulses", "Dilated superficial veins and dependent edema", "Sudden crushing chest pain", "Productive cough with fever"],
        ans: 1, // B
        rationale: "Chronic pooling leads to edema and the development of varicose veins.",
        topic: "Cardiovascular",
        pearl: "CVI = Edema + Varicosities."
    },
    {
        id: 94,
        q: "Which statement best explains why varicose veins develop?",
        opts: ["Increased arterial pressure damages capillaries.", "Failure of venous valves allows blood to pool.", "Platelet deficiency weakens veins.", "Elevated troponin damages venous walls."],
        ans: 1, // B
        rationale: "Healthy valves prevent backflow; if they fail, the vein stretches under the pressure of the blood.",
        topic: "Cardiovascular",
        pearl: "Valve failure is the root cause."
    },
    {
        id: 95,
        q: "Which inherited disorder is transmitted in an autosomal dominant pattern?",
        opts: ["Hemophilia A", "Cystic fibrosis", "Huntington disease", "Sickle cell disease"],
        ans: 2, // C
        rationale: "Huntington disease is a classic example of an autosomal dominant neurodegenerative disorder.",
        topic: "Genetics",
        pearl: "Huntington = One copy causes disease (Dominant)."
    },
    {
        id: 96,
        q: "Which symptom is most characteristic of Huntington disease?",
        opts: ["Progressive choreiform movements with cognitive decline", "Loss of pain sensation only", "Sudden flaccid paralysis", "Chronic productive cough"],
        ans: 0, // A
        rationale: "Chorea (jerky movements) and dementia are the hallmarks of Huntington's.",
        topic: "Genetics",
        pearl: "Chorea = Dance-like movements."
    },
    {
        id: 97,
        q: "A patient develops severe substernal chest pain, diaphoresis, nausea, ST-segment elevation, and elevated troponin. Which diagnosis is most likely?",
        opts: ["Stable angina", "Acute myocardial infarction", "Pneumonia", "Pulmonary embolism"],
        ans: 1, // B
        rationale: "ST-elevation and elevated troponin are definitive for an acute MI (specifically a STEMI).",
        topic: "Cardiovascular",
        pearl: "STE (ST-Elevation) + Troponin = STEMI."
    },
    {
        id: 98,
        q: "Orthopnea is best defined as:",
        opts: ["Chest pain occurring only during exercise", "Shortness of breath when lying flat", "Syncope while standing", "Coughing up blood"],
        ans: 1, // B
        rationale: "Patients with heart failure often need to sleep propped up on pillows to breathe.",
        topic: "Respiratory",
        pearl: "Orthopnea = Positional dyspnea."
    },
    {
        id: 99,
        q: "Which lifestyle modification would likely produce the greatest reduction in future cardiovascular events after an MI?",
        opts: ["Daily multivitamin use", "Smoking cessation", "Increased dietary sugar intake", "Avoiding exercise completely"],
        ans: 1, // B
        rationale: "Quitting smoking is the single most impactful lifestyle change for heart health.",
        topic: "Cardiovascular",
        pearl: "Quit smoking to save your heart."
    },
    {
        id: 100,
        q: "A 66-year-old man with diabetes, hypertension, hyperlipidemia, and a 45-pack-year smoking history develops crushing substernal chest pain while shoveling snow. His ECG demonstrates ST-segment elevation, and serum troponin is markedly elevated. Which underlying pathophysiologic event most likely triggered his condition?",
        opts: ["Acute rupture of an atherosclerotic plaque followed by coronary thrombosis", "Bacterial infection of the myocardium", "Acute pulmonary embolism", "Autoimmune destruction of cardiac muscle"],
        ans: 0, // A
        rationale: "The patient had all the risk factors for a major plaque rupture, leading to the occlusion of the coronary artery.",
        topic: "Cardiovascular",
        pearl: "Plaque rupture + Thrombus is the final common pathway for most MIs."
    }
];
