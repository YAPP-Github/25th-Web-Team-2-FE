'use client';

import { css } from '@emotion/react';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

export default function Home() {
  return (
    <div>
      <span css={testStyle}>test</span>
      <Icon icon="TriangleArrow" rotate={180} color={theme.colors.primaryMint} />
    </div>
  );
}

const testStyle = css`
  ${theme.fonts.body.normal.SB16}
  color: ${theme.colors.primaryMint};
`;
