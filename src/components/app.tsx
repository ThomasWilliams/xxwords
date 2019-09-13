import React, { createContext, Dispatch, useEffect, useReducer } from "react";
import { sample } from "../data/sample";
import { Direction, Position, Puzzle as PuzzleModel } from "../data/model";
// import { useKeyboard } from "../hooks/use-keyboard";
import { Action, keystrokeAction } from "../store/actions";
import { puzzleReducer } from "../store/reducers";
import Puzzle from "./puzzle";

export type PuzzleState = PuzzleModel & {
  direction: Direction;
  position: Position;
};

export type PuzzleContext = PuzzleState & {
  dispatch: Dispatch<Action>;
};

const initialState: PuzzleState = {
  ...sample,
  direction: Direction.ACROSS,
  position: [0, 0]
};

export const puzzleContext = createContext({} as PuzzleContext);

const App: React.FC = () => {
  const [puzzle, dispatch] = useReducer(puzzleReducer, initialState);

  // useKeyboard(dispatch);

  useEffect(() => {
    const keyDownHandler = ({ key }: KeyboardEvent) => {
      dispatch(keystrokeAction(key));
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <puzzleContext.Provider value={{ ...puzzle, dispatch }}>
      <Puzzle />
    </puzzleContext.Provider>
  );
};

export default App;
