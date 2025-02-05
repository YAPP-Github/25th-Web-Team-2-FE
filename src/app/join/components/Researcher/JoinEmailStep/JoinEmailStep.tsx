'use client';

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { nextButton } from './JoinEmailStep.css';
import UnivAuthInput from './UnivAuthInput/UnivAuthInput';
import JoinCheckboxContainer from '../../JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from '../../JoinInput/JoinInput';

import useServiceAgreeCheck from '@/app/join/hooks/useServiceAgreeCheck';
import { joinContentContainer, joinForm } from '@/app/join/JoinPage.css';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<ResearcherJoinSchemaType>();
  const { serviceAgreeCheck, handleAllCheck, handleChangeCheck } = useServiceAgreeCheck();
  const oauthEmail = useWatch({ name: 'oauthEmail', control });
  const univEmail = useWatch({ name: 'univEmail', control });

  const [isEmailVerified, setIsEmailVerified] = useState(false);

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

  const handleVerifyEmail = () => {
    setIsEmailVerified(true);
  };

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        <JoinInput<ResearcherJoinSchemaType>
          name="oauthEmail"
          control={control}
          label="소셜 로그인 아이디"
          value={oauthEmail}
          placeholder="이메일 입력"
          disabled
        />
        <JoinInput<ResearcherJoinSchemaType>
          name="contactEmail"
          control={control}
          label="연락 받을 이메일"
          placeholder="이메일 입력"
          required
          tip="로그인 아이디와 달라도 괜찮아요"
        />
        <UnivAuthInput isEmailVerified={isEmailVerified} handleVerifyEmail={handleVerifyEmail} />
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
