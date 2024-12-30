'use client';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';
import { css } from '@emotion/react';

export default function Home() {
  return (
    <div>
      <span css={testStyle}>test</span>
      <Icon icon="TriangleArrow" rotate={180} color={theme.colors.primaryMint} />
    </div>
  );
}

const testStyle = css`
  ${theme.fonts.body.R16}
  color: ${theme.colors.primaryMint};
`;
