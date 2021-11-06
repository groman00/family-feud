import React, { useContext } from 'react';
import { AppContext } from '../../contexts';
import { GameContext, GameProvider, GameStatus } from '../../contexts/GameContext';
import { Host } from '../Host';
import { Player } from '../Player';

import './Game.css';

export const Game: React.FC = () => {
  const { state: { currentGame } } = useContext(AppContext);

  if (currentGame?.token) {
    return (
      <div className="game">
        <GameProvider>
          <Status />
          <Player />
          <Host />
        </GameProvider>
      </div>
    );
  }

  return null;
}

const Status: React.FC = () => {
  const { hasEnded, status, strikes } = useContext(GameContext);  
  return (
    <div>
      <h3>{status === GameStatus.Win ? 'Winner' : 'In progress'}</h3>
      <h3>{hasEnded && 'Round Over'}</h3>
      <div>Strikes: {strikes}</div>
    </div>
  );
}
