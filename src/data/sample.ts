import { Direction, Puzzle } from "./model";

export const sample: Puzzle = {
  clues: [
    { number: 1, direction: Direction.ACROSS, text: "OR neighbor" },
    { number: 3, direction: Direction.ACROSS, text: "Droid" },
    { number: 5, direction: Direction.ACROSS, text: "Behold!" },
    { number: 1, direction: Direction.DOWN, text: "Trucker's radio" },
    { number: 2, direction: Direction.DOWN, text: "MSN competitor" },
    { number: 4, direction: Direction.DOWN, text: "A preposition" }
  ],
  cells: [
    [
      {
        clueNumber: 1,
        block: false,
        style: { shape: "Circle" },
        solution: "C"
      },
      { clueNumber: 2, block: false, solution: "A" },
      { block: true }
    ],
    [
      { clueNumber: 3, block: false, solution: "B" },
      {
        block: false,
        style: { shape: "Circle" },
        solution: "O"
      },
      { clueNumber: 4, block: false, solution: "T" }
    ],
    [
      { block: true },
      { clueNumber: 5, block: false, solution: "L" },
      {
        block: false,
        style: { shape: "Circle" },
        solution: "O"
      }
    ]
  ]
};
