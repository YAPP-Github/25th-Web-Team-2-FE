import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import useCheckValidEmailInfoMutation from '@/app/join/hooks/useCheckValidEmailInfoMutation';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

const ContactEmailInput = () => {
  const { control, getValues, setValue } = useFormContext<ResearcherJoinSchemaType>();
  const verifiedEmail = useWatch({ name: 'verifiedEmail', control });
  const contactEmail = useWatch({ name: 'contactEmail', control });

  const {
    mutate: checkValidEmail,
    isPending: isLoadingCheck,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoMutation();

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const isVerified = Boolean(verifiedEmail) && verifiedEmail === contactEmail;

  const handleCheckValidEmail = async () => {
    checkValidEmail(getValues('contactEmail'), {
      onSuccess: () => {
        setValue('verifiedEmail', getValues('contactEmail'));
      },
      onSettled: () => {
        setIsValidToastOpen(true);
      },
    });
  };

  return (
    <ButtonInput<ResearcherJoinSchemaType>
      title="연락 받을 이메일"
      required
      control={control}
      name="contactEmail"
      onClick={handleCheckValidEmail}
      isLoading={isLoadingCheck}
      setIsValidToastOpen={setIsValidToastOpen}
      isButtonHidden={isVerified}
      tip="로그인 아이디와 달라도 괜찮아요"
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
