import Icon from '@/components/Icon';
import { extractKeywordButtonInner, extractKeywordButtonWrapper } from './ExtractKeywordButton.css';

interface ExtractKeywordButtonProps {
  onClick?: () => Promise<void>;
}

// TODO: 자동 입력 제한 횟수 API로 가져오기
const ExtractKeywordButton = ({ onClick }: ExtractKeywordButtonProps) => {
  return (
    <button className={extractKeywordButtonWrapper} onClick={onClick}>
      <div className={extractKeywordButtonInner}>
        <Icon icon="Stars" width={20} height={20} />
        <span>AI 자동 입력 (일 2/2회)</span>
      </div>
    </button>
  );
};

export default ExtractKeywordButton;
