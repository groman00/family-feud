import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts';
import { GameContext, GameProvider, GameStatus } from '../../contexts/GameContext';
import { useCreateGameMutation } from '../../graphql/generated/types';
import { ActionTypes } from '../../store';
import { Host } from '../Host';
import { Player } from '../Player';

import './Game.css';

export const Game: React.FC = () => {
  const { dispatch, state: { currentGame } } = useContext(AppContext);
  const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
    variables: {},
  });
  
  console.log(currentGame, data, loading, error);

  // Create game if none exists.
  useEffect(() => {
    if (currentGame?.token) {
      return;
    }

    console.log('Creating New Game.')
    createGameMutation();
  }, [currentGame, createGameMutation]);

  // Set current game from mutation response.
  useEffect(() => {
    if (data?.createGame?.game) {
      dispatch({
        type: ActionTypes.SetCurrentGame,
        payload: data?.createGame?.game ?? {}
      });
    }
  }, [data]);  

  if (loading) {
    return <>Loading</>
  }

  if (error) {
    return <>Error</>
  }
  
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
