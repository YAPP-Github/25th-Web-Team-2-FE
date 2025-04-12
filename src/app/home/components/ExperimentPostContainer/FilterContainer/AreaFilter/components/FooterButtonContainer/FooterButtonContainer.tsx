import {
  buttonContainer,
  buttonRecipe,
  footerButtonContainer,
  footerContainer,
  infoText,
  infoTextContainer,
} from './FooterButtonContainer.css';

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
          <button className={buttonRecipe({ type: 'reset' })} onClick={handleReset}>
            초기화
          </button>
          <button
            onClick={handleSave}
            className={buttonRecipe({ type: 'save' })}
            disabled={!isValidSaveButton}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterButtonContainer;
