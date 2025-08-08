'use client';

import ExperimentPostCardListContainer from './ExperimentPostCardListContainer/ExperimentPostCardListContainer';
import {
  filterWrapper,
  horizontalLineMobile,
  postContainerLayout,
  postContainerTitleDesktop,
  recruitCheckLabel,
  recruitCheckWrapper,
} from './ExperimentPostContainer.css';
import FilterContainer from './FilterContainer/FilterContainer';
import useParticipantAutoFilter from '../../hooks/useParticipantAutoFilter';
import useURLFilters from '../../hooks/useURLFilters';
import useUserInfo from '../../hooks/useUserInfo';

import { ExperimentPostListFilters, ExperimentPostResponse } from '@/apis/post';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface ExperimentPostContainerProps {
  initialPosts: ExperimentPostResponse;
  initialGender?: ExperimentPostListFilters['gender'];
  initialAge?: ExperimentPostListFilters['age'];
}

const ExperimentPostContainer = ({
  initialPosts,
  initialGender,
  initialAge,
}: ExperimentPostContainerProps) => {
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

export default ExperimentPostContainer;
