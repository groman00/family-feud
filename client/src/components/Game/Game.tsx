import React, { useContext } from 'react';
import { GameContext, GameProvider, GameStatus } from '../../contexts/GameContext';
import { useAnswerRevealed, usePlayerJoined, useSelector } from '../../hooks';
import { Host } from '../Host';
import { Player } from '../Player';
import { Game as TGame } from '../../graphql/generated/types';

import './Game.css';
import { getCurrentPlayerName, getPlayers, getStrikes } from '../../store';

export const Game: React.FC<{ token: TGame['token']}> = ({ token }) => {
  usePlayerJoined();
  useAnswerRevealed();

  if (token) {
    return (
      <div className="game">
        <GameProvider>
          <Status />
          <CurrentPlayer />
          <Players />
        </GameProvider>
      </div>
    );
  }

  return null;
}

const CurrentPlayer: React.FC = () => {
  return useSelector(getCurrentPlayerName) ? <Player /> : <Host />;
}

const Players: React.FC = () => (
  <div>
    <h2>Players:</h2>
    <ul>
      { useSelector(getPlayers)?.map(player => <li key={player.name}>{player.name}</li>)}
    </ul>
  </div>    
);

const Status: React.FC = () => {
  const { hasEnded, status, strikes, title } = useContext(GameContext);  
  
  return (
    <div>
      <h1>{title}</h1>
      <h3>{status === GameStatus.Win ? 'Winner' : 'In progress'}</h3>
      <h3>{hasEnded && 'Round Over'}</h3>
      <div>Strikes: {strikes}</div>
      <div>Strikes from Server: {useSelector(getStrikes)}</div>
    </div>
  );
}
