import { useContext, useEffect } from 'react';
import { Survey, useOnAnswerRevealedSubscription } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';

export const useAnswerRevealed = () => {
  const { dispatch } = useContext(AppContext);
  const { data } = useOnAnswerRevealedSubscription({
    variables: {},
  });  

  useEffect(() => {
    console.log('useAnswerRevealed useEffect', data)
    if (data?.answerRevealed) {
      dispatch({
          type: ActionTypes.UpdateSurvey,
          payload: {
            survey: data.answerRevealed.survey as Survey
          }
        });
    // }
    }
  }, [data?.answerRevealed]);
};