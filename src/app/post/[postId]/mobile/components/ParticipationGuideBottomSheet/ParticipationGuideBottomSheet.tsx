import {
  participationGuideBottomSheetLayout,
  bottomSheetTitle,
  applyMethodContainer,
  contactInfoContent,
  contactInfoRowContainer,
  contactInfoTitle,
  warningMessage,
  emptyView,
} from './ParticipationGuideBottomSheet.css';
import { ParticipationGuideBottomSheetProps } from '../../../ExperimentPostPage.types';
import useApplyMethodQuery from '../../../hooks/useApplyMethodQuery';
import {
  contactButton,
  emptyViewTitle,
} from '../ExperimentPostMobileContentWrapper/ExperimentPostMobileContentWrapper.css';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner/Spinner';
import { trackEvent } from '@/lib/mixpanelClient';
import { colors } from '@/styles/colors';

const ParticipationGuideBottomSheet = ({
  onConfirm,
  postId,
  showToast,
}: ParticipationGuideBottomSheetProps) => {
  /* 공고 지원 방법 조회 */
  const {
    data: applyMethodData,
    isLoading: isLoadingApply,
    error: errorApply,
    refetch: refetchApply,
  } = useApplyMethodQuery({ postId });

  if (errorApply) {
    return (
      <div className={emptyView}>
        <p className={emptyViewTitle}>{errorApply.message}</p>
        <button onClick={() => refetchApply()} className={contactButton}>
          재시도
        </button>
      </div>
    );
  }

  if (isLoadingApply || !applyMethodData) {
    return <Spinner height={150} />;
  }

  const handleCopyContent = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast('복사되었어요');
        trackEvent('ApplyMethod Interaction', {
          action: 'Link Copied',
        });
      })
      .catch(() => {
        showToast('복사에 실패했어요. 잠시 후 다시 시도해 주세요');
      });
  };

  return (
    <section className={participationGuideBottomSheetLayout}>
      <h2 className={bottomSheetTitle}>참여 방법</h2>

      <div
        className={applyMethodContainer}
        style={{
          alignItems: applyMethodData.formUrl || applyMethodData.phoneNum ? 'flex-start' : 'center',
        }}
      >
        <h3
          className={bottomSheetTitle}
          style={{
            textAlign: applyMethodData.formUrl || applyMethodData.phoneNum ? 'left' : 'center',
          }}
        >
          {applyMethodData.content}
        </h3>

        {/* 링크 */}
        {applyMethodData.formUrl && (
          <div className={contactInfoRowContainer}>
            <span className={contactInfoTitle}>링크</span>
            <div className={contactInfoContent}>
              <a
                href={applyMethodData.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.primaryMint, textDecoration: 'underline' }}
                onClick={() => {
                  trackEvent('ApplyMethod Interaction', {
                    action: 'Link Clicked',
                    link_url: applyMethodData.formUrl ?? '',
                  });
                }}
              >
                {applyMethodData.formUrl}
              </a>
              <Icon
                icon="Copy"
                width={20}
                height={20}
                cursor="pointer"
                color={colors.text04}
                onClick={() =>
                  applyMethodData.formUrl && handleCopyContent(applyMethodData.formUrl)
                }
              />
            </div>
          </div>
        )}

        {/* 연락처 */}
        {applyMethodData.phoneNum && (
          <div className={contactInfoRowContainer}>
            <span className={contactInfoTitle}>연락처</span>
            <div className={contactInfoContent}>
              {applyMethodData.phoneNum}
              <Icon
                icon="Copy"
                width={20}
                height={20}
                cursor="pointer"
                color={colors.text04}
                onClick={() =>
                  applyMethodData.phoneNum && handleCopyContent(applyMethodData.phoneNum)
                }
              />
            </div>
          </div>
        )}

        {/* 개인정보보호 안내 */}
        <div className={warningMessage}>
          <Icon icon="AlertOutlined" color={colors.textAlert} width={18} height={18} />
          개인정보보호에 유의해주세요
        </div>
      </div>

      <Button onClick={onConfirm} variant="dark" size="small" height={'5.6rem'}>
        확인
      </Button>
    </section>
  );
};

export default ParticipationGuideBottomSheet;
