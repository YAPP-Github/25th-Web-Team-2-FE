'use client';

import { useParams } from 'next/navigation';

import { emptyViewLayout, postContentLayout } from './ExperimentPostContainer.css';
import { getErrorMessage } from '../../../ExperimentPostPage.utils';
import useApplyMethodQuery from '../../../hooks/useApplyMethodQuery';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostDetailContent from '../ExperimentPostDetailContent/ExperimentPostDetailContent';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostOutline from '../ExperimentPostOutline/ExperimentPostOutline';

import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';
import { contactButton } from '@/components/Header/Header.css';
import Spinner from '@/components/Spinner/Spinner';

const ExperimentPostContainer = () => {
  const { post_id } = useParams();
  const postId = Array.isArray(post_id) ? post_id[0] : post_id;

  /* 특정 공고 상세 조회 */
  const {
    data: postDetailData,
    isLoading,
    isError: isPostError,
    error,
    refetch,
  } = useExperimentDetailsQuery({ postId });

  /* 공고 지원 방법 조회 */
  const { data: applyMethodData, isError: isMethodError } = useApplyMethodQuery({ postId });

  if (isLoading) {
    return (
      <div className={emptyViewLayout}>
        <Spinner />
        <p className={emptySubTitle}>로딩중</p>
      </div>
    );
  }

  if (isPostError || isMethodError) {
    return (
      <div className={emptyViewLayout}>
        <p className={emptySubTitle}>{getErrorMessage(error)}</p>
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
