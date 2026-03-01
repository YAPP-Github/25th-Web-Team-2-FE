import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import { defaultLayout, defaultLayoutContainer } from './DefaultLayout.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const BackToTopButton = dynamic(
  () => import('@/components/Button/BackToTopButton'),
  {
    ssr: false,
  },
);

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={defaultLayoutContainer}>
      <Header />
      <div className={defaultLayout}>
        {children}
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default DefaultLayout;
