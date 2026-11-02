/*
 * Quiz Nexus reads the three original, uploaded UTF-8 source banks once per page
 * session and converts their QUESTION START/END records into the engine schema.
 * No questions are recreated or substituted when a source file is missing/invalid.
 */
export const QUIZ_NEXUS_CONFIG = {
  1: { moduleId: 1, title: 'Module 1 Quiz Nexus', soundtrack: 'assets/audio/rag1_whimsical.mp3' },
  2: { moduleId: 2, title: 'Module 2 Quiz Nexus', soundtrack: 'assets/audio/rag2ruski.mp3' },
  3: { moduleId: 3, title: 'Module 3 Quiz Nexus', soundtrack: 'assets/audio/ragmeonce3.m4a' }
};

export const QUIZ_NEXUS_SOURCE_FILES = {
  1: 'assets/hcr240_module_1_quiz_nexus_50_questions_expanded.txt',
  2: 'assets/hcr240_module_2_quiz_nexus_50_questions_expanded.txt',
  3: 'assets/hcr240_module_3_quiz_nexus_50_questions_expanded.txt'
};

export const QUIZ_NEXUS_CURRICULUM = {
  1: [
    { number: 2, title: 'Cellular Injury, Adaptations, and Maladaptive Changes' },
    { number: 3, title: 'Genetic Basis of Disease' },
    { number: 9, title: 'Inflammation and Dysfunctional Wound Healing' },
    { number: 10, title: 'Infectious Diseases' }
  ],
  2: [
    { number: 11, title: 'Disorders of the Immune System' },
    { number: 12, title: 'Disorders of White Blood Cells' },
    { number: 13, title: 'Disorders of Red Blood Cells' },
    { number: 14, title: 'Disorders of Platelets, Hemostasis, and Coagulation' },
    { number: 15, title: 'Arterial Disorders' }
  ],
  3: [
    { number: 16, title: 'Ischemic Heart Disease' },
    { number: 17, title: 'Heart Failure' },
    { number: 19, title: 'Venous Disorders' },
    { number: 20, title: 'Respiratory Inflammation and Infection' },
    { number: 21, title: 'Restrictive and Obstructive Pulmonary Disorders' }
  ]
};

const TOPIC_RULES = {
  1: [
    { chapter: 2, subtopic: 'Atrophy, hypertrophy, and hyperplasia', patterns: [/\batroph\w*\b/i, /\bhypertroph\w*\b/i, /\bhyperplasia\b/i, /\bdisuse\b/i, /\bincreased cell number\b/i] },
    { chapter: 2, subtopic: 'Metaplasia, dysplasia, and neoplasia', patterns: [/\bmetaplas\w*\b/i, /\bdysplasia\b/i, /\bneoplas\w*\b/i, /\bcarcinoma\b/i, /\bmalignan\w*\b/i] },
    { chapter: 2, subtopic: 'Apoptosis versus necrosis', patterns: [/\bapoptos\w*\b/i, /\bnecros\w*\b/i, /\bprogrammed cell death\b/i, /\bcell death\b/i] },
    { chapter: 2, subtopic: 'Cellular injury and adaptation mechanisms', patterns: [/\bcellular injury\b/i, /\bischemia\b/i, /\breperfusion\b/i, /\boxidative stress\b/i, /\bcell adaptation\b/i, /\bcellular adaptation\b/i] },
    { chapter: 3, subtopic: 'Genetic disorders and inheritance patterns', patterns: [/\bgenet\w*\b/i, /\binherit\w*\b/i, /\bautosomal\b/i, /\bx-linked\b/i, /\bchromosom\w*\b/i, /\ballele\b/i, /\bmutation\b/i, /\bcarrier\b/i, /\bpedigree\b/i] },
    { chapter: 9, subtopic: 'Inflammatory mediators and chemotaxis', patterns: [/\binflamm\w*\b/i, /\bchemotax\w*\b/i, /\bcytokin\w*\b/i, /\bhistamine\b/i, /\bprostaglandin\w*\b/i, /\bneutrophil\w*\b/i, /\bleukocyte\w*\b/i, /\bmediator\w*\b/i] },
    { chapter: 9, subtopic: 'Pyrogens and fever', patterns: [/\bpyrogen\w*\b/i, /\bfever\b/i, /\bfebrile\b/i, /\btemperature set point\b/i, /\bthermoregulat\w*\b/i] },
    { chapter: 9, subtopic: 'Wound healing and complications', patterns: [/\bwound\b/i, /\bheal\w*\b/i, /\bscar\w*\b/i, /\bfibroblast\w*\b/i, /\bgranulation tissue\b/i, /\bkeloid\b/i, /\bdehiscence\b/i, /\bgranuloma\b/i] },
    { chapter: 10, subtopic: 'Bacterial infections', patterns: [/\bbacter\w*\b/i, /\bgram[- ]positive\b/i, /\bgram[- ]negative\b/i, /\bantibiotic\w*\b/i, /\bstaphylococc\w*\b/i, /\bstreptococc\w*\b/i, /\bsepsis\b/i] },
    { chapter: 10, subtopic: 'Viral infections', patterns: [/\bviral?\b/i, /\bvirus\b/i, /\bviruses\b/i, /\bviral replication\b/i, /\bantiviral\w*\b/i] },
    { chapter: 10, subtopic: 'Fungal infections', patterns: [/\bfung\w*\b/i, /\bcandid\w*\b/i, /\bmycos\w*\b/i, /\bantifungal\w*\b/i] },
    { chapter: 10, subtopic: 'Parasitic infections', patterns: [/\bparasite\w*\b/i, /\bprotozo\w*\b/i, /\bhelminth\w*\b/i, /\bparasitic\b/i] },
    { chapter: 10, subtopic: 'Infectious disease mechanisms', patterns: [/\binfect\w*\b/i, /\bpathogen\w*\b/i, /\bcontag\w*\b/i, /\btransmission\b/i, /\bopportunistic\b/i] }
  ],
  2: [
    { chapter: 11, subtopic: 'Hypersensitivity Types I–IV', patterns: [/\bhypersensitiv\w*\b/i, /\btype\s*(?:i|ii|iii|iv|1|2|3|4)\b/i, /\bIgE\b/i, /\banaphylax\w*\b/i, /\bimmune complex\b/i, /\bdelayed[- ]type\b/i] },
    { chapter: 11, subtopic: 'Autoimmune versus immunodeficiency disorders', patterns: [/\bautoimmun\w*\b/i, /\bimmunodeficien\w*\b/i, /\bimmunoglobulin\w*\b/i, /\bantibod\w*\b/i, /\bB[- ]cell\b/i, /\bT[- ]cell\b/i, /\bhumoral\b/i, /\bcomplement\b/i, /\bimmune system\b/i] },
    { chapter: 12, subtopic: 'Leukemia and lymphoma', patterns: [/\bleukemia\b/i, /\bleukaemia\b/i, /\blymphoma\b/i, /\bHodgkin\b/i, /\bnon[- ]Hodgkin\b/i, /\bblast\w*\b/i, /\bmyeloma\b/i] },
    { chapter: 12, subtopic: 'White blood cell disorders', patterns: [/\bwhite blood cell\w*\b/i, /\bleukocyte\w*\b/i, /\bneutropenia\b/i, /\bleukocytosis\b/i, /\bleukopenia\b/i, /\bneutrophil\w*\b/i, /\beosinophil\w*\b/i] },
    { chapter: 13, subtopic: 'Iron-deficiency anemia', patterns: [/\biron[- ]deficien\w*\b/i, /\bmicrocyt\w*\b/i, /\bferritin\b/i, /\btransferrin\b/i, /\bhemoglobin\b/i, /\banemia\b/i, /\bered blood cell\w*\b/i, /\berythrocyt\w*\b/i] },
    { chapter: 13, subtopic: 'Hemolysis and sickle cell disease', patterns: [/\bsickle\w*\b/i, /\bhemolys\w*\b/i, /\bhemolytic\b/i, /\bthalassemia\b/i, /\breticulocyte\w*\b/i, /\bbilirubin\b/i] },
    { chapter: 14, subtopic: 'Platelet disorders and primary hemostasis', patterns: [/\bplatelet\w*\b/i, /\bthrombocytopen\w*\b/i, /\bthrombocytos\w*\b/i, /\bprimary hemostasis\b/i, /\bvon willebrand\b/i, /\bpurpura\b/i] },
    { chapter: 14, subtopic: 'Coagulation factors and bleeding disorders', patterns: [/\bcoagulat\w*\b/i, /\bhemostas\w*\b/i, /\bclotting factor\w*\b/i, /\bprothrombin\b/i, /\bthrombin\b/i, /\bfibrin\b/i, /\bhemophilia\b/i, /\bPTT\b/i, /\bINR\b/i] },
    { chapter: 15, subtopic: 'Atherosclerosis and arterial risk factors', patterns: [/\batheroscleros\w*\b/i, /\barter\w*\b/i, /\bplaque\w*\b/i, /\bhypertension\b/i, /\bperipheral arterial\b/i, /\bperipheral artery\b/i, /\bischemi\w*\b/i, /\bclaudication\b/i, /\baneurysm\b/i] }
  ],
  3: [
    { chapter: 16, subtopic: 'Angina versus myocardial infarction', patterns: [/\bangina\b/i, /\bmyocardial infarct\w*\b/i, /\bacute coronary\b/i, /\bcoronary\w*\b/i, /\bmyocardial ischemia\b/i, /\bischemic heart\b/i] },
    { chapter: 16, subtopic: 'Cardiac biomarkers and infarction diagnosis', patterns: [/\btroponin\w*\b/i, /\bCK[- ]?MB\b/i, /\bcardiac biomarker\w*\b/i, /\bbiomarker\w*\b/i, /\bST[- ]?elevation\b/i, /\bECG\b/i, /\bEKG\b/i] },
    { chapter: 17, subtopic: 'Left-sided versus right-sided heart failure', patterns: [/\bleft[- ]sided heart failure\b/i, /\bright[- ]sided heart failure\b/i, /\bheart failure\b/i, /\bventricular failure\b/i, /\bpulmonary edema\b/i, /\bcongestion\b/i, /\bedema\b/i, /\bejection fraction\b/i] },
    { chapter: 17, subtopic: 'Cardiomyopathies and dysrhythmias', patterns: [/\bcardiomyopath\w*\b/i, /\bdysrhythm\w*\b/i, /\barrhythm\w*\b/i, /\batrial fibrillation\b/i, /\bventricular fibrillation\b/i, /\bconduction\b/i] },
    { chapter: 19, subtopic: 'DVT and Virchow’s triad', patterns: [/\bdeep vein thromb\w*\b/i, /\bDVT\b/i, /\bVirchow\b/i, /\bvenous throm\w*\b/i, /\bvenous stasis\b/i, /\bvaricose vein\w*\b/i, /\bvenous insufficien\w*\b/i, /\bthrombophlebit\w*\b/i] },
    { chapter: 20, subtopic: 'Respiratory infections and inflammation', patterns: [/\bpneumonia\b/i, /\brespiratory infection\w*\b/i, /\binfluenza\b/i, /\bviral pneumon\w*\b/i, /\bbronchitis\b/i, /\bpulmonary infection\w*\b/i, /\brespiratory inflammation\b/i] },
    { chapter: 21, subtopic: 'Asthma versus COPD', patterns: [/\basthma\b/i, /\bCOPD\b/i, /\bchronic obstructive\b/i, /\bobstructive pulmonary\b/i, /\bbronchoconstrict\w*\b/i, /\bbronchodilat\w*\b/i] },
    { chapter: 21, subtopic: 'Emphysema and chronic bronchitis', patterns: [/\bemphysema\b/i, /\balveolar wall\w*\b/i, /\belastic recoil\b/i, /\bchronic bronchitis\b/i, /\bbarrel chest\b/i] },
    { chapter: 21, subtopic: 'Restrictive disorders, pneumothorax, and pleural effusion', patterns: [/\brestrictive\b/i, /\bpneumothorax\b/i, /\bpleural effusion\b/i, /\bpleural\b/i, /\bpulmonary fibrosis\b/i, /\bcompliance\b/i, /\batelectasis\b/i] }
  ]
};

function classifyQuestion(moduleId, stem, correctChoiceText, rationale) {
  const source = `${stem} ${correctChoiceText} ${rationale}`;
  const rules = TOPIC_RULES[moduleId] || [];
  let best = null;
  let bestScore = 0;
  for (const rule of rules) {
    const score = rule.patterns.reduce((total, pattern) => total + (pattern.test(source) ? 1 : 0), 0);
    if (score > bestScore) {
      best = rule;
      bestScore = score;
    }
  }
  const chapterInfo = best && QUIZ_NEXUS_CURRICULUM[moduleId].find(item => item.number === best.chapter);
  const concept = correctChoiceText.trim();
  const words = [...new Set((`${best?.subtopic || ''} ${concept}`.toLowerCase().match(/[a-z][a-z-]{3,}/g) || []))].slice(0, 12);
  return {
    chapter: chapterInfo?.number ?? null,
    chapterTitle: chapterInfo?.title ?? 'Curriculum chapter not confidently classified',
    subtopic: best?.subtopic || `Unclassified concept: ${concept}`,
    clinicalConcept: concept,
    remediationKeywords: words
  };
}

const QUESTION_BLOCK = /=====\s*QUESTION\s+(\d+)\s+START\s*=====\s*([\s\S]*?)\s*=====\s*QUESTION\s+\1\s+END\s*=====/gi;
const CHOICE_KEYS = ['A', 'B', 'C', 'D'];

function readField(block, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`^\\s*${escaped}:\\s*(.*?)\\s*$`, 'im'));
  return match?.[1]?.trim() || '';
}

export function parseQuizNexusSource(text, moduleId) {
  if (!QUIZ_NEXUS_SOURCE_FILES[moduleId]) throw new Error(`Unsupported Quiz Nexus module ${moduleId}.`);
  const matches = [...String(text).matchAll(QUESTION_BLOCK)];
  if (matches.length !== 50) throw new Error(`Module ${moduleId}: expected 50 complete QUESTION START/END records; found ${matches.length}.`);
  const questions = matches.map(([, numberText, block]) => {
    const questionNumber = Number(numberText);
    const id = readField(block, 'ID');
    const stem = readField(block, 'STEM');
    const choices = Object.fromEntries(CHOICE_KEYS.map(key => [key, readField(block, `OPTION ${key}`)]));
    const correctChoice = readField(block, 'CORRECT ANSWER').toUpperCase();
    const coreRationale = readField(block, 'CORE RATIONALE');
    const expanded = readField(block, 'EXPANDED TEACHING EXPLANATION');
    const choiceExplanations = Object.fromEntries(CHOICE_KEYS.map(key => [key, readField(block, `EXPLANATION ${key}`)]));
    if (questionNumber < 1 || questionNumber > 50 || !id || !stem || !CHOICE_KEYS.includes(correctChoice)) {
      throw new Error(`Module ${moduleId}, source question ${numberText}: missing/invalid ID, stem, number, or answer key.`);
    }
    if (id !== `M${moduleId}-Q${String(questionNumber).padStart(2, '0')}`) {
      throw new Error(`Module ${moduleId}, question ${questionNumber}: unexpected source ID ${id}.`);
    }
    if (CHOICE_KEYS.some(key => !choices[key] || !choiceExplanations[key])) {
      throw new Error(`Module ${moduleId}, question ${questionNumber}: one or more choices or option explanations are missing.`);
    }
    if (!coreRationale || !expanded) {
      throw new Error(`Module ${moduleId}, question ${questionNumber}: core rationale or expanded teaching explanation is missing.`);
    }
    const correctExplanation = [expanded, `Core rationale: ${coreRationale}`, choiceExplanations[correctChoice]]
      .filter(Boolean).join('\n\n');
    const metadata = classifyQuestion(moduleId, stem, choices[correctChoice], `${coreRationale} ${expanded}`);
    return {
      moduleId,
      questionNumber,
      id,
      stem,
      choices,
      correctChoice,
      correctAnswerText: readField(block, 'CORRECT ANSWER TEXT') || choices[correctChoice],
      coreRationale,
      correctExplanation,
      choiceExplanations,
      wrongExplanations: Object.fromEntries(CHOICE_KEYS.filter(key => key !== correctChoice).map(key => [key, choiceExplanations[key]])),
      takeaway: coreRationale,
      ...metadata
    };
  });

  questions.sort((a, b) => a.questionNumber - b.questionNumber);
  if (questions.some((question, index) => question.questionNumber !== index + 1)) {
    throw new Error(`Module ${moduleId}: question numbering is duplicated or incomplete.`);
  }
  if (new Set(questions.map(question => question.id)).size !== 50) {
    throw new Error(`Module ${moduleId}: question IDs are not unique.`);
  }
  return questions;
}

const bankLoadPromises = new Map();
export function loadQuizNexusBank(moduleId) {
  if (bankLoadPromises.has(moduleId)) return bankLoadPromises.get(moduleId);
  const sourcePath = QUIZ_NEXUS_SOURCE_FILES[moduleId];
  if (!sourcePath) return Promise.reject(new Error(`No source bank is registered for Module ${moduleId}.`));
  const promise = fetch(sourcePath, { cache: 'force-cache' }).then(response => {
    if (!response.ok) throw new Error(`Could not load Module ${moduleId} source bank (${response.status}).`);
    return response.text();
  }).then(text => {
    const bank = parseQuizNexusSource(text, moduleId);
    const validation = validateQuizNexusBank(moduleId, bank);
    if (!validation.valid) throw new Error(`Module ${moduleId} bank validation failed: ${validation.errors.join(' ')}`);
    const chapterCounts = bank.reduce((counts, question) => {
      const key = question.chapter == null ? 'unmapped' : `Ch ${question.chapter}`;
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {});
    console.info(`[Quiz Nexus] Module ${moduleId}: loaded and validated ${bank.length} original practice questions; curriculum mapping ${JSON.stringify(chapterCounts)}.`);
    return bank;
  }).catch(error => {
    bankLoadPromises.delete(moduleId);
    console.error(`[Quiz Nexus] Module ${moduleId} bank import failed.`, error);
    throw error;
  });
  bankLoadPromises.set(moduleId, promise);
  return promise;
}

export function validateQuizNexusBank(moduleId, bank) {
  const errors = [];
  if (!Array.isArray(bank) || bank.length !== 50) errors.push(`expected 50 questions, received ${Array.isArray(bank) ? bank.length : 'no bank'}.`);
  if (!Array.isArray(bank)) return { valid: false, errors };
  const seen = new Set();
  bank.forEach((question, index) => {
    const label = `Q${index + 1}`;
    if (!question || question.moduleId !== moduleId) errors.push(`${label} has a mismatched module ID.`);
    if (!question?.id || seen.has(question.id)) errors.push(`${label} has a missing or duplicate ID.`);
    if (question?.id) seen.add(question.id);
    if (question?.questionNumber !== index + 1) errors.push(`${label} is missing or out of sequence.`);
    if (typeof question?.stem !== 'string' || !question.stem.trim()) errors.push(`${label} has no stem.`);
    if (!question?.choices || CHOICE_KEYS.some(key => typeof question.choices[key] !== 'string' || !question.choices[key].trim())) errors.push(`${label} must have four non-empty A–D choices.`);
    if (!CHOICE_KEYS.includes(question?.correctChoice)) errors.push(`${label} has an invalid correct answer key.`);
    if (!question?.correctExplanation?.trim() || CHOICE_KEYS.some(key => !question?.choiceExplanations?.[key]?.trim())) errors.push(`${label} is missing a correct or option explanation.`);
    if (question?.chapter != null && !QUIZ_NEXUS_CURRICULUM[moduleId]?.some(chapter => chapter.number === question.chapter)) errors.push(`${label} has a chapter outside Module ${moduleId}'s curriculum.`);
    if (!question?.subtopic || !question?.clinicalConcept || !Array.isArray(question?.remediationKeywords)) errors.push(`${label} is missing curriculum/remediation metadata.`);
  });
  return { valid: errors.length === 0, errors };
}

// Warm all three original banks once; the in-memory promise cache is reused by
// the Nexus screens, so each registered source is fetched and parsed only once.
[1, 2, 3].forEach(moduleId => loadQuizNexusBank(moduleId).catch(() => {}));
