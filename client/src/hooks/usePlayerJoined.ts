import { useContext, useEffect, useMemo } from 'react';
import { useOnPlayerJoinedSubscription } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';

export const usePlayerJoined = () => {
  const { dispatch } = useContext(AppContext);
  const { data } = useOnPlayerJoinedSubscription({
    variables: {},
  });

  useEffect(() => {
    console.log('usePlayerJoined useEffect()', data);
    if (data?.playerJoined) {
      dispatch({
          type: ActionTypes.UpdatePlayers,
          payload: {
            players: data.playerJoined.players
          }
        });
    }
  }, [data?.playerJoined]);
};