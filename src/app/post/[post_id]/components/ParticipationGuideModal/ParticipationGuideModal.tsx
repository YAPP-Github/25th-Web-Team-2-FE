import * as Dialog from '@radix-ui/react-dialog';
import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';

import {
  dialogContent,
  dialogTitle,
  infoContent,
  infoRow,
  infoTitle,
  toastLayout,
  toastTitle,
  toastViewport,
  warning,
} from './ParticipationGuideModal.css';
import { UseApplyMethodQueryResponse } from '../../hooks/useApplyMethodQuery';
import { closeButton, dialogOverlay } from '../../PostPage.css';
import { CommonModalProps } from '../../PostPage.types';

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
  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsToastOpen(true);
    });
  };

  if (!applyMethodData) return null;

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className={dialogOverlay} />
          <Dialog.Content className={dialogContent} aria-describedby={undefined}>
            <Dialog.Close asChild>
              <button className={closeButton} aria-label="모달 닫기">
                <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
              </button>
            </Dialog.Close>
            <Dialog.Title asChild>
              <h3 className={dialogTitle}>{applyMethodData.content}</h3>
            </Dialog.Title>

            <div>
              {/* 링크 */}
              {applyMethodData.formUrl && (
                <div className={infoRow}>
                  <span className={infoTitle}>링크</span>
                  <div className={infoContent}>
                    {applyMethodData.formUrl}
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
                <div className={infoRow}>
                  <span className={infoTitle}>연락처</span>
                  <div className={infoContent}>
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
              {(applyMethodData.formUrl || applyMethodData.phoneNum) && (
                <div className={warning}>
                  <Icon icon="Alert" color={colors.textAlert} width={13} height={13} />
                  개인정보보호에 유의해주세요
                </div>
              )}
            </div>
          </Dialog.Content>

          {/* 복사 성공 토스트 알림 */}
          <Toast.Provider swipeDirection="right">
            <Toast.Root
              className={toastLayout}
              open={isToastOpen}
              onOpenChange={setIsToastOpen}
              duration={1500}
            >
              <Toast.Title className={toastTitle}>
                <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
                <p>복사되었어요</p>
              </Toast.Title>
            </Toast.Root>
            <Toast.Viewport className={toastViewport} />
          </Toast.Provider>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ParticipationGuideModal;
