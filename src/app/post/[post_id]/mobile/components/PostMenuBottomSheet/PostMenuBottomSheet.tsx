import { postMenuBottomSheetLayout, postMenuButton } from './PostMenuBottomSheet.css';
import { PostDetailBottomSheetProps } from '../../../ExperimentPostPage.types';

const PostMenuBottomSheet = ({ onConfirm }: PostDetailBottomSheetProps) => {
  return (
    <div className={postMenuBottomSheetLayout}>
      <button className={postMenuButton} onClick={onConfirm} aria-label="공고 수정">
        수정
      </button>
      <button className={postMenuButton} onClick={onConfirm} aria-label="공고 삭제">
        삭제
      </button>
    </div>
  );
};

export default PostMenuBottomSheet;
