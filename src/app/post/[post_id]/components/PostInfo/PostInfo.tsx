import { useState } from 'react';

import DeleteConfirmModal from './components/DeleteConfirmModal/DeleteConfirmModal';
import {
  buttonStyles,
  editButton,
  postHeaderContainer,
  postInfoLayout,
  postSubInfo,
  viewsContainer,
} from './PostInfo.styles';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const PostInfo = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const canEdit = true;

  return (
    <>
      <div css={postInfoLayout}>
        <div css={postHeaderContainer}>
          <h2>강남 삼성 서울 병원 연구 참여자를 모집합니다</h2>
          {canEdit && (
            <div>
              <button css={[editButton, buttonStyles]}>수정</button>
              <button css={buttonStyles} onClick={() => setIsDeleteModalOpen(true)}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div css={postSubInfo}>
          <div>2024.12.29.</div>
          <div>닉네임</div>
          <div css={viewsContainer}>
            <Icon icon="EyeTwo" width={16} height={16} color={colors.field06} />
            100k
          </div>
        </div>
      </div>

      {/* 삭제 confirm modal */}
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} />
    </>
  );
};

export default PostInfo;
