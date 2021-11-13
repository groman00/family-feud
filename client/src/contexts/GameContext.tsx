import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "./AppContext";
import { Answer, Game, useSurveysQuery } from "../graphql/generated/types";

export enum GameStatus {
  InProgress = 'inProgress',
  Lose = 'lose',
  NotStarted = 'notStarted',
  Steal = 'steal',
  Win = 'win',
}

type AnswerIds = Array<Answer['id']>;

interface Context {
  answers?: Answer[],
  status: GameStatus,
  hasEnded: boolean,
  setCorrectAnswers: React.Dispatch<React.SetStateAction<AnswerIds>>,  
  setStrikes: React.Dispatch<React.SetStateAction<number>>,
  strikes: number,
  correctAnswers: AnswerIds,
  title: string
  token: Game['token']
}

export const GameContext = React.createContext<Context>({} as Context);

export const GameProvider: React.FC = ({ children }) => {
  const { state: { currentGame } } = useContext(AppContext);
  const [strikes, setStrikes] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<AnswerIds>([]);
  const { data } = useSurveysQuery();

  const survey = data?.surveys[0];

  const status: GameStatus = useMemo(() => {
    if (!survey) {
      return GameStatus.NotStarted;
    }
    if (strikes > 2) {
      return GameStatus.Lose;
    }
    if (correctAnswers.length === survey.answers.length) {
      return GameStatus.Win;
    }
    return GameStatus.InProgress;
  }, [
    correctAnswers, 
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
      correctAnswers,
      status,
      hasEnded,
      setCorrectAnswers,      
      setStrikes,
      strikes,
      title: survey?.title ?? '',
      token: currentGame?.token
    }}>
      {children}
    </GameContext.Provider>
  );
}