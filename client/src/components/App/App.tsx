import React, { useCallback, useMemo } from 'react';
import './App.css';
import { Menu } from '../Menu';
import { AppContext } from '../../contexts';
import { useReducerWithMiddleware } from '../../store';
import { Game } from '../Game';
// import { useOnGameCreatedSubscription } from '../../graphql/generated/types';

const App = () => {
  const [state, dispatch] = useReducerWithMiddleware();

  // const { data, loading, error } = useOnGameCreatedSubscription({
  //   variables: {},
  // });

  // console.log('GAME CREATED: loading:', loading, 'data:', data, 'error:', error);

  console.log('CURRENT STATE:', state);

  const toComponent = useCallback(() => {
    if (state.game.token) {
      return <Game token={state.game.token} />;
    }
    return <Menu />;
  }, [state.game.token]);

  // Todo: Make sure this works.
  const value = useMemo(() => ({
    dispatch,
    state,
  }), []);

  return (
    <div className="App">
      <AppContext.Provider
        value={value}
      >
        { toComponent() }
      </AppContext.Provider>
    </div>
  );
};

export default App;
