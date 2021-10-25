import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AppContext } from '../../contexts';
import { GameContext, GameProvider, GameStatus } from '../../contexts/GameContext';
import { Answer, Survey, useCreateGameMutation, useSurveysQuery } from '../../graphql/generated/types';
import { ActionTypes } from '../../store';

import './Game.css';

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
          <Strikes />
          <Player />
          <Host />
        </GameProvider>
      </div>
    );
  }

  return null;
}

const Status: React.FC = () => {
  const { hasEnded, status } = useContext(GameContext);  
  return (
    <div>
      <h3>{status === GameStatus.Win ? 'Winner' : 'In progress'}</h3>
      <h3>{hasEnded && 'Round Over'}</h3>
    </div>
  );
}

const Strikes: React.FC = () => {
  const { strikes } = useContext(GameContext);  
  return <div>Strikes: {strikes}</div>;
}


const Answers: React.FC<{ children: (answer: Answer) => React.ReactNode }> = ({ children }) => {
  const { answers } = useContext(GameContext);  
  return (
    <div className="answers">
      {
        answers?.map(answer => (
          <div className="answer" key={answer.id}>
            {children(answer)}
          </div>
        ))
      }
    </div>
  );
};

const Host: React.FC = () => {
  const { 
    correctAnswers,
    hasEnded,
    setCorrectAnswers,      
    setStrikes,
  } = useContext(GameContext);  
  return (
    <div>
      <Answers>
        {answer => (
          <button 
            disabled={hasEnded || correctAnswers.includes(answer.id)}
            onClick={(e) => setCorrectAnswers(answers => [...answers, answer.id])}
          >
            {answer.text}
          </button>
        )}
      </Answers>
      {
        hasEnded ? (
          <div>
            <h2>Round Over</h2>
            <button onClick={() => {
              setStrikes(0);
              setCorrectAnswers([]);
            }}>
              Start Next Round
            </button>
          </div>  
        ) : (
          <button onClick={() => setStrikes(strikes => strikes + 1)}>
            STRIKE
          </button>
        )
      }     
    </div>
  );
}

const Player: React.FC = () => {
  const { correctAnswers } = useContext(GameContext);  
  return (
    <div>
      <h2>player</h2>
      <Answers>
        { answer => correctAnswers.includes(answer.id) && answer.text }
      </Answers>
    </div>
  );
};
