import React, { useContext, useEffect, useState } from 'react';
import { GameBoardAnswer } from './GameBoardAnswer';
import './GameBoard.css';
import { AppContext } from '../../contexts';
import { useCreateGameMutation } from '../../graphql/generated/types';

export const Game: React.FC = () => {
  const { state: { currentGame } } = useContext(AppContext);
  const [token, setToken] = useState<string>();
  const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
    variables: {},
  });
  
  console.log(data, loading, error);

  useEffect(() => {
    if (!token) {
      console.log('Creating New Game.')
      createGameMutation();
    }
  }, [token, createGameMutation]);

  useEffect(() => {
    setToken(data?.createGame?.game.token ?? undefined);
  }, [data]);  

  if (loading) {
    return <>Loading</>
  }

  if (error || !currentGame) {
    return <>Error</>
  }
  
  if (token) {
    const { survey } = currentGame;

    return (
      <div className="game-board">
        <h1>{ survey.title }</h1>
        { survey.answers.map((answer, i) => <GameBoardAnswer key={i} answer={answer}/>) }
      </div>
    );
  }

  return null;
}
