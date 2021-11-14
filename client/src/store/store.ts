import React from 'react';
import { Game } from '../graphql/generated/types';

export interface State {
  currentGame: Game | undefined
}

export enum ActionTypes {
  JoinExistingGame = 'joinExistingGame',
  SetCurrentGame = 'setCurrentGame',
}

export type ActionCreator = (dispatch: React.Dispatch<Action>) => void;

export type Action = 
  | { 
      type: ActionTypes.JoinExistingGame,
      payload: {
        token: Game["token"]
      }
    } 
  | { 
      type: ActionTypes.SetCurrentGame,
      payload: Partial<Game>
    };

export const initialState: State = {
  currentGame: undefined
  // currentGame: { token: 'test' }
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.JoinExistingGame:
      return {
        currentGame: {
          token: action.payload.token,
          players: [] // Todo: Fix this
        }
      };
    // case ActionTypes.PlayNewGame:
    //   return {
    //     currentGame: {}
    //   };  
    case ActionTypes.SetCurrentGame:
      console.log('case ActionTypes.SetCurrentGame:', action.payload)
      return {
        currentGame: {
          players: [], // Todo: Fix this
          ...state.currentGame,
          ...action.payload,          
        }
      };            
    default:
      throw new Error();
  }
}

type DispatchableAction = Action | ActionCreator;

export type Dispatch = React.Dispatch<DispatchableAction>;

export const useReducerWithMiddleware = (): [State, Dispatch] => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
 
  const dispatchWithMiddleware = (action: DispatchableAction) => {
    console.log('dispatch', action);
    if (typeof action === 'function') {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };
 
  return [state, dispatchWithMiddleware];
};