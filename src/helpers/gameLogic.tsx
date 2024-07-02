import {
    sides,
    X,
    O,
    PLAYER,
    CPU,
    initOpenCells,
    winningPatterns,
    AI_LEVELS,
    LOCAL_STORAGE_KEYS,
  } from '../constants';
  
  const sleep = (milliseconds: number): Promise<void> =>
    process.env.NODE_ENV === 'test' ? Promise.resolve() : new Promise(resolve => setTimeout(resolve, milliseconds));
  
  interface Result {
    winningPattern: number | null;
    side: string;
  }
  
  const checkWinner = (gameBoard: Record<number, string>): Result | null => {
    let result: Result | null = null;
    sides.forEach((s) => {
      if (!result) {
        winningPatterns.forEach((p, idx) => {
          let winner = true;
          p.forEach((c) => {
            if (gameBoard[c] !== s) {
              winner = false;
            }
          });
          if (winner) {
            result = {
              winningPattern: idx,
              side: s,
            };
          }
        });
        if (!result) {
          // check for draw
          let draw = true;
          initOpenCells.forEach((i) => {
            if (!gameBoard[i]) {
              draw = false;
            }
          });
          if (draw) {
            result = {
              winningPattern: null,
              side: 'draw',
            };
          }
        }
      }
    });
    return result;
  };
  
  const getOpenCells = (gameBoard: Record<number, string>): number[] => {
    const openCells: number[] = [];
    initOpenCells.forEach((i) => {
      if (!gameBoard[i]) {
        openCells.push(i);
      }
    });
    return openCells;
  };
  
  const cpuSelectMoveRnd = (gameBoard: Record<number, string>): number => {
    const openCells = getOpenCells(gameBoard);
    const rndIndex = Math.floor(Math.random() * openCells.length);
    return openCells[rndIndex];
  };
  
  const getRandomMove = (openCells: number[]): number => {
    const rndIndex = Math.floor(Math.random() * openCells.length);
    return openCells[rndIndex];
  };
  
  const checkNextMoveWinLoss = (gameBoard: Record<number, string>, openCells: number[]): number | null => {
    let i: number | null = null;
    sides.forEach((s) => {
      openCells.forEach((c) => {
        const result = checkWinner({
          ...gameBoard,
          [c]: s,
        });
        if (result) {
          i = c;
        }
      });
    });
    return i;
  };
  
  const cpuSelectMoveKI = (gameBoard: Record<number, string>): number => {
    const openCells = getOpenCells(gameBoard);
    const immediate = checkNextMoveWinLoss(gameBoard, openCells);
    if (immediate !== null) {
      return immediate;
    }
    // IF NO IMMEDIATE ATTACK OR DEFENSE EXISTS FOR NEXT TURN, USE RANDOM
    return getRandomMove(openCells);
  };
  
  const cpuSelectMoveSmrt = (gameBoard: Record<number, string>, turnHistory: { i: number; whoseTurn: string }[]): number => {
    const openCells = getOpenCells(gameBoard);
    // READ LEGACY HISTORY FROM LOCALSTORAGE
    const legacyHistoryStr = localStorage.getItem(LOCAL_STORAGE_KEYS.HISTORY);
    const legacyHistory = legacyHistoryStr ? JSON.parse(legacyHistoryStr) : [];
    // GO THROUGH 1-9
    let topScore = -1;
    let selectedIndex: number | null = null;
    initOpenCells.forEach((c) => {
      let score = -1;
      const nextMove = { i: c, whoseTurn: CPU };
      const possibleTurnHistory = [...turnHistory, nextMove];
      legacyHistory.forEach((h: { i: number; whoseTurn: string }[]) => {
        const isRelevant =
          JSON.stringify(h.slice(0, turnHistory.length + 1)) === JSON.stringify(possibleTurnHistory);
        if (isRelevant) {
          const result = h[h.length - 1];
          const movesLeft = h.length - turnHistory.length;
          if (result.side === CPU) {
            score += 10 / movesLeft;
          } else if (result.side === PLAYER) {
            score -= 10 / movesLeft;
          }
        }
      });
      if (score > topScore) {
        topScore = score;
        selectedIndex = c;
      }
    });
    if (selectedIndex !== null) {
      return selectedIndex;
    }
    // IF ALL ELSE FAILS, GET RANDOM
    return getRandomMove(openCells);
  };
  
  const cpuSelectMove = async (gameBoard: Record<number, string>, aiLevel: string, turnHistory: { i: number; whoseTurn: string }[]): Promise<number> => {
    let i: number | null = null;
    let aiLevelCheck = aiLevel;
    if (aiLevel === AI_LEVELS.AI_LEVEL_HAH) {
      const aiLevelOptions = [AI_LEVELS.AI_LEVEL_RND, AI_LEVELS.AI_LEVEL_KI, AI_LEVELS.AI_LEVEL_SMRT];
      aiLevelCheck = aiLevelOptions[Math.floor(Math.random() * aiLevelOptions.length)];
    }
    switch (aiLevelCheck) {
      case AI_LEVELS.AI_LEVEL_SMRT:
        i = cpuSelectMoveSmrt(gameBoard, turnHistory);
        break;
      case AI_LEVELS.AI_LEVEL_KI:
        i = cpuSelectMoveKI(gameBoard);
        break;
      case AI_LEVELS.AI_LEVEL_RND:
      default:
        i = cpuSelectMoveRnd(gameBoard);
        break;
    }
    // await new Promise((resolve) => setTimeout(resolve, 500));
    await sleep(500);
    return i!;
  };
  
  const processTurn = (args: {
    i: number;
    gameBoard: Record<number, string>;
    whoseTurn: string;
    setGameBoard: React.Dispatch<React.SetStateAction<Record<number, string>>>;
    setTurnHistory: React.Dispatch<React.SetStateAction<{ i: number; whoseTurn: string }[]>>;
  }): void => {
    const { i, gameBoard, whoseTurn, setGameBoard, setTurnHistory } = args;
    setTurnHistory((prevTurnHistory) => [
      ...prevTurnHistory,
      {
        i,
        whoseTurn,
      },
    ]);
    setGameBoard({
      ...gameBoard,
      [i]: whoseTurn,
    });
  };
  
  const processCpuTurn = async (args: {
    gameBoard: Record<number, string>;
    whoseTurn: string;
    aiLevel: string;
    setGameBoard: React.Dispatch<React.SetStateAction<Record<number, string>>>;
    setTurnHistory: React.Dispatch<React.SetStateAction<{ i: number; whoseTurn: string }[]>>;
    setIsCpuThinking: React.Dispatch<React.SetStateAction<boolean>>;
    turnHistory: { i: number; whoseTurn: string }[];
  }): Promise<void> => {
    const {
      gameBoard,
      whoseTurn,
      aiLevel,
      setGameBoard,
      setTurnHistory,
      setIsCpuThinking,
      turnHistory,
    } = args;
    setIsCpuThinking(true);
    // select spot based on aiLevel with fakeWait
    const i = await cpuSelectMove(gameBoard, aiLevel, turnHistory);
    setIsCpuThinking(false);
    processTurn({ i, gameBoard, whoseTurn, setGameBoard, setTurnHistory });
  };
  
  const getSideLabels = (playerLabel: string): Record<string, string> => {
    const initSideLabels: Record<string, string> = {};
    initSideLabels[PLAYER] = playerLabel === X ? X : O;
    initSideLabels[CPU] = playerLabel === X ? O : X;
    return initSideLabels;
  };
  
  const storeGameResults = (turnHistory: { i: number; whoseTurn: string }[]): void => {
    const legacyHistoryStr = localStorage.getItem(LOCAL_STORAGE_KEYS.HISTORY);
    const legacyHistory: { i: number; whoseTurn: string }[][] = legacyHistoryStr ? JSON.parse(legacyHistoryStr) : [];
    const turnHistoryStr = JSON.stringify(turnHistory);
    const historyIsNew = !legacyHistory.some((h) => JSON.stringify(h) === turnHistoryStr);
    const newHistory = historyIsNew ? [...legacyHistory, turnHistory] : legacyHistory;
    localStorage.setItem(LOCAL_STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
  };
  
  const saveWinsLosses = (winsLosses: { wins: number; losses: number }): void => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WINS_LOSSES, JSON.stringify(winsLosses));
  };
  
  const readWinsLosses = (setWinsLosses: React.Dispatch<React.SetStateAction<{ wins: number; losses: number }>>): void => {
    const winsLossesStr = localStorage.getItem(LOCAL_STORAGE_KEYS.WINS_LOSSES);
    if (winsLossesStr && winsLossesStr.length > 1) {
      setWinsLosses(JSON.parse(winsLossesStr));
    }
  };
  
  const isTesting = (): boolean => process.env.NODE_ENV === 'test';
  
  const handleResetGameData = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.HISTORY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.WINS_LOSSES);
  };
  
  export {
    processTurn,
    processCpuTurn,
    getSideLabels,
    checkWinner,
    storeGameResults,
    saveWinsLosses,
    readWinsLosses,
    sleep,
    cpuSelectMove,
    handleResetGameData,
    isTesting,
  };
  