import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { emailInput } from '../../../page.css';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import useCheckValidEmailInfoMutation from '@/app/join/hooks/useCheckValidEmailInfoMutation';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface ContactEmailInputProps {
  openServiceAgreeBottomSheet: () => void;
}

const ContactEmailInput = ({ openServiceAgreeBottomSheet }: ContactEmailInputProps) => {
  const methods = useFormContext<ParticipantJoinSchemaType>();
  const { control, getValues, setValue } = methods;

  const {
    mutate: checkValidEmail,
    isPending: isLoadingCheck,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoMutation();

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const verifiedContactEmail = useWatch({ name: 'verifiedContactEmail', control });
  const contactEmail = useWatch({ name: 'contactEmail', control });
  const isVerified = Boolean(verifiedContactEmail) && verifiedContactEmail === contactEmail;

  const handleCheckValidEmail = async () => {
    checkValidEmail(getValues('contactEmail'), {
      onSuccess: () => {
        setValue('verifiedContactEmail', getValues('contactEmail'));
        openServiceAgreeBottomSheet();
      },
      onSettled: () => {
        setIsValidToastOpen(true);
      },
    });
  };

  return (
    <ButtonInput<ParticipantJoinSchemaType>
      className={emailInput}
      control={control}
      name="contactEmail"
      onClick={handleCheckValidEmail}
      isLoading={isLoadingCheck}
      setIsValidToastOpen={setIsValidToastOpen}
      isButtonHidden={isVerified}
      toast={
        <EmailToast
          title={isEmailDuplicateError ? '중복된 이메일이에요' : '사용 가능한 이메일이에요'}
          isToastOpen={isValidToastOpen}
          setIsToastOpen={setIsValidToastOpen}
          isError={isEmailDuplicateError}
        />
      }
    />
  );
};

export default ContactEmailInput;
