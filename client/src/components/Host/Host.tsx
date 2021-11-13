import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { Answers } from "../Answers";

export const Host: React.FC = () => {
  const { 
    correctAnswers,
    hasEnded,
    setCorrectAnswers,      
    setStrikes,
    token
  } = useContext(GameContext);  
  return (
    <div>
      <h1>Host</h1>
      <h2>Game Token: {token}</h2>
      <Answers>
        {answer => (
          <button 
            disabled={hasEnded || correctAnswers.includes(answer.id)}
            onClick={(e) => setCorrectAnswers(answers => [...answers, answer.id])}
          >
            {answer.text}
          </button>
        )}
      </Answers>
      {
        hasEnded ? (
          <div>
            <h2>Round Over</h2>
            <button onClick={() => {
              setStrikes(0);
              setCorrectAnswers([]);
            }}>
              Start Next Round
            </button>
          </div>  
        ) : (
          <button onClick={() => setStrikes(strikes => strikes + 1)}>
            STRIKE
          </button>
        )
      }     
    </div>
  );
}