import { postContentLayout } from './ExperimentPostContainer.css';
import { UseApplyMethodQueryResponse } from '../../../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostDetailContent from '../ExperimentPostDetailContent';
import ExperimentPostInfo from '../ExperimentPostInfo';
import ExperimentPostOutline from '../ExperimentPostOutline';

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
        <ExperimentPostDetailContent postDetailData={postDetailData} />
        <ExperimentPostOutline postDetailData={postDetailData} applyMethodData={applyMethodData} />
      </div>
    </>
  );
};

export default ExperimentPostContainer;
