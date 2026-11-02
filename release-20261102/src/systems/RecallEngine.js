/**
 * Alfie's Adaptive Recall Engine
 * 
 * Core logic for Spaced Repetition and Adaptive Learning.
 * Based on concepts of memory stability, retrieval effort, and difficulty.
 */

export const RECALL_STATES = {
    NEW: 'New',
    LEARNING: 'Learning',
    DEVELOPING: 'Developing',
    STABLE: 'Stable',
    MASTERED: 'Mastered'
};

export const RECALL_RATINGS = {
    AGAIN: 0, // I Didn't Know It
    HARD: 1,  // Hard
    GOOD: 2,  // Good
    EASY: 3   // Easy
};

export class RecallEngine {
    /**
     * Update a card's memory model based on a new rating.
     * @param {Object} progress - Existing student progress for this card.
     * @param {number} rating - The recall rating (0-3).
     * @returns {Object} Updated progress object.
     */
    static processReview(progress, rating) {
        const now = Date.now();
        const updated = { 
            ...progress,
            reviewCount: (progress.reviewCount || 0) + 1,
            lastReviewDate: now,
            lastRating: rating,
            history: [...(progress.history || []), { date: now, rating }]
        };

        // Initialize values if missing
        if (updated.difficulty === undefined) updated.difficulty = 0.5; // 0 (Easy) to 1 (Hard)
        if (updated.stability === undefined) updated.stability = 0;    // Days until forgetting
        if (updated.consecutiveCorrect === undefined) updated.consecutiveCorrect = 0;
        if (updated.consecutiveIncorrect === undefined) updated.consecutiveIncorrect = 0;

        // Process Failure
        if (rating === RECALL_RATINGS.AGAIN) {
            updated.consecutiveCorrect = 0;
            updated.consecutiveIncorrect++;
            updated.difficulty = Math.min(1.0, updated.difficulty + 0.1);
            updated.stability = 0; // Immediate review needed
            updated.nextReviewDate = now + (10 * 60 * 1000); // 10 minutes from now
        } else {
            // Process Success
            updated.consecutiveCorrect++;
            updated.consecutiveIncorrect = 0;

            // Adjust difficulty based on rating
            if (rating === RECALL_RATINGS.HARD) {
                updated.difficulty = Math.min(1.0, updated.difficulty + 0.05);
            } else if (rating === RECALL_RATINGS.EASY) {
                updated.difficulty = Math.max(0.0, updated.difficulty - 0.05);
            }

            // Calculate new stability (interval)
            // This is a simplified exponential growth model: Interval = Stability * Factor
            let factor = 1.0;
            if (rating === RECALL_RATINGS.HARD) factor = 1.5;
            else if (rating === RECALL_RATINGS.GOOD) factor = 2.5;
            else if (rating === RECALL_RATINGS.EASY) factor = 4.0;

            // Apply difficulty penalty to factor
            factor = factor * (1.1 - updated.difficulty);

            // New Stability in days
            if (updated.reviewCount === 1) {
                updated.stability = (rating === RECALL_RATINGS.EASY) ? 4 : 1;
            } else {
                updated.stability = Math.max(1, updated.stability * factor);
            }

            updated.nextReviewDate = now + (updated.stability * 24 * 60 * 60 * 1000);
        }

        // Determine Mastery Score and State
        updated.masteryScore = this.calculateMasteryScore(updated);
        updated.learningState = this.determineLearningState(updated);

        return updated;
    }

    static calculateMasteryScore(progress) {
        // Mastery is a factor of stability and consistency
        // A card is "Mastered" (100) if stability is > 30 days
        const stabilityWeight = Math.min(70, (progress.stability / 30) * 70);
        const consistencyWeight = Math.min(30, (progress.consecutiveCorrect / 5) * 30);
        return Math.round(stabilityWeight + consistencyWeight);
    }

    static determineLearningState(progress) {
        if (progress.reviewCount === 0) return RECALL_STATES.NEW;
        if (progress.masteryScore >= 90) return RECALL_STATES.MASTERED;
        if (progress.masteryScore >= 60) return RECALL_STATES.STABLE;
        if (progress.masteryScore >= 30) return RECALL_STATES.DEVELOPING;
        return RECALL_STATES.LEARNING;
    }

    /**
     * Determines which cards to show based on the study mode.
     */
    static getStudyQueue(deck, progressMap, mode = 'smart', limit = 20) {
        const now = Date.now();
        const cardsWithProgress = deck.cards.map(card => ({
            card,
            progress: progressMap[card.id] || { reviewCount: 0, nextReviewDate: 0, learningState: RECALL_STATES.NEW }
        }));

        let queue = [];

        if (mode === 'smart') {
            // Overdue cards first
            const overdue = cardsWithProgress.filter(cp => cp.progress.reviewCount > 0 && cp.progress.nextReviewDate <= now);
            
            // Adaptive Concept Clustering: Find topics where student is struggling
            const topicScores = {};
            cardsWithProgress.forEach(cp => {
                if (!topicScores[cp.card.topic]) topicScores[cp.card.topic] = { score: 0, count: 0 };
                if (cp.progress.reviewCount > 0) {
                    topicScores[cp.card.topic].score += cp.progress.masteryScore;
                    topicScores[cp.card.topic].count++;
                }
            });

            const weakTopics = Object.entries(topicScores)
                .filter(([name, data]) => data.count > 0 && (data.score / data.count) < 40)
                .map(([name]) => name);

            const clusteredCards = weakTopics.length > 0 
                ? cardsWithProgress.filter(cp => weakTopics.includes(cp.card.topic) && cp.progress.learningState !== RECALL_STATES.MASTERED)
                : [];

            // Recently failed (priority)
            const failed = overdue.filter(cp => cp.progress.stability === 0);
            const due = overdue.filter(cp => cp.progress.stability > 0);
            
            queue = [...failed, ...clusteredCards, ...due];

            // Prerequisite Repair: If card in queue has prerequisites not yet learned, add them
            const prerequisiteAdditions = [];
            queue.forEach(cp => {
                if (cp.card.prerequisites) {
                    cp.card.prerequisites.forEach(preId => {
                        const preCard = cardsWithProgress.find(c => c.card.id === preId);
                        if (preCard && preCard.progress.learningState !== RECALL_STATES.MASTERED) {
                            prerequisiteAdditions.push(preCard);
                        }
                    });
                }
            });
            
            queue = [...prerequisiteAdditions, ...queue];

            // Remove duplicates (preserving order)
            queue = queue.filter((item, index) => queue.findIndex(q => q.card.id === item.card.id) === index);

            // If we have space, add some new cards
            if (queue.length < limit) {
                const newCards = cardsWithProgress.filter(cp => cp.progress.reviewCount === 0);
                queue = [...queue, ...newCards.slice(0, limit - queue.length)];
            }
        } else if (mode === 'new') {
            queue = cardsWithProgress.filter(cp => cp.progress.reviewCount === 0);
        } else if (mode === 'weakest') {
            queue = cardsWithProgress
                .filter(cp => cp.progress.reviewCount > 0)
                .sort((a, b) => a.progress.masteryScore - b.progress.masteryScore);
        } else {
            // Default Standard Review
            queue = cardsWithProgress.filter(cp => cp.progress.nextReviewDate <= now);
        }

        return queue.slice(0, limit);
    }
}
