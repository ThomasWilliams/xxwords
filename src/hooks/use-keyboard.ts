import { Dispatch } from "react";
import { Action, keystrokeAction } from "../store/actions";
import { useEffect } from "react";

export const useKeyboard = (dispatch: Dispatch<Action>) => {
  useEffect(() => {
    const keyDownHandler = ({ key }: KeyboardEvent) => {
      // const action = getActionForKey(key);
      // if (action) {
      dispatch(keystrokeAction(key));
      // }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [dispatch]);
};
