'use client';

import { PropsWithChildren } from 'react';
import { Footer } from 'react-day-picker';

import { myPostsLayout, myPostsLayoutContainer } from './MyPostsPage.css';

import Header from '@/components/Header/Header';

function MyPostsLayout({ children }: PropsWithChildren) {
  return (
    <div className={myPostsLayoutContainer}>
      <div className={myPostsLayout}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default MyPostsLayout;
