'use client';
import { useParams } from 'next/navigation';

import { experimentPostMobileContainerLayout } from './ExperimentPostMobileContainer.css';
import useApplyMethodQuery from '../../../hooks/useApplyMethodQuery';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostTabs from '../ExperimentPostTabs/ExperimentPostTabs';

const ExperimentPostMobileContainer = () => {
  const { post_id } = useParams();
  const postId = Array.isArray(post_id) ? post_id[0] : post_id;

  /* 특정 공고 상세 조회 */
  const { data: postDetailData, isLoading: isLoadingPost } = useExperimentDetailsQuery({ postId });

  /* 공고 지원 방법 조회 */
  const { data: applyMethodData, isLoading: isLoadingApply } = useApplyMethodQuery({ postId });

  // todo 로딩 상태 및 EmptyView 추가 예정
  if (isLoadingPost || isLoadingApply) {
    return <div>로딩 중...</div>;
  }
  if (!postDetailData || !applyMethodData) return <div>데이터 없음</div>;

  return (
    <div className={experimentPostMobileContainerLayout}>
      <ExperimentPostInfo postDetailData={postDetailData} />
      <ExperimentPostTabs postDetailData={postDetailData} />
    </div>
  );
};

export default ExperimentPostMobileContainer;
