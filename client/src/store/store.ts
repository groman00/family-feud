import React from 'react';
import { Game, Player, Survey } from '../graphql/generated/types';

export interface State {
  game: Pick<Game, 'token'>,
  currentPlayerName?: string,
  players?: Player[],
  survey?: Survey
}

export enum ActionTypes {
  JoinExistingGame = 'joinExistingGame',
  CreateGame = 'createGame',
  UpdatePlayers = 'updatePlayers',
  UpdateSurvey = 'updateSurvey',
}

export type ActionCreator = (dispatch: React.Dispatch<Action>) => void;

export type Action =
  | {
      type: ActionTypes.JoinExistingGame,
      payload: {
        token: Game['token'],
        playerName: string,
        players: Player[]
        survey: Survey,
      }
    }
  | {
      type: ActionTypes.CreateGame,
      payload: {
        token: Game['token'],
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
      type: ActionTypes.UpdateSurvey,
      payload: {
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
        game: {
          token: action.payload.token,
        },
        currentPlayerName: action.payload.playerName,
        players: action.payload.players,
        survey: action.payload.survey,
      };
    case ActionTypes.CreateGame:
      return {
        ...state,
        game: {
          token: action.payload.token,
        },
        players: action.payload.players,
        survey: action.payload.survey,
      };
    case ActionTypes.UpdatePlayers:
      return {
        ...state,
        players: action.payload.players,
      };
    case ActionTypes.UpdateSurvey:
      return {
        ...state,
        survey: action.payload.survey,
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
