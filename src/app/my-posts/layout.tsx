import { PropsWithChildren } from 'react';

import { myPostsLayout, myPostsLayoutContainer } from './MyPostsPage.css';

import Header from '@/components/Header/Header';

function MyPostsLayout({ children }: PropsWithChildren) {
  return (
    <div className={myPostsLayoutContainer}>
      <div className={myPostsLayout}>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default MyPostsLayout;
