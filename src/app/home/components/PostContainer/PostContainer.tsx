'use client';

import usePostListQuery from '../../hooks/usePostListQuery';
import PostCardList from '../PostCardList/PostCardList';
import FilterContainer from './FilterContainer/FilterContainer';
import {
  postCardContainer,
  postContainerLayout,
  postContainerTitle,
  totalPostCount,
} from './PostContainer.styles';

const PostContainer = () => {
  const { data: postList } = usePostListQuery();

  if (!postList) {
    return null;
  }

  return (
    <div css={postContainerLayout}>
      <h2 css={postContainerTitle}>공고를 확인해 보세요</h2>
      <FilterContainer />
      <div css={postCardContainer}>
        <span css={totalPostCount}>총 {postList.length}개</span>
        <PostCardList postList={postList} />
      </div>
    </div>
  );
};

export default PostContainer;
