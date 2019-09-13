import React from "react";
import styled from "styled-components/macro";
import { pixels } from "./style-helpers";

export type ClueNumberProps = {
  clueNumber: number;
  cellWidth: number;
  cellHeight: number;
};

const ClueNumber = ({ clueNumber }: ClueNumberProps) => (
  <div className="ClueNumber">{clueNumber}</div>
);

export default styled(ClueNumber)`
  font-size: ${props => pixels(props.cellWidth / 4)};
  font-weight: bold;
  position: absolute;
  left: ${props => pixels(props.cellWidth / 12.5)};
  top: ${props => pixels(props.cellHeight / 50)};
`;
