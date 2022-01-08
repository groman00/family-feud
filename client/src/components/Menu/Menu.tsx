import React, { useEffect, useMemo, useState } from 'react';
import { Game, Survey, useCreateGameMutation, useJoinGameMutation } from '../../graphql/generated/types';
import { useDispatch } from '../../hooks';
import { ActionTypes } from '../../store';
import './Menu.css';

export const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const [createGameMutation, { data: createGameData }] = useCreateGameMutation({
    variables: {},
  });
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
    if (data?.joinGame) {
      dispatch({
        type: ActionTypes.JoinExistingGame,
        payload: {
          playerName,
          token,
          survey: data.joinGame.survey as Survey,
          players: data.joinGame.players
        }
      });
    }
  }, [data, error, dispatch, playerName]);

  useEffect(() => {
    console.log('useCreateGame > useEffect', createGameData);
    if (createGameData?.createGame) {
      const { token, players, survey } = createGameData.createGame
      dispatch({
        type: ActionTypes.CreateGame,
        payload: {
          token: token,
          players,
          survey: survey as Survey
        }
      });
    }
  }, [createGameData, dispatch]);  

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
