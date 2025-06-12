import { experimentPostInfoLayout, postSubInfo, postTitle } from './ExperimentPostInfo.css';
import { viewsContainer } from '../../../desktop/components/ExperimentPostInfo/ExperimentPostInfo.css';
import { formatDate } from '../../../ExperimentPostPage.utils';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const ExperimentPostInfo = ({
  postDetailData,
}: {
  postDetailData: UseQueryExperimentDetailsAPIResponse | undefined;
}) => {
  if (!postDetailData) return;

  return (
    <div className={experimentPostInfoLayout}>
      <p className={postTitle}>{postDetailData.title}</p>
      <div className={postSubInfo}>
        <div>{formatDate(postDetailData.uploadDate)}</div>
        <div>{postDetailData.isUploaderActive ? postDetailData.uploaderName : '탈퇴한 회원'}</div>
        <div className={viewsContainer}>
          <Icon icon="EyeTwo" width={16} height={16} color={colors.field06} />
          {postDetailData.views}
        </div>
      </div>
    </div>
  );
};

export default ExperimentPostInfo;
