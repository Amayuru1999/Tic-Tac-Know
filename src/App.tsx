import React, { useState } from 'react';
import { AI_LEVELS, APP_STATES, X, O } from './constants';
import { handleResetGameData } from './helpers/gameLogic';
import { Menu, Game } from './components';

type AppState = typeof APP_STATES[keyof typeof APP_STATES];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(APP_STATES.MENU);
  const [aiLevel, setAiLevel] = useState<string>(AI_LEVELS.AI_LEVEL_RND);
  const [playerSide, setPlayerSide] = useState<string>(X);

  const handleSelectAiLevel = (level: string): void => {
    setAiLevel(level);
  };

  const handleSelectSide = (side: string): void => {
    setPlayerSide(side);
  };

  const goToGame = (): void => {
    setAppState(APP_STATES.GAME);
  };

  const goToMenu = (): void => {
    setAppState(APP_STATES.MENU);
  };

  return (
    <div className="App">
      <div className="relative h-full min-h-screen">
        {appState === APP_STATES.MENU && (
          <Menu
            data-testid="menu"
            handleSelectAiLevel={handleSelectAiLevel}
            handleSelectSide={handleSelectSide}
            handleResetGameData={handleResetGameData}
            aiLevel={aiLevel}
            playerSide={playerSide}
            goToGame={goToGame}
          />
        )}
        {appState === APP_STATES.GAME && (
          <Game aiLevel={aiLevel} playerSide={playerSide} goToMenu={goToMenu} />
        )}
      </div>
      {process.env.NODE_ENV === 'test' && (
        <div>
          <button
            data-testid="test-selectAiLevel"
            onClick={() => handleSelectAiLevel(AI_LEVELS.AI_LEVEL_KI)}
          >
            selectAiLevel
          </button>
          <button data-testid="test-selectSide" onClick={() => handleSelectSide(O)}>
            selectSide
          </button>
          <button data-testid="test-goGame" onClick={goToGame}>
            game
          </button>
          <button data-testid="test-goMenu" onClick={goToMenu}>
            menu
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
