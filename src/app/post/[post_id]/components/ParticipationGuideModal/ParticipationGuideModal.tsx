import * as Dialog from '@radix-ui/react-dialog';
import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';

import {
  participationGuideContent,
  participationModalTitle,
  contactInfoContent,
  contactInfoRowContainer,
  contactInfoTitle,
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
  warningMessage,
  applyMethodContainer,
} from './ParticipationGuideModal.css';
import { closeButton, dialogOverlay } from '../../ExperimentPostPage.css';
import { CommonModalProps } from '../../ExperimentPostPage.types';
import { UseApplyMethodQueryResponse } from '../../hooks/useApplyMethodQuery';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface ParticipationGuideModalProps extends CommonModalProps {
  applyMethodData: UseApplyMethodQueryResponse;
}

/**
 * 참여 방법 안내 모달
 */
const ParticipationGuideModal = ({
  isOpen,
  onOpenChange,
  applyMethodData,
}: ParticipationGuideModalProps) => {
  const [isCopyToastOpen, setIsCopyToastOpen] = useState(false);

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopyToastOpen(true);
    });
  };

  if (!applyMethodData) return null;

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className={dialogOverlay} />
          <Dialog.Content className={participationGuideContent} aria-describedby={undefined}>
            <Dialog.Close asChild>
              <button className={closeButton} aria-label="모달 닫기">
                <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
              </button>
            </Dialog.Close>
            <Dialog.Title asChild>
              <h3
                className={participationModalTitle}
                style={{
                  textAlign:
                    applyMethodData.formUrl || applyMethodData.phoneNum ? 'left' : 'center',
                }}
              >
                {applyMethodData.content}
              </h3>
            </Dialog.Title>

            <div
              className={applyMethodContainer}
              style={{
                alignItems:
                  applyMethodData.formUrl || applyMethodData.phoneNum ? 'flex-start' : 'center',
              }}
            >
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
                    >
                      {applyMethodData.formUrl}
                    </a>
                    <Icon
                      icon="Copy"
                      width={16}
                      height={16}
                      cursor="pointer"
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
                      width={16}
                      height={16}
                      cursor="pointer"
                      onClick={() =>
                        applyMethodData.phoneNum && handleCopyContent(applyMethodData.phoneNum)
                      }
                    />
                  </div>
                </div>
              )}

              {/* 개인정보보호 안내 */}
              <div className={warningMessage}>
                <Icon icon="Alert" color={colors.textAlert} width={13} height={13} />
                개인정보보호에 유의해주세요
              </div>
            </div>
          </Dialog.Content>

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
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ParticipationGuideModal;
