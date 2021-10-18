import React, { useContext, useEffect } from 'react';
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

  useEffect(() => {
    if (currentGame?.token) {
      return;
    }

    console.log('Creating New Game.')
    createGameMutation();
  }, [currentGame, createGameMutation]);

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
    // const { survey } = currentGame;

    return (
      <div className="game-board">
        {/* <h1>{ survey.title }</h1>
        { survey.answers.map((answer, i) => <GameBoardAnswer key={i} answer={answer}/>) } */}
      </div>
    );
  }

  return null;
}
