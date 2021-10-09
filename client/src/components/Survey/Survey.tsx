import React from 'react';
import { AppContext } from '../../contexts';
import { Survey } from '../../graphql/generated/types';
import { ActionTypes } from '../../store';

interface Props {
  survey: Survey;
};

const SurveyView: React.FC<Props> = ({
  survey
}) => {
  const { dispatch } = React.useContext(AppContext)
  const {
    title,
    totalAnswers,
  } = survey;
  return (
    <div>
      <h1>{title}</h1>
      <h3>Total Answers: {totalAnswers}</h3>
      <button 
        onClick={() => dispatch({ 
          type: ActionTypes.PlayGame,
          payload: {
            survey
          }
        })}
      >
        Play Game
      </button>
    </div>
  );
};

export default SurveyView;