import { useFormContext, useFormState, useWatch } from 'react-hook-form';

import Button from '@/components/Button/Button';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface NextButtonProps {
  onNext: () => void;
}

const NextButton = ({ onNext }: NextButtonProps) => {
  const { trigger, control } = useFormContext<ParticipantJoinSchemaType>();
  const { errors } = useFormState({
    control,
    name: ['contactEmail'],
  });

  const contactEmail = useWatch({ name: 'contactEmail', control });
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });
  const verifiedContactEmail = useWatch({ name: 'verifiedContactEmail', control });

  const isVerifiedContactEmail =
    Boolean(verifiedContactEmail) && verifiedContactEmail === contactEmail;

  const isValidForm =
    isVerifiedContactEmail && !errors.contactEmail && isTermOfService && isPrivacy;

  const handleNextStep = async () => {
    const isValid = await trigger(['oauthEmail', 'contactEmail', 'isTermOfService', 'isPrivacy']);
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
