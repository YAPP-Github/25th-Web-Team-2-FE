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

// NOTE: Toast를 바텀시트 내부에서 띄우면 페이지에 보이지 않는 문제로 인해 상위에서 주입
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
        initialRecruitStatus={recruitStatus}
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
