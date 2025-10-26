import { extractKeywordButtonInner, extractKeywordButtonWrapper } from './ExtractKeywordButton.css';

import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner/Spinner';
import { colors } from '@/styles/colors';

interface ExtractKeywordButtonProps {
  onClick?: () => Promise<void>;
  isLoading?: boolean;
}

// TODO: 자동 입력 제한 횟수 API로 가져오기
const ExtractKeywordButton = ({ onClick, isLoading }: ExtractKeywordButtonProps) => {
  return (
    <button className={extractKeywordButtonWrapper} onClick={onClick} disabled={isLoading}>
      {isLoading ? (
        <Spinner width={22} height={22} color={colors.field01} />
      ) : (
        <div className={extractKeywordButtonInner}>
          <Icon icon="Stars" width={20} height={20} />
          <span>AI 자동 입력 (일 2/2회)</span>
        </div>
      )}
    </button>
  );
};

export default ExtractKeywordButton;
