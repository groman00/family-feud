import React from 'react';
import { Surveys_surveys_answers } from '../__generated__/Surveys';
import { GameBoardAnswer } from './GameBoardAnswer';
import './GameBoard.css';

interface Props {
  answers: Surveys_surveys_answers[]   
}

export const GameBoard: React.FC<Props> = ({ answers }) => {
  return (
    <div className="game-board">
      { answers.map(answer => <GameBoardAnswer answer={answer}/>) }
    </div>
  );
}
