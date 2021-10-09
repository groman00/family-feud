import React from "react";
import { Action } from "../store";

interface Context {
  dispatch: React.Dispatch<Action>
}

export const AppContext = React.createContext<Context>({} as Context);
