import React, { useState, useEffect, useRef } from 'react';
import { Bg, Header, Board, Thinking, GameStart, GameOver } from '../components';
import { PLAYER, CPU, AI_LEVELS } from '../constants';
import {
  sleep,
  processTurn,
  processCpuTurn,
  getSideLabels,
  checkWinner,
  storeGameResults,
  saveWinsLosses,
  readWinsLosses,
  isTesting,
} from '../helpers/gameLogic';

interface GameProps {
  aiLevel: string;
  goToMenu: () => void;
  playerSide: string;
}

interface GameResult {
  winningPattern?: number;
  side?: string;
}

const Game: React.FC<GameProps> = ({ aiLevel, goToMenu, playerSide }) => {
  const [gameStatus, setGameStatus] = useState<string>('start');
  const [gameBoard, setGameBoard] = useState<{ [key: number]: string }>({});
  const [turnHistory, setTurnHistory] = useState<GameResult[]>([]);
  const [whoseTurn, setWhoseTurn] = useState<string | null>(null);
  const [sideLabels, setSideLabels] = useState<{ [key: string]: string }>({});
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isCpuThinking, setIsCpuThinking] = useState<boolean>(false);
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const [winsLosses, setWinsLosses] = useState<{ wins: number; losses: number; draws: number }>({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  const initGame = (resetting: boolean, side: string) => {
    setGameStatus('start');
    setGameBoard({});
    setTurnHistory([]);
    setSideLabels(getSideLabels(side));
    setWhoseTurn(null);
    setIsCpuThinking(false);
    setGameResult(null);
  };

  const handlePlayerSelectCell = (i: number) => {
    if (gameStatus === 'playing') {
      processTurn({ i, gameBoard, whoseTurn: whoseTurn!, setGameBoard, setTurnHistory });
    }
  };

  useEffect(() => {
    if (gameStatus === 'start') {
      setIsRestarting(false);
    }
  }, [gameStatus]);

  // WHEN THE BOARD UPDATES, CHECK FOR GAME-END CONDITIONS
  useEffect(() => {
    const result = checkWinner(gameBoard);
    setWhoseTurn((prevWhoseTurn) => (prevWhoseTurn === PLAYER ? CPU : PLAYER));
    if (result) {
      setTurnHistory((prevTurnHistory) => [...prevTurnHistory, result]);
      setGameStatus('gameOver');
      setGameResult(result);
    }
  }, [gameBoard]);

  // ON GAME OVER, STORE TURNHISTORY IN LOCALSTORAGE FOR LATER ANALYSIS
  useEffect(() => {
    if (gameStatus === 'gameOver') {
      storeGameResults(turnHistory);
    }
  }, [gameStatus, turnHistory]);

  // ON GAMEOVER, UPDATE WIN/LOSS RECORD IN LOCALSTORAGE
  useEffect(() => {
    if (gameResult?.side) {
      setWinsLosses((prevWinsLosses) => {
        let { wins, losses, draws } = prevWinsLosses;
        if (gameResult.side === PLAYER) {
          wins += 1;
        } else if (gameResult.side === CPU) {
          losses += 1;
        } else {
          draws += 1;
        }
        saveWinsLosses({ wins, losses, draws });
        return {
          wins,
          losses,
          draws,
        };
      });
    }
  }, [gameResult]);

  // WE USE A REF TO TRACK THE PREVIOUS VALUE FOR WHOSETURN
  const prevWhoseTurn = useRef<string | null>(null);

  // ON WHOSETURN CHANGE, CONDITIONALLY TRIGGER CPU TURN
  useEffect(() => {
    const handleTriggerCpuTurn = async () => {
      if (gameStatus === 'playing') {
        await sleep(1000);
        await processCpuTurn({
          gameBoard,
          whoseTurn: whoseTurn!,
          aiLevel,
          setGameBoard,
          setTurnHistory,
          setIsCpuThinking,
          turnHistory,
        });
      }
    };
    // TO RECTIFY THE USE OF GAMEBOARD IN THE DEPS FOR THIS USEEFFECT
    // WE CONFIRM THAT THE WHOSETURN VALUE HAS CHANGED FIRST
    if (prevWhoseTurn.current !== whoseTurn) {
      prevWhoseTurn.current = whoseTurn;
      if (whoseTurn === CPU) {
        handleTriggerCpuTurn();
      }
    }
  }, [whoseTurn, aiLevel, gameStatus, gameBoard, turnHistory]);

  // INITIALIZE COMPONENT
  useEffect(() => {
    initGame(false, playerSide);
    readWinsLosses(setWinsLosses);
  }, [playerSide]);

  const handlePlayAgain = () => {
    setIsRestarting(true);
    setTimeout(() => {
      initGame(true, playerSide);
    }, 750);
  };

  const showGameStart = gameStatus === 'start';

  const handleStartClick = (whoseTurn: string) => {
    setWhoseTurn(whoseTurn);
    setGameStatus('playing');
  };

  const gameState = { whoseTurn, sideLabels, gameBoard, gameStatus, turnHistory };

  return (
    <div data-testid="game-main">
      <Bg variant="game" />
      <div className="relative h-full">
        <Header gameStatus={gameStatus} />
        <Board
          gameState={gameState}
          handlePlayerSelectCell={handlePlayerSelectCell}
          winsLosses={winsLosses}
        />

        <Thinking isCpuThinking={isCpuThinking} aiLevel={aiLevel} />

        <GameStart show={showGameStart} handleStartClick={handleStartClick} />

        <GameOver
          gameResult={gameResult}
          isRestarting={isRestarting}
          handlePlayAgain={handlePlayAgain}
          handleGoToMenu={goToMenu}
          aiLevel={aiLevel}
        />

        {isTesting() && (
          <div>
            <button data-testid="game-test-playAgain" onClick={handlePlayAgain}>
              gameOver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Game.defaultProps = {
  aiLevel: AI_LEVELS.AI_LEVEL_RND,
};

export default Game;
