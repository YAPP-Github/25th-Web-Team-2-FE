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
import { useState } from 'react';
import MobileNotReadyModal from '@/components/MobileNotReadyModal/MobileNotReadyModal';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import useDeleteExperimentPostMutation from '@/app/my-posts/hooks/useDeleteExperimentPostMutation';
import { useToast } from '@/hooks/useToast';

// NOTE: 바텀시트가 닫히고 모달이 열려야되는 상황
// 바텀시트 내에 모달을 선언할 경우 바텀시트가 닫힐 때 모달도 함께 닫히는 문제
// 상위 컴포넌트가 불필요하게 모달을 의존하게 되는 상황이 발생함
// 모달도 overlay처럼 portal로 관리 필요
const MobileMyPosts = () => {
  const { data, isFetched } = useMyPostsQuery();
  const { open, close } = useOverlay();
  const toast = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState('');

  const { mutate: deletePost } = useDeleteExperimentPostMutation();

  const posts = data?.content ?? [];

  const handleDeletePost = () => {
    setIsDeleteModalOpen(false);

    deletePost(
      { postId: selectedPostId },
      {
        onSuccess: () => {
          toast.open({ message: '공고를 삭제하였습니다.' });
        },
        onError: () => {
          toast.error({ message: '공고 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.' });
        },
      },
    );
  };

  const handleClickMenu = (postId: string, recruitStatus: boolean) => {
    open(() => (
      <AllMenuBottomSheet
        onClose={close}
        postId={postId}
        recruitStatus={recruitStatus}
        onClickEdit={(postId) => {
          setSelectedPostId(postId);
          setIsEditModalOpen(true);
        }}
        onClickDelete={(postId) => {
          setSelectedPostId(postId);
          setIsDeleteModalOpen(true);
        }}
      />
    ));
  };

  if (posts.length === 0 && isFetched) {
    return <EmptyMyPosts />;
  }

  return (
    <>
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

      <MobileNotReadyModal
        menu="edit"
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editPostId={selectedPostId}
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        confirmTitle="정말 삭제하시겠어요?"
        descriptionText="공고를 삭제하면 다시 되돌릴 수 없어요"
        cancelText="닫기"
        confirmText="삭제하기"
        confirmButtonColor={colors.field09}
        onConfirm={handleDeletePost}
        isMobile
        closeIcon={false}
      />
    </>
  );
};

export default MobileMyPosts;
