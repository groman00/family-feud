import { Answer } from "../../graphql/generated/types";
import { useStoreState } from "../../hooks";

export const Answers: React.FC<{ children: (answer: Answer) => React.ReactNode }> = ({ children }) => {
  const { survey } = useStoreState();  
  return (
    <div className="answers">
      {
        survey?.answers.map(answer => (
          <div className="answer" key={answer.id}>
            {children(answer)}
          </div>
        ))
      }
    </div>
  );
};