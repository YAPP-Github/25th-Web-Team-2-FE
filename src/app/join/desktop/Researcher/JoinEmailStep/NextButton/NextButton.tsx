import { useFormContext, useFormState, useWatch } from 'react-hook-form';

import Button from '@/components/Button/Button';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface NextButtonProps {
  onNext: () => void;
}

const NextButton = ({ onNext }: NextButtonProps) => {
  const { trigger, control } = useFormContext<ResearcherJoinSchemaType>();
  const { errors } = useFormState({
    control,
    name: ['contactEmail', 'univEmail'],
  });

  const contactEmail = useWatch({ name: 'contactEmail', control });
  const verifiedContactEmail = useWatch({ name: 'verifiedContactEmail', control });
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });
  const isEmailVerified = useWatch({ name: 'isEmailVerified', control });

  const isValidForm =
    Boolean(verifiedContactEmail) &&
    verifiedContactEmail === contactEmail &&
    !errors.contactEmail &&
    !errors.univEmail &&
    isEmailVerified &&
    isTermOfService &&
    isPrivacy;

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
