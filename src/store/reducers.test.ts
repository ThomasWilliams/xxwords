import { PuzzleState } from "../components/app";
import { Direction, Position } from "../data/model";
import { sample } from "../data/sample";
import { clickAction, keystrokeAction } from "./actions";
import { indexToPosition, positionToIndex, puzzleReducer } from "./reducers";

describe("positionToIndex", () => {
  test.each`
    direction           | width | height | position  | index
    ${Direction.ACROSS} | ${5}  | ${5}   | ${[0, 0]} | ${0}
    ${Direction.ACROSS} | ${5}  | ${5}   | ${[0, 1]} | ${1}
    ${Direction.ACROSS} | ${5}  | ${5}   | ${[1, 0]} | ${5}
    ${Direction.ACROSS} | ${6}  | ${2}   | ${[1, 0]} | ${6}
    ${Direction.ACROSS} | ${5}  | ${5}   | ${[2, 3]} | ${13}
    ${Direction.ACROSS} | ${5}  | ${5}   | ${[3, 2]} | ${17}
    ${Direction.ACROSS} | ${7}  | ${4}   | ${[2, 3]} | ${17}
    ${Direction.ACROSS} | ${7}  | ${4}   | ${[3, 2]} | ${23}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${[0, 0]} | ${0}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${[0, 1]} | ${5}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${[1, 0]} | ${1}
    ${Direction.DOWN}   | ${6}  | ${2}   | ${[1, 0]} | ${1}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${[2, 3]} | ${17}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${[3, 2]} | ${13}
    ${Direction.DOWN}   | ${7}  | ${4}   | ${[2, 3]} | ${14}
    ${Direction.DOWN}   | ${7}  | ${4}   | ${[3, 2]} | ${11}
  `(
    "positionToIndex($direction, $width, $height)($position) should be $index",
    ({ direction, position, width, height, index }) => {
      expect(positionToIndex(direction, width, height)(position)).toBe(index);
    }
  );
});

describe("indexToPosition", () => {
  test.each`
    direction           | width | height | index | position
    ${Direction.ACROSS} | ${5}  | ${5}   | ${0}  | ${[0, 0]}
    ${Direction.ACROSS} | ${5}  | ${5}   | ${1}  | ${[0, 1]}
    ${Direction.ACROSS} | ${5}  | ${5}   | ${5}  | ${[1, 0]}
    ${Direction.ACROSS} | ${6}  | ${2}   | ${6}  | ${[1, 0]}
    ${Direction.ACROSS} | ${5}  | ${5}   | ${13} | ${[2, 3]}
    ${Direction.ACROSS} | ${5}  | ${5}   | ${17} | ${[3, 2]}
    ${Direction.ACROSS} | ${7}  | ${4}   | ${17} | ${[2, 3]}
    ${Direction.ACROSS} | ${7}  | ${4}   | ${23} | ${[3, 2]}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${0}  | ${[0, 0]}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${5}  | ${[0, 1]}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${1}  | ${[1, 0]}
    ${Direction.DOWN}   | ${6}  | ${2}   | ${1}  | ${[1, 0]}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${17} | ${[2, 3]}
    ${Direction.DOWN}   | ${5}  | ${5}   | ${13} | ${[3, 2]}
    ${Direction.DOWN}   | ${7}  | ${4}   | ${14} | ${[2, 3]}
    ${Direction.DOWN}   | ${7}  | ${4}   | ${11} | ${[3, 2]}
  `(
    "indexToPosition($direction, $width, $height)($index) should be $position",
    ({ direction, position, width, height, index }) => {
      expect(indexToPosition(direction, width, height)(index)).toEqual(
        position
      );
    }
  );
});

// describe("findNextPosition");

const generateSampleState = (
  partialState?: Partial<PuzzleState>
): PuzzleState => ({
  ...sample,
  direction: Direction.ACROSS,
  position: [0, 0],
  ...partialState
});

describe("puzzleReducer", () => {
  describe("click action dispatched", () => {
    describe("clicked position is current position", () => {
      const initialState = generateSampleState();
      const action = clickAction(initialState.position);

      it("keeps the same position", () => {
        const newState = puzzleReducer(initialState, action);
        expect(newState.position).toEqual(initialState.position);
      });

      it("switches the direction", () => {
        const newState = puzzleReducer(initialState, action);
        expect(newState.direction).not.toBe(initialState.direction);
      });
    });

    describe("clicked position is different direction", () => {
      const initialState = generateSampleState();
      const newPosition: Position = [1, 1];
      const action = clickAction(newPosition);

      it("keeps the same direction", () => {
        const newState = puzzleReducer(initialState, action);
        expect(newState.direction).toEqual(initialState.direction);
      });

      it("moves to the new position", () => {
        const newState = puzzleReducer(initialState, action);
        expect(newState.position).toEqual(newPosition);
      });
    });
  });

  describe("keystroke action dispatched", () => {
    describe("down arrow", () => {
      const action = keystrokeAction("ArrowDown");

      describe("current direction is across", () => {
        const currentDirection = Direction.ACROSS;
        const initialState = generateSampleState({
          direction: currentDirection
        });

        it("keeps the same position", () => {
          const newState = puzzleReducer(initialState, action);
          expect(newState.position).toEqual(initialState.position);
        });
        it("switches the direction", () => {
          const newState = puzzleReducer(initialState, action);
          expect(newState.direction).not.toEqual(initialState.direction);
        });
      });

      describe("current direction is down", () => {
        const currentDirection = Direction.DOWN;

        describe("current position is not at the end of the column", () => {
          const currentPosition: Position = [1, 2];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("keeps the same direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).toEqual(initialState.direction);
          });

          it("moves to the next non-block position in the column", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([2, 2]);
          });
        });

        describe("current position is at the end of the column", () => {
          const currentPosition: Position = [2, 1];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("keeps the same direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).toEqual(initialState.direction);
          });

          it("moves to the first non-block position in the next column", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([1, 2]);
          });
        });

        describe("current position is at the end of the last column", () => {
          const currentPosition: Position = [2, 2];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("switches the direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).not.toEqual(initialState.direction);
          });

          it("moves to the first non-block position in the first row", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([0, 0]);
          });
        });
      });
    });

    describe("up arrow", () => {
      const action = keystrokeAction("ArrowUp");

      describe("current direction is across", () => {
        const currentDirection = Direction.ACROSS;
        const initialState = generateSampleState({
          direction: currentDirection
        });

        it("keeps the same position", () => {
          const newState = puzzleReducer(initialState, action);
          expect(newState.position).toEqual(initialState.position);
        });
        it("switches the direction", () => {
          const newState = puzzleReducer(initialState, action);
          expect(newState.direction).not.toEqual(initialState.direction);
        });
      });

      describe("current direction is down", () => {
        const currentDirection = Direction.DOWN;

        describe("current position is not at the beginning of the column", () => {
          const currentPosition: Position = [1, 1];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("keeps the same direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).toEqual(initialState.direction);
          });

          it("moves to the previous non-block position in the column", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([0, 1]);
          });
        });

        describe("current position is at the beginning of the column", () => {
          const currentPosition: Position = [0, 1];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("keeps the same direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).toEqual(initialState.direction);
          });

          it("moves to the last non-block position in the previous column", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([1, 0]);
          });
        });

        describe("current position is at the beginning of the first column", () => {
          const currentPosition: Position = [0, 0];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("switches the direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).not.toEqual(initialState.direction);
          });

          it("moves to the last non-block position in the last row", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([2, 2]);
          });
        });
      });
    });

    describe("right arrow", () => {
      const action = keystrokeAction("ArrowRight");

      describe("current direction is down", () => {
        const currentDirection = Direction.DOWN;
        const initialState = generateSampleState({
          direction: currentDirection
        });

        it("keeps the same position", () => {
          const newState = puzzleReducer(initialState, action);
          expect(newState.position).toEqual(initialState.position);
        });

        it("switches the direction", () => {
          const newState = puzzleReducer(initialState, action);
          expect(newState.direction).not.toEqual(initialState.direction);
        });
      });

      describe("current direction is across", () => {
        const currentDirection = Direction.ACROSS;

        describe("current position is not at the end of the row", () => {
          const currentPosition: Position = [1, 1];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("keeps the same direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).toEqual(initialState.direction);
          });

          it("moves to the next non-block position in the row", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([1, 2]);
          });
        });

        describe("current position is at the end of the row", () => {
          const currentPosition: Position = [1, 2];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("keeps the same direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).toEqual(initialState.direction);
          });

          it("moves to the first non-block position in the next row", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([2, 1]);
          });
        });

        describe("current position is at the end of the last row", () => {
          const currentPosition: Position = [2, 2];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("switches the direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).not.toEqual(initialState.direction);
          });

          it("moves to the first non-block position in the first row", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([0, 0]);
          });
        });
      });
    });

    describe("left arrow", () => {
      const action = keystrokeAction("ArrowLeft");

      describe("current direction is down", () => {
        const currentDirection = Direction.DOWN;
        const initialState = generateSampleState({
          direction: currentDirection
        });

        it("keeps the same position", () => {
          const newState = puzzleReducer(initialState, action);
          expect(newState.position).toEqual(initialState.position);
        });

        it("switches the direction", () => {
          const newState = puzzleReducer(initialState, action);
          expect(newState.direction).not.toEqual(initialState.direction);
        });
      });

      describe("current direction is across", () => {
        const currentDirection = Direction.ACROSS;

        describe("current position is not at the beginning of the row", () => {
          const currentPosition: Position = [1, 1];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("keeps the same direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).toEqual(initialState.direction);
          });

          it("moves to the previous non-block position in the row", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([1, 0]);
          });
        });

        describe("current position is at the beginning of the row", () => {
          const currentPosition: Position = [1, 0];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("keeps the same direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).toEqual(initialState.direction);
          });

          it("moves to the last non-block position in the previous row", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([0, 1]);
          });
        });

        describe("current position is at the beginning of the first row", () => {
          const currentPosition: Position = [0, 0];
          const initialState = generateSampleState({
            direction: currentDirection,
            position: currentPosition
          });

          it("switches the direction", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.direction).not.toEqual(initialState.direction);
          });

          it("moves to the last non-block position in the last row", () => {
            const newState = puzzleReducer(initialState, action);
            expect(newState.position).toEqual([2, 2]);
          });
        });
      });
    });

    describe("space key", () => {});
    describe("tab key", () => {});
    describe("enter key", () => {});

    describe("letter key", () => {
      it.todo("fills the current cell with the letter");

      describe("when there is an open position later in the puzzle in the same direction", () => {
        it.todo("keeps the same direction");
        it.todo("moves to the next open position in the current direction");
      });

      describe("when there is no open position later in the puzzle in the current direction", () => {
        it.todo("switches direction");
        it.todo("moves to the first open position in the opposite direction");
      });

      describe("when it is the last open cell in the puzzle", () => {
        it.todo("");
      });
    });
  });
});

// describe("directionReducer", () => {
//   describe("click action", () => {
//     const initialState = generateSampleState();

//     describe("clicked position is current position", () => {
//       const action = clickAction(initialState.position);

//       it("switches the direction", () => {
//         const newState = puzzleReducer(initialState, action);
//         expect(newState.direction).not.toBe(initialState.direction);
//       });
//     });

//     describe("clicked position is not current position", () => {
//       const newPosition: Position = [1, 1];
//       const action = clickAction(newPosition);

//       it("keeps the same direction", () => {
//         const newState = puzzleReducer(initialState, action);
//         expect(newState.direction).toEqual(initialState.direction);
//       });
//     });
//   });

//   describe("keystroke action", () => {
//     describe("down arrow", () => {
//       describe("current direction is across", () => {
//         it("keeps the same position");
//         it("switches the direction");
//       });

//       describe("current direction is down", () => {
//         describe("current position is not at the end of the column", () => {
//           it("keeps the same direction");
//           it("moves to the next non-block position in the column");
//         });

//         describe("current position is at the end of the column", () => {
//           it("keeps the same direction");
//           it("moves to the first non-block position in the next column");
//         });

//         describe("current position is at the end of the last column", () => {
//           it("switches the direction");
//           it("moves to the first non-block position in the first row");
//         });
//       });
//     });

//     describe("up arrow", () => {
//       describe("current direction is across", () => {
//         it("switches the direction");
//       });

//       describe("current direction is down", () => {
//         describe("current position is not at the beginning of the column", () => {
//           it("keeps the same direction");
//         });

//         describe("current position is at the beginning of the column", () => {
//           it("keeps the same direction");
//         });

//         describe("current position is at the beginning of the first column", () => {
//           it("switches the direction");
//         });
//       });
//     });

//     describe("right arrow", () => {
//       describe("current direction is down", () => {
//         it("switches the direction");
//       });

//       describe("current direction is across", () => {
//         describe("current position is not at the end of the row", () => {
//           it("keeps the same direction");
//         });

//         describe("current position is at the end of the row", () => {
//           it("keeps the same direction");
//         });

//         describe("current position is at the end of the last row", () => {
//           it("switches the direction");
//         });
//       });
//     });

//     describe("left arrow", () => {
//       describe("current direction is down", () => {
//         it("switches the direction");
//       });

//       describe("current direction is across", () => {
//         describe("current position is not at the beginning of the row", () => {
//           it("keeps the same direction");
//         });

//         describe("current position is at the beginning of the row", () => {
//           it("keeps the same direction");
//         });

//         describe("current position is at the beginning of the first row", () => {
//           it("switches the direction");
//         });
//       });
//     });
//   });
// });
