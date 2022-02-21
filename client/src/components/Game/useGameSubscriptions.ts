import { useContext } from 'react';
import {
  useOnAnswerRevealedSubscription,
  useOnPlayerJoinedSubscription,
  useOnStrikeGivenSubscription,
  useOnGameStartedSubscription,
} from '../../graphql/generated/types';
import { ActionTypes } from '../../store';
import { AppContext } from '../../contexts';
import { useSubscription } from '../../hooks';

const useGameSubscriptions = () => {
  const { dispatch } = useContext(AppContext);

  useSubscription({
    subscriptionHook: useOnPlayerJoinedSubscription,
    key: 'playerJoined',
    onChange: data => {
      dispatch({
        type: ActionTypes.UpdatePlayers,
        payload: {
          players: data.playerJoined?.players!,
        },
      });
    },
  });

  useSubscription({
    subscriptionHook: useOnAnswerRevealedSubscription,
    key: 'answerRevealed',
    onChange: data => {
      dispatch({
        type: ActionTypes.UpdateSurvey,
        payload: {
          survey: data.answerRevealed?.survey!,
        },
      });
    },
  });

  useSubscription({
    subscriptionHook: useOnStrikeGivenSubscription,
    key: 'strikeGiven',
    onChange: data => {
      dispatch({
        type: ActionTypes.UpdateSurvey,
        payload: {
          survey: data.strikeGiven?.survey!,
        },
      });
    },
  });

  useSubscription({
    subscriptionHook: useOnGameStartedSubscription,
    key: 'gameStarted',
    onChange: data => {
      dispatch({
        type: ActionTypes.UpdateSurvey,
        payload: {
          survey: data.gameStarted?.survey!,
        },
      });
    },
  });
};

export default useGameSubscriptions;
