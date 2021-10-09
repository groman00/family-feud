import React from 'react'
import { Answer } from '../../graphql/generated/types';

interface Props {
  answer: Answer;
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
