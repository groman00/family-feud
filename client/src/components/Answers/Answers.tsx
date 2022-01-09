import { Answer } from "../../graphql/generated/types";
import { useSelector } from "../../hooks";
import { getSurvey } from "../../store";

export const Answers: React.FC<{ children: (answer: Answer) => React.ReactNode }> = ({ children }) => (
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
