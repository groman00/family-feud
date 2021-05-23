import React from 'react';
import { Answer } from '../../graphql/generated/types';
import { GameBoardAnswer } from './GameBoardAnswer';
import './GameBoard.css';

interface Props {
  answers: Answer[]   
}

export const GameBoard: React.FC<Props> = ({ answers }) => {
  return (
    <div className="game-board">
      { answers.map(answer => <GameBoardAnswer answer={answer}/>) }
    </div>
  );
}
