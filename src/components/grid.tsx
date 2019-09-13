import React from "react";
import styled from "styled-components";
import { Cell, Direction, Position } from "../data/model";
import CellComponent, { CellProps } from "./cell";
import {
  classNameBuilder,
  pixels,
  styleConstants,
  StyledProps
} from "./style-helpers";

export type GridProps = StyledProps<{
  cells: Cell[][];
  position: Position;
  direction: Direction;
}>;

const positionIsHighlighted = (
  cellPosition: Position,
  selectedPosition: Position,
  direction: Direction
): boolean => {
  if (direction === Direction.ACROSS)
    return cellPosition[0] === selectedPosition[0];
  if (direction === Direction.DOWN)
    return cellPosition[1] === selectedPosition[1];
  return false;
};

const positionIsSelected = (
  cellPosition: Position,
  selectedPosition: Position
): boolean =>
  cellPosition[0] === selectedPosition[0] &&
  cellPosition[1] === selectedPosition[1];

export const Grid: React.FC<GridProps> = props => {
  const { className, cells, direction, position: currentPosition } = props;
  return (
    <div className={classNameBuilder(className)({ Grid: true })}>
      {cells.map((cellRow: Cell[], row: number) =>
        cellRow.map((cell: Cell, col: number) => {
          const pos: Position = [row, col];
          const isSelected = positionIsSelected(pos, currentPosition);
          const isHighlighted = positionIsHighlighted(
            pos,
            currentPosition,
            direction
          );

          const cellProps: CellProps = {
            position: pos,
            isBlock: cell.block,
            isHighlighted,
            isSelected,
            ...(cell.clueNumber && { clueNumber: cell.clueNumber }),
            ...(cell.fill && { fill: cell.fill })
          };
          return <CellComponent {...cellProps} key={`${row}-${col}`} />;
        })
      )}
    </div>
  );
};

export default styled<typeof Grid>(Grid)`
  display: flex;
  flex-wrap: wrap;
  border: ${pixels(styleConstants.gridBorder)} solid black;
  margin-left: 100px;
  width: ${props =>
    pixels(
      props.cells[0].length *
        (styleConstants.cellWidth + styleConstants.cellBorder * 2)
    )};
  height: ${props =>
    pixels(
      props.cells.length *
        (styleConstants.cellHeight + styleConstants.cellBorder * 2)
    )};
`;
