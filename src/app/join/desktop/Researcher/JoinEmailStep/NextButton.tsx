import { useFormContext, useFormState } from 'react-hook-form';

import Button from '@/components/Button/Button';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface NextButtonProps {
  onNext: () => void;
  isRequiredChecked: boolean;
  isEmailVerified: boolean;
}

const NextButton = ({ onNext, isRequiredChecked, isEmailVerified }: NextButtonProps) => {
  const { trigger, control } = useFormContext<ResearcherJoinSchemaType>();
  const { errors } = useFormState({
    control,
    name: ['contactEmail', 'univEmail'],
  });

  const isValidForm =
    !errors.contactEmail && !errors.univEmail && isEmailVerified && isRequiredChecked;

  const handleNextStep = async () => {
    const isValid = await trigger(['oauthEmail', 'contactEmail', 'univEmail']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <Button
      variant="primary"
      size="medium"
      onClick={handleNextStep}
      disabled={!isValidForm}
      width="20rem"
    >
      다음
    </Button>
  );
};

export default NextButton;
