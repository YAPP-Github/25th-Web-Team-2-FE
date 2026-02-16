'use client';

import {
  buttonGradientBackground,
  experimentPostMobileContentWrapperLayout,
  fixedBottomButtonLayout,
} from './ExperimentPostMobileContentWrapper.css';
import { UseApplyMethodQueryResponse } from '../../../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostTabs from '../ExperimentPostTabs/ExperimentPostTabs';
import ParticipationGuideBottomSheet from '../ParticipationGuideBottomSheet/ParticipationGuideBottomSheet';

import Button from '@/components/Button/Button';
import useOverlay from '@/hooks/useOverlay';
import { trackEvent } from '@/lib/mixpanelClient';

const ExperimentPostMobileContentWrapper = ({
  postDetailData,
  applyMethodData,
}: {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
  applyMethodData: UseApplyMethodQueryResponse;
}) => {
  const { open, close } = useOverlay();

  const handleOpenBottomSheet = () => {
    trackEvent('ApplyMethod Interaction', {
      action: 'Click ApplyMethod Modal',
      device: 'mobile',
    });

    open(
      () => <ParticipationGuideBottomSheet onConfirm={close} applyMethodData={applyMethodData} />,
      {
        title: '참여 방법',
        headerMode: 'none',
      },
    );
  };

  return (
    <div className={experimentPostMobileContentWrapperLayout}>
      <ExperimentPostInfo postDetailData={postDetailData} />
      <ExperimentPostTabs postDetailData={postDetailData} />

      <div className={buttonGradientBackground}>
        <div className={fixedBottomButtonLayout}>
          {postDetailData.recruitStatus ? (
            <Button variant="dark" size="medium" height={'5.6rem'} onClick={handleOpenBottomSheet}>
              참여하기
            </Button>
          ) : (
            <Button
              variant="primary"
              disabled
              size="medium"
              height={'5.6rem'}
              onClick={handleOpenBottomSheet}
            >
              모집이 완료 되었어요
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperimentPostMobileContentWrapper;
