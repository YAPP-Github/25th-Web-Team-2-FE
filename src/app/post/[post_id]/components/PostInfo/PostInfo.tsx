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

import { UseQueryExperimentDetailsAPIResponse } from '@/apis/hooks/useQueryExperimentDetailsAPI';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface PostInfoProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}
const PostInfo = ({ postDetailData }: PostInfoProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div css={postInfoLayout}>
        <div css={postHeaderContainer}>
          <h2>{postDetailData.title}</h2>
          {postDetailData.isAuthor && (
            <div>
              <button css={[editButton, buttonStyles]}>수정</button>
              <button css={buttonStyles} onClick={() => setIsDeleteModalOpen(true)}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div css={postSubInfo}>
          <div>{postDetailData.uploadDate}</div>
          <div>{postDetailData.uploaderName}</div>
          <div css={viewsContainer}>
            <Icon icon="EyeTwo" width={16} height={16} color={colors.field06} />
            {postDetailData.views}
          </div>
        </div>
      </div>

      {/* 삭제 confirm modal */}
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} />
    </>
  );
};

export default PostInfo;
