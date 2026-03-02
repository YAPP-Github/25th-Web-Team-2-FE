import { Metadata } from 'next';
import { PropsWithChildren } from 'react';


import Footer from '@components/Footer';
import Header from '@components/Header';

import { myPostsLayout, myPostsLayoutContainer } from './MyPostsPage.css';

export const metadata: Metadata = {
  title: '그라밋 | 작성 글 목록',
  description: '그라밋 | 작성 글 목록',
};

function MyPostsLayout({ children }: PropsWithChildren) {
  return (
    <div className={myPostsLayoutContainer}>
      <div className={myPostsLayout}>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MyPostsLayout;
