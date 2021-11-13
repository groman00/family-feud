import { useContext, useEffect } from 'react';
import { Game, useCreateGameMutation } from '../graphql/generated/types';
import { AppContext } from '../contexts';
import { ActionTypes } from '../store';

export const useCreateGame = () => {
  const { dispatch } = useContext(AppContext);
  const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
    variables: {},
  });

  useEffect(() => {
    console.log('useCreateGame > useEffect', data);
    if (data?.createGame) {
      dispatch({
          type: ActionTypes.SetCurrentGame,
          payload: data.createGame?.game as Game
        });
    }
  }, [data, dispatch]);

  return createGameMutation;
};