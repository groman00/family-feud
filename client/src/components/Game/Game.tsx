import React, { useContext } from 'react';
import { GameContext, GameProvider, GameStatus } from '../../contexts/GameContext';
import { useSelector } from '../../hooks';
import Host from '../Host';
import Player from '../Player';
import { Game as TGame } from '../../graphql/generated/types';
import './Game.css';
import {
  getCurrentPlayerName, getGame, getPlayers, getStrikes, getSurvey,
} from '../../store';
import useGameSubscriptions from './useGameSubscriptions';

const CurrentPlayer: React.FC = () => (useSelector(getCurrentPlayerName) ? <Player /> : <Host />);

const Players: React.FC = () => {
  const { turn } = useSelector(getGame);
  const players = useSelector(getPlayers)?.filter(p => p.name !== 'host');
  return (
    <div>
      <h2>Players:</h2>
      <ul>
        { players?.map((player, i) => (
          <li key={player.name}>
            <span>{player.name}</span>
            { i === turn && <span> (Your Turn)</span> }
          </li>
        ))}
      </ul>
    </div>
  );
};

const Status: React.FC = () => {
  const { hasEnded, status } = useContext(GameContext);
  const survey = useSelector(getSurvey);

  return (
    <div>
      <h1>{survey?.title}</h1>
      <h3>{status}</h3>
      <h3>{hasEnded && 'Round Over'}</h3>
      <div>
        Strikes:
        {' '}
        {useSelector(getStrikes)}
      </div>
    </div>
  );
};

const Game: React.FC<{ token: TGame['token']}> = ({ token }) => {
  useGameSubscriptions();

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
};

export default Game;
