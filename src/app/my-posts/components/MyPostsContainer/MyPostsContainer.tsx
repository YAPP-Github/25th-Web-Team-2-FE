'use client';

import { myPostContainerLayout, myPostsHeader } from './MyPostsContainer.css';
import MyPostsTable from '../MyPostsTable/MyPostsTable';

const MyPostsContainer = () => {
  return (
    <div className={myPostContainerLayout}>
      <h2 className={myPostsHeader}>내가 작성한 글</h2>
      <MyPostsTable />
    </div>
  );
};

export default MyPostsContainer;
