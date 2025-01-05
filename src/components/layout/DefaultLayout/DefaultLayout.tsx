'use client';

import { PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { defaultLayout } from './DefaultLayout.styles';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div css={defaultLayout}>
      <Header />
      {children}
    </div>
  );
};

export default DefaultLayout;
