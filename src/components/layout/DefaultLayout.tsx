import Header from '@/components/Header/Header';
import React, { PropsWithChildren } from 'react';
import Footer from '../Footer/Footer';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
