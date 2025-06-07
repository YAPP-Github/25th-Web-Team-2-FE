import {
  buttonContainer,
  footerButton,
  footerButtonContainer,
  footerContainer,
  infoText,
  infoTextContainer,
} from './FooterButtonContainer.css';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';

interface FooterButtonContainerProps {
  handleReset: () => void;
  handleSave: () => void;
  isValidSaveButton: boolean;
}

const FooterButtonContainer = ({
  handleReset,
  handleSave,
  isValidSaveButton,
}: FooterButtonContainerProps) => {
  return (
    <div className={footerContainer}>
      <div className={footerButtonContainer}>
        <div className={infoTextContainer}>
          <Icon icon="Information" width={16} height={16} />
          <span className={infoText}>최대 5개까지 선택할 수 있어요</span>
        </div>
        <div className={buttonContainer}>
          <Button variant="secondary" size="small" className={footerButton} onClick={handleReset}>
            초기화
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={handleSave}
            className={footerButton}
            disabled={!isValidSaveButton}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FooterButtonContainer;
