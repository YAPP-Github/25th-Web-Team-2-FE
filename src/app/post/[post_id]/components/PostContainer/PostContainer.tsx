'use client';

import { usePathname } from 'next/navigation';

import { postContentLayout } from './PostContainer.styles';
import PostDetailContent from '../PostDetailContent/PostDetailContent';
import PostInfo from '../PostInfo/PostInfo';
import PostOutline from '../PostOutline/PostOutline';

import useQueryExperimentDetailsAPI from '@/apis/hooks/useQueryExperimentDetailsAPI';

const PostContainer = () => {
  //todo 이 후에 쿼리 파라미터 형식이든 or postId 타입 변경 요청이든 수정 예정
  const pathname = usePathname();
  const pathPostId = pathname?.split('/').pop();

  const postId = pathPostId ? Number(pathPostId) : NaN;

  /* 특정 공고 상세 조회 */
  const {
    data: postDetailData,
    isLoading,
    isError,
    refetch,
  } = useQueryExperimentDetailsAPI({ postId });

  //todo 이후 화면 나오면 처리 (임시)
  if (isNaN(postId)) {
    return <div style={{ height: 'calc(100vh - 25rem)' }}>Invalid post ID</div>;
  }

  if (isLoading) {
    return <div style={{ height: 'calc(100vh - 25rem)' }}>Loading 🔄</div>;
  }

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
      <PostInfo postDetailData={postDetailData} />
      <div css={postContentLayout}>
        <PostDetailContent postDetailData={postDetailData} />
        <PostOutline postDetailData={postDetailData} />
      </div>
    </>
  );
};

export default PostContainer;
