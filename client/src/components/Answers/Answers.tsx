import * as React from 'react';
import { Answer } from '../../graphql/generated/types';
import { useSelector } from '../../hooks';
import { getSurvey } from '../../store';

type Props = {
  children: (answer: Answer) => React.ReactNode
}

const Answers: React.FC<Props> = ({ children }) => (
  <div className="answers">
    {
      useSelector(getSurvey)?.answers.map(answer => (
        <div className="answer" key={answer.id}>
          {children(answer)}
        </div>
      ))
    }
  </div>
);

export default Answers;
