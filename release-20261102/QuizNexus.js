import React, { useEffect, useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import {
  QUIZ_NEXUS_CONFIG,
  QUIZ_NEXUS_CURRICULUM,
  loadQuizNexusBank,
  validateQuizNexusBank
} from './QuizNexusData.js';

const e = React.createElement;
const CHOICE_KEYS = ['A', 'B', 'C', 'D'];
const TOTAL_QUESTIONS = 50;
const CORRECT_REACTIONS = ['Brilliant!', 'Excellent reasoning!', 'Wonderful work!', "You've got it!", "That's the mechanism!"];
const INCORRECT_REACTIONS = ["Let's understand why!", "Here's the key concept!", "Let's investigate!", 'Every question teaches us something!'];

function makeStorageKey(moduleId, studentName) {
  const identity = (studentName || 'GUEST_STUDENT').trim().toLocaleLowerCase();
  return `DR_MODALI_QUIZ_NEXUS_M${moduleId}_${encodeURIComponent(identity)}`;
}

function loadProgress(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || 'null');
    if (parsed && Array.isArray(parsed.attempts)) return parsed;
  } catch (error) {
    console.warn('Quiz Nexus progress could not be loaded.', error);
  }
  return { attempts: [], activeAttemptId: null };
}

function countCorrect(questions, answers) {
  return questions.reduce((sum, question, index) => sum + (answers[index] === question.correctChoice ? 1 : 0), 0);
}

function sanitizeFilename(value) {
  return (value || 'Student').normalize('NFKD').replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 48) || 'Student';
}

function performanceSummary(percentage) {
  if (percentage >= 90) return 'Strong performance across this completed set of assessed practice questions. Continue using the item review to consolidate mechanisms; this result alone does not establish mastery beyond the content assessed here.';
  if (percentage >= 75) return 'A solid foundation is demonstrated on this practice set. Targeted review of the missed concepts below can strengthen clinical discrimination.';
  if (percentage >= 60) return 'This attempt identifies several concepts that would benefit from focused review. Use the question-level explanations and prioritized learning plan below.';
  return 'This attempt provides useful diagnostic information. Work through the prioritized mechanisms and compare each selected distractor with the supported answer before another attempt.';
}

function buildDiagnostics(moduleId, questions, answers) {
  const rows = questions.map((question, index) => ({
    question,
    number: question.questionNumber || index + 1,
    selected: answers[index] ?? null,
    isCorrect: answers[index] === question.correctChoice
  }));
  const answered = rows.filter(row => row.selected !== null);
  const correct = answered.filter(row => row.isCorrect).length;
  const percentage = answered.length ? Math.round(correct / answered.length * 100) : 0;
  const chapterGroups = new Map();
  const subtopicGroups = new Map();

  for (const row of answered) {
    const { question } = row;
    const chapterKey = question.chapter == null ? 'unclassified' : String(question.chapter);
    const chapterName = question.chapter == null ? 'Curriculum mapping not confidently classified' : `Chapter ${question.chapter} — ${question.chapterTitle}`;
    if (!chapterGroups.has(chapterKey)) chapterGroups.set(chapterKey, { key: chapterKey, chapter: question.chapter, title: chapterName, rows: [] });
    chapterGroups.get(chapterKey).rows.push(row);

    const subtopicKey = `${chapterKey}|${question.subtopic}`;
    if (!subtopicGroups.has(subtopicKey)) subtopicGroups.set(subtopicKey, {
      key: subtopicKey,
      chapter: question.chapter,
      chapterTitle: question.chapterTitle,
      subtopic: question.subtopic,
      rows: []
    });
    subtopicGroups.get(subtopicKey).rows.push(row);
  }

  const topicStats = [...subtopicGroups.values()].map(group => {
    const right = group.rows.filter(row => row.isCorrect).length;
    const missed = group.rows.filter(row => !row.isCorrect);
    return { ...group, correct: right, incorrect: missed.length, total: group.rows.length, accuracy: Math.round(right / group.rows.length * 100), missedRows: missed };
  });
  const chapters = (QUIZ_NEXUS_CURRICULUM[moduleId] || []).map(chapter => {
    const group = chapterGroups.get(String(chapter.number));
    const chapterRows = group?.rows || [];
    const right = chapterRows.filter(row => row.isCorrect).length;
    const topics = topicStats.filter(topic => topic.chapter === chapter.number);
    return {
      ...chapter,
      total: chapterRows.length,
      correct: right,
      incorrect: chapterRows.length - right,
      accuracy: chapterRows.length ? Math.round(right / chapterRows.length * 100) : null,
      questionNumbers: chapterRows.map(row => row.number),
      missedNumbers: chapterRows.filter(row => !row.isCorrect).map(row => row.number),
      strengths: topics.filter(topic => topic.total >= 2 && topic.accuracy >= 80),
      weaknesses: topics.filter(topic => topic.incorrect > 0)
    };
  });

  const strengths = topicStats
    .filter(topic => topic.total >= 2 && topic.accuracy >= 80)
    .sort((a, b) => b.accuracy - a.accuracy || b.total - a.total)
    .slice(0, 3);
  const remediation = topicStats
    .filter(topic => topic.incorrect > 0)
    .sort((a, b) => b.incorrect - a.incorrect || a.accuracy - b.accuracy || b.total - a.total);
  const priorities = remediation.slice(0, 3);
  const unclassified = chapterGroups.get('unclassified');

  return {
    rows,
    answered: answered.length,
    correct,
    incorrect: answered.length - correct,
    percentage,
    summary: performanceSummary(percentage),
    chapters,
    topicStats,
    strengths,
    remediation,
    priorities,
    unclassifiedRows: unclassified?.rows || []
  };
}

function buildLearningObjectives(topic) {
  const concept = topic.subtopic;
  const wrongRow = topic.missedRows[0];
  const selectedText = wrongRow?.question.choices[wrongRow.selected] || 'the selected option';
  const correctText = wrongRow?.question.choices[wrongRow.question.correctChoice] || 'the supported answer';
  return [
    `Explain the pathophysiological mechanism represented by ${concept}, using the clinical cues in the related question(s).`,
    `Differentiate ${selectedText} from ${correctText}; use the source explanations to identify why the distractor does not fit this scenario.`,
    `Recognize how the mechanism in ${concept} relates to the manifestations or diagnostic distinction described in the question(s).`
  ];
}

function downloadAttemptPdf({ moduleId, config, studentName, questions, attempt, analysis }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 17;
  const contentWidth = pageWidth - margin * 2;
  const bottom = pageHeight - 19;
  let y = 22;
  const completed = attempt.completedAt ? new Date(attempt.completedAt) : new Date();
  const newPage = () => {
    doc.addPage();
    y = 22;
  };
  const ensureSpace = (height = 6) => {
    if (y + height > bottom) newPage();
  };
  const writeText = (text, options = {}) => {
    const fontSize = options.fontSize ?? 9.5;
    const lineHeight = options.lineHeight ?? Math.max(4.1, fontSize * 0.47);
    const indent = options.indent ?? 0;
    const value = String(text ?? '');
    if (!value.trim()) return;
    doc.setFont('helvetica', options.bold ? 'bold' : options.italic ? 'italic' : 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(...(options.color ?? [34, 39, 43]));
    const lines = doc.splitTextToSize(value, contentWidth - indent);
    lines.forEach(line => {
      ensureSpace(lineHeight);
      doc.text(line, margin + indent, y);
      y += lineHeight;
    });
    if (options.gap) y += options.gap;
  };
  const writeLabel = (label, value, options = {}) => {
    ensureSpace(8);
    writeText(label, { fontSize: 8.3, bold: true, color: [0, 119, 46], gap: 1 });
    writeText(value, { fontSize: 9.3, ...options });
  };
  const sectionHeading = text => {
    ensureSpace(15);
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 119, 46);
    doc.text(text, margin, y);
    y += 3;
    doc.setDrawColor(0, 150, 55);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  };
  const writeBullet = (text, options = {}) => writeText(`- ${text}`, { indent: 2, ...options });
  const labelForChapter = number => {
    const match = (QUIZ_NEXUS_CURRICULUM[moduleId] || []).find(item => item.number === number);
    return match ? `Chapter ${match.number} — ${match.title}` : 'Curriculum mapping not confidently classified';
  };

  doc.setProperties({
    title: `${config.title} — ${studentName} Personalized Learning Report`,
    subject: 'HCR 240 Foundational Pathophysiology personalized practice learning report',
    author: 'Dr. Modali Learning Labs',
    creator: 'Dr. Modali Learning Labs Quiz Nexus'
  });

  // Section A — cover and performance summary.
  doc.setFillColor(11, 24, 18);
  doc.roundedRect(margin, y, contentWidth, 58, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 255, 65);
  doc.setFontSize(18);
  doc.text('DR. MODALI LEARNING LABS', margin + 7, y + 12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(235, 245, 237);
  doc.setFontSize(10.5);
  doc.text('A Day in the Life of Alfie', margin + 7, y + 21);
  doc.setFontSize(9.5);
  doc.text('HCR 240 — Foundational Pathophysiology', margin + 7, y + 29);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 255, 65);
  doc.setFontSize(12);
  doc.text(config.title, margin + 7, y + 41);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(235, 245, 237);
  doc.setFontSize(8.5);
  doc.text('PERSONALIZED EDUCATIONAL DIAGNOSTIC AND LEARNING PLAN', margin + 7, y + 50);
  y += 67;

  writeLabel('STUDENT', studentName, { fontSize: 10.5, bold: true });
  writeLabel('COMPLETION DATE', completed.toLocaleString());
  writeLabel('QUESTIONS ANSWERED', `${analysis.answered} / ${TOTAL_QUESTIONS}`);
  writeLabel('CORRECT / INCORRECT', `${analysis.correct} correct / ${analysis.incorrect} incorrect`);
  writeLabel('FINAL PERCENTAGE', `${analysis.percentage}%`, { fontSize: 12, bold: true, color: [0, 119, 46], gap: 2 });
  writeLabel('OVERALL PERFORMANCE', analysis.summary, { gap: 3 });
  writeLabel('STRONGEST ASSESSED AREAS', analysis.strengths.length
    ? analysis.strengths.map(topic => `${topic.subtopic} (${topic.correct}/${topic.total}, ${topic.accuracy}%; Q${topic.rows.map(row => row.number).join(', Q')})`).join('\n')
    : 'No knowledge area has at least two assessed questions with consistently strong responses; evidence is insufficient to identify a strongest area.', { gap: 2 });
  writeLabel('HIGHEST-PRIORITY REVIEW AREAS', analysis.priorities.length
    ? analysis.priorities.map(topic => `${topic.subtopic} — ${topic.incorrect}/${topic.total} missed; related Q${topic.missedRows.map(row => row.number).join(', Q')}`).join('\n')
    : 'No incorrect responses were recorded in this completed attempt.', { gap: 3 });

  // Section B — chapter-by-chapter performance.
  sectionHeading('SECTION B — CHAPTER-BY-CHAPTER PERFORMANCE');
  analysis.chapters.forEach(chapter => {
    writeText(`Chapter ${chapter.number} — ${chapter.title}`, { fontSize: 10, bold: true, color: [0, 91, 37], gap: 1 });
    if (!chapter.total) {
      writeText('Not assessed', { fontSize: 9, italic: true, color: [90, 98, 93], gap: 2 });
      return;
    }
    writeText(`Assessed ${chapter.total} | Correct ${chapter.correct} | Incorrect ${chapter.incorrect} | Accuracy ${chapter.accuracy}%`, { fontSize: 9, bold: true });
    writeText(`Related questions: ${chapter.questionNumbers.map(number => `Q${number}`).join(', ')}. Missed: ${chapter.missedNumbers.length ? chapter.missedNumbers.map(number => `Q${number}`).join(', ') : 'none'}.`, { fontSize: 8.7 });
    writeText(`Specific strengths: ${chapter.strengths.length ? chapter.strengths.map(topic => `${topic.subtopic} (${topic.accuracy}%, ${topic.total} items)`).join('; ') : 'No chapter subtopic has sufficient repeated evidence to identify a specific strength.'}`, { fontSize: 8.7 });
    writeText(`Review needs: ${chapter.weaknesses.length ? chapter.weaknesses.map(topic => `${topic.subtopic} (${topic.incorrect}/${topic.total} missed)`).join('; ') : 'No incorrect responses in this assessed chapter.'}`, { fontSize: 8.7, gap: 3 });
  });
  if (analysis.unclassifiedRows.length) {
    writeText(`Unclassified curriculum mapping: ${analysis.unclassifiedRows.length} assessed question(s) — ${analysis.unclassifiedRows.map(row => `Q${row.number}`).join(', ')}. These items are reported separately rather than assigned to an uncertain chapter.`, { fontSize: 8.7, gap: 3 });
  }

  // Section C — subtopic diagnostics.
  sectionHeading('SECTION C — SUBTOPIC-LEVEL DIAGNOSTICS');
  if (!analysis.topicStats.length) {
    writeText('No answered questions were available for topic-level analysis.', { fontSize: 9 });
  }
  analysis.topicStats.forEach(topic => {
    writeText(`${labelForChapter(topic.chapter)}  |  ${topic.subtopic}`, { fontSize: 9.5, bold: true, color: [0, 91, 37], gap: 1 });
    writeText(`Questions: ${topic.rows.map(row => `Q${row.number}`).join(', ')} | Correct: ${topic.correct} | Incorrect: ${topic.incorrect} | Accuracy: ${topic.accuracy}%${topic.total === 1 ? ' | Limited evidence: one item only; do not infer a broad knowledge gap.' : ''}`, { fontSize: 8.8 });
    topic.missedRows.forEach(row => {
      writeText(`Q${row.number}: selected ${row.selected} (“${row.question.choices[row.selected]}”); correct ${row.question.correctChoice} (“${row.question.choices[row.question.correctChoice]}”). ${row.question.wrongExplanations[row.selected]}`, { fontSize: 8.4, indent: 2 });
    });
    if (!topic.incorrect) writeText('Demonstrated understanding on the assessed question(s); this is evidence about this small set, not a claim of comprehensive mastery.', { fontSize: 8.5, indent: 2 });
    y += 2;
  });

  // Section D — individualized remediation.
  sectionHeading('SECTION D — PERSONALIZED REMEDIATION PLAN');
  if (!analysis.remediation.length) {
    writeText('No incorrect answers were recorded. Review the complete question explanations and revisit these assessed areas during spaced practice; no specific weakness is inferred from this attempt.', { fontSize: 9.2, gap: 3 });
  }
  analysis.remediation.forEach((topic, index) => {
    const row = topic.missedRows[0];
    const selectedKey = row.selected;
    const correctKey = row.question.correctChoice;
    writeText(`${index + 1}. TOPIC TO REVIEW — ${topic.subtopic}`, { fontSize: 10, bold: true, color: [145, 45, 35], gap: 1 });
    writeText(`${labelForChapter(topic.chapter)} | Related missed question${topic.missedRows.length === 1 ? '' : 's'}: ${topic.missedRows.map(item => `Q${item.number}`).join(', ')}. Evidence: ${topic.incorrect}/${topic.total} assessed response(s) incorrect${topic.total === 1 ? '; one item is a limited signal, not a broad conclusion.' : '.'}`, { fontSize: 8.8 });
    writeLabel('WHY THIS TOPIC MATTERS', `It connects the assessed ${topic.clinicalConcept || topic.subtopic} mechanism with clinical interpretation. The question's supplied teaching rationale is used below as the evidence; no outside student-specific assumptions are made.`, { fontSize: 8.7 });
    writeLabel('WHAT THE RECORDED RESPONSE SUGGESTS TO REVISIT', `For Q${row.number}, the recorded selection was ${selectedKey}: ${row.question.choices[selectedKey]}. The supplied explanation says: ${row.question.wrongExplanations[selectedKey]} The supported response is ${correctKey}: ${row.question.choices[correctKey]}. This contrast identifies a review opportunity; it does not establish the student's reasoning.`, { fontSize: 8.7 });
    writeLabel('WHAT EXACTLY TO STUDY', `Review ${labelForChapter(topic.chapter)} and the subtopic “${topic.subtopic}.” Revisit the tested mechanism and the scenario cues in Q${row.number}; compare the provided explanations for the selected distractor and the supported answer.`, { fontSize: 8.7 });
    writeText('LEARNING OBJECTIVES', { fontSize: 8.5, bold: true, color: [0, 119, 46], gap: 1 });
    buildLearningObjectives(topic).forEach(objective => writeBullet(objective, { fontSize: 8.5 }));
    writeText(`Supporting questions: ${topic.missedRows.map(item => `Q${item.number}`).join(', ')}.`, { fontSize: 8.5, gap: 3 });
  });

  // Section E — all original questions, choices, and explanations.
  sectionHeading('SECTION E — COMPLETE 50-QUESTION ANSWER REVIEW');
  writeText('The original stems, A–D choices, locked student responses, answer keys, detailed supplied explanations for the correct response and every alternative, teaching takeaways, and curriculum tags are included for reinforcement.', { fontSize: 8.6, color: [85, 92, 96], gap: 2 });
  questions.forEach((question, index) => {
    const selected = attempt.answers[index];
    const isCorrect = selected === question.correctChoice;
    ensureSpace(15);
    y += 2;
    doc.setFillColor(isCorrect ? 232 : 252, isCorrect ? 246 : 235, isCorrect ? 236 : 234);
    doc.roundedRect(margin, y - 4, contentWidth, 8, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.3);
    doc.setTextColor(isCorrect ? 0 : 155, isCorrect ? 105 : 45, isCorrect ? 42 : 38);
    doc.text(`QUESTION ${question.questionNumber || index + 1}  |  ${isCorrect ? 'CORRECT' : 'INCORRECT'}`, margin + 3, y + 1.3);
    y += 8;
    writeText(question.stem, { fontSize: 9.5, bold: true, color: [24, 30, 34], gap: 1 });
    CHOICE_KEYS.forEach(key => {
      const tags = [key === selected ? 'YOUR ANSWER' : '', key === question.correctChoice ? 'CORRECT ANSWER' : ''].filter(Boolean).join(' | ');
      writeText(`${key}. ${question.choices[key]}${tags ? `  [${tags}]` : ''}`, {
        fontSize: 8.5,
        bold: key === selected || key === question.correctChoice,
        indent: 2,
        color: key === question.correctChoice ? [0, 110, 45] : (key === selected && !isCorrect ? [145, 45, 35] : [42, 48, 52])
      });
    });
    writeLabel(`WHY ${question.correctChoice} IS CORRECT`, question.correctExplanation, { fontSize: 8.4, color: [35, 45, 38] });
    CHOICE_KEYS.filter(key => key !== question.correctChoice).forEach(key => {
      writeLabel(`WHY ${key} IS INCORRECT${key === selected ? ' — YOUR SELECTED DISTRACTOR' : ''}`, question.wrongExplanations[key], {
        fontSize: 8.25,
        color: key === selected ? [125, 43, 36] : [52, 54, 56]
      });
    });
    if (question.takeaway) writeLabel('CLINICAL TAKEAWAY', question.takeaway, { fontSize: 8.4, color: [0, 100, 45] });
    writeLabel('CURRICULUM', `${labelForChapter(question.chapter)} | ${question.subtopic} | Clinical concept: ${question.clinicalConcept}`, { fontSize: 8.2 });
    y += 2;
  });

  // Section F — prioritized study checklist.
  sectionHeading('SECTION F — PERSONALIZED FINAL STUDY CHECKLIST');
  writeText('Prioritize missed concepts first. A single missed item is marked as limited evidence and should prompt focused review, not a conclusion about overall ability.', { fontSize: 8.8, gap: 3 });
  if (!analysis.remediation.length) writeText('[ ] Revisit the supplied explanations for all 50 assessed items using spaced retrieval; no missed-topic checklist items were inferred.', { fontSize: 9, gap: 3 });
  analysis.remediation.forEach((topic, index) => {
    writeText(`${index + 1}. ${labelForChapter(topic.chapter)} — ${topic.subtopic}`, { fontSize: 9.3, bold: true, color: [0, 91, 37], gap: 1 });
    writeText(`Evidence: ${topic.incorrect}/${topic.total} incorrect; Q${topic.missedRows.map(row => row.number).join(', Q')}${topic.total === 1 ? ' (one question; limited evidence)' : ''}.`, { fontSize: 8.4 });
    buildLearningObjectives(topic).forEach(objective => writeText(`[ ] ${objective}`, { fontSize: 8.5, indent: 2 }));
    y += 2;
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    doc.setDrawColor(180, 194, 184);
    doc.setLineWidth(0.25);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(95, 105, 99);
    doc.text('Dr. Modali Learning Labs  |  HCR 240 Pathophysiology', margin, pageHeight - 9);
    doc.text(`Page ${page} of ${totalPages}`, pageWidth - margin, pageHeight - 9, { align: 'right' });
  }
  doc.save(`Dr_Modali_Module_${moduleId}_Student_Learning_Report_${sanitizeFilename(studentName)}.pdf`);
}

export default function QuizNexus({ moduleId, operatorName, onBack, onMusicChange, musicOn, onMusicToggle, volume, onVolumeChange }) {
  const config = QUIZ_NEXUS_CONFIG[moduleId];
  const studentName = (operatorName || '').trim() || 'GUEST_STUDENT';
  const storageKey = useMemo(() => makeStorageKey(moduleId, studentName), [moduleId, studentName]);
  const [questions, setQuestions] = useState([]);
  const [bankStatus, setBankStatus] = useState('loading');
  const [bankError, setBankError] = useState('');
  const [progress, setProgress] = useState(() => loadProgress(storageKey));
  const [view, setView] = useState(() => {
    const saved = loadProgress(storageKey);
    const active = saved.attempts.find(item => item.id === saved.activeAttemptId);
    return active ? (active.completedAt ? 'results' : 'question') : 'landing';
  });
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    let mounted = true;
    setBankStatus('loading');
    setBankError('');
    loadQuizNexusBank(moduleId).then(bank => {
      if (!mounted) return;
      setQuestions(bank);
      setBankStatus('ready');
    }).catch(error => {
      if (!mounted) return;
      setBankError(error?.message || 'The original question bank could not be imported.');
      setBankStatus('error');
    });
    return () => { mounted = false; };
  }, [moduleId]);

  const bankValidation = validateQuizNexusBank(moduleId, questions);
  const bankReady = bankStatus === 'ready' && bankValidation.valid;
  const activeAttempt = progress.attempts.find(item => item.id === progress.activeAttemptId) || null;
  const selectedCount = activeAttempt ? activeAttempt.answers.filter(answer => answer !== null).length : 0;
  const correctCount = activeAttempt ? countCorrect(questions, activeAttempt.answers) : 0;
  const accuracy = selectedCount ? Math.round(correctCount / selectedCount * 100) : 0;
  const currentIndex = activeAttempt ? Math.max(0, Math.min(TOTAL_QUESTIONS - 1, activeAttempt.currentIndex || 0)) : 0;
  const currentQuestion = bankReady ? questions[currentIndex] : null;
  const currentAnswer = activeAttempt && currentQuestion ? activeAttempt.answers[currentIndex] : null;
  const completedAnalysis = useMemo(() => activeAttempt?.completedAt && bankReady
    ? buildDiagnostics(moduleId, questions, activeAttempt.answers)
    : null, [activeAttempt, bankReady, moduleId, questions]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch (error) {
      console.warn('Quiz Nexus progress could not be saved in this browser.', error);
    }
  }, [storageKey, progress]);

  useEffect(() => {
    if (onMusicChange && config) onMusicChange(config.soundtrack);
    return () => { if (onMusicChange) onMusicChange(null); };
  }, [config, onMusicChange]);

  const retryBankLoad = () => {
    setBankStatus('loading');
    setBankError('');
    loadQuizNexusBank(moduleId).then(bank => {
      setQuestions(bank);
      setBankStatus('ready');
    }).catch(error => {
      setBankError(error?.message || 'The original question bank could not be imported.');
      setBankStatus('error');
    });
  };

  const beginAttempt = () => {
    if (!bankReady) return;
    if (activeAttempt && !window.confirm('Start a new attempt? Your completed or in-progress attempt will be preserved in your saved attempt history.')) return;
    const attempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      moduleId,
      studentName,
      answers: new Array(TOTAL_QUESTIONS).fill(null),
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      completedAt: null
    };
    setProgress(previous => ({ attempts: [...previous.attempts, attempt], activeAttemptId: attempt.id }));
    setReaction(null);
    setView('question');
  };

  const selectSavedAttempt = attempt => {
    setProgress(previous => ({ ...previous, activeAttemptId: attempt.id }));
    setView(attempt.completedAt ? 'results' : 'question');
  };

  const updateCurrentIndex = nextIndex => {
    if (!activeAttempt) return;
    const clamped = Math.max(0, Math.min(TOTAL_QUESTIONS - 1, nextIndex));
    setProgress(previous => ({
      ...previous,
      attempts: previous.attempts.map(item => item.id === activeAttempt.id ? { ...item, currentIndex: clamped } : item)
    }));
  };

  const lockAnswer = choice => {
    if (!activeAttempt || !currentQuestion || currentAnswer !== null || activeAttempt.completedAt || !CHOICE_KEYS.includes(choice)) return;
    const isCorrect = choice === currentQuestion.correctChoice;
    const messageList = isCorrect ? CORRECT_REACTIONS : INCORRECT_REACTIONS;
    setReaction({ questionIndex: currentIndex, message: messageList[Math.floor(Math.random() * messageList.length)], isCorrect });
    setProgress(previous => ({
      ...previous,
      attempts: previous.attempts.map(item => {
        if (item.id !== activeAttempt.id || item.answers[currentIndex] !== null) return item;
        const answers = [...item.answers];
        answers[currentIndex] = choice;
        const isComplete = answers.every(answer => answer !== null);
        return { ...item, answers, completedAt: isComplete ? new Date().toISOString() : item.completedAt };
      })
    }));
    if (activeAttempt.answers.filter(answer => answer !== null).length === TOTAL_QUESTIONS - 1) setView('results');
  };

  const goBackToPortal = () => {
    if (onMusicChange) onMusicChange(null);
    onBack && onBack();
  };

  const renderAudioControls = () => e('div', { className: 'qn-audio-controls', 'aria-label': 'Soundtrack controls' },
    e('button', {
      type: 'button', className: 'qn-audio-toggle', onClick: onMusicToggle,
      'aria-pressed': !!musicOn, title: musicOn ? 'Mute soundtrack' : 'Unmute soundtrack'
    }, musicOn ? 'SOUND ON' : 'SOUND OFF'),
    e('label', { className: 'qn-volume-label' },
      e('span', null, 'VOLUME'),
      e('input', {
        type: 'range', min: 0, max: 1, step: 0.01, value: volume,
        onChange: event => onVolumeChange && onVolumeChange(Number(event.target.value)),
        'aria-label': 'Soundtrack volume'
      })
    )
  );

  const renderAttemptHistory = () => progress.attempts.length > 1 && e('section', { className: 'qn-attempt-history' },
    e('h2', null, 'SAVED ATTEMPTS'),
    progress.attempts.slice().reverse().map((attempt, index) => {
      const score = countCorrect(questions, attempt.answers);
      const current = attempt.id === activeAttempt?.id;
      return e('button', {
        key: attempt.id, type: 'button', className: 'qn-history-item', disabled: current,
        onClick: () => selectSavedAttempt(attempt)
      },
        e('span', null, `${attempt.completedAt ? 'COMPLETED' : 'IN PROGRESS'} ATTEMPT ${progress.attempts.length - index}`),
        e('strong', null, attempt.completedAt ? `${score}/50 (${Math.round(score / 50 * 100)}%)` : `${attempt.answers.filter(answer => answer !== null).length}/50 answered`),
        e('span', null, current ? 'CURRENT VIEW' : attempt.completedAt ? 'OPEN SAVED RESULTS' : 'RESUME SAVED ATTEMPT')
      );
    })
  );

  const renderLanding = () => e('main', { className: 'qn-main qn-landing' },
    e('div', { className: 'qn-landing-audio' }, renderAudioControls()),
    e('section', { className: 'qn-panel qn-intro-panel' },
      e('div', { className: 'qn-kicker' }, 'HCR 240  //  FOUNDATIONAL PATHOPHYSIOLOGY'),
      e('h1', null, config.title),
      e('p', { className: 'qn-lead' }, `Welcome, ${studentName}. This student-specific practice environment saves responses automatically, locks each answer for the attempt, and preserves completed reports.`),
      bankReady ? e(React.Fragment, null,
        e('p', null, 'Fifty original practice questions will be presented one at a time. Explanations remain hidden until you submit each answer.'),
        e('button', { type: 'button', className: 'qn-primary-btn', onClick: beginAttempt }, activeAttempt ? 'START A NEW ATTEMPT' : 'BEGIN 50-QUESTION NEXUS')
      ) : bankStatus === 'loading' ? e('div', { className: 'qn-content-pending', role: 'status' },
        e('strong', null, 'IMPORTING ORIGINAL PRACTICE QUESTION BANK'),
        e('p', null, 'Reading and validating the registered UTF-8 source bank. Questions are not replaced or invented.'),
        e('div', { className: 'qn-bank-progress' }, 'QUESTION BANK: VALIDATING SOURCE RECORDS…')
      ) : e('div', { className: 'qn-content-pending qn-import-error', role: 'alert' },
        e('strong', null, 'ORIGINAL QUESTION BANK COULD NOT BE VALIDATED'),
        e('p', null, bankError || bankValidation.errors.join(' ')),
        e('button', { type: 'button', className: 'qn-secondary-btn', onClick: retryBankLoad }, 'RETRY SOURCE IMPORT')
      ),
      activeAttempt && bankReady && e('button', {
        type: 'button', className: 'qn-primary-btn qn-resume-btn',
        onClick: () => setView(activeAttempt.completedAt ? 'results' : 'question')
      }, activeAttempt.completedAt ? 'VIEW SAVED RESULTS AND DOWNLOAD REPORT' : 'RESUME SAVED ATTEMPT'),
      activeAttempt && e('div', { className: 'qn-saved-banner' },
        activeAttempt.completedAt ? `Saved completed attempt available: ${selectedCount}/50 answers. Results and PDF can be opened again at any time.` : `Saved progress found: ${selectedCount}/50 answered. Resume without losing your locked responses.`
      ),
      renderAttemptHistory(),
      e('button', { type: 'button', className: 'qn-secondary-btn', onClick: goBackToPortal }, '← RETURN TO CAMPUS HUB')
    )
  );

  const renderProgressStats = () => e('div', { className: 'qn-stats-row', 'aria-live': 'polite' },
    e('div', null, e('span', null, 'STUDENT'), e('strong', null, studentName)),
    e('div', null, e('span', null, 'ANSWERED'), e('strong', null, `${selectedCount} / 50`)),
    e('div', null, e('span', null, 'REMAINING'), e('strong', null, `${50 - selectedCount}`)),
    e('div', null, e('span', null, 'CURRENT SCORE'), e('strong', null, `${correctCount} / 50`)),
    e('div', null, e('span', null, 'ACCURACY'), e('strong', null, `${accuracy}%`))
  );

  const renderAlfieReaction = correct => {
    const message = reaction?.questionIndex === currentIndex && reaction.isCorrect === correct
      ? reaction.message
      : (correct ? 'Brilliant!' : "Let's understand why!");
    return e('aside', { className: `qn-alfie-reaction ${correct ? 'is-correct' : 'is-incorrect'}`, key: `${currentIndex}-${currentAnswer}` },
      e('div', { className: 'qn-alfie-portrait-wrap' },
        e('img', {
          className: 'qn-alfie-portrait',
          src: correct ? 'assets/alfie_portrait_happy.webp' : 'assets/alfie_portrait_surprised.webp',
          alt: correct ? 'Alfie smiling excitedly' : 'Alfie looking thoughtfully surprised'
        }),
        correct && e('span', { className: 'qn-sparkle qn-sparkle-one', 'aria-hidden': 'true' }, '✦'),
        correct && e('span', { className: 'qn-sparkle qn-sparkle-two', 'aria-hidden': 'true' }, '✧'),
        correct && e('span', { className: 'qn-sparkle qn-sparkle-three', 'aria-hidden': 'true' }, '✦')
      ),
      e('div', { className: 'qn-alfie-speech', 'aria-live': 'polite' },
        e('strong', null, message),
        e('span', null, correct ? 'Alfie celebrates your reasoning.' : 'Alfie is ready to point out the key concept.')
      )
    );
  };

  const renderQuestion = () => {
    if (!activeAttempt || !currentQuestion) return renderLanding();
    const correct = currentAnswer === currentQuestion.correctChoice;
    return e('main', { className: 'qn-main qn-question-view' },
      e('header', { className: 'qn-header' },
        e('div', null, e('div', { className: 'qn-kicker' }, `MODULE ${moduleId}  //  QUIZ NEXUS`), e('h1', null, config.title)),
        renderAudioControls()
      ),
      renderProgressStats(),
      e('div', { className: 'qn-progress-track', role: 'progressbar', 'aria-valuenow': selectedCount, 'aria-valuemin': 0, 'aria-valuemax': 50 },
        e('div', { className: 'qn-progress-fill', style: { width: `${selectedCount * 2}%` } })
      ),
      e('section', { className: 'qn-panel qn-question-panel', key: currentQuestion.id },
        e('div', { className: 'qn-question-label' }, `QUESTION ${currentQuestion.questionNumber} OF 50${currentAnswer !== null ? '  //  RESPONSE LOCKED' : ''}`),
        e('h2', null, currentQuestion.stem),
        e('div', { className: 'qn-choice-list' }, CHOICE_KEYS.map(key => {
          const chosen = currentAnswer === key;
          const isCorrectChoice = currentAnswer !== null && currentQuestion.correctChoice === key;
          return e('button', {
            type: 'button', key,
            className: `qn-choice ${chosen ? 'is-selected' : ''} ${isCorrectChoice ? 'is-correct' : ''} ${currentAnswer !== null && chosen && !correct ? 'is-wrong' : ''}`,
            disabled: currentAnswer !== null || !!activeAttempt.completedAt,
            onClick: () => lockAnswer(key),
            'aria-pressed': chosen
          },
            e('span', { className: 'qn-choice-letter' }, key),
            e('span', { className: 'qn-choice-copy' }, currentQuestion.choices[key]),
            isCorrectChoice && e('span', { className: 'qn-answer-tag' }, 'CORRECT ANSWER'),
            chosen && e('span', { className: 'qn-answer-tag' }, 'YOUR LOCKED ANSWER')
          );
        })),
        currentAnswer !== null && e(React.Fragment, null,
          renderAlfieReaction(correct),
          e('div', { className: `qn-feedback ${correct ? 'feedback-correct' : 'feedback-incorrect'}`, 'aria-live': 'polite' },
            e('h3', null, correct ? '✓ CORRECT — RESPONSE LOCKED' : '✕ INCORRECT — RESPONSE LOCKED'),
            e('div', { className: 'qn-explanation-block' },
              e('h4', null, `CORRECT ANSWER: ${currentQuestion.correctChoice} — ${currentQuestion.choices[currentQuestion.correctChoice]}`),
              e('p', null, currentQuestion.correctExplanation)
            ),
            e('div', { className: 'qn-distractor-grid' }, CHOICE_KEYS.filter(key => key !== currentQuestion.correctChoice).map(key => e('article', { className: 'qn-distractor', key },
              e('h4', null, `WHY ${key} IS INCORRECT${key === currentAnswer ? ' — YOUR SELECTION' : ''}`),
              e('p', null, currentQuestion.wrongExplanations[key])
            ))),
            e('div', { className: 'qn-curriculum-tag' }, `${currentQuestion.chapter == null ? 'Chapter mapping pending review' : `Chapter ${currentQuestion.chapter} — ${currentQuestion.chapterTitle}`}  |  ${currentQuestion.subtopic}`),
            currentQuestion.takeaway && e('div', { className: 'qn-takeaway' }, e('strong', null, 'CLINICAL TAKEAWAY'), e('p', null, currentQuestion.takeaway))
          )
        )
      ),
      e('nav', { className: 'qn-question-nav', 'aria-label': 'Question navigation' },
        e('button', { type: 'button', className: 'qn-secondary-btn', disabled: currentIndex === 0, onClick: () => updateCurrentIndex(currentIndex - 1) }, '← PREVIOUS'),
        e('div', { className: 'qn-number-strip' }, activeAttempt.answers.map((answer, index) => e('button', {
          type: 'button', key: index,
          className: `qn-number ${index === currentIndex ? 'is-current' : ''} ${answer !== null ? (answer === questions[index].correctChoice ? 'is-right' : 'is-wrong') : ''}`,
          onClick: () => updateCurrentIndex(index),
          'aria-label': `Go to question ${index + 1}${answer !== null ? ', answered and locked' : ', unanswered'}`
        }, index + 1))),
        e('button', { type: 'button', className: 'qn-secondary-btn', disabled: currentIndex === TOTAL_QUESTIONS - 1, onClick: () => updateCurrentIndex(currentIndex + 1) }, 'NEXT →'),
        activeAttempt.completedAt && e('button', { type: 'button', className: 'qn-primary-btn qn-results-link', onClick: () => setView('results') }, 'VIEW FINAL RESULTS')
      ),
      e('div', { className: 'qn-footer-actions' },
        e('button', { type: 'button', className: 'qn-link-btn', onClick: () => setView(activeAttempt.completedAt ? 'results' : 'landing') }, activeAttempt.completedAt ? 'VIEW COMPLETED RESULTS' : 'PAUSE AND RETURN TO NEXUS')
      )
    );
  };

  const renderResults = () => {
    if (!activeAttempt || !activeAttempt.completedAt || !bankReady || !completedAnalysis) return renderLanding();
    const analysis = completedAnalysis;
    return e('main', { className: 'qn-main qn-results-view' },
      e('header', { className: 'qn-header' },
        e('div', null, e('div', { className: 'qn-kicker' }, 'ATTEMPT COMPLETE  //  PERSONALIZED LEARNING DIAGNOSTIC'), e('h1', null, config.title)),
        renderAudioControls()
      ),
      e('section', { className: 'qn-panel qn-results-summary' },
        e('div', { className: 'qn-result-alfie' },
          e('img', { src: 'assets/alfie_portrait_happy.webp', alt: 'Alfie celebrating the completed quiz', className: 'qn-result-alfie-image' }),
          e('div', { className: 'qn-alfie-speech' }, e('strong', null, 'You made it through all 50!'), e('span', null, 'Let’s use these results to guide your next review.'))
        ),
        e('div', { className: 'qn-student-name' }, `STUDENT: ${activeAttempt.studentName}`),
        e('div', { className: 'qn-result-score' }, `${analysis.correct} / 50`),
        e('div', { className: 'qn-result-percent' }, `${analysis.percentage}%`),
        e('p', null, `Completed ${new Date(activeAttempt.completedAt).toLocaleString()}  •  ${analysis.incorrect} incorrect answers`),
        e('p', { className: 'qn-performance-summary' }, analysis.summary),
        e('div', { className: 'qn-results-columns' },
          e('section', { className: 'qn-result-diagnostic' },
            e('h2', null, 'CHAPTER PERFORMANCE'),
            analysis.chapters.map(chapter => e('div', { className: 'qn-chapter-result', key: chapter.number },
              e('strong', null, `CH ${chapter.number}: ${chapter.title}`),
              e('span', null, chapter.total ? `${chapter.correct}/${chapter.total} correct • ${chapter.accuracy}% • missed Q${chapter.missedNumbers.join(', Q') || 'none'}` : 'Not assessed')
            ))
          ),
          e('section', { className: 'qn-result-diagnostic' },
            e('h2', null, 'STRONGEST ASSESSED AREAS'),
            analysis.strengths.length ? analysis.strengths.map(topic => e('p', { key: topic.key }, `${topic.subtopic} — ${topic.correct}/${topic.total} correct (${topic.accuracy}%).`)) : e('p', null, 'Insufficient repeated evidence to identify a strongest area (requires at least two questions).'),
            e('h2', { className: 'qn-priority-heading' }, 'PRIORITY REVIEW AREAS'),
            analysis.priorities.length ? analysis.priorities.map(topic => e('p', { className: 'qn-priority-item', key: topic.key }, `${topic.subtopic} — ${topic.incorrect}/${topic.total} missed; Q${topic.missedRows.map(row => row.number).join(', Q')}${topic.total === 1 ? ' (limited evidence)' : ''}.`)) : e('p', null, 'No incorrect responses; review all supplied explanations for reinforcement.')
          )
        ),
        e('div', { className: 'qn-result-actions' },
          e('button', { type: 'button', className: 'qn-primary-btn qn-pdf-btn', onClick: () => downloadAttemptPdf({ moduleId, config, studentName: activeAttempt.studentName, questions, attempt: activeAttempt, analysis }) }, 'DOWNLOAD MY PERSONALIZED LEARNING REPORT — PDF'),
          e('button', { type: 'button', className: 'qn-secondary-btn', onClick: () => setView('question') }, 'REVIEW ALL QUESTIONS'),
          e('button', { type: 'button', className: 'qn-secondary-btn', onClick: beginAttempt }, 'START A NEW ATTEMPT')
        )
      ),
      e('section', { className: 'qn-review-list', 'aria-label': 'Complete question-by-question review' },
        e('h2', { className: 'qn-review-title' }, 'COMPLETE QUESTION-BY-QUESTION REVIEW'),
        questions.map((question, index) => {
          const selected = activeAttempt.answers[index];
          const wasCorrect = selected === question.correctChoice;
          return e('article', { className: 'qn-panel qn-review-card', key: question.id },
            e('div', { className: `qn-review-status ${wasCorrect ? 'feedback-correct' : 'feedback-incorrect'}` }, `QUESTION ${question.questionNumber} — ${wasCorrect ? 'CORRECT' : 'INCORRECT'}`),
            e('h3', null, question.stem),
            e('div', { className: 'qn-review-choices' }, CHOICE_KEYS.map(key => e('p', {
              key,
              className: `${key === question.correctChoice ? 'review-correct-choice' : ''} ${key === selected ? 'review-selected-choice' : ''}`
            }, `${key}. ${question.choices[key]}${key === selected ? ' — YOUR ANSWER' : ''}${key === question.correctChoice ? ' — CORRECT ANSWER' : ''}`))),
            e('div', { className: 'qn-explanation-block' }, e('h4', null, `WHY ${question.correctChoice} IS CORRECT`), e('p', null, question.correctExplanation)),
            CHOICE_KEYS.filter(key => key !== question.correctChoice).map(key => e('div', { className: 'qn-review-rationale', key },
              e('h4', null, `WHY ${key} IS INCORRECT${key === selected ? ' — YOUR SELECTION' : ''}`), e('p', null, question.wrongExplanations[key])
            )),
            e('div', { className: 'qn-curriculum-tag' }, `${question.chapter == null ? 'Chapter mapping pending review' : `Chapter ${question.chapter} — ${question.chapterTitle}`}  |  ${question.subtopic}  |  Clinical concept: ${question.clinicalConcept}`),
            question.takeaway && e('div', { className: 'qn-takeaway' }, e('strong', null, 'CLINICAL TAKEAWAY'), e('p', null, question.takeaway))
          );
        })
      ),
      e('div', { className: 'qn-bottom-nav' },
        e('button', { type: 'button', className: 'qn-secondary-btn', onClick: () => setView('question') }, 'BACK TO QUESTION NAVIGATION'),
        e('button', { type: 'button', className: 'qn-secondary-btn', onClick: goBackToPortal }, 'RETURN TO CAMPUS HUB')
      )
    );
  };

  if (!config) return e('main', { className: 'quiz-nexus' }, e('p', null, 'Quiz Nexus module configuration not found.'));
  return e('div', { className: 'quiz-nexus', key: `${moduleId}-${studentName}` },
    e('div', { className: 'qn-topbar' },
      e('button', { type: 'button', className: 'qn-secondary-btn', onClick: goBackToPortal }, '← CAMPUS HUB')
    ),
    view === 'question' ? renderQuestion() : view === 'results' ? renderResults() : renderLanding()
  );
}
