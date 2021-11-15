import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../contexts';
import { Game, useJoinGameMutation } from '../../graphql/generated/types';
import { useCreateGame } from '../../hooks';
import { ActionTypes } from '../../store';
import './Menu.css';

export const Menu: React.FC = () => {
  const { dispatch } = useContext(AppContext)
  const createGameMutation = useCreateGame();
  const [token, setToken] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const canJoinGame = useMemo(() => Boolean(token && playerName), [token, playerName])
  const [joinGame, { data, loading, error }] = useJoinGameMutation({
    variables: {
      token,
      playerName
    },
  });  

  useEffect(() => {
    console.log('join game data: ', data, error);
    if (data?.joinGame?.game) {
      dispatch({
        type: ActionTypes.JoinExistingGame,
        payload: {
          game: data.joinGame.game as Game,
          playerName
        }
      });
    }
  }, [data, error]);

  return (
    <div className="menu">
      <div>
        <button 
          onClick={() => createGameMutation()}
        >
          Create Game
        </button>
      </div>
      <hr />
      <div>
        <h2>Join Game</h2>
        <label>
          Game Code: 
          <input 
            placeholder="Enter Game Code"
            value={token}
            onChange={e => setToken(e.target.value)}
          />
        </label>
        <label>
          Name: 
          <input 
            placeholder="Enter Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}            
          />
        </label>        
        <button 
          disabled={!canJoinGame || loading}
          onClick={() => joinGame()}
        >
          Join
        </button>
      </div>
    </div>
  )
}
