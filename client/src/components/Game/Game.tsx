import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts';
import { useCreateGameMutation } from '../../graphql/generated/types';
import { ActionTypes } from '../../store';

import './GameBoard.css';

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
    return <Host />;
  }

  return null;
}


const Host: React.FC = () => {
  const [strikes, setStrikes] = useState(0);
/* 
Survey
Host
Teams
Points
Strikes
Team {
  Players
  ActivePlayer
  TotalPoints
}
Player {
  name
}
*/





  return (
    <div>
      <div>
        Strikes: {strikes}
      </div>
      {
        strikes < 3 ? (
          <div>
            <button>Correct</button>
            <button onClick={() => setStrikes(strikes => strikes + 1)}>
              Wrong
            </button>
          </div>
        ): (
          <div>
            <h2>Round Over</h2>
            <button onClick={() => setStrikes(0)}>
              Start Next Round
            </button>
          </div>
        )
      }
    </div>
  );
}
