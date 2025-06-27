import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { myPostsLayout, myPostsLayoutContainer } from './MyPostsPage.css';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

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
