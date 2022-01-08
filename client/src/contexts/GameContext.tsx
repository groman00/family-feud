import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "./AppContext";
import { Answer } from "../graphql/generated/types";

export enum GameStatus {
  InProgress = 'inProgress',
  Lose = 'lose',
  NotStarted = 'notStarted',
  Steal = 'steal',
  Win = 'win',
}

// type AnswerIds = Array<Answer['id']>;

interface Context {
  answers?: Answer[],
  status: GameStatus,
  hasEnded: boolean,
  setStrikes: React.Dispatch<React.SetStateAction<number>>,
  strikes: number,
  title: string
}

export const GameContext = React.createContext<Context>({} as Context);

export const GameProvider: React.FC = ({ children }) => {
  const { state: { survey } } = useContext(AppContext);
  const [strikes, setStrikes] = useState(0);

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
      setStrikes,
      strikes,
      title: survey?.title ?? '',
    }}>
      {children}
    </GameContext.Provider>
  );
}