'use client';
import { useParams } from 'next/navigation';

import { experimentPostMobileContainerLayout } from './ExperimentPostMobileContainer.css';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostTabs from '../ExperimentPostTabs/ExperimentPostTabs';

const ExperimentPostMobileContainer = () => {
  const { post_id } = useParams();
  const postId = Array.isArray(post_id) ? post_id[0] : post_id;

  /* 특정 공고 상세 조회 */
  const {
    data: postDetailData,
    // isLoading,
    // isError: isPostError,
    // error,
    // refetch,
  } = useExperimentDetailsQuery({ postId });

  /* 공고 지원 방법 조회 */
  //   const { data: applyMethodData, isError: isMethodError } = useApplyMethodQuery({ postId });

  return (
    <div className={experimentPostMobileContainerLayout}>
      <ExperimentPostInfo postDetailData={postDetailData} />
      <ExperimentPostTabs />
    </div>
  );
};

export default ExperimentPostMobileContainer;
