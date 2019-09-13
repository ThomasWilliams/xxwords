import classNames from "classnames";

export type StyledProps<P = {}> = P & { className?: string };

export const pixels = (px: number) => `${px}px`;

export const classNameBuilder = (className?: string) => (classObj: object) =>
  classNames({
    ...(className && { [className]: true }),
    ...classObj
  });

export const styleConstants = {
  cellWidth: 50,
  cellHeight: 50,
  cellBorder: 2,
  gridBorder: 2
};
