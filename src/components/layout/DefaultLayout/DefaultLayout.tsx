import { PropsWithChildren } from 'react';

import { defaultLayout, defaultLayoutContainer } from './DefaultLayout.css';

import BackToTopButton from '@/components/Button/BackToTopButton/BackToTopButton';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={defaultLayoutContainer}>
      <div className={defaultLayout}>
        <Header />
        {children}
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default DefaultLayout;
