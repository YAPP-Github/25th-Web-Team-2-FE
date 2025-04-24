'use client';

import { usePathname } from 'next/navigation';

import { emptyViewLayout, postContentLayout } from './ExperimentPostContainer.css';
import useApplyMethodQuery from '../../hooks/useApplyMethodQuery';
import useExperimentDetailsQuery from '../../hooks/useExperimentDetailsQuery';
import ExperimentPostDetailContent from '../ExperimentPostDetailContent/ExperimentPostDetailContent';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostOutline from '../ExperimentPostOutline/ExperimentPostOutline';

import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';
import { contactButton } from '@/components/Header/Header.css';
import Spinner from '@/components/Spinner/Spinner';

const ExperimentPostContainer = () => {
  const pathname = usePathname();
  const postId = pathname?.split('/').pop() || '';

  /* 특정 공고 상세 조회 */
  const {
    data: postDetailData,
    isLoading,
    isError,
    refetch,
  } = useExperimentDetailsQuery({ postId });

  /* 공고 지원 방법 조회 */
  const { data: applyMethodData } = useApplyMethodQuery({ postId });

  if (isLoading) {
    return (
      <div className={emptyViewLayout}>
        <Spinner />
        <p className={emptySubTitle}>로딩중</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={emptyViewLayout}>
        <p className={emptySubTitle}>잠시 후 다시 시도해 주세요</p>
        <button onClick={() => refetch()} className={contactButton}>
          재시도
        </button>
      </div>
    );
  }

  if (!postDetailData) {
    return (
      <div className={emptyViewLayout}>
        <p className={emptySubTitle}>공고 상세 정보가 없습니다.</p>
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
