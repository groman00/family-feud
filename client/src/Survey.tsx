import React from 'react';
import { Surveys_surveys } from './__generated__/Surveys';

type Props = Surveys_surveys;

const Survey: React.FC<Props> = ({
  id,
  title,
  totalResponses,
}) => {
  
  return (
    <div>
      <h1>{title}</h1>
      <h3>Total Surveyed: {totalResponses}</h3>
    </div>
  );
};

export default Survey;