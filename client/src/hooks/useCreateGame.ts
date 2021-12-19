import { useEffect } from 'react';
import { useCreateGameMutation } from '../graphql/generated/types';
import { ActionTypes } from '../store';
import { useDispatch } from './useStore';

export const useCreateGame = () => {
  const dispatch = useDispatch();
  const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
    variables: {},
  });

  useEffect(() => {
    console.log('useCreateGame > useEffect', data);
    if (data?.createGame) {
      dispatch({
        type: ActionTypes.SetCurrentGame,
        payload: data.createGame?.game
      });
    }
  }, [data, dispatch]);

  return createGameMutation;
};