'use client';

import { Theme } from '@emotion/react';
import { css } from '@emotion/react';

function JoinLayout({ children }: { children: React.ReactNode }) {
  return <div css={joinLayout}>{children}</div>;
}

const joinLayout = (theme: Theme) => css`
  display: flex;
  background-color: ${theme.colors.field01};
  width: 56rem;
  margin: 0 auto;
  min-height: calc(100vh - 12.2rem);
`;

export default JoinLayout;
