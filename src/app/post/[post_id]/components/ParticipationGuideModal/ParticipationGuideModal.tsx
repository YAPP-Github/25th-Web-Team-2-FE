import * as Dialog from '@radix-ui/react-dialog';
import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';

import {
  contactInfo,
  dialogContent,
  dialogTitle,
  toastLayout,
  toastTitle,
  toastViewport,
  warning,
} from './ParticipationGuideModal.styles';
import { closeButton, dialogOverlay } from '../../PostPage.styles';
import { CommonModalProps } from '../../PostPage.types';

import { UseQueryApplyMethodAPIResponse } from '@/apis/hooks/useQueryApplyMethodAPI';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface ParticipationGuideModalProps extends CommonModalProps {
  applyMethodData: UseQueryApplyMethodAPIResponse;
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
          <Dialog.Overlay css={dialogOverlay} />
          <Dialog.Content css={dialogContent} aria-describedby={undefined}>
            <Dialog.Close asChild>
              <button css={closeButton} aria-label="모달 닫기">
                <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
              </button>
            </Dialog.Close>
            <Dialog.Title asChild>
              <h3 css={dialogTitle}>{applyMethodData.content}</h3>
            </Dialog.Title>

            <div css={contactInfo}>
              {/* 링크 */}
              {applyMethodData.formUrl && (
                <div className="info-row">
                  <span className="info-title">링크</span>
                  <div className="info-content">
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
                <div className="info-row">
                  <span className="info-title">연락처</span>
                  <div className="info-content">
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
                <div css={warning}>
                  <Icon icon="Alert" color={colors.textAlert} width={13} height={13} />
                  개인정보보호에 유의해주세요
                </div>
              )}
            </div>
          </Dialog.Content>

          {/* 복사 성공 토스트 알림 */}
          <Toast.Provider swipeDirection="right">
            <Toast.Root
              css={toastLayout}
              open={isToastOpen}
              onOpenChange={setIsToastOpen}
              duration={1500}
            >
              <Toast.Title css={toastTitle}>
                <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
                <p>복사되었어요</p>
              </Toast.Title>
            </Toast.Root>
            <Toast.Viewport css={toastViewport} />
          </Toast.Provider>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ParticipationGuideModal;
