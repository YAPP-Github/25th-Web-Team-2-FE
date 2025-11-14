import { useQuery } from '@tanstack/react-query';

import { extractKeywordButtonInner, extractKeywordButtonWrapper } from './ExtractKeywordButton.css';

import { fetchExtractKeywordsLimit } from '@/apis/post';
import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner/Spinner';
import { queryKey } from '@/constants/queryKey';
import { trackEvent } from '@/lib/mixpanelClient';
import { colors } from '@/styles/colors';

interface ExtractKeywordButtonProps {
  onClick?: () => Promise<void>;
  isPending?: boolean;
}

const ExtractKeywordButton = ({ onClick, isPending }: ExtractKeywordButtonProps) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKey.extractKeywordsLimit,
    queryFn: fetchExtractKeywordsLimit,
  });

  const isButtonLoading = isPending || isLoading;
  const isButtonDisabled = isLoading || data?.remainingCount === 0;

  const handleClick = () => {
    onClick?.();
    trackEvent('Button Click', {
      action: 'AI Extract Keywords',
    });
  };

  return (
    <button
      className={extractKeywordButtonWrapper}
      onClick={handleClick}
      disabled={isButtonDisabled}
    >
      {isButtonLoading ? (
        <Spinner width={22} height={22} color={colors.field01} />
      ) : (
        <div className={extractKeywordButtonInner}>
          <Icon icon="Stars" width={20} height={20} />
          <span>
            AI 자동 입력 (일 {data?.remainingCount}/{data?.limit}회)
          </span>
        </div>
      )}
    </button>
  );
};

export default ExtractKeywordButton;
