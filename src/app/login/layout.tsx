'use client';

import { Theme } from '@emotion/react';
import { css } from '@emotion/react';

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div css={loginLayout}>{children}</div>;
}

const loginLayout = (theme: Theme) => css`
  background-color: ${theme.colors.field01};
  width: 100rem;
  margin: 0 auto;
`;

export default LoginLayout;
