import { useContext, useEffect, useMemo } from 'react';
import { useOnPlayerJoinedSubscription } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';
import { useStoreState } from './useStore';

export const usePlayerJoined = () => {
  const { dispatch } = useContext(AppContext);
  const { currentGame } = useStoreState();
  const { data, loading, error } = useOnPlayerJoinedSubscription({
    variables: {},
  });
  const hasMore = useMemo(() => {
    // TODO: If SetCurrentGame didn't cause Game to re-render,
    // This checkout wouldn't be necessary.
    if (!data?.playerJoined?.players || !currentGame?.players?.length) {
      return false;
    }
    return data.playerJoined.players.length > currentGame.players.length
  }, [data, currentGame]);

  useEffect(() => {
    if (data?.playerJoined && hasMore) {
      console.log('playerJoinedSubscription > useEffect', 'data: ', data, 'loading: ', loading, 'error:', error);
      dispatch({
          type: ActionTypes.SetCurrentGame,
          payload: {
            players: data.playerJoined.players
          }
        });
    }
  }, [data, loading, error, dispatch, hasMore]);
};