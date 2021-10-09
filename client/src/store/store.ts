import React from 'react';
import { Survey } from '../graphql/generated/types';

interface CurrentGame {
  survey: Survey
}

export interface State {
  currentGame: CurrentGame | undefined
}

export enum ActionTypes {
  PlayGame = 'playGame'
}

export type Action = { 
  type: ActionTypes.PlayGame,
  payload: {
    survey: Survey
  }
}

export const initialState: State = {
  currentGame: undefined
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.PlayGame:
      return {
        currentGame: {
          survey: action.payload.survey
        }
      };
    default:
      throw new Error();
  }
}

export const useReducerWithMiddleware = (): [State, React.Dispatch<Action>] => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
 
  const dispatchWithMiddleware = (action: Action) => {
    console.log('dispatch', action);
    dispatch(action);
  };
 
  return [state, dispatchWithMiddleware];
};