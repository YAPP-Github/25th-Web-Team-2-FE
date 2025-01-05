'use client';

import PostCardList from '../PostCardList/PostCardList';
import { postContainerLayout, postContainerTitle } from './PostContainer.styles';

const PostContainer = () => {
  return (
    <div css={postContainerLayout}>
      <h2 css={postContainerTitle}>공고를 확인해 보세요</h2>
      <PostCardList />
    </div>
  );
};

export default PostContainer;
