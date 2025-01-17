'use client';

import { useState } from 'react';
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
  const [filters, setFilters] = useState({
    matchType: 'ALL' as 'ALL' | 'ONLINE' | 'OFFLINE',
    gender: '' as '' | 'ALL' | 'MALE' | 'FEMALE',
    area: '',
    age: 20,
  });

  const { data: postList } = usePostListQuery(filters);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div css={postContainerLayout}>
      <h2 css={postContainerTitle}>공고를 확인해 보세요</h2>
      <FilterContainer handleFilterChange={handleFilterChange} />
      <div css={postCardContainer}>
        <span css={totalPostCount}>총 {postList?.length}개</span>
        <PostCardList postList={postList} />
      </div>
    </div>
  );
};

export default PostContainer;
