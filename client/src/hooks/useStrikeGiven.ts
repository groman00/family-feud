import { useContext, useEffect } from 'react';
import { Survey, useOnStrikeGivenSubscription } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';

export const useStrikeGiven = () => {
  const { dispatch } = useContext(AppContext);
  const { data } = useOnStrikeGivenSubscription({
    variables: {},
  });  

  useEffect(() => {
    if (data?.strikeGiven) {
      dispatch({
          type: ActionTypes.UpdateSurvey,
          payload: {
            survey: data.strikeGiven.survey as Survey
          }
        });
    // }
    }
  }, [data?.strikeGiven]);
};