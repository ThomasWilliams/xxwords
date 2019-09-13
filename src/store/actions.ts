import { Position } from "../data/model";

export enum ActionType {
  KEYSTROKE = "KEYSTROKE",
  CLICK = "CLICK"
  // MOVE_UP = "MOVE_UP",
  // MOVE_DOWN = "MOVE_DOWN",
  // MOVE_LEFT = "MOVE_LEFT",
  // MOVE_RIGHT = "MOVE_RIGHT",
  // BACKSPACE = "BACKSPACE",
  // FILL = "FILL",
  // UPDATE_POSITION = "UPDATE_POSITION",
  // TOGGLE_DIRECTION = "TOGGLE_DIRECTION",
  // NEXT_CLUE = "NEXT_CLUE"
}

export interface Action {
  type: ActionType;
}

export interface KeystrokeAction extends Action {
  type: ActionType.KEYSTROKE;
  key: string;
}

export interface ClickAction extends Action {
  type: ActionType.CLICK;
  position: Position;
}

export const keystrokeAction = (key: string): KeystrokeAction => ({
  type: ActionType.KEYSTROKE,
  key
});

export const clickAction = (position: Position): ClickAction => ({
  type: ActionType.CLICK,
  position
});
