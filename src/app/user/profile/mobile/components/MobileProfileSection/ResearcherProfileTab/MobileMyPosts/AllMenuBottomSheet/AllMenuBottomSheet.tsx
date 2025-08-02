import { deleteButton, divider, listBottomSheetLayout, listItem } from './AllMenuBottomSheet.css';
import { useState } from 'react';
import Toggle from '@/components/Toggle/Toggle';

interface AllMenuBottomSheetProps {
  onClose: () => void;
  postId: string;
  recruitStatus: boolean;
}

const AllMenuBottomSheet = ({ onClose, postId, recruitStatus }: AllMenuBottomSheetProps) => {
  const [recruitStatusState, setRecruitStatusState] = useState(recruitStatus);

  const handleUpdateRecruitStatus = () => {
    setRecruitStatusState((prev) => !prev);
  };

  const handleClickEditPost = () => {
    onClose();
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
