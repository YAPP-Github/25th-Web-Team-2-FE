import { postContentLayout, postContentWrapper } from './ExperimentPostContainer.css';
import { UseApplyMethodQueryResponse } from '../../../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostDetailContent from '../ExperimentPostDetailContent';
import ExperimentPostInfo from '../ExperimentPostInfo';
import ExperimentPostOutline from '../ExperimentPostOutline';
import OtherPostsSection from '../OtherPostsSection';

interface ExperimentPostContainerProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
  applyMethodData: UseApplyMethodQueryResponse;
}

const ExperimentPostContainer = ({
  postDetailData,
  applyMethodData,
}: ExperimentPostContainerProps) => {
  return (
    <>
      <ExperimentPostInfo postDetailData={postDetailData} />
      <div className={postContentLayout}>
        <div className={postContentWrapper}>
          <ExperimentPostDetailContent postDetailData={postDetailData} />
          <OtherPostsSection postId={postDetailData.experimentPostId} />
        </div>

        <ExperimentPostOutline postDetailData={postDetailData} applyMethodData={applyMethodData} />
      </div>
    </>
  );
};

export default ExperimentPostContainer;
