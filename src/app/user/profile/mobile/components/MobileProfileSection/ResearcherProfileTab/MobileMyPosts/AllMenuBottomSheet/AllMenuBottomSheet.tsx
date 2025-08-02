import { deleteButton, divider, listBottomSheetLayout, listItem } from './AllMenuBottomSheet.css';
import { useState } from 'react';
import Toggle from '@/components/Toggle/Toggle';
import { useRouter } from 'next/navigation';
import { getHideModalCookie } from '@/lib/cookies';
import { HIDE_MODAL_COOKIE_KEYS } from '@/components/MobileNotReadyModal/mobileNotReadyModal.constants';

interface AllMenuBottomSheetProps {
  onClose: () => void;
  postId: string;
  recruitStatus: boolean;
  onEditPost: (postId: string) => void;
}

const AllMenuBottomSheet = ({
  onClose,
  postId,
  recruitStatus,
  onEditPost,
}: AllMenuBottomSheetProps) => {
  const router = useRouter();
  const [recruitStatusState, setRecruitStatusState] = useState(recruitStatus);

  const handleUpdateRecruitStatus = () => {
    setRecruitStatusState((prev) => !prev);
  };

  const handleClickEditPost = () => {
    const shouldSkipModal = getHideModalCookie(HIDE_MODAL_COOKIE_KEYS.edit);

    onClose();

    if (shouldSkipModal) {
      router.push(`/edit/${postId}`);
    } else {
      onEditPost(postId);
    }
  };

  const handleClickDeletePost = () => {
    onClose();
  };

  return (
    <section className={listBottomSheetLayout}>
      <div className={listItem}>
        <span>모집 중</span>
        <Toggle
          value={recruitStatusState}
          onChange={handleUpdateRecruitStatus}
          disabled={!recruitStatus}
        />
      </div>
      <button className={listItem} onClick={handleClickEditPost}>
        글 수정하기
      </button>
      <span className={divider} />
      <button className={`${listItem} ${deleteButton}`} onClick={handleClickDeletePost}>
        삭제하기
      </button>
    </section>
  );
};

export default AllMenuBottomSheet;
