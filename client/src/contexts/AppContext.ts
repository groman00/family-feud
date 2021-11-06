import React from "react";
import { Dispatch, State } from "../store";

interface Context {
  dispatch: Dispatch,
  state: State
}

export const AppContext = React.createContext<Context>({} as Context);
