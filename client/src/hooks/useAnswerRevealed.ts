import { useContext, useEffect, useMemo } from 'react';
import { useOnAnswerRevealedSubscription, useOnPlayerJoinedSubscription } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';
import { useStoreState } from './useStore';

export const useAnswerRevealed = () => {
  const { dispatch } = useContext(AppContext);
  const { currentGame } = useStoreState();  
  const { data } = useOnAnswerRevealedSubscription({
    variables: {},
  });  

  if (data) {
    console.log('answerRevealed', data);
  }

  useEffect(() => {
    // TODO: If SetCurrentGame didn't cause Game to re-render,
    // This check wouldn't be necessary.
    if (!data?.answerRevealed?.survey?.answers.length || !currentGame?.survey?.answers.length) {
      return;
    }    
    if (data?.answerRevealed) {
      console.log('answerRevealed > useEffect', 'data: ', data);
      dispatch({
          type: ActionTypes.SetCurrentGame,
          payload: {
            survey: data.answerRevealed.survey
          }
        });
    }
  }, [data, dispatch]);
};