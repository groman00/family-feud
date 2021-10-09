import React from 'react';
import './App.css';
import Surveys from '../Surveys';
import { AppContext } from '../../contexts';
import { useReducerWithMiddleware } from '../../store';
import { Game } from '../Game'

function App() {
  const [state, dispatch] = useReducerWithMiddleware();

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
          dispatch,
          state,
        }}
      >
        { toComponent() }
      </AppContext.Provider>
    </div>
  );
}

export default App;
