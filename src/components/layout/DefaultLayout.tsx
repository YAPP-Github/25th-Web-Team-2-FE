import Header from '@/components/Header/Header';
import React, { PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
