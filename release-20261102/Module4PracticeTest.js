
import React, { useState, useEffect, useCallback } from 'react';
import { MODULE4_PRACTICE_TEST_DATA } from './Module4PracticeTestData.js';

const e = React.createElement;

export default function Module4PracticeTest({ onBack, onMusicChange }) {
    const [gameState, setGameState] = useState('intro'); // 'intro', 'exam', 'submit', 'results', 'review'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(new Array(MODULE4_PRACTICE_TEST_DATA.length).fill(null));
    const [reviewIndex, setReviewIndex] = useState(0);

    // Initial Music
    useEffect(() => {
        if (onMusicChange) {
            onMusicChange("assets/rag2ruski.mp3");
        }
    }, [onMusicChange]);

    const handleKeyDown = useCallback((ev) => {
        if (gameState === 'intro') {
            if (ev.code === 'Space' || ev.code === 'Enter') {
                setGameState('exam');
            }
        } else if (gameState === 'exam') {
            if (ev.key === 'a' || ev.key === 'A') handleSelect(0);
            if (ev.key === 'b' || ev.key === 'B') handleSelect(1);
            if (ev.key === 'c' || ev.key === 'C') handleSelect(2);
            if (ev.key === 'd' || ev.key === 'D') handleSelect(3);
            if (ev.code === 'ArrowRight' || ev.code === 'KeyD') nextQuestion();
            if (ev.code === 'ArrowLeft' || ev.code === 'KeyA') prevQuestion();
        }
    }, [gameState, currentQuestionIndex, answers]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const handleSelect = (index) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = index;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < MODULE4_PRACTICE_TEST_DATA.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameState('submit');
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateResults = () => {
        let correct = 0;
        answers.forEach((ans, idx) => {
            if (ans === MODULE4_PRACTICE_TEST_DATA[idx].ans) {
                correct++;
            }
        });
        const total = MODULE4_PRACTICE_TEST_DATA.length;
        const percentage = Math.round((correct / total) * 100);
        let rating = "Needs Improvement";
        if (percentage >= 90) rating = "Excellent";
        else if (percentage >= 80) rating = "Good";
        else if (percentage >= 70) rating = "Fair";

        return { correct, total, percentage, rating };
    };

    const renderIntro = () => {
        return e('div', { className: 'practice-test-screen fade-in' },
            e('div', { className: 'rpg-box intro-box' },
                e('h1', { className: 'matrix-text' }, 'Module 4 Practice Test'),
                e('div', { className: 'intro-text' },
                    e('p', null, 'Welcome to the Module 4 Practice Test.'),
                    e('p', null, 'This practice examination reviews the entire Module 4 learning guide, including musculoskeletal disorders, bone physiology, cartilage, connective tissue disorders, infection, degeneration, inflammation, and metabolic disease.'),
                    e('p', null, 'Select the best answer for each question.'),
                    e('p', null, 'Good luck.'),
                    e('div', { className: 'blink-text', style: { marginTop: '40px', color: '#00ff41' } }, 'Press Spacebar to begin.')
                )
            )
        );
    };

    const renderExam = () => {
        const q = MODULE4_PRACTICE_TEST_DATA[currentQuestionIndex];
        const answeredCount = answers.filter(a => a !== null).length;
        const progressPercent = (answeredCount / MODULE4_PRACTICE_TEST_DATA.length) * 100;

        return e('div', { className: 'practice-test-screen fade-in' },
            e('div', { className: 'exam-header' },
                e('div', { className: 'q-count' }, `Question ${currentQuestionIndex + 1} of ${MODULE4_PRACTICE_TEST_DATA.length}`),
                e('div', { className: 'progress-container' },
                    e('div', { className: 'progress-bar', style: { width: `${progressPercent}%` } })
                ),
                e('div', { className: 'stats-row' },
                    e('span', null, `Answered: ${answeredCount}`),
                    e('span', null, `Remaining: ${MODULE4_PRACTICE_TEST_DATA.length - answeredCount}`)
                )
            ),
            e('div', { className: 'rpg-dialogue-window' },
                e('div', { className: 'question-text' }, q.q)
            ),
            e('div', { className: 'options-container' },
                q.opts.map((opt, idx) => e('button', {
                    key: idx,
                    className: `option-btn ${answers[currentQuestionIndex] === idx ? 'selected' : ''}`,
                    onClick: () => handleSelect(idx)
                },
                    e('span', { className: 'option-letter' }, String.fromCharCode(65 + idx)),
                    e('span', { className: 'option-text' }, opt)
                ))
            ),
            e('div', { className: 'nav-controls' },
                e('button', { className: 'nav-btn', onClick: prevQuestion, disabled: currentQuestionIndex === 0 }, 'PREVIOUS'),
                e('button', { className: 'nav-btn hub-btn', onClick: onBack }, 'HUB'),
                e('button', { className: 'nav-btn', onClick: nextQuestion }, 
                    currentQuestionIndex === MODULE4_PRACTICE_TEST_DATA.length - 1 ? 'FINISH' : 'NEXT'
                )
            )
        );
    };

    const renderSubmit = () => {
        return e('div', { className: 'practice-test-screen fade-in' },
            e('div', { className: 'rpg-box centered' },
                e('h2', { className: 'matrix-text' }, 'Finish Practice Test'),
                e('p', null, 'Are you sure you want to submit your practice test?'),
                e('div', { className: 'submit-controls' },
                    e('button', { className: 'confirm-btn', onClick: () => setGameState('results') }, 'SUBMIT'),
                    e('button', { className: 'cancel-btn', onClick: () => setGameState('exam') }, 'RETURN TO EXAM')
                )
            )
        );
    };

    const renderResults = () => {
        const res = calculateResults();
        return e('div', { className: 'practice-test-screen fade-in' },
            e('div', { className: 'rpg-box results-box' },
                e('h2', { className: 'matrix-text' }, 'Test Results'),
                e('div', { className: 'result-grid' },
                    e('div', { className: 'res-item' }, e('label', null, 'Correct:'), e('span', null, res.correct)),
                    e('div', { className: 'res-item' }, e('label', null, 'Incorrect:'), e('span', null, res.total - res.correct)),
                    e('div', { className: 'res-item' }, e('label', null, 'Percentage:'), e('span', { className: 'big-score' }, `${res.percentage}%`)),
                    e('div', { className: 'res-item' }, e('label', null, 'Rating:'), e('span', { className: 'rating-text' }, res.rating))
                ),
                e('div', { className: 'post-results-nav' },
                    e('button', { className: 'nav-btn review-btn', onClick: () => setGameState('review') }, 'REVIEW QUESTIONS'),
                    e('button', { className: 'nav-btn exit-btn', onClick: onBack }, 'RETURN TO HUB')
                )
            )
        );
    };

    const renderReview = () => {
        const q = MODULE4_PRACTICE_TEST_DATA[reviewIndex];
        const studentAns = answers[reviewIndex];
        const isCorrect = studentAns === q.ans;

        return e('div', { className: 'practice-test-screen review-mode fade-in' },
            e('div', { className: 'exam-header' },
                e('div', { className: 'q-count' }, `Review Question ${reviewIndex + 1} of ${MODULE4_PRACTICE_TEST_DATA.length}`),
                e('button', { className: 'exit-review-btn', onClick: () => setGameState('results') }, 'BACK TO RESULTS')
            ),
            e('div', { className: 'rpg-dialogue-window review-window' },
                e('div', { className: 'question-text' }, q.q)
            ),
            e('div', { className: 'review-split' },
                e('div', { className: 'review-options' },
                    q.opts.map((opt, idx) => {
                        let statusClass = '';
                        if (idx === q.ans) statusClass = 'correct-ans';
                        if (idx === studentAns && idx !== q.ans) statusClass = 'wrong-ans';
                        return e('div', { key: idx, className: `review-opt-card ${statusClass}` },
                            e('span', { className: 'option-letter' }, String.fromCharCode(65 + idx)),
                            e('span', { className: 'option-text' }, opt)
                        );
                    })
                ),
                e('div', { className: 'explanation-box' },
                    e('h4', null, 'Explanations:'),
                    q.rationales.map((rat, idx) => e('p', { key: idx, className: idx === q.ans ? 'correct-explanation' : 'incorrect-explanation' },
                        e('strong', null, `${String.fromCharCode(65 + idx)}: `),
                        rat
                    ))
                )
            ),
            e('div', { className: 'nav-controls' },
                e('button', { className: 'nav-btn', onClick: () => setReviewIndex(Math.max(0, reviewIndex - 1)), disabled: reviewIndex === 0 }, 'PREVIOUS'),
                e('button', { className: 'nav-btn', onClick: () => setReviewIndex(Math.min(MODULE4_PRACTICE_TEST_DATA.length - 1, reviewIndex + 1)), disabled: reviewIndex === MODULE4_PRACTICE_TEST_DATA.length - 1 }, 'NEXT')
            )
        );
    };

    return e('div', { className: 'practice-test-container' },
        gameState === 'intro' && renderIntro(),
        gameState === 'exam' && renderExam(),
        gameState === 'submit' && renderSubmit(),
        gameState === 'results' && renderResults(),
        gameState === 'review' && renderReview()
    );
}
