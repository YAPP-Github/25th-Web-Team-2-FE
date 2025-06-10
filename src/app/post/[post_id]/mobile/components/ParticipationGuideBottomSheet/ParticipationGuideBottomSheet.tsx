import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';

import {
  participationGuideBottomSheetLayout,
  bottomSheetTitle,
  applyMethodContainer,
  contactInfoContent,
  contactInfoRowContainer,
  contactInfoTitle,
  warningMessage,
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from './ParticipationGuideBottomSheet.css';
import useApplyMethodQuery from '../../../hooks/useApplyMethodQuery';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import { trackEvent } from '@/lib/mixpanelClient';
import { colors } from '@/styles/colors';

const ParticipationGuideBottomSheet = ({
  onConfirm,
  postId,
}: {
  onConfirm: VoidFunction;
  postId: string;
}) => {
  const [isCopyToastOpen, setIsCopyToastOpen] = useState(false);

  /* 공고 지원 방법 조회 */
  const { data: applyMethodData, isLoading: isLoadingApply } = useApplyMethodQuery({ postId });

  // todo 로딩 상태 및 EmptyView 추가 예정
  if (isLoadingApply) {
    return <div>로딩 중...</div>;
  }
  if (!applyMethodData) return <div>데이터 없음</div>;

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopyToastOpen(true);
      trackEvent('ApplyMethod Interaction', {
        action: 'Link Copied',
      });
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

      {/* todo Toast 위치 변경 예정  */}
      {/* 복사 성공 토스트 알림 */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={isCopyToastOpen}
          onOpenChange={setIsCopyToastOpen}
          duration={1500}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
            <p>복사되었어요</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </section>
  );
};

export default ParticipationGuideBottomSheet;
