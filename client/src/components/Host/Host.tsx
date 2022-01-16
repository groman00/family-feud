import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { useGiveStrikeMutation, useRevealAnswerMutation } from "../../graphql/generated/types";
import { useSelector } from "../../hooks";
import { getGameToken, getSurvey } from "../../store";
import { Answers } from "../Answers";

export const Host: React.FC = () => {
  const { 
    hasEnded,
    setStrikes,
    // token
  } = useContext(GameContext);  
  const token =  useSelector(getGameToken);
  const { id: surveyId } =  useSelector(getSurvey);
  const [revealAnswer] = useRevealAnswerMutation();    
  const [giveStrike] = useGiveStrikeMutation();    

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
          <button onClick={() => {
            setStrikes(strikes => strikes + 1)
            giveStrike({
              variables: {
                surveyId
              }
            });
          }}>
            STRIKE
          </button>
        )
      }     
    </div>
  );
}