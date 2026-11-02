import React, { useState, useMemo, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const e = React.createElement;

export default function PracticeMidtermEngine({ 
  operatorName, 
  onBack, 
  module1Quiz, 
  module1Patho,
  module2Quiz,
  module2Patho,
  module3Quiz,
  module3Patho 
}) {
  const [gameState, setGameState] = useState('briefing'); // 'briefing', 'active', 'complete'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // [{ question, choice, correct }]
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showRationale, setShowRationale] = useState(false);
  const [lockedChoice, setLockedChoice] = useState(null);

  // Combine and shuffle questions on mount
  useEffect(() => {
    const pool = [
      ...module1Quiz.map(q => ({ ...q, source: 'Module 1 Quiz' })),
      ...module1Patho.map(q => ({ ...q, source: 'Module 1 Scenario' })),
      ...module2Quiz.map(q => ({ ...q, source: 'Module 2 Quiz' })),
      ...module2Patho.map(q => ({ ...q, source: 'Module 2 Scenario' })),
      ...module3Quiz.map(q => ({ ...q, source: 'Module 3 Quiz' })),
      ...module3Patho.map(q => ({ ...q, source: 'Module 3 Scenario' })),
    ];

    // Shuffle and pick 75
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 75);
    setShuffledQuestions(shuffled);
  }, [module1Quiz, module1Patho, module2Quiz, module2Patho, module3Quiz, module3Patho]);

  const handleAnswer = (choiceIdx) => {
    if (lockedChoice !== null) return;

    const currentQ = shuffledQuestions[currentQuestionIdx];
    const isCorrect = choiceIdx === currentQ.ans;
    
    if (isCorrect) setScore(s => s + 1);
    
    setLockedChoice(choiceIdx);
    setShowRationale(true);
    setUserAnswers([...userAnswers, { 
      idx: currentQuestionIdx,
      question: currentQ.q, 
      choice: choiceIdx, 
      correct: isCorrect,
      correctIdx: currentQ.ans,
      rationale: (currentQ.rationales && currentQ.rationales[choiceIdx]) || currentQ.rationale || 'No specific rationale provided.'
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < shuffledQuestions.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      const existing = userAnswers.find(a => a.idx === nextIdx);
      setLockedChoice(existing ? existing.choice : null);
      setShowRationale(!!existing);
    } else {
      setGameState('complete');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIdx > 0) {
      const prevIdx = currentQuestionIdx - 1;
      setCurrentQuestionIdx(prevIdx);
      const existing = userAnswers.find(a => a.idx === prevIdx);
      setLockedChoice(existing ? existing.choice : null);
      setShowRationale(!!existing);
    }
  };

  const generateMidtermPDF = () => {
    const doc = new jsPDF();
    const pageW = 210;
    const pageH = 297;
    const margin = 18;
    const contentW = pageW - margin * 2;
    let y = 0;

    const GREEN = [0, 255, 65];
    const DARK = [13, 2, 8];
    const WHITE = [255, 255, 255];
    const GRAY = [170, 170, 170];
    const RED = [255, 80, 80];
    const CYAN = [0, 229, 255];

    const drawPageBg = () => {
      doc.setFillColor(...DARK);
      doc.rect(0, 0, pageW, pageH, 'F');
      doc.setDrawColor(...GREEN);
      doc.setLineWidth(0.5);
      doc.rect(8, 8, pageW - 16, pageH - 16, 'S');
      doc.setFontSize(6);
      doc.setTextColor(...GRAY);
      doc.setFont("courier", "normal");
      doc.text('DR. MODALI LEARNING LABS // PRACTICE MIDTERM // BLOCK 1-3 COMPREHENSIVE', pageW / 2, pageH - 12, { align: 'center' });
      doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageW - margin, pageH - 12, { align: 'right' });
    };

    const newPage = () => {
      doc.addPage();
      drawPageBg();
      y = margin + 8;
    };

    const checkSpace = (needed) => {
      if (y + needed > pageH - 25) {
        newPage();
        return true;
      }
      return false;
    };

    const drawWrappedText = (text, fontSize, color, bold, indent = 0) => {
      doc.setFont("courier", bold ? "bold" : "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, contentW - indent);
      for (const line of lines) {
        checkSpace(fontSize * 0.5 + 2);
        doc.text(line, margin + indent, y);
        y += fontSize * 0.45 + 1.2;
      }
    };

    // --- COVER PAGE ---
    drawPageBg();
    y = 35;
    doc.setFont("courier", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...GREEN);
    doc.text('DR. MODALI LEARNING LABS', pageW / 2, y, { align: 'center' });
    y += 12;
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text('PRACTICE MIDTERM ASSESSMENT', pageW / 2, y, { align: 'center' });
    y += 20;

    // Student info box
    doc.setFillColor(20, 20, 20);
    doc.setDrawColor(...GREEN);
    doc.roundedRect(margin + 10, y, contentW - 20, 55, 3, 3, 'FD');
    y += 12;
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text('OPERATOR', margin + 20, y);
    doc.setTextColor(...WHITE);
    doc.setFontSize(16);
    doc.text(operatorName, margin + 20, y + 10);
    y += 18;
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text('FINAL SCORE', margin + 20, y);
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    y += 10;
    doc.setFontSize(20);
    doc.setTextColor(percentage >= 80 ? GREEN[0] : RED[0], percentage >= 80 ? GREEN[1] : RED[1], percentage >= 80 ? GREEN[2] : RED[2]);
    doc.text(`${score} / ${shuffledQuestions.length} (${percentage}%)`, margin + 20, y);
    y += 30;

    // --- QUESTION REVIEW ---
    newPage();
    doc.setFontSize(14);
    doc.setTextColor(...CYAN);
    doc.text('COMPREHENSIVE QUESTION REVIEW', margin, y);
    y += 10;

    userAnswers.forEach((ans, i) => {
      checkSpace(40);
      doc.setFontSize(9);
      doc.setTextColor(...CYAN);
      doc.text(`Q${i + 1}`, margin, y);
      y += 6;
      drawWrappedText(ans.question, 8, WHITE, false);
      
      const resultColor = ans.correct ? GREEN : RED;
      drawWrappedText(`RESULT: ${ans.correct ? 'CORRECT' : 'INCORRECT'}`, 7, resultColor, true, 4);
      drawWrappedText(`RATIONALE: ${ans.rationale}`, 7, GRAY, false, 4);
      y += 6;
      doc.setDrawColor(40, 40, 40);
      doc.line(margin, y, margin + contentW, y);
      y += 8;
    });

    doc.save(`Midterm_Report_${operatorName}.pdf`);
  };

  if (gameState === 'briefing') {
    return e('div', { className: 'midterm-screen briefing fade-in' },
      e('div', { className: 'midterm-panel' },
        e('h1', { className: 'matrix-text crt-glow' }, 'PRACTICE MIDTERM'),
        e('div', { className: 'matrix-text subtitle' }, 'BLOCK 1-3 COMPREHENSIVE ASSESSMENT'),
        e('div', { className: 'briefing-stats' },
          e('div', null, 'TOTAL QUESTIONS: 75'),
          e('div', null, 'TIME LIMIT: UNLIMITED'),
          e('div', null, 'PASSING SCORE: 80%')
        ),
        e('p', { className: 'briefing-text' }, 
          "This exam pulls randomly from the entire clinical database of Modules 1, 2, and 3. " +
          "Focus on the mechanism of disease. Each question will provide a detailed rationale upon selection."
        ),
        e('button', { className: 'btn-cyber mission-start-btn', onClick: () => setGameState('active') }, 'START EXAM [SPACE]')
      )
    );
  }

  if (gameState === 'active') {
    const q = shuffledQuestions[currentQuestionIdx];
    const existing = userAnswers.find(a => a.idx === currentQuestionIdx);
    const isLocked = existing !== null && existing !== undefined;
    const currentLockedChoice = existing ? existing.choice : lockedChoice;

    return e('div', { className: 'midterm-screen active fade-in' },
      e('div', { className: 'midterm-hud' },
        e('div', { className: 'hud-left' },
          e('div', { className: 'matrix-text' }, `QUESTION ${currentQuestionIdx + 1} / ${shuffledQuestions.length}`),
          e('div', { className: 'source-tag' }, q.source)
        ),
        e('div', { className: 'hud-right' },
          e('div', { className: 'matrix-text' }, `SCORE: ${score}`)
        )
      ),
      e('div', { className: 'midterm-question-area' },
        e('div', { className: 'question-card' },
          e('div', { className: 'quiz-nav-row', style: { marginBottom: '20px' } },
            e('button', { className: 'btn-cyber-small', disabled: currentQuestionIdx === 0, onClick: prevQuestion }, '← PREV QUESTION'),
            e('div', { className: 'matrix-text' }, isLocked ? 'RESULT LOGGED' : 'PENDING ANALYSIS'),
            e('button', { className: 'btn-cyber-small', disabled: !isLocked && currentQuestionIdx === userAnswers.length, onClick: nextQuestion }, 'NEXT QUESTION →')
          ),
          e('p', { className: 'question-text' }, q.q),
          e('div', { className: 'options-grid' },
            q.opts.map((opt, i) => {
              let cls = 'btn-cyber option-btn';
              if (isLocked) {
                if (i === q.ans) cls += ' correct';
                else if (i === currentLockedChoice) cls += ' wrong';
                if (i === currentLockedChoice) cls += ' locked-selection';
              }
              return e('button', { 
                key: i, 
                className: cls, 
                onClick: () => {
                    if (!isLocked) handleAnswer(i);
                    // Allow clicking any option after locked to see rationale if we add rationale browsing here
                } 
              }, 
                e('span', { className: 'opt-index' }, String.fromCharCode(65 + i)),
                e('span', { className: 'opt-label' }, opt),
                isLocked && i === currentLockedChoice && e('span', { className: 'quiz-your-answer-badge', style: { marginLeft: 'auto' } }, 'YOUR PICK'),
                isLocked && i === q.ans && e('span', { className: 'quiz-correct-badge', style: { marginLeft: 'auto' } }, 'CORRECT')
              );
            })
          ),
          isLocked && e('div', { className: 'rationale-box fade-in' },
            e('div', { className: 'rationale-header matrix-text' }, 'MECHANISM RATIONALE'),
            e('p', null, (q.rationales && q.rationales[currentLockedChoice]) || q.rationale || 'N/A'),
            e('button', { className: 'btn-cyber next-btn', onClick: nextQuestion, autoFocus: true }, 'CONTINUE [ENTER]')
          )
        )
      )
    );
  }

  if (gameState === 'complete') {
    const scorePct = Math.round((score / shuffledQuestions.length) * 100);
    const passed = scorePct >= 80;

    return e('div', { className: 'midterm-screen complete fade-in' },
      e('div', { className: 'results-panel' },
        e('h1', { className: 'matrix-text crt-glow' }, passed ? 'EXAM PASSED' : 'EXAM FAILED'),
        e('div', { className: 'final-score' }, `${scorePct}%`),
        e('div', { className: 'score-details' }, `${score} Correct / ${shuffledQuestions.length} Total`),
        e('div', { className: 'actions' },
          e('button', { className: 'btn-cyber', onClick: generateMidtermPDF }, 'DOWNLOAD DETAILED REPORT'),
          e('button', { className: 'btn-cyber', onClick: onBack }, 'RETURN TO HUB')
        )
      )
    );
  }

  return null;
}
