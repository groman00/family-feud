import React from 'react'
import { Surveys_surveys_answers } from '../__generated__/Surveys';

interface Props {
  answer: Surveys_surveys_answers;
}
export const GameBoardAnswer: React.FC<Props> = ({ answer }) => {
  const [revealed, setRevealed] = React.useState(false);
  const { rank, text } = answer;
  return (
    <>
      { 
        revealed ? (
          <div className="answer">
            {text}
          </div>
        ) : (
          <button  
            className="answer"
            onClick={() => setRevealed(true)}
          >
            {rank}
          </button>                
        )
      }
    </>
  );
}
