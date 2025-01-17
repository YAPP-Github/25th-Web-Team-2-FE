'use client';

import { Theme } from '@emotion/react';
import { css } from '@emotion/react';

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div css={loginLayout}>{children}</div>;
}

const loginLayout = (theme: Theme) => css`
  background-color: ${theme.colors.field01};
  min-width: 100rem;
  height: calc(100vh - 12.2rem);
  margin: 0 auto;
`;

export default LoginLayout;
