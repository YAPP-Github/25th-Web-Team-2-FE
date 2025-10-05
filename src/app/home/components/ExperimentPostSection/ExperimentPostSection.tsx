'use client';

import ExperimentPostCardListContainer from './ExperimentPostCardListContainer/ExperimentPostCardListContainer';
import {
  filterWrapper,
  horizontalLineMobile,
  postContainerLayout,
  postContainerTitleDesktop,
  recruitCheckLabel,
  recruitCheckWrapper,
} from './ExperimentPostSection.css';
import FilterContainer from './FilterContainer/FilterContainer';

import { ExperimentPostListFilters, ExperimentPostResponse } from '@/apis/post';
import useParticipantAutoFilter from '@/app/home/hooks/useParticipantAutoFilter';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
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
  const { isRecruiting, handleToggleRecruitStatus } = useURLFilters();
  const { isAutoFilled } = useParticipantAutoFilter({ userInfo, isUserInfoLoading });

  return (
    <div className={postContainerLayout}>
      <h2 className={postContainerTitleDesktop}>공고를 확인해 보세요</h2>
      <div className={horizontalLineMobile} />
      <div className={filterWrapper}>
        {/* 필터링 */}
        <FilterContainer initialGender={initialGender} initialAge={initialAge} />

        <div className={recruitCheckWrapper({ isMobile: false })}>
          {/* 모집 중인 공고만 보기 */}
          <JoinCheckbox
            labelClassName={recruitCheckLabel}
            label="모집 중인 공고만 보기"
            isChecked={isRecruiting}
            onChange={handleToggleRecruitStatus}
            emptyCheckIcon={<Icon icon="CheckSquareFill" cursor="pointer" color={colors.icon02} />}
          />
        </div>
      </div>

      {/* 공고 목록 */}
      <ExperimentPostCardListContainer
        isUserInfoLoading={!isAutoFilled}
        initialPosts={initialPosts}
      />
    </div>
  );
};

export default ExperimentPostSection;
