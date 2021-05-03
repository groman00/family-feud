import React from 'react';
import { Surveys_surveys } from './__generated__/Surveys';
import { GameBoard } from './GameBoard';

type Props = Surveys_surveys;

const Survey: React.FC<Props> = ({
  // id,
  answers,
  title,
  totalAnswers,
}) => {
  
  return (
    <div>
      <h1>{title}</h1>
      <h3>Total Answers: {totalAnswers}</h3>
      { answers && <GameBoard answers={answers}/> }
    </div>
  );
};

export default Survey;