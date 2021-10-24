import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AppContext } from '../../contexts';
import { Answer, Survey, useCreateGameMutation, useSurveysQuery } from '../../graphql/generated/types';
import { ActionTypes } from '../../store';

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
    return <Host />;
  }

  return null;
}


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

enum GameStatus {
  InProgress = 'inProgress',
  Lose = 'lose',
  NotStarted = 'notStarted',
  Steal = 'steal',
  Win = 'win',
}

const Host: React.FC = () => {
  const [strikes, setStrikes] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Answer['id'][]>([]);
  const { data } = useSurveysQuery();

  const survey = data?.surveys[0];

  const gameStatus: GameStatus = useMemo(() => {
    if (!survey) {
      return GameStatus.NotStarted;
    }
    if (strikes > 2) {
      return GameStatus.Lose;
    }
    if (correctAnswers.length === survey.answers.length) {
      return GameStatus.Win;
    }
    return GameStatus.InProgress;
  }, [
    correctAnswers, 
    survey,
    strikes
  ]);

  const isGameOver: boolean = useMemo(() => [
    GameStatus.Win, 
    GameStatus.Lose
  ].includes(gameStatus), [gameStatus]);

  return (
    <div className="game">
      <div>
        <h2>Survey {gameStatus === GameStatus.Win ? 'winner' : 'in progress'}</h2>
        <div className="answers">
          {
            survey && survey.answers.map(answer => (
              <label className="answer" key={answer.id}>
                <span>{answer.text}</span>
                <input 
                  type="checkbox" 
                  disabled={isGameOver ?? correctAnswers.includes(answer.id)}
                  onChange={(e) => setCorrectAnswers(answers => [...answers, answer.id])}
                />
              </label>
            ))
          }
        </div>
      </div>
      <div>
        Strikes: {strikes}
      </div>
      {
        isGameOver ? (
          <div>
            <h2>Round Over</h2>
            <button onClick={() => {
              setStrikes(0);
              setCorrectAnswers([]);
            }}>
              Start Next Round
            </button>
          </div>          
        ): (
          <div>
            <button onClick={() => setStrikes(strikes => strikes + 1)}>
              STRIKE
            </button>
          </div>
        )
      }
    </div>
  );
}
