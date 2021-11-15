import { useContext } from "react";
import { AppContext } from "../contexts";

export const useState = () => useContext(AppContext).state;
