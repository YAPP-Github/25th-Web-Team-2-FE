import Icon from '@components/Icon';
import { colors } from '@styles/colors';

import { experimentPostInfoLayout, postSubInfo, postTitle } from './ExperimentPostInfo.css';
import { viewsContainer } from '../../../desktop/components/ExperimentPostInfo/ExperimentPostInfo.css';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import { formatDate } from '../../../utils/formatDate';

const ExperimentPostInfo = ({
  postDetailData,
}: {
  postDetailData: UseQueryExperimentDetailsAPIResponse | undefined;
}) => {
  if (!postDetailData) return;

  return (
    <div className={experimentPostInfoLayout}>
      <h1 className={postTitle}>{postDetailData.title}</h1>
      <div className={postSubInfo}>
        <div>
          <time dateTime={postDetailData.uploadDate}>{formatDate(postDetailData.uploadDate)}</time>
        </div>
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
