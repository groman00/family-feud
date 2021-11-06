import React from 'react';
import { useCreateGame } from '../../hooks';
import './Menu.css';

export const Menu: React.FC = () => {
  const createGameMutation = useCreateGame();

  return (
    <div className="menu">
      <div>
        <button 
          onClick={() => createGameMutation()}
        >
          Create Game
        </button>
      </div>
      <hr />
      <div>
        <label>
          Join Game: <input placeholder="Enter Game Code"/>
        </label>
        <button>Join</button>
      </div>
    </div>
  )
}
