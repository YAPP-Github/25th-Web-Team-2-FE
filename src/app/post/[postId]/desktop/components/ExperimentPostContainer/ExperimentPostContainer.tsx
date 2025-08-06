'use client';

import { postContentLayout, emptyViewLayout } from './ExperimentPostContainer.css';
import { UseApplyMethodQueryResponse } from '../../../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostDetailContent from '../ExperimentPostDetailContent/ExperimentPostDetailContent';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostOutline from '../ExperimentPostOutline/ExperimentPostOutline';

import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';

interface ExperimentPostContainerProps {
  postId: string;
  postDetailData: UseQueryExperimentDetailsAPIResponse | null;
  applyMethodData: UseApplyMethodQueryResponse | null;
  hasError: boolean;
}

const ExperimentPostContainer = ({
  postDetailData,
  applyMethodData,
  hasError,
}: ExperimentPostContainerProps) => {
  if (hasError || !postDetailData || !applyMethodData) {
    return (
      <div className={emptyViewLayout}>
        <p className={emptySubTitle}>
          공고 정보를 불러오지 못했습니다. <br /> 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <>
      <ExperimentPostInfo postDetailData={postDetailData} />
      <div className={postContentLayout}>
        <ExperimentPostDetailContent postDetailData={postDetailData} />
        <ExperimentPostOutline postDetailData={postDetailData} applyMethodData={applyMethodData} />
      </div>
    </>
  );
};

export default ExperimentPostContainer;
