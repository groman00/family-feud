import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { useRevealAnswerMutation } from "../../graphql/generated/types";
import { useStoreState } from "../../hooks";
import { Answers } from "../Answers";

export const Host: React.FC = () => {
  const { 
    hasEnded,
    setStrikes,
    // token
  } = useContext(GameContext);  
  const { game: { token } } =  useStoreState();
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
        {({ id, revealed, text}) => (
          <button 
            disabled={hasEnded || revealed}
            onClick={(e) => {
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