import * as Dialog from '@radix-ui/react-dialog';

import {
  participationGuideContent,
  participationModalTitle,
  contactInfoContent,
  contactInfoRowContainer,
  contactInfoTitle,
  warningMessage,
  applyMethodContainer,
} from './ParticipationGuideModal.css';
import { closeButton, dialogOverlay } from '../../../ExperimentPostPage.css';
import { CommonModalProps } from '../../../ExperimentPostPage.types';
import { UseApplyMethodQueryResponse } from '../../../hooks/useApplyMethodQuery';

import Icon from '@/components/Icon';
import { useToast } from '@/hooks/useToast';
import { trackEvent } from '@/lib/mixpanelClient';
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
  const toast = useToast();

  const handleCopyContent = (text: string, type: 'link' | 'contactInfo') => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.open({ message: '복사되었어요', duration: 1500 });
        trackEvent('ApplyMethod Interaction', {
          action: type === 'link' ? 'Link Copied' : 'ContactInfo Copied',
        });
      })
      .catch(() => {
        toast.error({ message: '복사에 실패했어요. 잠시 후 다시 시도해 주세요', duration: 1500 });
      });
  };

  if (!applyMethodData) return null;

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className={dialogOverlay} />
          <Dialog.Content
            className={participationGuideContent({
              onlyContent: !(applyMethodData.formUrl || applyMethodData.phoneNum),
            })}
            aria-describedby={undefined}
          >
            <Dialog.Close asChild>
              <button className={closeButton} aria-label="모달 닫기">
                <Icon icon="X" color={colors.icon03} width={14} height={14} cursor="pointer" />
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
                      width={16}
                      height={16}
                      cursor="pointer"
                      onClick={() =>
                        applyMethodData.formUrl &&
                        handleCopyContent(applyMethodData.formUrl, 'link')
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
                        applyMethodData.phoneNum &&
                        handleCopyContent(applyMethodData.phoneNum, 'contactInfo')
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
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ParticipationGuideModal;
