import Link from 'next/link';

import {
  contentArea,
  contentWrapper,
  listItem,
  menuArea,
  myPostsLayout,
  postTitle,
  postViews,
  recruitStatusBadge,
  viewsArea,
} from './MobileMyPosts.css';

import useMyPostsQuery from '@/app/my-posts/hooks/useMyPostsQuery';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import EmptyMyPosts from './EmptyMyPosts/EmptyMyPosts';
import useOverlay from '@/hooks/useOverlay';
import AllMenuBottomSheet from './AllMenuBottomSheet/AllMenuBottomSheet';
import { useToast } from '@/hooks/useToast';

// NOTE: 바텀시트가 닫히고 모달이 열려야되는 상황
// 바텀시트 내에 모달을 선언할 경우 바텀시트가 닫힐 때 모달도 함께 닫히는 문제
// 상위 컴포넌트가 불필요하게 모달을 의존하게 되는 상황이 발생함
// 모달도 overlay처럼 portal로 관리 필요

// TODO: 모집 완료 처리 시 바텀시트 닫지 않고, 모집중 상태 낙관적 업데이트로 변경하기
const MobileMyPosts = () => {
  const { data, isFetched } = useMyPostsQuery();
  const { open, close } = useOverlay();
  const toast = useToast();

  const posts = data?.content ?? [];

  const handleClickMenu = (postId: string, recruitStatus: boolean) => {
    open(() => (
      <AllMenuBottomSheet
        onClose={close}
        postId={postId}
        recruitStatus={recruitStatus}
        onRecruitComplete={{
          onSuccess: () => {
            toast.open({ message: '모집 완료 처리되었습니다.' });
          },
          onError: () => {
            toast.error({
              message: '모집 완료 처리를 실패하였습니다. 잠시 후 다시 시도해주세요.',
            });
          },
        }}
        onDelete={{
          onSuccess: () => {
            toast.open({ message: '공고를 삭제하였습니다.' });
          },
          onError: () => {
            toast.error({ message: '공고 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.' });
          },
        }}
      />
    ));
  };

  if (posts.length === 0 && isFetched) {
    return <EmptyMyPosts />;
  }

  return (
    <ul className={myPostsLayout}>
      {posts.map((post) => (
        <li key={post.experimentPostId} className={listItem}>
          <div className={viewsArea}>
            <Icon icon="Eye" width={18} height={18} color={colors.icon02} />
            <span className={postViews}>{post.views}</span>
          </div>

          <button
            className={menuArea}
            onClick={() => handleClickMenu(post.experimentPostId, post.recruitStatus)}
          >
            <Icon icon="AllMenu" width={20} height={20} />
          </button>

          <Link href={`/post/${post.experimentPostId}`} className={contentArea}>
            <div className={contentWrapper}>
              {!post.recruitStatus && <span className={recruitStatusBadge}>모집 완료</span>}
              <span className={postTitle}>{post.title}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MobileMyPosts;
