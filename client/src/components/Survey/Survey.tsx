import React from 'react';
import { Survey } from '../../graphql/generated/types';
import { GameBoard } from '../GameBoard';

interface Props {
  survey: Survey;
};

const SurveyView: React.FC<Props> = ({
  survey
}) => {
  const {
    answers,
    title,
    totalAnswers,
  } = survey;
  return (
    <div>
      <h1>{title}</h1>
      <h3>Total Answers: {totalAnswers}</h3>
      { answers && <GameBoard answers={answers}/> }
    </div>
  );
};

export default SurveyView;