import { Survey } from '../graphql/generated/types';

interface CurrentGame {
  survey: Survey
}

interface State {
  currentGame: CurrentGame | undefined
}

export enum ActionTypes {
  PlayGame = 'playGame'
}

export type Action = { type: ActionTypes.PlayGame }

export const initialState: State = {
  currentGame: undefined
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.PlayGame:
      return {
        currentGame: undefined
      };
    default:
      throw new Error();
  }
}