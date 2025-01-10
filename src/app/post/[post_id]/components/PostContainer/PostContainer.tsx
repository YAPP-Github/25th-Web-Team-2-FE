'use client';

import { postContentLayout } from './PostContainer.styles';
import PostDetailContent from '../PostDetailContent/PostDetailContent';
import PostInfo from '../PostInfo/PostInfo';
import PostOutline from '../PostOutline/PostOutline';

function PostContainer() {
  return (
    <>
      <PostInfo />
      <div css={postContentLayout}>
        <PostDetailContent />
        <PostOutline />
      </div>
    </>
  );
}

export default PostContainer;
