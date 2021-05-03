import React from 'react';
import { Surveys_surveys } from './__generated__/Surveys';

type Props = Surveys_surveys;

const Survey: React.FC<Props> = ({
  id,
  title,
  totalAnswers,
}) => {
  
  return (
    <button>
      <h1>{title}</h1>
      <h3>Total Answers: {totalAnswers}</h3>
    </button>
  );
};

export default Survey;