'use client';

import { PropsWithChildren } from 'react';

import { userLayout, userLayoutContainer } from './UserLayout.css';

import BackToTopButton from '@/components/Button/BackToTopButton/BackToTopButton';
import Header from '@/components/Header/Header';

const UserLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={userLayoutContainer}>
      <div className={userLayout}>
        <Header />
        {children}
        <BackToTopButton />
      </div>
    </div>
  );
};

export default UserLayout;
