import React, { useEffect, useMemo, useState } from 'react';
import { Survey, useCreateGameMutation, useJoinGameMutation } from '../../graphql/generated/types';
import { useDispatch } from '../../hooks';
import { ActionTypes } from '../../store';
import './Menu.css';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const [createGameMutation, { data: createGameData }] = useCreateGameMutation({
    variables: {},
  });
  const [token, setToken] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const canJoinGame = useMemo(() => Boolean(token && playerName), [token, playerName]);
  const [joinGame, { data, loading, error }] = useJoinGameMutation({
    variables: {
      token,
      playerName,
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
          players: data.joinGame.players,
        },
      });
    }
  }, [data?.joinGame]);

  useEffect(() => {
    console.log('useCreateGame > useEffect', createGameData);
    if (createGameData?.createGame) {
      const { token: createdToken, players, survey } = createGameData.createGame;
      dispatch({
        type: ActionTypes.CreateGame,
        payload: {
          token: createdToken,
          players,
          survey: survey as Survey,
        },
      });
    }
  }, [createGameData?.createGame]);

  return (
    <div className="menu">
      <div>
        <button
          type="button"
          onClick={() => createGameMutation()}
        >
          Create Game
        </button>
      </div>
      <hr />
      <div>
        <h2>Join Game</h2>
        <label htmlFor="gameCodeInput">
          Game Code:
          <input
            id="gameCodeInput"
            placeholder="Enter Game Code"
            value={token}
            onChange={e => setToken(e.target.value)}
          />
        </label>
        <label htmlFor="playerNameInput">
          Name:
          <input
            id="playerNameInput"
            placeholder="Enter Your Name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
          />
        </label>
        <button
          type="button"
          disabled={!canJoinGame || loading}
          onClick={() => joinGame()}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Menu;
