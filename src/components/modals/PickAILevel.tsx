import React from 'react';
import { TransitionWrap, MenuNav } from '../../components';
import { AI_LEVELS, aiLevelMessages, aiLevelLabels } from '../../constants';
import { Cpu } from '../../icons';

interface PickAiLevelProps {
  show: boolean;
  handleSelectAiLevel: (level: string) => void;
  handleClickPrev: () => void;
  goToGame: () => void;
  aiLevel: string;
}

const PickAiLevel: React.FC<PickAiLevelProps> = ({
  show,
  handleSelectAiLevel,
  handleClickPrev,
  goToGame,
  aiLevel,
}) => {
  const btnAiBaseClass =
    'relative h-full w-full border-2 transition-all duration-300 hover:scale-[1.1]';
  const btnClasses = {
    selected:
      'bg-gradient-to-t from-blue-900 to-pink-400 rounded-lg border-purple-400 text-white',
    unselected: 'bg-gray-400 border-gray-800 rounded-lg relative text-gray-200',
  };
  const aiLevelsList = [
    AI_LEVELS.AI_LEVEL_RND,
    AI_LEVELS.AI_LEVEL_KI,
    AI_LEVELS.AI_LEVEL_HAH,
    AI_LEVELS.AI_LEVEL_SMRT,
  ];

  return (
    <TransitionWrap show={show} className="">
      <div className="bg-green-800 w-screen text-white border-2 border-red-300 rounded-lg p-4 w-full max-w-xl drop-shadow-xl">
        <div id="menu-pick-side" className="text-2xl uppercase">
          Pick your AI opponent:
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {aiLevelsList.map((l, idx) => (
            <div key={`ai-option-${idx}`}>
              <button
                data-testid={`test-btn-ai-${idx + 1}`}
                onClick={() => handleSelectAiLevel(l)}
                className={`${btnAiBaseClass} ${
                  aiLevel === l ? btnClasses.selected : btnClasses.unselected
                }`}
              >
                <div className="p-2">
                  <Cpu aiLevel={l} />
                </div>
              </button>
            </div>
          ))}
        </div>
        <h2 className="pt-4 text-2xl font-bold">{aiLevelLabels[aiLevel]}</h2>
        <div className="text-white italic text-xl pt-1 leading-tight">
          {aiLevelMessages[aiLevel]}
        </div>
        <MenuNav handleClickPrev={handleClickPrev} handleClickNext={goToGame} mode="pickAiLevel" />
      </div>
    </TransitionWrap>
  );
};

export default PickAiLevel;
