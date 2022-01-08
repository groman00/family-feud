import { useContext, useEffect, useMemo } from 'react';
import { Survey, useOnAnswerRevealedSubscription, useOnPlayerJoinedSubscription } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';
import { useStoreState } from './useStore';

export const useAnswerRevealed = () => {
  const { dispatch } = useContext(AppContext);
  const { survey } = useStoreState();  
  const { data } = useOnAnswerRevealedSubscription({
    variables: {},
  });  

  if (data) {
    console.log('answerRevealed', data);
  }

  useEffect(() => {
    if (
      !data?.answerRevealed || 
      !survey || 
      !data.answerRevealed.survey?.answers
    ) {
      return;
    }

    // TODO: Prevent this hook from running unless `data` actually changes.
    console.log('useAnswerRevealed useEffect running')
    const newRevealed = data.answerRevealed.survey.answers.filter(a => a.revealed).length;
    const oldRevealed = survey.answers.filter(a => a.revealed).length;          
    if (newRevealed > oldRevealed) {
      console.log('answerRevealed > useEffect', 'data: ', data);
      dispatch({
          type: ActionTypes.UpdateSurvey,
          payload: {
            survey: data.answerRevealed.survey as Survey
          }
        });
    }
  }, [data, dispatch]);
};