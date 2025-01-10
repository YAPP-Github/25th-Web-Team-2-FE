'use client';

import { PropsWithChildren } from 'react';

import { defaultLayout } from './DefaultLayout.styles';

import BackToTopButton from '@/components/Button/BackToTopButton/BactToTopButton';
import Header from '@/components/Header/Header';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div css={defaultLayout}>
      <Header />
      {children}
      <BackToTopButton />
    </div>
  );
};

export default DefaultLayout;
