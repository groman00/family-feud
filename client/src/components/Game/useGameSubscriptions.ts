import { useContext } from 'react';
import {
  useOnAnswerRevealedSubscription,
  useOnPlayerJoinedSubscription,
  useOnStrikeGivenSubscription,
  useOnGameStartedSubscription,
  GameFieldsFragment,
} from '../../graphql/generated/types';
import { ActionTypes, DispatchableAction } from '../../store';
import { AppContext } from '../../contexts';
import { useSubscription } from '../../hooks';

const updateGame = (gameFields: GameFieldsFragment): DispatchableAction => {
  const { turn, token, survey } = gameFields;

  return {
    type: ActionTypes.UpdateGame,
    payload: {
      game: { turn, token },
      survey: survey!,
    },
  };
};

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
      dispatch(updateGame(data.answerRevealed!));
    },
  });

  useSubscription({
    subscriptionHook: useOnStrikeGivenSubscription,
    key: 'strikeGiven',
    onChange: data => {
      dispatch(updateGame(data.strikeGiven!));
    },
  });

  useSubscription({
    subscriptionHook: useOnGameStartedSubscription,
    key: 'gameStarted',
    onChange: data => {
      dispatch(updateGame(data.gameStarted!));
    },
  });
};

export default useGameSubscriptions;
