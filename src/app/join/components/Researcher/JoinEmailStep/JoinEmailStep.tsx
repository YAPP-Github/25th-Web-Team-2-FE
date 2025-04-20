'use client';

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { nextButton } from './JoinEmailStep.css';
import UnivAuthInput from './UnivAuthInput/UnivAuthInput';
import EmailToast from '../../EmailToast/EmailToast';
import JoinCheckboxContainer from '../../JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from '../../JoinInput/JoinInput';

import useCheckValidEmailInfoQuery from '@/app/join/hooks/useCheckValidEmailInfoQuery';
import useServiceAgreeCheck from '@/app/join/hooks/useServiceAgreeCheck';
import useVerifyUnivEmail from '@/app/join/hooks/useVerifyUnivEmail';
import { joinContentContainer, joinForm } from '@/app/join/JoinPage.css';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const {
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<ResearcherJoinSchemaType>();
  const { serviceAgreeCheck, handleAllCheck, handleChangeCheck } = useServiceAgreeCheck({
    onCheckAdConsent: (checked) => setValue('adConsent', checked),
  });

  const oauthEmail = useWatch({ name: 'oauthEmail', control });
  const univEmail = useWatch({ name: 'univEmail', control });
  const contactEmail = useWatch({ name: 'contactEmail', control });

  const { isEmailVerified, handleVerifyEmail, handleResetVerifyEmail } = useVerifyUnivEmail();

  const handleNextStep = async () => {
    const isValid = await trigger(['oauthEmail', 'contactEmail', 'univEmail']);
    if (isValid) {
      onNext();
    }
  };

  const allValid =
    oauthEmail &&
    univEmail &&
    !errors.contactEmail &&
    !errors.univEmail &&
    isEmailVerified &&
    serviceAgreeCheck.isTermOfService &&
    serviceAgreeCheck.isPrivacy;

  const {
    refetch,
    isLoading: isLoadingCheck,
    isSuccess,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoQuery(contactEmail);

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const handleCheckValidEmail = async () => {
    await refetch();
    setIsValidToastOpen(true);
  };

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        {/* 소셜 이메일 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="oauthEmail"
          control={control}
          label="소셜 로그인 아이디"
          value={oauthEmail}
          placeholder="이메일 입력"
          disabled
        />

        {/* 연락 받을 이메일 */}
        <ButtonInput<ResearcherJoinSchemaType>
          control={control}
          name="contactEmail"
          onClick={handleCheckValidEmail}
          isLoading={isLoadingCheck}
          isSuccess={isSuccess}
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

        {/* 학교 메일 인증 */}
        <UnivAuthInput
          isEmailVerified={isEmailVerified}
          handleVerifyEmail={handleVerifyEmail}
          handleResetVerifyEmail={handleResetVerifyEmail}
        />

        {/* 동의 체크 항목 */}
        <JoinCheckboxContainer
          serviceAgreeCheck={serviceAgreeCheck}
          handleAllCheck={handleAllCheck}
          handleChange={handleChangeCheck}
        />
      </div>
      <button className={nextButton} onClick={handleNextStep} disabled={!allValid}>
        다음
      </button>
    </section>
  );
};

export default JoinEmailStep;
