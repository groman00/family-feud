import React from 'react';
import { AppContext } from '../../contexts';
import { ActionTypes } from '../../store';
import './Menu.css';

export const Menu: React.FC = () => {
  const { dispatch } = React.useContext(AppContext)


  // dispatch({
  //   type: ActionTypes.PlayNewGame,
  // })

  return (
    <div className="menu">
      <div>
        <button 
          onClick={() => dispatch({
            type: ActionTypes.PlayNewGame,
          })}
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
