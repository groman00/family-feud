import { useContext, useEffect, useMemo } from 'react';
import { useOnPlayerJoinedSubscription } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';
import { useStoreState } from './useStore';

export const usePlayerJoined = () => {
  const { dispatch } = useContext(AppContext);
  const { players } = useStoreState();
  const { data, loading, error } = useOnPlayerJoinedSubscription({
    variables: {},
  });

  useEffect(() => {
    if (
      data?.playerJoined && 
      players && 
      data.playerJoined.players.length > players.length
    ) {
      console.log('playerJoinedSubscription > useEffect', 'data: ', data, 'loading: ', loading, 'error:', error);
      dispatch({
          type: ActionTypes.UpdatePlayers,
          payload: {
            players: data.playerJoined.players
          }
        });
    }
  }, [data, loading, error, dispatch, players]);
};