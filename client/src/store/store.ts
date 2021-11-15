import React from 'react';
import { Game, Player } from '../graphql/generated/types';

export interface State {
  currentGame: Partial<Game>
  playerName?: Player['name']
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
        game: Game,
        playerName: Player['name'],
      }
    } 
  | { 
      type: ActionTypes.SetCurrentGame,
      payload: Partial<Game>
    }

export const initialState: State = {
  currentGame: {},
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.JoinExistingGame:
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          ...action.payload.game,
        },
        playerName: action.payload.playerName,
      };
    case ActionTypes.SetCurrentGame:
      console.log('case ActionTypes.SetCurrentGame:', action.payload)
      return {
        ...state,
        currentGame: {
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