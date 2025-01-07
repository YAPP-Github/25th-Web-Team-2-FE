'use client';

import { PropsWithChildren } from 'react';

import { defaultLayout } from './DefaultLayout.styles';

import Header from '@/components/Header/Header';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div css={defaultLayout}>
      <Header />
      {children}
    </div>
  );
};

export default DefaultLayout;
