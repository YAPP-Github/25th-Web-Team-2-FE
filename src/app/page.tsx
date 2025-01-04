'use client';

import { css } from '@emotion/react';

import theme from '@/styles/theme';

export default function Home() {
  return (
    <div>
      <span css={testStyle}>test</span>
    </div>
  );
}

const testStyle = css`
  ${theme.fonts.body.normal.SB16}
  color: ${theme.colors.primaryMint};
`;
