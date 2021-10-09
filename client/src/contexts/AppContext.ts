import React from "react";
import { Action, State } from "../store";

interface Context {
  dispatch: React.Dispatch<Action>,
  state: State
}

export const AppContext = React.createContext<Context>({} as Context);
