import React from 'react';
import { GameBoardAnswer } from './GameBoardAnswer';
import './GameBoard.css';
import { AppContext } from '../../contexts';

export const Game: React.FC = () => {
  const { state: { currentGame } } = React.useContext(AppContext)

  if (!currentGame) {
    return <>Pick a survey</>
  }

  const { survey } = currentGame;
  return (
    <div className="game-board">
      { survey.answers.map(answer => <GameBoardAnswer answer={answer}/>) }
    </div>
  );
}
