import React from 'react';
import { TransitionWrap } from '../../components';

interface StartModalProps {
  show: boolean;
  handleStartClick: () => void;
  handleResetClick: () => void;
}

const StartModal: React.FC<StartModalProps> = ({
  show,
  handleStartClick,
  handleResetClick,
}) => {
  return (
    <TransitionWrap show={show} className="text-center">
      <div className="text-center mt-16 inline-block">
        <div className="relative">
          <div className="animate-pingSlowSm absolute top-0 left-0 inline-flex h-full w-full rounded-lg bg-purple-800 opacity-100"></div>
          <div className="mb-8">
            <button
              data-testid="startmenu-play"
              className="relative px-16 py-4 text-4xl border-2 border-purple-300 text-white bg-gradient-to-t from-black to-blue-600 rounded-lg scale-100 hover:scale-[1.2] transition-scale font-bold duration-300"
              onClick={handleStartClick}
            >
              PLAY
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button
            data-testid="startmenu-reset"
            className="relative px-4 py-2 text-lg border-2 border-purple-300 text-white bg-gradient-to-t from-black to-red-500 rounded-lg scale-100 hover:scale-[1.2] transition-scale duration-300"
            onClick={handleResetClick}
          >
            RESET
          </button>
        </div>
      </div>
    </TransitionWrap>
  );
};

export default StartModal;
