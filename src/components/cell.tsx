import React, { useContext } from "react";
import styled from "styled-components";
import { puzzleContext } from "./app";
import { Position } from "../data/model";
import { clickAction } from "../store/actions";
import {
  classNameBuilder,
  pixels,
  styleConstants,
  StyledProps
} from "./style-helpers";

export type CellProps = StyledProps<{
  position: Position;
  isBlock: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
  clueNumber?: number;
  fill?: string;
}>;

const Fill: React.FC = styled.div`
  width: ${pixels(styleConstants.cellWidth)};
  height: ${pixels(styleConstants.cellHeight)};
  line-height: ${pixels(styleConstants.cellHeight)};
  font-size: ${pixels(styleConstants.cellHeight * 0.75)};
  font-weight: bold;
  text-align: center;
`;

const ClueNumber: React.FC = styled.div`
  font-size: ${pixels(styleConstants.cellWidth / 4)};
  font-weight: bold;
  position: absolute;
  left: ${pixels(styleConstants.cellWidth / 12.5)};
  top: ${pixels(styleConstants.cellHeight / 50)};
`;

const Cell: React.FC<CellProps> = props => {
  const { dispatch } = useContext(puzzleContext);
  const clickHandler = () => dispatch(clickAction(props.position));

  return (
    <div
      className={classNameBuilder(props.className)({
        Cell: true,
        block: props.isBlock,
        highlighted: props.isHighlighted,
        selected: props.isSelected
      })}
      onClick={clickHandler}
    >
      {props.clueNumber && <ClueNumber>{props.clueNumber}</ClueNumber>}
      {props.fill && <Fill>{props.fill}</Fill>}
    </div>
  );
};

export default styled<typeof Cell>(Cell)`
  width: ${pixels(styleConstants.cellWidth)};
  height: ${pixels(styleConstants.cellHeight)};
  border: ${pixels(styleConstants.cellBorder)} solid black;
  position: relative;
  background-color: ${props => {
    if (props.isBlock) return "black";
    if (props.isSelected) return "yellow";
    if (props.isHighlighted) return "silver";
    return "white";
  }};
`;
