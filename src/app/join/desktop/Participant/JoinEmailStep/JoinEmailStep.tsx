'use client';

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import EmailToast from '../../../components/EmailToast/EmailToast';
import JoinCheckboxContainer from '../../../components/JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from '../../../components/JoinInput/JoinInput';

import useCheckValidEmailInfoQuery from '@/app/join/hooks/useCheckValidEmailInfoQuery';
import { joinContentContainer, joinForm, nextButton } from '@/app/join/JoinPage.css';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<ParticipantJoinSchemaType>();

  const oauthEmail = useWatch({ name: 'oauthEmail', control });
  const contactEmail = useWatch({ name: 'contactEmail', control });
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });

  const {
    refetch,
    isLoading: isLoadingCheck,
    isSuccess: isValidEmail,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoQuery(contactEmail);

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const handleCheckValidEmail = async () => {
    await refetch();
    setIsValidToastOpen(true);
  };

  const allValid =
    isValidEmail && contactEmail && !errors.contactEmail && isTermOfService && isPrivacy;

  const handleNextStep = async () => {
    const isValid = await trigger(['oauthEmail', 'contactEmail']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        {/* 소셜 이메일 */}
        <JoinInput<ParticipantJoinSchemaType>
          name="oauthEmail"
          control={control}
          label="소셜 로그인 아이디"
          value={oauthEmail}
          placeholder="이메일 입력"
          disabled
        />

        {/* 연락 받을 이메일 */}
        <ButtonInput<ParticipantJoinSchemaType>
          title="연락 받을 이메일"
          required
          control={control}
          name="contactEmail"
          onClick={handleCheckValidEmail}
          isLoading={isLoadingCheck}
          setIsValidToastOpen={setIsValidToastOpen}
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

        {/* 동의 체크 항목 */}
        <JoinCheckboxContainer />
      </div>
      <button className={nextButton} onClick={handleNextStep} disabled={!allValid}>
        다음
      </button>
    </section>
  );
};

export default JoinEmailStep;
