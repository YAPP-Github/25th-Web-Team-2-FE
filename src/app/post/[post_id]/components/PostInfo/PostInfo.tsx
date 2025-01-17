import { useState } from 'react';

import {
  buttonStyles,
  editButton,
  postHeaderContainer,
  postInfoLayout,
  postSubInfo,
  viewsContainer,
} from './PostInfo.styles';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const PostInfo = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const canEdit = true;

  return (
    <>
      <div css={postInfoLayout}>
        <div css={postHeaderContainer}>
          <h2>야뿌대학교 웹 서비스 행동 실험 참여자를 모집합니다</h2>
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
          <div>2025.01.18.</div>
          <div>연도비</div>
          <div css={viewsContainer}>
            <Icon icon="EyeTwo" width={16} height={16} color={colors.field06} />0
          </div>
        </div>
      </div>

      {/* 삭제 confirm modal */}
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} />
    </>
  );
};

export default PostInfo;
