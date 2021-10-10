import React from 'react';
import './App.css';
import Surveys from '../Surveys';
import { AppContext } from '../../contexts';
import { useReducerWithMiddleware } from '../../store';
import { Game } from '../Game'
import { useOnGameCreatedSubscription } from '../../graphql/generated/types';

function App() {
  const [state, dispatch] = useReducerWithMiddleware();

  const { data, loading, error } = useOnGameCreatedSubscription({
    variables: {},
  });  
  
  console.log('subscription data', loading, data, error);

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
