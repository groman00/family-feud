import { useContext, useEffect, useMemo } from 'react';
import { Survey, useOnAnswerRevealedSubscription, useOnPlayerJoinedSubscription } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';
import { useStoreState } from './useStore';

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