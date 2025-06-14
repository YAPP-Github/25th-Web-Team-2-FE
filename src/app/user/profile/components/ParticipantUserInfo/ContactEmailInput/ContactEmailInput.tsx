import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import useCheckValidEmailInfoMutation from '@/app/join/hooks/useCheckValidEmailInfoMutation';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import { ParticipantUpdateSchemaType } from '@/schema/profile/ParticipantUpdateSchema';

const ContactEmailInput = () => {
  const { control, getValues, setValue } = useFormContext<ParticipantUpdateSchemaType>();
  const verifiedContactEmail = useWatch({ name: 'verifiedContactEmail', control });
  const contactEmail = useWatch({ name: 'contactEmail', control });

  const {
    mutate: checkValidEmail,
    isPending: isLoadingCheck,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoMutation();

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const isVerified = Boolean(verifiedContactEmail) && verifiedContactEmail === contactEmail;

  const handleCheckValidEmail = async () => {
    checkValidEmail(getValues('contactEmail'), {
      onSuccess: () => {
        setValue('verifiedContactEmail', getValues('contactEmail'));
      },
      onSettled: () => {
        setIsValidToastOpen(true);
      },
    });
  };

  return (
    <ButtonInput<ParticipantUpdateSchemaType>
      title="연락 받을 이메일"
      required
      control={control}
      name="contactEmail"
      onClick={handleCheckValidEmail}
      isLoading={isLoadingCheck}
      setIsValidToastOpen={setIsValidToastOpen}
      isButtonHidden={isVerified}
      tip="주요 안내 사항을 전달받을 이메일을 입력해 주세요. 이메일 ID와 달라도 괜찮아요"
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
