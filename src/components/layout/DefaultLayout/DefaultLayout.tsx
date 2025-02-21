'use client';

import { PropsWithChildren } from 'react';

import { defaultLayout, defaultLayoutContainer } from './DefaultLayout.css';

import BackToTopButton from '@/components/Button/BackToTopButton/BackToTopButton';
import Header from '@/components/Header/Header';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={defaultLayoutContainer}>
      <div className={defaultLayout}>
        <Header />
        {children}
        <BackToTopButton />
      </div>
    </div>
  );
};

export default DefaultLayout;
