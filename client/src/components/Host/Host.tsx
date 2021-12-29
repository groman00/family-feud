import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { useRevealAnswerMutation } from "../../graphql/generated/types";
import { Answers } from "../Answers";

export const Host: React.FC = () => {
  const { 
    correctAnswers,
    hasEnded,
    setCorrectAnswers,      
    setStrikes,
    token
  } = useContext(GameContext);  
  const [revealAnswer, 
    //{ data, loading, error }
  ] = useRevealAnswerMutation();    
  
  if (!token) {
    return null;
  }
  
  return (
    <div>
      <h1>Host</h1>
      <h2>Game Token: {token}</h2>
      <Answers>
        {({ id, text}) => (
          <button 
            disabled={hasEnded || correctAnswers.includes(id)}
            onClick={(e) => {
              setCorrectAnswers(answers => [...answers, id]);
              revealAnswer({
                variables: {
                  token,
                  answerId: id
                }
              });
            }}
          >
            {text}
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