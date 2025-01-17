import React from 'react';
import { AI_LEVELS } from '../constants';
import { Cpu, Gear } from '../icons';
import { TransitionWrap } from '../components';

interface ThinkingProps {
  aiLevel: string;
  isCpuThinking: boolean;
}

const Thinking: React.FC<ThinkingProps> = ({ aiLevel, isCpuThinking }: ThinkingProps) => {
  return (
    <TransitionWrap show={isCpuThinking} anim="zoomInOut">
      <div className="w-full h-52 w-52 relative" data-testid="thinking-wrap">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-800 opacity-50"></span>
        <div className="relative">
          <Cpu aiLevel={aiLevel} isThinking />
          <div className="w-12 absolute top-0 left-0">
            <div className="animate-spinSlow">
              <Gear data-testid="gear-1" />
            </div>
          </div>
          <div className="w-12 absolute bottom-0 right-0">
            <div className="animate-spinSlow">
              <Gear data-testid="gear-2" />
            </div>
          </div>
        </div>
      </div>
    </TransitionWrap>
  );
};

Thinking.defaultProps = {
  aiLevel: AI_LEVELS.AI_LEVEL_RND,
  isCpuThinking: false,
};

export default Thinking;
