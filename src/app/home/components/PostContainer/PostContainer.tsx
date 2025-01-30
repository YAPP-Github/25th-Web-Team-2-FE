'use client';

import { useEffect, useState } from 'react';

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
import { filterParticipantInfo } from '../../home.utils';
import useParticipantInfoQuery from '../../hooks/useParticipantInfoQuery';
import useResearcherInfoQuery from '../../hooks/useResearcherInfoQuery';

import { PostListParams } from '@/apis/post';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import { ROLE } from '@/constants/config';
import useSessionStorage from '@/hooks/useSessionStorage';

// TODO: [유저 정보 적용된 필터링 구현]
// 1. role을 가져옴 (sessionStorage 또는 Context)
// 2. role을 통해 user API 호출
// 3. 참여자일 경우에만 참여자 정보를 filter에 추가해서 실험 공고 요청
// 3-1. 참여자가 아닐 경우(연구자, 비회원)에는 자동 적용 필터 X
// FIXME: 참여자일 경우에는 쿼리를 2번 호출함
// FIXME: 4. 선택된 filter가 각각 관리되고 있는데, PostContainer의 filters 값으로 같이 관리하기
const PostContainer = () => {
  const role = useSessionStorage('role');
  const participantQuery = useParticipantInfoQuery({ enabled: role === ROLE.participant });
  const researcherQuery = useResearcherInfoQuery({ enabled: role === ROLE.researcher });

  const userInfoData = role === ROLE.participant ? participantQuery.data : researcherQuery.data;

  const participantInfo = filterParticipantInfo(userInfoData);

  const [filters, setFilters] = useState<Pick<PostListParams, 'recruitStatus'>>({
    recruitStatus: 'ALL',
  });
  const { data } = usePostListQuery(filters);

  const isRecruiting = filters.recruitStatus === 'OPEN';

  const handleFilterChange = (key: string, value: string | number | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChange = () => {
    const toggleChecked = isRecruiting ? 'ALL' : 'OPEN';
    handleFilterChange('recruitStatus', toggleChecked);
  };

  // participantInfo를 응답받을 경우 filters 상태 업데이트
  useEffect(() => {
    if (participantInfo) {
      setFilters((prev) => ({
        ...prev,
        gender: participantInfo.gender,
        region: participantInfo.basicAddressInfo.region,
        matchType: participantInfo ? participantInfo.matchType : undefined,
        areas: participantInfo ? participantInfo.basicAddressInfo.area : undefined,
      }));
    }
  }, [participantInfo]);

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
