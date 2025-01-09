import * as Dialog from '@radix-ui/react-dialog';

import {
  closeButton,
  contactInfo,
  dialogContent,
  dialogOverlay,
  dialogTitle,
  warning,
} from './ParticipationGuideModal.styles';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface ParticipationGuideModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * 참여 방법 안내 모달
 */
function ParticipationGuideModal({ isOpen, onOpenChange }: ParticipationGuideModalProps) {
  return (
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
            <h3 css={dialogTitle}>
              아래 연락처로 성함 / 연락처 / 참여 가능 날짜와 함께 시간 (1~3개)를 보내주시길
              바랍니다.
            </h3>
          </Dialog.Title>

          <div css={contactInfo}>
            <div className="info-row">
              <span className="info-title">링크</span>
              <div className="info-content">
                teamDobby@gmail.com
                <Icon icon="Copy" width={16} height={16} cursor="pointer" />
              </div>
            </div>
            <div className="info-row">
              <span className="info-title">연락처</span>
              <div className="info-content">
                010-1234-5678
                <Icon icon="Copy" width={16} height={16} cursor="pointer" />
              </div>
            </div>

            <div css={warning}>
              <Icon icon="Alert" color={colors.textAlert} width={13} height={13} />
              개인정보보호에 유의해주세요
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ParticipationGuideModal;
