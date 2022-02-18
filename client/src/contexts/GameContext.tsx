import React, { useMemo, useCallback } from 'react';
import { useSelector } from '../hooks'
import { getStrikes, getSurvey } from '../store';

export enum GameStatus {
  InProgress = 'inProgress',
  Lose = 'lose',
  NotStarted = 'notStarted',
  Steal = 'steal',
  Win = 'win',
}

interface Context {
  status: GameStatus,
  hasEnded: boolean,
}

export const GameContext = React.createContext<Context>({} as Context);

export const GameProvider: React.FC = ({ children }) => {
  const survey = useSelector(getSurvey);
  const strikes = useSelector(getStrikes);

  const isWinner = useCallback(() => 
    survey?.answers.filter(a => a.revealed).length === survey?.answers.length, 
  [survey?.answers]);

  const status: GameStatus = useMemo(() => {
    if (!survey) {
      return GameStatus.NotStarted;
    }
    if (strikes > 2) {
      return GameStatus.Lose;
    }
    if (isWinner()) {
      return GameStatus.Win;
    }
    return GameStatus.InProgress;
  }, [
    survey,
    strikes,
    isWinner
  ]);

  const hasEnded: boolean = useMemo(() => [
    GameStatus.Win, 
    GameStatus.Lose
  ].includes(status), [status]);  
    
  return (
    <GameContext.Provider value={{
      status,
      hasEnded,
    }}>
      {children}
    </GameContext.Provider>
  );
}