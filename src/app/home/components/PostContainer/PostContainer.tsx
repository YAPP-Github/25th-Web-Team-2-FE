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

import { PostListParams } from '@/apis/post';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';

const PostContainer = () => {
  const [filters, setFilters] = useState<PostListParams>({
    recruitStatus: 'ALL',
  });

  const { data } = usePostListQuery(filters);

  const handleFilterChange = (key: string, value: string | number | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isRecruiting = filters.recruitStatus === 'OPEN';

  const handleChange = () => {
    const toggleChecked = isRecruiting ? 'ALL' : 'OPEN';
    handleFilterChange('recruitStatus', toggleChecked);
  };

  return (
    <div css={postContainerLayout}>
      <h2 css={postContainerTitle}>공고를 확인해 보세요</h2>
      <div css={filterWrapper}>
        <FilterContainer handleFilterChange={handleFilterChange} />
        <JoinCheckbox
          label="모집 중인 공고만 보기"
          isChecked={isRecruiting}
          onChange={handleChange}
          isArrow={false}
        />
      </div>
      <div css={postCardContainer}>
        <span css={totalPostCount}>총 {data?.content.length}개</span>
        <PostCardList postList={data?.content} />
      </div>
    </div>
  );
};

export default PostContainer;
