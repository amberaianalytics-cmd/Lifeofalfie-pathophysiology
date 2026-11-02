/**
 * Dr. Modali Learning Labs - Event System
 * Standardized engine for executing scripted sequences.
 */

export class EventEngine {
  constructor(game) {
    this.game = game; // Reference to the RPG component/engine
    this.isEventRunning = false;
    this.queue = [];
    this.currentTask = null;
  }

  /**
   * Add an event to the queue and start processing if idle.
   */
  execute(script) {
    if (!script || !Array.isArray(script)) return;
    this.queue = [...this.queue, ...script];
    if (!this.isEventRunning) {
      this.isEventRunning = true;
      if (this.game.setGameState) this.game.setGameState('event');
      this.processNext();
    }
  }

  processNext() {
    if (this.queue.length === 0) {
      this.isEventRunning = false;
      if (this.game.setGameState) this.game.setGameState('playing');
      return;
    }

    const command = this.queue.shift();
    this.runCommand(command);
  }

  runCommand(cmd) {
    const { type, data } = cmd;

    switch (type) {
      case 'dialogue':
        this.game.setDialogue({
          speaker: data.speaker,
          lines: data.lines,
          onComplete: () => this.processNext()
        });
        break;

      case 'move_npc':
        // Implementation for moving an NPC to a coordinate
        const npc = this.game.npcsRef.current.find(n => n.id === data.id);
        if (npc) {
          npc.x = data.x;
          npc.y = data.y;
        }
        this.processNext();
        break;

      case 'unlock_vocab':
        this.game.unlockVocab(data.term, data.definition);
        this.processNext();
        break;

      case 'update_objective':
        this.game.setNotification(data.text, data.type || 'info');
        this.processNext();
        break;

      case 'wait':
        setTimeout(() => this.processNext(), data.ms || 1000);
        break;

      case 'warp':
        this.game.handleWarp(data);
        this.processNext();
        break;

      case 'complete_quest':
        this.game.completeQuest(data.id, data.validation);
        this.processNext();
        break;

      default:
        console.warn(`Unknown event command: ${type}`);
        this.processNext();
    }
  }
}
