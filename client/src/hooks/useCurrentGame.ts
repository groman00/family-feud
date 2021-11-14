import { useContext } from "react";
import { AppContext } from "../contexts";

export const useCurrentGame = () => {
  const { state: { currentGame } } = useContext(AppContext);
  return currentGame;
}
