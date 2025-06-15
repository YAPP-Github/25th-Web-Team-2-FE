import { useFormContext, useWatch } from 'react-hook-form';

import { bottomButtonLayout } from '../../page.css';

import Button from '@/components/Button/Button';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface NextButtonProps {
  onNext: () => void;
  openServiceAgreeBottomSheet: () => void;
}

const NextButton = ({ onNext, openServiceAgreeBottomSheet }: NextButtonProps) => {
  const { control } = useFormContext<ResearcherJoinSchemaType>();

  const isEmailVerified = useWatch({ name: 'isEmailVerified', control });
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });

  const isValidCheck = isTermOfService && isPrivacy;
  const canNext = isEmailVerified && isValidCheck;

  return (
    <>
      {isEmailVerified && (
        <div className={bottomButtonLayout}>
          <Button
            variant="primary"
            size="small"
            height="56px"
            onClick={canNext ? onNext : openServiceAgreeBottomSheet}
          >
            다음
          </Button>
        </div>
      )}
    </>
  );
};

export default NextButton;
