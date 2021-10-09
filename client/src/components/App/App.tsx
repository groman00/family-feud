import React from 'react';
import './App.css';
import Surveys from '../Surveys';
import { AppContext } from '../../contexts';
import { reducer, initialState, Action } from '../../store';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  if (state.currentGame) {
    return <>playing</>;
  }

  return (
    <div className="App">
      <AppContext.Provider 
        value={{
          dispatch: (action: Action) => {
            console.log(action);
            dispatch(action);
          },
          // state,
        }}
      >
        <Surveys />
      </AppContext.Provider>
    </div>
  );
}

export default App;
