import { useContext } from "react";
import { AppContext } from "../contexts";

export const useStoreState = () => useContext(AppContext).state;

export const useDispatch = () => useContext(AppContext).dispatch;
