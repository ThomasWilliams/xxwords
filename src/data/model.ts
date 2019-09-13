export enum Direction {
  ACROSS = "across",
  DOWN = "down"
}

export type Position = [number, number];

export type Clue = {
  number: number;
  direction: Direction;
  text: string;
};

export type CellStyle = {
  shape?: string;
};

export type Cell = {
  clueNumber?: number;
  block: boolean;
  style?: CellStyle;
  solution?: string;
  fill?: string;
};

export type Puzzle = {
  clues: Clue[];
  cells: Cell[][];
};
