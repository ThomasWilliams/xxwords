import { Direction, Position } from "../data/model";
import { PuzzleState } from "../components/app";
import { Action, ActionType, ClickAction, KeystrokeAction } from "./actions";

enum Signum {
  POSITIVE = 1,
  NEGATIVE = -1
}

export const puzzleReducer = (
  state: PuzzleState,
  action: Action
): PuzzleState => {
  switch (action.type) {
    case ActionType.CLICK:
      return getNewStateFromClickAction(state, action as ClickAction);
    case ActionType.KEYSTROKE:
      return getNewStateFromKeystrokeAction(state, action as KeystrokeAction);
    default:
      return { ...state };
  }
};

const getNewStateFromClickAction = (
  state: PuzzleState,
  { position: clickedPosition }: ClickAction
): PuzzleState => {
  const newDirection = positionsAreEqual(state.position, clickedPosition)
    ? toggleDirection(state.direction)
    : state.direction;
  return {
    ...state,
    direction: newDirection,
    position: clickedPosition
  };
};

const getNewStateFromKeystrokeAction = (
  state: PuzzleState,
  { key }: KeystrokeAction
): PuzzleState => {
  const { position, direction } = state;
  if (key.startsWith("Arrow")) {
    if (
      ((key.endsWith("Down") || key.endsWith("Up")) &&
        direction === Direction.ACROSS) ||
      ((key.endsWith("Right") || key.endsWith("Left")) &&
        direction === Direction.DOWN)
    ) {
      const newDirection = toggleDirection(direction);
      return {
        ...state,
        direction: newDirection
      };
    }

    const signum =
      key.endsWith("Down") || key.endsWith("Right")
        ? Signum.POSITIVE
        : Signum.NEGATIVE;
    const newPosition = findNextPosition({ ...state, signum });
    const newDirection = directionHasChanged(position, newPosition, signum)
      ? toggleDirection(direction)
      : direction;
    return {
      ...state,
      position: newPosition,
      direction: newDirection
    };
  }
  return { ...state };
};

const positionsAreEqual = (pos1: Position, pos2: Position): boolean =>
  pos1[0] === pos2[0] && pos1[1] === pos2[1];

const toggleDirection = (dir: Direction): Direction =>
  dir === Direction.ACROSS ? Direction.DOWN : Direction.ACROSS;

export const positionToIndex = (
  dir: Direction,
  width: number,
  height: number
) => {
  return dir === Direction.ACROSS //
    ? ([row, col]: Position): number => row * width + col
    : ([row, col]: Position): number => col * height + row;
};

export const indexToPosition = (
  dir: Direction,
  width: number,
  height: number
) => {
  return dir === Direction.ACROSS
    ? (index: number): Position => [Math.floor(index / width), index % width]
    : (index: number): Position => [index % height, Math.floor(index / height)];
};

function findNextPosition({
  cells,
  position,
  direction,
  signum
}: PuzzleState & { signum: Signum }): Position {
  const width = cells[0].length;
  const height = cells.length;
  const cellCount = width * height;
  const toIndex = positionToIndex(direction, width, height);
  const fromIndex = indexToPosition(direction, width, height);

  let index = toIndex(position);
  let newPos: Position;
  do {
    index = (index + signum + cellCount) % cellCount;
    newPos = fromIndex(index);
  } while (cells[newPos[0]][newPos[1]].block);

  return newPos;
}

const directionHasChanged = (
  initialPosition: Position,
  newPosition: Position,
  signum: Signum
): Boolean => {
  return signum === Signum.POSITIVE
    ? newPosition[0] < initialPosition[0] && newPosition[1] < initialPosition[1]
    : newPosition[0] > initialPosition[0] &&
        newPosition[1] > initialPosition[1];
};
