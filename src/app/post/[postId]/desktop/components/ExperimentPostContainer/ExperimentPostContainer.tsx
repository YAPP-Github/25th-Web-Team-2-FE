import { useEffect } from 'react';

import { postContentLayout } from './ExperimentPostContainer.css';
import { UseApplyMethodQueryResponse } from '../../../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostDetailContent from '../ExperimentPostDetailContent/ExperimentPostDetailContent';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostOutline from '../ExperimentPostOutline/ExperimentPostOutline';

import { stopRecording } from '@/lib/mixpanelClient';

interface ExperimentPostContainerProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
  applyMethodData: UseApplyMethodQueryResponse;
}

const ExperimentPostContainer = ({
  postDetailData,
  applyMethodData,
}: ExperimentPostContainerProps) => {
  useEffect(() => {
    stopRecording();
  }, []);

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
