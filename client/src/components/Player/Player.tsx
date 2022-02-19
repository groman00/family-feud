import React from 'react';
import { Answers } from '../Answers';

const Player: React.FC = () => (
  <div>
    <h2>player</h2>
    <Answers>
      { answer => answer.revealed && answer.text }
    </Answers>
  </div>
);

export default Player;
