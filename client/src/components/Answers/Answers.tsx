import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { Answer } from "../../graphql/generated/types";

export const Answers: React.FC<{ children: (answer: Answer) => React.ReactNode }> = ({ children }) => {
  const { answers } = useContext(GameContext);  
  return (
    <div className="answers">
      {
        answers?.map(answer => (
          <div className="answer" key={answer.id}>
            {children(answer)}
          </div>
        ))
      }
    </div>
  );
};