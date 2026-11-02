/**
 * Persistence layer for Adaptive Recall.
 */
export class RecallStorage {
    static STORAGE_KEY = 'ALFIE_RECALL_PROGRESS';

    static saveProgress(progressMap) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progressMap));
        } catch (err) {
            console.error("Failed to save recall progress", err);
        }
    }

    static loadProgress() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (err) {
            console.error("Failed to load recall progress", err);
            return {};
        }
    }

    static clearProgress() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
