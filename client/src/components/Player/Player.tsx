import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { Answers } from "../Answers";

export const Player: React.FC = () => {
  const { correctAnswers } = useContext(GameContext);  
  return (
    <div>
      <h2>player</h2>
      <Answers>
        { answer => correctAnswers.includes(answer.id) && answer.text }
      </Answers>
    </div>
  );
};
