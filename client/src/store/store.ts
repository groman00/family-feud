import React from 'react';
import { Game as GGame, Player, Survey } from '../graphql/generated/types';

type Game = Pick<GGame, 'token' | 'turn'>;

export interface State {
  game: Game,
  currentPlayerName?: string,
  players?: Player[],
  survey?: Survey
}

export enum ActionTypes {
  JoinExistingGame = 'joinExistingGame',
  CreateGame = 'createGame',
  UpdatePlayers = 'updatePlayers',
  UpdateGame = 'updateGame',
}

export type ActionCreator = (dispatch: React.Dispatch<Action>) => void;

export type Action =
  | {
      type: ActionTypes.JoinExistingGame,
      payload: {
        game: Game,
        playerName: string,
        players: Player[]
        survey: Survey,
      }
    }
  | {
      type: ActionTypes.CreateGame,
      payload: {
        game: Game,
        players: Player[]
        survey: Survey,
      }
    }
  | {
      type: ActionTypes.UpdatePlayers,
      payload: {
        players: Player[]
      }
    }
    | {
      type: ActionTypes.UpdateGame,
      payload: {
        game: Game,
        survey: Survey
      }
    }

export const initialState: State = {
  game: {},
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.JoinExistingGame:
      return {
        ...state,
        game: action.payload.game,
        currentPlayerName: action.payload.playerName,
        players: action.payload.players,
        survey: action.payload.survey,
      };
    case ActionTypes.CreateGame:
      return {
        ...state,
        game: action.payload.game,
        players: action.payload.players,
        survey: action.payload.survey,
      };
    case ActionTypes.UpdatePlayers:
      return {
        ...state,
        players: action.payload.players,
      };
    case ActionTypes.UpdateGame:
      return {
        ...state,
        game: action.payload.game,
        survey: action.payload.survey,
      };
    default:
      throw new Error();
  }
}

export type DispatchableAction = Action | ActionCreator;

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
