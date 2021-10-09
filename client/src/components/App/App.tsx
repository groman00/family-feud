import React from 'react';
import './App.css';
import Surveys from '../Surveys';
import { AppContext } from '../../contexts';
import { reducer, initialState, Action } from '../../store';
import { Game } from '../Game'

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const toComponent = () => {
    if (state.currentGame) {
      return <Game />;
    }
    return <Surveys />;
  }

  return (
    <div className="App">
      <AppContext.Provider 
        value={{
          dispatch: (action: Action) => {
            console.log(action);
            dispatch(action);
          },
          state,
        }}
      >
        { toComponent() }
      </AppContext.Provider>
    </div>
  );
}

export default App;
