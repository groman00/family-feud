import React from 'react';
import { Survey, Game } from '../graphql/generated/types';

export interface State {
  currentGame: Game | undefined
}

export enum ActionTypes {
  JoinExistingGame = 'joinExistingGame',
  PlayNewGame = 'playNewGame',
  SetCurrentGame = 'setCurrentGame',
}

export type Action = 
  { 
    type: ActionTypes.JoinExistingGame,
    payload: {
      token: Game["token"]
    }
  } 
  | { type: ActionTypes.PlayNewGame }
  | { 
      type: ActionTypes.SetCurrentGame,
      payload: Partial<Game>
    }

export const initialState: State = {
  // currentGame: undefined
  currentGame: {
     token: 'test'
  }
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.JoinExistingGame:
      return {
        currentGame: {
          token: action.payload.token
        }
      };
    case ActionTypes.PlayNewGame:
      return {
        currentGame: {}
      };  
    case ActionTypes.SetCurrentGame:
      return {
        currentGame: {
          ...action.payload,
          ...state.currentGame,
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