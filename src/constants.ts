// TYPES AND INTERFACES
interface WhoseTurnMessages {
    player: string;
    cpu: string;
  }
  
  interface GameOverMessages {
    player: string;
    cpu: string;
    draw: string;
  }
  
  interface SideMessages {
    x: string;
    o: string;
  }
  
  interface AiLevelLabels {
    ai_level_rnd: string;
    ai_level_ki: string;
    ai_level_hah: string;
    ai_level_smrt: string;
  }
  
  interface AiLevelMessages {
    ai_level_rnd: string;
    ai_level_ki: string;
    ai_level_hah: string;
    ai_level_smrt: string;
  }
  
  // CONSTANTS
  const PLAYER = 'player' as const;
  const CPU = 'cpu' as const;
  const X = 'x' as const;
  const O = 'o' as const;
  
  const AI_LEVELS = {
    AI_LEVEL_RND: 'ai_level_rnd' as const,
    AI_LEVEL_KI: 'ai_level_ki' as const,
    AI_LEVEL_HAH: 'ai_level_hah' as const,
    AI_LEVEL_SMRT: 'ai_level_smrt' as const,
  };
  
  const symbols = [X, O] as const;
  const sides = [PLAYER, CPU] as const;
  const coinSides = ['heads', 'tails'] as const;
  const initOpenCells = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
  const winningPatterns: readonly number[][] = [
    [1, 2, 3], // TOP ROW
    [4, 5, 6], // MIDDLE ROW
    [7, 8, 9], // BOTTOM ROW
    [1, 4, 7], // LEFT COL
    [2, 5, 8], // MIDDLE COL
    [3, 6, 9], // RIGHT COL
    [1, 5, 9], // TL-BR DIAG
    [3, 5, 7], // TR-BL DIAG
  ] as const;
  
  
  const LOCAL_STORAGE_KEYS = {
    HISTORY: 'tic-tac-know-history' as const,
    WINS_LOSSES: 'tic-tac-know-wins-losses' as const,
  };
  
  const whoseTurnMessages: WhoseTurnMessages = {
    player: 'Your turn',
    cpu: 'CPU Turn',
  };
  
  const gameOverMessages: GameOverMessages = {
    player: 'YOU WIN!',
    cpu: 'CPU WINS',
    draw: 'The Game is a draw.',
  };
  
  const APP_STATES = {
    GAME: 'game' as const,
    MENU: 'menu' as const,
  };
  
  const MENU_STATUSES = {
    PICK_SIDE: 'pick-side' as const,
    PICK_AI: 'pick-ai' as const,
    START: 'start' as const,
    COMPLETE: 'complete' as const,
  };
  
  const sideMessages: SideMessages = {
    x: 'You are playing as X. The CPU is playing as O.',
    o: 'You are playing as O. The CPU is playing as X.',
  };
  
  const aiLevelLabels: AiLevelLabels = {
    ai_level_rnd: 'Herp Derp',
    ai_level_ki: 'Killer Instinct',
    ai_level_hah: 'Half & Half',
    ai_level_smrt: 'Mastermind',
  };
  
  const aiLevelMessages: AiLevelMessages = {
    ai_level_rnd:
      'Your oppnent is, to put it bluntly, not terribly bright, making moves (and inapropriate noises) at random.',
    ai_level_ki:
      'Your opponent knows enough to be annoyingly good, but just like all your friends from college, it cannot plan ahead.',
    ai_level_hah:
      'Your opponent is playing with one chip tied behind its back, using a mix of strategies, sometimes smart and sometimes not.',
    ai_level_smrt:
      "Your opponent is smarter than you are, more disciplined and, let's face it, better looking. You don't stand a chance.",
  };
  
  // EXPORTS
  export {
    symbols,
    sides,
    coinSides,
    PLAYER,
    CPU,
    X,
    O,
    whoseTurnMessages,
    gameOverMessages,
    sideMessages,
    aiLevelMessages,
    aiLevelLabels,
    initOpenCells,
    winningPatterns,
    AI_LEVELS,
    LOCAL_STORAGE_KEYS,
    APP_STATES,
    MENU_STATUSES,
  };
  