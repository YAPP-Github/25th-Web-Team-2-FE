'use client';

import ExperimentPostCardListContainer from './ExperimentPostCardListContainer/ExperimentPostCardListContainer';
import {
  filterWrapper,
  horizontalLineMobile,
  postContainerLayout,
  postContainerTitleDesktop,
  postListContainer,
  recruitCheckLabel,
  recruitCheckWrapper,
  totalPostCountWrapper,
} from './ExperimentPostSection.css';
import FilterContainer from './FilterContainer/FilterContainer';

import { ExperimentPostListFilters, ExperimentPostResponse } from '@/apis/post';
import useExperimentPostListQuery from '@/app/home/hooks/useExperimentPostListQuery';
import useParticipantAutoFilter from '@/app/home/hooks/useParticipantAutoFilter';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import { totalPostCount } from './ExperimentPostCardListContainer/ExperimentPostCardListContainer.css';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface ExperimentPostSectionProps {
  initialPosts: ExperimentPostResponse;
  initialGender?: ExperimentPostListFilters['gender'];
  initialAge?: ExperimentPostListFilters['age'];
}

const ExperimentPostSection = ({
  initialPosts,
  initialGender,
  initialAge,
}: ExperimentPostSectionProps) => {
  const { userInfo, isLoading: isUserInfoLoading } = useUserInfo();
  const { filters, isRecruiting, handleToggleRecruitStatus } = useURLFilters();
  const { isAutoFilled } = useParticipantAutoFilter({ userInfo, isUserInfoLoading });

  const { data: postListData } = useExperimentPostListQuery(filters, !isAutoFilled, initialPosts);

  return (
    <section className={postContainerLayout}>
      <h2 className={postContainerTitleDesktop}>공고를 확인해 보세요</h2>
      <div className={horizontalLineMobile} />

      {/* 필터링 */}
      <div className={filterWrapper}>
        <FilterContainer initialGender={initialGender} initialAge={initialAge} />
      </div>

      {/* 모집 중인 공고만 보기 */}
      <div className={recruitCheckWrapper}>
        <JoinCheckbox
          labelClassName={recruitCheckLabel}
          label="모집 중인 공고만 보기"
          isChecked={isRecruiting}
          onChange={handleToggleRecruitStatus}
          emptyCheckIcon={<Icon icon="CheckSquareFill" cursor="pointer" color={colors.icon02} />}
        />
      </div>

      {/* 총 공고 개수 */}
      <div className={totalPostCountWrapper}>
        <span className={totalPostCount}>
          {postListData && `총 ${postListData?.pages[0].totalCount}개`}
        </span>
      </div>

      {/* 공고 목록 */}
      <div className={postListContainer}>
        <ExperimentPostCardListContainer
          isUserInfoLoading={!isAutoFilled}
          initialPosts={initialPosts}
        />
      </div>
    </section>
  );
};

export default ExperimentPostSection;
