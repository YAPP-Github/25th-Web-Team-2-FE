'use client';

import {
  myPostContainerLayout,
  myPostsHeaderContainer,
  myPostsHeaderText,
  postsSorting,
} from './MyPostsContainer.css';
import MyPostsTable from '../MyPostsTable/MyPostsTable';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const MyPostsContainer = () => {
  return (
    <div className={myPostContainerLayout}>
      <div className={myPostsHeaderContainer}>
        <h2 className={myPostsHeaderText}>내가 작성한 글</h2>
        <div className={postsSorting}>
          <p>최신순</p>
          <Icon icon="ArrowSorting" width={20} height={20} color={colors.icon04} />
        </div>
      </div>

      <MyPostsTable />
    </div>
  );
};

export default MyPostsContainer;
