import React from 'react';
import Cell from './Cell';
import  TransitionWrap  from '../components/utilities/TransitionWrap';
import { initOpenCells, PLAYER, CPU, whoseTurnMessages } from '../constants';

interface GameState {
  whoseTurn: string;
  sideLabels: {
    [key: string]: string;
  };
  gameBoard: {
    [key: number]: string;
  };
  gameStatus: string;
  turnHistory: Array<{
    i: number;
    whoseTurn: string;
  }>;
}

interface WinsLosses {
  wins: number;
  losses: number;
  draws: number;
}

interface BoardProps {
  gameState: GameState;
  handlePlayerSelectCell: (i: number) => void;
  winsLosses: WinsLosses;
}

const Board: React.FC<BoardProps> = ({ gameState, handlePlayerSelectCell, winsLosses }) => {
  const { whoseTurn, sideLabels, gameBoard, gameStatus, turnHistory } = gameState;
  const result = gameStatus === 'gameOver' ? turnHistory[turnHistory.length - 1] : null;

  return (
    <div className="max-w-sm mx-auto my-4 bg-white rounded-lg p-4">
      <div className="mb-4">
        <div className="grid grid-cols-2">
          <div className="overflow-hidden">
            {whoseTurn === '' && <div> &nbsp;</div>}
            <TransitionWrap show={whoseTurn === PLAYER} anim="l2c2l" className="">
              <div className="uppercase">
                <b>{whoseTurnMessages[PLAYER]}</b>
              </div>
            </TransitionWrap>
          </div>
          <div className="overflow-hidden">
            <TransitionWrap as="div" show={whoseTurn === CPU} anim="r2c2r" className="">
              <div className="text-right uppercase">
                <b>{whoseTurnMessages[CPU]}</b>
              </div>
            </TransitionWrap>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {initOpenCells.map((i) => (
          <Cell
            key={`cell-${i}`}
            i={i}
            value={gameBoard[i]}
            whoseTurn={whoseTurn}
            gameStatus={gameStatus}
            sideLabels={sideLabels}
            handlePlayerSelectCell={handlePlayerSelectCell}
            result={result}
          />
        ))}
      </div>

      <div className="text-right mt-4">
        Wins: {winsLosses.wins}, Losses: {winsLosses.losses}, Draws: {winsLosses.draws}
      </div>
    </div>
  );
};

Board.defaultProps = {
  gameState: {
    whoseTurn: '',
    sideLabels: {},
    gameBoard: {},
    gameStatus: '',
    turnHistory: [],
  },
};

export default Board;
