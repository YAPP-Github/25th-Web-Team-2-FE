import { css } from '@emotion/react';

export const containerStyle = ({
  width,
  height,
  rotate = 0,
  cursor = 'initial',
}: {
  width?: number;
  height?: number;
  rotate?: number;
  cursor?: string;
}) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width}px;
  height: ${height}px;
  transform: rotate(${rotate}deg);
  transition: all 0.3s;
  cursor: ${cursor};
`;
