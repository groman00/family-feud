import { State } from './store';

export const getPlayers = (state: State) => state.players;

export const getSurvey = (state: State) => state.survey;

export const getCurrentPlayerName = (state: State) => state.currentPlayerName;

export const getGameToken = (state: State) => state.game.token!;

export const getGame = (state: State) => state.game;

export const getStrikes = (state: State) => state.survey?.strikes ?? 0;
