'use client';

import { usePathname } from 'next/navigation';

import { postContentLayout } from './ExperimentPostContainer.css';
import useApplyMethodQuery from '../../hooks/useApplyMethodQuery';
import useExperimentDetailsQuery from '../../hooks/useExperimentDetailsQuery';
import ExperimentPostDetailContent from '../ExperimentPostDetailContent/ExperimentPostDetailContent';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostOutline from '../ExperimentPostOutline/ExperimentPostOutline';

const ExperimentPostContainer = () => {
  const pathname = usePathname();
  const postId = String(pathname?.split('/').pop() || '');

  /* 특정 공고 상세 조회 */
  const {
    data: postDetailData,
    isLoading,
    isError,
    refetch,
  } = useExperimentDetailsQuery({ postId });

  /* 공고 지원 방법 조회 */
  const { data: applyMethodData } = useApplyMethodQuery({ postId });

  //todo 이후 화면 나오면 처리 (임시)
  if (!postId) {
    return <div style={{ height: 'calc(100vh - 25rem)' }}>Invalid post ID</div>;
  }

  if (isLoading) {
    return <div style={{ height: 'calc(100vh - 25rem)' }}>Loading 🔄</div>;
  }

  //todo 예외처리 예정
  if (isError) {
    return (
      <div style={{ height: 'calc(100vh - 25rem)' }}>
        <p>상세 공고 조회 실패</p>
        <button onClick={() => refetch()}>🔮 재시도 클릭</button>
      </div>
    );
  }

  if (!postDetailData) {
    return <div>상세 공고 정보 없음</div>;
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
