import {
  postDetailContentLayout,
  postDetailContentWrapper,
} from './ExperimentPostDetailContent.css';
import { formattedContentText } from '../../ExperimentPostPage.utils';
import { UseQueryExperimentDetailsAPIResponse } from '../../hooks/useExperimentDetailsQuery';

interface ExperimentPostDetailContentProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}

const ExperimentPostDetailContent = ({ postDetailData }: ExperimentPostDetailContentProps) => {
  return (
    <div className={postDetailContentLayout}>
      <h3>실험 안내</h3>
      <div className={postDetailContentWrapper}>
        {formattedContentText(postDetailData.content || '')}
      </div>
    </div>
  );
};

export default ExperimentPostDetailContent;
