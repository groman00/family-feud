import { Answers } from "../Answers";

export const Player: React.FC = () => (
  <div>
    <h2>player</h2>
    <Answers>
      { answer => answer.revealed && answer.text }
    </Answers>
  </div>
);
