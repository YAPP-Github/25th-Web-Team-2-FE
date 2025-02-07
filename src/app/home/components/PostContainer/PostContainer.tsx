'use client';

import { useEffect, useState } from 'react';

import usePostListQuery from '../../hooks/usePostListQuery';
import PostCardList from '../PostCardList/PostCardList';
import FilterContainer from './FilterContainer/FilterContainer';
import {
  filterWrapper,
  postCardContainer,
  postCardContentContainer,
  postContainerLayout,
  postContainerTitle,
  recruitCheckLabel,
  totalPostCount,
  watchMoreButton,
} from './PostContainer.css';
import { calculateAgeFromBirthDate, filterParticipantInfo } from '../../home.utils';
import useUserInfo from '../../hooks/useUserInfo';

import { ExperimentPostListFilters } from '@/apis/post';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import Icon from '@/components/Icon';

const PostContainer = () => {
  const { userInfo, isLoading: isUserInfoLoading } = useUserInfo();
  const participantInfo = filterParticipantInfo(userInfo);

  const [filters, setFilters] = useState<ExperimentPostListFilters>(
    {} as ExperimentPostListFilters,
  );

  const {
    data: postListData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = usePostListQuery(filters, isUserInfoLoading);

  const isRecruiting = filters.recruitStatus === 'OPEN';

  const handleFilterChange = (key: string, value: string | string[] | number | boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChange = () => {
    const toggleChecked = isRecruiting ? 'ALL' : 'OPEN';
    handleFilterChange('recruitStatus', toggleChecked);
  };

  const handleResetFilter = () => {
    setFilters({
      recruitStatus: 'ALL',
    });
  };

  // 참여자 성별/나이 자동 필터링
  useEffect(() => {
    if (participantInfo) {
      setFilters((prev) => ({
        ...prev,
        recruitStatus: 'ALL',
        gender: participantInfo.gender,
        age: calculateAgeFromBirthDate(participantInfo.birthDate),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        recruitStatus: 'ALL',
      }));
    }
  }, [participantInfo]);

  return (
    <div className={postContainerLayout}>
      <h2 className={postContainerTitle}>공고를 확인해 보세요</h2>
      <div className={filterWrapper}>
        <FilterContainer
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleResetFilter={handleResetFilter}
        />
        <JoinCheckbox
          labelClassName={recruitCheckLabel}
          label="모집 중인 공고만 보기"
          isChecked={isRecruiting}
          onChange={handleChange}
          isArrow={false}
          emptyCheckIcon={<Icon icon="CheckSquareFill" />}
        />
      </div>
      <div className={postCardContentContainer}>
        <div className={postCardContainer}>
          <span className={totalPostCount}>
            {postListData ? `총 ${postListData?.pages[0].totalCount}개` : '로딩중...'}
          </span>
          <PostCardList postListData={postListData} />
        </div>

        {!isFetching && hasNextPage && (
          <button
            className={watchMoreButton}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default PostContainer;
