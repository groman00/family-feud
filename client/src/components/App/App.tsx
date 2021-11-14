import React from 'react';
import './App.css';
import { Menu } from '../Menu';
import { AppContext } from '../../contexts';
import { useReducerWithMiddleware } from '../../store';
import { Game } from '../Game'
import { useOnGameCreatedSubscription } from '../../graphql/generated/types';

function App() {
  const [state, dispatch] = useReducerWithMiddleware();

  const { data, loading, error } = useOnGameCreatedSubscription({
    variables: {},
  });  
  
  console.log('GAME CREATED: loading:', loading, 'data:', data, 'error:', error);

  console.log(state.currentGame);
  
  const toComponent = () => {
    if (state.currentGame) {
      return <Game />;
    }
    return <Menu />
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
