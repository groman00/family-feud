import React, { useContext } from 'react';
import { GameContext, GameProvider, GameStatus } from '../../contexts/GameContext';
import { useOnAnswerRevealedSubscription } from '../../graphql/generated/types';
import { usePlayerJoined, useStoreState } from '../../hooks';
import { Host } from '../Host';
import { Player } from '../Player';

import './Game.css';

export const Game: React.FC = () => {
  const { currentGame, playerName } = useStoreState();
  
  usePlayerJoined();

  const { data: answerRevealedData } = useOnAnswerRevealedSubscription({
    variables: {},
  });  

  if (answerRevealedData) {
    console.log('answerRevealed', answerRevealedData);
  }

  if (currentGame?.token) {
    return (
      <div className="game">
        <GameProvider>
          <Status />
          { playerName ? <Player /> : <Host />}
          <div>
            <h2>Players:</h2>
            <ul>
              { currentGame.players?.map(player => <li key={player.name}>{player.name}</li>)}
            </ul>
          </div>
        </GameProvider>
      </div>
    );
  }

  return null;
}

const Status: React.FC = () => {
  const { hasEnded, status, strikes, title } = useContext(GameContext);  
  return (
    <div>
      <h1>{title}</h1>
      <h3>{status === GameStatus.Win ? 'Winner' : 'In progress'}</h3>
      <h3>{hasEnded && 'Round Over'}</h3>
      <div>Strikes: {strikes}</div>
    </div>
  );
}
