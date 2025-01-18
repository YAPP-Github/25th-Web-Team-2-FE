'use client';

import { useState } from 'react';
import usePostListQuery from '../../hooks/usePostListQuery';
import PostCardList from '../PostCardList/PostCardList';
import FilterContainer from './FilterContainer/FilterContainer';
import {
  filterWrapper,
  postCardContainer,
  postContainerLayout,
  postContainerTitle,
  totalPostCount,
} from './PostContainer.styles';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import { PostListParams } from '@/apis/post';

const PostContainer = () => {
  const [filters, setFilters] = useState<Partial<PostListParams>>({
    matchType: 'ALL' as 'ALL' | 'ONLINE' | 'OFFLINE',
    gender: '' as '' | 'ALL' | 'MALE' | 'FEMALE',
    region: '',
    areas: '',
    age: 20,
    recruitDone: false,
  });

  const { data: postList } = usePostListQuery(filters);

  const handleFilterChange = (key: string, value: string | number | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // TODO: 개선 필요.
  const handleChange = () => {
    handleFilterChange('recruitDone', !filters.recruitDone);
  };

  return (
    <div css={postContainerLayout}>
      <h2 css={postContainerTitle}>공고를 확인해 보세요</h2>
      <div css={filterWrapper}>
        <FilterContainer handleFilterChange={handleFilterChange} />
        <JoinCheckbox
          label="모집 중인 공고만 보기"
          isChecked={filters.recruitDone || false}
          onChange={handleChange}
          isArrow={false}
        />
      </div>
      <div css={postCardContainer}>
        <span css={totalPostCount}>총 {postList?.length}개</span>
        <PostCardList postList={postList} />
      </div>
    </div>
  );
};

export default PostContainer;
