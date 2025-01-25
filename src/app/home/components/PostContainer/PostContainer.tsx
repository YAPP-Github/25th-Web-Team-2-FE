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
import JoinCheckbox from '@/app/join/components/JoinEmailStep/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import { useUserInfoQuery } from '../../hooks/useUserInfoQuery';
import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { isParticipantInfo } from '@/components/Header/Header';

const getParticipantInfo = (data?: ParticipantResponse | ResearcherResponse) => {
  if (!data) return null;

  if (isParticipantInfo(data)) {
    return data;
  }

  throw new Error('유저 정보가 없습니다.');
};

const PostContainer = () => {
  const role = sessionStorage.getItem('role') || '';
  const { data: userInfoData } = useUserInfoQuery(role);
  const userInfo = getParticipantInfo(userInfoData);

  const [filters, setFilters] = useState<PostListParams>({
    recruitStatus: 'ALL',
    gender: userInfo?.gender,
    matchType: userInfo?.matchType ?? undefined,
    region: userInfo?.basicAddressInfo.region ?? undefined,
    areas: userInfo?.basicAddressInfo.area ?? undefined,
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
