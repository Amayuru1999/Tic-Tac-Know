import React from 'react';
import { PLAYER, winningPatterns } from '../constants';

interface CellProps {
  i: number;
  value?: string;
  handlePlayerSelectCell: (i: number) => void;
  whoseTurn?: string;
  sideLabels: {
    [key: string]: string;
  };
  gameStatus: string;
  result?: {
    winningPattern?: number;
    side?: string;
  };
}

const Cell: React.FC<CellProps> = ({ i, value, handlePlayerSelectCell, whoseTurn, sideLabels, gameStatus, result }) => {
  const { winningPattern, side: winningSide } = result || {};
  const cellShadeWinner = winningPattern !== undefined ? winningPatterns[winningPattern] : [];
  
  const getCellClassName = () => {
    let border = '';
    switch (i) {
      case 2:
      case 8:
        border = 'border-l-2 border-r-2';
        break;
      case 4:
      case 6:
        border = 'border-t-2 border-b-2';
        break;
      case 5:
        border = 'border-2';
        break;
      default:
        break;
    }
    const bg = value ? 'bg-white' : '';
    const cellAnimsP = [
      'animate-fadeOnBgPOne',
      'animate-fadeOnBgPTwo',
      'animate-fadeOnBgPThree',
      'animate-fadeOnBgPFour',
      'animate-fadeOnBgPFive',
      'animate-fadeOnBgPSix',
      'animate-fadeOnBgPSeven',
      'animate-fadeOnBgPEight',
      'animate-fadeOnBgPNine',
    ];
    const cellAnimsC = [
      'animate-fadeOnBgCOne',
      'animate-fadeOnBgCTwo',
      'animate-fadeOnBgCThree',
      'animate-fadeOnBgCFour',
      'animate-fadeOnBgCFive',
      'animate-fadeOnBgCSix',
      'animate-fadeOnBgCSeven',
      'animate-fadeOnBgCEight',
      'animate-fadeOnBgCNine',
    ];
    const animOnGameOver = winningSide === PLAYER ? cellAnimsP[i - 1] : cellAnimsC[i - 1];
    const bgAnim = cellShadeWinner && cellShadeWinner.includes(i) ? animOnGameOver : '';
    return `${border} ${bg} ${bgAnim}`;
  };

  const isDisabled = whoseTurn !== PLAYER || gameStatus !== 'playing';

  return (
    <div className={`text-center border-gray-500 h-32 ${getCellClassName()}`} id={`cell-${i}`}>
      {value ? (
        <div className="w-full h-full relative flex justify-center items-center">
          <div className="text-3xl animate-zoomDown">{sideLabels[value]}</div>
        </div>
      ) : (
        <button
          className="w-full h-full"
          data-testid={`cell-btn-${i}`}
          onClick={() => handlePlayerSelectCell(i)}
          disabled={isDisabled}
        >
          &nbsp;
        </button>
      )}
    </div>
  );
};

export default Cell;
