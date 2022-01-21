import React, { useContext, useMemo } from 'react';
import { AppContext } from './AppContext';
import { Answer } from '../graphql/generated/types';
import { useSelector } from '../hooks'
import { getStrikes } from '../store';

export enum GameStatus {
  InProgress = 'inProgress',
  Lose = 'lose',
  NotStarted = 'notStarted',
  Steal = 'steal',
  Win = 'win',
}

interface Context {
  answers?: Answer[],
  status: GameStatus,
  hasEnded: boolean,
  title: string
}

export const GameContext = React.createContext<Context>({} as Context);

export const GameProvider: React.FC = ({ children }) => {
  const { state: { survey } } = useContext(AppContext);
  const strikes = useSelector(getStrikes)

  const status: GameStatus = useMemo(() => {
    if (!survey) {
      return GameStatus.NotStarted;
    }
    if (strikes > 2) {
      return GameStatus.Lose;
    }
    // if (correctAnswers.length === survey.answers.length) {
    //   return GameStatus.Win;
    // }
    return GameStatus.InProgress;
  }, [
    survey,
    strikes
  ]);

  const hasEnded: boolean = useMemo(() => [
    GameStatus.Win, 
    GameStatus.Lose
  ].includes(status), [status]);  
    
  return (
    <GameContext.Provider value={{
      answers: survey?.answers,
      status,
      hasEnded,
      title: survey?.title ?? '',
    }}>
      {children}
    </GameContext.Provider>
  );
}