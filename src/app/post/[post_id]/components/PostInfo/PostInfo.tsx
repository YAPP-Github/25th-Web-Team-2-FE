import { useState } from 'react';

import {
  buttonStyles,
  postHeaderContainer,
  postInfoLayout,
  postSubInfo,
  viewsContainer,
} from './PostInfo.css';
import { UseQueryExperimentDetailsAPIResponse } from '../../hooks/useExperimentDetailsQuery';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface PostInfoProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}

const PostInfo = ({ postDetailData }: PostInfoProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className={postInfoLayout}>
        <div className={postHeaderContainer}>
          <h2>{postDetailData.title}</h2>
          {postDetailData.isAuthor && (
            <div>
              <button className={buttonStyles({ type: 'edit' })}>수정</button>
              <button className={buttonStyles()} onClick={() => setIsDeleteModalOpen(true)}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div className={postSubInfo}>
          <div>{postDetailData.uploadDate}</div>
          <div>{postDetailData.uploaderName}</div>
          <div className={viewsContainer}>
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
