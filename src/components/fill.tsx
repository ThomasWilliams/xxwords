import React from "react";
import styled from "styled-components/macro";
import { pixels } from "./style-helpers";

export type FillProps = {
  fill: string;
  cellWidth: number;
  cellHeight: number;
};

const Fill = ({ fill }: FillProps) => <div className="Fill">{fill}</div>;

export default styled(Fill)`
  width: ${props => pixels(props.cellWidth)};
  height: ${props => pixels(props.cellHeight)};
  line-height: ${props => pixels(props.cellHeight)};
  font-size: ${props => pixels(props.cellHeight * 0.75)};
  font-weight: bold;
  text-align: center;
`;
