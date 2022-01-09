import { useContext } from "react";
import { AppContext } from "../contexts";
import { State } from "../store";

export const useDispatch = () => useContext(AppContext).dispatch;

export const useSelector = <Selected extends unknown>(
  selectorFn: (state: State) => Selected
) => {
  const { state } = useContext(AppContext);
  return selectorFn(state);
}
