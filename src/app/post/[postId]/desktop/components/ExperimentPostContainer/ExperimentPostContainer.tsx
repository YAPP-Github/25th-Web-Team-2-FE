'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { emptyViewLayout, postContentLayout } from './ExperimentPostContainer.css';
import useApplyMethodQuery from '../../../hooks/useApplyMethodQuery';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostDetailContent from '../ExperimentPostDetailContent/ExperimentPostDetailContent';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostOutline from '../ExperimentPostOutline/ExperimentPostOutline';

import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';
import { contactButton } from '@/components/Header/Header.css';
import Spinner from '@/components/Spinner/Spinner';
import { stopRecording } from '@/lib/mixpanelClient';

const ExperimentPostContainer = () => {
  const { postId } = useParams();
  const normalizedPostId = Array.isArray(postId) ? postId[0] : postId;

  /* 특정 공고 상세 조회 */
  const {
    data: postDetailData,
    isLoading,
    error: postError,
    refetch,
  } = useExperimentDetailsQuery({ postId: normalizedPostId });

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  /* 공고 지원 방법 조회 */
  const { data: applyMethodData, error: methodError } = useApplyMethodQuery({
    postId: normalizedPostId,
  });

  if (postError || methodError) {
    return (
      <div className={emptyViewLayout}>
        <p className={emptySubTitle}>{postError?.message ?? methodError?.message}</p>
        <button onClick={() => refetch()} className={contactButton}>
          재시도
        </button>
      </div>
    );
  }

  if (isLoading || !postDetailData) {
    return (
      <div className={emptyViewLayout}>
        <Spinner />
        <p className={emptySubTitle}>로딩중</p>
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
